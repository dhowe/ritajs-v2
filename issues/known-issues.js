const expect = require('chai').expect;
const RiTa = require('../src/rita_api');
const RiScript = require('../src/riscript');

// See also 'Failing Tests' in riscript-tests.js

describe('RiTa.KnownIssues', () => {


  it('1: must do de-pluralization before features ', () => {

    expect(RiTa.syllables('deforestations')).eq(RiTa.syllables('deforestation') + '-z');

  });

  it('2: pluralize or singularize fails', () => {
    let testPairs = [ ]; // FAILING ITEMS HERE
    let res1, res2, res3, dbug = true;
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

  //it('2: conjugation fails', () => { });

  function eql(output, expected, msg) { expect(output).eql(expected, msg); }
  function ok(res, msg) { expect(res).eq(true, msg); }
  function eq(a, b, msg) { expect(a).eq(b, msg); }
});


describe('RiScript.KnownIssues', () => {

  it('Should eval post-defined variables', function() {

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

  it('Should be fixed to pass', function() {
    //return;

    ctx = {};
    expect(RiScript.evaluate('$foo=().toUpperCase()', ctx, 0)).eq('');
    expect(ctx.foo).eq('');

    // *** WORKING HERE: transform should not be applied to silent assign
    0 && expect(RiScript.evaluate('How many (tooth | tooth).pluralize() do you have?')).eq('How many teeth do you have?');
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
