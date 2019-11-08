const RiTa = require('./rita_api');

// TODO:
/* invertProbabilities arg (or add temperature arg)
  2 methods (n = number of elements):
    P[k] = lerp(P[k], [Pn-k], temp);
    P[k] = P[int(k+t*n)%n], then interpolate between 2 steps
*/
// allow for real-time weighting ala memo

//next: generateSentences with start tokens, then temp

const MAX_GENERATION_ATTEMPTS = 20;
const SSDLM = '<s/>';
class Markov {

  constructor(n) {

    this.n = n;
    this.input = [];
    this.root = new Node(null, 'ROOT');
  }

  loadTokens(tokens) {

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

  _initTokens(startTokens) {
    let tokens;
    if (startTokens) {
      tokens = [];
      let st = this._search(startTokens);
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

  validateMlms(candidate, nodes) {
    let check = nodes.slice().map(n => n.token);
    check.push(candidate.token);
    return !isSubArray(check, this.input);
  }

  generateTokens(num, { startTokens, maxLengthMatch } = {}) {

    let tokens, tries = 0, fail = (toks) => {
      if (toks) console.log('FAIL: '+this._flatten(tokens));
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

      //let next = parent.chooseChild(tokens);//, maxLengthMatch, this.input);
      let next = parent.pselect();

      // if we have enough tokens, we're done
      if (tokens.push(next) >= num) {
        return tokens.map(n => n.token);
      }
    }

    throw Error('\n\nFailed after ' + tries + ' tries; you may' +
      ' need to add more text to the model' + (maxLengthMatch ?
        ' or increase the maxLengthMatch parameter' : ''));
  }

  generateTokensLast(num, { startTokens, maxLengthMatch } = {}) {

    let tokens, tries = 0, excludes = [], fail = (toks) => {
      if (toks) console.log('FAIL: '+this._flatten(tokens));
      tokens = undefined;
      tries++;
      return 1;
    }

    if (typeof startTokens === 'string') {
      startTokens = RiTa.tokenize(startTokens);
    }

    OUT: while (tries < MAX_GENERATION_ATTEMPTS) {

      if (!tokens) tokens = this._initTokens(startTokens);

      let parent = this._search(tokens);

      // if we don't have a parent, try again
      if ((!parent || parent.isLeaf()) && fail()) continue;

      //let next = parent.chooseChild(tokens);//, maxLengthMatch, this.input);
      let next;
      while (!next) {
        next = parent.pselect(excludes);
        console.log('GOT '+this._flatten(tokens)+' -> '+(next ? next.token : 'NULL'));
        if (!next) {
          fail();
          continue OUT;
        }
        if (maxLengthMatch && (maxLengthMatch <= tokens.length)) {

          if (!this.validateMlms(next, tokens)) {
            console.log('MLMS-FAIL: '+this._flatten(tokens)+' -> '+next.token);
            excludes.push(next.token);
            next = undefined;
          }
          else {
            console.log('MLMS-OK: '+this._flatten(tokens)+' -> '+next.token);
          }
        }
      }


      // if we have enough tokens, we're done
      if (tokens.push(next) >= num) {
        return tokens.map(n => n.token);
      }

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
      let start = this.root.child(SSDLM);
      tokens = [start.pselect()];
    }
    return tokens;
  }

  /*generateSentences(num, { minWords = 5, maxWords = 35, startTokens, maxLengthMatch } = {}) {
    let tokens, tries = 0, fail = () => {
      tokens = null;
      tries++;
      return 1;
    };

    if (typeof startTokens === 'string') {
      startTokens = RiTa.tokenize(startTokens);
    }

    while (tries < MAX_GENERATION_ATTEMPTS) {

      if (!tokens) tokens = this._initSentence(startTokens);
      console.log("FLAT1: ", this.root.child(SSDLM).token, this._flatten(tokens));
      let node = this.root.child(SSDLM).chooseChild(tokens, maxLengthMatch, this.input);
      console.log("FLAT2: ", this._flatten(node));

      break;
    }
  }*/

  // generateSentencesX(num, { minWords = 5, maxWords = 35, startTokens, maxLengthMatch } = {}) {
  //
  //   //console.log(num + " {" + minWords + "," + maxWords + "," + startTokens + "}");
  //
  //   let node, sent, tries = 0, result = [];
  //
  //   if (typeof startTokens === 'string') {
  //     startTokens = RiTa.tokenize(startTokens);
  //   }
  //
  //   while (tries < MAX_GENERATION_ATTEMPTS) {
  //
  //     if (result.length >= num) return result;
  //
  //     if (!sent) {
  //       //sent = [ node = this._initSentence(startTokens) ];
  //       sent = sent || [node = this.root.child(SSDLM).pselect()];
  //     }
  //
  //     if (node.isLeaf()) {
  //       node = this._search(sent);
  //       // we ended up at a another leaf
  //       if (!node || node.isLeaf()) {
  //         if (sent.length < minWords || !this._validateSentence(result, sent)) {
  //           tries++;
  //         }
  //         sent = null;
  //         continue;
  //       }
  //     }
  //
  //     // select the next child, according to probabilities
  //     node = node.pselect();
  //
  //     // do we have a candidate for the next start?
  //     if (node.token === SSDLM) {
  //
  //       // its a sentence, or we restart and try again
  //       if (sent.length < minWords || !this._validateSentence(result, sent)) {
  //         tries++;
  //       }
  //       sent = null;
  //       continue;
  //     }
  //
  //     // add new node to the sentence
  //     sent.push(node);
  //
  //     // check if we've exceeded max-length
  //     if (sent.length > maxWords) {
  //       sent = null;
  //       tries++;
  //     }
  //     //console.log("tries="+tries);
  //   }
  //
  //   throw Error('\nRiMarkov failed to complete after ' + tries +
  //     ' tries and ' + result.length + ' successful generation(s)' +
  //     ' - you may need to add more text to the model\n');
  // }

  generateSentence() {
    return this.generateSentences(1, ...arguments)[0];
  }

  // TODO: add-arg: startTokens
  generateUntil(regex, { minLength = 1, maxLength = Number.MAX_VALUE } = {}) {
    let tries = 0;
    OUT: while (++tries < MAX_GENERATION_ATTEMPTS) {

      // generate the min number of tokens
      let tokens = this.generateTokens(minLength);

      // keep adding one and checking until we pass the max
      while (tokens.length < maxLength) {

        let mn = this._search(tokens);
        if (!mn || mn.isLeaf()) continue OUT; // hit a leaf, restart

        mn = mn.pselect();
        tokens.push(mn.token);

        // check against our regex
        if (mn.token.search(regex) > -1) return tokens;
      }
    }

    throw Error('\n' + "RiMarkov failed to complete after " + tries + " attempts." +
      "You may need to add more text to your model..." + '\n');
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

      let hash = this.probabilities(pre);
      return Object.keys(hash).sort(function(a, b) {
        return hash[b] - hash[a];
      });
    }
  }

  probabilities(path) {
    // TODO: tokenize to handle multiple words/tokens in path
    path = (typeof path === 'string') ? [path] : path;
    if (path.length > this.n) {
      path = path.slice(Math.max(0, path.length - (this.n - 1)), path.length);
    }
    let tn, probs = {};
    if (!(tn = this._search(path))) return {};
    let nexts = tn.childNodes();
    for (let i = 0; i < nexts.length; i++) {
      if (nexts[i]) {
        probs[nexts[i].token] = nexts[i].nodeProb();
      }
    }
    return probs;
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

  ////////////////////////////// end API ////////////////////////////////

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
      //console.log("Skipping: duplicate sentence: '" + sent + "'");
      return false;
    }

    result.push(sent);

    return true;
  }

  _nodesToTokens(nodes) {
    return nodes.map(n => n.token);
  }

  // _searchSentenceStart(path) {
  //
  //   if (!path || !path.length || this.n < 2) return this.root;
  //
  //   let idx = Math.max(0, path.length - (this.n - 1));
  //   let node = this.root.child(SSDLM).child(path[idx++]);
  //
  //   for (let i = idx; i < path.length; i++) {
  //     if (node) node = node.child(path[i]);
  //   }
  //
  //   return node; // can be null
  // }
}

/////////////////////////////// Node //////////////////////////////////////////

class Node {

  constructor(parent, word) {

    this.children = {};
    this.parent = parent;
    this.token = word;
    this.count = 0;
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
        let result = nodes[i].token === SSDLM ? nodes[i].pselect() : nodes[i];

        if (!result) throw Error('Unexpected state');

        return result;
      }
    }

    throw Error(this + "\npselect() fail\nnodes(" + nodes.length + ") -> " + nodes);
  }

  /*
   * Return a (direct) child node according to probability
   */
  pselectLast(excludes) {

    let selector, sum = 1, pTotal = 0;
    let nodes = this.childNodes();

    if (!nodes || !nodes.length) {
      throw Error("Invalid arg to pselect(no children) " + this);
    }

    selector = Math.random() * sum;

    for (let i = 0; i < nodes.length; i++) {

      let node = nodes[i];
      pTotal += node.nodeProb();
      if (selector < pTotal) {

        // make sure we don't return a sentence start (<s/>) node
        //if (node.token === SSDLM) node = node.pselect(); // TODO: restart here? HUH?

        // make sure we don't return something explicitly excluded
        if (excludes && excludes.includes(nodes[i].token)) {
          console.log((i+1)+"/"+nodes.length+") HIT EXCLUDED: " + node.token);
          node = null;
        }
        return node;
      }
    }

    //throw Error('pselect failed for: ' + this.token, 'with children', Object.keys(this.children));
  }

  /*
   * Return a (direct) child node according to probability, filter on excludes
   */
  pselectExcluding(excludes) {
    //if (excludes && excludes.length) console.log(this.token+'.pselect('+excludes+')');
    let selector, sum = 1, pTotal = 0;
    let nodes = this.childNodes(excludes);

    if (!nodes || !nodes.length) {
      throw Error("Invalid arg to pselect(no children) " + this);
    }

    if (excludes && excludes.length) {

      nodes = nodes.filter(n => !excludes.includes(n));

      if (!nodes.length) return; // nothing left after filtering

      sum = nodes.reduce(function(total, n) {
        return total + n.nodeProb();
      }, 0);
    }

    selector = Math.random() * sum;

    for (let i = 0; i < nodes.length; i++) {

      pTotal += nodes[i].nodeProb();
      if (selector < pTotal) {

        // make sure we don't return a sentence start (<s/>) node
        let result = nodes[i].token === SSDLM ? nodes[i].pselect() : nodes[i];

        if (!result) throw Error('Unexpected state');

        return result;
      }
    }

    throw Error(this + '\nno hit for pselect() with filter: ' + filter +
      "\nnodes(" + nodes.length + ") -> " + nodes);
  }

  chooseChild(path, mlms, input) {

    // bail if we don't have maxLengthMatchingSequence
    if (!mlms || path.length < (mlms - 1) || !input || !input.length) {
      return this.pselect();
    }

    let dbug = 0, start, nodes = path.slice(-(mlms - 1));

    if (dbug) console.log('\nSo far: ', path.map(n => n.token)
      + ' with ' + this.childNodes().length + ' nexts = ['
      + nodeStr(this.childNodes()) + "]\n");

    if (dbug) {
      start = nodeStr(path, true);
      console.log("start: " + start);
    }

    if (dbug) console.log('path: ', nodeStr(nodes));

    let excludes = [], child;
    while (!child) {

      if (dbug) console.log('select: ', excludes, nodes.length);
      let candidate = this.pselect(excludes);

      if (!candidate) {

        if (dbug) console.log('FAIL with excludes = [' + excludes + '], str="' + start + '"');
        return false // if no candidates left, return false;
      }

      //let check = nodes.slice(0).push(candidate)
      let check = nodes.slice().map(n => n.token);
      check.push(candidate.token);

      if (dbug) console.log('isSubArray?', check);

      if (isSubArray(check, input)) {
        if (dbug) console.log("Yes, excluding '" + candidate.token + "'");
        excludes.push(candidate.token);
        continue; // try again
      }

      if (dbug) console.log('No, done: ', candidate.token);
      child = candidate; // found a good one
    }

    return child;
  }

  isLeaf() {
    return this.childCount() < 1;
  }

  isRoot() {
    return this.parent === null;
  }

  childNodes() {
    return  Object.values(this.children);
  }

  childNodesExcluding(excludes) {
    let kids = Object.values(this.children);
    return (!excludes || !excludes.length) ? kids :
      kids.filter(n => !excludes.includes(n.token));
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
   * increments count for a child node and returns it
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

  stringify(theNode, str, depth, sort) {

    sort = sort || false;

    let l = []; // TODO: use map
    for (let k in theNode.children) l.push(theNode.children[k]);

    if (!l.length) return str;

    if (sort) l.sort();

    let indent = '\n';
    for (let j = 0; j < depth; j++) indent += '    ';

    for (let i = 0; i < l.length; i++) {

      let node = l[i];
      if (!node) break;
      let tok = this._encode(node.token);
      str += indent + tok;

      if (!node.count) {
        err("ILLEGAL FREQ: " + node.count + " " + mn.token + "," + node.token);
      }

      if (node.parent) str += " [" + node.count + ",p=" +
        (node.nodeProb().toFixed(3)) + "] {";

      str = !this.childCount() ? this.stringify(node, str, depth + 1, sort) : str + '}';
    }

    indent = '\n'; // TODO: use reduce() -- why are we doing this twice?
    for (let j = 0; j < depth - 1; j++) indent += "    ";

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

function nodeStr(nodes, format) {
  return format ? RiTa.untokenize(nodes.map(n => n.token)) :
    nodes.reduce((acc, n) => acc += n.token + ',', '');
}

function isSubArray(find, arr) {
  OUT: for (let i = find.length - 1; i < arr.length; i++) {
    for (let j = 0; j < find.length; j++) {
      //console.log('check:', find[find.length - j -1] +' =? '+arr[i-j]);
      if (find[find.length - j - 1] !== arr[i - j]) {
        continue OUT;
      }
      if (j === find.length - 1) return true;
    }
  }
  return false;
}

function err() {
  let msg = "[RiTa] " + arguments[0];
  for (let i = 1; i < arguments.length; i++) {
    msg += '\n' + arguments[i];
  }
  throw Error(msg);
}

function isFunction(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}

RiTa.Markov = Markov;
module && (module.exports = Markov);
