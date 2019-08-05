const Utils = require("./utils");
const Parser = require('./parser');
const Stemmer = require('./pling');
const RiMarkov = require('./rimarkov');
const RiLexicon = require('./rilexicon');

const randgen = require('./random');

class RiTa {

  constructor() {
    throw Error('Invalid instantiation');
  }

  static alliterations() {
    let lex = _lexicon();
    return lex.alliterations.apply(lex, arguments);
  }

  static concordance() {
    return "";
  }

  static conjugate(verb, opts) {
    return "";
  }

  static hasWord(word) {
    return _lexicon().hasWord(word);
  }

  static env() {
    return Utils.isNode() ? RiTa.NODE : RiTa.JS;
  }

  static pastParticiple(verb) {
    return "";
  }

  static phonemes(str) {
    return "";
  }

  static posTags(str) {
    return "";
  }

  static posTagsInline(str) { // TODO: add as option
    return "";
  }

  static presentParticiple(verb) {
    return "";
  }

  static stresses(str) {
    return "";
  }

  static syllables(str) {
    return "";
  }

  static isAbbrev(str) {
    return "";
  }

  static isAdjective(word) {
    return "";
  }

  static isAdverb(word) {
    return "";
  }

  static isAlliteration(word1, word2) {
    return "";
  }

  static isNoun(word) {
    return "";
  }

  static isPunctuation(str) {
    return "";
  }

  static isQuestion(str) {
    return "";
  }

  static isRhyme(word1, word2) {
    return "";
  }

  static isVerb(word) {
    return "";
  }

  static kwic() {
    return "";
  }

  static pluralize(verb) {
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
    let lex = _lexicon();
    return lex.rhymes.apply(lex, arguments);
  }

  static runScript(s) {
    let parser = _parser();
    return parser.lexParseVisit.apply(parser, arguments);
  }

  static similarBy() {
    let lex = _lexicon();
    return lex.similarBy.apply(lex, arguments);
  }

  static singularize(verb) {
    return "";
  }

  static sentences(str) {
    return "";
  }

  static stem(word) {
    if (!RiTa.stemmer) RiTa.stemmer = new Stemmer();
    return RiTa.stemmer.stem(word);
  }

  static tokenize(str) {
    return "";
  }

  static untokenize(arr) {
    return "";
  }

  static words() {
    return _lexicon().words();
  }

}

// CONSTANTS
RiTa.VERSION = 2;
RiTa.NODE = 'node';
RiTa.BROWSER = 'browser';
RiTa.LEX_WARN = false;
RiTa.SILENT = false;

// LAZY-LOADS
RiTa.tagger = undefined;
RiTa.randSource = undefined;
RiTa.parser = undefined;
RiTa.dict = undefined;

// CLASSES
RiTa.RiMarkov = RiMarkov;

// HELPERS
function _tagger() {
  if (typeof RiTa.tagger === 'undefined') {
    RiTa.tagger = new PosTagger(RiTa);
  }
  return RiTa.tagger;
}

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
