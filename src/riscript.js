const antlr4 = require('antlr4');
const colors = require('colors');

const LexerErrors = require('./errors').LexerErrors;
const ParserErrors = require('./errors').ParserErrors;
const Visitor = require('./visitor');
const Lexer = require('../lib/RiScriptLexer');
const Parser = require('../lib/RiScriptParser');

class RiScript {

  constructor() {
    this.parseTree = undefined;
    this.scripting = new Scripting();
  }

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
}

class Scripting {

  constructor() {
    this.lexer = undefined;
    this.parser = undefined;
    this.visitor = undefined;
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
    //this.parser.buildParseTrees = false;
    this.parser.removeErrorListeners();
    this.parser.addErrorListener(new ParserErrors());
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
    if (showParse) console.log(tree.toStringTree(this.parser.ruleNames),'\n');

    return tree;
  }

  lexParse(input, showParse, silent) {
    let tokens = this.lex(input, showParse, silent);
    return this.parse(tokens, input, showParse, silent);
  }

  lexParseVisit(input, context, showParse, silent) { // not used...
    let tree = this.lexParse(input, showParse, silent);
    return this.createVisitor(context, showParse).start(tree);
  }

  createVisitor(context, showParse, silent) {
    Object.assign((context = context || {}), silent ? { _silent: silent } : {});
    return new Visitor(context, this.lexer.symbolicNames, this.parser.ruleNames, showParse);
  }
}

module && (module.exports = RiScript);
