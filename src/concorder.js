let RiTa;

class Concorder {

  constructor(parent) {
    RiTa = parent;
    this.model = undefined;
    this.wordsToIgnore = [];
    this.ignoreCase = false;
    this.ignoreStopWords = false;
    this.ignorePunctuation = false; 
  }

  concordance(text, options) {
    this._parseOptions(options);
    this.words = Array.isArray(text) ? text : RiTa.tokenize(text);
    this._build();
    let result = {};
    for (let name in this.model) {
      result[name] = this.model[name].indexes.length;
    }
    // TODO: need to sort by value here
    return result;
  }

  kwic(word, numWords) {
    if (!this.model) throw Error('Call concordance() first');
    let result = [];
    let value = this._lookup(word);
    if (value) {
      let idxs = value.indexes;
      for (let i = 0; i < idxs.length; i++) {
        let sub = this.words.slice(Math.max(0, idxs[i] - numWords),
          Math.min(this.words.length, idxs[i] + numWords + 1));
        if (i < 1 || (idxs[i] - idxs[i - 1]) > numWords) {
          result.push(RiTa.untokenize(sub));
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

  _parseOptions(options) {
    if (options) {
      options.ignoreCase && (this.ignoreCase = true);
      options.ignoreStopWords && (this.ignoreStopWords = true);
      options.ignorePunctuation && (this.ignorePunctuation = true);
      options.wordsToIgnore && (this.wordsToIgnore = options.wordsToIgnore);
    }
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
    if (this.ignorePunctuation && RiTa.isPunctuation(key)) {
      return true;
    }
    for (let i = 0; i < this.wordsToIgnore.length; i++) {
      let word = this.wordsToIgnore[i];
      if ((this.ignoreCase && key.toUpperCase() === word.toUpperCase()) || key === word) {
        return true;
      }
    }
    return false;
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
