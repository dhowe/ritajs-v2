let dict = require("../src/rita_dict.js");
let words = Object.keys(dict), result = {};
let num = words.length, hits = 0;
words.forEach(w => {
  let pos = dict[w][1];
  if (pos !== 'POS') result[w] = dict[w];
  else hits++;
});

let str = JSON.stringify(result).replace(/\],/g,"],\n  ");
str = str.replace(/{/,"module && (module.exports = {\n  ").replace(/}/,"\n});");
require('fs').writeFile('./newdict.js', str, (err) => {
  if (err) return console.log(err);
  console.log('Pruned '+hits+" from "+num+" words, "+Object.keys(result).length+" remaining");
});

