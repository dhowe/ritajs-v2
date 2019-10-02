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
const Pluralizer = require('./pluralizer');
const LetterToSound = require("./rita_lts");
const Syllabifier = require('./syllabifier');

let ONLY_PUNCT = /^[^0-9A-Za-z\s]*$/;
let ALL_PUNCT = /^[-[\]{}()*+!?%&.,\\^$|#@<>|+=;:]+$/g;

class RiTa {

  constructor() {
    throw Error('Invalid instantiation');
  }

  static analyze(text) {
    return RiTa._loadData().analyzer.analyze(text);
  }

  static alliterations(text) {
    return RiTa._loadData().lexicon.alliterations(text);
  }

  static concordance() {
    return RiTa.concorder.concordance(...arguments);
  }

  static conjugate(verb, opts) {
    return "";
  }

  static env() {
    return Util.isNode() ? RiTa.NODE : RiTa.JS;
  }

  static hasWord(word) {
    return RiTa._loadData().lexicon.hasWord(word);
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

  static isPunctuation(text) {
    return text && text.length && ONLY_PUNCT.test(text);
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
    return RiTa.concorder.kwic(...arguments);
  }

  static pastParticiple(verb) {
    return "";
  }

  static phonemes(str) {
    return RiTa._loadData().analyzer.analyze(str).phonemes;
  }

  static posTags(words, opts) {
    RiTa._loadData(); // init dict/lts
    words = typeof words === 'string' ? RiTa.tokenizer.tokenize(words) : words;
    if (opts) {
      //words = typeof words === 'string' ? RiTa.tokenizer.tokenize(words) : words;
      if (opts.wordNetTags) return RiTa.tagger.tagForWordNet(words);
      if (opts.inline) return RiTa.tagger.tagForWordNet(words);
    }
    return RiTa.tagger.tag(words); // or split on spaces instead?
  }

  static posTagsInline(str) { // TODO: add as option
    return "";
  }

  static presentParticiple(verb) {
    return "";
  }

  static pluralize(word) {
    return RiTa.pluralizer.pluralize(word);
  }

  static randomOrdering(num) {
    return RandGen.randomOrdering(num);
  }

  static random() {
    return RandGen.random(...arguments);
  }

  static randomSeed(theSeed) {
    return RandGen.seed(theSeed);
  }

  static randomWord(opts) {
    return RiTa._loadData().lexicon.randomWord(opts);
  }

  static rhymes(word, opts) {
    return RiTa._loadData().lexicon.rhymes(word, opts);
  }

  static runScript(s) {
    return RiTa.parser.lexParseVisit(...arguments);
  }

  static stresses(str) {
    return RiTa._loadData().analyzer.analyze(str).stresses;
  }

  static syllables(str) {
    return RiTa._loadData().analyzer.analyze(str).syllables;
  }

  static similarBy(word, opts) {
    return RiTa._loadData().lexicon.similarBy(word, opts);
  }

  static singularize(word) {
    return RiTa.pluralizer.singularize(word);
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
    return RiTa._loadData().lexicon.words();
  }

  /////////////////////////////////////////////////////////////////

  static _loadData() {
    if (typeof RiTa.lexicon === 'undefined') {
      RiTa.lts = new LetterToSound(RiTa);
      RiTa.lexicon = new Lexicon(RiTa, require('./rita_dict'));
    }
    return RiTa;
  }
}

// COMPONENTS
RiTa.parser = new Parser(RiTa);
RiTa.stemmer = new Stemmer(RiTa);
RiTa.tagger = new PosTagger(RiTa);
RiTa.concorder = new Concorder(RiTa);
RiTa.tokenizer = new Tokenizer(RiTa);
RiTa.analyzer = new Analyzer(RiTa);
RiTa.pluralizer = new Pluralizer(RiTa);
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
RiTa.SILENCE_LTS = true;
RiTa.FIRST_PERSON = 1;
RiTa.SECOND_PERSON = 2;
RiTa.THIRD_PERSON = 3;
RiTa.PAST_TENSE = 4;
RiTa.PRESENT_TENSE = 5;
RiTa.FUTURE_TENSE = 6;
RiTa.SINGULAR = 7;
RiTa.PLURAL = 8;
RiTa.NORMAL = 9;
RiTa.FEATURE_DELIM = ' =';
RiTa.STRESSED = '1';
RiTa.UNSTRESSED = '0';
RiTa.PHONEME_BOUNDARY = '-';
RiTa.WORD_BOUNDARY = " ";
RiTa.SYLLABLE_BOUNDARY = "/";
RiTa.SENTENCE_BOUNDARY = "|";
RiTa.VOWELS = "aeiou";
RiTa.ABBREVIATIONS = ["Adm.", "Capt.", "Cmdr.", "Col.", "Dr.", "Gen.", "Gov.", "Lt.", "Maj.", "Messrs.", "Mr.", "Mrs.", "Ms.", "Prof.", "Rep.", "Reps.", "Rev.", "Sen.", "Sens.", "Sgt.", "Sr.", "St.", "a.k.a.", "c.f.", "i.e.", "e.g.", "vs.", "v.", "Jan.", "Feb.", "Mar.", "Apr.", "Mar.", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];

// Warn on words not found  in lexicon
RiTa.LEX_WARN = false;

// For tokenization, Can't -> Can not, etc.
RiTa.SPLIT_CONTRACTIONS = false;

RiTa.FEATURES = ['tokens', 'stresses', 'phonemes', 'syllables', 'pos', 'text'].map(f => f.toUpperCase());

// HELPERS

// function _lexicon() {
//
// }

function _stemmer() {
  if (typeof RiTa.stemmer === 'undefined') {
    RiTa.stemmer = new Stemmer(RiTa);
  }
  return RiTa.stemmer;
}

module && (module.exports = RiTa);
