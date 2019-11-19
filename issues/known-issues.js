const expect = require('chai').expect;
const RiTa = require('../src/rita_api');
const RiScript = require('../src/riscript');

// See also 'Failing Tests' in riscript-tests.js

describe('RiScript.KnownIssues', () => {

  it('Fix: Should eval post-defined variables', function() {

    let rc = RiScript.compile('$start=$foo\n$foo=hello\n$start', 1);
    let res = rc.run();
    expect(res).eq('a');

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


  it('Fix: Should eval converted grammar', function() {
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


describe('RiTa.KnownIssues', () => {

  it('0: pluralization failures', () => {
    expect(RiTa.pluralize('dive')).eq('dives'); // dif
  });

  it('1: must do de-pluralization before features ', () => {

    expect(RiTa.syllables('deforestations')).eq(RiTa.syllables('deforestation') + '-z');

  });

  it('2: conjugation fails', () => {

    let args = {
      number: RiTa.PLURAL,
      person: RiTa.SECOND_PERSON,
      tense: RiTa.PAST_TENSE
    };
    s = ["compete", "complete", "eject"];
    a = ["competed", "completed", "ejected"];
    expect(a.length).eq(s.length);
    for (let i = 0; i < s.length; i++) {
      expect(RiTa.conjugate(s[i])).eq(a[i]);
    }
  });

  it('3: isRhyme fails', () => {

    ok(!RiTa.isRhyme("yoyo", "jojo"));
  });

  function eql(output, expected, msg) { expect(output).eql(expected, msg); }
  function ok(res, msg) { expect(res).eq(true, msg); }
  function eq(a, b, msg) { expect(a).eq(b, msg); }
});
