const expect = require('chai').expect;
const RiTa = require('../src/rita_api');

describe('RiTa.Core', () => {

  it('Should correctly call isQuestion', () => {
    ok(RiTa.isQuestion("what"));
    ok(RiTa.isQuestion("what"));
    ok(RiTa.isQuestion("what is this"));
    ok(RiTa.isQuestion("what is this?"));
    ok(RiTa.isQuestion("Does it?"));
    ok(RiTa.isQuestion("Would you believe it?"));
    ok(RiTa.isQuestion("Have you been?"));
    ok(RiTa.isQuestion("Is this yours?"));
    ok(RiTa.isQuestion("Are you done?"));
    ok(RiTa.isQuestion("what is this? , where is that?"));
    ok(!RiTa.isQuestion("That is not a toy This is an apple"));
    ok(!RiTa.isQuestion("string"));
    ok(!RiTa.isQuestion("?"));
    ok(!RiTa.isQuestion(""));
  });

  it('Should correctly call isAbbreviation', () => {

    ok(RiTa.isAbbreviation("Dr."));
    ok(RiTa.isAbbreviation("dr."));
    //T in java

    ok(!RiTa.isAbbreviation("DR."));
    // F in Processing.lowercase is true but uppercase is false
    ok(!RiTa.isAbbreviation("Dr. "));
    //space
    ok(!RiTa.isAbbreviation(" Dr."));
    //space
    ok(!RiTa.isAbbreviation("  Dr."));
    //double space
    ok(!RiTa.isAbbreviation("Dr.  "));
    //double space
    ok(!RiTa.isAbbreviation("   Dr."));
    //tab space
    ok(!RiTa.isAbbreviation("Dr.    "));
    //tab space
    ok(!RiTa.isAbbreviation("Dr"));
    ok(!RiTa.isAbbreviation("Doctor"));
    ok(!RiTa.isAbbreviation("Doctor."));

    ok(RiTa.isAbbreviation("Prof."));
    ok(RiTa.isAbbreviation("prof."));
    //T in java
    ok(!RiTa.isAbbreviation("PRFO."));
    //  F in Processing. lowercase is true but uppercase is false
    ok(!RiTa.isAbbreviation("PrFo."));
    //  F in Processing. lowercase is true but uppercase is false
    ok(!RiTa.isAbbreviation("Professor"));
    ok(!RiTa.isAbbreviation("professor"));
    ok(!RiTa.isAbbreviation("PROFESSOR"));
    ok(!RiTa.isAbbreviation("Professor."));

    ok(!RiTa.isAbbreviation("@#$%^&*()"));

    ok(!RiTa.isAbbreviation(""));
    ok(!RiTa.isAbbreviation(null));
    ok(!RiTa.isAbbreviation(undefined));
    ok(!RiTa.isAbbreviation(1));
  });

  it('Should correctly call isPunctuation', () => {

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

  it('Should correctly call singularize', () => {

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

  it('Should correctly call pluralize', () => {

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

  function ok(res) { expect(res).eq(true); }
  function equal(a, b) { expect(a).eq(b); }

  // TODO: remainder of rita functions
});
