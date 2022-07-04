import Util from "./util";
import LetterToSound from "./rita_lts";

const SP = ' ', E = '';

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
      tokens: words.join(SP)
    }

    for (let i = 0; i < words.length; i++) {
      let { phones, stresses, syllables } = this.analyzeWord(words[i], opts);
      features.phones += SP + phones;
      features.stresses += SP + stresses;
      features.syllables += SP + syllables;
    }
    Object.keys(features).forEach(k => features[k] = features[k].trim()); // trim

    return features;
  }

  computePhones(word, opts) {
    if (!this.lts) this.lts = new LetterToSound(this.RiTa);
    return this.lts.buildPhones(word, opts);
  }

  phonesToStress(phones) {
    if (!phones) return;
    let stress = E, syls = phones.split(SP);
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

      let slash = '/', delim = '-';
      let lex = this.RiTa.lexicon();
      let phones = word, syllables = word, stresses = word;
      let rawPhones = lex.rawPhones(word, { noLts: true })
        || this._computeRawPhones(word, lex, opts);

      if (rawPhones) {
        
        // compute phones, syllables and stresses
        if (typeof rawPhones === 'string') {
          let sp = rawPhones.replace(/1/g, E).replace(/ /g, delim) + SP;
          phones = (sp === 'dh ') ? 'dh-ah ' : sp; // special case
          let ss = rawPhones.replace(/ /g, slash).replace(/1/g, E) + SP;
          syllables = (ss === 'dh ') ? 'dh-ah ' : ss;
          stresses = this.phonesToStress(rawPhones);
        } 
        else {
          // hyphenated #HWF
          let ps = [], syls = [], strs = [];
          rawPhones.forEach(p => {
            let sp = p.replace(/1/g, E).replace(/ /g, delim);
            ps.push((sp === 'dh ') ? 'dh-ah ' : sp); // special case
            let ss = p.replace(/ /g, slash).replace(/1/g, E);
            syls.push((ss === 'dh ') ? 'dh-ah ' : ss);
            strs.push(this.phonesToStress(p));
          });
          phones = ps.join("-");
          syllables = syls.join("/");
          stresses = strs.join("-");
          // end of #HWF
        }
      }

      result = { phones, stresses, syllables };
      Object.keys(result).forEach(k => result[k] = result[k].trim());

      // add to cache if enabled
      if (RiTa.CACHING) this.cache[word] = result;
    }

    return result;
  }

  _computeRawPhones(word, lex, opts) {
    return word.includes("-")  // #HWF
      ? this._computePhonesHyph(word, lex, opts)
      : this._computePhonesWord(word, lex, opts);
  }

  //#HWF
  _computePhonesHyph(word, lex, opts) {
    let rawPhones = [];
    word.split("-").forEach(p => {
      let part = this._computePhonesWord(p, lex, opts, true);
      if (part && part.length > 0) rawPhones.push(part);
    });
    return rawPhones;
  }

  //#HWF this part is unchanged but move to a separated function
  _computePhonesWord(word, lex, opts, isPart) {
    let rawPhones, RiTa = this.RiTa;
    if (isPart) rawPhones = lex.rawPhones(word, { noLts: true });
    // if its a simple plural ending in 's',
    // and the singular is in the lexicon, add '-z' to end
    if (!rawPhones && word.endsWith('s')) {
      let sing = RiTa.singularize(word);
      rawPhones = lex.rawPhones(sing, { noLts: true });
      rawPhones && (rawPhones += '-z'); // add 's' phone
    }

    // TODO: what about verb forms here?? TestCase?

    let silent = RiTa.SILENT || RiTa.SILENCE_LTS || (opts && opts.silent);

    // if no phones yet, try the lts-engine
    if (!rawPhones) {
      let ltsPhones = this.computePhones(word, opts);
      if (ltsPhones && ltsPhones.length) {
        if (!silent && lex.size()) {// && word.match(HAS_LETTER_RE)) {
          console.log("[RiTa] Used LTS-rules for '" + word + "'");
        }
        rawPhones = Util.syllablesFromPhones(ltsPhones);
      }
    }

    return rawPhones;
  }
}

const HAS_LETTER_RE = /[a-zA-Z]+/;

export default Analyzer;