const expect = require('chai').expect;
const RiTa = require('../src/rita');
const RiScript = require('../src/riscript');

describe('RiTa.KnownIssues', () => {

  0 && it('1: pluralize or singularize fails', () => { 
    let testPairs = [  ]; // SS FAILING ITEMS HERE
    let res1, res2, res3, i = 0, dbug = true;
    if (!testPairs.length) return;
    dbug && console.log(testPairs[i] + '/' + testPairs[i + 1]);

    res1 = RiTa.singularize(testPairs[i], { dbug: dbug });
    res2 = RiTa.pluralize(testPairs[i + 1], { dbug: dbug });
    res3 = RiTa.inflector.isPlural(testPairs[i], { dbug: dbug });

    eq(res1, testPairs[i + 1], 'FAIL: singularize(' + testPairs[i]
      + ') was ' + res1 + ', but expected ' + testPairs[i + 1] + '\n        '
      + 'pluralize(' + testPairs[i + 1] + ') was ' + res2 + '\n\n');

    // pluralize
    eq(res2, testPairs[i], 'FAIL: pluralize(' + testPairs[i + 1]
      + ') was ' + res2 + ', but expected ' + testPairs[i] + '\n        '
      + 'singularize(' + testPairs[i] + ') was ' + res1 + '\n\n');

    ok(res3, 'FAIL: isPlural(' + testPairs[i] + ') was false\n\n');
  });
  
  0 && it('simple evaluations', function() {
    // should this throw? maybe yes: can do foo&dot;bar - need better error
    expect(RiTa.evaluate('foo.bar', {}, 1)).eq('foo.bar'); 
  });

  it('Should allow transforms on assignments', () => {
    let ctx = {};
    expect(RiTa.evaluate('[$a=a].toUpperCase()', ctx, 1)).eq('');
    expect(ctx.a).eq('A')
  });

  it('Should be fixed to pass', () => {
    let ctx = {};
    expect(RiTa.evaluate('$foo=().toUpperCase()', ctx, 0)).eq('');
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
    expect(RiTa.evaluate(script, undefined, 0)).eq('the woman shoots the woman');
  });
});

function eql(output, expected, msg) { expect(output).eql(expected, msg); }
function ok(res, msg) { expect(res).eq(true, msg); }
function eq(a, b, msg) { expect(a).eq(b, msg); }
