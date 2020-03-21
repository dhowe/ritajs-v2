const antlr4 = require('antlr4');
const colors = require('colors');

const Entities = require('he'); // provides decode
const LexerErrors = require('./errors').LexerErrors;
const ParserErrors = require('./errors').ParserErrors;
const Visitor = require('./visitor');
const Lexer = require('../lib/RiScriptLexer');
const Parser = require('../lib/RiScriptParser');
const MaxTries = 100;

class RiScript {

  constructor() {
    this.lexer = undefined;
    this.parser = undefined;
    this.visitor = undefined;
  }
    
  static eval(input, context, showParse, silent) {
    Object.assign(context || {}, silent ? {_silent : true } : {});
    let res = new RiScript().lexParseVisit(input, context, showParse);
    return resolveEntities(res);
  }

  static multeval(input, context, showParse, silent) {
    Object.assign(context || {}, silent ? { _silent: true } : {});
    let last, expr = input;
    let rs = new RiScript();
    for (let i = 0; i < MaxTries && expr !== last; i++) {
      last = expr;
      expr = rs.lexParseVisit(expr, context, showParse);
      showParse && console.log(i + ') ' + expr);
      if (i >= MaxTries - 1) throw Error('Failed to resolve: ' + stmt);
    }
    return resolveEntities(expr);
  }

  lex(input, showTokens, silent) {

    // create the lexer
    let stream = new antlr4.InputStream(input);
    this.lexer = new Lexer.RiScriptLexer(stream);
    this.lexer.removeErrorListeners();
    this.lexer.addErrorListener(new LexerErrors());
    //this.lexer.strictMode = false;

    // try the lexing
    let tokens;
    try {
      tokens = new antlr4.CommonTokenStream(this.lexer);
      if (showTokens) {
        console.log('-------------------------------------------------------');
        tokens.fill();
        tokens.tokens.forEach(t => console.log(this.tokenToString(t)));
        console.log();
      }
    } catch (e) {
      if (!silent) {
        console.error(colors.red("LEXER: " + input + '\n' + e.message + "\n"));
      }
      throw e;
    }
    return tokens;
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

  parse(tokens, input, showParse, silent) {

    // create the parser
    this.parser = new Parser.RiScriptParser(tokens);
    this.parser.removeErrorListeners();
    this.parser.addErrorListener(new ParserErrors());
    //this.parser.buildParseTrees = false;
    //this.parser.addErrorListener(new ConsoleErrorListener());

    // try the parsing
    let tree;
    try {
      tree = this.parser.script();
    } catch (e) {
      if (!silent) {
        console.error(colors.red("PARSER: " + input + '\n' + e.message + '\n'));
      }
      throw e;
    }
    if (showParse) console.log(tree.toStringTree(this.parser.ruleNames), '\n');

    return tree;
  }

  lexParse(input, showParse, silent) {
    let tokens = this.lex(input, showParse, silent);
    return this.parse(tokens, input, showParse, silent);
  }

  lexParseVisit(input, context, showParse) {
    let tree = this.lexParse(input, showParse, context && context._silent);
    return this.createVisitor(context, showParse).start(tree);
  }

  createVisitor(context, showParse) {
    return new Visitor(this, context, showParse);
  }
}

function resolveEntities(result) {
  return Entities.decode(result.replace(/ +/g, ' '))
    .replace(/[\t\v\f\u00a0\u2000-\u200b\u2028-\u2029\u3000]+/g, ' ');
}

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