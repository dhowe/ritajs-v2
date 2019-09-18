const Util = require("./utils");
const RandGen = require('./random');

const Parser = require('./parser');
const Markov = require('./markov');
const Stemmer = require('./stemmer');
const Lexicon = require('./lexicon');
const Tokenizer = require('./tokenizer');
const PosTagger = require('./tagger');
const Analyzer = require('./analyzer');
const Concorder = require('./concorder');
const LetterToSound = require("./rita_lts");
const Syllabifier = require('./syllabifier');


class RiTa {

  constructor() {
    throw Error('Invalid instantiation');
  }

  static analyze() {
    _lexicon() && _lts(); // init data objects
    return RiTa.analyzer.analyze.apply(RiTa.analyzer, arguments);
  }

  static alliterations() {
    let lex = _lexicon();
    return lex.alliterations.apply(lex, arguments);
  }

  static concordance() {
    return RiTa.concorder.concordance.apply(RiTa.concorder, arguments);
  }

  static conjugate(verb, opts) {
    return "";
  }

  static env() {
    return Util.isNode() ? RiTa.NODE : RiTa.JS;
  }

  static hasWord(word) {
    return _lexicon().hasWord(word);
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
    return RiTa.concorder.kwic.apply(RiTa.concorder, arguments);
  }

  static pastParticiple(verb) {
    return "";
  }

  static phonemes(str) {
    return "";
  }

  static posTags(words, opts) {
    _lts(); // TMP: make sure we have lts engine
    if (opts) {
      words = typeof words === 'string' ? RiTa.tokenizer.tokenize(words) : words;
      if (opts.wordNetTags) return RiTa.tagger.tagForWordNet(words);
      if (opts.inline) return RiTa.tagger.tagForWordNet(words);
    }
    return RiTa.tagger.tag(words);
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
    return RiTa.syllabifier.syllabify(str);
  }

  static pluralize(verb) {
    return "";
  }

  static randomOrdering(num) {
    return RandGen.randomOrdering(num);
  }

  static random() {
    return RandGen.random.apply(RandGen, arguments);
  }

  static randomSeed(theSeed) {
    return RandGen.seed(theSeed);
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
    return RiTa.parser.lexParseVisit.apply(RiTa.parser, arguments);
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
    return RiTa.stemmer.stem(word);
  }

  static tokenize(str) {
    return RiTa.tokenizer.tokenize(str);
  }

  static untokenize(arr) {
    return RiTa.tokenizer.untokenize(arr);
  }

  static words() {
    return _lexicon().words();
  }
}

// COMPONENTS
RiTa.parser = new Parser(RiTa);
RiTa.stemmer = new Stemmer(RiTa);
RiTa.tagger = new PosTagger(RiTa);
RiTa.concorder = new Concorder(RiTa);
RiTa.tokenizer = new Tokenizer(RiTa);
RiTa.analyzer = new Analyzer(RiTa);
RiTa.syllabifier = new Syllabifier(RiTa);

// CLASSES
RiTa.RiMarkov = Markov;


// LAZY-LOADS
RiTa.lexicon = undefined;
RiTa.dict = undefined;
RiTa.lts = undefined;

// CONSTANTS
RiTa.VERSION = 2;
RiTa.NODE = 'node';
RiTa.BROWSER = 'browser';
RiTa.SILENT = false;

// Warn on words not found  in lexicon
RiTa.LEX_WARN = false;

// For tokenization, Can't -> Can not, etc.
RiTa.SPLIT_CONTRACTIONS = false;

// HELPERS

function _lexicon() {
  if (typeof RiTa.lexicon === 'undefined') {
    RiTa.lexicon = new Lexicon(RiTa, require('./rita_dict'));
  }
  return RiTa.lexicon;
}

function _lts() {
  if (typeof RiTa.lts === 'undefined') {
    RiTa.lts = new LetterToSound(RiTa);
  }
  return RiTa.lexicon;
}

function _stemmer() {
  if (typeof RiTa.stemmer === 'undefined') {
    RiTa.stemmer = new Stemmer(RiTa);
  }
  return RiTa.stemmer;
}

// function _concorder() {
//   if (typeof RiTa.concorder === 'undefined') {
//     RiTa.concorder = new Concorder(RiTa);
//   }
//   return RiTa.concorder;
// }
//
// function _tagger() {
//   if (typeof RiTa.tagger === 'undefined') {
//     RiTa.tagger = new PosTagger(RiTa);
//   }
//   return RiTa.tagger;
// }

// function _parser() {
//   if (typeof RiTa.parser === 'undefined') {
//     RiTa.parser = new Parser();
//   }
//   return RiTa.parser;
// }
//
// function _analyzer() {
//   if (typeof RiTa.analyzer === 'undefined') {
//     RiTa.analyzer = new Analyzer();
//   }
//   return RiTa.analyzer;
// }

module && (module.exports = RiTa);
