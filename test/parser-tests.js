const expect = require('chai').expect;
const parser = require('../parser');
const process = parser.lexParseVisit;
const processQ = parser.lexParseVisitQuiet;

describe('Parser Tests', function () {

  describe('Parse Transforms', function () {
    it('Should throw on bad transforms', function () {
      expect(() => processQ('a.toUpperCase()')).to.throw();
    });

    it('Should correctly parse/execute transforms', function () {
      //expect(process('(a).toUpperCase()')).eq('a');
      expect(process("The (boy | boy).toUpperCase() ate.")).eq('The BOY ate.');
      // TODO: working here

    });
  });

  describe('Parse Symbols', function () {

    it('Should throw on bad symbols', function () {
      expect(() => processQ('$')).to.throw();
    });

    it('Should correctly parse/resolve symbols', function () {
      expect(process('a $dog', { dog: 'terrier' })).eq('a terrier');
      expect(process('I ate the $dog', { dog: 'beagle' }, 0)).eq('I ate the beagle');
      expect(process('The $dog today.', { dog: 'lab' }, 0)).eq('The lab today.');
      expect(process('I ate the $dog.', { dog: 'lab' }, 0)).eq('I ate the lab.');
    });
  });

  describe('Parse Choices', function () {

    it('Should throw on bad choices', function () {

      expect(() => processQ('|')).to.throw();
      expect(() => processQ('a |')).to.throw();
      expect(() => processQ('(|)')).to.throw();
      expect(() => processQ('a | b')).to.throw();
      expect(() => processQ('a | b | c')).to.throw();
      expect(() => processQ('(a | b) | c')).to.throw();
    });

    it('Should correctly parse/select choices', function () {
      expect(process('(a)')).eq('a');
      expect(process('(a | a)')).eq('a');
      expect(process('(a | )')).to.be.oneOf(['a', '']);
      expect(process('(a | b)')).to.be.oneOf(['a', 'b']);
      expect(process('(a | b | c)'), {}, 1).to.be.oneOf(['a', 'b', 'c']);
      expect(process('(a | (b | c) | d)')).to.be.oneOf(['a', 'b', 'c', 'd']);
    });
  });
});
