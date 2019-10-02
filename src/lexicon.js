const Util = require("./utils");

let RiTa;

class Lexicon {

  constructor(parent, dict) {
    RiTa = parent;
    this.dict = dict;
  }

  alliterations(word) {
    return [];
  }

  hasWord(word) {
    word = word ? word.toLowerCase() : '';
    return this.dict.hasOwnProperty(word) || RiTa.pluralizer.isPlural(word);
  }

  rhymes(word) {
    return [];
  }

  similarBy(word) {
    return [];
  }

  words() {
    return Object.keys(this.dict);
  }

  randomWord() {

    let i, j, rdata, numSyls;
    let words = Object.keys(this.dict);
    let ran = Math.floor(RiTa.random(0, words.length));
    let pluralize = false;
    let found = false;
    let a = arguments;

    let isNNWithoutNNS = (w, pos) => (w.endsWith("ness") ||
      w.endsWith("ism") || pos.indexOf("vbg") > 0);

    if (typeof a[0] === "string") {

      a[0] = trim(a[0]).toLowerCase();

      pluralize = (a[0] === "nns");

      if (a[0] === "n" || a[0] === "nns") a[0] = "nn";
      else if (a[0] === "v") a[0] = "vb";
      else if (a[0] === "r") a[0] = "rb";
      else if (a[0] === "a") a[0] = "jj";

    }

    switch (a.length) {

      case 2: // a[0]=pos  a[1]=syllableCount

        for (i = 0; i < words.length; i++) {
          j = (ran + i) % words.length;
          rdata = this.dict[words[j]];
          numSyls = rdata[0].split(' ').length;
          if (numSyls === a[1] && a[0] === rdata[1].split(' ')[0]) {
            if (!pluralize) return words[j];
            else if (!isNNWithoutNNS(words[j], rdata[1])) {
              return RiTa.pluralize(words[j]);
            }
          }
        }
        //warn("No words with pos=" + a[0] + " found");
        break;

      case 1:

        if (typeof a[0] === 'string') { // a[0] = pos

          for (i = 0; i < words.length; i++) {
            j = (ran + i) % words.length;
            rdata = this.dict[words[j]];
            if (a[0] === rdata[1].split(' ')[0]) {
              if (!pluralize) return words[j];
              else if (!isNNWithoutNNS(words[j], rdata[1])) {
                return RiTa.pluralize(words[j]);
              }
            }
          }

          //warn("No words with pos=" + a[0] + " found");

        } else {

          // a[0] = syllableCount
          for (i = 0; i < words.length; i++) {
            j = (ran + i) % words.length;
            rdata = this.dict[words[j]];
            if (rdata[0].split(' ').length === a[0]) {
              return words[j];
            }
          }
        }
        break;

      case 0:
        return words[ran];
    }

    return '';
  }

  //////////////////////////////////////////////////////////////////////

  _getPosData(word) {

    let rdata = this._lookupRaw(word);
    return (rdata && rdata.length === 2) ? rdata[1] : '';
  }

  _getPosArr(word) {

    let pl = this._getPosData(word);
    if (!pl || !pl.length) return [];
    return pl.split(' ');
  }

  _getBestPos(word) {

    let pl = this._getPosArr(word);
    return (pl.length > 0) ? pl[0] : [];
  }

  _lookupRaw(word) {

    word = word && word.toLowerCase();
    if (this.dict && this.dict[word]) return this.dict[word];
  }

  _getRawPhones(word, useLTS) { // TODO: confusing -> break into 2 funcs

    let phones, rdata = this._lookupRaw(word);
    useLTS = useLTS || false;

    if (!rdata && useLTS) {

      phones = RiTa.lts && RiTa.lts.getPhones(word);
      if (phones && phones.length)
        return RiTa.syllables(phones);

    }
    return (rdata && rdata.length === 2) ? rdata[0] : '';
  }
}

module && (module.exports = Lexicon);
