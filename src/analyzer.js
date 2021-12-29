import Util from "./util";
import LetterToSound from "./rita_lts";

const E = '', SP = ' ';

class Analyzer {

  constructor(parent) {
    this.cache = {};
    this.RiTa = parent;
    this.lts = undefined;
  }

  analyze(text, opts) {
    let words = this.RiTa.tokenizer.tokenize(text);
    let tags = this.RiTa.pos(text, opts); // don't fail if no lexicon

    let features = {
      phones: E,
      stresses: E,
      syllables: E,
      pos: tags.join(SP),
      tokens: words.join(SP),
    };

    for (let i = 0; i < words.length; i++) {
      let { phones, stresses, syllables } = this.analyzeWord(words[i], opts);
      features.phones += SP + phones;
      features.stresses += SP + stresses;
      features.syllables += SP + syllables;
    }

    features.phones = features.phones.trim();
    features.stresses = features.stresses.trim();
    features.syllables = features.syllables.trim();

    return features;
  }

  computePhones(word, opts) {
    if (!this.lts) this.lts = new LetterToSound(this.RiTa);
    return this.lts.buildPhones(word, opts);
  }

  phonesToStress(phones) {
    if (!phones) return;

    let stresses = E, words = phones.split('_');
    for (let i = 0; i < words.length; i++) {
      let syls = words[i].split(SP), stress = E;
      for (let j = 0; j < syls.length; j++) {
        if (!syls[j].length) continue;
        stress += syls[j].includes('1') ? '1' : '0';
        if (j < syls.length - 1) stress += '/';
      }
      stresses += stress;
      if (i < words.length - 1) stresses += '_';
    }
    return stresses;
  }

  analyzeWord(word, opts = {}) {
    let RiTa = this.RiTa;

    // check the cache first
    let result = RiTa.CACHING && this.cache[word];

    if (!result) {
      let useRaw = false;
      let slash = "/", delim = "-";
      let lex = this.RiTa.lexicon();
      let rawPhones = lex.rawPhones(word, { noLts: true });

      // if its a simple plural ending in 's',
      // and the singular is in the lexicon, add '-z' to end
      if (!rawPhones && word.endsWith("s")) {
        let sing = RiTa.singularize(word);
        rawPhones = lex.rawPhones(sing, { noLts: true });
        if (rawPhones) rawPhones += "-z"; // add 's' phone
      }

      // if no phones yet, check for number
      if (!rawPhones && Util.isNum(word)) {
        // if (/^[0-9]$/.test(num)) { // 
        //   rawPhones = Util.Phones.digits[parseInt(num)];//.split('-');
        // }
        if (/^[0-9]+$/.test(word)) { // do we have a basic int?
          word = Util.numberToWords(word).replace(/\s/g, '_');
        }
      }

      // if no phones yet, check for a compound_word
      if (!rawPhones && word.includes('_')) {
        let parts = word.split('_');
        let raws = [], missed = false;
        for (let i = 0; i < parts.length; i++) {
          let raw = lex.rawPhones(parts[i], { noLts: true });
          if (!raw) {
            raws = undefined;
            break;
          }
          raws.push(...raw);
          if (i < parts.length - 1) raws.push('_');
        }
        if (raws) {
          rawPhones = raws.join('');
          //console.log('UNDERSCORE: ', rawPhones);
        }
      }


      // TODO: what about verb forms here?? TestCase?
      let silent = RiTa.SILENT || RiTa.SILENCE_LTS || (opts && opts.silent);

      // if no phones yet, try the lts-engine
      if (!rawPhones) {
        let ltsPhones = this.computePhones(word, opts);
        if (ltsPhones && ltsPhones.length) {
          if (!silent && lex.size()) {
            // && word.match(HAS_LETTER_RE)) {
            console.log("[RiTa] Used LTS-rules for '" + word + "'");
          }
          rawPhones = Util.syllablesFromPhones(ltsPhones);
        } else {
          rawPhones = word;
          useRaw = true;
        }
      }

      // compute phones and syllables
      let sp = rawPhones.replace(/1/g, E).replace(/ /g, delim) + SP;
      let phones = sp === "dh " ? "dh-ah " : sp; // special case
      let ss = rawPhones.replace(/ /g, slash).replace(/1/g, E) + SP;
      let syllables = ss === "dh " ? "dh-ah " : ss;

      // compute stresses if needed
      let stresses = useRaw ? word : this.phonesToStress(rawPhones);

      result = { phones, stresses, syllables };
      Object.keys(result).forEach(k => result[k] = result[k].replace(/_/g, ' ').trim());

      // add to cache if enabled
      if (RiTa.CACHING) this.cache[word] = result;
    }

    return result;
  }
}

//const HAS_LETTER_RE = /[a-zA-Z]+/;

export default Analyzer;
