const { parse, stringify } = require('flatted/cjs');

// TODO: async methods

/**
  API:
    toJson
    Markov.fromJson
    addText()
    addSentences()
    generate()
    completions()
    probability()
    probabilities()
    toString()
    size()
 */
class Markov {

  constructor(n, opts) {
    this.n = n;
    this.root = new Node(null, 'ROOT');

    // options
    this.trace = opts && opts.trace;
    this.mlm = opts && opts.maxLengthMatch;
    this.logDuplicates = opts && opts.logDuplicates;
    this.optimiseMemory = opts && opts.optimiseMemory;
    this.maxAttempts = opts && opts.maxAttempts || 99;
    this.discardInputs = opts && opts.disableInputChecks;

    if (this.mlm && this.mlm <= this.n) throw Error
      ('maxLengthMatch argument must be > N')

    // we store inputs to verify we don't duplicate sentences
    if (!this.discardInputs || this.mlm) this.input = [];
  }

  toJSON() {
    return stringify(Object.keys(this).reduce(
      (acc, k) => Object.assign(acc, { [k]: this[k] }), {}));
  }

  static fromJSON(json) {
    // parse the json and merge with new object
    let rm = Object.assign(new Markov(), parse(json));
    
    // handle json converting undefined [] to empty []
    if (!json.input) rm.input = undefined;

    // then recreate the n-gram tree with Node objects
    let jsonRoot = rm.root;
    populate(rm.root = new Node(null, 'ROOT'), jsonRoot);
    return rm;
  }

  addText(text) {
    if (Array.isArray(text)) throw Error
      ('addText() was expecting a text string');
    return this.addSentences(RiTa().sentences(text));
  }

  addSentences(sentences) {

    if (!Array.isArray(sentences)) throw Error
      ('addSentences() expects an array of sentences')

    // add new tokens for each sentence start/end
    let tokens = [];
    for (let i = 0; i < sentences.length; i++) {
      let sentence = sentences[i].replace(/\s+/, ' ').trim();
      let words = RiTa().tokenize(sentence);
      tokens.push(Markov.SS, ...words, Markov.SE);
    }
    this._treeify(tokens);

    // TODO: deal with sentence checking
    if (!this.discardInputs || this.mlm) this.input.push(...tokens);
  }

  generate(opts) {
    let count = opts && opts.count || 1;
    let result = this.generateSentences(count, opts);
    return (count === 1) ? result[0] : result;
  }

  generateSentences(num, { minLength = 5, maxLength = 35, startTokens, allowDuplicates, temperature = 0 } = {}) {

    let result = [], tokens, tries = 0, fail = (msg) => {
      this._logError(++tries, tokens, msg);
      if (tries >= this.maxAttempts) throwError(tries);
      tokens = undefined;
      return 1;
    }

    if (typeof startTokens === 'string') startTokens = RiTa().tokenize(startTokens);

    while (result.length < num) {

      tokens = tokens || this._initSentence(startTokens);
      if (!tokens) throw Error('No sentence starts with: "' + startTokens + '"');

      while (tokens && tokens.length < maxLength) {

        let parent = this._pathTo(tokens);
        if ((!parent || parent.isLeaf()) && fail('no parent')) break;

        let next = this._selectNext(parent, temperature, tokens);
        if (!next && fail('no next')) break; // possible if all children excluded

        tokens.push(next);
        if (next.token === Markov.SE) {

          tokens.pop();
          if (tokens.length >= minLength) {
            let rawtoks = tokens.map(t => t.token);

            // TODO: do we need this if checking mlm with each word?
            if (isSubArray(rawtoks, this.input) && fail('in input')) break;

            let sent = this._flatten(tokens);
            if (!allowDuplicates && result.includes(sent) && fail('is dup')) break;
            this.trace && console.log('-- GOOD', sent.replace(/ +/g, ' '));
            result.push(sent.replace(/ +/g, ' '));
            break;
          }
          if (fail('too short')) break;
        }
      }
      if (tokens && tokens.length >= maxLength) fail('too long');
    }
    return result;
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

      let nexts = tn.childNodes();
      for (let i = 0; i < nexts.length; i++) {

        let atest = pre.slice(0);
        atest.push(nexts[i].token, ...post);
        if (this._pathTo(atest)) result.push(nexts[i].token);
      }

      return result;

    } else { // fill the end

      let pr = this.probabilities(pre);
      return Object.keys(pr).sort((a, b) => pr[b] - pr[a]);
    }
  }

  /* return an object mapping {string -> prob} */
  probabilities(path, temp) {
    if (!Array.isArray(path)) path = RiTa().tokenize(path);
    const rand = Markov.parent.randomizer;
    const probs = {};
    const parent = this._pathTo(path);
    if (!parent) return probs;
    const children = parent.childNodes();
    const weights = children.map(n => n.count);
    const pdist = rand.ndist(weights, temp);
    for (let i = 0; i < children.length; i++) {
      let token = children[i].token;
      probs[token] = pdist[i];
    }
    return probs;
  }

  probability(data) {
    let p = 0;
    let excludeMetaTags = true;
    if (data && data.length) {
      let tn = (typeof data === 'string') ?
        this.root.child(data) : this._pathTo(data);
      if (tn) p = tn.nodeProb(excludeMetaTags);
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

    const rand = Markov.parent.randomizer;
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

/*   _selectNextOrig(parent, temp, tokens) {

    let pTotal = 0, selector = Markov.parent.randomizer.random();
    let nodemap = this._computeProbs(parent, temp);
    let nodes = Object.keys(nodemap);
    let tries = nodes.length * 2;

    // loop twice here in case we skip earlier nodes based on probability
    for (let i = 0; i < tries; i++) {
      let idx = i % nodes.length;
      let next = nodes[idx];
      pTotal += nodemap[next];
      if (selector < pTotal) { // should always be true 2nd time through
        // console.log(next.token +' -> ' +nodemap[next] + ' temp='+ temp);
        if (this.mlm && this.mlm <= tokens.length
          && !this._validateMlms(next, tokens)) {
          //console.log('FAIL(i='+i+'/'+(nodes.length)+' mlm=' + this.mlm
          //  + '): ' + this._flatten(tokens) + ' -> ' + next.token);
          continue;
        }
        return parent.children[next];
      }
    }
  } */

  _initSentence(initWith, root) {

    root = root || this.root;

    let tokens;
    if (initWith) {
      tokens = [];
      let st = this._pathTo(initWith, root);
      if (!st) return false; // fail
      while (!st.isRoot()) {
        tokens.unshift(st);
        st = st.parent;
      }
    }
    else { // no start-tokens
      tokens = [root.child(Markov.SS).pselect()];
    }
    return tokens;
  }

  _initTokens(startTokens, root) {

    root = root || this.root;

    let tokens;
    if (startTokens) {

      // a single regexp to match
      if (startTokens instanceof RegExp) {
        let matched = Object.values(root.children).filter(c => startTokens.test(c.token));
        //console.log(this._flatten(matched).split(' '));
        if (!matched.length) throw Error('Unable to match Regex:', startTokens);
        let selector = new Node(null, 'SELECT');
        matched.forEach(m => selector.addChild(m.token, m.count));
        tokens = [selector.pselect()];
      }
      // a path of tokens to match
      else {
        tokens = [];
        let st = this._pathTo(startTokens, root);
        if (!st) return false; // fail
        while (!st.isRoot()) {
          tokens.unshift(st);
          st = st.parent;
        }
      }
    }
    // no start-tokens supplied
    else {
      tokens = [this.root.pselect()];
    }
    return tokens;
  }

  /*   _computeProbs(parent, temp) {
      temp = temp || 0;
      let probs = {};
      let nexts = parent.childNodes();
      for (let i = 0; nexts && i < nexts.length; i++) {
        probs[next[i].token] = next[i].count;
      }
      return probs;
    } */
/* 
  _computeProbs(parent, temp) {
    temp = temp || 0;
    let tprobs, probs = {};
    if (parent) {
      let nexts = parent.childNodes(temp > 0);
      if (temp > 0) tprobs = nexts.map(n => n.nodeProb()).slice().reverse();
      for (let i = 0; nexts && i < nexts.length; i++) {
        let rawProb = nexts[i].nodeProb();
        let prob = tprobs ? lerp(rawProb, tprobs[i], temp) : rawProb;
        if (nexts[i]) probs[nexts[i].token] = prob;
      }
    }
    return probs;
  } */

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
  _treeify(tokens, root) {
    root = root || this.root;
    for (let i = 0; i < tokens.length; i++) {
      let node = root,
        words = tokens.slice(i, i + this.n);
      for (let j = 0; j < words.length; j++) {
        node = node.addChild(words[j]);
      }
    }
  }

  /* create a sentence string from an array of nodes */
  _flatten(nodes) {
    if (!nodes || !nodes.length) return '';
    if (nodes.token) return nodes.token; // single-node
    return RiTa().untokenize(nodes.map(n => n.token));
  }

  _logError(tries, toks, msg) {
    this.trace && console.log(tries + ' FAIL' +
      (msg ? '(' + msg + ')' : '') + ': ' + this._flatten(toks));
  }
}

Markov.SS = '<s>';
Markov.SE = '</s>';

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
    const rand = Markov.parent.randomizer;
    const children = this.childNodes();
    const weights = children.map(n => n.count);
    const pdist = rand.ndist(weights);
    return children[rand.pselect(pdist)];
  }

 /*  pselectOld() {
    let sum = 1, pTotal = 0;
    let nodes = this.childNodes();
    let selector = Markov.parent.randomizer.random() * sum;

    if (!nodes || !nodes.length) throw Error
      ("Invalid arg to pselect(no children) " + this);

    for (let i = 0; i < nodes.length; i++) {

      pTotal += nodes[i].nodeProb();
      if (selector < pTotal) return nodes[i];
    }
  } */

  isLeaf() {
    return this.childCount() < 1;
  }

  isRoot() {
    return !this.parent;
  }

  childNodes(sorted) {
    let kids = Object.values(this.children);
    sorted && kids.sort((a, b) => b.count - a.count);
    return kids;
  }

  childCount(excludeMetaTags) {
    if (this.numChildren === -1) {
      let sum = 0;
      for (let k in this.children) {
        if (excludeMetaTags && (k === Markov.SS || k === Markov.SE)) continue;
        sum += this.children[k].count;
      }
      this.numChildren = sum;
    }
    return this.numChildren;
  }

  nodeProb(excludeMetaTags) {
    if (!this.parent) throw Error('no parent');
    return this.count / this.parent.childCount(excludeMetaTags);
  }

  // Increments count for a child node and returns it
  addChild(word, count) {

    this.numChildren === -1; // invalidate cache

    count = count || 1;
    let node = this.children[word];
    if (!node) {
      node = new Node(this, word);
      this.children[word] = node;
    }

    node.count += count;
    return node;
  }

  toString() {
    return this.parent ? this.token + '(' + this.count +
      '/' + this.nodeProb().toFixed(3) + '%)' : 'Root'
  }

  stringify(mn, str, depth, sort) {

    sort = sort || false;

    let l = [], indent = '\n';

    Object.keys(mn.children).map(k => l.push(mn.children[k]));

    if (!l.length) return str;

    if (sort) l.sort();

    for (let j = 0; j < depth; j++) indent += "  ";

    for (let i = 0; i < l.length; i++) {
      let node = l[i];
      if (node) {
        str += indent + "'" + this._encode(node.token) + "'";
        if (!node.isRoot()) str += " [" + node.count + ",p=" + node.nodeProb().toFixed(3) + "]";
        if (!node.isLeaf()) str += '  {';
        str = this.childCount() ? this.stringify(node, str, depth + 1, sort) : str + '}';
      }
    }

    indent = '\n';
    for (let j = 0; j < depth - 1; j++) indent += "  ";

    return str + indent + "}";
  }

  asTree(sort) {
    let s = this.token + ' ';
    if (this.parent) s += '(' + this.count + ')->';
    s += '{';
    return this.childCount() ? this.stringify(this, s, 1, sort) : s + '}';
  }

  _encode(tok) {
    if (tok === '\n') tok = '\\n';
    if (tok === '\r') tok = '\\r';
    if (tok === '\t') tok = '\\t';
    if (tok === '\r\n') tok = '\\r\\n';
    return tok;
  }
}

// --------------------------------------------------------------

function populate(objNode, jsonNode) {
  if (!jsonNode) return;
  let children = Object.values(jsonNode.children);
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    let newNode = objNode.addChild(child.token, child.count);
    populate(newNode, child); // recurse
  }
}

function RiTa() { return Markov.parent; }

function lerp(start, stop, amt) {
  return amt * (stop - start) + start;
}
/* 
function isWordToken(node) {
  return node.token !== Markov.SS && node.token !== Markov.SE;
} */

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

module && (module.exports = Markov);
