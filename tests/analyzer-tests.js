const expect = require('chai').expect;
const RiTa = require('../src/rita_api');

describe('RiTa.Analyzer', () => {

  it('Should correctly call analyze', () => {

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

  it('Should correctly call analyze.lts', () => {
    let feats;
    feats = RiTa.analyze("cloze");
    expect(feats.pos).eq("nn");
    expect(feats.tokens).eq("cloze");
    expect(feats.syllables).eq("k-l-ow-z");
  });

  it('Should correctly call stresses', () => {
    let result, answer;

    result = RiTa.stresses("");
    answer = "";
    equal(result, answer);

    result = RiTa.stresses("The emperor had no clothes on");
    answer = "0 1/0/0 1 1 1 1";
    equal(result, answer);

    result = RiTa.stresses("The emperor had no clothes on.");
    answer = "0 1/0/0 1 1 1 1 .";
    equal(result, answer);

    result = RiTa.stresses("The emperor had no clothes on. The King is fat.");
    answer = "0 1/0/0 1 1 1 1 . 0 1 1 1 .";
    equal(result, answer);

    result = RiTa.stresses("to preSENT, to exPORT, to deCIDE, to beGIN");
    answer = "1 1/0 , 1 1/0 , 1 0/1 , 1 0/1";
    equal(result, answer);

    result = RiTa.stresses("to present, to export, to decide, to begin");
    answer = "1 1/0 , 1 1/0 , 1 0/1 , 1 0/1";
    equal(result, answer);

    result = RiTa.stresses("The dog ran faster than the other dog.  But the other dog was prettier.");
    answer = "0 1 1 1/0 1 0 1/0 1 . 1 0 1/0 1 1 1/0/0 .";
    equal(result, answer);

    equal(RiTa.stresses("chevrolet"), "0/0/1");
    equal(RiTa.stresses("women"), "1/0");
    equal(RiTa.stresses("genuine"), "1/0/0");
  });

  it('Should correctly call phonemes', () => {
    let result, answer;

    result = RiTa.phonemes("");
    answer = "";
    equal(result, answer);

    result = RiTa.phonemes("The");
    answer = "dh-ah";
    equal(result, answer);

    result = RiTa.phonemes("said");
    answer = "s-eh-d";
    equal(result, answer);

    result = RiTa.phonemes("The.");
    answer = "dh-ah .";
    equal(result, answer);

    result = RiTa.phonemes("The boy jumped over the wild dog.");
    answer = "dh-ah b-oy jh-ah-m-p-t ow-v-er dh-ah w-ay-l-d d-ao-g .";
    equal(result, answer);

    result = RiTa.phonemes("The boy ran to the store.");
    answer = "dh-ah b-oy r-ae-n t-uw dh-ah s-t-ao-r .";
    equal(result, answer);

    result = RiTa.phonemes("The dog ran faster than the other dog.  But the other dog was prettier.");
    answer = "dh-ah d-ao-g r-ae-n f-ae-s-t-er dh-ae-n dh-ah ah-dh-er d-ao-g . b-ah-t dh-ah ah-dh-er d-ao-g w-aa-z p-r-ih-t-iy-er .";
    equal(result, answer);

    result = RiTa.phonemes("flowers");
    answer = "f-l-aw-er-z";
    equal(result, answer);

    result = RiTa.phonemes("quiche");
    answer = "k-iy-sh";
    equal(result, answer);

    result = RiTa.phonemes("mice");
    answer = "m-ay-s";
    equal(result, answer);

    equal(RiTa.phonemes("chevrolet"), "sh-eh-v-r-ow-l-ey");
    equal(RiTa.phonemes("women"), "w-ih-m-eh-n");
    equal(RiTa.phonemes("genuine"), "jh-eh-n-y-uw-w-ah-n");
  });

  it('Should correctly call syllables', () => {

    expect(RiTa.syllables('deforestations')).eq('d-ih/f-ao/r-ih/s-t-ey/sh-ah-n-z');

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

  it('Should correctly call syllables.lts', () => {
    RiTa.SILENCE_LTS = true;
    expect(RiTa.syllables('The Laggin Dragon')).eq('dh-ah l-ae/g-ih-n d-r-ae/g-ah-n');
    RiTa.SILENCE_LTS = false;
  });

  function ok(res) { expect(res).eq(true); }
  function equal(a, b) { expect(a).eq(b); }
});
