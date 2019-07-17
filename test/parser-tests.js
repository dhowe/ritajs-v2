const expect = require('chai').expect;
const LexParser = require('../lexparser');
const lexParser = new LexParser();

/*
 TODO:
   -- check we can include html entities
   -- check we can include object properties as transforms
   -- check we can include object properties without transform
 */
describe('Parser Tests', function () {

  describe('Parse Transforms', function () {
    it('Should throw on bad transforms', function () {
      expect(() => lexParser.lexParseVisitQuiet('a.toUpperCase()')).to.throw();
    });
    it('Should correctly handle choice transforms', function () {
      expect(lexParser.lexParseVisit('[a | b].toUpperCase()')).to.be.oneOf(['A', 'B']);
      expect(lexParser.lexParseVisit("The [boy | boy].toUpperCase() ate.")).eq('The BOY ate.');
    });
    it('Should correctly handle symbol transforms', function () {
      expect(lexParser.lexParseVisit('The $dog.toUpperCase()', { dog: 'spot' })).eq('The SPOT');
      //expect(lexParser.lexParseVisit("The [boy | boy].toUpperCase() ate.")).eq('The BOY ate.');
    });
    it('Should correctly parse object properties', function () {
      //let dog = { name: 'spot', color: 'white' };
      expect(lexParser.lexParseVisit("It was a $dog.color dog.", { dog: 'spot' }, 1)).eq('It was a white dog.');
      //expect(lexParser.lexParseVisit("It was a $dog.color.toUpperCase() dog.", { dog: dog })).eq('It was a WHITE dog.');
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
      expect(() => lexParser.lexParseVisitQuiet('[|]')).to.throw();
      expect(() => lexParser.lexParseVisitQuiet('a | b')).to.throw();
      expect(() => lexParser.lexParseVisitQuiet('a | b | c')).to.throw();
      expect(() => lexParser.lexParseVisitQuiet('[a | b] | c')).to.throw();
    });

    it('Should correctly parse/select choices', function () {

      expect(lexParser.lexParseVisit('[a]')).eq('a');
      expect(lexParser.lexParseVisit('[a | a]')).eq('a');
      expect(lexParser.lexParseVisit('[a | ]')).to.be.oneOf(['a', '']);
      expect(lexParser.lexParseVisit('[a | b]')).to.be.oneOf(['a', 'b']);
      expect(lexParser.lexParseVisit('[a | b | c]'), {}, 1).to.be.oneOf(['a', 'b', 'c']);
      expect(lexParser.lexParseVisit('[a | [b | c] | d]')).to.be.oneOf(['a', 'b', 'c', 'd']);
    });
  });

  describe('Parse Assignments', function () {
    it('Should correctly assign a variable to a result', function () {
      let context = {};
      let result = lexParser.lexParseVisit('[$stored=[a | b]]', context);
      expect(result).to.be.oneOf(['a', 'b']);
      expect(context.stored).eq(result);
      result = lexParser.lexParseVisit('[$a=$stored]', context);
      expect(context.a).eq(result);
      expect(result).eq(context.stored);
    });
  });

});
