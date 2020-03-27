const RiScript = require('../src/riscript');
const Transforms = require('../src/transforms');

// SOLUTION 1:
// Unenclosed variables on a line, include the whole line and can have nothing else
// other you need to use {} or [] or ()

// TODO:
// handle multipliers in cfg-s
// variable concatenation

const VARIABLE_CONCAT = 0;

describe('RiTa.RiScript', () => {

  if (typeof module !== 'undefined') require('./before');

  describe('Weighted Choices', () => {
    it('Should parse/select weighted choices', () => {

      // NEXT: WORKING HERE
      expect(RiTa.evaluate('(a | b [2]|)', {}, 0)).to.be.oneOf(['a', 'b', '']);
    });
  });

  describe('Multevals', () => {
    it('Should eval simple expressions', () => {
      let ctx, exp;
      ctx = { a: 'a', b: 'b' };
      expr = '(a|a)';
      expect(RiScript.eval(expr, ctx)).eq('a');

      ctx = { a: 'a', b: 'b' };
      expr = '(a|a)';
      expect(RiScript.multeval(expr, ctx)).eq('a');

      ctx = { a: '$b', b: '(c | c)' };
      expr = '$a';
      expect(RiScript.multeval(expr, ctx)).eq('c');

      ctx = { a: '$b', b: '(c | c)' };
      expr = '$k = $a\n$k';
      expect(RiScript.multeval(expr, ctx)).eq('c');

      expr = '$s = $a\n$a = $b\n$c = $d\n$d = c\n$s';
      expect(RiScript.multeval(expr, ctx)).eq('c');

      expr = { s: '$a', a: '$b', c: '$d', d: 'c' };
      expect(RiScript.multeval('$s', ctx)).eq('c');
    });

    /*     it('Should throw on infinite recursions', () => {
          let ctx, exp;
          ctx = { a: 'a', b: 'b' };
          expr = '(a|a)';
          expect(RiScript.eval(expr, ctx)).eq('a');
    
          ctx = { a: 'a', b: 'b' };
          expr = '(a|a)';
          expect(RiScript.multeval(expr, ctx)).eq('a');
    
          ctx = { a: '$b', b: '(c | c)' };
          expr = '$a';
          expect(RiScript.multeval(expr, ctx)).eq('c');
    
          ctx = { a: '$b', b: '(c | c)' };
          expr = '$k = $a\n$k';
          expect(RiScript.multeval(expr, ctx)).eq('c');
    
          expr = '$s = $a\n$a = $b\n$c = $d\n$d = c\n$s';
          expect(RiScript.multeval(expr, ctx)).eq('c');
    
          expr = { s: '$a', a: '$b', c: '$d', d: 'c' };
          expect(RiScript.multeval('$s', ctx)).eq('c');
        }); */
  })



  describe('Expressions', () => {
    it('Should eval simple expressions', () => {
      expect(RiTa.evaluate('foo', {}, 0)).eq('foo');
      expect(RiTa.evaluate('foo.', {}, 0)).eq('foo.');
      expect(RiTa.evaluate('foo\nbar', {}, 0)).eq('foo bar');
      //expect(RiTa.evaluate('foo.bar', {}, 0)).eq('foo.bar'); // KNOWN ISSUE
    });
  });

  VARIABLE_CONCAT && describe('Variable Concatenation', () => {
    it('Should concatenate variables', () => {
      let ctx = {};
      expect(RiTa.evaluate('{$foo=(h | h)} ${foo}ello', ctx, 0)).eq('hello'); // TODO
      expect(ctx.foo).eq('h');
      expect(RiTa.evaluate('[$foo=(a | a)]', ctx, 0)).eq('a');
      expect(ctx.foo).eq('a');
      expect(RiTa.evaluate('${foo} b c', ctx, 0)).eq('a b c');
      expect(RiTa.evaluate('${foo}bc', ctx, 0)).eq('abc');
    });
  });

  describe('Inline Assignments', () => {

    it('Should evaluate inline assigns', () => {
      expect(RiTa.evaluate('[$foo=hi]', 0, 0)).eq('hi');
      expect(RiTa.evaluate('[$foo=(hi | hi)] there')).eq('hi there');
      expect(RiTa.evaluate('[$foo=(hi | hi).ucf()] there')).eq('Hi there');

      expect(RiTa.evaluate('$foo=(hi | hi)\n$foo there', ctx = {}, 0))
        .eq(RiTa.evaluate('[$foo=(hi | hi)] there'));
    });

    it('Should handle assign transforms', () => {
      let ctx = {};
      expect(RiTa.evaluate('[$stored=(a | a).toUpperCase()] dog is a mammal.', ctx)).eq('A dog is a mammal.');
    });

    it('Should assign a variable to a result', () => {
      let context = {};
      let result = RiTa.evaluate('[$stored=(a | b)]', context);
      expect(result).to.be.oneOf(['a', 'b']);
      expect(context.stored).eq(result);
      let result2 = RiTa.evaluate('[$a=$stored]', context);
      expect(context.a).eq(result2);
      expect(result2).eq(context.stored);
    });

    it('Should assign a variable to code', () => {
      expect(RiTa.evaluate('A [$stored=($animal | $animal)] is a mammal', { animal: 'dog' })).eq('A dog is a mammal');
      expect(RiTa.evaluate('[$b=(a | a).toUpperCase()] dog is a $b.', {}, 0)).eq('A dog is a A.');
    });

    it('Should reuse an assigned variable', () => {
      let ctx = {};
      let inp = 'Once there was a girl called [$hero=(Jane | Jane)].';
      inp += '\n$hero lived in [$home=(Neverland | Neverland)].';
      inp += '\n$hero liked living in $home.';
      let out = 'Once there was a girl called Jane. Jane lived in Neverland. Jane liked living in Neverland.';
      expect(RiTa.evaluate(inp, ctx)).eq(out);
    });
  });


  describe('Basic Assignments', () => {

    it('Should parse assignments', () => {
      let ctx = {};
      expect(RiTa.evaluate('$foo=a', ctx, 0)).eq('');
      expect(ctx.foo).eq('a');

      ctx = {};
      //RiTa.evaluate('$foo=(a) b', ctx, 0);
      expect(RiTa.evaluate('$foo=(a) b', ctx, 0)).eq('');
      expect(ctx.foo).eq('a b');

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
      expect(RiTa.evaluate('$foo=ab bc', ctx, 0)).eq('');
      expect(ctx.foo).eq('ab bc');

      ctx = {};
      expect(RiTa.evaluate('$foo=(ab) (bc)', ctx, 0)).eq('');
      expect(ctx.foo).eq('ab bc');

      ctx = {};
      expect(RiTa.evaluate('$foo=(ab bc)', ctx, 0)).eq('');
      expect(ctx.foo).eq('ab bc');

      ctx = {};
      expect(RiTa.evaluate('$foo=(a | a) (b | b)', ctx, 0)).eq('');
      expect(ctx.foo).eq('a b');

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

      /*     expect(RiTa.evaluate('$foo=a\n$bar=$foo.', ctx, 0)).eq(''); // empty string
          expect(ctx.foo).eq('a');
          expect(ctx.bar).eq('a.'); */

      expect(RiTa.evaluate('$foo=(a | a)', ctx = {}, 0)).eq('');
      expect(ctx.foo).eq('a');

      expect(RiTa.evaluate('$foo=(a | a)\n$foo', ctx = {}, 0)).eq('a');
      expect(ctx.foo).eq('a');

      expect(RiTa.evaluate('$foo=(hi | hi)\n$foo there', ctx = {}, 0)).eq('hi there');
      expect(ctx.foo).eq('hi');

      expect(RiTa.evaluate('$foo=The boy walked his dog', ctx = {}, 0)).eq('');
      expect(ctx.foo).eq('The boy walked his dog');
    });

    it('Should handle sentences', () => {
      let res, ctx;

      /* // MOVE TO KNOWN ISSUES  
        ctx = {};  
       expect(RiTa.evaluate('$foo=.r', ctx, 1)).eq('');
       expect(ctx.foo).eq('.r');  */

      expect(RiTa.evaluate('.', null, 0)).eq('.');

      ctx = {};
      expect(RiTa.evaluate('$foo=a', ctx, 0)).eq('');
      expect(ctx.foo).eq('a');

      // NEXT: working on strange problem with DOT in expr
      ctx = {};
      expect(RiTa.evaluate('$foo=.', ctx, 0)).eq('');
      expect(ctx.foo).eq('.');

      ctx = {};
      expect(RiTa.evaluate('$foo=r.', ctx, 0)).eq('');
      expect(ctx.foo).eq('r.');

      ctx = {};
      expect(RiTa.evaluate('$foo=ran.', ctx, 0)).eq('');
      expect(ctx.foo).eq('ran.');

      ctx = {};
      res = RiTa.evaluate('$start=dog\n$start', ctx, 0);
      expect(ctx.start).eq('dog');
      expect(res).eq('dog');

      ctx = {};
      res = RiTa.evaluate('$start=.\n$start', ctx, 0);
      expect(ctx.start).eq('.');
      expect(res).eq('.');

      ctx = {};
      res = RiTa.evaluate('$noun=I\n$start=$noun ran.\n$start', ctx, 0);
      expect(ctx.noun).eq('I');
      expect(res).eq('I ran.');

      ctx = {};
      res = RiTa.evaluate('$noun=I\n$verb=sat\n$start=$noun $verb.\n$start', ctx, 0);
      expect(ctx.noun).eq('I');
      expect(ctx.verb).eq('sat');
      expect(res).eq('I sat.');
    });

    it('Should parse transformed assignments', () => {

      let ctx;
      expect(RiTa.evaluate('$foo=(a).toUpperCase()', ctx = {}, 0)).eq('');
      expect(ctx.foo).eq('A');

      expect(RiTa.evaluate('$foo=(a | a).toUpperCase()', ctx = {}, 0)).eq('');
      expect(ctx.foo).eq('A');

      expect(RiTa.evaluate('$foo=(ab).toUpperCase()', ctx = {}, 0)).eq('');
      expect(ctx.foo).eq('AB');

      expect(RiTa.evaluate('$foo=(ab).toUpperCase() (bc).toUpperCase()', ctx = {}, 0)).eq('');
      expect(ctx.foo).eq('AB BC');

      expect(RiTa.evaluate('$foo=(ab bc).toUpperCase()', ctx = {}, 0)).eq('');
      expect(ctx.foo).eq('AB BC');

      expect(RiTa.evaluate('$foo=(a | a).toUpperCase() (b | b)', ctx = {}, 0)).eq('');
      expect(ctx.foo).eq('A b');

      expect(RiTa.evaluate('$foo=(a | a).toUpperCase() (b | b).toUpperCase()', ctx = {}, 0)).eq('');
      expect(ctx.foo).eq('A B');

      expect(RiTa.evaluate('$foo=((a | a) | (a | a))', ctx = {}, 0)).eq('');
      expect(ctx.foo).eq('a');

      expect(RiTa.evaluate('$foo=().toUpperCase()', ctx = {}, 0)).eq(''); // empty string
      expect(ctx.foo).eq('');
    });

  });

  describe('Symbols', () => {

    it('Should throw on bad symbols', () => {
      expect(() => RiTa.evaluate('$', 0, 0, 1)).to.throw();
    });


    it('Should evaluate symbol with a property transform', () => {
      let ctx = { bar: { color: 'blue' } };
      let rs = RiTa.evaluate('$bar.color', ctx);
      expect(rs).eq('blue');
    });

    it('Should evaluate symbol with a value property transform', () => {
      let ctx = { bar: { color: 'blue' } };
      let rs = RiTa.evaluate('$foo=$bar.color\n$foo', ctx, 0);
      expect(rs).eq('blue');
    });

    it('Should eval linebreak-defined variables', () => {
      let res = RiTa.evaluate('$foo=hello\n$start=I said $foo to her\n$start', {}, 0);
      expect(res).eq('I said hello to her');
    });

    it('Should resolve symbols in context', () => {

      expect(RiTa.evaluate('the $dog ate', { dog: 'terrier' }, 0)).eq('the terrier ate');
      expect(RiTa.evaluate('the $dog $verb', { dog: 'terrier', verb: 'ate' }, 0)).eq('the terrier ate');

      expect(RiTa.evaluate('$foo', {}, 0, 1)).eq('$foo'); // no-op
      expect(RiTa.evaluate('a $foo dog', {}, 0, 1)).eq('a $foo dog'); // no-op
      expect(RiTa.evaluate('$foo', { foo: 'bar' }, 0)).eq('bar');
      expect(RiTa.evaluate('a $dog', { dog: 'terrier' })).eq('a terrier');
      expect(RiTa.evaluate('I ate the $dog', { dog: 'beagle' }, 0)).eq('I ate the beagle');
      expect(RiTa.evaluate('The $dog today.', { dog: 'lab' }, 0)).eq('The lab today.');
      expect(RiTa.evaluate('I ate the $dog.', { dog: 'lab' }, 0)).eq('I ate the lab.');

      expect(RiTa.evaluate('$foo\n', {}, 0, 1)).eq('$foo'); // no-op
      expect(RiTa.evaluate('a $foo\ndog', {}, 0, 1)).eq('a $foo dog'); // no-op
      expect(RiTa.evaluate('$foo\n', { foo: 'bar' }, 0)).eq('bar');
      expect(RiTa.evaluate('a $dog', { dog: 'terrier' })).eq('a terrier');
      expect(RiTa.evaluate('I ate\nthe $dog', { dog: 'beagle' }, 0)).eq('I ate the beagle');
      expect(RiTa.evaluate('The $dog\ntoday.', { dog: 'lab' }, 0)).eq('The lab today.');
      expect(RiTa.evaluate('I ate the\n$dog.', { dog: 'lab' }, 0)).eq('I ate the lab.');
    });

    it('Should resolve previously defined symbols', () => {

      expect(RiTa.evaluate('$foo=bar\n$foo', {}, 0)).eq('bar');
      expect(RiTa.evaluate('$foo=baz\n$bar=$foo\n$bar', {}, 0)).eq('baz');

      // TODO: symbols that resolve to other symbols (symbols in context are not resolved?)
      //expect(RiTa.evaluate('$bar', { foo: 'baz', bar: '$foo' }, 1)).eq('baz');
    });
  });

  describe('Choices', () => {

    it('Should throw on bad choices', () => {
      expect(() => RiTa.evaluate('|', 0, 0, 1)).to.throw();
      expect(() => RiTa.evaluate('a |', 0, 0, 1)).to.throw();
      expect(() => RiTa.evaluate('a | b', 0, 0, 1)).to.throw();
      expect(() => RiTa.evaluate('a | b | c', 0, 0, 1)).to.throw();
      expect(() => RiTa.evaluate('(a | b) | c', 0, 0, 1)).to.throw();
    });

    it('Should parse/select choices', () => {
      expect(RiTa.evaluate('(|)')).eq('');
      expect(RiTa.evaluate('(a)')).eq('a');
      expect(RiTa.evaluate('(a | a)')).eq('a');
      expect(RiTa.evaluate('(a | )')).to.be.oneOf(['a', '']);
      expect(RiTa.evaluate('(a | b)')).to.be.oneOf(['a', 'b']);
      expect(RiTa.evaluate('(a | b | c)'), {}).to.be.oneOf(['a', 'b', 'c']);
      expect(RiTa.evaluate('(a | (b | c) | d)')).to.be.oneOf(['a', 'b', 'c', 'd']);
    });

    it('Should parse choices from an expression', () => {

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

    it('Should parse symbols/choices from an expr', () => {
      let ctx = { user: { name: 'jen' } }
      expect(RiTa.evaluate("Was $user.name.ucf() (ok | ok) today?", ctx)).eq('Was Jen ok today?');
      expect(RiTa.evaluate("$user.name was ok", ctx)).eq('jen was ok');
      expect(RiTa.evaluate("That was $user.name", ctx)).eq('That was jen');
      expect(RiTa.evaluate("Was that $user.name.ucf()?", ctx)).eq('Was that Jen?');
      expect(RiTa.evaluate("$user.name", ctx)).eq('jen');
      expect(RiTa.evaluate("$user.name", ctx)).eq('jen');
      expect(RiTa.evaluate("$user.name.toUpperCase()", ctx, 0)).eq('JEN');
      expect(RiTa.evaluate("$user.name.uc()", ctx, 0)).eq('JEN');
      expect(RiTa.evaluate("$user.name.ucf()", ctx, 0)).eq('Jen');
      expect(RiTa.evaluate('Was the $dog.breed (ok | ok) today?', { dog: { breed: 'Corgie' } }, 0)).eq('Was the Corgie ok today?');
    });
  });

  describe('Entities', () => { // using 'he' lib for now
    it('Should decode HTML entities', () => {
      expect(RiTa.evaluate('The &num; symbol')).eq('The # symbol');
      expect(RiTa.evaluate('The &#x00023; symbol')).eq('The # symbol');
      expect(RiTa.evaluate('The &#35; symbol')).eq('The # symbol');
      expect(RiTa.evaluate('The&num;symbol')).eq('The#symbol');
      ['&lsqb;', '&lbrack;', '&#x0005B;', '&#91;'].forEach(e =>
        expect(RiTa.evaluate('The ' + e + ' symbol')).eq('The [ symbol'));
      ['&rsqb;', '&rbrack;', '&#x0005D;', '&#93;'].forEach(e =>
        expect(RiTa.evaluate('The ' + e + ' symbol')).eq('The ] symbol'));
    });

    it('Should allow basic punctuation', () => {
      expect(RiTa.evaluate("The -;:.!?'`", {}, 0)).eq("The -;:.!?'`");
      expect(RiTa.evaluate('The -;:.!?"`', {})).eq('The -;:.!?"`');
      expect(RiTa.evaluate(",.;:\\'?!-_`“”’‘…‐–—―", {}, 0)).eq(",.;:\\'?!-_`“”’‘…‐–—―");
      expect(RiTa.evaluate(',.;:\\"?!-_`“”’‘…‐–—―', {}, 0)).eq(',.;:\\"?!-_`“”’‘…‐–—―');
      expect(RiTa.evaluate("/&%©@*")).eq("/&%©@*");
    });

    it('Should allow spaces for formatting', () => {
      expect(RiTa.evaluate("&nbsp;The dog&nbsp;", {}, 0)).eq(" The dog ");
      expect(RiTa.evaluate("&nbsp; The dog&nbsp;", {}, 0)).eq("  The dog ");
      expect(RiTa.evaluate("The &nbsp;dog", {}, 0)).eq("The  dog");
      expect(RiTa.evaluate("The&nbsp; dog", {}, 0)).eq("The  dog");
      expect(RiTa.evaluate("The &nbsp; dog", {}, 0)).eq("The   dog");
    });
  });

  describe('Transforms', () => {
    it('Should throw on bad transforms', () => {
      expect(() => RiTa.evaluate('a.toUpperCase()', 0, 0, 1)).to.throw();
    });

    it('Should handle choice transforms', () => {

      let ctx = {};
      expect(RiTa.evaluate('$foo=().toUpperCase()', ctx, 0)).eq('');
      expect(ctx.foo).eq('');

      expect(RiTa.evaluate('(a).toUpperCase()')).eq('A');
      expect(RiTa.evaluate('(a | b).toUpperCase()')).to.be.oneOf(['A', 'B']);
      expect(RiTa.evaluate("The (boy | boy).toUpperCase() ate.")).eq('The BOY ate.');
      expect(RiTa.evaluate('How many (tooth | tooth).pluralize() do you have?')).eq('How many teeth do you have?');
    });

    it('Should handle symbol transforms', () => {
      expect(RiTa.evaluate('$dog.toUpperCase()', { dog: 'spot' }, 0)).eq('SPOT');
      expect(RiTa.evaluate('$dog.toUpperCase()', {}, 0, 1)).eq('$dog.toUpperCase()');
      expect(RiTa.evaluate('The $dog.toUpperCase()', { dog: 'spot' })).eq('The SPOT');
      expect(RiTa.evaluate("The (boy | boy).toUpperCase() ate.")).eq('The BOY ate.');
      expect(RiTa.evaluate("The (girl).toUpperCase() ate.")).eq('The GIRL ate.');
    });

    it('Should parse object properties', () => {
      let dog = { name: 'spot', color: 'white', hair: { color: 'white' } };
      expect(RiTa.evaluate("It was a $dog.hair.color dog.", { dog }, 0)).eq('It was a white dog.');
      expect(RiTa.evaluate("It was a $dog.color.toUpperCase() dog.", { dog })).eq('It was a WHITE dog.');
    });

    it('Should call member function', () => {
      let dog = { name: 'Spot', getColor: () => 'red' };
      expect(RiTa.evaluate("$dog.name was a $dog.getColor() dog.", { dog })).eq('Spot was a red dog.');
    });

    it('Should handle transforms ending with punc', () => {
      expect(RiTa.evaluate('(a | b).toUpperCase().')).to.be.oneOf(['A.', 'B.']);
      expect(RiTa.evaluate("The (boy | boy).toUpperCase()!")).eq('The BOY!');
      expect(RiTa.evaluate('The $dog.toUpperCase()?', { dog: 'spot' })).eq('The SPOT?');
      expect(RiTa.evaluate("The (boy | boy).toUpperCase().")).eq('The BOY.');

      let dog = { name: 'spot', color: 'white', hair: { color: 'white' } };
      expect(RiTa.evaluate("It was $dog.hair.color.", { dog: dog })).eq('It was white.');
      expect(RiTa.evaluate("It was $dog.color.toUpperCase()!", { dog: dog })).eq('It was WHITE!');

      let col = { getColor: () => 'red' };
      expect(RiTa.evaluate("It was $dog.getColor()?", { dog: col })).eq('It was red?');

      let ctx = { user: { name: 'jen' } }
      expect(RiTa.evaluate("That was $user.name!", ctx)).eq('That was jen!');
      expect(RiTa.evaluate("That was $user.name.", ctx)).eq('That was jen.');

    });

    it('Should handle transforms on literals', () => {
      expect(RiTa.evaluate('How many (teeth).toUpperCase() do you have?', 0, 0)).eq('How many TEETH do you have?');
      expect(RiTa.evaluate('How many (teeth).quotify() do you have?', 0, 0)).eq('How many "teeth" do you have?');
      expect(RiTa.evaluate('That is (ant).articlize().')).eq('That is an ant.');
    });
  });


  describe('Grammars', () => {

    it('Should evaluate post-defined symbols', () => {
      let rs = RiScript.multeval('$foo=$bar\n$bar=baz\n$foo', {}, 0);
      expect(rs).eq('baz');
    });

    it('Should evaluate symbols with a transform', () => {
      let rs = RiScript.multeval('$foo=$bar.toUpperCase()\n$bar=baz\n$foo', {}, 0);
      expect(rs).eq('BAZ');
    });

    it('Should evaluate symbols even with property transform', () => {
      let context = { bar: { ucf: 'result' } };
      let rs = RiScript.multeval('$foo=$bar.ucf\n$foo', context, 0);
      expect(rs).eq('result');
    });

    /*
    it('Should evaluate symbols even with a bad func transform', () => {
      let rs = RiScript.multeval('$foo=$bar.ucf\n$bar=baz\n$foo', {}, 0);
      expect(rs).eq('baz.ucf');
    });

    it('Should evaluate symbols even with one bad func transform', () => {
      let rs = RiScript.multeval('$foo=$bar.toUpperCase().ucf\n$bar=baz\n$foo', {}, 0);
      expect(rs).eq('BAZ.ucf');
    });*/

    it('Should evaluate post-defined symbols with transforms', () => {
      let rs = RiScript.multeval('$foo=$bar.toLowerCase().ucf()\n$bar=baz\n$foo', {}, 0);
      expect(rs).eq('Baz');
    });

    it('Should eval converted grammar', () => {
      let script = [
        '$start = $nounp $verbp.',
        '$nounp = $determiner $noun',
        '$determiner = (the | the)',
        '$verbp = $verb $nounp',
        '$noun = (woman | woman)',
        '$verb = shoots',
        '$start'
      ].join('\n') + '\n';
      //console.log(script);
      let rs = RiScript.multeval(script, null, 0);
      expect(rs).eq('the woman shoots the woman.');
    });

    it('Should eval previous assignments', () => {
      expect(RiScript.multeval('$foo=dog\n$bar=$foo\n$baz=$foo\n$baz', null, 0)).eq('dog');
      expect(RiScript.multeval('$foo=hi\n$foo there', null, 0)).eq('hi there');
      expect(RiScript.multeval('$foo=a\n$foo', null, 0)).eq('a');
    });

    it('Should eval pre-defined variables', () => {
      let script = [
        '$noun=(woman | woman)',
        '$start=$noun',
        '$start'
      ].join('\n');
      expect(RiScript.multeval(script, null, 0)).eq('woman');
    });

  });

  /*describe('S-assignments', function() {

    it('Should throw on silent assign with transform', function() {
      expect(() => RiTa.evaluate('{$b=(a | a)}.toUpperCase() dog is a $b.', {}, 0)).to.throw();
    });

    it('Should process a silent assignment', function() {
      let exp = 'A dog is a mammal';
      expect(RiTa.evaluate('{$stored=(a | a)} $stored dog is a mammal', {})).eq(exp.toLowerCase());
      expect(RiTa.evaluate('{$stored=(a | a)} ($stored).toUpperCase() dog is a mammal')).eq(exp);
      expect(RiTa.evaluate('{$stored=(a | a)}($stored).toUpperCase() dog is a mammal')).eq(exp);
      expect(RiTa.evaluate('{$stored=(a | a)}\n($stored).toUpperCase() dog is a mammal')).eq(exp);
      expect(RiTa.evaluate('{$stored=(a | a).toUpperCase()}($stored) dog is a mammal')).eq(exp);
    });

    it('Should assign a silent variable to a result', function() {
      let context = {};
      let result = RiTa.evaluate('{$stored=(a | b)}', context);
      expect(result).eq('');
      expect(context.stored).to.be.oneOf(['a', 'b']);
      let result2 = RiTa.evaluate('{$a=$stored}', context);
      expect(result2).eq('');
      expect(context.a).eq(context.stored);

    });

    it('Should assign a silent variable to code', function() {
      expect(RiTa.evaluate('A {$stored=($animal | $animal)} is a mammal', { animal: 'dog' }, 0)).eq('A is a mammal');
      expect(RiTa.evaluate('{$b=(a | a).toUpperCase()} dog is a $b.', {}, 0)).eq('dog is a A.');
      expect(RiTa.evaluate('[$b=(a | a)].toUpperCase() dog is a ($b).toLowerCase().', {})).eq('A dog is a a.');
    });

    it('Should reuse silent assigned variables', function() {
      let ctx = {};
      let inp = 'Once there was a girl called {$hero=(Jane | Jane)} $hero.';
      inp += '\n$hero lived in {$home=(Neverland | Neverland)} $home.';
      inp += '\n$hero liked living in $home.';
      let out = 'Once there was a girl called Jane.\nJane lived in Neverland.\nJane liked living in Neverland.';
      expect(RiTa.evaluate(inp, ctx)).eq(out);
    });
  });*/

});
