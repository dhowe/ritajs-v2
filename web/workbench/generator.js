let RiTa = require('../../dist/rita-node.js');


let sample = "One reason people lie is to achieve personal power. Achieving personal power is helpful for one who pretends to be more confident than he really is. For example, one of my friends threw a party at his house last month. He asked me to come to his party and bring a date. However, I did not have a girlfriend. One of my other friends, who had a date to go to the party with, asked me about my date. I did not want to be embarrassed, so I claimed that I had a lot of work to do. I said I could easily find a date even better than his if I wanted to. I also told him that his date was ugly. I achieved power to help me feel confident; however, I embarrassed my friend and his date. Although this lie helped me at the time, since then it has made me look down on myself.";


class Generator {

  constructor() {
    this.reset(...arguments);
  }
  next() {
    this.complete = this.index >= this.words.length - 1;
    return this.words[this.index++] || false;
  }
  done() {
    //console.log(this.complete);
    return this.complete;
  }
  reset() {
    this.words = generateSentenceTokens(...arguments);
    //console.log(RiTa.untokenize(this.words));
    this.length = this.words.length;
    this.complete = false;
    this.index = 0;
  }
}

let model = new RiTa.Markov(3);
model.loadTokens(RiTa.tokenize(sample));
let gen = new Generator({ minLength: 10 });
let i = 0;
while (!gen.done()) {
  console.log(i++, gen.next());
}

function generateSentenceTokens({ minLength = 5, maxLength = 25, temperature = 0 } = {}) {
  //console.log('generateSentenceTokens', minLength, maxLength, temperature);
  let words, tries = 0, fail = () => {
    //console.log('FAIL: ' + this._flatten(words));
    words = undefined;
    tries++;
  }
  while (tries < RiTa.Markov.MAX_GENERATION_ATTEMPTS) {
    words = words || [model.generateToken({ startTokens: /^[A-Z][a-z]*$/ })];
    let next = model.generateToken({ startTokens: words, temperature: temperature });
    words.push(next);
    if (/^[?!.]$/.test(next)) { // sentence-end?
      if (words.length < minLength) {
        fail(words);
        continue;
      }
      break; // success
    }
    if (words.length >= maxLength) fail(words);
  }
  return words;
}
