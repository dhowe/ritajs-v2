const expect = require('chai').expect;
const RiTa = require('../src/rita_core');

describe('RiTa Object', () => {

  describe('RiTa.tokenizer', () => {
    it('Should correctly call tokenize()', () => {
      expect(RiTa.analyze('')).eql([]);
      let feats = RiTa.analyze("chevrolet");
      console.log("FEATS",feats);
      expect(feats.words).eq("chevrolet");
      expect(feats.syllables).eq("sh-eh-v/r-ow/l-ey");
    });
  });
  describe('RiTa.syllables()', () => {

    it('Should correctly call analyze()', () => {
      expect(RiTa.analyze('')).eql([]);
      let feats = RiTa.analyze("chevrolet");
      console.log("FEATS",feats);
      expect(feats.words).eq("chevrolet");
      expect(feats.syllables).eq("sh-eh-v/r-ow/l-ey");
    });

return;

    it('Should correctly call syllables()', () => {

      expect(RiTa.syllables('')).eq('');
      expect(RiTa.syllables("chevrolet")).eq("sh-eh-v/r-ow/l-ey");
      expect(RiTa.syllables("women")).eq("w-ih/m-eh-n");
      expect(RiTa.syllables("genuine")).eq("jh-eh-n/y-uw/w-ah-n");

      let input, expected;

      input = 'The dog ran faster than the other dog. But the other dog was prettier.';
      expected = 'dh-ah d-ao-g r-ae-n f-ae/s-t-er dh-ae-n dh-ah ah/dh-er d-ao-g . b-ah-t dh-ah ah/dh-er d-ao-g w-aa-z p-r-ih/t-iy/er .';
      expect(RiTa.syllables(input)).eq(expected);

      input = 'The emperor had no clothes on.';
      expected = 'dh-ah eh-m/p-er/er hh-ae-d n-ow k-l-ow-dh-z aa-n .';
      expect(RiTa.syllables(input)).eq(expected);

      input = 'The Laggin Dragon';
      expected = 'dh-ah l-ae/g-ih-n d-r-ae/g-ah-n';
      expect(RiTa.syllables(input)).eq(expected);
    });

    // TODO: remainder of rita functions

  });

});
