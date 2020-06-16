let prod = 0;
let RiTa = require(prod ? '../lib/rita' : '../src/rita');

require('fs').readFile('./legacy/pandemic.rs', 'utf-8', (e, data) => {
  if (e) throw e;
  let grammar = new RiTa.Grammar(data);
  let hrstart = process.hrtime();
  console.log("\n"+grammar.expand({ trace: 1, skipPreParse: 0 }));
  let hrend = process.hrtime(hrstart);
  console.info('\nExecution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
});

function remember(word) {
  gr.addRule("<remember>", word);
  return word;
}

function forget(rule) {
  gr.removeRule("<remember>");
  return rule;
}

/* Converter
  1. brackets
  2. parenthesize Ors
  3. transforms
*/
