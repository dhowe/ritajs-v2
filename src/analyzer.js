const Util = require("./util");

class Analyzer {

  constructor(parent) {
    this.cache = {};
    this.RiTa = parent;
    this.lexicon = parent.lexicon();
  }

  analyze(text, opts) {
    let words = this.RiTa.tokenizer.tokenize(text);
    let tags = this.RiTa.tagger.tag(text, opts); // don't fail if no lexicon
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

  analyzeWord(word, opts = {}) {

    let RiTa = this.RiTa;
    let silentLts = opts && opts.silent;

    // check the cache first
    let result = RiTa.CACHING && this.cache[word];
    if (typeof result === 'undefined') {

      let useRaw = false, slash = '/', delim = '-';
      let rawPhones = this.lexicon.rawPhones(word, { noLts: true });

      // if its a simple plural ending in 's',
      // and the singular is in the lexicon, add '-z' to end
      if (!rawPhones && word.endsWith('s')) {
        let sing = RiTa.singularize(word);
        rawPhones = this.lexicon.rawPhones(sing, { noLts: true });
        rawPhones && (rawPhones += '-z'); // add 's' phone
      }

      // if no phones yet, try the lts-engine
      if (!rawPhones) {
        let ltsPhones = RiTa.lts && RiTa.lts.computePhones(word);
        if (ltsPhones && ltsPhones.length > 0) {
          if (!RiTa.SILENT && !RiTa.SILENCE_LTS && !silentLts
            && RiTa.hasLexicon() && word.match(HAS_LETTER_RE)) {
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
      let stresses = '';
      let sp = rawPhones.replace(/1/g, '').replace(/ /g, delim) + ' ';
      let phones = (sp === 'dh ') ? 'dh-ah ' : sp; // special case
      let ss = rawPhones.replace(/ /g, slash).replace(/1/g, '') + ' ';
      let syllables = (ss === 'dh ') ? 'dh-ah ' : ss;

      // compute stresses if needed
      if (!useRaw) {
        let stressyls = rawPhones.split(' ');
        for (let j = 0; j < stressyls.length; j++) {
          if (!stressyls[j].length) continue;
          stresses += stressyls[j].includes(RiTa.STRESSED) ? RiTa.STRESSED : RiTa.UNSTRESSED;
          if (j < stressyls.length - 1) stresses += slash;
        }
      } else {
        stresses += word;
      }
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
