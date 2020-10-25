const antlr4 = require('antlr4');
const { decode } = require('he');
const Visitor = require('./visitor');
const Lexer = require('../grammar/antlr/RiScriptLexer');
const Parser = require('../grammar/antlr/RiScriptParser');
const { LexerErrors, ParserErrors } = require('./errors');

class RiScript {

  constructor() {
    this.lexer = undefined;
    this.parser = undefined;
    this.appliedTransforms = [];
    this.visitor = new Visitor(this);
  }

  static eval() {
    return new RiScript().evaluate(...arguments);
  }

  evaluate(input, ctx, opts = {}) { 

    // NEXT: transforms

    ctx = ctx || {};

    // make sure we have RiTa in context
    if (!ctx.hasOwnProperty('RiTa')) ctx.RiTa = RiTa();

    let onepass = opts.singlePass; // TODO: doc
    let last, expr = input, trace = opts.trace;
    this.pushTransforms(ctx);

    for (let i = 0; expr !== last && i < RiScript.MAX_TRIES; i++) {
      last = expr;
      if (trace) console.log("--------------------- Pass#" + i + " ----------------------");
      expr = this.lexParseVisit(expr, ctx, opts);
      if (trace) this.passInfo(ctx, last, expr, i);
      if (onepass || !this.isParseable(expr)) break;
    }

    if (!opts.silent && !RiScript.parent.SILENT && SYMBOL_RE.test(expr)) {
      console.warn('[WARN] Unresolved symbol(s) in "' + expr + '"');
    }

    return this.popTransforms(ctx).resolveEntities(expr);
  }

  passInfo(ctx, input, output, pass) {
    console.log("\nPass#" + pass + ":  " + input.replace(/\r?\n/g, "\\n")
      + "\nResult:  " + output + "\nContext: " + JSON.stringify(ctx) + "\n");
    if (pass >= RiScript.MAX_TRIES - 1) throw Error('Unable to resolve:\n"'
      + input + '"\nafter ' + RiScript.MAX_TRIES + ' tries. An infinite loop?');
  }

  pushTransforms(ctx) {
    Object.keys(RiScript.transforms).forEach(t => {
      if (!ctx.hasOwnProperty(t)) {
        ctx[t] = RiScript.transforms[t];
        this.appliedTransforms.push(t);
      }
    });
    return this;
  }

  popTransforms(ctx) {
    this.appliedTransforms.forEach(t => delete ctx[t]);
    return this;
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
    trace && console.log('\n'+tree.toStringTree(this.parser.ruleNames) + '\n');
    return tree;
  }

  lexParse(input, opts) {
    let tokens = this.lex(input, opts);
    return this.parse(tokens, input, opts);
  }

  preParse(input, opts = {}) {
    let parse = input, pre = '', post = '';
    if (!opts.skipPreParse && !PREPARSE_A_RE.test(parse)) {
      const words = input.split(/ +/);
      let preIdx = 0, postIdx = words.length - 1;
      while (preIdx < words.length) {
        if (PREPARSE_B_RE.test(words[preIdx])) break;
        preIdx++;
      }
      if (preIdx < words.length) {
        while (postIdx >= 0) {
          if (PREPARSE_B_RE.test(words[postIdx])) break;
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
    opts.trace && console.log('preParse("' + (pre || '') + '", "' + (post || '') + '"):');
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
  /*
    createVisitor(context, opts) {
      if (!this.visitor) this.visitor = new Visitor(this);
      ;
      return this.visitor;
    } */

  resolveEntities(result) { // &#10; for line break DOC:
    return decode(result.replace(/ +/g, ' '))
      .replace(ENTITY_RE, ' ');
  }

  isParseable(s) {
    let found = PARSEABLE_RE.test(s);
    //console.log("FOUND: " + s + ": " + found);
    return found;
  }

  static addTransform(name, func) {
    RiScript.transforms[name] = func;
    return RiScript.transforms;
  }

  static articlize(s) {
    let phones = RiTa().phones(s, { silent: true });
    return (phones && phones.length
      && VOWEL_RE.test(phones[0]) ? 'an ' : 'a ') + s;
  }

  // a no-op transform for sequences
  static identity(s) {
    return s;
  }

  /*
    static addTransform(name, func) { // DOC: object case
      if (typeof name === 'string') {
        return RiScript.transforms[name] = func;
      }
      Object.keys(name).forEach(k => {
        RiScript.transforms[k] = name[k];
      });
    }
    static removeTransform(name) { // DOC:
      let obj = {};
      if (typeof name === 'string') {
        return delete RiScript.transforms[name];
      }
      Object.keys(name).forEach(k => delete RiScript.transforms[k]);
    }
    static getTransforms() { // DOC:
      return Object.keys(RiScript.transforms);
    } */

}

function RiTa() { return RiScript.parent; }


// -------------------- Default Transforms ----------------------

/// <summary>
/// articlize: Prefixes the string with 'a' or 'an' as appropriate.
/// </summary>
/* function articlize(s) {
  return RiTa().articlize(s);
} */

/// <summary>
/// Capitalizes the first character.
/// </summary>
function capitalize(s) {
  return s[0].toUpperCase() + s.substring(1);
}

/// <summary>
/// Capitalizes the first character.
/// </summary>
function toUpper(s) {
  return s.toUpperCase();
}

/// <summary>
/// Wraps the given string in double-quotes.
/// </summary>
function quotify(s) {
  return "&quot;" + s + "&quot;";
}

/// <summary>
/// Pluralizes the word according to english regular/irregular rules.
/// </summary>
function pluralize(s) {
  return RiTa().pluralize(s.trim());
}

RiScript.MAX_TRIES = 99;

RiScript.transforms = {
  capitalize, quotify, pluralize,
  qq: quotify, uc: toUpper, ucf: capitalize,
  articlize: RiScript.articlize,
  seq: RiScript.identity,
  rseq: RiScript.identity,
  norep: RiScript.identity
};

const VOWEL_RE = /[aeiou]/;
const SYMBOL_RE = /\$[A-Za-z_]/;
const PREPARSE_A_RE = /^[${]/;
const PREPARSE_B_RE = /[()$|{}]/;
const PARSEABLE_RE = /([()]|\$[A-Za-z_0-9][A-Za-z_0-9-]*)/;
const ENTITY_RE = /[\t\v\f\u00a0\u2000-\u200b\u2028-\u2029\u3000]+/g;

module && (module.exports = RiScript);
