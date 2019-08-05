const Utils = require("./utils");
const Parser = require('./parser');
const Stemmer = require('./pling');
const RiMarkov = require('./rimarkov');
const RiLexicon = require('./rilexicon');

const randgen = require('./random');

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
    return _lexicon().hasWord(word);
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

  static randomOrdering(num) {
    return randgen.randomOrdering(num);
  }

  static random() {
    return randgen.random.apply(randgen, arguments);
  }

  static randomSeed(theSeed) {
    return randgen.seed(theSeed);
  }

  static randomWord() {
    let lex = _lexicon();
    return lex.randomWord.apply(lex, arguments);
  }

  static rhymes() {
    return "";
  }

  static runScript(s) {
    let parser = _parser();
    return parser.lexParseVisit.apply(parser, arguments);
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

RiTa.VERSION = 2;
RiTa.NODE = 'node';
RiTa.BROWSER = 'browser';

RiTa.RiMarkov = RiMarkov;

RiTa.randSource = undefined;
RiTa.parser = undefined;
RiTa.dict = undefined;

// Helper functions

// function _randomSource() {
//   if (!RiTa.randSource) {
//     RiTa.randSource = new SeededRandom();
//   }
//   return RiTa.randSource;
// }

function _lexicon() {
  if (typeof RiTa.lexicon === 'undefined') {
    RiTa.lexicon = new RiLexicon(RiTa, require('./rita_dict'));
  }
  return RiTa.lexicon;
}

function _parser() {
  if (typeof RiTa.parser === 'undefined') {
    RiTa.parser = new Parser();
  }
  return RiTa.parser;
}

module && (module.exports = RiTa);
