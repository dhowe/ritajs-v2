const expect = require('chai').expect;
const RiTa = require('../src/rita_core');

describe('RiTa Object', () => {

  it('Should correctly call analyze()', () => {

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

  it('Should correctly call analyze(lts)', () => {
    let feats;
    feats = RiTa.analyze("cloze");
    expect(feats.pos).eq("nn");
    expect(feats.tokens).eq("cloze");
    expect(feats.syllables).eq("k-l-ow-z");
  });


  it('Should correctly call isPunctuation()', () => {

    ok(!RiTa.isPunctuation("What the"));
    ok(!RiTa.isPunctuation("What ! the"));
    ok(!RiTa.isPunctuation(".#\"\\!@i$%&}<>"));

    ok(RiTa.isPunctuation("!"));
    ok(RiTa.isPunctuation("?"));
    ok(RiTa.isPunctuation("?!"));
    ok(RiTa.isPunctuation("."));
    ok(RiTa.isPunctuation(".."));
    ok(RiTa.isPunctuation("..."));
    ok(RiTa.isPunctuation("...."));
    ok(RiTa.isPunctuation("%..."));

    ok(!RiTa.isPunctuation("! "));
    //space
    ok(!RiTa.isPunctuation(" !"));
    //space
    ok(!RiTa.isPunctuation("!  "));
    //double space
    ok(!RiTa.isPunctuation("  !"));
    //double space
    ok(!RiTa.isPunctuation("!  "));
    //tab space
    ok(!RiTa.isPunctuation("   !"));

    let punct;

    punct = '$%&^,';
    for (let i = 0; i < punct.length; i++) {
      ok(RiTa.isPunctuation(punct[i]));
    }

    punct = ",;:!?)([].#\"\\!@$%&}<>|+=-_\\/*{^";
    for (let i = 0; i < punct.length; i++) {
      ok(RiTa.isPunctuation(punct[i]), punct[i]);
    }

    // TODO: also test multiple characters strings here ****
    punct = "\"��������`'";
    for (let i = 0; i < punct.length; i++) {
      ok(RiTa.isPunctuation(punct[i]), punct[i]);
    }

    punct = "\"��������`',;:!?)([].#\"\\!@$%&}<>|+=-_\\/*{^";
    for (let i = 0; i < punct.length; i++) {
      ok(RiTa.isPunctuation(punct[i]), punct[i]);
    }

    // TODO: and here...
    let nopunct = 'Helloasdfnals  FgG   \t kjdhfakjsdhf askjdfh aaf98762348576';
    for (let i = 0; i < nopunct.length; i++) {
      ok(!RiTa.isPunctuation(nopunct[i]), nopunct[i]);
    }

    ok(!RiTa.isPunctuation(""));
  });

  it('Should correctly call stresses()', () => {
    let result, answer;

    result = RiTa.stresses("");
    answer = "";
    equal(result, answer);

    result = RiTa.stresses("The emperor had no clothes on");
    answer = "0 1/0/0 1 1 1 1";
    equal(result, answer);

    result = RiTa.stresses("The emperor had no clothes on.");
    answer = "0 1/0/0 1 1 1 1 .";
    equal(result, answer);

    result = RiTa.stresses("The emperor had no clothes on. The King is fat.");
    answer = "0 1/0/0 1 1 1 1 . 0 1 1 1 .";
    equal(result, answer);

    result = RiTa.stresses("to preSENT, to exPORT, to deCIDE, to beGIN");
    answer = "1 1/0 , 1 1/0 , 1 0/1 , 1 0/1";
    equal(result, answer);

    result = RiTa.stresses("to present, to export, to decide, to begin");
    answer = "1 1/0 , 1 1/0 , 1 0/1 , 1 0/1";
    equal(result, answer);

    result = RiTa.stresses("The dog ran faster than the other dog.  But the other dog was prettier.");
    answer = "0 1 1 1/0 1 0 1/0 1 . 1 0 1/0 1 1 1/0/0 .";
    equal(result, answer);

    equal(RiTa.stresses("chevrolet"), "0/0/1");
    equal(RiTa.stresses("women"), "1/0");
    equal(RiTa.stresses("genuine"), "1/0/0");
  });

  it('Should correctly call phonemes()', () => {
    let result, answer;

    result = RiTa.phonemes("");
    answer = "";
    equal(result, answer);

    result = RiTa.phonemes("The");
    answer = "dh-ah";
    equal(result, answer);

    result = RiTa.phonemes("said");
    answer = "s-eh-d";
    equal(result, answer);

    result = RiTa.phonemes("The.");
    answer = "dh-ah .";
    equal(result, answer);

    result = RiTa.phonemes("The boy jumped over the wild dog.");
    answer = "dh-ah b-oy jh-ah-m-p-t ow-v-er dh-ah w-ay-l-d d-ao-g .";
    equal(result, answer);

    result = RiTa.phonemes("The boy ran to the store.");
    answer = "dh-ah b-oy r-ae-n t-uw dh-ah s-t-ao-r .";
    equal(result, answer);

    result = RiTa.phonemes("The dog ran faster than the other dog.  But the other dog was prettier.");
    answer = "dh-ah d-ao-g r-ae-n f-ae-s-t-er dh-ae-n dh-ah ah-dh-er d-ao-g . b-ah-t dh-ah ah-dh-er d-ao-g w-aa-z p-r-ih-t-iy-er .";
    equal(result, answer);

    result = RiTa.phonemes("flowers");
    answer = "f-l-aw-er-z";
    equal(result, answer);

    result = RiTa.phonemes("quiche");
    answer = "k-iy-sh";
    equal(result, answer);

    result = RiTa.phonemes("mice");
    answer = "m-ay-s";
    equal(result, answer);

    equal(RiTa.phonemes("chevrolet"), "sh-eh-v-r-ow-l-ey");
    equal(RiTa.phonemes("women"), "w-ih-m-eh-n");
    equal(RiTa.phonemes("genuine"), "jh-eh-n-y-uw-w-ah-n");
  });

  it('Should correctly call singularize()', () => {

    let tests = [
      "media", "medium",
      "millennia", "millennium",
      "consortia", "consortium",
      "concerti", "concerto",
      "septa", "septum",
      "termini", "terminus",
      "larvae", "larva",
      "vertebrae", "vertebra",
      "memorabilia", "memorabilium",
      "hooves", "hoof",
      "thieves", "thief",
      "rabbis", "rabbi",
      "flu", "flu",
      "safaris", "safari",
      "sheaves", "sheaf",
      "uses", "use",
      "pinches", "pinch",
      "catharses", "catharsis",
      "hankies", "hanky"
    ];
    for (let i = 0; i < tests.length; i += 2) {
      equal(RiTa.singularize(tests[i]), tests[i + 1]);
    }

    equal(RiTa.singularize("pleae"), "pleae"); // special-cased in code
    equal(RiTa.singularize("whizzes"), "whiz");
    equal(RiTa.singularize("selves"), "self");
    equal(RiTa.singularize("bookshelves"), "bookshelf");
    equal(RiTa.singularize("wheezes"), "wheeze");
    equal(RiTa.singularize("diagnoses"), "diagnosis");

    equal("minutia", RiTa.singularize("minutia"));
    equal("blonde", RiTa.singularize("blondes"));
    equal("eye", RiTa.singularize("eyes"));
    equal(RiTa.singularize("swine"), "swine");
    equal(RiTa.singularize("cognoscenti"), "cognoscenti");
    equal(RiTa.singularize("bonsai"), "bonsai");
    equal(RiTa.singularize("taxis"), "taxi");
    equal(RiTa.singularize("chiefs"), "chief");
    equal(RiTa.singularize("monarchs"), "monarch");
    equal(RiTa.singularize("lochs"), "loch");
    equal(RiTa.singularize("stomachs"), "stomach");

    equal(RiTa.singularize("Chinese"), "Chinese");

    equal(RiTa.singularize("people"), "person");
    equal(RiTa.singularize("monies"), "money");
    equal(RiTa.singularize("vertebrae"), "vertebra");
    equal(RiTa.singularize("humans"), "human");
    equal(RiTa.singularize("germans"), "german");
    equal(RiTa.singularize("romans"), "roman");

    equal(RiTa.singularize("memoranda"), "memorandum");
    equal(RiTa.singularize("data"), "datum");
    equal(RiTa.singularize("appendices"), "appendix");
    equal(RiTa.singularize("theses"), "thesis");
    equal(RiTa.singularize("alumni"), "alumnus");

    equal(RiTa.singularize("solos"), "solo");
    equal(RiTa.singularize("music"), "music");

    equal(RiTa.singularize("oxen"), "ox");
    equal(RiTa.singularize("solos"), "solo");
    equal(RiTa.singularize("music"), "music");
    equal(RiTa.singularize("money"), "money");
    equal(RiTa.singularize("beef"), "beef");

    equal(RiTa.singularize("tobacco"), "tobacco");
    equal(RiTa.singularize("cargo"), "cargo");
    equal(RiTa.singularize("golf"), "golf");
    equal(RiTa.singularize("grief"), "grief");

    equal(RiTa.singularize("cakes"), "cake");

    equal("dog", RiTa.singularize("dogs"));
    equal("foot", RiTa.singularize("feet"));
    equal("tooth", RiTa.singularize("teeth"));
    equal("kiss", RiTa.singularize("kisses"));
    equal("child", RiTa.singularize("children"));
    equal("randomword", RiTa.singularize("randomwords"));
    equal("deer", RiTa.singularize("deer"));
    equal("sheep", RiTa.singularize("sheep"));
    equal("shrimp", RiTa.singularize("shrimps"));

    equal(RiTa.singularize("tomatoes"), "tomato");
    equal(RiTa.singularize("photos"), "photo");

    equal(RiTa.singularize("toes"), "toe");

    equal(RiTa.singularize("series"), "series");
    equal(RiTa.singularize("oxen"), "ox");
    equal(RiTa.singularize("men"), "man");
    equal(RiTa.singularize("mice"), "mouse");
    equal(RiTa.singularize("lice"), "louse");
    equal(RiTa.singularize("children"), "child");

    equal(RiTa.singularize("gases"), "gas");
    equal(RiTa.singularize("buses"), "bus");
    equal(RiTa.singularize("happiness"), "happiness");

    equal(RiTa.singularize("crises"), "crisis");
    equal(RiTa.singularize("theses"), "thesis");
    equal(RiTa.singularize("apotheses"), "apothesis");
    equal(RiTa.singularize("stimuli"), "stimulus");
    equal(RiTa.singularize("alumni"), "alumnus");
    equal(RiTa.singularize("corpora"), "corpus");

    equal("man", RiTa.singularize("men"));
    equal("woman", RiTa.singularize("women"));
    equal("congressman", RiTa.singularize("congressmen"));
    equal("alderman", RiTa.singularize("aldermen"));
    equal("freshman", RiTa.singularize("freshmen"));
    equal("fireman", RiTa.singularize("firemen"));
    equal("grandchild", RiTa.singularize("grandchildren"));
    equal("menu", RiTa.singularize("menus"));
    equal("guru", RiTa.singularize("gurus"));

    equal("", RiTa.singularize(""));
    equal("hardness", RiTa.singularize("hardness"));
    equal("shortness", RiTa.singularize("shortness"));
    equal("dreariness", RiTa.singularize("dreariness"));
    equal("unwillingness", RiTa.singularize("unwillingness"));
    equal("deer", RiTa.singularize("deer"));
    equal("fish", RiTa.singularize("fish"));
    equal("ooze", RiTa.singularize("ooze"));

    equal("ooze", RiTa.singularize("ooze"));
    equal("enterprise", RiTa.singularize("enterprises"));
    equal("treatise", RiTa.singularize("treatises"));
    equal("house", RiTa.singularize("houses"));
    equal("chemise", RiTa.singularize("chemises"));

    equal("aquatics", RiTa.singularize("aquatics"));
    equal("mechanics", RiTa.singularize("mechanics"));
    equal("quarter", RiTa.singularize("quarters"));
  });

  it('Should correctly call pluralize()', () => {

    let tests = [
      "media", "medium",
      "millennia", "millennium",
      "consortia", "consortium",
      "concerti", "concerto",
      "septa", "septum",
      "termini", "terminus",
      "larvae", "larva",
      "vertebrae", "vertebra",
      "memorabilia", "memorabilium",
      "sheafs", "sheaf",
      "spoofs", "spoof",
      "proofs", "proof",
      "roofs", "roof",
      "disbeliefs", "disbelief",
      "indices", "index",
      "accomplices", "accomplice"
    ];
    for (let i = 0; i < tests.length; i += 2) {
      //console.log(tests[i], RiTa.pluralize(tests[i + 1]),tests[i + 1]);
      equal(tests[i], RiTa.pluralize(tests[i + 1]));
    }

    // uncountable
    tests = [
      "turf", "macaroni", "spaghetti", "potpourri", "electrolysis"
    ];
    for (let i = 0; i < tests.length; i++) {
      equal(tests[i], RiTa.pluralize(tests[i]));
    }

    equal("blondes", RiTa.pluralize("blonde"));
    equal("eyes", RiTa.pluralize("eye"));
    equal("blondes", RiTa.pluralize("blond"));

    equal("dogs", RiTa.pluralize("dog"));
    equal("feet", RiTa.pluralize("foot"));
    equal("men", RiTa.pluralize("man"));

    equal("beautifuls", RiTa.pluralize("beautiful"));
    equal("teeth", RiTa.pluralize("tooth"));
    equal("cakes", RiTa.pluralize("cake"));
    equal("kisses", RiTa.pluralize("kiss"));
    equal("children", RiTa.pluralize("child"));

    equal("randomwords", RiTa.pluralize("randomword"));
    equal("lice", RiTa.pluralize("louse"));

    equal("sheep", RiTa.pluralize("sheep"));
    equal("shrimps", RiTa.pluralize("shrimp"));
    equal("series", RiTa.pluralize("series"));
    equal("mice", RiTa.pluralize("mouse"));

    equal("", RiTa.pluralize(""));

    equal(RiTa.pluralize("tomato"), "tomatoes");
    equal(RiTa.pluralize("toe"), "toes");

    equal(RiTa.pluralize("deer"), "deer");
    equal(RiTa.pluralize("ox"), "oxen");

    equal(RiTa.pluralize("tobacco"), "tobacco");
    equal(RiTa.pluralize("cargo"), "cargo");
    equal(RiTa.pluralize("golf"), "golf");
    equal(RiTa.pluralize("grief"), "grief");
    equal(RiTa.pluralize("wildlife"), "wildlife");
    equal(RiTa.pluralize("taxi"), "taxis");
    equal(RiTa.pluralize("Chinese"), "Chinese");
    equal(RiTa.pluralize("bonsai"), "bonsai");

    equal(RiTa.pluralize("whiz"), "whizzes");
    equal(RiTa.pluralize("prognosis"), "prognoses");
    equal(RiTa.pluralize("gas"), "gases");
    equal(RiTa.pluralize("bus"), "buses");

    equal("crises", RiTa.pluralize("crisis"));
    equal("theses", RiTa.pluralize("thesis"));
    equal("apotheses", RiTa.pluralize("apothesis"));
    equal("stimuli", RiTa.pluralize("stimulus"));
    equal("alumni", RiTa.pluralize("alumnus"));
    equal("corpora", RiTa.pluralize("corpus"));
    equal("menus", RiTa.pluralize("menu"));

    equal("hardness", RiTa.pluralize("hardness"));
    equal("shortness", RiTa.pluralize("shortness"));
    equal("dreariness", RiTa.pluralize("dreariness"));
    equal("unwillingness", RiTa.pluralize("unwillingness"));
    equal("deer", RiTa.pluralize("deer"));
    equal("fish", RiTa.pluralize("fish"));
    equal("moose", RiTa.pluralize("moose"));

    equal("aquatics", RiTa.pluralize("aquatics"));
    equal("mechanics", RiTa.pluralize("mechanics"));
  });

  it('Should correctly call syllables()', () => {

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

  it('Should correctly call syllables(lts)', () => {
    RiTa.SILENCE_LTS = true;
    expect(RiTa.syllables('The Laggin Dragon')).eq('dh-ah l-ae/g-ih-n d-r-ae/g-ah-n');
    RiTa.SILENCE_LTS = false;
  });

  // TODO: remainder of rita functions
});

function ok(res) { expect(res).eq(true); }
function equal(a, b) { expect(a).eq(b); }
