import { parse, stringify } from 'flatted';

// TODO: unmarking of nodes
class RiMarkov {

  // MUST SAVE: dup-check code 
  constructor(n, opts = {}) {

    this.trace = true;// opts.trace;  // TODO: replace

    this.n = n;
    this.root = new Node(null, 'ROOT');
    this.mlm = opts.maxLengthMatch;
    this.maxAttempts = opts.maxAttempts || 999;
    this.tokenize = opts.tokenize || RiTa().tokenize;
    this.untokenize = opts.untokenize || RiTa().untokenize;
    this.disableInputChecks = opts.disableInputChecks;
    this.sentenceStarts = []; // allow duplicates for prob
    this.sentenceEnds = new Set(); // no duplicates    
    this.leaves = [];

    if (this.n < 2) throw Error('minimum N is 2');

    if (this.mlm && this.mlm < this.n) throw Error('maxLengthMatch must be >= N');

    // we store inputs to verify we don't duplicate sentences
    if (!this.disableInputChecks || this.mlm) this.input = [];

    // add text if supplied as opt SYNC:
    if (opts.text) this.addText(opts.text);
  }

  addText(text, multiplier = 1) {

    let sents = Array.isArray(text) ? text : RiTa().sentences(text);

    // add new tokens for each sentence start/end
    let wrap, allWords = [];
    for (let k = 0; k < multiplier; k++) {
      for (let i = 0; i < sents.length; i++) {
        let words = this.tokenize(sents[i]);
        //if (i === 0) wrap = words.slice(0, this.n - 1);  // wraparound
        this.sentenceStarts.push(words[0]);
        this.sentenceEnds.add(words[words.length - 1]);
        allWords.push(...words);
      }
      //allWords.push(...wrap);
      this.treeify(allWords);
    }

    if (!this.disableInputChecks || this.mlm) {
      for (let i = 0; i < allWords.length; i++) {
        this.input.push(allWords[i]);
      }
    }

    //this.sentenceStarts.forEach(ss => console.log(ss, this.root.child(ss).count));
  }

  isEnd(node) {
    if (node) {
      let check = node;
      if ('token' in node) check = node.token;
      return this.sentenceEnds.has(node.token);
    }
    return false;
  }

  generate(count, opts = {}) {

    if (arguments.length === 1 && typeof count === 'object') {
      opts = count;
      count = 1;
    }

    this.trace = 1; // REMOVE

    const num = count || 1;
    const minLength = opts.minLength || 5;
    const maxLength = opts.maxLength || 35;

    let tries = 0, tokens = [], usedStarts = [];
    let minIdx = 0, sentenceIdxs = [];

    const notMarked = (cn) => {
      let tmap = tokens.reduce((acc, e) => acc + e.token, '');
      //console.log(cn.token+'.marked=' + cn.marked + ' ?= ' + tmap + ' -> ' + (cn.marked !== tmap));
      return cn.marked !== tmap;
    }

    const resultCount = () => {
      return tokens.filter(t => this.isEnd(t)).length;
    }

    const markNode = (node) => {
      if (node) node.marked = tokens.reduce((acc, e) => acc + e.token, '');
    }

    const validateSentence = (next) => {

      markNode(next);
      let sentIdx = sentenceIdx();
      if (this.trace) console.log(1 + (tokens.length - sentIdx),
        next.token, '[' + next.parent.childNodes().filter
          (t => t !== next).map(t => t.token) + ']'); // print every child
      //this.trace && console.log(1 + (tokens.length - sentIdx) + ' ' + next.token + ' ');
      let sentence = tokens.slice(sentIdx).map(t => t.token);
      sentence.push(next.token);
      this.trace && console.log("CHECK? " + sentence);

      if (sentence.length < minLength) {
        fail('too-short (pop: ' + next.token + ')');
        //console.log('pop: ' + next.token);
        return false;
      }

      if (!this.disableInputChecks && isSubArray(sentence, this.input)) {
        fail('in-input (pop: ' + next.token + ')');
        //console.log('pop: ' + next.token);
        return false;
      }

      let flatSent = this.untokenize(sentence);
      if (!opts.allowDuplicates && isSubArray(sentence, tokens.slice(0, sentIdx))) {
        fail('duplicate (pop: ' + next.token + ')');
        //console.log('pop: ' + next.token);
        return false;
      }

      if (!this.mlm && !this._validateMlms(next, sentence)) {
        throw Error('mlm-fail2 -- should never happen!');
        fail('mlm-fail#2', 0, tokens); // recheck mlm?
        return false;
      }

      tokens.push(next);

      // TMP: remove (shouldnt ever happen with wraparound)
      if (resultCount() < num - 1) {// last.childCount() < 1) {
        //console.log('IS END?', next.token, next.childCount() + " children")
        let parent = this._pathTo(tokens);
        // don't end on input-end, unless this is the last result
        if (!parent || parent.isLeaf()) {
          markNode(tokens.pop());
          throw Error('Unexpected input-end with wraparound');
          fail('input-end'); // wrap?
          return false;
        }
      }

      sentenceIdxs.push(tokens.length);
      if (this.trace) console.log('OK (' + resultCount() + '/' + num + ') "' +
        flatSent + '" sidxs=[' + sentenceIdxs + ']\n');

      return true;
    }

    const fail = (msg, sentence, forceBacktrack) => {
      tries++;
      let sentIdx = sentenceIdx();
      sentence = sentence || this._flatten(tokens.slice(sentIdx));
      if (tries >= this.maxAttempts) throwError(tries, resultCount());
      if (tokens.length >= this.maxAttempts) throwError(tries, resultCount());
      let parent = this._pathTo(tokens);
      let numChildren = parent ? parent.childNodes({ filter: notMarked }).length : 0;
      if (this.trace) console.log('Fail:', msg, '\n  -> "' + sentence + '" ', tries + ' tries, ' + resultCount()
        + ' successes, numChildren=' + numChildren + (forceBacktrack ? ' forceBacktrack*' : (' parent="'
          + parent.token + '" goodKids=[' + parent.childNodes({ filter: notMarked }).map(t => t.token) + ']'
          + '" allKids=[' + parent.childNodes().map(t => t.token) + ']')));
      if (forceBacktrack || numChildren === 0) backtrack();
    }

    // step back until we have a parent with children
    // or we have reached our start
    // if we find an option, return true
    const backtrack = () => {

      let parent, tc;
      //      console.log('backtrack['+tokens[tokens.length-1].childNodes().map(t => token)+']')
      for (let i = 0; i < 500; i++) { // tmp-remove
        let last = tokens.pop();
        markNode(last);

        if (this.isEnd(last)) sentenceIdxs.pop();

        let sentIdx = sentenceIdx();
        let backtrackUntil = Math.max(sentIdx, minIdx);
        if (this.trace) console.log('backtrack#' + tokens.length, 'pop "' + last.token + '" '
          + (tokens.length - sentIdx) + "/" + backtrackUntil + ' ' + this._flatten(tokens));

        parent = this._pathTo(tokens);
        tc = parent.childNodes({ filter: notMarked });

        //if (!result.length) console.log('seed-length:' + seed.length);
        if (tokens.length <= backtrackUntil) {

          /* CASES:
               with seed
                 back at seed
                   if no-children, error,
                   else selectStart
                 at sentence-start
                   if nc, hard-fail
               no seed
                 back at 0, selectStart (fail if nc)
                 at sentence-start
                   if no-children, hard-fail
                   else continue 
          */

          //console.log('tokens.length=' + tokens.length + ' <= minIdx=' + minIdx);


          if (minIdx > 0) { // have seed
            if (tokens.length <= minIdx) { // back at seed
              if (!tc.length) throw Error('back at barren-seed1: case 0');
              if (this.trace) console.log('case 1');
              return true;// createSeed();
            }
            else { // back at sentence-start
              if (!tc.length) {
                if (this.trace) console.log('case 2: back at SENT-START: "'
                  + this._flatten(tokens) + '" sentenceIdxs=' + sentenceIdxs
                  + ' ok=[' + parent.childNodes({ filter: notMarked }).map(t => t.token) + ']'
                  + ' all=[' + parent.childNodes().map(t => t.token) + ']');
                //if (this.trace) console.log('case 2');
                sentenceIdxs.pop();
                console.log('sentenceIdxs=' + sentenceIdxs);
              }
              else {
                if (this.trace) console.log('case 3');
                // continue
              }
            }
          }
          else {
            if (this.trace) console.log('cases 4: back at start of sentence or 0: ' + tokens.length, sentenceIdxs); // NEXT:
            if (!tokens.length) sentenceIdxs = [];
            //sentenceIdxs = [];
          }

          return tokens.length ? true : selectStart();
        }

        if (tc.length) {
          sentIdx = sentenceIdx();
          if (this.trace) console.log((tokens.length - sentIdx) + ' ' + this._flatten(tokens)
            + '\n  ok=[' + tc.map(t => t.token) + '] all=['
            + parent.childNodes({ filter: notMarked }).map(t => t.token) + ']');
          return parent;
        }
      }
      throw Error('Invalid state in backtrack() [' + tokens.map(t => t.token) + ']');
    }

    const sentenceIdx = () => {
      return sentenceIdxs.length ? sentenceIdxs[sentenceIdxs.length - 1] : 0;
    }

    const selectStart = () => {

      let seed = opts.seed;
      if (seed && seed.length) {
        if (typeof seed === 'string') seed = this.tokenize(seed);
        let node = this._pathTo(seed, this.root);
        while (!node.isRoot()) {
          tokens.unshift(node);
          node = node.parent;
        }
        console.log('seed: ' + this._flatten(tokens));
      }

      // we need a new sentence-start
      else if (!tokens.length || this.isEnd(tokens[tokens.length - 1])) {
        let usableStarts = this.sentenceStarts.filter(ss => notMarked(this.root.child(ss)));
        console.log('usablePre: ' + JSON.stringify(usableStarts))
        if (!usableStarts.length) throw Error('No valid sentence-starts remaining');
        let start = RiTa().random(usableStarts);
        let startTok = this.root.child(start);
        console.log('prestart: ' + startTok.marked);
        markNode(startTok);
        console.log('poststart: "' + startTok.marked + '"');
        usableStarts = this.sentenceStarts.filter(ss => notMarked(this.root.child(ss)));
        tokens.push(startTok);
        if (this.trace) console.log(tokens.length + ' ' + start, '\nusablePost: ' + JSON.stringify(usableStarts));
        //usedStarts.push(start);
      }
      else {
        throw Error('Invalid call to selectStart: ' + this._flatten(tokens));
      }
    }

    /*     if (seed && seed.length) { // move to selectStart
          //createSeed(seed);
          theSeed
        
        }
        else { */
    selectStart();
    //}

    while (resultCount() < num) {

      let sentIdx = sentenceIdx();
      //console.log('LEN? '+(tokens.length - sentIdx) + ' <= ' + maxLength)
      if (tokens.length - sentIdx >= maxLength) {
        fail('too-long', 0, true);
        continue;
      }

      let parent = this._pathTo(tokens);
      let next = this._selectNext(parent, opts.temperature, tokens, notMarked);

      if (!next) { // no valid children, pop and continue;
        //tokens.pop();
        fail('mlm-fail('+this.mlm+')', /*was: 0*/ this._flatten(tokens), true);
        continue;
      }

      if (this.isEnd(next)) {
        validateSentence(next);
        continue;
      }

      tokens.push(next);
      if (this.trace) console.log(tokens.length - sentIdx, next.token, '['
        + parent.childNodes({ filter: notMarked }).filter
          (t => t !== next).map(t => t.token) + ']'); // print every unmarked child
    }

    this.leaves.forEach(l => l.marked = false); // clear our marks
    let str = this.untokenize(tokens.map(t => t.token));
    return num > 1 ? this._splitEnds(str) : str;
  }


  toJSON() {
    //console.log('  toJSON() ', Object.keys(this));
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
    return this.leaves.filter(t => !t.hidden).length;
    //Math.max(0, this.leaves.length - (this.n - 1)); 
  }

  ////////////////////////////// end API ////////////////////////////////

  _validateMlms(word, nodes) {
    if (!nodes.length) return true;
    let check = nodes.slice(-this.mlm);
    if (check[0].hasOwnProperty('token')) {
      check = check.map(n => n.token);
    }
    check.push(word.token);
    return !isSubArray(check, this.input);
  }

  // selects child based on temp, filter and probability (throws)
  _selectNext(parent, temp, tokens, filter) {

    if (!parent) throw Error('no parent:' + this._flatten(tokens));

    let children = parent.childNodes({ filter });
    if (!children.length) {
      if (this.trace) console.log('No children to select, parent=' + parent.token
        + ' children=ok[], all=[' + parent.childNodes().map(t => t.token) + ']');
      return;
    }

    // basic case: just prob. select from children
    if (!this.mlm || this.mlm > tokens.length) {
      return parent.pselect(filter);
    }

    /*const validateMlms = (word, nodes) => {
      let check = nodes.slice(-this.mlm).map(n => n.token);
      check.push(word.token);
      return!isSubArray(check, this.input);
    }*/

    const rand = RiMarkov.parent.randomizer;
    const weights = children.map(n => n.count);
    const pdist = rand.ndist(weights, temp);
    const tries = children.length * 2;
    const selector = rand.random();

    // loop 2x here as we may skip earlier nodes
    // but keep track of tries to avoid dups
    const tried = [];
    for (let i = 0, pTotal = 0; i < tries; i++) {
      let idx = i % children.length;
      pTotal += pdist[idx];
      let next = children[idx];
      //console.log('  try#' + idx + ': ' + next.token);
      if (selector < pTotal) {
        if (!tried.includes(next.token)) {
          tried.push(next.token);
          if (this._validateMlms(next, tokens)) {
            return next;
          }
          else {
            //if (this.trace) console.log('backtrack?'); // tmp: remove
            return false;
          }
        }
      }
    }
    /* throw Error('No valid children(mlm=' + this.mlm + ') for "'
      + parent.token + '" in "' + this._flatten(tokens) + '"'); */
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
      let node = root;
      let words = tokens.slice(i, i + this.n);
      /* let diff = this.n - words.length;
      for (let w = 0; w < diff; w++) {
        words.push
      } */
      //console.log('noding='+words.length);
      let wrap = 0;
      for (let j = 0; j < this.n; j++) {
        let hidden = false;
        if (j >= words.length) {
          words[j] = tokens[wrap++];
          hidden = true;
        }
        node = node.addChild(words[j]);
        if (hidden) node.hidden = true;
        // keep track of leaves
        if (j === words.length - 1) {
          this.leaves.push(node);
        }
      }
    }
  }


  _splitEnds(str) { // must be a better way
    let se = [...this.sentenceEnds];
    let re = '(' + se.reduce((acc, w) => acc + w + '|', '')
      .slice(0, -1).replace(/[.*+?^${}()[\]\\]/g, '\\$&') + ")";
    let arr = [], parts = str.split(new RegExp(re, 'g'));
    for (let i = 0; i < parts.length; i++) {
      //console.log(i, parts[i]);
      if (!parts[i].length) continue;
      if ((i % 2) === 0) {
        //console.log(i, 'push', parts[i]);
        arr.push(parts[i]);
      }
      else {
        //console.log(i, 'append', parts[i]);
        arr[arr.length - 1] += parts[i];
      }
    }
    return arr;
  }

  /* create a sentence string from an array of nodes */
  _flatten(nodes) {
    if (!nodes || (Array.isArray(nodes) && !nodes.length)) return '';
    if (nodes.token) return nodes.token; // single-node 
    let arr = nodes.map(n => n ? n.token : '[undef]');
    let sent = this.untokenize(arr);
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
      throw Error('No eligible child for "' + this.token
        + "\" children=[" + this.childNodes().map(t => t.token) + "]");
    }
    const weights = children.map(n => n.count);
    const pdist = rand.ndist(weights);
    const idx = rand.pselect(pdist);
    return children[idx];
  }

  isLeaf(ignoreHidden) { return this.childCount(ignoreHidden) < 1; }

  isRoot() { return !this.parent; }

  childNodes(opts) {
    let sort = opts && opts.sort;
    let filter = opts && opts.filter;
    let kids = Object.values(this.children);
    if (filter) kids = kids.filter(filter);
    if (sort) kids.sort((a, b) => b.count !== a.count
      ? b.count - a.count
      : b.token.localeCompare(a.token));
    return kids;
  }

  childCount(ignoreHidden) {
    if (this.numChildren === -1) {
      let opts = {};
      if (ignoreHidden) opts.filter = (t => !t.hidden);
      this.numChildren = this.childNodes(opts)
        .reduce((a, c) => a + c.count, 0);
    }
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

  asTree(sort, showHiddenNodes) {
    let s = this.token + ' ';
    if (this.parent) s += '(' + this.count + ')->';
    s += '{';
    return this.childCount(true) ? stringulate(this, s, 1, sort, !showHiddenNodes) : s + '}';
  }
}

// --------------------------------------------------------------

function stringulate(mn, str, depth, sort, ignoreHidden) {

  sort = sort || false;
  let indent = '\n';
  let l = mn.childNodes({ sort: true, filter: t => !t.hidden });
  if (!l.length) return str;
  for (let j = 0; j < depth; j++) indent += "  ";
  for (let i = 0; i < l.length; i++) {
    let node = l[i];
    if (node && node.token) {
      str += indent + "'" + encode(node.token) + "'";
      if (!node.isRoot()) str += " [" + node.count
        + ",p=" + node.nodeProb().toFixed(3) + "]";
      if (!node.isLeaf(ignoreHidden)) {
        //console.log('appending "{" for '+node.token, node.childNodes());
        str += '  {';
      }
      str = mn.childCount(ignoreHidden) ? stringulate(node, str, depth + 1, sort) : str + '}';
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
    + (oks ? ' and ' + oks + ' successes' : '')
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