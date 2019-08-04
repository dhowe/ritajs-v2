//const RiLexicon = require("./rita_lex");
const Utils = require("./utils");
const Lexicon = require('./rita_dict');
const RiMarkov = require('./rimarkov');

class RiTa {
  constructor() {
    throw Error('Illegal instantiation');
  }

  static alliterations() {
    return "";
  }

  static concordance() {
    return "";
  }

  static conjugate() {
    return "";
  }

  static hasWord(word) {
    word = word ? word.toLowerCase() : '';
    return this.dict.hasOwnProperty(word) || this._isPlural(word);
  }

  static env() {
    return isNode() ? RiTa.NODE : RiTa.JS;
  }

  static pastParticiple() {
    return "";
  }

  static phonemes() {
    return "";
  }

  static posTags() {
    return "";
  }

  static posTagsInline() {
    return "";
  }

  static presentParticiple() {
    return "";
  }

  static stresses() {
    return "";
  }

  static syllables() {
    return "";
  }

  static isAbbrev() {
    return "";
  }

  static isAdjective() {
    return "";
  }

  static isAdverb() {
    return "";
  }

  static isAlliteration() {
    return "";
  }

  static isNoun() {
    return "";
  }

  static isPunctuation() {
    return "";
  }

  static isQuestion() {
    return "";
  }

  static isRhyme() {
    return "";
  }

  static isVerb() {
    return "";
  }

  static kwic() {
    return "";
  }

  static pluralize() {
    return "";
  }

  static random() {
    return "";
  }

  static randomOrdering() {
    return "";
  }

  static randomSeed() {
    return "";
  }

  static randomWord() {
    return "";
  }

  static rhymes() {
    return "";
  }

  static parseDial() {
    return "";
  }

  static similarBy() {
    return "";
  }

  static singularize() {
    return "";
  }

  static sentences() {
    return "";
  }

  static stem() {
    return "";
  }

  static tokenize() {
    return "";
  }

  static untokenize() {
    return "";
  }

  static words() {
    return "";
  }

}

RiTa.VERSION = 2;
RiTa.dict = Lexicon;
RiTa.RiMarkov = RiMarkov;

// // Helper functions
//
// function lexicon() {
//   if (typeof RiTa.lexicon === 'undefined') {
//     RiTa.lexicon = new RiLexicon(RiTa);
//   }
//   return RiTa.lexicon;
// }


module && (module.exports = RiTa);
