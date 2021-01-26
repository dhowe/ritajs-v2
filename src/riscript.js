const antlr4 = require('antlr4');
const { decode } = require('he');
const Visitor = require('./visitor');
const Lexer = require('../grammar/antlr/RiScriptLexer');
const Parser = require('../grammar/antlr/RiScriptParser');
const { LexerErrors, ParserErrors } = require('./errors');

class RiScript {

  constructor() {
    this.visitor = new Visitor(this, RiTa());
    this.transforms = RiScript.transforms;
  }

  static eval() {
    return new RiScript().evaluate(...arguments);
  }

  evaluate(input, ctx, opts = {}) {

    ctx = ctx || {};

    let onepass = opts.singlePass; // TODO: doc
    let last, expr = input, trace = opts.trace;

    for (let i = 0; expr !== last && i < RiScript.MAX_TRIES; i++) {
      last = expr;
      if (trace) console.log("--------------------- Pass#" + i + " ----------------------");
      expr = this.lexParseVisit(expr, ctx, opts);
      if (trace) this.passInfo(ctx, last, expr, i);
      if (onepass || !this.isParseable(expr)) break;
    }

    if (!opts.silent && !RiScript.parent.SILENT && SYM_RE.test(expr)) {
      console.warn('[WARN] Unresolved symbol(s) in "' + expr + '" ');
    }

    return this.resolveEntities(expr);
  }

  passInfo(ctx, input, output, pass) {
    console.log("\nPass#" + pass + ":  " + input.replace(/\r?\n/g, "\\n")
      + "\nResult:  " + output + "\nContext: " + JSON.stringify(ctx) + "\n");
    if (pass >= RiScript.MAX_TRIES - 1) throw Error('Unable to resolve:\n"'
      + input + '"\nafter ' + RiScript.MAX_TRIES + ' tries. An infinite loop?');
  }

  lex(input, opts) {
    // create the lexer
    let stream = new antlr4.InputStream(input);
    this.lexer = new Lexer.RiScriptLexer(stream);
    this.lexer.removeErrorListeners();
    this.lexer.addErrorListener(new LexerErrors());

    let silent = opts && opts.silent;
    let trace = opts && opts.traceLex;

    // try the lexing
    let tokenStream;
    try {
      tokenStream = new antlr4.CommonTokenStream(this.lexer);
      if (trace) {
        tokenStream.fill();
        tokenStream.tokens.forEach(t => console.log(this.tokenToString(t)));
      }
    } catch (e) {
      if (!silent) console.error(//require('colors').red
        ("LEXER: " + input + '\n' + e.message + "\n"));
      throw e;
    }
    return tokenStream;
  }

  tokenToString(t) {
    let txt = "<no text>";
    if (t.text && t.text.length) {
      txt = t.text.replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r").replace(/\t/g, "\\t");
    }
    let type = (t.type > -1 ? this.lexer.symbolicNames[t.type] : 'EOF');
    return "[" + t.line + "." + t.column + ": '" + txt + "' -> " + type + "]";
  }

  parse(tokens, input, opts) {

    // create the parser
    this.parser = new Parser.RiScriptParser(tokens);
    this.parser.removeErrorListeners();
    this.parser.addErrorListener(new ParserErrors());

    let silent = opts && opts.silent;
    let trace = opts && opts.trace;

    // try the parsing
    let tree;
    try {
      tree = this.parser.script();
    } catch (e) {
      if (!silent) console.error(//require('colors').red
        ("PARSER: '" + input + '\'\n' + e.message + '\n'));
      throw e;
    }
    trace && console.log('\n' + tree.toStringTree(this.parser.ruleNames) + '\n');
    return tree;
  }

  lexParse(input, opts) {
    let tokens = this.lex(input, opts);
    return this.parse(tokens, input, opts);
  }

  preParse(input, opts = {}) {
    let parse = input || '', pre = '', post = '';
    let skipPre = parse.includes('$'); // see issue:rita#59
    let skipAll = parse.includes('\*') || opts.skipPreParse;
    if (!skipAll && !PPA_RE.test(parse)) {
      const words = input.split(/ +/);
      let preIdx = 0, postIdx = words.length - 1;

      while (!skipPre && preIdx < words.length) {
        if (PPB_RE.test(words[preIdx])) break;
        preIdx++;
      }
      if (preIdx < words.length) {
        while (postIdx >= 0) {
          if (PPB_RE.test(words[postIdx])) break;
          postIdx--;
        }
      }
      pre = words.slice(0, preIdx).join(' ');
      parse = words.slice(preIdx, postIdx + 1).join(' ');
      post = words.slice(postIdx + 1).join(' ');
    }
    return { pre, parse, post };
  }

  lexParseVisit(input, context, opts) {

    let { pre, parse, post } = this.preParse(input, opts);
    opts.trace && (pre.length || post.length) 
      && console.log('preParse("' + pre + '", "' + post + '");');
    let tree = parse.length && this.lexParse(parse, opts);
    let result = parse.length ? this.visitor.init(context, opts).start(tree) : '';
    return (this.normalize(pre) + ' ' + result + ' ' + this.normalize(post)).trim();
  }

  normalize(s) {
    return s && s.length ?
      s.replace(/\r/g, '')
        .replace(/\\n/g, '')
        .replace(/\n/g, ' ') : '';
  }

  resolveEntities(result) { // &#10; for line break DOC:
    if (typeof result === 'undefined') return '';
    return decode(result.replace(/ +/g, ' '))
      .replace(ENT_RE, ' ');
  }

  isParseable(s) {
    return PRS_RE.test(s);
  }

  static addTransform(name, func) {
    RiScript.transforms[name] = func;
    return RiScript.transforms;
  }

  static articlize(s) {
    if (!s || !s.length) return '';
    let phones = RiTa().phones(s, { silent: true });
    return (phones && phones.length
      && VOW_RE.test(phones[0]) ? 'an ' : 'a ') + s;
  }

  // a no-op transform for sequences
  static identity(s) {
    return s;
  }
}

function RiTa() { return RiScript.parent; }

// -------------------- Default Transforms ----------------------

/// <summary>
/// Capitalizes the first character.
/// </summary>
function capitalize(s) {
  return RiTa().capitalize(s);
}

/// <summary>
/// Capitalizes the string.
/// </summary>
function uppercase(s) {
  return s ? s.toUpperCase() : '';
}

/// <summary>
/// Wraps the given string in (smart) quotes.
/// </summary>
function quotify(s) {
  return "&#8220;" + (s || '') + "&#8221;";
}

/// <summary>
/// Pluralizes the word according to english regular/irregular rules.
/// </summary>
function pluralize(s) {
  return RiTa().pluralize(s);
}

RiScript.MAX_TRIES = 99;

RiScript.transforms = {
  quotify,
  pluralize,
  capitalize,
  articlize: RiScript.articlize,

  // sequences
  seq: RiScript.identity,
  rseq: RiScript.identity,
  norep: RiScript.identity, // TODO: remove
  nore: RiScript.identity,

  // aliases
  art: RiScript.articlize,
  ucf: capitalize,
  uc: uppercase,
  qq: quotify,
  s: pluralize   
};

const VOW_RE = /[aeiou]/;
const ENT_RE = /[\t\v\f\u00a0\u2000-\u200b\u2028-\u2029\u3000]+/g;

const PPA_RE = /^[${]/;
const PPB_RE = /[()$|{}]/;
const PRS_RE = /([(){}|]|(\${1,2}\w+))/;
const SYM_RE = /\${1,2}\w+/;

// Dynamic-options: ~ @ & % #, or only $ _ $$

module && (module.exports = RiScript);
