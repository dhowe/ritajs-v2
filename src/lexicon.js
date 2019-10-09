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
    let a = arguments;
    //let found = false;

    let isNNWithoutNNS = (w, pos) => (w.endsWith("ness") ||
      w.endsWith("ism") || pos.indexOf("vbg") > 0);

    if (typeof a[0] === "string") {

      a[0] = a[0].trim().toLowerCase();

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

  isAlliteration(word1, word2, useLTS) {

    if (!word1 || !word2 || !word1.length || !word2.length) {
      return false;
    }

    if (word1.indexOf(" ") > -1 || word2.indexOf(" ") > -1) {
      throw Error('isAlliteration expects single words only');
    }

    let c1 = this._firstPhoneme(this._firstStressedSyllable(word1, useLTS)),
      c2 = this._firstPhoneme(this._firstStressedSyllable(word2, useLTS));

    if (this._isVowel(c1.charAt(0)) || this._isVowel(c2.charAt(0))) {
      return false;
    }

    return c1 && c2 && c1 === c2;
  }
  //////////////////////////////////////////////////////////////////////

  _isVowel(c) {

    return c && c.length && RiTa.VOWELS.indexOf(c) > -1;
  }

  _isConsonant(p) {

    return (typeof p === S && p.length === 1 && // precompile
      RiTa.VOWELS.indexOf(p) < 0 && /^[a-z\u00C0-\u00ff]+$/.test(p));
  }

  _firstPhoneme(rawPhones) {

    if (!rawPhones || !rawPhones.length) return '';

    let phones = rawPhones.split(RiTa.PHONEME_BOUNDARY);

    if (phones) return phones[0];

    return ''; // return null?
  }

  _firstStressedSyllable(word, useLTS) {

    let raw = this._getRawPhones(word, useLTS);

    if (!raw || !raw.length) return ''; // return null?

    let idx = raw.indexOf(RiTa.STRESSED);

    if (idx < 0) return ''; // no stresses... return null?

    let c = raw.charAt(--idx);

    while (c != ' ') {
      if (--idx < 0) {
        // single-stressed syllable
        idx = 0;
        break;
      }
      c = raw.charAt(idx);
    }

    let firstToEnd = idx === 0 ? raw : raw.substring(idx).trim();
    idx = firstToEnd.indexOf(' ');

    return idx < 0 ? firstToEnd : firstToEnd.substring(0, idx);
  }

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

    if (rdata === undefined || useLTS) { // ??

      phones = RiTa.lts && RiTa.lts.getPhones(word);
      if (phones && phones.length) {
        return RiTa.syllabifier.fromPhones(phones);
      }
    }

    return (rdata && rdata.length === 2) ? rdata[0] : '';
  }
}

module && (module.exports = Lexicon);
