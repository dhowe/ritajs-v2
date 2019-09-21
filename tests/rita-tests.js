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

  it('Should correctly call syllables()', () => {

    RiTa.SILENCE_LTS = false;

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

    let input, expected;
    input = 'The Laggin Dragon';
    expected = 'dh-ah l-ae/g-ih-n d-r-ae/g-ah-n';
    expect(RiTa.syllables(input)).eq(expected);

    RiTa.SILENCE_LTS = false;
  });

  // TODO: remainder of rita functions
});


function ok(res) { expect(res).eq(true); }
