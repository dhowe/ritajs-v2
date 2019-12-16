
if (typeof module !== 'undefined') {
  RiTa = require('../../dist/rita-node.js');
  //bigrams = require('./bigrams');
}

class Generator {

  constructor(model, opts) {
    this.model = model;
    //this.pause = opts && opts.pause || 10;
    this.history = new HistoryQ(5); // joined tokens
    this.tokens = undefined; // rita-style tokens
    //this.words = undefined; // space-delimited
    this.complete = true;
    this.index = 0;
    this.temp = 0;
    this.reset(opts);
  }

  next({ temperature = 0 } = {}) {
    if (typeof temperature !== 'undefined' && this.temp !== temperature) {
      this.temp = temperature;
      // here we throw away the rest of the sentence
      // and regenerate it with the new temperature
//console.log('orig:', this.tokens);
      let first = this.tokens.splice(0, this.index);
//console.log('first:', first);
      let opts = { temperature: temperature, startTokens: first };
      let sent = this.model.generateUntil(/[/.!?]$/, opts);
      this.tokens = first.concat(...sent.slice(2));
//console.log('new:', this.tokens);
      this.history.add(JSON.stringify(this.tokens));
    }
    this.complete = this.index >= this.tokens.length - 1;
    return this.tokens[this.index++] || false;
  }

  done() {
    return this.complete;
  }

  reset({ temperature } = {}) {
    this.temp = temperature;
    //if (this.tokens) Object.assign(arguments[0], { startTokens: startTokens || this.tokens });
    this._processNewTokens(this.tokens = this._createSentence(...arguments));
  }

  _processNewTokens() {
    this.history.add(JSON.stringify(this.tokens));
    this.complete = false;
    this.index = 0;
  }

  _createSentence() {
    let next;
    while (!next || this.history.includes(JSON.stringify(next))) {
      try {
        next = this.model.generateSentenceTokens(...arguments);
      }
      catch (e) {
        delete arguments[0].startTokens; // recover with basic sentence
        next = this.model.generateSentenceTokens(...arguments);
      }
    }
    return next;
  }
}

class HistoryQ {
  constructor(sz) {
    this.q = [];
    this.capacity = sz;
  }
  add() {
    for (var i = 0; i < arguments.length; i++) {
      this.q.push(arguments[i]);
    }
    while (this.q.length > this.capacity) {
      this.q.shift();
    }
  }
  includes(w) {
    return this.q.includes(w);
  }
  newest() {
    return this.q[this.q.length - 1];
  }
  removeOldest() {
    return this.q.shift();
  }
  empty() {
    return this.q.length > 0;
  }
  oldest() {
    return this.q[0];
  }
  size() {
    return this.q.length;
  }
  indexOf(e) {
    return this.q.indexOf(e);
  }
  shorten(n) {
    while (this.q.length > n) {
      this.removeOldest();
    }
    return this;
  }
  clear() {
    this.q = [];
    return this;
  }
}

if (0) {

  let sample = "One reason people lie is to achieve personal power. Achieving personal power is helpful for one who pretends to be more confident than he really is. For example, one of my friends threw a party at his house last month. He asked me to come to his party and bring a date. However, I did not have a girlfriend. One of my other friends, who had a date to go to the party with, asked me about my date. I did not want to be embarrassed, so I claimed that I had a lot of work to do. I said I could easily find a date even better than his if I wanted to. I also told him that his date was ugly. I achieved power to help me feel confident; however, I embarrassed my friend and his date. Although this lie helped me at the time, since then it has made me look down on myself.";

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
}
