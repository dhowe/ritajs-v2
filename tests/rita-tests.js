const expect = require('chai').expect;
const RiTa = require('../src/rita_core');

describe('RiTa Object', () => {

  it('Should correctly call analyze()', () => {

    expect(RiTa.analyze('')).eql({ tokens: '', pos: '', stresses: '', phonemes: '', syllables: '' });

    let feats;
    feats = RiTa.analyze("clothes");
    expect(feats.pos).eq("nns");
    expect(feats.tokens).eq("clothes");
    expect(feats.syllables).eq("k-l-ow-dh-z");

    feats = RiTa.analyze("the clothes");
    expect(feats.pos).eq("dt nns");
    expect(feats.tokens).eq("the clothes");
    expect(feats.syllables).eq("dh-ah k-l-ow-dh-z");

    feats = RiTa.analyze("chevrolet");
    expect(feats.tokens).eq("chevrolet");
    expect(feats.syllables).eq("sh-eh-v/r-ow/l-ey");
  });

  it('Should correctly call analyze(lts)', () => {
    let feats;
    feats = RiTa.analyze("cloze");
    expect(feats.pos).eq("nn");
    expect(feats.tokens).eq("cloze");
    expect(feats.syllables).eq("k-l-ow-z");
  });


  it('Should correctly call isPunctuation()', () => {

    ok(!RiTa.isPunctuation("What the"));
    ok(!RiTa.isPunctuation("What ! the"));
    ok(!RiTa.isPunctuation(".#\"\\!@i$%&}<>"));

    ok(RiTa.isPunctuation("!"));
    ok(RiTa.isPunctuation("?"));
    ok(RiTa.isPunctuation("?!"));
    ok(RiTa.isPunctuation("."));
    ok(RiTa.isPunctuation(".."));
    ok(RiTa.isPunctuation("..."));
    ok(RiTa.isPunctuation("...."));
    ok(RiTa.isPunctuation("%..."));

    ok(!RiTa.isPunctuation("! "));
    //space
    ok(!RiTa.isPunctuation(" !"));
    //space
    ok(!RiTa.isPunctuation("!  "));
    //double space
    ok(!RiTa.isPunctuation("  !"));
    //double space
    ok(!RiTa.isPunctuation("!  "));
    //tab space
    ok(!RiTa.isPunctuation("   !"));

    let punct;

    punct = '$%&^,';
    for (let i = 0; i < punct.length; i++) {
      ok(RiTa.isPunctuation(punct[i]));
    }

    punct = ",;:!?)([].#\"\\!@$%&}<>|+=-_\\/*{^";
    for (let i = 0; i < punct.length; i++) {
      ok(RiTa.isPunctuation(punct[i]), punct[i]);
    }

    // TODO: also test multiple characters strings here ****
    punct = "\"��������`'";
    for (let i = 0; i < punct.length; i++) {
      ok(RiTa.isPunctuation(punct[i]), punct[i]);
    }

    punct = "\"��������`',;:!?)([].#\"\\!@$%&}<>|+=-_\\/*{^";
    for (let i = 0; i < punct.length; i++) {
      ok(RiTa.isPunctuation(punct[i]), punct[i]);
    }

    // TODO: and here...
    let nopunct = 'Helloasdfnals  FgG   \t kjdhfakjsdhf askjdfh aaf98762348576';
    for (let i = 0; i < nopunct.length; i++) {
      ok(!RiTa.isPunctuation(nopunct[i]), nopunct[i]);
    }

    ok(!RiTa.isPunctuation(""));
  });

  it('Should correctly call pluralize()', () => {

    let tests = [
      "media", "medium",
      "millennia", "millennium",
      "consortia", "consortium",
      "concerti", "concerto",
      "septa", "septum",
      "termini", "terminus",
      "larvae", "larva",
      "vertebrae", "vertebra",
      "memorabilia", "memorabilium",
      "sheafs", "sheaf",
      "spoofs", "spoof",
      "proofs", "proof",
      "roofs", "roof",
      "disbeliefs", "disbelief",
      "indices", "index",
      "accomplices", "accomplice"
    ];
    for (let i = 0; i < tests.length; i += 2) {
      //console.log(tests[i], RiTa.pluralize(tests[i + 1]),tests[i + 1]);
      equal(tests[i], RiTa.pluralize(tests[i + 1]));
    }

    // uncountable
    tests = [
      "turf", "macaroni", "spaghetti", "potpourri", "electrolysis"
    ];
    for (let i = 0; i < tests.length; i++) {
      equal(tests[i], RiTa.pluralize(tests[i]));
    }

    equal("blondes", RiTa.pluralize("blonde"));
    equal("eyes", RiTa.pluralize("eye"));
    equal("blondes", RiTa.pluralize("blond"));

    equal("dogs", RiTa.pluralize("dog"));
    equal("feet", RiTa.pluralize("foot"));
    equal("men", RiTa.pluralize("man"));

    equal("beautifuls", RiTa.pluralize("beautiful"));
    equal("teeth", RiTa.pluralize("tooth"));
    equal("cakes", RiTa.pluralize("cake"));
    equal("kisses", RiTa.pluralize("kiss"));
    equal("children", RiTa.pluralize("child"));

    equal("randomwords", RiTa.pluralize("randomword"));
    equal("lice", RiTa.pluralize("louse"));

    equal("sheep", RiTa.pluralize("sheep"));
    equal("shrimps", RiTa.pluralize("shrimp"));
    equal("series", RiTa.pluralize("series"));
    equal("mice", RiTa.pluralize("mouse"));

    equal("", RiTa.pluralize(""));

    equal(RiTa.pluralize("tomato"), "tomatoes");
    equal(RiTa.pluralize("toe"), "toes");

    equal(RiTa.pluralize("deer"), "deer");
    equal(RiTa.pluralize("ox"), "oxen");

    equal(RiTa.pluralize("tobacco"), "tobacco");
    equal(RiTa.pluralize("cargo"), "cargo");
    equal(RiTa.pluralize("golf"), "golf");
    equal(RiTa.pluralize("grief"), "grief");
    equal(RiTa.pluralize("wildlife"), "wildlife");
    equal(RiTa.pluralize("taxi"), "taxis");
    equal(RiTa.pluralize("Chinese"), "Chinese");
    equal(RiTa.pluralize("bonsai"), "bonsai");

    equal(RiTa.pluralize("whiz"), "whizzes");
    equal(RiTa.pluralize("prognosis"), "prognoses");
    equal(RiTa.pluralize("gas"), "gases");
    equal(RiTa.pluralize("bus"), "buses");

    equal("crises", RiTa.pluralize("crisis"));
    equal("theses", RiTa.pluralize("thesis"));
    equal("apotheses", RiTa.pluralize("apothesis"));
    equal("stimuli", RiTa.pluralize("stimulus"));
    equal("alumni", RiTa.pluralize("alumnus"));
    equal("corpora", RiTa.pluralize("corpus"));
    equal("menus", RiTa.pluralize("menu"));

    equal("hardness", RiTa.pluralize("hardness"));
    equal("shortness", RiTa.pluralize("shortness"));
    equal("dreariness", RiTa.pluralize("dreariness"));
    equal("unwillingness", RiTa.pluralize("unwillingness"));
    equal("deer", RiTa.pluralize("deer"));
    equal("fish", RiTa.pluralize("fish"));
    equal("moose", RiTa.pluralize("moose"));

    equal("aquatics", RiTa.pluralize("aquatics"));
    equal("mechanics", RiTa.pluralize("mechanics"));
  });

  it('Should correctly call syllables()', () => {

    expect(RiTa.syllables('clothes')).eq('k-l-ow-dh-z');

    expect(RiTa.syllables('')).eq('');
    expect(RiTa.syllables("chevrolet")).eq("sh-eh-v/r-ow/l-ey");

    expect(RiTa.syllables("women")).eq("w-ih/m-eh-n");
    expect(RiTa.syllables("genuine")).eq("jh-eh-n/y-uw/w-ah-n");

    let input, expected;

    input = 'The emperor had no clothes on.';
    expected = 'dh-ah eh-m/p-er/er hh-ae-d n-ow k-l-ow-dh-z aa-n .';
    expect(RiTa.syllables(input)).eq(expected);

    input = 'The dog ran faster than the other dog. But the other dog was prettier.';
    expected = 'dh-ah d-ao-g r-ae-n f-ae/s-t-er dh-ae-n dh-ah ah/dh-er d-ao-g . b-ah-t dh-ah ah/dh-er d-ao-g w-aa-z p-r-ih/t-iy/er .';
    expect(RiTa.syllables(input)).eq(expected);

    input = 'The dog ran faster than the other dog. But the other dog was prettier.';
    expected = 'dh-ah d-ao-g r-ae-n f-ae/s-t-er dh-ae-n dh-ah ah/dh-er d-ao-g . b-ah-t dh-ah ah/dh-er d-ao-g w-aa-z p-r-ih/t-iy/er .';
    expect(RiTa.syllables(input)).eq(expected);

    input = 'The emperor had no clothes on.';
    expected = 'dh-ah eh-m/p-er/er hh-ae-d n-ow k-l-ow-dh-z aa-n .';
    expect(RiTa.syllables(input)).eq(expected);
  });

  it('Should correctly call syllables(lts)', () => {
    RiTa.SILENCE_LTS = true;
    expect(RiTa.syllables('The Laggin Dragon')).eq('dh-ah l-ae/g-ih-n d-r-ae/g-ah-n');
    RiTa.SILENCE_LTS = false;
  });

  // TODO: remainder of rita functions
});


function ok(res) { expect(res).eq(true); }
function equal(a,b) {
  console.log(a,"?=",b);
  expect(a).eq(b);
}
