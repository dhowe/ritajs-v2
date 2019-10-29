const expect = require('chai').expect;
const RiTa = require('../src/rita_api');
const Markov = require('../src/markov');

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

  it('should correctly call generateTokens.mlm', () => {


    let rm = new Markov(2);
    let mlms = 4, start = 'The';
    let txt = "The young boy ate it. The fat boy gave up.";

    rm.loadTokens(RiTa.tokenize(txt));

    for (let i = 0; i < 5; i++) {

      toks = rm.generateTokens(4, { startToken: start, maxLengthMatch: mlms });
      if (!toks || !toks.length) {
        ok("failed!");
        return;
      }

      //console.log("Gen #"+i, toks);

      // All sequences of len=N must be in text
      for (let j = 0; j <= toks.length - rm.n; j++) {

        //console.log(j, toks.slice(j, j + rm.n));
        part = toks.slice(j, j + rm.n);
        res = RiTa.untokenize(part);
        //console.log(j, res);
        ok(txt.indexOf(res) > -1);
      }

      //console.log("-------------------\n"+txt);

      // All sequences of len=mlms must NOT  be in text
      for (let j = 0; j <= toks.length - mlms; j++) {

        //console.log(j, toks.slice(j, j + mlms));
        part = toks.slice(j, j + mlms);
        res = RiTa.untokenize(part);
        //console.log(j + '  ', part, "-> " + (txt.indexOf(res) < 0 ? "OK" : "FAIL"));
        ok(txt.indexOf(res) < 0);
        ok(res.startsWith("The fat boy ate") || res.startsWith("The young boy gave"));
      }
    }
  });

  /*it('should correctly call generateSentence', () => {

    let rm = new Markov(4), s;
    rm.loadSentences(RiTa.sentences(sample));
    for (let i = 0; i < 5; i++) {
      s = rm.generateSentence({ minTokens: (3 + i), maxTokens: (10 + i) });
      //console.log(i+") "+s);
      ok(s && s[0] === s[0].toUpperCase(), "FAIL: bad first char in '" + s + "'");
      ok(s.match(/[!?.]$/), "FAIL: bad last char in '" + s + "'");
      let num = RiTa.tokenize(s).length;
      ok(num >= i && num <= 10 + i);
    }

    for (let i = 0; i < 5; i++) {
      s = rm.generateSentence({ startToken: 'One' });
      ok(s.startsWith('One'));
    }
  });

  it('should correctly call generateSentences', () => {

    let rm = new Markov(4);
    let minToks = 7;
    let maxToks = 15;

    rm.loadSentences(RiTa.sentences(sample));

    let s, start, num, arr;
    let sents = rm.generateSentences(5, { minTokens: minToks, maxTokens: maxToks });
    eq(sents.length, 5);
    for (i = 0; i < sents.length; i++) {
      s = sents[i];
      eq(s[0], s[0].toUpperCase()); // "FAIL: bad first char in '" + s + "' -> " + s[0]);
      ok(s.match(/[!?.]$/)); //, "FAIL: bad last char in '" + s + " -> " + s[s.length - 1]);
      num = RiTa.tokenize(s).length;
      ok(num >= minToks && num <= maxToks);
    }

    start = 'Achieving';
    for (i = 0; i < 5; i++) {
      arr = rm.generateSentences(1, { startToken: start });
      ok(arr);
      eq(arr.length, 1);
      ok(arr[0].startsWith(start));
    }

    start = 'I';
    for (i = 0; i < 5; i++) {
      arr = rm.generateSentences(2, { startToken: start });
      ok(arr);
      eq(arr.length, 2);
      ok(arr[0].startsWith(start));
    }
  });*/

  it('should correctly call generateTokens', () => {

    let toks, res, rm = new Markov(4);
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

  it('should correctly call generateTokens(str)', () => {

    let toks, res, rm = new Markov(4);
    rm.loadTokens(RiTa.tokenize(sample));
    for (i = 0; i < 10; i++) {
      toks = rm.generateTokens(4, { startToken: "I" });
      eq(toks.length, 4);
      eq(toks[0], "I");

      res = RiTa.untokenize(toks);
      //console.log(i, res);
      ok(sample.indexOf(res) > -1);
    }
  });

  it('should correctly call generateUntil', () => {

    let rm = new Markov(3);
    rm.loadTokens(RiTa.tokenize(sample));

    for (let i = 0; i < 20; i++) {
      let arr = rm.generateUntil('[\.\?!]', 4, 20);
      let res = RiTa.untokenize(arr);

      //console.log(i+","+res);
      ok(arr.length >= 4 && arr.length <= 20, res +
        '  (length=' + arr.length + ")");

      let n = rm.n;
      for (let j = 0; j < arr.length - n; j++) {
        partial = arr.slice(j, j + n);
        //console.log(partial);
        partial = RiTa.untokenize(partial);
        ok(sample.indexOf(partial) > -1, partial)
      }
    }
  });

  it('should correctly call getCompletions', () => {
    //TODO:

    let rm = new Markov(4);
    rm.loadTokens(RiTa.tokenize(sample));

    let res = rm.getCompletions("people lie is".split(' '));
    eql(res, ["to"]);

    res = rm.getCompletions("One reason people lie is".split(' '));
    eql(res, ["to"]);

    res = rm.getCompletions("personal power".split(' '));
    eql(res, ['.', 'is']);

    res = rm.getCompletions(['to', 'be', 'more']);
    eql(res, ['confident']);

    res = rm.getCompletions("I"); // testing the sort
    expec = ["did", "claimed", "had", "said", "could",
      "wanted", "also", "achieved", "embarrassed"
    ];
    eql(res, expec);

    res = rm.getCompletions("XXX");
    eql(res, []);

    ///////////////////// ///////////////////// /////////////////////

    rm = new Markov(4);
    rm.loadTokens(RiTa.tokenize(sample2));

    res = rm.getCompletions(['I'], ['not']);
    eql(res, ["did"]);

    res = rm.getCompletions(['achieve'], ['power']);
    eql(res, ["personal"]);

    res = rm.getCompletions(['to', 'achieve'], ['power']);
    eql(res, ["personal"]);

    res = rm.getCompletions(['achieve'], ['power']);
    eql(res, ["personal"]);

    res = rm.getCompletions(['I', 'did']);
    eql(res, ["not", "occasionally"]); // sort

    res = rm.getCompletions(['I', 'did'], ['want']);
    eql(res, ["not", "occasionally"]);
  });

  it('should correctly call getProbabilities', () => {

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

      res = rm.getProbabilities(checks[i]);
      //console.log(checks[i] + ":", res, expected[i]);
      eql(res, expected[i]);
    }
  });

  it('should correctly call getProbabilities.array', () => {

    let rm = new Markov(4);
    rm.loadTokens(RiTa.tokenize(sample2));

    let res = rm.getProbabilities("the".split(" "));
    let expec = {
      time: 0.5,
      party: 0.5
    };
    eql(res, expec);

    res = rm.getProbabilities("people lie is".split(" "));
    expec = {
      to: 1.0
    };
    eql(res, expec);

    res = rm.getProbabilities("is");
    expec = {
      to: 0.3333333333333333,
      '.': 0.3333333333333333,
      helpful: 0.3333333333333333
    };
    eql(res, expec);

    res = rm.getProbabilities("personal power".split(' '));
    expec = {
      '.': 0.5,
      is: 0.5
    };
    eql(res, expec);

    res = rm.getProbabilities(['to', 'be', 'more']);
    expec = {
      confident: 1.0
    };
    eql(res, expec);

    res = rm.getProbabilities("XXX");
    expec = {};
    eql(res, expec);

    res = rm.getProbabilities(["personal", "XXX"]);
    expec = {};
    eql(res, expec);

    res = rm.getProbabilities(['I', 'did']);
    expec = {
      "not": 0.6666666666666666,
      "occasionally": 0.3333333333333333
    };
    eql(res, expec);
  });

  it('should correctly call getProbability', () => {

    let tokens = RiTa.tokenize('the dog ate the boy the');
    let rm = new Markov(3);
    rm.loadTokens(tokens);
    //rm.print();

    eq(rm.getProbability("the"), .5);
    eq(rm.getProbability("dog"), 1 / 6);
    eq(rm.getProbability("cat"), 0);

    tokens = RiTa.tokenize('the dog ate the boy that the dog found.');
    rm = new Markov(3);
    rm.loadTokens(tokens);
    //rm.print();

    eq(rm.getProbability("the"), .3);
    eq(rm.getProbability("dog"), .2);
    eq(rm.getProbability("cat"), 0);

    rm = new Markov(3);
    rm.loadTokens(RiTa.tokenize(sample));
    eq(rm.getProbability("power"), 0.017045454545454544);
  });

  it('should correctly call getProbability.array', () => {


    let rm = new Markov(3);
    rm.loadTokens(RiTa.tokenize(sample));

    let check = 'personal power is'.split(' ');
    eq(rm.getProbability(check), 1 / 3);

    check = 'personal powXer is'.split(' ');
    eq(rm.getProbability(check), 0);

    check = 'someone who pretends'.split(' ');
    eq(rm.getProbability(check), 1 / 2);

    eq(rm.getProbability([]), 0);
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
    eq(rm.getProbability("The"), 0.2);

    rm = new Markov(3);
    rm.loadTokens(words);
    eq(rm.getProbability("dog"), 0.2);

    rm = new Markov(3);
    rm.loadTokens(words);
    eq(rm.getProbability("Dhe"), 0);

    rm = new Markov(3);
    rm.loadTokens(words);
    eq(rm.getProbability("Dog"), 0);

    rm = new Markov(3);
    rm.loadTokens(words);
    eq(rm.getProbability(""), 0);

    rm = new Markov(3);
    rm.loadTokens(words);
    eq(rm.getProbability(" "), 0);

    rm2 = new Markov(3);
    rm2.loadTokens(RiTa.tokenize(sample));
    ok(rm2.getProbability("One") !== rm.getProbability("one"));
  });

  it('should correctly call toString', () => {

    let rm = new Markov(4);
    let exp = "ROOT { The [1,p=0.200] dog [1,p=0.200] ate [1,p=0.200] the [1,p=0.200] cat [1,p=0.200] }";
    rm.loadTokens('The dog ate the cat'.split(' '));
    eq(exp, rm.toString().replace(/\n/g, " ").replace(/\s+/g, " "));
  });

  it('should correctly call size', () => {
    let tokens = RiTa.tokenize(sample);
    let sents = RiTa.sentences(sample);

    let rm = new Markov(3);
    rm.loadTokens(tokens);
    eq(rm.size(), tokens.length);
  });

  function eql(a, b) { expect(a).eql(b); }
  function eq(a, b) { expect(a).eq(b); }
  function ok(res) { expect(res).eq(true); }
});
