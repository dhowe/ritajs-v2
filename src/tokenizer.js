import Util from './util';
import { encode } from 'he';

class Tokenizer {

  constructor(parent) {
    this.RiTa = parent;
    this.splitter = /(\S.+?[.!?]["\u201D]?)(?=\s+|$)/g;
  }

  tokens(text, opts = {}) {

    // opts: {includePunct, caseSensitive, sort, ignoreStopWords} ?
    let words = this.tokenize(text, opts), map = {};
    words.forEach(w => {
      if (!opts.caseSensitive) w = w.toLowerCase();
      if (opts.includePunct || ALPHA_RE.test(w)) map[w] = 1;
    });
    let tokens = Object.keys(map);
    if (opts.ignoreStopWords) tokens = tokens.filter(t => !this.RiTa.isStopWord(t));
    return opts.sort ? tokens.sort() : tokens;
  }

  sentences(text, regex) {
    if (!text || !text.length) return [text];

    let clean = text.replace(NL_RE, ' ')

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

  tokenize(input, opts = {}) {

    if (typeof input !== 'string') return [];

    if (opts.regex) return input.split(regex);

    let { tags, text } = this.pushTags(input.trim());

    for (let i = 0; i < TOKENIZE_RE.length; i += 2) {
      text = text.replace(TOKENIZE_RE[i], TOKENIZE_RE[i + 1]);
    }

    // https://github.com/dhowe/rita/issues/65
    // default behavior is to keep hyphen
    if (opts.splitHyphen) text = text
      .replace(/([a-zA-Z]+)-([a-zA-Z]+)/g, "$1 - $2");

    if (this.RiTa.SPLIT_CONTRACTIONS || opts.splitContractions) {
      for (let i = 0; i < CONTRACTS_RE.length; i += 2) {
        text = text.replace(CONTRACTS_RE[i], CONTRACTS_RE[i + 1]);
      }
    }

    return this.popTags(text.trim().split(WS_RE), tags);
  }

  untokenize(arr, delim) { // very ugly (but works somehow)

    if (!arr || !Array.isArray(arr)) return '';

    arr = this.preProcessTags(arr);
    delim = delim || ' ';

    let nextNoSpace = false, afterQuote = false, midSentence = false;
    let withinQuote = arr.length && QUOTE_RE.test(arr[0]);
    let result = arr[0] || '';

    for (let i = 1; i < arr.length; i++) {

      if (!arr[i]) continue;
      let thisToken = arr[i];
      let lastToken = arr[i - 1];
      let thisComma = thisToken === ',', lastComma = lastToken === ',';
      let thisNBPunct = NOSP_BF_PUNCT_RE.test(thisToken)
        || UNTAG_RE[2].test(thisToken) || LINEBREAK_RE.test(thisToken); // NB -> no space before the punctuation (add closing tag)
      let thisLBracket = LB_RE.test(thisToken); // LBracket -> left bracket
      let thisRBracket = RB_RE.test(thisToken); // RBracket -> right bracket
      let lastNBPunct = NOSP_BF_PUNCT_RE.test(lastToken)
        || LINEBREAK_RE.test(lastToken); // NB -> no space before
      let lastNAPunct = NOSP_AF_PUNCT_RE.test(lastToken)
        || UNTAG_RE[1].test(lastToken) || LINEBREAK_RE.test(lastToken); // NA -> no space after (add opening tag)
      let lastLB = LB_RE.test(lastToken), lastRB = RB_RE.test(lastToken);
      let lastEndWithS = (lastToken[lastToken.length - 1] === 's' &&
        lastToken != "is" && lastToken != "Is" && lastToken != "IS");
      let lastIsWWW = WWW_RE.test(lastToken), isDomain = DOMAIN_RE.test(thisToken);
      let nextIsS = i == arr.length - 1 ? false : (arr[i + 1] === "s"
        || arr[i + 1] === "S");
      let lastQuote = QUOTE_RE.test(lastToken), isLast = (i == arr.length - 1);
      let thisQuote = QUOTE_RE.test(thisToken);
      let thisLineBreak = LINEBREAK_RE.test(thisToken);

      if ((lastToken === "." && isDomain) || nextNoSpace) {
        nextNoSpace = false;
        result += thisToken;
        continue;

      } else if (thisToken === "." && lastIsWWW) {
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
        } else if (!((APOS_RE.test(thisToken) && lastEndWithS) ||
          (APOS_RE.test(thisToken) && nextIsS))) {
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

      } else if ((!thisNBPunct && !lastQuote && !lastNAPunct
        && !lastLB && !thisRBracket) ||
        (!isLast && thisNBPunct && lastNBPunct && !lastNAPunct &&
          !lastQuote && !lastLB && !thisRBracket) && !thisLineBreak) {
        result += delim;
      }

      result += thisToken; // add to result
      if (thisNBPunct && !lastNBPunct && !withinQuote
        && SQUOTE_RE.test(thisToken) && lastEndWithS) {
        result += delim;
      }
    }

    return result.trim();
  }

  pushTags(text) {
    let tags = [], tagIdx = 0;
    while (TAG_RE.test(text)) {
      tags.push(text.match(TAG_RE)[0]);
      text = text.replace(TAG_RE, " _" + TAG + (tagIdx++) + "_ ");
    }

    return { tags, text };
  }

  popTags(result, tags) {
    for (let i = 0; i < result.length; i++) {
      if (POPTAG_RE.test(result[i])) {
        result[i] = tags.shift();
      }
      if (result[i].includes('_') && !EMAIL_RE.test(result[i]) && !URL_RE.test(result[i])) {
        result[i] = result[i].replace(UNDER_RE, "$1 $2");
      }
    }
    return result;
  }

  preProcessTags(array) {
    let result = [], currentIdx = 0;
    while (currentIdx < array.length) {
      let currentToken = array[currentIdx];
      if (!LT_RE.test(currentToken)) {
        result.push(currentToken);
        currentIdx++;
        continue;
      } // if not '<'
      let subArray = [array[currentIdx]];
      let inspectIdx = currentIdx + 1;
      while (inspectIdx < array.length) {
        subArray.push(array[inspectIdx]);
        if (LT_RE.test(array[inspectIdx])) break;
        if (GT_RE.test(array[inspectIdx])) break;
        inspectIdx++;
      }
      if (LT_RE.test(subArray[subArray.length - 1])) {
        result = result.concat(subArray.slice(0, subArray.length - 1));
        currentIdx = inspectIdx;
        continue;
      }
      if (!GT_RE.test(subArray[subArray.length - 1])) {
        result = result.concat(subArray);
        currentIdx = inspectIdx + 1;
        continue;
      }
      if (!TAG_RE.test(subArray.join(''))) {
        result = result.concat(subArray);
        currentIdx = inspectIdx + 1;
        continue;
      }
      let tag = this.tagSubarrayToString(subArray);
      result.push(tag);
      currentIdx = inspectIdx + 1;
    }
    return result;
  }

  tagSubarrayToString(array) {
    if (!LT_RE.test(array[0]) || !GT_RE.test(array[array.length - 1])) {
      throw Error(array + 'is not a tag');
    }
    let start = array[0].trim();
    let end = array[array.length - 1].trim();

    let inspectIdx = 1;
    while (inspectIdx < array.length - 1 && TAGSTART_RE.test(array[inspectIdx])) {
      start += array[inspectIdx].trim();
      inspectIdx++;
    }

    let contentStartIdx = inspectIdx;
    inspectIdx = array.length - 2;
    while (inspectIdx > contentStartIdx && TAGEND_RE.test(array[inspectIdx])) {
      end = array[inspectIdx].trim() + end;
      inspectIdx--;
    }

    let contentEndIdx = inspectIdx;
    let result = start + this.untokenize
      (array.slice(contentStartIdx, contentEndIdx + 1)).trim() + end;

    return result;
  }
}

const UNTAG_RE = [
  /^ *<[a-z][a-z0-9='"#;:&\s\-\+\/\.\?]*\/> *$/i, // empty tags <br/> <img /> etc. -> like a normal word
  /^ *<([a-z][a-z0-9='"#;:&\s\-\+\/\.\?]*[a-z0-9='"#;:&\s\-\+\.\?]|[a-z])> *$/i, // opening tags <a>, <p> etc. -> no space after 
  /^ *<\/[a-z][a-z0-9='"#;:&\s\-\+\/\.\?]*> *$/i, // closing tags </a> </p> etc. -> no space before
  /^ *<!DOCTYPE[^>]*> *$/i, // <!DOCTYPE> -> like a normal word
  /^ *<!--[^->]*--> *$/i // <!-- --> -> like a normal word
];

const LT_RE = /^ *< *$/;
const GT_RE = /^ *> *$/;
const TAGSTART_RE = /^ *[!\-\/] *$/;
const TAGEND_RE = /^ *[\-\/] *$/
const NOSP_AF_PUNCT_RE = /^[\^\*\$\/\u2044#\-@\u00b0\u2012\u2013\u2014]+$/;
const TAG = "TAG", UNDER_RE = /([0-9a-zA-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]|[\.\,])_([0-9a-zA-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF])/g;
const LB_RE = /^[\[\(\{\u27e8]+$/, RB_RE = /^[\)\]\}\u27e9]+$/;
const QUOTE_RE = /^[""\u201c\u201d\u2019\u2018`''\u00ab\u00bb]+$/;
const DOMAIN_RE = /^(com|org|edu|net|xyz|gov|int|eu|hk|tw|cn|de|ch|fr)$/;
const SQUOTE_RE = /^[\u2019\u2018`']+$/, ALPHA_RE = /^[A-Za-z’']+$/, WS_RE = / +/;
const APOS_RE = /^[\u2019']+$/, NL_RE = /(\r?\n)+/g, WWW_RE = /^(www[0-9]?|WWW[0-9]?)$/;
const NOSP_BF_PUNCT_RE = /^[,\.\;\:\?\!\)""\u201c\u201d\u2019\u2018`'%\u2026\u2103\^\*\u00b0\/\u2044\u2012\u2013\u2014\-@]+$/;
const LINEBREAK_RE = /[\n\r\036]/; 
const URL_RE=/((http[s]?):(\/\/))?([-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b)([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/;
const EMAIL_RE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const TOKENIZE_RE = [
  // save  --------
  /([Ee])[.]([Gg])[.]/g, "_$1$2_", //E.g
  /([Ii])[.]([Ee])[.]/g, "_$1$2_", //i.e
  /([Aa])[.]([Mm])[.]/g, "_$1$2_", //a.m.
  /([Pp])[.]([Mm])[.]/g, "_$1$2_", //p.m.
  /(Cap)[\.]/g, "_Cap_", //Cap.
  /([Cc])[\.]/g, "_$1_", //c.
  /([Ee][Tt])[\s]([Aa][Ll])[\.]/, "_$1zzz$2_", // et al.
  /(etc|ETC)[\.]/g, "_$1_", //etc.
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
  /([Cc])([Oo])([Rr]?)([Pp]?)[\.]/g, "_$1$2$3$4_", // Corp. and Co.
  /([Ll])([Tt])([Dd])[\.]/g, "_$1$2$3_", // ltd.
  /(prof|Prof|PROF)[\.]/g, "_$1_", //Prof. 
  /(\w+([\.-_]?\w+)*)@(\w+([\.-_]?\w+)*)\.(\w{2,3})/g, "$1AT$3.$5", //email addresses
  /((http[s]?):(\/\/))([-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b)([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/g, "$2COLON$3$4$5", //urls with http(s)
  //decimal #
  /([\-]?[0-9]+)\.([0-9]+)/g, "$1DECIMALDOT$2_", //(-)27.3
  /([\-]?[0-9]+)\.([0-9]+)e([\-]?[0-9]+)/g, "_$1DECIMALDOT$2POWERE$3_", //(-)1.2e10
  /([0-9]{1,3}),([0-9]{3})/g, "$1_DECIMALCOMMA_$2", // large numbers like 19,700 or 200,000,000.13
  /([A-Za-z0-9])\.([A-Za-z0-9])/g,  "$1_DECIMALDOT_$2", //www.example.com

  //escape sequences of line breaks in ASCII
  /\r\n/g, " _CARRIAGERETURNLINEFEED_ ", // CR LF
  /\n\r/g, " _LINEFEEDCARRIAGERETURN_ ", // LF CR
  /\n/g, " _LINEFEED_ ", // LF
  /\r/g, " _CARRIAGERETURN_ ", // CR
  /\036/g, " _RECORDSEPARATOR_ ", // RS
  //--------------------------
  /\.\.\.\s/g, "_elipsisDDD_ ",
  /([\?!\"\u201C\.,;:@#$%&])/g, " $1 ",
  /\u2026/g, " \u2026 ",
  /\s+/g, ' ',
  /,([^0-9])/g, " , $1",
  /([^.])([.])([\])}>\"'\u2019]*)\s*$/g, "$1 $2$3 ",
  /([\[\](){}<>\u27e8\u27e9])/g, " $1 ",
  /--/g, " -- ",
  /\u2012/g, " \u2012 ", //" ‒ "
  /\u2013/g, " \u2013 ", // " — "
  /\u2014/g, " \u2014 ",//" – "
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
  /_([Ee])([Gg])_/g, "$1.$2.", //Eg
  /_([Ii])([Ee])_/g, "$1.$2.", //ie
  /_([Aa])([Mm])_/g, "$1.$2.", //a.m.
  /_([Pp])([Mm])_/g, "$1.$2.", //p.m.
  /_Cap_/g, "Cap.", //Cap.
  /_([Cc])_/g, "$1.", //c.
  /_([Ee][Tt])zzz([Aa][Ll])_/, "$1_$2.", // et al.
  /_(etc|ETC)_/g, "$1.", //etc.
  /_([Pp])([Ss])dot_/g, "$1.$2.", // p.s.
  /_([Pp])([Ss])_/g, "$1.$2",
  /_([Pp])([Hh])([Dd])_/g, "$1$2.$3", // Ph.D
  /_([Rr])([Ii])([Pp])_/g, "$1.$2.$3", // R.I.P
  /_([Vv])([Ss]?)_/g, "$1$2.", // vs. and v.
  /_([Mm])([Rr]|[Ss]|[Xx])_/g, "$1$2.", // Mr. Ms. and Mx.
  /_([Dd])([Rr])_/g, "$1$2.", // Dr.
  /_([Pp])([Ff])_/g, "$1$2.", // Pf.
  /_([Ii])([Nn])([Dd]|[Cc])_/g, "$1$2$3.", // Ind. and Inc.
  /_([Cc])([Oo])([Rr]?)([Pp]?)_/g, "$1$2$3$4.", // Corp. and Co.
  /_([Cc])([Oo])dc([Ll])([Tt])([Dd])_/g, "$1$2.,$3$4$5.", // co.,ltd.
  /_([Ll])([Tt])([Dd])_/g, "$1$2$3.", // ltd.
  /_([Cc])([Oo])dcs([Ll])([Tt])([Dd])_/g, "$1$2.,_$3$4$5.", // co., ltd.
  /_([Cc])([Oo])ds([Ll])([Tt])([Dd])_/g, "$1$2._$3$4$5.", // co. ltd.
  /_(prof|PROF|Prof)_/g, "$1.", //Prof.
  /([\-]?[0-9]+)DECIMALDOT([0-9]+)_/g, "$1.$2", //(-)27.3
  /_([\-]?[0-9]+)\DECIMALDOT([0-9]+)POWERE([\-]?[0-9]+)_/g, "$1.$2e$3", //(-)1.2e(-)9
  /_DECIMALCOMMA_/g, ",", // large numbers like 200,000,000.13
  /_DECIMALDOT_/g, ".", 
  /(\w+([\.-]?\w+)*)AT(\w+([\.-]?\w+)*)\.(\w{2,3})/g, "$1@$3.$5",
  /((http[s]?)COLON(\/\/))([-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b)([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/g, "$2:$3$4$5",
  /_LINEFEED_/g, "\n", // LF
  /_CARRIAGERETURN_/g, "\r", // CR
  /_CARRIAGERETURNLINEFEED_/g, "\r\n", // CR LF
  /_LINEFEEDCARRIAGERETURN_/g, "\n\r", // LF CR
  /_RECORDSEPARATOR_/g, "\\036", // RS
];

const CONTRACTS_RE = [
  /([Cc])an['\u2019]t/g, "$1an not",
  /([Dd])idn['\u2019]t/g, "$1id not",
  /([CcWw])ouldn['\u2019]t/g, "$1ould not",
  /([Ss])houldn['\u2019]t/g, "$1hould not",
  /([Ii])t['\u2019]s/g, "$1t is",
  /([tT]hat)['\u2019]s/g, "$1 is",
  /(she|he|you|they|i)['\u2019]d/gi, "$1 would",
  /(she|he|you|they|i)['\u2019]ll/gi, "$1 will",
  /n['\u2019]t /g, " not ",
  /['\u2019]ve /g, " have ",
  /['\u2019]re /g, " are "
];

const TAG_RE = /(<\/?[a-z][a-z0-9='"#;:&\s\-\+\/\.\?]*\/?>|<!DOCTYPE[^>]*>|<!--[^>-]*-->)/i; // html tags (rita#103)
const POPTAG_RE = new RegExp(`_${TAG}[0-9]+_`);

export default Tokenizer;