// const expect = require('chai').expect;
// const RiTa = require('../src/rita_api');
// const Grammar = require('../src/grammar');


describe('RiTa.Grammar', () => {

  if (typeof module !== 'undefined') {
    RiTa = require('../src/rita');
    chai = require('chai');
    expect = chai.expect;
  }
  const Grammar = RiTa.Grammar;

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

  it('should correctly call constructor', () => {
    ok(typeof new Grammar() !== 'undefined');
  });

  it("should correctly call load", () => {

    let rg = new Grammar();
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
    let rg = new Grammar();
    rg.addRule("<start>", "<pet>");
    ok(typeof rg.rules["<start>"] !== 'undefined');
    ok(rg.hasRule("<start>"));
    rg.addRule("<start>", "<dog>", .3);
    ok(typeof rg.rules["<start>"] !== 'undefined');
    ok(rg.hasRule("<start>"));
  });

  it("should correctly call hasRule", () => {

    let g = [
      new Grammar(sentenceGrammarJSON),
      new Grammar(sentenceGrammarJSON2)
    ];

    for (let i = 0; i < g.length; i++) {

      let rg = g[i];
      ok(rg.hasRule("<start>"));
      ok(!rg.hasRule("start"));

      rg.reset();
      ok(!rg.hasRule("start"));
      rg.addRule("<rule1>", "<pet>");
      ok(rg.hasRule("<rule1>"));
      ok(!rg.hasRule("rule1"));

      rg.reset();

      rg.addRule("<rule1>", "cat", .4);
      rg.addRule("<rule1>", "dog", .6);
      rg.addRule("<rule1>", "boy", .2);
      ok(rg.hasRule("<rule1>"));
      ok(!rg.hasRule("rule1"));

      ok(!rg.hasRule("badname"));

      rg.reset();

      rg.addRule("rule1", "<pet>");
      ok(!rg.hasRule("<rule1>"));
      ok(rg.hasRule("rule1"));

      ok(!rg.hasRule(null));
      ok(!rg.hasRule(undefined));
      ok(!rg.hasRule(1));
    }
  });

  it("should correctly call removeRule", () => {
    let rg1 = new Grammar(sentenceGrammarJSON);

    ok(rg1.rules['<start>']);
    ok(rg1.rules['<noun_phrase>']);

    rg1.removeRule('<noun_phrase>');
    ok(!rg1.rules['<noun_phrase>']);

    rg1.removeRule('<start>');
    ok(!rg1.rules['<start>']);

    rg1.removeRule('');
    rg1.removeRule('bad-name');
    rg1.removeRule(null);
    rg1.removeRule(undefined);

    rg1 = new Grammar(sentenceGrammarJSON2);

    ok(rg1.rules['<start>']);
    ok(rg1.rules['<noun_phrase>']);

    rg1.removeRule('<noun_phrase>');
    ok(!rg1.rules['<noun_phrase>']);

    rg1.removeRule('<start>');
    ok(!rg1.rules['<start>']);

    rg1.removeRule('');
    rg1.removeRule('bad-name');
    rg1.removeRule(null);
    rg1.removeRule(undefined);
  });

  it("should correctly call expand", () => {

    let rg = new Grammar();
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


  it("should correctly call evaluate", () => {

    let rg = new Grammar();
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

    let rg = new Grammar();

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

    let rg = new Grammar();

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

  it("should correctly handle special characters", () => {
    let rg, res, s;

    s = "{ \"<start>\": \"hello &#124; name\" }";
    rg = new Grammar(s);
    res = rg.expand();
    //console.log(res);
    ok(res === "hello | name");

    s = "{ \"<start>\": \"hello: name\" }";
    rg = new Grammar(s);
    res = rg.expand();
    ok(res === "hello: name");

    s = "{ \"<start>\": \"&#8220;hello!&#8221;\" }";
    rg = new Grammar(s);

    s = "{ \"<start>\": \"&lt;start&gt;\" }";
    rg = new Grammar(s);
    res = rg.expand();
    //console.log(res);
    ok(res === "<start>");

    s = "{ \"<start>\": \"I don&#96;t want it.\" }";
    rg = new Grammar(s);
    res = rg.expand();
    //console.log(res);
    ok(res === "I don`t want it.");

    s = "{ \"<start>\": \"&#39;I really don&#39;t&#39;\" }";
    rg = new Grammar(s);
    res = rg.expand();
    ok(res === "'I really don't'");

    s = "{ \"<start>\": \"hello | name\" }";
    rg = new Grammar(s);
    for (let i = 0; i < 10; i++) {
      res = rg.expand();
      ok(res === "hello" || res === "name");
    }
  });

  it("should correctly call exec", () => {
    let temp = function() {
      return Math.random() < 0.5 ? 'hot' : 'cold';
    }
    let rg = new Grammar();
    rg.addRule("<start>", "<first> | <second>");
    rg.addRule("<first>", "the <pet> <action> were `temp()`");
    rg.addRule("<second>", "the <action> of the `temp()` <pet>");
    rg.addRule("<pet>", "<bird> | <mammal>");
    rg.addRule("<bird>", "hawk | crow");
    rg.addRule("<mammal>", "dog");
    rg.addRule("<action>", "cries | screams | falls");

    for (let i = 0; i < 10; i++) {
      let res = rg.expand();
      //console.log(res);
      ok(res && !res.match("`") && res.match(/(hot|cold)/));
    }

    let newruleg = {
      '<start>': 'The <noun> chased the `newrule("<noun>")`.',
      '<noun>': 'dog | cat | mouse',
      '<verb>': 'rhino'
    };

    let newrule = function(n) { // global: for exec testing
      return '<verb>';
    }

    rg = new Grammar(newruleg);

    for (let i = 0; i < 10; i++) {
      let res = rg.expand();
      //console.log(res);
      ok(res && res.match(/ chased the rhino\./g));
    }

    let newruleg2 = {
      '<start>': 'The <noun> chased the `staticFun()`.',
      '<noun>': 'dog | cat | mouse',
    };

    function staticFun() { // global: for exec testing
      return "rhino";
    }

    rg = new Grammar(newruleg2);
    for (let i = 0; i < 10; i++) {
      let res = rg.expand(staticFun);
      //console.log(res);
      ok(res && res.match(/ chased the rhino\./g));
    }

    newruleg2 = {
      '<start>': 'The <noun> chased the `RiTa.pluralize(\'<noun>\')`.',
      '<noun>': 'dog | cat | mouse',
    };

    rg = new Grammar(newruleg2);
    for (let i = 0; i < 10; i++) {
      let res = rg.expand();
      //console.log(res);
      ok(res && res.match(/(dogs|cats|mice)\./g));
    }
  });

  it("should correctly call exec with args", () => {

    let newrule = function(n) { return '<verb>'; }
    let adj = function(num) { return RiTa.randomWord("jj", num) };
    let getFloat = function() { return Math.random() };
    let isNumeric = function(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    let res, rg = new Grammar();

    rg.addRule("<start>", "`getFloat()`");
    for (let i = 0; i < 5; i++) {

      res = rg.expandFrom("<start>", this);
      //console.log(res);
      ok(res && res.length && isNumeric(res));
    }

    rg.reset();
    rg.addRule("<start>", "`adj(2)`");
    for (let i = 0; i < 5; i++) {

      res = rg.expandFrom("<start>", this);
      //console.log(res);
      ok(res && res.length && RiTa.isAdjective(res));
    }
  });

  function eql(a, b, c) { expect(a).eql(b, c); }
  function eq(a, b, c) { expect(a).eq(b, c); }
  function ok(res, m) { expect(res).to.not.be.undefined; }
});
