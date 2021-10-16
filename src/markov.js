import { parse, stringify } from 'flatted';

// TODO: unmarking of nodes
class RiMarkov {

  constructor(n, opts = {}) {

    this.n = n;
    this.root = new Node(null, 'ROOT');

    this.trace = true;// opts.trace;  // TODO: replace
    this.mlm = opts.maxLengthMatch;
    this.maxAttempts = opts.maxAttempts || 999;// TODO: replace 999 

    this.tokenize = opts.tokenize || RiTa().tokenize;
    this.untokenize = opts.untokenize || RiTa().untokenize;
    this.disableInputChecks = opts.disableInputChecks;

    this.sentenceStarts = []; // allow duplicates for prob
    this.sentenceEnds = new Set(); // no duplicates    


    if (this.n < 2) {
      throw Error('minimum N is 2');
    }

    if (this.mlm && this.mlm < this.n) {
      throw Error('maxLengthMatch(mlm) must be >= N');
    }

    // we store inputs to verify we don't duplicate sentences
    if (!this.disableInputChecks || this.mlm) this.input = [];

    // add text if supplied as opt SYNC:
    if (opts.text) this.addText(opts.text);
  }

  addText(text, multiplier = 1) {

    let sents = Array.isArray(text) ? text : RiTa().sentences(text);

    // add new tokens for each sentence start/end
    let allWords = [];
    for (let k = 0; k < multiplier; k++) {
      for (let i = 0; i < sents.length; i++) {
        //let sentence = sentences[i].replace(/\s+/, ' ').trim();
        let words = this.tokenize(sents[i]);
        this.sentenceStarts.push(words[0]);
        this.sentenceEnds.add(words[words.length - 1]);
        allWords.push(...words);
      }
      //console.log('treeify: ',JSON.stringify(allWords).replace(/"/g,''));
      this.treeify(allWords);
    }

    if (!this.disableInputChecks || this.mlm) {
      for (let i = 0; i < allWords.length; i++) {
        this.input.push(allWords[i]);
      }
    }
  }

  generate(count, opts = {}) {

    if (arguments.length === 1 && typeof count === 'object') {
      opts = count;
      count = 1;
    }

    this.trace = 1; // REMOVE

    const num = count || 1;
    const seed = opts.seed;
    const strict = opts.strict;
    const temp = opts.temperature;
    const minLength = opts.minLength || 5;
    const maxLength = opts.maxLength || 35;

    let tries = 0, result = [], tokens = [];
    let usedStarts = [], leader = 0;

    const fail = (msg, reset) => {
      tries++;

      console.log('Fail:', msg, '\n  -> "' + this._flatten(tokens) + '" ',
        tries + ' tries, ' + result.length + ' successes');

      if (tries >= this.maxAttempts) throwError(tries, result);

      // don't backtrack onto the seed
      if (!result.length && tokens.length === this.n - 1) {
        console.log('[FORCE]');
        reset = true;
      }

      if (reset) {
        console.log('[RESET]');
        leader = 0;
        tokens = [];
        result = [];
        usedStarts = [];
        selectStart();
        return;
      }

      tokens.pop().marked = true;// remove last
      console.log('[backtrack1]', this._flatten(tokens));
      let parent = this._pathTo(tokens);

      let filter = (cn) => !cn.marked;
      for (let i = tokens.length; i < 100; i++) {

        let children = parent.childNodes({ filter });
        console.log('  "' + parent.token + '" children=[' + children.map(t => t.token)
          + '] all=[' + parent.childNodes().map(t => t.token) + ']');

        if (!children.length) {
          tokens.pop().marked = true;
          if (tokens.length === leader) {
            console.log('BACK AT START');//, this.sentenceStarts.filter
            //(ss => !usedStarts.includes(ss)), usedStarts);
            // TODO: unmark everything here ??
            selectStart();
            //console.log('NEW SEED: ' + this._flatten(tokens));
            break;
          }
          parent = this._pathTo(tokens);
          console.log('[backtrack' + i + ']', this._flatten(tokens));
        }
        else {
          let next = this._selectNext(parent, temp, tokens, filter);
          if (!next) {
            fail('mlm-fail2 *******');
            
            // WORKING HERE: backtracking past leader

            continue; // all children excluded due to mlm
          }

          tokens.push(next);
          console.log(tokens.length - leader, next.token, ' (*hit*)');

          if (this.sentenceEnds.has(next.token)) { // end during backtracking
            let sentence = tokens.slice(leader).map(t => t.token);
            if (validate(sentence)) {
              success(this.untokenize(sentence)); // else fail
            }
          }
          break;
        }
      }
    }

    const validate = (sentence) => {
      this.trace && console.log("CHECK? " + sentence);
      if (sentence.length < minLength) {
        fail('too-short');
        return false;
      }
      if (!this.disableInputChecks && isSubArray(sentence, this.input)) {
        fail('in-input');
        return false;
      }
      if (!opts.allowDuplicates && result.includes(sentence)) {
        fail('duplicate');
        return false;
      }
      let last = this._pathTo(tokens);
      if (result.length < num - 1 && !last.childNodes().length) {
        console.log('IS END?', last.token, last.children)
        // don't end on input-end, unless this is the last result
        fail('end-input', true);
        return false;
      }
      return true;
    }

    const success = (sent) => {
      tokens = tokens.slice(-(this.n - 1)); // keep the last n-1
      leader = tokens.length; // keep track of leading tokens 
      result.push(sent);
      console.log('OK* (' + result.length + ')', sent, '\n');
      if (result.length < num) selectStart();
    }

    const selectStart = () => {

      if (seed && !result.length) { // use seed
        tokens = this.createSeed(seed, opts);
        this.trace && console.log('\nSTART "' + this._flatten(tokens) + '"');
        if (!tokens) throw Error('No sentence starts with: "' + seed + '"');
        return;
      }

      let needed = (this.n - 1) + tokens.length; // need n-1 *new* tokens
      for (let i = 0; tokens.length < needed && i < 100; i++) {

        if (!tokens.length) {
          let goodStarts = this.sentenceStarts.filter(ss => !usedStarts.includes(ss));
          if (!goodStarts.length) throw Error('No more sentence starts to try');
          let start = RiTa().random(goodStarts);
          tokens.push(this.root.child(start));
          usedStarts.push(start);
        }

        let parent = this._pathTo(tokens);
        /*if (!parent.children.length) {
          fail('end-input2',true);
          return;
        } */

        //console.log('parent', parent.token, Object.keys(parent.children));

        let args = [parent, opts.temperature, tokens];
        if (this.sentenceEnds.has(parent.token)) {
          // add filter: if its a sentence-end, then we need a start next
          args.push(child => this.sentenceStarts.includes(child.token));
        }
        let next = this._selectNext(...args)
        tokens.push(next);
        //console.log('added "'+next.token+'"');
      }

      console.log('START(' + result.length + '):', this._flatten(tokens));

      return tokens;
    }

    selectStart();

    while (result.length < num) {

      if (tokens.length - leader >= maxLength) {
        fail('too-long');
        continue;
      }

      let parent = this._pathTo(tokens); // end of last sentence ? remove
      if (!parent || parent.isLeaf()) {
        fail('input-end1');
        continue;
      }

      let next = this._selectNext(parent, opts.temperature, tokens);
      if (!next) {
        fail('mlm-fail1');
        continue; // all children excluded due to mlm
      }

      tokens.push(next);
      console.log(tokens.length - leader, next.token); // print every token

      if (this.sentenceEnds.has(next.token)) {
        let sentence = tokens.slice(leader).map(t => t.token);
        if (validate(sentence)) {
          success(this.untokenize(sentence)); // or fail
        }
      }
    }

    // TODO: unmark everything

    return num > 1 ? result : result[0];
  }


  /*
   * Returns n-1 nodes from a seed (string or string[]) or a sentence-start
   */
  createSeed(seed, opts = {}) { // duplicate code? remove

    if (typeof seed === 'undefined') throw Error('seed required');
    if (typeof seed === 'string') seed = this.tokenize(seed);

    let tokens = [];

    // TODO: allow for longer seeds
    let node = this._pathTo(seed, this.root);
    while (!node.isRoot()) {
      tokens.unshift(node);
      node = node.parent;
    }

    let max = 0;
    while (tokens.length < this.n - 1 && ++max < 100) {
      let parent = this._pathTo(tokens);
      let next = this._selectNext(parent, opts.temperature, tokens);
      tokens.push(next);
    }

    return tokens;
  }

  toJSON() {
    let data = Object.keys(this).reduce
      ((acc, k) => Object.assign(acc, { [k]: this[k] }), {});
    data.sentenceEnds = [...data.sentenceEnds]; // set -> []
    return stringify(data);
  }

  static fromJSON(json) {

    // parse the json and merge with new object
    let parsed = parse(json);
    let rm = Object.assign(new RiMarkov(), parsed);

    // convert our json array back to a set
    rm.sentenceEnds = new Set(...parsed.sentenceEnds);

    // handle json converting undefined [] to empty []
    if (!parsed.input) rm.input = undefined;

    // then recreate the n-gram tree with Node objects
    let jsonRoot = rm.root;
    populate(rm.root = new Node(null, 'ROOT'), jsonRoot);

    return rm;
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

  // selects child based on temp, filter and probability (can throw)
  _selectNext(parent, temp, tokens, filter) {

    if (!parent) throw Error('no parent:' + this._flatten(tokens));

    // basic case: just prob. select from children
    if (!this.mlm || this.mlm > tokens.length) {
      return parent.pselect(filter);
    }

    const validateMlms = (word, nodes) => {
      let check = nodes.slice(-this.mlm).map(n => n.token);
      check.push(word.token);
      let res = !isSubArray(check, this.input);
      //console.log('validateMlms: ' + sub, '->', res);
      return res;
    }

    const rand = RiMarkov.parent.randomizer;
    const children = parent.childNodes({ filter });
    if (!children.length) throw Error('No children for "'
      + parent.token + '" in ' + this._flatten(tokens));
    const weights = children.map(n => n.count);
    const pdist = rand.ndist(weights, temp);
    const tries = children.length * 2;
    const selector = rand.random();

    // loop 2x here as we may skip earlier nodes
    // but keep track of the tries to avoid dups
    const tried = [];
    for (let i = 0, pTotal = 0; i < tries; i++) {
      let idx = i % children.length;
      pTotal += pdist[idx];
      let next = children[idx];
      //console.log('  try#' + idx + ': ' + next.token);
      if (selector < pTotal) {
        if (!tried.includes(next.token)) {
          tried.push(next.token);
          if (validateMlms(next, tokens)) {
            return next;
          }
        }
      }
    }
    /* throw Error('No valid children(mlm=' + this.mlm + ') for "'
      + parent.token + '" in "' + this._flatten(tokens) + '"'); */
  }

  _initSentence(initWith, root) {

    root = root || this.root;

    let tokens = [];
    if (initWith) {
      let st = this._pathTo(initWith, root);
      if (!st) return false; // fail
      while (!st.isRoot()) {
        tokens.unshift(st);
        st = st.parent;
      }
    }
    else {
      let first = RiTa().random(this.sentenceStarts);
      tokens.push(root.child(first));
    }
    this.trace && console.log('\nSTART "' + this._flatten(tokens) + '"');
    return tokens;
  }

  /*
   * Follows 'path' (using only the last n-1 tokens) from root and returns
   * the node for the last element if it exists, otherwise undefined
   * @param  {Node[]} path
   * @param  {node} root of tree to search
   * @return {node} or undefined
   */
  _pathTo(path, root) {
    root = root || this.root;
    if (typeof path === 'string') path = [path];
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
    if (!nodes || (Array.isArray(nodes) && !nodes.length)) return '';
    if (nodes.token) return nodes.token; // single-node 
    let sent = this.untokenize(nodes.map(n => n ? n.token : typeof n));
    return sent.replace(MULTI_SP_RE, ' ');
  }

}

/* RiMarkov.SS = '<s>';
RiMarkov.SE = '</s>'; */

class Node {

  constructor(parent, word, count) {
    this.children = {};
    this.parent = parent;
    this.token = word;
    this.count = count || 0;
    this.numChildren = -1; // for cache
    this.marked = false;
  }

  // Find a (direct) child node with matching token, given a word or node
  child(word) {
    let lookup = word;
    if (word.token) lookup = word.token;
    return this.children[lookup];
  }

  pselect(filter) {
    const rand = RiMarkov.parent.randomizer;
    const children = this.childNodes({ filter });
    if (!children.length) {
      throw Error('No eligible child for ' + this.token
        + " children=[" + this.childNodes().map(t => t.token) + "]");
    }
    const weights = children.map(n => n.count);
    const pdist = rand.ndist(weights);
    const idx = rand.pselect(pdist);
    return children[idx];
  }

  isLeaf() { return this.childCount() < 1; }

  isRoot() { return !this.parent; }

  childNodes(opts = {}) {
    let sort = opts.sort;
    let filter = opts.filter;
    let kids = Object.values(this.children);
    if (filter) {
      kids = kids.filter(filter);
    }
    if (sort) kids.sort((a, b) => b.count !== a.count
      ? b.count - a.count
      : b.token.localeCompare(a.token));
    return kids;
  }

  childCount(/* excludeMetaTags */) {
    if (this.numChildren === -1) {
      let sum = 0; // a sort of cache
      for (let k in this.children) {
        /*   if (excludeMetaTags && (k === RiMarkov.SS || k === RiMarkov.SE)) {
            continue;
          } */
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

  toString() {
    return this.parent ? '\'' + this.token + '\' [' + this.count
      + ',p=' + this.nodeProb().toFixed(3) + ']' : 'Root'
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
  let l = mn.childNodes({ sort: true }), indent = '\n';
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
  throw Error('Failed after ' + tries + ' tries'
    + (oks ? ' and ' + oks.length + ' successes' : '')
    + ', you may need to adjust options or add more text');
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