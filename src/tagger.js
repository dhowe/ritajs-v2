import Util from './util';

const MASS_NOUNS  = Util.MASS_NOUNS;

class Tagger {

  constructor(parent) {
    this.RiTa = parent;
  }

  isVerb(word) {
    let pos = this.allTags(word);
    return pos && pos.filter(p => VERBS.includes(p)).length > 0;
  }

  isNoun(word) {
    let pos = this.allTags(word);
    return pos && pos.filter(p => NOUNS.includes(p)).length > 0;
  }

  isAdverb(word) {
    let pos = this.allTags(word);
    return pos && pos.filter(p => ADVS.includes(p)).length > 0;
  }

  isAdjective(word) {
    let pos = this.allTags(word);
    return pos && pos.filter(p => ADJS.includes(p)).length > 0;
  }

  hasTag(choices, tag) {
    if (!Array.isArray(choices)) return false;
    let choiceStr = choices.join();
    return (choiceStr.indexOf(tag) > -1);
  }

  /* convert from array of tags to a string with tags inline */
  inlineTags(words, tags, delimiter) {

    if (!words || !words.length) return '';

    if (words.length !== tags.length) throw Error('Tagger: invalid state', words);

    delimiter = delimiter || '/';

    let sb = '';
    for (let i = 0; i < words.length; i++) {
      sb += words[i];
      if (!this.RiTa.isPunct(words[i])) {
        sb += delimiter + tags[i];
      }
      sb += ' ';
    }
    return sb.trim();
  }

  allTags(word, noDerivations) { // returns an array of choices
    if (word && typeof word === 'string' && word.length) { // fix error when sth like allTags(['word']) is called
      let posData = this.RiTa.lexicon()._posArr(word);
      return posData || (noDerivations ? null : this._derivePosData(word));
    }
  }

  tag(words, opts) {

    let simple = opts && opts.simple;
    let inline = opts && opts.inline;
    let dbug = 0, result = [], choices2d = [];

    if (!words || !words.length) {
      return inline ? '' : [];
    }

    if (!Array.isArray(words)) {
      //if (!words.trim().length) return inline ? '' : [];
      words = this.RiTa.tokenizer.tokenize(words);
    }

    for (let i = 0, l = words.length; i < l; i++) {

      let word = words[i];

      if (!word || !word.length) continue;

      if (word.length === 1) {
        result.push(this._handleSingleLetter(word));
      }
      else {
        let opts = this.allTags(word);
        choices2d[i] = opts; // all options
        result[i] = opts[0]; // first option
      }
    }

    // Adjust pos according to transformation rules
    let tags = this._applyContext(words, result, choices2d, dbug);

    if (simple) { // convert to simple tags
      for (let i = 0; i < tags.length; i++) {
        if (NOUNS.includes(tags[i])) tags[i] = 'n';
        else if (VERBS.includes(tags[i])) tags[i] = 'v';
        else if (ADJS.includes(tags[i])) tags[i] = 'a';
        else if (ADVS.includes(tags[i])) tags[i] = 'r';
        else tags[i] = '-'; // default: other
      }
    }

    return inline ? this.inlineTags(words, tags) : tags;
  }

  //////////////////////////////////////////////////////////////////

  _checkPluralNounOrVerb(stem, result) {
    let pos = this.RiTa.lexicon()._posArr(stem);
    if (pos) {
      if (pos.includes('nn')) result.push('nns'); // ?? any case
      if (pos.includes('vb')) result.push('vbz');
    }
  }

  _safeConcat(a, b) {
    if (a && b) return a.concat(b);
    if (a) return a;
    if (b) return b;
  } // ! this function is never used

  _derivePosData(word) {
    /*
      Try for a verb or noun inflection 
      VBD 	Verb, past tense
      VBG 	Verb, gerund or present participle
      VBN 	Verb, past participle
      VBP 	Verb, non-3rd person singular present
      VBZ 	Verb, 3rd person singular present
      NNS   Noun, plural
    */
    const lex = this.RiTa.lexicon();
    if (word.endsWith('ies')) { // 3rd-person sing. present (satisfies, falsifies)
      let check = word.substring(0, word.length - 3) + "y";
      let pos = lex._posArr(check);
      if (pos && pos.includes('vb')) return ['vbz'];
    }
    else if (word.endsWith('s')) {  // plural noun or vbz

      let result = [];

      // remove suffix (s) and test (eg 'hates', 'cakes')
      this._checkPluralNounOrVerb(word.substring(0, word.length - 1), result);

      if (word.endsWith('es')) {

        // remove suffix (es) and test (eg 'repossesses')
        this._checkPluralNounOrVerb(word.substring(0, word.length - 2), result);

        // singularize and test (eg 'thieves')
        this._checkPluralNounOrVerb(this.RiTa.singularize(word), result);
      }

      if (result.length) return result;
    }
    else if (word.endsWith('ed')) { // simple past or past participle
      let pos = lex._posArr(word.substring(0, word.length - 1))
        || lex._posArr(word.substring(0, word.length - 2));
      if (pos && pos.includes('vb')) {
        return ['vbd', 'vbn']; // hate-> hated || row->rowed
      }
    }
    else if (word.endsWith('ing')) {
      let stem = word.substring(0, word.length - 3);
      if (stem) {
        let pos = lex._posArr(stem);
        if (pos && pos.includes('vb')) {
          return ['vbg']; // assenting
        }
        else {
          pos = lex._posArr(stem + 'e'); // hate
          if (pos && pos.includes('vb')) {
            return ['vbg'];  // hating
          }
        }
      }
    }

    // Check if this could be a plural noun form
    if (this.isLikelyPlural(word)) return ['nns'];

    if (word === 'the' || word === 'a') return ['dt'];

    // Give up with a best guess
    return word.endsWith('ly') ? ['rb'] : (word.endsWith('s') ? ['nns'] : ['nn']);
  }

  isLikelyPlural(word) {
    return this._lexHas("n", this.RiTa.singularize(word)) || this.RiTa.inflector.isPlural(word);
  }

  _handleSingleLetter(c) {
    if (c === 'a' || c === 'A') return 'dt';
    if (c >= '0' && c <= '9') return 'cd';
    return (c === 'I') ? 'prp' : c;
  }

  _log(i, frm, to) { // log custom tag
    console.log("\n  Custom(" + i + ") tagged '" + frm + "' -> '" + to + "'\n\n");
  }// this function will not be avaliable in built version since 'dbug' in tag() is fixed to 0

  // Applies a customized subset of the Brill transformations
  _applyContext(words, result, choices, dbug) {

    // Apply transformations
    for (let i = 0, l = words.length; i < l; i++) {

      let word = words[i], tag = result[i];
      if (!word || !word.length) continue;

      if (typeof tag === 'undefined') {
        tag = '';
        if (!this.RiTa.SILENT) console.warn
          ('\n[WARN] Unexpected state in _applyContext for idx=' + i, words, '\n');
      }

      // transform 1a: DT, {VBD | VBP | VB} --> DT, NN
      if (i > 0 && (result[i - 1] === "dt")) {

        if (tag.startsWith("vb")) {
          tag = "nn";
          // transform 7: if a word has been categorized as a
          // common noun and it ends with "s", then set its type to plural common noun (NNS)
          if (word.match(/^.*[^s]s$/)) {
            if (!MASS_NOUNS.includes(word)) {
              tag = "nns";
            }
          }
          //dbug && this._log("1a", word, tag);
        }

        // transform 1b: DT, {RB | RBR | RBS} --> DT, {JJ | JJR | JJS}
        else if (tag.startsWith("rb")) {
          tag = (tag.length > 2) ? "jj" + tag.charAt(2) : "jj";
          //dbug && this._log("1b", word, tag);
        }
      }

      // transform 2: convert a noun to a number (cd) if it is
      // all digits and/or a decimal "."
      if (tag.startsWith("n")) { //choices[i] always exist (from allTags())
        if (Util.isNum(word)) {
          tag = "cd";
          //dbug && this._log(2, word, tag);
        } // mods: dch (add choice check above) <---- ? >
      }

      // transform 3: convert a noun to a past participle if
      // word ends with "ed" and (following any nn or prp?)
      if (i > 0 && tag.startsWith("n") && word.endsWith("ed") && result[i - 1].match(/^(nn|prp)$/)) {
        if (!word.endsWith("eed")) {
          //dbug && this._log(3, word, tag);
          tag = "vbn";
        }
      }

      // transform 4: convert any type to adverb if it ends in "ly";
      if (word.endsWith("ly")) {
        tag = "rb";
        //dbug && this._log(4, word, tag);
      }

      // transform 5: convert a common noun (NN or NNS) to a (only if longer than 4 letters)
      // adjective if it ends with "al", special-case for mammal
      if (word.length > 4 && tag.startsWith("nn") && word.endsWith("al") && word != 'mammal') {
        tag = "jj";
        //dbug && this._log(5, word, tag);
      }

      // transform 6: convert a noun to a verb if the
      // preceeding word is modal
      if (i > 0 && tag.startsWith("nn") && result[i - 1].startsWith("md")) {
        tag = "vb";
        //dbug && this._log(6, word, tag);
      }

      //transform 7(dch): convert a vb to vbn when following vbz/'has'  (She has ridden, He has rode)
      if (tag === "vbd" && i > 0 && result[i - 1].match(/^(vbz)$/)) {
        tag = "vbn";
        //dbug && this._log(7, word, tag);
      }

      // transform 8: convert a common noun to a present
      // participle verb (i.e., a gerund)
      if (tag.startsWith("nn") && word.endsWith("ing")) {

        // DH: fixed here -- add check on choices for any verb: eg. // 'morning'
        if (this.hasTag(choices[i], "vbg")) { // JC: fixed for 'fishing' and etc
          tag = "vbg";
          //dbug && this._log(8, word, tag);
        }
      }

      // transform 9(dch): convert plural nouns (which are also 3sg-verbs) to
      // 3sg-verbs when following a singular noun (the dog dances, Dave dances, he dances)
      if (i > 0 && tag === "nns" && this.hasTag(choices[i], "vbz") && result[i - 1].match(/^(nn|prp|nnp)$/)) {
        tag = "vbz";
        //dbug && this._log(9, word, tag);
      }

      // transform 10(dch): convert common nouns to proper
      // nouns when they start w' a capital
      if (tag.startsWith("nn") && /^[A-Z]/.test(word)) {

        //if it is not at the start of a sentence or it is the only word
        // or when it is at the start of a sentence but can't be found in the dictionary
        let sing = this.RiTa.singularize(word.toLowerCase());
        if (words.length === 1 || i > 0 || (i == 0 && !this._lexHas('nn', sing))) {
          tag = tag.endsWith("s") ? "nnps" : "nnp";
          //dbug && this._log(10, word, tag);
        }
      }

      // transform 11(dch): convert plural nouns (which are also 3sg-verbs) to 3sg-verbs when followed by adverb
      if (i < result.length - 1 && tag == "nns" && result[i + 1].startsWith("rb") &&
        this.hasTag(choices[i], "vbz")) {
        tag = "vbz";
        //dbug && this._log(11, word, tag);
      }

      // transform 12(dch): convert plural nouns which have an entry for their base form to vbz
      if (tag === "nns") {

        // is preceded by one of the following
        if (i > 0 && ["nn", "prp", "cc", "nnp"].indexOf(result[i - 1]) > -1) {
          // if word is ends with s or es and is 'nns' and has a vb
          if (this._lexHas('vb', this.RiTa.singularize(word))) {
            tag = "vbz";
            //dbug && this._log(12, word, tag);
          }
        } // if only word and not in lexicon
        else if (words.length === 1 && choices[i].length < 2) { // there is always choices[i][0] which is result[i](when the word is not in lexicon, generated by _derivePosData())
          // if the stem of a single word could be both nn and vb, return nns
          // only return vbz when the stem is vb but not nn
          let sing = this.RiTa.singularize(word.toLowerCase());
          if (!this._lexHas('nn', sing) && this._lexHas('vb', sing)) { //hmm any example?
            tag = "vbz";
            //dbug && this._log(12, word, tag);
          }
        }
      }

      // transform 13(cqx): convert a vb/ potential vb to vbp when following nns (Elephants dance, they dance)
      if (tag === "vb" || (tag === "nn" && this.hasTag(choices[i], "vb"))) {
        if (i > 0 && result[i - 1].match(/^(nns|nnps|prp)$/)) {
          tag = "vbp";
          //dbug && this._log(13, word, tag);
        }
      }

      //webIssue#83 sequential adjectives(jc): (?:dt)? (?:jj)* (nn) (?:jj)* nn && $1 can be tagged as jj-> $1 convert to jj (e.g a light bule sky)
      if (tag === "nn" && result.slice(i + 1).includes("nn")) {
        let idx = result.slice(i + 1).indexOf("nn");
        let allJJ = true; // between nn and nn are all jj
        for (let k = 0; k < idx; k++) {
          if (!result[i + 1 + k] === "jj") {
            allJJ = false;
            break;
          }
        }
        if (allJJ && this.allTags(word).includes('jj')) {
          tag = "jj";
        }
      }

      result[i] = tag;
    }

    return result;
  }

  _lexHas(pos, word) { // takes ([n|v|a|r] or a full tag
    if (typeof word === 'string') {
      let tags = this.RiTa.lexicon()._posArr(word);
      if (!tags) return false;
      for (let j = 0; j < tags.length; j++) {
        if (pos === tags[j]) return true;
        if (pos === 'n' && NOUNS.includes(tags[j]) ||
          pos === 'v' && VERBS.includes(tags[j]) ||
          pos === 'r' && ADVS.includes(tags[j]) ||
          pos === 'a' && ADJS.includes.isAdjTag(tags[j])) {
          return true;
        }
      }
    }
  }
}

const ADJS = ['jj', 'jjr', 'jjs'];
const ADVS = ['rb', 'rbr', 'rbs', 'rp'];
const NOUNS = ['nn', 'nns', 'nnp', 'nnps'];
const VERBS = ['vb', 'vbd', 'vbg', 'vbn', 'vbp', 'vbz'];

export default Tagger;