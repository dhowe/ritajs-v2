const expect = require('chai').expect;
const RiTa = require('../src/rita_api');
const RiGrammar = require('../src/grammar');

describe('RiTa.Grammar', () => {

  let sentenceGrammarJSON = {
    "<start>": "<noun_phrase> <verb_phrase>.",
    "<noun_phrase>": "<determiner> <noun>",
    "<verb_phrase>": "<verb> | <verb> <noun_phrase> [.1]",
    "<determiner>": "a [.1] | the",
    "<noun>": "woman | man",
    "<verb>": "shoots"
  };

  let sentenceGrammarJSON2 = {
    "<start>": "<noun_phrase> <verb_phrase>.",
    "<noun_phrase>": "<determiner> <noun>",
    "<determiner>": ["a [.1]", "the"],
    "<verb_phrase>": ["<verb> <noun_phrase> [.1]", "<verb>"],
    "<noun>": ["woman", "man"],
    "<verb>": "shoots"
  };

  let sentenceGrammars = [sentenceGrammarJSON, sentenceGrammarJSON2];

  it('should correctly call constructor', () => {
    ok(typeof new RiGrammar() !== 'undefined');
  });

  it("should correctly call load", () => {

    let rg = new RiGrammar();
    ok(typeof rg.rules !== 'undefined');
    ok(typeof rg.rules['<start>'] === 'undefined');
    ok(typeof rg.rules['<noun_phrase>'] === 'undefined');

    rg.load(JSON.stringify(sentenceGrammarJSON));
    ok(typeof rg.rules !== 'undefined');
    ok(typeof rg.rules['<start>'] !== 'undefined');
    ok(typeof rg.rules['<noun_phrase>'] !== 'undefined');

    rg.load(JSON.stringify(sentenceGrammarJSON2));
    ok(typeof rg.rules !== 'undefined');
    ok(typeof rg.rules['<start>'] !== 'undefined');
    ok(typeof rg.rules['<noun_phrase>'] !== 'undefined');
  });

  it("should correctly call addRule", () => {
    let rg = new RiGrammar();
    rg.addRule("<start>", "<pet>");
    ok(typeof rg.rules["<start>"] !== 'undefined');
    ok(rg.hasRule("<start>"));
    rg.addRule("<start>", "<dog>", .3);
    ok(typeof rg.rules["<start>"] !== 'undefined');
    ok(rg.hasRule("<start>"));
  });

  it("should correctly call expand", () => {

    for (let j = 0; j < sentenceGrammars.length; j++) {
      let rg = new RiGrammar(sentenceGrammars[j]);
      //console.log(rg);
      for (let i = 0; i < 10; i++)
        ok(rg.expand());
    }

    let rg = new RiGrammar();
    rg.addRule("<start>", "pet");
    eq(rg.expand(), "pet");

    rg.addRule("<start>", "pet", 1);
    eq(rg.expand(), "pet");
    rg.addRule("<start>", "pet", 2);
    eq(rg.expand(), "pet");

    rg.reset();
    rg.addRule("<start>", "<pet>", 1);
    rg.addRule("<pet>", "dog", 1);
    eq(rg.expand(), "dog");

    /////////////////////////////////////////////////////////////////

    rg.reset();
    rg.addRule("<start>", "<rule1>", 1);
    rg.addRule("<rule1>", "cat", .4);
    rg.addRule("<rule1>", "dog", .6);
    rg.addRule("<rule1>", "boy", .2);
    ok(rg.hasRule("<rule1>"));

    let found1 = false,
      found2 = false,
      found3 = false;
    for (let i = 0; i < 100; i++) {
      let res = rg.expand();

      ok(res === ("cat") || res === ("dog") || res === ("boy"));

      if (res === ("cat"))
        found1 = true;
      else if (res === ("dog"))
        found2 = true;
      else if (res === ("boy"))
        found3 = true;
    }
    ok(found1 && found2 && found3); // found all

    /////////////////////////////////////////////////////////////////

    rg.reset();
    rg.addRule("<start>", "<rule1>", 1);
    rg.addRule("<rule1>", "cat | dog | boy");
    ok(rg.hasRule("<rule1>"));

    found1 = false;
    found2 = false;
    found3 = false;
    for (let i = 0; i < 100; i++) {
      let res = rg.expand();

      ok(res === ("cat") || res === ("dog") || res === ("boy"));

      if (res === ("cat"))
        found1 = true;
      else if (res === ("dog"))
        found2 = true;
      else if (res === ("boy"))
        found3 = true;
    }
    ok(found1 && found2 && found3); // found all

    /////////////////////////////////////////////////////////////////

    rg.reset();
    rg.addRule("<start>", "pet", 1);
    eq(rg.expand(), "pet");

    rg.reset();
    rg.addRule("<start>", "the <pet> ran.", 1);
    rg.addRule("<pet>", "dog", .7);
    for (let i = 0; i < 10; i++) {
      eq(rg.expand(), "the dog ran.");
    }

    rg.reset();
    rg.addRule("<start>", "the <pet>.", 1);
    rg.addRule("<pet>", "dog", .7);
    rg.addRule("<pet>", "cat", .3);

    let d = 0,
      c = 0;
    for (let i = 0; i < 100; i++) {
      let r = rg.expand();
      if (r === "the dog.")
        d++;
      if (r === "the cat.")
        c++;
    }
    ok(d > 50); // d + ""
    ok(d < 90); // d + ""
    ok(c > 10); // g + ""
    ok(c < 50); // g + ""
  });

  it("should correctly call expandFrom", () => {

    let rg = new RiGrammar();

    rg.reset();
    rg.addRule("<start>", "<pet>");
    rg.addRule("<pet>", "<bird> | <mammal>");
    rg.addRule("<bird>", "hawk | crow");
    rg.addRule("<mammal>", "dog");

    eq(rg.expandFrom("<mammal>"), "dog");

    for (let i = 0; i < 100; i++) {
      let res = rg.expandFrom("<bird>");
      ok(res === "hawk" || res === 'crow');
    }

    expect(function() {
      try {
        rg.expandFrom("wrongName")
      } catch (e) {
        throw e;
      }
    }).to.throw();

  });

  it("should correctly call expandFrom.weights", () => {

    let rg = new RiGrammar();

    rg.reset();
    rg.addRule("<start>", "<pet>");
    rg.addRule("<pet>", "<bird> [9] | <mammal>");
    rg.addRule("<bird>", "hawk");
    rg.addRule("<mammal>", "dog [2]");

    eq(rg.expandFrom("<mammal>"), "dog");

    let hawks = 0,
      dogs = 0;
    for (let i = 0; i < 100; i++) {
      let res = rg.expandFrom("<pet>");
      ok(res === "hawk" || res === 'dog');
      if (res == "dog") dogs++;
      if (res == "hawk") hawks++;
    }
    ok(hawks > dogs * 2);
  });

  function eql(a, b, c) { expect(a).eql(b, c); }
  function eq(a, b, c) { expect(a).eq(b, c); }
  function ok(res, m) { expect(res).to.not.be.undefined; }
});
