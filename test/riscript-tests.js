const { expect } = require('chai');


describe('RiTa.RiScript', () => {

  const ST = { silent: 1 }, TT = { trace: 1 }, SP = { singlePass: 1 };

  if (typeof module !== 'undefined') require('./before');

  const RiScript = RiTa.RiScript;
  const Operator = RiTa.Operator;

  it('Should correctly call isParseable', () => {
    let rs = new RiScript();
    expect(!rs.isParseable('Hello')).ok;
    expect(rs.isParseable('(')).ok;
    expect(rs.isParseable('(A | B)')).ok;
    expect(rs.isParseable('$hello')).ok;
    expect(rs.isParseable('$b')).ok;
  });

  describe('Conditionals', () => {

    it('Should throw on bad conditionals', () => {
      //expect(() => RiTa.evaluate('{$a<hello} foo', { a: 2 })).to.throw();
      expect(() => RiTa.evaluate('{$a<} foo', { a: 2 }, ST)).to.throw();
    });

    it('Should handle conditionals', () => {
      expect(RiTa.evaluate('{$a<1} foo', { a: 2 })).eq('');
      expect(RiTa.evaluate('{$a>1} foo', { a: 2 })).eq('foo');
      expect(RiTa.evaluate('{$a=hello} foo', { a: 'hello' })).eq('foo');
      expect(RiTa.evaluate('{$a=goodbye} foo', { a: 'hello' })).eq('');
    });

    it('Should handle float conditionals', () => {
      expect(RiTa.evaluate('{$a<1.1} foo', { a: 2 })).eq('');
      expect(RiTa.evaluate('{$a>1.1} foo', { a: 2 })).eq('foo');
      expect(RiTa.evaluate('{$a<.1} foo', { a: 2 })).eq('');
      expect(RiTa.evaluate('{$a>.1} foo', { a: 2 })).eq('foo');
      expect(RiTa.evaluate('{$a<0.1} foo', { a: 2 })).eq('');
      expect(RiTa.evaluate('{$a>0.1} foo', { a: 2 })).eq('foo');
      expect(RiTa.evaluate('{$a>0.1} foo', { a: .1 })).eq('');
      expect(RiTa.evaluate('{$a>=0.1} foo', { a: .1 })).eq('foo');
    });

    it('Should handle multi-val conditionals', () => {
      expect(RiTa.evaluate('{$a<1,$b<1} foo', { a: 2 })).eq('');
      expect(RiTa.evaluate('{$a>1,$b<1} foo', { a: 2 })).eq('');
      expect(RiTa.evaluate('{$a>1,$b<1} foo', { a: 2, b: 2 })).eq('');
      expect(RiTa.evaluate('{$a=ok,$b>=1} foo', { a: 2, b: 2 })).eq('');
      expect(RiTa.evaluate('{$a>1,$b>=1} foo', { a: 2, b: 2 })).eq('foo');
    });

    it('Should handle matching conditionals', () => {
      expect(RiTa.evaluate('{$a!=ell} foo', { a: 'hello' })).eq('foo');
      expect(RiTa.evaluate('{$a*=ell} foo', { a: 'hello' })).eq('foo');
      expect(RiTa.evaluate('{$a^=ell} foo', { a: 'ello' })).eq('foo');
      expect(RiTa.evaluate('{$a$=ell} foo', { a: 'helloell' })).eq('foo');
      expect(RiTa.evaluate('{$a$=ell} foo', { a: 'helloellx' })).eq('');
    });

    it('Should rs-defined matching conditionals', () => {
      expect(RiTa.evaluate('$a=hello\n{$a!=ell} foo', {})).eq('foo');
      expect(RiTa.evaluate('$a=hello\n{$a*=ell} foo', {})).eq('foo');
      expect(RiTa.evaluate('$a=ello\n{$a^=ell} foo', {})).eq('foo');
      expect(RiTa.evaluate('$a=helloell\n{$a$=ell} foo', {})).eq('foo');
      expect(RiTa.evaluate('$a=helloellx\n{$a$=ell} foo', {})).eq('');
    });
  });

  describe('Evaluation', () => {
    it('Should eval simple expressions', () => {
      expect(RiTa.evaluate('foo', {})).eq('foo');
      expect(RiTa.evaluate('foo.', {})).eq('foo.');
      expect(RiTa.evaluate('"foo"', {})).eq('"foo"');
      expect(RiTa.evaluate("'foo'", {})).eq("'foo'");
      expect(RiTa.evaluate('foo\nbar', {})).eq('foo bar');
      expect(RiTa.evaluate('foo&#10;bar', {})).eq('foo\nbar');
      expect(RiTa.evaluate('$foo=bar \\nbaz\n$foo', {})).eq('bar baz'); ``
      expect(RiTa.evaluate('$foo=bar\nbaz', {})).eq('baz');
      expect(RiTa.evaluate('$foo=bar\nbaz\n$foo', {})).eq('baz bar');

      let ctx, expr;
      ctx = { a: 'a', b: 'b' };
      expr = '(a|a)';
      expect(RiTa.evaluate(expr, ctx)).eq('a');

      //expect(RiTa.evaluate('foo.bar', {}, {trace:0})).eq('foo.bar'); // KNOWN ISSUE
    });

    it('Should eval recursive expressions', () => {
      let ctx, expr;
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
  });

  describe('Assign', () => {

    it('Should parse assignments', () => {
      let ctx = {};
      expect(RiTa.evaluate('$foo=a', ctx)).eq('');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(RiTa.evaluate('$1foo=a', ctx)).eq('');
      //expect(ctx.1foo).eq('a');
      for (let k in ctx) {
        expect(ctx.k).eq('a');
      }

      ctx = {};
      //RiTa.evaluate('$foo=(a) b', ctx, {trace:0});
      expect(RiTa.evaluate('$foo=(a) b', ctx)).eq('');
      expect(ctx.foo).eq('a b');

      ctx = {};
      expect(RiTa.evaluate('$foo=a\nb', ctx)).eq('b');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(RiTa.evaluate('$foo=(a | a)', ctx)).eq('');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(RiTa.evaluate('$foo=ab', ctx)).eq('');
      expect(ctx.foo).eq('ab');

      ctx = {};
      expect(RiTa.evaluate('$foo=ab bc', ctx)).eq('');
      expect(ctx.foo).eq('ab bc');

      ctx = {};
      expect(RiTa.evaluate('$foo=(ab) (bc)', ctx)).eq('');
      expect(ctx.foo).eq('ab bc');

      ctx = {};
      expect(RiTa.evaluate('$foo=(ab bc)', ctx)).eq('');
      expect(ctx.foo).eq('ab bc');

      ctx = {};
      expect(RiTa.evaluate('$foo=(a | a) (b | b)', ctx)).eq('');
      expect(ctx.foo).eq('a b');

      ctx = {};
      expect(RiTa.evaluate('$foo=((a | a) | (a | a))', ctx)).eq('');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(RiTa.evaluate('$foo=()', ctx)).eq(''); // empty string
      expect(ctx.foo).eq('');

      ctx = {};
      expect(RiTa.evaluate('$foo=a\n$bar=$foo', ctx)).eq(''); // empty string
      expect(ctx.foo).eq('a');
      expect(ctx.bar).eq('a');

      expect(RiTa.evaluate('$foo=a\n$bar=$foo.', ctx, { trace: 0 })).eq(''); // empty string
      expect(ctx.foo).eq('a');
      expect(ctx.bar).eq('a.');

      expect(RiTa.evaluate('$foo=(a | a)', ctx = {})).eq('');
      expect(ctx.foo).eq('a');

      expect(RiTa.evaluate('$foo=(a | a)\n$foo', ctx = {})).eq('a');
      expect(ctx.foo).eq('a');

      expect(RiTa.evaluate('$foo=(hi | hi)\n$foo there', ctx = {})).eq('hi there');
      expect(ctx.foo).eq('hi');

      expect(RiTa.evaluate('$foo=The boy walked his dog', ctx = {})).eq('');
      expect(ctx.foo).eq('The boy walked his dog');
    });

    it('Should handle sentences', () => {
      let res, ctx;

      /* // MOVE TO KNOWN ISSUES  
        ctx = {};  
       expect(RiTa.evaluate('$foo=.r', ctx, 1)).eq('');
       expect(ctx.foo).eq('.r');  */

      expect(RiTa.evaluate('.', null)).eq('.');

      ctx = {};
      expect(RiTa.evaluate('$foo=a', ctx)).eq('');
      expect(ctx.foo).eq('a');

      ctx = {};
      expect(RiTa.evaluate('$foo=.', ctx)).eq('');
      expect(ctx.foo).eq('.');

      ctx = {};
      expect(RiTa.evaluate('$foo=r.', ctx)).eq('');
      expect(ctx.foo).eq('r.');

      ctx = {};
      expect(RiTa.evaluate('$foo=ran.', ctx)).eq('');
      expect(ctx.foo).eq('ran.');

      ctx = {};
      res = RiTa.evaluate('$start=dog\n$start', ctx);
      expect(ctx.start).eq('dog');
      expect(res).eq('dog');

      ctx = {};
      res = RiTa.evaluate('$start=.\n$start', ctx);
      expect(ctx.start).eq('.');
      expect(res).eq('.');

      ctx = {};
      res = RiTa.evaluate('$noun=I\n$start=$noun ran.\n$start', ctx);
      expect(ctx.noun).eq('I');
      expect(res).eq('I ran.');

      ctx = {};
      res = RiTa.evaluate('$noun=I\n$verb=sat\n$start=$noun $verb.\n$start', ctx);
      expect(ctx.noun).eq('I');
      expect(ctx.verb).eq('sat');
      expect(res).eq('I sat.');
    });

    it('Should parse transformed assignments', () => {

      let ctx;
      expect(RiTa.evaluate('$foo=(a).toUpperCase()', ctx = {})).eq('');
      expect(ctx.foo).eq('A');

      expect(RiTa.evaluate('$foo=(a | a).toUpperCase()', ctx = {})).eq('');
      expect(ctx.foo).eq('A');

      expect(RiTa.evaluate('$foo=(ab).toUpperCase()', ctx = {})).eq('');
      expect(ctx.foo).eq('AB');

      expect(RiTa.evaluate('$foo=(ab).toUpperCase() (bc).toUpperCase()', ctx = {})).eq('');
      expect(ctx.foo).eq('AB BC');

      expect(RiTa.evaluate('$foo=(ab bc).toUpperCase()', ctx = {})).eq('');
      expect(ctx.foo).eq('AB BC');

      expect(RiTa.evaluate('$foo=(a | a).toUpperCase() (b | b)', ctx = {})).eq('');
      expect(ctx.foo).eq('A b');

      expect(RiTa.evaluate('$foo=(a | a).toUpperCase() (b | b).toUpperCase()', ctx = {})).eq('');
      expect(ctx.foo).eq('A B');

      expect(RiTa.evaluate('$foo=((a | a) | (a | a))', ctx = {})).eq('');
      expect(ctx.foo).eq('a');

      expect(RiTa.evaluate('$foo=.toUpperCase()', ctx = {})).eq(''); // empty string
      expect(ctx.foo).eq('');
    });

    it('Should pluralize phrases', () => {
      expect(RiTa.evaluate('These (bad feeling).pluralize().')).eq('These bad feelings.');
      expect(RiTa.evaluate('She (pluralize).pluralize().')).eq('She pluralizes.');
    })

    it('Should correctly handle transforms on literals', () => {
      expect(RiTa.evaluate('How many (teeth).quotify() do you have?')).eq('How many "teeth" do you have?');
      expect(RiTa.evaluate('That is (ant).articlize().', 0)).eq('That is an ant.');
      expect(RiTa.evaluate('That is an (ant).capitalize().')).eq('That is an Ant.');
      expect(RiTa.evaluate('(ant).articlize().capitalize()', 0)).eq('An ant');
      expect(RiTa.evaluate('(ant).capitalize().articlize()', 0)).eq('an Ant');
    });

    it('Should correctly handle transforms on phrases', () => {
      expect(RiTa.evaluate('($adj tooth).articlize()', { adj: 'awful' })).eq('an awful tooth')
      expect(RiTa.evaluate('How many (bad teeth).quotify()?')).eq('How many "bad teeth"?');
      expect(RiTa.evaluate('(awful tooth).articlize()')).eq('an awful tooth');
      expect(RiTa.evaluate('$adj teeth', { adj: 'awful' })).eq('awful teeth');
      expect(RiTa.evaluate('an ($adj tooth)', { adj: 'awful' })).eq('an awful tooth');
    });

    it('Should handle differing assignment types', () => {
      expect(RiTa.evaluate('The $foo=blue (dog | dog)', ctx = {})).eq('The');
      expect(ctx.foo).eq('blue dog');

      expect(RiTa.evaluate('The [$foo=blue] (dog | dog)', ctx = {})).eq('The blue dog');
      expect(ctx.foo).eq('blue');

      expect(RiTa.evaluate('The [$foo=blue (dog | dog)]', ctx = {})).eq('The blue dog');
      expect(ctx.foo).eq('blue dog');
    });

    it('Should handle nested context', () => {
      let ctx1 = { color: 'blue' };
      let ctx = { bar: ctx1 };
      let res = RiTa.evaluate('$foo=$bar.color\n$foo', ctx);
      expect(res).eq('blue');
    });
  });

  describe('Inline', () => {

    it('Should evaluate inline assigns to vars', () => {
      let rs, ctx;

      rs = RiTa.evaluate('$person=(a | b | c)\n[$a=$person] is $a', context);
      expect(rs).to.be.oneOf(['a is a', 'b is b', 'c is c']);

      ctx = { name: '(Dave1 | Dave2)' };
      rs = RiTa.evaluate('$name=(Dave1 | Dave2)\n[$stored=$name] is $stored', ctx = {});

      rs = RiTa.evaluate('$name=(Dave1 | Dave2)\n[$stored=$name] is $stored', ctx = {});
      expect(ctx.stored).to.be.oneOf(['Dave1', 'Dave2']);
      expect(rs).to.be.oneOf(['Dave1 is Dave1', 'Dave2 is Dave2']);

      rs = RiTa.evaluate('[$stored=(Dave1 | Dave2)] is $stored', ctx = {});
      expect(ctx.stored).to.be.oneOf(['Dave1', 'Dave2']);
      expect(rs).to.be.oneOf(['Dave1 is Dave1', 'Dave2 is Dave2']);

      expect(ctx.stored).to.be.oneOf(['Dave1', 'Dave2']);
      expect(rs).to.be.oneOf(['Dave1 is Dave1', 'Dave2 is Dave2']);

      rs = RiTa.evaluate('$name=(Dave | Dave)\n[$stored=$name] is called $stored', {});
      expect(rs).eq("Dave is called Dave");
    });

    it('Should evaluate basic inline assigns', () => {
      let ctx;
      expect(RiTa.evaluate('[$foo=hi]', 0)).eq('hi');
      expect(RiTa.evaluate('[$foo=(hi | hi)] there')).eq('hi there');
      expect(RiTa.evaluate('[$foo=(hi | hi).ucf()] there')).eq('Hi there');

      expect(RiTa.evaluate('$foo=(hi | hi)\n$foo there', ctx = {}))
        .eq(RiTa.evaluate('[$foo=(hi | hi)] there'));

      let exp = 'A dog is a mammal';
      expect(RiTa.evaluate('$a=a\n($a).toUpperCase()', ctx = {})).eq('A');

      expect(RiTa.evaluate('[$stored=(a | a)] dog is a mammal', ctx)).eq(exp.toLowerCase());
      expect(ctx.stored).eq('a');

      expect(RiTa.evaluate('[$stored=(a | a).toUpperCase()] dog is a mammal', ctx)).eq(exp);
      expect(ctx.stored).eq('A');

      expect(RiTa.evaluate('[$stored=((a | a).toUpperCase())] dog is a mammal', ctx)).eq(exp);
      expect(ctx.stored).eq('A');

      expect(RiTa.evaluate('$stored=(a | a)\n$stored.toUpperCase() dog is a mammal', ctx)).eq(exp);
      expect(ctx.stored).eq('a');

      expect(RiTa.evaluate('$stored=(a | a)\n($stored).toUpperCase() dog is a mammal', ctx)).eq(exp);
      expect(ctx.stored).eq('a');

      expect(RiTa.evaluate('[$stored=(a | a)] dog is a mammal', ctx = {})).eq(exp.toLowerCase());
      expect(ctx.stored).eq('a');
    });

    it('Should handle assign transforms', () => {
      let ctx = {};
      expect(RiTa.evaluate('[$stored=(a | a).toUpperCase()] dog is a mammal.', ctx))
        .eq('A dog is a mammal.');
      expect(RiTa.evaluate('$stored=(a | a).toUpperCase()\n$stored dog is a mammal.', ctx))
        .eq('A dog is a mammal.');
    });

    it('Should handle transforms of any expr type', () => {

      let ctx = {};
      expect(RiTa.evaluate('$a=a\n($a).toUpperCase()', ctx)).eq('A');
      expect(RiTa.evaluate('$a=a\n($a | $a).toUpperCase()', ctx)).eq('A');
      expect(RiTa.evaluate('$a=a\n(A).toUpperCase()', ctx)).eq('A');
      expect(RiTa.evaluate('$a=(a).toUpperCase()', ctx)).eq('');
      expect(ctx.a).eq('A')
    });

    it('Should assign a variable to a result', () => {
      let context = {};
      let result = RiTa.evaluate('[$stored=(a | b)]', context);
      expect(result).to.be.oneOf(['a', 'b']);
      expect(context.stored).eq(result);
      let result2 = RiTa.evaluate('[$a=$stored]', context);
      //console.log('result2', result2, context.a);
      expect(context.a).eq(result2);
      expect(result2).eq(context.stored);
    });

    it('Should assign a silent variable to a result', () => {
      let ctx = {};
      let result = RiTa.evaluate('$stored=(a | b)', ctx);
      expect(result).eq('');
      result = ctx.stored;
      expect(ctx.stored).to.be.oneOf(['a', 'b']);
      let result2 = RiTa.evaluate('$a=$stored', ctx);
      expect(result2).eq('');
      expect(ctx.a).eq(ctx.stored);
      expect(ctx.a).eq(result);
    });

    it('Should assign a variable to code', () => {
      expect(RiTa.evaluate('A [$stored=($animal | $animal)] is a mammal', { animal: 'dog' })).eq('A dog is a mammal');
      expect(RiTa.evaluate('[$b=(a | a).toUpperCase()] dog is a $b.', {})).eq('A dog is a A.');
    });

    it('Should reuse an assigned variable', () => {
      let ctx = {};
      let inp = 'Once there was a girl called [$hero=(Jane | Jane)].';
      inp += '\n$hero lived in [$home=(Neverland | Neverland)].';
      inp += '\n$hero liked living in $home.';
      let out = 'Once there was a girl called Jane. Jane lived in Neverland. Jane liked living in Neverland.';
      expect(RiTa.evaluate(inp, ctx)).eq(out);
    });

    it('Should handle assign inline', () => {
      /*       expect(RiTa.evaluate('A [$stored=($animal | $animal)] is a mammal', { animal: 'dog' }, {trace:0})).eq('A dog is a mammal');
            expect(RiTa.evaluate('[$b=(a | a).toUpperCase()] dog is a $b.', 0, {trace:0})).eq('A dog is a A.'); */
      expect(RiTa.evaluate('[$b=(a | a)].toUpperCase() dog is a $b.toLowerCase().', 0)).eq('A dog is a a.');
      expect(RiTa.evaluate('[$b=(a | a)].toUpperCase() dog is a ($b).toLowerCase().', 0)).eq('A dog is a a.');
      let expected = ['a','b'];
      let ctx = {};
      let result = RiTa.evaluate('[$stored=(a | b)]', ctx);
      expect(expected).contains(result);
      expect(expected).contains(ctx.stored);
      let result2 = RiTa.evaluate('$a=$stored', ctx);
      expect(result2).eq('');
      expect(ctx.a).eq(ctx.stored);
      expect(ctx.a).eq(result);
    });

    it('Should reuse inline assignment', () => {
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
    it('Should throw for riscript in context symbol', () => { // TODO: is there a use-case here?
      expect(() => RiTa.evaluate('[$stored=$name] is called $stored',
        ctx = { name: '(Dave | Dave)' }, { trace: 1 })).to.throw();
    });     */

    it('Should eval linebreak-defined variables', () => {
      let res;
      res = RiTa.evaluate('a.\nb.', ctx = { b: 'c' });
      expect(res).eq('a. c.');
      res = RiTa.evaluate('$foo=hello\n$start=I said $foo to her\n$start', {});
      expect(res).eq('I said hello to her');
      res = RiTa.evaluate('$foo=(hello)\n$start=I said $foo to her\n$start', {});
      expect(res).eq('I said hello to her');
    });

    it('Should return input for undefined symbol', () => {
      expect(RiTa.evaluate('$a', {}, ST)).eq('$a');
      expect(RiTa.evaluate('$a.capitalize()', {}, ST)).eq('$a.capitalize()');
      expect(RiTa.evaluate('The $a.capitalize() dog.', {}, ST)).eq('The $a.capitalize() dog.');
    });

    it('Should resolve symbols in context', () => {

      expect(RiTa.evaluate('$a.capitalize()', { a: '(terrier | terrier)' })).eq('Terrier');
      //?
      expect(RiTa.evaluate('the $dog ate', { dog: 'terrier' })).eq('the terrier ate');
      expect(RiTa.evaluate('the $dog $verb', { dog: 'terrier', verb: 'ate' })).eq('the terrier ate');

      expect(RiTa.evaluate('$foo', {}, ST)).eq('$foo'); // no-op
      expect(RiTa.evaluate('a $foo dog', {}, ST)).eq('a $foo dog'); // no-op
      expect(RiTa.evaluate('$foo', { foo: 'bar' })).eq('bar');
      expect(RiTa.evaluate('a $dog', { dog: 'terrier' })).eq('a terrier');
      expect(RiTa.evaluate('I ate the $dog', { dog: 'beagle' })).eq('I ate the beagle');
      expect(RiTa.evaluate('The $dog today.', { dog: 'lab' })).eq('The lab today.');
      expect(RiTa.evaluate('I ate the $dog.', { dog: 'lab' })).eq('I ate the lab.');

      expect(RiTa.evaluate('$foo\n', {}, ST)).eq('$foo'); // no-op
      expect(RiTa.evaluate('a $foo\ndog', {}, ST)).eq('a $foo dog'); // no-op
      expect(RiTa.evaluate('$foo\n', { foo: 'bar' })).eq('bar');
      expect(RiTa.evaluate('a $dog', { dog: 'terrier' })).eq('a terrier');
      expect(RiTa.evaluate('I ate\nthe $dog', { dog: 'beagle' })).eq('I ate the beagle');
      expect(RiTa.evaluate('The $dog\ntoday.', { dog: 'lab' })).eq('The lab today.');
      expect(RiTa.evaluate('I ate the\n$dog.', { dog: 'lab' })).eq('I ate the lab.');

      expect(RiTa.evaluate('$100 is a lot of $dog.', { dog: 'terrier' })).eq('$100 is a lot of terrier.');
      expect(RiTa.evaluate('the $dog cost $100', { dog: 'terrier' })).eq('the terrier cost $100');
      expect(RiTa.evaluate('the $dog cost $100!', { dog: 'terrier' })).eq('the terrier cost $100!');
      expect(RiTa.evaluate('the $dog cost ***lots***', { dog: 'terrier' })).eq('the terrier cost ***lots***');
      expect(RiTa.evaluate('the $dog^1 was a footnote.', { dog: 'terrier' })).eq('the terrier^1 was a footnote.');
    });

    it('Should resolve previously defined symbols', () => {

      expect(RiTa.evaluate('the $dog ate', { dog: 'terrier' })).eq('the terrier ate');
      expect(RiTa.evaluate('the $dog $verb', { dog: 'terrier', verb: 'ate' })).eq('the terrier ate');

      expect(RiTa.evaluate('$foo=bar\n$foo', {})).eq('bar');
      expect(RiTa.evaluate('$dog=terrier\na $dog', {})).eq('a terrier');
      expect(RiTa.evaluate('$dog=beagle\nI ate the $dog', {})).eq('I ate the beagle');
      expect(RiTa.evaluate('$dog=lab\nThe $dog today.', {})).eq('The lab today.');
      expect(RiTa.evaluate('$dog=lab\nI ate the $dog.', {})).eq('I ate the lab.');
      expect(RiTa.evaluate('$dog=lab\nThe $dog\ntoday.', {})).eq('The lab today.');
      expect(RiTa.evaluate('$dog=lab\nI ate the\n$dog.', {})).eq('I ate the lab.');

      expect(RiTa.evaluate('$foo=bar\n$foo', {})).eq('bar');
      expect(RiTa.evaluate('$foo=baz\n$bar=$foo\n$bar', {})).eq('baz');

      // from known-issues
      expect(RiTa.evaluate('$bar', { foo: 'baz', bar: '$foo' }, 1)).eq('baz');
      expect(RiTa.evaluate('$bar', { foo: 'baz', bar: '(A | A)' }, 1)).eq('A');
      expect(RiTa.evaluate('$bar', { foo: 'baz', bar: '$foo starts with (b | b)' }, 1)).eq('baz starts with b');
      expect(RiTa.evaluate('$start=$foo\n$foo=hello\n$start')).eq('hello');
      expect(RiTa.evaluate('$start = $noun\n$noun = hello\n$start')).eq('hello');
    });

    it('Should resolve symbols from context', () => {
      let ctx = { user: { name: 'jen' } }
      expect(RiTa.evaluate("Was $user.name.ucf() (ok | ok) today?", ctx)).eq('Was Jen ok today?');
      expect(RiTa.evaluate("$user.name was ok", ctx)).eq('jen was ok');
      expect(RiTa.evaluate("That was $user.name", ctx)).eq('That was jen');
      expect(RiTa.evaluate("Was that $user.name.ucf()?", ctx)).eq('Was that Jen?');
      expect(RiTa.evaluate("$user.name", ctx)).eq('jen');
      expect(RiTa.evaluate("$user.name", ctx)).eq('jen');
      expect(RiTa.evaluate("$user.name.toUpperCase()", ctx)).eq('JEN');
      expect(RiTa.evaluate("$user.name.uc()", ctx)).eq('JEN');
      expect(RiTa.evaluate("$user.name.ucf()", ctx)).eq('Jen');
      expect(RiTa.evaluate('Was the $dog.breed (ok | ok) today?', { dog: { breed: 'Corgie' } })).eq('Was the Corgie ok today?');
    });

    it('Should evaluate symbol with a property transforms', () => {
      let ctx = { bar: { color: 'blue' } };
      let rs = RiTa.evaluate('$foo=$bar.color\n$foo', ctx);
      expect(rs).eq('blue');

      ctx = { bar: { color: 'blue' } };
      rs = RiTa.evaluate('$bar.color', ctx);
      expect(rs).eq('blue')
    });

    it('Should concatenate variables in parens', () => {
      let ctx = {};
      expect(RiTa.evaluate('$foo=(h | h)\n($foo)ello', ctx)).eq('hello');
      expect(ctx.foo).eq('h');
      expect(RiTa.evaluate('$foo b c', ctx)).eq('h b c');
      expect(RiTa.evaluate('($foo) b c', ctx)).eq('h b c');
      expect(RiTa.evaluate('($foo)bc', ctx)).eq('hbc');
      expect(ctx.foo).eq('h');
    });

    it('Should eval symbols starting with number', () => {
      let res;
      res = RiTa.evaluate('$foo=hello\n$start=I said $1foo to her\n$start', {});
      expect(res).eq('I said hello to her');
      res = RiTa.evaluate('$1foo=hello\n$1start=I said $1foo to her\n$1start', {});
      expect(res).eq('I said hello to her');
      res = RiTa.evaluate('$1foo=(hello)\n$1start=I said $1foo to her\n$1start', {});
      expect(res).eq('I said hello to her');
    });
  });

  describe('Choice', () => {

    it('Should throw on bad choices', () => {
      expect(() => RiTa.evaluate('|', 0, ST)).to.throw();
      expect(() => RiTa.evaluate('a |', 0, ST)).to.throw();
      expect(() => RiTa.evaluate('a | b', 0, ST)).to.throw();
      expect(() => RiTa.evaluate('a | b | c', 0, ST)).to.throw();
      expect(() => RiTa.evaluate('(a | b) | c', 0, ST)).to.throw();
    });

    it('Should handle multi-word choices', () => {
      let silent = RiTa.SILENCE_LTS;
      RiTa.SILENCE_LTS = true;
      expect(RiTa.evaluate('(A B | A B)')).eq('A B');
      expect(RiTa.evaluate('(A B).toLowerCase()')).eq('a b');
      expect(RiTa.evaluate('(A B | A B).toLowerCase()', 0)).eq('a b');
      expect(RiTa.evaluate('(A B | A B).articlize()', 0)).eq('an A B');
      RiTa.SILENCE_LTS = silent;
    });

    it('Should parse/select choices', () => {
      expect(RiTa.evaluate('(|)')).eq('');
      expect(RiTa.evaluate('(a)')).eq('a');
      expect(RiTa.evaluate('(a | a)', 0)).eq('a');
      expect(RiTa.evaluate('(a | )')).to.be.oneOf(['a', '']);
      expect(RiTa.evaluate('(a | b)')).to.be.oneOf(['a', 'b']);
      expect(RiTa.evaluate('(a | b | c)'), {}).to.be.oneOf(['a', 'b', 'c']);
      expect(RiTa.evaluate('(a | (b | c) | d)')).to.be.oneOf(['a', 'b', 'c', 'd']);
    });

    it('Should parse/select choices with TX', () => {
      expect(RiTa.evaluate('(a | a).toUpperCase()', {})).eq('A');
      expect(RiTa.evaluate('(a | a).up()', {})).eq('a.up()');
      let upf = (x) => x + '.toUpperCase()';
      expect(RiTa.evaluate('(a | a).up()', { up: upf})).eq('A');
      expect(RiTa.evaluate('$a', { a: 1 })).eq('1');
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

      expect(RiTa.evaluate('( a [2] |a [3] )', {})).eq('a');

      let result = { b: 0, a: 0 };
      for (let i = 0; i < 100; i++) {
        result[RiTa.evaluate('(a | b [2])')]++;
      } //console.log(result);
      expect(result.b).gt(result.a);

      expect(RiTa.evaluate('( a [2] )', {})).eq('a');
      expect(RiTa.evaluate('([2] |[3])', {})).eq('');

      expect(RiTa.evaluate('(a | b [2] |[3])', {})).to.be.oneOf(['a', 'b', '']);
      expect(RiTa.evaluate('(a | b[2] |[3])', {})).to.be.oneOf(['a', 'b', '']);
    });
  });

  describe('Transform', () => {

    it('Should handle add transforms', () => {

      let txs1 = RiTa.addTransform('capA', () => 'A');
      expect(RiTa.evaluate('.capA()', 0)).eq('A');
      expect(RiTa.evaluate('(b).capA()', 0)).eq('A');
      let txs2 = RiTa.addTransform('capA', null); // remove
      expect(txs1.length).eq(txs2.length);
    });

    it('Should use transforms in context', () => {
      let ctx = { 'capB': (s) => s || 'B' };
      expect(RiTa.evaluate('.capB()', ctx)).eq('B');
      expect(RiTa.evaluate('(c).capB()', ctx)).eq('c');
      expect(RiTa.evaluate('(c).toUpperCase()', ctx)).eq('C');
    });

    it('Should handle no-input transforms', () => {
      let ctx = { 'capA': () => 'A' };
      expect(RiTa.evaluate('.capA()', ctx)).eq('A');

      ctx = { 'capA': s => s.length > 0 ? s : 'B' };
      expect(RiTa.evaluate('.capA()', ctx)).eq('B');
      expect(RiTa.evaluate('().capA()', ctx)).eq('B');
      expect(RiTa.evaluate('(A).capA()', ctx)).eq('A');

      RiTa.addTransform('capA', () => 'A');
      expect(RiTa.evaluate('.capA()', {})).eq('A');
      RiTa.addTransform('capA');
    });

    it('Should handle RiTa function transforms', () => { // why???
      let rs = new RiScript();
      expect(rs.evaluate('Does $RiTa.env() equal node?')).eq("Does node equal node?");
      expect(rs.evaluate('Does $RiTa.env() equal node?')).eq("Does node equal node?");
    });

    it('Should handle seq() transforms', () => {
      let opts = ['a', 'b', 'c', 'd'];
      let rule = '(' + opts.join('|') + ').seq()';
      let rs = new RiScript();
      for (let i = 0; i < opts.length; i++) {
        let res = rs.evaluate(rule);
        //console.log('got', i, ':', res);
        expect(res).eq(opts[i]);
      }

      let rule2 = '(' + opts.join('|') + ').seq().capitalize()';
      for (let i = 0; i < opts.length; i++) {
        let res = rs.evaluate(rule2);
        //console.log(i, ':', res);
        expect(res).eq(opts[i].toUpperCase());
      }
    });

    it('Should handle rseq() transforms', () => {
      let opts = ['a', 'b', 'c', 'd'], result = [];
      let rule = '(' + opts.join('|') + ').rseq()';
      let rs = new RiScript();
      for (let i = 0; i < opts.length; i++) {
        let res = rs.evaluate(rule);
        //console.log(i, ':', res);
        result.push(res);
      }
      expect(result).to.have.members(opts);

      let rule2 = '(' + opts.join('|') + ').rseq().capitalize()';
      result = [];
      for (let i = 0; i < opts.length; i++) {
        let res = rs.evaluate(rule2);
        //console.log(i, ':', res);
        result.push(res);
      }
      expect(result).to.have.members(opts.map(o => o.toUpperCase()));

      let last;
      for (let i = 0; i < opts.length * 10; i++) {
        let res = rs.evaluate(rule2);
        //console.log(i, ':', res);
        expect(res).not.eq(last);
        last = res;
      }

    });

    it('Should handle interleaved seq() transforms', () => {
      let opts = ['a', 'b', 'c', 'd'];
      let rule = '(' + opts.join('|') + ').seq() (' + opts.join(' | ') + ').seq()';
      let rs = new RiScript();
      for (let i = 0; i < opts.length; i++) {
        let res = rs.evaluate(rule);
        //console.log(i, ':', res);
        expect(res).eq(opts[i] + " " + opts[i]);
      }
    });

    it('Should handle interleaved rseq() transforms', () => {
      let opts = ['a', 'b', 'c', 'd'];
      let rule = '(' + opts.join('|') + ').rseq() (' + opts.join(' | ') + ').rseq()';
      let rs = new RiScript();
      let res1 = [], res2 = [];
      for (let i = 0; i < opts.length; i++) {
        let res = rs.evaluate(rule);
        let parts = res.split(' ');
        //console.log(i, ':', res);
        res1.push(parts[0])
        res2.push(parts[1]);
      }
      expect(res1).to.have.members(opts);
      expect(res2).to.have.members(opts);
    });

    it('Should handle norep() transforms', () => {
      let opts = ['a', 'b', 'c', 'd'];
      let rule = '(' + opts.join('|') + ').norep()';
      let rs = new RiScript();
      let last;
      for (let i = 0; i < 10; i++) {
        let res = rs.evaluate(rule);
        //console.log('got', i, ':', res);
        expect(res != last).is.true;
        last = res;
      }
    });

    0 && it('TEMP', () => {
      RiTa.evaluate("$a=(a|a)\n$a.toUpperCase()",
        { a: "$b", b: "hello" }, { "singlePass": false, "trace": true });
    })

    it('Should handle Choice transforms', () => {

      let ctx = {};
      expect(RiTa.evaluate('$foo=.toUpperCase()', ctx)).eq('');
      expect(ctx.foo).eq('');
      expect(RiTa.evaluate('(a).toUpperCase()')).eq('A');
      expect(RiTa.evaluate('((a)).toUpperCase()', 0)).eq('A');
      expect(RiTa.evaluate('(a | b).toUpperCase()')).to.be.oneOf(['A', 'B']);
      expect(RiTa.evaluate('(a | a).capitalize()')).eq('A');
      expect(RiTa.evaluate("The (boy | boy).toUpperCase() ate.")).eq('The BOY ate.');
      expect(RiTa.evaluate('How many (tooth | tooth).pluralize() do you have?')).eq('How many teeth do you have?');
    });

    it('Should handle symbol transforms', () => {
      expect(RiTa.evaluate('$dog.toUpperCase()', { dog: 'spot' })).eq('SPOT');
      expect(RiTa.evaluate('$dog.capitalize()', { dog: 'spot' })).eq('Spot');
      expect(RiTa.evaluate('$1dog.capitalize()', { '1dog': 'spot' })).eq('Spot');
      expect(RiTa.evaluate('($dog).capitalize()', { dog: 'spot' })).eq('Spot');
      expect(RiTa.evaluate('$dog.toUpperCase()', {}, ST)).eq('$dog.toUpperCase()');
      expect(RiTa.evaluate('The $dog.toUpperCase()', { dog: 'spot' })).eq('The SPOT');
      expect(RiTa.evaluate("The (boy | boy).toUpperCase() ate.")).eq('The BOY ate.');
      expect(RiTa.evaluate("The (girl).toUpperCase() ate.")).eq('The GIRL ate.');
      expect(RiTa.evaluate('$dog.articlize().capitalize()', { dog: 'spot' })).eq('A spot');
      expect(RiTa.evaluate('[$a=$dog] $a.articlize().capitalize()', { dog: 'spot' })).eq('spot A spot');
      expect(RiTa.evaluate('[$a=$dog] $a.articlize().capitalize()', { dog: 'abe' })).eq('abe An abe');
      expect(RiTa.evaluate('(abe | abe).articlize().capitalize()', { dog: 'abe' })).eq('An abe');
      expect(RiTa.evaluate('(abe | abe).capitalize().articlize()', { dog: 'abe' })).eq('an Abe');
      expect(RiTa.evaluate('(Abe Lincoln).articlize().capitalize()', { dog: 'abe' })).eq('An Abe Lincoln');
      expect(RiTa.evaluate("<li>$start</li>\n$start=($jrSr).capitalize()\n$jrSr=(junior|junior)")).eq("<li>Junior</li>");
    });

    it('Should correctly call articlize', () => {
      expect(RiTa.articlize("dog")).eq('a dog');
      expect(RiTa.articlize("ant")).eq('an ant');
      expect(RiTa.articlize("honor")).eq('an honor');
      expect(RiTa.articlize("eagle")).eq('an eagle');
      expect(RiTa.articlize("ermintrout")).eq('an ermintrout');
    });

    it('Should correctly call articlize on phrases', () => {
      expect(RiTa.articlize('black dog')).eq('a black dog');
      expect(RiTa.articlize('black ant')).eq('a black ant');
      expect(RiTa.articlize('orange ant')).eq('an orangle ant');
    });

    it('Should parse object properties', () => {
      let dog = { name: 'spot', color: 'white', hair: { color: 'white' } };
      expect(RiTa.evaluate("It was a $dog.hair.color dog.", { dog })).eq('It was a white dog.');
      expect(RiTa.evaluate("It was a $dog.color.toUpperCase() dog.", { dog })).eq('It was a WHITE dog.');
      expect(RiTa.evaluate('$a.b', { a: { b: 1 } }, { singlePass: true })).eq('1');
    });

    it('Should handle member properly', () => {
      let dog = { name: 'Spot' };
      expect(RiTa.evaluate('$dog.name was a good dog.', dog)).eq('Spot was a good dog.');
    });

    it('Should call member function', () => {
      let dog = { name: 'Spot', getColor: () => 'red' };
      expect(RiTa.evaluate("$dog.name was a $dog.getColor() dog.",
        { dog })).eq('Spot was a red dog.');
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
      expect(String.articlize).eq(undefined);
      expect(RiTa.evaluate('How many (teeth).toUpperCase() do you have?', 0)).eq('How many TEETH do you have?');
      expect(RiTa.evaluate('How many (teeth).quotify() do you have?', 0)).eq('How many "teeth" do you have?');
      expect(RiTa.evaluate('That is (ant).articlize().')).eq('That is an ant.');
      expect(String.articlize).eq(undefined);
      expect(String.quotify).eq(undefined);
    });

    it('Should handle custom transforms', () => {
      /*       let Blah = () => 'Blah';
            expect(RiTa.evaluate('That is (ant).Blah().', { Blah })).eq('That is Blah.');
            let ctx = { Blah2: () => 'Blah2' };
            expect(RiTa.evaluate('That is (ant).Blah2().', ctx)).eq('That is Blah2.');
       */
      let Blah3 = () => 'Blah3';
      RiTa.addTransform("Blah3", Blah3);
      expect(RiTa.evaluate('That is (ant).Blah3().')).eq('That is Blah3.');
    });

    it('Should handle various transforms', () => {
      expect(RiTa.evaluate('(BAZ).toLowerCase().ucf()', ctx = {})).eq('Baz');
      expect(RiTa.evaluate('(a).toUpperCase()', ctx = {})).eq('A');
      expect(RiTa.evaluate('.toUpperCase()', ctx = {})).eq('');
      expect(RiTa.evaluate('$a=b\n$a.toUpperCase()', ctx = {})).eq('B');
      expect(RiTa.evaluate('[$b=((a | a)|a)].toUpperCase() dog.', ctx = {})).eq('A dog.');
      expect(RiTa.evaluate('((a)).toUpperCase()', ctx = {})).eq('A');
      expect(RiTa.evaluate('$a.toUpperCase()\n($a=b)', ctx = {})).eq('B');
      expect(RiTa.evaluate('$dog.ucf()', ctx = { dog: 'terrier' })).eq('Terrier');
    });
  });

  describe('Grammar', () => {

    it('Should evaluate post-defined symbols', () => {
      let rs = RiTa.evaluate('$foo=$bar\n$bar=baz\n$foo', {});
      expect(rs).eq('baz');
    });

    it('Should optimise via pre-parsing', () => {
      let ctx, input, rs;
      ctx = { nothing: 'NOTHING', hang: 'HANG' };
      input = "Eve near Vancouver, Washington is devastated that the SAT exam was postponed. Junior year means NOTHING if you can't HANG out. At least that's what she thought. Summer is going to suck.";
      rs = RiTa.evaluate(input, ctx, { skipPreParse: 0 });
      //console.log('OUTPUT: '+rs);
      expect(rs).eq(input.replace('$hang', 'HANG').replace('$nothing', 'NOTHING'));

      input = "Eve near Vancouver,\nWashington is devastated that the SAT exam was postponed. Junior year means NOTHING if you can't HANG out. At least that's what she thought. Summer is going to suck.";
      rs = RiTa.evaluate(input, ctx, { skipPreParse: 0 });
      expect(rs).eq(input.replace('$hang', 'HANG').replace('$nothing', 'NOTHING').replace('\n', ' '));

      input = "Eve&nbsp;near Vancouver";
      rs = RiTa.evaluate(input, ctx, { skipPreParse: 0 });
      expect(rs).eq("Eve near Vancouver");

      input = "This is not a &#124;.";
      rs = RiTa.evaluate(input, ctx, { skipPreParse: 0 });
      expect(rs).eq("This is not a |.");
    });

    it('Should evaluate symbols with a transform', () => {
      let rs = RiTa.evaluate('$foo=$bar.toUpperCase()\n$bar=baz\n$foo', {});
      expect(rs).eq('BAZ');

      let ctx = {};
      expect(RiTa.evaluate('$foo=.toUpperCase()', ctx, 0)).eq('');
      expect(ctx.foo).eq('');

      expect(RiTa.evaluate('$foo.capitalize()\n$foo=(a|a)')).eq('A');
      expect(RiTa.evaluate('$start=$r.capitalize()\n$r=(a|a)\n$start', {})).eq('A');
    });

    it('Should evaluate symbols even with property transform', () => {
      let context = { bar: { ucf: 'result' } };
      let rs = RiTa.evaluate('$foo=$bar.ucf\n$foo', context);
      expect(rs).eq('result');
    });


    it('Should do preparsing', () => {
      let context = { bar: { ucf: 'result' } };
      let rs = RiTa.evaluate('$foo=$bar.ucf\n$foo', context);
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
      expect(RiTa.evaluate('$foo=$bar.toLowerCase().ucf()\n$bar=baz\n$foo', {})).eq('Baz');
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
      let rs = RiTa.evaluate(script, null);
      expect(rs).eq('the woman shoots the woman.');
    });

    it('Should eval previous assignments', () => {
      expect(RiTa.evaluate('$foo=dog\n$bar=$foo\n$baz=$foo\n$baz', null)).eq('dog');
      expect(RiTa.evaluate('$foo=hi\n$foo there', null)).eq('hi there');
      expect(RiTa.evaluate('$foo=a\n$foo', null)).eq('a');
    });

    it('Should eval pre-defined variables', () => {
      let script = [
        '$noun=(woman | woman)',
        '$start=$noun',
        '$start'
      ].join('\n');
      expect(RiTa.evaluate(script, null)).eq('woman');
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
      expect(RiTa.evaluate("The -;:.!?'`", {})).eq("The -;:.!?'`");
      expect(RiTa.evaluate('The -;:.!?"`', {})).eq('The -;:.!?"`');
      expect(RiTa.evaluate(",.;:\\'?!-_`“”’‘…‐–—―^*", {})).eq(",.;:\\'?!-_`“”’‘…‐–—―^*");
      expect(RiTa.evaluate(',.;:\\"?!-_`“”’‘…‐–—―^*', {})).eq(',.;:\\"?!-_`“”’‘…‐–—―^*');
      expect(RiTa.evaluate("/&%©@*")).eq("/&%©@*");
    });

    it('Should allow spaces for formatting', () => {
      expect(RiTa.evaluate("&nbsp;The dog&nbsp;", {})).eq(" The dog ");
      expect(RiTa.evaluate("&nbsp; The dog&nbsp;", {})).eq("  The dog ");
      expect(RiTa.evaluate("The &nbsp;dog", {})).eq("The  dog");
      expect(RiTa.evaluate("The&nbsp; dog", {})).eq("The  dog");
      expect(RiTa.evaluate("The &nbsp; dog", {})).eq("The   dog");
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
