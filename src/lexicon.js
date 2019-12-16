const Util = require("./util");

let RiTa;

class Lexicon {

  constructor(parent, dict) {
    RiTa = parent;
    this.dict = dict;
    this.lexWarned = false;
  }

  alliterations(word, { matchMinLength = 4 } = {}) {

    word = word.includes(' ') ? word.substring(0, word.indexOf(' ')) : word;

    if (RiTa.VOWELS.includes(word.charAt(0))) return [];

    let results = [];
    let words = Object.keys(this._dict(true));
    let fss = this._firstStressedSyl(word);
    let c1 = this._firstPhone(fss);

    if (!c1 || !c1.length) return [];

    for (let i = 0; i < words.length; i++) {

      if (words[i].length < matchMinLength) continue;

      let c2 = this._firstPhone(this._firstStressedSyl(words[i]));

      if (RiTa.VOWELS.includes(word.charAt(0))) return []; // ????

      if (c1 === c2) results.push(words[i]);
    }

    return Util.shuffle(results, RiTa);
  }

  rhymes(theWord) {

    if (!theWord || !theWord.length) return [];

    let dict = this._dict(true);
    let word = theWord.toLowerCase();

    let results = [];
    let words = Object.keys(this._dict(true));
    let p = this._lastStressedPhoneToEnd(word);

    for (let i = 0; i < words.length; i++) {

      if (words[i] === word) continue;

      if (dict[words[i]][0].endsWith(p)) {
        results.push(words[i]);
      }
    }

    return results;
  }

  similarBy(word, opts) {

    if (!word || !word.length) return [];

    opts = opts || {};
    opts.type = opts.type || 'letter';

    return (opts.type === 'soundAndLetter') ?
      this.similarBySoundAndLetter(word, opts)
      : this.similarByType(word, opts);
  }

  similarByType(word, opts) {

    // TODO: optimize
    let minLen = opts && opts.minimumWordLen || 2;
    let preserveLength = opts && opts.preserveLength || 0;
    let minAllowedDist = opts && opts.minAllowedDistance || 1;

    let result = [];
    let dict = this._dict(true);
    let sound = (opts.type === 'sound');

    let input = word.toLowerCase();
    let words = Object.keys(dict);
    let variations = [input, input + 's', input + 'es'];

    let compareA = sound ? this._toPhoneArray
      (this._rawPhones(input)) : input;

    let minVal = Number.MAX_VALUE;
    for (let i = 0; i < words.length; i++) {

      let entry = words[i];

      if ((entry.length < minLen) ||
        (preserveLength && (entry.length !== input.length)) ||
        variations.includes(entry)) {
        continue;
      }

      let compareB = sound ? dict[entry][0]
        .replace(/[01]/g,'')
        .replace(/ /g, '-')
        .split('-') : entry;

      let med = Util.minEditDist(compareA, compareB);

      // found something even closer
      if (med >= minAllowedDist && med < minVal) {
        minVal = med;
        result = [entry];
        //console.log("BEST(" + med + ")" + entry + " -> " + phonesArr);
      }

      // another best to add
      else if (med === minVal) {
        //console.log("TIED(" + med + ")" + entry + " -> " + phonesArr);
        result.push(entry);
      }
    }

    return result;
  }

  similarBySoundAndLetter(word, opts) {

    opts.type = 'letter';
    let simLetter = this.similarByType(word, opts);
    if (simLetter.length < 1) return [];

    opts.type = 'sound';
    let simSound = this.similarByType(word, opts);
    if (simSound.length < 1) return [];

    return this._intersect(simSound, simLetter);
  }

  hasWord(word, fatal) {
    if (!word || !word.length) return false;
    return this._dict(fatal).hasOwnProperty(word.toLowerCase());
  }

  words() {
    return Object.keys(this._dict(true));
  }

  size() {
    let dict = this._dict(false);
    return dict ? Object.keys(dict).length : 0;
  }

  randomWord(opts) {

    let pluralize = false;
    let words = Object.keys(this._dict(true));
    let ran = Math.floor(RiTa.random(words.length));

    let targetPos = opts && opts.pos;
    let targetSyls = opts && opts.syllables || 0;

    let massNouns = ['dive', 'people', 'salespeople'];

    let isMassNoun = (w, pos) => {
      return w.endsWith("ness") ||
        w.endsWith("ism") || pos.indexOf("vbg") > 0 ||
        massNouns.includes(w);
    }

    if (targetPos && targetPos.length) {
      targetPos = targetPos.trim().toLowerCase();
      pluralize = (targetPos === "nns");
      if (targetPos[0] === "n") targetPos = "nn";
      else if (targetPos === "v") targetPos = "vb";
      else if (targetPos === "r") targetPos = "rb";
      else if (targetPos === "a") targetPos = "jj";
    }

    for (let i = 0; i < words.length; i++) {
      let j = (ran + i) % words.length;
      let rdata = this._dict()[words[j]];

      // match the syls if supplied
      if (targetSyls && targetSyls !== rdata[0].split(' ').length) {
        continue;
      }

      if (targetPos) { // match the pos if supplied
        if (targetPos === rdata[1].split(' ')[0]) {

          // match any pos but plural noun
          if (!pluralize) return words[j];

          // match plural noun
          if (!isMassNoun(words[j], rdata[1])) {
            return RiTa.pluralize(words[j]);
          }
        }
      }
      else {
        return words[j]; // no pos to match
      }
    }

    return []; // TODO: failed, should throw here
  }

  isAlliteration(word1, word2) {

    this._dict(true); // throw if no lexicon

    if (!word1 || !word2 || !word1.length || !word2.length) {
      return false;
    }

    if (word1.indexOf(" ") > -1 || word2.indexOf(" ") > -1) {
      throw Error('isAlliteration expects single words only');
    }

    let c1 = this._firstPhone(this._firstStressedSyl(word1)),
      c2 = this._firstPhone(this._firstStressedSyl(word2));

    if (this._isVowel(c1.charAt(0)) || this._isVowel(c2.charAt(0))) {
      return false;
    }

    return c1 && c2 && c1 === c2;
  }

  isRhyme(word1, word2) {


    if (!word1 || !word2 || word1.toUpperCase() === word2.toUpperCase()) {
      return false;
    }

    this._dict(true); // throw if no lexicon

    let phones1 = this._rawPhones(word1),
      phones2 = this._rawPhones(word2);

    if (phones2 === phones1) return false;

    let p1 = this._lastStressedVowelPhonemeToEnd(word1),
      p2 = this._lastStressedVowelPhonemeToEnd(word2);

    return p1 && p2 && p1 === p2;
  }

  //////////////////////////////////////////////////////////////////////

  _toPhoneArray(raw) {
    return raw.replace(/[01]/g,'').replace(/ /g, '-').split('-');
  }

  _isVowel(c) {

    return c && c.length && RiTa.VOWELS.includes(c);
  }

  _isConsonant(p) {

    return (typeof p === S && p.length === 1 && // precompile
      RiTa.VOWELS.indexOf(p) < 0 && /^[a-z\u00C0-\u00ff]+$/.test(p));
  }

  _firstPhone(rawPhones) {

    if (!rawPhones || !rawPhones.length) return '';
    let phones = rawPhones.split(RiTa.PHONEME_BOUNDARY);
    if (phones) return phones[0];
    return ''; // return null?
  }

  _intersect(a1, a2) {
    return [a1, a2].reduce((a, b) => a.filter(e => b.includes(e)))
  }

  _lastStressedPhoneToEnd(word) {

    if (!word || !word.length) return ''; // return null?

    let idx, c, result;
    let raw = this._rawPhones(word);

    if (!raw || !raw.length) return ''; // return null?

    idx = raw.lastIndexOf(RiTa.STRESSED);

    if (idx < 0) return E; // return null?

    c = raw.charAt(--idx);
    while (c != '-' && c != ' ') {
      if (--idx < 0) {
        return raw; // single-stressed syllable
      }
      c = raw.charAt(idx);
    }
    result = raw.substring(idx + 1);

    return result;
  }


  _lastStressedVowelPhonemeToEnd(word) {

    if (!word || !word.length) return ''; // return null?

    let raw = this._lastStressedPhoneToEnd(word);
    if (!raw || !raw.length) return ''; // return null?

    let syllables = raw.split(' ');
    let lastSyllable = syllables[syllables.length - 1];
    lastSyllable = lastSyllable.replace('[^a-z-1 ]', '');

    let idx = -1;
    for (let i = 0; i < lastSyllable.length; i++) {
      let c = lastSyllable.charAt(i);
      if (RiTa.VOWELS.includes(c)) {
        idx = i;
        break;
      }
    }

    return lastSyllable.substring(idx);
  }

  _firstStressedSyl(word) {

    let raw = this._rawPhones(word);

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

  _posData(word, fatal) {

    let rdata = this._lookupRaw(word, fatal);
    return (rdata && rdata.length === 2) ? rdata[1] : '';
  }

  _posArr(word, fatal) {

    let pl = this._posData(word, fatal);
    if (!pl || !pl.length) return [];
    return pl.split(' ');
  }

  _bestPos(word) {

    let pl = this._posArr(word);
    return (pl.length > 0) ? pl[0] : [];
  }

  _lookupRaw(word, fatal) {
    word = word && word.toLowerCase();
    return this._dict(fatal)[word];
  }

  _rawPhones(word, opts) {

    let noLts = opts && opts.noLts;
    let fatal = opts && opts.fatal;
    let rdata = this._lookupRaw(word, fatal);
    if (rdata && rdata.length) return rdata[0];

    if (!noLts) {
      let phones = RiTa.lts && RiTa.lts.getPhones(word);
      return Util.syllablesFromPhones(phones);
    }
    return '';
  }

  _dict(fatal) {
    if (!this.dict) {
      if (fatal) throw Error('This function requires a lexicon, make sure you are using the full version of rita.js,\navailable at ' + RiTa.DOWNLOAD_URL + '\n');
      if (!this.lexWarned) {
        console.warn('[WARN] no lexicon appears to be loaded; feature-analysis and pos-tagging may be incorrect.');
        this.lexWarned = true;
      }
    }
    return this.dict || {};
  }
}

module && (module.exports = Lexicon);
