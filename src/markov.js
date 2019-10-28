const MAX_GENERATION_ATTEMPTS = 5000;
const SSRE = /"?[A-Z][a-z"',;`-]*/;
const SSDLM = 'D=l1m_';

class Markov {

  constructor(nFactor, opts) {

    this.n = nFactor;
    this.rawText = '';
    this.tokenCount = 0;
    this.pathTrace = [];
    this.sentenceStarts = [];
    this.root = new TextNode(null, 'ROOT');

    this.minSentenceLength = (opts && opts.minSentenceLength) || 6;
    this.maxSentenceLength = (opts && opts.maxSentenceLength) || 35;
    this.isSentenceAware = (opts && opts.sentenceAware) || 0;
    this.allowDuplicates = (opts && opts.allowDuplicates) || 0;
    this.printIgnoredText = (opts && opts.printIgnoredText) || 0;
  }

  loadTokens(tokens, multiplier) {

    multiplier = multiplier || 1;

    //this.root.count += tokens.length; // here?
    let toAdd;
    for (let k = 0; k < tokens.length; k++) {
      toAdd = [];
      for (let j = 0; j < this.n; j++) {
        if ((k + j) < tokens.length)
          toAdd[j] = (tokens[k + j]) ? tokens[k + j] : null;
        else // remove
          toAdd[j] = null;
      }
      //for (let l = 0; l < multiplier || 1; l++) {
      let node = this.root;
      for (let i = 0; i < toAdd.length; i++) {
        this.tokenCount++;
        if (node.token) node = node.addChild(toAdd[i], 1);
      }
      //}
    }
    return this;
  }



  generateTokens(targetNum, opts) {

    let mn, tries = 0, maxTries = 500, tokens = [];

    // start with supplied start token if we have one
    if (opts && opts.startToken && opts.startToken.length) {
      mn = this.root.lookup(opts.startToken);
      if (!mn) throw Error("Model does not contain: " + opts.startToken);
    }

    OUT: while (++tries < maxTries) {

      tokens.push(mn = (mn || this.root.selectChild(null, true)));

      while (tokens.length < targetNum) {

        mn = this._nextNodeForArr(tokens);
        if (!mn || !mn.token) { // hit the end
          tokens = []; // start over
          continue OUT;
        }

        tokens.push(mn);
      }

      break;
    }

    // uh-oh, looks like we failed...
    if (tokens.length < targetNum) this._onFail(tries, tokens.length);

    return tokens.map(t => t.token);
  }

  _nextNodeForArr(previousTokens) {

    // Follow the seed path down the tree
    let firstLookupIdx = Math.max(0, previousTokens.length - (this.n - 1));
    let node = this.root.lookup(previousTokens[firstLookupIdx++]);

    for (let i = firstLookupIdx; i < previousTokens.length; i++) {
      if (node) node = node.lookup(previousTokens[i]);
    }

    // Now select the next node
    return node ? node.selectChild(null, true) : null;
  }

  _onFail(tries, successes) {
    console.warn('\nRiMarkov failed to complete after ' +
      tries + ' tries and ' + successes + ' successful ' +
      'generations. You may need to add more text to the model.\n');
  }
}



class TextNode {

  constructor(parent, token) {
    this.token = token;
    this.parent = parent;
    this.children = {};
    this.count = 0;
  }

  pathFromRoot(result) {
    let mn = this;
    while (true) {
      if (mn.isRoot()) break;
      result.push(mn.token);
      mn = mn.parent;
    }
  }

  selectChild(regex, probSelect) {
    let ps = probSelect || true;
    return this.children ? this.select(this.childNodes(regex), ps) : null; // use cond
  }

  select(arr, probSelect) {
    return (probSelect ? this.probSelect(arr) :
      arr[Math.floor((Math.random() * arr.length))]);
  }

  probSelect(arr) {
    if (!arr.length) return null;
    if (arr.length == 1) return arr[0];

    // select from multiple options based on frequency
    let pTotal = 0,
      selector = Math.random();
    for (let i = 0; i < arr.length; i++) {
      pTotal += arr[i].probability();
      if (selector < pTotal)
        return arr[i];
    }
    console.error("Invalid State in RiTa.probSelect()");
  }

  addChild(newToken, initialCount) {

    initialCount = initialCount || 1;

    let node = this.children[newToken];

    //  add first instance of this token
    if (!node) {

      node = new TextNode(this, newToken);
      node.count = initialCount;
      this.children[newToken] = node;

    } else {

      node.count++;
    }

    return node;
  }

  asTree(sort) {
    let s = this.token + " ";
    if (!this.isRoot()) {
      s += "(" + this.count + ")->";
    }
    s += "{";
    return !this.isLeaf() ? this.childrenToString
      (this, s, 1, sort) : (s + "}");
  }

  isRoot() {
    return !this.parent;
  }

  isLeaf() {
    return this.childCount() === 0;
  }

  probability() {
    //log('probability: '+ this.count+'/'+this.siblingCount());
    return this.count / this.siblingCount();
  }

  childNodes(regex) {
    if (!this.children) return [];
    regex = typeof regex === 'string' ? new RegExp(regex) : regex;
    let res = [];
    for (let k in this.children) {
      let nd = this.children[k];
      if (!regex || (nd && nd.token && nd.token.search(regex) > -1)) {
        res.push(nd);
      }
    }
    return res;
  }

  siblingCount() {
    if (!this.parent) console.error("Illegal siblingCount on ROOT!");
    return this.parent.childCount();
  }

  childCount() {
    if (!this.children) return 0;
    let sum = 0;
    for (let k in this.children) {
      if (k && this.children[k])
        sum += this.children[k].count;
    }
    return sum;
  }

  // takes node or string, returns node
  lookup(obj) {
    if (!obj) return null;
    obj = (typeof obj !== 'string' && obj.token) ? obj.token : obj;
    return obj ? this.children[obj] : null;
  }

  childrenToString(textNode, str, depth, sort) {
    let l = textNode.children.map(c => c.id);
    if (!l.length) return str;
    if (sort) l.sort();

    let indent = '\n';
    for (let j = 0; j < depth; j++) indent += "  ";

    for (let i = 0; i < l.length; i++) {
      let node = l[i];
      if (!node) break;

      let tok = node.token;
      if (tok) {
        (tok == '\n') && (tok = "\\n");
        (tok == "\r") && (tok = "\\r");
        (tok == "\t") && (tok = "\\t");
        (tok == "\r\n") && (tok = "\\r\\n");
      }
      str += indent + "'" + tok + "'";

      if (!node.isRoot()) str += " [" + node.count + ",p=" +
        (node.probability().toFixed(3)) + "]->{";

      str = (node.children) ?
        this.childrenToString(node, str, depth + 1, sort) : str + "}";
    }

    indent = '\n';
    for (let j = 0; j < depth - 1; j++) indent += "  ";

    return str + indent + "}";
  }

  toString() {
    return '[ ' + this.token + " (" + this.count + '/' + this.probability().toFixed(3) + '%)]';
  }
}

module && (module.exports = Markov);
