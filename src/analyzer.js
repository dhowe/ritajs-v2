const Util = require("./util");

let RiTa;

class Analyzer {

  constructor(parent) {
    RiTa = parent;
    this.cache = {};
    this.lexicon = RiTa._lexicon();
  }

  analyze(text) {
    let phonemes = '', syllables = '', stresses = '';
    let slash = '/', delim = '-', features = {};
    let words = RiTa.tokenizer.tokenize(text);
    let tags = RiTa.tagger.tag(text); // don't fail if no lexicon

    features.tokens = words.join(' ');
    features.pos = tags.join(' ');

    for (let i = 0, l = words.length; i < l; i++) {

      let useRaw = false;
      let word = words[i];
      let phones = this.lexicon._rawPhones(word, { noLts: true });

      // if its a simple plural ending in 's',
      // and the singular is the lexicon, add '-z' to end
      if (!phones && word.endsWith('s')) {
        let sing = RiTa.singularize(word);
        phones = this.lexicon._rawPhones(sing, { noLts: true });
        phones && (phones += '-z'); // add 's' phone
      }

      // if no phones yet, try the lts-engine
      if (!phones) {

        let ltsPhones = RiTa.lts && RiTa.lts.getPhones(word);
        if (ltsPhones && ltsPhones.length > 0) {

          if (!RiTa.SILENT && !RiTa.SILENCE_LTS && RiTa.hasLexicon() && word.match(/[a-zA-Z]+/)) {
            console.log("[RiTa] Used LTS-rules for '" + word + "'");
          }
          phones = Util.syllablesFromPhones(ltsPhones);

        } else {

          phones = word;
          useRaw = true;
        }
      }

      let sp = phones.replace(/[0-2]/g, '').replace(/ /g, delim) + ' ';
      phonemes += (sp === 'dh ') ? 'dh-ah ' : sp; // special case
      let ss = phones.replace(/ /g, slash).replace(/1/g, '') + ' ';
      syllables += (ss === 'dh ') ? 'dh-ah ' : ss;

      if (!useRaw) {
        let stressyls = phones.split(' ');
        for (let j = 0; j < stressyls.length; j++) {

          if (!stressyls[j].length) continue;

          stresses += stressyls[j].includes(RiTa.STRESSED) ? RiTa.STRESSED : RiTa.UNSTRESSED;

          if (j < stressyls.length - 1) stresses += slash;
        }
      } else {

        stresses += word;
      }

      if (!stresses.endsWith(' ')) stresses += ' ';
    }

    features.stresses = stresses.trim();
    features.phonemes = phonemes.trim();
    features.syllables = syllables.trim();

    return features;
  }
}

module && (module.exports = Analyzer);
