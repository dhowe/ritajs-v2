const Util = require("./utils");
const Parser = require('./parser');
const Markov = require('./markov');
const Stemmer = require('./stemmer');
const Lexicon = require('./lexicon');
const PosTagger = require('./tagger');
const Concorder = require('./concorder');
const LetterToSound = require("./rita_lts");
const Syllabifier = require('./syllabifier');

const randgen = require('./random');

class RiTa {

  constructor() {
    throw Error('Invalid instantiation');
  }

  static analyze() {
    let analyzer = _analyzer();
    return analyzer.analyze.apply(analyzer, arguments);
  }

  static alliterations() {
    let lex = _lexicon();
    return lex.alliterations.apply(lex, arguments);
  }

  static concordance() {
    let concorder = _concorder();
    return concorder.concordance.apply(concorder, arguments);
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
    let concorder = _concorder();
    return concorder.kwic.apply(concorder, arguments);
  }

  static pastParticiple(verb) {
    return "";
  }

  static phonemes(str) {
    return "";
  }

  static posTags(words, opts) {
    _stemmer(); // TMP: make sure we have a stemmer
    _lts(); // TMP: make sure we have lts engine
    if (opts) {
      words = typeof words === 'string' ? Tokenizer.tokenize(words) : words;
      if (opts.wordNetTags) return _tagger().tagForWordNet(words);
      if (opts.inline) return _tagger().tagForWordNet(words);
    }
    return _tagger().tag(words);
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
    return Syllabifier.syllabify(str);
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
    return _stemmer().stem(word);
  }

  static tokenize(str) {
    return Tokenizer.tokenize(str);
  }

  static untokenize(arr) {
    return Tokenizer.untokenize(arr);
  }

  static words() {
    return _lexicon().words();
  }
}

class Analyzer {

  constructor() {
    this.cache = {};
  }

  analyze(text) {

    let E = '', SP = ' ';
    let stressyls, phones, lts, ltsPhones, useRaw;
    let phonemes = E,
      syllables = E,
      stresses = E,
      slash = '/',
      delim = '-',
      features = {},
      lex = _lexicon();

    let words = Tokenizer.tokenize(text);
    let tags = RiTa.posTags(text);

    features.tokens = words.join(SP);
    features.pos = tags.join(SP);

    for (let i = 0, l = words.length; i < l; i++) {

      useRaw = false;
      phones = lex._getRawPhones(words[i]);

      if (!phones) {

        lts = lex._letterToSound();
        ltsPhones = lts && lts.getPhones(words[i]);
        if (ltsPhones && ltsPhones.length > 0) {

          if (words[i].match(/[a-zA-Z]+/))
            log("[RiTa] Used LTS-rules for '" + words[i] + "'");

          phones = RiString._syllabify(ltsPhones);

        } else {

          phones = words[i];
          useRaw = true;
        }
      }

      phonemes += phones.replace(/[0-2]/g, E).replace(/ /g, delim) + SP;
      syllables += phones.replace(/ /g, slash).replace(/1/g, E) + SP;

      if (!useRaw) {
        stressyls = phones.split(SP);
        for (let j = 0; j < stressyls.length; j++) {

          if (!stressyls[j].length) continue;

          stresses += (stressyls[j].indexOf(RiTa.STRESSED) > -1) ?
            RiTa.STRESSED : RiTa.UNSTRESSED;

          if (j < stressyls.length - 1) stresses += slash;
        }
      } else {

        stresses += words[i];
      }

      if (!endsWith(stresses, SP)) stresses += SP;
    }

    stresses = stresses.trim();
    phonemes = phonemes.trim().replace(/\\s+/, SP);
    syllables = syllables.trim().replace(/\\s+/, SP);

    features.stresses = stresses;
    features.phonemes = phonemes;
    features.syllables = syllables;

    return this;
  }
}

class Tokenizer {
  static tokenize(words, regex) {

    if (typeof words !== 'string') return [];

    if (regex) return words.split(regex);

    words = Util.trim(words); // ???
    words = words.replace(/([Ee])[.]([Gg])[.]/g, "_$1$2_"); // E.©G.
    words = words.replace(/([Ii])[.]([Ee])[.]/g, "_$1$2_"); // I.E.

    words = words.replace(/([\\?!\"\u201C\\.,;:@#$%&])/g, " $1 ");
    words = words.replace(/\\.\\.\\./g, " ... ");
    words = words.replace(/\\s+/g, ' ');
    words = words.replace(/,([^0-9])/g, " , $1");
    words = words.replace(/([^.])([.])([\])}>\"'’]*)\\s*$/g, "$1 $2$3 ");
    words = words.replace(/([\[\](){}<>])/g, " $1 ");
    words = words.replace(/--/g, " -- ");
    words = words.replace(/$/g, ' ');
    words = words.replace(/^/g, ' ');
    words = words.replace(/([^'])' | '/g, "$1 ' ");
    words = words.replace(/ \u2018/g, " \u2018 ");
    words = words.replace(/'([SMD]) /g, " '$1 ");

    if (RiTa.SPLIT_CONTRACTIONS) {

      words = words.replace(/([Cc])an['’]t/g, "$1an not");
      words = words.replace(/([Dd])idn['’]t/g, "$1id not");
      words = words.replace(/([CcWw])ouldn['’]t/g, "$1ould not");
      words = words.replace(/([Ss])houldn['’]t/g, "$1hould not");
      words = words.replace(/ ([Ii])t['’]s/g, " $1t is");
      words = words.replace(/n['’]t /g, " not ");
      words = words.replace(/['’]ve /g, " have ");
      words = words.replace(/['’]re /g, " are ");
    }

    // "Nicole I. Kidman" gets tokenized as "Nicole I . Kidman"
    words = words.replace(/ ([A-Z]) \\./g, " $1. ");
    words = words.replace(/\\s+/g, ' ');
    words = words.replace(/^\\s+/g, '');

    words = words.replace(/_([Ee])([Gg])_/g, "$1.$2."); // E.G.
    words = words.replace(/_([Ii])([Ee])_/g, "$1.$2."); // I.E.

    return Util.trim(words).split(/\s+/);
  }

  static untokenize(arr, delim) { // TODO: should be state machine

    delim = delim || ' ';

    let thisPunct, lastPunct, thisQuote, lastQuote, thisComma, isLast,
      lastComma, lastEndWithS, punct = /^[,\.\;\:\?\!\)""“”\u2019‘`']+$/,
      dbug = 0,
      quotes = /^[\(""“”\u2019‘`']+$/,
      squotes = /^[\u2019‘`']+$/,
      apostrophes = /^[\u2019']+$/,
      afterQuote = false,
      withinQuote = arr.length && quotes.test(arr[0]),
      result = arr[0] || '',
      midSentence = false;

    for (let i = 1; i < arr.length; i++) {

      if (!arr[i]) continue;

      thisComma = arr[i] === ',';
      thisPunct = punct.test(arr[i]);
      thisQuote = quotes.test(arr[i]);
      lastComma = arr[i - 1] === ',';
      lastPunct = punct.test(arr[i - 1]);
      lastQuote = quotes.test(arr[i - 1]);
      lastEndWithS = arr[i - 1].charAt(arr[i - 1].length - 1) === 's';
      isLast = (i == arr.length - 1);

      if (thisQuote) {

        if (withinQuote) {

          // no-delim, mark quotation done
          afterQuote = true;
          withinQuote = false;
        } else if (!(apostrophes.test(arr[i]) && lastEndWithS)) {
          withinQuote = true;
          afterQuote = false;
          result += delim;
        }

      } else if (afterQuote && !thisPunct) {

        result += delim;
        afterQuote = false;

      } else if (lastQuote && thisComma) {

        midSentence = true;

      } else if (midSentence && lastComma) {

        result += delim;
        midSentence = false;

      } else if ((!thisPunct && !lastQuote) || (!isLast && thisPunct && lastPunct)) {

        result += delim;
      }

      result += arr[i]; // add to result

      if (thisPunct && !lastPunct && !withinQuote && squotes.test(arr[i])) {

        result += delim; // fix to #477
      }
    }

    return Util.trim(result);
  }
}

// CONSTANTS
RiTa.VERSION = 2;
RiTa.NODE = 'node';
RiTa.BROWSER = 'browser';
RiTa.SILENT = false;

// Warn on words not found  in lexicon
RiTa.LEX_WARN = false;

// For tokenization, Can't -> Can not, etc.
RiTa.SPLIT_CONTRACTIONS = false;

// LAZY-LOADS
RiTa.tagger = undefined;
RiTa.randSource = undefined;
RiTa.concorder = undefined;
RiTa.parser = undefined;
RiTa.dict = undefined;

// CLASSES
RiTa.RiMarkov = Markov;

// HELPERS

function _concorder() {
  if (typeof RiTa.concorder === 'undefined') {
    RiTa.concorder = new Concorder(RiTa);
  }
  return RiTa.concorder;
}

function _tagger() {
  if (typeof RiTa.tagger === 'undefined') {
    RiTa.tagger = new PosTagger(RiTa);
  }
  return RiTa.tagger;
}

function _lexicon() {
  if (typeof RiTa.lexicon === 'undefined') {
    RiTa.lexicon = new Lexicon(RiTa, require('./rita_dict'));
  }
  return RiTa.lexicon;
}

function _lts() {
  if (typeof RiTa.lts === 'undefined') {
    RiTa.lts = new LetterToSound();
  }
  return RiTa.lexicon;
}


function _parser() {
  if (typeof RiTa.parser === 'undefined') {
    RiTa.parser = new Parser();
  }
  return RiTa.parser;
}

function _analyzer() {
  if (typeof RiTa.analyzer === 'undefined') {
    RiTa.analyzer = new Analyzer();
  }
  return RiTa.analyzer;
}

function _stemmer() {
  if (typeof RiTa.stemmer === 'undefined') {
    RiTa.stemmer = new Stemmer();
  }
  return RiTa.stemmer;
}

module && (module.exports = RiTa);
