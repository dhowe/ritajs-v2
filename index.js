const antlr4 = require('antlr4');

const Errors = require('./errors');
const Lexer = require('./lib/RitaScriptLexer.js');
const Parser = require('./lib/RitaScriptParser.js');
const Visitor = require('./visitor.js');

let input = 'The (good | $adj |) man ate.';

let stream = new antlr4.InputStream(input);
let lexer = new Lexer.RitaScriptLexer(stream);
lexer.strictMode = false;

let tokens = new antlr4.CommonTokenStream(lexer);
let parser = new Parser.RitaScriptParser(tokens);
parser.removeErrorListeners();
parser.addErrorListener(new Errors());

let tree, runs = 100000, results = {};

console.log('Input: ', input, '[' + runs + ']');
tree = parser.script();

if (tree) {
  console.log(tree.toStringTree(parser.ruleNames));
  try {
    let visitor = new Visitor({ adj: 'bad' });
    for (var i = 0; i < runs; i++) {
      let output = visitor.start(tree);
      results[output] = results[output] ? results[output] + 1 : 1;
    }
    let keys = Object.keys(results).sort(); //(a, b) => results[b] - results[a]);
    keys.forEach(k => console.log('"' + k + '"', '[' + Math.round((results[k] / runs) * 100) + '%]'));
  } catch (err) {
    console.error(err);
  }
}
