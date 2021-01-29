const Util = require("./util");

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
      phones: '',
      stresses: '',
      syllables: '',
      pos: tags.join(' '),
      tokens: words.join(' ')
    }

    for (let i = 0; i < words.length; i++) {
      let { phones, stresses, syllables } = this.analyzeWord(words[i], opts);
      features.phones += phones;
      features.stresses += stresses;
      features.syllables += syllables;
    }

    features.phones = features.phones.trim();
    features.stresses = features.stresses.trim();
    features.syllables = features.syllables.trim();

    return features;
  }

  computePhones(word, opts) {
    const LetterToSound = require("./rita_lts");
    if (!this.lts) this.lts = new LetterToSound(this.RiTa);
    return this.lts.buildPhones(word, opts);
  }

  phonesToStress(phones) {
    if (!phones) return;
    let stress = '';
    let syls = phones.split(' ');
    for (let j = 0; j < syls.length; j++) {
      if (!syls[j].length) continue;
      stress += syls[j].includes('1') ? '1' : '0';
      if (j < syls.length - 1) stress += '/';
    }
    return stress;
  }

  analyzeWord(word, opts = {}) {

    let RiTa = this.RiTa;

    // check the cache first
    let result = RiTa.CACHING && this.cache[word];
    if (typeof result === 'undefined') {

      let useRaw = false; //opts && opts.useRaw;
      let slash = '/', delim = '-';
      let lex = this.RiTa.lexicon();
      let rawPhones = lex.rawPhones(word, { noLts: true });

      // if its a simple plural ending in 's',
      // and the singular is in the lexicon, add '-z' to end
      if (!rawPhones && word.endsWith('s')) {
        let sing = RiTa.singularize(word);
        rawPhones = lex.rawPhones(sing, { noLts: true });
        rawPhones && (rawPhones += '-z'); // add 's' phone
      }

      let silent = RiTa.SILENT || RiTa.SILENCE_LTS || (opts && opts.silent);

      // if no phones yet, try the lts-engine
      if (!rawPhones) {
        let ltsPhones = this.computePhones(word, opts);
        if (ltsPhones && ltsPhones.length > 0) {
          if (!silent && lex.size() && word.match(HAS_LETTER_RE)) {
            console.log("[RiTa] Used LTS-rules for '" + word + "'");
          }
          rawPhones = Util.syllablesFromPhones(ltsPhones);
        }
        else {
          rawPhones = word;
          useRaw = true;
        }
      }

      // compute phones and syllables
      let sp = rawPhones.replace(/1/g, '').replace(/ /g, delim) + ' ';
      let phones = (sp === 'dh ') ? 'dh-ah ' : sp; // special case
      let ss = rawPhones.replace(/ /g, slash).replace(/1/g, '') + ' ';
      let syllables = (ss === 'dh ') ? 'dh-ah ' : ss;

      // compute stresses if needed
      let stresses = useRaw ? word : this.phonesToStress(rawPhones);
      if (!stresses.endsWith(' ')) stresses += ' ';

      result = { phones, stresses, syllables };

      // add to cache if enabled
      if (RiTa.CACHING) this.cache[word] = result;
    }

    return result;
  }
}

const HAS_LETTER_RE = /[a-zA-Z]+/;

module && (module.exports = Analyzer);
