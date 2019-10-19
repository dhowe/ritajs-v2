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
    for (let i = 0; i < l2.length; i++) {
      l1.push(l2[i]);
    }
  }

  // med for 2 strings (or 2 arrays)
  static minEditDist(source, target) {

    //log('computeRaw: '+arguments.length+ " "+Type.get(source));

    if (Array.isArray(source)) {
      return Utils.arrayMinEditDist(source, target);
    }

    if (!source.length && !target.length) return 0;

    let i, j, matrix = []; // matrix
    let cost; // cost
    let sI; // ith character of s
    let tJ; // jth character of t

    // Step 1 ----------------------------------------------

    let sourceLength = source.length;
    let targetLength = target.length;

    if (!sourceLength) return targetLength;

    if (!targetLength) return sourceLength;

    // Step 2 ----------------------------------------------

    for (i = 0; i <= sourceLength; i++) {
      matrix[i] = [];
      matrix[i][0] = i;
    }

    for (j = 0; j <= targetLength; j++)
      matrix[0][j] = j;

    // Step 3 ----------------------------------------------

    for (i = 1; i <= sourceLength; i++) {
      sI = source.charAt(i - 1);

      // Step 4 --------------------------------------------

      for (j = 1; j <= targetLength; j++) {
        tJ = target.charAt(j - 1);

        // Step 5 ------------------------------------------

        cost = (sI == tJ) ? 0 : 1;

        // Step 6 ------------------------------------------
        matrix[i][j] = Utils._min3(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost);
      }
    }

    // Step 7 ----------------------------------------------

    return matrix[sourceLength][targetLength];
  }

  // med where each array element either matches or does not
  static arrayMinEditDist(srcArr, trgArr) {

    //log((srcArr)+" "+(trgArr));

    let matrix = []; // matrix
    let sI; // ith element of s
    let tJ; // jth element of t
    let cost; // cost
    let i, j, sl, tl;

    // Step 1 ----------------------------------------------

    if (!srcArr.length) return trgArr.length;

    if (!trgArr.length) return srcArr.length;

    // Step 2 ----------------------------------------------

    for (i = 0, sl = srcArr.length; i <= sl; i++) {

      matrix[i] = [];
      matrix[i][0] = i;
    }

    for (j = 0, tl = trgArr.length; j <= tl; j++)
      matrix[0][j] = j;

    // Step 3 ----------------------------------------------

    for (i = 1, sl = srcArr.length; i <= sl; i++) {

      sI = srcArr[i - 1];

      // Step 4 --------------------------------------------

      for (j = 1, tl = trgArr.length; j <= tl; j++) {

        tJ = trgArr[j - 1];

        // Step 5 ------------------------------------------

        cost = (sI === tJ) ? 0 : 1;

        // Step 6 ------------------------------------------

        matrix[i][j] = Utils._min3(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost);
      }
    }

    // Step 7 ----------------------------------------------

    return matrix[srcArr.length][trgArr.length];
  }

  static _min3(a, b, c) {
    let min = a;
    if (b < min) min = b;
    if (c < min) min = c;
    return min;
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

//
// class MinEditDist {
//
// }

//Utils.MinEditDist = MinEditDist; // class
Utils.RE = function(a, b, c) { return new RE(a, b, c) };

module && (module.exports = Utils);
