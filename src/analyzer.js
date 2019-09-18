let RiTa;

class Analyzer {

  constructor(parent) {
    RiTa = parent;
    this.cache = {};
  }

  analyze(text) {

    let stressyls, phones, lts, ltsPhones, useRaw;
    let phonemes = '',
      syllables = '',
      stresses = '',
      slash = '/',
      delim = '-',
      features = {},
      lex = RiTa.lexicon;

    let words = RiTa.tokenizer.tokenize(text);
    let tags = RiTa.posTags(text);

    features.tokens = words.join(' ');
    features.pos = tags.join(' ');

    for (let i = 0, l = words.length; i < l; i++) {

      useRaw = false;
      phones = lex._getRawPhones(words[i]);

      if (!phones) {

        lts = lex._letterToSound();
        ltsPhones = lts && lts.getPhones(words[i]);
        if (ltsPhones && ltsPhones.length > 0) {

          if (words[i].match(/[a-zA-Z]+/))
            log("[RiTa] Used LTS-rules for '" + words[i] + "'");

          phones = RiTa.syllables(ltsPhones);

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

    stresses = stresses.trim();
    phonemes = phonemes.trim().replace(/\\s+/, ' ');
    syllables = syllables.trim().replace(/\\s+/, ' ');

    features.stresses = stresses;
    features.phonemes = phonemes;
    features.syllables = syllables;

    return this;
  }
}

module && (module.exports = Analyzer);
