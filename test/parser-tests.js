const expect = require('chai').expect;
const LexParser = require('../lexparser');
const lexParser = new LexParser();

/*
 TODO:
   -- check we can include html entities
   -- check we can include object properties as transforms
 */
describe('Parser Tests', function () {

  describe('Parse Transforms', function () {
    it('Should throw on bad transforms', function () {
      expect(() => lexParser.lexParseVisitQuiet('a.toUpperCase()')).to.throw();
    });

    it('Should correctly parse/execute transforms', function () {
      expect(lexParser.lexParseVisit('(a | b).toUpperCase()')).to.be.oneOf(['A', 'B']);
      expect(lexParser.lexParseVisit("The (boy | boy).toUpperCase() ate.")).eq('The BOY ate.');
    });
  });

  describe('Parse Symbols', function () {

    it('Should throw on bad symbols', function () {
      expect(() => lexParser.lexParseVisitQuiet('$')).to.throw();
    });

    it('Should correctly parse/resolve symbols', function () {
      expect(lexParser.lexParseVisit('a $dog', { dog: 'terrier' })).eq('a terrier');
      expect(lexParser.lexParseVisit('I ate the $dog', { dog: 'beagle' }, 0)).eq('I ate the beagle');
      expect(lexParser.lexParseVisit('The $dog today.', { dog: 'lab' }, 0)).eq('The lab today.');
      expect(lexParser.lexParseVisit('I ate the $dog.', { dog: 'lab' }, 0)).eq('I ate the lab.');
    });
  });

  describe('Parse Choices', function () {

    it('Should throw on bad choices', function () {

      expect(() => lexParser.lexParseVisitQuiet('|')).to.throw();
      expect(() => lexParser.lexParseVisitQuiet('a |')).to.throw();
      expect(() => lexParser.lexParseVisitQuiet('(|)')).to.throw();
      expect(() => lexParser.lexParseVisitQuiet('a | b')).to.throw();
      expect(() => lexParser.lexParseVisitQuiet('a | b | c')).to.throw();
      expect(() => lexParser.lexParseVisitQuiet('(a | b) | c')).to.throw();
    });

    it('Should correctly parse/select choices', function () {

      expect(lexParser.lexParseVisit('(a)')).eq('a');
      expect(lexParser.lexParseVisit('(a | a)')).eq('a');
      expect(lexParser.lexParseVisit('(a | )')).to.be.oneOf(['a', '']);
      expect(lexParser.lexParseVisit('(a | b)')).to.be.oneOf(['a', 'b']);
      expect(lexParser.lexParseVisit('(a | b | c)'), {}, 1).to.be.oneOf(['a', 'b', 'c']);
      expect(lexParser.lexParseVisit('(a | (b | c) | d)')).to.be.oneOf(['a', 'b', 'c', 'd']);
    });
  });

  /*describe('Failing Tests', function () {
    it('Should be fixed to pass', function () {
    });
  })*/
});
