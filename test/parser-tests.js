require('../transforms');
const expect = require('chai').expect;
const lexParser = new(require('../lexparser'))();

describe('Parser Tests', function () {

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
      expect(lexParser.lexParseVisitQuiet('[|]')).eq('');
    });

    it('Should parse choices from an expression', function () {

      expect(lexParser.lexParseVisit("x [a | a | a] x")).eq('x a x');
      expect(lexParser.lexParseVisit("x [a | a | a]")).eq('x a');
      expect(lexParser.lexParseVisit("x [a | a | a]x")).eq('x ax');
      expect(lexParser.lexParseVisit("x[a | a | a] x")).eq('xa x');
      expect(lexParser.lexParseVisit("x[a | a | a]x")).eq('xax');
      expect(lexParser.lexParseVisit("x [a | a | a] [b | b | b] x")).eq('x a b x');
      expect(lexParser.lexParseVisit("x [a | a | a][b | b | b] x")).eq('x ab x');
      expect(lexParser.lexParseVisit("x [a | a] [b | b] x")).eq('x a b x');
      expect(lexParser.lexParseVisit('[a|b]')).matches(/a|b/);
      expect(lexParser.lexParseVisit('[a|]')).matches(/a?/);
      expect(lexParser.lexParseVisit('[a|a]')).eq('a');
      expect(lexParser.lexParseVisit('[|a|]')).to.be.oneOf(['a', '']);
    });

    it('Should parse symbols/choices from an expr', function () {
      let ctx = { user: { name: 'jen' } }
      expect(lexParser.lexParseVisit('Was the $dog.breed [ok | ok] today?', { dog: { breed: 'lab' } }, 0)).eq('Was the lab ok today?');
      expect(lexParser.lexParseVisit("Was $user.name.ucf() [ok | ok] today?", ctx)).eq('Was Jen ok today?');
      expect(lexParser.lexParseVisit("$user.name was ok", ctx)).eq('jen was ok');
      expect(lexParser.lexParseVisit("That was $user.name", ctx)).eq('That was jen');
      expect(lexParser.lexParseVisit("Was that $user.name.ucf()?", ctx)).eq('Was that Jen?');
      expect(lexParser.lexParseVisit("$user.name", ctx)).eq('jen');
      expect(lexParser.lexParseVisit("$user.name", ctx)).eq('jen');
      expect(lexParser.lexParseVisit("$user.name.toUpperCase()", ctx, 0)).eq('JEN');
      expect(lexParser.lexParseVisit("$user.name.uc()", ctx, 0)).eq('JEN');
      expect(lexParser.lexParseVisit("$user.name.ucf()", ctx, 0)).eq('Jen');
    });
  });

  describe('Parse Entities', function () { // using 'he' lib for now
    it('Should correctly decode HTML entities', function () {
      expect(lexParser.lexParseVisit('The &num; symbol')).eq('The # symbol');
      expect(lexParser.lexParseVisit('The &#x00023; symbol')).eq('The # symbol');
      expect(lexParser.lexParseVisit('The &#35; symbol')).eq('The # symbol');
      expect(lexParser.lexParseVisit('The&num;symbol')).eq('The#symbol');
      ['&lsqb;', '&lbrack;', '&#x0005B;', '&#91;'].forEach(e =>
        expect(lexParser.lexParseVisit('The ' + e + ' symbol')).eq('The [ symbol'));
      ['&rsqb;', '&rbrack;', '&#x0005D;', '&#93;'].forEach(e =>
        expect(lexParser.lexParseVisit('The ' + e + ' symbol')).eq('The ] symbol'));
    });

    it('Should allow basic punctuation', function () {
      expect(lexParser.lexParseVisit("The -;:.!?'`", {}, 0)).eq("The -;:.!?'`");
      expect(lexParser.lexParseVisit('The -;:.!?"`', {})).eq('The -;:.!?"`');
      expect(lexParser.lexParseVisit(",.;:\\'?!-_`“”’‘…‐–—―", {}, 0)).eq(",.;:\\'?!-_`“”’‘…‐–—―");
      expect(lexParser.lexParseVisit(',.;:\\"?!-_`“”’‘…‐–—―', {}, 0)).eq(',.;:\\"?!-_`“”’‘…‐–—―');
      expect(lexParser.lexParseVisit("/&%©@*")).eq("/&%©@*");
    });
  });

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
      expect(lexParser.lexParseVisit("The [boy | boy].toUpperCase() ate.")).eq('The BOY ate.');
    });

    it('Should correctly parse object properties', function () {
      let dog = { name: 'spot', color: 'white', hair: { color: 'white' } };
      expect(lexParser.lexParseVisit("It was a $dog.hair.color dog.", { dog: dog })).eq('It was a white dog.');
      expect(lexParser.lexParseVisit("It was a $dog.color.toUpperCase() dog.", { dog: dog })).eq('It was a WHITE dog.');
    });

    it('Should correctly call member function', function () {
      let dog = { name: 'spot', getColor: function () { return 'red' } };
      expect(lexParser.lexParseVisit("It was a $dog.getColor() dog.", { dog: dog })).eq('It was a red dog.');
    });

    it('Should correctly handle transforms ending with punctuation', function () {
      expect(lexParser.lexParseVisit('[a | b].toUpperCase().')).to.be.oneOf(['A.', 'B.']);
      expect(lexParser.lexParseVisit("The [boy | boy].toUpperCase()!")).eq('The BOY!');
      expect(lexParser.lexParseVisit('The $dog.toUpperCase()?', { dog: 'spot' })).eq('The SPOT?');
      expect(lexParser.lexParseVisit("The [boy | boy].toUpperCase().")).eq('The BOY.');

      let dog = { name: 'spot', color: 'white', hair: { color: 'white' } };
      expect(lexParser.lexParseVisit("It was $dog.hair.color.", { dog: dog })).eq('It was white.');
      expect(lexParser.lexParseVisit("It was $dog.color.toUpperCase()!", { dog: dog })).eq('It was WHITE!');

      let col = { getColor: function () { return 'red' } };
      expect(lexParser.lexParseVisit("It was $dog.getColor()?", { dog: col })).eq('It was red?');

      let ctx = { user: { name: 'jen' } }
      expect(lexParser.lexParseVisit("That was $user.name!", ctx)).eq('That was jen!');
      expect(lexParser.lexParseVisit("That was $user.name.", ctx)).eq('That was jen.');
    });

    it('Should correctly handle built-in transforms', function () {
      expect(lexParser.lexParseVisit('How many [teeth].quotify() do you have?')).eq('How many "teeth" do you have?');
      expect(lexParser.lexParseVisit('That is [ant].articlize().')).eq('That is an ant.');
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

    it('Should correctly reuse an assigned variable', function () {
      let ctx = {};
      let inp = 'Once there was a girl called [$hero=[Jane | Jane]].';
      inp += '\n$hero lived in [$home=[Neverland | Neverland]].';
      inp += '\n$hero liked living in $home.';
      let out = 'Once there was a girl called Jane.\nJane lived in Neverland.\nJane liked living in Neverland.';
      expect(lexParser.lexParseVisit(inp, ctx)).eq(out);
    });
  });

  describe('Parse Label Work', function () {
    it('Should follow labels', function () {
      expect(lexParser.lexParseVisit("#start", {})).eq("");
      let inp = "#start\nThis is an [a | a].";
      expect(lexParser.lexParseVisit(inp, {})).eq("\nThis is an a.");
    });
  });

  // describe('Failing Tests', function () {
  //   it('Should be fixed to pass', function () {
  // expect(lexParser.lexParseVisit('How many [tooth | tooth].pluralize() do you have?')).eq('How many teeth do you have?');
  //   });
  // });

});
