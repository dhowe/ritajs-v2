const Util = require("./util");

let RiTa;

class Tokenizer {

  constructor(parent) {
    RiTa = parent;
    this.splitter = /(\S.+?[.!?]["”\u201D]?)(?=\s+|$)/g;
  }

  sentences(text, regex) {
    if (!text || !text.length) return [text];

    let clean = text.replace(/(\r?\n)+/g, ' ')

    let delim = '___';
    let re = new RegExp(delim, 'g');
    let pattern = regex || this.splitter;

    let unescapeAbbrevs = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].replace(re, ".");
      }
      return arr;
    }

    let escapeAbbrevs = (text) => {
      let abbrevs = RiTa.ABBREVIATIONS;
      for (let i = 0; i < abbrevs.length; i++) {
        let abv = abbrevs[i];
        let idx = text.indexOf(abv);
        while (idx > -1) {
          text = text.replace(abv, abv.replace('.', delim));
          idx = text.indexOf(abv);
        }
      }
      return text;
    }

    let arr = escapeAbbrevs(clean).match(pattern);
    return arr && arr.length ? unescapeAbbrevs(arr) : [text];
  }

  tokenize(words, regex) {

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

  untokenize(arr, delim) { // TODO: should be state machine

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

module && (module.exports = Tokenizer);
