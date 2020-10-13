const expect = require('chai').expect;
const RiTa = require('../src/rita');
const RiScript = require('../src/riscript');

describe('RiTa.KnownIssues', () => {

  it('Failing to singularize correctly', () => {

    let testPairs = [ // also in java
      "grooves", "groove",
      "bambinoes", "bambino",
      "universes", "universe",
      "toothbrushes", "toothbrush",
      "clashes", "clash",
      "credoes", "credo",
      "verves", "verve",
      "sudses", "sudse",
      "addresses", "address",
      "brownies", "browny",
      "consensuses", "consensus",
      "stuccoes", "stucco",
      "flashes", "flash",
      "obverses", "obverse",
      "morasses", "morass",
      "conclaves", "conclave",
      "desperadoes", "desperado",
      "pesoes", "peso",
      "promises", "promise",
      "tangoes", "tango",
      "spouses", "spouse",
      "acumens", "acumen",
      "undresses", "undress",
      "branches", "branch",
      "lapses", "lapse",
      "quizes", "quiz",
      "spyglasses", "spyglass",
      "overpasses", "overpass",
      "hashes", "hash",
      "cloneses", "clones",
      "potashes", "potash",
      "vetoes", "veto",
      "biggies", "biggie",
      "sleeves", "sleeve",
      "microwaves", "microwave",
      "hypotheses", "hypothesis",
      "pretenses", "pretense",
      "latches", "latch",
      "espressoes", "espresso",
      "pooches", "pooch",
      "fetuses", "fetus",
      "alumni", "alumnus",
      "lighthouses", "lighthouse",
      "weirdoes", "weirdo",
      "onyxes", "onyx",
      "genuses", "genus",
      "zombies", "zombie",
      "hearses", "hearse",
      "trenches", "trench",
      "paradoxes", "paradox",
      "hippies", "hippie",
      "tempoes", "tempo",
      "yuppies", "yuppie",
      "purses", "purse",
      "hatches", "hatch",
      "witches", "witch",
      "latexes", "latex",
      "sinuses", "sinus",
      "ostinatoes", "ostinato",
      "phrases", "phrase",
      "gustoes", "gusto",
      "gauchoes", "gaucho",
      "arches", "arch",
      "bitches", "bitch",
      "duplexes", "duplex",
      "hairdoes", "hairdo",
      "missives", "missive",
      "madhouses", "madhouse",
      "winoes", "wino",
      "washes", "wash",
      "pauses", "pause",
      "heroes", "hero",
      "sketches", "sketch",
      "conclaves", "conclave",
      "meshes", "mesh",
      "microeconomicses", "microeconomics",
      "cornstarches", "cornstarch",
      "amicuses", "amicus",
      "brasses", "brass",
      "marshes", "marsh",
      "masses", "mass",
      "esophaguses", "esophagus",
      "overpasses", "overpass",
      "impulses", "impulse",
      "pelvises", "pelvis",
      "electrodynamicses", "electrodynamics",
      "fetishes", "fetish",
      "manganeses", "manganese",
      "abysses", "abyss",
      "lighthouses", "lighthouse",
      "gashes", "gash",
      "pachinkoes", "pachinko",
      "calculuses", "calculus",
      "moxies", "moxie",
      "thatches", "thatch",
      "dynamoes", "dynamo",
      "lurches", "lurch",
      "vortexes", "vortex",
      "crunches", "crunch",
      "directives", "directive",
      "calories", "calorie",
      "kimonoes", "kimono",
      "witches", "witch",
      "moves", "move",
      "expanses", "expanse",
      "chaises", "chaise",
      "metroes", "metro",
      "briefcases", "briefcase"
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

  0 && it('1: pluralize or singularize fails', () => {
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
});

function eql(output, expected, msg) { expect(output).eql(expected, msg); }
function ok(res, msg) { expect(res).eq(true, msg); }
function eq(a, b, msg) { expect(a).eq(b, msg); }
