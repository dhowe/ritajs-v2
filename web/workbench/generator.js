
if (typeof module !== 'undefined') {
  RiTa = require('../../lib/rita.js');
  input = require('fs').readFileSync(require('path').resolve
    ('texts', 'warpeace-2000.txt')).toString('utf8');
}

class Generator {
  constructor(model, opts) {
    this.model = model;
    this.complete = false;
    this.tokens = new HistoryQ(this.model.n - 1).asArray();
    this.starts = opts && opts.startTokens ||
      Object.values(this.model.root.child('<s/>').children);
  }
  reset() {
    // TODO: NEXT: sentences after reset
    //this.complete = false;
  }
  done() {
    return this.complete;
  }
  next({ temp = 0 } = {}) {
    if (this.tokens.length) {
      let parent = this.model._findNode(this.tokens);
      if (!parent) throw Error('no path for: ' + this.tokens);
      let nodemap = this.model._computeProbs(parent, temp);
      let nodes = Object.keys(nodemap);
      let result, pTotal = 0, selector = Math.random();

      for (let i = 0; i < nodes.length; i++) {
        let next = nodes[i];
        pTotal += nodemap[next];
        if (selector < pTotal) {
          result = parent.children[next];
          break;
        }
      }
      // TODO: mlm

      this.tokens.push(result.token);
      this.complete = /^[.!?]$/.test(result.token); // minLength?
    }
    else {
      this.tokens.push(RiTa.randomItem(this.starts, s => s.token));
    }

    return this.tokens[this.tokens.length - 1];
  }
}


class GeneratorTake2 {
  constructor(model, opts) {
    this.start = /^[A-Z][a-z]*$/;
    this.end = /^[.!?]$/;
    this.model = model;
    this.queue = new HistoryQ(this.model.n - 1);
    this.reset(opts);
  }
  reset() {
    this.complete = false;
  }
  next() {
    let opts = arguments[0] || {};
    opts.startTokens = this.queue.size() ? this.queue.asArray() : this.start;
    let next = this.model.generateToken(opts);

    // try completions instead?

    this.queue.add(next);
    if (this.end.test(next)) {
      this.complete = true;
    }
    return next;
  }
  done() {
    return this.complete;
  }
}

class GeneratorTake1 {

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
  asArray() {
    return this.q;
  }
  push() {
    this.add(...arguments);
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

function cleanSentences(text) {
  let raw = text.replace(/[()“”"]/g, '').replace(/--[^.!?-]+--/g, '')
    .replace(/\.\.+/g, '.').replace(/--/g, '-').replace(/ *\* */g, ' ');
  let all = RiTa.sentences(raw).filter(s => RiTa.tokenize(s, ' ').length > 10);
  return all
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
else {
  let model = new RiTa.Markov(4);
  model.loadSentences(input);
  let gen = new Generator(model);
  let opts = {}, llen = 0;
  for (var i = 0; i < 5; i++) {
    while (!gen.done()) {
      let word = gen.next(opts);
      if (llen && !RiTa.isPunctuation(word)) {
        word = ' ' + word;
      }
      llen += word.length;
      if (llen > 80) {
        llen = 0;
        word += '\n';
      }
      process.stdout.write(word);
    }
    gen.reset(opts);
    process.stdout.write('\n');
  }

}
