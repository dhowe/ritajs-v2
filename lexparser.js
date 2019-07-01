const antlr4 = require('antlr4');
const colors = require('colors');

const Errors = require('./errors');
const Visitor = require('./visitor');
const Lexer = require('./lib/RitaScriptLexer');
const Parser = require('./lib/RitaScriptParser');

class LexParser {

  constructor() {
    this.lexer = null;
    this.parser = null;
  }

  lex(input, context, showTokens) {

    // create the lexer
    let stream = new antlr4.InputStream(input);
    this.lexer = new Lexer.RitaScriptLexer(stream);
    this.lexer.removeErrorListeners();
    this.lexer.addErrorListener(new Errors());
    this.lexer.strictMode = false;

    //console.log(Object.keys(lexer));

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
    this.parser = new Parser.RitaScriptParser(tokens);
    this.parser.removeErrorListeners();
    this.parser.addErrorListener(new Errors());

    // try the parsing
    let tree;
    try {
      tree = this.parser.expr();
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

  lexParseVisit(input, context, showParse) {
    let tree = this.lexParse(input, context, showParse);
    //let Vis = require('./lib/RitaScriptVisitor');
    return new Visitor(context, this.lexer.symbolicNames, this.parser.ruleNames).start(tree);
  }

  lexParseVisitQuiet(input, context, showParse) {
    context = context || {};
    context._silent = true;
    return this.lexParseVisit(input, context, showParse);
  }
}

module.exports = LexParser;
