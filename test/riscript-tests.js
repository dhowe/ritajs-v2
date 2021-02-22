import { RiTa, expect } from './before';
//import Operator from "../src/operator"

describe('RiTa.RiScript', function () {

  const ST = { silent: 1 }, TP = { trace: 1 }, 
    TL = { traceLex: 1 }, TLP = { trace: 1, traceLex: 1 };
  const RiScript = RiTa.RiScript, SKIP_FOR_NOW = true;
  this.slow(100);

  describe('Sequences', () => {
    /*
    1. "$$names=(jane | dave | rick | chung)\n"
       "This story is about $names and $names.nr()"
    2. "$$names=(jane | dave | rick | chung).nr()\n"
       "This story is about $names and $names"
    3. "($$names=(jane | dave | rick | chung).nr()" 
       "This story is about $names and $names" [one-line]
    */
    let count = 5;
    it('Should support norepeat choice transforms', () => {
      let fail = false;
      for (let i = 0; i < count; i++) {
        let res = RiTa.evaluate("$$names=(a|b|c|d|e)\n$names $names.norepeat()", 0);
        expect(/^[a-e] [a-e]$/.test(res)).true;
        let parts = res.split(' ');
        expect(parts.length).eq(2);
        //console.log(i + ") " + parts[0] + " :: " + parts[1]);
        if (parts[0] === parts[1]) {
          fail = true;
          break;
        }
      }
      expect(fail).false;
    });


    it('Should support norepeat symbol transforms', () => {
      let fail = false;
      for (let i = 0; i < count; i++) {
        let res = RiTa.evaluate("$$rule=(a|b|c|d|e).norepeat()\n$rule $rule");
        expect(/^[a-e] [a-e]$/.test(res)).true;
        let parts = res.split(' ');
        expect(parts.length).eq(2);
        //console.log(i + ") " + parts[0] + " " + parts[1]);
        if (parts[0] === parts[1]) {
          fail = true;
          break;
        }
      }
      expect(fail).false;
    });

    it('Should support norepeat inline transforms', () => {
      let fail = false;
      for (let i = 0; i < count; i++) {
        let res = RiTa.evaluate("($$rule=(a|b|c|d|e).norepeat()) $rule");
        expect(/^[a-e] [a-e]$/.test(res)).true;
        let parts = res.split(' ');
        expect(parts.length).eq(2);
        //console.log(i + ") " + parts[0] + " " + parts[1]);
        if (parts[0] === parts[1]) {
          fail = true;
          break;
        }
      }
      expect(fail).false;
    });


    (!SKIP_FOR_NOW) && it('Should throw on norepeat statics', () => { // TODO: (problematic)
      console.log(RiTa.evaluate("$a=(a|b).nr()\n$a $a", 0)); // non-dynamic
      expect(() => RiTa.evaluate("$a=(a|b).nr()\n$a $a")).to.throw();
    });
  });

  describe('Evaluation', () => {

    it('Should parse MD-style links', () => {
      let res = RiTa.evaluate("[some text](https://somelink.com)", 0);
      expect(res).eq("[some text](https://somelink.com)");
    });

    it('Should resolve long expressions', function () {
      //let str = "Lorem ipsum dolor sit amet, (consectetur adipiscing elit) morbi ullamcorper porttitor lorem, in faucibus velit ultrices nec. Curabitur convallis luctus felis, sed posuere turpis mollis quis. Suspendisse euismod vel tellus sit amet tempus. Nullam pretium tincidunt pellentesque. Vestibulum tempus eget eros non dignissim. Nullam faucibus et augue a commodo. Curabitur tellus est, elementum sit amet finibus a, posuere in nunc. In libero metus, tempor nec tincidunt eu, vulputate a ex.Aliquam id tincidunt sapien. In pharetra condimentum lacus, non congue arcu tempor nec. Nullam faucibus odio id diam dapibus volutpat sed in quam. Vivamus ex quam, efficitur sit amet ante eu, congue blandit arcu. Suspendisse molestie sit amet diam ac tristique. Praesent sit amet placerat ligula. Aliquam erat volutpat. Curabitur magna ante, pulvinar ac luctus sit amet, ullamcorper eu justo. Cras fringilla nulla arcu, eu ultrices massa posuere ac. Suspendisse molestie, sapien sed placerat convallis, dolor metus blandit lacus, eu sagittis lacus turpis ac risus. Phasellus a justo nisi. Pellentesque auctor ex sit amet venenatis mollis. Nullam laoreet scelerisque porta. Morbi vehicula ullamcorper erat quis placerat. Quisque lobortis, nisi non elementum volutpat, erat orci dictum ante, sit amet bibendum erat sem vitae nunc. Nulla sodales erat vulputate lorem interdum, et tincidunt nulla cursus. Suspendisse id lectus iaculis arcu imperdiet molestie. Maecenas quam nisl, tempus sit amet ullamcorper quis, hendrerit nec quam. Sed non luctus nulla. Quisque luctus mollis quam ac ornare. Morbi ut est scelerisque, maximus nisl vitae, viverra risus. Nam euismod egestas placerat. Curabitur consequat tortor eget ante sodales laoreet ac id dolor. Nunc et tortor tellus. Mauris turpis diam, feugiat at lacus sit amet, tristique aliquet erat. Quisque volutpat accumsan dolor, egestas tempus arcu auctor sed. Sed iaculis nulla id velit pretium sodales. Quisque hendrerit, enim sit amet pharetra consequat, arcu augue ultricies quam, ornare porttitor turpis ex a felis. Curabitur fringilla vel enim pulvinar placerat. Donec interdum tellus turpis, nec varius mauris tempor non. Phasellus sodales magna nec imperdiet finibus. Fusce erat urna, rutrum non semper nec, accumsan ut nisl. Vivamus tincidunt accumsan congue. Integer consectetur laoreet tellus et blandit. Duis laoreet mi dignissim placerat convallis. Nulla et enim massa. Duis non mi ex. Aenean feugiat libero sed tincidunt tempor. Curabitur ullamcorper varius est ac accumsan. Sed congue iaculis lobortis. Vestibulum feugiat ipsum et felis pharetra, ut molestie massa consectetur. Aliquam viverra placerat cursus. Integer in augue blandit elit rhoncus eleifend in id augue. Duis sodales ultricies orci, sit amet mollis libero porttitor non. Vestibulum tellus leo, eleifend sit amet augue sed, tincidunt dapibus arcu. Quisque maximus nisi ut elit volutpat, rhoncus consectetur augue condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque at purus quis nisi faucibus rhoncus in quis diam. Ut maximus eros lorem, a semper diam consequat id. Integer in urna accumsan magna aliquet egestas. Curabitur tristique sodales nisl, commodo viverra sem ultricies at. Cras id ullamcorper est. Ut efficitur laoreet orci, faucibus iaculis dui aliquam sit amet. Nunc id libero at arcu mattis ornare. Duis et euismod.";
      let str = "Lorem ipsum dolor sit amet, (consectetur adipiscing elit) morbi ullamcorper porttitor lorem, in faucibus velit ultrices nec. Curabitur convallis luctus felis, sed posuere turpis mollis quis. Suspendisse euismod vel tellus sit amet tempus. Nullam pretium tincidunt pellentesque. Vestibulum tempus eget eros non dignissim. Nullam faucibus et augue a commodo. ";
      expect(RiTa.evaluate(str, 0)).eq(str.replace(/[)(]/g, "")); // longer
    });

    it('Should correctly call isParseable', () => {
      let rs = new RiScript();
      expect(rs.isParseable("(")).eq(true);
      expect(rs.isParseable("(A | B)")).eq(true);
      expect(rs.isParseable("$hello")).eq(true);
      expect(rs.isParseable("$b")).eq(true);
      expect(rs.isParseable("$$b")).eq(true);
      expect(rs.isParseable("($b)")).eq(true);
      expect(rs.isParseable("(&nbsp;)")).eq(true);

      expect(rs.isParseable("Hello")).eq(false);
      expect(rs.isParseable("&nbsp;")).eq(false);
      expect(rs.isParseable("&181;")).eq(false);
      expect(rs.isParseable("&b")).eq(false);
      expect(rs.isParseable("&&b")).eq(false);
    });

    it('Should resolve simple expressions', () => {

      expect(RiTa.evaluate('foo', {})).eq('foo');
      expect(RiTa.evaluate('foo!', {})).eq('foo!');
      expect(RiTa.evaluate('!foo', {})).eq('!foo');
      expect(RiTa.evaluate('foo.', {})).eq('foo.');
      expect(RiTa.evaluate('"foo"', {})).eq('"foo"');
      expect(RiTa.evaluate("'foo'", {})).eq("'foo'");
      expect(RiTa.evaluate('$foo=bar\nbaz', {})).eq('baz');
      expect(RiTa.evaluate('foo\nbar', {})).eq('foo\nbar');
      expect(RiTa.evaluate('$foo=bar\nbaz\n$foo', {})).eq('baz\nbar');
      expect(RiTa.evaluate('$foo=(a|b|c)\n$foo is $foo')).to.be.oneOf(['a is a', 'b is b', 'c is c']);;
      expect(RiTa.evaluate('<em>foo</em>', {})).eq('<em>foo</em>');
      expect(RiTa.evaluate('(a|a)', { a: 'a', b: 'b' })).eq('a');

      let str = "Now in one year\n     A book published\n          And plumbing —";
      expect(RiTa.evaluate(str)).eq(str); // needs profiling

      expect(RiTa.evaluate("a   b", 0)).eq("a   b");
      expect(RiTa.evaluate("a\tb", 0)).eq("a\tb");

      expect(RiTa.evaluate('foo.bar', {}, {silent:1})).eq('foo.bar'); // KNOWN ISSUE
    });



    it('Should resolve simple dynamics', () => {

      expect(RiTa.evaluate('$$foo=bar\nbaz', {})).eq('baz');
      expect(RiTa.evaluate('($$foo=bar)\nbaz', {})).eq('bar\nbaz');
      expect(RiTa.evaluate('$$foo=bar\nbaz$foo', {})).eq('bazbar');
      expect(RiTa.evaluate('$$foo=bar\n($foo)baz', {})).eq('barbaz');
      expect(RiTa.evaluate('$$foo=bar\n$foo baz $foo', {})).eq('bar baz bar');
      expect(RiTa.evaluate('$$foo=bar\nbaz\n$foo $foo', {})).eq('baz\nbar bar');

      let passed = false;
      for (let i = 0; i < 10; i++) { // $$: must not always match
        let res = RiTa.evaluate('$$foo=(a|b|c|d)\n$foo $foo $foo', {});
        //console.log(i+") "+res);
        let pts = res.split(' ');
        expect(pts.length).eq(3);
        if (pts[0] != pts[1] || pts[1] != pts[2] || pts[2] != pts[0]) {
          passed = true;
          break;
        }
      }
      expect(passed).eq(true);
    });

    it('Should resolve recursive expressions', () => {
      let ctx, expr;

      ctx = { a: 'a' };
      expr = '(a|$a)';
      expect(RiTa.evaluate(expr, ctx)).eq('a');
      ctx = { a: '$b', b: '(c | c)' };
      expr = '$a';
      expect(RiTa.evaluate(expr, ctx)).eq('c');

      ctx = { a: '$b', b: '(c | c)' };
      expr = '$k = $a\n$k';
      expect(RiTa.evaluate(expr, ctx)).eq('c');

      ctx = { a: '$b', b: '(c | c)' };
      expr = '$s = $a\n$a = $b\n$c = $d\n$d = c\n$s';
      expect(RiTa.evaluate(expr, ctx)).eq('c');

      ctx = { s: '$a', a: '$b', b: '$c', c: '$d', d: 'c' };
      expect(RiTa.evaluate('$s', ctx)).eq('c');
    });

    it('Should resolve recursive dynamics', () => {
      let ctx, expr;

      ctx = { a: '$b', b: '(c | c)' };
      expr = '$$k=$a\n$k';
      expect(RiTa.evaluate(expr, ctx)).eq('c');

      ctx = { a: '$b', b: '(c | c)' };
      expr = '$$s = $a\n$$a = $b\n$$c = $d\n$$d = c\n$s';
      expect(RiTa.evaluate(expr, ctx)).eq('c');
    });
  });

  describe('Assign', () => {

    it('Should parse assignments', () => {
      let ctx = {};
      expect(RiTa.evaluate('$foo=a', ctx)).eq('');
      expect(ctx.foo).eq('a');

      ctx = {};
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

    it('Should parse dynamic assignments', () => {
      let ctx = {};
      expect(RiTa.evaluate('$$foo=a', ctx)).eq('');
      expect(ctx['$$foo']).eq('a');

      ctx = {};
      //RiTa.evaluate('$$foo=(a) b', ctx, {trace:0});
      expect(RiTa.evaluate('$$foo=(a) b', ctx)).eq('');
      expect(ctx['$$foo']).eq('(a) b');

      ctx = {};
      expect(RiTa.evaluate('$$foo=a\nb', ctx)).eq('b');
      expect(ctx['$$foo']).eq('a');

      ctx = {};
      expect(RiTa.evaluate('$$foo=(a | a)', ctx)).eq('');
      expect(ctx['$$foo']).eq('(a | a)');

      ctx = {};
      expect(RiTa.evaluate('$$foo=ab', ctx)).eq('');
      expect(ctx['$$foo']).eq('ab');

      ctx = {};
      expect(RiTa.evaluate('$$foo=ab bc', ctx)).eq('');
      expect(ctx['$$foo']).eq('ab bc');

      ctx = {};
      expect(RiTa.evaluate('$$foo=(ab) (bc)', ctx)).eq('');
      expect(ctx['$$foo']).eq('(ab) (bc)');

      ctx = {};
      expect(RiTa.evaluate('$$foo=(ab bc)', ctx)).eq('');
      expect(ctx['$$foo']).eq('(ab bc)');

      ctx = {};
      expect(RiTa.evaluate('$$foo=(a | a) (b | b)', ctx)).eq('');
      expect(ctx['$$foo']).eq('(a | a) (b | b)');

      ctx = {};
      expect(RiTa.evaluate('$$foo=((a | a) | (a | a))', ctx)).eq('');
      expect(ctx['$$foo']).eq('((a | a) | (a | a))');

      ctx = {};
      expect(RiTa.evaluate('$$foo=()', ctx)).eq(''); // empty string
      expect(ctx['$$foo']).eq('()');

      ctx = {};
      expect(RiTa.evaluate('$$foo=a\n$$bar=$foo', ctx)).eq(''); // empty string
      expect(ctx['$$foo']).eq('a');
      expect(ctx['$$bar']).eq('$foo');

      expect(RiTa.evaluate('$$foo=a\n$$bar=$foo.', ctx, { trace: 0 })).eq(''); // empty string
      expect(ctx['$$foo']).eq('a');
      expect(ctx['$$bar']).eq('$foo.');

      expect(RiTa.evaluate('$$foo=(a | a)', ctx = {})).eq('');
      expect(ctx['$$foo']).eq('(a | a)');

      expect(RiTa.evaluate('$$foo=(a | a)\n$foo', ctx = {})).eq('a');
      expect(ctx['$$foo']).eq('(a | a)');

      expect(RiTa.evaluate('$$foo=(hi | hi)\n$foo there', ctx = {})).eq('hi there');
      expect(ctx['$$foo']).eq('(hi | hi)');

      expect(RiTa.evaluate('$$foo=The boy walked his dog', ctx = {})).eq('');
      expect(ctx['$$foo']).eq('The boy walked his dog');
    });

    it('Should resolve sentences', () => {
      let res, ctx;

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

    it('Should resolve dynamic sentences', () => {
      let res, ctx;

      expect(RiTa.evaluate('.', null)).eq('.');

      ctx = {};
      expect(RiTa.evaluate('$$foo=a', ctx)).eq('');
      expect(ctx['$$foo']).eq('a');

      ctx = {};
      expect(RiTa.evaluate('$$foo=.', ctx)).eq('');
      expect(ctx['$$foo']).eq('.');

      ctx = {};
      expect(RiTa.evaluate('$$foo=r.', ctx)).eq('');
      expect(ctx['$$foo']).eq('r.');

      ctx = {};
      expect(RiTa.evaluate('$$foo=ran.', ctx)).eq('');
      expect(ctx['$$foo']).eq('ran.');

      ctx = {};
      res = RiTa.evaluate('$$start=dog\n$start', ctx);
      expect(ctx['$$start']).eq('dog');
      expect(res).eq('dog');

      ctx = {};
      res = RiTa.evaluate('$$start=.\n$start', ctx);
      expect(ctx['$$start']).eq('.');
      expect(res).eq('.');

      ctx = {};
      res = RiTa.evaluate('$$noun=I\n$$start=$noun ran.\n$start', ctx);
      expect(ctx['$$noun']).eq('I');
      expect(res).eq('I ran.');

      ctx = {};
      res = RiTa.evaluate('$$noun=I\n$$verb=sat\n$$start=$noun $verb.\n$start', ctx);
      expect(ctx['$$noun']).eq('I');
      expect(ctx['$$verb']).eq('sat');
      expect(res).eq('I sat.');

      let inp = "$$mammal=(dog | dog | dog)\nMost $mammal.pluralize() are unruly.";
      expect(RiTa.evaluate(inp)).eq("Most dogs are unruly.");

      inp = "$$mammal=(dog | dog | dog)\nMost $mammal.pluralize are unruly.";
      expect(RiTa.evaluate(inp)).eq("Most dogs are unruly."); // no parens

      inp = "$$mammal=(dog | dog | dog)\nMost $mammal.s are unruly.";
      expect(RiTa.evaluate(inp)).eq("Most dogs are unruly."); // no parens
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
    });

    it('Should pluralize phrases', () => {
      expect(RiTa.evaluate('These (bad feeling).pluralize().')).eq('These bad feelings.');
      expect(RiTa.evaluate('She (pluralize).pluralize().')).eq('She pluralizes.');
      expect(RiTa.evaluate('These ($state feeling).pluralize().', { state: 'bad' })).eq('These bad feelings.');
      expect(RiTa.evaluate('$state=(bad | bad)\nThese ($state feeling).pluralize().', {})).eq('These bad feelings.');

      expect(RiTa.evaluate('$$state=(bad | bad)\nThese ($state feeling).pluralize().', {})).eq('These bad feelings.');

      expect(RiTa.evaluate('These ($state feeling).pluralize().', { state: '(bad | bad)' })).eq('These bad feelings.');

      expect(RiTa.evaluate('These (off-site).pluralize().', { state: '(bad | bad)' })).eq('These off-sites.');
    })

    it('Should resolve transforms on literals', () => {
      expect(RiTa.evaluate('How many (teeth).quotify() do you have?')).eq('How many “teeth” do you have?');
      expect(RiTa.evaluate('That is (ant).articlize().', 0)).eq('That is an ant.');
      expect(RiTa.evaluate('That is ().articlize().', 0)).eq('That is .');
      expect(RiTa.evaluate('That is an (ant).capitalize().')).eq('That is an Ant.');
      expect(RiTa.evaluate('(ant).articlize().capitalize()', 0)).eq('An ant');
      expect(RiTa.evaluate('(ant).capitalize().articlize()', 0)).eq('an Ant');
      expect(RiTa.evaluate('(deeply-nested expression).art()')).eq('a deeply-nested expression');
      expect(RiTa.evaluate('(deeply-nested $art).art()', { art: 'emotion' })).eq('a deeply-nested emotion');
    });

    it('Should resolve transforms on phrases', () => {
      expect(RiTa.evaluate('($adj tooth).articlize()', { adj: 'awful' })).eq('an awful tooth')
      expect(RiTa.evaluate('How many (bad teeth).quotify()?')).eq('How many “bad teeth”?');
      expect(RiTa.evaluate('(awful tooth).articlize()')).eq('an awful tooth');
      expect(RiTa.evaluate('$adj teeth', { adj: 'awful' })).eq('awful teeth');
      expect(RiTa.evaluate('an ($adj tooth)', { adj: 'awful' })).eq('an awful tooth');

      expect(RiTa.evaluate("($a dog).pluralize()\n$a=the", null)).eq("the dogs");
    });

    it('Should resolve across assignment types', () => {
      let ctx; // see issue:rita#59
      expect(RiTa.evaluate('The $foo=blue (dog | dog)', ctx = {})).eq('The blue dog');
      expect(ctx.foo).eq('blue dog');

      expect(RiTa.evaluate('The ($foo=blue) (dog | dog)', ctx = {})).eq('The blue dog');
      expect(ctx.foo).eq('blue');

      expect(RiTa.evaluate('The ($foo=blue (dog | dog))', ctx = {})).eq('The blue dog');
      expect(ctx.foo).eq('blue dog');

      expect(RiTa.evaluate('$foo=blue (dog | dog)', ctx = {})).eq('');
      expect(ctx.foo).eq('blue dog');

      expect(RiTa.evaluate('The\n$foo=blue (dog | dog)', ctx = {})).eq('The');
      expect(ctx.foo).eq('blue dog');
    });

    it('Should resolve dynamics across assignment types', () => {
      let ctx;
      expect(RiTa.evaluate('The $$foo=blue (dog | dog)', ctx = {})).eq('The blue dog');
      expect(ctx['$$foo']).eq('blue (dog | dog)');

      expect(RiTa.evaluate('The ($$foo=blue) (dog | dog)', ctx = {})).eq('The blue dog');
      expect(ctx['$$foo']).eq('blue');

      expect(RiTa.evaluate('The ($$foo=blue (dog | dog))', ctx = {})).eq('The blue dog');
      expect(ctx['$$foo']).eq('blue (dog | dog)');

      expect(RiTa.evaluate('$$foo=blue (dog | dog)', ctx = {})).eq('');
      expect(ctx['$$foo']).eq('blue (dog | dog)');

      expect(RiTa.evaluate('The\n$$foo=blue (dog | dog)', ctx = {})).eq('The');
      expect(ctx['$$foo']).eq('blue (dog | dog)');
    });

    it('Should handle nested context', () => {
      let ctx = { bar: { color: "blue" } };
      let res = RiTa.evaluate("$$foo=$bar.color\n$foo", ctx);
      expect(res).eq("blue");

      res = RiTa.evaluate("$$foo=$bar.color\n$foo", ctx); // dyn
      expect(res).eq("blue");
    });
  });

  describe('Inline', () => {

    it('Should resolve inline symbols', () => {
      let rs, ctx;

      rs = RiTa.evaluate('$person=(a | b | c)\n($a=$person) is $a', ctx = {});
      expect(rs).to.be.oneOf(['a is a', 'b is b', 'c is c']);

      ctx = { name: '(Dave1 | Dave2)' };
      rs = RiTa.evaluate('$name=(Dave1 | Dave2)\n($stored=$name) is $stored', ctx = {});

      rs = RiTa.evaluate('$name=(Dave1 | Dave2)\n($stored=$name) is $stored', ctx = {});
      expect(ctx.stored).to.be.oneOf(['Dave1', 'Dave2']);
      expect(rs).to.be.oneOf(['Dave1 is Dave1', 'Dave2 is Dave2']);

      rs = RiTa.evaluate('$name=(Dave | Dave)\n($stored=$name) is called $stored', ctx = {});
      expect(rs).eq("Dave is called Dave");
    });

    it('Should handle inline dynamics', () => {

      let rs, ctx, matches, count = 10;
      const matching = ['Dave is called Dave.', 'Jack is called Jack.', 'Mary is called Mary.'];

      // $$: need at least one to not match
      matches = 0;
      for (let i = 0; i < count; i++) { // $$: should not always match
        rs = RiTa.evaluate('($$name=(Dave | Jack | Mary)) is called $name.', ctx = {});
        expect(ctx['$$name']).eq('(Dave | Jack | Mary)');
        expect(/^(Dave|Jack|Mary) is called (Dave|Jack|Mary)\.$/.test(rs)).eq(true);
        if (!matching.includes(rs)) break;
        matches++;
      }
      expect(matches < count).eq(true);

      // $$: need at least one to not match
      matches = 0;
      for (let i = 0; i < count; i++) { // $$: should not always match
        rs = RiTa.evaluate('($$name=(dave | jack | mary).ucf()) is called $name.', ctx = {});
        //console.log(i+") "+rs);
        expect(ctx['$$name']).eq('(dave | jack | mary).ucf()');
        expect(/^(Dave|Jack|Mary) is called (Dave|Jack|Mary)\.$/.test(rs)).eq(true);
        if (!matching.includes(rs)) break;
        matches++;
      }
      expect(matches < count).eq(true);

      // $$: need at least one to not match
      matches = 0;
      for (let i = 0; i < count; i++) { // $$: should not always match
        rs = RiTa.evaluate('($$name=(dave | jack | mary)).ucf() is called $name.', ctx = {});
        expect(ctx['$$name']).eq('(dave | jack | mary)');
        expect(/^(Dave|Jack|Mary) is called (dave|jack|mary)\./.test(rs)).eq(true);
        if (!matching.includes(rs)) break;
        matches++;
      }
      expect(matches < count).eq(true);
    });

    it('Should handle inline non-dynamics', () => {

      let rs, ctx;
      const names = ['Dave', 'Jack', 'Mary'];
      const matching = ['Dave is called Dave.', 'Jack is called Jack.', 'Mary is called Mary.'];

      // $: must match
      rs = RiTa.evaluate('($name=(Dave | Jack | Mary)) is called $name.', ctx = {});
      expect(ctx.name).to.be.oneOf(names);
      expect(rs).to.be.oneOf(matching);

      // $: must match
      rs = RiTa.evaluate('($name=(dave | jack | mary).ucf()) is called $name.', ctx = {});
      expect(ctx.name).to.be.oneOf(names);
      expect(rs).to.be.oneOf(matching);

      // $: must match
      rs = RiTa.evaluate('($name=(dave | jack | mary)).ucf() is called $name.', ctx = {});
      expect(ctx.name).to.be.oneOf(names.map(n => n.toLowerCase()));
      expect(rs).to.be.oneOf(['Dave is called dave.', 'Jack is called jack.', 'Mary is called mary.']);
    });

    it('Should handle dynamics in context', () => {
      const matching = ['Dave is called Dave.', 'Jack is called Jack.', 'Mary is called Mary.'];

      // $: need all to match
      expect(RiTa.evaluate('A ($stored=($animal | $animal)) is a mammal', { animal: 'dog' })).eq('A dog is a mammal');

      // $$: need at least one to not match
      let matches = 0, count = 10, ctx = {};
      ctx['$$name'] = '(Dave | Jack | Mary)'; // dynamic in context
      for (let i = 0; i < count; i++) {
        let rs = RiTa.evaluate('$name is called $name.', ctx);
        expect(ctx['$$name']).eq('(Dave | Jack | Mary)');
        expect(/^(Dave|Jack|Mary) is called (Dave|Jack|Mary)\./.test(rs)).eq(true, "Got: " + rs);
        if (!matching.includes(rs)) break;
        matches++;
      }
      expect(matches < count).eq(true);
    });

    it('Should resolve inline assigns', () => {
      let ctx;
      expect(RiTa.evaluate('($foo=hi)', 0)).eq('hi');
      expect(RiTa.evaluate('($foo=(hi | hi)) there')).eq('hi there');
      expect(RiTa.evaluate('($foo=(hi | hi).ucf()) there')).eq('Hi there');

      expect(RiTa.evaluate('$foo=(hi | hi)\n$foo there', ctx = {}))
        .eq(RiTa.evaluate('($foo=(hi | hi)) there'));

      let exp = 'A dog is a mammal';
      expect(RiTa.evaluate('$a=a\n($a).toUpperCase()', ctx = {})).eq('A');

      expect(RiTa.evaluate('($stored=(a | a)) dog is a mammal', ctx = {})).eq(exp.toLowerCase());
      expect(ctx.stored).eq('a');

      expect(RiTa.evaluate('($stored=(a | a).toUpperCase()) dog is a mammal', ctx = {})).eq(exp);
      expect(ctx.stored).eq('A');

      expect(RiTa.evaluate('($stored=((a | a).toUpperCase())) dog is a mammal', ctx = {})).eq(exp);
      expect(ctx.stored).eq('A');

      expect(RiTa.evaluate('$stored=(a | a)\n$stored.toUpperCase() dog is a mammal', ctx = {})).eq(exp);
      expect(ctx.stored).eq('a');

      expect(RiTa.evaluate('$stored=(a | a)\n($stored).toUpperCase() dog is a mammal', ctx = {})).eq(exp);
      expect(ctx.stored).eq('a');

      expect(RiTa.evaluate('($stored=(a | a)) dog is a mammal', ctx = {})).eq(exp.toLowerCase());
      expect(ctx.stored).eq('a');

      expect(RiTa.evaluate('($a=a).toUpperCase()', ctx = {})).eq('A');
      expect(ctx.a).eq('a')
    });

    it('Should distinguish inline with parens', () => {
      let ctx;
      expect(RiTa.evaluate('$a=a', ctx = {})).eq('');
      expect(ctx.a).eq('a');

      expect(RiTa.evaluate('($a=a)', ctx = {})).eq('a');
      expect(ctx.a).eq('a');

      expect(RiTa.evaluate('hello($a=a)', ctx = {})).eq('helloa');
      expect(ctx.a).eq('a');

      expect(RiTa.evaluate('hello\n$a=a', ctx = {})).eq('hello');
      expect(ctx.a).eq('a');

      expect(RiTa.evaluate('hello \n($a=A)', ctx = {})).eq('hello \nA');
      expect(ctx.a).eq('A');

      expect(RiTa.evaluate('x($a=a)', ctx = {})).eq('xa');
      expect(ctx.a).eq('a');

      expect(RiTa.evaluate('($foo=hi)', ctx = {})).eq('hi');
      expect(ctx.foo).eq('hi');

      expect(RiTa.evaluate('($foo=(hi | hi)) there', ctx = {})).eq('hi there');
      expect(ctx.foo).eq('hi');

      expect(RiTa.evaluate('($foo=(hi | hi).ucf()) there', ctx = {})).eq('Hi there');
      expect(ctx.foo).eq('Hi');

      expect(RiTa.evaluate('($foo=(hi | hi)).ucf() there', ctx = {})).eq('Hi there');
      expect(ctx.foo).eq('hi');
    });

    it('Should resolve inline transforms', () => {
      let ctx = {};
      expect(RiTa.evaluate('($stored=(a | a).toUpperCase()) dog is a mammal.', ctx))
        .eq('A dog is a mammal.');
      expect(RiTa.evaluate('$stored=(a | a).toUpperCase()\n$stored dog is a mammal.', ctx))
        .eq('A dog is a mammal.');
    });

    it('Should resolve transforms across types', () => {
      let ctx = {};
      expect(RiTa.evaluate('$a=a\n($a).toUpperCase()', ctx)).eq('A');
      expect(RiTa.evaluate('$a=a\n($a | $a).toUpperCase()', ctx)).eq('A');
      expect(RiTa.evaluate('$a=a\n(A).toUpperCase()', ctx)).eq('A');
      expect(RiTa.evaluate('$a=(a).toUpperCase()', ctx)).eq('');
      expect(ctx.a).eq('A')
    });

    it('Should resolve inline variables', () => {
      let ctx = {};
      let result = RiTa.evaluate('($stored=(a | b))', ctx);
      expect(result).to.be.oneOf(['a', 'b']);
      expect(ctx.stored).eq(result);
      let result2 = RiTa.evaluate('($a=$stored)', ctx);
      //console.log('result2', result2, ctx.a);
      expect(ctx.a).eq(result2);
      expect(result2).eq(ctx.stored);

      ctx = {};
      result = RiTa.evaluate('$stored=(a | b)', ctx);
      expect(result).eq('');
      result = ctx.stored;
      expect(ctx.stored).to.be.oneOf(['a', 'b']);
      result2 = RiTa.evaluate('$a=$stored', ctx);
      expect(result2).eq('');
      expect(ctx.a).eq(ctx.stored);
      expect(ctx.a).eq(result);
    });

    (!SKIP_FOR_NOW) && it('KI: FAILING', () => { // TODO:
      for (let i = 0, rs; i < 10; i++) {
        rs = RiTa.evaluate('($chosen=$person) talks to $chosen.', { person: '(Dave | Jill | Pete)' });
        console.log(i, rs);
        expect(rs).to.be.oneOf(["Dave talks to Dave.", "Jill talks to Jill.", "Pete talks to Pete."]);
      }
    });

    it('Should resolve complex inlines', () => {
      expect(RiTa.evaluate('($b=(a | a).toUpperCase()) dog is a $b.', {})).eq('A dog is a A.');
      expect(RiTa.evaluate('($b=(a | a)).toUpperCase() dog is a $b.toLowerCase().', 0)).eq('A dog is a a.');
      expect(RiTa.evaluate('($b=(a | a)).toUpperCase() dog is a ($b).toLowerCase().', 0)).eq('A dog is a a.');

      let rs = RiTa.evaluate('($person=(Dave | Jill | Pete)) talks to $person.', {});
      expect(rs).to.be.oneOf(["Dave talks to Dave.", "Jill talks to Jill.", "Pete talks to Pete."]);
    });

    it('Should reuse assigned variables', () => {
      let ctx = {};
      let inp = 'Once there was a girl called ($hero=(Jane | Jane)).';
      inp += '\n$hero lived in ($home=(Neverland | Neverland)).';
      inp += '\n$hero liked living in $home.';
      let out = 'Once there was a girl called Jane.\nJane lived in Neverland.\nJane liked living in Neverland.';
      expect(RiTa.evaluate(inp, ctx)).eq(out);
    });
  });


  describe('Symbol', () => {

    it('Should resolve linebreak defined variables', () => {
      let inp = "a.\n$b.";
      let out = RiTa.evaluate(inp, { b: "c" });
      expect(out).eq("a.\nc.");
      let res;
      res = RiTa.evaluate('$foo=hello\n$start=I said $foo to her\n$start', {});
      expect(res).eq('I said hello to her');
      res = RiTa.evaluate('$foo=(hello)\n$start=I said $foo to her\n$start', {});
      expect(res).eq('I said hello to her');
    });

    it('Should output the input for undefined symbol', () => {
      expect(RiTa.evaluate('$a', {}, ST)).eq('$a');
      expect(RiTa.evaluate('$a.capitalize()', {}, ST)).eq('$a.capitalize()');
      expect(RiTa.evaluate('The $a.capitalize() dog.', {}, ST)).eq('The $a.capitalize() dog.');
    });

    it('Should ignore no-op symbols in context', () => {
      expect(RiTa.evaluate('a $foo dog', {}, ST)).eq('a $foo dog');
      expect(RiTa.evaluate('$100 is a lot of $dog.', { dog: 'terrier' }, ST)).eq('$100 is a lot of terrier.');
      expect(RiTa.evaluate('the $dog cost $100!', { dog: 'terrier' }, ST)).eq('the terrier cost $100!');
      expect(RiTa.evaluate('the $dog^1 was a footnote.', { dog: 'terrier' })).eq('the terrier^1 was a footnote.');
    })

    it('Should repeat choices with randomSeed', () => {
      let seed = Math.random() * Number.MAX_SAFE_INTEGER;
      let script = "$a=(1|2|3|4|5|6)\n$a";
      RiTa.randomSeed(seed);
      let b, a = RiTa.evaluate(script);
      for (let i = 0; i < 10; i++) {
        RiTa.randomSeed(seed);
        b = RiTa.evaluate("$a=(1|2|3|4|5|6)\n$a");
        //console.log(i+') '+a,b);
        expect(a).eq(b);
        a = b;
      }
    });

    it('Should resolve symbols in context', () => { //:

      expect(RiTa.evaluate("$a", { a: 1 })).eq("1");

      expect(RiTa.evaluate('$a.capitalize()', { a: '(terrier | terrier)' })).eq('Terrier');
      expect(RiTa.evaluate('the $dog ate', { dog: 'terrier' })).eq('the terrier ate');
      expect(RiTa.evaluate('the $dog $verb', { dog: 'terrier', verb: 'ate' })).eq('the terrier ate');

      expect(RiTa.evaluate('$foo', { foo: 'bar' })).eq('bar');
      expect(RiTa.evaluate('a $dog', { dog: 'terrier' })).eq('a terrier');
      expect(RiTa.evaluate('I ate the $dog', { dog: 'beagle' })).eq('I ate the beagle');
      expect(RiTa.evaluate('The $dog today.', { dog: 'lab' })).eq('The lab today.');
      expect(RiTa.evaluate('I ate the $dog.', { dog: 'lab' })).eq('I ate the lab.');

      expect(RiTa.evaluate('$foo\n', { foo: 'bar' })).eq('bar');
      expect(RiTa.evaluate('a $dog', { dog: 'terrier' })).eq('a terrier');
      expect(RiTa.evaluate('I ate\nthe $dog', { dog: 'beagle' })).eq('I ate\nthe beagle');
      expect(RiTa.evaluate('The $dog\ntoday.', { dog: 'lab' })).eq('The lab\ntoday.');
      expect(RiTa.evaluate('I ate the\n$dog.', { dog: 'lab' })).eq('I ate the\nlab.');

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

      expect(RiTa.evaluate('$person talks to $person.', { person: '(Dave | Jill | Pete)' }))
        .to.be.oneOf(["Dave talks to Dave.", "Jill talks to Jill.", "Pete talks to Pete."]); // $: must match
    });

    it('Should resolve prior symbols', () => {

      expect(RiTa.evaluate('the $dog ate', { dog: 'terrier' })).eq('the terrier ate');
      expect(RiTa.evaluate('the $dog $verb', { dog: 'terrier', verb: 'ate' })).eq('the terrier ate');

      expect(RiTa.evaluate('$foo=bar\n$foo', {})).eq('bar');
      expect(RiTa.evaluate('$dog=terrier\na $dog', {})).eq('a terrier');
      expect(RiTa.evaluate('$dog=beagle\nI ate the $dog', {})).eq('I ate the beagle');
      expect(RiTa.evaluate('$dog=lab\nThe $dog today.', {})).eq('The lab today.');
      expect(RiTa.evaluate('$dog=lab\nI ate the $dog.', {})).eq('I ate the lab.');
      expect(RiTa.evaluate('$dog=lab\nThe $dog\ntoday.', {})).eq('The lab\ntoday.');
      expect(RiTa.evaluate('$dog=lab\nI ate the\n$dog.', {})).eq('I ate the\nlab.');
      expect(RiTa.evaluate('$foo=baz\n$bar=$foo\n$bar', {})).eq('baz');

      // from known-issues
      expect(RiTa.evaluate('$bar', { foo: 'baz', bar: '$foo' }, 1)).eq('baz');
      expect(RiTa.evaluate('$bar', { foo: 'baz', bar: '(A | A)' }, 1)).eq('A');
      expect(RiTa.evaluate('$bar', { foo: 'baz', bar: '$foo starts with (b | b)' }, 1)).eq('baz starts with b');
      expect(RiTa.evaluate('$start=$foo\n$foo=hello\n$start')).eq('hello');
      expect(RiTa.evaluate('$start = $noun\n$noun = hello\n$start')).eq('hello');
    });

    it('Should resolve pending symbols with transforms', () => {
      let rs, ctx = { bar: '(orange|orange)' };

      rs = RiTa.evaluate('$bar is $bar.art color', ctx);
      expect(rs).eq('orange is an orange color');

      rs = RiTa.evaluate('$bar.cap is $bar.art color', ctx);
      expect(rs).eq('Orange is an orange color');
    })

    it('Should resolve symbols with property transforms', () => {
      let ctx = { bar: { color: 'blue' } };
      let rs = RiTa.evaluate('$foo=$bar.color\n$foo', ctx);
      expect(rs).eq('blue');

      ctx = { bar: { color: 'blue' } };
      rs = RiTa.evaluate('$bar.color', ctx);
      expect(rs).eq('blue')
    });

    it('Should concatenate symbols in parens', () => {
      let ctx = {};
      expect(RiTa.evaluate('$foo=(h | h)\n($foo)ello', ctx)).eq('hello');
      expect(ctx.foo).eq('h');
      expect(RiTa.evaluate('$foo b c', ctx)).eq('h b c');
      expect(RiTa.evaluate('($foo) b c', ctx)).eq('h b c');
      expect(RiTa.evaluate('($foo)bc', ctx)).eq('hbc');
      expect(ctx.foo).eq('h');
    });

    it('Should resolve symbols starting with number', () => {
      let res;
      res = RiTa.evaluate('$1foo=hello\n$1start=I said $1foo to her\n$1start', {});
      expect(res).eq('I said hello to her');
      res = RiTa.evaluate('$1foo=(hello)\n$1start=I said $1foo to her\n$1start', {});
      expect(res).eq('I said hello to her');
    });

    it('Should handle symbols in multiword transforms', () => {
      let res = RiTa.evaluate("($a dog).pluralize()\n$a=the");
      expect(res).eq("the dogs");
    });

    it('Should resolve transformed symbols in context', () => {
      let ctx = { a: "(terrier | terrier)" };
      expect(RiTa.evaluate("$a.capitalize()", ctx)).eq("Terrier");
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

    it('Should resolve choices', () => {
      expect(RiTa.evaluate('(|)')).eq('');
      expect(RiTa.evaluate('(a)')).eq('a');
      expect(RiTa.evaluate('(a | a)', 0)).eq('a');
      expect(RiTa.evaluate('(a | )')).to.be.oneOf(['a', '']);
      expect(RiTa.evaluate('(a | b)')).to.be.oneOf(['a', 'b']);
      expect(RiTa.evaluate('(a | b | c)'), {}).to.be.oneOf(['a', 'b', 'c']);
      expect(RiTa.evaluate('(a | (b | c) | d)')).to.be.oneOf(['a', 'b', 'c', 'd']);
      expect(/[abcde] [abcde]/.test(RiTa.evaluate("$$names=(a|b|c|d|e)\n$names $names", 0))).true;

    });

    /*it('Should resolve choices via scripting', () => {
      let rs = RiTa.scripting();
      expect(rs.evaluate('(|)')).eq('');
      expect(rs.evaluate('(a)')).eq('a');
      expect(rs.evaluate('(a | a)', 0)).eq('a');
      expect(rs.evaluate('(a | )')).to.be.oneOf(['a', '']);
      expect(rs.evaluate('(a | b)')).to.be.oneOf(['a', 'b']);
      expect(rs.evaluate('(a | b | c)'), {}).to.be.oneOf(['a', 'b', 'c']);
      expect(rs.evaluate('(a | (b | c) | d)')).to.be.oneOf(['a', 'b', 'c', 'd']);
    });*/

    it('Should resolve multiword choices', () => {
      let silent = RiTa.SILENCE_LTS;
      RiTa.SILENCE_LTS = true;
      expect(RiTa.evaluate('(A B | A B)')).eq('A B');
      expect(RiTa.evaluate('(A B).toLowerCase()')).eq('a b');
      expect(RiTa.evaluate('(A B | A B).toLowerCase()', 0)).eq('a b');
      expect(RiTa.evaluate('(A B | A B).articlize()', 0)).eq('an A B');
      RiTa.SILENCE_LTS = silent;
    });

    it('Should resolve choices in expressions', () => {
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

    it('Should resolve weighted choices', () => {

      // TODO: FAILING
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

    it('Should handle variousTransforms', () => {
      let ctx = {};
      expect(RiTa.evaluate("(BAZ).toLowerCase().ucf()", ctx)).eq("Baz");
      expect(RiTa.evaluate("(a).toUpperCase()", ctx)).eq("A");
      expect(RiTa.evaluate("$a=b\n$a.toUpperCase()", ctx)).eq("B");
      expect(RiTa.evaluate("($b=((a | a)|a)).toUpperCase() dog.", ctx)).eq("A dog.");
      expect(RiTa.evaluate("((a)).toUpperCase()", ctx)).eq("A");
      expect(RiTa.evaluate("$a.toUpperCase()\n($a=b)", ctx)).eq("B\nb");

      ctx = { dog: "terrier" };
      expect(RiTa.evaluate("$dog.ucf()", ctx)).eq("Terrier");

      RiTa.SILENT = true;
      expect(RiTa.evaluate(".toUpperCase()", ctx)).eq("");
      RiTa.SILENT = false;
    });



    it('should handle phrase transforms', () => {
      let g = "$y=(a | a)\n($x=$y b).ucf()";
      expect(RiTa.evaluate(g)).eq("A b");
    });

    it('Should handle empty builtin transforms', () => {

      expect(RiTa.evaluate("().uc()")).eq("");
      expect(RiTa.evaluate("().ucf()")).eq("");
      expect(RiTa.evaluate("().articlize()")).eq("");
      expect(RiTa.evaluate("().capitalize()")).eq("");
      expect(RiTa.evaluate("().pluralize()")).eq("");
      expect(RiTa.evaluate("().quotify()")).eq("“”");
      expect(RiTa.evaluate("().art()")).eq("");

      expect(RiTa.evaluate("().toLowerCase()", {}, ST)).eq(""); // ?
      expect(RiTa.evaluate("().toUpperCase()", {}, ST)).eq(""); // ?
    });

    it('Should resolve added transforms', () => {

      let txs1 = RiTa.addTransform('capA', () => 'A');
      expect(RiTa.evaluate('.capA()', 0)).eq('A');
      expect(RiTa.evaluate('(b).capA()', 0)).eq('A');
      expect(RiTa.evaluate('(b).capA', 0)).eq('A'); // no parens
      let txs2 = RiTa.addTransform('capA', null); // remove
      expect(txs1.length).eq(txs2.length);
    });

    it('Should resolve transforms in context', () => {
      let ctx = { 'capB': (s) => s || 'B' };
      expect(RiTa.evaluate('.capB()', ctx)).eq('B');
      expect(RiTa.evaluate('(c).capB()', ctx)).eq('c');
      expect(RiTa.evaluate('(c).toUpperCase()', ctx)).eq('C');
      expect(RiTa.evaluate('(c).toUpperCase', ctx)).eq('C'); // no parens
    });

    it('Should resolve no input transforms', () => {
      let ctx = { 'capA': () => 'A' };
      expect(RiTa.evaluate('.capA()', ctx)).eq('A');

      RiTa.addTransform('capA', () => 'A');
      expect(RiTa.evaluate('.capA()', {})).eq('A');
      RiTa.addTransform('capA');

      ctx = {};
      expect(RiTa.evaluate('$foo=.toUpperCase()', ctx, ST)).eq('');
      expect(ctx.foo).eq('');

      ctx = { blah3: () => 'Blah3' };
      expect(RiTa.evaluate('().blah3()', ctx)).eq('Blah3');

      ctx = { blah3: () => 'Blah3' };
      expect(RiTa.evaluate('.blah3()', ctx)).eq('Blah3');

      ctx = { blah3: () => 'Blah3' }; // no parens
      expect(RiTa.evaluate('.blah3', ctx)).eq('Blah3');
    });

    /*it('Should resolve RiTa function transforms', () => { // why???
      let rs = new RiScript();
      expect(rs.evaluate('Does $RiTa.env() equal node?')).eq("Does node equal node?");
      expect(rs.evaluate('Does $RiTa.env() equal node?')).eq("Does node equal node?");
    });*/

    it('Should resolve choice transforms', () => {
      expect(RiTa.evaluate("(a | a).up()", {}, ST)).eq("a.up()");
      expect(RiTa.evaluate("(a | a).toUpperCase()", {})).eq("A");
      expect(RiTa.evaluate("(a | a).up()", { up: x => x.toUpperCase() })).eq("A");
      expect(RiTa.evaluate("(a | a).up", { up: x => x.toUpperCase() })).eq("A"); // no parens

      expect(RiTa.evaluate('(a).toUpperCase()')).eq('A');
      expect(RiTa.evaluate('((a)).toUpperCase()')).eq('A');
      expect(RiTa.evaluate('(a | b).toUpperCase()')).to.be.oneOf(['A', 'B']);
      expect(RiTa.evaluate('(a | a).capitalize()')).eq('A');
      expect(RiTa.evaluate("The (boy | boy).toUpperCase() ate.")).eq('The BOY ate.');
      expect(RiTa.evaluate('How many (tooth | tooth).pluralize() do you have?')).eq('How many teeth do you have?');
    });

    it('Should resolve symbol transforms', () => {

      expect(RiTa.evaluate('$dog.toUpperCase()', { dog: 'spot' })).eq('SPOT');
      expect(RiTa.evaluate('$dog.capitalize()', { dog: 'spot' })).eq('Spot');
      expect(RiTa.evaluate('$1dog.capitalize()', { '1dog': 'spot' })).eq('Spot');
      expect(RiTa.evaluate('($dog).capitalize()', { dog: 'spot' })).eq('Spot');
      expect(RiTa.evaluate('$dog.toUpperCase()', {}, ST)).eq('$dog.toUpperCase()');
      expect(RiTa.evaluate('The $dog.toUpperCase()', { dog: 'spot' })).eq('The SPOT');
      expect(RiTa.evaluate("The (boy | boy).toUpperCase() ate.")).eq('The BOY ate.');
      expect(RiTa.evaluate("The (girl).toUpperCase() ate.")).eq('The GIRL ate.');
      expect(RiTa.evaluate('$dog.articlize().capitalize()', { dog: 'spot' })).eq('A spot');
      expect(RiTa.evaluate('($a=$dog) $a.articlize().capitalize()', { dog: 'spot' })).eq('spot A spot');
      expect(RiTa.evaluate('($a=$dog) $a.articlize().capitalize()', { dog: 'abe' })).eq('abe An abe');
      expect(RiTa.evaluate('(abe | abe).articlize().capitalize()', { dog: 'abe' })).eq('An abe');
      expect(RiTa.evaluate('(abe | abe).capitalize().articlize()', { dog: 'abe' })).eq('an Abe');
      expect(RiTa.evaluate('(abe | abe).capitalize.articlize', { dog: 'abe' })).eq('an Abe'); // no parens
      expect(RiTa.evaluate('(Abe Lincoln).articlize().capitalize()', { dog: 'abe' })).eq('An Abe Lincoln');
      expect(RiTa.evaluate("<li>$start</li>\n$start=($jrSr).capitalize()\n$jrSr=(junior|junior)"))
        .eq("<li>Junior</li>");
    });

    it('Should resolve object properties', () => {
      let dog = { name: 'spot', color: 'white', hair: { color: 'white' } };
      expect(RiTa.evaluate("It was a $dog.hair.color dog.", { dog })).eq('It was a white dog.');
      expect(RiTa.evaluate("It was a $dog.color.toUpperCase() dog.", { dog })).eq('It was a WHITE dog.');
      expect(RiTa.evaluate("It was a $dog.color.toUpperCase dog.", { dog })).eq('It was a WHITE dog.');// no parens
    });

    it('Should resolve member functions', () => {
      let dog = { name: 'Spot', getColor: () => 'red' };
      expect(RiTa.evaluate("$dog.name was a $dog.getColor() dog.",
        { dog })).eq('Spot was a red dog.');
      expect(RiTa.evaluate("$dog.name was a $dog.getColor dog.",
        { dog })).eq('Spot was a red dog.'); // no parens
    });

    it('Should resolve transforms ending with punc', () => {

      expect(RiTa.evaluate('(a | b).toUpperCase().')).to.be.oneOf(['A.', 'B.']);
      expect(RiTa.evaluate("The (boy | boy).toUpperCase()!")).eq('The BOY!');
      expect(RiTa.evaluate('The $dog.toUpperCase()?', { dog: 'spot' })).eq('The SPOT?');
      expect(RiTa.evaluate("The (boy | boy).toUpperCase().")).eq('The BOY.');

      let dog = { name: 'spot', color: 'white', hair: { color: 'white' } };
      expect(RiTa.evaluate("It was $dog.hair.color.", { dog: dog })).eq('It was white.');
      expect(RiTa.evaluate("It was $dog.color.toUpperCase()!", { dog: dog })).eq('It was WHITE!');

      let col = { getColor: () => 'red' };
      expect(RiTa.evaluate("It was $dog.getColor()?", { dog: col })).eq('It was red?');
      expect(RiTa.evaluate("It was $dog.getColor?", { dog: col })).eq('It was red?'); // no parens
      expect(RiTa.evaluate("It was $dog.getColor.", { dog: col })).eq('It was red.'); // no parens


      let ctx = { user: { name: 'jen' } }
      expect(RiTa.evaluate("That was $user.name!", ctx)).eq('That was jen!');
      expect(RiTa.evaluate("That was $user.name.", ctx)).eq('That was jen.');
    });

    it('Should resolve transforms on literals', () => {
      expect(String.quotify).eq(undefined);
      expect(String.articlize).eq(undefined);
      expect(RiTa.evaluate('How many (teeth).toUpperCase() do you have?', 0)).eq('How many TEETH do you have?');
      expect(RiTa.evaluate('How many (teeth).quotify() do you have?', 0)).eq('How many “teeth” do you have?');
      expect(RiTa.evaluate('That is (ant).articlize().')).eq('That is an ant.');
      expect(RiTa.evaluate('That is (ant).articlize.')).eq('That is an ant.');// no parens
      expect(String.articlize).eq(undefined);
      expect(String.quotify).eq(undefined);
    });

    it('Should resolve custom transforms', () => {
      let Blah = () => 'Blah';
      expect(RiTa.evaluate('That is (ant).Blah().', { Blah })).eq('That is Blah.');
      let ctx = { Blah2: () => 'Blah2' };
      expect(RiTa.evaluate('That is (ant).Blah2().', ctx)).eq('That is Blah2.');
      let Blah3 = () => 'Blah3';
      RiTa.addTransform("Blah3", Blah3);
      expect(RiTa.evaluate('That is (ant).Blah3().')).eq('That is Blah3.');
      expect(RiTa.evaluate('That is (ant).Blah3.')).eq('That is Blah3.');// no parens
    });

    it('Should resolve transform properties and method', () => {
      class TestClass {
        constructor() {
          this.prop = "result";
        }
        getProp() {
          return this.prop;
        }
      }
      let ctx = { bar: new TestClass() };
      let rs = RiTa.evaluate("$foo=$bar.prop\n$foo", ctx);
      expect(rs).eq("result");
      rs = RiTa.evaluate("$foo=$bar.getProp()\n$foo", ctx);
      expect(rs).eq("result");
      rs = RiTa.evaluate("$foo=$bar.getProp\n$foo", ctx);
      expect(rs).eq("result");// no parens
    });
  });

  describe('Grammaresque', () => {

    it('Should evaluate post defined symbols', () => {
      let rs = RiTa.evaluate('$foo=$bar\n$bar=baz\n$foo', {});
      expect(rs).eq('baz');
      expect(RiTa.evaluate('$foo=$bar.toLowerCase().ucf()\n$bar=baz\n$foo', {})).eq('Baz');
      expect(RiTa.evaluate('$foo=$bar.toLowerCase.ucf\n$bar=baz\n$foo', {})).eq('Baz');// no parens
    });

    (!SKIP_FOR_NOW) && it('Should optimise via preparsing', () => { // TODO: improve tests (not clear if preparsing or not)
      let ctx, input, rs;
      ctx = { nothing: 'NOTHING', hang: 'HANG' };
      input = "Eve near Vancouver, Washington is devastated that the SAT exam was postponed. Junior year means NOTHING if you can't HANG out. At least that's what she thought. Summer is going to suck.";
      rs = RiTa.evaluate(input, ctx, { nopre: 0 });
      //console.log('OUTPUT: '+rs);
      expect(rs).eq(input.replace('$hang', 'HANG').replace('$nothing', 'NOTHING'));

      input = "Eve near Vancouver,\nWashington is devastated that the SAT exam was postponed. Junior year means NOTHING if you can't HANG out. At least that's what she thought. Summer is going to suck.";
      rs = RiTa.evaluate(input, ctx, { nopre: 0 });
      expect(rs).eq(input.replace('$hang', 'HANG').replace('$nothing', 'NOTHING').replace('\n', ' '));

      input = "Eve&nbsp;near Vancouver";
      rs = RiTa.evaluate(input, ctx, { nopre: 0 });
      expect(rs).eq("Eve near Vancouver");

      input = "This is not a &#124;.";
      rs = RiTa.evaluate(input, ctx, { nopre: 0 });
      expect(rs).eq("This is not a |.");

      ctx = { bar: { ucf: 'result' } };
      rs = RiTa.evaluate('$foo=$bar.ucf\n$foo', ctx);
      expect(rs).eq('result');
    });

    it('Should resolve symbols with transforms', () => {
      expect(RiTa.evaluate('$foo=$bar.toUpperCase()\n$bar=baz\n$foo')).eq('BAZ');

      expect(RiTa.evaluate('$foo.capitalize()\n$foo=(a|a)')).eq('A');
      expect(RiTa.evaluate('$start=$r.capitalize()\n$r=(a|a)\n$start')).eq('A');

      expect(RiTa.evaluate('$foo=(bar).ucf\n$foo')).eq('Bar');

      let ctx = { bar: () => 'result' }; // func transform
      let rs = RiTa.evaluate('().bar', ctx);
      expect(rs).eq('result');

      ctx = { bar: { result: 'result' } }; // property transform
      rs = RiTa.evaluate('$foo=$bar.result\n$foo', ctx); // no parens
      expect(rs).eq('result');

      ctx = { mammal: "(ox | ox)" }; 
      rs = RiTa.evaluate('The big $mammal ate the smaller $mammal.s.', ctx);
      // no parens, alias, resolved from pending symbols
      expect(rs).eq('The big ox ate the smaller oxen.');
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

    it('Should resolve converted grammars', () => {
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

    it('Should resolve prior assignments', () => {
      expect(RiTa.evaluate('$foo=dog\n$bar=$foo\n$baz=$foo\n$baz', null)).eq('dog');
      expect(RiTa.evaluate('$foo=hi\n$foo there', null)).eq('hi there');
      expect(RiTa.evaluate('$foo=a\n$foo', null)).eq('a');

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
      expect(RiTa.evaluate('The &#010; line break entity')).eq('The \n line break entity'); // ?
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
      expect(RiTa.evaluate(",.;:'?!-_`“”’‘…‐–—―^*", {})).eq(",.;:'?!-_`“”’‘…‐–—―^*");
      expect(RiTa.evaluate(',.;:"?!-_`“”’‘…‐–—―^*', {})).eq(',.;:"?!-_`“”’‘…‐–—―^*');
      expect(RiTa.evaluate("/&%©@*")).eq("/&%©@*");
      expect(RiTa.evaluate("/&%©\n@*")).eq("/&%©\n@*");
    });

    it('Should allow spaces for formatting', () => {
      expect(RiTa.evaluate("&nbsp;The dog&nbsp;", {})).eq(" The dog ");
      expect(RiTa.evaluate("&nbsp; The dog&nbsp;", {})).eq("  The dog ");
      expect(RiTa.evaluate("The &nbsp;dog", {})).eq("The  dog");
      expect(RiTa.evaluate("The&nbsp; dog", {})).eq("The  dog");
      expect(RiTa.evaluate("The &nbsp; dog", {})).eq("The   dog");
    });

    it('Should show literal dollar signs', () => {
      expect(RiTa.evaluate("This is &#x00024", {})).eq("This is $");
      expect(RiTa.evaluate("This is &#36", {})).eq("This is $");
      expect(RiTa.evaluate("This is $dollar", { dollar: "&#36" })).eq("This is $");
    });

    it('Should recognize continuations', () => {
      expect(RiTa.evaluate('aa\\\nbb', {})).eq('aabb');
      expect(RiTa.evaluate('aa\\\n(bb).uc', {})).eq('aaBB');
      expect(RiTa.evaluate('aa\\\n bb', {})).eq('aa bb');
      expect(RiTa.evaluate('aa \\\nbb', {})).eq('aa bb');
      expect(RiTa.evaluate('aa \\\n bb', {})).eq('aa  bb');
    });

    it('Should ignore line comments ', () => {
      expect(RiTa.evaluate("// $foo=a")).eq("");
      expect(RiTa.evaluate("// hello")).eq("");
      expect(RiTa.evaluate("//hello")).eq("");
      expect(RiTa.evaluate("//()")).eq("");
      expect(RiTa.evaluate("//{}")).eq("");
      expect(RiTa.evaluate("//$")).eq("");
      expect(RiTa.evaluate("hello\n//hello")).eq("hello");
    });

    it('Should ignore block comments ', () => {
      expect(RiTa.evaluate("/* hello */")).eq("");
      expect(RiTa.evaluate("/* $foo=a */")).eq("");
      expect(RiTa.evaluate("a /* $foo=a */b", 0)).eq("a b");
      expect(RiTa.evaluate("a/* $foo=a */ b")).eq("a b");
      expect(RiTa.evaluate("a/* $foo=a */b")).eq("ab");
    })
  });

  /*describe('Operators', () => {
    if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') { // skip for prod

      it('Should invoke assignment ops', () => {

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

      it('Should invoke equality ops', () => {

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

      it('Should invoke comparison ops', () => {

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

      it('Should invoke matching ops', () => {

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
    }
  }); */

  describe('Conditionals', () => {

    it('Should throw on bad conditionals', () => {
      //expect(() => RiTa.evaluate('{$a<hello} foo', { a: 2 })).to.throw();
      expect(() => RiTa.evaluate('{$a<} foo', { a: 2 }, ST)).to.throw();
    });

    it('Should resolve conditionals', () => {
      expect(RiTa.evaluate('{$a<1}? foo', { a: 2 })).eq('');
      expect(RiTa.evaluate('{$a>1}? foo', { a: 2 })).eq('foo');
      expect(RiTa.evaluate('{$a=hello}? foo', { a: 'hello' })).eq('foo');
      expect(RiTa.evaluate('{$a=goodbye}? foo', { a: 'hello' })).eq('');
    });

    it('Should resolve float conditionals', () => {
      expect(RiTa.evaluate('{$a<1.1}? foo', { a: 2 })).eq('');
      expect(RiTa.evaluate('{$a>1.1}? foo', { a: 2 })).eq('foo');
      expect(RiTa.evaluate('{$a<.1}? foo', { a: 2 })).eq('');
      expect(RiTa.evaluate('{$a>.1}? foo', { a: 2 })).eq('foo');
      expect(RiTa.evaluate('{$a<0.1}? foo', { a: 2 })).eq('');
      expect(RiTa.evaluate('{$a>0.1}? foo', { a: 2 })).eq('foo');
      expect(RiTa.evaluate('{$a>0.1}? foo', { a: .1 })).eq('');
      expect(RiTa.evaluate('{$a>=0.1}? foo', { a: .1 })).eq('foo');
    });

    it('Should resolve multival conditionals', () => {
      expect(RiTa.evaluate('{$a<1,$b<1}? foo', { a: 2 })).eq('');
      expect(RiTa.evaluate('{$a>1,$b<1}? foo', { a: 2 })).eq('');
      expect(RiTa.evaluate('{$a>1,$b<1}? foo', { a: 2, b: 2 })).eq('');
      expect(RiTa.evaluate('{$a=ok,$b>=1}? foo', { a: 2, b: 2 })).eq('');
      expect(RiTa.evaluate('{$a>1,$b>=1}? foo', { a: 2, b: 2 })).eq('foo');
    });

    it('Should resolve matching conditionals', () => {
      expect(RiTa.evaluate('{$a!=ell}? foo', { a: 'hello' })).eq('foo');
      expect(RiTa.evaluate('{$a*=ell}? foo', { a: 'hello' })).eq('foo');
      expect(RiTa.evaluate('{$a^=ell}? foo', { a: 'ello' })).eq('foo');
      expect(RiTa.evaluate('{$a$=ell}? foo', { a: 'helloell' })).eq('foo');
      expect(RiTa.evaluate('{$a$=ell}? foo', { a: 'helloellx' })).eq('');
    });

    it('Should resolve conditionals in riscript', () => {
      expect(RiTa.evaluate('$a=hello\n{$a!=ell}? foo', {})).eq('foo');
      expect(RiTa.evaluate('$a=hello\n{$a*=ell}? foo', {})).eq('foo');
      expect(RiTa.evaluate('$a=ello\n{$a^=ell}? foo', {})).eq('foo');
      expect(RiTa.evaluate('$a=helloell\n{$a$=ell}? foo', {})).eq('foo');
      expect(RiTa.evaluate('$a=helloellx\n{$a$=ell}? foo', {})).eq('');
    });
  });

  describe('Chinese Characters', () => {

    it('Should handle evalution of Chinese characters', () => {
      expect(RiTa.evaluate('中文', {})).eq('中文');
      expect(RiTa.evaluate('繁體中文', {})).eq('繁體中文');
      expect(RiTa.evaluate('简体中文', {})).eq('简体中文');
      expect(RiTa.evaluate('這是中文！', {})).eq('這是中文！');
      expect(RiTa.evaluate('！简体中文', {})).eq('！简体中文');
      expect(RiTa.evaluate('"简体中文"', {})).eq('"简体中文"');
      expect(RiTa.evaluate('$foo=繁體中文\n中文', {})).eq('中文');
      expect(RiTa.evaluate('$foo=繁體中文\n中文：\n$foo', {})).eq('中文：\n繁體中文');
      expect(RiTa.evaluate('$foo=(繁體中文|简体中文)\n$foo是$foo', {})).to.be.oneOf(['简体中文是简体中文', '繁體中文是繁體中文']);
      expect(RiTa.evaluate('($a|$a)', { a: "中文", b: "日文" })).eq('中文');
    });

    it('Should handle dynamic with Chinese characters', () => {
      expect(RiTa.evaluate('$$foo=中文\n繁體')).eq('繁體');
      expect(RiTa.evaluate('$$foo=中文\n繁體$foo')).eq('繁體中文');
      expect(RiTa.evaluate('$$foo=(繁體)\n$foo\n中文')).eq('繁體\n中文');
    });

    false && it('Should allow Chinese characters in symbol name', () => { //should it?
      expect(RiTa.evaluate('$變量=(繁體|简体)\n$變量中文')).to.be.oneOf(['繁體中文', '简体中文']);
      expect(RiTa.evaluate('$變量中文', { 變量: '繁體' })).eq("繁體中文");
    });

    it('Should handle continuation with Chinese characters', () => {
      expect(RiTa.evaluate('前半段句子\\\n後半段句子')).eq('前半段句子後半段句子');
      expect(RiTa.evaluate('$foo=(前半段句子\\\n後半段句子)\n$foo')).eq('前半段句子後半段句子');
      expect(RiTa.evaluate('$foo=前半段\n$foo句子   \\\n後半段句子')).eq('前半段句子   後半段句子');
      expect(RiTa.evaluate('$foo=前半段\n$foo句子\\\n   後半段句子')).eq('前半段句子   後半段句子');
    });

    it('Should handle conditional with Chinese characters', () => {
      expect(RiTa.evaluate('$a=繁體\n{$a=繁體}? $a')).eq('繁體');
      expect(RiTa.evaluate('$a=繁體\n{$a=中文}? $a')).eq('');
      expect(RiTa.evaluate('$a=繁體\n{$a!=中文}? $a')).eq('繁體');
      expect(RiTa.evaluate('$a=簡體和繁體中文\n{$a*=中文}? $a')).eq('簡體和繁體中文');
      expect(RiTa.evaluate('$a=繁體和簡體\n{$a^=繁體}? $a')).eq('繁體和簡體');
      expect(RiTa.evaluate('$a=簡體繁體\n{$a$=繁體}? $a')).eq('簡體繁體');

    });
  });

});
