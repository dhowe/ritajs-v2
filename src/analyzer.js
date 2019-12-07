const Util = require("./util");

let RiTa;
class Analyzer {

  constructor(parent) {
    RiTa = parent;
    this.cache = {};
    this.lexicon = RiTa._lexicon();
  }

  analyze(text) {

    let stressyls, phones, ltsPhones, useRaw;
    let phonemes = '',
      syllables = '',
      stresses = '',
      slash = '/',
      delim = '-',
      features = {};
    let words = RiTa.tokenizer.tokenize(text);
    let tags = RiTa.posTags(text);

    features.tokens = words.join(' ');
    features.pos = tags.join(' ');

    for (let i = 0, l = words.length; i < l; i++) {

      useRaw = false;
      phones = this.lexicon._rawPhones(words[i], { noLts: true });

      //if (!phones) console.log('No lexicon entry for ' + words[i]);

      // if its a simple plural ending in 's', add '-z' to end
      if (!phones && words[i].endsWith('s')) {
        let sing = RiTa.singularize(words[i]);
        phones = this.lexicon._rawPhones(sing);
        phones && (phones += '-z'); // add 's' phone
      }

      // if no phones yet, try the lts-engine
      if (!phones) {

        ltsPhones = RiTa.lts.getPhones(words[i]);
        if (ltsPhones && ltsPhones.length > 0) {
          if (!RiTa.SILENT && !RiTa.SILENCE_LTS && words[i].match(/[a-zA-Z]+/)) {
            console.log("[RiTa] Used LTS-rules for '" + words[i] + "'");
          }
          phones = Util.syllablesFromPhones(ltsPhones);
        } else {
          phones = words[i];
          useRaw = true;
        }
      }

      phonemes += phones.replace(/[0-2]/g, '').replace(/ /g, delim) + ' ';
      syllables += phones.replace(/ /g, slash).replace(/1/g, '') + ' ';

      if (!useRaw) {
        stressyls = phones.split(' ');
        for (let j = 0; j < stressyls.length; j++) {

          if (!stressyls[j].length) continue;

          stresses += (stressyls[j].indexOf(RiTa.STRESSED) > -1) ?
            RiTa.STRESSED : RiTa.UNSTRESSED;

          if (j < stressyls.length - 1) stresses += slash;
        }
      } else {
        stresses += words[i];
      }

      if (!stresses.endsWith(' ')) stresses += ' ';
    }

    features.stresses = stresses.trim();
    features.phonemes = phonemes.trim(); //.replace(/\\s+/, ' '); // needed?
    features.syllables = syllables.trim();//.replace(/\\s+/, ' '); // needed?

    return features;
  }
}

module && (module.exports = Analyzer);
