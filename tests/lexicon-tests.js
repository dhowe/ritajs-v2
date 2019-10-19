const expect = require('chai').expect;
const RiTa = require('../src/rita_core');

describe('RiTa.Lexicon', () => {

  it('Should correctly call alliterations()', () => {

    let result;

    // TODO: make sure we have LTS cases in here

    result = RiTa.alliterations("");
    ok(result.length < 1);

    result = RiTa.alliterations("#$%^&*");
    ok(result.length < 1);

    result = RiTa.alliterations("umbrella");
    ok(result.length < 1);

    result = RiTa.alliterations("cat stress");
    ok(result.length > 2000);

    result = RiTa.alliterations("cat");
    ok(result.length > 2000);
    for (let i = 0; i < result.length; i++) {
      ok(RiTa.isAlliteration(result[i], "cat"));
    }

    result = RiTa.alliterations("dog");
    ok(result.length > 1000);
    for (let i = 0; i < result.length; i++) {
      ok(RiTa.isAlliteration(result[i], "dog"));
    }

    result = RiTa.alliterations("dog", { matchMinLength: 15 });
    ok(result.length < 5, "got length=" + result.length);
    for (let i = 0; i < result.length; i++) {
      ok(RiTa.isAlliteration(result[i], "dog"), 'FAIL1: ' + result[i]);
    }

    result = RiTa.alliterations("cat", { matchMinLength: 16 });
    ok(result.length < 15);
    for (let i = 0; i < result.length; i++) {
      ok(RiTa.isAlliteration(result[i], "cat"), 'FAIL2: ' + result[i]);
    }
  });

  // NEXT
  it('Should correctly call rhymes()', () => {

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
    ok(!RiTa.rhymes("this").includes( "these"));

    ok(!RiTa.rhymes("hose").includes("house"));
    ok(!RiTa.rhymes("sieve").includes("mellow"));
    ok(!RiTa.rhymes("swag").includes("grab"));
  });

  it('Should correctly call similarBy(Letter)', () => {
    let result;

    result = RiTa.similarBy("");
    deepEqual(result, []);

    result = RiTa.similarBy("banana", {preserveLength: true});
    deepEqual(result, ["cabana"]);

    result = RiTa.similarBy("banana",{preserveLength: false});
    deepEqual(result, ["banal", "bonanza", "cabana", "manna"]);

    result = RiTa.similarBy("banana");
    deepEqual(result, ["banal", "bonanza", "cabana", "manna"]);

    result = RiTa.similarBy("banana", {minAllowedDistance: 1, preserveLength: true});
    deepEqual(result, ["cabana"]);

    result = RiTa.similarBy("banana", {minAllowedDistance: 1, preserveLength: false});
    deepEqual(result, ["banal", "bonanza", "cabana", "manna"]);

    result = RiTa.similarBy("tornado");
    deepEqual(result, ["torpedo"]);

    result = RiTa.similarBy("ice");
    deepEqual(result, ["ace", "dice", "iced", "icy", "ire", "nice", "rice", "vice"]);

    result = RiTa.similarBy("ice", 1);
    deepEqual(result, ["ace", "dice", "iced", "icy", "ire", "nice", "rice", "vice"]);

    result = RiTa.similarBy("ice", { minAllowedDistance: 2, preserveLength: true});
    ok(result.length > 10);

    result = RiTa.similarBy("ice", { minAllowedDistance: 0, preserveLength: true}); // defaults to 1
    deepEqual(result, ["ace", "icy", "ire"]);

    result = RiTa.similarBy("ice", { minAllowedDistance: 1, preserveLength: true});
    deepEqual(result, ["ace", "icy", "ire"]);

    result = RiTa.similarBy("worngword");
    deepEqual(result, ["foreword", "wormwood"]);

    result = RiTa.similarBy("123");
    ok(result.length > 400);
  });

  it('Should correctly call similarBy(Sound)', () => {

    let result, answer;

    deepEqual(RiTa.similarBy("tornado", { type: 'sound' }), ["torpedo"]);

    result = RiTa.similarBy("try", { type: 'sound'});
    answer = ["cry", "dry", "fry", "pry", "rye", "tie", "tray", "tree", "tribe", "tried", "tripe", "trite", "true", "wry"];
    deepEqual(result, answer);

    result = RiTa.similarBy("try", { type: 'sound', minAllowedDistance: 2});
    ok(result.length > answer.length); // more

    result = RiTa.similarBy("happy", { type: 'sound'});
    answer = ["happier", "hippie"];
    deepEqual(result, answer);

    result = RiTa.similarBy("happy", { type: 'sound', minAllowedDistance: 2});
    ok(result.length > answer.length); // more

    result = RiTa.similarBy("cat", { type: 'sound' });
    answer = ["at", "bat", "cab", "cache", "calf", "calve", "can", "can\'t", "cap", "capped", "cash", "cashed", "cast", "caste", "catch", "catty", "caught", "chat", "coat", "cot", "curt", "cut", "fat", "hat", "kit", "kite", "mat", "matt", "matte", "pat", "rat", "sat", "tat", "that", "vat"];
    deepEqual(result, answer);

    result = RiTa.similarBy("cat", { type: 'sound', minAllowedDistance: 2});
    ok(result.length > answer.length);

    result = RiTa.similarBy("worngword", { type: 'sound' });
    deepEqual(result, ["watchword", "wayward", "wormwood"]);
  });

  it('Should correctly call similarBy(SoundAndLetter)', () => {
    let result;

    result = RiTa.similarBy("", { type: 'soundAndLetter'});
    deepEqual(result, []);

    result = RiTa.similarBy("try", { type: 'soundAndLetter'});
    deepEqual(result, ["cry", "dry", "fry", "pry", "tray", "wry"]);

    result = RiTa.similarBy("daddy", { type: 'soundAndLetter'});
    deepEqual(result, ["dandy", "paddy"]);

    result = RiTa.similarBy("banana", { type: 'soundAndLetter'});
    deepEqual(result, ["bonanza"]);

    result = RiTa.similarBy("worngword", { type: 'soundAndLetter'});
    deepEqual(result, ["wormwood"]);
  });

  it('Should correctly call isRhyme()', () => {
    ok(!RiTa.isRhyme("apple", "polo"));
    ok(!RiTa.isRhyme("this", "these"));

    ok(RiTa.isRhyme("cat", "hat"));
    ok(RiTa.isRhyme("yellow", "mellow"));
    ok(RiTa.isRhyme("toy", "boy"));
    ok(RiTa.isRhyme("sieve", "give"));

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
  });

  it('Should correctly call isAlliteration()', () => {

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
    ok(RiTa.isAlliteration("this", "these"));

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
    ok(RiTa.isAlliteration("psychology", "cholera"));
    ok(RiTa.isAlliteration("consult", "sultan"));
    ok(RiTa.isAlliteration("never", "knight"));
    ok(RiTa.isAlliteration("knight", "navel"));
    ok(RiTa.isAlliteration("monsoon", "super"));
    ok(RiTa.isAlliteration("cat", "kitchen"));

    // not counting assonance
    ok(!RiTa.isAlliteration("octopus", "oblong"));
    ok(!RiTa.isAlliteration("omen", "open"));
    ok(!RiTa.isAlliteration("amicable", "atmosphere"));
  });

  function deepEqual(output, expected, msg) { expect(output).eql(expected, msg); }
  function ok(res, msg) { expect(res).eq(true, msg); }
  function equal(a, b, msg) { expect(a).eq(b, msg); }
});
