import { assert } from 'chai';
import { RiTa, expect } from './before';


// TODO:
//   what to do if a seed is not a sentence start

describe('RiTa.RiMarkov', () => {

  // TODO: optimize selectNext
  // remove hard/soft fails, replace with mark children

  let RiMarkov, Random;
  let sample = "One reason people lie is to achieve personal power. Achieving personal power is helpful for one who pretends to be more confident than he really is. For example, one of my friends threw a party at his house last month. He asked me to come to his party and bring a date. However, I did not have a girlfriend. One of my other friends, who had a date to go to the party with, asked me about my date. I did not want to be embarrassed, so I claimed that I had a lot of work to do. I said I could easily find a date even better than his if I wanted to. I also told him that his date was ugly. I achieved power to help me feel confident; however, I embarrassed my friend and his date. Although this lie helped me at the time, since then it has made me look down on myself.";
  let sample2 = "One reason people lie is to achieve personal power. Achieving personal power is helpful for one who pretends to be more confident than he really is. For example, one of my friends threw a party at his house last month. He asked me to come to his party and bring a date. However, I did not have a girlfriend. One of my other friends, who had a date to go to the party with, asked me about my date. I did not want to be embarrassed, so I claimed that I had a lot of work to do. I said I could easily find a date even better than his if I wanted to. I also told him that his date was ugly. I achieved power to help me feel confident; however, I embarrassed my friend and his date. Although this lie helped me at the time, since then it has made me look down on myself. After all, I did occasionally want to be embarrassed.";
  let sample3 = sample + ' One reason people are dishonest is to achieve power.';

  before(function () {
    while (!RiTa) {
    }
    RiMarkov = RiTa.RiMarkov;
    Random = RiTa.randomizer;
  });


  it('should call RiMarkov', () => {
    let rm = RiTa.markov(3);
    ok(typeof rm === 'object');
    eq(rm.size(), 0);

    // should throw when options conflict
    expect(() => { let rm = new RiMarkov(3, { maxLengthMatch: 2 }) }).to.throw();
  });

  it('should call RiTa.markov', () => {
    let rm = RiTa.markov(3);
    ok(typeof rm === 'object');
    eq(rm.size(), 0);

    rm = RiTa.markov(3, { text: "The dog ran away" });
    eq(rm.size(), 4);
  });

  it('should call Random.pSelect', () => {
    // should throw when options conflict
    expect(() => { Random.pselect() }).to.throw();
    expect(Random.pselect([1])).equal(0);

    //console.log(res)
    //////////////////////////////////////////
    let weights = [1.0, 2, 6, -2.5, 0];
    let expected = [2, 2, 1.75, 1.55];
    let temps = [.5, 1, 2, 10];
    let distrs = [], results = [];
    temps.forEach(t => distrs.push(Random.ndist(weights, t)));
    let i, numTests = 100;
    distrs.forEach(sm => {
      let sum = 0;
      for (let j = 0; j < numTests; j++) {
        sum += Random.pselect(sm);
      }
      results.push(sum / numTests);
    });
    expect(results[i = 0], 'failed #' + i + ' temp=' + temps[i]).to.be.closeTo(expected[i], .1);
    expect(results[i = 1], 'failed #' + i + ' temp=' + temps[i]).to.be.closeTo(expected[i], .2);
    expect(results[i = 2], 'failed #' + i + ' temp=' + temps[i]).to.be.closeTo(expected[i], .4);
    expect(results[i = 3], 'failed #' + i + ' temp=' + temps[i]).to.be.closeTo(expected[i], 1);
    //expect(results[i = 4], 'failed #' + i + ' temp=' + temps[i]).to.be.closeTo(expected[i], .75);

    let distr = [[1, 2, 3, 4], [0.1, 0.2, 0.3, 0.4], [0.2, 0.3, 0.4, 0.5]];
    expected = [3, 0.3, 0.3857];
    //should pselect2 return index or return the value (which is what is returned now)
    for (let k = 0; k < 10; k++) {
      let results = [];
      distr.forEach(sm => {
        let sum = 0;
        for (let j = 0; j < 1000; j++) {
          sum += Random.pselect2(sm);
        }
        results.push(sum / 1000);
      });
      expect(results[0]).to.be.closeTo(expected[0], .5);
      expect(results[1]).to.be.closeTo(expected[1], .05);
      expect(results[2]).to.be.closeTo(expected[2], .05);
    }
  });

  it('should call Random.ndist', () => {
    expect(() => Random.ndist([1.0, 2, 6, -2.5, 0])).to.throw;

    let weights, expected, results;
    weights = [2, 1];
    expected = [.666, .333];
    results = Random.ndist(weights);
    for (let i = 0; i < results.length; i++) {
      expect(results[i]).to.be.closeTo(expected[i], 0.01);
    }
    weights = [7, 1, 2];
    expected = [.7, .1, .2];
    results = Random.ndist(weights);
    for (let i = 0; i < results.length; i++) {
      expect(results[i]).to.be.closeTo(expected[i], 0.01);
    }
  });

  it('should call Random.ndist.temp', () => {
    let weights, expected, results;
    weights = [1.0, 2, 6, -2.5, 0];
    expected = [
      [0, 0, 1, 0, 0],
      [0.0066, 0.018, 0.97, 0.0002, 0.0024],
      [0.064, 0.11, 0.78, 0.011, 0.039],
      [0.19, 0.21, 0.31, 0.13, 0.17],
    ]
    results = [
      Random.ndist(weights, 0.5),
      Random.ndist(weights, 1),
      Random.ndist(weights, 2),
      Random.ndist(weights, 10)
    ];
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      for (let j = 0; j < result.length; j++) {
        expect(result[j]).to.be.closeTo(expected[i][j], 0.01);
      }
    }
  });

  // it('should load a large model', async () => {
  //   let rm = new RiMarkov(4, { optimizeMemory: true });
  //   let content = fs.readFileSync('/Users/dhowe/Desktop/dracula.txt', 'utf8');
  //   rm.addText(content);//.then(console.log('done'));
  //   console.log('loaded');
  //   //try {
  //      var result = await rm.generateAsync();
  //      ok(result);
  //  //     done();
  //  // } catch(err) {
  //  //     done(err);
  //  // }
  // });

  it('should call createSeed', () => {
    let rm, toks;
    
    rm = new RiMarkov(4);
    rm.addText("The young boy ate it. The young girl gave up.");

    toks = rm.createSeed();
    expect(toks.length).eq(rm.n-1)
    expect(["The young boy", "The young girl"]
      .includes(rm._flatten(toks))).true;

    toks = rm.createSeed('The');
    expect(toks.length).eq(rm.n - 1);
    expect(["The young boy", "The young girl"]
      .includes(rm._flatten(toks))).true;

    toks = rm.createSeed('The young');
    expect(toks.length).eq(rm.n - 1);
    expect(["The young boy", "The young girl"]
      .includes(rm._flatten(toks))).true;

    toks = rm.createSeed(['The','young']);
    expect(toks.length).eq(rm.n - 1);
    expect(["The young boy", "The young girl"]
      .includes(rm._flatten(toks))).true;

    toks = rm.createSeed('The young boy');
    expect(toks.length).eq(rm.n - 1);
    expect(rm._flatten(toks)).eq('The young boy');

    toks = rm.createSeed('The young girl');
    expect(toks.length).eq(rm.n - 1);
    expect(rm._flatten(toks)).eq('The young girl');

    // TODO:
    //toks = rm.createSeed('The young girl gave');
    //expect(toks.length).eq(rm.n - 1);
    //expect(rm._flatten(toks)).eq('The young girl');

    rm = new RiMarkov(3);
    rm.addText(RiTa.sentences(sample));
    expect(rm.createSeed().length).eq(2);
    eq(rm._flatten(rm.createSeed(['I', 'also'])), "I also");

    rm = new RiMarkov(4);
    rm.addText(RiTa.sentences(sample));
    expect(rm.createSeed().length).eq(3);
    eq(rm._flatten(rm.createSeed('I also')), "I also told");
    eq(rm._flatten(rm.createSeed('I also told')), "I also told");
    eq(rm._flatten(rm.createSeed(['I', 'also'])), "I also told");
    eq(rm._flatten(rm.createSeed(['I', 'also', 'told'])), "I also told");
  });

  it('should call initSentence', () => { // remove?
    let rm = new RiMarkov(4);
    rm.addText("The young boy ate it. The fat boy gave up.");
    let toks = rm._initSentence();
    eq(toks.length, 1);
    eq(rm._flatten(toks), "The");
    eq(rm._flatten(toks[0]), "The");

    rm = new RiMarkov(4);
    rm.addText(RiTa.sentences(sample));
    eq(rm._flatten(rm._initSentence(['I', 'also'])), "I also");

    rm = new RiMarkov(4);
    rm.addText(RiTa.sentences(sample));
    eq(rm._flatten(rm._initSentence(['I'])), "I");
    eq(rm._flatten(), ""); //?
  });

  it('should throw on generate for empty model', () => {
    let rm = new RiMarkov(4, { maxLengthMatch: 6 });
    expect(() => rm.generate(5)).to.throw;
  });

  it('should throw on failed generate', () => {
    let rm = new RiMarkov(4, { maxLengthMatch: 6 });
    rm.addText(RiTa.sentences(sample));
    expect(() => rm.generate(5)).to.throw;

    rm = new RiMarkov(4, { maxLengthMatch: 5 });
    rm.addText(RiTa.sentences(sample));
    expect(() => rm.generate(5)).to.throw;

    rm = new RiMarkov(4, { maxAttempts: 1 });
    rm.addText("This is a text that is too short.");
    expect(() => rm.generate(5)).to.throw;
  });

  it('should apply custom tokenizers', () => {

    let sents = ['asdfasdf-', 'aqwerqwer+', 'asdfasdf*'];
    let tokenize = (sent) => sent.split("");
    let untokenize = (sents) => sents.join("");

    let rm = new RiMarkov(4, { tokenize, untokenize });
    rm.addText(sents);

    eql(rm.sentenceStarts, ['a', 'a', 'a']);
    expect(rm.sentenceEnds.size === 3).true;
    expect(rm.sentenceEnds.has('-')).true;
    expect(rm.sentenceEnds.has('+')).true;
    expect(rm.sentenceEnds.has('*')).true;
    //rm.trace=1;
    let result = rm.generate(5, { seed: 'as' });
    /*     for (let i = 0; i < result.length; i++) {
          console.log(i, result[i]);
        } */

    eq(result.length, 5);
    ok(/^as.*[-=*]$/.test(result[0]), "FAIL: '" + result[0] + "'");
  });

  it('should generate non-english sentences', () => {

    let text = '家 安 春 夢 家 安 春 夢 ！ 家 安 春 夢 德 安 春 夢 ？ 家 安 春 夢 安 安 春 夢 。';
    let sentArray = text.match(/[^，；。？！]+[，；。？！]/g);
    let rm = new RiMarkov(4);
    rm.addText(sentArray);
    let result = rm.generate(5, { seed: '家' });
    eq(result.length, 5);
    expect(/^[^，；。？！]+[，；。？！]$/.test(result[0]), "FAIL: '" + result[0] + "'").is.true;
    result.forEach(r => ok(/^[^，；。？！]+[，；。？！]$/.test(r), "FAIL: '" + r + "'"));
  });

  it('should apply custom chinese tokenizers ', () => {
    let text = '家安春夢家安春夢！家安春夢德安春夢？家安春夢安安春夢。';
    let sents = text.match(/[^，；。？！]+[，；。？！]/g);

    let tokenize = (sent) => sent.split("");
    let untokenize = (sents) => sents.join("");

    let rm = new RiMarkov(4, { tokenize, untokenize });
    rm.addText(sents);
    let result = rm.generate(5, { seed: '家' });

    eq(result.length, 5);
    expect(/^[^，；。？！]+[，；。？！]$/.test(result[0]), "FAIL: '" + result[0] + "'").is.true;
    result.forEach(r => ok(/^[^，；。？！]+[，；。？！]$/.test(r), "FAIL: '" + r + "'"));
  });

  /*   it('XX', () => {
  
      let rm = new RiMarkov(4, { disableInputChecks: true });
      rm.addText(RiTa.sentences(sample));
  
      let sent = rm.generate(2);
      console.log(sent);
      ok(sent.length === 2);
      ok(typeof sent[0] === 'string');
      eq(sent[1][0], sent[1][0].toUpperCase());
    });
   */
  it('should call generate', () => {

    // will not crash when n = 1
    let rm;
    rm = new RiMarkov(1);
    rm.addText(RiTa.sentences(sample));
    let res = rm.generate(2);
    eq(res.length, 2);
    ok(typeof res[0] === 'string' && res[0].length > 0);
    ok(typeof res[1] === 'string' && res[1].length > 0);

    // with no count
    rm = new RiMarkov(4, { disableInputChecks: true });
    rm.addText(RiTa.sentences(sample));

    let sent = rm.generate();
    ok(typeof sent === 'string');
    eq(sent[0], sent[0].toUpperCase());
    ok(/[!?.]$/.test(sent));

    sent = rm.generate({ seed: "I" });
    ok(typeof sent === 'string');
    eq(sent[0], "I");
    ok(/[!?.]$/.test(sent));

    rm = new RiMarkov(4, { disableInputChecks: 1 });
    rm.addText(RiTa.sentences(sample));
    let sents = rm.generate(5);
    //expect(1).eq(2);

    eq(sents.length, 5);
    for (let i = 0; i < sents.length; i++) {
      let s = sents[i];
      //console.log(i + ") " + s);
      eq(s[0], s[0].toUpperCase()); // "FAIL: bad first char in '" + s + "' -> " + s[0]);
      ok(/[!?.]$/.test(s), "FAIL: bad last char in '" + s + "'");
    }

    rm = new RiMarkov(4);
    rm.addText(sample);
    let s = rm.generate();
    //console.log(s);
    ok(s && s[0] === s[0].toUpperCase(), "FAIL: bad first char in '" + s + "'");
    ok(/[!?.]$/.test(s), "FAIL: bad last char in '" + s + "'");
    let num = RiTa.tokenize(s).length;
    ok(num >= 5 && num <= 35);
  });

  it('should call generate.minMaxLength', () => {

    let rm = new RiMarkov(4, { disableInputChecks: 0 }), minLength = 7, maxLength = 20;
    rm.addText(RiTa.sentences(sample));
    let sents = rm.generate(5, { minLength, maxLength });
    eq(sents.length, 5);
console.log(sents);
    for (let i = 0; i < sents.length; i++) {
      let s = sents[i];
      //console.log(i + ") " + s);

      eq(s[0], s[0].toUpperCase()); // "FAIL: bad first char in '" + s + "' -> " + s[0]);
      ok(/[!?.]$/.test(s), "FAIL: bad last char in '" + s + "'");
      let num = RiTa.tokenize(s).length;
      expect(num >= minLength && num <= maxLength, (num + ' not within ' + minLength + '-' + maxLength)).to.be.true;
    }

    return;

    rm = new RiMarkov(4, { disableInputChecks: 1 });
    rm.addText(RiTa.sentences(sample));
    for (let i = 0; i < 5; i++) {
      minLength = (3 + i), maxLength = (10 + i);
      let s = rm.generate({ minLength, maxLength });
      //console.log(i + ") " + s);
      ok(s && s[0] === s[0].toUpperCase(), "FAIL: bad first char in '" + s + "'");
      ok(/[!?.]$/.test(s), "FAIL: bad last char in '" + s + "'");
      let num = RiTa.tokenize(s).length;
      expect(num >= minLength && num <= maxLength, (num + ' not within ' + minLength + '-' + maxLength)).to.be.true;
    }
  });

  it('should call generate.start', () => {

    let rm = new RiMarkov(4, { disableInputChecks: 1 });
    let start = 'One';
    rm.addText(RiTa.sentences(sample));
    for (let i = 0; i < 5; i++) {
      let s = rm.generate({ seed: start });
      //console.log(i + ") " + s);
      ok(s.startsWith(start));
    }

    start = 'Achieving';
    for (let i = 0; i < 5; i++) {
      let res = rm.generate({ seed: start });
      ok(typeof res === 'string');
      ok(res.startsWith(start));
    }

    start = 'I';
    for (let i = 0; i < 5; i++) {
      let arr = rm.generate(2, { seed: start });
      ok(Array.isArray(arr));
      eq(arr.length, 2);
      ok(arr[0].startsWith(start));
    }
    //should throw when sentence start is not found
    start = "Not-exist";
    expect(() => { rm.generate(2, { seed: start }) }).to.throw();
    start = "I and she";
    expect(() => { rm.generate(2, { seed: start }) }).to.throw();
    //if startToken is empty string, equal to not have start token
    start = "";
    ok(rm.generate(2, { seed: start }).length === 2);
    //if startToken is just space, throw
    start = " ";
    expect(() => { rm.generate(2, { seed: start }) }).to.throw();
    //if startToken is an array
    start = ["a"]
    expect(rm.generate(2, { seed: start }).length).eq(2);
    expect(rm.generate({ seed: start })[0].toLowerCase()).eq("a");
  });

  it('should call generate.startArray', () => {

    let rm = new RiMarkov(4, { disableInputChecks: 1 });
    let start = ['One'];
    rm.addText(RiTa.sentences(sample));
    for (let i = 0; i < 5; i++) {
      let s = rm.generate({ seed: start });
      //console.log(i + ") " + s);
      ok(s.startsWith(start));
    }

    start = ['Achieving'];
    for (let i = 0; i < 5; i++) {
      let res = rm.generate({ seed: start });
      ok(typeof res === 'string');
      ok(res.startsWith(start));
    }

    start = ['I'];
    for (let i = 0; i < 5; i++) {
      let arr = rm.generate(2, { seed: start });
      eq(arr.length, 2);
      ok(arr[0].startsWith(start));
    }

    rm = new RiMarkov(4, { disableInputChecks: 1 });
    rm.addText(RiTa.sentences(sample));
    start = ['One', 'reason'];
    for (let i = 0; i < 1; i++) {
      let s = rm.generate({ seed: start });
      ok(s.startsWith(start.join(' ')));
    }

    start = ['Achieving', 'personal'];
    for (let i = 0; i < 5; i++) {
      let res = rm.generate({ seed: start });
      ok(typeof res === 'string');
      ok(res.startsWith(start.join(' ')));
    }

    start = ['I', 'also'];
    for (let i = 0; i < 5; i++) {
      let res = rm.generate({ seed: start });
      ok(typeof res === 'string');
      ok(res.startsWith(start.join(' ')));
    }
  });

  it('should generate across sentences', () => {

    let rm = new RiMarkov(3, { trace: 0 });
    rm.addText(RiTa.sentences(sample2));

    let sents = rm.generate(3, { strict: true });
    //sents.forEach((s, i) => console.log(i, s));
    let toks = RiTa.tokenize(sents.join(' '));

    // All sequences of len=N are (by def.) in the input text
    for (let j = 0; j <= toks.length - rm.n; j++) {
      let part = toks.slice(j, j + rm.n);
      let res = RiTa.untokenize(part);
      ok(sample2.indexOf(res) > -1, 'output not found in text: "' + res + '"\n' + sample2);
    }
  });

  it('should call generate.mlm', () => {

    let mlms = 8, rm = new RiMarkov(3, { maxLengthMatch: mlms, trace: 0 });
    expect(typeof rm.input === 'object').to.be.true;
    rm.addText(RiTa.sentences(sample3));
    //rm.trace = true;

    let sents = rm.generate(3);
    for (let i = 0; i < sents.length; i++) {
      let sent = sents[i];
      let toks = RiTa.tokenize(sent);
      //console.log(i, sent);

      // All sequences of len=N are (by def.) in the input text
      for (let j = 0; j <= toks.length - rm.n; j++) {
        let part = toks.slice(j, j + rm.n);
        let res = RiTa.untokenize(part);
        ok(sample3.indexOf(res) > -1, 'output not found in text: "' + res + '"');
      }

      // All sequences of len=mlms+1 must NOT  be in text
      for (let j = 0; j <= toks.length - (mlms + 1); j++) {
        let part = toks.slice(j, j + (mlms + 1));
        let res = RiTa.untokenize(part);
        ok(sample3.indexOf(res) < 0, 'Got "' + sent + '"\n\nBut "'
          + res + '" was found in input:\n\n' + sample + '\n\n' + rm.input);
      }
    }

    mlms = 9
    rm = new RiMarkov(3, { maxLengthMatch: mlms, trace: 0 });
    expect(typeof rm.input === 'object').to.be.true;
    rm.addText(RiTa.sentences(sample2));
    sents = rm.generate(3);
    for (let i = 0; i < sents.length; i++) {
      let sent = sents[i];
      let toks = RiTa.tokenize(sent);
      for (let j = 0; j <= toks.length - rm.n; j++) {
        let part = toks.slice(j, j + rm.n);
        let res = RiTa.untokenize(part);
        ok(sample2.indexOf(res) > -1, 'output not found in text: "' + res + '"');
      }
      for (let j = 0; j <= toks.length - (mlms + 1); j++) {
        let part = toks.slice(j, j + (mlms + 1));
        let res = RiTa.untokenize(part);
        ok(sample2.indexOf(res) < 0, 'Got "' + sent + '"\n\nBut "' + res + '" was found in input:\n\n' + sample + '\n\n' + rm.input);
      }
    }
  });

  it('should call completions', () => {

    let rm = new RiMarkov(4);
    rm.addText((sample));

    let res = rm.completions("people lie is".split(' '));
    eql(res, ["to"]);

    res = rm.completions("One reason people lie is".split(' '));
    eql(res, ["to"]);

    res = rm.completions("personal power".split(' '));
    eql(res, ['.', 'is']);

    res = rm.completions(['to', 'be', 'more']);
    eql(res, ['confident']);

    res = rm.completions("I"); // testing the sort
    let expec = ["did", "claimed", "had", "said", "could",
      "wanted", "also", "achieved", "embarrassed"
    ];
    eql(res, expec);

    res = rm.completions("XXX");
    eql(res, []);

    ///////////////////// ///////////////////// /////////////////////

    rm = new RiMarkov(4);
    rm.addText((sample2));

    res = rm.completions(['I'], ['not']);
    eql(res, ["did"]);

    res = rm.completions(['achieve'], ['power']);
    eql(res, ["personal"]);

    res = rm.completions(['to', 'achieve'], ['power']);
    eql(res, ["personal"]);

    res = rm.completions(['achieve'], ['power']);
    eql(res, ["personal"]);

    res = rm.completions(['I', 'did']);
    eql(res, ["not", "occasionally"]);

    res = rm.completions(['I', 'did'], ['want']);
    eql(res, ["not", "occasionally"]);

    //should throw at bad inputs
    expect(() => { rm.completions(['I', 'did', 'not', 'occasionally'], ['want']); }).to.throw();

    let tmp = RiTa.SILENT;
    RiTa.SILENT = true;

    //should return undefined if completions not found
    res = rm.completions(['I', 'non-exist'], ['want']);
    eq(res, undefined);


    res = rm.completions(['I', 'non-exist'], ['want']);
    eq(res, undefined);

    RiTa.SILENT = tmp;
  });

  it('should call probabilities', () => {

    let rm = new RiMarkov(3);
    rm.addText((sample));

    let checks = ["reason", "people", "personal", "the", "is", "XXX"];
    let expected = [{
      people: 1.0
    }, {
      lie: 1
    }, {
      power: 1.0
    }, {
      time: 0.5,
      party: 0.5
    }, {
      to: 0.3333333333333333,
      '.': 0.3333333333333333,
      helpful: 0.3333333333333333
    }, {}];

    for (let i = 0; i < checks.length; i++) {
      let res = rm.probabilities(checks[i]);
      //console.log(checks[i] + ":", res, " ->", expected[i]);
      eql(res, expected[i]);
    }
  });

  it('should call probabilities.array', () => {

    let rm = new RiMarkov(4);
    rm.addText(sample2);

    let res = rm.probabilities("the".split(" "));
    let expec = {
      time: 0.5,
      party: 0.5
    };
    eql(res, expec);

    res = rm.probabilities("people lie is".split(" "));
    expec = {
      to: 1.0
    };
    eql(res, expec);

    res = rm.probabilities("is");
    expec = {
      to: 0.3333333333333333,
      '.': 0.3333333333333333,
      helpful: 0.3333333333333333
    };
    eql(res, expec);

    res = rm.probabilities("personal power".split(' '));
    expec = {
      '.': 0.5,
      is: 0.5
    };
    eql(res, expec);

    res = rm.probabilities(['to', 'be', 'more']);
    expec = {
      confident: 1.0
    };
    eql(res, expec);

    res = rm.probabilities("XXX");
    expec = {};
    eql(res, expec);

    res = rm.probabilities(["personal", "XXX"]);
    expec = {};
    eql(res, expec);

    res = rm.probabilities(['I', 'did']);
    expec = {
      "not": 0.6666666666666666,
      "occasionally": 0.3333333333333333
    };
    eql(res, expec);
  });

  it('should call probability', () => {

    let text, rm;
    text = 'the dog ate the boy the';
    rm = new RiMarkov(3);
    rm.addText(text);

    eq(rm.probability("the"), .5);
    eq(rm.probability("dog"), 1 / 6);
    eq(rm.probability("cat"), 0);

    text = 'the dog ate the boy that the dog found.';
    rm = new RiMarkov(3);
    rm.addText(text);

    eq(rm.probability("the"), .3);
    eq(rm.probability("dog"), .2);
    eq(rm.probability("cat"), 0);

    rm = new RiMarkov(3);
    rm.addText(sample);
    eq(rm.probability("power"), 0.017045454545454544);

    //bad inputs
    expect(rm.probability("Non-exist")).eq(0);
  });

  it('should call probability.array', () => {

    let rm = new RiMarkov(3);
    rm.addText(sample);

    let check = 'personal power is'.split(' ');
    eq(rm.probability(check), 1 / 3);

    check = 'personal powXer is'.split(' ');
    eq(rm.probability(check), 0);

    check = 'someone who pretends'.split(' ');
    eq(rm.probability(check), 1 / 2);

    eq(rm.probability([]), 0);
  });

  it('should call addText', () => {
    let rm = new RiMarkov(4);
    let sents = RiTa.sentences(sample);
    let count = 0;
    for (let i = 0; i < sents.length; i++) {
      let words = RiTa.tokenize(sents[i]);
      count += words.length;
    }
    rm.addText(sents);

    eq(rm.size(), count);

    // unique sentence starts
    eql([...new Set(rm.sentenceStarts)], ['One', 'Achieving', 'For', 'He', 'However', 'I', 'Although']);
  });

  it('should call Node.childCount', () => {
    let rm = new RiMarkov(2);
    expect(rm.root.childCount()).eq(0);
    rm = new RiMarkov(2);
    rm.addText('The');
    expect(rm.root.childCount()).eq(1);
    expect(rm.root.child("The").childCount()).eq(0);
  });


  it('should call toString', () => {
    let rm = new RiMarkov(2);
    rm.addText('The');
    expect(`ROOT {
  'The' [1,p=1.000]
}`).eq(rm.toString())

    rm = new RiMarkov(2);
    rm.addText('The dog ate the cat');
    expect(`ROOT {
  'The' [1,p=0.200]  {
    'dog' [1,p=1.000]
  }
  'the' [1,p=0.200]  {
    'cat' [1,p=1.000]
  }
  'dog' [1,p=0.200]  {
    'ate' [1,p=1.000]
  }
  'cat' [1,p=0.200]
  'ate' [1,p=0.200]  {
    'the' [1,p=1.000]
  }
}`).eq(rm.toString());

    rm = new RiMarkov(2);
    eq(rm.toString(), "ROOT ");

    rm.addText("Can you?");
    eq(rm.toString(), `ROOT {
  'you' [1,p=0.333]  {
    '?' [1,p=1.000]
  }
  'Can' [1,p=0.333]  {
    'you' [1,p=1.000]
  }
  '?' [1,p=0.333]
}`);

    eq(rm.root.toString(), "Root");
    //eq(rm.root.child("Can").toString(), "Can(1/0.333%)");
    eq(rm.root.child("Can").toString(), "'Can' [1,p=0.333]");

    rm = new RiMarkov(2);
    rm.addText("\\n and \\t and \\r and \\r\\n");
    eq(rm.toString(), `ROOT {
  'and' [3,p=0.429]  {
    '\\t' [1,p=0.333]
    '\\r\\n' [1,p=0.333]
    '\\r' [1,p=0.333]
  }
  '\\t' [1,p=0.143]  {
    'and' [1,p=1.000]
  }
  '\\r\\n' [1,p=0.143]
  '\\r' [1,p=0.143]  {
    'and' [1,p=1.000]
  }
  '\\n' [1,p=0.143]  {
    'and' [1,p=1.000]
  }
}`);
  });

  it('should call size', () => {

    let rm = new RiMarkov(4);
    eq(rm.size(), 0);
    let tokens = RiTa.tokenize(sample);
    let sents = RiTa.sentences(sample);
    rm = new RiMarkov(3);
    rm.addText(sample);
    eq(rm.size(), tokens.length);

    let rm2 = new RiMarkov(4);
    rm2 = new RiMarkov(3);
    rm2.addText(sents);
    eq(rm.size(), rm2.size());
  });

  it('should fail when sentence is in inputs', () => {
    let rm = new RiMarkov(4);
    rm.addText(['I ate the dog.']);
    expect(() => rm.generate()).to.throw;
  });

  it('should handle disableInputChecks option', () => {
    let rm = new RiMarkov(4, { disableInputChecks: 0 });
    rm.addText('I ate the dog.');
    expect(typeof rm.input === 'object').to.be.true;

    rm = new RiMarkov(4, { disableInputChecks: 1 });
    rm.addText('I ate the dog.');
    expect(typeof rm.input === 'undefined').to.be.true;
  });

  it('should serialize and deserialize', () => {

    let rm, copy;
    rm = new RiMarkov(4);
    let json = rm.toJSON();
    copy = RiMarkov.fromJSON(json);
    markovEquals(rm, copy);

    rm = new RiMarkov(4, { disableInputChecks: 0 });
    rm.addText(['I ate the dog.']);
    copy = RiMarkov.fromJSON(rm.toJSON());
    markovEquals(rm, copy);

    rm = new RiMarkov(4, { disableInputChecks: 1 });
    rm.addText(['I ate the dog.']);
    copy = RiMarkov.fromJSON(rm.toJSON());
    markovEquals(rm, copy);

    expect(copy.generate()).eql(rm.generate());
  });

  0 && it('Should output log with trace option', () => {
    let rm = new RiMarkov(4, { maxAttempts: 2, trace: true });
    rm.addText("This is a text that is too short.");
    expect(() => rm.generate(5)).to.throw;

    rm = new RiMarkov(3, { trace: true, maxLengthMatch: 10 });
    rm.addText(sample3);
    expect(rm.generate(2).length).eq(2);
  });

  /////////////////////////// helpers ////////////////////////////

  function distribution(res, dump) {
    let dist = {};
    for (var i = 0; i < res.length; i++) {
      if (!dist[res[i]]) dist[res[i]] = 0;
      dist[res[i]]++;
    }
    let keys = Object.keys(dist);//.sort(function(a, b) { return dist[b] - dist[a] });
    keys.forEach(k => {
      dist[k] = dist[k] / res.length
      dump && console.log(k, dist[k]);
    });
    dump && console.log();
    return dist;
  }

  function markovEquals(rm, copy) {
    false && Object.keys(rm) // check each non-object key
      .filter(k => !/(root|input|sentenceStarts|sentenceEnds)/.test(k))
      .forEach(k => console.log(k, '\n  ', rm[k], '\n  ', copy[k]));
    Object.keys(rm) // check each non-object key
      .filter(k => !/(root|input|sentenceStarts|sentenceEnds)/.test(k))
      .forEach(k => expect(rm[k], 'failed on ' + k).eq(copy[k]));

    expect(rm.toString()).eq(copy.toString());
    expect(rm.toJSON()).eq(copy.toJSON());

    expect(rm.root.toString()).eq(copy.root.toString());
    expect(rm.input).eql(copy.input);
    expect(rm.size()).eql(copy.size());

    expect(rm.sentenceStarts.toString()).eq(copy.sentenceStarts.toString());
    expect(rm.sentenceEnds.toString()).eq(copy.sentenceEnds.toString());

  }
  function eql(a, b, c) { expect(a).eql(b, c); }
  function eq(a, b, c) { expect(a).eq(b, c); }
  function ok(a, m) { expect(a, m).to.be.true; }
  function def(res, m) { expect(res, m).to.not.be.undefined; }
});
