import { loadTestingDeps } from './before';

describe('RiTa.Lexicon', function () { // SYNC:

  this.timeout(10000); // for ci
  this.slow(500);

  let RiTa, expect, hasLex;
  before(async function () {
    ({ RiTa, expect, hasLex } = await loadTestingDeps());
    if (!hasLex) this.skip();
    RiTa.lexicon(); // first load
    hasLex = RiTa.HAS_LEXICON;
  });

  /*it('Should call *search generator', () => {
    let lex = RiTa.lexicon(), result;

    let iterator = lex.search('^aba');
    result = iterator.next();
    while (!result.done) {
      result = iterator.next(); // check each
      expect(/^aba/.test(result.value)).eq(true);
    }
    //console.log('done ', result);
    let answer = result.value; // check when finished
    expect(Array.isArray(answer)).eq(true);
    answer.forEach(v => expect(/^aba/.test(v)).eq(true));

    iterator = lex.search('^ab', { limit: 10 });// same with explicit limit
    result = iterator.next();
    while (!result.done) {
      result = iterator.next();
      expect(/^ab/.test(result.value)).eq(true);
    }
    answer = result.value;
    //console.log('done ', result);
    expect(Array.isArray(answer)).eq(true);
    expect(answer.length).eq(10);
    answer.forEach(v => expect(/^ab/.test(v)).eq(true));


    // grab first value
    for (let value of lex.search('^aba', { limit: -1 })) {
      if (value) {
        result = value;
        break;
      }
    }
    expect(/^aba/.test(result)).eq(true);

    result = [];
    for (let value of lex.search('^aba', { limit: 5 })) {
      if (value) result.push(value);
    }
    expect(Array.isArray(result)).eq(true);
    expect(result.length).eq(5);
    result.forEach(r => expect(/^aba/.test(r)).eq(true));

    let item, result2 = [], iter = lex.search(/^ab/); // diff. syntax
    while (item = iter.next(), !item.done) {
      result2.push(item.value);
    }
    expect(result2.length).eq(10);
  });*/

  it('Should call hasWord', function () {
    expect(RiTa.hasWord("random")).to.be.true;
    expect(RiTa.hasWord("dog")).to.be.true;
    expect(RiTa.hasWord("men")).to.be.true;
    expect(RiTa.hasWord("happily")).to.be.true;
    expect(RiTa.hasWord("play")).to.be.true;
    expect(RiTa.hasWord("plays")).to.be.true;
    expect(RiTa.hasWord("played")).to.be.true;
    expect(RiTa.hasWord("written")).to.be.true;
    expect(RiTa.hasWord("dogs")).to.be.true;
    expect(RiTa.hasWord("oxen")).to.be.true;
    expect(RiTa.hasWord("mice")).to.be.true;

    expect(RiTa.hasWord("dogs", { noDerivations: true })).to.be.false;
    expect(RiTa.hasWord("played", { noDerivations: true })).to.be.false;
    expect(RiTa.hasWord("cats", { noDerivations: true })).to.be.false;

    // https://github.com/dhowe/rita/issues/139 
    expect(RiTa.hasWord("bunning")).to.be.false;
    expect(RiTa.hasWord("coyes")).to.be.false;
    expect(RiTa.hasWord("soes")).to.be.false;
    expect(RiTa.hasWord("knews")).to.be.false;
    expect(RiTa.hasWord("fastering")).to.be.false;
    expect(RiTa.hasWord("loosering")).to.be.false;
    expect(RiTa.hasWord("knews")).to.be.false;  // SYNC:

    expect(RiTa.hasWord("barkness")).to.be.false;
    expect(RiTa.hasWord("horne")).to.be.false;
    expect(RiTa.hasWord("haye")).to.be.false;

    // https://github.com/dhowe/rita/issues/177

    expect(RiTa.hasWord("bites")).to.be.true;  
    expect(RiTa.hasWord("bit")).to.be.true;  
    expect(RiTa.hasWord("bitted")).to.be.false;

    expect(RiTa.hasWord("breaks")).to.be.true;  
    expect(RiTa.hasWord("broke")).to.be.true;  
    expect(RiTa.hasWord("brokes")).to.be.false;
    expect(RiTa.hasWord("broked")).to.be.false;

    expect(RiTa.hasWord("concerned")).to.be.true;
    expect(RiTa.hasWord("concerneded")).to.be.false;
    expect(RiTa.hasWord("concerneds")).to.be.false;

    expect(RiTa.hasWord("outpaced")).to.be.true;
    expect(RiTa.hasWord("outpaceded")).to.be.false;
    expect(RiTa.hasWord("outpaceds")).to.be.false;

    expect(RiTa.hasWord("reported")).to.be.true;
    expect(RiTa.hasWord("reporteds")).to.be.false;
    expect(RiTa.hasWord("reporteded")).to.be.false;

    expect(RiTa.hasWord("build")).to.be.true;
    expect(RiTa.hasWord("built")).to.be.true;

    expect(RiTa.hasWord("called")).to.be.true;
    expect(RiTa.hasWord("calleds")).to.be.false;
    expect(RiTa.hasWord("calleded")).to.be.false;

    expect(RiTa.hasWord("commits")).to.be.true;
    expect(RiTa.hasWord("committed")).to.be.true;
    expect(RiTa.hasWord("committeds")).to.be.false;
    expect(RiTa.hasWord("committeded")).to.be.false;

    expect(RiTa.hasWord("computerized")).to.be.true;
    expect(RiTa.hasWord("computerizeds")).to.be.false;
    expect(RiTa.hasWord("computerizeded")).to.be.false;

    expect(RiTa.hasWord("gets")).to.be.true;
    expect(RiTa.hasWord("got")).to.be.true;
    expect(RiTa.hasWord("gots")).to.be.false;
    expect(RiTa.hasWord("gotten")).to.be.true;

    expect(RiTa.hasWord("leads")).to.be.true;
    expect(RiTa.hasWord("led")).to.be.true;
    expect(RiTa.hasWord("leds")).to.be.false;

    expect(RiTa.hasWord("oversaw")).to.be.true;  
    expect(RiTa.hasWord("overseen")).to.be.true;  
    expect(RiTa.hasWord("oversaws")).to.be.false;
   expect(RiTa.hasWord("overseened")).to.be.false;

    expect(RiTa.hasWord("remakes")).to.be.true;  
    expect(RiTa.hasWord("remade")).to.be.true;  
    expect(RiTa.hasWord("remaded")).to.be.false;

    expect(RiTa.hasWord("discriminates")).to.be.true;  
    expect(RiTa.hasWord("discriminated")).to.be.true;  
    expect(RiTa.hasWord("discriminateds")).to.be.false;

    expect(RiTa.hasWord("launched")).to.be.true;  
    expect(RiTa.hasWord("launcheds")).to.be.false;  
    expect(RiTa.hasWord("launcheded")).to.be.false;

    expect(RiTa.hasWord("starts")).to.be.true;  
    expect(RiTa.hasWord("started")).to.be.true;  
    expect(RiTa.hasWord("starteds")).to.be.false;
  });

  it('Should call randomWord', function () {
    // SYNC:

    let result;
    result = RiTa.randomWord();

    expect(result.length > 0, "randomWord: " + result).to.be.true;
    expect(result === RiTa.randomWord(), "randomWord returned same result '" + result + "'").to.be.false;

    result = RiTa.randomWord({ numSyllables: 3 });
    expect(result.length > 0, "3 syllables: " + result).to.be.true;

    result = RiTa.randomWord({ numSyllables: 5 });
    expect(result.length > 0, "5 syllables: " + result).to.be.true;
  });

  it('Should call randomWord with regex', function () {

    // regex string as first parameter
    let result = RiTa.randomWord('^a');
    expect(/^a/.test(result)).to.be.true;
    expect(result.length > 3).to.be.true;

    result = RiTa.randomWord("^apple$");
    expect(result).equal("apple");

    result = RiTa.randomWord("le");
    expect(result.includes("le")).to.be.true;

    let results = [];
    for (let i = 0; i < 10; i++) {
      results.push(RiTa.randomWord("^a"));
    }
    expect(results.length === 10).to.be.true;

    let i = 0;
    while (i < results.length - 1) {
      if (results[i] === results[i + 1]) {
        results.splice(i, 1);
      } else {
        i++;
      }
    }
    // 10 words not the same
    expect(results.length > 1).to.be.true;

    // regex object as first parameter
    result = RiTa.randomWord(/^a/);
    expect(/^a/.test(result)).to.be.true;
    expect(result.length > 3).to.be.true;

    result = RiTa.randomWord(/^apple$/);
    expect(result).equal("apple");

    result = RiTa.randomWord(/le/);
    expect(result.includes("le")).to.be.true;

    result = RiTa.randomWord("^a");
    expect(result.startsWith("a")).to.be.true;

    results = [];
    for (let i = 0; i < 10; i++) {
      results.push(RiTa.randomWord(/^a/));
    }
    expect(results.length === 10).to.be.true;
  });

  it('Should call randomWord with stress regex', function () {

    let result = RiTa.randomWord("0/1/0", { type: "stresses" });
    expect(result.length > 3);
    expect(RiTa.analyze(result).stresses.includes("0/1/0"));

    result = RiTa.randomWord("^0/1/0$", { type: "stresses" });
    expect(RiTa.analyze(result).stresses).eq("0/1/0");

    result = RiTa.randomWord("010", { type: "stresses" });
    expect(RiTa.analyze(result).stresses.includes("0/1/0")).to.be.true;

    result = RiTa.randomWord("^010$", { type: "stresses" });
    expect(RiTa.analyze(result).stresses).eq("0/1/0");

    result = RiTa.randomWord(/0\/1\/0/, { type: "stresses" });
    expect(RiTa.analyze(result).stresses.includes("0/1/0")).to.be.true;

    result = RiTa.randomWord(/^0\/1\/0\/0$/, { type: "stresses" });
    expect(RiTa.analyze(result).stresses).eq("0/1/0/0");
  });

  it('Should call randomWord with phones regex', function () {

    let result = RiTa.randomWord("^th", { type: "phones" });
    expect(result.length > 3);
    expect(/^th/.test(RiTa.analyze(result).phones)).to.be.true;

    result = RiTa.randomWord("v$", { type: "phones" });
    expect(/v$/.test(RiTa.analyze(result).phones)).to.be.true;

    result = RiTa.randomWord("^b-ih-l-iy-v$", { type: "phones" });
    expect(result).eq("believe");

    result = RiTa.randomWord("ae", { type: "phones" });
    expect(RiTa.analyze(result).phones.includes("ae")).to.be.true;

    result = RiTa.randomWord(/^th/, { type: "phones" });
    expect(result.length > 3);
    expect(/^th/.test(RiTa.analyze(result).phones)).to.be.true;

    result = RiTa.randomWord(/v$/, { type: "phones" });
    expect(/v$/.test(RiTa.analyze(result).phones)).to.be.true;

    result = RiTa.randomWord(/^b-ih-l-iy-v$/, { type: "phones" });
    expect(result).eq("believe");

    result = RiTa.randomWord(/ae/, { type: "phones" });
    expect(RiTa.analyze(result).phones.includes("ae")).to.be.true;
  });

  it('Should call randomWord with opts regex', function () {

    // as one of the field in opts
    let result = RiTa.randomWord({ regex: '^a' });
    expect(/^a/.test(result)).to.be.true;
    expect(result.length > 3).to.be.true;

    result = RiTa.randomWord({ regex: /^a/ });
    expect(/^a/.test(result)).to.be.true;
    expect(result.length > 3).to.be.true;

    result = RiTa.randomWord({ regex: "0/1/0", type: "stresses" });
    expect(result.length > 3);
    expect(RiTa.analyze(result).stresses.includes("0/1/0")).to.be.true;

    result = RiTa.randomWord({ regex: /0\/1\/0/, type: "stresses" });
    expect(RiTa.analyze(result).stresses.includes("0/1/0")).to.be.true;

    result = RiTa.randomWord({ regex: "^th", type: "phones" });
    expect(result.length > 3);
    expect(/^th/.test(RiTa.analyze(result).phones)).to.be.true;

    result = RiTa.randomWord({ regex: /^th/, type: "phones" });
    expect(result.length > 3);
    expect(/^th/.test(RiTa.analyze(result).phones)).to.be.true;
  });

  it("Should handle an augmented lexicon", function () {

    let toAdd = {
      'deg': ['d-eh1-g', 'nn'],
      'wadly': ['w-ae1-d l-iy', 'rb'],
    }
    let lex = RiTa.lexicon();
    Object.keys(toAdd).forEach(w => RiTa.lexicon().data[w] = toAdd[w]);
    expect(lex.hasWord("run"));
    expect(lex.hasWord("walk"));
    expect(lex.hasWord("deg"));
    expect(lex.hasWord("wadly"));
    expect(lex.isAlliteration("wadly", "welcome"));
    Object.keys(toAdd).forEach(w => delete RiTa.lexicon().data[w]);
  });

  it("Should handle a custom lexicon", function () {

    let lex = RiTa.lexicon();
    let orig = lex.data;
    lex.data = {
      'dog': ['d-ao1-g', 'nn'],
      'cat': ['k-ae1-t', 'nn'],
      'happily': ['hh-ae1 p-ah l-iy', 'rb'],
      'walk': ['w-ao1-k', 'vb vbp nn'],
      'welcome': ['w-eh1-l k-ah-m', 'jj nn vb vbp'],
      'sadly': ['s-ae1-d l-iy', 'rb'],
    }

    expect(lex.hasWord("run")).to.be.false;
    expect(lex.hasWord("walk")).to.be.true;
    expect(lex.isAlliteration("walk", "welcome")).to.be.true;
    lex.data = orig;
  });

  it('Should call randomWord with pos', function () {

    expect(() => RiTa.randomWord({ pos: "xxx" })).to.throw;

    let result, pos = ["nn", "jj", "jjr", "wp"];
    for (let j = 0; j < pos.length; j++) {
      result = RiTa.randomWord({ pos: pos[j] });
      let best = RiTa.tagger.allTags(result)[0];
      //console.log(result+": "+pos[j]+" ?= "+best);
      expect(pos[j]).eq(best, result);
    }

    ////////////////////////////////////////////////////////////////////////

    for (let i = 0; i < 5; i++) {
      result = RiTa.randomWord({ pos: "nns" });
      if (!RiTa.inflector.isPlural(result)) {
        // For now, just warn here as there are too many edge cases (see #521)
        console.warn("Pluralize/Singularize problem: randomWord(nns) was '" + result + "' (" +
          "isPlural=" + RiTa.inflector.isPlural(result) + "), singularized is '" + RiTa.singularize(result) + "'");
      }
      // TODO: occasional problem here, examples: beaux

      //No nn & vbg, No -ness, -ism
      let pos = RiTa.lexicon()._posData(result);
      expect(!pos || pos.indexOf("vbg") < 0, "randomWord nns: " + result).to.be.true;
      expect(!result.endsWith("ness"), "randomWord nns: " + result).to.be.true;
      expect(!result.endsWith("isms"), "randomWord nns: " + result).to.be.true;
    }

    ////////////////////////////////////////////////////////////////////////

    result = RiTa.randomWord({ pos: "v" });
    expect(result.length > 0, "randomWord v=" + result).to.be.true;

    result = RiTa.randomWord({ pos: "nn" });
    expect(result.length > 0, "randomWord nn: " + result).to.be.true;

    result = RiTa.randomWord({ pos: "nns" });
    expect(result.length > 0, "randomWord nns=" + result).to.be.true;

    result = RiTa.randomWord({ pos: "n" });
    expect(result.length > 0, "randomWord n=" + result).to.be.true;

    result = RiTa.randomWord({ pos: "v" });
    expect(result.length > 0, "randomWord v=" + result).to.be.true;

    result = RiTa.randomWord({ pos: "rp" });
    expect(result.length > 0, "randomWord rp=" + result).to.be.true;

    let results = [];
    for (let i = 0; i < 10; i++) {
      results.push(RiTa.randomWord({ pos: "nns" }));
    }
    expect(results.length === 10).to.be.true;

    let i = 0;
    while (i < results.length - 1) {
      if (results[i] === results[i + 1]) {
        results.splice(i, 1);
      } else {
        i++;
      }
    }
    expect(results.length > 1).to.be.true; // 10 words not the same
  });

  it('Should call randomWord with syllables', function () {

    let i, result, syllables, num;
    result = RiTa.randomWord({ numSyllables: 3 });
    syllables = RiTa.syllables(result);
    num = syllables.split(RiTa.SYLLABLE_BOUNDARY).length;
    expect(result.length > 0, 'failed1 on: ' + result).to.be.true;
    expect(num === 3, result + ": " + syllables).to.be.true; // "3 syllables: "

    result = RiTa.randomWord({ numSyllables: 5 });
    syllables = RiTa.syllables(result);
    num = syllables.split(RiTa.SYLLABLE_BOUNDARY).length;
    expect(result.length).gt(0, 'failed2 on ' + result);
    expect(num === 5, result + ": " + syllables).to.be.true; // "5 syllables: "
  });

  it('Should call search without regex', function () {

    //expect(RiTa.search().length).gt(20000); // all words
    expect(RiTa.search({ limit: 11 }).length).eq(11);
    expect(RiTa.search({ pos: "n" })).eql([
      'abalone', 'abandonment',
      'abbey', 'abbot',
      'abbreviation', 'abdomen',
      'abduction', 'aberration',
      'ability', 'abnormality'
    ]);

    expect(RiTa.search({ numSyllables: 2 })).eql([
      'abashed', 'abate',
      'abbey', 'abbot',
      'abet', 'abhor',
      'abide', 'abject',
      'ablaze', 'able'
    ]);

    expect(RiTa.search({ numSyllables: 2, pos: 'n' })).eql([
      'abbey', 'abbot',
      'abode', 'abscess',
      'absence', 'abstract',
      'abuse', 'abyss',
      'accent', 'access'
    ]);
    //console.log(RiTa.search({ numSyllables: 1, pos: 'n' }));
    expect(RiTa.search({ numSyllables: 1, pos: 'n' })).eql([
      'ace', 'ache',
      'act', 'age',
      'aid', 'aide',
      'aim', 'air',
      'aisle', 'ale'
    ]);

    let search = RiTa.search({ pos: "vb", limit: -1 });
    expect(search.includes("concerned")).to.be.false;
    expect(search.includes("committed")).to.be.false;
    expect(search.includes("called")).to.be.false;
    expect(search.includes("computerized")).to.be.false;

    search = RiTa.search({ pos: "vbd", limit: -1});
    expect(search.includes("concerned")).to.be.true;
    expect(search.includes("committed")).to.be.true;
    expect(search.includes("called")).to.be.true;
    expect(search.includes("computerized")).to.be.true;
    0 && expect(search.includes("conclude")).to.be.true;

   search = RiTa.search({ pos: "vbn", limit: -1 });
    expect(search.includes("concerned")).to.be.true;
    expect(search.includes("committed")).to.be.true;
    expect(search.includes("called")).to.be.true;
    expect(search.includes("computerized")).to.be.true;
    0 && expect(search.includes("conclude")).to.be.true;

  });

  it('Should call search with letters', function () {

    expect(RiTa.search("phant")).eql([
      'elephant',
      'elephantine',
      'phantom',
      'sycophantic',
      'triumphant',
      'triumphantly'
    ]);
    expect(RiTa.search(/phant/)).eql([
      'elephant',
      'elephantine',
      'phantom',
      'sycophantic',
      'triumphant',
      'triumphantly'
    ]);
    expect(RiTa.search({ regex: "phant" })).eql([
      'elephant',
      'elephantine',
      'phantom',
      'sycophantic',
      'triumphant',
      'triumphantly'
    ]);
    expect(RiTa.search({ regex: /phant/ })).eql([
      'elephant',
      'elephantine',
      'phantom',
      'sycophantic',
      'triumphant',
      'triumphantly'
    ]);
  });

  it('Should call search with phones, limit', function () {

    // omitting no limit tests as they are a bit slow
    let result = RiTa.search(/f-a[eh]-n-t/, { type: 'phones', limit: 10 });
    expect(result).eql([
      "elephant",
      "elephantine",
      "fantasia",
      "fantasize",
      "fantastic",
      "fantastically",
      "fantasy",
      "infant",
      "infantile",
      "infantry"
    ]);

    result = RiTa.search('f-ah-n-t', { type: 'phones', limit: 5 });
    expect(result).eql([
      'elephant',
      'infant',
      'infantile',
      'infantry',
      "oftentimes"
    ]);

    //regex in options
    result = RiTa.search({ regex: /f-a[eh]-n-t/, type: 'phones', limit: 10 });
    expect(result).eql([
      "elephant",
      "elephantine",
      "fantasia",
      "fantasize",
      "fantastic",
      "fantastically",
      "fantasy",
      "infant",
      "infantile",
      "infantry"
    ]);
  });

  it('Should call search with phones no limit and shuffle', function () {
    let result = RiTa.search({ regex: 'f-ah-n-t', type: 'phones', limit: -1 });
    expect(result).eql([
      'elephant',
      'infant',
      'infantile',
      'infantry',
      "oftentimes",
      "triumphant",
      "triumphantly"
    ]);
    
    let result2 = RiTa.search({ regex: 'f-ah-n-t', type: 'phones', limit: -1, shuffle: true });
    expect(result2.sort()).eql(result);
  });

  it('Should call search with pos, phones, sylls, limit', function () {

    expect(RiTa.search('f-ah-n-t', { type: 'phones', pos: 'n', limit: 3, numSyllables: 2 }))
      .eql(['infant']);
  });

  it('Should call search with pos, phones, limit', function () {

    expect(RiTa.search('f-ah-n-t', { type: 'phones', pos: 'n', limit: 3 }))
      .eql(['elephant', 'infant', 'infantry']);

    expect(RiTa.search(/f-a[eh]-n-t/, { type: 'phones', pos: 'v', limit: 5 }))
      .eql(["fantasize"]);
  });

  it('Should call search with pos, letters', function () { // SYNC:
    let res = RiTa.search('cause', { pos: 'nns' });
    expect(res).eql([ 'causes','causeways']);

    res = RiTa.search(/cares$/, { pos: 'nns', limit: -1 });
    expect(res).eql([ 'cares', 'scares']);

    res = RiTa.search(/^rice$/, { pos: 'nns', limit: -1 });
    expect(res).eql([ 'rice']);

    //https://github.com/dhowe/rita/issues/177
   res = RiTa.search('gain', { pos: "vbd", numSyllables: 1});
   expect(res).eql([ 'gained']);
   res = RiTa.search('end', { pos: "vbd", minLength: 2 , limit: -1 });
   expect(res.includes("ended")).to.be.true;
   res = RiTa.search('commit', { pos: "vbd" });
   expect(res.includes("committed")).to.be.true;
   res = RiTa.search('involve', { pos: "vbd"});  
   expect(res.includes("involved")).to.be.true;
    res = RiTa.search('outpace', { pos: "vbn" });
    expect(res).eql([ 'outpaced']);
    res = RiTa.search('paid', { pos: "vbd" });
    expect(res.includes("prepaid")).to.be.true;
    res = RiTa.search('made', { pos: "vbd"});
    expect(res.includes("remade")).to.be.true;
    res = RiTa.search('re', { pos: "vbd", limit: -1 });
    expect(res.includes("reopened")).to.be.true;
    expect(res.includes("resold")).to.be.true;
  });

  it('Should call search with simple pos, phones, limit', function () {

    expect(RiTa.search(/f-a[eh]-n-t/, { type: 'phones', pos: 'vb', limit: 5 }))
      .eql(["fantasize"]);

    expect(RiTa.search('f-ah-n-t', { type: 'phones', pos: 'nns', limit: 3 }))
      .eql(['elephants', 'infants', 'infantries']);
  });

  it('Should call search with pos, stress, limit', function () {

    expect(RiTa.search('010', { type: 'stresses', limit: 5, pos: 'n' }))
      .eql(['abalone', 'abandonment', 'abbreviation', 'abdomen', 'abduction']);

    expect(RiTa.search('010', { type: 'stresses', limit: 5, pos: 'n', numSyllables: 3 }))
      .eql(['abdomen', 'abduction', 'abortion', 'abruptness', 'absorber']);

    expect(RiTa.search('010', { type: 'stresses', limit: 5, pos: 'nns' }))
      .eql(['abalone',
        'abandonments',
        'abbreviations',
        'abductions',
        'abilities']);

    expect(RiTa.search(/0\/1\/0/, { type: 'stresses', limit: 5, pos: 'nns' }))
      .eql(['abalone',
        'abandonments',
        'abbreviations',
        'abductions',
        'abilities']);

    expect(RiTa.search('010', { type: 'stresses', limit: 5, pos: 'nns', numSyllables: 3 }))
      .eql(['abductions',
        'abortions',
        'absorbers',
        'abstentions',
        'abstractions']);
  });

  it('Should call search with stresses, limit', function () {

    expect(RiTa.search('010000', { type: 'stresses', limit: 5 })).eql([
      'accountability',
      'anticipatory',
      'appreciatively',
      'authoritarianism',
      'colonialism'
    ]);

    expect(RiTa.search('010000', { type: 'stresses', limit: 5, maxLength: 11 })).eql([
      'colonialism',
      "imperialism",
      "materialism"
    ]);
    expect(RiTa.search('010000', { type: 'stresses', limit: 5, minLength: 12 })).eql([
      'accountability',
      'anticipatory',
      'appreciatively',
      'authoritarianism',
      "conciliatory"
    ]);
    expect(RiTa.search('0/1/0/0/0/0', { type: 'stresses', limit: 5 })).eql([
      'accountability',
      'anticipatory',
      'appreciatively',
      'authoritarianism',
      'colonialism'
    ]);
    expect(RiTa.search({ regex: '010000', type: 'stresses', limit: 5 })).eql([
      'accountability',
      'anticipatory',
      'appreciatively',
      'authoritarianism',
      'colonialism'
    ]);

    expect(RiTa.search({ regex: '010000', type: 'stresses', limit: 5, maxLength: 11 })).eql([
      'colonialism',
      "imperialism",
      "materialism"
    ]);
    expect(RiTa.search({ regex: '010000', type: 'stresses', limit: 5, minLength: 12 })).eql([
      'accountability',
      'anticipatory',
      'appreciatively',
      'authoritarianism',
      "conciliatory"
    ]);
    expect(RiTa.search({ regex: '0/1/0/0/0/0', type: 'stresses', limit: 5 })).eql([
      'accountability',
      'anticipatory',
      'appreciatively',
      'authoritarianism',
      'colonialism'
    ]);
  });

  it('Should call search with stress regex, limit', function () {

    expect(RiTa.search(/0\/1\/0\/0\/0\/0/, { type: 'stresses', limit: 5 })).eql([
      'accountability',
      'anticipatory',
      'appreciatively',
      'authoritarianism',
      'colonialism'
    ]);

    //regex in options

    expect(RiTa.search({ regex: /0\/1\/0\/0\/0\/0/, type: 'stresses', limit: 5 })).eql([
      'accountability',
      'anticipatory',
      'appreciatively',
      'authoritarianism',
      'colonialism'
    ]);
  });

  it('Should call randomWord.pos.syls', function () {

    function fail(result, epos) {
      let test = result.endsWith('es') ? result.substring(-2) : result;
      let ent = RiTa.lexicon()[test];
      return ('(' + epos + ') Fail: ' + result + ': expected ' + epos + ', got ' + (ent ? ent[1] : 'null'));
    }
    let result, syllables;

    result = RiTa.randomWord({ numSyllables: 3, pos: "vbz" });
    //console.log(result);
    expect(result.length > 0, "randomWord vbz: " + result).to.be.true;
    syllables = RiTa.syllables(result);
    expect(syllables.split(RiTa.SYLLABLE_BOUNDARY).length).eq(3, "GOT: " + result + ' (' + syllables + ')');
    expect(RiTa.isVerb(result)).eq(true, fail(result, 'vbz'));

    result = RiTa.randomWord({ numSyllables: 1, pos: "n" });
    expect(result.length > 0, "randomWord n: " + result).to.be.true;
    syllables = RiTa.syllables(result);
    expect(syllables.split(RiTa.SYLLABLE_BOUNDARY).length).eq(1, "GOT: " + result + ' (' + syllables + ')');
    expect(RiTa.isNoun(result)).eq(true, fail(result, 'n'));

    result = RiTa.randomWord({ numSyllables: 1, pos: "nns" });
    expect(result.length > 0, "randomWord nns: " + result).to.be.true;
    syllables = RiTa.syllables(result);
    expect(syllables.split(RiTa.SYLLABLE_BOUNDARY).length).eq(1, "GOT: " + result + ' (' + syllables + ')');
    expect(RiTa.isNoun(result)).eq(true, fail(result, 'nns'));
    // TODO: still failing occasionally on: proves, torpedoes, strives, times, etc. ?

    result = RiTa.randomWord({ numSyllables: 5, pos: "nns" });
    expect(result.length > 0, "randomWord nns: " + result).to.be.true;
    syllables = RiTa.syllables(result);
    let count = syllables.split(RiTa.SYLLABLE_BOUNDARY).length;
    if (count !== 5) console.warn("Syllabifier problem: "
      + result + ".syllables was " + count + ', expected 5');
    expect(RiTa.isNoun(result)).eq(true, fail(result, 'nns'));
  });

  it('Should call alliterations.numSyllables', function () {

    let result = RiTa.alliterations("cat", { minLength: 1, numSyllables: 7 });
    expect(result).eql(['electrocardiogram', 'electromechanical', 'telecommunications']);
    for (let i = 0; i < result.length; i++) {
      expect(RiTa.isAlliteration(result[i], "cat"), 'FAIL2: ' + result[i]).to.be.true;
    }
  });

  it('Should call alliterations.pos', function () {

    let res;

    res = RiTa.alliterations("cat", { numSyllables: 7, pos: 'n' });
    expect(res).eql(['electrocardiogram', 'telecommunications']);
    for (let i = 0; i < res.length; i++) {
      expect(RiTa.isAlliteration(res[i], "cat"), 'FAIL2: ' + res[i]).to.be.true;
    }

    res = RiTa.alliterations("dog", { minLength: 14, pos: 'v' });
    res.forEach(r => expect(r.length >= 14).to.be.true);
    expect(res).eql(['disenfranchise']);

    res = RiTa.alliterations("dog", { minLength: 13, pos: 'rb', limit: 11 });
    res.forEach(r => expect(r.length >= 13).to.be.true);
    expect(res).eql([
      'coincidentally',
      'conditionally',
      'confidentially',
      'contradictorily',
      'devastatingly',
      'expeditiously',
      'paradoxically',
      'predominantly',
      'traditionally',
      'unconditionally',
      'unpredictably'
    ]);

    res = RiTa.alliterations("freedom", { minLength: 14, pos: 'nns' });
    res.forEach(r => expect(r.length >= 14).to.be.true);
    //console.log(res);
    expect(res).eql([
      'featherbeddings',
      'fundamentalists',
      'pharmaceuticals',
      'photosyntheses',
      'reconfigurations',
      'sophistications'
    ]);
  });

  it('Should call alliterations', function () {

    let result;

    result = RiTa.alliterations("", { silent: 1 });
    expect(result.length < 1).to.be.true;

    result = RiTa.alliterations("#$%^&*", { silent: 1 });
    expect(result.length < 1).to.be.true;

    result = RiTa.alliterations("umbrella", { silent: 1 });
    expect(result.length < 1, "failed on 'umbrella'").to.be.true;

    result = RiTa.alliterations("cat", { limit: 100 });
    expect(result.length === 100, "failed on 'cat'").to.be.true;
    expect(result.includes("cat")).to.be.false;
    for (let i = 0; i < result.length; i++) {
      expect(RiTa.isAlliteration(result[i], "cat")).to.be.true;
    }

    result = RiTa.alliterations("dog", { limit: 100 });
    expect(result.includes("dog")).to.be.false;
    expect(result.length === 100, "failed on 'dog'").to.be.true;
    for (let i = 0; i < result.length; i++) {
      expect(RiTa.isAlliteration(result[i], "dog")).to.be.true;
    }

    result = RiTa.alliterations("dog", { minLength: 15 });
    expect(result.length > 0 && result.length < 5, "got length=" + result.length).to.be.true;
    for (let i = 0; i < result.length; i++) {
      expect(RiTa.isAlliteration(result[i], "dog"), 'FAIL1: ' + result[i]).to.be.true;
    }

    result = RiTa.alliterations("cat", { minLength: 16 });
    expect(result.length > 0 && result.length < 15, "failed on 'cat'").to.be.true;
    for (let i = 0; i < result.length; i++) {
      expect(RiTa.isAlliteration(result[i], "cat"), 'FAIL2: ' + result[i]).to.be.true;
    }

    result = RiTa.alliterations("khatt", { minLength: 16 });
    //console.log(RiTa.alliterations("khatt", { minLength: 16 }));

    expect(result.length > 0 && result.length < 15, "failed on 'khatt'").to.be.true;
    for (let i = 0; i < result.length; i++) {
      expect(RiTa.isAlliteration(result[i], "cat"), 'FAIL2: ' + result[i]).to.be.true;
    }

    // for one letter words should return []
    expect(RiTa.alliterations("a")).eql([]);
    expect(RiTa.alliterations("I")).eql([]);
    expect(RiTa.alliterations("K")).eql([]);

  });

  it('Should call rhymes', function () {

    expect(RiTa.rhymes("cat").length).eq(10);
    expect(RiTa.rhymes("cat").includes("hat")).to.be.true;
    expect(RiTa.rhymes("yellow").includes("mellow")).to.be.true;
    expect(RiTa.rhymes("toy").includes("boy")).to.be.true;
    expect(RiTa.rhymes("crab").includes("drab")).to.be.true;

    expect(RiTa.rhymes("mouse").includes("house")).to.be.true;
    expect(RiTa.rhymes("apple").includes("polo")).to.be.false;
    expect(RiTa.rhymes("this").includes("these")).to.be.false;

    expect(RiTa.rhymes("hose").includes("house")).to.be.false;
    expect(RiTa.rhymes("sieve").includes("mellow")).to.be.false;
    expect(RiTa.rhymes("swag").includes("grab")).to.be.false;

    expect(RiTa.rhymes("weight", { limit: 1000 }).includes("eight")).to.be.true;
    expect(RiTa.rhymes("eight", { limit: 1000 }).includes("weight")).to.be.true;
    expect(RiTa.rhymes("sieve", { limit: 1000 }).includes("give")).to.be.true;
    expect(RiTa.rhymes("shore", { limit: 1000 }).includes("more")).to.be.true;
    expect(RiTa.rhymes("tense", { limit: 1000 }).includes("sense")).to.be.true;

    expect(RiTa.rhymes("bog").includes("fog")).to.be.true;
    expect(RiTa.rhymes("dog").includes("log")).to.be.true;

    // for single letter word return []
    expect(RiTa.rhymes("a")).eql([]);
    expect(RiTa.rhymes("I")).eql([]);
    expect(RiTa.rhymes("Z")).eql([]);
    expect(RiTa.rhymes("B")).eql([]);
    expect(RiTa.rhymes("K")).eql([]);
  });

  it('Should call rhymes.pos', function () {

    expect(RiTa.rhymes("cat", { pos: 'v' }).includes("hat")).to.be.false;
    expect(RiTa.rhymes("yellow", { pos: 'a' }).includes("mellow")).to.be.true;
    expect(RiTa.rhymes("toy", { pos: 'n' }).includes("boy")).to.be.true;
    expect(RiTa.rhymes("sieve", { pos: 'n' }).includes("give")).to.be.false;

    expect(RiTa.rhymes("tense", { pos: 'v' }).includes("condense")).to.be.true;
    expect(RiTa.rhymes("crab", { pos: 'n' }).includes("drab")).to.be.false;
    expect(RiTa.rhymes("shore", { pos: 'v' }).includes("more")).to.be.false;

    expect(RiTa.rhymes("mouse", { pos: 'nn' }).includes("house")).to.be.true;

    expect(RiTa.rhymes("weight", { pos: 'vb' }).includes("eight")).to.be.false;
    expect(RiTa.rhymes("eight", { pos: 'nn', limit: 1000 }).includes("weight")).to.be.true;

    expect(RiTa.rhymes("apple", { pos: 'v' }).includes("polo")).to.be.false;
    expect(RiTa.rhymes("this", { pos: 'v' }).includes("these")).to.be.false;

    expect(RiTa.rhymes("hose", { pos: 'v' }).includes("house")).to.be.false;
    expect(RiTa.rhymes("sieve", { pos: 'v' }).includes("mellow")).to.be.false;
    expect(RiTa.rhymes("swag", { pos: 'v' }).includes("grab")).to.be.false;

    //https://github.com/dhowe/rita/issues/177
    let rhyme = RiTa.rhymes("spreads", { pos: 'vbz', limit: 1000 });
    expect(rhyme.includes("discriminateds")).to.be.false;
    expect(rhyme.includes("endeds")).to.be.false;
    expect(rhyme.includes("finisheds")).to.be.false;
    expect(rhyme.includes("reporteds")).to.be.false;
    expect(rhyme.includes("proliferateds")).to.be.false;
    expect(rhyme.includes("outpaceds")).to.be.false;
    expect(rhyme.includes("liveds")).to.be.false;
    expect(RiTa.rhymes("hit", { pos: 'vb' }).includes("bit")).to.be.false;
    expect(RiTa.rhymes("hit", { pos: 'vbd' }).includes("bit")).to.be.true;
    expect(RiTa.rhymes("stroke", { pos: 'vb' }).includes("broke")).to.be.false;
    expect(RiTa.rhymes("stroke", { pos: 'vbd' }).includes("broke")).to.be.true;
    expect(RiTa.rhymes("evolved", { pos: 'vb' }).includes("involved")).to.be.false;
    expect(RiTa.rhymes("evolved", { pos: 'vbd' }).includes("involved")).to.be.true;
  });

  it('Should call rhymes.pos.nid', function () {

    // special case, where word is not in dictionary
    let rhymes = RiTa.rhymes("abated", { pos: 'vbd', limit: 1000 });
    expect(rhymes.includes("allocated")).to.be.true;
    expect(rhymes.includes("annihilated")).to.be.true;
    expect(rhymes.includes("condensed")).to.be.false;
  });

  it('Should call rhymes.numSyllables', function () {

    expect(RiTa.rhymes("cat", { numSyllables: 1 }).includes("hat")).to.be.true;
    expect(RiTa.rhymes("cat", { numSyllables: 2 }).includes("hat")).to.be.false;
    expect(RiTa.rhymes("cat", { numSyllables: 3 }).includes("hat")).to.be.false;

    expect(RiTa.rhymes("yellow", { numSyllables: 2 }).includes("mellow")).to.be.true;
    expect(RiTa.rhymes("yellow", { numSyllables: 3 }).includes("mellow")).to.be.false;

    // special case, where word is not in dictionary
    let rhymes = RiTa.rhymes("abated", { numSyllables: 3 });
    expect(rhymes.includes("elated")).to.be.true;
    expect(rhymes.includes("abated")).to.be.false;
    expect(rhymes.includes("allocated")).to.be.false;
    expect(rhymes.includes("condensed")).to.be.false;
  });

  it('Should call rhymes.wordlength', function () {

    expect(RiTa.rhymes("cat", { minLength: 4 }).includes("hat")).to.be.false;
    expect(RiTa.rhymes("cat", { maxLength: 2 }).includes("hat")).to.be.false;

    // special case, where word is not in dictionary
    let rhymes = RiTa.rhymes("abated", { pos: 'vbd', maxLength: 9 });
    expect(rhymes.includes("allocated")).to.be.true;
    expect(rhymes.includes("annihilated")).to.be.false;
    expect(rhymes.includes("condensed")).to.be.false;
  });

  it('Should call spellsLike', function () {
    let result;

    result = RiTa.spellsLike("");
    eql(result, []);

    result = RiTa.spellsLike("banana");
    eql(result, ["banal", "bonanza", "cabana", "manna"]);

    result = RiTa.spellsLike("tornado");
    eql(result, ["torpedo"]);

    result = RiTa.spellsLike("ice");
    eql(result, [
      'ace', 'dice',
      'iced', 'icy',
      'ire', 'lice',
      'nice', 'rice',
      'vice'
    ]);
  });

  0 && it('Should call spellsLike.minLimit', function () { // not implemented
    let result;

    result = RiTa.spellsLike("");
    eql(result, []);

    result = RiTa.spellsLike("banana", { minLimit: 5 });
    eql(result, ['angina', 'arena', 'bacon', 'balance', 'ban']);

    result = RiTa.spellsLike("tornado", { minLimit: 10 });
    eql(result, [
      'condo', 'forbade',
      'horned', 'ornate',
      'thread', 'tirade',
      'toad', 'toenail',
      'tomato', 'tonal']);

    result = RiTa.spellsLike("ice", { minLimit: 4 });
    eql(result, [
      'ace', 'dice',
      'iced', 'icy',
      'ire', 'lice',
      'nice', 'rice',
      'vice'
    ]);
  });

  it('Should call spellsLike.options', function () {

    let result;

    result = RiTa.spellsLike("banana", { minLength: 6, maxLength: 6 });
    eql(result, ["cabana"]);

    result = RiTa.spellsLike("banana", { minLength: 6, maxLength: 6 });
    eql(result, ["cabana"]);

    result = RiTa.spellsLike("banana", { minDistance: 1 });
    eql(result, ["banal", "bonanza", "cabana", "manna"]);

    result = RiTa.spellsLike("ice", { maxLength: 3 });
    eql(result, ['ace', 'icy', 'ire']);

    result = RiTa.spellsLike("ice", {
      minDistance: 2, minLength: 3, maxLength: 3, limit: 1000
    });
    result.forEach(r => expect(r.length == 3).to.be.true);
    expect(result.length > 10).to.be.true;

    result = RiTa.spellsLike("ice", { minDistance: 0, minLength: 3, maxLength: 3 });
    eql(result, ["ace", "icy", "ire"]);

    result = RiTa.spellsLike("ice", { minLength: 3, maxLength: 3 });
    result.forEach(r => expect(r.length === 3).to.be.true);
    eql(result, ["ace", "icy", "ire"]);

    result = RiTa.spellsLike("ice", { minLength: 3, maxLength: 3, pos: 'n' });
    result.forEach(r => expect(r.length === 3).to.be.true);
    eql(result, ["ace", "ire"]);

    //console.log(RiTa.spellsLike("ice", {  minLength: 4, maxLength: 4, pos: 'nns', limit: 5 }));

    result = RiTa.spellsLike("ice", {
      minLength: 4, maxLength: 4, pos: 'v', limit: 5
    });
    result.forEach(r => expect(r.length === 4).to.be.true);
    eql(result, ['ache', 'bide', 'bite', 'cite', 'dine']);

    result = RiTa.spellsLike("ice", { // dice, rice ??
      minLength: 4, maxLength: 4, pos: 'nns', limit: 5
    });
    result.forEach(r => expect(r.length === 4).to.be.true);
    eql(result, ['dice', 'rice']);

    result = RiTa.spellsLike("ice", {
      minLength: 4, maxLength: 4, pos: 'nns', minDistance: 3, limit: 5
    });

    result.forEach(r => expect(r.length === 4).to.be.true);
    eql(result, ['axes', 'beef', 'deer', 'dibs', 'fame']);

    // special case, where word is not in dictionary
    result = RiTa.spellsLike("abated", { pos: 'vbd' });
    expect(result.includes("abetted")).to.be.true;
    expect(result.includes("aborted")).to.be.true;
    expect(result.includes("condensed")).to.be.false;

    //https://github.com/dhowe/rita/issues/177
    expect( RiTa.spellsLike("lined", { pos: 'vb' }).includes("lived")).to.be.false;
    expect( RiTa.spellsLike("lined", { pos: 'vbd' }).includes("lived")).to.be.true;
    expect( RiTa.spellsLike("let", { pos: 'vb' }).includes("led")).to.be.false;
    expect( RiTa.spellsLike("let", { pos: 'vbd' }).includes("led")).to.be.true;
    expect( RiTa.spellsLike("brake", { pos: 'vb' }).includes("broke")).to.be.false;
    expect( RiTa.spellsLike("brake", { pos: 'vbd' }).includes("broke")).to.be.true;
    expect( RiTa.spellsLike("overseas", { pos: 'vb' }).includes("oversaw")).to.be.false;
    expect( RiTa.spellsLike("overseas", { pos: 'vbd' }).includes("oversaw")).to.be.true;

    let rhyme = RiTa.spellsLike("spreads", { pos: 'vbz', limit: 1000 });
    expect(rhyme.includes("discriminateds")).to.be.false;
    expect(rhyme.includes("endeds")).to.be.false;
    expect(rhyme.includes("finisheds")).to.be.false;
    expect(rhyme.includes("reporteds")).to.be.false;
    expect(rhyme.includes("proliferateds")).to.be.false;
    expect(rhyme.includes("outpaceds")).to.be.false;
    expect(rhyme.includes("lived")).to.be.false;
  });

  it('Should call soundsLike', function () {

    eql(RiTa.soundsLike("tornado", { type: 'sound' }), ["torpedo"]);

    let result = RiTa.soundsLike("try", { limit: 20 });
    let answer = ["cry", "dry", "fry", "pry", "rye", "tie", "tray", "tree", "tribe", "tried", "tripe", "trite", "true", "wry"];
    eql(result, answer);

    result = RiTa.soundsLike("try", { minDistance: 2, limit: 20 });
    expect(result.length > answer.length).to.be.true; // more

    result = RiTa.soundsLike("happy");
    eql(result, answer = ["happier", "hippie"]);

    result = RiTa.soundsLike("happy", { minDistance: 2 });
    expect(result.length > answer.length).to.be.true; // more

    result = RiTa.soundsLike("cat", { type: 'sound' });
    eql(result, [
      'bat', 'cab',
      'cache', 'calf',
      'calve', 'can',
      "can't", 'cap',
      'cash', 'cast'
    ]);

    result = RiTa.soundsLike("cat", { type: 'sound', limit: 5 });
    eql(result, ['bat', 'cab', 'cache', 'calf', 'calve']);

    result = RiTa.soundsLike("cat", { type: 'sound', limit: 1000, minLength: 2, maxLength: 4 });
    eql(result, ["at", "bat", "cab", "calf", "can", "cap", "cash", "cast", "chat", "coat", "cot", "curt", "cut", "fat", "hat", "kit", "kite", "mat", "matt", "pat", "rat", "sat", "that", "vat"]);

    //console.log(RiTa.soundsLike("cat", { type: 'sound', minLength: 4, maxLength: 5, pos: 'jj', limit: 8 }));

    result = RiTa.soundsLike("cat", { type: 'sound', minLength: 4, maxLength: 5, pos: 'jj' });
    eql(result, answer = ['catty', 'curt']);

    result = RiTa.soundsLike("cat", { minDistance: 2 });
    expect(result.length > answer.length).to.be.true;

    result = RiTa.soundsLike("abated", { pos: 'vbd' });
    expect(result.includes("abetted")).to.be.true;
    expect(result.includes("debated")).to.be.true;
    expect(result.includes("condensed")).to.be.false;

    //https://github.com/dhowe/rita/issues/177
    expect(RiTa.soundsLike("build", { pos: 'vb' ,limit: 1000}).includes("built")).to.be.false;
    expect(RiTa.soundsLike("computerize", { pos: 'vb',limit: 1000 }).includes("computerized")).to.be.false;
    expect(RiTa.soundsLike("concern", { pos: 'vb' }).includes("concerned")).to.be.false;
    expect(RiTa.soundsLike("commit", { pos: 'vb' }).includes("committed")).to.be.false;
    expect(RiTa.soundsLike("involve", { pos: 'vb' }).includes("involved")).to.be.false;
    expect(RiTa.soundsLike("grained", { pos: 'vb' }).includes("gained")).to.be.false;
    
    expect(RiTa.soundsLike("premade", { pos: 'vbd' }).includes("remade")).to.be.true;
    expect(RiTa.soundsLike("incriminate", { pos: 'vbd' }).includes("discriminated")).to.be.true;
    expect(RiTa.soundsLike("paunched", { pos: 'vbd' }).includes("launched")).to.be.true;
  });

  it('Should call soundsLike().matchSpelling', function () {

    let result;
    result = RiTa.soundsLike("try", { matchSpelling: true });
    eql(result, ['cry', 'dry', 'fry', 'pry', 'tray']);

    result = RiTa.soundsLike("try", { matchSpelling: true, maxLength: 3 });
    eql(result, ["cry", "dry", "fry", "pry", "wry"]);

    result = RiTa.soundsLike("try", { matchSpelling: true, minLength: 4 });
    eql(result, ["tray"]);

    result = RiTa.soundsLike("try", { matchSpelling: true, limit: 3 });
    eql(result, ["cry", "dry", "fry"]);

    result = RiTa.soundsLike("daddy", { matchSpelling: true });
    eql(result, ["dandy", "paddy"]);

    result = RiTa.soundsLike("banana", { matchSpelling: true });
    eql(result, ["bonanza"]);

    result = RiTa.soundsLike("abated", { pos: 'vbd', matchSpelling: true });
    expect(result.length).eql(2);
    expect(result.includes("abetted")).to.be.true;
    expect(result.includes("awaited")).to.be.true;
  });

  it('Should call isRhyme', function () {

    expect(!RiTa.isRhyme("apple", "polo")).to.be.true;
    expect(!RiTa.isRhyme("this", "these")).to.be.true;

    expect(RiTa.isRhyme("cat", "hat")).to.be.true;
    expect(RiTa.isRhyme("yellow", "mellow")).to.be.true;
    expect(RiTa.isRhyme("toy", "boy")).to.be.true;

    expect(RiTa.isRhyme("solo", "tomorrow")).to.be.true;
    expect(RiTa.isRhyme("tense", "sense")).to.be.true;
    expect(RiTa.isRhyme("crab", "drab")).to.be.true;
    expect(RiTa.isRhyme("shore", "more")).to.be.true;
    expect(!RiTa.isRhyme("hose", "house")).to.be.true;
    expect(!RiTa.isRhyme("sieve", "mellow")).to.be.true;

    expect(RiTa.isRhyme("mouse", "house")).to.be.true;
    // expect(!RiTa.isRhyme("solo", "yoyo")).to.be.true;  //why??
    // expect(!RiTa.isRhyme("yoyo", "jojo")).to.be.true; -> Known Issues

    expect(RiTa.isRhyme("yo", "bro")).to.be.true;
    expect(!RiTa.isRhyme("swag", "grab")).to.be.true;
    expect(!RiTa.isRhyme("", "")).to.be.true;

    expect(RiTa.isRhyme("weight", "eight")).to.be.true;
    expect(RiTa.isRhyme("eight", "weight")).to.be.true;

    expect(RiTa.isRhyme("abated", "debated")).to.be.true;

    // fail without lexicon
    if (typeof NOLEX !== 'undefined') {
      expect(RiTa.isRhyme("sieve", "give")).to.be.true;
    }
  });

  it('Should call isAlliteration', function () {

    expect(RiTa.isAlliteration("knife", "gnat")).to.be.true; // gnat=lts
    expect(RiTa.isAlliteration("knife", "naughty")).to.be.true;

    expect(RiTa.isAlliteration("sally", "silly")).to.be.true;
    expect(RiTa.isAlliteration("sea", "seven")).to.be.true;
    expect(RiTa.isAlliteration("silly", "seven")).to.be.true;
    expect(RiTa.isAlliteration("sea", "sally")).to.be.true;

    expect(RiTa.isAlliteration("big", "bad")).to.be.true;
    expect(RiTa.isAlliteration("bad", "big")).to.be.true; // swap position

    expect(RiTa.isAlliteration("BIG", "bad")).to.be.true; // CAPITAL LETTERS
    expect(RiTa.isAlliteration("big", "BAD")).to.be.true; // CAPITAL LETTERS
    expect(RiTa.isAlliteration("BIG", "BAD")).to.be.true; // CAPITAL LETTERS

    // False
    expect(!RiTa.isAlliteration("", "")).to.be.true;
    expect(!RiTa.isAlliteration("wind", "withdraw")).to.be.true;
    expect(!RiTa.isAlliteration("solo", "tomorrow")).to.be.true;
    expect(!RiTa.isAlliteration("solo", "yoyo")).to.be.true;
    expect(!RiTa.isAlliteration("yoyo", "jojo")).to.be.true;
    expect(!RiTa.isAlliteration("cat", "access")).to.be.true;

    expect(RiTa.isAlliteration("unsung", "sine")).to.be.true;
    expect(RiTa.isAlliteration("job", "gene")).to.be.true;
    expect(RiTa.isAlliteration("jeans", "gentle")).to.be.true;

    expect(RiTa.isAlliteration("abet", "better")).to.be.true;
    expect(RiTa.isAlliteration("never", "knight")).to.be.true;
    expect(RiTa.isAlliteration("knight", "navel")).to.be.true;
    expect(RiTa.isAlliteration("cat", "kitchen")).to.be.true;

    // not counting assonance
    expect(!RiTa.isAlliteration("octopus", "oblong")).to.be.true;
    expect(!RiTa.isAlliteration("omen", "open")).to.be.true;
    expect(!RiTa.isAlliteration("amicable", "atmosphere")).to.be.true;

    expect(RiTa.isAlliteration("abated", "abetted")).to.be.true;

    // fail without lexicon
    if (typeof NOLEX !== 'undefined') {
      expect(RiTa.isAlliteration("this", "these")).to.be.true;
      expect(RiTa.isAlliteration("psychology", "cholera")).to.be.true;
      expect(RiTa.isAlliteration("consult", "sultan")).to.be.true;
      expect(RiTa.isAlliteration("monsoon", "super")).to.be.true;
    }
  });

  0 && it("Should call.findStem", function () { // ??

    let lex = RiTa.lexicon();

    // stem in dict
    expect(lex.findStem("chang")).eq("change");
    expect(lex.findStem("accid")).eq("accident");
    expect(lex.findStem("accept")).eq("accept");
    expect(lex.findStem("bear")).eq("bear");
    expect(lex.findStem("bodi")).eq("bodied");
    expect(lex.findStem("book")).eq("book");
    expect(lex.findStem("box")).eq("box");
    expect(lex.findStem("across")).eq("across");
    expect(lex.findStem("activ")).eq("active");
    expect(lex.findStem("adulter")).eq("adulterer");
    expect(lex.findStem("allianc")).eq("alliance");
    expect(lex.findStem("beautifi")).eq("beautify");
    expect(lex.findStem("bestsel")).eq("bestseller");
    expect(lex.findStem("blond")).eq("blond");
    expect(lex.findStem("borderlin")).eq("borderline");
    expect(lex.findStem("brave")).eq("brave");
    expect(lex.findStem("calor")).eq("caloric");
    expect(lex.findStem("central")).eq("central");
    expect(lex.findStem("certifi")).eq("certified");
    expect(lex.findStem("choppi")).eq("choppy");
    expect(lex.findStem("cigarett")).eq("cigarette");
    expect(lex.findStem("cogniz")).eq("cognizant");
    expect(lex.findStem("delicatessen")).eq("delicatessen");
    expect(lex.findStem("disaffect")).eq("disaffected");
    expect(lex.findStem("dog")).eq("dog");
    expect(lex.findStem("drachma")).eq("drachma");
    expect(lex.findStem("dualism")).eq("dualism");
    expect(lex.findStem("dwell")).eq("dwell");
    expect(lex.findStem("earthenwar")).eq("earthenware");
    expect(lex.findStem("efficaci")).eq("efficacious");
    expect(lex.findStem("elus")).eq("elusive");
    expect(lex.findStem("emiss")).eq("emission");
    expect(lex.findStem("environment")).eq("environmental");
    expect(lex.findStem("fisherman")).eq("fisherman");
    expect(lex.findStem("fragil")).eq("fragile");
    expect(lex.findStem("fundamentalist")).eq("fundamentalist");
    expect(lex.findStem("futil")).eq("futile");
    expect(lex.findStem("fuzz")).eq("fuzz");
    expect(lex.findStem("garag")).eq("garage");
    expect(lex.findStem("gass")).eq("gass");
    expect(lex.findStem("govern")).eq("govern");
    expect(lex.findStem("groov")).eq("groove");
    expect(lex.findStem("guttur")).eq("guttural");
    expect(lex.findStem("hamburg")).eq("hamburger");
    expect(lex.findStem("haphazard")).eq("haphazard");
    expect(lex.findStem("haunt")).eq("haunt");
    expect(lex.findStem("headlong")).eq("headlong");
    expect(lex.findStem("hubbub")).eq("hubbub");
    expect(lex.findStem("hungrili")).eq("hungrily");
    expect(lex.findStem("hypoglycem")).eq("hypoglycemic");
  });

  0 && it("Should call findStem for words not in dict ", function () { // ?

    // correct stem but original word not in dict
    expect(lex.findStem("abut")).eq(undefined);
    expect(lex.findStem("airdrop")).eq(undefined);
    expect(lex.findStem("waylay")).eq(undefined);
    expect(lex.findStem("backslid")).eq(undefined);
    expect(lex.findStem("bejewel")).eq(undefined);
    expect(lex.findStem("blab")).eq(undefined);
    expect(lex.findStem("brutifi")).eq(undefined);
    expect(lex.findStem("bullwhip")).eq(undefined);
    expect(lex.findStem("catnap")).eq(undefined);
    expect(lex.findStem("clop")).eq(undefined);
    expect(lex.findStem("verbifi")).eq(undefined);
    expect(lex.findStem("dandifi")).eq(undefined);
    expect(lex.findStem("declassifi")).eq(undefined);
    expect(lex.findStem("disbar")).eq(undefined);
    expect(lex.findStem("disint")).eq(undefined);
    expect(lex.findStem("empanel")).eq(undefined);
    expect(lex.findStem("fib")).eq(undefined);
    expect(lex.findStem("flog")).eq(undefined);
    expect(lex.findStem("ghostwritten")).eq(undefined);
    expect(lex.findStem("glom")).eq(undefined);
    expect(lex.findStem("hypertrophi")).eq(undefined);
    expect(lex.findStem("interlaid")).eq(undefined);
    expect(lex.findStem("jut")).eq(undefined);
    expect(lex.findStem("miscarri")).eq(undefined);
    expect(lex.findStem("mortifi")).eq(undefined);
    expect(lex.findStem("overbid")).eq(undefined);
    expect(lex.findStem("overgrow")).eq(undefined);
    expect(lex.findStem("quickstep")).eq(undefined);
    expect(lex.findStem("recommit")).eq(undefined);
    expect(lex.findStem("rewound")).eq(undefined);
    expect(lex.findStem("scram")).eq(undefined);
    expect(lex.findStem("sightseen")).eq(undefined);
    expect(lex.findStem("skydov")).eq(undefined);
    expect(lex.findStem("unplug")).eq(undefined);
    expect(lex.findStem("stencil")).eq(undefined);
    expect(lex.findStem("spellbind")).eq(undefined);
    expect(lex.findStem("subjectifi")).eq(undefined);
    expect(lex.findStem("sup")).eq(undefined);
    expect(lex.findStem("syllabifi")).eq(undefined);
    expect(lex.findStem("snog")).eq(undefined);
    expect(lex.findStem("unmak")).eq(undefined);
    expect(lex.findStem("stupefi")).eq(undefined);
    expect(lex.findStem("sulli")).eq(undefined);
    expect(lex.findStem("tram")).eq(undefined);
    expect(lex.findStem("underpay")).eq(undefined);
    expect(lex.findStem("understudi")).eq(undefined);
    expect(lex.findStem("unpin")).eq(undefined);
    expect(lex.findStem("unzip")).eq(undefined);
    expect(lex.findStem("whir")).eq(undefined);
    expect(lex.findStem("yakk")).eq(undefined);
    expect(lex.findStem("yap")).eq(undefined);

    // incorrect stems TODO:
    expect(lex.findStem("body")).eq(undefined);
    expect(lex.findStem("justify")).eq(undefined);
    expect(lex.findStem("cancelled")).eq(undefined);
    expect(lex.findStem("trolling")).eq(undefined);
    expect(lex.findStem("change")).eq(undefined);
  });

  it('Should correctly call _toPhoneArray', function () {  // private-js only

    let raw = RiTa.lexicon().rawPhones("tornado", false)
    let result = RiTa.lexicon()._toPhoneArray(raw);
    let ans = ["t", "ao", "r", "n", "ey", "d", "ow"];
    expect(result).eql(ans);
  });

  function eql(output, expected, msg) { expect(output).eql(expected, msg); }
});
