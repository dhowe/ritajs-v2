// const expect = require('chai').expect;

// SOLUTION 1:
// Unenclosed variables on a line, include the whole line and can have nothing else
// other you need to use {} or [] or ()

// TODO:
// lazy evaluation of variables in script (to support cf-grammars)
// add variable declarations ***
// handle multipliers in cfg-s
// allow json format?

describe('RiTa.RiScript', function() {

  if (typeof module !== 'undefined') require('./before');

  describe('Compile Various', function() {

    // WORKING HERE
    it('Should eval post-defined variables', function() {

      let script, res;
      script = RiTa.compile('$start=$foo\n$foo=hello');
      res = script.expand('$start');
      expect(res).eq('hello');

      script = RiTa.compile('$start=(I said $foo to her) $foo=hello', 0);
      res = script.expand('$start');
      expect(res).eq('I said hello to her');
    });

    /*it('Should create symbol table on compile', function() {
      let script = [
        '$start = ($nounp $verbp.)',
        '$nounp = $determiner $noun',
        '$determiner = (the | the)',
        '$verbp = $verb $nounp',
        '$noun = (woman | woman)',
        '$verb = shoots',
        '$start'
      ].join(' ');
      let rc = RiTa.compile(script, 1);
      console.log(rc.symbolTable);
      expect(rc.symbolTable['$start']).eq('$nounp $verbp.');
    })

    it('Should eval converted grammar', function() {
      let script = [
        '$start = $nounp $verbp.',
        '$nounp = $determiner $noun',
        '$determiner = (the | the)',
        '$verbp = $verb $nounp',
        '$noun = (woman | woman)',
        '$verb = shoots',
        '$start'
      ].join(' ');
      let rc = RiTa.compile(script, 1);
      let res = rc.expand();
      expect(res).eq('the woman shoots the woman');
    })*/

    /*
    it('Should eval linebreak-defined variables', function() {

      script = RiTa.compile('$start=I said $foo to her\n$foo=hello', 0);
      res = script.expand('$start');
      expect(res).eq('I said hello to her');
    });

    it('Should eval converted grammar', function() {
      let script = [
        '$start = $nounp $verbp.',
        '$nounp = $determiner $noun',
        '$determiner = (the | the)',
        '$verbp = $verb $nounp',
        '$noun = (woman | woman)',
        '$verb = shoots',
        '$start'
      ].join(' ');
      let rc = RiTa.compile(script, 1);
      let res = rc.run();
      expect().eq('the woman shoots the woman');
    });

    it('Should eval post-defined variables', function() {
      let rc = RiTa.compile('$start=$foo $foo=hello $start', 1);
      console.log("--------------------------------------------------\n");
      //console.log(rc.parseTree.toStringTree(rc.scripting.parser.ruleNames));
      let res = rc.run();
      expect(res).eq('hello');
    });*/

    /*it('Should compile choices', function() {
      expect(RiTa.compile('(a)').run()).eq('a');
      expect(RiTa.compile('(a | a)').run()).eq('a');
      expect(RiTa.compile('(a | )').run()).to.be.oneOf(['a', '']);
      expect(RiTa.compile('(a | b)').run()).to.be.oneOf(['a', 'b']);
      expect(RiTa.compile('(a | b | c)').run()).to.be.oneOf(['a', 'b', 'c']);
      expect(RiTa.compile('(a | (b | c) | d)').run()).to.be.oneOf(['a', 'b', 'c', 'd']);
      expect(RiTa.compile('(|)').run()).eq('');
    });

    it('Should compile symbols', function() {
      expect(RiTa.compile('a $dog').run({ dog: 'terrier' })).eq('a terrier');
      expect(RiTa.compile('I ate the $dog').run({ dog: 'beagle' })).eq('I ate the beagle');
      expect(RiTa.compile('The $dog today.').run({ dog: 'lab' })).eq('The lab today.');
      expect(RiTa.compile('I ate the $dog.').run({ dog: 'lab' })).eq('I ate the lab.');
      expect(RiTa.compile('$foo', 0).run({ foo: 'bar' })).eq('bar');
      expect(RiTa.compile('$foo', 0).run()).eq('$foo'); // no-op

      // compile-time vars override runtime vars ?
      expect(RiTa.compile('$foo=a $foo', 0).run({ foo: 'bar' })).eq('a');
    });*/
  });

  describe('Evaluate Symbols', function() {

    it('Should throw on bad symbols', function() {
      expect(() => RiTa.evaluate('$', 0, 0, 1)).to.throw();
    });

    it('Should correctly parse/resolve symbols', function() {
      expect(RiTa.evaluate('$foo', {}, 0)).eq('$foo'); // no-op
      expect(RiTa.evaluate('a $foo dog', {}, 0)).eq('a $foo dog'); // no-op
      expect(RiTa.evaluate('a $dog', { dog: 'terrier' })).eq('a terrier');
      expect(RiTa.evaluate('I ate the $dog', { dog: 'beagle' }, 0)).eq('I ate the beagle');
      expect(RiTa.evaluate('The $dog today.', { dog: 'lab' }, 0)).eq('The lab today.');
      expect(RiTa.evaluate('I ate the $dog.', { dog: 'lab' }, 0)).eq('I ate the lab.');
    });
  });

  describe('Evaluate Choices', function() {

    it('Should throw on bad choices', function() {
      expect(() => RiTa.evaluate('|', 0, 0, 1)).to.throw();
      expect(() => RiTa.evaluate('a |', 0, 0, 1)).to.throw();
      expect(() => RiTa.evaluate('a | b', 0, 0, 1)).to.throw();
      expect(() => RiTa.evaluate('a | b | c', 0, 0, 1)).to.throw();
      expect(() => RiTa.evaluate('(a | b) | c', 0, 0, 1)).to.throw();
    });

    it('Should correctly parse/select choices', function() {

      expect(RiTa.evaluate('(a)')).eq('a');
      expect(RiTa.evaluate('(a | a)')).eq('a');
      expect(RiTa.evaluate('(a | )')).to.be.oneOf(['a', '']);
      expect(RiTa.evaluate('(a | b)')).to.be.oneOf(['a', 'b']);
      expect(RiTa.evaluate('(a | b | c)'), {}).to.be.oneOf(['a', 'b', 'c']);
      expect(RiTa.evaluate('(a | (b | c) | d)')).to.be.oneOf(['a', 'b', 'c', 'd']);
      expect(RiTa.evaluate('(|)')).eq('');
    });

    it('Should parse choices from an expression', function() {

      expect(RiTa.evaluate("x (a | a | a) x")).eq('x a x');
      expect(RiTa.evaluate("x (a | a | a)")).eq('x a');
      expect(RiTa.evaluate("x (a | a | a)x")).eq('x ax');
      expect(RiTa.evaluate("x(a | a | a) x")).eq('xa x');
      expect(RiTa.evaluate("x(a | a | a)x")).eq('xax');
      expect(RiTa.evaluate("x (a | a | a) (b | b | b) x")).eq('x a b x');
      expect(RiTa.evaluate("x (a | a | a)(b | b | b) x")).eq('x ab x');
      expect(RiTa.evaluate("x (a | a) (b | b) x")).eq('x a b x');
      expect(RiTa.evaluate('(a|b)')).matches(/a|b/);
      expect(RiTa.evaluate('(a|)')).matches(/a?/);
      expect(RiTa.evaluate('(a|a)')).eq('a');
      expect(RiTa.evaluate('(|a|)')).to.be.oneOf(['a', '']);
    });

    it('Should parse symbols/choices from an expr', function() {
      let ctx = { user: { name: 'jen' } }
      expect(RiTa.evaluate('Was the $dog.breed (ok | ok) today?', { dog: { breed: 'lab' } }, 0)).eq('Was the lab ok today?');
      expect(RiTa.evaluate("Was $user.name.ucf() (ok | ok) today?", ctx)).eq('Was Jen ok today?');
      expect(RiTa.evaluate("$user.name was ok", ctx)).eq('jen was ok');
      expect(RiTa.evaluate("That was $user.name", ctx)).eq('That was jen');
      expect(RiTa.evaluate("Was that $user.name.ucf()?", ctx)).eq('Was that Jen?');
      expect(RiTa.evaluate("$user.name", ctx)).eq('jen');
      expect(RiTa.evaluate("$user.name", ctx)).eq('jen');
      expect(RiTa.evaluate("$user.name.toUpperCase()", ctx, 0)).eq('JEN');
      expect(RiTa.evaluate("$user.name.uc()", ctx, 0)).eq('JEN');
      expect(RiTa.evaluate("$user.name.ucf()", ctx, 0)).eq('Jen');
    });
  });

  describe('Evaluate Entities', function() { // using 'he' lib for now
    it('Should correctly decode HTML entities', function() {
      expect(RiTa.evaluate('The &num; symbol')).eq('The # symbol');
      expect(RiTa.evaluate('The &#x00023; symbol')).eq('The # symbol');
      expect(RiTa.evaluate('The &#35; symbol')).eq('The # symbol');
      expect(RiTa.evaluate('The&num;symbol')).eq('The#symbol');
      ['&lsqb;', '&lbrack;', '&#x0005B;', '&#91;'].forEach(e =>
        expect(RiTa.evaluate('The ' + e + ' symbol')).eq('The [ symbol'));
      ['&rsqb;', '&rbrack;', '&#x0005D;', '&#93;'].forEach(e =>
        expect(RiTa.evaluate('The ' + e + ' symbol')).eq('The ] symbol'));
    });

    it('Should allow basic punctuation', function() {
      expect(RiTa.evaluate("The -;:.!?'`", {}, 0)).eq("The -;:.!?'`");
      expect(RiTa.evaluate('The -;:.!?"`', {})).eq('The -;:.!?"`');
      expect(RiTa.evaluate(",.;:\\'?!-_`“”’‘…‐–—―", {}, 0)).eq(",.;:\\'?!-_`“”’‘…‐–—―");
      expect(RiTa.evaluate(',.;:\\"?!-_`“”’‘…‐–—―', {}, 0)).eq(',.;:\\"?!-_`“”’‘…‐–—―');
      expect(RiTa.evaluate("/&%©@*")).eq("/&%©@*");
    });

    it('Should allow spaces for formatting', function() {
      expect(RiTa.evaluate("&nbsp;The dog&nbsp;", {}, 0)).eq(" The dog ");
      expect(RiTa.evaluate("&nbsp; The dog&nbsp;", {}, 0)).eq("  The dog ");
      expect(RiTa.evaluate("The &nbsp;dog", {}, 0)).eq("The  dog");
      expect(RiTa.evaluate("The&nbsp; dog", {}, 0)).eq("The  dog");
      expect(RiTa.evaluate("The &nbsp; dog", {}, 0)).eq("The   dog");
    });
  });

  describe('Evaluate Transforms', function() {
    it('Should throw on bad transforms', function() {
      expect(() => RiTa.evaluate('a.toUpperCase()', 0, 0, 1)).to.throw();
    });

    it('Should correctly handle choice transforms', function() {
      expect(RiTa.evaluate('(a | b).toUpperCase()')).to.be.oneOf(['A', 'B']);
      expect(RiTa.evaluate("The (boy | boy).toUpperCase() ate.")).eq('The BOY ate.');
    });

    /*it('Should correctly handle assign transforms', function() {
      let ctx = {};
      expect(RiTa.evaluate('[$stored=(a | a).toUpperCase()] dog is a mammal.', ctx)).eq('A dog is a mammal.');
      expect(ctx.stored).eq('A');
      expect(RiTa.evaluate('[$stored=(the | the)].toUpperCase() dog is a mammal.', ctx)).eq('the dog is a mammal.');
      expect(ctx.stored).eq('the');
      ctx = {};
      RiTa.evaluate('[$x=(a | b)].toUpperCase()', ctx);
      expect(ctx.x).to.be.oneOf(['a', 'b']);
    });*/

    it('Should correctly handle symbol transforms', function() {
      expect(RiTa.evaluate('The $dog.toUpperCase()', { dog: 'spot' })).eq('The SPOT');
      expect(RiTa.evaluate("The (boy | boy).toUpperCase() ate.")).eq('The BOY ate.');
      expect(RiTa.evaluate("The (girl).toUpperCase() ate.")).eq('The GIRL ate.');

    });

    it('Should correctly parse object properties', function() {
      let dog = { name: 'spot', color: 'white', hair: { color: 'white' } };
      expect(RiTa.evaluate("It was a $dog.hair.color dog.", { dog: dog })).eq('It was a white dog.');
      expect(RiTa.evaluate("It was a $dog.color.toUpperCase() dog.", { dog: dog })).eq('It was a WHITE dog.');
    });

    it('Should correctly call member function', function() {
      let dog = { name: 'spot', getColor: function() { return 'red' } };
      expect(RiTa.evaluate("It was a $dog.getColor() dog.", { dog: dog })).eq('It was a red dog.');
    });

    it('Should handle transforms ending with punc', function() {
      expect(RiTa.evaluate('(a | b).toUpperCase().')).to.be.oneOf(['A.', 'B.']);
      expect(RiTa.evaluate("The (boy | boy).toUpperCase()!")).eq('The BOY!');
      expect(RiTa.evaluate('The $dog.toUpperCase()?', { dog: 'spot' })).eq('The SPOT?');
      expect(RiTa.evaluate("The (boy | boy).toUpperCase().")).eq('The BOY.');

      let dog = { name: 'spot', color: 'white', hair: { color: 'white' } };
      expect(RiTa.evaluate("It was $dog.hair.color.", { dog: dog })).eq('It was white.');
      expect(RiTa.evaluate("It was $dog.color.toUpperCase()!", { dog: dog })).eq('It was WHITE!');

      let col = { getColor: function() { return 'red' } };
      expect(RiTa.evaluate("It was $dog.getColor()?", { dog: col })).eq('It was red?');

      let ctx = { user: { name: 'jen' } }
      expect(RiTa.evaluate("That was $user.name!", ctx)).eq('That was jen!');
      expect(RiTa.evaluate("That was $user.name.", ctx)).eq('That was jen.');
    });

    // it('Should correctly handle transforms on literals', function() {
    //   expect(RiTa.evaluate('How many (teeth).quotify() do you have?')).eq('How many "teeth" do you have?');
    //   expect(RiTa.evaluate('That is (ant).articlize().')).eq('That is an ant.');
    // });
  });

  describe('Evaluate Assignments', function() {

    it('Should eval previous assignments', function() {
      expect(RiTa.evaluate('$foo=a\n$foo', null, 0)).eq('a');
      expect(RiTa.evaluate('$foo=(hi | hi) $foo there', null, 0)).eq('hi there');
      expect(RiTa.evaluate('$foo=(hi | hi) $foo there', null, 0)).eq('hi there');

      expect(RiTa.evaluate('$foo=dog\n$bar=$foo\n$baz=$foo\n$baz', null, 0)).eq('dog');
      expect(RiTa.evaluate('$foo=hi $foo there', null, 0)).eq('hi there');
    });

    it('Should eval pre-defined variables', function() {
      let script = [
        '$noun=(woman | woman)',
        '$start=$noun',
        '$start'
      ].join('\n');
      expect(RiTa.evaluate(script, null, 0)).eq('woman');
    });

    it('Should parse assignments', function() {
      let ctx = {};
      expect(RiTa.evaluate('$foo=a', ctx, 0)).eq('');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(RiTa.evaluate('$foo=a\nb', ctx, 0)).eq('b');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(RiTa.evaluate('$foo=(a | a)', ctx, 0)).eq('');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(RiTa.evaluate('$foo=ab', ctx, 0)).eq('');
      expect(ctx.foo).eq('ab');

      ctx = {};
      expect(RiTa.evaluate('$foo=ab bc', ctx, 0)).eq('bc');
      expect(ctx.foo).eq('ab');

      ctx = {};
      expect(RiTa.evaluate('$foo=(ab) (bc)', ctx, 0)).eq('bc');
      expect(ctx.foo).eq('ab');

      ctx = {};
      expect(RiTa.evaluate('$foo=(ab bc)', ctx, 0)).eq('');
      expect(ctx.foo).eq('ab bc');

      ctx = {};
      expect(RiTa.evaluate('$foo=(a | a) (b | b)', ctx, 0)).eq('b');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(RiTa.evaluate('$foo=((a | a) | (a | a))', ctx, 0)).eq('');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(RiTa.evaluate('$foo=()', ctx, 0)).eq(''); // empty string
      expect(ctx.foo).eq('');

      ctx = {};
      expect(RiTa.evaluate('$foo=a\n$bar=$foo', ctx, 0)).eq(''); // empty string
      expect(ctx.foo).eq('a');
      expect(ctx.bar).eq('a');
    });

    it('Should parse transformed assignments', function() {

      // WORKING HERE

      let ctx = {};
      expect(RiTa.evaluate('$foo=(a).toUpperCase()', ctx, 0)).eq('');
      expect(ctx.foo).eq('A');

      ctx = {};
      expect(RiTa.evaluate('$foo=(a | a).toUpperCase()', ctx, 0)).eq('');
      expect(ctx.foo).eq('A');

      ctx = {};
      expect(RiTa.evaluate('$foo=(ab).toUpperCase()', ctx, 0)).eq('');
      expect(ctx.foo).eq('AB');

      ctx = {};
      expect(RiTa.evaluate('$foo=(ab).toUpperCase() (bc).toUpperCase()', ctx, 0)).eq('BC');
      expect(ctx.foo).eq('AB');

      ctx = {};
      expect(RiTa.evaluate('$foo=(ab bc).toUpperCase()', ctx, 0)).eq('');
      expect(ctx.foo).eq('AB BC');

      ctx = {};
      expect(RiTa.evaluate('$foo=(a | a).toUpperCase() (b | b)', ctx, 0)).eq('b');
      expect(ctx.foo).eq('A');

      ctx = {};
      expect(RiTa.evaluate('$foo=(a | a).toUpperCase() (b | b).toUpperCase()', ctx, 0)).eq('B');
      expect(ctx.foo).eq('A');

      ctx = {};
      expect(RiTa.evaluate('$foo=((a | a) | (a | a))', ctx, 0)).eq('');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(RiTa.evaluate('$foo=().toUpperCase()', ctx, 0)).eq(''); // empty string
      expect(ctx.foo).eq('');
    });
  });

  /*describe('Evaluate Assignments', function() {

    it('Should correctly parse assignments', function() {
      let ctx = {};
      expect(RiTa.evaluate('$foo=(a | a)', ctx, 0)).eq('');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(RiTa.evaluate('$foo=(hi | hi) $foo there', ctx, 0)).eq('hi there');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(RiTa.evaluate('$foo=The boy walked his dog', ctx, 0)).eq('');
      expect(ctx.foo).eq('a');

      expect(RiTa.evaluate('$foo=(hi | hi)$foo there', {}, 0))
        .eq(RiTa.evaluate('[$foo=(hi | hi)] there'));
    });

    it('Should correctly concatenate variables', function() {
      let ctx = {};
      expect(RiTa.evaluate('{$foo=(h | h)} ${foo}ello', ctx, 0)).eq('hello'); // TODO
      expect(ctx.foo).eq('h');
      expect(RiTa.evaluate('[$foo=(a | a)]', ctx, 0)).eq('a');
      expect(ctx.foo).eq('a');
      expect(RiTa.evaluate('${foo} b c', ctx, 0)).eq('a b c');
      expect(RiTa.evaluate('${foo}bc', ctx, 0)).eq('abc');
    });

    it('Should correctly assign a variable to a result', function() {
      let context = {};
      let result = RiTa.evaluate('[$stored=(a | b)]', context);
      expect(result).to.be.oneOf(['a', 'b']);
      expect(context.stored).eq(result);
      let result2 = RiTa.evaluate('[$a=$stored]', context);
      expect(context.a).eq(result2);
      expect(result2).eq(context.stored);
    });


    it('Should correctly assign a variable to code', function() {
      expect(RiTa.evaluate('A [$stored=($animal | $animal)] is a mammal', { animal: 'dog' })).eq('A dog is a mammal');
      expect(RiTa.evaluate('[$b=(a | a)].toUpperCase() dog is a $b.', {}, 0)).eq('A dog is a A.');
      expect(RiTa.evaluate('[$b=(a | a).toUpperCase()] dog is a $b.', {}, 0)).eq('A dog is a A.');
    });

    it('Should correctly reuse an assigned variable', function() {
      let ctx = {};
      let inp = 'Once there was a girl called [$hero=(Jane | Jane)].';
      inp += '\n$hero lived in [$home=(Neverland | Neverland)].';
      inp += '\n$hero liked living in $home.';
      let out = 'Once there was a girl called Jane.\nJane lived in Neverland.\nJane liked living in Neverland.';
      expect(RiTa.evaluate(inp, ctx)).eq(out);
    });
  });*/

  /*describe('Evaluate S-assignments', function() {

    it('Should throw on silent assign with transform', function() {
      expect(() => RiTa.evaluate('{$b=(a | a)}.toUpperCase() dog is a $b.', {}, 0)).to.throw();
    });

    it('Should correctly process a silent assignment', function() {
      let exp = 'A dog is a mammal';
      expect(RiTa.evaluate('{$stored=(a | a)} $stored dog is a mammal', {})).eq(exp.toLowerCase());
      expect(RiTa.evaluate('{$stored=(a | a)} ($stored).toUpperCase() dog is a mammal')).eq(exp);
      expect(RiTa.evaluate('{$stored=(a | a)}($stored).toUpperCase() dog is a mammal')).eq(exp);
      expect(RiTa.evaluate('{$stored=(a | a)}\n($stored).toUpperCase() dog is a mammal')).eq(exp);
      expect(RiTa.evaluate('{$stored=(a | a).toUpperCase()}($stored) dog is a mammal')).eq(exp);
    });

    it('Should correctly assign a silent variable to a result', function() {
      let context = {};
      let result = RiTa.evaluate('{$stored=(a | b)}', context);
      expect(result).eq('');
      expect(context.stored).to.be.oneOf(['a', 'b']);
      let result2 = RiTa.evaluate('{$a=$stored}', context);
      expect(result2).eq('');
      expect(context.a).eq(context.stored);

    });

    it('Should correctly assign a silent variable to code', function() {
      expect(RiTa.evaluate('A {$stored=($animal | $animal)} is a mammal', { animal: 'dog' }, 0)).eq('A is a mammal');
      expect(RiTa.evaluate('{$b=(a | a).toUpperCase()} dog is a $b.', {}, 0)).eq('dog is a A.');
      expect(RiTa.evaluate('[$b=(a | a)].toUpperCase() dog is a ($b).toLowerCase().', {})).eq('A dog is a a.');
    });

    it('Should correctly reuse silent assigned variables', function() {
      let ctx = {};
      let inp = 'Once there was a girl called {$hero=(Jane | Jane)} $hero.';
      inp += '\n$hero lived in {$home=(Neverland | Neverland)} $home.';
      inp += '\n$hero liked living in $home.';
      let out = 'Once there was a girl called Jane.\nJane lived in Neverland.\nJane liked living in Neverland.';
      expect(RiTa.evaluate(inp, ctx)).eq(out);
    });
  });*/

});
