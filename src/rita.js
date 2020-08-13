const Util = require("./util");
const Markov = require('./markov');
const Grammar = require('./grammar');
const Stemmer = require('./stemmer');
const Lexicon = require('./lexicon');
const RiScript = require('./riscript');
const Tokenizer = require('./tokenizer');
const PosTagger = require('./tagger');
const Analyzer = require('./analyzer');
const Concorder = require('./concorder');
const Conjugator = require('./conjugator');
const Inflector = require('./inflector');
const SeededRandom = require('./random');
const Operator = require('./operator');

const ONLY_PUNCT = /^[^0-9A-Za-z\s]*$/;

/**
 * TODO:
 *   implement pos opt for rhymes/alliterations/soundsLike/spellsLike
 *   add docs for evaluate and addTransform (link to README#riscript)
 */

class RiTa {

  static addTransform() {
    return RiScript.addTransform(...arguments);
  }

  static articlize(s) { // TODO: add to api
    return RiScript.articlize(s);
  }

  static alliterations() {
    return RiTa.lexicon().alliterations(...arguments);
  }

  static analyze() {
    return RiTa._analyzer().analyze(...arguments);
  }

  static concordance() { // DOC:
    return RiTa.concorder.concordance(...arguments);
  }

  static conjugate() {
    return RiTa.conjugator.conjugate(...arguments);
  }

  static createGrammar() { // niapi
    return new RiTa.Grammar(...arguments);
  }

  static createMarkov() { // niapi
    return new RiTa.Markov(...arguments);
  }

  static env() { // niapi
    return Util.isNode() ? RiTa.NODE : RiTa.JS;
  }

  static evaluate() { // DOC:
    return RiScript.eval(...arguments);
  }

  static getTransforms() {
    return RiScript.getTransforms();
  }

  static hasLexicon() {
    return RiTa.lexicon().size() > 0;
  }

  static hasWord(word) {
    return RiTa.lexicon().hasWord(word, true);
  }

  static isAbbreviation(input, { caseSensitive = false } = {}) {
    if (typeof input === 'string') {
      if (caseSensitive) return RiTa.ABBREVIATIONS.includes(input.trim());
      let check = input.trim().toLowerCase();
      return RiTa.ABBREVIATIONS.filter(a => a.toLowerCase() === check).length > 0;
    }
  }

  static isAdjective(word) {
    return RiTa.tagger.isAdjective(word);
  }

  static isAdverb(word) {
    return RiTa.tagger.isAdverb(word);
  }

  static isAlliteration() {
    return RiTa.lexicon().isAlliteration(...arguments);
  }

  static isNoun(word) {
    return RiTa.tagger.isNoun(word);
  }

  static isPunctuation(text) {
    return text && text.length && ONLY_PUNCT.test(text);
  }

  static isQuestion(sentence) { // remove?
    return RiTa.QUESTIONS.includes
      (RiTa.tokenize(sentence)[0].toLowerCase());
  }

  static isStopWords(w) { 
    return RiTa.STOP_WORDS.includes
      (w.toLowerCase());
  }

  static isRhyme() {
    return RiTa.lexicon().isRhyme(...arguments);
  }

  static isVerb(word) {
    return RiTa.tagger.isVerb(word);
  }

  static kwic() {
    return RiTa.concorder.kwic(...arguments);
  }

  static pastParticiple() {
    return RiTa.conjugator.pastParticiple(...arguments);
  }

  static phones() {
    return RiTa._analyzer().analyze(...arguments).phones;
  }

  static pos() { // DOC:
    return RiTa.tagger.tag(...arguments);
  }

  static posInline(words, opts = {}) { // java only?
    opts.inline = true;
    return RiTa.tagger.tag(words, opts);
  }

  static pluralize(word) {
    return RiTa.inflector.pluralize(...arguments);
  }

  static presentParticiple() {
    return RiTa.conjugator.presentParticiple(...arguments);
  }

  static random() {
    return RiTa.randomizer.random(...arguments);
  }

  static randInt() {
    return Math.floor(RiTa.random(...arguments));
  }

  static randomOrdering() {
    return RiTa.randomizer.randomOrdering(...arguments);
  }

  static randomSeed() {
    return RiTa.randomizer.seed(...arguments);
  }

  static randomWord() {
    return RiTa.lexicon().randomWord(...arguments);
  }

  static randomItem() {
    return RiTa.randomizer.randomItem(...arguments);
  }

  static rhymes() { // DOC:
    return RiTa.lexicon().rhymes(...arguments);
  }

  static search() {
    return RiTa.lexicon().search(...arguments);
  }

  static sentences() {
    return RiTa.tokenizer.sentences(...arguments);
  }

  static spellsLike() { // DOC:
    return RiTa.lexicon().spellsLike(...arguments);
  }

  static singularize() {
    return RiTa.inflector.singularize(...arguments);
  }

  static soundsLike() { // DOC:
    return RiTa.lexicon().soundsLike(...arguments);
  }

  static stem() {
    return RiTa.stemmer.stem(...arguments);
  }

  static stresses() {
    return RiTa._analyzer().analyze(...arguments).stresses;
  }

  static syllables() {
    return RiTa._analyzer().analyze(...arguments).syllables;
  }

  static tokenize() {
    return RiTa.tokenizer.tokenize(...arguments);
  }

  static untokenize() {
    return RiTa.tokenizer.untokenize(...arguments);
  }

  /////////////////////////////////////////////////////////////////

  static lexicon() { // lazy load
    if (typeof RiTa._lexicon === 'undefined') {
      const LetterToSound = require('./rita_lts');
      RiTa.lts = new LetterToSound(RiTa);
      /*if (typeof __NOLTS__ !== 'undefined') { // used by webpack, don't shorten
        const LetterToSound = require('./rita_lts');
        RiTa.lts = new LetterToSound(RiTa);
      }*/
      if (typeof __NOLEX__ !== 'undefined') { // used by webpack, don't shorten
        RiTa._lexicon = new Lexicon(RiTa);
      }
      else {
        RiTa._lexicon = new Lexicon(RiTa, require('./rita_dict'));
      }
    }
    return RiTa._lexicon;
  }

  static _analyzer() { // lazy load
    if (typeof RiTa.analyzer === 'undefined') {
      RiTa.lexicon();
      RiTa.analyzer = new Analyzer(RiTa);
    }
    return RiTa.analyzer;
  }
}

// CLASSES
RiTa.RiScript = RiScript;
RiTa.Grammar = Grammar;
RiTa.Markov = Markov;
RiTa.Operator = Operator;
RiTa.Markov.parent = RiTa;
RiTa.Grammar.parent = RiTa;
RiTa.RiScript.parent = RiTa;

// COMPONENTS
RiTa.stemmer = new Stemmer(RiTa);
RiTa.tagger = new PosTagger(RiTa);
RiTa.concorder = new Concorder(RiTa);
RiTa.tokenizer = new Tokenizer(RiTa);
RiTa.inflector = new Inflector(RiTa);
RiTa.conjugator = new Conjugator(RiTa);
RiTa.randomizer = new SeededRandom(RiTa);

// LAZY-LOADS
RiTa.analyzer = undefined;
RiTa._lexicon = undefined;
RiTa.dict = undefined;
RiTa.lts = undefined;

// MESSAGES
RiTa.SILENT = false;
RiTa.SILENCE_LTS = false;
RiTa.DOWNLOAD_URL = 'https://rednoise.org/rita/downloads';

// CONSTANTS
RiTa.VERSION = typeof __VERSION__ !== 'undefined' ? __VERSION__ : 'DEV';
RiTa.NODE = 'node';
RiTa.BROWSER = 'browser';
RiTa.FIRST_PERSON = 1;
RiTa.SECOND_PERSON = 2;
RiTa.THIRD_PERSON = 3;
RiTa.PAST_TENSE = 4;
RiTa.PRESENT_TENSE = 5;
RiTa.FUTURE_TENSE = 6;
RiTa.SINGULAR = 7;
RiTa.PLURAL = 8;
RiTa.NORMAL = 9;
RiTa.STRESSED = '1';
RiTa.UNSTRESSED = '0';
RiTa.PHONEME_BOUNDARY = '-';
RiTa.WORD_BOUNDARY = " ";
RiTa.SYLLABLE_BOUNDARY = "/";
RiTa.SENTENCE_BOUNDARY = "|";
RiTa.VOWELS = "aeiou";
RiTa.ABBREVIATIONS = ["Adm.", "Capt.", "Cmdr.", "Col.", "Dr.", "Gen.", "Gov.", "Lt.", "Maj.", "Messrs.", "Mr.", "Mrs.", "Ms.", "Prof.", "Rep.", "Reps.", "Rev.", "Sen.", "Sens.", "Sgt.", "Sr.", "St.", "A.k.a.", "C.f.", "I.e.", "E.g.", "Vs.", "V.", "Jan.", "Feb.", "Mar.", "Apr.", "Mar.", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
RiTa.QUESTIONS = ["was", "what", "when", "where", "which", "why", "who", "will", "would", "who", "how", "if", "is", "could", "might", "does", "are", "have"];
RiTa.STOP_WORDS = [ ".", ",", "the",
  "and", "a", "of", "\"", "in", "i", ":", "you", "is", "to",
  "that", ")", "(", "it", "for", "on", "!", "have", "with", "?",
  "this", "be", "...", "not", "are", "as", "was", "but", "or", "from",
  "my", "at", "if", "they", "your", "all", "he", "by", "one",
  "me", "what", "so", "can", "will", "do", "an", "about", "we", "just",
  "would", "there", "no", "like", "out", "his", "has", "up", "more", "who",
  "when", "don't", "some", "had", "them", "any", "their", "it's", "only",
  ";", "which", "i'm", "been", "other", "were", "how", "then", "now",
  "her", "than", "she", "well", "also", "us", "very", "because",
  "am", "here", "could", "even", "him", "into", "our", "much",
  "too", "did", "should", "over", "want", "these", "may", "where", "most",
  "many", "those", "does", "why", "please", "off", "going", "its", "i've",
  "down", "that's", "can't", "you're", "didn't", "another", "around",
  "must",  "few", "doesn't", "every", "yes", "each", "maybe",
  "i'll", "away", "doing", "oh", "else", "isn't", "he's", "there's", "hi",
  "won't", "ok", "they're", "yeah", "mine", "we're", "what's", "shall",
  "she's", "hello", "okay", "here's", "-", "less"
];
RiTa.INFINITIVE = 1;
RiTa.GERUND = 2;
RiTa.IMPERATIVE = 3;
RiTa.BARE_INFINITIVE = 4;
RiTa.SUBJUNCTIVE = 5;

RiTa.FEATURES = ['TOKENS', 'STRESSES', 'PHONES', 'SYLLABLES', 'POS', 'TEXT'];

// For tokenization, Can't -> Can not, etc.
RiTa.SPLIT_CONTRACTIONS = false;

// Set to false to reduce memory (likely slower)
RiTa.CACHING = true;

//RiScript.RiTa = RiTa;

module && (module.exports = RiTa);
