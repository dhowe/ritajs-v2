// FUNCTIONS /////////////////////////////////////////////////////////////////

class Utils {

  static trim(str) { // remove?
    if (!str || !str.length) return str;
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }

  static equalsIgnoreCase(str1, str2) { // remove?
    return (str1 && str2 && str1.toLowerCase() === str2.toLowerCase());
  }

  static isNode() {
    return (typeof module != 'undefined' && module.exports);
  }

  static isNum(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  static last(word) { // remove?
    if (!word || !word.length) return '';
    return word.charAt(word.length - 1);
  }

  static shuffle(arr, randomable) { // shuffle array
    let newArray = arr.slice(),
      len = newArray.length,
      i = len;
    while (i--) {
      let p = parseInt(randomable.random() * len),
        t = newArray[i];
      newArray[i] = newArray[p];
      newArray[p] = t;
    }
    return newArray;
  }

  static extend(l1, l2) { // remove?
    for (var i = 0; i < l2.length; i++) {
      l1.push(l2[i]);
    }
  }
}

// CLASSES ////////////////////////////////////////////////////////////////////

class RE {

  constructor(regex, offset, suffix) {
    this.raw = regex;
    this.regex = new RegExp(regex);
    this.offset = offset;
    this.suffix = suffix || '';
  }

  applies(word) {
    return this.regex.test(word);
  }

  fire(word) {
    //return this.truncate(Utils.trim(word)) + this.suffix;
    return this.truncate(word) + this.suffix;
  }

  analyze(word) {
    return this.suffix != '' && word.endsWith(this.suffix);
  }

  truncate(word) {
    return (this.offset === 0) ? word : word.substr(0, word.length - this.offset);
  }

  toString() {
    return '/' + this.raw + '/';
  }
}

Utils.RE = function(a, b, c) { return new RE(a, b, c) };

module && (module.exports = Utils);
