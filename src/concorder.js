class Concorder {

  constructor(parent) {
    this.RiTa = parent;
  }

  concordance(text, options) {
    this.words = Array.isArray(text) ? text : this.RiTa.tokenize(text);
    this._parseOptions(options);
    this._build();
    let result = {};
    for (let name in this.model) {
      result[name] = this.model[name].indexes.length;
    }
    // TODO: sort by value here?
    return result;
  }

  kwic(word, numWords=6) {
    if (!this.model) throw Error('Call concordance() first');
    if (typeof numWords === 'object') {
      numWords = numWords['numWords'] || 6; // opts
    }
    let result = [];
    let value = this._lookup(word);
    if (value) {
      let idxs = value.indexes;
      for (let i = 0; i < idxs.length; i++) {
        let sub = this.words.slice(Math.max(0, idxs[i] - numWords),
          Math.min(this.words.length, idxs[i] + numWords + 1));
        if (i < 1 || (idxs[i] - idxs[i - 1]) > numWords) {
          result.push(this.RiTa.untokenize(sub));
        }
      }
    }
    return result;
  }

  count(word) {
    let value = this._lookup(word);
    return value === null ? 0 : value.count;
  }

  ///////////////////////////////////////////////////////////////////////////

  _parseOptions(options) { // provides default
    this.ignoreCase = options && options.ignoreCase || false;
    this.ignoreStopWords = options && options.ignoreStopWords || false;
    this.ignorePunctuation = options && options.ignorePunctuation || false;
    this.wordsToIgnore = options && options.wordsToIgnore || [];
  }

  _build() {
    if (!this.words) throw Error('No text in model');
    this.model = {};
    for (let j = 0; j < this.words.length; j++) {
      let word = this.words[j];
      if (this._isIgnorable(word)) continue;
      let _lookup = this._lookup(word);
      // The typeof check below fixes a strange bug in Firefox: #XYZ
      // where the string 'watch' comes back from _lookup as a function
      // TODO: resolve in a better way
      if (!_lookup || typeof _lookup !== 'object') {
        _lookup = { word: word, key: this._compareKey(word), indexes: [] };
        this.model[_lookup.key] = _lookup;
      }
      _lookup.indexes.push(j);
    }
  }

  _isIgnorable(key) {
    if ((this.ignorePunctuation && this.RiTa.isPunctuation(key)) || 
      (this.ignoreStopWords && this.RiTa.isStopWord(key))) return true;
    for (let i = 0; i < this.wordsToIgnore.length; i++) {
      let word = this.wordsToIgnore[i];
      if (key === word || (this.ignoreCase && key.toUpperCase() === word.toUpperCase())) {
        return true;
      }
    }
  }

  _compareKey(word) {
    return this.ignoreCase ? word.toLowerCase() : word;
  }

  _lookup(word) {
    let key = this._compareKey(word);
    return this.model[key];
  }
}

module && (module.exports = Concorder);
