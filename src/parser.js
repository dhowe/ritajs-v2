const antlr4 = require('antlr4');
const colors = require('colors');

const LexerErrors = require('./errors').LexerErrors;
const ParserErrors = require('./errors').ParserErrors;
//const Errors = require('antlr4/error/ErrorListener').ConsoleErrorListener;
const Visitor = require('./visitor');
const Lexer = require('../lib/RiScriptLexer');
const Parser = require('../lib/RiScriptParser');

class LexParser {

  constructor() {
    this.lexer = null;
    this.parser = null;
    this.visitor = null;
  }

  lex(input, context, showTokens) {

    // create the lexer
    let stream = new antlr4.InputStream(input);
    this.lexer = new Lexer.RiScriptLexer(stream);
    this.lexer.removeErrorListeners();
    this.lexer.addErrorListener(new LexerErrors());
    this.lexer.strictMode = false;

    // try the lexing
    let tokens;
    try {
      tokens = new antlr4.CommonTokenStream(this.lexer);
      if (showTokens) {
        tokens.fill();
        tokens.tokens.forEach(t => console.log(this.tokenToString(t))); //, lexer.rulesNames[t.type]));
        console.log();
      }
    } catch (e) {
      if (!context || !context._silent) {
        console.error(colors.red("LEXER: " + input + '\n' + e.message + "\n"));
      }
      throw e;
    }
    return tokens;
  }

  tokenToString(t) {
    let txt = (t.text && t.text.length) ?
      t.text.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t") :
      "<no text>";
    let type = (t.type > -1 ? this.lexer.symbolicNames[t.type] : 'EOF');
    return "[" + t.line + "." + t.column + ": '" + txt + "' -> " + type + "]";
    // return "[" + t.start + ":" + t.stop + "='" +
    //   txt + "',<" +t.type + ">" +
    //   (t.channel > 0 ? ",channel=" + t.channel : "") + "," +
    //   t.line + ":" + t.column + "]";
  }

  parse(tokens, input, context, showParse) {

    // create the parser
    this.parser = new Parser.RiScriptParser(tokens);
    this.parser.removeErrorListeners();
    this.parser.addErrorListener(new ParserErrors());
    //this.parser.addErrorListener(new ConsoleErrorListener());

    // try the parsing
    let tree;
    try {
      tree = this.parser.script();
    } catch (e) {
      if (!context || !context._silent) {
        console.error(colors.red("PARSER: " + input + '\n' + e.message + "\n"));
      }
      throw e;
    }
    if (showParse) console.log(tree.toStringTree(this.parser.ruleNames));

    return tree;
  }

  lexParse(input, context, showParse) {
    let tokens = this.lex(input, context, showParse);
    return this.parse(tokens, input, context, showParse);
  }

  createVisitor(context, showParse) {
    return new Visitor(context, this.lexer.symbolicNames, this.parser.ruleNames, showParse);
  }

  lexParseVisit(input, context, showParse) {
    let tree = this.lexParse(input, context, showParse);
    return this.createVisitor(context, showParse).start(tree);
  }

  lexParseVisitQuiet(input, context, showParse) {
    context = context || {};
    context._silent = true;
    return this.lexParseVisit(input, context, showParse);
  }
}

module.exports = LexParser;
