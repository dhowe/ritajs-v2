import Util from './util';

class Tokenizer {

  constructor(parent) {
    this.RiTa = parent;
    this.splitter = /(\S.+?[.!?]["\u201D]?)(?=\s+|$)/g;
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
      let abbrevs = this.RiTa.ABRV;
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

    //handle html tags ---- save tags
    let htmlTags = [];
    let indexOfTags = 0;
    for (let i = 0; i < HTML_TAGS_RE.length; i++) {
      while (HTML_TAGS_RE[i].test(words)) {
        htmlTags.push(words.match(HTML_TAGS_RE[i])[0]);
        words = words.replace(HTML_TAGS_RE[i], " _HTMLTAG" + indexOfTags + "_ ");
        indexOfTags++;
      }
    }

    for (let i = 0; i < TOKENIZE_RE.length; i += 2) {
      words = words.replace(TOKENIZE_RE[i], TOKENIZE_RE[i + 1]);
    }

    if (this.RiTa.SPLIT_CONTRACTIONS) {
      for (let i = 0; i < CONTRACTIONS_RE.length; i += 2) {
        words = words.replace(CONTRACTIONS_RE[i], CONTRACTIONS_RE[i + 1]);
      }
    }

    let result = words.trim().split(/\s+/);
    for (let i = 0; i < result.length; i++) {
      if (POP_HTMLTAG_RE.test(result[i])) {
        result[i] = htmlTags.shift();
      }

      if (result[i].includes('_')) {
        result[i] = result[i].replace(/([a-zA-z]|[\.\,])_([a-zA-Z])/g, "$1 $2");
      }
    } 

    return result;
  }

  untokenize(arr, delim) { // so ugly (but works)

    delim = delim || ' ';

    let nextNoSpace = false, afterQuote = false, midSentence = false;
    let withinQuote = arr.length && QUOTE_RE.test(arr[0]);
    let result = arr[0] || '';

    for (let i = 1; i < arr.length; i++) {

      if (!arr[i]) continue;

      let thisComma = arr[i] === ',',  lastComma = arr[i - 1] === ',';
      let thisNBPunct = NO_SPACE_BF_PUNCT_RE.test(arr[i]); // NB -> no space before the punctuation
      let thisLBracket = LEFT_BRACKETS_RE.test(arr[i]); // LBracket -> left bracket
      let thisRBracket = RIGHT_BRACKETS_RE.test(arr[i]); // RBracket -> right bracket
      let lastNBPunct = NO_SPACE_BF_PUNCT_RE.test(arr[i - 1]); // NB -> no space before
      let lastNAPunct = NO_SPACE_AFTER_PUNCT_RE.test(arr[i - 1]); // NA -> no space after
      let lastLB = LEFT_BRACKETS_RE.test(arr[i - 1]), lastRB = RIGHT_BRACKETS_RE.test(arr[i - 1]);
      let lastEndWithS = (arr[i - 1][arr[i - 1].length - 1] === 's'
        && arr[i - 1] != "is" && arr[i - 1] != "Is" && arr[i - 1] != "IS");
      let lastIsWWW = WWW_RE.test(arr[i - 1]), isDomain = DOMAIN_RE.test(arr[i]);
      let nextIsS = i == arr.length - 1 ? false : (arr[i + 1] === "s" || arr[i + 1] === "S");
      let lastQuote = QUOTE_RE.test(arr[i - 1]), isLast = (i == arr.length - 1);
      let thisQuote = QUOTE_RE.test(arr[i]);

      if ((arr[i - 1] === "." && isDomain) || nextNoSpace) {

        nextNoSpace = false;
        result += arr[i];
        continue;

      } else if (arr[i] === "." && lastIsWWW) {

        nextNoSpace = true;

      } else if (thisLBracket) {

        result += delim;

      } else if (lastRB) {

        if (!thisNBPunct && !thisLBracket) {
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

      } else if ((!thisNBPunct && !lastQuote && !lastNAPunct && !lastLB && !thisRBracket)
        || (!isLast && thisNBPunct && lastNBPunct && !lastNAPunct
          && !lastQuote && !lastLB && !thisRBracket)) {

        result += delim;
      }

      result += arr[i]; // add to result
      if (thisNBPunct && !lastNBPunct && !withinQuote && SQUOTE_RE.test(arr[i]) && lastEndWithS) {
        result += delim; // ??
      }
    }

    //html tags
    for (let i = 0; i < UNTOKENIZE_HTMLTAG_RE.length; i++) {
      switch (i) {
        default:
          break;
        case 0:
          result = result.replace(UNTOKENIZE_HTMLTAG_RE[0], function(match, p1){ return "<" + p1.trim() + "/>" });
          break;
        case 1:
          result = result.replace(UNTOKENIZE_HTMLTAG_RE[1], function (match, p1) { return "<" + p1.trim() + ">" });
          break;
        case 2:
          result = result.replace(UNTOKENIZE_HTMLTAG_RE[2], function(match, p1){ return "</" + p1.trim() + ">" });
          break;
        case 3:
          result = result.replace(UNTOKENIZE_HTMLTAG_RE[3], function (match, p1, p2) { return "<" + p1.replace(/ +/, "") + " " + p2.trim() + ">" });
          break;
        case 4:
          result = result.replace(UNTOKENIZE_HTMLTAG_RE[4], function (match, p1) { return "<!--" + p1.trim() + "-->" });
          break;
      }
    }

    return result.trim();
  }
}

const LEFT_BRACKETS_RE = /^[\[\(\{\u27e8]+$/;
const RIGHT_BRACKETS_RE = /^[\)\]\}\u27e9]+$/;
const QUOTE_RE = /^[""\u201c\u201d\u2019\u2018`''\u00ab\u00bb]+$/;
const SQUOTE_RE = /^[\u2019\u2018`']+$/;
const APOS_RE = /^[\u2019']+$/;
const LB_RE = /(\r?\n)+/g;
const WWW_RE = /^(www[0-9]?|WWW[0-9]?)$/;
const NO_SPACE_AFTER_PUNCT_RE = /^[\^\*\$\/\u2044#\-@\u00b0]+$/;
const DOMAIN_RE = /^(com|org|edu|net|xyz|gov|int|eu|hk|tw|cn|de|ch|fr)$/;
const NO_SPACE_BF_PUNCT_RE = /^[,\.\;\:\?\!\)""\u201c\u201d\u2019\u2018`'%\u2026\u2103\^\*\u00b0\/\u2044\-@]+$/;

const TOKENIZE_RE = [

  // save  --------
  /([Ee])[.]([Gg])[.]/g, "_$1$2_",//E.g
  /([Ii])[.]([Ee])[.]/g, "_$1$2_",//i.e
  /([Aa])[.]([Mm])[.]/g, "_$1$2_",//a.m.
  /([Pp])[.]([Mm])[.]/g, "_$1$2_",//p.m.
  /(Cap)[\.]/g, "_Cap_",//Cap.
  /([Cc])[\.]/g, "_$1_",//c.
  /([Ee][Tt])[\s]([Aa][Ll])[\.]/, "_$1zzz$2_",// et al.
  /(etc|ETC)[\.]/g, "_$1_",//etc.
  /([Pp])[\.]([Ss])[\.]/g, "_$1$2dot_", // p.s.
  /([Pp])[\.]([Ss])/g, "_$1$2_", // p.s
  /([Pp])([Hh])[\.]([Dd])/g, "_$1$2$3_", // Ph.D
  /([Rr])[\.]([Ii])[\.]([Pp])/g, "_$1$2$3_", // R.I.P
  /([Vv])([Ss]?)[\.]/g, "_$1$2_", // vs. and v.
  /([Mm])([Rr]|[Ss]|[Xx])[\.]/g, "_$1$2_", // Mr. Ms. and Mx.
  /([Dd])([Rr])[\.]/g, "_$1$2_", // Dr.
  /([Pp])([Ff])[\.]/g, "_$1$2_", // Pf.
  /([Ii])([Nn])([Dd]|[Cc])[\.]/g, "_$1$2$3_", // Ind. and Inc.
  /([Cc])([Oo])[\.][\,][\s]([Ll])([Tt])([Dd])[\.]/g, "_$1$2dcs$3$4$5_", // co., ltd.
  /([Cc])([Oo])[\.][\s]([Ll])([Tt])([Dd])[\.]/g, "_$1$2ds$3$4$5_", // co. ltd.
  /([Cc])([Oo])[\.][\,]([Ll])([Tt])([Dd])[\.]/g, "_$1$2dc$3$4$5_", // co.,ltd.
  /([Cc])([Oo])([Rr]?)([Pp]?)[\.]/g, "_$1$2$3$4_",// Corp. and Co.
  /([Ll])([Tt])([Dd])[\.]/g, "_$1$2$3_", // ltd.
  /(prof|Prof|PROF)[\.]/g, "_$1_", //Prof.

  //--------------------------
  /\.\.\.\s/g, "_elipsisDDD_ ",
  /([\?!\"\u201C\.,;:@#$%&])/g, " $1 ",
  /\u2026/g, " \u2026 ",
  /\s+/g, ' ',
  /,([^0-9])/g, " , $1",
  /([^.])([.])([\])}>\"'\u2019]*)\s*$/g, "$1 $2$3 ",
  /([\[\](){}<>\u27e8\u27e9])/g, " $1 ",
  /--/g, " -- ",
  /$/g, ' ',
  /^/g, ' ',
  /([^'])' | '/g, "$1 ' ",
  / \u2018/g, " \u2018 ",
  /'([SMD]) /g, " '$1 ",
  / ([A-Z]) \./g, " $1. ",
  /^\s+/g, '',
  /\^/g, " ^ ",
  /\u00b0/g, " \u00b0 ",
  /_elipsisDDD_/g, " ... ",

  //pop ------------------
  /_([Ee])([Gg])_/g, "$1.$2.",//Eg
  /_([Ii])([Ee])_/g, "$1.$2.",//ie
  /_([Aa])([Mm])_/g, "$1.$2.",//a.m.
  /_([Pp])([Mm])_/g, "$1.$2.",//p.m.
  /_Cap_/g, "Cap.",//Cap.
  /_([Cc])_/g, "$1.",//c.
  /_([Ee][Tt])zzz([Aa][Ll])_/, "$1_$2.",// et al.
  /_(etc|ETC)_/g, "$1.",//etc.
  /_([Pp])([Ss])dot_/g, "$1.$2.", // p.s.
  /_([Pp])([Ss])_/g, "$1.$2",
  /_([Pp])([Hh])([Dd])_/g, "$1$2.$3", // Ph.D
  /_([Rr])([Ii])([Pp])_/g, "$1.$2.$3", // R.I.P
  /_([Vv])([Ss]?)_/g, "$1$2.", // vs. and v.
  /_([Mm])([Rr]|[Ss]|[Xx])_/g, "$1$2.", // Mr. Ms. and Mx.
  /_([Dd])([Rr])_/g, "$1$2.", // Dr.
  /_([Pp])([Ff])_/g, "$1$2.", // Pf.
  /_([Ii])([Nn])([Dd]|[Cc])_/g, "$1$2$3.", // Ind. and Inc.
  /_([Cc])([Oo])([Rr]?)([Pp]?)_/g, "$1$2$3$4.",// Corp. and Co.
  /_([Cc])([Oo])dc([Ll])([Tt])([Dd])_/g, "$1$2.,$3$4$5.", // co.,ltd.
  /_([Ll])([Tt])([Dd])_/g, "$1$2$3.", // ltd.
  /_([Cc])([Oo])dcs([Ll])([Tt])([Dd])_/g, "$1$2.,_$3$4$5.", // co., ltd.
  /_([Cc])([Oo])ds([Ll])([Tt])([Dd])_/g, "$1$2._$3$4$5.", // co. ltd.
  /_(prof|PROF|Prof)_/g, "$1." //Prof.
];

const CONTRACTIONS_RE = [
  /([Cc])an['\u2019]t/g, "$1an not",
  /([Dd])idn['\u2019]t/g, "$1id not",
  /([CcWw])ouldn['\u2019]t/g, "$1ould not",
  /([Ss])houldn['\u2019]t/g, "$1hould not",
  /([Ii])t['\u2019]s/g, " $1t is",
  /n['\u2019]t /g, " not ",
  /['\u2019]ve /g, " have ",
  /['\u2019]re /g, " are "
];

const HTML_TAGS_RE = [
  /(<\/?[a-z0-9='"#;:&\s\-\+\/\.\?]+\/?>)/i, // html tags (rita#103)
  /(<!DOCTYPE[^>]*>|<!--[^>-]*-->)/i // doctype and comment
];

const POP_HTMLTAG_RE = /_HTMLTAG[0-9]+_/;
const UNTOKENIZE_HTMLTAG_RE = [
  / <([a-z0-9='"#;:&\s\-\+\/\.\?]+)\/> /gi, // empty tags <br/> <img /> etc.
  /<([a-z0-9='"#;:&\s\-\+\/\.\?]+)> /gi, // opening tags <a>, <p> etc.
  / <\/([a-z0-9='"#;:&\s\-\+\/\.\?]+)>/gi, // closing tags </a> </p> etc.
  /< *(! *DOCTYPE)([^>]*)>/gi, // <!DOCTYPE>
  /<! *--([^->]*)-->/gi // <!-- -->
];

export default Tokenizer;