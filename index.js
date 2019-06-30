const antlr4 = require('antlr4');

const RitaScriptLexer = require('./lib/RitaScriptLexer.js');
const RitaScriptParser = require('./lib/RitaScriptParser.js');

const Visitor = require('./visitor.js');

let input = 'The (good | $adj |) man ate.';

let stream = new antlr4.InputStream(input);
let lexer = new RitaScriptLexer.RitaScriptLexer(stream);
lexer.strictMode = false;

let tokens = new antlr4.CommonTokenStream(lexer);
let parser = new RitaScriptParser.RitaScriptParser(tokens);
parser._errHandler = new antlr4.error.BailErrorStrategy();

let tree, results = {};
try {
  console.log('Input: ', input);
  tree = parser.script();
  console.log(tree.toStringTree(parser.ruleNames));
} catch (err) {
  console.error(err);
}
if (tree) {
  try {
    const visitor = new Visitor({ adj: 'bad' });
    for (var i = 0; i < 100; i++) {
      const output = visitor.start(tree);
      results[output] = results[output] ? results[output] + 1 : 1;
    }
    let keys = Object.keys(results).sort((a, b) => results[b] - results[a]);
    keys.forEach(k => console.log('"'+k+'"', '[' + results[k] + '%]'));
  } catch (err) {
    console.error(err);
  }
}
