// const expect = require('chai').expect;
// const RiTa = require('../src/rita_api');

describe('RiTa.Lexicon', () => {

  if (typeof module !== 'undefined') {
    RiTa = require('../src/rita');
    chai = require('chai');
    expect = chai.expect;
  }

  it('Should correctly call randomWord', () => {

    let result;

    result = RiTa.randomWord();
    ok(result.length > 0, "randomWord: " + result);

    result = RiTa.randomWord({ pos: "nn" });
    ok(result.length > 0, "randomWord nn: " + result);

    result = RiTa.randomWord({ pos: "nns" });
    ok(result.length > 0, "randomWord nns=" + result);

    //wordNet Tag
    result = RiTa.randomWord({ pos: "n" });
    ok(result.length > 0, "randomWord n=" + result);

    result = RiTa.randomWord({ pos: "v" });
    ok(result.length > 0, "randomWord v=" + result);

    // no result
    result = RiTa.randomWord({ pos: "xxx" });
    ok(result.length < 1, "randomWord rp=" + result);

    //int
    result = RiTa.randomWord({ syllableCount: 3 });
    ok(result.length > 0, "3 syllableCount: " + result);

    result = RiTa.randomWord({ syllableCount: 5 });
    ok(result.length > 0, "5 syllableCount: " + result);

  });

  it('Should correctly call randomWord.nns', () => {
    for (let i = 0; i < 20; i++) {
      let result = RiTa.randomWord({ pos: "nns" });
      if (!RiTa.pluralizer.isPlural(result)) {

        // For now, just warn here as there are too many edge cases (see #521)
        console.warn("Pluralize/Singularize problem: randomWord(nns) was '" + result + "' (" +
          "isPlural=" + RiTa.pluralizer.isPlural(result) + "), singularized is '" + RiTa.singularize(result) + "'");
      }
      //ok(RiTa._isPlural(result), "randomWord nns: " + result);

      //No nn & vbg
      //No -ness, -ism
      let pos = RiTa.lexicon._posData(result);
      ok(pos.indexOf("vbg") < 0, "randomWord nns: " + result);
      ok(!result.endsWith("ness"), "randomWord nns: " + result);
      ok(!result.endsWith("isms"), "randomWord nns: " + result);
    }
  });

  it('Should correctly call randomWord.pos', () => {

    let pos = ["nn", "jj", "jjr", "wp"];
    for (let j = 0; j < pos.length; j++) {
      for (let i = 0; i < 5; i++) {
        let result = RiTa.randomWord({ pos: pos[j] });
        let best = RiTa.lexicon._bestPos(result);
        //console.log(result+": "+pos[j]+" ?= "+best);
        eq(pos[j], best, result);
      }
    }
  });


  it('Should correctly call randomWord.syls', () => {
    let i, result, syllables, num;
    for (i = 0; i < 10; i++) {
      result = RiTa.randomWord({ syllableCount: 3 });
      syllables = RiTa.syllables(result);
      num = syllables.split(RiTa.SYLLABLE_BOUNDARY).length;
      ok(result.length > 0);
      ok(num == 3, result + ": " + syllables); // "3 syllableCount: "
    }

    for (i = 0; i < 10; i++) {
      result = RiTa.randomWord({ syllableCount: 5 });
      syllables = RiTa.syllables(result);
      num = syllables.split(RiTa.SYLLABLE_BOUNDARY).length;
      ok(result.length > 0); // "3 syllableCount: "
      ok(num == 5); // "3 syllableCount: "
    }
  });

  it('Should correctly call randomWord.pos.syls', () => {
    let result, syllables;
    for (let i = 0; i < 5; i++) {
      result = RiTa.randomWord({ syllableCount: 3, pos: "vbz" });
      ok(result.length > 0, "randomWord vbz: " + result);
      syllables = RiTa.syllables(result);
      eq(3, syllables.split(RiTa.SYLLABLE_BOUNDARY).length, result);
      eq("vbz", RiTa.lexicon._bestPos(result), result);

      result = RiTa.randomWord({ syllableCount: 1, pos: "n" });
      ok(result.length > 0, "randomWord n: " + result);
      syllables = RiTa.syllables(result);
      //console.log("n: ",result,syllables.split(RiTa.SYLLABLE_BOUNDARY));
      eq(1, syllables.split(RiTa.SYLLABLE_BOUNDARY).length, result);
      eq(RiTa.posTags(result, { simple: true })[0], "n", result);
    }
  });

  it('Should correctly call randomWord.pos.syls', () => {
    let result, syllables;
    result = RiTa.randomWord({ syllableCount: 5, pos: "nns" });
    ok(result.length > 0, "randomWord nns: " + result);
    syllables = RiTa.syllables(result);
    let count = syllables.split(RiTa.SYLLABLE_BOUNDARY).length;

    if (0 && count !== 5) console.warn("Syllabifier problem: " // see #2
      + result + ".syllables was " + count + ', expected 5');
  });

  // it('Should correctly call toPhoneArray', () => {
  //   let result = RiTa._lexicon().toPhoneArray(RiTa._lexicon()._rawPhones("tornado"));
  //   eql(result, ['t', 'ao', 'r', 'n', 'ey', 'd', 'ow'], 'got:' + result);
  // });

  it('Should correctly call alliterations', () => {

    let result;

    // TODO: make sure we have LTS cases in here

    result = RiTa.alliterations("");
    ok(result.length < 1);

    result = RiTa.alliterations("#$%^&*");
    ok(result.length < 1);

    result = RiTa.alliterations("umbrella");
    ok(result.length < 1, "failed on 'umbrella'");

    result = RiTa.alliterations("cat stress");
    ok(result.length > 2000, "failed on 'cat stress'");

    result = RiTa.alliterations("cat");
    ok(result.length > 2000, "failed on 'cat'");
    for (let i = 0; i < result.length; i++) {
      ok(RiTa.isAlliteration(result[i], "cat"));
    }

    result = RiTa.alliterations("dog");
    ok(result.length > 1000, "failed on 'dog'");
    for (let i = 0; i < result.length; i++) {
      ok(RiTa.isAlliteration(result[i], "dog"));
    }

    result = RiTa.alliterations("dog", { matchMinLength: 15 });
    ok(result.length < 5, "got length=" + result.length);
    for (let i = 0; i < result.length; i++) {
      ok(RiTa.isAlliteration(result[i], "dog"), 'FAIL1: ' + result[i]);
    }

    result = RiTa.alliterations("cat", { matchMinLength: 16 });
    ok(result.length < 15, "failed on 'dog'");
    for (let i = 0; i < result.length; i++) {
      ok(RiTa.isAlliteration(result[i], "cat"), 'FAIL2: ' + result[i]);
    }
  });

  // NEXT
  it('Should correctly call rhymes', () => {

    // TODO: add more tests

    ok(RiTa.rhymes("cat").includes("hat"));
    ok(RiTa.rhymes("yellow").includes("mellow"));
    ok(RiTa.rhymes("toy").includes("boy"));
    ok(RiTa.rhymes("sieve").includes("give"));

    ok(RiTa.rhymes("tense").includes("sense"));
    ok(RiTa.rhymes("crab").includes("drab"));
    ok(RiTa.rhymes("shore").includes("more"));

    ok(RiTa.rhymes("mouse").includes("house"));

    ok(RiTa.rhymes("weight").includes("eight"));
    ok(RiTa.rhymes("eight").includes("weight"));

    ok(!RiTa.rhymes("apple").includes("polo"));
    ok(!RiTa.rhymes("this").includes("these"));

    ok(!RiTa.rhymes("hose").includes("house"));
    ok(!RiTa.rhymes("sieve").includes("mellow"));
    ok(!RiTa.rhymes("swag").includes("grab"));
  });

  it('Should correctly call similarBy.letter', () => {
    let result;
    result = RiTa.similarBy("banana", { preserveLength: true });
    eql(result, ["cabana"]);

    result = RiTa.similarBy("");
    eql(result, []);

    result = RiTa.similarBy("banana", { preserveLength: false });
    eql(result, ["banal", "bonanza", "cabana", "manna"]);

    result = RiTa.similarBy("banana");
    eql(result, ["banal", "bonanza", "cabana", "manna"]);

    result = RiTa.similarBy("banana", { minAllowedDistance: 1, preserveLength: true });
    eql(result, ["cabana"]);

    result = RiTa.similarBy("banana", { minAllowedDistance: 1, preserveLength: false });
    eql(result, ["banal", "bonanza", "cabana", "manna"]);

    result = RiTa.similarBy("tornado");
    eql(result, ["torpedo"]);

    result = RiTa.similarBy("ice");
    eql(result, ["ace", "dice", "iced", "icy", "ire", "nice", "rice", "vice"]);

    result = RiTa.similarBy("ice", { minAllowedDistance: 1 });
    eql(result, ["ace", "dice", "iced", "icy", "ire", "nice", "rice", "vice"]);

    result = RiTa.similarBy("ice", { minAllowedDistance: 2, preserveLength: true });
    ok(result.length > 10);

    result = RiTa.similarBy("ice", { minAllowedDistance: 0, preserveLength: true }); // defaults to 1
    eql(result, ["ace", "icy", "ire"]);

    result = RiTa.similarBy("ice", { minAllowedDistance: 1, preserveLength: true });
    eql(result, ["ace", "icy", "ire"]);

    result = RiTa.similarBy("worngword");
    eql(result, ["foreword", "wormwood"]);

    result = RiTa.similarBy("123");
    ok(result.length > 400);
  });

  it('Should correctly call similarBy.sound', () => {

    let result, answer;

    eql(RiTa.similarBy("tornado", { type: 'sound' }), ["torpedo"]);

    result = RiTa.similarBy("try", { type: 'sound' });
    answer = ["cry", "dry", "fry", "pry", "rye", "tie", "tray", "tree", "tribe", "tried", "tripe", "trite", "true", "wry"];
    eql(result, answer);

    result = RiTa.similarBy("try", { type: 'sound', minAllowedDistance: 2 });
    ok(result.length > answer.length); // more

    result = RiTa.similarBy("happy", { type: 'sound' });
    answer = ["happier", "hippie"];
    eql(result, answer);

    result = RiTa.similarBy("happy", { type: 'sound', minAllowedDistance: 2 });
    ok(result.length > answer.length); // more

    result = RiTa.similarBy("cat", { type: 'sound' });
    answer = ["at", "bat", "cab", "cache", "calf", "calve", "can", "can\'t", "cap", "capped", "cash", "cashed", "cast", "caste", "catch", "catty", "caught", "chat", "coat", "cot", "curt", "cut", "fat", "hat", "kit", "kite", "mat", "matt", "matte", "pat", "rat", "sat", "tat", "that", "vat"];
    eql(result, answer);

    result = RiTa.similarBy("cat", { type: 'sound', minAllowedDistance: 2 });
    ok(result.length > answer.length);

    result = RiTa.similarBy("worngword", { type: 'sound' });
    eql(result, ["watchword", "wayward", "wormwood"]);
  });

  it('Should correctly call similarBy.soundAndLetter', () => {
    let result;

    //result = RiTa.similarBy("", { type: 'soundAndLetter' });
    //eql(result, []);

    result = RiTa.similarBy("try", { type: 'soundAndLetter' });
    eql(result, ["cry", "dry", "fry", "pry", "tray", "wry"]);

    result = RiTa.similarBy("daddy", { type: 'soundAndLetter' });
    eql(result, ["dandy", "paddy"]);

    result = RiTa.similarBy("banana", { type: 'soundAndLetter' });
    eql(result, ["bonanza"]);

    result = RiTa.similarBy("worngword", { type: 'soundAndLetter' });
    eql(result, ["wormwood"]);
  });

  it('Should correctly call isRhyme', () => {
    ok(!RiTa.isRhyme("apple", "polo"));
    ok(!RiTa.isRhyme("this", "these"));

    ok(RiTa.isRhyme("cat", "hat"));
    ok(RiTa.isRhyme("yellow", "mellow"));
    ok(RiTa.isRhyme("toy", "boy"));


    ok(RiTa.isRhyme("solo", "tomorrow"));
    ok(RiTa.isRhyme("tense", "sense"));
    ok(RiTa.isRhyme("crab", "drab"));
    ok(RiTa.isRhyme("shore", "more"));
    ok(!RiTa.isRhyme("hose", "house"));
    ok(!RiTa.isRhyme("sieve", "mellow"));

    ok(RiTa.isRhyme("mouse", "house")); //why??
    // ok(!RiTa.isRhyme("solo", "yoyo"));
    // ok(!RiTa.isRhyme("yoyo", "jojo")); -> Known Issues

    ok(RiTa.isRhyme("yo", "bro"));
    ok(!RiTa.isRhyme("swag", "grab"));
    ok(!RiTa.isRhyme("", ""));

    ok(RiTa.isRhyme("weight", "eight"));
    ok(RiTa.isRhyme("eight", "weight"));

    // fail without lexicon
    if (typeof NOLEX !== 'undefined') {
      ok(RiTa.isRhyme("sieve", "give"));
    }
  });

  it('Should correctly call isAlliteration', () => {

    ok(RiTa.isAlliteration("knife", "gnat")); // gnat=lts
    ok(RiTa.isAlliteration("knife", "naughty"));

    ok(RiTa.isAlliteration("sally", "silly"));
    ok(RiTa.isAlliteration("sea", "seven"));
    ok(RiTa.isAlliteration("silly", "seven"));
    ok(RiTa.isAlliteration("sea", "sally"));

    ok(RiTa.isAlliteration("big", "bad"));
    ok(RiTa.isAlliteration("bad", "big")); // swap position

    ok(RiTa.isAlliteration("BIG", "bad")); // CAPITAL LETTERS
    ok(RiTa.isAlliteration("big", "BAD")); // CAPITAL LETTERS
    ok(RiTa.isAlliteration("BIG", "BAD")); // CAPITAL LETTERS

    // False
    ok(!RiTa.isAlliteration("", ""));
    ok(!RiTa.isAlliteration("wind", "withdraw"));
    ok(!RiTa.isAlliteration("solo", "tomorrow"));
    ok(!RiTa.isAlliteration("solo", "yoyo"));
    ok(!RiTa.isAlliteration("yoyo", "jojo"));
    ok(!RiTa.isAlliteration("cat", "access"));

    ok(RiTa.isAlliteration("unsung", "sine"));
    ok(RiTa.isAlliteration("job", "gene"));
    ok(RiTa.isAlliteration("jeans", "gentle"));

    ok(RiTa.isAlliteration("abet", "better"));
    ok(RiTa.isAlliteration("never", "knight"));
    ok(RiTa.isAlliteration("knight", "navel"));
    ok(RiTa.isAlliteration("cat", "kitchen"));

    // not counting assonance
    ok(!RiTa.isAlliteration("octopus", "oblong"));
    ok(!RiTa.isAlliteration("omen", "open"));
    ok(!RiTa.isAlliteration("amicable", "atmosphere"));

    // fail without lexicon
    if (typeof NOLEX !== 'undefined') {
      ok(RiTa.isAlliteration("this", "these"));
      ok(RiTa.isAlliteration("psychology", "cholera"));
      ok(RiTa.isAlliteration("consult", "sultan"));
      ok(RiTa.isAlliteration("monsoon", "super"));
    }
  });

  function eql(output, expected, msg) { expect(output).eql(expected, msg); }
  function eq(a, b, msg) { expect(a).eq(b, msg); }
  function ok(a, msg) { expect(a, msg).to.be.true; }
});
