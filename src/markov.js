// TODO:
/* add 'temperature' arg
  2 methods (n = number of elements):
    P[k] = lerp(P[k], [Pn-k], temp);
    P[k] = P[int(k+t*n)%n], then interpolate between 2 steps
*/
// allow for real-time weighting ala atken

// NEXT: generateWith (inverse-tree) - postpone

// TODO:
// ERROR: loadTokens and loadSentences ?
// ERROR: generateSentences after loadTokens
// ERROR: MLM < N
//
// generateUntil (should only apply to tokens)
// generateWith (should apply to tokens & sentences)

// MAYBE
// startTokens can take a regex for first token?

const ST = '<s/>';

class Markov {

  constructor(n, opts) {
    this.n = n;
    this.input = [];
    this.root = new Node(null, 'ROOT');
    this.mlm = opts && opts.maxLengthMatch || 0;
    this.optimizeMemory = opts && opts.optimizeMemory || 0;
    if (!this.optimizeMemory) this.inverse = new Node(null, 'REV');
  }

  loadTokens(tokens) {
    if (!Array.isArray(tokens)) {
      throw Error('loadTokens() expects an array of tokens');
    }
    this._treeify(tokens);
    this.mlm && this.input.push(...tokens);
  }

  loadSentences(sentences) {

    let tokens = [];

    // split sentences if we have a string
    if (typeof sentences === 'string') {
      sentences = RiTa.sentences(sentences);
    }

    // add a new token for each sentence start
    for (let i = 0; i < sentences.length; i++) {
      let sentence = sentences[i].replace(/\s+/, ' ').trim();
      let words = RiTa.tokenize(sentence);
      tokens.push(ST, ...words);
    }

    this._treeify(tokens);

    // create the reverse lookup tree
    // be nice to avoid this if not needed
    if (this.inverse) this._treeify
      (tokens.slice().reverse(), this.inverse);

    this.mlm && this.input.push(...tokens);
  }

  generateTokens(num, { startTokens, temperature = 0 } = {}) {

    let tokens, tries = 0, fail = () => {
      //console.log('FAIL: ' + this._flatten(tokens));
      tokens = undefined;
      tries++;
      return 1;
    }

    if (typeof startTokens === 'string') {
      startTokens = RiTa.tokenize(startTokens);
    }

    while (tries < Markov.MAX_GENERATION_ATTEMPTS) {

      if (!tokens) {
        tokens = this._initTokens(startTokens);
        if (!tokens) throw Error('No path starting with: "' + startTokens + '"');
      }

      let parent = this._search(tokens);
      if ((!parent || parent.isLeaf()) && fail()) continue;

      let next = this.selectNext(parent, tokens, temperature);
      if (!next && fail()) continue; // possible if all children excluded

      // if we have enough tokens, we're done
      if (tokens.push(next) >= num) return tokens.map(n => n.token);
    }
    throwError(tries);
  }

  generateSentences(num, { minLength = 5, maxLength = 35, startTokens, allowDuplicates, temperature = 0 } = {}) {
    let result = [], tokens, tries = 0, fail = () => {
      tokens = undefined;
      if (++tries >= Markov.MAX_GENERATION_ATTEMPTS) throwError(tries);
      return 1;
    }

    if (typeof startTokens === 'string') {
      startTokens = RiTa.tokenize(startTokens);
    }

    while (result.length < num) {

      if (!tokens) {
        tokens = this._initSentence(startTokens);
        if (!tokens) throw Error('No sentence starting with: "' + startTokens + '"');
      }

      while (tokens && tokens.length < maxLength) {

        let parent = this._search(tokens);
        if ((!parent || parent.isLeaf()) && fail(tokens)) continue;

        let next = this.selectNext(parent, tokens, temperature);
        if (!next && fail(tokens)) continue; // possible if all children excluded

        tokens.push(next);
        if (tokens.length >= minLength) {
          let sent = this._validateSentence(result, tokens, allowDuplicates);
          if (sent) {
            result.push(sent);
            break;
          }
        }
        else if (/^[.!?]$/.test(next.token)) {
          fail(tokens);
        }
      }

      //console.log("FAIL(" + result.length + ")", (tokens ? tokens.length + "" : "0") + " words",
      //tries + " tries\n------------------------------------------");

      fail(tokens);
    }

    return result;
  }

  generateUntil(regex, { minLength = 1, maxLength = Number.MAX_VALUE, startTokens, temperature = 0 } = {}) {

    let tries = 0;
    OUT: while (++tries < Markov.MAX_GENERATION_ATTEMPTS) {

      // generate the min number of tokens
      let tokens = this.generateTokens(minLength, { startTokens });

      // keep adding one and checking until we pass the max
      while (tokens.length < maxLength) {

        let mn = this._search(tokens);
        if (!mn || mn.isLeaf()) continue OUT; // hit a leaf, restart

        mn = this.selectNext(mn, tokens, temperature);
        if (!mn) continue OUT; // can't find next, restart

        tokens.push(mn.token); // add the token

        // if it matches our regex, then we're done
        if (mn.token.search(regex) > -1) return tokens;
      }
      // we've hit max-length here (try again)
    }
    throwError(tries);
  }

  selectNext(parent, tokens, temp) {

    let nodes = parent.childNodes(true); // sorted
    let pTotal = 0, selector = Math.random();
    let rprobs = nodes.map(n => n.nodeProb()).slice().reverse();

    // TODO: optimize for cases with 0 temp

    // loop twice here in case we skip earlier nodes based on probability
    for (let i = 0; i < nodes.length * 2; i++) {
      let idx = i % nodes.length;
      let next = nodes[idx];
      let prob = lerp(next.nodeProb(), rprobs[idx], temp);
      pTotal += prob;//next.nodeProb();
      if (selector < pTotal) { // should always be true 2nd time through

        if (this.mlm && this.mlm <= tokens.length) {
          if (!this._validateMlms(next.token, tokens)) {
            //console.log('FAIL(i='+i+'/'+(nodes.length)+' mlm=' + this.mlm + '): ' + this._flatten(tokens) + ' -> ' + next.token);
            continue;
          }
        }
        return next;
      }
    }
  }

  probabilities(path) {

    if (!Array.isArray(path)) path = [path];

    if (path.length > this.n) {
      path = path.slice(Math.max(0, path.length - (this.n - 1)), path.length);
    }

    let tn, probs = {};
    if (tn = this._search(path)) {
      let nexts = tn.childNodes();
      for (let i = 0; i < nexts.length; i++) {
        if (nexts[i]) probs[nexts[i].token] = nexts[i].nodeProb();
      }
    }
    return probs;
  }

  generateSentence() {
    return this.generateSentences(1, ...arguments)[0];
  }

  completions(pre, post) {
    let tn, result = [];
    if (post) { // fill the center

      if (pre.length + post.length > this.n) {
        throw Error('Sum of pre.length && post.length must be <= N, was ' +
          (pre.length + post.length));
      }

      if (!(tn = this._search(pre))) return; // TODO: add warning

      let nexts = tn.childNodes();
      for (let i = 0; i < nexts.length; i++) {

        let atest = pre.slice(0);
        atest.push(nexts[i].token, ...post);
        if (this._search(atest)) result.push(nexts[i].token);
      }

      return result;

    } else { // fill the end

      let pr = this.probabilities(pre);
      return Object.keys(pr).sort((a, b) => pr[b] - pr[a]);
    }
  }

  probability(data) {
    if (data && data.length) {
      let tn = (typeof data === 'string') ?
        this.root.child(data) : this._search(data);
      if (tn) return tn.nodeProb();
    }
    return 0;
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

  generateSentencesWith(num, includeTokens, { minLength = 5, maxLength = 35, allowDuplicates, temperature = 0 } = {}) {
    let result = [], tokens, tries = 0, fail = () => {
      tokens = undefined;
      if (++tries >= Markov.MAX_GENERATION_ATTEMPTS) throwError(tries, result);
      return 1;
    }

    if (typeof includeTokens === 'string') {
      includeTokens = RiTa.tokenize(includeTokens);
    }

    // find the first half (sentence start through includeTokens)
    // then call generateSentence with these as startTokens.
    while (result.length < num) {

      if (!tokens) {
        tokens = this._initSentenceWith(includeTokens);
        //console.log('got',tokens);
        if (!tokens) throw Error('No sentence including: "' + includeTokens + '"');
      }

      while (tokens && tokens.length < maxLength) {

        let parent = this._search(tokens, this.inverse);
        if ((!parent || parent.isLeaf()) && fail(tokens)) continue;

        let next = this.selectNext(parent, tokens, temperature);
        if (!next && fail(tokens)) continue; // possible if all children excluded

        tokens.push(next);

        if (next.child(ST)) {
          let start = tokens.reverse().map(t => t.token);
          //console.log('HIT!', start);

          // now generate the rest of the sentence
          let sent = this.generateSentence({ startTokens: start, minLength: start.length });
          if (!sent || result.includes(sent) && fail(tokens)) continue;

          result.push(sent); // got one
        }
      }

      fail(tokens);
    }
    return result;
  }

  ////////////////////////////// end API ////////////////////////////////

  _initSentenceWith(includeTokens, root, startTokens) {

    root = root || this.root;

    let tokens;
    if (includeTokens) { // error if both
      tokens = [];
      let st = this._search(includeTokens, this.inverse);//, root.child(ST));
      if (!st) return false; // fail
      while (!st.isRoot()) {
        tokens.unshift(st);
        st = st.parent;
      }
    }
    else { // no includes
      //tokens = [ this.root.pselect() ];
      tokens = [root.child(ST).pselect()];
    }
    return tokens;
  }

  _initSentence(startTokens, root) {

    root = root || this.root;

    let tokens;
    if (startTokens) { // TODO:
      tokens = [];
      let st = this._search(startTokens);//, root.child(ST));
      if (!st) return false; // fail
      while (!st.isRoot()) {
        tokens.unshift(st);
        st = st.parent;
      }
    }
    else { // no start-tokens
      //tokens = [ this.root.pselect() ];
      tokens = [root.child(ST).pselect()];
    }
    return tokens;
  }

  _initTokens(startTokens, root) {

    root = root || this.root;

    let tokens;
    if (startTokens) {
      tokens = [];
      let st = this._search(startTokens, root);
      if (!st) return false; // fail
      while (!st.isRoot()) {
        tokens.unshift(st);
        st = st.parent;
      }
    }
    else { // start-tokens supplies
      tokens = [this.root.pselect()];
    }
    return tokens;
  }

  _validateMlms(word, nodes) {
    let check = nodes.slice().map(n => n.token);
    //check.push(typeof word.token === 'string' ? word.token : word);
    check.push(word); // string
    check = check.slice(-(this.mlm + 1));
    //console.log('\nCHECK: '+RiTa.untokenize(check));
    return !isSubArray(check, this.input);// ? false : check;
  }

  /*
   * Follows 'path' (using only the last n-1 tokens) from root and returns
   * the node for the last element if it exists, otherwise undefined
   * @param  {string[]} path
   * @param  {node} root of tree to search
   * @return {Node} or undefined
   */
  _search(path, root) {

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
    return RiTa.untokenize(this._nodesToTokens(nodes));
  }

  /* create a sentence string from an array of nodes */
  _validateSentence(result, nodes, allowDups) {

    let sent = this._flatten(nodes);
    if (!sent.match(/^[A-Z].*[!?.]$/)) {
      //console.log("Skipping invalid: '" + sent + "'");
      return false;
    }
    if (allowDups || result.includes(sent)) {
      if (!RiTa.SILENT) {
        console.log("Skipping duplicate: '" + sent + "' after " + result.length);
      }
      return false;
    }
    return sent;
  }

  _nodesToTokens(nodes) {
    return nodes.map(n => n.token);
  }
}

Markov.MAX_GENERATION_ATTEMPTS = 999;

/////////////////////////////// Node //////////////////////////////////////////

class Node {

  constructor(parent, word, count) {

    this.children = {};
    this.parent = parent;
    this.token = word;
    this.count = count || 0;
  }

  /*
   * Find a (direct) child node with matching token, given a word or node
   */
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

    throw Error(this + "\npselect() fail\nnodes(" + nodes.length + ") -> " + nodes);
  }

  isLeaf() {
    return this.childCount() < 1;
  }

  isRoot() {
    return this.parent === null;
  }

  childNodes(sorted) {
    let kids = Object.values(this.children);
    sorted && kids.sort((a, b) => b.count - a.count);
    return kids;
  }

  childCount() {
    let sum = 0;
    for (let k in this.children) {
      if (k === ST) continue;
      sum += this.children[k].count;
    }
    return sum;
  }

  nodeProb() {
    return this.parent ? this.count / this.parent.childCount() : -1;
  }

  /*
   * Increments count for a child node and returns it
   */
  addChild(word, count) {
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

    let l = [], indent = '\n';

    Object.keys(mn.children).map(k => l.push(mn.children[k]));

    if (!l.length) return str;

    if (sort) l.sort();

    for (let i = 0; i < l.length; i++) {

      let node = l[i];
      let tok = this._encode(node.token);
      str += indent + "'" + tok + "'";

      if (!node.isRoot()) str += " [" + node.count + ",p=" + node.nodeProb().toFixed(3) + "]";
      if (!node.isLeaf()) str += '  {';

      str = this.childCount() ? this.stringify(node, str, depth + 1, sort) : str + '}';
    }

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
} // end Node

// --------------------------------------------------------------

function lerp(start, stop, amt) {
  return amt * (stop - start) + start;
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
