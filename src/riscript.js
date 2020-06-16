const antlr4 = require('antlr4');
const { decode } = require('he');
const Visitor = require('./visitor');
const Lexer = require('../grammar/.antlr/RiScriptLexer');
const Parser = require('../grammar/.antlr/RiScriptParser');
const { LexerErrors, ParserErrors } = require('./errors');
const MaxTries = 100;

class RiScript {

  constructor() {
    this.lexer = undefined;
    this.parser = undefined;
    this.visitor = undefined;
    this.appliedTransforms = {};
  }

  static addTransform(name, func) {
    RiScript.transforms[name] = func;
  }

  static getTransforms() {
    return Object.keys(RiScript.transforms);
  }

  static eval(input, ctx = {}, opts = {}) {

    let onepass = opts.singlePass; // TODO: doc
    let last = input, trace = opts.trace;
    let rs = new RiScript().pushTransforms();
    let expr = rs.lexParseVisit(input, ctx, opts);
    if (!onepass && /(\$[A-Za-z_]|[()])/.test(expr)) {
      for (let i = 0; i < MaxTries && expr !== last; i++) {
        last = expr;
        if (!expr) break;
        expr = rs.lexParseVisit(expr, ctx, opts);
        trace && console.log('\nPass#' + (i + 1) + ') ' + expr, 'ctx: ' + JSON.stringify(ctx));
        if (i >= MaxTries - 1) throw Error('Unable to resolve: "'
          + input + '" after ' + MaxTries + ' tries - an infinite loop?');
      }
    }
    if (!opts.silent && !RiScript.RiTa.SILENT && /\$[A-Za-z_]/.test(expr)) {
      console.warn('[WARN] Unresolved symbol(s) in "' + expr + '"');
    }
    return rs.popTransforms().resolveEntities(expr);
  }

  pushTransforms() {
    Object.keys(RiScript.transforms).forEach(t => {
      this.appliedTransforms[t] = String.prototype[t];
      String.prototype[t] = RiScript.transforms[t];
    });
    return this;
  }

  popTransforms() {
    Object.keys(RiScript.transforms).forEach(t => {
      String.prototype[t] = this.appliedTransforms[t];
    });
    return this;
  }

  lex(input, opts) {

    // create the lexer
    let stream = new antlr4.InputStream(input);
    this.lexer = new Lexer.RiScriptLexer(stream);
    this.lexer.removeErrorListeners();
    this.lexer.addErrorListener(new LexerErrors());

    let silent = opts && opts.silent;
    let trace = opts && opts.trace;

    // try the lexing
    let tokenStream;
    try {
      tokenStream = new antlr4.CommonTokenStream(this.lexer);
      if (trace) {
        console.log('-------------------------------------------------------');
        tokenStream.fill();
        tokenStream.tokens.forEach(t => console.log(this.tokenToString(t)));
        console.log();
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
    if (trace) console.log(tree.toStringTree(this.parser.ruleNames), '\n');

    return tree;
  }

  lexParse(input, opts) {
    let tokens = this.lex(input, opts);
    return this.parse(tokens, input, opts);
  }

  preParse(input, opts) {
    function countPre(words) {
      let i = 0;
      while (i < words.length) {
        if (/[()$]/.test(words[i])) break;
        i++;
      }
      return i;
    }
    function countPost(words) {
      let i = words.length - 1;
      while (i >= 0) {
        if (/[()$]/.test(words[i])) break;
        i--;
      }
      return i;
    }
    let parse = input, pre = '', post = '';
    if (!opts || !opts.skipPreParse) {
      const words = input.split(/ +/);
      const preIdx = countPre(words);
      const postIdx = preIdx < words.length ? countPost(words) : words.length;
      
      pre = words.slice(0, preIdx).join(' ');
      parse = words.slice(preIdx, postIdx + 1).join(' ');
      post = words.slice(postIdx + 1).join(' ');
    }
    return { pre, parse, post };
  }

  lexParseVisit(input, context, opts) { // TODO: remove after profiling
    console.log('----------------------------------------------');
    console.log('PARSE: ' + input);
    let { pre, parse, post } = this.preParse(input, opts);
    console.log("\nPRE: " + pre);
    console.log("PARSE: " + parse);
    console.log("POST: " + post, "\n");

    let hrstart = process.hrtime();
    let tree = parse.length && this.lexParse(parse, opts);
    let hrend = process.hrtime(hrstart);
    console.info('Parse time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    console.info('   ' + parse);
    hrstart = process.hrtime();
    let result = parse.length ? this.createVisitor(context, opts).start(tree) : '';
    hrend = process.hrtime(hrstart);
    console.info('Visit time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    let res = (pre + ' ' + result + ' ' + post).trim();
    return res;
  }

  lexParseVisitREAL(input, context, opts) {
    let tree = this.lexParse(input, opts);
    return this.createVisitor(context, opts).start(tree);;
  }

  createVisitor(context, opts) {
    return new Visitor(this, context, opts);
  }

  resolveEntities(result) {
    return decode(result.replace(/ +/g, ' '))
      .replace(/[\t\v\f\u00a0\u2000-\u200b\u2028-\u2029\u3000]+/g, ' ');
  }
}

// -------------------- Default Transforms ----------------------

/// <summary>
/// Prefixes the string with 'a' or 'an' as appropriate.
/// </summary>
function articlize() {
  return ("aeiou".indexOf(this[0].toLowerCase() > -1) ? "an " : "a ") + this;
}

/// <summary>
/// Capitalizes the first character.
/// </summary>
function capitalize() {
  return this[0].toUpperCase() + this.substring(1);
}

/// <summary>
/// Capitalizes the first character.
/// </summary>
function toUpper() {
  return this.toUpperCase();
}

/// <summary>
/// Wraps the given string in double-quotes.
/// </summary>
function quotify() {
  return "&quot;" + this + "&quot;";
}

/// <summary>
/// Pluralizes the word according to english regular/irregular rules.
/// </summary>
function pluralize() {
  if (this.indexOf(' ') > -1) throw Error
    ('pluralize expected a single word, got "' + this + '"');
  return RiTa.pluralize(this);
}

RiScript.transforms = { capitalize, articlize, quotify, pluralize, qq: quotify, uc: toUpper, ucf: capitalize };

module && (module.exports = RiScript);