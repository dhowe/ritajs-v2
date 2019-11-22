require('../src/transforms');

const RiScript = require('../src/riscript');
const expect = require('chai').expect;

// SOLUTION 1:
// unenclosed variables on a line, include the whole line and can have nothing else
// other you need to use {} or []

// SOLUTION 2: implement distinct compile/execute phases to support grammars

// TODO:
// lazy evaluation of variables in script (to support cf-grammars)
// add variable declarations ***
// handle multipliers

describe('RiTa.RiScript', function() {

  describe('Compile Various', function() {

    // WORKING HERE: why is the grammar output all wrong?

    /*it('Should eval converted grammar', function() {
      let script = [
        '$start = $nounp $verbp.',
        '$nounp = $determiner $noun',
        '$determiner = (the | the)',
        '$verbp = $verb $nounp',
        '$noun = (woman | woman)',
        '$verb = shoots',
        '$start'
      ].join(' ');
      let rc = RiScript.compile(script, 1);
      let res = rc.run();
      expect().eq('the woman shoots the woman');
    });

    it('Should eval post-defined variables', function() {
      let rc = RiScript.compile('$start=$foo $foo=hello $start', 1);
      console.log("--------------------------------------------------\n");
      //console.log(rc.parseTree.toStringTree(rc.scripting.parser.ruleNames));
      let res = rc.run();
      expect(res).eq('hello');
    });*/

    it('Should compile choices', function() {
      expect(RiScript.compile('(a)').run()).eq('a');
      expect(RiScript.compile('(a | a)').run()).eq('a');
      expect(RiScript.compile('(a | )').run()).to.be.oneOf(['a', '']);
      expect(RiScript.compile('(a | b)').run()).to.be.oneOf(['a', 'b']);
      expect(RiScript.compile('(a | b | c)').run()).to.be.oneOf(['a', 'b', 'c']);
      expect(RiScript.compile('(a | (b | c) | d)').run()).to.be.oneOf(['a', 'b', 'c', 'd']);
      expect(RiScript.compile('(|)').run()).eq('');
    });

    it('Should compile symbols', function() {
      expect(RiScript.compile('a $dog').run({ dog: 'terrier' })).eq('a terrier');
      expect(RiScript.compile('I ate the $dog').run({ dog: 'beagle' })).eq('I ate the beagle');
      expect(RiScript.compile('The $dog today.').run({ dog: 'lab' })).eq('The lab today.');
      expect(RiScript.compile('I ate the $dog.').run({ dog: 'lab' })).eq('I ate the lab.');
      expect(RiScript.compile('$foo', 0).run({ foo: 'bar' })).eq('bar');
      expect(RiScript.compile('$foo', 0).run()).eq('$foo'); // no-op

      // compile-time vars override runtime vars ?
      expect(RiScript.compile('$foo=a $foo', 0).run({ foo: 'bar' })).eq('a');
    });
  });

  describe('Evaluate Symbols', function() {

    it('Should throw on bad symbols', function() {
      expect(() => RiScript.evaluate('$', 0, 0, 1)).to.throw();
    });

    it('Should correctly parse/resolve symbols', function() {
      expect(RiScript.evaluate('$foo', {}, 0)).eq('$foo'); // no-op
      expect(RiScript.evaluate('a $foo dog', {}, 0)).eq('a $foo dog'); // no-op
      expect(RiScript.evaluate('a $dog', { dog: 'terrier' })).eq('a terrier');
      expect(RiScript.evaluate('I ate the $dog', { dog: 'beagle' }, 0)).eq('I ate the beagle');
      expect(RiScript.evaluate('The $dog today.', { dog: 'lab' }, 0)).eq('The lab today.');
      expect(RiScript.evaluate('I ate the $dog.', { dog: 'lab' }, 0)).eq('I ate the lab.');
    });
  });

  describe('Evaluate Choices', function() {

    it('Should throw on bad choices', function() {
      expect(() => RiScript.evaluate('|', 0, 0, 1)).to.throw();
      expect(() => RiScript.evaluate('a |', 0, 0, 1)).to.throw();
      expect(() => RiScript.evaluate('a | b', 0, 0, 1)).to.throw();
      expect(() => RiScript.evaluate('a | b | c', 0, 0, 1)).to.throw();
      expect(() => RiScript.evaluate('(a | b) | c', 0, 0, 1)).to.throw();
    });

    it('Should correctly parse/select choices', function() {

      expect(RiScript.evaluate('(a)')).eq('a');
      expect(RiScript.evaluate('(a | a)')).eq('a');
      expect(RiScript.evaluate('(a | )')).to.be.oneOf(['a', '']);
      expect(RiScript.evaluate('(a | b)')).to.be.oneOf(['a', 'b']);
      expect(RiScript.evaluate('(a | b | c)'), {}).to.be.oneOf(['a', 'b', 'c']);
      expect(RiScript.evaluate('(a | (b | c) | d)')).to.be.oneOf(['a', 'b', 'c', 'd']);
      expect(RiScript.evaluate('(|)')).eq('');
    });

    it('Should parse choices from an expression', function() {

      expect(RiScript.evaluate("x (a | a | a) x")).eq('x a x');
      expect(RiScript.evaluate("x (a | a | a)")).eq('x a');
      expect(RiScript.evaluate("x (a | a | a)x")).eq('x ax');
      expect(RiScript.evaluate("x(a | a | a) x")).eq('xa x');
      expect(RiScript.evaluate("x(a | a | a)x")).eq('xax');
      expect(RiScript.evaluate("x (a | a | a) (b | b | b) x")).eq('x a b x');
      expect(RiScript.evaluate("x (a | a | a)(b | b | b) x")).eq('x ab x');
      expect(RiScript.evaluate("x (a | a) (b | b) x")).eq('x a b x');
      expect(RiScript.evaluate('(a|b)')).matches(/a|b/);
      expect(RiScript.evaluate('(a|)')).matches(/a?/);
      expect(RiScript.evaluate('(a|a)')).eq('a');
      expect(RiScript.evaluate('(|a|)')).to.be.oneOf(['a', '']);
    });

    it('Should parse symbols/choices from an expr', function() {
      let ctx = { user: { name: 'jen' } }
      expect(RiScript.evaluate('Was the $dog.breed (ok | ok) today?', { dog: { breed: 'lab' } }, 0)).eq('Was the lab ok today?');
      expect(RiScript.evaluate("Was $user.name.ucf() (ok | ok) today?", ctx)).eq('Was Jen ok today?');
      expect(RiScript.evaluate("$user.name was ok", ctx)).eq('jen was ok');
      expect(RiScript.evaluate("That was $user.name", ctx)).eq('That was jen');
      expect(RiScript.evaluate("Was that $user.name.ucf()?", ctx)).eq('Was that Jen?');
      expect(RiScript.evaluate("$user.name", ctx)).eq('jen');
      expect(RiScript.evaluate("$user.name", ctx)).eq('jen');
      expect(RiScript.evaluate("$user.name.toUpperCase()", ctx, 0)).eq('JEN');
      expect(RiScript.evaluate("$user.name.uc()", ctx, 0)).eq('JEN');
      expect(RiScript.evaluate("$user.name.ucf()", ctx, 0)).eq('Jen');
    });
  });

  describe('Evaluate Entities', function() { // using 'he' lib for now
    it('Should correctly decode HTML entities', function() {
      expect(RiScript.evaluate('The &num; symbol')).eq('The # symbol');
      expect(RiScript.evaluate('The &#x00023; symbol')).eq('The # symbol');
      expect(RiScript.evaluate('The &#35; symbol')).eq('The # symbol');
      expect(RiScript.evaluate('The&num;symbol')).eq('The#symbol');
      ['&lsqb;', '&lbrack;', '&#x0005B;', '&#91;'].forEach(e =>
        expect(RiScript.evaluate('The ' + e + ' symbol')).eq('The [ symbol'));
      ['&rsqb;', '&rbrack;', '&#x0005D;', '&#93;'].forEach(e =>
        expect(RiScript.evaluate('The ' + e + ' symbol')).eq('The ] symbol'));
    });

    it('Should allow basic punctuation', function() {
      expect(RiScript.evaluate("The -;:.!?'`", {}, 0)).eq("The -;:.!?'`");
      expect(RiScript.evaluate('The -;:.!?"`', {})).eq('The -;:.!?"`');
      expect(RiScript.evaluate(",.;:\\'?!-_`“”’‘…‐–—―", {}, 0)).eq(",.;:\\'?!-_`“”’‘…‐–—―");
      expect(RiScript.evaluate(',.;:\\"?!-_`“”’‘…‐–—―', {}, 0)).eq(',.;:\\"?!-_`“”’‘…‐–—―');
      expect(RiScript.evaluate("/&%©@*")).eq("/&%©@*");
    });

    it('Should allow spaces for formatting', function() {
      expect(RiScript.evaluate("&nbsp;The dog&nbsp;", {}, 0)).eq(" The dog ");
      expect(RiScript.evaluate("&nbsp; The dog&nbsp;", {}, 0)).eq("  The dog ");
      expect(RiScript.evaluate("The &nbsp;dog", {}, 0)).eq("The  dog");
      expect(RiScript.evaluate("The&nbsp; dog", {}, 0)).eq("The  dog");
      expect(RiScript.evaluate("The &nbsp; dog", {}, 0)).eq("The   dog");
    });
  });

  describe('Evaluate Transforms', function() {
    it('Should throw on bad transforms', function() {
      expect(() => RiScript.evaluate('a.toUpperCase()', 0, 0, 1)).to.throw();
    });

    it('Should correctly handle choice transforms', function() {
      expect(RiScript.evaluate('(a | b).toUpperCase()')).to.be.oneOf(['A', 'B']);
      expect(RiScript.evaluate("The (boy | boy).toUpperCase() ate.")).eq('The BOY ate.');
    });

    /*it('Should correctly handle assign transforms', function() {
      let ctx = {};
      expect(RiScript.evaluate('[$stored=(a | a).toUpperCase()] dog is a mammal.', ctx)).eq('A dog is a mammal.');
      expect(ctx.stored).eq('A');
      expect(RiScript.evaluate('[$stored=(the | the)].toUpperCase() dog is a mammal.', ctx)).eq('the dog is a mammal.');
      expect(ctx.stored).eq('the');
      ctx = {};
      RiScript.evaluate('[$x=(a | b)].toUpperCase()', ctx);
      expect(ctx.x).to.be.oneOf(['a', 'b']);
    });*/

    it('Should correctly handle symbol transforms', function() {
      expect(RiScript.evaluate('The $dog.toUpperCase()', { dog: 'spot' })).eq('The SPOT');
      expect(RiScript.evaluate("The (boy | boy).toUpperCase() ate.")).eq('The BOY ate.');
    });

    it('Should correctly parse object properties', function() {
      let dog = { name: 'spot', color: 'white', hair: { color: 'white' } };
      expect(RiScript.evaluate("It was a $dog.hair.color dog.", { dog: dog })).eq('It was a white dog.');
      expect(RiScript.evaluate("It was a $dog.color.toUpperCase() dog.", { dog: dog })).eq('It was a WHITE dog.');
    });

    it('Should correctly call member function', function() {
      let dog = { name: 'spot', getColor: function() { return 'red' } };
      expect(RiScript.evaluate("It was a $dog.getColor() dog.", { dog: dog })).eq('It was a red dog.');
    });

    it('Should handle transforms ending with punc', function() {
      expect(RiScript.evaluate('(a | b).toUpperCase().')).to.be.oneOf(['A.', 'B.']);
      expect(RiScript.evaluate("The (boy | boy).toUpperCase()!")).eq('The BOY!');
      expect(RiScript.evaluate('The $dog.toUpperCase()?', { dog: 'spot' })).eq('The SPOT?');
      expect(RiScript.evaluate("The (boy | boy).toUpperCase().")).eq('The BOY.');

      let dog = { name: 'spot', color: 'white', hair: { color: 'white' } };
      expect(RiScript.evaluate("It was $dog.hair.color.", { dog: dog })).eq('It was white.');
      expect(RiScript.evaluate("It was $dog.color.toUpperCase()!", { dog: dog })).eq('It was WHITE!');

      let col = { getColor: function() { return 'red' } };
      expect(RiScript.evaluate("It was $dog.getColor()?", { dog: col })).eq('It was red?');

      let ctx = { user: { name: 'jen' } }
      expect(RiScript.evaluate("That was $user.name!", ctx)).eq('That was jen!');
      expect(RiScript.evaluate("That was $user.name.", ctx)).eq('That was jen.');
    });

    it('Should correctly handle built-in transforms', function() {
      expect(RiScript.evaluate('How many (teeth).quotify() do you have?')).eq('How many "teeth" do you have?');
      expect(RiScript.evaluate('That is (ant).articlize().')).eq('That is an ant.');
    });
  });

  describe('Evaluate Assignments', function() {

    it('Should eval previous assignments', function() {
      expect(RiScript.evaluate('$foo=a\n$foo', null, 0)).eq('a');
      expect(RiScript.evaluate('$foo=(hi | hi) $foo there', null, 0)).eq('hi there');
      expect(RiScript.evaluate('$foo=(hi | hi) $foo there', null, 0)).eq('hi there');

      expect(RiScript.evaluate('$foo=dog\n$bar=$foo\n$baz=$foo\n$baz', null, 0)).eq('dog');
      expect(RiScript.evaluate('$foo=hi $foo there', null, 0)).eq('hi there');
    });

    it('Should eval pre-defined variables', function() {
      let script = [
        '$noun=(woman | woman)',
        '$start=$noun',
        '$start'
      ].join('\n');
      expect(RiScript.evaluate(script, null, 0)).eq('woman');
    });

    it('Should parse assignments', function() {
      let ctx = {};
      expect(RiScript.evaluate('$foo=a', ctx, 0)).eq('');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(RiScript.evaluate('$foo=a\nb', ctx, 0)).eq('b');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(RiScript.evaluate('$foo=(a | a)', ctx, 0)).eq('');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(RiScript.evaluate('$foo=ab', ctx, 0)).eq('');
      expect(ctx.foo).eq('ab');

      ctx = {};
      expect(RiScript.evaluate('$foo=ab bc', ctx, 0)).eq('bc');
      expect(ctx.foo).eq('ab');

      ctx = {};
      expect(RiScript.evaluate('$foo=(ab) (bc)', ctx, 0)).eq('bc');
      expect(ctx.foo).eq('ab');

      ctx = {};
      expect(RiScript.evaluate('$foo=(ab bc)', ctx, 0)).eq('');
      expect(ctx.foo).eq('ab bc');

      ctx = {};
      expect(RiScript.evaluate('$foo=(a | a) (b | b)', ctx, 0)).eq('b');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(RiScript.evaluate('$foo=((a | a) | (a | a))', ctx, 0)).eq('');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(RiScript.evaluate('$foo=()', ctx, 0)).eq(''); // empty string
      expect(ctx.foo).eq('');

      ctx = {};
      expect(RiScript.evaluate('$foo=a\n$bar=$foo', ctx, 0)).eq(''); // empty string
      expect(ctx.foo).eq('a');
      expect(ctx.bar).eq('a');
    });

    it('Should parse transformed assignments', function() {

      // WORKING HERE

      let ctx = {};
      expect(RiScript.evaluate('$foo=(a).toUpperCase()', ctx, 0)).eq('');
      expect(ctx.foo).eq('A');

      ctx = {};
      expect(RiScript.evaluate('$foo=(a | a).toUpperCase()', ctx, 0)).eq('');
      expect(ctx.foo).eq('A');

      ctx = {};
      expect(RiScript.evaluate('$foo=(ab).toUpperCase()', ctx, 0)).eq('');
      expect(ctx.foo).eq('AB');
      //return;
      ctx = {};
      expect(RiScript.evaluate('$foo=(ab).toUpperCase() (bc).toUpperCase()', ctx, 0)).eq('BC');
      expect(ctx.foo).eq('AB');

      ctx = {};
      expect(RiScript.evaluate('$foo=(ab bc).toUpperCase()', ctx, 0)).eq('');
      expect(ctx.foo).eq('AB BC');

      ctx = {};
      expect(RiScript.evaluate('$foo=(a | a).toUpperCase() (b | b)', ctx, 0)).eq('b');
      expect(ctx.foo).eq('A');

      ctx = {};
      expect(RiScript.evaluate('$foo=(a | a).toUpperCase() (b | b).toUpperCase()', ctx, 0)).eq('B');
      expect(ctx.foo).eq('A');

      ctx = {};
      expect(RiScript.evaluate('$foo=((a | a) | (a | a))', ctx, 0)).eq('');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(RiScript.evaluate('$foo=().toUpperCase()', ctx, 0)).eq(''); // empty string
      expect(ctx.foo).eq('');
    });
  });

  /*describe('Evaluate Assignments', function() {

    it('Should correctly parse assignments', function() {
      let ctx = {};
      expect(RiScript.evaluate('$foo=(a | a)', ctx, 0)).eq('');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(RiScript.evaluate('$foo=(hi | hi) $foo there', ctx, 0)).eq('hi there');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(RiScript.evaluate('$foo=The boy walked his dog', ctx, 0)).eq('');
      expect(ctx.foo).eq('a');

      expect(RiScript.evaluate('$foo=(hi | hi)$foo there', {}, 0))
        .eq(RiScript.evaluate('[$foo=(hi | hi)] there'));
    });

    it('Should correctly concatenate variables', function() {
      let ctx = {};
      expect(RiScript.evaluate('{$foo=(h | h)} ${foo}ello', ctx, 0)).eq('hello'); // TODO
      expect(ctx.foo).eq('h');
      expect(RiScript.evaluate('[$foo=(a | a)]', ctx, 0)).eq('a');
      expect(ctx.foo).eq('a');
      expect(RiScript.evaluate('${foo} b c', ctx, 0)).eq('a b c');
      expect(RiScript.evaluate('${foo}bc', ctx, 0)).eq('abc');
    });

    it('Should correctly assign a variable to a result', function() {
      let context = {};
      let result = RiScript.evaluate('[$stored=(a | b)]', context);
      expect(result).to.be.oneOf(['a', 'b']);
      expect(context.stored).eq(result);
      let result2 = RiScript.evaluate('[$a=$stored]', context);
      expect(context.a).eq(result2);
      expect(result2).eq(context.stored);
    });


    it('Should correctly assign a variable to code', function() {
      expect(RiScript.evaluate('A [$stored=($animal | $animal)] is a mammal', { animal: 'dog' })).eq('A dog is a mammal');
      expect(RiScript.evaluate('[$b=(a | a)].toUpperCase() dog is a $b.', {}, 0)).eq('A dog is a A.');
      expect(RiScript.evaluate('[$b=(a | a).toUpperCase()] dog is a $b.', {}, 0)).eq('A dog is a A.');
    });

    it('Should correctly reuse an assigned variable', function() {
      let ctx = {};
      let inp = 'Once there was a girl called [$hero=(Jane | Jane)].';
      inp += '\n$hero lived in [$home=(Neverland | Neverland)].';
      inp += '\n$hero liked living in $home.';
      let out = 'Once there was a girl called Jane.\nJane lived in Neverland.\nJane liked living in Neverland.';
      expect(RiScript.evaluate(inp, ctx)).eq(out);
    });
  });*/

  /*describe('Evaluate S-assignments', function() {

    it('Should throw on silent assign with transform', function() {
      expect(() => RiScript.evaluate('{$b=(a | a)}.toUpperCase() dog is a $b.', {}, 0)).to.throw();
    });

    it('Should correctly process a silent assignment', function() {
      let exp = 'A dog is a mammal';
      expect(RiScript.evaluate('{$stored=(a | a)} $stored dog is a mammal', {})).eq(exp.toLowerCase());
      expect(RiScript.evaluate('{$stored=(a | a)} ($stored).toUpperCase() dog is a mammal')).eq(exp);
      expect(RiScript.evaluate('{$stored=(a | a)}($stored).toUpperCase() dog is a mammal')).eq(exp);
      expect(RiScript.evaluate('{$stored=(a | a)}\n($stored).toUpperCase() dog is a mammal')).eq(exp);
      expect(RiScript.evaluate('{$stored=(a | a).toUpperCase()}($stored) dog is a mammal')).eq(exp);
    });

    it('Should correctly assign a silent variable to a result', function() {
      let context = {};
      let result = RiScript.evaluate('{$stored=(a | b)}', context);
      expect(result).eq('');
      expect(context.stored).to.be.oneOf(['a', 'b']);
      let result2 = RiScript.evaluate('{$a=$stored}', context);
      expect(result2).eq('');
      expect(context.a).eq(context.stored);

    });

    it('Should correctly assign a silent variable to code', function() {
      expect(RiScript.evaluate('A {$stored=($animal | $animal)} is a mammal', { animal: 'dog' }, 0)).eq('A is a mammal');
      expect(RiScript.evaluate('{$b=(a | a).toUpperCase()} dog is a $b.', {}, 0)).eq('dog is a A.');
      expect(RiScript.evaluate('[$b=(a | a)].toUpperCase() dog is a ($b).toLowerCase().', {})).eq('A dog is a a.');
    });

    it('Should correctly reuse silent assigned variables', function() {
      let ctx = {};
      let inp = 'Once there was a girl called {$hero=(Jane | Jane)} $hero.';
      inp += '\n$hero lived in {$home=(Neverland | Neverland)} $home.';
      inp += '\n$hero liked living in $home.';
      let out = 'Once there was a girl called Jane.\nJane lived in Neverland.\nJane liked living in Neverland.';
      expect(RiScript.evaluate(inp, ctx)).eq(out);
    });
  });*/

});
