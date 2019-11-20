const expect = require('chai').expect;
const RiTa = require('../src/rita_api');

describe('RiTa.Core', () => {

  it('Should correctly call stem', () => {

    eq(RiTa.stem("cakes"), "cake");

    eq(RiTa.stem("run"), "run");
    eq(RiTa.stem("runs"), "run");
    eq(RiTa.stem("running"), "running");

    eq(RiTa.stem("take"), "take");
    eq(RiTa.stem("takes"), "take");
    eq(RiTa.stem("taking"), "taking");

    eq(RiTa.stem("hide"), "hide");
    eq(RiTa.stem("hides"), "hide");
    eq(RiTa.stem("hiding"), "hiding");

    eq(RiTa.stem("become"), "become");
    eq(RiTa.stem("becomes"), "become");
    eq(RiTa.stem("becoming"), "becoming");

    eq(RiTa.stem("gases"), "gas");
    eq(RiTa.stem("buses"), "bus");
    eq(RiTa.stem("happiness"), "happiness");
    eq(RiTa.stem("terrible"), "terrible");

    var test = "Stemming is funnier than a bummer";
    var result = "Stemming is funnier than a bummer";
    // TODO: RiTa.stem(pling) JS decapitalizes input whereas the java version does not
    eq(RiTa.stem(test), result);
  });

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
      eq(RiTa.singularize(tests[i]), tests[i + 1]);
    }

    eq(RiTa.singularize("pleae"), "pleae"); // special-cased in code
    eq(RiTa.singularize("whizzes"), "whiz");
    eq(RiTa.singularize("selves"), "self");
    eq(RiTa.singularize("bookshelves"), "bookshelf");
    eq(RiTa.singularize("wheezes"), "wheeze");
    eq(RiTa.singularize("diagnoses"), "diagnosis");

    eq("minutia", RiTa.singularize("minutia"));
    eq("blonde", RiTa.singularize("blondes"));
    eq("eye", RiTa.singularize("eyes"));
    eq(RiTa.singularize("swine"), "swine");
    eq(RiTa.singularize("cognoscenti"), "cognoscenti");
    eq(RiTa.singularize("bonsai"), "bonsai");
    eq(RiTa.singularize("taxis"), "taxi");
    eq(RiTa.singularize("chiefs"), "chief");
    eq(RiTa.singularize("monarchs"), "monarch");
    eq(RiTa.singularize("lochs"), "loch");
    eq(RiTa.singularize("stomachs"), "stomach");

    eq(RiTa.singularize("Chinese"), "Chinese");

    eq(RiTa.singularize("people"), "person");
    eq(RiTa.singularize("monies"), "money");
    eq(RiTa.singularize("vertebrae"), "vertebra");
    eq(RiTa.singularize("humans"), "human");
    eq(RiTa.singularize("germans"), "german");
    eq(RiTa.singularize("romans"), "roman");

    eq(RiTa.singularize("memoranda"), "memorandum");
    eq(RiTa.singularize("data"), "datum");
    eq(RiTa.singularize("appendices"), "appendix");
    eq(RiTa.singularize("theses"), "thesis");
    eq(RiTa.singularize("alumni"), "alumnus");

    eq(RiTa.singularize("solos"), "solo");
    eq(RiTa.singularize("music"), "music");

    eq(RiTa.singularize("oxen"), "ox");
    eq(RiTa.singularize("solos"), "solo");
    eq(RiTa.singularize("music"), "music");
    eq(RiTa.singularize("money"), "money");
    eq(RiTa.singularize("beef"), "beef");

    eq(RiTa.singularize("tobacco"), "tobacco");
    eq(RiTa.singularize("cargo"), "cargo");
    eq(RiTa.singularize("golf"), "golf");
    eq(RiTa.singularize("grief"), "grief");

    eq(RiTa.singularize("cakes"), "cake");

    eq("dog", RiTa.singularize("dogs"));
    eq("foot", RiTa.singularize("feet"));
    eq("tooth", RiTa.singularize("teeth"));
    eq("kiss", RiTa.singularize("kisses"));
    eq("child", RiTa.singularize("children"));
    eq("randomword", RiTa.singularize("randomwords"));
    eq("deer", RiTa.singularize("deer"));
    eq("sheep", RiTa.singularize("sheep"));
    eq("shrimp", RiTa.singularize("shrimps"));

    eq(RiTa.singularize("tomatoes"), "tomato");
    eq(RiTa.singularize("photos"), "photo");

    eq(RiTa.singularize("toes"), "toe");

    eq(RiTa.singularize("series"), "series");
    eq(RiTa.singularize("oxen"), "ox");
    eq(RiTa.singularize("men"), "man");
    eq(RiTa.singularize("mice"), "mouse");
    eq(RiTa.singularize("lice"), "louse");
    eq(RiTa.singularize("children"), "child");

    eq(RiTa.singularize("gases"), "gas");
    eq(RiTa.singularize("buses"), "bus");
    eq(RiTa.singularize("happiness"), "happiness");

    eq(RiTa.singularize("crises"), "crisis");
    eq(RiTa.singularize("theses"), "thesis");
    eq(RiTa.singularize("apotheses"), "apothesis");
    eq(RiTa.singularize("stimuli"), "stimulus");
    eq(RiTa.singularize("alumni"), "alumnus");
    eq(RiTa.singularize("corpora"), "corpus");

    eq("man", RiTa.singularize("men"));
    eq("woman", RiTa.singularize("women"));
    eq("congressman", RiTa.singularize("congressmen"));
    eq("alderman", RiTa.singularize("aldermen"));
    eq("freshman", RiTa.singularize("freshmen"));
    eq("fireman", RiTa.singularize("firemen"));
    eq("grandchild", RiTa.singularize("grandchildren"));
    eq("menu", RiTa.singularize("menus"));
    eq("guru", RiTa.singularize("gurus"));

    eq("", RiTa.singularize(""));
    eq("hardness", RiTa.singularize("hardness"));
    eq("shortness", RiTa.singularize("shortness"));
    eq("dreariness", RiTa.singularize("dreariness"));
    eq("unwillingness", RiTa.singularize("unwillingness"));
    eq("deer", RiTa.singularize("deer"));
    eq("fish", RiTa.singularize("fish"));
    eq("ooze", RiTa.singularize("ooze"));

    eq("ooze", RiTa.singularize("ooze"));
    eq("enterprise", RiTa.singularize("enterprises"));
    eq("treatise", RiTa.singularize("treatises"));
    eq("house", RiTa.singularize("houses"));
    eq("chemise", RiTa.singularize("chemises"));

    eq("aquatics", RiTa.singularize("aquatics"));
    eq("mechanics", RiTa.singularize("mechanics"));
    eq("quarter", RiTa.singularize("quarters"));
  });

  it('Should correctly call pluralize', () => {

    let tests = [
      // "daze", "dazes",
      // "hive", "hives",
      // "dive", "dives",
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
      eq(tests[i], RiTa.pluralize(tests[i + 1]));
    }

    // uncountable
    tests = [
      "turf", "macaroni", "spaghetti", "potpourri", "electrolysis"
    ];
    for (let i = 0; i < tests.length; i++) {
      eq(tests[i], RiTa.pluralize(tests[i]));
    }

    eq("blondes", RiTa.pluralize("blonde"));
    eq("eyes", RiTa.pluralize("eye"));
    eq("blondes", RiTa.pluralize("blond"));

    eq("dogs", RiTa.pluralize("dog"));
    eq("feet", RiTa.pluralize("foot"));
    eq("men", RiTa.pluralize("man"));

    eq("beautifuls", RiTa.pluralize("beautiful"));
    eq("teeth", RiTa.pluralize("tooth"));
    eq("cakes", RiTa.pluralize("cake"));
    eq("kisses", RiTa.pluralize("kiss"));
    eq("children", RiTa.pluralize("child"));

    eq("randomwords", RiTa.pluralize("randomword"));
    eq("lice", RiTa.pluralize("louse"));

    eq("sheep", RiTa.pluralize("sheep"));
    eq("shrimps", RiTa.pluralize("shrimp"));
    eq("series", RiTa.pluralize("series"));
    eq("mice", RiTa.pluralize("mouse"));

    eq("", RiTa.pluralize(""));

    eq(RiTa.pluralize("tomato"), "tomatoes");
    eq(RiTa.pluralize("toe"), "toes");

    eq(RiTa.pluralize("deer"), "deer");
    eq(RiTa.pluralize("ox"), "oxen");

    eq(RiTa.pluralize("tobacco"), "tobacco");
    eq(RiTa.pluralize("cargo"), "cargo");
    eq(RiTa.pluralize("golf"), "golf");
    eq(RiTa.pluralize("grief"), "grief");
    eq(RiTa.pluralize("wildlife"), "wildlife");
    eq(RiTa.pluralize("taxi"), "taxis");
    eq(RiTa.pluralize("Chinese"), "Chinese");
    eq(RiTa.pluralize("bonsai"), "bonsai");

    eq(RiTa.pluralize("whiz"), "whizzes");
    eq(RiTa.pluralize("prognosis"), "prognoses");
    eq(RiTa.pluralize("gas"), "gases");
    eq(RiTa.pluralize("bus"), "buses");

    eq("crises", RiTa.pluralize("crisis"));
    eq("theses", RiTa.pluralize("thesis"));
    eq("apotheses", RiTa.pluralize("apothesis"));
    eq("stimuli", RiTa.pluralize("stimulus"));
    eq("alumni", RiTa.pluralize("alumnus"));
    eq("corpora", RiTa.pluralize("corpus"));
    eq("menus", RiTa.pluralize("menu"));

    eq("hardness", RiTa.pluralize("hardness"));
    eq("shortness", RiTa.pluralize("shortness"));
    eq("dreariness", RiTa.pluralize("dreariness"));
    eq("unwillingness", RiTa.pluralize("unwillingness"));
    eq("deer", RiTa.pluralize("deer"));
    eq("fish", RiTa.pluralize("fish"));
    eq("moose", RiTa.pluralize("moose"));

    eq("aquatics", RiTa.pluralize("aquatics"));
    eq("mechanics", RiTa.pluralize("mechanics"));
  });

  function ok(res) { expect(res).eq(true); }
  function eq(a, b) { expect(a).eq(b); }

  // TODO: remainder of rita functions
});
