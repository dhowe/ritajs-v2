const Util = require("./util");

class Tokenizer {

  constructor(parent) {
    this.RiTa = parent;
    this.splitter = /(\S.+?[.!?]["”\u201D]?)(?=\s+|$)/g;
  }

  sentences(text, regex) {
    if (!text || !text.length) return [text];

    let clean = text.replace(LB_RE, ' ')

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
      let abbrevs = this.RiTa.ABBREVIATIONS;
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

    words = words.trim(); // ???
    for (let i = 0; i < TOKENIZE_REGEXS_A.length; i += 2){
      words = words.replace(TOKENIZE_REGEXS_A[i], TOKENIZE_REGEXS_A[i+1]);
    }
    // words = words.replace(/([Ee])[.]([Gg])[.]/g, "_$1$2_"); // E.G.
    // words = words.replace(/([Ii])[.]([Ee])[.]/g, "_$1$2_"); // I.E.
    //
    // words = words.replace(/([\\?!\"\u201C\\.,;:@#$%&])/g, " $1 ");
    // words = words.replace(/\\.\\.\\./g, " ... ");
    // words = words.replace(/\\s+/g, ' ');
    // words = words.replace(/,([^0-9])/g, " , $1");
    // words = words.replace(/([^.])([.])([\])}>\"'’]*)\\s*$/g, "$1 $2$3 ");
    // words = words.replace(/([\[\](){}<>])/g, " $1 ");
    // words = words.replace(/--/g, " -- ");
    // words = words.replace(/$/g, ' ');
    // words = words.replace(/^/g, ' ');
    // words = words.replace(/([^'])' | '/g, "$1 ' ");
    // words = words.replace(/ \u2018/g, " \u2018 ");
    // words = words.replace(/'([SMD]) /g, " '$1 ");

    if (this.RiTa.SPLIT_CONTRACTIONS) {
      for (let i = 0; i < TOKENIZE_REGEXS_B.length; i += 2){
        words = words.replace(TOKENIZE_REGEXS_B[i], TOKENIZE_REGEXS_B[i+1]);
      }

      // words = words.replace(/([Cc])an['’]t/g, "$1an not");
      // words = words.replace(/([Dd])idn['’]t/g, "$1id not");
      // words = words.replace(/([CcWw])ouldn['’]t/g, "$1ould not");
      // words = words.replace(/([Ss])houldn['’]t/g, "$1hould not");
      // words = words.replace(/ ([Ii])t['’]s/g, " $1t is");
      // words = words.replace(/n['’]t /g, " not ");
      // words = words.replace(/['’]ve /g, " have ");
      // words = words.replace(/['’]re /g, " are ");
    }

    // "Nicole I. Kidman" gets tokenized as "Nicole I . Kidman"
    // words = words.replace(/ ([A-Z]) \\./g, " $1. ");
    // words = words.replace(/\\s+/g, ' ');
    // words = words.replace(/^\\s+/g, '');
    //
    // words = words.replace(/_([Ee])([Gg])_/g, "$1.$2."); // E.G.
    // words = words.replace(/_([Ii])([Ee])_/g, "$1.$2."); // I.E.

    return words.trim().split(/\s+/);
  }

  untokenize(arr, delim) { // TODO: should be state machine

    delim = delim || ' ';

    let thisNBPunct, thisNAPunct, lastNBPunct, lastNAPunct, thisQuote, lastQuote, thisComma, isLast,
      lastComma, lastEndWithS, nextIsS, thisLBracket, thisRBracket, lastLBracket, lastRBracket, lastIsWWW, thisDomin, dbug = 0,
      nextNoSpace = false,
      afterQuote = false,
      withinQuote = arr.length && QUOTE_RE.test(arr[0]),
      result = arr[0] || '',
      midSentence = false;

    for (let i = 1; i < arr.length; i++) {

      if (!arr[i]) continue;

      thisComma = arr[i] === ',';
      thisNBPunct = NO_SPACE_BEFORE_PUNCT_RE.test(arr[i]);//NB -> no space before the punctuation
      thisNAPunct = NO_SPACE_AFTER_PUNCT_RE.test(arr[i]);//NA -> no space after the punctuation
      thisQuote = QUOTE_RE.test(arr[i]);
      thisLBracket = LEFT_BRACKETS_RE.test(arr[i]);//LBracket -> left bracket
      thisRBracket = RIGHT_BRACKETS_RE.test(arr[i]);//RBracket -> right bracket
      lastComma = arr[i - 1] === ',';
      lastNBPunct = NO_SPACE_BEFORE_PUNCT_RE.test(arr[i - 1]);//NB -> no space before
      lastNAPunct = NO_SPACE_AFTER_PUNCT_RE.test(arr[i - 1]);//NA -> no space after
      lastQuote = QUOTE_RE.test(arr[i - 1]);
      lastLBracket = LEFT_BRACKETS_RE.test(arr[i - 1]);
      lastRBracket = RIGHT_BRACKETS_RE.test(arr[i - 1]);
      lastEndWithS = (arr[i - 1].charAt(arr[i - 1].length - 1) === 's' && arr[i - 1]!= "is" && arr[i - 1] != "Is" && arr[i - 1] != "IS");
      lastIsWWW = WWW_RE.test(arr[i - 1]);
      thisDomin = DOMIN_RE.test(arr[i]);
      nextIsS = i == arr.length - 1 ? false : (arr[i + 1] === "s" || arr[i + 1] === "S");
      isLast = (i == arr.length - 1);

      if ((arr[i - 1] === "." && thisDomin) || nextNoSpace){
        nextNoSpace = false;
        result += arr[i];
        continue;
      } else if (arr[i] === "." && lastIsWWW){
        console.log('yes');
        nextNoSpace = true;
      } else if (thisLBracket) {
        result += delim;
      } else if (lastRBracket){
        if (!thisNBPunct && !thisLBracket){
          result += delim;
        }
      } else if (thisQuote) {

        if (withinQuote) {

          // no-delim, mark quotation done
          afterQuote = true;
          withinQuote = false;
        } else if (!((APOS_RE.test(arr[i]) && lastEndWithS) || (APOS_RE.test(arr[i]) && nextIsS))) {
          withinQuote = true;
          afterQuote = false;
          result += delim;
        }

      } else if (afterQuote && !thisNBPunct) {

        result += delim;
        afterQuote = false;

      } else if (lastQuote && thisComma) {

        midSentence = true;

      } else if (midSentence && lastComma) {

        result += delim;
        midSentence = false;

      } else if ((!thisNBPunct && !lastQuote && !lastNAPunct && !lastLBracket && !thisRBracket) || (!isLast && thisNBPunct && lastNBPunct && !lastNAPunct && !lastQuote && !lastLBracket && !thisRBracket)) {

        result += delim;
      }

      result += arr[i]; // add to result

      if (thisNBPunct && !lastNBPunct && !withinQuote && SQUOTE_RE.test(arr[i]) && lastEndWithS) {

        result += delim; // ??
      }
    }

    return result.trim();
  }
}

const NO_SPACE_BEFORE_PUNCT_RE = /^[,\.\;\:\?\!\)""“”\u2019‘`'%…\u2103\^\*°\/⁄\-@]+$/;
const QUOTE_RE = /^[""“”\u2019‘`''«»‘’]+$/;
const LEFT_BRACKETS_RE = /^[\[\(\{⟨]+$/;
const RIGHT_BRACKETS_RE = /^[\)\]\}⟩]+$/;
const NO_SPACE_AFTER_PUNCT_RE = /^[\^\*\$\/⁄#\-@°]+$/;
const SQUOTE_RE = /^[\u2019‘`']+$/;
const APOS_RE = /^[\u2019'’]+$/;
const LB_RE = /(\r?\n)+/g;
const WWW_RE = /^(www[0-9]?|WWW[0-9]?)$/;
const DOMIN_RE = /^(com|org|edu|net|xyz|gov|int|eu|hk|tw|cn|de|ch|fr)$/;
const TOKENIZE_REGEXS_A = [
  /([Ee])[.]([Gg])[.]/g, "_$1$2_",//E.g
  /([Ii])[.]([Ee])[.]/g, "_$1$2_",//i.e
  /([\\?!\"\u201C\\.,;:@#$%&])/g, " $1 ",
  /\\.\\.\\./g, " ... ",
  /\\s+/g, ' ',
  /,([^0-9])/g, " , $1",
  /([^.])([.])([\])}>\"'’]*)\\s*$/g, "$1 $2$3 ",
  /([\[\](){}<>])/g, " $1 ",
  /--/g, " -- ",
  /$/g, ' ',
  /^/g, ' ',
  /([^'])' | '/g, "$1 ' ",
  / \u2018/g, " \u2018 ",
  /'([SMD]) /g, " '$1 ",
  / ([A-Z]) \\./g, " $1. ",
  /\\s+/g, ' ',
  /^\\s+/g, '',
  /_([Ee])([Gg])_/g, "$1.$2.",//Eg
  /_([Ii])([Ee])_/g, "$1.$2.",//ie
  /\^/g, " ^ ",
  /°/g," ° "
];
const TOKENIZE_REGEXS_B = [
  /([Cc])an['’]t/g, "$1an not",
  /([Dd])idn['’]t/g, "$1id not",
  /([CcWw])ouldn['’]t/g, "$1ould not",
  /([Ss])houldn['’]t/g, "$1hould not",
  / ([Ii])t['’]s/g, " $1t is",
  /n['’]t /g, " not ",
  /['’]ve /g, " have ",
  /['’]re /g, " are ",
];

module && (module.exports = Tokenizer);
