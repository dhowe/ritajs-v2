const expect = require('chai').expect;
const RiTa = require('../src/rita_api');
const Markov = require('../src/markov');

describe('RiTa.Markov', () => {

  let sample = "One reason people lie is to achieve personal power. Achieving personal power is helpful for one who pretends to be more confident than he really is. For example, one of my friends threw a party at his house last month. He asked me to come to his party and bring a date. However, I did not have a girlfriend. One of my other friends, who had a date to go to the party with, asked me about my date. I did not want to be embarrassed, so I claimed that I had a lot of work to do. I said I could easily find a date even better than his if I wanted to. I also told him that his date was ugly. I achieved power to help me feel confident; however, I embarrassed my friend and his date. Although this lie helped me at the time, since then it has made me look down on myself.";

  let sample2 = "One reason people lie is to achieve personal power. Achieving personal power is helpful for one who pretends to be more confident than he really is. For example, one of my nodesfriends threw a party at his house last month. He asked me to " + "come to his party and bring a date. However, I did not have a " + "girlfriend. One of my other friends, who had a date to go to the " + "party with, asked me about my date. I did not want to be embarrassed, " + "so I claimed that I had a lot of work to do. I said I could easily find" + " a date even better than his if I wanted to. I also told him that his " + "date was ugly. I achieved power to help me feel confident; however, I " + "embarrassed my friend and his date. Although this lie helped me at the " + "time, since then it has made me look down on myself. After all, I did " + "occasionally want to be embarrassed.";

  let sample3 = "One reason people lie is to achieve personal power. One reason people fly is wings. One reason people lie was for fun. One reason people lie is for sport. One ton people lie for the sport. One reason people lie could be for games. One reason people lie would be for games.";

  it('Should correctly call constructor', () => {
    rm = new Markov(3);
    ok(typeof rm !== 'undefined');
  });

  it('Should correctly call loadTokens', () => {
    let rm = new Markov(4);
    rm.loadTokens(RiTa.tokenize(sample));
    ok(rm.tokenCount > 100);
  });

  it('Should correctly call generateTokens', () => {

    let rm;

    rm = new Markov(4);
    rm.loadTokens(RiTa.tokenize(sample));
    let toks = rm.generateTokens(4);

    for (let i = 0; i < 10; i++) {
      let toks = rm.generateTokens(4);
      let res = RiTa.untokenize(toks);
      eq(toks.length, 4);
      ok(sample.indexOf(res) > -1);
    }

    rm = new Markov(4);
    rm.loadTokens(RiTa.tokenize(sample));
    for (let i = 0; i < 10; i++) {
      toks = rm.generateTokens(20);
      res = RiTa.untokenize(toks);
      eql(toks.length, 20);
      //console.log(i, res);
    }
  });

  it('Should correctly call generateTokens with string', () => {

    let toks, res, rm = new Markov(4);
    rm.loadTokens(RiTa.tokenize(sample));
    for (let i = 0; i < 10; i++) {
      toks = rm.generateTokens(4, { startToken: "I" });
      eq(toks.length, 4);
      eq(toks[0], "I");

      res = RiTa.untokenize(toks);
      //console.log(i, res);
      ok(sample.indexOf(res) > -1);
    }
  });

  it('Should correctly call generateUntil', () => {
return;
    let rm = new Markov(3);
    rm.loadTokens(RiTa.tokenize(sample));

    for (let i = 0; i < 20; i++) {
      let arr = rm.generateUntil('[\.\?!]', 4, 20);
      let res = RiTa.untokenize(arr);

      //console.log(i+","+res);
      ok(arr.length >= 4 && arr.length <= 20, res +
        '  (length=' + arr.length + ")");

      let n = rm.N;
      for (let j = 0; j < arr.length - n; j++) {
        let partial = arr.slice(j, j + n);
        //console.log(partial);
        partial = RiTa.untokenize(partial);
        ok(sample.indexOf(partial) > -1, partial)
      }
    }
  });
  function eql(a, b) { expect(a).eql(b); }
  function eq(a, b) { expect(a).eq(b); }
  function ok(res) { expect(res).eq(true); }
});
