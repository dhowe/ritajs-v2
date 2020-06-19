let prod = 0;
let faker = require('./faker');
let RiTa = require(prod ? '../lib/rita' : '../src/rita');

require('fs').readFile('./legacy/pandemic.rs', 'utf-8', (e, data) => {
  if (e) throw e;
  console.log(faker.name.firstName() + " " + faker.name.lastName());
  
  let grammar = new RiTa.Grammar(data);
  grammar.addTransform('randomPerson', randomPerson);
  let hrstart = process.hrtime();
  console.log("\n"+grammar.expand({ trace: 1, skipPreParse: 0 }));
  let hrend = process.hrtime(hrstart);
  console.info('\nExecution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
});


function randomPerson(p) {
  console.log("RP");
  return faker.name.firstName() + " " + faker.name.lastName();
}

/* Converter
  1. brackets
  2. parenthesize Ors
  3. transforms
*/
