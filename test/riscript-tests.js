const RiScript = require('../src/riscript');
const Operator = require('../src/operator');

describe('RiTa.RiScript', () => {

  if (typeof module !== 'undefined') require('./before');

  describe('Conditionals', () => {

/*     it.only('XXX', () => {
      expect(RiTa.evaluate('$start=$foo\n$foo=hello\n$start', {}, 1)).eq('hello');
    }); */

    it('Should throw on bad conditionals', () => {
      //expect(() => RiTa.evaluate('{$a<hello} foo', { a: 2 })).to.throw();
      expect(() => RiTa.evaluate('{$a<} foo', { a: 2 }, {silent:1})).to.throw();
    });

    it('Should handle conditionals', () => {
      expect(RiTa.evaluate('{$a<1} foo', { a: 2 }, {trace:0})).eq('');
      expect(RiTa.evaluate('{$a>1} foo', { a: 2 }, {trace:0})).eq('foo');
      expect(RiTa.evaluate('{$a=hello} foo', { a: 'hello' }, {trace:0})).eq('foo');
      expect(RiTa.evaluate('{$a=goodbye} foo', { a: 'hello' }, {trace:0})).eq('');
    });

    it('Should handle float conditionals', () => {
      expect(RiTa.evaluate('{$a<1.1} foo', { a: 2 }, {trace:0})).eq('');
      expect(RiTa.evaluate('{$a>1.1} foo', { a: 2 }, {trace:0})).eq('foo');
      expect(RiTa.evaluate('{$a<.1} foo', { a: 2 }, {trace:0})).eq('');
      expect(RiTa.evaluate('{$a>.1} foo', { a: 2 }, {trace:0})).eq('foo');
      expect(RiTa.evaluate('{$a<0.1} foo', { a: 2 }, {trace:0})).eq('');
      expect(RiTa.evaluate('{$a>0.1} foo', { a: 2 }, {trace:0})).eq('foo');
      expect(RiTa.evaluate('{$a>0.1} foo', { a: .1 }, {trace:0})).eq('');
      expect(RiTa.evaluate('{$a>=0.1} foo', { a: .1 }, {trace:0})).eq('foo');
    });

    it('Should handle multi-val conditionals', () => {
      expect(RiTa.evaluate('{$a<1,$b<1} foo', { a: 2 }, {trace:0})).eq('');
      expect(RiTa.evaluate('{$a>1,$b<1} foo', { a: 2 }, {trace:0})).eq('');
      expect(RiTa.evaluate('{$a>1,$b<1} foo', { a: 2, b: 2 }, {trace:0})).eq('');
      expect(RiTa.evaluate('{$a=ok,$b>=1} foo', { a: 2, b: 2 }, {trace:0})).eq('');
      expect(RiTa.evaluate('{$a>1,$b>=1} foo', { a: 2, b: 2 }, {trace:0})).eq('foo');
    });

    it('Should handle matching conditionals', () => {
      expect(RiTa.evaluate('{$a!=ell} foo', { a: 'hello' }, {trace:0})).eq('foo');
      expect(RiTa.evaluate('{$a*=ell} foo', { a: 'hello' }, {trace:0})).eq('foo');
      expect(RiTa.evaluate('{$a^=ell} foo', { a: 'ello' }, {trace:0})).eq('foo');
      expect(RiTa.evaluate('{$a$=ell} foo', { a: 'helloell' }, {trace:0})).eq('foo');
      expect(RiTa.evaluate('{$a$=ell} foo', { a: 'helloellx' }, {trace:0})).eq('');
    });

    it('Should rs-defined matching conditionals', () => {
      expect(RiTa.evaluate('$a=hello\n{$a!=ell} foo', {}, {trace:0})).eq('foo');
      expect(RiTa.evaluate('$a=hello\n{$a*=ell} foo', {}, {trace:0})).eq('foo');
      expect(RiTa.evaluate('$a=ello\n{$a^=ell} foo', {}, {trace:0})).eq('foo');
      expect(RiTa.evaluate('$a=helloell\n{$a$=ell} foo', {}, {trace:0})).eq('foo');
      expect(RiTa.evaluate('$a=helloellx\n{$a$=ell} foo', {}, {trace:0})).eq('');
    });
  });

  describe('Evaluation', () => {
    it('Should eval simple expressions', () => {
      expect(RiTa.evaluate('foo', {}, {trace:0})).eq('foo');
      expect(RiTa.evaluate('foo.', {}, {trace:0})).eq('foo.');
      expect(RiTa.evaluate('"foo"', {}, {trace:0})).eq('"foo"');
      expect(RiTa.evaluate("'foo'", {}, {trace:0})).eq("'foo'");
      expect(RiTa.evaluate('foo\nbar', {}, {trace:0})).eq('foo bar');
      expect(RiTa.evaluate('foo&#10;bar', {}, {trace:0})).eq('foo\nbar');
      expect(RiTa.evaluate('$foo=bar \\nbaz\n$foo', {}, {trace:0})).eq('bar baz'); ``
      expect(RiTa.evaluate('$foo=bar\nbaz', {}, {trace:0})).eq('baz');
      expect(RiTa.evaluate('$foo=bar\nbaz\n$foo', {}, {trace:0})).eq('baz bar');

      let ctx, exp;
      ctx = { a: 'a', b: 'b' };
      expr = '(a|a)';
      expect(RiTa.evaluate(expr, ctx)).eq('a');
      //expect(RiTa.evaluate('foo.bar', {}, {trace:0})).eq('foo.bar'); // KNOWN ISSUE
    });

    it('Should eval recursive expressions', () => {

      ctx = { a: 'a', b: 'b' };
      expr = '(a|a)';
      expect(RiTa.evaluate(expr, ctx)).eq('a');

      ctx = { a: '$b', b: '(c | c)' };
      expr = '$a';
      expect(RiTa.evaluate(expr, ctx)).eq('c');

      ctx = { a: '$b', b: '(c | c)' };
      expr = '$k = $a\n$k';
      expect(RiTa.evaluate(expr, ctx)).eq('c');

      expr = '$s = $a\n$a = $b\n$c = $d\n$d = c\n$s';
      expect(RiTa.evaluate(expr, ctx)).eq('c');

      expr = { s: '$a', a: '$b', c: '$d', d: 'c' };
      expect(RiTa.evaluate('$s', ctx)).eq('c');
    });

    it('Should throw on infinite recursions', () => {
      expect(() => RiTa.evaluate('$s', { s: '$a', a: '$s' })).to.throw();
    });
  });

  describe('Assign', () => {

    it('Should parse assignments', () => {
      let ctx = {};
      expect(RiTa.evaluate('$foo=a', ctx, {trace:0})).eq('');
      expect(ctx.foo).eq('a');

      ctx = {};
      //RiTa.evaluate('$foo=(a) b', ctx, {trace:0});
      expect(RiTa.evaluate('$foo=(a) b', ctx, {trace:0})).eq('');
      expect(ctx.foo).eq('a b');

      ctx = {};
      expect(RiTa.evaluate('$foo=a\nb', ctx, {trace:0})).eq('b');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(RiTa.evaluate('$foo=(a | a)', ctx, {trace:0})).eq('');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(RiTa.evaluate('$foo=ab', ctx, {trace:0})).eq('');
      expect(ctx.foo).eq('ab');

      ctx = {};
      expect(RiTa.evaluate('$foo=ab bc', ctx, {trace:0})).eq('');
      expect(ctx.foo).eq('ab bc');

      ctx = {};
      expect(RiTa.evaluate('$foo=(ab) (bc)', ctx, {trace:0})).eq('');
      expect(ctx.foo).eq('ab bc');

      ctx = {};
      expect(RiTa.evaluate('$foo=(ab bc)', ctx, {trace:0})).eq('');
      expect(ctx.foo).eq('ab bc');

      ctx = {};
      expect(RiTa.evaluate('$foo=(a | a) (b | b)', ctx, {trace:0})).eq('');
      expect(ctx.foo).eq('a b');

      ctx = {};
      expect(RiTa.evaluate('$foo=((a | a) | (a | a))', ctx, {trace:0})).eq('');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(RiTa.evaluate('$foo=()', ctx, {trace:0})).eq(''); // empty string
      expect(ctx.foo).eq('');

      ctx = {};
      expect(RiTa.evaluate('$foo=a\n$bar=$foo', ctx, {trace:0})).eq(''); // empty string
      expect(ctx.foo).eq('a');
      expect(ctx.bar).eq('a');

      /*     expect(RiTa.evaluate('$foo=a\n$bar=$foo.', ctx, {trace:0})).eq(''); // empty string
          expect(ctx.foo).eq('a');
          expect(ctx.bar).eq('a.'); */

      expect(RiTa.evaluate('$foo=(a | a)', ctx = {}, {trace:0})).eq('');
      expect(ctx.foo).eq('a');

      expect(RiTa.evaluate('$foo=(a | a)\n$foo', ctx = {}, {trace:0})).eq('a');
      expect(ctx.foo).eq('a');

      expect(RiTa.evaluate('$foo=(hi | hi)\n$foo there', ctx = {}, {trace:0})).eq('hi there');
      expect(ctx.foo).eq('hi');

      expect(RiTa.evaluate('$foo=The boy walked his dog', ctx = {}, {trace:0})).eq('');
      expect(ctx.foo).eq('The boy walked his dog');
    });

    it('Should handle sentences', () => {
      let res, ctx;

      /* // MOVE TO KNOWN ISSUES  
        ctx = {};  
       expect(RiTa.evaluate('$foo=.r', ctx, 1)).eq('');
       expect(ctx.foo).eq('.r');  */

      expect(RiTa.evaluate('.', null, {trace:0})).eq('.');

      ctx = {};
      expect(RiTa.evaluate('$foo=a', ctx, {trace:0})).eq('');
      expect(ctx.foo).eq('a');

      // NEXT: working on strange problem with DOT in expr
      ctx = {};
      expect(RiTa.evaluate('$foo=.', ctx, {trace:0})).eq('');
      expect(ctx.foo).eq('.');

      ctx = {};
      expect(RiTa.evaluate('$foo=r.', ctx, {trace:0})).eq('');
      expect(ctx.foo).eq('r.');

      ctx = {};
      expect(RiTa.evaluate('$foo=ran.', ctx, {trace:0})).eq('');
      expect(ctx.foo).eq('ran.');

      ctx = {};
      res = RiTa.evaluate('$start=dog\n$start', ctx, {trace:0});
      expect(ctx.start).eq('dog');
      expect(res).eq('dog');

      ctx = {};
      res = RiTa.evaluate('$start=.\n$start', ctx, {trace:0});
      expect(ctx.start).eq('.');
      expect(res).eq('.');

      ctx = {};
      res = RiTa.evaluate('$noun=I\n$start=$noun ran.\n$start', ctx, {trace:0});
      expect(ctx.noun).eq('I');
      expect(res).eq('I ran.');

      ctx = {};
      res = RiTa.evaluate('$noun=I\n$verb=sat\n$start=$noun $verb.\n$start', ctx, {trace:0});
      expect(ctx.noun).eq('I');
      expect(ctx.verb).eq('sat');
      expect(res).eq('I sat.');
    });

    it('Should parse transformed assignments', () => {

      let ctx;
      expect(RiTa.evaluate('$foo=(a).toUpperCase()', ctx = {}, {trace:0})).eq('');
      expect(ctx.foo).eq('A');

      expect(RiTa.evaluate('$foo=(a | a).toUpperCase()', ctx = {}, {trace:0})).eq('');
      expect(ctx.foo).eq('A');

      expect(RiTa.evaluate('$foo=(ab).toUpperCase()', ctx = {}, {trace:0})).eq('');
      expect(ctx.foo).eq('AB');

      expect(RiTa.evaluate('$foo=(ab).toUpperCase() (bc).toUpperCase()', ctx = {}, {trace:0})).eq('');
      expect(ctx.foo).eq('AB BC');

      expect(RiTa.evaluate('$foo=(ab bc).toUpperCase()', ctx = {}, {trace:0})).eq('');
      expect(ctx.foo).eq('AB BC');

      expect(RiTa.evaluate('$foo=(a | a).toUpperCase() (b | b)', ctx = {}, {trace:0})).eq('');
      expect(ctx.foo).eq('A b');

      expect(RiTa.evaluate('$foo=(a | a).toUpperCase() (b | b).toUpperCase()', ctx = {}, {trace:0})).eq('');
      expect(ctx.foo).eq('A B');

      expect(RiTa.evaluate('$foo=((a | a) | (a | a))', ctx = {}, {trace:0})).eq('');
      expect(ctx.foo).eq('a');

      expect(RiTa.evaluate('$foo=().toUpperCase()', ctx = {}, {trace:0})).eq(''); // empty string
      expect(ctx.foo).eq('');
    });

    it('Should correctly handle transforms on literals', function () {
      expect(RiTa.evaluate('How many (teeth).quotify() do you have?')).eq('How many "teeth" do you have?');
      expect(RiTa.evaluate('That is (ant).articlise().')).eq('That is an ant.');
    });
    /*     it.only('Should handle silents', () => {
          expect(RiTa.evaluate('The $hero=blue (dog | dog)', ctx = {}, {trace:0})).eq('The blue dog');
          expect(ctx.foo).eq('blue');
        }); */
  });

  describe('Inline', () => {

    it('Should evaluate inline assigns', () => {
      let ctx;
      expect(RiTa.evaluate('[$foo=hi]', 0, {trace:0})).eq('hi');
      expect(RiTa.evaluate('[$foo=(hi | hi)] there')).eq('hi there');
      expect(RiTa.evaluate('[$foo=(hi | hi).ucf()] there')).eq('Hi there');

      expect(RiTa.evaluate('$foo=(hi | hi)\n$foo there', ctx = {}, {trace:0}))
        .eq(RiTa.evaluate('[$foo=(hi | hi)] there'));

      let exp = 'A dog is a mammal';
      expect(RiTa.evaluate('$a=a\n($a).toUpperCase()', ctx = {}, {trace:0})).eq('A');

      expect(RiTa.evaluate('[$stored=(a | a)] dog is a mammal', ctx, {trace:0})).eq(exp.toLowerCase());
      expect(ctx.stored).eq('a');

      expect(RiTa.evaluate('[$stored=(a | a).toUpperCase()] dog is a mammal', ctx)).eq(exp);
      expect(ctx.stored).eq('A');

      expect(RiTa.evaluate('[$stored=((a | a).toUpperCase())] dog is a mammal', ctx)).eq(exp);
      expect(ctx.stored).eq('A');

      expect(RiTa.evaluate('$stored=(a | a)\n$stored.toUpperCase() dog is a mammal', ctx, {trace:0})).eq(exp);
      expect(ctx.stored).eq('a');

      expect(RiTa.evaluate('$stored=(a | a)\n($stored).toUpperCase() dog is a mammal', ctx)).eq(exp);
      expect(ctx.stored).eq('a');
    });

    it('Should handle assign transforms', () => {
      let ctx = {};
      expect(RiTa.evaluate('[$stored=(a | a).toUpperCase()] dog is a mammal.', ctx)).eq('A dog is a mammal.');
    });

    it('Should handle transforms of any expr type', () => {

      let ctx = {};
      expect(RiTa.evaluate('$a=a\n($a).toUpperCase()', ctx, {trace:0})).eq('A');
      expect(RiTa.evaluate('$a=a\n($a | $a).toUpperCase()', ctx, {trace:0})).eq('A');
      expect(RiTa.evaluate('$a=a\n(A).toUpperCase()', ctx, {trace:0})).eq('A');
      expect(RiTa.evaluate('$a=(a).toUpperCase()', ctx, {trace:0})).eq('');
      expect(ctx.a).eq('A')
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
      expect(RiTa.evaluate('[$b=(a | a).toUpperCase()] dog is a $b.', {}, {trace:0})).eq('A dog is a A.');
    });

    it('Should reuse an assigned variable', () => {
      let ctx = {};
      let inp = 'Once there was a girl called [$hero=(Jane | Jane)].';
      inp += '\n$hero lived in [$home=(Neverland | Neverland)].';
      inp += '\n$hero liked living in $home.';
      let out = 'Once there was a girl called Jane. Jane lived in Neverland. Jane liked living in Neverland.';
      expect(RiTa.evaluate(inp, ctx)).eq(out);
    });

    it('Should assign a silent variable to a result', () => {
      let ctx = {};
      let result = RiTa.evaluate('[$stored=(a | b)]', ctx);
      expect(result).to.be.oneOf(['a', 'b']);
      expect(ctx.stored).to.be.oneOf(['a', 'b']);
      let result2 = RiTa.evaluate('[$a=$stored]', ctx);
      expect(result2).to.be.oneOf(['a', 'b']);
      expect(ctx.a).eq(ctx.stored);
    });

    it('Should assign a silent variable to code', () => {
      /*       expect(RiTa.evaluate('A [$stored=($animal | $animal)] is a mammal', { animal: 'dog' }, {trace:0})).eq('A dog is a mammal');
            expect(RiTa.evaluate('[$b=(a | a).toUpperCase()] dog is a $b.', 0, {trace:0})).eq('A dog is a A.'); */
      expect(RiTa.evaluate('[$b=(a | a)].toUpperCase() dog is a $b.toLowerCase().', 0, {trace:0})).eq('A dog is a a.');
      expect(RiTa.evaluate('[$b=(a | a)].toUpperCase() dog is a ($b).toLowerCase().', 0, {trace:0})).eq('A dog is a a.');
    });

    it('Should reuse silent assigned variables', () => {
      let ctx = {};
      let inp = 'Once there was a girl called [$hero=(Jane | Jane)].\n$hero lived in [$home=(Neverland | Neverland)].\n$hero liked living in $home.';
      let out = 'Once there was a girl called Jane. Jane lived in Neverland. Jane liked living in Neverland.';
      expect(RiTa.evaluate(inp, ctx)).eq(out);
    });
  });
  describe('Symbol', () => {

    /*     it('Should throw on bad symbols', () => {
          expect(() => RiTa.evaluate('$', 0, {silent:1})).to.throw();
        });
     */
    it('Should eval linebreak-defined variables', () => {
      let res;
      res = RiTa.evaluate('$foo=hello\n$start=I said $foo to her\n$start', {}, {trace:0});
      expect(res).eq('I said hello to her');
      res = RiTa.evaluate('$foo=(hello)\n$start=I said $foo to her\n$start', {}, {trace:0});
      expect(res).eq('I said hello to her');
    });

    it('Should resolve symbols in context', () => {

      expect(RiTa.evaluate('the $dog ate', { dog: 'terrier' }, {trace:0})).eq('the terrier ate');
      expect(RiTa.evaluate('the $dog $verb', { dog: 'terrier', verb: 'ate' }, {trace:0})).eq('the terrier ate');

      expect(RiTa.evaluate('$foo', {}, { silent: 1 })).eq('$foo'); // no-op
      expect(RiTa.evaluate('a $foo dog', {}, {silent:1})).eq('a $foo dog'); // no-op
      expect(RiTa.evaluate('$foo', { foo: 'bar' }, {trace:0})).eq('bar');
      expect(RiTa.evaluate('a $dog', { dog: 'terrier' })).eq('a terrier');
      expect(RiTa.evaluate('I ate the $dog', { dog: 'beagle' }, {trace:0})).eq('I ate the beagle');
      expect(RiTa.evaluate('The $dog today.', { dog: 'lab' }, {trace:0})).eq('The lab today.');
      expect(RiTa.evaluate('I ate the $dog.', { dog: 'lab' }, {trace:0})).eq('I ate the lab.');

      expect(RiTa.evaluate('$foo\n', {}, {silent:1})).eq('$foo'); // no-op
      expect(RiTa.evaluate('a $foo\ndog', {}, {silent:1})).eq('a $foo dog'); // no-op
      expect(RiTa.evaluate('$foo\n', { foo: 'bar' }, {trace:0})).eq('bar');
      expect(RiTa.evaluate('a $dog', { dog: 'terrier' })).eq('a terrier');
      expect(RiTa.evaluate('I ate\nthe $dog', { dog: 'beagle' }, {trace:0})).eq('I ate the beagle');
      expect(RiTa.evaluate('The $dog\ntoday.', { dog: 'lab' }, {trace:0})).eq('The lab today.');
      expect(RiTa.evaluate('I ate the\n$dog.', { dog: 'lab' }, {trace:0})).eq('I ate the lab.');

      expect(RiTa.evaluate('$100 is a lot of $dog.', { dog: 'terrier' }, {trace:0})).eq('$100 is a lot of terrier.');
      expect(RiTa.evaluate('the $dog cost $100', { dog: 'terrier' }, {trace:0})).eq('the terrier cost $100');
      expect(RiTa.evaluate('the $dog cost $100!', { dog: 'terrier' }, {trace:0})).eq('the terrier cost $100!');
      expect(RiTa.evaluate('the $dog cost ***lots***', { dog: 'terrier' }, {trace:0})).eq('the terrier cost ***lots***');
      expect(RiTa.evaluate('the $dog^1 was a footnote.', { dog: 'terrier' }, {trace:0})).eq('the terrier^1 was a footnote.');
    });

    it('Should resolve previously defined symbols', () => {

      expect(RiTa.evaluate('the $dog ate', { dog: 'terrier' }, {trace:0})).eq('the terrier ate');
      expect(RiTa.evaluate('the $dog $verb', { dog: 'terrier', verb: 'ate' }, {trace:0})).eq('the terrier ate');

      expect(RiTa.evaluate('$foo=bar\n$foo', {}, {trace:0})).eq('bar');
      expect(RiTa.evaluate('$dog=terrier\na $dog', {})).eq('a terrier');
      expect(RiTa.evaluate('$dog=beagle\nI ate the $dog', {}, {trace:0})).eq('I ate the beagle');
      expect(RiTa.evaluate('$dog=lab\nThe $dog today.', {}, {trace:0})).eq('The lab today.');
      expect(RiTa.evaluate('$dog=lab\nI ate the $dog.', {}, {trace:0})).eq('I ate the lab.');
      expect(RiTa.evaluate('$dog=lab\nThe $dog\ntoday.', {}, {trace:0})).eq('The lab today.');
      expect(RiTa.evaluate('$dog=lab\nI ate the\n$dog.', {}, {trace:0})).eq('I ate the lab.');

      expect(RiTa.evaluate('$foo=bar\n$foo', {}, {trace:0})).eq('bar');
      expect(RiTa.evaluate('$foo=baz\n$bar=$foo\n$bar', {}, {trace:0})).eq('baz');

      // TODO: symbols that resolve to other symbols (symbols in context are not resolved? use multeval)
      //expect(RiTa.evaluate('$bar', { foo: 'baz', bar: '$foo' }, 1)).eq('baz');
    });

    it('Should resolve symbols from context', () => {
      let ctx = { user: { name: 'jen' } }
      expect(RiTa.evaluate("Was $user.name.ucf() (ok | ok) today?", ctx)).eq('Was Jen ok today?');
      expect(RiTa.evaluate("$user.name was ok", ctx)).eq('jen was ok');
      expect(RiTa.evaluate("That was $user.name", ctx)).eq('That was jen');
      expect(RiTa.evaluate("Was that $user.name.ucf()?", ctx)).eq('Was that Jen?');
      expect(RiTa.evaluate("$user.name", ctx)).eq('jen');
      expect(RiTa.evaluate("$user.name", ctx)).eq('jen');
      expect(RiTa.evaluate("$user.name.toUpperCase()", ctx, {trace:0})).eq('JEN');
      expect(RiTa.evaluate("$user.name.uc()", ctx, {trace:0})).eq('JEN');
      expect(RiTa.evaluate("$user.name.ucf()", ctx, {trace:0})).eq('Jen');
      expect(RiTa.evaluate('Was the $dog.breed (ok | ok) today?', { dog: { breed: 'Corgie' } }, {trace:0})).eq('Was the Corgie ok today?');
    });

    it('Should evaluate symbol with a property transforms', () => {
      let ctx = { bar: { color: 'blue' } };
      let rs = RiTa.evaluate('$foo=$bar.color\n$foo', ctx, {trace:0});
      expect(rs).eq('blue');

      ctx = { bar: { color: 'blue' } };
      rs = RiTa.evaluate('$bar.color', ctx);
      expect(rs).eq('blue')
    });

    it('Should concatenate variables in parens', () => {
      let ctx = {};
      expect(RiTa.evaluate('$foo=(h | h)\n($foo)ello', ctx, {trace:0})).eq('hello');
      expect(ctx.foo).eq('h');
      expect(RiTa.evaluate('$foo b c', ctx, {trace:0})).eq('h b c');
      expect(RiTa.evaluate('($foo) b c', ctx, {trace:0})).eq('h b c');
      expect(RiTa.evaluate('($foo)bc', ctx, {trace:0})).eq('hbc');
      expect(ctx.foo).eq('h');
    });
  });

  describe('Choice', () => {

    it('Should throw on bad choices', () => {
      expect(() => RiTa.evaluate('|', 0, {silent:1})).to.throw();
      expect(() => RiTa.evaluate('a |', 0, {silent:1})).to.throw();
      expect(() => RiTa.evaluate('a | b', 0, {silent:1})).to.throw();
      expect(() => RiTa.evaluate('a | b | c', 0, {silent:1})).to.throw();
      expect(() => RiTa.evaluate('(a | b) | c', 0, {silent:1})).to.throw();
    });

    it('Should parse/select choices', () => {
      expect(RiTa.evaluate('(|)')).eq('');
      expect(RiTa.evaluate('(a)')).eq('a');
      expect(RiTa.evaluate('(a | a)', 0, {trace:0})).eq('a');
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

    it('Should parse/select weighted choices', () => {

      expect(RiTa.evaluate('( a [2] |a [3] )', {}, {trace:0})).eq('a');

      let result = { b: 0, a: 0 };
      for (let i = 0; i < 100; i++) {
        result[RiTa.evaluate('(a | b [2])')]++;
      } //console.log(result);
      expect(result.b).gt(result.a);

      expect(RiTa.evaluate('( a [2] )', {}, {trace:0})).eq('a');
      expect(RiTa.evaluate('([2] |[3])', {}, {trace:0})).eq('');

      expect(RiTa.evaluate('(a | b [2] |[3])', {}, {trace:0})).to.be.oneOf(['a', 'b', '']);
      expect(RiTa.evaluate('(a | b[2] |[3])', {}, {trace:0})).to.be.oneOf(['a', 'b', '']);
    });
  });


  describe('Transform', () => {
    it('Should throw on bad transforms', () => {
      expect(() => RiTa.evaluate('a.toUpperCase()', 0, {silent:1})).to.throw();
    });

    it('Should handle choice transforms', () => {

      let ctx = {};
      expect(RiTa.evaluate('$foo=().toUpperCase()', ctx, {trace:0})).eq('');
      expect(ctx.foo).eq('');

      expect(RiTa.evaluate('(a).toUpperCase()')).eq('A');
      expect(RiTa.evaluate('((a)).toUpperCase()', 0, {trace:0})).eq('A');
      expect(RiTa.evaluate('(a | b).toUpperCase()')).to.be.oneOf(['A', 'B']);
      expect(RiTa.evaluate("The (boy | boy).toUpperCase() ate.")).eq('The BOY ate.');
      expect(RiTa.evaluate('How many (tooth | tooth).pluralise() do you have?')).eq('How many teeth do you have?');
    });

    it('Should handle symbol transforms', () => {
      expect(RiTa.evaluate('$dog.toUpperCase()', { dog: 'spot' }, {trace:0})).eq('SPOT');
      expect(RiTa.evaluate('$dog.toUpperCase()', {}, {silent:1})).eq('$dog.toUpperCase()');
      expect(RiTa.evaluate('The $dog.toUpperCase()', { dog: 'spot' })).eq('The SPOT');
      expect(RiTa.evaluate("The (boy | boy).toUpperCase() ate.")).eq('The BOY ate.');
      expect(RiTa.evaluate("The (girl).toUpperCase() ate.")).eq('The GIRL ate.');
    });

    it('Should parse object properties', () => {
      let dog = { name: 'spot', color: 'white', hair: { color: 'white' } };
      expect(RiTa.evaluate("It was a $dog.hair.color dog.", { dog }, {trace:0})).eq('It was a white dog.');
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
      expect(String.quotify).eq(undefined);
      expect(String.articlise).eq(undefined);
      expect(RiTa.evaluate('How many (teeth).toUpperCase() do you have?', 0, {trace:0})).eq('How many TEETH do you have?');
      expect(RiTa.evaluate('How many (teeth).quotify() do you have?', 0, {trace:0})).eq('How many "teeth" do you have?');
      expect(RiTa.evaluate('That is (ant).articlise().')).eq('That is an ant.');
      expect(String.articlise).eq(undefined);
      expect(String.quotify).eq(undefined);
    });

    it('Should handle custom transforms', () => {
      expect(String.Blah).eq(undefined);
      RiTa.addTransform('Blah', () => 'Blah');
      expect(RiTa.evaluate('That is (ant).Blah().')).eq('That is Blah.');
      expect(String.Blah).eq(undefined);
    });
  });

  describe('Grammar', () => {

    it('Should evaluate post-defined symbols', () => {
      let rs = RiTa.evaluate('$foo=$bar\n$bar=baz\n$foo', {}, {trace:0});
      expect(rs).eq('baz');
    });

    it('Should evaluate symbols with a transform', () => {
      let rs = RiTa.evaluate('$foo=$bar.toUpperCase()\n$bar=baz\n$foo', {}, {trace:0});
      expect(rs).eq('BAZ');
    });

    it('Should evaluate symbols even with property transform', () => {
      let context = { bar: { ucf: 'result' } };
      let rs = RiTa.evaluate('$foo=$bar.ucf\n$foo', context, {trace:0});
      expect(rs).eq('result');
    });

    /*
    it('Should evaluate symbols even with a bad func transform', () => {
      let rs = RiTa.evaluate('$foo=$bar.ucf\n$bar=baz\n$foo', {}, {trace:0});
      expect(rs).eq('baz.ucf');
    });
    it('Should evaluate symbols even with one bad func transform', () => {
      let rs = RiTa.evaluate('$foo=$bar.toUpperCase().ucf\n$bar=baz\n$foo', {}, {trace:0});
      expect(rs).eq('BAZ.ucf');
    });*/

    it('Should evaluate post-defined symbols with transforms', () => {
      let rs = RiTa.evaluate('$foo=$bar.toLowerCase().ucf()\n$bar=baz\n$foo', {}, {trace:0});
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
      let rs = RiTa.evaluate(script, null, {trace:0});
      expect(rs).eq('the woman shoots the woman.');
    });

    it('Should eval previous assignments', () => {
      expect(RiTa.evaluate('$foo=dog\n$bar=$foo\n$baz=$foo\n$baz', null, {trace:0})).eq('dog');
      expect(RiTa.evaluate('$foo=hi\n$foo there', null, {trace:0})).eq('hi there');
      expect(RiTa.evaluate('$foo=a\n$foo', null, {trace:0})).eq('a');
    });

    it('Should eval pre-defined variables', () => {
      let script = [
        '$noun=(woman | woman)',
        '$start=$noun',
        '$start'
      ].join('\n');
      expect(RiTa.evaluate(script, null, {trace:0})).eq('woman');
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
      expect(RiTa.evaluate("The -;:.!?'`", {}, {trace:0})).eq("The -;:.!?'`");
      expect(RiTa.evaluate('The -;:.!?"`', {})).eq('The -;:.!?"`');
      expect(RiTa.evaluate(",.;:\\'?!-_`“”’‘…‐–—―^*", {}, {trace:0})).eq(",.;:\\'?!-_`“”’‘…‐–—―^*");
      expect(RiTa.evaluate(',.;:\\"?!-_`“”’‘…‐–—―^*', {}, {trace:0})).eq(',.;:\\"?!-_`“”’‘…‐–—―^*');
      expect(RiTa.evaluate("/&%©@*")).eq("/&%©@*");
    });

    it('Should allow spaces for formatting', () => {
      expect(RiTa.evaluate("&nbsp;The dog&nbsp;", {}, {trace:0})).eq(" The dog ");
      expect(RiTa.evaluate("&nbsp; The dog&nbsp;", {}, {trace:0})).eq("  The dog ");
      expect(RiTa.evaluate("The &nbsp;dog", {}, {trace:0})).eq("The  dog");
      expect(RiTa.evaluate("The&nbsp; dog", {}, {trace:0})).eq("The  dog");
      expect(RiTa.evaluate("The &nbsp; dog", {}, {trace:0})).eq("The   dog");
    });
  });

  describe('Operators', () => {
    it('Should invoke assignment operators', () => {

      expect(Operator.EQ.invoke("hello", "hello")).eq(true);
      expect(Operator.EQ.invoke("hello", "")).eq(false);
      expect(Operator.EQ.invoke("hello", null)).eq(false);

      expect(Operator.NE.invoke("hello", "hello")).eq(false);
      expect(Operator.NE.invoke("hello", "")).eq(true);
      expect(Operator.NE.invoke("hello", null)).eq(true);

      expect(Operator.EQ.invoke("true", "false")).eq(false);
      expect(Operator.EQ.invoke("false", "false")).eq(true);
      expect(Operator.EQ.invoke("false", null)).eq(false);

      expect(Operator.NE.invoke("hello", "")).eq(true);
      expect(Operator.NE.invoke("hello", "false")).eq(true);

      expect(() => Operator.NE.invoke(null, null)).to.throw();
    });

    it('Should invoke equality operators', () => {

      expect(Operator.EQ.invoke("hello", "hello")).eq(true);
      expect(Operator.EQ.invoke("hello", "")).eq(false);
      expect(Operator.EQ.invoke("hello", null)).eq(false);

      expect(Operator.NE.invoke("hello", "hello")).eq(false);
      expect(Operator.NE.invoke("hello", "")).eq(true);
      expect(Operator.NE.invoke("hello", null)).eq(true);

      expect(Operator.EQ.invoke("true", "false")).eq(false);
      expect(Operator.EQ.invoke("false", "false")).eq(true);
      expect(Operator.EQ.invoke("false", null)).eq(false);

      expect(Operator.NE.invoke("hello", "")).eq(true);
      expect(Operator.NE.invoke("hello", "false")).eq(true);

      expect(() => Operator.NE.invoke(null, null)).to.throw();
    });

    it('Should invoke comparison operators', () => {

      expect(Operator.GT.invoke("2", "1")).eq(true);
      expect(Operator.GT.invoke("1", "2")).eq(false);
      expect(Operator.GT.invoke("1", "1")).eq(false);
      expect(Operator.GT.invoke("2.0", "1")).eq(true);
      expect(Operator.GT.invoke("1.0", "2")).eq(false);
      expect(Operator.GT.invoke("1.0", "1")).eq(false);
      expect(Operator.GT.invoke("2.0", "1.00")).eq(true);
      expect(Operator.GT.invoke("1.0", "2.00")).eq(false);
      expect(Operator.GT.invoke("1.0", "1.00")).eq(false);

      expect(Operator.LT.invoke("2", "1")).eq(false);
      expect(Operator.LT.invoke("1", "2")).eq(true);
      expect(Operator.LT.invoke("1", "1")).eq(false);
      expect(Operator.LT.invoke("2.0", "1")).eq(false);
      expect(Operator.LT.invoke("1.0", "2")).eq(true);
      expect(Operator.LT.invoke("1.0", "1")).eq(false);
      expect(Operator.LT.invoke("2.0", "1.00")).eq(false);
      expect(Operator.LT.invoke("1.0", "2.00")).eq(true);
      expect(Operator.LT.invoke("1.0", "1.00")).eq(false);

      expect(Operator.LE.invoke("2", "1")).eq(false);
      expect(Operator.LE.invoke("1", "2")).eq(true);
      expect(Operator.LE.invoke("1", "1")).eq(true);
      expect(Operator.LE.invoke("2.0", "1")).eq(false);
      expect(Operator.LE.invoke("1.0", "2")).eq(true);
      expect(Operator.LE.invoke("1.0", "1")).eq(true);
      expect(Operator.LE.invoke("2.0", "1.00")).eq(false);
      expect(Operator.LE.invoke("1.0", "2.00")).eq(true);
      expect(Operator.LE.invoke("1.0", "1.00")).eq(true);

      expect(() => Operator.GT.invoke("2", "")).to.throw();
      expect(() => Operator.LT.invoke("2", null)).to.throw();
      expect(() => Operator.LE.invoke("2", "h")).to.throw();
      expect(() => Operator.GE.invoke("", "")).to.throw();
    });

    it('Should invoke matching operators', () => {

      expect(Operator.SW.invoke("Hello", "He")).eq(true);
      expect(Operator.SW.invoke("Hello", "Hello")).eq(true);
      expect(Operator.SW.invoke("Hello", "Hej")).eq(false);
      expect(Operator.SW.invoke("Hello", null)).eq(false);
      expect(Operator.SW.invoke("Hello", "")).eq(true);

      expect(Operator.EW.invoke("Hello", "o")).eq(true);
      expect(Operator.EW.invoke("Hello", "Hello")).eq(true);
      expect(Operator.EW.invoke("Hello", "l1o")).eq(false);
      expect(Operator.EW.invoke("Hello", null)).eq(false);
      expect(Operator.EW.invoke("Hello", "")).eq(true);

      expect(Operator.RE.invoke("Hello", "ll")).eq(true);
      expect(Operator.RE.invoke("Hello", "e")).eq(true);
      expect(Operator.RE.invoke("Hello", "l1")).eq(false);
      expect(Operator.RE.invoke("Hello", null)).eq(false);
      expect(Operator.RE.invoke("Hello", "")).eq(true);


      expect(Operator.SW.invoke("$Hello", "$")).eq(true);
      expect(Operator.EW.invoke("$Hello", "$")).eq(false);
      expect(Operator.RE.invoke("$Hello", "$")).eq(true);
      expect(Operator.RE.invoke("hello", "(hello|bye)")).eq(true);
      expect(Operator.RE.invoke("bye", "(hello|bye)")).eq(true);
      expect(Operator.RE.invoke("by", "(hello|bye)")).eq(false);

      expect(() => Operator.SW.invoke(null, "hello")).to.throw();
      expect(() => Operator.SW.invoke(null, null)).to.throw();
    });
  })
});
