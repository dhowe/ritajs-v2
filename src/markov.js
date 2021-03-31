import { parse, stringify } from 'flatted';

class RiMarkov {

  constructor(n, opts = {}) {
    this.n = n;
    this.root = new Node(null, 'ROOT');

    this.trace = opts.trace;
    this.mlm = opts.maxLengthMatch;
    this.maxAttempts = opts.maxAttempts || 999;
    
    this.tokenize = opts.tokenize || RiTa().tokenize;
    this.untokenize = opts.untokenize || RiTa().untokenize;
    this.disableInputChecks = opts.disableInputChecks;

    if (this.mlm && this.mlm < this.n) {
      throw Error('maxLengthMatch(mlm) must be >= N');
    }

    // we store inputs to verify we don't duplicate sentences
    if (!this.disableInputChecks || this.mlm) this.input = [];
  }

  toJSON() {
    return stringify(Object.keys(this).reduce
      ((acc, k) => Object.assign(acc, { [k]: this[k] }), {}));
  }

  static fromJSON(json) {

    // parse the json and merge with new object
    let parsed = parse(json);
    let rm = Object.assign(new RiMarkov(), parsed);

    // handle json converting undefined [] to empty []
    if (!parsed.input) rm.input = undefined;

    // then recreate the n-gram tree with Node objects
    let jsonRoot = rm.root;
    populate(rm.root = new Node(null, 'ROOT'), jsonRoot);

    return rm;
  }

  addText(text, multiplier = 1) {

    let sents = Array.isArray(text) ? text : RiTa().sentences(text);

    // add new tokens for each sentence start/end
    let tokens = [];
    for (let k = 0; k < multiplier; k++) {
      for (let i = 0; i < sents.length; i++) {
        //let sentence = sentences[i].replace(/\s+/, ' ').trim();
        let words = this.tokenize(sents[i]);
        tokens.push(RiMarkov.SS, ...words, RiMarkov.SE);
      }
      this.treeify(tokens);
    }

    if (!this.disableInputChecks || this.mlm) this.input.push(...tokens);
  }

  generate(count, opts = {}) {

    if (arguments.length === 1 && typeof count === 'object') {
      opts = count;
      count = null;
    }

    const num = count || 1;
    const temp = opts.temperature;
    const minLength = opts.minLength || 5;
    const maxLength = opts.maxLength || 35;
    let seed = opts.seed || opts.startTokens; // dep

    let result = [], tokens, tries = 0;
    let fail = (msg) => {
      this._logError(++tries, tokens, msg);
      if (tries >= this.maxAttempts) throwError(tries);
      tokens = undefined;
      return 1;
    }

    if (typeof seed === 'string') seed = this.tokenize(seed);

    while (result.length < num) {

      tokens = tokens || this._initSentence(seed);
      if (!tokens) throw Error('No sentence starts with: "' + seed + '"');

      while (tokens && tokens.length < maxLength) {

        let parent = this._pathTo(tokens);
        if ((!parent || parent.isLeaf()) && fail('no parent')) break;

        let next = this._selectNext(parent, temp, tokens);
        if (!next && fail('no next')) break; // possible if all children excluded

        tokens.push(next);
        if (next.token === RiMarkov.SE) {

          tokens.pop();
          if (tokens.length >= minLength) {

            let rawtoks = tokens.map(t => t.token); // to string array

            // Here we check if the output sentence occurs in the input
            if (!this.disableInputChecks && isSubArray(rawtoks, this.input)) {
               fail('in input'); 
               break;
            }

            let sent = this._flatten(tokens);
            if (!opts.allowDuplicates && result.includes(sent) && fail('is dup')) break;
            this.trace && console.log('-- OK', sent.replace(MULTI_SP_RE, ' '));
            result.push(sent.replace(MULTI_SP_RE, ' '));
            break;
          }
          if (fail('too short')) break;
        }
      }
      if (tokens && tokens.length >= maxLength) fail('too long');
    }

    return typeof count === 'number' ? result : result[0];
  }

  /* returns array of possible tokens after pre and (optionally) before post */
  completions(pre, post) {
    let tn, result = [];
    if (post) { // fill the center
      if (pre.length + post.length > this.n) throw Error
        ('Sum of pre.length && post.length must be <= N, was ' + (pre.length + post.length));
      if (!(tn = this._pathTo(pre))) {
        if (!RiTa().SILENT) console.warn('Unable to find nodes in pre: ' + pre);
        return;
      }
      const nexts = tn.childNodes();
      for (let i = 0; i < nexts.length; i++) {
        let atest = pre.slice(0);
        atest.push(nexts[i].token, ...post);
        if (this._pathTo(atest)) result.push(nexts[i].token);
      }
    } else { // fill the end
      const pr = this.probabilities(pre);
      result = Object.keys(pr).sort((a, b) => pr[b] - pr[a]);
    }
    return result;
  }

  /* return an object mapping {string -> prob} */
  probabilities(path, temp) {
    if (!Array.isArray(path)) path = this.tokenize(path);
    const probs = {};
    const parent = this._pathTo(path);
    if (parent) {
      const children = parent.childNodes();
      const weights = children.map(n => n.count);
      const pdist = RiMarkov.parent.randomizer.ndist(weights, temp);
      children.forEach((c, i) => probs[c.token] = pdist[i]);
    }
    return probs;
  }

  probability(data) {
    let p = 0;
    if (data && data.length) {
      let tn = (typeof data === 'string') ?
        this.root.child(data) : this._pathTo(data);
      if (tn) p = tn.nodeProb(true); // no meta
    }
    return p;
  }

  toString(root) {
    root = root || this.root;
    return root.asTree().replace(/{}/g, '');
  }

  size() {
    return this.root.childCount();
  }

  ////////////////////////////// end API ////////////////////////////////

  _selectNext(parent, temp, tokens) {

    // basic case: just prob. select from children
    if (!this.mlm || this.mlm > tokens.length) {
      return parent.pselect();
    }

    const validateMlms = (word, nodes) => {
      let check = nodes.slice().map(n => n.token);
      check.push(word.token); // string
      return !isSubArray(check.slice(-(this.mlm + 1)), this.input);
    }

    const rand = RiMarkov.parent.randomizer;
    const children = parent.childNodes();
    const weights = children.map(n => n.count);
    const pdist = rand.ndist(weights, temp);
    const tries = children.length * 2;
    const selector = rand.random();

    // loop 2x here as selector may skip earlier nodes
    for (let i = 0, pTotal = 0; i < tries; i++) {
      let idx = i % children.length;
      pTotal += pdist[idx];
      let next = children[idx];
      if (selector < pTotal && validateMlms(next, tokens)) {
        return next;
      }
    }
    return undefined;
  }

  _initSentence(initWith, root) {

    root = root || this.root;

    let tokens = [root.child(RiMarkov.SS).pselect()];
    if (initWith) {
      tokens = [];
      let st = this._pathTo(initWith, root);
      if (!st) return false; // fail
      while (!st.isRoot()) {
        tokens.unshift(st);
        st = st.parent;
      }
    }
    return tokens;
  }

  /*
   * Follows 'path' (using only the last n-1 tokens) from root and returns
   * the node for the last element if it exists, otherwise undefined
   * @param  {string[]} path
   * @param  {node} root of tree to search
   * @return {Node} or undefined
   */
  _pathTo(path, root) {
    root = root || this.root;
    if (!path || !path.length || this.n < 2) return root;
    let idx = Math.max(0, path.length - (this.n - 1));
    let node = root.child(path[idx++]);
    for (let i = idx; i < path.length; i++) {
      if (node) node = node.child(path[i]);
    }
    return node; // can be undefined
  }

  /* add tokens to tree */
  treeify(tokens) {
    let root = this.root;
    for (let i = 0; i < tokens.length; i++) {
      let node = root,
        words = tokens.slice(i, i + this.n);
      for (let j = 0; j < words.length; j++) {
        if (words[j]) {
          node = node.addChild(words[j]);
        }
      }
    }
  }

  /* create a sentence string from an array of nodes */
  _flatten(nodes) {
    if (!nodes || !nodes.length) return '';
    if (nodes.token) return nodes.token; // single-node
    return this.untokenize(nodes.map(n => n.token));
  }

  _logError(tries, toks, msg) {
    this.trace && console.log(tries + ' FAIL' +
      (msg ? '(' + msg + ')' : '') + ': ' + this._flatten(toks));
  }
}

RiMarkov.SS = '<s>';
RiMarkov.SE = '</s>';

class Node {

  constructor(parent, word, count) {
    this.children = {};
    this.parent = parent;
    this.token = word;
    this.count = count || 0;
    this.numChildren = -1; // for cache
  }

  // Find a (direct) child node with matching token, given a word or node
  child(word) {
    let lookup = word;
    if (word.token) lookup = word.token;
    return this.children[lookup];
  }

  pselect() {
    const rand = RiMarkov.parent.randomizer;
    const children = this.childNodes();
    const weights = children.map(n => n.count);
    const pdist = rand.ndist(weights);
    return children[ rand.pselect(pdist) ];
  }

  isLeaf() { return this.childCount() < 1; }

  isRoot() { return !this.parent; }

  childNodes(sort) {
    let kids = Object.values(this.children);
    sort && kids.sort((a, b) => b.count !== a.count
      ? b.count - a.count
      : b.token.localeCompare(a.token));
    return kids;
  }

  childCount(excludeMetaTags) {
    if (this.numChildren === -1) {
      let sum = 0; // a sort of cache
      for (let k in this.children) {
        if (excludeMetaTags && (k === RiMarkov.SS || k === RiMarkov.SE)) {
          continue;
        }
        sum += this.children[k].count;
      }
      this.numChildren = sum;
    }
    //console.log(this.token+' '+this.numChildren);
    return this.numChildren;
  }

  nodeProb(excludeMetaTags) {
    if (!this.parent) throw Error('no parent');
    return this.count / this.parent.childCount(excludeMetaTags);
  }

  // Increments count for a child node and returns it
  addChild(word, count) {
    this.numChildren = -1; // invalidate cache
    count = count || 1;
    let node = this.children[word];
    if (!node) {
      node = new Node(this, word);
      this.children[word] = node;
    }
    node.count += count;
    return node;
  }

  toString() { // TODO: add opt to skip SE/SS
    return this.parent ? this.token + '(' + this.count +
      '/' + this.nodeProb().toFixed(3) + '%)' : 'Root'
  }

  asTree(sort) {
    let s = this.token + ' ';
    if (this.parent) s += '(' + this.count + ')->';
    s += '{';
    return this.childCount() ? stringulate(this, s, 1, sort) : s + '}';
  }
}

// --------------------------------------------------------------

function stringulate(mn, str, depth, sort) {

  sort = sort || false;
  let l = mn.childNodes(true), indent = '\n';
  if (!l.length) return str;
  for (let j = 0; j < depth; j++) indent += "  ";
  for (let i = 0; i < l.length; i++) {
    let node = l[i];
    if (node && node.token) {
      str += indent + "'" + encode(node.token) + "'";
      if (!node.isRoot()) str += " [" + node.count
        + ",p=" + node.nodeProb().toFixed(3) + "]";
      if (!node.isLeaf()) str += '  {';
      str = mn.childCount() ? stringulate(node, str, depth + 1, sort) : str + '}';
    }
  }
  indent = '\n';
  for (let j = 0; j < depth - 1; j++) indent += "  ";
  return str + indent + "}";
}

function encode(tok) {
  if (tok === '\n') tok = '\\n';
  if (tok === '\r') tok = '\\r';
  if (tok === '\t') tok = '\\t';
  if (tok === '\r\n') tok = '\\r\\n';
  return tok;
}

function populate(objNode, jsonNode) {
  if (!jsonNode) return;
  let children = Object.values(jsonNode.children);
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    let newNode = objNode.addChild(child.token, child.count);
    populate(newNode, child); // recurse
  }
}

function RiTa() { return RiMarkov.parent; }

function throwError(tries, oks) {
  throw Error('\nFailed after ' + tries + ' tries'
    + (oks ? ' and ' + oks.length + ' successes' : '')
    + ', you may need to adjust options or add more text:\n');
}

function isSubArray(find, arr) {
  if (!arr || !arr.length) return false;
  OUT: for (let i = find.length - 1; i < arr.length; i++) {
    for (let j = 0; j < find.length; j++) {
      if (find[find.length - j - 1] !== arr[i - j]) continue OUT;
      if (j === find.length - 1) return true;
    }
  }
  return false;
}

const MULTI_SP_RE = / +/g;

export default RiMarkov;