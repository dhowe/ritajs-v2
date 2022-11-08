import { loadTestingDeps } from './before';

describe('RiTa.Analyzer', function () {
  this.timeout(5000); // for ci

  let RiTa, expect, hasLex;
  before(async () => ({ RiTa, expect, hasLex } = await loadTestingDeps()));

  it('Should call analyzeWord', function () { // SYNC:

    let tmp = RiTa.SILENCE_LTS;
    RiTa.SILENCE_LTS = true;

    let data = RiTa.analyzer.analyzeWord("abandon");
    expect(data.phones).eq("ah-b-ae-n-d-ah-n");
    expect(data.stresses).eq("0/1/0");
    expect(data.syllables).eq("ah/b-ae-n/d-ah-n");

    data = RiTa.analyzer.analyzeWord("z");
    expect(data.phones).eq("z");
    expect(data.stresses).eq("0");
    expect(data.syllables).eq("z");

    data = RiTa.analyzer.analyzeWord("cloze");
    expect(data.phones).eq("k-l-ow-z");
    expect(data.stresses).eq("1");
    expect(data.syllables).eq("k-l-ow-z");

    RiTa.SILENCE_LTS = tmp;
  });

  it('Should call analyzeWord with lts', function () { // SYNC:

    if (!hasLex) this.skip(); // different without lexicon

    let tmp = RiTa.SILENCE_LTS;
    RiTa.SILENCE_LTS = true;

    let data = RiTa.analyzer.analyzeWord("1903");
    expect(data.phones).eq("w-ah-n-n-ih-n-z-ih-r-ow-th-r-iy");
    expect(data.stresses).eq("0/0/0/0/0");
    expect(data.syllables).eq("w-ah-n/n-ih-n/z-ih/r-ow/th-r-iy");

    RiTa.SILENCE_LTS = tmp;
  });

  it('Should call analyze.lts', function () {
    expect(RiTa.SILENCE_LTS).eq(false);
    let feats;
    feats = RiTa.analyze("cloze", { silent: 1 });
    expect(feats.pos).eq("nn");
    expect(feats.tokens).eq("cloze");
    expect(feats.syllables).eq("k-l-ow-z");
  });

  it('Should call syllables.lts', function () {
    let result = RiTa.syllables('The Laggin', { silent: 1 });
    expect(result).eq('dh-ah l-ae/g-ih-n', 'got \'' + result + "'");
  });

  it('Should call analyze', function () { // SYNC:

    expect(RiTa.analyze('')).eql({ tokens: '', pos: '', stresses: '', phones: '', syllables: '' });

    let feats;

    feats = RiTa.analyze("clothes");
    expect(feats.pos).eq("nns");
    expect(feats.tokens).eq("clothes");
    expect(feats.syllables).eq("k-l-ow-dh-z");

    feats = RiTa.analyze("chevrolet");
    expect(feats.tokens).eq("chevrolet");
    expect(feats.syllables).eq(hasLex ? "sh-eh-v/r-ow/l-ey" : 'ch-eh-v/r-ow/l-ah-t');

    if (!hasLex) return; // NOTE: below currently fail without lexicon

    feats = RiTa.analyze("1903");
    expect(feats.phones).eq("w-ah-n-n-ih-n-z-ih-r-ow-th-r-iy");
    expect(feats.stresses).eq("0/0/0/0/0");
    expect(feats.syllables).eq("w-ah-n/n-ih-n/z-ih/r-ow/th-r-iy");
    expect(feats.tokens).eq("1903");
    expect(feats.pos).eq("cd");

    feats = RiTa.analyze("the clothes");
    expect(feats.pos).eq("dt nns");
    expect(feats.tokens).eq("the clothes");
    expect(feats.syllables).eq("dh-ah k-l-ow-dh-z");

    feats = RiTa.analyze("yoyo");
    expect(feats.pos).eq("nn");
    expect(feats.tokens).eq("yoyo");
    expect(feats.syllables).eq("y-ow/y-ow");

    feats = RiTa.analyze("abandon");
    //console.log(feats);
    eq(feats["pos"], "vb");
    eq(feats["phones"], 'ah-b-ae-n-d-ah-n');
    eq(feats["tokens"], "abandon");
    eq(feats["stresses"], "0/1/0");
    eq(feats["syllables"], "ah/b-ae-n/d-ah-n");

    //https://github.com/dhowe/rita/issues/177
    feats = RiTa.analyze("bit");
    expect(feats.pos).eq("vbd");
    expect(feats.syllables).eq("b-ih-t");
    
    //'bit': as a vbd
    feats = RiTa.analyze("It bit me.");
    expect(feats.pos).eq("prp vbd prp ."); 
    //'bit': as an nn
    feats = RiTa.analyze("Give the duck a bit of bread.");
    expect(feats.pos).eq("vb dt nn dt nn in nn .");

    feats = RiTa.analyze("broke");
    expect(feats.pos).eq("vbd");
    expect(feats.syllables).eq("b-r-ow-k");
    feats = RiTa.analyze("I broke my leg.");
    expect(feats.pos).eq("prp vbd prp$ nn .");

    feats = RiTa.analyze("The show has ended.");
    expect(feats.pos).eq("dt nn vbz vbn .");

    feats = RiTa.analyze("She oversaw it.");
    expect(feats.pos).eq("prp vbd prp .");

    //remade as a vbd
    feats = RiTa.analyze("She remade this video.");
    expect(feats.pos).eq("prp vbd dt nn .");
    //remade as a vbn
    feats = RiTa.analyze("They will be remade into something else.");
    0 && expect(feats.pos).eq("prp md vb vbn in nn rb .");
     
    //become
    feats = RiTa.analyze("She becomes a companion to a foreigner.");
    expect(feats.pos).eq("prp vbz dt jj to dt nn .");
    feats = RiTa.analyze("She has become a companion to a foreigner.");
    0 && expect(feats.pos).eq("prp vbz vbn dt jj to dt nn .");
  });

  it('Should treat hyphenated words as single tokens', function () {
    // treating word as a single token:

    let lts = RiTa.SILENCE_LTS; // remembers
    RiTa.SILENCE_LTS = true; // disable LTS logging 

    // pool1: all parts in dict
    let pool1 = ['mother-in-law', 'father-in-law', 'sister-in-law', 'brother-in-law', 'off-site', 'up-to-date', 'state-of-the-art', 'self-esteem', 'merry-go-round', 'man-eating', 'twenty-one', 'twenty-first', 'thirty-second', 'happy-go-lucky', 'editor-in-chief', 'over-the-counter', 'long-term', 'high-speed', 'in-depth', 'full-length', 'part-time', 'sun-dried', 'well-off', 'well-known', 'gift-wrap', 'follow-up', 'well-being', 'good-looking', 'knee-length', 'runner-up', 'tip-off', 'blush-on', 'sugar-free', 'ice-cold', 'far-flung', 'high-rise', 'life-size', 'king-size', 'next-door', 'full-time', 'forty-acre', 'on-campus', 'family-run', 'low-grade', 'round-trip'];
    let feats1 = [{ pos: 'nn', tokens: 'mother-in-law', phones: 'm-ah-dh-er-ih-n-l-ao', stresses: '1/0-0-1', syllables: 'm-ah/dh-er/ih-n/l-ao' },
    { pos: 'nn', tokens: 'father-in-law', phones: 'f-aa-dh-er-ih-n-l-ao', stresses: '1/0-0-1', syllables: 'f-aa/dh-er/ih-n/l-ao' },
    { pos: 'nn', tokens: 'sister-in-law', phones: 's-ih-s-t-er-ih-n-l-ao', stresses: '1/0-0-1', syllables: 's-ih/s-t-er/ih-n/l-ao' },
    { pos: 'nn', tokens: 'brother-in-law', phones: 'b-r-ah-dh-er-ih-n-l-ao', stresses: '1/0-0-1', syllables: 'b-r-ah/dh-er/ih-n/l-ao' },
    { pos: 'jj', tokens: 'off-site', phones: 'ao-f-s-ay-t', stresses: '1-1', syllables: 'ao-f/s-ay-t' },
    { pos: 'jj', tokens: 'up-to-date', phones: 'ah-p-t-uw-d-ey-t', stresses: '1-1-1', syllables: 'ah-p/t-uw/d-ey-t' },
    { pos: 'nn', tokens: 'state-of-the-art', phones: 's-t-ey-t-ah-v-dh-ah-aa-r-t', stresses: '1-1-0-1', syllables: 's-t-ey-t/ah-v/dh-ah/aa-r-t' },
    { pos: 'nn', tokens: 'self-esteem', phones: 's-eh-l-f-ah-s-t-iy-m', stresses: '1-0/1', syllables: 's-eh-l-f/ah/s-t-iy-m' },
    { pos: 'nn', tokens: 'merry-go-round', phones: 'm-eh-r-iy-g-ow-r-aw-n-d', stresses: '1/0-1-1', syllables: 'm-eh/r-iy/g-ow/r-aw-n-d' },
    { pos: 'jj', tokens: 'man-eating', phones: 'm-ae-n-iy-t-ih-ng', stresses: '1-1/0', syllables: 'm-ae-n/iy/t-ih-ng' },
    { pos: 'cd', tokens: 'twenty-one', phones: 't-w-eh-n-t-iy-w-ah-n', stresses: '1/0-1', syllables: 't-w-eh-n/t-iy/w-ah-n' },
    { pos: 'jj', tokens: 'twenty-first', phones: 't-w-eh-n-t-iy-f-er-s-t', stresses: '1/0-1', syllables: 't-w-eh-n/t-iy/f-er-s-t' },
    { pos: 'jj', tokens: 'thirty-second', phones: 'th-er-t-iy-s-eh-k-ah-n-d', stresses: '1/0-1/0', syllables: 'th-er/t-iy/s-eh/k-ah-n-d' },
    { pos: 'jj', tokens: 'happy-go-lucky', phones: 'hh-ae-p-iy-g-ow-l-ah-k-iy', stresses: '1/0-1-1/0', syllables: 'hh-ae/p-iy/g-ow/l-ah/k-iy' },
    { pos: 'nn', tokens: 'editor-in-chief', phones: 'eh-d-ah-t-er-ih-n-ch-iy-f', stresses: '1/0/0-0-1', syllables: 'eh/d-ah/t-er/ih-n/ch-iy-f' },
    { pos: 'jj', tokens: 'over-the-counter', phones: 'ow-v-er-dh-ah-k-aw-n-t-er', stresses: '1/0-0-1/0', syllables: 'ow/v-er/dh-ah/k-aw-n/t-er' },
    { pos: 'jj', tokens: 'long-term', phones: 'l-ao-ng-t-er-m', stresses: '1-1', syllables: 'l-ao-ng/t-er-m' },
    { pos: 'jj', tokens: 'high-speed', phones: 'hh-ay-s-p-iy-d', stresses: '1-1', syllables: 'hh-ay/s-p-iy-d' },
    { pos: 'jj', tokens: 'in-depth', phones: 'ih-n-d-eh-p-th', stresses: '0-1', syllables: 'ih-n/d-eh-p-th' },
    { pos: 'jj', tokens: 'full-length', phones: 'f-uh-l-l-eh-ng-k-th', stresses: '1-1', syllables: 'f-uh-l/l-eh-ng-k-th' },
    { pos: 'jj', tokens: 'part-time', phones: 'p-aa-r-t-t-ay-m', stresses: '1-1', syllables: 'p-aa-r-t/t-ay-m' },
    { pos: 'jj', tokens: 'sun-dried', phones: 's-ah-n-d-r-ay-d', stresses: '1-1', syllables: 's-ah-n/d-r-ay-d' },
    { pos: 'jj', tokens: 'well-off', phones: 'w-eh-l-ao-f', stresses: '1-1', syllables: 'w-eh-l/ao-f' },
    { pos: 'jj', tokens: 'well-known', phones: 'w-eh-l-n-ow-n', stresses: '1-1', syllables: 'w-eh-l/n-ow-n' },
    { pos: 'nn', tokens: 'gift-wrap', phones: 'g-ih-f-t-r-ae-p', stresses: '1-1', syllables: 'g-ih-f-t/r-ae-p' },
    { pos: 'nn', tokens: 'follow-up', phones: 'f-aa-l-ow-ah-p', stresses: '1/0-1', syllables: 'f-aa/l-ow/ah-p' },
    { pos: 'nn', tokens: 'well-being', phones: 'w-eh-l-b-iy-ih-ng', stresses: '1-1/0', syllables: 'w-eh-l/b-iy/ih-ng' },
    { pos: 'jj', tokens: 'good-looking', phones: 'g-uh-d-l-uh-k-ih-ng', stresses: '1-1/0', syllables: 'g-uh-d/l-uh/k-ih-ng' },
    { pos: 'jj', tokens: 'knee-length', phones: 'n-iy-l-eh-ng-k-th', stresses: '1-1', syllables: 'n-iy/l-eh-ng-k-th' },
    { pos: 'nn', tokens: 'runner-up', phones: 'r-ah-n-er-ah-p', stresses: '1/0-1', syllables: 'r-ah/n-er/ah-p' },
    { pos: 'nn', tokens: 'tip-off', phones: 't-ih-p-ao-f', stresses: '1-1', syllables: 't-ih-p/ao-f' },
    { pos: 'nn', tokens: 'blush-on', phones: 'b-l-ah-sh-aa-n', stresses: '1-1', syllables: 'b-l-ah-sh/aa-n' },
    { pos: 'jj', tokens: 'sugar-free', phones: 'sh-uh-g-er-f-r-iy', stresses: '1/0-1', syllables: 'sh-uh/g-er/f-r-iy' },
    { pos: 'jj', tokens: 'ice-cold', phones: 'ay-s-k-ow-l-d', stresses: '1-1', syllables: 'ay-s/k-ow-l-d' },
    { pos: 'jj', tokens: 'far-flung', phones: 'f-aa-r-f-l-ah-ng', stresses: '1-1', syllables: 'f-aa-r/f-l-ah-ng' },
    { pos: 'nn', tokens: 'high-rise', phones: 'hh-ay-r-ay-z', stresses: '1-1', syllables: 'hh-ay/r-ay-z' },
    { pos: 'jj', tokens: 'life-size', phones: 'l-ay-f-s-ay-z', stresses: '1-1', syllables: 'l-ay-f/s-ay-z' },
    { pos: 'jj', tokens: 'king-size', phones: 'k-ih-ng-s-ay-z', stresses: '1-1', syllables: 'k-ih-ng/s-ay-z' },
    { pos: 'jj', tokens: 'next-door', phones: 'n-eh-k-s-t-d-ao-r', stresses: '1-1', syllables: 'n-eh-k-s-t/d-ao-r' },
    { pos: 'jj', tokens: 'full-time', phones: 'f-uh-l-t-ay-m', stresses: '1-1', syllables: 'f-uh-l/t-ay-m' },
    { pos: 'jj', tokens: 'forty-acre', phones: 'f-ao-r-t-iy-ey-k-er', stresses: '1/0-1/0', syllables: 'f-ao-r/t-iy/ey/k-er' },
    { pos: 'jj', tokens: 'on-campus', phones: 'aa-n-k-ae-m-p-ah-s', stresses: '1-1/0', syllables: 'aa-n/k-ae-m/p-ah-s' },
    { pos: 'jj', tokens: 'family-run', phones: 'f-ae-m-ah-l-iy-r-ah-n', stresses: '1/0/0-1', syllables: 'f-ae/m-ah/l-iy/r-ah-n' },
    { pos: 'jj', tokens: 'low-grade', phones: 'l-ow-g-r-ey-d', stresses: '1-1', syllables: 'l-ow/g-r-ey-d' },
    { pos: 'jj', tokens: 'round-trip', phones: 'r-aw-n-d-t-r-ih-p', stresses: '1-1', syllables: 'r-aw-n-d/t-r-ih-p'}
  ];
    
    for (let i = 0; i < pool1.length; i++) {
      const feats = RiTa.analyze(pool1[i]);
      eq(feats.pos, feats1[i].pos, '[pos]fail at ' + pool1[i]);
      eq(feats.tokens, feats1[i].tokens, '[tokens]fail at ' + pool1[i]);
      eq(feats.phones, feats1[i].phones, '[phones]fail at ' + pool1[i]);
      eq(feats.stresses, feats1[i].stresses, '[stresses]fail at ' + pool1[i]);
      eq(feats.syllables, feats1[i].syllables, '[syllables]fail at ' + pool1[i]);
      eql(feats.tokens.split(' '), RiTa.tokenize(pool1[i]));
    }

    // pool2: some parts not in dict
    // pool2A: the missing part is a transfromation of a word in dict
    let pool2A = ['oft-cited', 'deeply-nested', 'empty-handed', 'sergeant-at-arms', 'left-handed', 'long-haired', 'breath-taking', 'self-centered', 'single-minded', 'short-tempered', 'one-sided', 'warm-blooded', 'cold-blooded', 'bell-bottoms', 'corn-fed', 'able-bodied'];
    let feats2A = [
      { pos: 'jj', tokens: 'oft-cited', phones: 'ao-f-t-s-ih-t-ah-d', stresses: '1-1/0', syllables: 'ao-f-t/s-ih/t-ah-d' },
      { pos: 'jj', tokens: 'deeply-nested', phones: 'd-iy-p-l-iy-n-eh-s-t-ah-d', stresses: '1/0-1/0', syllables: 'd-iy-p/l-iy/n-eh/s-t-ah-d' },
      { pos: 'jj', tokens: 'empty-handed', phones: 'eh-m-p-t-iy-hh-ae-n-d-ah-d', stresses: '1/0-1/0', syllables: 'eh-m-p/t-iy/hh-ae-n/d-ah-d' },
      { pos: 'nn', tokens: 'sergeant-at-arms', phones: 's-aa-r-jh-ah-n-t-ae-t-aa-r-m-z', stresses: '1/0-1-1', syllables: 's-aa-r/jh-ah-n-t/ae-t/aa-r-m-z' },
      { pos: 'jj', tokens: 'left-handed', phones: 'l-eh-f-t-hh-ae-n-d-ah-d', stresses: '1-1/0', syllables: 'l-eh-f-t/hh-ae-n/d-ah-d' },
      { pos: 'jj', tokens: 'long-haired', phones: 'l-ao-ng-hh-eh-r-d', stresses: '1-1', syllables: 'l-ao-ng/hh-eh-r-d' },
      { pos: 'jj', tokens: 'breath-taking', phones: 'b-r-eh-th-t-ey-k-ih-ng', stresses: '1-1/0', syllables: 'b-r-eh-th/t-ey/k-ih-ng' },
      { pos: 'jj', tokens: 'self-centered', phones: 's-eh-l-f-s-eh-n-t-er-d', stresses: '1-1/0', syllables: 's-eh-l-f/s-eh-n/t-er-d' },
      { pos: 'jj', tokens: 'single-minded', phones: 's-ih-ng-g-ah-l-m-ay-n-d-ah-d', stresses: '1/0-1/0', syllables: 's-ih-ng/g-ah-l/m-ay-n/d-ah-d' },
      { pos: 'jj', tokens: 'short-tempered', phones: 'sh-ao-r-t-t-eh-m-p-er-d', stresses: '1-1/0', syllables: 'sh-ao-r-t/t-eh-m/p-er-d' },
      { pos: 'jj', tokens: 'one-sided', phones: 'w-ah-n-s-ay-d-ah-d', stresses: '1-1/0', syllables: 'w-ah-n/s-ay/d-ah-d' },
      { pos: 'jj', tokens: 'warm-blooded', phones: 'w-ao-r-m-b-l-ah-d-ah-d', stresses: '1-1/0', syllables: 'w-ao-r-m/b-l-ah/d-ah-d' },
      { pos: 'jj', tokens: 'cold-blooded', phones: 'k-ow-l-d-b-l-ah-d-ah-d', stresses: '1-1/0', syllables: 'k-ow-l-d/b-l-ah/d-ah-d' },
      { pos: 'nn', tokens: 'bell-bottoms', phones: 'b-eh-l-b-aa-t-ah-m-z', stresses: '1-1/0', syllables: 'b-eh-l/b-aa/t-ah-m-z' },
      { pos: 'jj', tokens: 'corn-fed', phones: 'k-ao-r-n-f-eh-d', stresses: '1-1', syllables: 'k-ao-r-n/f-eh-d' },
      { pos: 'jj', tokens: 'able-bodied', phones: 'ey-b-ah-l-b-aa-d-iy-d', stresses: '1/0-1/0', syllables: 'ey/b-ah-l/b-aa/d-iy-d'}
    ];
    for (let i = 0; i < pool2A.length; i++) {
      const feats = RiTa.analyze(pool2A[i]);
      eq(feats.pos, feats2A[i].pos, '[pos]fail at ' + pool2A[i]);
      eq(feats.tokens, feats2A[i].tokens, '[tokens]fail at ' + pool2A[i]);
      eq(feats.phones, feats2A[i].phones, '[phones]fail at ' + pool2A[i]);
      eq(feats.stresses, feats2A[i].stresses, '[stresses]fail at ' + pool2A[i]);
      eq(feats.syllables, feats2A[i].syllables, '[syllables]fail at ' + pool2A[i]);
      eql(feats.tokens.split(' '), RiTa.tokenize(pool2A[i]));
    }

    // pool2B: the missing part has no connection to any word in dict
    let pool2B = ["de-emphasize", 're-apply', 'ho-hum', 'co-manage', 'co-manager', 'neo-liberalism', 'u-turn', 'x-ray', 'a-frame', 'high-tech', 'nitty-gritty'];
    let feats2B = [
      { pos: 'vb', tokens: 'de-emphasize', phones: 'd-ih-eh-m-f-ah-s-ay-z', stresses: '0-1/0/0', syllables: 'd-ih/eh-m/f-ah/s-ay-z' },
      { pos: 'vb', tokens: 're-apply', phones: 'r-iy-ah-p-l-ay1', stresses: '0-0/1', syllables: 'r-iy/ah/p-l-ay1' },
      { pos: 'uh', tokens: 'ho-hum', phones: 'hh-ow-hh-ah-m', stresses: '0-1', syllables: 'hh-ow/hh-ah-m' },
      { pos: 'vb', tokens: 'co-manage', phones: 'k-ow-m-ae-n-ah-jh', stresses: '0-1/0', syllables: 'k-ow/m-ae/n-ah-jh' },
      { pos: 'nn', tokens: 'co-manager', phones: 'k-ow-m-ae-n-ah-jh-er', stresses: '0-1/0/0', syllables: 'k-ow/m-ae/n-ah/jh-er' },
      { pos: 'nn', tokens: 'neo-liberalism', phones: 'n-iy-ow-l-ih-b-er-ah-l-ih-z-ah-m', stresses: '0/0-1/0/0/0/0', syllables: 'n-iy/ow/l-ih/b-er/ah/l-ih/z-ah-m' },
      { pos: 'nn', tokens: 'u-turn', phones: 'y-uw-t-er-n', stresses: '1-1', syllables: 'y-uw/t-er-n' },
      { pos: 'nn', tokens: 'x-ray', phones: 'eh-k-z-r-ey', stresses: '1-1', syllables: 'eh-k-z/r-ey' },
      { pos: 'nn', tokens: 'a-frame', phones: 'ey-f-r-ey-m', stresses: '1-1', syllables: 'ey/f-r-ey-m' },
      { pos: 'jj', tokens: 'high-tech', phones: 'hh-ay-t-eh-k', stresses: '1-1', syllables: 'hh-ay/t-eh-k' },
      { pos: 'nn', tokens: 'nitty-gritty', phones: 'n-ih-t-iy-g-r-ih-t-iy', stresses: '1/0-1/0', syllables: 'n-ih/t-iy/g-r-ih/t-iy'}
    ];
    for (let i = 0; i < pool2B.length; i++) {
      const feats = RiTa.analyze(pool2B[i]);
      eq(feats.pos, feats2B[i].pos, '[pos]fail at ' + pool2B[i]);
      if (["de-emphasize", 're-apply', 'u-turn', 'x-ray'].includes(pool2B[i])) continue; // LTS related error, see https://github.com/dhowe/rita/issues/185
      eq(feats.tokens, feats2B[i].tokens, '[tokens]fail at ' + pool2B[i]);
      eq(feats.phones, feats2B[i].phones, '[phones]fail at ' + pool2B[i]);
      eq(feats.stresses, feats2B[i].stresses, '[stresses]fail at ' + pool2B[i]);
      eq(feats.syllables, feats2B[i].syllables, '[syllables]fail at ' + pool2B[i]);
      eql(feats.tokens.split(' '), RiTa.tokenize(pool2B[i]));
    }

    // pool3 all parts are not in dict
    let pool3 = ["co-op", "roly-poly", "topsy-turvy"];
    let feats3 = [
      { pos: 'nn', tokens: 'co-op', phones: 'k-ow-ah-p', stresses: '0-0', syllables: 'k-ow/ah-p' },
      { pos: 'jj', tokens: 'roly-poly', phones: 'r-ow-l-iy-p-aa-l-iy', stresses: '1/0-1/0', syllables: 'r-ow/l-iy/p-aa/l-iy' },
      { pos: 'jj', tokens: 'topsy-turvy', phones: 't-aa-p-s-iy-t-er-v-iy', stresses: '1/0-1/0', syllables: 't-aa-p/s-iy/t-er/v-iy'}
    ];
    for (let i = 0; i < pool3.length; i++) {
      const feats = RiTa.analyze(pool3[i]);
      eq(feats.pos, feats3[i].pos, '[pos]fail at ' + pool3[i]);
      eq(feats.tokens, feats3[i].tokens, '[tokens]fail at ' + pool3[i]);
      eq(feats.phones, feats3[i].phones, '[phones]fail at ' + pool3[i]);
      eq(feats.stresses, feats3[i].stresses, '[stresses]fail at ' + pool3[i]);
      eq(feats.syllables, feats3[i].syllables, '[syllables]fail at ' + pool3[i]);
      eql(feats.tokens.split(' '), RiTa.tokenize(pool3[i]));
    }
    RiTa.SILENCE_LTS = lts; // reset
  });

  0 && it('Should treat hyphenated words as separate tokens', function () {  // see https://github.com/dhowe/rita/issues/65

    let lts = RiTa.SILENCE_LTS; // remembers
    RiTa.SILENCE_LTS = true; // disable LTS logging 

    // treating parts as separate tokens:
    let feats = RiTa.analyze("off-site");
    eq(feats["pos"], "in - nn");
    eq(feats["tokens"], "off - site");
    eq(feats["phones"], 'ao-f - s-ay-t');
    eq(feats["stresses"], "1 - 1");
    eq(feats["syllables"], "ao-f - s-ay-t");
    eql(feats["tokens"].split(' '), RiTa.tokenize("off-site"));

    feats = RiTa.analyze("oft-cited");
    eq(feats["pos"], "rb - vbd");
    eq(feats["tokens"], "oft - cited");
    eq(feats["phones"], 'ao-f-t - s-ih-t-ah-d');
    eq(feats["stresses"], "1 - 1/0");
    eq(feats["syllables"], "ao-f-t - s-ih/t-ah-d");
    eql(feats["tokens"].split(' '), RiTa.tokenize("oft-cited"));

    feats = RiTa.analyze("deeply-nested");
    eq(feats["pos"], "rb - vbd");
    eq(feats["tokens"], "deeply - nested");
    eq(feats["phones"], 'd-iy-p-l-iy - n-eh-s-t-ah-d');
    eq(feats["stresses"], "1/0 - 1/0");
    eq(feats["syllables"], "d-iy-p/l-iy - n-eh/s-t-ah-d");
    eql(feats["tokens"].split(' '), RiTa.tokenize("deeply-nested"));

    feats = RiTa.analyze("father-in-law");
    eq(feats["pos"], "nn - in - nn");
    eq(feats["tokens"], "father - in - law");
    eq(feats["phones"], 'f-aa-dh-er - ih-n - l-ao');
    eq(feats["stresses"], "1/0 - 0 - 1");
    eq(feats["syllables"], "f-aa/dh-er - ih-n - l-ao");
    eql(feats["tokens"].split(' '), RiTa.tokenize("father-in-law"));

    feats = RiTa.analyze("up-to-date");
    eq(feats["pos"], "in - to - nn");
    eq(feats["tokens"], "up - to - date");
    eq(feats["phones"], 'ah-p - t-uw - d-ey-t');
    eq(feats["stresses"], "1 - 1 - 1");
    eq(feats["syllables"], "ah-p - t-uw - d-ey-t");
    eql(feats["tokens"].split(' '), RiTa.tokenize("up-to-date"));

    feats = RiTa.analyze("state-of-the-art");
    eq(feats["pos"], "jj - in - dt - nn");
    eq(feats["tokens"], "state - of - the - art");
    eq(feats["phones"], 's-t-ey-t - ah-v - dh-ah - aa-r-t');
    eq(feats["stresses"], "1 - 1 - 0 - 1");
    eq(feats["syllables"], "s-t-ey-t - ah-v - dh-ah - aa-r-t");
    eql(feats["tokens"].split(' '), RiTa.tokenize("state-of-the-art"));

    RiTa.SILENCE_LTS = lts; // reset
  });

  it('Should handle dashes', function(){
    // https://github.com/dhowe/rita/issues/176

    let lts = RiTa.SILENCE_LTS;
    RiTa.SILENCE_LTS = true; // disable LTS logging 

    //U+2012
    let sentence = "Teaching‒the profession has always appealed to me."
    let feats = RiTa.analyze(sentence);
    eq(feats["pos"], "vbg ‒ dt nn vbz rb vbd to prp .");
    eq(feats["tokens"], "Teaching \u2012 the profession has always appealed to me .");
    eql(feats["tokens"].split(' '), RiTa.tokenize(sentence));
   
    // U+2013
    sentence = "The teacher assigned pages 101–181 for tonight's reading material. "
    feats = RiTa.analyze(sentence);
    eq(feats["pos"], "dt nn vbn nns cd \u2013 cd in nns vbg jj .");
    eq(feats["tokens"], "The teacher assigned pages 101 – 181 for tonight's reading material .");
    eql(feats["tokens"].split(' '), RiTa.tokenize(sentence));

    //U+2014
     sentence = "Type two hyphens—without a space before, after, or between them."
     feats = RiTa.analyze(sentence);
    eq(feats["pos"], "nn cd nns \u2014 in dt nn in , in , cc in prp .");
    eq(feats["tokens"], "Type two hyphens — without a space before , after , or between them .");
    eql(feats["tokens"].split(' '), RiTa.tokenize(sentence));

    //U+2014
    sentence = "Phones, hand-held computers, and built-in TVs—each a possible distraction—can lead to a dangerous situation if used while driving."
    feats = RiTa.analyze(sentence);
    eq(feats["pos"], "nns , jj nns , cc jj nnps \u2014 dt dt jj nn \u2014 md vb to dt jj nn in vbn in vbg .");
    eq(feats["tokens"], "Phones , hand-held computers , and built-in TVs — each a possible distraction — can lead to a dangerous situation if used while driving .");
    eql(feats["tokens"].split(' '), RiTa.tokenize(sentence));

    // "--"
    sentence ="He is afraid of two things--spiders and senior prom." ;
    feats = RiTa.analyze(sentence);
    eq(feats["pos"], "prp vbz jj in cd nns -- nns cc jj nn .");
    eq(feats["tokens"], "He is afraid of two things -- spiders and senior prom .");
    eql(feats["tokens"].split(' '), RiTa.tokenize(sentence));

    RiTa.SILENCE_LTS = lts;
  })

  it('Should call stresses', function () {

    let result, answer, word;

    eq(RiTa.stresses(""), "");
    eq(RiTa.stresses("women"), "1/0", "women");

    if (!hasLex) return; // NOTE: below may fail without lexicon

    eq(RiTa.stresses("The emperor had no clothes on"), "0 1/0/0 1 1 1 1");
    eq(RiTa.stresses("The emperor had no clothes on."), "0 1/0/0 1 1 1 1 .");
    eq(RiTa.stresses("The emperor had no clothes on. The King is fat."), "0 1/0/0 1 1 1 1 . 0 1 1 1 .");

    word = "to present, to export, to decide, to begin";
    result = RiTa.stresses(word);
    answer = hasLex ? "1 1/0 , 1 1/0 , 1 0/1 , 1 0/1" : '1 1/1 , 1 0/1 , 1 0/1 , 1 1/1';
    eq(result, answer, word);

    word = "The dog ran faster than the other dog.  But the other dog was prettier."
    result = RiTa.stresses(word);
    answer = "0 1 1 1/0 1 0 1/0 1 . 1 0 1/0 1 1 1/0/0 .";
    eq(result, answer, word);

    // different without lexicon ------------------------------------------

    eq(RiTa.stresses("chevrolet"), hasLex ? "0/0/1" : '1/0/0', "chevrolet");
    eq(RiTa.stresses("genuine"), hasLex ? "1/0/0" : '1/0/1', "genuine");

    word = "to preSENT, to exPORT, to deCIDE, to beGIN";
    result = RiTa.stresses(word);
    answer = hasLex ? "1 1/0 , 1 1/0 , 1 0/1 , 1 0/1" : '1 1/1 , 1 0/1 , 1 0/1 , 1 1/1';
    eq(result, answer, word);
  });

  it('Should call phones', function () {

    let silent = RiTa.SILENCE_LTS;
    RiTa.SILENCE_LTS = true;

    let result, answer;

    eq(RiTa.phones(""), "");
    eq(RiTa.phones("b"), "b");
    eq(RiTa.phones("B"), "b");
    eq(RiTa.phones("The"), "dh-ah");
    eq(RiTa.phones("The."), "dh-ah .");
    eq(RiTa.phones("flowers"), "f-l-aw-er-z");
    eq(RiTa.phones("mice"), "m-ay-s");
    eq(RiTa.phones("ant"), "ae-n-t");

    // different without lexicon ------------------------------------------

    result = RiTa.phones("The boy jumped over the wild dog.");
    answer = hasLex ? "dh-ah b-oy jh-ah-m-p-t ow-v-er dh-ah w-ay-l-d d-ao-g ." : 'dh-ah b-oy jh-ah-m-p-t ow-v-er dh-ah w-ay-l-d d-aa-g .';
    eq(result, answer);

    result = RiTa.phones("The boy ran to the store.");
    answer = hasLex ? "dh-ah b-oy r-ae-n t-uw dh-ah s-t-ao-r ." : 'dh-ah b-oy r-ah-n t-ow dh-ah s-t-ao-r .';
    eq(result, answer);

    result = RiTa.phones("The dog ran faster than the other dog.  But the other dog was prettier.");
    answer = hasLex ? "dh-ah d-ao-g r-ae-n f-ae-s-t-er dh-ae-n dh-ah ah-dh-er d-ao-g . b-ah-t dh-ah ah-dh-er d-ao-g w-aa-z p-r-ih-t-iy-er ." : 'dh-ah d-aa-g r-ah-n f-ae-s-t-er th-ae-n dh-ah ah-dh-er d-aa-g . b-ah-t dh-ah ah-dh-er d-aa-g w-ah-z p-r-eh-t-iy-er .';
    eq(result, answer);

    eq(RiTa.phones("quiche"), hasLex ? "k-iy-sh" : 'k-w-ih-sh');
    eq(RiTa.phones("said"), hasLex ? "s-eh-d" : 's-ey-d');
    eq(RiTa.phones("chevrolet"), hasLex ? "sh-eh-v-r-ow-l-ey" : 'ch-eh-v-r-ow-l-ah-t');
    eq(RiTa.phones("women"), hasLex ? "w-ih-m-eh-n" : 'w-ow-m-eh-n');
    eq(RiTa.phones("genuine"), hasLex ? "jh-eh-n-y-uw-w-ah-n" : 'jh-eh-n-y-ah-ay-n');

    if (!hasLex) return; // NOTE: below may fail without lexicon

    expect(RiTa.phones("deforestations")).eq('d-ih-f-ao-r-ih-s-t-ey-sh-ah-n-z');
    expect(RiTa.phones("schizophrenias")).eq('s-k-ih-t-s-ah-f-r-iy-n-iy-ah-z');

    RiTa.SILENCE_LTS = silent;
  });

  it('Should call phones(raw)', function () {

    let silent = RiTa.SILENCE_LTS;
    RiTa.SILENCE_LTS = true;

    let result, answer;
    let opts = { 'rawPhones': true };

    eq(RiTa.phones("", opts), "");
    eq(RiTa.phones("b", opts), "b");
    eq(RiTa.phones("B", opts), "b");
    eq(RiTa.phones("The", opts), "dh-ah");
    eq(RiTa.phones("flowers", opts), "f-l-aw-er-z");
    eq(RiTa.phones("mice", opts), "m-ay-s");
    eq(RiTa.phones("ant", opts), "ae-n-t");

    eq(RiTa.phones("The.", opts), "dh-ah .");

    // different without lexicon ------------------------------------------

    result = RiTa.phones("The boy jumped over the wild dog.", opts);
    answer = hasLex ? "dh-ah b-oy jh-ah-m-p-t ow-v-er dh-ah w-ay-l-d d-ao-g ." : 'dh-ah b-oy jh-ah-m-p-t ow-v-er dh-ah w-ay-l-d d-aa-g .';
    eq(result, answer);

    result = RiTa.phones("The boy ran to the store.", opts);
    answer = hasLex ? "dh-ah b-oy r-ae-n t-uw dh-ah s-t-ao-r ." : 'dh-ah b-oy r-ah-n t-ow dh-ah s-t-ao-r .';
    eq(result, answer);

    result = RiTa.phones("The dog ran faster than the other dog.  But the other dog was prettier.", opts);
    answer = hasLex ? "dh-ah d-ao-g r-ae-n f-ae-s-t-er dh-ae-n dh-ah ah-dh-er d-ao-g . b-ah-t dh-ah ah-dh-er d-ao-g w-aa-z p-r-ih-t-iy-er ." : 'dh-ah d-aa-g r-ah-n f-ae-s-t-er th-ae-n dh-ah ah-dh-er d-aa-g . b-ah-t dh-ah ah-dh-er d-aa-g w-ah-z p-r-eh-t-iy-er .';
    eq(result, answer);

    eq(RiTa.phones("quiche", opts), hasLex ? "k-iy-sh" : 'k-w-ih-sh');
    eq(RiTa.phones("said", opts), hasLex ? "s-eh-d" : 's-ey-d');
    eq(RiTa.phones("chevrolet", opts), hasLex ? "sh-eh-v-r-ow-l-ey" : 'ch-eh-v-r-ow-l-ah-t');
    eq(RiTa.phones("women", opts), hasLex ? "w-ih-m-eh-n" : 'w-ow-m-eh-n');
    eq(RiTa.phones("genuine", opts), hasLex ? "jh-eh-n-y-uw-w-ah-n" : 'jh-eh-n-y-ah-ay-n');

    if (!hasLex) return; // NOTE: below may fail without lexicon

    expect(RiTa.phones("deforestations", opts)).eq('d-ih-f-ao-r-ih-s-t-ey-sh-ah-n-z');
    expect(RiTa.phones("schizophrenias", opts)).eq('s-k-ih-t-s-ah-f-r-iy-n-iy-ah-z');

    RiTa.SILENCE_LTS = silent;
  });

  it('Should call syllables', function () {

    let silent = RiTa.SILENCE_LTS;
    RiTa.SILENCE_LTS = true;
    expect(RiTa.syllables('')).eq('');
    expect(RiTa.syllables('clothes')).eq('k-l-ow-dh-z');

    // different without lexicon ------------------------------------------

    expect(RiTa.syllables("1903")).eq(hasLex ? 'w-ah-n/n-ih-n/z-ih/r-ow/th-r-iy' : '1903');

    let nums = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    for (let i = 0; i < 10; i++) {
      let istr = i + "";
      expect(RiTa.syllables(istr)).eq((hasLex ? RiTa.syllables(nums[i]) : istr));
    }

    expect(RiTa.syllables('deforestations')).eq(hasLex ? 'd-ih/f-ao/r-ih/s-t-ey/sh-ah-n-z' : 'd-ah/f-ao-r/s-t-ey/sh-ah-n-z');
    expect(RiTa.syllables("chevrolet")).eq(hasLex ? "sh-eh-v/r-ow/l-ey" : 'ch-eh-v/r-ow/l-ah-t');
    expect(RiTa.syllables("women")).eq(hasLex ? "w-ih/m-eh-n" : 'w-ow/m-eh-n');
    expect(RiTa.syllables("genuine")).eq(hasLex ? "jh-eh-n/y-uw/w-ah-n" : 'jh-eh-n/y-ah/ay-n');

    let input, expected;

    input = 'The emperor had no clothes on.';
    expected = hasLex ? 'dh-ah eh-m/p-er/er hh-ae-d n-ow k-l-ow-dh-z aa-n .' : 'dh-ah eh-m/p-er/er hh-ae-d n-ow k-l-ow-dh-z ah-n .';
    expect(RiTa.syllables(input)).eq(expected);

    input = 'The dog ran faster than the other dog. But the other dog was prettier.';
    expected = hasLex ? 'dh-ah d-ao-g r-ae-n f-ae/s-t-er dh-ae-n dh-ah ah/dh-er d-ao-g . b-ah-t dh-ah ah/dh-er d-ao-g w-aa-z p-r-ih/t-iy/er .' : 'dh-ah d-aa-g r-ah-n f-ae/s-t-er th-ae-n dh-ah ah/dh-er d-aa-g . b-ah-t dh-ah ah/dh-er d-aa-g w-ah-z p-r-eh/t-iy/er .';
    expect(RiTa.syllables(input)).eq(expected);

    input = 'The dog ran faster than the other dog. But the other dog was prettier.';
    expected = hasLex ? 'dh-ah d-ao-g r-ae-n f-ae/s-t-er dh-ae-n dh-ah ah/dh-er d-ao-g . b-ah-t dh-ah ah/dh-er d-ao-g w-aa-z p-r-ih/t-iy/er .' : 'dh-ah d-aa-g r-ah-n f-ae/s-t-er th-ae-n dh-ah ah/dh-er d-aa-g . b-ah-t dh-ah ah/dh-er d-aa-g w-ah-z p-r-eh/t-iy/er .';
    expect(RiTa.syllables(input)).eq(expected);

    input = 'The emperor had no clothes on.';
    expected = hasLex ? 'dh-ah eh-m/p-er/er hh-ae-d n-ow k-l-ow-dh-z aa-n .' : 'dh-ah eh-m/p-er/er hh-ae-d n-ow k-l-ow-dh-z ah-n .';
    expect(RiTa.syllables(input)).eq(expected);

    RiTa.SILENCE_LTS = silent;
  });

  it('Should pluralize phrases', function () {
    let input, expected;
    input = "set of choice"; expected = "set of choices";
    expect(RiTa.pluralize(input)).eq(expected);

    input = "bag of chocolate"; expected = "bag of chocolates";
    expect(RiTa.pluralize(input)).eq(expected);

    input = "gaggle of goose"; expected = "gaggle of geese";
    expect(RiTa.pluralize(input)).eq(expected);
  });

  it('Should do nothing when input to pluralize is already plural', function () {
    // same for mass nouns
    let tests = ["tidings", "schnapps", "canvases", "censuses", "bonuses", "isthmuses", "thermoses", "circuses", "tongs", "emeriti"];
    tests.forEach((t, i) => {
      let res = RiTa.pluralize(t, { dbug: 0 });
      if (res !== t) console.error(i + ') Fail: ' + t + ' -> ' + res);
      expect(RiTa.pluralize(t)).eq(t);
    });
  });

  it('Should return true for already plural nouns', function () {
    let tests = ["tidings", "schnapps", "canvases", "censuses", "bonuses", "isthmuses", "thermoses", "circuses", "tongs", "emeriti"];
    tests.forEach((t, i) => {
      let res = RiTa.inflector.isPlural(t, { dbug: 0 });
      if (!res) console.error(i + ') Fail: ' + t + ' -> ' + res);
      expect(res).is.true;
    });
  });

  it('Should handle singular nouns in Tagger.allTags', function () {
    if (!hasLex) this.skip();
    let tests = ["tiding", "census", "bonus", "thermos", "circus"];
    tests.forEach((t, i) => {
      let res = RiTa.tagger.allTags(t, false);
      if (!res.includes('nn')) console.error(i + ') Fail: ' + t + ' -> ' + JSON.stringify(res));
      expect(res.includes('nn')).to.be.true;
    });
  });


  it('Should handle number (singular/plural)', function () { // SYNC:

    //expect(RiTa.singularize('abyss', { dbug: 1 })).eq('abyss');return;
    //expect(RiTa.pluralize('abyss', { dbug: 1 })).eq('abysses');return;
    //expect(RiTa.inflector.isPlural('dreariness', { dbug: 1 })).eq(true);return;

    expect(RiTa.singularize()).eq("");
    expect(RiTa.singularize("")).eq("");
    expect(function () { RiTa.singularize([1]) }).to.throw();
    expect(function () { RiTa.singularize(1) }).to.throw();

    expect(RiTa.pluralize()).eq("");
    expect(RiTa.pluralize("")).eq("");
    expect(function () { RiTa.pluralize([1]) }).to.throw();
    expect(function () { RiTa.pluralize(1) }).to.throw();

    let testPairs = [
      'abysses', 'abyss',
      'knives', 'knife',
      'dazes', 'daze',
      'hives', 'hive',
      'dives', 'dive',
      'octopuses', 'octopus',
      'abalone', 'abalone',
      'wildlife', 'wildlife',
      'minutiae', 'minutia',
      'spoofs', 'spoof',
      'proofs', 'proof',
      'roofs', 'roof',
      'disbeliefs', 'disbelief',
      'beliefs', 'belief',
      'indices', 'index',
      'accomplices', 'accomplice',
      'prognoses', 'prognosis',
      'taxis', 'taxi',
      'chiefs', 'chief',
      'monarchs', 'monarch',
      'lochs', 'loch',
      'stomachs', 'stomach',
      'Chinese', 'Chinese',
      'people', 'person',
      'humans', 'human',
      'germans', 'german',
      'romans', 'roman',
      'memoranda', 'memorandum',
      'data', 'datum',
      'geese', 'goose',
      'femurs', 'femur',
      'appendices', 'appendix',
      'theses', 'thesis',
      'alumni', 'alumnus',
      'solos', 'solo',
      'music', 'music',
      'oxen', 'ox',
      'money', 'money',
      'beef', 'beef',
      'tobacco', 'tobacco',
      'cargo', 'cargo',
      'golf', 'golf',
      'grief', 'grief',
      'cakes', 'cake',
      'tomatoes', 'tomato',
      'photos', 'photo',
      'smallpox', 'smallpox',
      'toes', 'toe',
      'mice', 'mouse',
      'lice', 'louse',
      'children', 'child',
      'gases', 'gas',
      'buses', 'bus',
      'happiness', 'happiness',
      'apotheoses', 'apotheosis',
      'stimuli', 'stimulus',
      'dogs', 'dog',
      'feet', 'foot',
      'teeth', 'tooth',
      'deer', 'deer',
      'sheep', 'sheep',
      'shrimp', 'shrimp',
      'men', 'man',
      'women', 'woman',
      'congressmen', 'congressman',
      'aldermen', 'alderman',
      'freshmen', 'freshman',
      'firemen', 'fireman',
      'grandchildren', 'grandchild',
      'menus', 'menu',
      'gurus', 'guru',
      'hardnesses', 'hardness',
      'fish', 'fish',
      'ooze', 'ooze',
      'enterprises', 'enterprise',
      'treatises', 'treatise',
      'houses', 'house',
      'chemises', 'chemise',
      'aquatics', 'aquatics',
      'mechanics', 'mechanics',
      'quarters', 'quarter',
      'motifs', 'motif',
      'turf', 'turf',
      'macaroni', 'macaroni',
      'spaghetti', 'spaghetti',
      'potpourri', 'potpourri',
      'electrolysis', 'electrolysis',
      'series', 'series',
      'crises', 'crisis',
      'corpora', 'corpus',
      'shortnesses', 'shortness',
      'dreariness', 'dreariness',
      'unwillingness', 'unwillingness',
      'moose', 'moose', 'lives', 'life',
      'additives', 'additive',
      'epochs', 'epoch',
      'ranchs', 'ranch',
      'alcoves', 'alcove',
      'memories', 'memory',
      'grooves', 'groove',
      'universes', 'universe',
      'toothbrushes', 'toothbrush',
      'clashes', 'clash',
      'addresses', 'address',
      'flashes', 'flash',
      'conclaves', 'conclave',
      'promises', 'promise',
      'spouses', 'spouse',
      'branches', 'branch',
      'lapses', 'lapse',
      'quizes', 'quiz',
      'spyglasses', 'spyglass',
      'overpasses', 'overpass',
      'clones', 'clones',
      'microwaves', 'microwave',
      'hypotheses', 'hypothesis',
      'pretenses', 'pretense',
      'latches', 'latch',
      'fetuses', 'fetus',
      'lighthouses', 'lighthouse',
      'genuses', 'genus',
      'zombies', 'zombie',
      'hearses', 'hearse',
      'trenches', 'trench',
      'paradoxes', 'paradox',
      'hippies', 'hippie',
      'yuppies', 'yuppie',
      'purses', 'purse',
      'hatches', 'hatch',
      'witches', 'witch',
      'sinuses', 'sinus',
      'phrases', 'phrase',
      'arches', 'arch',
      'duplexes', 'duplex',
      'missives', 'missive',
      'madhouses', 'madhouse',
      'pauses', 'pause',
      'heroes', 'hero',
      'sketches', 'sketch',
      'meshes', 'mesh',
      'brasses', 'brass',
      'marshes', 'marsh',
      'masses', 'mass',
      'impulses', 'impulse',
      'pelvises', 'pelvis',
      'fetishes', 'fetish',
      'gashes', 'gash',
      'directives', 'directive',
      'calories', 'calorie',
      'moves', 'move',
      'expanses', 'expanse',
      'briefcases', 'briefcase',
      'media', 'medium',
      'millennia', 'millennium',
      'consortia', 'consortium',
      'concerti', 'concerto',
      'septa', 'septum',
      'termini', 'terminus',
      'larvae', 'larva',
      'vertebrae', 'vertebra',
      'memorabilia', 'memorabilium',
      'hooves', 'hoof',
      'thieves', 'thief',
      'rabbis', 'rabbi',
      'flu', 'flu',
      'safaris', 'safari',
      'sheaves', 'sheaf',
      'uses', 'use',
      'pinches', 'pinch',
      'catharses', 'catharsis',
      'hankies', 'hanky',
      'whizzes', 'whiz',
      'selves', 'self',
      'bookshelves', 'bookshelf',
      'wheezes', 'wheeze',
      'diagnoses', 'diagnosis',
      'blondes', 'blonde',
      'eyes', 'eye',
      'swine', 'swine',
      'cognoscenti', 'cognoscenti',
      'bonsai', 'bonsai',
      'rice', 'rice',
      'clothes', 'clothes',
      'goddesses', 'goddess',
      'tresses', 'tress',
      'murderesses', 'murderess',
      'kisses', 'kiss',
    ];
    let res1, res2, res3, res4, Util = RiTa.Util, dbug = 0;

    for (let i = 0; i < testPairs.length; i += 2) {

      dbug && console.log(testPairs[i] + '/' + testPairs[i + 1]);

      let plural = testPairs[i];
      let singular = testPairs[i + 1];

      res1 = RiTa.singularize(plural, { dbug: dbug });
      res2 = RiTa.pluralize(singular, { dbug: dbug });
      res3 = RiTa.inflector.isPlural(plural, { dbug: dbug, fatal: false });
      res4 = RiTa.inflector.isPlural(singular, { dbug: dbug, fatal: false });

      // singularize
      expect(res1).eq(singular, 'FAIL1: singularize(' + plural
        + ') was ' + res1 + ', but expected ' + singular + '\n        '
        + 'pluralize(' + singular + ') was ' + res2 + '\n\n');

      // pluralize
      expect(res2).eq(plural, 'FAIL2: pluralize(' + singular
        + ') was ' + res2 + ', but expected ' + plural + '\n        '
        + 'singularize(' + plural + ') was ' + res1 + '\n\n');

      // isPlural
      expect(res3).eq(true, 'FAIL3: isPlural(' + plural + ') was false for plural noun\n\n');

      // isPlural
      let isMass = Util.MASS_NOUNS.includes(singular.toLowerCase());
      let isModal = singular.endsWith('ness') && !Util.MODAL_EXCEPTIONS.includes(singular.toLowerCase());
      if (!isMass && !isModal) {
        expect(res4).eq(false, 'FAIL4: isPlural(' + singular + ') was true for singular noun,'
          + ' isMassNoun=' + Util.MASS_NOUNS.includes(singular.toLowerCase())
          + ' isModalException=' + Util.MODAL_EXCEPTIONS.includes(singular.toLowerCase()) + '\n\n');
      }

      // TODO: add isSingular
    }
  });

  it('Should call phonesToStress', function () {
    expect(RiTa.analyzer.phonesToStress()).eq(undefined);
    expect(RiTa.analyzer.phonesToStress(" ")).eq("");
    expect(RiTa.analyzer.phonesToStress("ah b-ae1-n d-ah-n")).eq("0/1/0");
  });

  it('Should not pluralize/singularize uncountables', function(){
    expect(RiTa.pluralize("honey")).eq("honey");
    expect(RiTa.pluralize("pasta")).eq("pasta");
    expect(RiTa.pluralize("advice")).eq("advice");
    expect(RiTa.pluralize("fanfare")).eq("fanfare");
    expect(RiTa.pluralize("medicare")).eq("medicare");
    expect(RiTa.pluralize("childcare")).eq("childcare");

    expect(RiTa.singularize("honey")).eq("honey");
    expect(RiTa.singularize("pasta")).eq("pasta");
    expect(RiTa.singularize("advice")).eq("advice");
    expect(RiTa.singularize("fanfare")).eq("fanfare");
    expect(RiTa.singularize("medicare")).eq("medicare");
    expect(RiTa.singularize("childcare")).eq("childcare");
  })

  it('Should call isPlural', function () { // remove?
    expect(RiTa.inflector.isPlural()).eq(false);
    expect(RiTa.inflector.isPlural("")).eq(false);

    expect(function () { RiTa.inflector.isPlural([1]) }).to.throw();
    expect(function () { RiTa.inflector.isPlural(1) }).to.throw();

    expect(RiTa.inflector.isPlural('octopus', { dbug: 0 })).eq(false);
    expect(RiTa.inflector.isPlural('sheep')).eq(true);
    expect(RiTa.inflector.isPlural('apples')).eq(true);
    expect(RiTa.inflector.isPlural('leaves', { debug: false })).eq(true);
    expect(RiTa.inflector.isPlural('feet', { debug: false })).eq(true);
    expect(RiTa.inflector.isPlural('beaux', { debug: false })).eq(false);
    expect(RiTa.inflector.isPlural('child', { debug: false })).eq(false);
    expect(RiTa.inflector.isPlural('abbots', { debug: false })).eq(true);
    expect(RiTa.inflector.isPlural('happiness')).eq(true);

    expect(RiTa.inflector.isPlural('pasta')).eq(true);
    expect(RiTa.inflector.isPlural('honey')).eq(true);
    expect(RiTa.inflector.isPlural('fanfare')).eq(true);
    expect(RiTa.inflector.isPlural('medicare')).eq(true);
    expect(RiTa.inflector.isPlural('childcare')).eq(true);
  });

  it('Should call computePhones', function () { // SYNC:

    expect(RiTa.analyzer.computePhones("leo")).eql(["l", "iy", "ow"]);

    // bad inputs -> return undefined
    expect(RiTa.analyzer.computePhones()).eq(undefined);
    expect(RiTa.analyzer.computePhones(".")).eq(undefined);
    expect(RiTa.analyzer.computePhones("")).eq(undefined);
    expect(RiTa.analyzer.computePhones(",")).eq(undefined);

    // non-english input -> return undefined
    expect(RiTa.analyzer.computePhones("你好", { silent: true })).eq(undefined);
    expect(RiTa.analyzer.computePhones("Künste", { silent: true })).eq(undefined);
    expect(RiTa.analyzer.computePhones("leo", { silent: true })).eql(["l", "iy", "ow"]);

    // with "'"
    expect(RiTa.analyzer.computePhones("student's")).eql(["s", "t", "uw1", "d", "eh1", "n", "t", "z"]);

    // numbers
    expect(RiTa.analyzer.computePhones("-1", { silent: true })).eql(undefined); // TODO:

    if (!hasLex) return; // NOTE: below currently fail without lexicon

    expect(RiTa.analyzer.computePhones("1")).eql(['w', 'ah', 'n']);
    //console.log(RiTa.analyzer.computePhones("50"));
    expect(RiTa.analyzer.computePhones("50")).eql(['f', 'ay', 'v', 'z', 'ih', 'r', 'ow']);
  });

  function ok(a, m) { expect(a, m).to.be.true; }
  function eq(a, b, m) { expect(a).eq(b, m); }
  function eql(a, b, m) { expect(a).eql(b, m); }

});
