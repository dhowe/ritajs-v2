require('../src/transforms');

const Parser = require('../src/parser');
const expect = require('chai').expect;
const parser = new Parser();

// TODO: store custom transforms in context

// IDEA: variable assigments are normally SILENT, we add an operator to
// make them output (reverse what we have now):
// $hero=(Jane | Jill) -> silent
// [$hero=(Jane | Jill)] -> spoken

// QUESTION: how long is the variable text? or is this invalid
// $hero = the boy ate  -> $hero = 'the'
// $hero = (the boy ate) -> $hero = 'the boy ate'

// ASSIGNMENT:
// $foo=hello
// $foo=(hello there)

// TODO: Labels

describe('RiScript Tests', function() {

  describe('Parse Symbols', function() {

    it('Should throw on bad symbols', function() {
      expect(() => parser.lexParseVisitQuiet('$')).to.throw();
    });

    it('Should correctly parse/resolve symbols', function() {
      expect(parser.lexParseVisit('a $dog', { dog: 'terrier' })).eq('a terrier');
      expect(parser.lexParseVisit('I ate the $dog', { dog: 'beagle' }, 0)).eq('I ate the beagle');
      expect(parser.lexParseVisit('The $dog today.', { dog: 'lab' }, 0)).eq('The lab today.');
      expect(parser.lexParseVisit('I ate the $dog.', { dog: 'lab' }, 0)).eq('I ate the lab.');
    });
  });

  describe('Parse Choices', function() {

    it('Should throw on bad choices', function() {

      expect(() => parser.lexParseVisitQuiet('|')).to.throw();
      expect(() => parser.lexParseVisitQuiet('a |')).to.throw();
      expect(() => parser.lexParseVisitQuiet('a | b')).to.throw();
      expect(() => parser.lexParseVisitQuiet('a | b | c')).to.throw();
      expect(() => parser.lexParseVisitQuiet('(a | b) | c')).to.throw();
    });

    it('Should correctly parse/select choices', function() {

      expect(parser.lexParseVisit('(a)')).eq('a');
      expect(parser.lexParseVisit('(a | a)')).eq('a');
      expect(parser.lexParseVisit('(a | )')).to.be.oneOf(['a', '']);
      expect(parser.lexParseVisit('(a | b)')).to.be.oneOf(['a', 'b']);
      expect(parser.lexParseVisit('(a | b | c)'), {}).to.be.oneOf(['a', 'b', 'c']);
      expect(parser.lexParseVisit('(a | (b | c) | d)')).to.be.oneOf(['a', 'b', 'c', 'd']);
      expect(parser.lexParseVisit('(|)')).eq('');
    });

    it('Should parse choices from an expression', function() {

      expect(parser.lexParseVisit("x (a | a | a) x")).eq('x a x');
      expect(parser.lexParseVisit("x (a | a | a)")).eq('x a');
      expect(parser.lexParseVisit("x (a | a | a)x")).eq('x ax');
      expect(parser.lexParseVisit("x(a | a | a) x")).eq('xa x');
      expect(parser.lexParseVisit("x(a | a | a)x")).eq('xax');
      expect(parser.lexParseVisit("x (a | a | a) (b | b | b) x")).eq('x a b x');
      expect(parser.lexParseVisit("x (a | a | a)(b | b | b) x")).eq('x ab x');
      expect(parser.lexParseVisit("x (a | a) (b | b) x")).eq('x a b x');
      expect(parser.lexParseVisit('(a|b)')).matches(/a|b/);
      expect(parser.lexParseVisit('(a|)')).matches(/a?/);
      expect(parser.lexParseVisit('(a|a)')).eq('a');
      expect(parser.lexParseVisit('(|a|)')).to.be.oneOf(['a', '']);
    });

    it('Should parse symbols/choices from an expr', function() {
      let ctx = { user: { name: 'jen' } }
      expect(parser.lexParseVisit('Was the $dog.breed (ok | ok) today?', { dog: { breed: 'lab' } }, 0)).eq('Was the lab ok today?');
      expect(parser.lexParseVisit("Was $user.name.ucf() (ok | ok) today?", ctx)).eq('Was Jen ok today?');
      expect(parser.lexParseVisit("$user.name was ok", ctx)).eq('jen was ok');
      expect(parser.lexParseVisit("That was $user.name", ctx)).eq('That was jen');
      expect(parser.lexParseVisit("Was that $user.name.ucf()?", ctx)).eq('Was that Jen?');
      expect(parser.lexParseVisit("$user.name", ctx)).eq('jen');
      expect(parser.lexParseVisit("$user.name", ctx)).eq('jen');
      expect(parser.lexParseVisit("$user.name.toUpperCase()", ctx, 0)).eq('JEN');
      expect(parser.lexParseVisit("$user.name.uc()", ctx, 0)).eq('JEN');
      expect(parser.lexParseVisit("$user.name.ucf()", ctx, 0)).eq('Jen');
    });
  });

  describe('Parse Entities', function() { // using 'he' lib for now
    it('Should correctly decode HTML entities', function() {
      expect(parser.lexParseVisit('The &num; symbol')).eq('The # symbol');
      expect(parser.lexParseVisit('The &#x00023; symbol')).eq('The # symbol');
      expect(parser.lexParseVisit('The &#35; symbol')).eq('The # symbol');
      expect(parser.lexParseVisit('The&num;symbol')).eq('The#symbol');
      ['&lsqb;', '&lbrack;', '&#x0005B;', '&#91;'].forEach(e =>
        expect(parser.lexParseVisit('The ' + e + ' symbol')).eq('The [ symbol'));
      ['&rsqb;', '&rbrack;', '&#x0005D;', '&#93;'].forEach(e =>
        expect(parser.lexParseVisit('The ' + e + ' symbol')).eq('The ] symbol'));
    });

    it('Should allow basic punctuation', function() {
      expect(parser.lexParseVisit("The -;:.!?'`", {}, 0)).eq("The -;:.!?'`");
      expect(parser.lexParseVisit('The -;:.!?"`', {})).eq('The -;:.!?"`');
      expect(parser.lexParseVisit(",.;:\\'?!-_`“”’‘…‐–—―", {}, 0)).eq(",.;:\\'?!-_`“”’‘…‐–—―");
      expect(parser.lexParseVisit(',.;:\\"?!-_`“”’‘…‐–—―', {}, 0)).eq(',.;:\\"?!-_`“”’‘…‐–—―');
      expect(parser.lexParseVisit("/&%©@*")).eq("/&%©@*");
    });

    it('Should allow spaces for formatting', function() {
      expect(parser.lexParseVisit("&nbsp;The dog&nbsp;", {}, 0)).eq(" The dog ");
      expect(parser.lexParseVisit("&nbsp; The dog&nbsp;", {}, 0)).eq("  The dog ");
      expect(parser.lexParseVisit("The &nbsp;dog", {}, 0)).eq("The  dog");
      expect(parser.lexParseVisit("The&nbsp; dog", {}, 0)).eq("The  dog");
      expect(parser.lexParseVisit("The &nbsp; dog", {}, 0)).eq("The   dog");
    });
  });

  describe('Parse Transforms', function() {
    it('Should throw on bad transforms', function() {
      expect(() => parser.lexParseVisitQuiet('a.toUpperCase()')).to.throw();
    });

    it('Should correctly handle choice transforms', function() {
      expect(parser.lexParseVisit('(a | b).toUpperCase()')).to.be.oneOf(['A', 'B']);
      expect(parser.lexParseVisit("The (boy | boy).toUpperCase() ate.")).eq('The BOY ate.');
    });

    it('Should correctly handle assign transforms', function() {
      let ctx = {};
      expect(parser.lexParseVisit('[$stored=(a | a).toUpperCase()] dog is a mammal.', ctx)).eq('A dog is a mammal.');
      expect(ctx.stored).eq('A');
      expect(parser.lexParseVisit('[$stored=(the | the)].toUpperCase() dog is a mammal.', ctx)).eq('the dog is a mammal.');
      expect(ctx.stored).eq('the');
      ctx = {};
      parser.lexParseVisit('[$x=(a | b)].toUpperCase()', ctx);
      expect(ctx.x).to.be.oneOf(['a', 'b']);
    });

    it('Should correctly handle symbol transforms', function() {
      expect(parser.lexParseVisit('The $dog.toUpperCase()', { dog: 'spot' })).eq('The SPOT');
      expect(parser.lexParseVisit("The (boy | boy).toUpperCase() ate.")).eq('The BOY ate.');
    });

    it('Should correctly parse object properties', function() {
      let dog = { name: 'spot', color: 'white', hair: { color: 'white' } };
      expect(parser.lexParseVisit("It was a $dog.hair.color dog.", { dog: dog })).eq('It was a white dog.');
      expect(parser.lexParseVisit("It was a $dog.color.toUpperCase() dog.", { dog: dog })).eq('It was a WHITE dog.');
    });

    it('Should correctly call member function', function() {
      let dog = { name: 'spot', getColor: function() { return 'red' } };
      expect(parser.lexParseVisit("It was a $dog.getColor() dog.", { dog: dog })).eq('It was a red dog.');
    });

    it('Should handle transforms ending with punc', function() {
      expect(parser.lexParseVisit('(a | b).toUpperCase().')).to.be.oneOf(['A.', 'B.']);
      expect(parser.lexParseVisit("The (boy | boy).toUpperCase()!")).eq('The BOY!');
      expect(parser.lexParseVisit('The $dog.toUpperCase()?', { dog: 'spot' })).eq('The SPOT?');
      expect(parser.lexParseVisit("The (boy | boy).toUpperCase().")).eq('The BOY.');

      let dog = { name: 'spot', color: 'white', hair: { color: 'white' } };
      expect(parser.lexParseVisit("It was $dog.hair.color.", { dog: dog })).eq('It was white.');
      expect(parser.lexParseVisit("It was $dog.color.toUpperCase()!", { dog: dog })).eq('It was WHITE!');

      let col = { getColor: function() { return 'red' } };
      expect(parser.lexParseVisit("It was $dog.getColor()?", { dog: col })).eq('It was red?');

      let ctx = { user: { name: 'jen' } }
      expect(parser.lexParseVisit("That was $user.name!", ctx)).eq('That was jen!');
      expect(parser.lexParseVisit("That was $user.name.", ctx)).eq('That was jen.');
    });

    it('Should correctly handle built-in transforms', function() {
      expect(parser.lexParseVisit('How many (teeth).quotify() do you have?')).eq('How many "teeth" do you have?');
      expect(parser.lexParseVisit('That is (ant).articlize().')).eq('That is an ant.');
    });
  });

  /*describe('Parse Assignments', function() {

    it('Should correctly parse assignments', function() {
      let ctx = {};
      expect(parser.lexParseVisit('$foo=(a | a)', ctx, 0)).eq('');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(parser.lexParseVisit('$foo=(hi | hi) $foo there', ctx, 0)).eq('hi there');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(parser.lexParseVisit('$foo=The boy walked his dog', ctx, 0)).eq('');
      expect(ctx.foo).eq('a');

      expect(parser.lexParseVisit('$foo=(hi | hi)$foo there', {}, 0))
        .eq(parser.lexParseVisit('[$foo=(hi | hi)] there'));
    });

    it('Should correctly concatenate variables', function() {
      let ctx = {};
      expect(parser.lexParseVisit('{$foo=(h | h)} ${foo}ello', ctx, 0)).eq('hello'); // TODO
      expect(ctx.foo).eq('h');
      expect(parser.lexParseVisit('[$foo=(a | a)]', ctx, 0)).eq('a');
      expect(ctx.foo).eq('a');
      expect(parser.lexParseVisit('${foo} b c', ctx, 0)).eq('a b c');
      expect(parser.lexParseVisit('${foo}bc', ctx, 0)).eq('abc');
    });

    it('Should correctly assign a variable to a result', function() {
      let context = {};
      let result = parser.lexParseVisit('[$stored=(a | b)]', context);
      expect(result).to.be.oneOf(['a', 'b']);
      expect(context.stored).eq(result);
      let result2 = parser.lexParseVisit('[$a=$stored]', context);
      expect(context.a).eq(result2);
      expect(result2).eq(context.stored);
    });


    it('Should correctly assign a variable to code', function() {
      expect(parser.lexParseVisit('A [$stored=($animal | $animal)] is a mammal', { animal: 'dog' })).eq('A dog is a mammal');
      expect(parser.lexParseVisit('[$b=(a | a)].toUpperCase() dog is a $b.', {}, 0)).eq('A dog is a A.');
      expect(parser.lexParseVisit('[$b=(a | a).toUpperCase()] dog is a $b.', {}, 0)).eq('A dog is a A.');
    });

    it('Should correctly reuse an assigned variable', function() {
      let ctx = {};
      let inp = 'Once there was a girl called [$hero=(Jane | Jane)].';
      inp += '\n$hero lived in [$home=(Neverland | Neverland)].';
      inp += '\n$hero liked living in $home.';
      let out = 'Once there was a girl called Jane.\nJane lived in Neverland.\nJane liked living in Neverland.';
      expect(parser.lexParseVisit(inp, ctx)).eq(out);
    });
  });*/

  /*describe('Parse S-assignments', function() {

    it('Should throw on silent assign with transform', function() {
      expect(() => parser.lexParseVisit('{$b=(a | a)}.toUpperCase() dog is a $b.', {}, 0)).to.throw();
    });

    it('Should correctly process a silent assignment', function() {
      let exp = 'A dog is a mammal';
      expect(parser.lexParseVisit('{$stored=(a | a)} $stored dog is a mammal', {})).eq(exp.toLowerCase());
      expect(parser.lexParseVisit('{$stored=(a | a)} ($stored).toUpperCase() dog is a mammal')).eq(exp);
      expect(parser.lexParseVisit('{$stored=(a | a)}($stored).toUpperCase() dog is a mammal')).eq(exp);
      expect(parser.lexParseVisit('{$stored=(a | a)}\n($stored).toUpperCase() dog is a mammal')).eq(exp);
      expect(parser.lexParseVisit('{$stored=(a | a).toUpperCase()}($stored) dog is a mammal')).eq(exp);
    });

    it('Should correctly assign a silent variable to a result', function() {
      let context = {};
      let result = parser.lexParseVisit('{$stored=(a | b)}', context);
      expect(result).eq('');
      expect(context.stored).to.be.oneOf(['a', 'b']);
      let result2 = parser.lexParseVisit('{$a=$stored}', context);
      expect(result2).eq('');
      expect(context.a).eq(context.stored);

    });

    it('Should correctly assign a silent variable to code', function() {
      expect(parser.lexParseVisit('A {$stored=($animal | $animal)} is a mammal', { animal: 'dog' }, 0)).eq('A is a mammal');
      expect(parser.lexParseVisit('{$b=(a | a).toUpperCase()} dog is a $b.', {}, 0)).eq('dog is a A.');
      expect(parser.lexParseVisit('[$b=(a | a)].toUpperCase() dog is a ($b).toLowerCase().', {})).eq('A dog is a a.');
    });

    it('Should correctly reuse silent assigned variables', function() {
      let ctx = {};
      let inp = 'Once there was a girl called {$hero=(Jane | Jane)} $hero.';
      inp += '\n$hero lived in {$home=(Neverland | Neverland)} $home.';
      inp += '\n$hero liked living in $home.';
      let out = 'Once there was a girl called Jane.\nJane lived in Neverland.\nJane liked living in Neverland.';
      expect(parser.lexParseVisit(inp, ctx)).eq(out);
    });
  });*/

  describe('Failing Tests', function() {
    it('Should be fixed to pass', function() {

      // *** WORKING HERE: transform should not be applied to silent assign
      0 && expect(parser.lexParseVisit('How many (tooth | tooth).pluralize() do you have?')).eq('How many teeth do you have?');
    });
  });

});
