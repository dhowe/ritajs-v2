const expect = require('chai').expect;
const RiTa = require('../src/rita');

describe('RiScript.KnownIssues', () => { // TODO:

  it('Should handle complex inlines in grammars', () => {

    let rg, rs;
    rg = new RiGrammar({
      "start": "($chosen=$person) talks to $chosen.",
      "person": "Dave | Jill | Pete"
    });
    rs = rg.expand({ trace: 0 });
    //console.log(rs);
    expect(rs).to.be.oneOf(["Dave talks to Dave.", "Jill talks to Jill.", "Pete talks to Pete."]);

    rg = new RiGrammar({
      "start": "($chosen=$person) talks to $chosen.",
      "person": "$Dave | $Jill | $Pete",
      "Dave": "Dave",
      "Jill": "Jill",
      "Pete": "Pete",
    });
    rs = rg.expand({ trace: 1 });
    expect(rs).to.be.oneOf(["Dave talks to Dave.", "Jill talks to Jill.", "Pete talks to Pete."]);
  });

  it('Should handle RiTa function transforms with args', () => {
    expect(RiTa.evaluate('Is $RiTa.presentPart(lie) wrong?',
      {}, { trace: 1, singlePass: 1 })).eq("Is lying wrong?");
  });

  it('Should throw on infinite recursions', () => { // error-handling
    console.log(RiTa.evaluate('$s', { s: '$a', a: '$s' }));
    expect(() => RiTa.evaluate('$s', { s: '$a', a: '$s' })).to.throw();
  });

  it('Should throw on bad transforms', () => { // error-handling
    expect(() => RiTa.evaluate('a.toUpperCase()', 0, { silent: 1, trace: 1 })).to.throw();
  });



  it('Should eval simple expressions', () => {
    // NOT SURE WHAT THIS TEST IS ABOUT
    expect(RiTa.evaluate('$foo=bar \\nbaz\n$foo', {}, TT)).eq('bar baz'); ``
  });

  it('parse select choices TX', () => {
    let upf = x => x.toLowerCase();
    expect(RiTa.evaluate("(a | a).up()", { up: upf }), { trace: true }).eq("A");
  });

});

describe('RiTa.KnownIssues', () => {

  it('Failing to tag correctly', () => {

    eql(RiTa.pos('a light blue sky'), ['dt', 'jj', 'jj', 'nn']);
    eql(RiTa.pos('as the sun came up and winds from Canada blew down.'), []); // check

  });

  it('Failing to pluralize correctly', () => {

    let testPairs = [ // also in java

      // NOTHING NOW
    ];

    let res1, res2, res3, dbug = 0;

    for (let i = 0; i < testPairs.length; i += 2) {

      dbug && console.log(testPairs[i] + '/' + testPairs[i + 1]);

      res1 = RiTa.singularize(testPairs[i], { dbug: dbug });
      res2 = RiTa.pluralize(testPairs[i + 1], { dbug: dbug });
      res3 = RiTa.inflector.isPlural(testPairs[i], { dbug: dbug, fatal: false });

      // singularize
      eq(res1, testPairs[i + 1], 'FAIL: singularize(' + testPairs[i]
        + ') was ' + res1 + ', but expected ' + testPairs[i + 1] + '\n        '
        + 'pluralize(' + testPairs[i + 1] + ') was ' + res2 + '\n\n');

      // pluralize
      eq(res2, testPairs[i], 'FAIL: pluralize(' + testPairs[i + 1]
        + ') was ' + res2 + ', but expected ' + testPairs[i] + '\n        '
        + 'singularize(' + testPairs[i] + ') was ' + res1 + '\n\n');

      // isPlural
      ok(res3, 'FAIL: isPlural(' + testPairs[i] + ') was false\n\n');
    }
  });

  it('Failing for showing literal dollar sign', () => {
    expect(RiTa.evaluate("This is &#36100", {})).eq("This is $100");
    expect(RiTa.evaluate("This is &#x00024100", {})).eq("This is $100");
    //or maybe some way to seperate &#36 and the digits behind in the Riscript?
  });
});

function eql(output, expected, msg) { expect(output).eql(expected, msg); }
function ok(res, msg) { expect(res).eq(true, msg); }
function eq(a, b, msg) { expect(a).eq(b, msg); }
