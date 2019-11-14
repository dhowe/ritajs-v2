const expect = require('chai').expect;
const RiTa = require('../src/rita_api');
const Markov = require('../src/markov');

//next: generateSentences with start tokens, then temp

describe('RiTa.Markov', () => {

  sample = "One reason people lie is to achieve personal power. Achieving personal power is helpful for one who pretends to be more confident than he really is. For example, one of my friends threw a party at his house last month. He asked me to come to his party and bring a date. However, I did not have a girlfriend. One of my other friends, who had a date to go to the party with, asked me about my date. I did not want to be embarrassed, so I claimed that I had a lot of work to do. I said I could easily find a date even better than his if I wanted to. I also told him that his date was ugly. I achieved power to help me feel confident; however, I embarrassed my friend and his date. Although this lie helped me at the time, since then it has made me look down on myself.";

  sample2 = "One reason people lie is to achieve personal power. Achieving personal power is helpful for one who pretends to be more confident than he really is. For example, one of my nodesfriends threw a party at his house last month. He asked me to " + "come to his party and bring a date. However, I did not have a " + "girlfriend. One of my other friends, who had a date to go to the " + "party with, asked me about my date. I did not want to be embarrassed, " + "so I claimed that I had a lot of work to do. I said I could easily find" + " a date even better than his if I wanted to. I also told him that his " + "date was ugly. I achieved power to help me feel confident; however, I " + "embarrassed my friend and his date. Although this lie helped me at the " + "time, since then it has made me look down on myself. After all, I did " + "occasionally want to be embarrassed.";

  sample3 = "One reason people lie is to achieve personal power. One reason people fly is wings. One reason people lie was for fun. One reason people lie is for sport. One ton people lie for the sport. One reason people lie could be for games. One reason people lie would be for games.";

  it('should correctly call Markov', () => {
    ok(typeof new Markov(3) !== 'undefined');
  });

  it('should correctly call loadTokens', () => {
    let rm, txt;
    rm = new Markov(4);
    txt = "The young boy ate it. The fat boy gave up.";
    rm.loadTokens(RiTa.tokenize(txt));
    eq(txt, RiTa.untokenize(rm.input));
  });

  it('should correctly call initSentence', () => {
    let rm, txt;
    rm = new Markov(4);
    txt = "The young boy ate it. The fat boy gave up.";
    rm.loadSentences(txt);
    let toks = rm._initSentence();
    eq(toks.length, 1);
    eq(toks[0].token, 'The');
  });

  0 && it('should correctly call initSentence.start', () => {
    let rm, txt;
    rm = new Markov(4);
    txt = "The young boy ate it. The fat boy gave up.";
    rm.loadSentences(txt);
    let toks = rm._initSentence();
    eq(toks.length, 1);
    eq(toks[0].token, 'The');
  });


  0 && it('should correctly call initSentence.startArray', () => {
    let rm, txt;
    rm = new Markov(4);
    txt = "The young boy ate it. The fat boy gave up.";
    rm.loadSentences(txt);
    let toks = rm._initSentence();
    eq(toks.length, 1);
    eq(toks[0].token, 'The');
  });

  // TODO:
  0&&it('should correctly call generateTokens.temp', () => {
    let rm, txt;
    rm = new Markov(1);
    txt = "aaaabbbccd";
    rm.loadTokens(Array.from(txt));
    //console.log(rm.toString());
    let res = rm.generateTokens(10000, { temp: 0 });
    let dist = {};
    for (var i = 0; i < res.length; i++) {
      if (!dist[res[i]]) dist[res[i]] = 0;
      dist[res[i]]++;
    }
    let keys = Object.keys(dist).sort(function(a, b) { return dist[b] - dist[a] });
    keys.forEach(k => console.log(k, dist[k] / 10000));
  });

  it('should correctly call generateTokens', () => {
    let toks, res, rm, txt;

    rm = new Markov(4);
    txt = "The young boy ate it. The fat boy gave up.";

    rm.loadTokens(RiTa.tokenize(txt));

    for (let i = 0; i < 5; i++) {

      toks = rm.generateTokens(4);
      if (!toks || !toks.length) throw Error('no tokens');

      // All sequences of len=N must be in text
      for (let j = 0; j <= toks.length - rm.n; j++) {
        part = toks.slice(j, j + rm.n);
        res = RiTa.untokenize(part);
        ok(txt.indexOf(res) > -1);
      }
      return;
    }


    rm = new Markov(4);
    rm.loadTokens(RiTa.tokenize(sample));
    for (i = 0; i < 10; i++) {
      toks = rm.generateTokens(4);
      res = RiTa.untokenize(toks);
      eq(toks.length, 4);
      ok(sample.indexOf(res) > -1);
    }

    rm = new Markov(4);
    rm.loadTokens(RiTa.tokenize(sample));
    for (i = 0; i < 10; i++) {
      toks = rm.generateTokens(20);
      res = RiTa.untokenize(toks);
      eq(toks.length, 20);
      //console.log(i, res);
    }
  });

  it('should correctly call generateTokens.mlm', () => {
    let rm = new Markov(2), mlms = 3;
    let txt = "The young boy ate it! The old boy ran away.";
    // example: The young girl ate,
    rm.loadTokens(RiTa.tokenize(txt));
    //console.log(rm.toString());
    for (let i = 0; i < 5; i++) {

      let toks = rm.generateTokens(4, { maxLengthMatch: mlms, startTokens: 'The' });
      //console.log(i, RiTa.untokenize(toks));

      // All sequences of len=N must be in text
      for (let j = 0; j <= toks.length - rm.n; j++) {
        let part = toks.slice(j, j + rm.n);
        let res = RiTa.untokenize(part);
        ok(txt.indexOf(res) > -1);
      }

      // All sequences of len=mlms+1 must NOT  be in text
      for (let j = 0; j <= toks.length - (mlms + 1); j++) {
        let part = toks.slice(j, j + (mlms + 1));
        let res = RiTa.untokenize(part);
        ok(txt.indexOf(res) < 0, '"' + res + '" found in text!');
      }
    }

    // TODO: add more
  });

  it('should correctly call generateTokens.start', () => {

    let rm, start, txt;

    rm = new Markov(2);
    start = "The";
    txt = "The young boy ate it. The fat boy gave up.";

    rm.loadTokens(RiTa.tokenize(txt));

    for (let i = 0; i < 1; i++) {

      toks = rm.generateTokens(4, { startTokens: start });
      //console.log(i, toks);
      if (!toks || !toks.length) throw Error('no tokens');

      let joined = RiTa.untokenize(toks);
      ok(joined.startsWith("The young") || joined.startsWith("The fat"));
    }
  });

  it('should correctly call generateTokens.startArray', () => {

    let rm, start, txt;

    rm = new Markov(2);
    start = ["The"];
    txt = "The young boy ate it. The fat boy gave up.";

    rm.loadTokens(RiTa.tokenize(txt));

    for (let i = 0; i < 5; i++) {

      toks = rm.generateTokens(4, { startTokens: start });
      //console.log(i, toks);
      if (!toks || !toks.length) throw Error('no tokens');

      // All sequences of len=N must be in text
      for (let j = 0; j <= toks.length - rm.n; j++) {
        part = toks.slice(j, j + rm.n);
        res = RiTa.untokenize(part);
        ok(txt.indexOf(res) > -1);
      }

      let joined = RiTa.untokenize(toks);
      ok(joined.startsWith("The young") || joined.startsWith("The fat"));
    }

    rm = new Markov(3);
    start = ["The", "young"];
    txt = "The young boy ate it. The young girl gave up.";

    rm.loadTokens(RiTa.tokenize(txt));

    for (let i = 0; i < 5; i++) {

      toks = rm.generateTokens(4, { startTokens: start });
      //console.log(i, toks);
      if (!toks || !toks.length) throw Error('no tokens');

      // All sequences of len=N must be in text
      for (let j = 0; j <= toks.length - rm.n; j++) {
        part = toks.slice(j, j + rm.n);
        res = RiTa.untokenize(part);
        ok(txt.indexOf(res) > -1);
      }

      let joined = RiTa.untokenize(toks);
      ok(joined.startsWith("The young"));
    }
  });

  it('should correctly call generateTokens.start', () => {

    let toks, res;

    let rm = new Markov(2);
    let start = "The";
    let txt = "The young boy ate it. The fat boy gave up.";

    rm.loadTokens(RiTa.tokenize(txt));

    for (let i = 0; i < 5; i++) {

      toks = rm.generateTokens(4, { startTokens: start });
      if (!toks || !toks.length) throw Error('no tokens');

      // All sequences of len=N must be in text
      for (let j = 0; j <= toks.length - rm.n; j++) {
        part = toks.slice(j, j + rm.n);
        res = RiTa.untokenize(part);
        ok(txt.indexOf(res) > -1);
      }

      let joined = RiTa.untokenize(toks);
      ok(joined.startsWith("The fat boy") || joined.startsWith("The young boy"));
    }

    rm = new Markov(4);
    rm.loadTokens(RiTa.tokenize(sample));
    for (i = 0; i < 10; i++) {
      toks = rm.generateTokens(4, { startTokens: "I" });
      eq(toks.length, 4);
      eq(toks[0], "I");

      res = RiTa.untokenize(toks);
      //console.log(i, res);
      ok(sample.indexOf(res) > -1);
    }
  });

  it('should correctly call generateTokens.mlm.start', () => {
    let rm = new Markov(2);
    let mlms = 4, start = "The";
    let txt = "The young boy ate it. The fat boy gave up.";

    rm.loadTokens(RiTa.tokenize(txt));

    for (let i = 0; i < 5; i++) {

      toks = rm.generateTokens(4, { startTokens: start, maxLengthMatch: mlms });
      if (!toks || !toks.length) throw Error('no tokens');

      // All sequences of len=N must be in text
      for (let j = 0; j <= toks.length - rm.n; j++) {
        part = toks.slice(j, j + rm.n);
        res = RiTa.untokenize(part);
        ok(txt.indexOf(res) > -1);
      }

      // All sequences of len=mlms+1 must NOT  be in text
      for (let j = 0; j <= toks.length - (mlms + 1); j++) {
        part = toks.slice(j, j + (mlms + 1));
        res = RiTa.untokenize(part);
        ok(txt.indexOf(res) < 0);
        ok(res.startsWith("The fat boy ate") || res.startsWith("The young boy gave"));
      }
    }
  });


  it('should correctly call generateTokens.mlm.startArray', () => {
    let rm = new Markov(3);
    let mlms = 4, start = ["The", "young"];
    let txt = "The young boy ate it. A young boy gave up.";

    rm.loadTokens(RiTa.tokenize(txt));

    for (let i = 0; i < 5; i++) {

      toks = rm.generateTokens(4, { startTokens: start, maxLengthMatch: mlms });
      if (!toks || !toks.length) throw Error('no tokens');

      // All sequences of len=N must be in text
      for (let j = 0; j <= toks.length - rm.n; j++) {
        part = toks.slice(j, j + rm.n);
        res = RiTa.untokenize(part);
        ok(txt.indexOf(res) > -1);
      }

      // All sequences of len=mlms must NOT  be in text
      for (let j = 0; j <= toks.length - (mlms + 1); j++) {
        part = toks.slice(j, j + (mlms + 1));
        res = RiTa.untokenize(part);
        //console.log(j,res);
        ok(txt.indexOf(res) < 0);
        ok(res.startsWith("A young boy ate") || res.startsWith("The young boy gave"));
      }
    }
  });

  ////////////////////////////////////////////////////////////////////////

  it('should correctly call generateSentence', () => {

    let rm = new Markov(4);
    rm.loadSentences(RiTa.sentences(sample));
    for (let i = 0; i < 5; i++) {
      let s = rm.generateSentence();
      //console.log(i + ") " + s);
      ok(s && s[0] === s[0].toUpperCase(), "FAIL: bad first char in '" + s + "'");
      ok(/[!?.]$/.test(s), "FAIL: bad last char in '" + s + "'");
      let num = RiTa.tokenize(s).length;
      ok(num >= 5 && num <= 35 + i);
    }
  });


  it('should correctly call generateSentences.minmax', () => {

    let rm = new Markov(4), minLength = 7, maxLength = 20;

    rm.loadSentences(RiTa.sentences(sample));

    let sents = rm.generateSentences(5, { minLength: minLength, maxLength: maxLength });
    eq(sents.length, 5);
    for (i = 0; i < sents.length; i++) {
      let s = sents[i];
      eq(s[0], s[0].toUpperCase()); // "FAIL: bad first char in '" + s + "' -> " + s[0]);
      ok(/[!?.]$/.test(s), "FAIL: bad last char in '" + s + "'");
      let num = RiTa.tokenize(s).length;
      ok(num >= minLength && num <= maxLength);
    }

    rm = new Markov(4);
    rm.loadSentences(RiTa.sentences(sample));
    for (let i = 0; i < 5; i++) {
      minLength = (3 + i), maxLength = (10 + i);
      let s = rm.generateSentence({ minLength: minLength, maxLength: maxLength });
      //console.log(i+") "+s);
      ok(s && s[0] === s[0].toUpperCase(), "FAIL: bad first char in '" + s + "'");
      ok(/[!?.]$/.test(s), "FAIL: bad last char in '" + s + "'");
      let num = RiTa.tokenize(s).length;
      ok(num >= minLength && num <= maxLength);
    }
  });


  if (false) {
    it('should correctly call generateSentence.start', () => {
      let rm = new Markov(4);
      rm.loadSentences(RiTa.sentences(sample));
      for (let i = 0; i < 5; i++) {
        s = rm.generateSentence({ startTokens: 'One' });
        //onsole.log(i + ") " + s);
        ok(s.startsWith('One'));
      }

      start = 'Achieving';
      for (i = 0; i < 5; i++) {
        arr = rm.generateSentences(1, { startTokens: start });
        eq(arr.length, 1);
        ok(arr[0].startsWith(start));
      }

      start = 'I';
      for (i = 0; i < 5; i++) {
        arr = rm.generateSentences(2, { startTokens: start });
        eq(arr.length, 2);
        ok(arr[0].startsWith(start));
      }
    });

    it('should correctly call generateSentence.startArray', () => {

      // start: one word
      let rm = new Markov(4);
      rm.loadSentences(RiTa.sentences(sample));
      start = ['One'];
      for (let i = 0; i < 5; i++) {
        s = rm.generateSentence({ startTokens: start });
        ok(s.startsWith(start[0]));
      }
      start = ['Achieving'];
      for (i = 0; i < 5; i++) {
        arr = rm.generateSentences(1, { startTokens: start });
        eq(arr.length, 1);
        ok(arr[0].startsWith(start[0]));
      }

      start = ['I'];
      for (i = 0; i < 5; i++) {
        arr = rm.generateSentences(2, { startTokens: start });
        eq(arr.length, 2);
        ok(arr[0].startsWith(start[0]));
      }

      // start: two words
      rm = new Markov(4);
      rm.loadSentences(RiTa.sentences(sample));
      start = ['One', 'reason'];
      for (let i = 0; i < 5; i++) {
        s = rm.generateSentence({ startTokens: start });
        ok(s.startsWith(start.join(' ')));
      }
      start = ['Achieving', 'personal'];
      for (i = 0; i < 5; i++) {
        arr = rm.generateSentences(1, { startTokens: start });
        eq(arr.length, 1);
        ok(arr[0].startsWith(start.join(' ')));
      }

      start = ['I', 'also'];
      for (i = 0; i < 5; i++) {
        arr = rm.generateSentences(2, { startTokens: start });
        eq(arr.length, 2);
        ok(arr[0].startsWith(start.join(' ')));
      }
    });
  }

  it('should correctly call generateUntil', () => {

    let rm = new Markov(3);
    rm.loadTokens(RiTa.tokenize(sample));

    for (let i = 0; i < 5; i++) {
      let arr = rm.generateUntil(/[.?!]/);
      let res = RiTa.untokenize(arr);

      //console.log(i+") "+res);
      ok(/[.?!]$/.test(res));
      let n = rm.n;
      for (let j = 0; j < arr.length - n; j++) {
        partial = arr.slice(j, j + n);
        //console.log(partial);
        partial = RiTa.untokenize(partial);
        ok(sample.indexOf(partial) > -1, partial)
      }
    }
  });

  it('should correctly call generateUntil.start', () => {

    let rm = new Markov(3), startTokens = "Achieving";
    rm.loadTokens(RiTa.tokenize(sample));

    for (let i = 0; i < 10; i++) {
      let arr = rm.generateUntil(/[.?!]/, { startTokens: startTokens });
      let res = RiTa.untokenize(arr);
      //console.log(i+") "+res);
      ok(/Achieving.*[.?!]$/.test(res));

      let n = rm.n;
      for (let j = 0; j < arr.length - n; j++) {
        partial = arr.slice(j, j + n);
        //console.log(partial);
        partial = RiTa.untokenize(partial);
        ok(sample.indexOf(partial) > -1, partial)
      }
    }
  });

  it('should correctly call generateUntil.startArray', () => {

    let rm = new Markov(3), startTokens = ["Achieving"];
    rm.loadTokens(RiTa.tokenize(sample));

    for (let i = 0; i < 5; i++) {
      let arr = rm.generateUntil(/[.?!]/, { startTokens: startTokens });
      let res = RiTa.untokenize(arr);
      //console.log(i+") "+res);
      ok(/Achieving.*[.?!]$/.test(res));

      let n = rm.n;
      for (let j = 0; j < arr.length - n; j++) {
        partial = arr.slice(j, j + n);
        //console.log(partial);
        partial = RiTa.untokenize(partial);
        ok(sample.indexOf(partial) > -1, partial)
      }
    }
  });

  it('should correctly call generateUntil.maxLength', () => {

    let rm = new Markov(3), maxLength = 3;
    rm.loadTokens(RiTa.tokenize(sample));

    let arr = rm.generateUntil(/[.?!]/, { maxLength: maxLength });
    let res = RiTa.untokenize(arr);

    //console.log(i + ") " + res);
    ok(arr.length <= maxLength, res + '  (length=' + arr.length + ")");
    ok(/[.?!]$/.test(res));

    let n = rm.n;
    for (let j = 0; j < arr.length - n; j++) {
      partial = arr.slice(j, j + n);
      //console.log(partial);
      partial = RiTa.untokenize(partial);
      ok(sample.indexOf(partial) > -1, partial);
    }

  });

  it('should correctly call generateUntil.minMaxLength', () => {

    let rm = new Markov(3), minLength = 6, maxLength = 10;
    rm.loadTokens(RiTa.tokenize(sample));

    for (let i = 0; i < 5; i++) {
      let arr = rm.generateUntil(/[.?!]/, { minLength: minLength, maxLength: maxLength });
      let res = RiTa.untokenize(arr);

      //console.log(i + ") " + res);
      ok(arr.length >= minLength && arr.length <= maxLength, res +
        '  (length=' + arr.length + ")");
      ok(/[.?!]$/.test(res));

      let n = rm.n;
      for (let j = 0; j < arr.length - n; j++) {
        partial = arr.slice(j, j + n);
        //console.log(partial);
        partial = RiTa.untokenize(partial);
        ok(sample.indexOf(partial) > -1, partial);
      }
    }
  });

  it('should correctly call generateUntil.start.minMaxLength', () => {

    let rm = new Markov(3), minLength = 6, maxLength = 10;
    rm.loadTokens(RiTa.tokenize(sample));

    for (let i = 0; i < 5; i++) {
      let arr = rm.generateUntil(/[.?!]/, { minLength: minLength, maxLength: maxLength, startTokens: 'Achieving' });
      let res = RiTa.untokenize(arr);

      //console.log(i + ") " + res);
      ok(arr.length >= minLength && arr.length <= maxLength, res + '  (length=' + arr.length + ")");
      ok(/Achieving.*[.?!]$/.test(res));

      let n = rm.n;
      for (let j = 0; j < arr.length - n; j++) {
        partial = arr.slice(j, j + n);
        //console.log(partial);
        partial = RiTa.untokenize(partial);
        ok(sample.indexOf(partial) > -1, partial);
      }
    }
  });

  it('should correctly call generateUntil.startArray.minMaxLength', () => {

    let rm = new Markov(3), minLength = 6, maxLength = 10;
    rm.loadTokens(RiTa.tokenize(sample));

    for (let i = 0; i < 5; i++) {
      let arr = rm.generateUntil(/[.?!]/, { minLength: minLength, maxLength: maxLength, startTokens: ['Achieving'] });
      let res = RiTa.untokenize(arr);

      //console.log(i + ") " + res);
      ok(arr.length >= minLength && arr.length <= maxLength, res + '  (length=' + arr.length + ")");
      ok(/Achieving.*[.?!]$/.test(res));

      let n = rm.n;
      for (let j = 0; j < arr.length - n; j++) {
        partial = arr.slice(j, j + n);
        //console.log(partial);
        partial = RiTa.untokenize(partial);
        ok(sample.indexOf(partial) > -1, partial);
      }
    }
  });


  it('should correctly call completions', () => {

    let rm = new Markov(4);
    rm.loadTokens(RiTa.tokenize(sample));

    let res = rm.completions("people lie is".split(' '));
    eql(res, ["to"]);

    res = rm.completions("One reason people lie is".split(' '));
    eql(res, ["to"]);

    res = rm.completions("personal power".split(' '));
    eql(res, ['.', 'is']);

    res = rm.completions(['to', 'be', 'more']);
    eql(res, ['confident']);

    res = rm.completions("I"); // testing the sort
    expec = ["did", "claimed", "had", "said", "could",
      "wanted", "also", "achieved", "embarrassed"
    ];
    eql(res, expec);

    res = rm.completions("XXX");
    eql(res, []);

    ///////////////////// ///////////////////// /////////////////////

    rm = new Markov(4);
    rm.loadTokens(RiTa.tokenize(sample2));

    res = rm.completions(['I'], ['not']);
    eql(res, ["did"]);

    res = rm.completions(['achieve'], ['power']);
    eql(res, ["personal"]);

    res = rm.completions(['to', 'achieve'], ['power']);
    eql(res, ["personal"]);

    res = rm.completions(['achieve'], ['power']);
    eql(res, ["personal"]);

    res = rm.completions(['I', 'did']);
    eql(res, ["not", "occasionally"]); // sort

    res = rm.completions(['I', 'did'], ['want']);
    eql(res, ["not", "occasionally"]);
  });

  it('should correctly call probabilities', () => {

    let rm = new Markov(3);
    rm.loadTokens(RiTa.tokenize(sample));

    let checks = ["reason", "people", "personal", "the", "is", "XXX"];
    let expected = [{
      people: 1.0
    }, {
      lie: 1
    }, {
      power: 1.0
    }, {
      time: 0.5,
      party: 0.5
    }, {
      to: 0.3333333333333333,
      '.': 0.3333333333333333,
      helpful: 0.3333333333333333
    }, {}];

    for (let i = 0; i < checks.length; i++) {

      res = rm.probabilities(checks[i]);
      //console.log(checks[i] + ":", res, expected[i]);
      eql(res, expected[i]);
    }
  });

  it('should correctly call probabilities.array', () => {

    let rm = new Markov(4);
    rm.loadTokens(RiTa.tokenize(sample2));

    let res = rm.probabilities("the".split(" "));
    let expec = {
      time: 0.5,
      party: 0.5
    };
    eql(res, expec);

    res = rm.probabilities("people lie is".split(" "));
    expec = {
      to: 1.0
    };
    eql(res, expec);

    res = rm.probabilities("is");
    expec = {
      to: 0.3333333333333333,
      '.': 0.3333333333333333,
      helpful: 0.3333333333333333
    };
    eql(res, expec);

    res = rm.probabilities("personal power".split(' '));
    expec = {
      '.': 0.5,
      is: 0.5
    };
    eql(res, expec);

    res = rm.probabilities(['to', 'be', 'more']);
    expec = {
      confident: 1.0
    };
    eql(res, expec);

    res = rm.probabilities("XXX");
    expec = {};
    eql(res, expec);

    res = rm.probabilities(["personal", "XXX"]);
    expec = {};
    eql(res, expec);

    res = rm.probabilities(['I', 'did']);
    expec = {
      "not": 0.6666666666666666,
      "occasionally": 0.3333333333333333
    };
    eql(res, expec);
  });

  it('should correctly call probability', () => {

    let tokens = RiTa.tokenize('the dog ate the boy the');
    let rm = new Markov(3);
    rm.loadTokens(tokens);
    //rm.print();

    eq(rm.probability("the"), .5);
    eq(rm.probability("dog"), 1 / 6);
    eq(rm.probability("cat"), 0);

    tokens = RiTa.tokenize('the dog ate the boy that the dog found.');
    rm = new Markov(3);
    rm.loadTokens(tokens);
    //rm.print();

    eq(rm.probability("the"), .3);
    eq(rm.probability("dog"), .2);
    eq(rm.probability("cat"), 0);

    rm = new Markov(3);
    rm.loadTokens(RiTa.tokenize(sample));
    eq(rm.probability("power"), 0.017045454545454544);
  });

  it('should correctly call probability.array', () => {


    let rm = new Markov(3);
    rm.loadTokens(RiTa.tokenize(sample));

    let check = 'personal power is'.split(' ');
    eq(rm.probability(check), 1 / 3);

    check = 'personal powXer is'.split(' ');
    eq(rm.probability(check), 0);

    check = 'someone who pretends'.split(' ');
    eq(rm.probability(check), 1 / 2);

    eq(rm.probability([]), 0);
  });

  /*it('should correctly call loadSentences', () => {
    let rm = new Markov(4);
    let sents = RiTa.sentences(sample);
    let count = 0;
    for (i = 0; i < sents.length; i++) {
      let words = RiTa.tokenize(sents[i]);
      count += words.length;
    }
    rm.loadSentences(sents);
    eq(rm.size(), count);
  });*/

  it('should correctly call loadTokens', () => {
    //TODO: revise tests

    let words = 'The dog ate the cat'.split(' ');

    let rm = new Markov(3);
    rm.loadTokens(words);
    eq(rm.probability("The"), 0.2);

    rm = new Markov(3);
    rm.loadTokens(words);
    eq(rm.probability("dog"), 0.2);

    rm = new Markov(3);
    rm.loadTokens(words);
    eq(rm.probability("Dhe"), 0);

    rm = new Markov(3);
    rm.loadTokens(words);
    eq(rm.probability("Dog"), 0);

    rm = new Markov(3);
    rm.loadTokens(words);
    eq(rm.probability(""), 0);

    rm = new Markov(3);
    rm.loadTokens(words);
    eq(rm.probability(" "), 0);

    rm2 = new Markov(3);
    rm2.loadTokens(RiTa.tokenize(sample));
    ok(rm2.probability("One") !== rm.probability("one"));
  });

  it('should correctly call toString', () => {

    let rm = new Markov(2);
    let exp = "ROOT { 'The' [1,p=0.200] { 'dog' [1,p=1.000] } 'dog' [1,p=0.200] { 'ate' [1,p=1.000] } 'ate' [1,p=0.200] { 'the' [1,p=1.000] } 'the' [1,p=0.200] { 'cat' [1,p=1.000] } 'cat' [1,p=0.200] }";
    rm.loadTokens('The dog ate the cat'.split(' '));
    //console.log(rm.toString().replace(/\n/g, " ").replace(/\s+/g, " "));
    eq(exp, rm.toString().replace(/\n/g, " ").replace(/\s+/g, " "));
  });

  it('should correctly call size', () => {

    let tokens = RiTa.tokenize(sample);
    let rm = new Markov(3);
    rm.loadTokens(tokens);
    eq(rm.size(), tokens.length);
  });

  function eql(a, b, c) { expect(a).eql(b, c); }
  function eq(a, b, c) { expect(a).eq(b, c); }
  function ok(res, m) { expect(res).eq(true, m); }
});
