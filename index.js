const antlr4 = require('antlr4');
const { lex, parse } = require('./parser');

let input = 'The (good | $adj |) man ate.';
let context = { adj: 'bad' }
let runs = 100000;

console.log('Input:\n' + input + '\n\nTokens:');

let tokens = lex(input, context, true);

console.log('Tree:');
let tree = parse(tokens, input, context, true);

if (tree) {
  console.log('\nOutput: [' + runs + ']');
  try {
    let results = {};
    let visitor = new(require('./visitor'))();
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
