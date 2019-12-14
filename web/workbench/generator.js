
if (module) {
  RiTa = require('../../dist/rita-node.js');
  bigrams = require('./bigrams');
}


let sample = "One reason people lie is to achieve personal power. Achieving personal power is helpful for one who pretends to be more confident than he really is. For example, one of my friends threw a party at his house last month. He asked me to come to his party and bring a date. However, I did not have a girlfriend. One of my other friends, who had a date to go to the party with, asked me about my date. I did not want to be embarrassed, so I claimed that I had a lot of work to do. I said I could easily find a date even better than his if I wanted to. I also told him that his date was ugly. I achieved power to help me feel confident; however, I embarrassed my friend and his date. Although this lie helped me at the time, since then it has made me look down on myself.";

let lfreq = {
    "a": 8.167,
    "b": 1.492,
    "c": 2.782,
    "d": 4.253,
    "e": 12.702,
    "f": 2.228,
    "g": 2.015,
    "h": 6.094,
    "i": 6.966,
    "j": 0.153,
    "k": 0.772,
    "l": 4.025,
    "m": 2.406,
    "n": 6.749,
    "o": 7.507,
    "p": 1.929,
    "q": 0.095,
    "r": 5.987,
    "s": 6.327,
    "t": 9.056,
    "u": 2.758,
    "v": 0.978,
    "w": 2.360,
    "x": 0.150,
    "y": 1.974,
    "z": 0.074,
    " ": 20
};
let model = new RiTa.Markov(4);
model.loadTokens(RiTa.tokenize(sample));
model.print();
return;
let rm = new RiTa.Markov(1);
Object.keys(lfreq).forEach(l => {
  rm.root.addChild(l,Math.floor(lfreq[l]*1000));
});
//rm.print();
let st = rm.generateTokens(100).reduce((acc, cur) => acc+=cur, '');
//console.log(st);
//rm.generateTokens(100,{temperature:1}).map(t=>st+=t);
//console.log(st);

rm = new RiTa.Markov(2);
bigrams.forEach(bi => {
  let pair = bi[0];
  let count = bi[1];
  let node = rm.root;
  node = node.addChild(pair[0],count);
  node.addChild(pair[1], count);
});
//console.log(rm.toString());
//rm.generateTokens(100,{temperature:1}).map(t=>st+=t);

//rm.print(null,1);
//console.log(rm.generateTokens(100).reduce((acc, cur) => acc+=cur));
for (var i = 0; i < 11; i++) {
  let t = Math.floor(i/10*10)/10;
  console.log(t,rm.generateTokens(100,{temperature:t}).reduce((acc, cur) => acc+=cur));
}


//console.log(st);


return;

class Generator {

  constructor(model, opts) {
    this.model = model;
    this.reset(opts);
  }
  next({ minLength = 5, maxLength = 25, temperature = 0 } = {}) {
    if ((typeof minLength !== 'undefined' && minLength !== this.minLength) ||
      (typeof temperature !== 'undefined' && temperature !== this.temperature) ||
      (typeof maxLength !== 'undefined' && maxLength !== this.maxLength)) {
      this.reset(...arguments);
    }
    this.complete = this.index >= this.words.length - 1;
    return this.words[this.index++] || false;
  }
  done() {
    return this.complete;
  }
  reset({ minLength = 5, maxLength = 25, temperature = 0 } = {}) {
    //console.log('reset');
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.temperature = temperature;
    if (this.words) Object.assign(arguments[0], { startTokens: this.words });
    try {
      this.words = this.model.generateSentenceTokens(...arguments);
    }
    catch (e) {
      delete arguments[0].startTokens; // recover with basic sentence
      this.words = this.model.generateSentenceTokens(...arguments);
    }
    //console.log(RiTa.untokenize(this.words));
    this.length = this.words.length;
    this.complete = false;
    this.index = 0;
  }
}

// let model = new RiTa.Markov(4);
// model.loadTokens(RiTa.tokenize(sample));
//
// let opts = { minLength: 10 };
// let gen = new Generator(model, opts);
// let s = '';
// for (let j = 0; j < 5; j++) {
//   while (!gen.done()) {
//     let next = gen.next(opts);
//     s += (!s.length || RiTa.isPunctuation(next) ? '' : ' ') + next;
//   }
//   gen.reset(opts);
// }
// console.log(s);
