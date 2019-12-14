
if (module) {
  RiTa = require('../../dist/rita-node.js');
  bigrams = require('./bigrams');
}

let sample = "One reason people lie is to achieve personal power. Achieving personal power is helpful for one who pretends to be more confident than he really is. For example, one of my friends threw a party at his house last month. He asked me to come to his party and bring a date. However, I did not have a girlfriend. One of my other friends, who had a date to go to the party with, asked me about my date. I did not want to be embarrassed, so I claimed that I had a lot of work to do. I said I could easily find a date even better than his if I wanted to. I also told him that his date was ugly. I achieved power to help me feel confident; however, I embarrassed my friend and his date. Although this lie helped me at the time, since then it has made me look down on myself.";

function HistoryQ(sz) {
  this.q = [];
  this.capacity = sz;
  this.add = function() {
    for (var i = 0; i < arguments.length; i++) {
      this.q.push(arguments[i]);
    }
    while (this.q.length > this.capacity) {
      this.q.shift();
    }
  };
  this.includes = function(w) {
    return this.q.indexOf(w) > -1;
  };
  this.newest = function() {
    return this.q[this.q.length - 1];
  };
  this.removeOldest = function() {
    return this.q.shift();
  };
  this.empty = function() {
    return this.q.length > 0;
  };
  this.oldest = function() {
    return this.q[0];
  };
  this.size = function() {
    return this.q.length;
  };
  this.indexOf = function(e) {
    return this.q.indexOf(e);
  };
  this.shorten = function(n) {
    while (this.q.length > n) {
      this.removeOldest();
    }
    return this;
  };
  this.clear = function() {
    this.q = [];
    return this;
  };
}

class Generator {

  constructor(model, opts) {
    this.model = model;
    //this.pause = opts && opts.pause || 10;
    this.history = new HistoryQ(5);
    this.reset(opts);
  }

  next({ minLength = 5, maxLength, temperature = 0 } = {}) {
    this.complete = this.index >= this.words.length - 1;
    return this.words[this.index++] || false;
  }

  done() {
    return this.complete;
  }

  reset({ minLength = 5, maxLength, temperature = 0 } = {}) {
    this.temperature = temperature;
    if (this.words) Object.assign(arguments[0], { startTokens: this.words });
    let next = this._create();
    this.history.add(next);
    this.words = next.split(/ +/);
    //console.log(RiTa.untokenize(this.words));
    this.length = this.words.length;
    this.complete = false;
    this.index = 0;
  }

  _create() {
    let next;
    while (!next || this.history.includes(next)) {
      //if (next) console.log('DUP: '+next);
      try {
        next = this.model.generateSentenceTokens(...arguments);
      }
      catch (e) {
        delete arguments[0].startTokens; // recover with basic sentence
        next = this.model.generateSentenceTokens(...arguments);
      }
      next = RiTa.untokenize(next);
    }
    if (!next) throw Error('Invalid state');
    return next;
  }
}

let model = new RiTa.Markov(4);
model.loadTokens(RiTa.tokenize(sample));
let llen = 0;
let opts = { minLength: 10 };
opts.temperature = 1;
let gen = new Generator(model, opts);
let next = () => {
  if (!gen.done()) {
    let word = gen.next(opts) + ' ';
    llen += word.length;
    if (llen > 80) {
      llen = 0;
      word += '\n';
    }
    process.stdout.write(word);
  }
  else {

    gen.reset(opts);
  }
  setTimeout(next, 10);
};
next();

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
