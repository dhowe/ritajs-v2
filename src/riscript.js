const antlr4 = require('antlr4');
const { decode } = require('he');
const Visitor = require('./visitor');
const Lexer = require('../grammar/antlr/RiScriptLexer');
const Parser = require('../grammar/antlr/RiScriptParser');
const { LexerErrors, ParserErrors } = require('./errors');

class RiScript {

  // TODO: quoted strings with spaces in choices or symbols, weighted-empty-string in choice 
  //       notebook -> context, variable transforms (useless with js/tt)
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
      trace && console.log('-'.repeat(20) + ' Pass#' + i + ' ' + '-'.repeat(20));
      expr = this.lexParseVisit(expr, ctx, opts);
      if (trace) this.passInfo(ctx, last, expr, i);
      if (onepass || !this.isParseable(expr)) break;
    }

    if (!opts.silent && !RiScript.parent.SILENT && SYM_RE.test(expr)) {
      console.warn('[WARN] Unresolved symbol(s) in "' + expr + '" ');
    }
    return this.resolveEntities(expr)
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
    return "[ " + t.line + "." + t.column + ": '" + txt + "' -> " + type + " ]";
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
      silent || console.error("PARSER: '" + input + "'\n" + e.message + '\n');
      throw e;
    }
    //trace && 
    console.log('\n' + tree.toStringTree(this.parser.ruleNames) + '\n');
    return tree;
  }

  lexParse(input, opts) {
    let t, perf = true || opts.perf;
    if (perf) t = clock()
    let tokens = this.lex(input, opts);
    if (perf) {
      console.log("[lexing] " + clock(t) + "ms");
      t = clock();
    }
    let result = this.parse(tokens, input, opts);
    console.log("[parsing] " + clock(t) + "ms");
    return result;
  }

  lexParseVisit(input, context, opts) {

    let { pre, parse, post } = this.preparse(input, opts);

    opts.trace && (pre.length || post.length) &&
      console.log('preParse("' + pre + '", "' + post + '");');

    let visited = "", perf = true || opts.perf;
    if (parse.length) {
      let t, tree = this.lexParse(parse, opts);
      if (perf) t = clock();
      visited = this.visitor.init(context, opts).start(tree);
      if (perf) console.log("[visiting] " + clock(t) + "ms");
    }

    let result = (pre.length && visited.length) ? pre + '\n' + visited : pre + visited;
    return (result.length && post.length) ? result + '\n' + post : result + post;
  }

  resolveEntities(result) {
    return (typeof result === 'undefined')
      ? '' : decode(result).replace(ENT_RE, ' ');
  }

  isParseable(s) {
    return PRS_RE.test(s);
  }

  preparse(input, opts = {}) {
    let res = { pre: '', parse: input || '', post: '' };
    if (!input.length) return res;

    if (!opts.nopre) { // DOC:

      input = input.replace(CONT_RE, '');
      let lines = (input).split(/\r?\n/g);
      let parse = [], pre = [], post = [], mode = 0;
      let dynamic = l => l.startsWith('{') || PARSE_RE.test(l);

      lines.forEach(line => {
        if (mode === 0) {      // pre
          if (dynamic(line)) {
            parse.push(line);
            mode = 1;
          }
          else {
            pre.push(line);
          }
        }
        else if (mode === 1) { // parse
          if (dynamic(line)) {
            parse.push(line);
          }
          else {
            post.push(line);
            mode = 2;
          }
        }
        else if (mode === 2) { // post
          if (dynamic(line)) {
            parse.push(...post, line);
            post.length = 0;
            mode = 1;
          }
          else {
            post.push(line);
          }
        }
      });

      res.pre = pre.length ? pre.join('\n') : '';
      res.parse = parse.length ? parse.join('\n') : '';
      res.post = post.length ? post.join('\n') : '';
    }
    return res;
  }

  static addTransform(name, func) {
    RiScript.transforms[name] = func;
    return RiScript.transforms;
  }

  static articlize(s) { // SYNC:
    if (!s || !s.length) return '';
    let first = s.split(/\s+/)[0];
    let phones = RiTa().phones(first, { silent: true });
    // could still be original word if no phones found
    return (phones && phones.length
      && VOW_RE.test(phones[0]) ? 'an ' : 'a ') + s;
  }

  // a no-op transform for sequences
  static identity(s) {
    return s;
  }
}

function clock(start) {
    if ( !start ) return process.hrtime();
    var end = process.hrtime(start);
    return Math.round((end[0]*1000) + (end[1]/1000000));
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
  //seq: RiScript.identity,
  //rseq: RiScript.identity,
  //norep: RiScript.identity,
  norepeat: RiScript.identity,

  // aliases
  art: RiScript.articlize,
  nr: RiScript.identity,
  cap: capitalize,
  ucf: capitalize, // deprecated
  uc: uppercase,
  qq: quotify,
  s: pluralize
};

const VOW_RE = /[aeiou]/;
const ENT_RE = /[\u00a0\u2000-\u200b\u2028-\u2029\u3000]+/g;
const PRS_RE = /([(){}|]|(\${1,2}\w+))/;
const SYM_RE = /\${1,2}\w+/;
const CONT_RE = /\\\n/;
const PARSE_RE = /([\/()\$|\[\]])|\.\S/;

module && (module.exports = RiScript);
