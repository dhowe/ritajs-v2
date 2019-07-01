const antlr4 = require('antlr4');
const colors = require('colors');

const Errors = require('./errors');
const Visitor = require('./visitor');
const Lexer = require('./lib/RitaScriptLexer');
const Parser = require('./lib/RitaScriptParser');

let lex = function (input, context, showTokens) {

  // create the lexer
  let stream = new antlr4.InputStream(input);
  let lexer = new Lexer.RitaScriptLexer(stream);
  lexer.removeErrorListeners();
  lexer.addErrorListener(new Errors());
  lexer.strictMode = false;

  //console.log(Object.keys(lexer));

  // try the lexing
  let tokens;
  try {
    tokens = new antlr4.CommonTokenStream(lexer);
    if (showTokens) {
      tokens.fill();
      tokens.tokens.forEach(t => console.log(tokenToString(t, lexer))); //, lexer.rulesNames[t.type]));
      console.log();
    }
  } catch (e) {
    if (!context || !context._silent) {
      console.error(colors.red("LEXER: " + input + '\n' + e.message+"\n"));
    }
    throw e;
  }
  return tokens;
};

let tokenToString = function (t, r) {
  let txt = (t.text && t.text.length) ?
    t.text.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t") :
    "<no text>";
  let type = (t.type > -1 ? r.symbolicNames[t.type] : 'EOF');
  return "[" + t.line + "." + t.column + ": '" + txt + "' -> " + type + "]";
  // return "[" + t.start + ":" + t.stop + "='" +
  //   txt + "',<" +t.type + ">" +
  //   (t.channel > 0 ? ",channel=" + t.channel : "") + "," +
  //   t.line + ":" + t.column + "]";
};

let parse = function (tokens, input, context, showParse) {

  // create the parser
  let tree, parser = new Parser.RitaScriptParser(tokens);
  parser.removeErrorListeners();
  parser.addErrorListener(new Errors());

  console.log(parser.ruleNames);

  // try the parsing
  try {
    tree = parser.expr();
  } catch (e) {
    if (!context || !context._silent) {
      console.error(colors.red("PARSER: " + input + '\n' + e.message+"\n"));
    }
    throw e;
  }
  if (showParse) console.log(tree.toStringTree(parser.ruleNames));

  return tree;
};

let lexParse = function (input, context, showParse) {
  let tokens = lex(input, context, showParse);
  return parse(tokens, input, context, showParse);
};

let lexParseVisit = function (input, context, showParse) {
  let tree = lexParse(input, context, showParse)
  return new Visitor(context).start(tree);
};

let lexParseVisitQuiet = function (input, context, showParse) {
  context = context || {};
  context._silent = true;
  return lexParseVisit(input, context, showParse);
};

module.exports.lex = lex;
module.exports.parse = parse;
module.exports.lexParse = lexParse;
module.exports.lexParseVisit = lexParseVisit;
module.exports.lexParseVisitQuiet = lexParseVisitQuiet;
