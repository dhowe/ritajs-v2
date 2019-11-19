const expect = require('chai').expect;
const RiTa = require('../src/rita_api');

// See also 'Failing Tests' in riscript-tests.js

describe('RiTa.KnownIssues', () => {

  it('1: must do de-pluralization before features ', () => {

    expect(RiTa.syllables('deforestations')).eq(RiTa.syllables('deforestation') + '-z');

  });

  it('2: conjugation fails', () => {

    let args = {
      number: RiTa.PLURAL,
      person: RiTa.SECOND_PERSON,
      tense: RiTa.PAST_TENSE
    };
    s = ["compete", "complete", "eject"];
    a = ["competed", "completed", "ejected"];
    expect(a.length).eq(s.length);
    for (let i = 0; i < s.length; i++) {
      expect(RiTa.conjugate(s[i])).eq(a[i]);
    }
  });

  it('3: isRhyme fails', () => {

    ok(!RiTa.isRhyme("yoyo", "jojo"));
  });

  function eql(output, expected, msg) { expect(output).eql(expected, msg); }
  function ok(res, msg) { expect(res).eq(true, msg); }
  function eq(a, b, msg) { expect(a).eq(b, msg); }
});
