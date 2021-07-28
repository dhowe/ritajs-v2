import { RiTa, expect } from './before';

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
    equal(RiTa.pastPart("plead"), "pled");
    equal(RiTa.pastPart(""), "");

    // PROBLEMS
    equal(RiTa.pastPart("awake"), "awoken");
    equal(RiTa.pastPart("become"), "become");
    equal(RiTa.pastPart("drink"), "drunk");
    equal(RiTa.pastPart("run"), "run");
    equal(RiTa.pastPart("shine"), "shone");



    // or shined
    equal(RiTa.pastPart("shrink"), "shrunk");

    // or shrunken
    equal(RiTa.pastPart("stink"), "stunk");
    equal(RiTa.pastPart("study"), "studied");

    // is already past part
    equal(RiTa.pastPart("hopped"), "hopped");
    equal(RiTa.pastPart("hated"), "hated");
    equal(RiTa.pastPart("created"), "created");
    equal(RiTa.pastPart("committed"), "committed");
    equal(RiTa.pastPart("submitted"), "submitted");
    equal(RiTa.pastPart("come"), "come");
    equal(RiTa.pastPart("forgotten"), "forgotten");
    equal(RiTa.pastPart("arisen"), "arisen");
    equal(RiTa.pastPart("eaten"), "eaten");
    equal(RiTa.pastPart("chosen"), "chosen");
    equal(RiTa.pastPart("frozen"), "frozen");
    equal(RiTa.pastPart("stolen"), "stolen");
    equal(RiTa.pastPart("worn"), "worn");
    equal(RiTa.pastPart("broken"), "broken");
    equal(RiTa.pastPart("written"), "written");
    equal(RiTa.pastPart("ridden"), "ridden");
    equal(RiTa.pastPart("drawn"), "drawn");
    equal(RiTa.pastPart("known"), "known");
    equal(RiTa.pastPart("grown"), "grown");
    equal(RiTa.pastPart("done"), "done");
    equal(RiTa.pastPart("gone"), "gone");
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

    equal(RiTa.conjugate("walk"), "walk");
    expect(() => { RiTa.conjugate() }).to.throw();
    expect(() => { RiTa.conjugate("") }).to.throw();

    equal("swum", RiTa.pastPart("swim"));

    equal(RiTa.conjugate("be", { form: RiTa.GERUND, }), "being");
    equal(RiTa.conjugate("are", { number: RiTa.PLURAL, person: RiTa.SECOND, tense: RiTa.PAST }), "were");

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

    args = {
      number: RiTa.PLURAL,
      person: RiTa.SECOND,
      tense: RiTa.PAST,
      interrogative: true
    }
    s = ["compete", "complete", "eject"];
    a = ["compete", "complete", "eject"];
    for (let i = 0; i < s.length; i++) {
      equal(RiTa.conjugate(s[i], args), a[i], 'failed on ' + s[i]);
    }

    //string args
    expect(() => { RiTa.conjugate("walk", "invalid args") }).to.throw();
    expect(RiTa.conjugate("walk", "1SPr")).eq("walk");
    expect(RiTa.conjugate("walk", "1PPr")).eq("walk");
    expect(RiTa.conjugate("walk", "2SPr")).eq("walk");
    expect(RiTa.conjugate("walk", "3SPr")).eq("walks");
    expect(RiTa.conjugate("walk", "1SFu")).eq("will walk");
    expect(RiTa.conjugate("walk", "1SPa")).eq("walked");
    expect(RiTa.conjugate("walk", "2PPa")).eq("walked");
    expect(RiTa.conjugate("is", "3PPa")).eq("were");
    expect(RiTa.conjugate("is", "2SPa")).eq("were");
    expect(RiTa.conjugate("is", "3SPa")).eq("was");
    expect(RiTa.conjugate("is", "2PPa")).eq("were");

    //4 parameters
    let original = ["run", "walk", "swim", "create"];
    // passive
    let expected = ["is run", "is walked", "is swum", "is created"];
    original.forEach((w, i) => {
      expect(RiTa.conjugate(w, { person: RiTa.THIRD, passive: true })).eq(expected[i]);
    });
    // progressive
    expected = ["is running", "is walking", "is swimming", "is creating"];
    original.forEach((w, i) => {
      expect(RiTa.conjugate(w, { person: RiTa.THIRD, progressive: true })).eq(expected[i]);
    });
    // interrogative
    expected = ["run", "walk", "swim", "create"];
    original.forEach((w, i) => {
      expect(RiTa.conjugate(w, { person: RiTa.THIRD, interrogative: true })).eq(expected[i]);
    });
    // perfect
    expected = ["has run", "has walked", "has swum", "has created"];
    original.forEach((w, i) => {
      expect(RiTa.conjugate(w, { person: RiTa.THIRD, perfect: true })).eq(expected[i]);
    });
    // gerund passive
    expected = ["being run", "being walked", "being swum", "being created"];
    original.forEach((w, i) => {
      expect(RiTa.conjugate(w, { person: RiTa.THIRD, passive: true, form: RiTa.GERUND })).eq(expected[i]);
    });
    // gerund progressive 
    expected = ["being running", "being walking", "being swimming", "being creating"];
    original.forEach((w, i) => {
      expect(RiTa.conjugate(w, { person: RiTa.THIRD, progressive: true, form: RiTa.GERUND })).eq(expected[i]);
    });
    // gerund interrogative
    expected = ["running", "walking", "swimming", "creating"];
    original.forEach((w, i) => {
      expect(RiTa.conjugate(w, { person: RiTa.THIRD, interrogative: true, form: RiTa.GERUND })).eq(expected[i]);
    });
    // gerund perfect
    expected = ["having run", "having walked", "having swum", "having created"];
    original.forEach((w, i) => {
      expect(RiTa.conjugate(w, { person: RiTa.THIRD, perfect: true, form: RiTa.GERUND })).eq(expected[i]);
    });
    // infinitive passive
    expected = ["to be run", "to be walked", "to be swum", "to be created"];
    original.forEach((w, i) => {
      expect(RiTa.conjugate(w, { person: RiTa.THIRD, passive: true, form: RiTa.INFINITIVE })).eq(expected[i]);
    });
    // infinitive progressive
    expected = ["to be running", "to be walking", "to be swimming", "to be creating"];
    original.forEach((w, i) => {
      expect(RiTa.conjugate(w, { person: RiTa.THIRD, progressive: true, form: RiTa.INFINITIVE })).eq(expected[i]);
    });
    // infinitive interrogative
    expected = ["to run", "to walk", "to swim", "to create"];
    original.forEach((w, i) => {
      expect(RiTa.conjugate(w, { person: RiTa.THIRD, interrogative: true, form: RiTa.INFINITIVE })).eq(expected[i]);
    });
    // infinitive perfect
    expected = ["to have run", "to have walked", "to have swum", "to have created"];
    original.forEach((w, i) => {
      expect(RiTa.conjugate(w, { person: RiTa.THIRD, perfect: true, form: RiTa.INFINITIVE })).eq(expected[i]);
    });
    RiTa.conjugate("swim", "2PPa")
  });

  it('Should call toString', () => {
    equal(RiTa.conjugator.toString(), '  ---------------------\n  Passive = false\n  Perfect = false\n  Progressive = false\n  ---------------------\n  Number = 8\n  Person = 2\n  Tense = 4\n  ---------------------\n');
  });

  it('Should accept stems', () => {

    // https://github.com/dhowe/rita/issues/116
    let stem = RiTa.stem("walking");
    equal(RiTa.conjugate(stem, { number: RiTa.PLURAL, person: RiTa.SECOND, tense: RiTa.PAST }), "walked", `${stem} => walked`);
    equal(RiTa.conjugate(stem, { number: RiTa.PLURAL, person: RiTa.SECOND, tense: RiTa.PRESENT }), "walk", `${stem} => walk`);
    equal(RiTa.conjugate(stem, { number: RiTa.SINGULAR, person: RiTa.THIRD, tense: RiTa.PRESENT }), "walks", `${stem} => walks`);

    stem = RiTa.stem("writing");
    equal(RiTa.conjugate(stem, { number: RiTa.PLURAL, person: RiTa.SECOND, tense: RiTa.PAST }), "wrote", `${stem} => wrote`);
    equal(RiTa.conjugate(stem, { number: RiTa.PLURAL, person: RiTa.SECOND, tense: RiTa.PRESENT }), "write", `${stem} => write`);
    equal(RiTa.conjugate(stem, { number: RiTa.SINGULAR, person: RiTa.THIRD, tense: RiTa.PRESENT }), "writes", `${stem} => writes`);

    stem = RiTa.stem("asked");
    equal(RiTa.conjugate(stem, { number: RiTa.PLURAL, person: RiTa.SECOND, tense: RiTa.PAST }), "asked", `${stem} => asked`);
    equal(RiTa.conjugate(stem, { number: RiTa.PLURAL, person: RiTa.SECOND, tense: RiTa.PRESENT }), "ask", `${stem} => ask`);
    equal(RiTa.conjugate(stem, { number: RiTa.SINGULAR, person: RiTa.THIRD, tense: RiTa.PRESENT }), "asks", `${stem} => asks`);

    stem = RiTa.stem("changed");
    equal(RiTa.conjugate(stem, { number: RiTa.PLURAL, person: RiTa.SECOND, tense: RiTa.PAST }), "changed", `${stem} => changed`);
    equal(RiTa.conjugate(stem, { number: RiTa.PLURAL, person: RiTa.SECOND, tense: RiTa.PRESENT }), "change", `${stem} => change`);
    equal(RiTa.conjugate(stem, { number: RiTa.SINGULAR, person: RiTa.THIRD, tense: RiTa.PRESENT }), "changes", `${stem} => changes`);

    stem = RiTa.stem("admired");
    equal(RiTa.conjugate(stem, { number: RiTa.PLURAL, person: RiTa.SECOND, tense: RiTa.PAST }), "admired", `${stem} => admired`);
    equal(RiTa.conjugate(stem, { number: RiTa.PLURAL, person: RiTa.SECOND, tense: RiTa.PRESENT }), "admire", `${stem} => admire`);
    equal(RiTa.conjugate(stem, { number: RiTa.SINGULAR, person: RiTa.THIRD, tense: RiTa.PRESENT }), "admires", `${stem} => admires`);

    stem = RiTa.stem("cured");
    equal(RiTa.conjugate(stem, { number: RiTa.PLURAL, person: RiTa.SECOND, tense: RiTa.PAST }), "cured", `${stem} => cured`);
    equal(RiTa.conjugate(stem, { number: RiTa.PLURAL, person: RiTa.SECOND, tense: RiTa.PRESENT }), "cure", `${stem} => cure`);
    equal(RiTa.conjugate(stem, { number: RiTa.SINGULAR, person: RiTa.THIRD, tense: RiTa.PRESENT }), "cures", `${stem} => cures`);

    stem = RiTa.stem("studies");
    equal(RiTa.conjugate(stem, { number: RiTa.PLURAL, person: RiTa.SECOND, tense: RiTa.PAST }), "studied", `${stem} => studied`);
    equal(RiTa.conjugate(stem, { number: RiTa.PLURAL, person: RiTa.SECOND, tense: RiTa.PRESENT }), "study", `${stem} => study`);
    equal(RiTa.conjugate(stem, { number: RiTa.SINGULAR, person: RiTa.THIRD, tense: RiTa.PRESENT }), "studies", `${stem} => studies`);

    // more random tests
    let opts = { number: RiTa.PLURAL, person: RiTa.SECOND, tense: RiTa.PAST };
    let pairs = [
      ["accompanying", "accompanied"],
      ["feeling", "felt"],
      ["placating", "placated"],
      ["centralizing", "centralized"],
      ["humanized", "humanized"],
      ["boosted", "boosted"],
      ["wearing", "wore"],
      ["aroused", "aroused"],
      ["rising", "rose"],
      ["raising", "raised"],
      ["vibrating", "vibrated"],
      ["injection", "injected"],
      ["vibration", "vibrated"],
    ];
    pairs.forEach(p => {
      equal(RiTa.conjugate(RiTa.stem(p[0]), opts), p[1], p[0]
        + " => " + RiTa.stem(p[0]) + " => " + p[1]);
    });
  });

  it("Should call unconjugate", () => {

    // 3rd person singular (regular)
    expect(RiTa.conjugator.unconjugate("plays")).eq("play");
    expect(RiTa.conjugator.unconjugate("takes")).eq("take");
    expect(RiTa.conjugator.unconjugate("gets")).eq("get");
    expect(RiTa.conjugator.unconjugate("comes")).eq("come");
    expect(RiTa.conjugator.unconjugate("goes")).eq("go");
    expect(RiTa.conjugator.unconjugate("teaches")).eq("teach");
    expect(RiTa.conjugator.unconjugate("fixes")).eq("fix");
    expect(RiTa.conjugator.unconjugate("misses")).eq("miss");
    expect(RiTa.conjugator.unconjugate("studies")).eq("study");
    expect(RiTa.conjugator.unconjugate("tries")).eq("try");
    expect(RiTa.conjugator.unconjugate("carries")).eq("carry");

    // -ed (regular)
    expect(RiTa.conjugator.unconjugate("watched")).eq("watch");
    expect(RiTa.conjugator.unconjugate("planted")).eq("plant");
    expect(RiTa.conjugator.unconjugate("watered")).eq("water");
    expect(RiTa.conjugator.unconjugate("pulled")).eq("pull");
    expect(RiTa.conjugator.unconjugate("picked")).eq("pick");
    expect(RiTa.conjugator.unconjugate("liked")).eq("like");
    expect(RiTa.conjugator.unconjugate("moved")).eq("move");
    expect(RiTa.conjugator.unconjugate("tasted")).eq("taste");
    expect(RiTa.conjugator.unconjugate("tried")).eq("try");
    expect(RiTa.conjugator.unconjugate("studied")).eq("study");
    expect(RiTa.conjugator.unconjugate("carried")).eq("carry");

    // -ing (regular)
    expect(RiTa.conjugator.unconjugate("blowing")).eq("blow");
    expect(RiTa.conjugator.unconjugate("raining")).eq("rain");
    expect(RiTa.conjugator.unconjugate("coming")).eq("come");
    expect(RiTa.conjugator.unconjugate("having")).eq("have");
    expect(RiTa.conjugator.unconjugate("running")).eq("run");
    expect(RiTa.conjugator.unconjugate("putting")).eq("put");
    expect(RiTa.conjugator.unconjugate("sitting")).eq("sit");

    // irregular
    expect(RiTa.conjugator.unconjugate("has")).eq("have");
    expect(RiTa.conjugator.unconjugate("had")).eq("have");
    expect(RiTa.conjugator.unconjugate("sat")).eq("sit");
    expect(RiTa.conjugator.unconjugate("shown")).eq("show");
    expect(RiTa.conjugator.unconjugate("ate")).eq("eat");
    expect(RiTa.conjugator.unconjugate("went")).eq("go");
    expect(RiTa.conjugator.unconjugate("met")).eq("meet");

    // for base form verbs, return input
    expect(RiTa.conjugator.unconjugate("have")).eq("have");
    expect(RiTa.conjugator.unconjugate("eat")).eq("eat");
    expect(RiTa.conjugator.unconjugate("play")).eq("play");
    expect(RiTa.conjugator.unconjugate("go")).eq("go");
    expect(RiTa.conjugator.unconjugate("do")).eq("do");
  });

  function ok(a, m) { expect(a, m).to.be.true; }
  function def(res, m) { expect(res, m).to.not.be.undefined; }
  function equal(a, b, m) { expect(a).eq(b, m); }
});
