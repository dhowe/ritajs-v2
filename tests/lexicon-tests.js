const expect = require('chai').expect;
const RiTa = require('../src/rita_core');

describe('RiTa.Lexicon', () => {

  it('Should correctly call isAlliteration()', () => {
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
    // ok(!RiTa.isRhyme("solo   ", "tomorrow")); // Word with tab space
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
  function ok(res) { expect(res).eq(true); }
  function equal(a, b) { expect(a).eq(b); }
});
