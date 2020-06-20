const Util = require("./util");

let RiTa;

class Analyzer {

  constructor(parent) {
    RiTa = parent;
    this.cache = {};
    this.lexicon = RiTa.lexicon();
  }

  analyze(text) {

    let words = RiTa.tokenizer.tokenize(text);
    let tags = RiTa.tagger.tag(text); // don't fail if no lexicon
    let features = {
      phones: '',
      stresses: '',
      syllables: '',
      pos: tags.join(' '),
      tokens: words.join(' ')
    }

    for (let i = 0; i < words.length; i++) {
      let { phones, stresses, syllables } = this.analyzeWord(words[i]);
      features.phones += phones;
      features.stresses += stresses;
      features.syllables += syllables;
    }

    features.phones = features.phones.trim();
    features.stresses = features.stresses.trim();
    features.syllables = features.syllables.trim();

    return features;
  }

  analyzeWord(word) {

    if (typeof this.cache[word] === 'undefined') {

      let useRaw = false, slash = '/', delim = '-';
      let rawphones = this.lexicon._rawPhones(word, { noLts: true });

      // if its a simple plural ending in 's',
      // and the singular is in the lexicon, add '-z' to end
      if (!rawphones && word.endsWith('s')) {
        let sing = RiTa.singularize(word);
        rawphones = this.lexicon._rawPhones(sing, { noLts: true });
        rawphones && (rawphones += '-z'); // add 's' phone
      }

      // if no phones yet, try the lts-engine
      if (!rawphones) {

        let ltsPhones = RiTa.lts && RiTa.lts.computePhones(word);
        if (ltsPhones && ltsPhones.length > 0) {
          if (!RiTa.SILENT && !RiTa.SILENCE_LTS && RiTa.hasLexicon() && word.match(/[a-zA-Z]+/)) {
            console.log("[RiTa] Used LTS-rules for '" + word + "'");
          }
          rawphones = Util.syllablesFromPhones(ltsPhones);
        } else {
          rawphones = word;
          useRaw = true;
        }
      }

      let stresses = '';
      let sp = rawphones.replace(/[0-2]/g, '').replace(/ /g, delim) + ' ';
      let phones = (sp === 'dh ') ? 'dh-ah ' : sp; // special case
      let ss = rawphones.replace(/ /g, slash).replace(/1/g, '') + ' ';
      let syllables = (ss === 'dh ') ? 'dh-ah ' : ss;

      if (!useRaw) {
        let stressyls = rawphones.split(' ');
        for (let j = 0; j < stressyls.length; j++) {
          if (!stressyls[j].length) continue;
          stresses += stressyls[j].includes(RiTa.STRESSED) ? RiTa.STRESSED : RiTa.UNSTRESSED;
          if (j < stressyls.length - 1) stresses += slash;
        }
      } else {
        stresses += word;
      }
      if (!stresses.endsWith(' ')) stresses += ' ';

      let features = { phones, stresses, syllables };
      if (!RiTa.CACHING) return features;
      this.cache[word] = features;
    }

    return this.cache[word];
  }
}

module && (module.exports = Analyzer);
