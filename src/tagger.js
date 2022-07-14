import Util from './util';

const MASS_NOUNS = Util.MASS_NOUNS;

class Tagger {

  constructor(parent) {
    this.RiTa = parent;
  }

  isVerb(word, opts) {

    let conj = this.RiTa.conjugator;

    // check irregular verbs (added 7/31/21) 
    if (this._isNoLexIrregularVerb(word)) return true;
    if (conj.IRREG_VERBS_LEX_VB.hasOwnProperty(word)) return true;
    if (conj.IRREG_VERBS_NOLEX.hasOwnProperty(word)) return true;

    // any verbs (vb*) in lexicon
    let pos = this.allTags(word, opts);
    return pos.some(p => VERBS.includes(p));
  }

  isNoun(word) {
    // see https://github.com/dhowe/rita/issues/130
    let pos = this.allTags(word, { noGuessing: true });
    return pos.some(p => NOUNS.includes(p));
  }

  isAdverb(word) {
    let pos = this.allTags(word);
    return pos.some(p => ADVS.includes(p));
  }

  isAdjective(word) {
    let pos = this.allTags(word);
    return pos.some(p => ADJS.includes(p));
  }

  hasTag(choices, tag) {
    if (!Array.isArray(choices)) return false;
    let choiceStr = choices.join();
    return (choiceStr.indexOf(tag) > -1);
  }

  /* convert from array of tags to a string with tags inline */
  inlineTags(words, tags, delimiter) {

    if (!words || !words.length) return '';

    if (words.length !== tags.length) {
      throw Error('Tagger: invalid state: words(' + words.length
        + ')=' + words + ' tags(' + tags.length + ')=' + tags);
    }

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

  allTags(word, opts = {}) { // returns an array of choices

    let noGuessing = opts.noGuessing || false;
    let noDerivations = opts.noDerivations || false;

    if (word && typeof word === 'string' && word.length) {
      let posData = this.RiTa.lexicon()._posArr(word);
      if (posData && posData.length > 0) return posData;
      if (word.includes("-") && opts.noGuessingOnHyphenated) return [];  //#HWF
      if (!noDerivations) return this._derivePosData(word, noGuessing);
    }

    return []; // empty array
  }

  tag(words, opts) {

    let simple = opts && opts.simple;
    let inline = opts && opts.inline;
    let dbug = 0, result = [], choices2d = [];
    if (opts && opts.dbug) dbug = 1;

    if (!words || !words.length) return inline ? '' : [];

    if (!Array.isArray(words)) { // likely a string
      if (!words.trim().length) return inline ? '' : [];
      words = this.RiTa.tokenizer.tokenize(words);
    }

    for (let i = 0, l = words.length; i < l; i++) {

      let word = words[i];
      if (!word || !word.length) continue;

      if (this.RiTa.isPunct(word)) {
        result[i] = word;
      }
      else if (word.length === 1) {
        result[i] = this._handleSingleLetter(word);
      }
      else {
        //#HWF: skip guessing for not-in-dict hyphenated words as we deal with these later 
        let opts = this.allTags(word, { noGuessingOnHyphenated: true });
        choices2d[i] = opts;// || []; // all options
        result[i] = opts.length ? opts[0] : '__HYPH__'; // first option
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

  _isNoLexIrregularVerb(stem) {
    return Object.values(this.RiTa.conjugator.IRREG_VERBS_NOLEX).includes(stem);
  }

  _checkPluralNounOrVerb(stem, result) {
    let pos = this.RiTa.lexicon()._posArr(stem);
    if (pos) {
      if (pos.includes('nn')) result.push('nns'); // ?? any case
      if (pos.includes('vb')) result.push('vbz');
    }

    // finally check irregular verb list
    if (!pos || !pos.includes("vbz")) {
      if (this._isNoLexIrregularVerb(stem)) result.push('vbz');
    }
  }

  _safeConcat(a, b) {
    if (a && b) return a.concat(b);
    if (a) return a;
    if (b) return b;
  } // ! this function is never used

  _derivePosData(word, noGuessing) {

    // noGuessing arg disables the final guess when true, 
    // and instead returns an empty array if no rules match

    if (word === 'the' || word === 'a') return ['dt'];

    /*
      Try for a verb or noun inflection 
      VBD 	Verb, past tense
      VBG 	Verb, gerund or present participle
      VBN 	Verb, past participle
      VBP 	Verb, non-3rd person singular present
      VBZ 	Verb, 3rd person singular present
      NNS   Noun, plural
    */
    const lex = this.RiTa.lexicon(), tags = lex._posArr(word);

    if (word.endsWith("ress")) {
      let pos = lex._posArr(word.substring(0, word.length - 3)); // murderess
      if (pos && pos.includes("vb")) {
        //murderess - murder
        return ["nn"];
      }
      pos = lex._posArr(word.substring(0, word.length - 4)) // actress, waitress
      if (pos && pos.includes("vb")) {
        //actress - act
        return ["nn"];
      }
    }

    if (word.endsWith("or")) {
      let pos = lex._posArr(word.substring(0, word.length - 2)); // actor, motor, editor
      if (pos && pos.includes("vb")) {
        //actress - act
        return ["nn"];
      }
      pos = lex._posArr(word.substring(0, word.length - 2) + "e"); // investigator, creator
      if (pos && pos.includes("vb")) {
        return ["nn"];
      }
    }

    if (word.endsWith("er")) {
      let pos = lex._posArr(word.substring(0, word.length - 2)); // builder

      if (pos && pos.includes("vb")) return ["nn"];

      pos = lex._posArr(word.substring(0, word.length - 1)); // dancer 
      if (pos && pos.includes("vb")) return ["nn"];

      if (word.charAt(word.length - 3) === word.charAt(word.length - 4)) {
        pos = lex._posArr(word.substring(0, word.length - 3)); // programmer
        if (pos && pos.includes("vb")) return ["nn"];
      }
    }

    if (word.endsWith('ies')) { // 3rd-person sing. present (satisfies, falsifies)
      let check = word.substring(0, word.length - 3) + "y";
      let pos = lex._posArr(check);
      if (pos && pos.includes('vb')) return ['vbz'];
    }
    else if (word.endsWith('s')) {  // singular noun ('bonus', 'census'), plural noun or vbz

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

    if (word.endsWith('ed')) { // simple past or past participle
      let pos = lex._posArr(word.substring(0, word.length - 1))
        || lex._posArr(word.substring(0, word.length - 2))
        || lex._posArr(word.substring(0, word.length - 3)); //e.g deterred
      if (pos && pos.includes('vb')) {
        return ['vbd', 'vbn']; // hate-> hated || row->rowed || deter -> deterred
      }
    }

    if (word.endsWith('ing')) {
      let stem = word.substring(0, word.length - 3);
      if (stem) {
        let pos = lex._posArr(stem);
        if (pos && pos.includes('vb')) {
          // vbg can be noun (in some contexts), for example: 'His acting is good'
          // this is more for getting all 'possible' labels in tag() function as
          // elsewhere tags are analyzed by context according to ruleset.
          return ['vbg', 'nn']; // assenting 
        }
        else {
          pos = lex._posArr(stem + 'e'); // hate
          if (pos && pos.includes('vb')) {
            return ['vbg', 'nn'];  //  e.g: let's go hiking
          }
        }
        // else
        if (word.charAt(word.length - 4) === word.charAt(word.length - 5)) {
          pos = lex._posArr(stem.substring(0, stem.length - 1)); // e.g running
          if (pos && pos.includes('vb')) {
            return ['vbg', 'nn'];  //  e.g. the tripping of an opponent is a foul in football
          }
        }
      }
    }

    if (word.endsWith('ly')) {
      let stem = word.substring(0, word.length - 2);
      if (stem) {
        let pos = lex._posArr(stem);
        if (pos && pos.includes("jj")) {
          // beautifully - beautiful
          return ['rb'];
        }
        if (stem.charAt(stem.length - 1) === 'i') {
          pos = lex._posArr(stem.substring(0, stem.length - 1) + "y");
          if (pos && pos.includes("jj")) {
            // happily - happy
            return ['rb'];
          }
        }
      }
    }

    // Check if this could be a plural noun form
    if (this.isLikelyPlural(word)) return ['nns'];

    // Check if is irregular past part of a verb
    let conj = this.RiTa.conjugator;
    if (conj.IRREG_PAST_PART.includes(word)) return ['vbd'];

    // Give up 
    return noGuessing ? [] : word.endsWith('ly') ? ['rb'] :
      (word.endsWith('s') ? ['nns'] : ['nn']);
  }

  isLikelyPlural(word) {
    return this._lexHas("n", this.RiTa.singularize(word))
    //|| this.RiTa.inflector.isPlural(word);
  }

  _handleSingleLetter(c) {
    if (c === 'a' || c === 'A') return 'dt';
    if (c >= '0' && c <= '9') return 'cd';
    return (c === 'I') ? 'prp' : c;
  }

  _log(i, frm, to) { // log custom tag
    console.log("\n  Custom(" + i + ") tagged '" + frm + "' -> '" + to + "'\n\n");
  }// debug only: not available in built version since 'dbug' in tag() is 0

  // Applies a customized subset of the Brill transformations
  _applyContext(words, result, choices, dbug) { // SYNC:

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
          // transform 7: if a word has been categorized as a common noun 
          // and it ends with "s", then set its type to plural noun (NNS)
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

      //transform 7(dch): convert a vb to vbn when following vbz/'has'  
      // (She has ridden, He has rode)
      if (tag === "vbd" && i > 0 && result[i - 1].match(/^(vbz)$/)) {
        tag = "vbn";
        //dbug && this._log(7, word, tag);
      }

      // transform 8: convert a common noun to a present
      // participle verb (i.e., a gerund)
      if (tag.startsWith("nn") && word.endsWith("ing")) {

        // DH: fixed here -- add check on choices for any verb: eg. // 'morning'
        if (this.hasTag(choices[i], "vbg")) { // fixed for 'fishing' and etc
          tag = "vbg";
          //dbug && this._log(8, word, tag);
        }
      }

      // transform 9(dch): convert plural nouns (which are also 3sg-verbs) to
      // 3sg-verbs when following a singular noun (the dog dances, Dave dances, he dances)
      if (i > 0 && tag === "nns" && this.hasTag(choices[i], "vbz")
        && result[i - 1].match(/^(nn|prp|nnp)$/)) {
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

      // transform 11(dch): convert plural nouns (which are also 3sg-verbs) 
      // to 3sg-verbs when followed by adverb
      if (i < result.length - 1 && tag == "nns" && result[i + 1].startsWith("rb") &&
        this.hasTag(choices[i], "vbz")) {
        tag = "vbz";
        //dbug && this._log(11, word, tag);
      }

      // transform 12(dch): convert plural nouns which have an entry
      // for their base form to vbz
      if (tag === "nns") {

        // is preceded by one of the following
        if (i > 0 && ["nn", "prp", "cc", "nnp"].indexOf(result[i - 1]) > -1) {
          // if word is ends with s or es and is 'nns' and has a vb
          if (this._lexHas('vb', this.RiTa.singularize(word))) {
            tag = "vbz";
            //dbug && this._log(12, word, tag);
          }
        } // if only word and not in lexicon
        else if (words.length === 1 && choices[i].length < 2) {
          // there is always choices[i][0] which is result[i] 
          // (when the word is not in lexicon, generated by _derivePosData())
          // if the stem of a single word could be both nn and vb, return nns
          // only return vbz when the stem is vb but not nn
          let sing = this.RiTa.singularize(word.toLowerCase());
          if (!this._lexHas('nn', sing) && this._lexHas('vb', sing)) { //hmm any example?
            tag = "vbz";
            //dbug && this._log(12, word, tag);
          }
        }
      }

      // transform 13(cqx): convert a vb/ potential vb to vbp 
      // when following nns (Elephants dance, they dance)
      if (tag === "vb" || (tag === "nn" && this.hasTag(choices[i], "vb"))) {
        if (i > 0 && result[i - 1].match(/^(nns|nnps|prp)$/)) {
          tag = "vbp";
          //dbug && this._log(13, word, tag);
        }
      }

      // issue#83 sequential adjectives(jc): (?:dt)? (?:jj)* (nn) (?:jj)* nn 
      // && $1 can be tagged as jj-> $1 convert to jj (e.g a light blue sky)
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

      // https://github.com/dhowe/rita/issues/148 
      // "there"
      if (word.toLowerCase() === "there") {
        if (words[i + 1] && EX_BE.includes(words[i + 1])) {
          tag = "ex";
        }
        if (i > 0 && result[i - 1] === "in") {
          tag = "nn"
        }
      }

      // https://github.com/dhowe/rita/issues/65 #HWF
      if (word.includes("-")) {
        if (result[i] !== '__HYPH__') continue; // in dict
        if (word === '--') continue; // double hyphen treated as dash
        if (HYPHENATEDS.hasOwnProperty(word)) {
          result[i] = HYPHENATEDS[word];
          if (dbug) console.log(word + ": " + HYPHENATEDS[word] + " ACC: special");
          continue;
        }
        tag = this._tagCompoundWord(word, tag, result, words, i, dbug);
      }

      result[i] = tag;
    }

    return result;
  }

  // determine tag for compound (hyphenated) word
  _tagCompoundWord(word, tag, result, context, i, dbug) { // #HWF

    let words = word.split("-");
    let firstPart = words[0], lastPart = words[words.length - 1];
    let firstPartAllTags = this.allTags(firstPart);
    let lastPartAllTags = this.allTags(lastPart);

    if (words.length === 2 && VERB_PREFIX.includes(words[0])
      && lastPartAllTags.some(t => /^vb/.test(t))) {

      tag = lastPartAllTags.find(t => /^vb/.test(t));
      if (dbug) console.log(word + ": " + tag + " ACC: prefix-vb");
    }
    else if (words.length === 2 && NOUN_PREFIX.includes(words[0])
      && lastPartAllTags.some(t => /^nn/.test(t))) {

      tag = lastPartAllTags.find(t => /^nn/.test(t));
      if (dbug) console.log(word + ": " + tag + " ACC: prefix-nn");
    }
    else if (firstPartAllTags.some(t => /^cd/.test(t))) {

      // numbers
      let allCD = true;
      for (let z = 1; z < words.length; z++) {
        let part = words[z];
        if (!(this.allTags(part).some(t => /^cd/.test(t)))) {
          allCD = false;
          break;
        }
      }
      if (allCD) {
        tag = "cd"
        if (dbug) console.log(word + ": " + tag + " ACC: cd(-cd)+ ");
      }
      else {
        //ordinal number like twenty-first
        tag = "jj"
        if (dbug) console.log(word + ": " + tag + " ACC: cd(-jj/nn)+ ");
      }
    }
    else if (firstPartAllTags.some(t => t.startsWith('jj'))
      && words.length === 2 && lastPartAllTags.some(t => t.startsWith('nn'))) {

      tag = 'jj'
      if (dbug) console.log(word + ": " + tag + " ACC: jj-nn");
    }
    else if (firstPartAllTags.some(t => t === 'vb')
      && !firstPartAllTags.some(t => t.startsWith('jj'))) {

      // first part is vb
      if (words.length === 2
        && lastPartAllTags.some(t => t === 'in')) {

        // verb phrase with in, e.g. blush-on tip-off get-together run-in
        tag = "nn"
        if (dbug) console.log(word + ": " + tag + " ACC: vb-in");
      }
      else if (words.length === 2
        && lastPartAllTags.some(t => /^(vb[gdp])/.test(t))
        && !lastPartAllTags.some(t => /^vb$/.test(t))) {

        // man-eating
        tag = "jj"
        if (dbug) console.log(word + ": " + tag + " ACC: vb-vbg/vbd/vbp");
      }
      else if (words.length === 2 && lastPartAllTags.some(t => t.startsWith('jj'))) {
        tag = 'jj'
        if (dbug) console.log(word + ": " + tag + " ACC: vb-jj");
      }
      else {
        tag = "nn"
        if (dbug) console.log(word + ": " + tag + " ACC: vb(-.)+ general");
      }
    }
    else if (((lastPartAllTags.some(t => /^(jj[rs]?)/.test(t))
      && !lastPartAllTags.some(t => t.startsWith('nn')))
      || lastPartAllTags.some(t => /^vb[dgn]/.test(t)))) {

      // last part is jj or vbd/vbn/vbg
      tag = "jj"
      if (dbug) console.log(word + ": " + tag + " ACC: last part jj or vbd/vbg");
    }
    else if (lastPartAllTags.some(t => /^[n]/.test(t))) {

      // last part is a noun
      if (firstPartAllTags.some(t => /^(in|rb)/.test(t))) {
        // over-the-counter; before-hand etc
        tag = "jj"
        if (dbug) console.log(word + ": " + tag + " ACC: in/rb(-.)*-nn");
      }
      else {
        let lastNounIsMajor = true;
        for (let z = 0; z < words.length - 1; z++) {
          let part = words[z];
          if (!(this.allTags(part).some(t => /^([jn]|dt|in)/.test(t)))) {
            lastNounIsMajor = false;
            break;
          }
        }
        if (lastNounIsMajor) {
          tag = "nn"
          if (dbug) console.log(word + ": " + tag + " ACC: all nn");
        }
        else {
          tag = "jj"
          if (dbug) console.log(word + ": " + tag + " ACC: (.-)+nn");
        }
      }
    }
    else if (firstPartAllTags.some(t => t.startsWith('n'))) {
      // first part can be a noun: father-in-law etc.
      // numbers depend on this noun
      tag = this.RiTa.inflector.isPlural(words[0]) ? "nns" : "nn";
      if (dbug) console.log(word + ": " + tag + " ACC: nn(-.)+");
    }
    else {
      tag = "nn"; //generually it should be nn
      if (dbug) console.log(word + ": " + tag + " ACC: no rule hit");
    }

    // change according to context
    if (result[i + 1] && result[i + 1].startsWith("n") && tag.startsWith("n")) {
      //next word is a noun
      tag = "jj";
    }
    else if (tag === 'jj' && result[i + 1] && result[i + 1].startsWith("v")) {
      //next word is a verb, last part is rb/verb
      tag = "rb";
    }
    else if (result[i + 1] && result[i + 1].startsWith("v") && tag === 'jj') {
      tag = "rb"
    }
    else if (tag === 'jj' && context[i - 1] && ARTICLES.includes(context[i - 1].toLowerCase().trim())) {
      if (!context[i + 1] || (result[i + 1] && /^(v|cc|in|md|w)/.test(result[i + 1])) || this.RiTa.isPunct(context[i + 1])) {
        tag = 'nn';
      }
    }
    return tag;
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
const EX_BE = ["is", "are", "was", "were", "isn't", "aren't", "wasn't", "weren't"];

//#HWF
const HYPHENATEDS = {
  "well-being": "nn", // by rules should be jj, like 'good-looking'
  "knee-length": "jj", // by rules should be nn, coz all parts are noun, like 'gift-wrap'
  "king-size": 'jj', // by rules should be nn, coz all parts are noun
  "ho-hum": 'uh', // by rules should be nn, coz all parts are noun as ho will be recognise as nn in the algorithm
  "roly-poly": 'jj', // by rules should be nn, coz all parts are recognise as nn in the algorithm
  "nitty-gritty": 'nn', // by rules should be jj, coz gritty is jj
  "topsy-turvy": 'jj', // by rules should be nn, coz all parts are recognise as nn in the algorithm
};
const VERB_PREFIX = ["de", "over", "re", "dis", "un", "mis", "out", "pre", "post", "co", "fore", "inter", "sub", "trans", "under"];
const NOUN_PREFIX = ["anti", "auto", "de", "dis", "un", "non", "co", "over", "under", "up", "down", "hyper", "mono", "bi", "uni", "di", "semi", "omni", "mega", "mini", "macro", "micro", "counter", "ex", "mal", "neo", "out", "poly", "pseudo", "super", "sub", "sur", "tele", "tri", "ultra", "vice"];
//const ADJECTIVE_PREFIX = ["dis", "non", "semi", "un"]; // JC: not used?
const ARTICLES = ['the', 'a', 'an', 'some'];

export default Tagger;
