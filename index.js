const antlr4 = require('antlr4');

const RitaScriptLexer = require('./lib/RitaScriptLexer.js');
const RitaScriptParser = require('./lib/RitaScriptParser.js');

const Visitor = require('./visitor.js');
//const ErrorListener = require('./error-listener.js');

const input = 'The (mouse | (cat | $dog|)) ate.'; // the (bone | mouse).';

const chars = new antlr4.InputStream(input);
const lexer = new RitaScriptLexer.RitaScriptLexer(chars);

lexer.strictMode = false; // do not use js strictMode

const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new RitaScriptParser.RitaScriptParser(tokens);

try {
  const tree = parser.script();
  //console.log(tree.toStringTree(parser.ruleNames));

  const visitor = new Visitor({ $dog: 'terrier' });

  let results = {};
  console.log('Input: ', input);
  for (var i = 0; i < 100; i++) {
    const output = visitor.start(tree);
     //console.log('#' + i + ':', output);
    results[output] = results[output] ? results[output]+1 : 1;
  }
  Object.keys(results).forEach(r => console.log(r, '['+results[r]+'%]'));

} catch (error) {
  console.error('Error: ', error);
}
