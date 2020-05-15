if (module) {
  RiTa = require('../../lib/rita.js');
  bigrams = require('./bigrams');
}

// create a model from bigram data
rm = new RiTa.Markov(2);
bigrams.forEach(bi => {
  let pair = bi[0], count = bi[1];
  if (count > 100000000) rm.root.addChild(pair[0], count)
      .addChild(pair[1], count);
});

// generate with a range of temps
for (var i = 0; i < 11; i++) {
  let t = Math.floor(i / 10 * 10) / 10;
  console.log(t.toFixed(1), rm.generateTokens(100,
    { temperature: t }).reduce((acc, cur) => acc += cur));
}
