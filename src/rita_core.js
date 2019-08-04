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
    return this.dict.hasOwnProperty(word) || _isPlural(word);
  }

  static env() {
    return Utils.isNode() ? RiTa.NODE : RiTa.JS;
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

  static runScript() {
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

RiTa.NODE = 'node';
RiTa.BROWSER = 'browser';

RiTa.VERSION = 2;
RiTa.dict = Lexicon;
RiTa.RiMarkov = RiMarkov;

// Helper functions

function _isPlural(word) {

  if (Utils.NULL_PLURALS.applies(word))
    return true;

  var stem = RiTa.stem(word, 'Pling');
  if (stem === word) {
    return false;
  }

  var sing = RiTa.singularize(word);
  var data = this.data[sing];

  if (data && data.length === 2) {
    var pos = data[1].split(SP);
    for (var i = 0; i < pos.length; i++) {
      if (pos[i] === 'nn')
        return true;
    }

  } else if (word.endsWith("ses") || word.endsWith("zes")) {

    sing = word.substring(0, word.length - 1);
    data = this.data[sing];
    if (data && data.length === 2) {
      var pos = data[1].split(SP);
      for (var i = 0; i < pos.length; i++) {
        if (pos[i] === 'nn')
          return true;
      }
    }
  }
  return false;
}

module && (module.exports = RiTa);
