const MODALS = require("./util").MODALS;

const ADJ = ['jj', 'jjr', 'jjs'];
const ADV = ['rb', 'rbr', 'rbs', 'rp'];
const NOUNS = ['nn', 'nns', 'nnp', 'nnps'];
const VERBS = ['vb', 'vbd', 'vbg', 'vbn', 'vbp', 'vbz'];

let RiTa;

class PosTagger {

  constructor(parent) {
    RiTa = parent;
  }

  isVerb(word) {

    return this.checkType(word, VERBS);
  }

  isNoun(word) {

    let result = this.checkType(word, NOUNS);
    if (!result) {
      let singular = RiTa.singularize(word);
      if (singular !== word) {
        result = this.checkType(singular, NOUNS);
      }
    }
    return result;
  }

  isAdverb(word) {

    return this.checkType(word, ADV);
  }

  isAdjective(word) {

    return this.checkType(word, ADJ);
  }

  isVerbTag(tag) {
    return VERBS.includes(tag);
  }

  isNounTag(tag) {
    return NOUNS.includes(tag);
  }

  isAdverbTag(tag) {
    return ADV.includes(tag);
  }

  isAdjTag(tag) {
    return ADJ.includes(tag);
  }

  hasTag(choices, tag) {
    if (!Array.isArray(choices)) return false;
    let choiceStr = choices.join();
    return (choiceStr.indexOf(tag) > -1);
  }

  /* convert from array of tags to a string with tags inline */
  inlineTags(words, tags, delimiter) {

    if (!words || !words.length) return '';

    if (words.length !== tags.length) throw Error('Bad lengths');

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
  //
  // tagSimple(words) {
  //
  //   let tags = this.tag(words);
  //
  //   if (words && tags.length) {
  //
  //     for (let i = 0; i < tags.length; i++) {
  //       if (NOUNS.includes(tags[i])) tags[i] = 'n';
  //       else if (VERBS.includes(tags[i])) tags[i] = 'v';
  //       else if (ADJ.includes(tags[i])) tags[i] = 'a';
  //       else if (ADV.includes(tags[i])) tags[i] = 'r';
  //       else tags[i] = '-'; // default: other
  //     }
  //
  //     return tags;
  //   }
  //   return [];
  // }

  // Returns an array of parts-of-speech from the Penn tagset,
  // each corresponding to one word of input
  tag(words, simple, inline) {

    if (!words || !words.length) return inline ? '' : [];

    let lexicon = RiTa._lexicon();
    let result = [], choices2d = [];

    if (!Array.isArray(words)) {
      if (words === '') return [];
      words = RiTa.tokenizer.tokenize(words);
    }

    for (let i = 0, l = words.length; i < l; i++) {

      if (words[i].length < 1) {

        result.push('');
        continue;
      }

      if (words[i].length == 1) {

        result.push(this._handleSingleLetter(words[i]));
        continue;
      }

      let data = lexicon._posArr(words[i]);
      if (!data.length) {

        // use stemmer categories if no lexicon

        choices2d[i] = [];
        let tag = 'nn';
        if (words[i].endsWith('s')) {
          tag = 'nns';
        }

        if (!RiTa.SILENT) { // warn
          if (RiTa.LEX_WARN && lex.size() <= 1000) {
            console.warn(RiTa.LEX_WARN);
            RiTa.LEX_WARN = false;
          }
          if (RiTa.LTS_WARN && typeof LetterToSound === 'undefined') {
            console.warn(RiTa.LTS_WARN);
            RiTa.LTS_WARN = false;
          }
        }

        if (words[i].endsWith('s')) {
          let sub2, sub = words[i].substring(0, words[i].length - 1);

          if (words[i].endsWith('es'))
            sub2 = words[i].substring(0, words[i].length - 2)

          if (this._lexHas("n", sub) || (sub2 && this._lexHas("n", sub2))) {
            choices2d.push("nns");
          } else {
            let sing = RiTa.singularize(words[i]);
            if (this._lexHas("n", sing)) choices2d.push("nns");
          }

        } else {

          let sing = RiTa.singularize(words[i]);

          if (this._lexHas("n", sing)) {
            choices2d.push("nns");
            tag = 'nns';
          } else if (RiTa.stemmer.checkPluralWithoutLexicon(words[i])) {
            tag = 'nns';
            //common plurals
          }
        }

        result.push(tag);

      } else {

        result.push(data[0]);
        choices2d[i] = data;
      }
    }

    // Adjust pos according to transformation rules
    let tags = this._applyContext(words, result, choices2d);

    if (simple) {
      for (let i = 0; i < tags.length; i++) {
        if (NOUNS.includes(tags[i])) tags[i] = 'n';
        else if (VERBS.includes(tags[i])) tags[i] = 'v';
        else if (ADJ.includes(tags[i])) tags[i] = 'a';
        else if (ADV.includes(tags[i])) tags[i] = 'r';
        else tags[i] = '-'; // default: other
      }
    }

    return inline ? this.inlineTags(words, tags) : tags;
  }

  checkType(word, tagArray) {

    if (word) {

      if (!word.length) return false;

      if (word.indexOf(' ') < 0) {

        let psa = RiTa._lexicon()._posArr(word);

        if (RiTa.LEX_WARN && psa.length < 1 && this.size() <= 1000) {
          warn(RiTa.LEX_WARN);
          RiTa.LEX_WARN = 0; // only once
        }

        return psa.filter(p => tagArray.indexOf(p) > -1).length > 0;
      }

      throw Error("checkType() expects single word, found: '" + word + "'");
    }
  }


  _handleSingleLetter(c) {

    let result = c;

    if (c === 'a' || c === 'A')
      result = 'dt';
    else if (c === 'I')
      result = 'prp';
    else if (c >= '0' && c <= '9')
      result = 'cd';

    return result;
  }

  _logCustom(i, frm, to) { // log custom tag

    //console.log("\n  Custom("+i+") tagged '" + frm + "' -> '" + to + "'\n\n");
  }

  // Applies a customized subset of the Brill transformations
  _applyContext(words, result, choices) {

    //console.log("ac(" + words + "," + result + "," + choices + ")");

    // Apply transformations
    for (let i = 0, l = words.length; i < l; i++) {

      let word = words[i],
        tag = result[i];

      // transform 1a: DT, {VBD | VBP | VB} --> DT, NN
      if (i > 0 && (result[i - 1] == "dt")) {

        if (tag.startsWith("vb")) {
          tag = "nn";

          // transform 7: if a word has been categorized as a
          // common noun and it ends with "s", then set its type to plural common noun (NNS)
          if (word.match(/^.*[^s]s$/)) {
            if (!MODALS.includes(word)) {
              tag = "nns";
            }
          }

          this._logCustom("1a", word, tag);
        }

        // transform 1b: DT, {RB | RBR | RBS} --> DT, {JJ |
        // JJR | JJS}
        else if (tag.startsWith("rb")) {

          tag = (tag.length > 2) ? "jj" + tag.charAt(2) : "jj";
          this._logCustom("1b", word, tag);
        }
      }

      // transform 2: convert a noun to a number (cd) if it is
      // all digits and/or a decimal "."
      if (tag.startsWith("n") && !choices[i]) {
        if (isNum(word)) {
          tag = "cd";
        } // mods: dch (add choice check above) <---- ? >
      }

      // transform 3: convert a noun to a past participle if
      // word ends with "ed" and (following any nn or prp?)
      if (i > 0 && tag.startsWith("n") && word.endsWith("ed") && !word.endsWith("eed") && result[i - 1].match(/^(nn|prp)$/)) {
        tag = "vbn";
      }

      // transform 4: convert any type to adverb if it ends in "ly";
      if (word.endsWith("ly")) {
        tag = "rb";
      }

      // transform 5: convert a common noun (NN or NNS) to a
      // adjective if it ends with "al", special-case for mammal
      if (tag.startsWith("nn") && word.endsWith("al") && word != 'mammal') {
        tag = "jj";
      }

      // transform 6: convert a noun to a verb if the
      // preceeding word is modal
      if (i > 0 && tag.startsWith("nn") && result[i - 1].startsWith("md")) {
        tag = "vb";
      }

      // transform 8: convert a common noun to a present
      // participle verb (i.e., a gerund)
      if (tag.startsWith("nn") && word.endsWith("ing")) {

        // DH: fixed here -- add check on choices for any verb: eg. // 'morning'
        if (this.hasTag(choices[i], "vb")) {
          tag = "vbg";
          this._logCustom(8, word, tag);
        }
      }

      // transform 9(dch): convert plural nouns (which are also 3sg-verbs) to
      // 3sg-verbs when following a singular noun (the dog dances, Dave dances, he dances)
      if (i > 0 && tag == "nns" && this.hasTag(choices[i], "vbz") && result[i - 1].match(/^(nn|prp|nnp)$/)) {
        tag = "vbz";
        this._logCustom(9, word, tag);
      }

      // transform 10(dch): convert common nouns to proper
      // nouns when they start w' a capital
      if (tag.startsWith("nn") && (word.charAt(0) === word.charAt(0).toUpperCase())) {
        //if it is not at the start of a sentence or it is the only word
        // or when it is at the start of a sentence but can't be found in the dictionary
        if (i != 0 || words.length === 1 || (i == 0 && !this._lexHas('nn', RiTa.singularize(word).toLowerCase()))) {
          tag = tag.endsWith("s") ? "nnps" : "nnp";
          this._logCustom(10, word, tag);
        }
      }

      // transform 11(dch): convert plural nouns (which are
      // also 3sg-verbs) to 3sg-verbs when followed by adverb
      if (i < result.length - 1 && tag == "nns" && result[i + 1].startsWith("rb") &&
        this.hasTag(choices[i], "vbz")) {
        tag = "vbz";
        this._logCustom(11, word, tag);
      }

      // transform 12(dch): convert plural nouns which have an entry for their base form to vbz
      if (tag === "nns") {

        // is preceded by one of the following
        if (i > 0 && ["nn", "prp", "cc", "nnp"].indexOf(result[i - 1]) > -1) {
          // if word is ends with s or es and is 'nns' and has a vb
          if (this._lexHas('vb', RiTa.singularize(word))) {
            tag = "vbz";
            this._logCustom(12, word, tag);
          }
        } // if only word and not in lexicon
        else if (words.length === 1 && !choices[i].length) {
          // if the stem of a single word could be both nn and vb, return nns
          // only return vbz when the stem is vb but not nn
          if (!this._lexHas('nn', RiTa.singularize(word)) && this._lexHas('vb', RiTa.singularize(word))) {
            tag = "vbz";
            this._logCustom(12, word, tag);
          }

        }
      }

      //transform 13(cqx): convert a vb/ potential vb to vbp when following nns (Elephants dance, they dance)
      if (tag === "vb" || (tag === "nn" && this.hasTag(choices[i], "vb"))) {
        if (i > 0 && result[i - 1].match(/^(nns|nnps|prp)$/)) {
          tag = "vbp";
          this._logCustom(13, word, tag);
        }
      }

      result[i] = tag;
    }

    return result;
  }

  _lexHas(pos, words) { // takes ([n|v|a|r] or a full tag)

    if (!Array.isArray(words)) words = [words];// remove?

    for (let i = 0; i < words.length; i++) {

      if (RiTa.lexicon.hasWord(words[i])) {

        if (pos == null) return true;

        let tags = RiTa.lexicon._posArr(words[i]);

        for (let j = 0; j < tags.length; j++) {

          if (pos === 'n' && this.isNounTag(tags[j]) ||
            pos === 'v' && this.isVerbTag(tags[j]) ||
            pos === 'r' && this.isAdverbTag(tags[j]) ||
            pos === 'a' && this.isAdjTag(tags[j]) ||
            pos === tags[j]) {
            return true;
          }
        }
      }
    }
  }

}

module && (module.exports = PosTagger);
