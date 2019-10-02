// FUNCTIONS /////////////////////////////////////////////////////////////////

class Utils {

  static trim(str) {
    if (!str || !str.length) return str;
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }

  static last(word) {
    if (!word || !word.length) return E;
    return word.charAt(word.length - 1);
  }

  static equalsIgnoreCase(str1, str2) {
    return (str1 && str2 && str1.toLowerCase() === str2.toLowerCase());
  }

  static isNode() {
    return (typeof module != 'undefined' && module.exports);
  }

  static isNum(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  static last(word) {
    if (!word || !word.length) return E;
    return word.charAt(word.length - 1);
  }

  static extend(l1, l2) {
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
    return '/'+this.raw+'/';
  }
}

Utils.RE = RE; // export RE class

module && (module.exports = Utils);
