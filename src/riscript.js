const antlr4 = require('antlr4');
//const colors = require('colors');
const { decode } = require('he');
const Visitor = require('./visitor');
const Lexer = require('../grammar/.antlr/RiScriptLexer');
const Parser = require('../grammar/.antlr//RiScriptParser');
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

  static eval(input, context, opts) { // TODO: optimize
    opts = opts || {};
    let trace = opts.trace;
    let onepass = opts.onepass;
    let ctx = context || {}, last = input;
    let rs = new RiScript().pushTransforms();
    let expr = rs.lexParseVisit(input, ctx, opts);
    if (!onepass || /(\$[A-Za-z_]|[()])/.test(expr)) {
      for (let i = 0; i < MaxTries && expr !== last; i++) {
        last = expr;
        if (!expr) break;
        expr = rs.lexParseVisit(expr, ctx, opts);
        trace && console.log(i + ') ' + expr, 'ctx: ' + JSON.stringify(ctx));
        if (i >= MaxTries - 1) throw Error('Unable to resolve: "'
          + input + '" after ' + MaxTries + ' tries - an infinite loop?');
      }
    }
    if (!opts.silent && !RiTa.SILENT && /\$[A-Za-z_]/.test(expr)) {
      console.warn('[WARN] Unresolved symbol(s) in "' + expr + '"');
    }
    return rs.popTransforms().resolveEntities(expr);
  }

  /*
  static evalOld(input, context, opts) { // remove
    let riscript = new RiScript().pushTransforms();
    let expr = riscript.lexParseVisit(input, context || {}, opts);
    return riscript.popTransforms().resolveEntities(expr);
  }

  // TODO: should only repeat if symbols or choices remain
  static multeval(input, context, opts) { // remove
    opts = opts || {};
    let trace = opts.trace, silent = opts.silent;
    let last, expr = input, ctx = context || {};
    opts.silent = true; // always true, handled after loop
    let riscript = new RiScript().pushTransforms();
    for (let i = 0; i < MaxTries && expr !== last; i++) {
      last = expr;
      expr = riscript.lexParseVisit(expr, ctx, opts);
      trace && console.log(i + ') ' + expr, 'ctx: ' + JSON.stringify(ctx));
      if (i >= MaxTries - 1) throw Error('Unable to resolve: "'
        + input + '" after ' + MaxTries + ' tries - an infinite loop?');
    }
    if (!silent && !RiTa.SILENT && /(\$[A-Za-z_]|[()])/.test(expr)) {
      console.warn('[WARN] Unresolved symbol(s) in "' + expr + '"');
    }
    return riscript.popTransforms().resolveEntities(expr);
  }*/

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
      if (!silent) console.error(//colors.red
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
      if (!silent) console.error(//colors.red
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

  lexParseVisit(input, context, opts) {
    let tree = this.lexParse(input, opts);
    return this.createVisitor(context, opts).start(tree);
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
function capitalise() {
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

RiScript.transforms = { capitalise, articlize, quotify, pluralize, qq: quotify, uc: toUpper, ucf: capitalise };

module && (module.exports = RiScript);
  ////////////// NEW //////////////////////////////////////////// // not used...
/*lexParseCompile(input, context, showParse, silent) {
  let tree = this.lexParse(input, showParse, silent);
  let visitor = this.createVisitor(context, showParse);
  visitor.start(tree);
  return context;
}

lexParseExpand(input, context, showParse, silent) { // not used...
  let tree = this.lexParse(input, showParse, silent);
  let visitor = this.createVisitor(context, showParse);
  return visitor.start(tree);
}*/

// class RiScript {
//
//   constructor() {
//     //this.parseTree = undefined;
//     //this.symbolTable = undefined;
//     this.scripting = new Scripting();
//     //this.context = context;
//   }

/*static compile(input, context, showParse, silent) {
  let rs = new RiScript();
  rs.scripting.lexParseCompile(input, context, showParse, silent);
  rs.context = context;
  return rs;
}*/

  // expand(rule) {
  //   let dbug = 0;
  //   let result = rule || '$start';
  //   let tries = 0, maxIterations = 100;
  //   //while (result.includes('$')) {
  //   while (++tries < maxIterations) {
  //     let next = this.expandRule(result, dbug);
  //     dbug && console.log('expand: '+result+ ' -> '+next);
  //
  //     if (next && next.length && next !== result) { // matched a rule
  //       result = this.scripting.lexParseExpand(next, context);
  //       dbug && console.log('got: '+result);
  //       continue;
  //     }
  //     dbug && console.log('return: '+result+'\n---------------');
  //     return result;
  //   }
  //   dbug && console.log('return nil');
  // }

  // expandRule(prod, dbug) {
  //   for (let name in this.context) {
  //     let idx = prod.indexOf(name);
  //     if (idx >= 0) { // got a match, split into 3 parts
  //       dbug && console.log('matched: ' + name);
  //       let pre = prod.substring(0, idx) || '';
  //       let expanded = this.symbolTable[name] || '';
  //       let post = prod.substring(idx + name.length) || '';
  //       return pre + expanded + post;
  //     }
  //   }  // no rules matched
  // }

/*expandOrig(rule) {

  rule = rule || '$start';

  //console.log('rule: '+rule);
  if (!this.symbolTable) throw Error('Call compile() before run()');
  if (!this.symbolTable[rule]) throw Error('No rule called: ' + rule);

  let rules = Object.keys(this.symbolTable);
  let tries = 0, maxIterations = 1000;

  while (++tries < maxIterations) {
    console.log('rule: ' + rule);

    let next = this.expandRule(rule, rules);

    if (next && next.length) { // matched a rule

      rule = next;
      continue;
    }
    console.log('\n-------------------------------------------------');

    return rule;
  }

  throw Error('Failed to expand grammar from '
    + rule + ', after ' + tries + ' tries');
}*/
  //
  // static evaluate(input, context, showParse, silent) {
  //   Object.assign((context = context || {}), silent ? { _silent: silent } : {});
  //   return new Scripting().lexParseVisit(input, context, showParse, silent);
  // }

  // run(cmd, showParse, silent) {
  //   return this.scripting.lexParseVisit(this.context, showParse, silent);
  // }
/*
  run(context, showParse, silent) {
    let vis = this.scripting.createVisitor(context, showParse, silent);
    let result = vis.start(this.parseTree);
    //console.log('RESULT: '+result+'==============Symbols===============\n', vis.context);
    return result;
  }

  static evaluate(input, context, showParse, silent) {
    let rs = RiScript.compile(input, showParse, silent);
    Object.assign((context = context || {}), silent ? { _silent: silent } : {});
    return rs.run(context, showParse, silent);
  }

  static compile(input, showParse, silent) {
    let rs = new RiScript();
    rs.parseTree = rs.scripting.lexParse(input, showParse, silent);
    return rs;
  }

}*/

  // static RiScript.evaluate(input, context, showParse, silent) {
  //
  // }