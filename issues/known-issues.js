const expect = require('chai').expect;
const RiTa = require('../src/rita');
const RiScript = require('../src/riscript');

describe('RiTa.KnownIssues', () => {

  it('Should throw on infinite recursions', () => {
    console.log(RiTa.evaluate('$s', { s: '$a', a: '$s' }));
    expect(() => RiTa.evaluate('$s', { s: '$a', a: '$s' })).to.throw();
  });

  it('Should throw on bad transforms', () => {
    expect(() => RiTa.evaluate('a.toUpperCase()', 0, { silent: 1, trace: 1 })).to.throw();
  });

  it('Should handle RiTa function transforms with args', () => {
    expect(RiTa.evaluate('Is $RiTa.presentParticiple("lie") wrong?',
       {}, { trace: 1, singlePass: 1 })).eq("Is lying wrong?");
  });

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

  it('Should allow transforms on assignments', () => {   // TODO
    let ctx = {};
    expect(RiTa.evaluate('[$a=a].toUpperCase()', ctx, 0)).eq('');
    expect(ctx.a).eq('A')
  });
});

/* VERB REMOVAL
"arbitrate":["aa1-r b-ah t-r-ey-t","vb"],
"arbitrating":["aa1-r b-ah t-r-ey t-ih-ng","vbg"],
*/

function eql(output, expected, msg) { expect(output).eql(expected, msg); }
function ok(res, msg) { expect(res).eq(true, msg); }
function eq(a, b, msg) { expect(a).eq(b, msg); }
