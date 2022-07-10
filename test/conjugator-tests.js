import { loadTestingDeps } from './before';

describe('RiTa.Conjugator', function () {

  let RiTa, expect, hasLex;
  before(async () => ({ RiTa, expect, hasLex } = await loadTestingDeps()));

  it('Should call pastPart', function () {

    equal(RiTa.pastPart("pen"), "penned"); // rita #150
    equal(RiTa.pastPart("red"), "red");

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

    // or shined
    equal(RiTa.pastPart("shrink"), "shrunk");

    // or shrunken
    equal(RiTa.pastPart("stink"), "stunk");
    equal(RiTa.pastPart("study"), "studied");

    //words with wrong 'vb' tag
    //https://github.com/dhowe/rita/issues/177
    equal(RiTa.pastPart("bite"), "bitten");
    equal(RiTa.pastPart("break"), "broken");
    equal(RiTa.pastPart("call"), "called");
    equal(RiTa.pastPart("commit"), "committed");
    equal(RiTa.pastPart("computerize"), "computerized");
    equal(RiTa.pastPart("concern"), "concerned");
    equal(RiTa.pastPart("discriminate"), "discriminated");
    equal(RiTa.pastPart("end"), "ended");
    equal(RiTa.pastPart("expect"), "expected");
    equal(RiTa.pastPart("finish"), "finished");
    equal(RiTa.pastPart("gain"), "gained");
    equal(RiTa.pastPart("get"), "gotten");
    equal(RiTa.pastPart("increase"), "increased");
    equal(RiTa.pastPart("involve"), "involved");
    equal(RiTa.pastPart("launch"), "launched");
    equal(RiTa.pastPart("lead"), "led");
    equal(RiTa.pastPart("live"), "lived");
    equal(RiTa.pastPart("outpace"), "outpaced");
    equal(RiTa.pastPart("oversee"), "overseen");
    equal(RiTa.pastPart("oversell"), "oversold");
    equal(RiTa.pastPart("pale"), "paled");
    equal(RiTa.pastPart("prepay"), "prepaid");
    equal(RiTa.pastPart("pressure"), "pressured");
    equal(RiTa.pastPart("proliferate"), "proliferated");
    equal(RiTa.pastPart("remake"), "remade");
    equal(RiTa.pastPart("reopen"), "reopened");
    equal(RiTa.pastPart("report"), "reported");
    equal(RiTa.pastPart("resell"), "resold");
    equal(RiTa.pastPart("settle"), "settled");

    equal(RiTa.pastPart("bite"), "bitten");
    equal(RiTa.pastPart("break"), "broken");
    equal(RiTa.pastPart("build"), "built");
    equal(RiTa.pastPart("enter"), "entered");
    equal(RiTa.pastPart("own"), "owned");
    equal(RiTa.pastPart("plan"), "planned");
    equal(RiTa.pastPart("rent"), "rented");
    equal(RiTa.pastPart("repurchase"), "repurchased");
    equal(RiTa.pastPart("roast"), "roasted");
    
    equal(RiTa.pastPart("start"), "started");
    equal(RiTa.pastPart("bust"), "busted");
    equal(RiTa.pastPart("heart"), "hearted");
    equal(RiTa.pastPart("closet"), "closeted");
    equal(RiTa.pastPart("bear"), "borne");

    if (hasLex) {
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

      equal(RiTa.pastPart("awake"), "awoken");
      equal(RiTa.pastPart("become"), "become");
      equal(RiTa.pastPart("drink"), "drunk");
      equal(RiTa.pastPart("run"), "run");
      equal(RiTa.pastPart("shine"), "shone");

      equal(RiTa.pastPart("grown"), "grown");
      equal(RiTa.pastPart("heard"), "heard");
    }
  });

  it('Should call presentPart', function () {

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

    equal(RiTa.presentPart("hoe"), "hoeing");
    equal(RiTa.presentPart("shoe"), "shoeing");

    if (hasLex) {

      equal(RiTa.pastPart("awake"), "awoken");
      equal(RiTa.pastPart("become"), "become");
      equal(RiTa.pastPart("drink"), "drunk");
      equal(RiTa.pastPart("run"), "run");
      equal(RiTa.pastPart("shine"), "shone");
    }
  });

  it('Should conjugate VBDs', function () {
    if (!hasLex) this.skip();
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

  it('Should call conjugate', function () {

    if (!hasLex) this.skip();

    let args, s, a, c;

    equal(RiTa.conjugate("walk"), "walk");
    expect(function () { RiTa.conjugate() }).to.throw();
    expect(function () { RiTa.conjugate("") }).to.throw();

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
    expect(function () { RiTa.conjugate("walk", "invalid args") }).to.throw();
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

    // deal with non-base form
    expect(RiTa.conjugate("walked", "3SPr")).eq("walks");
    expect(RiTa.conjugate("changed", "3SPr")).eq("changes");
    expect(RiTa.conjugate("spent", "3SPr")).eq("spends");
    expect(RiTa.conjugate("eaten", "3SPr")).eq("eats");
    RiTa.conjugate("swim", "2PPa")
  });

  if (hasLex)   it('Should call toString', function () {
    equal(RiTa.conjugator.toString(), '  ---------------------\n  Passive = false\n  Perfect = false\n  Progressive = false\n  ---------------------\n  Number = 8\n  Person = 2\n  Tense = 4\n  ---------------------\n');
  });

  if (hasLex)  it('Should accept stems', function () {

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

  it("Should call unconjugate", function () {

    if (!hasLex) this.skip();
    
    expect(RiTa.conjugator.unconjugate("trepanning")).eq("trepan");

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
    expect(RiTa.conjugator.unconjugate("wishes")).eq("wish");
    expect(RiTa.conjugator.unconjugate("blitzes")).eq("blitz");

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
    expect(RiTa.conjugator.unconjugate("digged")).eq("dig");
    expect(RiTa.conjugator.unconjugate("flagged")).eq("flag");

    // -ing (regular)
    expect(RiTa.conjugator.unconjugate("blowing")).eq("blow");
    expect(RiTa.conjugator.unconjugate("raining")).eq("rain");
    expect(RiTa.conjugator.unconjugate("coming")).eq("come");
    expect(RiTa.conjugator.unconjugate("having")).eq("have");
    expect(RiTa.conjugator.unconjugate("running")).eq("run");
    expect(RiTa.conjugator.unconjugate("putting")).eq("put");
    expect(RiTa.conjugator.unconjugate("sitting")).eq("sit");
    expect(RiTa.conjugator.unconjugate("pulling")).eq("pull");

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

    // not in lexicon 
    expect(RiTa.conjugator.unconjugate("spooning")).eq("spoon");
    expect(RiTa.conjugator.unconjugate("mepanning")).eq("mepan");
    expect(RiTa.conjugator.unconjugate("muddling")).eq("muddle");

    if (typeof NOLEX !== 'undefined') {
      // when no lex, rules should work
      expect(RiTa.conjugator.unconjugate("gets")).eq("get");
      expect(RiTa.conjugator.unconjugate("comes")).eq("come");
      expect(RiTa.conjugator.unconjugate("goes")).eq("go");
      expect(RiTa.conjugator.unconjugate("teaches")).eq("teach");
      expect(RiTa.conjugator.unconjugate("fixes")).eq("fix");
      expect(RiTa.conjugator.unconjugate("misses")).eq("miss");
      expect(RiTa.conjugator.unconjugate("studies")).eq("study");
      expect(RiTa.conjugator.unconjugate("tries")).eq("try");
      expect(RiTa.conjugator.unconjugate("carries")).eq("carry");
      expect(RiTa.conjugator.unconjugate("wishes")).eq("wish");
      expect(RiTa.conjugator.unconjugate("blitzes")).eq("blitz");
      expect(RiTa.conjugator.unconjugate("watered")).eq("water");
      expect(RiTa.conjugator.unconjugate("pulled")).eq("pull");
      expect(RiTa.conjugator.unconjugate("picked")).eq("pick");
      expect(RiTa.conjugator.unconjugate("liked")).eq("like");
      expect(RiTa.conjugator.unconjugate("moved")).eq("move");
      expect(RiTa.conjugator.unconjugate("tasted")).eq("taste");
      expect(RiTa.conjugator.unconjugate("tried")).eq("try");
      expect(RiTa.conjugator.unconjugate("studied")).eq("study");
      expect(RiTa.conjugator.unconjugate("carried")).eq("carry");
      expect(RiTa.conjugator.unconjugate("digged")).eq("dig");
      expect(RiTa.conjugator.unconjugate("flagged")).eq("flag");
      expect(RiTa.conjugator.unconjugate("raining")).eq("rain");
      expect(RiTa.conjugator.unconjugate("coming")).eq("come");
      expect(RiTa.conjugator.unconjugate("having")).eq("have");
      expect(RiTa.conjugator.unconjugate("running")).eq("run");
      expect(RiTa.conjugator.unconjugate("putting")).eq("put");
      expect(RiTa.conjugator.unconjugate("sitting")).eq("sit");
      expect(RiTa.conjugator.unconjugate("pulling")).eq("pull");
    }

    //words with wrong 'vb' tag
    //https://github.com/dhowe/rita/issues/177
    expect(RiTa.conjugator.unconjugate("bitten")).eq("bite");
    expect(RiTa.conjugator.unconjugate("broken")).eq("break");
    expect(RiTa.conjugator.unconjugate("committed")).eq("commit");
    expect(RiTa.conjugator.unconjugate("computerized")).eq("computerize");
    expect(RiTa.conjugator.unconjugate("concerned")).eq("concern");
    expect(RiTa.conjugator.unconjugate("discriminated")).eq("discriminate");
    expect(RiTa.conjugator.unconjugate("ended")).eq("end");
    expect(RiTa.conjugator.unconjugate("expected")).eq("expect");
    expect(RiTa.conjugator.unconjugate("finished")).eq("finish");
    expect(RiTa.conjugator.unconjugate("gained")).eq("gain");
    expect(RiTa.conjugator.unconjugate("gotten")).eq("get");
    expect(RiTa.conjugator.unconjugate("increased")).eq("increase");
    expect(RiTa.conjugator.unconjugate("involved")).eq("involve");
    expect(RiTa.conjugator.unconjugate("launched")).eq("launch");
    expect(RiTa.conjugator.unconjugate("led")).eq("lead");
    expect(RiTa.conjugator.unconjugate("lived")).eq("live");
    expect(RiTa.conjugator.unconjugate("outpaced")).eq("outpace");
    expect(RiTa.conjugator.unconjugate("overseen")).eq("oversee");
    expect(RiTa.conjugator.unconjugate("paled")).eq("pale");
    expect(RiTa.conjugator.unconjugate("prepaid")).eq("prepay");
    expect(RiTa.conjugator.unconjugate("pressured")).eq("pressure");
    expect(RiTa.conjugator.unconjugate("proliferated")).eq("proliferate");
    expect(RiTa.conjugator.unconjugate("remade")).eq("remake");
    expect(RiTa.conjugator.unconjugate("reopened")).eq("reopen");
    expect(RiTa.conjugator.unconjugate("reported")).eq("report");
    expect(RiTa.conjugator.unconjugate("sold")).eq("sell");
    expect(RiTa.conjugator.unconjugate("resold")).eq("resell");
    expect(RiTa.conjugator.unconjugate("settled")).eq("settle");
    expect(RiTa.conjugator.unconjugate("started")).eq("start");
    expect(RiTa.conjugator.unconjugate("were")).eq("be");

    expect(RiTa.conjugator.unconjugate("bitten")).eq("bite");
    expect(RiTa.conjugator.unconjugate("broken")).eq("break");
    expect(RiTa.conjugator.unconjugate("owned")).eq("own");
    expect(RiTa.conjugator.unconjugate("planned")).eq("plan");
    expect(RiTa.conjugator.unconjugate("rented")).eq("rent");
    expect(RiTa.conjugator.unconjugate("repurchased")).eq("repurchase");
    expect(RiTa.conjugator.unconjugate("roasted")).eq("roast");

    expect(RiTa.conjugator.unconjugate("busted")).eq("bust");
    expect(RiTa.conjugator.unconjugate("grown")).eq("grow");
    expect(RiTa.conjugator.unconjugate("blown")).eq("blow");
    expect(RiTa.conjugator.unconjugate("heard")).eq("hear");
  });

  it("Should conjugate verbs", function() {
    //words with wrong 'vb' tag
    //https://github.com/dhowe/rita/issues/177

    let opt = {
        number: RiTa.SINGULAR,
        person: RiTa.FIRST,
        tense: RiTa.PAST
    };
    expect(RiTa.conjugate("bite", opt)).eq("bit");
    expect(RiTa.conjugate("break", opt)).eq("broke");
    expect(RiTa.conjugate("call", opt)).eq("called");
    expect(RiTa.conjugate("commit", opt)).eq("committed");
    expect(RiTa.conjugate("computerize", opt)).eq("computerized");
    expect(RiTa.conjugate("concern", opt)).eq("concerned");
    expect(RiTa.conjugate("discriminate", opt)).eq("discriminated");
    expect(RiTa.conjugate("end", opt)).eq("ended");
    expect(RiTa.conjugate("expect", opt)).eq("expected");
    expect(RiTa.conjugate("finish", opt)).eq("finished");
    expect(RiTa.conjugate("gain", opt)).eq("gained");
    expect(RiTa.conjugate("get", opt)).eq("got");
    expect(RiTa.conjugate("increase", opt)).eq("increased");
    expect(RiTa.conjugate("involve", opt)).eq("involved");
    expect(RiTa.conjugate("launch", opt)).eq("launched");
    expect(RiTa.conjugate("lead", opt)).eq("led");
    expect(RiTa.conjugate("live", opt)).eq("lived");
    expect(RiTa.conjugate("concern", opt)).eq("concerned");
    expect(RiTa.conjugate("oversee", opt)).eq("oversaw");
    expect(RiTa.conjugate("pale", opt)).eq("paled");
    expect(RiTa.conjugate("prepay", opt)).eq("prepaid");
    expect(RiTa.conjugate("pressure", opt)).eq("pressured");
    expect(RiTa.conjugate("proliferate", opt)).eq("proliferated");
    expect(RiTa.conjugate("remake", opt)).eq("remade");
    expect(RiTa.conjugate("reopen", opt)).eq("reopened");
    expect(RiTa.conjugate("report", opt)).eq("reported");
    expect(RiTa.conjugate("resell", opt)).eq("resold");
    expect(RiTa.conjugate("settle", opt)).eq("settled");
    expect(RiTa.conjugate("start", opt)).eq("started");

    opt = {
      tense: RiTa.PRESENT,
      number: RiTa.SINGULAR,
      perfect: true
    };
    expect(RiTa.conjugate("bite", opt)).eq("have bitten");
    expect(RiTa.conjugate("break", opt)).eq("have broken");
    expect(RiTa.conjugate("build", opt)).eq("have built");
    expect(RiTa.conjugate("enter", opt)).eq("have entered");
    expect(RiTa.conjugate("own", opt)).eq("have owned");
    expect(RiTa.conjugate("plan", opt)).eq("have planned");
    expect(RiTa.conjugate("rent", opt)).eq("have rented");
    expect(RiTa.conjugate("repurchase", opt)).eq("have repurchased");
    expect(RiTa.conjugate("roast", opt)).eq("have roasted");
})

  function ok(a, m) { expect(a, m).to.be.true; }
  function def(res, m) { expect(res, m).to.not.be.undefined; }
  function equal(a, b, m) { expect(a).eq(b, m); }
});
