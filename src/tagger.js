const { MODALS } = require("./util");

const ADJS = ['jj', 'jjr', 'jjs'];
const ADVS = ['rb', 'rbr', 'rbs', 'rp'];
const NOUNS = ['nn', 'nns', 'nnp', 'nnps'];
const VERBS = ['vb', 'vbd', 'vbg', 'vbn', 'vbp', 'vbz'];

let RiTa;

class PosTagger {

  constructor(parent) {
    RiTa = parent;
    this.stemmer = RiTa.stemmer;
    this.lex = RiTa._lexicon();
  }

  isVerb(word) {
    let pos = this.posOptions(word);
    return pos && pos.filter(p => VERBS.includes(p)).length > 0;
  }

  isNoun(word) {
    let pos = this.posOptions(word);
    return pos && pos.filter(p => NOUNS.includes(p)).length > 0;
  }

  isAdverb(word) {
    let pos = this.posOptions(word);
    return pos && pos.filter(p => ADVS.includes(p)).length > 0;
    //return this.checkType(word, ADVS);
  }

  isAdjective(word) {
    let pos = this.posOptions(word);
    return pos && pos.filter(p => ADJS.includes(p)).length > 0;
    //return this.checkType(word, ADJS);
  }

  hasTag(choices, tag) {
    if (!Array.isArray(choices)) return false;
    let choiceStr = choices.join();
    return (choiceStr.indexOf(tag) > -1);
  }

  /* convert from array of tags to a string with tags inline */
  inlineTags(words, tags, delimiter) {

    if (!words || !words.length) return '';

    if (words.length !== tags.length) throw Error('Tagger: invalid state');

    delimiter = delimiter || '/';

    let sb = '';
    for (let i = 0; i < words.length; i++) {
      sb += words[i];
      if (!RiTa.isPunctuation(words[i])) {
        sb += delimiter + tags[i];
      }
      sb += ' ';
    }
    return sb.trim();
  }

  posOptions(word/*, fatal*/) {
    if (word && word.length) {
      let posData = this.lex._posArr(word);//, fatal); // fail if no lexicon
      return posData || this._derivePosData(word);
    }
  }

  tag(words, simple, inline/*, fatal*/) {

    let dbug = 0, result = [], choices2d = [];

    if (!words || !words.length) {
      return inline ? '' : [];
    }

    if (!Array.isArray(words)) {
      words = RiTa.tokenizer.tokenize(words);
    }

    for (let i = 0, l = words.length; i < l; i++) {

      let word = words[i];
      if (word.length < 1) {
        result.push('');
        continue;
      }

      if (word.length == 1) {
        result.push(this._handleSingleLetter(word));
        continue;
      }

      choices2d[i] = this.posOptions(word);//, fatal);
      result.push(choices2d[i][0]);
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
    if (word.endsWith('s')/* or 'es'*/) {  // plural noun or vbz
      let stem = word.substring(0, word.length - 1);
      if (stem) {
        let pos = this.lex._posArr(stem);
        if (pos) {
          let result;
          if (pos.includes('nn')) {
            result = ['nns'];  // fates
          }
          if (pos.includes('vb')) {
            result = result || [];
            result.push('vbz'); // hates
          }
          if (result) return result;
        }
      }
    }
    else if (word.endsWith('ed')) { // simple past or past participle
      let pos = this.lex._posArr(word.substring(0, word.length - 1)) 
        || this.lex._posArr(word.substring(0, word.length - 2));
      if (pos && pos.includes('vb')) {
        return ['vbd', 'vbn']; // hate-> hated || row->rowed
      }
    }
    else if (word.endsWith('ing')) {
      let stem = word.substring(0, word.length - 3);
      if (stem) {
        let pos = this.lex._posArr(stem);
        if (pos && pos.includes('vb')) {
          return ['vbg']; // assenting
        }
        else {
          pos = this.lex._posArr(stem + 'e'); // hate
          if (pos && pos.includes('vb')) {
            return ['vbg'];  // hating
          }
        }
      }
    }

    // Check for plural noun with singularizer 
    if (this._lexHas("n", RiTa.singularize(word))) return ['nns']; // common plurals

    // Check plural noun with stemmer
    if (RiTa.stemmer.checkPluralWithoutLexicon(word)) return ['nns'];

    // Give up with a best guess
    return word.endsWith('ly') ? ['rb'] : (word.endsWith('s') ? ['nns'] : ['nn']);
  }

  _handleSingleLetter(c) {
    if (c === 'a' || c === 'A') return 'dt';
    if (c >= '0' && c <= '9') return 'cd';
    return (c === 'I') ? 'prp' : c;
  }

  _log(i, frm, to) { // log custom tag
    console.log("\n  Custom(" + i + ") tagged '" + frm + "' -> '" + to + "'\n\n");
  }

  // Applies a customized subset of the Brill transformations
  _applyContext(words, result, choices, dbug) {

    // Apply transformations
    for (let i = 0, l = words.length; i < l; i++) {

      let word = words[i], tag = result[i];

      // transform 1a: DT, {VBD | VBP | VB} --> DT, NN
      if (i > 0 && (result[i - 1] === "dt")) {

        if (tag.startsWith("vb")) {
          tag = "nn";

          // transform 7: if a word has been categorized as a
          // common noun and it ends with "s", then set its type to plural common noun (NNS)
          if (word.match(/^.*[^s]s$/)) {
            if (!MODALS.includes(word)) {
              tag = "nns";
            }
          }

          dbug && this._log("1a", word, tag);
        }

        // transform 1b: DT, {RB | RBR | RBS} --> DT, {JJ | JJR | JJS}
        else if (tag.startsWith("rb")) {
          tag = (tag.length > 2) ? "jj" + tag.charAt(2) : "jj";
          dbug && this._log("1b", word, tag);
        }
      }

      // transform 2: convert a noun to a number (cd) if it is
      // all digits and/or a decimal "."
      if (tag.startsWith("n") && !choices[i]) {
        if (isNum(word)) {
          tag = "cd";
          dbug && this._log(2, word, tag);
        } // mods: dch (add choice check above) <---- ? >
      }

      // transform 3: convert a noun to a past participle if
      // word ends with "ed" and (following any nn or prp?)
      if (i > 0 && tag.startsWith("n") && word.endsWith("ed") && result[i - 1].match(/^(nn|prp)$/)) {
        if (!word.endsWith("eed")) {
          dbug && this._log(3, word, tag);
          tag = "vbn";
        }
      }

      // transform 4: convert any type to adverb if it ends in "ly";
      if (word.endsWith("ly")) {
        tag = "rb";
        dbug && this._log(4, word, tag);
      }

      // transform 5: convert a common noun (NN or NNS) to a
      // adjective if it ends with "al", special-case for mammal
      if (tag.startsWith("nn") && word.endsWith("al") && word != 'mammal') {
        tag = "jj";
        dbug && this._log(5, word, tag);
      }

      // transform 6: convert a noun to a verb if the
      // preceeding word is modal
      if (i > 0 && tag.startsWith("nn") && result[i - 1].startsWith("md")) {
        tag = "vb";
        dbug && this._log(6, word, tag);
      }

      //transform 7(dch): convert a vb to vbn when following vbz/'has'  (She has ridden, He has rode)
      if (tag === "vbd" && i > 0 && result[i - 1].match(/^(vbz)$/)) {
        tag = "vbn";
        dbug && this._log(7, word, tag);
      }

      // transform 8: convert a common noun to a present
      // participle verb (i.e., a gerund)
      if (tag.startsWith("nn") && word.endsWith("ing")) {

        // DH: fixed here -- add check on choices for any verb: eg. // 'morning'
        if (this.hasTag(choices[i], "vb")) {
          tag = "vbg";
          dbug && this._log(8, word, tag);
        }
      }

      // transform 9(dch): convert plural nouns (which are also 3sg-verbs) to
      // 3sg-verbs when following a singular noun (the dog dances, Dave dances, he dances)
      if (i > 0 && tag === "nns" && this.hasTag(choices[i], "vbz") && result[i - 1].match(/^(nn|prp|nnp)$/)) {
        tag = "vbz";
        dbug && this._log(9, word, tag);
      }

      // transform 10(dch): convert common nouns to proper
      // nouns when they start w' a capital
      if (tag.startsWith("nn") && (word.charAt(0) === word.charAt(0).toUpperCase())) {

        //if it is not at the start of a sentence or it is the only word
        // or when it is at the start of a sentence but can't be found in the dictionary
        let sing = RiTa.singularize(word.toLowerCase());
        if (words.length === 1 || i > 0 || (i == 0 && !this._lexHas('nn', sing))) {
          tag = tag.endsWith("s") ? "nnps" : "nnp";
          dbug && this._log(10, word, tag);
        }
      }

      // transform 11(dch): convert plural nouns (which are also 3sg-verbs) to 3sg-verbs when followed by adverb
      if (i < result.length - 1 && tag == "nns" && result[i + 1].startsWith("rb") &&
        this.hasTag(choices[i], "vbz")) {
        tag = "vbz";
        dbug && this._log(11, word, tag);
      }

      // transform 12(dch): convert plural nouns which have an entry for their base form to vbz
      if (tag === "nns") {

        // is preceded by one of the following
        if (i > 0 && ["nn", "prp", "cc", "nnp"].indexOf(result[i - 1]) > -1) {
          // if word is ends with s or es and is 'nns' and has a vb
          if (this._lexHas('vb', RiTa.singularize(word))) {
            tag = "vbz";
            dbug && this._log(12, word, tag);
          }
        } // if only word and not in lexicon
        else if (words.length === 1 && !choices[i].length) {
          // if the stem of a single word could be both nn and vb, return nns
          // only return vbz when the stem is vb but not nn
          if (!this._lexHas('nn', RiTa.singularize(word)) && this._lexHas('vb', RiTa.singularize(word))) {
            tag = "vbz";
            dbug && this._log(12, word, tag);
          }

        }
      }

      // transform 13(cqx): convert a vb/ potential vb to vbp when following nns (Elephants dance, they dance)
      if (tag === "vb" || (tag === "nn" && this.hasTag(choices[i], "vb"))) {
        if (i > 0 && result[i - 1].match(/^(nns|nnps|prp)$/)) {
          tag = "vbp";
          dbug && this._log(13, word, tag);
        }
      }

      result[i] = tag;
    }

    return result;
  }

  _lexHas(pos, word) { // takes ([n|v|a|r] or a full tag

    if (typeof word !== 'string') throw Error('Expects string');
    //for (let i = 0; i < words.length; i++) {
    let tags = this.lex._posArr(word);
    if (tags) {
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
    //}
  }
}

module && (module.exports = PosTagger);
