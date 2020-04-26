const { MODALS } = require("./util");

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

  tag(words, simple, inline, fatal) {

    let dbug = 0, lexicon = RiTa._lexicon();
    let result = [], choices2d = [];

    if (!words || !words.length) return inline ? '' : [];
    if (!Array.isArray(words)) words = RiTa.tokenizer.tokenize(words);

    for (let i = 0, l = words.length; i < l; i++) {

      if (words[i].length < 1) {
        result.push('');
        continue;
      }

      if (words[i].length == 1) {
        result.push(this._handleSingleLetter(words[i]));
        continue;
      }

      let posData = lexicon._posArr(words[i], fatal); // fail if no lexicon
      if (!posData && (words[i] === 'the' || words[i] === 'a')) posData.push('dt');

      /*
      VBD 	Verb, past tense
      VBG 	Verb, gerund or present participle
      VBN 	Verb, past participle
      VBP 	Verb, non-3rd person singular present
      VBZ 	Verb, 3rd person singular present
      NNS   Noun, plural
      */
      if (!posData.length) { // check inflections  (REFACTOR)
        let stem, pos;
        if (words[i].endsWith('s')) {  // (s$ || es$) plural noun or vbz
          // verb or noun
          stem = words[i].substring(0, words[i].length - 1);
          if (stem) {
            pos = lexicon._posArr(stem);
            if (pos.length) {
              if (pos.includes('nn')) posData.push('nns');  // fates
              if (pos.includes('vb')) posData.push('vbz'); // hates
            }
          }
        }
        else if (words[i].endsWith('ed')) { // simple past or past participle
          stem = words[i].substring(0, words[i].length - 1);
          if (stem) {
            pos = lexicon._posArr(stem);
            if (pos.length) {
              if (pos.includes('vb')) posData.push('vbd', 'vbn'); // hated
            }
          }
        }
        else if (words[i].endsWith('ing')) {
          stem = words[i].substring(0, words[i].length - 3);
          if (stem) {
            pos = lexicon._posArr(stem);
            if (pos.length && pos.includes('vb')) {
              posData.push('vbg'); // assenting
            }
            else {
              stem += 'e'; // e.g, hate
              pos = lexicon._posArr(stem); 
              if (pos.length) {
                if (pos.includes('vb')) posData.push('vbg');  // hating
              }
            }
          }
        }

        /*if (stem) {
          let pos = lexicon._posArr(stem);
          if (pos.length) {
            dbug && console.log(words[i], 'stem=\'' + stem + "'", pos);
            if (words[i].endsWith('s')) {
              let word = words[i];
              if (pos.includes('nn')) posData.push('nns');  // fates
              if (pos.includes('vb')) posData.push('vbz'); // hates
            }
            else if (words[i].endsWith('ed')) {
              //stem = words[i].substring(0, words[i].length - 1);
              if (pos.includes('vb')) posData.push('vbd', 'vbn'); // hated
            }
            else if (words[i].endsWith('ing')) {
              //stem = words[i].substring(0, words[i].length - 2);
              if (pos.includes('vb')) posData.push('vbg'); // hating
              
            }
          }
        }*/
      }

      if (!posData.length) {
        let sing = RiTa.singularize(words[i]);
        if (this._lexHas("n", sing)) {
          posData.push('nns');
        } else if (RiTa.stemmer.checkPluralWithoutLexicon(words[i])) {
          posData.push('nns');
          //common plurals
        }
      }

      if (!posData.length) posData.push((words[i].endsWith('s') ? 'nns' : 'nn'));
      result.push(posData[0]);
      choices2d[i] = posData;
      //}
    }

    // Adjust pos according to transformation rules
    let tags = this._applyContext(words, result, choices2d, dbug);

    if (simple) { // convert to simple tags
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

  // Returns an array of parts-of-speech from the Penn tagset,
  // each corresponding to one word of input
  tagOK(words, simple, inline, fatal) {

    let dbug = 0, lexicon = RiTa._lexicon();
    let result = [], choices2d = [];

    if (!words || !words.length) return inline ? '' : [];
    if (!Array.isArray(words)) words = RiTa.tokenizer.tokenize(words);

    for (let i = 0, l = words.length; i < l; i++) {

      if (words[i].length < 1) {
        result.push('');
        continue;
      }

      if (words[i].length == 1) {
        result.push(this._handleSingleLetter(words[i]));
        continue;
      }

      let posData = lexicon._posArr(words[i], fatal); // fail if no lexicon

      /*
      VBD 	Verb, past tense
      VBG 	Verb, gerund or present participle
      VBN 	Verb, past participle
      VBP 	Verb, non-3rd person singular present
      VBZ 	Verb, 3rd person singular present
      NNS   Noun, plural
      */
      if (!posData.length) { // check inflections  (REFACTOR)
        let stem;
        if (words[i].endsWith('es')) {  // plural noun or vbz
          // verb or noun
          stem = words[i].substring(0, words[i].length - 1);
        }
        else if (words[i].endsWith('s')) { // plural noun or vbz
          // verb or noun
          stem = words[i].substring(0, words[i].length);
        }
        else if (words[i].endsWith('ed')) { // simple past or past participle
          stem = words[i].substring(0, words[i].length - 1);
        }
        else if (words[i].endsWith('ing')) {
          stem = words[i].substring(0, words[i].length - 2);
        }

        if (stem) {
          let pos = lexicon._posArr(stem);
          dbug && console.log(words[i], 'stem=\'' + stem + "'", pos);
          if (words[i].endsWith('s')) {
            if (pos.includes('n')) posData.push('nns');  // fates
            if (pos.includes('vb')) posData.push('vbz'); // hates
          }
          else if (words[i].endsWith('ed')) {
            stem = words[i].substring(0, words[i].length - 1);
            if (pos.includes('vb')) posData.push('vbd', 'vbn'); // hated
          }
          else if (words[i].endsWith('ing')) {
            stem = words[i].substring(0, words[i].length - 2);
            if (pos.includes('vb')) posData.push('vbg'); // hating
          }
        }
      }

      if (!posData.length) {
        let word = words[i];
        //console.log(word);
        //throw Error('no posData for "'+words[i]+'"');

        // TODO: use stemmer categories if no lexicon

        choices2d[i] = [];
        let tag = 'nn';
        if (words[i].endsWith('s')) {
          tag = 'nns';
        }
        else if (/^(the|a)$/i.test(words[i])) {
          tag = 'dt';
        }

        if (words[i].endsWith('s')) {
          let sub2, sub = words[i].substring(0, words[i].length - 1);

          if (words[i].endsWith('es'))
            sub2 = words[i].substring(0, words[i].length - 2)

          if (this._lexHas("n", sub) || (sub2 && this._lexHas("n", sub2))) {
            choices2d[i].push("nns");
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

        result.push(posData[0]);
        choices2d[i] = posData;
      }
    }

    // Adjust pos according to transformation rules
    let tags = this._applyContext(words, result, choices2d, dbug);

    if (simple) { // convert to simple tags
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

    if (typeof word === 'undefined' || word.includes(' ')) {

      throw Error("checkType() expects word, found: '" + typeof word + "'");
    }

    if (!word.length) return false;

    //     if (word.indexOf(' ') < 0) {

    let lex = RiTa._lexicon();
    let psa = lex._posArr(word); // try dictionary

    if (!psa.length) {
      if (RiTa.LEX_WARN && lex.size() <= 1000) {
        console.warn(RiTa.LEX_WARN);
        RiTa.LEX_WARN = 0; // only once
      }
      psa = RiTa.posTags(word); // try lts-engine
    }

    return psa.filter(p => tagArray.includes(p)).length > 0;
    //}
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

  _log(i, frm, to) { // log custom tag

    console.log("\n  Custom(" + i + ") tagged '" + frm + "' -> '" + to + "'\n\n");
  }

  // Applies a customized subset of the Brill transformations
  _applyContext(words, result, choices, dbug) {

    //console.log("ac(" + words + " :: " + result + " :: " + choices + ")");

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

        // transform 1b: DT, {RB | RBR | RBS} --> DT, {JJ |
        // JJR | JJS}
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
        if (i != 0 || words.length === 1 || (i == 0 && !this._lexHas('nn', RiTa.singularize(word).toLowerCase()))) {
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

      //transform 13(cqx): convert a vb/ potential vb to vbp when following nns (Elephants dance, they dance)
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
