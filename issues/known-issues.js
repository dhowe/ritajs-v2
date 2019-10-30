const expect = require('chai').expect;
const RiTa = require('../src/rita_api');

describe('RiTa.KnownIssues', () => {

  it('2: should do de-pluralization before features ', () => {

    expect(RiTa.syllables('deforestations')).eq(RiTa.syllables('deforestation')+'-z');

  });

  it('1: conjugation fails', () => {

    let args = {
      number: RiTa.PLURAL,
      person: RiTa.SECOND_PERSON,
      tense: RiTa.PAST_TENSE
    };
    expect(RiTa.conjugate("barter", args)).eq("bartered");
    expect(RiTa.conjugate("run", args)).eq("ran");

    s = ["compete", "complete", "eject"];
    a = ["competed", "completed", "ejected"];
    expect(a.length).eq(s.length);
    for (let i = 0; i < s.length; i++) {
      expect(RiTa.conjugate(s[i])).eq(a[i]);
    }
  });

  function eql(output, expected, msg) { expect(output).eql(expected, msg); }
  function ok(res, msg) { expect(res).eq(true, msg); }
  function eq(a, b, msg) { expect(a).eq(b, msg); }
});
