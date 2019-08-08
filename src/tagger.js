
class PosTagger {

  constructor() {
    this.ADJ: ['jj', 'jjr', 'jjs'];
    this.ADV: ['rb', 'rbr', 'rbs', 'rp'];
    this.NOUNS: ['nn', 'nns', 'nnp', 'nnps'];
    this.VERBS: ['vb', 'vbd', 'vbg', 'vbn', 'vbp', 'vbz'];
    this.DBUG: 0;
  }

  isVerb(tag) {
    return this.VERBS.includes(tag);
  }

  isNoun(tag) {
    return this.NOUNS.includes(tag);
  }

  isAdverb(tag) {
    return this.ADV.includes(tag);
  }

  isAdj(tag) {
    return this.ADJ.includes(tag);
  }

  hasTag(choices, tag) {
    if (!Array.isArray(choices)) return false;
    let choiceStr = choices.join();
    return (choiceStr.indexOf(tag) > -1);
  }

  // Returns an array of parts-of-speech from the Penn tagset,
  // each corresponding to one word of input
  tag(words) {

    let result = [],
      choices2d = [],
      lex = RiTa.lexicon;

    words = is(words, A) ? words : [words];

    for (let i = 0, l = words.length; i < l; i++) {

      if (words[i].length < 1) {

        result.push(E);
        continue;
      }

      if (words[i].length == 1) {

        result.push(this._handleSingleLetter(words[i]));
        continue;
      }

      let data = lex && lex._getPosArr(words[i]);
      if (!data.length) {

        // use stemmer categories if no lexicon

        choices2d[i] = [];
        let tag = 'nn';
        if (endsWith(words[i], 's')) {
          tag = 'nns';
        }

        if (!RiTa.SILENT) { // warn
          if (RiTa.LEX_WARN && lex.size() <= 1000) {
            warn(RiTa.LEX_WARN);
            RiTa.LEX_WARN = false;
          }
          if (RiTa.LTS_WARN && typeof LetterToSound === 'undefined') {
            warn(RiTa.LTS_WARN);
            RiTa.LTS_WARN = false;
          }
        }

        if (endsWith(words[i], 's')) {
          let sub2, sub = words[i].substring(0, words[i].length - 1);

          if (endsWith(words[i], 'es'))
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
          } else if (checkPluralNoLex(words[i])) {
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
    return this._applyContext(words, result, choices2d);
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

  _ct(i, frm, to) { // log custom tag

    if (this.DBUG) console.log("\n  Custom(" +
      i + ") tagged '" + frm + "' -> '" + to + "'\n\n");
  }

  // Applies a customized subset of the Brill transformations
  _applyContext(words, result, choices) {

    (this.DBUG) && console.log("ac(" + words + "," + result + "," + choices + ")");
    let sW = startsWith,
      eW = endsWith,
      eic = equalsIgnoreCase;

    // Apply transformations
    for (let i = 0, l = words.length; i < l; i++) {

      let word = words[i],
        tag = result[i];

      // transform 1a: DT, {VBD | VBP | VB} --> DT, NN
      if (i > 0 && (result[i - 1] == "dt")) {

        if (sW(tag, "vb")) {
          tag = "nn";

          // transform 7: if a word has been categorized as a
          // common noun and it ends with "s", then set its type to plural common noun (NNS)
          if (word.match(/^.*[^s]s$/)) {
            if (!NULL_PLURALS.applies(word))
              tag = "nns";
          }

          this._ct("1a", word, tag);
        }

        // transform 1b: DT, {RB | RBR | RBS} --> DT, {JJ |
        // JJR | JJS}
        else if (sW(tag, "rb")) {

          tag = (tag.length > 2) ? "jj" + tag.charAt(2) : "jj";
          this._ct("1b", word, tag);
        }
      }

      // transform 2: convert a noun to a number (cd) if it is
      // all digits and/or a decimal "."
      if (sW(tag, "n") && !choices[i]) {
        if (isNum(word)) {
          tag = "cd";
        } // mods: dch (add choice check above) <---- ? >
      }

      // transform 3: convert a noun to a past participle if
      // word ends with "ed" and (following any nn or prp?)
      if (i > 0 && sW(tag, "n") && eW(word, "ed") && !eW(word, "eed") && result[i - 1].match(/^(nn|prp)$/)) {
        tag = "vbn";
      }

      // transform 4: convert any type to adverb if it ends in "ly";
      if (eW(word, "ly")) {
        tag = "rb";
      }

      // transform 5: convert a common noun (NN or NNS) to a
      // adjective if it ends with "al", special-case for mammal
      if (sW(tag, "nn") && eW(word, "al") && word != 'mammal') {
        tag = "jj";
      }

      // transform 6: convert a noun to a verb if the
      // preceeding word is modal
      if (i > 0 && sW(tag, "nn") && sW(result[i - 1], "md")) {
        tag = "vb";
      }

      // transform 8: convert a common noun to a present
      // participle verb (i.e., a gerund)
      if (sW(tag, "nn") && eW(word, "ing")) {

        // DH: fixed here -- add check on choices for any verb: eg. // 'morning'
        if (this.hasTag(choices[i], "vb")) {
          tag = "vbg";
          this._ct(8, word, tag);
        }
      }

      // transform 9(dch): convert plural nouns (which are also 3sg-verbs) to
      // 3sg-verbs when following a singular noun (the dog dances, Dave dances, he dances)
      if (i > 0 && tag == "nns" && this.hasTag(choices[i], "vbz") && result[i - 1].match(/^(nn|prp|nnp)$/)) {
        tag = "vbz";
        this._ct(9, word, tag);
      }

      // transform 10(dch): convert common nouns to proper
      // nouns when they start w' a capital
      if (sW(tag, "nn") && (word.charAt(0) === word.charAt(0).toUpperCase())) {
        //if it is not at the start of a sentence or it is the only word
        // or when it is at the start of a sentence but can't be found in the dictionary
        if (i != 0 || words.length === 1 || (i == 0 && !this._lexHas('nn', RiTa.singularize(word).toLowerCase()))) {
          tag = eW(tag, "s") ? "nnps" : "nnp";
          this._ct(10, word, tag);
        }
      }

      // transform 11(dch): convert plural nouns (which are
      // also 3sg-verbs) to 3sg-verbs when followed by adverb
      if (i < result.length - 1 && tag == "nns" && sW(result[i + 1], "rb") &&
        this.hasTag(choices[i], "vbz")) {
        tag = "vbz";
        this._ct(11, word, tag);
      }

      // transform 12(dch): convert plural nouns which have an entry for their base form to vbz
      if (tag === "nns") {

        // is preceded by one of the following
        if (i > 0 && ["nn", "prp", "cc", "nnp"].indexOf(result[i - 1]) > -1) {
          // if word is ends with s or es and is 'nns' and has a vb
          if (this._lexHas('vb', RiTa.singularize(word))) {
            tag = "vbz";
            this._ct(12, word, tag);
          }
        } // if only word and not in lexicon
        else if (words.length === 1 && !choices[i].length) {
          // if the stem of a single word could be both nn and vb, return nns
          // only return vbz when the stem is vb but not nn
          if (!this._lexHas('nn', RiTa.singularize(word)) && this._lexHas('vb', RiTa.singularize(word))) {
            tag = "vbz";
            this._ct(12, word, tag);
          }

        }
      }

      //transform 13(cqx): convert a vb/ potential vb to vbp when following nns (Elephants dance, they dance)
      if (tag === "vb" || (tag === "nn" && this.hasTag(choices[i], "vb"))) {
        if (i > 0 && result[i - 1].match(/^(nns|nnps|prp)$/)) {
          tag = "vbp";
          this._ct(13, word, tag);
        }
      }

      result[i] = tag;
    }

    return result;
  }

  _lexHas(pos, words) { // takes ([n|v|a|r] or a full tag)

    let words = is(words, A) || [words];

    for (let i = 0; i < words.length; i++) {

      if (RiTa.lexicon.containsWord(words[i])) {

        if (pos == null) return true;

        let tags = RiTa.lexicon._getPosArr(words[i]);

        for (let j = 0; j < tags.length; j++) {

          if (pos === 'n' && PosTagger.isNoun(tags[j]) ||
            pos === 'v' && PosTagger.isVerb(tags[j]) ||
            pos === 'r' && PosTagger.isAdverb(tags[j]) ||
            pos === 'a' && PosTagger.isAdj(tags[j]) ||
            pos === tags[j]) {
            return true;
          }
        }
      }
    }
  }
}

module && (module.exports = PosTagger);
