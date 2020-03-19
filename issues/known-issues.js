const expect = require('chai').expect;
const RiTa = require('../src/rita_api');
const RiScript = require('../src/riscript');

describe('RiTa.KnownIssues', () => {

  it('0: Should correctly handle transforms on literals', function() {
    expect(RiTa.evaluate('How many (teeth).quotify() do you have?')).eq('How many "teeth" do you have?');
    expect(RiTa.evaluate('That is (ant).articlize().')).eq('That is an ant.');
  });

  it('1: pluralize or singularize fails', () => { // ok
    let testPairs = [ ]; // ADD FAILING ITEMS HERE
    let res1, res2, res3, i = 0, dbug = true;
    if (!testPairs.length) return;
    dbug && console.log(testPairs[i] + '/' + testPairs[i + 1]);

    res1 = RiTa.singularize(testPairs[i], { dbug: dbug });
    res2 = RiTa.pluralize(testPairs[i + 1], { dbug: dbug });
    res3 = RiTa.pluralizer.isPlural(testPairs[i], { dbug: dbug });

    eq(res1, testPairs[i + 1], 'FAIL: singularize(' + testPairs[i]
      + ') was ' + res1 + ', but expected ' + testPairs[i + 1] + '\n        '
      + 'pluralize(' + testPairs[i + 1] + ') was ' + res2 + '\n\n');

    // pluralize
    eq(res2, testPairs[i], 'FAIL: pluralize(' + testPairs[i + 1]
      + ') was ' + res2 + ', but expected ' + testPairs[i] + '\n        '
      + 'singularize(' + testPairs[i] + ') was ' + res1 + '\n\n');

    ok(res3, 'FAIL: isPlural(' + testPairs[i] + ') was false\n\n');
  });

  it('2: conjugation fails', () => { // ok

  });

  function eql(output, expected, msg) { expect(output).eql(expected, msg); }
  function ok(res, msg) { expect(res).eq(true, msg); }
  function eq(a, b, msg) { expect(a).eq(b, msg); }
});


describe('RiScript.KnownIssues', () => {

  it('simple evaluations', function() {
    expect(RiTa.evaluate('foo.bar', {}, 0)).eq('foo.bar');
  });

  it('Symbols that resolve to other elements', () =>{

    // 1) OPTIONS PARSE ALL VALUES IN CONTEXT BEFORE STARTING
    // 2) DISALLOW RISCRIPT IN CONTEXT **

    // TODO: symbols that resolve to other symbols
    expect(RiTa.evaluate('$bar', { foo: 'baz', bar: '$foo' }, 1)).eq('baz');

    // TODO: symbols that resolve to choices
    expect(RiTa.evaluate('$bar', { foo: 'baz', bar: '(A | A)' }, 1)).eq('A');

    // TODO: symbols that resolve to riscript
    expect(RiTa.evaluate('$bar', { foo: 'baz', bar: '$foo starts with (b | b)' }, 1)).eq('baz starts with b');
  });

  it('Should eval post-defined variables', () =>{

    let rc = RiScript.compile('$start=$foo\n$foo=hello\n$start', 1);
    let res = rc.run();
    expect(res).eq('hello');

    let script = [
      '$start = $noun',
      '$noun = hello',
      '$start'
    ];
    0 && expect(RiScript.compile(script).run()).eq('hello');
  });

  return; // remove to work

  it('Should be fixed to pass', () => {
    //return;

    ctx = {};
    expect(RiScript.evaluate('$foo=().toUpperCase()', ctx, 0)).eq('');
    expect(ctx.foo).eq('');
  });

  it('Should eval converted grammar', function() {
    let script = [
      '$start = $nounp $verbp.',
      '$nounp = $determiner $noun',
      '$determiner = the | the',
      '$verbp = $verb $nounp',
      '$noun = (woman | woman)',
      '$verb = shoots',
      '$start'
    ].join('\n');
    expect(RiScript.evaluate(script, null, 0)).eq('the woman shoots the woman');
  });

});

// GRAMMARS


  /*
  it('Should eval post-defined variables', function() {

    let script, res;
    script = RiTa.compile('$start=$foo\n$foo=hello');
    res = script.expand('$start');
    expect(res).eq('hello');

    script = RiTa.compile('$start=(I said $foo to her) $foo=hello', 0);
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
    let res = rc.expand();
    expect(res).eq('the woman shoots the woman');
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
