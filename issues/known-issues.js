const expect = require('chai').expect;
const RiTa = require('../src/rita');

describe('RiScript.KnownIssues', () => { // TODO:

  it('Should resolve transforms on phrases', () => {
    let res = RiTa.evaluate("($a dog).pluralize()\n$a=the", null, opts("trace", true));
    assertEquals("the dogs", res); 
  });

  it('Should use phones for articlize', () => {
    expect(RiTa.articlize("honor")).eq('an honor');
  });

  it('Should throw on infinite recursions', () => {
    console.log(RiTa.evaluate('$s', { s: '$a', a: '$s' }));
    expect(() => RiTa.evaluate('$s', { s: '$a', a: '$s' })).to.throw();
  });

  it('Should throw on bad transforms', () => {
    expect(() => RiTa.evaluate('a.toUpperCase()', 0, { silent: 1, trace: 1 })).to.throw();
  });

  it('Should handle RiTa function transforms with args', () => {
    expect(RiTa.evaluate('Is $RiTa.presentParticiple("lie") wrong?',
      {}, { trace: 1, singlePass: 1 })).eq("Is lying wrong?");
  });

  it('1: pluralize or singularize fails', () => {
    let testPairs = []; // SS FAILING ITEMS HERE
    let res1, res2, res3, i = 0, dbug = true;
    if (!testPairs.length) return;
    dbug && console.log(testPairs[i] + '/' + testPairs[i + 1]);

    res1 = RiTa.singularize(testPairs[i], { dbug: dbug });
    res2 = RiTa.pluralize(testPairs[i + 1], { dbug: dbug });
    res3 = RiTa.inflector.isPlural(testPairs[i], { dbug: dbug });

    eq(res1, testPairs[i + 1], 'FAIL: singularize(' + testPairs[i]
      + ') was ' + res1 + ', but expected ' + testPairs[i + 1] + '\n        '
      + 'pluralize(' + testPairs[i + 1] + ') was ' + res2 + '\n\n');

    // pluralize
    eq(res2, testPairs[i], 'FAIL: pluralize(' + testPairs[i + 1]
      + ') was ' + res2 + ', but expected ' + testPairs[i] + '\n        '
      + 'singularize(' + testPairs[i] + ') was ' + res1 + '\n\n');

    ok(res3, 'FAIL: isPlural(' + testPairs[i] + ') was false\n\n');
  });

  0 && it('simple evaluations', function () {
    // should this throw? maybe yes: can do foo&dot;bar - need better error
    expect(RiTa.evaluate('foo.bar', {}, 1)).eq('foo.bar');
  });

  it('Should allow transforms on assignments', () => {   // TODO
    let ctx = {};
    expect(RiTa.evaluate('[$a=a].toUpperCase()', ctx, 0)).eq('');
    expect(ctx.a).eq('A')
  });

  it('Should eval simple expressions', () => {
    // NOT SURE WHAT THIS TEST IS ABOUT
    expect(RiTa.evaluate('$foo=bar \\nbaz\n$foo', {}, TT)).eq('bar baz'); ``
  });

  ///////////////////////////////////#///////////////////////////////////////////

  it('Should pluralize phrases', () => { // failing
    expect(RiTa.evaluate('These ($state feeling).pluralize().',
      { state: '(bad | bad)' }, TT)).eq('These bad feelings.');
  });

  it('Should evaluate inline assigns to vars', () => { // failing
    let rs = RiTa.evaluate('[$chosen=$person] talks to $chosen.', { person: '(Dave | Jill | Pete)' });
    expect(rs).to.be.oneOf(["Dave talks to Dave.", "Jill talks to Jill.", "Pete talks to Pete."])
  });
  ;
});

describe('RiTa.KnownIssues', () => {

  it('Failing to singularize correctly', () => {

    let testPairs = [ // also in java
      "grooves", "groove",
      "universes", "universe",
      "toothbrushes", "toothbrush",
      "clashes", "clash",
      "addresses", "address",
      "flashes", "flash",
      "conclaves", "conclave",
      "promises", "promise",
      "spouses", "spouse",
      "branches", "branch",
      "lapses", "lapse",
      "quizes", "quiz",
      "spyglasses", "spyglass",
      "overpasses", "overpass",
      "clones", "clones",
      "microwaves", "microwave",
      "hypotheses", "hypothesis",
      "pretenses", "pretense",
      "latches", "latch",
      "fetuses", "fetus",
      "alumni", "alumnus",
      "lighthouses", "lighthouse",
      "genuses", "genus",
      "zombies", "zombie",
      "hearses", "hearse",
      "trenches", "trench",
      "paradoxes", "paradox",
      "hippies", "hippie",
      "yuppies", "yuppie",
      "purses", "purse",
      "hatches", "hatch",
      "witches", "witch",
      "sinuses", "sinus",
      "phrases", "phrase",
      "arches", "arch",
      "duplexes", "duplex",
      "missives", "missive",
      "madhouses", "madhouse",
      "pauses", "pause",
      "heroes", "hero",
      "sketches", "sketch",
      "meshes", "mesh",
      "brasses", "brass",
      "marshes", "marsh",
      "masses", "mass",
      "overpasses", "overpass",
      "impulses", "impulse",
      "pelvises", "pelvis",
      "fetishes", "fetish",
      "abysses", "abyss",
      "lighthouses", "lighthouse",
      "gashes", "gash",
      "directives", "directive",
      "calories", "calorie",
      "moves", "move",
      "expanses", "expanse",
      "briefcases", "briefcase",
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
});

function eql(output, expected, msg) { expect(output).eql(expected, msg); }
function ok(res, msg) { expect(res).eq(true, msg); }
function eq(a, b, msg) { expect(a).eq(b, msg); }
