const expect = require('chai').expect;
const RiTa = require('../src/rita_core');

describe('Library Structure', () => {

  describe('RiTa Object', () => {

    it('Should access static constants', () => {
      expect(RiTa.VERSION).eq(2);
    });

    it('Should access static functions', () => {
      expect(RiTa.hasWord("dog")).eq(true);
    });

    it('Should access member classes', () => {
      let rm = new RiTa.RiMarkov(3);
      expect(rm.n).eq(3);
    });
  });

  describe('RiTa API functions', () => {

    it('Should correctly call alliterations()', () => {
      expect(RiTa.alliterations()).eq('');
    });

    it('Should correctly call concordance()', () => {
      expect(RiTa.concordance()).eq('');
    });

    it('Should correctly call conjugate()', () => {
      expect(RiTa.conjugate()).eq('');
    });

    it('Should correctly call hasWord()', () => {
      expect(RiTa.hasWord('dog')).eq(true);
      expect(RiTa.hasWord('')).eq(false);
    });

    it('Should correctly call env()', () => {
      expect(RiTa.env()).eq('node');
    });

    it('Should correctly call pastParticiple()', () => {
      expect(RiTa.pastParticiple()).eq('');
    });

    it('Should correctly call phonemes()', () => {
      expect(RiTa.phonemes()).eq('');
    });

    it('Should correctly call posTags()', () => {
      expect(RiTa.posTags()).eq('');
    });

    it('Should correctly call posTagsInline()', () => {
      expect(RiTa.posTagsInline()).eq('');
    });

    it('Should correctly call presentParticiple()', () => {
      expect(RiTa.presentParticiple()).eq('');
    });

    it('Should correctly call stresses()', () => {
      expect(RiTa.stresses()).eq('');
    });

    it('Should correctly call syllables()', () => {
      expect(RiTa.syllables()).eq('');
    });

    it('Should correctly call isAbbrev()', () => {
      expect(RiTa.isAbbrev()).eq('');
    });

    it('Should correctly call isAdjective()', () => {
      expect(RiTa.isAdjective()).eq('');
    });

    it('Should correctly call isAdverb()', () => {
      expect(RiTa.isAdverb()).eq('');
    });

    it('Should correctly call isAlliteration()', () => {
      expect(RiTa.isAlliteration()).eq('');
    });

    it('Should correctly call isNoun()', () => {
      expect(RiTa.isNoun()).eq('');
    });

    it('Should correctly call isPunctuation()', () => {
      expect(RiTa.isPunctuation()).eq('');
    });

    it('Should correctly call isQuestion()', () => {
      expect(RiTa.isQuestion()).eq('');
    });

    it('Should correctly call isRhyme()', () => {
      expect(RiTa.isRhyme()).eq('');
    });

    it('Should correctly call isVerb()', () => {
      expect(RiTa.isVerb()).eq('');
    });

    it('Should correctly call kwic()', () => {
      expect(RiTa.kwic()).eq('');
    });

    it('Should correctly call pluralize()', () => {
      expect(RiTa.pluralize()).eq('');
    });

    it('Should correctly call random()', () => {
      let r = RiTa.random();
      expect(r).gte(0);
      expect(r).lt(1);
    });

    it('Should correctly call randomOrdering()', () => {
      expect(RiTa.randomOrdering(1)).eql([0]);
    });

    it('Should correctly call randomSeed()', () => {
      expect(RiTa.randomSeed).is.a('function');
    });

    it('Should correctly call randomWord()', () => {
      expect(RiTa.randomWord()).is.a('string');
    });

    it('Should correctly call rhymes()', () => {
      expect(RiTa.rhymes()).eq('');
    });

    it('Should correctly call runScript()', () => {
      expect(RiTa.runScript('(a | a)')).eq('a');
    });

    it('Should correctly call similarBy()', () => {
      expect(RiTa.similarBy()).eq('');
    });

    it('Should correctly call singularize()', () => {
      expect(RiTa.singularize()).eq('');
    });

    it('Should correctly call sentences()', () => {
      expect(RiTa.sentences()).eq('');
    });

    it('Should correctly call stem()', () => {
      expect(RiTa.stem("cakes")).eq('cake');
    });

    it('Should correctly call tokenize()', () => {
      expect(RiTa.tokenize()).eq('');
    });

    it('Should correctly call untokenize()', () => {
      expect(RiTa.untokenize()).eq('');
    });

    it('Should correctly call words()', () => {
      expect(RiTa.words()).eq('');
    });

  });

});
