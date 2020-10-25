// const expect = require('chai').expect;
// const RiTa = require('../src/rita_api');

describe('RiTa.Conjugator', () => {

  if (typeof module !== 'undefined') require('./before');

  it('Should correctly call pastParticiple', () => {

    equal(RiTa.pastParticiple("sleep"), "slept");
    equal(RiTa.pastParticiple("withhold"), "withheld");

    equal(RiTa.pastParticiple("cut"), "cut");
    equal(RiTa.pastParticiple("go"), "gone");
    equal(RiTa.pastParticiple("swim"), "swum");
    equal(RiTa.pastParticiple("would"), "would");
    equal(RiTa.pastParticiple("might"), "might");
    equal(RiTa.pastParticiple("run"), "run");
    equal(RiTa.pastParticiple("speak"), "spoken");
    equal(RiTa.pastParticiple("break"), "broken");
    equal(RiTa.pastParticiple(""), "");

    // PROBLEMS
    equal(RiTa.pastParticiple("awake"), "awoken");
    equal(RiTa.pastParticiple("become"), "became");
    equal(RiTa.pastParticiple("drink"), "drunk");
    equal(RiTa.pastParticiple("plead"), "pled");
    equal(RiTa.pastParticiple("run"), "run");
    equal(RiTa.pastParticiple("shine"), "shone");

    // or shined
    equal(RiTa.pastParticiple("shrink"), "shrunk");

    // or shrunken
    equal(RiTa.pastParticiple("stink"), "stunk");
    equal(RiTa.pastParticiple("study"), "studied");
  });

  it('Should correctly call presentParticiple', () => {

    equal(RiTa.presentParticiple(""), "");
    equal(RiTa.presentParticiple("sleep"), "sleeping");
    equal(RiTa.presentParticiple("withhold"), "withholding");

    equal(RiTa.presentParticiple("cut"), "cutting");
    equal(RiTa.presentParticiple("go"), "going");
    equal(RiTa.presentParticiple("run"), "running");
    equal(RiTa.presentParticiple("speak"), "speaking");
    equal(RiTa.presentParticiple("break"), "breaking");
    equal(RiTa.presentParticiple("become"), "becoming");
    equal(RiTa.presentParticiple("plead"), "pleading");
    equal(RiTa.presentParticiple("awake"), "awaking");
    equal(RiTa.presentParticiple("study"), "studying");

    equal(RiTa.presentParticiple("lie"), "lying");
    equal(RiTa.presentParticiple("swim"), "swimming");
    equal(RiTa.presentParticiple("run"), "running");
    equal(RiTa.presentParticiple("dig"), "digging");
    equal(RiTa.presentParticiple("set"), "setting");
    equal(RiTa.presentParticiple("speak"), "speaking");
    equal(RiTa.presentParticiple("bring"), "bringing");
    equal(RiTa.presentParticiple("speak"), "speaking");

    equal(RiTa.presentParticiple("study "), "studying"); // trim
    equal(RiTa.presentParticiple(" study"), "studying"); // trim
  });

  it('Should correctly call conjugate vbd', () => {
    expect(RiTa.conjugate("go", {
      number: RiTa.SINGULAR,
      person: RiTa.FIRST_PERSON,
      tense: RiTa.PAST_TENSE
    })).eq("went");
    expect(RiTa.conjugate("run", {
      number: RiTa.SINGULAR,
      person: RiTa.FIRST_PERSON,
      tense: RiTa.PAST_TENSE
    })).eq("ran");
  });

  it('Should correctly call conjugate', () => {
    let args, s, a;

    equal("swum", RiTa.pastParticiple("swim"));

    equal(RiTa.conjugate("be", { form: RiTa.GERUND, }), "being");

    s = ["swim", "need", "open"];
    a = ["swims", "needs", "opens"];

    args = {
      tense: RiTa.PRESENT_TENSE,
      number: RiTa.SINGULAR,
      person: RiTa.THIRD_PERSON
    };

    expect(() => RiTa.conjugate(args)).to.throw;
    expect(() => RiTa.conjugate("", args)).to.throw;


    for (let i = 0; i < s.length; i++) {
      let c = RiTa.conjugate(s[i], args);
      equal(c, a[i]);
    }

    args = {
      tense: RiTa.PRESENT_TENSE,
      number: RiTa.SINGULAR,
      person: RiTa.THIRD_PERSON,
      passive: true
    };

    a = ["is swum", "is needed", "is opened"];
    for (let i = 0; i < s.length; i++) {
      equal(RiTa.conjugate(s[i], args), a[i]);
    }

    args = {
      number: RiTa.SINGULAR,
      person: RiTa.FIRST_PERSON,
      tense: RiTa.PAST_TENSE
    };

    equal(RiTa.conjugate("swim", args), "swam");

    s = ["swim", "need", "open"];
    a = ["swam", "needed", "opened"];

    ok(a.length === s.length);

    for (let i = 0; i < s.length; i++) {
      let c = RiTa.conjugate(s[i], args);
      equal(c, a[i]);
    }

    args = {
      number: RiTa.PLURAL,
      person: RiTa.SECOND_PERSON,
      tense: RiTa.PAST_TENSE
    };

    a = ["swam", "needed", "opened"];
    ok(a.length === s.length);

    for (let i = 0; i < s.length; i++) {
      equal(RiTa.conjugate(s[i], args), a[i]);
    }

    args = {
      number: RiTa.PLURAL,
      person: RiTa.SECOND_PERSON,
      tense: RiTa.FUTURE_TENSE
    };
    a = ["will swim", "will need", "will open"];
    ok(a.length === s.length);

    for (let i = 0; i < s.length; i++) {
      equal(RiTa.conjugate(s[i], args), a[i]);
    }

    args = {
      tense: RiTa.PAST_TENSE,
      number: RiTa.SINGULAR,
      person: RiTa.THIRD_PERSON
    };
    a = ["swam", "needed", "opened"];

    ok(a.length === s.length);

    for (let i = 0; i < s.length; i++) {
      c = RiTa.conjugate(s[i], args);
      equal(c, a[i]);
    }

    args = {
      tense: RiTa.PAST_TENSE,
      number: RiTa.SINGULAR,
      person: RiTa.THIRD_PERSON,
      form: RiTa.INFINITIVE
    };
    a = ["to swim", "to need", "to open"];
    ok(a.length === s.length);
    for (let i = 0; i < s.length; i++) {
      c = RiTa.conjugate(s[i], args);
      equal(c, a[i]);
    }

    args = {
      tense: RiTa.PAST_TENSE,
      number: RiTa.SINGULAR,
      person: RiTa.THIRD_PERSON,
      passive: true
    };

    s = ["scorch", "burn", "hit"];
    a = ["was scorched", "was burned", "was hit"];
    ok(a.length === s.length);
    for (let i = 0; i < s.length; i++) {
      c = RiTa.conjugate(s[i], args);
      equal(c, a[i]);
    }

    s = ["swim", "need", "open"];
    args = {
      tense: RiTa.PRESENT_TENSE,
      number: RiTa.SINGULAR,
      person: RiTa.THIRD_PERSON,
      form: RiTa.INFINITIVE,
      progressive: true
    };
    a = ["to be swimming", "to be needing", "to be opening"];
    ok(a.length === s.length);
    for (let i = 0; i < s.length; i++) {
      c = RiTa.conjugate(s[i], args);
      equal(c, a[i]);
    }

    args = {
      tense: RiTa.PRESENT_TENSE,
      number: RiTa.SINGULAR,
      person: RiTa.THIRD_PERSON,
      form: RiTa.INFINITIVE,
      perfect: true
    };

    a = ["to have swum", "to have needed", "to have opened"];
    ok(a.length === s.length);
    for (let i = 0; i < s.length; i++) {
      c = RiTa.conjugate(s[i], args);
      equal(c, a[i]);
    }

    args = {
      number: RiTa.PLURAL,
      person: RiTa.SECOND_PERSON,
      tense: RiTa.PAST_TENSE
    };
    equal(RiTa.conjugate("barter", args), "bartered");
    equal(RiTa.conjugate("run", args), "ran");

    args = {
      number: RiTa.PLURAL,
      person: RiTa.SECOND_PERSON,
      tense: RiTa.PAST_TENSE
    };
    s = ["compete", "complete", "eject"];
    a = ["competed", "completed", "ejected"];
    for (let i = 0; i < s.length; i++) {
      equal(RiTa.conjugate(s[i], args), a[i], 'failed on ' + s[i]);
    }
  });

  function ok(a, m) { expect(a, m).to.be.true; }
  function def(res, m) { expect(res, m).to.not.be.undefined; }
  function equal(a, b, m) { expect(a).eq(b, m); }
});
