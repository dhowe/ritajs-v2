// const expect = require('chai').expect;
// const RiTa = require('../src/rita_api');

describe('RiTa.Analyzer', () => {

  if (typeof module !== 'undefined') {
    RiTa = require('../src/rita');
    chai = require('chai');
    expect = chai.expect;
  }

  it('Should correctly call analyze', () => {

    expect(RiTa.analyze('')).eql({ tokens: '', pos: '', stresses: '', phonemes: '', syllables: '' });

    let feats;
    feats = RiTa.analyze("clothes");
    expect(feats.pos).eq("nns");
    expect(feats.tokens).eq("clothes");
    expect(feats.syllables).eq("k-l-ow-dh-z");

    feats = RiTa.analyze("the clothes");
    expect(feats.pos).eq("dt nns");
    expect(feats.tokens).eq("the clothes");
    expect(feats.syllables).eq("dh-ah k-l-ow-dh-z");

    feats = RiTa.analyze("chevrolet");
    expect(feats.tokens).eq("chevrolet");
    expect(feats.syllables).eq("sh-eh-v/r-ow/l-ey");
  });

  it('Should correctly call analyze.lts', () => {
    let feats;
    feats = RiTa.analyze("cloze");
    expect(feats.pos).eq("nn");
    expect(feats.tokens).eq("cloze");
    expect(feats.syllables).eq("k-l-ow-z");
  });

  it('Should correctly call stresses', () => {
    let result, answer;

    result = RiTa.stresses("");
    answer = "";
    eq(result, answer);

    result = RiTa.stresses("The emperor had no clothes on");
    answer = "0 1/0/0 1 1 1 1";
    eq(result, answer);

    result = RiTa.stresses("The emperor had no clothes on.");
    answer = "0 1/0/0 1 1 1 1 .";
    eq(result, answer);

    result = RiTa.stresses("The emperor had no clothes on. The King is fat.");
    answer = "0 1/0/0 1 1 1 1 . 0 1 1 1 .";
    eq(result, answer);

    result = RiTa.stresses("to preSENT, to exPORT, to deCIDE, to beGIN");
    answer = "1 1/0 , 1 1/0 , 1 0/1 , 1 0/1";
    eq(result, answer);

    result = RiTa.stresses("to present, to export, to decide, to begin");
    answer = "1 1/0 , 1 1/0 , 1 0/1 , 1 0/1";
    eq(result, answer);

    result = RiTa.stresses("The dog ran faster than the other dog.  But the other dog was prettier.");
    answer = "0 1 1 1/0 1 0 1/0 1 . 1 0 1/0 1 1 1/0/0 .";
    eq(result, answer);

    eq(RiTa.stresses("chevrolet"), "0/0/1");
    eq(RiTa.stresses("women"), "1/0");
    eq(RiTa.stresses("genuine"), "1/0/0");
  });

  it('Should correctly call phonemes', () => {
    let result, answer;

    result = RiTa.phonemes("");
    answer = "";
    eq(result, answer);

    result = RiTa.phonemes("The");
    answer = "dh-ah";
    eq(result, answer);

    result = RiTa.phonemes("said");
    answer = "s-eh-d";
    eq(result, answer);

    result = RiTa.phonemes("The.");
    answer = "dh-ah .";
    eq(result, answer);

    result = RiTa.phonemes("The boy jumped over the wild dog.");
    answer = "dh-ah b-oy jh-ah-m-p-t ow-v-er dh-ah w-ay-l-d d-ao-g .";
    eq(result, answer);

    result = RiTa.phonemes("The boy ran to the store.");
    answer = "dh-ah b-oy r-ae-n t-uw dh-ah s-t-ao-r .";
    eq(result, answer);

    result = RiTa.phonemes("The dog ran faster than the other dog.  But the other dog was prettier.");
    answer = "dh-ah d-ao-g r-ae-n f-ae-s-t-er dh-ae-n dh-ah ah-dh-er d-ao-g . b-ah-t dh-ah ah-dh-er d-ao-g w-aa-z p-r-ih-t-iy-er .";
    eq(result, answer);

    result = RiTa.phonemes("flowers");
    answer = "f-l-aw-er-z";
    eq(result, answer);

    result = RiTa.phonemes("quiche");
    answer = "k-iy-sh";
    eq(result, answer);

    result = RiTa.phonemes("mice");
    answer = "m-ay-s";
    eq(result, answer);

    eq(RiTa.phonemes("chevrolet"), "sh-eh-v-r-ow-l-ey");
    eq(RiTa.phonemes("women"), "w-ih-m-eh-n");
    eq(RiTa.phonemes("genuine"), "jh-eh-n-y-uw-w-ah-n");
  });

  it('Should correctly call syllables', () => {

    expect(RiTa.syllables('deforestations')).eq('d-ih/f-ao/r-ih/s-t-ey/sh-ah-n-z');

    expect(RiTa.syllables('clothes')).eq('k-l-ow-dh-z');

    expect(RiTa.syllables('')).eq('');
    expect(RiTa.syllables("chevrolet")).eq("sh-eh-v/r-ow/l-ey");

    expect(RiTa.syllables("women")).eq("w-ih/m-eh-n");
    expect(RiTa.syllables("genuine")).eq("jh-eh-n/y-uw/w-ah-n");

    let input, expected;

    input = 'The emperor had no clothes on.';
    expected = 'dh-ah eh-m/p-er/er hh-ae-d n-ow k-l-ow-dh-z aa-n .';
    expect(RiTa.syllables(input)).eq(expected);

    input = 'The dog ran faster than the other dog. But the other dog was prettier.';
    expected = 'dh-ah d-ao-g r-ae-n f-ae/s-t-er dh-ae-n dh-ah ah/dh-er d-ao-g . b-ah-t dh-ah ah/dh-er d-ao-g w-aa-z p-r-ih/t-iy/er .';
    expect(RiTa.syllables(input)).eq(expected);

    input = 'The dog ran faster than the other dog. But the other dog was prettier.';
    expected = 'dh-ah d-ao-g r-ae-n f-ae/s-t-er dh-ae-n dh-ah ah/dh-er d-ao-g . b-ah-t dh-ah ah/dh-er d-ao-g w-aa-z p-r-ih/t-iy/er .';
    expect(RiTa.syllables(input)).eq(expected);

    input = 'The emperor had no clothes on.';
    expected = 'dh-ah eh-m/p-er/er hh-ae-d n-ow k-l-ow-dh-z aa-n .';
    expect(RiTa.syllables(input)).eq(expected);
  });

  it('Should correctly call syllables.lts', () => {
    RiTa.SILENCE_LTS = true;
    expect(RiTa.syllables('The Laggin Dragon')).eq('dh-ah l-ae/g-ih-n d-r-ae/g-ah-n');
    RiTa.SILENCE_LTS = false;
  });

  it('Should correctly handle number (singular/plural)', () => {

    let testPairs = [
      "dazes", "daze",
      "hives", "hive",
      "dives", "dive",
      "octopuses", "octopus",
      "wildlife", "wildlife",
      "media", "medium",
      "millennia", "millennium",
      "consortia", "consortium",
      "concerti", "concerto",
      "septa", "septum",
      "termini", "terminus",
      "larvas", "larva",
      "vertebras", "vertebra",
      "hooves", "hoof",
      "thieves", "thief",
      "rabbis", "rabbi",
      "flu", "flu",
      "safaris", "safari",
      "sheaves", "sheaf",
      "uses", "use",
      "pinches", "pinch",
      "hankies", "hanky",
      "spoofs", "spoof",
      "proofs", "proof",
      "roofs", "roof",
      "disbeliefs", "disbelief",
      "beliefs", "belief",
      "indices", "index",
      "accomplices", "accomplice",
      "catharses", 'catharsis',
      "prognoses", 'prognosis',
      'whizzes', 'whiz',
      'selves', 'self',
      'bookshelves', 'bookshelf',
      'wheezes', 'wheeze',
      'diagnoses', 'diagnosis',
      'minutiae', 'minutia',
      'blondes', 'blonde',
      'eyes', 'eye',
      'swine', 'swine',
      'cognoscenti', 'cognoscenti',
      'bonsai', 'bonsai',
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
      'appendices', 'appendix',
      'theses', 'thesis',
      'alumni', 'alumnus',
      'solos', 'solo',
      'music', 'music',
      'oxen', 'ox',
      'solos', 'solo',
      'music', 'music',
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
      'series', 'series',
      'oxen', 'ox',
      'men', 'man',
      'mice', 'mouse',
      'lice', 'louse',
      'children', 'child',
      'gases', 'gas',
      'buses', 'bus',
      'happiness', 'happiness',
      'crises', 'crisis',
      'theses', 'thesis',
      'apotheses', 'apothesis',
      'stimuli', 'stimulus',
      'alumni', 'alumnus',
      'corpora', 'corpus',
      'dogs', 'dog',
      'feet', 'foot',
      'teeth', 'tooth',
      'kisses', 'kiss',
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
      'hardness', 'hardness',
      'shortness', 'shortness',
      'dreariness', 'dreariness',
      'unwillingness', 'unwillingness',
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
      'alumni', 'alumnus',
      "turf", "turf",
      "macaroni", "macaroni",
      "spaghetti", "spaghetti",
      "potpourri", "potpourri",
      "electrolysis", "electrolysis",
      "eyes", "eye",
      "teeth", "tooth",
      "cakes", "cake",
      "kisses", "kiss",
      "lice", "louse",
      "series", "series",
      "crises", "crisis",
      "theses", "thesis",
      "apotheses", "apothesis",
      "stimuli", "stimulus",
      "alumni", "alumnus",
      "corpora", "corpus",
      "menus", "menu",
      "hardness", "hardness",
      "shortness", "shortness",
      "dreariness", "dreariness",
      "unwillingness", "unwillingness",
      "moose", "moose",
      "toes", "toe",
      "tobacco", "tobacco",
      "cargo", "cargo",
      "golf", "golf",
      "grief", "grief",
      "taxis", "taxi",
      "bonsai", "bonsai",
      "lives", "life",
      "additives", "additive",
      'epochs', 'epoch',
      'ranchs', 'ranch',
      'alcoves', 'alcove',
      'goddesses', 'goddess',
      'tresses', 'tress',
      'murderesses', 'murderess',
      'memories', 'memory',
      'corpora', 'corpus',
      'stimuli', 'stimulus',
      'theses', 'thesis'
    ];

    let res1, res2, res3, dbug = 0;

    for (let i = 0; i < testPairs.length; i += 2) {

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
    }
  });

  function ok(res, m) { expect(res).to.not.be.undefined; }
  function eq(a, b, m) { expect(a).eq(b, m); }
});
