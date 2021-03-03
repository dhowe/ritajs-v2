import { RiTa, expect } from './before';

describe('RiTa.RiMarkov', () => {

  const RiMarkov = RiTa.RiMarkov, Random = RiTa.randomizer;
  let sample = "One reason people lie is to achieve personal power. Achieving personal power is helpful for one who pretends to be more confident than he really is. For example, one of my friends threw a party at his house last month. He asked me to come to his party and bring a date. However, I did not have a girlfriend. One of my other friends, who had a date to go to the party with, asked me about my date. I did not want to be embarrassed, so I claimed that I had a lot of work to do. I said I could easily find a date even better than his if I wanted to. I also told him that his date was ugly. I achieved power to help me feel confident; however, I embarrassed my friend and his date. Although this lie helped me at the time, since then it has made me look down on myself.";
  let sample2 = "One reason people lie is to achieve personal power. Achieving personal power is helpful for one who pretends to be more confident than he really is. For example, one of my friends threw a party at his house last month. He asked me to come to his party and bring a date. However, I did not have a girlfriend. One of my other friends, who had a date to go to the party with, asked me about my date. I did not want to be embarrassed, so I claimed that I had a lot of work to do. I said I could easily find a date even better than his if I wanted to. I also told him that his date was ugly. I achieved power to help me feel confident; however, I embarrassed my friend and his date. Although this lie helped me at the time, since then it has made me look down on myself. After all, I did occasionally want to be embarrassed.";
  let sample3 = sample + ' One reason people are dishonest is to achieve power.';

  it('should call RiMarkov', () => {
    ok(typeof new RiMarkov(3) !== 'undefined');
  });

  it('should call createRiMarkov', () => {
    ok(typeof RiTa.markov(3) !== 'undefined');
  });

  it('should call Random.pSelect', () => {
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

  it('should call initSentence', () => { // remove?
    let rm, txt;
    rm = new RiMarkov(4);
    txt = "The young boy ate it. The fat boy gave up.";
    rm.addText(txt);
    let toks = rm._initSentence();
    eq(toks.length, 1);
    eq(toks[0].token, 'The');

    rm = new RiMarkov(4);
    rm.addText(RiTa.sentences(sample));
    eq(rm._flatten(rm._initSentence(['I', 'also'])), "I also");
  });


  it('should throw on failed generate', () => {
    let rm = new RiMarkov(4);
    rm.addText(RiTa.sentences(sample));
    expect(() => rm.generate(5)).to.throw;
  });

  it('should generate non-english sentences', () => {

    let text = '家 安 春 夢 家 安 春 夢 ！ 家 安 春 夢 德 安 春 夢 ？ 家 安 春 夢 安 安 春 夢 。';
    let sentArray = text.match(/[^，；。？！]+[，；。？！]/g);
    let rm = new RiMarkov(4);
    rm.addText(sentArray);
    let result = rm.generate(5, { startTokens: '家' });
    eq(result.length, 5);
    result.forEach(r => ok(/^家[^，；。？！]+[，；。？！]$/.test(r), "FAIL: '" + r + "'"));
  });

  it('should apply custom tokenizers', () => {
    let text = '家安春夢家安春夢！家安春夢德安春夢？家安春夢安安春夢。';
    let sentArray = text.match(/[^，；。？！]+[，；。？！]/g);

    let tokenize = (sent) => sent.split("");
    let untokenize = (sents) => sents.join("");

    let rm = new RiMarkov(4, { tokenize, untokenize });
    rm.addText(sentArray);
    let result = rm.generate(5, { startTokens: '家' });
    //console.log(result);

    eq(result.length, 5);
    result.forEach(r => ok(/^家[^，；。？！]+[，；。？！]$/.test(r), "FAIL: '" + r + "'"));
  });

  it('should call generate', () => {

    let rm = new RiMarkov(4, { disableInputChecks: 1 });
    rm.addText(RiTa.sentences(sample));
    let sents = rm.generate(5);
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

    let rm = new RiMarkov(4, { disableInputChecks: 1 }), minLength = 7, maxLength = 20;
    rm.addText(RiTa.sentences(sample));

    let sents = rm.generate(5, { minLength, maxLength });
    eq(sents.length, 5);
    for (let i = 0; i < sents.length; i++) {
      let s = sents[i];
      eq(s[0], s[0].toUpperCase()); // "FAIL: bad first char in '" + s + "' -> " + s[0]);
      ok(/[!?.]$/.test(s), "FAIL: bad last char in '" + s + "'");
      let num = RiTa.tokenize(s).length;
      ok(num >= minLength && num <= maxLength);
    }

    rm = new RiMarkov(4, { disableInputChecks: 1 });
    rm.addText(RiTa.sentences(sample));
    for (let i = 0; i < 5; i++) {
      minLength = (3 + i), maxLength = (10 + i);
      let s = rm.generate({ minLength, maxLength });
      //console.log(i+") "+s);
      ok(s && s[0] === s[0].toUpperCase(), "FAIL: bad first char in '" + s + "'");
      ok(/[!?.]$/.test(s), "FAIL: bad last char in '" + s + "'");
      let num = RiTa.tokenize(s).length;
      ok(num >= minLength && num <= maxLength);
    }
  });

  it('should call generate.start', () => {

    let rm = new RiMarkov(4, { disableInputChecks: 1 });
    let start = 'One';
    rm.addText(RiTa.sentences(sample));
    for (let i = 0; i < 5; i++) {
      let s = rm.generate({ startTokens: start });
      //console.log(i + ") " + s);
      ok(s.startsWith(start));
    }

    start = 'Achieving';
    for (let i = 0; i < 5; i++) {
      let res = rm.generate({ startTokens: start });
      ok(typeof res === 'string');
      ok(res.startsWith(start));
    }

    start = 'I';
    for (let i = 0; i < 5; i++) {
      let arr = rm.generate(2, { startTokens: start });
      ok(Array.isArray(arr));
      eq(arr.length, 2);
      ok(arr[0].startsWith(start));
    }
  });

  it('should call generate.startArray', () => {

    let rm = new RiMarkov(4, { disableInputChecks: 1 });
    let start = ['One'];
    rm.addText(RiTa.sentences(sample));
    for (let i = 0; i < 5; i++) {
      let s = rm.generate({ startTokens: start });
      //console.log(i + ") " + s);
      ok(s.startsWith(start));
    }

    start = ['Achieving'];
    for (let i = 0; i < 5; i++) {
      let res = rm.generate({ startTokens: start });
      ok(typeof res === 'string');
      ok(res.startsWith(start));
    }

    start = ['I'];
    for (let i = 0; i < 5; i++) {
      let arr = rm.generate(2, { startTokens: start });
      eq(arr.length, 2);
      ok(arr[0].startsWith(start));
    }

    rm = new RiMarkov(4, { disableInputChecks: 1 });
    rm.addText(RiTa.sentences(sample));
    start = ['One', 'reason'];
    for (let i = 0; i < 1; i++) {
      let s = rm.generate({ startTokens: start });
      ok(s.startsWith(start.join(' ')));
    }

    start = ['Achieving', 'personal'];
    for (let i = 0; i < 5; i++) {
      let res = rm.generate({ startTokens: start });
      ok(typeof res === 'string');
      ok(res.startsWith(start.join(' ')));
    }

    start = ['I', 'also'];
    for (let i = 0; i < 5; i++) {
      let res = rm.generate({ startTokens: start });
      ok(typeof res === 'string');
      ok(res.startsWith(start.join(' ')));
    }
  });


  it('should call generate.mlm', () => {

    let mlms = 7, rm = new RiMarkov(3, { maxLengthMatch: mlms, trace: 0 });
    rm.addText(RiTa.sentences(sample3));
    let sents = rm.generate(5);
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
        ok(sample3.indexOf(res) < 0, 'Got "' + sent + '"\n\nBut "' + res + '" was found in input:\n\n' + sample + '\n\n' + rm.input);
      }
    }
    // TODO: add more

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
    let count = sents.length; // sentence-end tokens
    for (let i = 0; i < sents.length; i++) {
      let words = RiTa.tokenize(sents[i]);
      count += words.length;
    }
    rm.addText(sents);

    eq(rm.size(), count + sents.length);

    let ss = rm.root.child(RiMarkov.SS);
    eql(Object.keys(ss.children), ['One', 'Achieving', 'For', 'He', 'However', 'I', 'Although']);

    let se = rm.root.child(RiMarkov.SE);
    eql(Object.keys(se.children), [RiMarkov.SS]);
  });

  it('should call Node.childCount', () => {
    let rm = new RiMarkov(2);
    expect(rm.root.childCount()).eq(0);
    rm = new RiMarkov(2);
    rm.addText('The');
    expect(rm.root.childCount()).eq(3);
    expect(rm.root.child("The").childCount()).eq(1);
  });


  it('should call toString', () => {
    let rm, exp;
    rm = new RiMarkov(2);
    exp = "ROOT {   'The' [1,p=0.333]  {     '</s>' [1,p=1.000]   }   '<s>' [1,p=0.333]  {     'The' [1,p=1.000]   }   '</s>' [1,p=0.333] }";
    rm.addText('The');
    //console.log(rm.toString());
    expect(exp).eq(rm.toString().replace(/\n/g, ' '));

    rm = new RiMarkov(2);
    exp = "ROOT {   'The' [1,p=0.143]  {     'dog' [1,p=1.000]   }   'the' [1,p=0.143]  {     'cat' [1,p=1.000]   }   'dog' [1,p=0.143]  {     'ate' [1,p=1.000]   }   'cat' [1,p=0.143]  {     '</s>' [1,p=1.000]   }   'ate' [1,p=0.143]  {     'the' [1,p=1.000]   }   '<s>' [1,p=0.143]  {     'The' [1,p=1.000]   }   '</s>' [1,p=0.143] }";
    rm.addText('The dog ate the cat');
    //console.log(rm.toString());
    expect(exp).eq(rm.toString().replace(/\n/g, ' '));
  });

  it('should call size', () => {

    let rm = new RiMarkov(4);
    eq(rm.size(), 0);
    let tokens = RiTa.tokenize(sample);
    let sents = RiTa.sentences(sample);
    rm = new RiMarkov(3);
    rm.addText(sample);
    eq(rm.size(), tokens.length + sents.length * 2);

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
    Object.keys(rm) // check each non-object key
      .filter(k => !/(root|input|inverse)/.test(k))
      .forEach(k => expect(rm[k], 'failed on ' + k).eq(copy[k]));
    expect(rm.toString()).eq(copy.toString());
    expect(rm.root.toString()).eq(copy.root.toString());
    expect(rm.input).eql(copy.input);
    expect(rm.size()).eql(copy.size());
  }
  function eql(a, b, c) { expect(a).eql(b, c); }
  function eq(a, b, c) { expect(a).eq(b, c); }
  function ok(a, m) { expect(a, m).to.be.true; }
  function def(res, m) { expect(res, m).to.not.be.undefined; }
});
