const Utils = require("./utils");
const Parser = require('./parser');
const Stemmer = require('./pling');
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
    return _lexicon().hasOwnProperty(word) || _isPlural(word);
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

  static runScript(s) {
    return _parser().lexParseVisit(s);
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

  static stem(word) {
    if (!RiTa.stemmer) RiTa.stemmer = new Stemmer();
    return RiTa.stemmer.stem(word);
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
RiTa.RiMarkov = RiMarkov;
RiTa.dict = undefined;

// Helper functions

function _lexicon() {
  if (typeof RiTa.dict === 'undefined') {
    RiTa.dict = require('./rita_dict');
  }
  return RiTa.dict;
}

function _parser() {
  if (typeof RiTa.parser === 'undefined') {
    RiTa.parser = new Parser();
  }
  return RiTa.parser;
}

function _isPlural(word) {

  if (Utils.NULL_PLURALS.applies(word))
    return true;

  var stem = RiTa.stem(word);
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
