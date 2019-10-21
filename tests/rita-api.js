const expect = require('chai').expect;
const RiTa = require('../src/rita_api');

describe('RiTa.API', () => {

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

  it('Should call alliterations', () => {
    expect(RiTa.alliterations).to.be.a('function');
  });

  it('Should call analyze', () => {
    expect(RiTa.analyze).to.be.a('function');
  });

  it('Should call concordance', () => {
    expect(RiTa.concordance).to.be.a('function');
  });

  it('Should call conjugate', () => {
    expect(RiTa.conjugate).to.be.a('function');
  });

  it('Should call hasWord', () => {
    expect(RiTa.hasWord('dog')).eq(true);
    expect(RiTa.hasWord('')).eq(false);
  });

  it('Should call env', () => {
    expect(RiTa.env()).eq('node');
  });

  it('Should call pastParticiple', () => {
    expect(RiTa.pastParticiple).to.be.a('function');
  });

  it('Should call phonemes', () => {
    expect(RiTa.phonemes).to.be.a('function');
  });

  it('Should call posTags', () => {
    expect(RiTa.posTags).to.be.a('function');
  });

  it('Should call presentParticiple', () => {
    expect(RiTa.presentParticiple).to.be.a('function');
  });

  it('Should call stresses', () => {
    expect(RiTa.stresses).to.be.a('function');
  });

  it('Should call syllables', () => {
    expect(RiTa.syllables).to.be.a('function');
  });

  it('Should call isAbbreviation', () => {
    expect(RiTa.isAbbreviation).to.be.a('function');
  });

  it('Should call isAdjective', () => {
    expect(RiTa.isAdjective).to.be.a('function');
  });

  it('Should call isAdverb', () => {
    expect(RiTa.isAdverb).to.be.a('function');
  });

  it('Should call isAlliteration', () => {
    expect(RiTa.isAlliteration).to.be.a('function');
  });

  it('Should call isNoun', () => {
    expect(RiTa.isNoun).to.be.a('function');
  });

  it('Should call isPunctuation', () => {
    expect(RiTa.isPunctuation).to.be.a('function');
  });

  it('Should call isQuestion', () => {
    expect(RiTa.isQuestion).to.be.a('function');
  });

  it('Should call isRhyme', () => {
    expect(RiTa.isRhyme).to.be.a('function');
  });

  it('Should call isVerb', () => {
    expect(RiTa.isVerb).to.be.a('function');
  });

  it('Should call kwic', () => {
    RiTa.concordance('The dog ate the cat');
    expect(RiTa.kwic('')).eql([]);
  });

  it('Should call pluralize', () => {
    expect(RiTa.pluralize).to.be.a('function');
  });

  it('Should call random', () => {
    let r = RiTa.random();
    expect(r).gte(0);
    expect(r).lt(1);
  });

  it('Should call randomOrdering', () => {
    expect(RiTa.randomOrdering(1)).eql([0]);
  });

  it('Should call randomSeed', () => {
    expect(RiTa.randomSeed).is.a('function');
  });

  it('Should call randomWord', () => {
    expect(RiTa.randomWord()).is.a('string');
  });

  it('Should call rhymes', () => {
    expect(RiTa.rhymes).to.be.a('function');
  });

  it('Should call evaluate', () => {
    expect(RiTa.evaluate('(a | a)')).eq('a');
  });

  it('Should call similarBy', () => {
    expect(RiTa.similarBy).to.be.a('function');
  });

  it('Should call singularize', () => {
    expect(RiTa.singularize).to.be.a('function');
  });

  it('Should call sentences', () => {
    expect(RiTa.sentences).to.be.a('function');
  });

  it('Should call stem', () => {
    expect(RiTa.stem("cakes")).eq('cake');
  });

  it('Should call tokenize', () => {
    expect(RiTa.tokenize).to.be.a('function');;
  });

  it('Should call untokenize', () => {
    expect(RiTa.untokenize).to.be.a('function');
  });

  it('Should call words', () => {
    expect(RiTa.words).to.be.a('function');
  });

});
