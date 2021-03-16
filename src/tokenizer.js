import Util from './util';
import { encode } from 'he';

class Tokenizer {

  constructor(parent) {
    this.RiTa = parent;
    this.splitter = /(\S.+?[.!?]["\u201D]?)(?=\s+|$)/g;
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

  tokens(text, regex) {

    let words = this.tokenize(text, regex), tokens = {};
    words.forEach(w => ALPHA_RE.test(w) && (tokens[w.toLowerCase()] = 1));
    return Object.keys(tokens).sort();
  }

  tokenize(input, regex) {

    if (typeof input !== 'string') return [];

    if (regex) return input.split(regex);

    let { tags, text } = this.pushTags(input.trim());

    for (let i = 0; i < TOKENIZE_RE.length; i += 2) {
      text = text.replace(TOKENIZE_RE[i], TOKENIZE_RE[i + 1]);
    }

    if (this.RiTa.SPLIT_CONTRACTIONS) {
      for (let i = 0; i < CONTRACTS_RE.length; i += 2) {
        text = text.replace(CONTRACTS_RE[i], CONTRACTS_RE[i + 1]);
      }
    }

    return this.popTags(text.trim().split(WS_RE), tags);
  }

  untokenize(arr, delim) { // so ugly (but works)

    delim = delim || ' ';

    let nextNoSpace = false, afterQuote = false, midSentence = false;
    let withinQuote = arr.length && QUOTE_RE.test(arr[0]);
    let result = arr[0] || '';

    for (let i = 1; i < arr.length; i++) {

      if (!arr[i]) continue;
      let thisToken = arr[i];
      let lastToken = arr[i - 1];

      let thisComma = thisToken === ',', lastComma = lastToken === ',';
      let thisNBPunct = NOSP_BF_PUNCT_RE.test(thisToken) || UNTAG_RE[2].test(thisToken); // NB -> no space before the punctuation (add closing tag)
      let thisLBracket = LB_RE.test(thisToken); // LBracket -> left bracket
      let thisRBracket = RB_RE.test(thisToken); // RBracket -> right bracket
      let lastNBPunct = NOSP_BF_PUNCT_RE.test(lastToken); // NB -> no space before
      let lastNAPunct = NOSP_AF_PUNCT_RE.test(lastToken) || UNTAG_RE[1].test(lastToken)// NA -> no space after (add opening tag)
      let lastLB = LB_RE.test(lastToken), lastRB = RB_RE.test(lastToken);
      let lastEndWithS = (lastToken[lastToken.length - 1] === 's'
        && lastToken != "is" && lastToken != "Is" && lastToken != "IS");
      let lastIsWWW = WWW_RE.test(lastToken), isDomain = DOMAIN_RE.test(thisToken);
      let nextIsS = i == arr.length - 1 ? false : (arr[i + 1] === "s" || arr[i + 1] === "S");
      let lastQuote = QUOTE_RE.test(lastToken), isLast = (i == arr.length - 1);
      let thisQuote = QUOTE_RE.test(thisToken);

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
        } else if (!((APOS_RE.test(thisToken) && lastEndWithS)
          || (APOS_RE.test(thisToken) && nextIsS))) {
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

      result += thisToken; // add to result
      if (thisNBPunct && !lastNBPunct && !withinQuote && SQUOTE_RE.test(thisToken) && lastEndWithS) {
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
      if (result[i].includes('_')) {
        result[i] = result[i].replace(UNDER_RE, "$1 $2");
      }
    }
    return result;
  }
}

const UNTAG_RE = [
  /<[a-z][a-z0-9='"#;:&\s\-\+\/\.\?]*\/>/i, // empty tags <br/> <img /> etc. -> like a normal word
  /<[a-z][a-z0-9='"#;:&\s\-\+\/\.\?]*>/i, // opening tags <a>, <p> etc. -> no space after 
  /<\/[a-z][a-z0-9='"#;:&\s\-\+\/\.\?]*>/i, // closing tags </a> </p> etc. -> no space before
  /<!DOCTYPE[^>]*>/i, // <!DOCTYPE> -> like a normal word
  /<!--[^->]*-->/i // <!-- --> -> like a normal word
];

const NOSP_AF_PUNCT_RE = /^[\^\*\$\/\u2044#\-@\u00b0]+$/;
const TAG = "TAG", UNDER_RE = /([a-zA-z]|[\.\,])_([a-zA-Z])/g;
const LB_RE = /^[\[\(\{\u27e8]+$/, RB_RE = /^[\)\]\}\u27e9]+$/;
const QUOTE_RE = /^[""\u201c\u201d\u2019\u2018`''\u00ab\u00bb]+$/;
const DOMAIN_RE = /^(com|org|edu|net|xyz|gov|int|eu|hk|tw|cn|de|ch|fr)$/;
const SQUOTE_RE = /^[\u2019\u2018`']+$/, ALPHA_RE = /^[A-Za-z]+$/, WS_RE = /\s+/;
const APOS_RE = /^[\u2019']+$/, NL_RE = /(\r?\n)+/g, WWW_RE = /^(www[0-9]?|WWW[0-9]?)$/;
const NOSP_BF_PUNCT_RE = /^[,\.\;\:\?\!\)""\u201c\u201d\u2019\u2018`'%\u2026\u2103\^\*\u00b0\/\u2044\-@]+$/;

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

const CONTRACTS_RE = [
  /([Cc])an['\u2019]t/g, "$1an not",
  /([Dd])idn['\u2019]t/g, "$1id not",
  /([CcWw])ouldn['\u2019]t/g, "$1ould not",
  /([Ss])houldn['\u2019]t/g, "$1hould not",
  /([Ii])t['\u2019]s/g, " $1t is",
  /n['\u2019]t /g, " not ",
  /['\u2019]ve /g, " have ",
  /['\u2019]re /g, " are "
];

const TAG_RE = /(<\/?[a-z][a-z0-9='"#;:&\s\-\+\/\.\?]*\/?>|<!DOCTYPE[^>]*>|<!--[^>-]*-->)/i; // html tags (rita#103)


const POPTAG_RE = new RegExp(`_${TAG}[0-9]+_`);

export default Tokenizer;