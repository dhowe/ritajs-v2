const Util = require("./util");

let RiTa;

class Lexicon {

  constructor(parent, dict) {
    RiTa = parent;
    this.dict = dict;
    this.lexWarned = false;
  }

  /*
    opts:
      minWordLength: return only words whose length is greater than this num
      maxWordLength: return only words whose length is less than this num
  */
  alliterations(word, opts) {

    opts = opts || {};
    let silent = opts.silent;
    let minLen = opts.minWordLength || 4;
    let maxLen = opts.maxWordLength || Number.MAX_SAFE_INTEGER;

    // if multiple words, just use the first
    if (word.includes(' ')) word = word.replace(/ .*/, '');

    // only allow consonant inputs ?
    if (RiTa.VOWELS.includes(word.charAt(0))) {
      if (!RiTa.SILENT) console.warn
      if (!silent && !RiTa.SILENT) console.warn
        ('Expects a word starting with a consonant, got: ' + word);
      return [];
    }

    let results = [];
    let words = Object.keys(this._dict(true));
    let fss = this._firstStressedSyl(word);
    let phone = this._firstPhone(fss);

    // make sure we parsed first phoneme
    if (!phone || !phone.length) {
      if (!silent && !RiTa.SILENT) console.warn
        ('Failed parsing first phone in "' + word + '"');
      return [];
    }

    for (let i = 0; i < words.length; i++) {
      if (words[i] !== word && words[i].length >= minLen
        && words[i].length <= maxLen) {
        let c2 = this._firstPhone(this._firstStressedSyl(words[i]));
        if (phone === c2) results.push(words[i]);
      }
    }
    return results;//Util.shuffle(results, RiTa);
  }

  /*
  opts:
    minWordLength: return only words whose length is greater than this num
    maxWordLength: return only words whose length is less than this num
  */
  rhymes(word, opts) {

    opts = opts || {};
    let minLen = opts.minWordLength || 3;
    let maxLen = opts.maxWordLength || Number.MAX_SAFE_INTEGER;

    if (!word || !word.length) return [];
    word = word.toLowerCase();

    let results = [];
    let dict = this._dict(true);
    let words = Object.keys(dict);
    let phone = this._lastStressedPhoneToEnd(word);

    for (let i = 0; i < words.length; i++) {
      if (words[i] !== word && words[i].length >= minLen && words[i].length <= maxLen) {
        if (dict[words[i]][0].endsWith(phone)) {
          results.push(words[i]);
        }
      }
    }
    return results;
  }

  randomWord(opts) {

    opts = opts || {};
    const minLen = opts.minWordLength || 4;
    const numSyls = opts.numSyllables || 0;
    const maxLen = opts.maxWordLength || Number.MAX_SAFE_INTEGER;
    const dict = this._dict(true), words = Object.keys(dict);
    const ran = Math.floor(RiTa.randInt(words.length));
    const massNouns = ['dive', 'people', 'salespeople'];

    let targetPos = opts.pos || false;
    let pluralize = false, conjugate = false;

    if (targetPos && targetPos.length) {
      targetPos = targetPos.trim().toLowerCase();
      pluralize = (targetPos === "nns");
      conjugate = (targetPos[0] === "v" && targetPos.length > 2);
      if (targetPos[0] === "n") targetPos = "nn";
      else if (targetPos[0] === "v") targetPos = "vb";
      else if (targetPos === "r") targetPos = "rb";
      else if (targetPos === "a") targetPos = "jj";
    }

    let isMassNoun = (w, pos) => {
      return w.endsWith("ness") ||
        w.endsWith("ism") ||
        pos.indexOf("vbg") > 0 ||
        massNouns.includes(w);
    }

    for (let k = 0; k < words.length; k++) {
      let j = (ran + k) % words.length;

      if (words[j].length > maxLen || words[j].length < minLen) {
        continue;
      }

      let word = words[j], rdata = dict[word];

      // match the syls if supplied
      if (numSyls && numSyls !== rdata[0].split(' ').length) {
        continue;
      }

      // match the pos if supplied (may need to inflect)
      if (targetPos) {

        let result = words[j];
        let firstPos = rdata[1].split(' ')[0];
        if (targetPos !== firstPos) continue;

        // we've matched our part-of-speech

        if (pluralize) { // try to pluralize

          // match plural noun
          if (isMassNoun(words[j], rdata[1])) continue;
          result = RiTa.pluralize(words[j]);
        }
        /*
        VBD 	Verb, past tense
        VBG 	Verb, gerund or present participle
        VBN 	Verb, past participle
        VBP 	Verb, non-3rd person singular present
        VBZ 	Verb, 3rd person singular present
        */
        else if (conjugate) { // try to inflect
          switch (opts.pos) {
            case 'vbd':
              result = RiTa.conjugate(verb, {
                number: RiTa.SINGULAR,
                person: RiTa.FIRST_PERSON,
                tense: RiTa.PAST_TENSE
              });
              break;
            case 'vbg':
              result = RiTa.presentParticiple(words[j]);
              break;
            case 'vbn':
              result = RiTa.pastParticiple(words[j]);
              break;
            case 'vbp':
              result = RiTa.conjugate(words[j]); // no args
              break;
            case 'vbz':
              result = RiTa.conjugate(words[j], {
                number: RiTa.SINGULAR,
                person: RiTa.THIRD_PERSON,
                tense: RiTa.PRESENT_TENSE
              });
              break;
            default: throw Error('Unexpected pos: ' + targetPos);
          }
        }
        if (numSyls) { // Need to make sure we dont change syllable count
          
          let tmp = RiTa.SILENCE_LTS;
          RiTa.SILENCE_LTS = true;
          let count = RiTa.syllables(result).split(RiTa.SYLLABLE_BOUNDARY).length;
          RiTa.SILENCE_LTS = tmp;
          if (count !== numSyls) {
            //console.log('skip: ' + verb);
            continue;
          }
        }

        return result;
      }
      else {
        return words[j]; // no pos to match
      }
    }
    throw Error('No word with specified options: ' + JSON.stringify(opts));
  }

  /*
  opts:
    minWordLength: return only words whose length is greater than this num
    maxWordLength: return only words whose length is less than this num
    minAllowedDistance: disregard words with distance less than this num
  */
  similarBy(word, opts) {

    if (!word || !word.length) return [];

    opts = opts || {};
    opts.type = opts.type || 'letter';
    return (opts.type === 'soundAndLetter') ?
      this._similarBySoundAndLetter(word, opts)
      : this._similarByType(word, opts);
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

  //////////////////////////// helpers /////////////////////////////////

  _similarByType(word, opts) { // NIAPI, optimize? cache?

    let minLen = opts.minWordLength || 2;
    let maxLen = opts.maxWordLength || Number.MAX_VALUE;
    let minMed = opts.minAllowedDistance || 1;

    let result = [], dict = this._dict(true);
    let sound = opts.type === 'sound'; // default: letter 
    let input = word.toLowerCase(), words = Object.keys(dict);
    let variations = [input, input + 's', input + 'es'];
    let phonesA = sound ? this._toPhoneArray
      (this._rawPhones(input)) : input;

    let entry, phonesB, med, minVal = Number.MAX_VALUE;
    for (let i = 0; i < words.length; i++) {
      entry = words[i];
      if (entry.length < minLen || entry.length > maxLen || variations.includes(entry)) {
        continue;
      }
      phonesB = sound ? dict[entry][0].replace(/1/g, '').replace(/ /g, '-').split('-') : entry;
      med = this._minEditDist(phonesA, phonesB);

      // found something even closer
      if (med >= minMed && med < minVal) {
        minVal = med;
        result = [entry];
      }

      // another best to add
      else if (med === minVal) {
        result.push(entry);
      }
    }
    return result;
  }

  _similarBySoundAndLetter(word, opts) {

    opts.type = 'letter';
    let simLetter = this._similarByType(word, opts);
    if (simLetter.length < 1) return [];

    opts.type = 'sound';
    let simSound = this._similarByType(word, opts);
    if (simSound.length < 1) return [];

    return this._intersect(simSound, simLetter);
  }

  _toPhoneArray(raw) {
    return raw.replace(/[01]/g, '').replace(/ /g, '-').split('-');
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

    let rdata = this._lookupRaw(word, fatal);
    return (rdata && rdata.length === 2) ? rdata[1].split(' ') : [];
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

  // med for 2 strings (or 2 arrays)
  _minEditDist(source, target) {

    let i, j, matrix = []; // matrix
    let cost; // cost
    let sI; // ith character of s
    let tJ; // jth character of t

    // Step 1 ----------------------------------------------

    for (i = 0; i <= source.length; i++) {
      matrix[i] = [];
      matrix[i][0] = i;
    }

    for (j = 0; j <= target.length; j++) {
      matrix[0][j] = j;
    }

    // Step 2 ----------------------------------------------

    for (i = 1; i <= source.length; i++) {
      sI = source[i - 1];

      // Step 3 --------------------------------------------

      for (j = 1; j <= target.length; j++) {
        tJ = target[j - 1];

        // Step 4 ------------------------------------------

        cost = (sI == tJ) ? 0 : 1;

        // Step 5 ------------------------------------------
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost);
      }
    }

    // Step 6 ----------------------------------------------

    return matrix[source.length][target.length];
  }
}

module && (module.exports = Lexicon);
