import antlr4 from 'antlr4';
import { decode } from 'he';
import Visitor from './visitor';
import Lexer from '../grammar/antlr/RiScriptLexer';
import Parser from '../grammar/antlr/RiScriptParser';
import RiScriptLexer from '../grammar/antlr/RiScriptLexer';

class Errors extends antlr4.error.ErrorListener {
  constructor() {
    super();
  }
  syntaxError(recognizer, offendingSymbol, line, column, msg, err) {
    throw Error(`${offendingSymbol} line ${line}, col ${column}: ${msg}`);
  }
}

class RiScript {

  // TODO: quoted strings with spaces in choices or symbols
  //       notebook -> context, variable transforms (useless with js/tt)
  constructor() {
    this.visitor = new Visitor(this, RiTa());
    this.transforms = RiScript.transforms;
  }

  static eval() {
    return new RiScript().evaluate(...arguments);
  }

  evaluate(input, ctx, opts = {}) {
    const orig = {};
    Object.assign(orig, ctx);

    ctx = ctx || {};

    let onepass = opts.singlePass; // TODO: doc
    let last, expr = input, trace = opts.trace;

    for (let i = 0; expr !== last && i < RiScript.MAX_TRIES; i++) {
      last = expr;
      trace && console.log('-'.repeat(20) + ' Pass#' + i + ' ' + '-'.repeat(20));
      expr = this.lexParseVisit(expr, ctx, opts);
      if (orig.syn1 !== ctx.syn1) {
        console.log('HIT#'+i);
      };
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
    this.lexer = new Lexer(new antlr4.InputStream(input));
    this.lexer.removeErrorListeners();
    this.lexer.addErrorListener(new Errors());

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
      if (!silent) console.error(("LEXER: " + input + '\n' + e.message + "\n"));
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
    let type = (t.type > -1 ? RiScriptLexer.symbolicNames[t.type] : 'EOF');
    return "[ " + t.line + "." + t.column + ": '" + txt + "' -> " + type + " ]";
  }

  parse(tokens, input, opts) {

    // create the parser
    this.parser = new Parser(tokens);
    this.parser.removeErrorListeners();
    this.parser.addErrorListener(new Errors());

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
    trace && console.log('\n' + tree.toStringTree(this.parser.ruleNames) + '\n');
    return tree;
  }

  lexParse(input, opts) {
    let tokens = this.lex(input, opts);
    return this.parse(tokens, input, opts);
  }

  lexParseVisitNoPre(input, context, opts) {
    if (!input || !input.length) return '';
    let tree = this.lexParse(input, opts);
    return this.visitor.init(context, opts).start(tree);
  }

  lexParseVisit(input, context, opts) {

    let { pre, parse, post } = this.preparse(input, opts);

    opts.trace && (pre.length || post.length) &&
      console.log('preParse("' + pre + '", "' + post + '");');

    let visited = "";
    if (parse.length) {
      let tree = this.lexParse(parse, opts);
      visited = this.visitor.init(context, opts).start(tree);
    }

    let result = (pre.length && visited.length) ? pre + '\n' + visited : pre + visited;
    return (result.length && post.length) ? result + '\n' + post : result + post;
  }

  resolveEntities(result) {
    return (typeof result === 'undefined')
      ? '' : this.unescape
        (decode(result)
          .replace(ENT_RE, ' '));
  }

  unescape(s) { // only parens for now
    return s.replace(/\\\(/g, '(')
      .replace(/\\\)/g, ')');
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
  uppercase,
  pluralize, 

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
const ENT_RE = /[\u00a0\u2000-\u200b\u2028-\u2029\u3000]+/g; // SYNC:
const PRS_RE = /([(){}|]|(\${1,2}\w+))/;
const SYM_RE = /\${1,2}\w+/;
const CONT_RE = /\\\n/;
const PARSE_RE = /([\/()\$|\[\]])|\.\S/;

export default RiScript;