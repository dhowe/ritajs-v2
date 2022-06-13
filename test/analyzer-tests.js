import { loadTestingDeps } from './before';

describe('RiTa.Analyzer', function () {

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

  0 && it('Should treat hyphenated words as single tokens', function() {
   // treating word as a single token:

    let lts = RiTa.SILENCE_LTS; // remembers
    RiTa.SILENCE_LTS = true; // disable LTS logging 
    
    let feats = RiTa.analyze("off-site"); 
    eq(feats["pos"], "nn");
    eq(feats["tokens"], "off-site");
    eq(feats["phones"], 'ao-f-s-ay-t');
    eq(feats["stresses"], "1-1");
    eq(feats["syllables"], "ao-f/s-ay-t");
    eq(feats["tokens"].split(' '), RiTa.tokenize("off-site"));

    feats = RiTa.analyze("oft-cited");
    eq(feats["pos"], "jj");
    eq(feats["tokens"], "oft-cited");
    eq(feats["phones"], 'ao-f-t-s-ih-t-ah-d');
    eq(feats["stresses"], "1-1/0");
    eq(feats["syllables"], "ao-f-t-s-ih/t-ah-d");
    eql(feats["tokens"].split(' '), RiTa.tokenize("oft-cited"));

    feats = RiTa.analyze("deeply-nested");
    eq(feats["pos"], "jj");
    eq(feats["tokens"], "deeply - nested");
    eq(feats["phones"], 'd-iy-p-l-iy-n-eh-s-t-ah-d');
    eq(feats["stresses"], "1/0-1/0");
    eq(feats["syllables"], "d-iy-p/l-iy - n-eh/s-t-ah-d");
    eql(feats["tokens"].split(' '), RiTa.tokenize("deeply-nested"));
    
    feats = RiTa.analyze("father-in-law");
    eq(feats["pos"], "nn");
    eq(feats["tokens"], "father-in-law");
    eq(feats["phones"], 'f-aa-dh-er-ih-n-l-ao');
    eq(feats["stresses"], "1/0-0-1");
    eq(feats["syllables"], "f-aa/dh-er-ih-n-l-ao");
    eql(feats["tokens"].split(' '), RiTa.tokenize("father-in-law"));

    feats =  RiTa.analyze("up-to-date");
    eq(feats["pos"], "jj");
    eq(feats["tokens"], "up-to-date");
    eq(feats["phones"], 'ah-p-t-uw-d-ey-t');
    eq(feats["stresses"], "1-1-1");
    eq(feats["syllables"], "ah-p-t-uw-d-ey-t");
    eql(feats["tokens"].split(' '), RiTa.tokenize("up-to-date"));

    feats =  RiTa.analyze("state-of-the-art");
    eq(feats["pos"], "jj");
    eq(feats["tokens"], "state-of-the-art");
    eq(feats["phones"], 's-t-ey-t-ah-v-dh-ah-aa-r-t');
    eq(feats["stresses"], "1-1-0-1");
    eq(feats["syllables"], "s-t-ey-t-ah-v-dh-ah-aa-r-t");
    eql(feats["tokens"].split(' '), RiTa.tokenize("state-of-the-art"));

    RiTa.SILENCE_LTS = lts; // reset
  });

  it('Should treat hyphenated words as separate tokens', function () {  // see https://github.com/dhowe/rita/issues/65
    
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

    feats =  RiTa.analyze("up-to-date");
    eq(feats["pos"], "in - to - nn");
    eq(feats["tokens"], "up - to - date");
    eq(feats["phones"], 'ah-p - t-uw - d-ey-t');
    eq(feats["stresses"], "1 - 1 - 1");
    eq(feats["syllables"], "ah-p - t-uw - d-ey-t");
    eql(feats["tokens"].split(' '), RiTa.tokenize("up-to-date"));

    feats =  RiTa.analyze("state-of-the-art");
    eq(feats["pos"], "jj - in - dt - nn");
    eq(feats["tokens"], "state - of - the - art");
    eq(feats["phones"], 's-t-ey-t - ah-v - dh-ah - aa-r-t');
    eq(feats["stresses"], "1 - 1 - 0 - 1");
    eq(feats["syllables"], "s-t-ey-t - ah-v - dh-ah - aa-r-t");
    eql(feats["tokens"].split(' '), RiTa.tokenize("state-of-the-art"));

    RiTa.SILENCE_LTS = lts; // reset
  });

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
  function eql(a,b,m) {expect(a).eql(b,m);}

});
