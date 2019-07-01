const antlr4 = require('antlr4');
const Visitor = require('./visitor');
const LexParser = require('./lexparser');

let input = 'The ((boy).ucf() | (girl | woman).toUpperCase())';
let context = { adj: 'bad' };
let runs = 1000;

console.log('\nInput:\n' + input + '\n\nTokens:');

let parser = new LexParser();
let tokens = parser.lex(input, context, true);

console.log('Tree:');
let tree = parser.parse(tokens, input, context, true);

if (tree) {
  console.log('\nOutput: [' + runs + ']');
  try {
    let results = {};
    let visitor = new Visitor();
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
