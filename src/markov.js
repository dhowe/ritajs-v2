import { parse, stringify/*  fromJSON, toJSON */ } from 'flatted';

class RiMarkov {

  constructor(n, opts = {}) {

    this.n = n;
    this.root = new Node(null, 'ROOT');

    this.trace = opts.trace;
    this.mlm = opts.maxLengthMatch;
    this.maxAttempts = opts.maxAttempts || 99;// TODO: replace 999 

    this.tokenize = opts.tokenize || RiTa().tokenize;
    this.untokenize = opts.untokenize || RiTa().untokenize;
    this.disableInputChecks = opts.disableInputChecks;

    //this.endSentencePattern = '[.?!]';
    //this.sentenceEnds = '[.?!]';//['.', '?', '!'];
    this.sentenceStarts = []; // allow duplicates
    this.sentenceEnds = new Set(); // no duplicates    

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
      count = null;
    }

    this.trace = 1; // REMOVE

    const self = this;
    const seed = opts.seed;
    const num = count || 1;
    const strict = opts.strict;
    const temp = opts.temperature;
    const minLength = opts.minLength || 5;
    const maxLength = opts.maxLength || 35;

    let tries = 0, result = [], tokens;
    let usedStarts = [];

    const fail = (msg) => {
      tries++;

      console.error('Fail:', msg, '\n  ->' + self._flatten(tokens),
        '#' + tries + ' tries', '#' + result.length + ' successes');

      if (++tries >= this.maxAttempts) throwError(tries, result);

      tokens.pop().marked = true;// remove last
      console.log('backtrack1', self._flatten(tokens));
      let parent = this._pathTo(tokens);

      let filter = (cn) => !cn.marked;
      for (let i = 2; i < 100; i++) {

        let options = parent.childNodes({ filter });
        console.log('  "' + parent.token + '" children=[' + options.map(t => t.token)
          + '] all = [' + parent.childNodes().map(t => t.token) + ']');

        if (!options.length) {
          tokens.pop().marked = true;
          if (tokens.length === 0) {
            console.log('BACK AT START');
            // TODO: unmark everything here ??
            selectStart();
            console.log('NEW SEED: ' + self._flatten(tokens));
            break;
          }
          parent = this._pathTo(tokens);
          console.log('backtrack' + i, self._flatten(tokens));

        }
        else {
          let next = self._selectNext(parent, temp, tokens, filter);
          tokens.push(next);
          console.log('hit\n' + tokens.length, next.token);
          break;
        }
      }
    }

    const success = (sent) => {
      result.push(sent);
      console.log('OK* (' + result.length + ')', sent, '\n');
    }

    const selectStart = () => {

      //console.log('selectStart', self._flatten(toks));
      if (tokens.length) { // Needed?
        let parent = this._pathTo(tokens); // end of last sentence ?
        if (!parent || parent.isLeaf()) {
          fail('input-end2');
          return;
        }
      }

      let needed = (this.n - 1) * 2;
      for (let i = 0; tokens.length < needed && i < 100; i++) {

        if (!tokens.length) {
          let goodStarts = this.sentenceStarts.filter(ss => !usedStarts.includes(ss));
          if (!goodStarts.length) throw Error('No more starts to try');
          let start = RiTa().random(goodStarts);
          console.log('START:', start);
          tokens.push(this.root.child(start));
          usedStarts.push(start);
        }

        let next, parent = this._pathTo(tokens);

        // is it a sentence-end (if so, we need a start)
        if (this.sentenceEnds.has(parent.token)) {
          next = this._selectNext(parent, opts.temperature, tokens,
            child => this.sentenceStarts.includes(child.token));
        }
        else { // otherwise pick from all children
          next = this._selectNext(parent, opts.temperature, tokens);
        }
        tokens.push(next);
        //console.log('added "'+next.token+'"');
      }
      return tokens;
    }

    if (seed) {
      tokens = this.createSeed(seed, opts);
      if (!tokens) throw Error('No sentence starts with: "' + seed + '"');
    }
    else {
      tokens = [];
      selectStart();
    }

    this.trace && console.log("START: " + this._flatten(tokens));

    while (result.length < num) {

      if (tokens.length >= maxLength) {
        fail('too-long');
        continue;
      }

      let parent = this._pathTo(tokens); // end of last sentence ?
      if (!parent || parent.isLeaf()) {
        fail('input-end1');
        continue;
      }

      let next = this._selectNext(parent, opts.temperature, tokens);
      if (!next) {
        fail('mlm-fail');
        continue; // all children excluded due to mlm
      }

      tokens.push(next);
      console.log(tokens.length, next.token); // print every token

      if (this.sentenceEnds.has(next.token)) {

        if (tokens.length < minLength) {
          fail('too-short');
          continue;
        }

        this.trace && console.log("CHECK? " + this._flatten(tokens));
        if (!this.disableInputChecks && isSubArray(tokens.map(t => t.token), this.input)) {
          fail('in-input');
          continue;
        }

        let sent = this._flatten(tokens);
        if (!opts.allowDuplicates && result.includes(sent)) {
          fail('duplicate');
          continue;
        }

        success(sent);
        //tokens = this.createSeed(0, opts);
        tokens = tokens.slice(-(this.n - 1));
        selectStart();
        console.log('START(' + result.length + '):', this._flatten(tokens));

        //throw Error('DONE: ' + this._flatten(tmp2));
        //TODO: call createSeed from previous sentence
      }
    }

    // TODO: unmark everything

    return result;
  }


  /*
   * Returns n-1 nodes from a seed (string or string[]) or a sentence-start
   */
  createSeed(seed, opts = {}) {

    if (typeof seed === 'undefined') throw Error('seed required');
    if (typeof seed === 'string') seed = this.tokenize(seed);

    let tokens = [];
    /*     if (!seed) {
    
          // TODO: need to mark these in generate
          let node = RiTa().random(this.sentenceStarts);
          tokens.push(this.root.child(node));
          //console.log('path-no-seed:', this._flatten(tokens));
        }
        else { */
    let node = this._pathTo(seed, this.root);
    while (!node.isRoot()) {
      tokens.unshift(node);
      node = node.parent;
    }
    //console.log('path-seed:', this._flatten(tokens));
    //}

    let tries = 0;
    while (tokens.length < this.n - 1 && ++tries < 100) {
      let parent = this._pathTo(tokens);
      let next = this._selectNext(parent, opts.temperature, tokens);
      tokens.push(next);
    }

    return tokens;
  }


  generateX(count, opts = {}) {

    if (arguments.length === 1 && typeof count === 'object') {
      opts = count;
      count = null;
    }

    const self = this;
    const num = count || 1;
    const strict = opts.strict;
    const minLength = opts.minLength || 5;
    const maxLength = opts.maxLength || 35;
    let seed = opts.seed || opts.startTokens; // startTokens is deprecated
    let tokens, tries = 0, cursor = 0, softFails, hardFails, result = [];

    // store only tokens (is this still correct?)
    // cursor (start=0) is where we have generated to successfully
    // on fail we splice back to cursor and retry
    // on hard=fail we clear tokens and set cursor = 0 (use history?)
    // on success: update cursor, add sent to result
    // if (result.length === num) return;

    let fail = (msg) => { // TODO: fix, this is awful

      tries++;
      softFails = softFails || {};
      hardFails = hardFails || {};

      //toks = (toks || tokens).slice(cursor);

      let toks = tokens.slice(cursor);

      this.trace && console.log('FAIL#' + tries
        + (msg ? ' (' + msg + ')' : '') + ': "'
        + this._flatten(toks) + '" cursor=' + cursor);

      if (tries >= this.maxAttempts) throwError(tries, result);
      //console.log('LAST: ', tokens[tokens.length - 1].token);

      // fail() CASES: 
      // result=0: hard restart
      // result>0: 
      // if numFails < 5: 
      //   refresh, same first word
      // if numFails > 5
      //   refresh, new first word
      //   if strict then hard-restart

      let reset = function () {
        cursor = 0;
        let num = result.length;
        result = []; // clear results
        softFails = {}; // clear fails
        hardFails = {};
        self.trace && console.log('RESET #' + tries + ' (with ' + num + ' results)\n');
        tokens = self._initSentence(seed);
        return 1;
      }

      if (!result.length || msg.startsWith('at-input-end')) { // TMP HACK
        return reset(self);
      }

      let failFlat = this._flatten(toks);
      if (!softFails.hasOwnProperty(failFlat)) softFails[failFlat] = 0;
      if (!hardFails.hasOwnProperty(failFlat)) hardFails[failFlat] = 0;

      if (++softFails[failFlat] < 5) { // less than 5 numFails

        tokens = tokens.slice(0, cursor + 1);
        this.trace && console.log('SOFT-REFRESH(keep first word='
          + tokens[tokens.length - 1].token + ') numFails='
          + softFails[failFlat] + ' tries=' + tries);
        return 1;
      }
      else {
        this.trace && console.log('5 soft-fails ****')
      }

      if (++hardFails[failFlat] < 5) {  // >= 5 numFails
        softFails[failFlat] = 0;
        tokens = tokens.slice(0, cursor);
        this.trace && console.log('HARD-REFRESH (new first word) numFails=' + hardFails[failFlat] + ' tries=' + tries);
        return 1;
      }
      else {
        this.trace && console.log('numFails=' + hardFails[failFlat] + ' tries=' + tries + ' strict=' + strict);
        return reset(this); // > 5 
      }

      return 1;

    } // end fail

    let success = (sent) => {
      cursor = tokens.length;
      result.push(sent);
      self.trace && console.log('OK* (' + result.length + ')', sent, '\n');
    }

    if (typeof seed === 'string') seed = this.tokenize(seed);

    while (result.length < num) {

      tokens = tokens || this._initSentence(seed);
      if (!tokens) throw Error('No sentence starts with: "' + seed + '"');

      let numWords = tokens.length - cursor;
      while (numWords < maxLength) {

        let parent = this._pathTo(tokens); // end of last sentence ?
        if ((!parent || parent.isLeaf()) && fail('at-input-end("' + this._flatten(tokens) + '")')) break;

        let next = this._selectNext(parent, opts.temperature, tokens);
        if (!next) {
          fail('mlm: "' + this._flatten(tokens) + '"');
          break; // possible if all children excluded due to mlm
        }

        tokens.push(next);
        if (!numWords) this.trace && console.log('\nSTART "' + this._flatten(tokens[tokens.length - 1]) + '"');
        numWords = tokens.length - cursor;

        //console.log(numWords, next.token); // print every token

        if (this.sentenceEnds.has(next.token)) { // sentence-end

          if (numWords < minLength) {
            fail('too short'); break;
          }

          let sentokens = tokens.slice(cursor);
          let rawtoks = sentokens.map(t => t.token); // to string array
          this.trace && console.log("CHECK? " + this._flatten(sentokens));

          if (!this.disableInputChecks && isSubArray(rawtoks, this.input)) {
            fail('in input');
            break;
          }

          let sent = this._flatten(sentokens);
          if (!opts.allowDuplicates && result.includes(sent) && fail('duplicate')) break;
          success(sent);
          break;
        }
      }

      if (tokens) {
        numWords = tokens.length - cursor;
        if (numWords >= maxLength) {
          fail('too long');
        }
      }
    }

    return (typeof count === 'number') ? result : result[0];
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

  _selectNext(parent, temp, tokens, filter) {

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
    const weights = children.map(n => n.count);
    const pdist = rand.ndist(weights, temp);
    const tries = children.length * 2;
    const selector = rand.random();

    /* console.log('selectNext:'+
      this._flatten(tokens.slice(this.cursor, tokens.length)), 
      children.length, this._flatten(children)); */

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
   * @param  {string[]} path
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
    //console.log('_pathTo(' + RiTa().untokenize(path) + ') => '+(node ? node.token : 'undefined'));
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
      throw Error('no eligible child for ' + this.token
        + " [" + this.childNodes().map(t => t.token) + "]");
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