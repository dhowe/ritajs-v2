import { expect } from 'chai';
import RiTa from '../src/rita';

describe('RiTa.Conjugator', () => {

  it('Should call pastPart', () => {

    equal(RiTa.pastPart("sleep"), "slept");
    equal(RiTa.pastPart("withhold"), "withheld");

    equal(RiTa.pastPart("cut"), "cut");
    equal(RiTa.pastPart("go"), "gone");
    equal(RiTa.pastPart("swim"), "swum");
    equal(RiTa.pastPart("would"), "would");
    equal(RiTa.pastPart("might"), "might");
    equal(RiTa.pastPart("run"), "run");
    equal(RiTa.pastPart("speak"), "spoken");
    equal(RiTa.pastPart("break"), "broken");
    equal(RiTa.pastPart(""), "");

    // PROBLEMS
    equal(RiTa.pastPart("awake"), "awoken");
    equal(RiTa.pastPart("become"), "became");
    equal(RiTa.pastPart("drink"), "drunk");
    equal(RiTa.pastPart("plead"), "pled");
    equal(RiTa.pastPart("run"), "run");
    equal(RiTa.pastPart("shine"), "shone");

    // or shined
    equal(RiTa.pastPart("shrink"), "shrunk");

    // or shrunken
    equal(RiTa.pastPart("stink"), "stunk");
    equal(RiTa.pastPart("study"), "studied");
  });

  it('Should call presentPart', () => {

    equal(RiTa.presentPart(""), "");
    equal(RiTa.presentPart("sleep"), "sleeping");
    equal(RiTa.presentPart("withhold"), "withholding");

    equal(RiTa.presentPart("cut"), "cutting");
    equal(RiTa.presentPart("go"), "going");
    equal(RiTa.presentPart("run"), "running");
    equal(RiTa.presentPart("speak"), "speaking");
    equal(RiTa.presentPart("break"), "breaking");
    equal(RiTa.presentPart("become"), "becoming");
    equal(RiTa.presentPart("plead"), "pleading");
    equal(RiTa.presentPart("awake"), "awaking");
    equal(RiTa.presentPart("study"), "studying");

    equal(RiTa.presentPart("lie"), "lying");
    equal(RiTa.presentPart("swim"), "swimming");
    equal(RiTa.presentPart("run"), "running");
    equal(RiTa.presentPart("dig"), "digging");
    equal(RiTa.presentPart("set"), "setting");
    equal(RiTa.presentPart("speak"), "speaking");
    equal(RiTa.presentPart("bring"), "bringing");
    equal(RiTa.presentPart("speak"), "speaking");

    equal(RiTa.presentPart("study "), "studying"); // trim
    equal(RiTa.presentPart(" study"), "studying"); // trim
  });

  it('Should conjugate VBDs', () => {
    expect(RiTa.conjugate("go", {
      number: RiTa.SINGULAR,
      person: RiTa.FIRST,
      tense: RiTa.PAST
    })).eq("went");
    expect(RiTa.conjugate("run", {
      number: RiTa.SINGULAR,
      person: RiTa.FIRST,
      tense: RiTa.PAST
    })).eq("ran");
  });

  it('Should call conjugate', () => {
    let args, s, a, c;

    equal("swum", RiTa.pastPart("swim"));

    equal(RiTa.conjugate("be", { form: RiTa.GERUND, }), "being");

    s = ["swim", "need", "open"];
    a = ["swims", "needs", "opens"];

    args = {
      tense: RiTa.PRESENT,
      number: RiTa.SINGULAR,
      person: RiTa.THIRD
    };

    expect(() => RiTa.conjugate(args)).to.throw;
    expect(() => RiTa.conjugate("", args)).to.throw;


    for (let i = 0; i < s.length; i++) {
      let c = RiTa.conjugate(s[i], args);
      equal(c, a[i]);
    }

    args = {
      tense: RiTa.PRESENT,
      number: RiTa.SINGULAR,
      person: RiTa.THIRD,
      passive: true
    };

    a = ["is swum", "is needed", "is opened"];
    for (let i = 0; i < s.length; i++) {
      equal(RiTa.conjugate(s[i], args), a[i]);
    }

    args = {
      number: RiTa.SINGULAR,
      person: RiTa.FIRST,
      tense: RiTa.PAST
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
      person: RiTa.SECOND,
      tense: RiTa.PAST
    };

    a = ["swam", "needed", "opened"];
    ok(a.length === s.length);

    for (let i = 0; i < s.length; i++) {
      equal(RiTa.conjugate(s[i], args), a[i]);
    }

    args = {
      number: RiTa.PLURAL,
      person: RiTa.SECOND,
      tense: RiTa.FUTURE
    };
    a = ["will swim", "will need", "will open"];
    ok(a.length === s.length);

    for (let i = 0; i < s.length; i++) {
      equal(RiTa.conjugate(s[i], args), a[i]);
    }

    args = {
      tense: RiTa.PAST,
      number: RiTa.SINGULAR,
      person: RiTa.THIRD
    };
    a = ["swam", "needed", "opened"];

    ok(a.length === s.length);

    for (let i = 0; i < s.length; i++) {
      c = RiTa.conjugate(s[i], args);
      equal(c, a[i]);
    }

    args = {
      tense: RiTa.PAST,
      number: RiTa.SINGULAR,
      person: RiTa.THIRD,
      form: RiTa.INFINITIVE
    };
    a = ["to swim", "to need", "to open"];
    ok(a.length === s.length);
    for (let i = 0; i < s.length; i++) {
      c = RiTa.conjugate(s[i], args);
      equal(c, a[i]);
    }

    args = {
      tense: RiTa.PAST,
      number: RiTa.SINGULAR,
      person: RiTa.THIRD,
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
      tense: RiTa.PRESENT,
      number: RiTa.SINGULAR,
      person: RiTa.THIRD,
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
      tense: RiTa.PRESENT,
      number: RiTa.SINGULAR,
      person: RiTa.THIRD,
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
      person: RiTa.SECOND,
      tense: RiTa.PAST
    };
    equal(RiTa.conjugate("barter", args), "bartered");
    equal(RiTa.conjugate("run", args), "ran");

    args = {
      number: RiTa.PLURAL,
      person: RiTa.SECOND,
      tense: RiTa.PAST
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
