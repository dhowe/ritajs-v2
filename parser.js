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

  // try the lexing
  let tokens;
  try {
    tokens = new antlr4.CommonTokenStream(lexer);
    if (showTokens) {
      tokens.fill();
      tokens.tokens.forEach(t => console.log(t.toString(lexer)));
      console.log();
      //console.log(tokens.tokens[0].toString(lexer));
    }
  } catch (e) {
    if (!context || !context._silent)
      console.error('\n      ' + colors.red("LEXER: " + input));
    throw e;
  }
  return tokens;
};

let parse = function (tokens, input, context, showParse) {

  // create the parser
  let tree, parser = new Parser.RitaScriptParser(tokens);
  parser.removeErrorListeners();
  parser.addErrorListener(new Errors());

  // try the parsing
  try {
    tree = parser.script();
  } catch (e) {
    if (!context || !context._silent)
      console.error('\n      ' + colors.red("PARSER: " + input));
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
