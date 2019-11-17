const RiTa = require('./rita_api');

// TODO:
/* invertProbabilities arg (or add temperature arg)
  2 methods (n = number of elements):
    P[k] = lerp(P[k], [Pn-k], temp);
    P[k] = P[int(k+t*n)%n], then interpolate between 2 steps
*/
// allow for real-time weighting ala atken

//next: generateSentences with start tokens and mlm, then temp

const MAX_GENERATION_ATTEMPTS = 999;
const SSDLM = '<s/>';
class Markov {

  constructor(n) {

    this.n = n;
    this.input = [];
    this.root = new Node(null, 'ROOT');
  }

  loadTokens(tokens) {
    if (!Array.isArray(tokens)) {
      throw Error('RiMarkov.loadTokens() expects an array of tokens');
    }
    this._treeify(tokens);
    this.input.push(...tokens);
  }

  loadSentences(sentences) {

    let tokens = [];

    // tokenize if we have an string
    if (typeof sentences === 'string') {
      sentences = RiTa.sentences(sentences);
    }

    // add a new token for each sentence start
    for (let i = 0; i < sentences.length; i++) {
      let sentence = sentences[i].replace(/\s+/, ' ').trim();
      let words = RiTa.tokenize(sentence);
      tokens.push(SSDLM, ...words);
    }

    this._treeify(tokens);
    this.input.push(...tokens.filter(t => t !== SSDLM));
  }

  generateTokens(num, { startTokens, maxLengthMatch, temperature = 0 } = {}) {

    let tokens, tries = 0, fail = () => {
      //console.log('FAIL: ' + this._flatten(tokens));
      tokens = undefined;
      tries++;
      return 1;
    }

    if (typeof startTokens === 'string') {
      startTokens = RiTa.tokenize(startTokens);
    }

    while (tries < MAX_GENERATION_ATTEMPTS) {

      if (!tokens) tokens = this._initTokens(startTokens);

      let parent = this._search(tokens);
      if ((!parent || parent.isLeaf()) && fail()) continue;

      //let next = parent.chooseChild(tokens, maxLengthMatch, this.input);
      let next = this.selectNext(parent, tokens, maxLengthMatch, temperature);
      if (!next && fail()) continue; // possible if all children excluded

      // if we have enough tokens, we're done
      if (tokens.push(next) >= num) return tokens.map(n => n.token);
    }

    throwError(tries);
  }

  generateSentences(num, { minLength = 5, maxLength = 35, startTokens, maxLengthMatch, temperature = 1 } = {}) {
    let result = [], tokens, tries = 0, fail = () => {
      //console.log('FAIL('+tries+'): ' + this._flatten(tokens));
      tokens = undefined;
      if (++tries >= MAX_GENERATION_ATTEMPTS) {
        console.log("FOUND(" + result.length + ")", result);
        throwError(tries);
      }
      return 1;
    }

    while (result.length < num) {
      if (!tokens) {
        tokens = this._initSentence(startTokens);
        if (!tokens) console.log('init failed:', startTokens);
      }

      while (tokens && tokens.length < maxLength) {

        let parent = this._search(tokens);
        if ((!parent || parent.isLeaf()) && fail(tokens)) continue;

        let next = this.selectNext(parent, tokens, maxLengthMatch);
        if (!next && fail(tokens)) continue; // possible if all children excluded

        tokens.push(next);
        if (tokens.length >= minLength) {
          let sent = this._validateSentence(result, tokens);
          if (sent) result.push(sent);
        }
      }
      //console.log("FAIL(" + result.length + ")", (tokens ? +tokens.length + "" : "0") + " words", tries + " tries");
      fail(tokens);
    }
    return result;
  }

  generateUntil(regex, { minLength = 1, maxLength = Number.MAX_VALUE, startTokens, maxLengthMatch, temperature = 1 } = {}) {

    let tries = 0;
    OUT: while (++tries < MAX_GENERATION_ATTEMPTS) {

      // generate the min number of tokens
      let tokens = this.generateTokens(minLength, { startTokens });

      // keep adding one and checking until we pass the max
      while (tokens.length < maxLength) {

        let mn = this._search(tokens);
        if (!mn || mn.isLeaf()) continue OUT; // hit a leaf, restart

        mn = this.selectNext(mn, tokens, maxLengthMatch);
        if (!mn) continue OUT; // can't find next, restart

        tokens.push(mn.token); // add the token

        // if it matches our regex, then we're done
        if (mn.token.search(regex) > -1) return tokens;
      }
      // we've hit max-length here (try again)
    }
    throwError(tries);
  }

  selectNext(parent, tokens, maxLengthMatch, temp) {

    let nodes = parent.childNodes(true);
    let pTotal = 0, selector = Math.random();

    if (!nodes || !nodes.length) throw Error
      ("Invalid arg to selectNext(no children) " + this);

    // we loop twice here in case we skip earlier nodes based on probability
    for (let i = 0; i < nodes.length * 2; i++) {
      let next = nodes[i % nodes.length];
      pTotal += next.nodeProb();
      if (selector < pTotal) { // should always be true 2nd time through

        if (maxLengthMatch && maxLengthMatch <= tokens.length) {
          if (!this._validateMlms(next.token, tokens)) {
            //console.log('FAIL: ' + this._flatten(tokens) + ' -> ' + next.token);
            continue;
          }
        }
        return next;
      }
    }
  }

  handleTemperature() {
  //
    //let nodes = [ new Node(this.root, "a", 3), new Node(this.root, "b", 4), new Node(this.root, "c", 2), new Node(this.root, "d", 1)];
    // nodes.forEach(n => {
    //   this.root.children[n.word] = n;
    // });
    this.root.addChild("a", 3);
    this.root.addChild("b", 4);
    this.root.addChild("c", 2);
    this.root.addChild("d", 1);
    let nodes = this.root.childNodes(true);
    nodes.forEach(n => {
      console.log(n.token + ' -> ' + n.nodeProb());
    });


//    console.log(this.root);
  }

  selectNextWithTemp(parent, tokens, maxLengthMatch, temp) {

    let nodes = parent.childNodes();
    let pTotal = 0, selector = Math.random();

    if (!nodes || !nodes.length) throw Error
      ("Invalid arg to selectNext(no children) " + this);

    let words = nodes.map(n => n.token);
    let probs = nodes.map(n => n.nodeProb());

    // if (temp && temp > 0) {
    //   shiftArray(probs);
    // }

    // WORKING HERE

    // 1 2 3 4
    // 4 1 2 3
    // 3 4 1 2
    // 2 3 4 1
    // 1 2 3 4

    // 1 2 3 4
    // 4 3 2 1


    //console.log(words, probs);

    // note: we loop twice here in case
    // we skip earlier nodes based on probability
    // and end up with only excluded nodes
    for (let i = 0; i < words.length * 2; i++) {
      let word = words[i % nodes.length];
      let next = nodes[i % nodes.length];
      let prob = probs[i % nodes.length];
      pTotal += prob;
      if (selector < pTotal) { // should always be true 2nd time through

        if (maxLengthMatch && maxLengthMatch <= tokens.length) {
          if (!this._validateMlms(word, tokens)) {
            //console.log('FAIL: ' + this._flatten(tokens) + ' -> ' + next.token);
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

  generateTokensOrig(num, { startTokens, maxLengthMatch } = {}) {

    let tokens, tries = 0, fail = (toks) => {
      if (toks) console.log('FAIL: ' + this._flatten(tokens));
      tokens = undefined;
      tries++;
      return 1;
    }

    if (typeof startTokens === 'string') {
      startTokens = RiTa.tokenize(startTokens);
    }

    while (tries < MAX_GENERATION_ATTEMPTS) {

      if (!tokens) tokens = this._initTokens(startTokens);

      let parent = this._search(tokens);
      if ((!parent || parent.isLeaf()) && fail()) continue;

      //let next = parent.chooseChild(tokens, maxLengthMatch, this.input);
      let next = parent.pselect();

      // if we have enough tokens, we're done
      if (tokens.push(next) >= num) return tokens.map(n => n.token);
    }

    throw Error('\n\nFailed after ' + tries + ' tries; you may' +
      ' need to add more text to the model' + (maxLengthMatch ?
        ' or increase the maxLengthMatch parameter' : ''));
  }

  _initSentence(startTokens) {
    let tokens;
    if (startTokens) { // TODO:
      tokens = [];
      let st = this._search(startTokens);
      while (!st.isRoot()) {
        tokens.unshift(st);
        st = st.parent;
      }
    }
    else { // no start-tokens
      //tokens = [ this.root.pselect() ];
      tokens = [this.root.child(SSDLM).pselect()];
    }
    return tokens;
  }

  generateSentence() {
    return this.generateSentences(1, ...arguments)[0];
  }

  completions(pre, post) {
    let tn, result = [];
    if (post) { // fill the center

      if (pre.length + post.length > this.n) {
        err('Sum of pre.length && post.length must be < N, was ' +
          (pre.length + post.length));
      }

      if (!(tn = this._search(pre))) return;

      let nexts = tn.childNodes();
      for (let i = 0; i < nexts.length; i++) {

        let atest = pre.slice(0);
        atest.push(nexts[i].token);
        post.map(function(p) {
          atest.push(p);
        });

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

  print() {
    console && console.log(this.root.asTree().replace(/{}/g, ''));
  }

  ////////////////////////////// end API ////////////////////////////////

  _initTokens(startTokens) {
    let tokens;
    if (startTokens) {
      tokens = [];
      let st = this._search(startTokens);
      if (!st) throw Error("Cannot find startToken(s): " + startTokens);
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
    return !isSubArray(check, this.input);
  }

  /*
   * Follows 'path' (using only the last n-1 tokens) from root and returns
   * the node for the last element if it exists, otherwise undefined
   * @param  {string[]} path
   * @return {Node} or undefined
   */
  _search(path) {

    if (!path || !path.length || this.n < 2) return this.root;

    let idx = Math.max(0, path.length - (this.n - 1));
    let node = this.root.child(path[idx++]);

    for (let i = idx; i < path.length; i++) {
      if (node) node = node.child(path[i]);
    }

    return node; // can be undefined
  }

  /* add tokens to tree from root */
  _treeify(tokens) {

    for (let i = 0; i < tokens.length; i++) {
      let node = this.root,
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
  _validateSentence(result, nodes) {

    let sent = this._flatten(nodes);

    if (!sent || !sent.length) {
      console.log("Bad validate arg: ", nodes);
      return false;
    }

    if (sent[0] !== sent[0].toUpperCase()) {
      console.log("Skipping: bad first char in '" + sent + "'");
      return false;
    }

    if (!sent.match(/[!?.]$/)) {
      //console.log("Skipping: bad last char='"
      //+ sent[sent.length - 1] + "' in '" + sent + "'");
      return false;
    }

    if (result.indexOf(sent) > -1) {
      if (!RiTa.SILENT) console.log("Skipping: duplicate sentence: '" + sent + "'");
      return false;
    }

    return sent;
  }

  _nodesToTokens(nodes) {
    return nodes.map(n => n.token);
  }

}

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
      if (selector < pTotal) {

        // make sure we don't return a sentence start (<s/>) node
        ///let result = nodes[i].token === SSDLM ? nodes[i].pselect() : nodes[i];
        let result = nodes[i];
        if (!result) throw Error('Unexpected state');

        return result;
      }
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
      if (k === SSDLM) continue;
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

    sort = sort || false;

    for (let k in mn.children) {
      l.push(mn.children[k]);
    }

    if (!l.length) return str;

    if (sort) l.sort();

    for (let j = 0; j < depth; j++) indent += "  ";

    for (let i = 0; i < l.length; i++) {

      let node = l[i];

      if (!node) break;

      let tok = node.token;
      if (tok) {
        (tok == "\n") && (tok = "\\n");
        (tok == "\r") && (tok = "\\r");
        (tok == "\t") && (tok = "\\t");
        (tok == "\r\n") && (tok = "\\r\\n");
      }

      str += indent + "'" + tok + "'";

      if (!node.count) err("ILLEGAL FREQ: " + node.count + " -> " + mn.token + "," + node.token);
      if (!node.isRoot()) str += " [" + node.count + ",p=" + node.nodeProb().toFixed(3) + "]";
      if (!node.isLeaf()) str += '  {';

      //if (this.childCount()) str += '-> {';

      if (this.childCount()) {
        str = this.stringify(node, str, depth + 1, sort)
      }
      else {
        str = str + "}";
      }
    }

    indent = '\n';
    for (let j = 0; j < depth - 1; j++) {
      indent += "  ";
    }

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

function shiftArray(arr, num) {
  num = num || 1;
  for (var i = 0; i < num; i++) {
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

function throwError(tries) {
  throw Error('\n\nFailed after ' + tries + ' tries; you may'
    + ' need to add more text to the model or adjust options');
}

RiTa.Markov = Markov;
module && (module.exports = Markov);
