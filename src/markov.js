
// TODO: should always check original for novel output sentences (link with mlm)
// TODO: async methods
// TODO: Additional methods (see markovify)
//   toJSON -> for saving to disk
//   fromJSON -> for reading from disk
//   add tries argument to generate (default 10?)
//   discardInput: opt to constructor (or part of optimize) [discardInputs]
//   optimiseMemory: dont build inverse tree
//   generateWith (should also apply to tokens?)


/* 'temperature' arg
  2 methods (n = number of elements):
    P[k] = lerp(P[k], [Pn-k], temperature);
    P[k] = P[int(k+t*n)%n], then interpolate between 2 steps
*/

// TODO:
// startTokens can take a regex for first token?

/*
API:
  addText()
  addTokens()
  generate() ?
  generateSentence()
  generateSentences()
  generateToken()
  generateTokens()
  generateUntil()
  generateWith()
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
    this.discardInputs = opts && opts.discardInputs;
    this.logDuplicates = opts && opts.logDuplicates;
    this.optimizeMemory = opts && opts.optimizeMemory;
    this.maxAttempts = opts && opts.maxAttempts || 99;
    this.mlm = opts && opts.maxLengthMatch || 0;

    if (this.mlm <= this.n) throw Error('maxLengthMatch must be < N') 

    // we store inputs to verify we don't duplicate sentences
    if (!this.discardInputs) this.input = [];

    // we use this to in generateWith, to find the path from a 
    // specific terminal, back up the tree to a sentence start
    if (!this.optimizeMemory) this.inverse = new Node(null, 'REV');
  }

  addTokens(tokens) {
    if (!Array.isArray(tokens)) throw Error
      ('addTokens() expects an array of tokens');
    if (this.mode === 'sentences') throw Error
      ('addTokens() cannot be used after addSentences()');
    this.mode = 'tokens';
    this._treeify(tokens);
    this.mlm && this.input.push(...tokens);
  }

  /*async generateSentenceAsync() {
    return this.generateSentence(...arguments);
  }
  async addSentencesAsync() {
    return this.addSentences(...arguments);
  }*/

  addSentences(sentences) {

    if (this.mode === 'tokens') throw Error
      ('addSentences() cannot be used after addTokens()');
    this.mode = 'sentences';

    // split sentences if we have a string
    if (typeof sentences === 'string') {
      sentences = RiTa().sentences(sentences);
    }

    // add new tokens for each sentence start/end
    let tokens = [];
    for (let i = 0; i < sentences.length; i++) {
      let sentence = sentences[i].replace(/\s+/, ' ').trim();
      let words = RiTa().tokenize(sentence);
      tokens.push(Markov.SS, ...words, Markov.SE);
    }

    this._treeify(tokens);

    // create the reverse lookup tree for generateWith
    if (this.inverse) this._treeify
      (tokens.slice().reverse(), this.inverse);

    // TODO: deal with sentence checking
    this.mlm && this.input.push(...tokens);
  }

  generateToken() {
    return this.generateTokens(1, ...arguments)[0];
  }

  generateTokens(num, { startTokens, temperature = 0 } = {}) {
    let tokens, tries = 0, fail = () => {
      this.trace && console.log(tries + 1, 'FAIL: ' + this._flatten(tokens));
      tokens = undefined;
      tries++;
      return 1;
    }

    if (typeof startTokens === 'string') {
      startTokens = RiTa().tokenize(startTokens);
    }
    //console.log('generateTokens',startTokens);

    while (tries < this.maxAttempts) {

      if (!tokens) { // create start sequence
        tokens = this._initTokens(startTokens);
        if (startTokens instanceof RegExp && tokens.length >= num) {
          return [tokens.pop().token]; // return single
        }
        if (!tokens) {
          throw Error('No path starting with: ' + startTokens.slice
            (Math.max(0, startTokens.length - (this.n - 1))));
        }
      }

      // find parent node after path          
      let parent = this._findNode(tokens);
      if ((!parent || parent.isLeaf()) && fail()) {
        this.trace && console.log('FAILED: no parent for nodes');
        continue;
      }

      // pick next node from parent
      let next = this._selectNext(parent, temperature, tokens);
      if (!next && fail()) {
        this.trace && console.log('FAILED: no next for ' + this._flatten(tokens));
        continue; // possible if all children excluded
      }

      let numToks = tokens.push(next);

      // if we are in sentence mode we need to ignore Markov.SS/Markov.SE
      if (this.mode !== 'tokens') numToks = tokens.reduce
        ((acc, t) => acc + (isWordToken(t) ? 1 : 0), 0);

      // if we have enough tokens, we're done
      if (numToks >= num) {
        // if we are in sentence mode we need to ignore Markov.SS/Markov.SE
        if (this.mode !== 'tokens') tokens = tokens.filter(isWordToken);
        //(t => t.token !== Markov.SS && t.token !== Markov.SE);
        return tokens.slice(-num).map(n => n.token);
      }
    }
    throwError(tries);
  }

  generateSentence() {
    return this.generateSentences(1, ...arguments)[0];
  }

  generateSentences(num, { minLength = 5, maxLength = 35, startTokens, allowDuplicates, temperature = 0 } = {}) {
    let result = [], tokens, tries = 0, fail = () => {
      tokens = undefined;
      if (++tries >= this.maxAttempts) throwError(tries);
      return 1;
    }

    if (typeof startTokens === 'string') {
      startTokens = RiTa().tokenize(startTokens);
    }

    while (result.length < num) {

      if (!tokens) {
        tokens = this._initSentence(startTokens);
        if (!tokens) throw Error('No sentence starting with: "' + startTokens + '"');
      }

      while (tokens && tokens.length < maxLength) {

        let parent = this._findNode(tokens);
        if ((!parent || parent.isLeaf()) && fail(tokens)) continue;

        let next = this._selectNext(parent, temperature, tokens);
        if (!next && fail(tokens)) continue; // possible if all children excluded

        tokens.push(next);
        if (next.token === Markov.SE) {
          tokens.pop();
          if (tokens.length >= minLength) {
            let sent = this._flatten(tokens);
            if (allowDuplicates || !result.includes(sent)) {
              result.push(sent.replace(/ +/g, ' '));
              break;
            }
          }
          fail(tokens);
        }
      }
      fail(tokens);
    }
    /*        if (tokens.length >= minLength) {
             if (next.token === Markov.SE) {
               tokens.pop();
               let sent = this._flatten(tokens);
               if (allowDuplicates || !result.includes(sent)) {
                 //fail(tokens); // was a dup
                 result.push(sent.replace(/ +/g, ' '));
                 break;
               } 
               fail(tokens); // was dup
             }
        /*      let sent = this._validateSentence(result, tokens, allowDuplicates);
             if (sent) {
               result.push(sent.replace(/ +/g, ' '));
               break;
             } 
           }
           else if (/^[.!?]$/.test(next.token)) {
             fail(tokens);
           } */


    //console.log("FAIL(" + result.length + ")", (tokens ? tokens.length + "" : "0") + " words",
    //tries + " tries\n------------------------------------------");

    return result;
  }

  // tokens only (call generateTokensUntil)
  generateUntil(regex, { minLength = 3, maxLength = Number.MAX_VALUE, startTokens, temperature = 0 } = {}) {

    if (maxLength <= minLength) throw Error('invalid min/max length');
    if (this.mode !== 'tokens') throw Error('generateUntil() cannot be used with sentences');

    let tries = 0;
    OUT: while (++tries < this.maxAttempts) {

      // generate the min number of tokens
      let tokens = this.generateTokens(minLength, { startTokens });

      // keep adding one and checking until we pass the max
      while (tokens.length < maxLength) {

        let mn = this._findNode(tokens);
        if (!mn || mn.isLeaf()) continue OUT; // hit a leaf, restart

        mn = this._selectNext(mn, temperature, tokens);
        if (!mn) continue OUT; // can't find next, restart

        tokens.push(mn.token); // add the token

        // if it matches our regex, then we're done
        if (mn.token.search(regex) > -1) return tokens;
      }
      // we've hit max-length here (try again)
    }
    throwError(tries);
  }

  generateWith(num, includeTokens, { minLength = 5,
    maxLength = 35, allowDuplicates, temperature = 0 } = {}) {

    if (this.mode === 'tokens') throw Error
      ('generateWith() can only be used with sentences');

    let result = [], tokens, tries = 0, fail = () => {
      tokens = undefined;
      if (++tries >= this.maxAttempts) throwError(tries, result);
      return 1;
    }

    if (typeof includeTokens === 'string') {
      includeTokens = RiTa().tokenize(includeTokens);
    }

    // find the first half (sentence start through includeTokens)
    // then call generateSentence with these as startTokens.
    while (result.length < num) {

      if (!tokens) {
        tokens = this._initSentence(includeTokens, this.inverse);
        if (!tokens) throw Error('No sentence including: "' + includeTokens + '"');
      }

      while (tokens && tokens.length < maxLength) {

        let parent = this._findNode(tokens, this.inverse);
        if ((!parent || parent.isLeaf()) && fail(tokens)) continue;

        let next = this._selectNext(parent, temperature, tokens);
        if (!next && fail(tokens)) continue; // possible if all children excluded

        tokens.push(next);

        if (next.child(Markov.SS)) {
          let start = tokens.reverse().map(t => t.token);

          // now generate the rest of the sentence
          let sent = this.generateSentence({ startTokens: start, minLength: start.length });
          if (!sent || result.includes(sent) && fail(tokens)) continue;

          result.push(sent.replace(/ +/, ' ')); // got one
        }
      }
      fail(tokens);
    }
    return result;
  }


  /* returns array of possible tokens after pre and (optionally) before post */
  completions(pre, post) {

    let tn, result = [];
    if (post) { // fill the center

      if (pre.length + post.length > this.n) throw Error
        ('Sum of pre.length && post.length must be <= N, was ' + (pre.length + post.length));

      if (!(tn = this._findNode(pre))) {
        if (!RiTa().SILENT) console.warn('Unable to find nodes in pre: ' + pre);
        return;
      }

      let nexts = tn.childNodes();
      for (let i = 0; i < nexts.length; i++) {

        let atest = pre.slice(0);
        atest.push(nexts[i].token, ...post);
        if (this._findNode(atest)) result.push(nexts[i].token);
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
    return this._computeProbs(this._findNode(path), temp);
  }

  probability(data) {
    let p = 0;
    if (data && data.length) {
      let tn = (typeof data === 'string') ?
        this.root.child(data) : this._findNode(data);
      if (tn) p = tn.nodeProb();
    }
    return p;
  }

  toString() {
    return this.root.asTree().replace(/{}/g, '');
  }

  size() {
    return this.root.childCount();
  }

  print(root) {
    root = root || this.root;
    console && console.log(root.asTree().replace(/{}/g, ''));
  }

  ////////////////////////////// end API ////////////////////////////////

  _selectNext(parent, temp, tokens) {

    let pTotal = 0, selector = Math.random();
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
  }

  _initSentence(initWith, root) {

    root = root || this.root;

    let tokens;
    if (initWith) {
      tokens = [];
      let st = this._findNode(initWith, root);
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
        let st = this._findNode(startTokens, root);
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

  _computeProbs(parent, temp) {
    temp = temp || 0
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
  }

  _validateMlms(word, nodes) {
    let check = nodes.slice().map(n => n.token);
    //check.push(typeof word.token === 'string' ? word.token : word);
    check.push(word); // string
    check = check.slice(-(this.mlm + 1));
    //console.log('\nCHECK: '+RiTa().untokenize(check));
    return !isSubArray(check, this.input);// ? false : check;
  }

  /*
   * Follows 'path' (using only the last n-1 tokens) from root and returns
   * the node for the last element if it exists, otherwise undefined
   * @param  {string[]} path
   * @param  {node} root of tree to search
   * @return {Node} or undefined
   */
  _findNode(path, root) {

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
    return RiTa().untokenize(this._nodesToTokens(nodes));
  }

  /* create a sentence string from an array of nodes */
  _validateSentence(result, nodes, allowDups) {

    let sent = this._flatten(nodes);
    if (!sent.match(/^[A-Z].*[!?.]$/)) {
      //console.log("Skipping invalid: '" + sent + "'");
      return false;
    }
    if (allowDups || result.includes(sent)) {
      if (!this.logDuplicates) console.log
        ("Skipping duplicate: '" + sent + "' after " + result.length);
      return false;
    }
    return sent;
  }

  _nodesToTokens(nodes) {
    return nodes.map(n => n.token);
  }


  // temp: for js workbench only
  generateSentenceTokens({ minLength = 5, maxLength = 25, temperature = 0, startTokens } = {}) {
    let words, tries = 0, fail = () => {
      //console.log('FAIL: ' + this._flatten(words));
      words = undefined;
      tries++;
    }

    startTokens = startTokens || /^[A-Z][a-z]*$/;

    while (tries < this.maxAttempts) {
      words = words || this.generateTokens(1, { startTokens: startTokens });
      let next = this.generateToken({ startTokens: words, temperature: temperature });
      words.push(next);
      if (/^[?!.]$/.test(next)) { // sentence-end?
        if (words.length < minLength) {
          fail(words);
          continue;
        }
        break; // success
      }
      if (words.length >= maxLength) fail(words);
    }
    return words;
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
    this.numChildren = -1;
  }

  // Find a (direct) child node with matching token, given a word or node
  child(word) {
    let lookup = word;
    if (word.token) lookup = word.token;
    return this.children[lookup];
  }

  pselect() {
    let sum = 1, pTotal = 0;
    let nodes = this.childNodes();
    let selector = Math.random() * sum;

    if (!nodes || !nodes.length) throw Error
      ("Invalid arg to pselect(no children) " + this);

    for (let i = 0; i < nodes.length; i++) {

      pTotal += nodes[i].nodeProb();
      if (selector < pTotal) return nodes[i];
    }
  }

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

  childCount() {
    if (this.numChildren === -1) {
      let sum = 0;
      for (let k in this.children) {
        //if (k === Markov.SS || k === Markov.SE) continue;
        sum += this.children[k].count;
      }
      this.numChildren = sum;
    }
    return this.numChildren;
  }

  nodeProb() {
    if (!this.parent) throw Error('no parent');
    return this.count / this.parent.childCount();
  }

  /*
   * Increments count for a child node and returns it
   */
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

function RiTa() { return Markov.parent; }

function lerp(start, stop, amt) {
  return amt * (stop - start) + start;
}

function isWordToken(node) {
  return node.token !== Markov.SS && node.token !== Markov.SE;
}

function shiftArray(arr, num) {
  num = num || 1;
  for (let i = 0; i < num; i++) {
    arr.push(arr.shift());
  }
}

function isSubArray(find, arr) {
  OUT: for (let i = find.length - 1; i < arr.length; i++) {
    for (let j = 0; j < find.length; j++) {
      if (find[find.length - j - 1] !== arr[i - j]) continue OUT;
      if (j === find.length - 1) return true;
    }
  }
  return false;
}

function throwError(tries, oks) {
  throw Error('\n\nFailed after ' + tries + ' tries'
    + (oks ? ' and ' + oks.length + ' successes;' : ';')
    + ' you may need to adjust options or add more text');
}

module && (module.exports = Markov);
