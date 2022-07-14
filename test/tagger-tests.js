import { loadTestingDeps } from './before';

describe('RiTa.Tagger', () => {

  let RiTa, expect, hasLex;
  before(async function() {
    ({ RiTa, expect, hasLex } = await loadTestingDeps());
    if (!hasLex) this.skip();
  });

  it('Should call pos.array', function () {
    if (!hasLex) this.skip();
    eql(RiTa.pos([]), []);
    eql(RiTa.pos(["deal"]), ["nn"]);
    eql(RiTa.pos(["freed"]), ["jj"]);
    eql(RiTa.pos(["the"]), ["dt"]);
    eql(RiTa.pos(["a"]), ["dt"]);
    eql(RiTa.pos("the top seed".split(/ /)), ["dt", "jj", "nn"]);
    eql(RiTa.pos("by illegal means".split(/ /)), ["in", "jj", "nn"]);
    eql(RiTa.pos("He outnumbers us".split(/ /)), ["prp", "vbz", "prp"]);
    eql(RiTa.pos("I outnumber you".split(/ /)), ["prp", "vbp", "prp"]);
    eql(RiTa.pos("Elephants dance".split(/ /)), ["nns", "vbp"]);
    eql(RiTa.pos("the boy dances".split(/ /)), ["dt", "nn", "vbz"]);
    eql(RiTa.pos("Dave dances".split(/ /)), ["nnp", "vbz"]);
  });

  it('Should call simple pos.array', function () {
    eql(RiTa.pos([], { simple: true }), []);
    eql(RiTa.pos(["freed"], { simple: true }), ["a"]);
    eql(RiTa.pos(["the"], { simple: true }), ["-"]);
    eql(RiTa.pos(["a"], { simple: true }), ["-"]);
    eql(RiTa.pos("the top seed".split(/ /), { simple: true }), ["-", "a", "n"]);
    eql(RiTa.pos("by illegal means".split(/ /), { simple: true }), ["-", "a", "n"]);
    eql(RiTa.pos("He outnumbers us".split(/ /), { simple: true }), ["-", "v", "-"]);
    eql(RiTa.pos("I outnumber you".split(/ /), { simple: true }), ["-", "v", "-"]);
    eql(RiTa.pos("Elephants dance".split(/ /), { simple: true }), ["n", "v"]);
    eql(RiTa.pos("the boy dances".split(/ /), { simple: true }), ["-", "n", "v"]);
  });

  it('Should call pos.array.inline.simple', function () {
    let result, answer, txt;

    eql(RiTa.pos([], { inline: true, simple: true }), "");
    eql(RiTa.pos(["asdfaasd"], { inline: true, simple: true }), "asdfaasd/n");

    result = RiTa.pos(["clothes"], { inline: true, simple: true });
    answer = "clothes/n";
    eql(result, answer);

    result = RiTa.pos(["teeth"], { inline: true, simple: true });
    answer = "teeth/n";
    eql(result, answer);

    result = RiTa.pos("There is a cat".split(/ /), { inline: true, simple: true });
    answer = "There/- is/v a/- cat/n";
    eql(result, answer);

    result = RiTa.pos(RiTa.tokenize("The boy, dressed in red, ate an apple."), { inline: true, simple: true });
    answer = "The/- boy/n , dressed/v in/- red/a , ate/v an/- apple/n .";
    eql(result, answer);

    txt = "The dog ran faster than the other dog. But the other dog was prettier.";
    result = RiTa.pos(RiTa.tokenize(txt), { inline: true, simple: true });
    answer = "The/- dog/n ran/v faster/r than/- the/- other/a dog/n . But/- the/- other/a dog/n was/v prettier/a .";
    eq(result, answer);
  });

  it('Should handle inflected verbs', function () {
    eql(RiTa.pos("disbelieves"), ["vbz"]);
    eql(RiTa.pos("disbelieves", { simple: 1 }), ["v"]);

    eql(RiTa.pos("fates"), ["nns"]);
    eql(RiTa.pos("fates", { simple: 1 }), ["n"]);

    eql(RiTa.pos("hates"), ["vbz"]);
    eql(RiTa.pos("hates", { simple: 1 }), ["v"]);

    eql(RiTa.pos("hated"), ["vbd"]);
    eql(RiTa.pos("hated", { simple: 1 }), ["v"]);

    eql(RiTa.pos("hating"), ["vbg"]);
    eql(RiTa.pos("hating", { simple: 1 }), ["v"]);

    eql(RiTa.pos("He rode the horse"), ['prp', 'vbd', 'dt', 'nn']);
    eql(RiTa.pos("He has ridden the horse"), ['prp', 'vbz', 'vbn', 'dt', 'nn']);

    eql(RiTa.pos("He rowed the boat"), ['prp', 'vbd', 'dt', 'nn']);
    eql(RiTa.pos("He has rowed the boat"), ['prp', 'vbz', 'vbn', 'dt', 'nn']);
  });

  it('Should call pos', function () {
    let result, answer, resultArr, answerArr, txt;

    eql(RiTa.pos(""), []);
    eql(RiTa.pos(","), [',']);
    eql(RiTa.pos(" "), []);

    eql(RiTa.pos("freed"), ["jj"]);
    eql(RiTa.pos("biped"), ["nn"]);
    eql(RiTa.pos("greed"), ["nn"]);
    eql(RiTa.pos("creed"), ["nn"]);
    eql(RiTa.pos("weed"), ["nn"]);

    //https://github.com/dhowe/rita/issues/177
    eql(RiTa.pos("broke"), ["vbd"]);
    eql(RiTa.pos("broke", { simple: 1 }), ["v"]);
    eql(RiTa.pos("committed"), ["vbn"]);
    eql(RiTa.pos("committed", { simple: 1 }), ["v"]);
    eql(RiTa.pos("outpaced"), ["vbd"]);
    eql(RiTa.pos("outpaced", { simple: 1 }), ["v"]);
    eql(RiTa.pos("concerned"), ["vbd"]);
    eql(RiTa.pos("concerned", { simple: 1 }), ["v"]);
    eql(RiTa.pos("committed"), ["vbn"]);
    eql(RiTa.pos("committed", { simple: 1 }), ["v"]);



    eql(RiTa.pos("the top seed"), ["dt", "jj", "nn"]);
    eql(RiTa.pos("by illegal means"), ["in", "jj", "nn"]);
    eql(RiTa.pos('Joannie Smith ran away'), ['nnp', 'nnp', 'vbd', 'rb']);

    result = RiTa.pos("mammal");
    answer = ["nn"];
    eql(result, answer);

    result = RiTa.pos("asfaasd");
    answer = ["nn"];
    eql(result, answer);

    result = RiTa.pos("innings");
    answer = ["nns"];
    eql(result, answer);

    result = RiTa.pos("clothes");
    answer = ["nns"];
    eql(result, answer);

    result = RiTa.pos("clothes");
    answer = ["nns"];
    eql(result, answer);

    result = RiTa.pos("teeth");
    answer = ["nns"];
    eql(result, answer);

    result = RiTa.pos("memories");
    answer = ["nns"];
    eql(result, answer);

    eql(RiTa.pos("flunks"), ["vbz"], 'Failed: flunks');
    eql(RiTa.pos("outnumbers"), ["vbz"], 'Failed: outnumbers');
    eql(RiTa.pos("He outnumbers us"), ["prp", "vbz", "prp"]);
    eql(RiTa.pos("I outnumber you"), ["prp", "vbp", "prp"]);

    resultArr = RiTa.pos("Elephants dance");
    answerArr = ["nns", "vbp"];
    eql(answerArr, resultArr);

    result = RiTa.pos("the boy dances");
    answer = ["dt", "nn", "vbz"];
    eql(result, answer);

    result = RiTa.pos("he dances");
    answer = ["prp", "vbz"];
    eql(result, answer);

    resultArr = RiTa.pos("Dave dances");
    answerArr = ["nnp", "vbz"];
    eql(answerArr, resultArr);

    result = RiTa.pos("running");
    answer = ["vbg"];
    eql(result, answer);

    result = RiTa.pos("asserting");
    answer = ["vbg"];
    eql(result, answer);

    result = RiTa.pos("assenting");
    answer = ["vbg"];
    eql(result, answer);

    result = RiTa.pos("Dave");
    answer = ["nnp"];
    eql(result, answer);

    result = RiTa.pos("They feed the cat");
    answer = ["prp", "vbp", "dt", "nn"];
    eql(result, answer);

    result = RiTa.pos("There is a cat.");
    answer = ["ex", "vbz", "dt", "nn", "."];
    eql(result, answer);

    result = RiTa.pos("The boy, dressed in red, ate an apple.");
    answer = ["dt", "nn", ",", "vbn", "in", "jj", ",", "vbd", "dt", "nn", "."];
    eql(result, answer);

    txt = "The dog ran faster than the other dog.  But the other dog was prettier.";
    result = RiTa.pos(txt);
    answer = ["dt", "nn", "vbd", "rbr", "in", "dt", "jj", "nn", ".", "cc", "dt", "jj", "nn", "vbd", "jjr", "."];
    eql(result, answer);

    // Tests for verb conjugation
    eql(RiTa.pos("is"), ["vbz"]);
    eql(RiTa.pos("am"), ["vbp"]);
    eql(RiTa.pos("be"), ["vb"]);

    result = RiTa.pos("There is a cat.");
    answer = ["ex", "vbz", "dt", "nn", "."];
    eql(result, answer);

    result = RiTa.pos("There was a cat.");
    answer = ["ex", "vbd", "dt", "nn", "."];
    eql(result, answer);

    result = RiTa.pos("I am a cat.");
    answer = ["prp", "vbp", "dt", "nn", "."];
    eql(result, answer);

    result = RiTa.pos("I was a cat.");
    answer = ["prp", "vbd", "dt", "nn", "."];
    eql(result, answer);

    eql(RiTa.pos("flunk"), ["vb"]);
    eql(RiTa.pos("He flunks the test"), ["prp", "vbz", "dt", "nn"]);

    eql(RiTa.pos("he"), ["prp"]);
    eql(RiTa.pos("outnumber"), ["vb"]);
    eql(RiTa.pos("I outnumbered you"), ["prp", "vbd", "prp"], "I outnumbered you");
    eql(RiTa.pos("She outnumbered us"), ["prp", "vbd", "prp"], "She outnumbered us");
    eql(RiTa.pos("I am outnumbering you"), ["prp", "vbp", "vbg", "prp"], "I am outnumbering you");
    eql(RiTa.pos("I have outnumbered you"), ["prp", "vbp", "vbd", "prp"], "I have outnumbered you");//?

    let checks = ["emphasis", "stress", "discus", "colossus", "fibrosis", "digitalis", "pettiness", "mess", "cleanliness", "orderliness", "bronchitis", "preparedness", "highness"];
    for (let i = 0, j = checks.length; i < j; i++) {
      eql(RiTa.pos(checks[i]), ["nn"]);
    }

    //sequential adjectives
    eql(RiTa.pos('a light blue sky'), ['dt', 'jj', 'jj', 'nn']);

    // vbg will not be wrongly tagged as nn
    eql(RiTa.pos("He is running toward me"), ["prp", "vbz", "vbg", "in", "prp"]);
    eql(RiTa.pos("She is riding a bike"), ["prp", "vbz", "vbg", "dt", "nn"]);
    eql(RiTa.pos("he stands still, thinking about the words"), ["prp", "vbz", "rb", ",", "vbg", "in", "dt", "nns"]);
    eql(RiTa.pos("She walked out of the room smoking"), ["prp", "vbd", "in", "in", "dt", "nn", "vbg"]);
    eql(RiTa.pos("He kept saying his adventure story"), ["prp", "vbd", "vbg", "prp$", "nn", "nn"]);
    eql(RiTa.pos("Drinking is his hobby"), ["vbg", "vbz", "prp$", "nn"]);
    eql(RiTa.pos("The kid playing at the corner is the boss"), ["dt", "nn", "vbg", "in", "dt", "nn", "vbz", "dt", "nn"]);
    eql(RiTa.pos("She is the leader of the reading group"), ["prp", "vbz", "dt", "nn", "in", "dt", "vbg", "nn"]);
    eql(RiTa.pos("I love working"), ["prp", "vbp", "vbg"]);
    eql(RiTa.pos("I was thinking about buying a car"), ["prp", "vbd", "vbg", "in", "vbg", "dt", "nn"]);

    // #179
    eql(RiTa.pos("lancer"), ["nn"]);
    eql(RiTa.pos("dancer"), ["nn"]);
    eql(RiTa.pos("builder"), ["nn"]);
    eql(RiTa.pos("programmer"), ["nn"]);
    eql(RiTa.pos("mixer"), ["nn"]);
    eql(RiTa.pos("He is a dancer"), ["prp", "vbz", "dt", "nn"]);
    eql(RiTa.pos("She is a body bulider"), ["prp", "vbz", "dt", "nn", "nn"]);
    eql(RiTa.pos("I am a programmer"), ["prp", "vbp", "dt", "nn"]);

    // rita#148
    eql(RiTa.pos("I have gone alone in there"), ["prp", "vbp", "vbn", "rb", "in", "nn"]);
    eql(RiTa.pos("We stopped and went on from there"), ["prp", "vbd", "cc", "vbd", "in", "in", "nn"]);
    eql(RiTa.pos("She lives there"), ["prp", "vbz", "rb"]);
    eql(RiTa.pos("He was standing there"), ["prp", "vbd", "vbg", "rb"]);
    eql(RiTa.pos("There are good reasons to save the world"), ["ex", "vbp", "jj", "nns", "to", "vb", "dt", "nn"]);
    eql(RiTa.pos("There is a pig"), ["ex", "vbz", "dt", "nn"]);
    eql(RiTa.pos("There isn't a world that is worth saving"), ["ex", "vbz", "dt", "nn", "in", "vbz", "jj", "vbg"]);
  });

  it('Should call pos.simple', function () {
    //eql(RiTa.pos("", { simple: true }), []);
    eql(RiTa.pos("biped", { simple: true }), ["n"]);
    eql(RiTa.pos("greed", { simple: true }), ["n"]);
    eql(RiTa.pos("creed", { simple: true }), ["n"]);
    eql(RiTa.pos("weed", { simple: true }), ["n"]);
    eql(RiTa.pos("is", { simple: true }), ["v"]);
    eql(RiTa.pos("am", { simple: true }), ["v"]);
    eql(RiTa.pos("be", { simple: true }), ["v"]);
    eql(RiTa.pos("freed", { simple: true }), ["a"]);
  });

  it('Should call pos.inline', function () {
    let result, answer, txt;

    eql(RiTa.pos("", { inline: true }), "");
    eql(RiTa.pos("asdfaasd", { inline: true }), "asdfaasd/nn");

    result = RiTa.pos("clothes", { inline: true });
    answer = "clothes/nns";
    eql(result, answer);

    result = RiTa.pos("teeth", { inline: true });
    answer = "teeth/nns";
    eql(result, answer);

    result = RiTa.pos("There is a cat.", { inline: true });
    answer = "There/ex is/vbz a/dt cat/nn .";
    eql(result, answer);

    result = RiTa.pos("The boy, dressed in red, ate an apple.", { inline: true });
    answer = "The/dt boy/nn , dressed/vbn in/in red/jj , ate/vbd an/dt apple/nn .";
    eql(result, answer);

    txt = "The dog ran faster than the other dog.  But the other dog was prettier.";
    result = RiTa.pos(txt, { inline: true });
    answer = "The/dt dog/nn ran/vbd faster/rbr than/in the/dt other/jj dog/nn . But/cc the/dt other/jj dog/nn was/vbd prettier/jjr .";
    eq(result, answer);
  });


  it('Should call posInline', function () {
    let result, answer, txt;

    eql(RiTa.posInline(""), "");
    eql(RiTa.posInline(" "), "");
    eql(RiTa.posInline("asdfaasd"), "asdfaasd/nn");

    result = RiTa.posInline("clothes");
    answer = "clothes/nns";
    eql(result, answer);

    result = RiTa.posInline("teeth");
    answer = "teeth/nns";
    eql(result, answer);

    result = RiTa.posInline("There is a cat.");
    answer = "There/ex is/vbz a/dt cat/nn .";
    eql(result, answer);

    result = RiTa.posInline("The boy, dressed in red, ate an apple.");
    answer = "The/dt boy/nn , dressed/vbn in/in red/jj , ate/vbd an/dt apple/nn .";
    eql(result, answer);

    txt = "The dog ran faster than the other dog.  But the other dog was prettier.";
    result = RiTa.posInline(txt);
    answer = "The/dt dog/nn ran/vbd faster/rbr than/in the/dt other/jj dog/nn . But/cc the/dt other/jj dog/nn was/vbd prettier/jjr .";
    eq(result, answer);

    //https://github.com/dhowe/rita/issues/177
    //'bit': as a vbd 
    txt = "The mosquito bit me.";
    result = RiTa.posInline(txt);
    answer = "The/dt mosquito/nn bit/vbd me/prp ."
    eq(result, answer);
    //'bit': as an nn
    txt = "Give the duck a bit of bread.";
    result = RiTa.posInline(txt);
    answer = "Give/vb the/dt duck/nn a/dt bit/nn of/in bread/nn ."
    eq(result, answer);

    txt = "The show has ended.";
    result = RiTa.posInline(txt);
    answer = "The/dt show/nn has/vbz ended/vbn ."
    eq(result, answer);

    //'remade': as a vbd
    txt = "She remade this video.";
    result = RiTa.posInline(txt);
    answer = "She/prp remade/vbd this/dt video/nn .";
    eq(result, answer);
    //'remade': as a vbn 
    txt = "They will be remade into something else.";
    result = RiTa.posInline(txt);
    answer = "They/prp will/md be/vb remade/vbn into/in something/nn else/rb .";
    0 && eq(result, answer);

    //'sold': as a vbd
    txt = "She sold her apartment.";
    result = RiTa.posInline(txt);
     answer = "She/prp sold/vbd her/prp$ apartment/nn .";
     0 && eq(result, answer);
     //'sold': as a vbn
    txt = "Her apartment was sold.";
    result = RiTa.posInline(txt);
    answer = "Her/prp$ apartment/nn was/vbd sold/vbn .";
    eq(result, answer);

    //'resold': as a vbd
    txt = "She resold her apartment.";
    result = RiTa.posInline(txt);
    answer = "She/prp resold/vbd her/prp$ apartment/nn .";
     eq(result, answer);
     //'resold': as a vbn
    txt = "Her apartment was resold.";
    result = RiTa.posInline(txt);
    answer = "Her/prp$ apartment/nn was/vbd resold/vbn .";
    0 && eq(result, answer);

    //'led': as a vbd
    txt = "He led a team of crows into battle.";
    result = RiTa.posInline(txt);
    answer = "He/prp led/vbd a/dt team/nn of/in crows/nns into/in battle/nn .";
    eq(result, answer);
    //'led': as a vbn
    txt = "He led a team of crows into battle.";
    result = RiTa.posInline(txt);
    answer = "He/prp led/vbd a/dt team/nn of/in crows/nns into/in battle/nn .";
    eq(result, answer);
  });

  it('Should call pos.inline.simple', function () {
    let result, answer, txt;

    eql(RiTa.pos("", { inline: true, simple: true }), "");
    eql(RiTa.pos("asdfaasd", { inline: true, simple: true }), "asdfaasd/n");

    result = RiTa.pos("clothes", { inline: true, simple: true });
    answer = "clothes/n";
    eql(result, answer);

    result = RiTa.pos("teeth", { inline: true, simple: true });
    answer = "teeth/n";
    eql(result, answer);

    result = RiTa.pos("There is a cat.", { inline: true, simple: true });
    answer = "There/- is/v a/- cat/n .";
    eql(result, answer);

    result = RiTa.pos("The boy, dressed in red, ate an apple.", { inline: true, simple: true });
    answer = "The/- boy/n , dressed/v in/- red/a , ate/v an/- apple/n .";
    eql(result, answer);

    txt = "The dog ran faster than the other dog.  But the other dog was prettier.";
    result = RiTa.pos(txt, { inline: true, simple: true });
    answer = "The/- dog/n ran/v faster/r than/- the/- other/a dog/n . But/- the/- other/a dog/n was/v prettier/a .";
    eq(result, answer);
  });

  it('Should call posInline.simple', function () {
    let result, answer, txt;
    eql(RiTa.posInline("asdfaasd", { inline: true, simple: true }), "asdfaasd/n");

    eql(RiTa.posInline("", { inline: true, simple: true }), "");

    result = RiTa.posInline("clothes", { inline: true, simple: true });
    answer = "clothes/n";
    eql(result, answer);

    result = RiTa.posInline("teeth", { inline: true, simple: true });
    answer = "teeth/n";
    eql(result, answer);

    result = RiTa.posInline("There is a cat.", { inline: true, simple: true });
    answer = "There/- is/v a/- cat/n .";
    eql(result, answer);

    result = RiTa.posInline("The boy, dressed in red, ate an apple.", { inline: true, simple: true });
    answer = "The/- boy/n , dressed/v in/- red/a , ate/v an/- apple/n .";
    eql(result, answer);

    txt = "The dog ran faster than the other dog.  But the other dog was prettier.";
    result = RiTa.posInline(txt, { inline: true, simple: true });
    answer = "The/- dog/n ran/v faster/r than/- the/- other/a dog/n . But/- the/- other/a dog/n was/v prettier/a .";
    eq(result, answer);
  });

  it('Should call isAdverb', function () {

    //bad inputs
    ok(!RiTa.isAdverb(""));
    ok(!RiTa.isAdverb());
    ok(!RiTa.isAdverb(42));
    ok(!RiTa.isAdverb(["lively"]));

    ok(!RiTa.isAdverb("swim"));
    ok(!RiTa.isAdverb("walk"));
    ok(!RiTa.isAdverb("walker"));
    ok(!RiTa.isAdverb("beautiful"));
    ok(!RiTa.isAdverb("dance"));
    ok(!RiTa.isAdverb("dancing"));
    ok(!RiTa.isAdverb("dancer"));

    //verb
    ok(!RiTa.isAdverb("wash"));
    ok(!RiTa.isAdverb("walk"));
    ok(!RiTa.isAdverb("play"));
    ok(!RiTa.isAdverb("throw"));
    ok(!RiTa.isAdverb("drink"));
    ok(!RiTa.isAdverb("eat"));
    ok(!RiTa.isAdverb("chew"));

    //adj
    ok(!RiTa.isAdverb("wet"));
    ok(!RiTa.isAdverb("dry"));
    ok(!RiTa.isAdverb("furry"));
    ok(!RiTa.isAdverb("sad"));
    ok(!RiTa.isAdverb("happy"));

    //n
    ok(!RiTa.isAdverb("dogs"));
    ok(!RiTa.isAdverb("wind"));
    ok(!RiTa.isAdverb("dolls"));
    ok(!RiTa.isAdverb("frogs"));
    ok(!RiTa.isAdverb("ducks"));
    ok(!RiTa.isAdverb("flowers"));
    ok(!RiTa.isAdverb("fish"));

    //adv
    ok(RiTa.isAdverb("truthfully"));
    ok(RiTa.isAdverb("kindly"));
    ok(RiTa.isAdverb("bravely"));
    ok(RiTa.isAdverb("doggedly"));
    ok(RiTa.isAdverb("sleepily"));
    ok(RiTa.isAdverb("scarily"));
    ok(RiTa.isAdverb("excitedly"));
    ok(RiTa.isAdverb("energetically"));
    ok(RiTa.isAdverb("hard")); // +adj
  });

  it('Should call isNoun', function () {

    ok(RiTa.isNoun("thieves"), "thieves");
    ok(RiTa.isNoun("calves"));

    ok(!RiTa.isNoun("scarily"));
    ok(RiTa.isNoun("boxes"));
    ok(RiTa.isNoun("swim"));
    ok(RiTa.isNoun("walk"));
    ok(RiTa.isNoun("walker"));
    ok(RiTa.isNoun("dance"));
    ok(RiTa.isNoun("dancer"));
    ok(RiTa.isNoun("cats"));
    ok(RiTa.isNoun("teeth"));
    ok(RiTa.isNoun("apples"));
    ok(RiTa.isNoun("buses"));
    ok(RiTa.isNoun("prognoses"));
    ok(RiTa.isNoun("oxen"));
    ok(RiTa.isNoun("theses"));
    ok(RiTa.isNoun("stimuli"));
    ok(RiTa.isNoun("crises"));

    //verb
    ok(RiTa.isNoun("wash"));
    ok(RiTa.isNoun("walk"));
    ok(RiTa.isNoun("play"));
    ok(RiTa.isNoun("throw"));
    ok(RiTa.isNoun("duck"));
    ok(RiTa.isNoun("dog"));
    ok(RiTa.isNoun("drink"));
    ok(!RiTa.isNoun("abates"));

    ok(!RiTa.isNoun("eat"));
    ok(!RiTa.isNoun("chew"));
    ok(!RiTa.isNoun("moved"));
    ok(!RiTa.isNoun("went"));
    ok(!RiTa.isNoun("spent"));

    //adj
    ok(!RiTa.isNoun("hard"));
    ok(!RiTa.isNoun("dry"));
    ok(!RiTa.isNoun("furry"));
    ok(!RiTa.isNoun("sad"));
    ok(!RiTa.isNoun("happy"));
    ok(!RiTa.isNoun("beautiful"));

    //n
    ok(RiTa.isNoun("dogs"));
    ok(RiTa.isNoun("wind"));
    ok(RiTa.isNoun("dolls"));
    ok(RiTa.isNoun("frogs"));
    ok(RiTa.isNoun("ducks"));
    ok(RiTa.isNoun("flower"));
    ok(RiTa.isNoun("fish"));
    ok(RiTa.isNoun("wet")); //+v/adj
    ok(RiTa.isNoun("ducks")); // +v
    ok(RiTa.isNoun("flowers")); // +v

    //adv
    ok(!RiTa.isNoun("truthfully"));
    ok(!RiTa.isNoun("kindly"));
    ok(!RiTa.isNoun("bravely"));
    ok(!RiTa.isNoun("scarily"));
    ok(!RiTa.isNoun("sleepily"));
    ok(!RiTa.isNoun("excitedly"));
    ok(!RiTa.isNoun("energetically"));

    //bad input
    ok(!RiTa.isNoun(""));
    ok(!RiTa.isNoun());
    ok(!RiTa.isNoun(42));
    ok(!RiTa.isNoun(["rabbit"]));

    //verbs (esp. past particle)
    ok(!RiTa.isNoun("heard"), "heard: " + RiTa.tagger.allTags("heard"));
    ok(!RiTa.isNoun("deterred"));
  });

  it('Should call isVerb', function () {

    expect(RiTa.isVerb("abandons")).eq(true);

    // verbs
    ok(RiTa.isVerb("dance"));
    ok(RiTa.isVerb("swim"));
    ok(RiTa.isVerb("walk"));

    ok(RiTa.isVerb("dances"));
    ok(RiTa.isVerb("swims"));
    ok(RiTa.isVerb("walks"));
    ok(RiTa.isVerb("costs"));

    // inflections
    ok(RiTa.isVerb("danced"));
    ok(RiTa.isVerb("swam"));
    ok(RiTa.isVerb("walked"));
    ok(RiTa.isVerb("costed"));
    ok(RiTa.isVerb("satisfies"));
    ok(RiTa.isVerb("falsifies"));
    ok(RiTa.isVerb("beautifies"));
    ok(RiTa.isVerb("repossesses"));

    ok(!RiTa.isVerb("dancer"));
    ok(!RiTa.isVerb("walker"));
    ok(!RiTa.isVerb("beautiful"));

    ok(RiTa.isVerb("eat"), 'eat');
    ok(RiTa.isVerb("chew"));

    ok(RiTa.isVerb("throw")); // +n
    ok(RiTa.isVerb("walk")); // +n
    ok(RiTa.isVerb("wash")); // +n
    ok(RiTa.isVerb("drink")); // +n

    ok(RiTa.isVerb("fish")); // +n

    ok(RiTa.isVerb("wind")); // +n
    ok(RiTa.isVerb("wet")); // +adj
    ok(RiTa.isVerb("dry")); // +adj

    //adj
    ok(!RiTa.isVerb("hard"));
    ok(!RiTa.isVerb("furry"));
    ok(!RiTa.isVerb("sad"));
    ok(!RiTa.isVerb("happy"));

    //n
    ok(!RiTa.isVerb("dolls"));
    ok(!RiTa.isVerb("frogs"));
    ok(RiTa.isVerb("flowers"));
    ok(RiTa.isVerb("ducks"));

    //adv
    ok(!RiTa.isVerb("truthfully"));
    ok(!RiTa.isVerb("kindly"));
    ok(!RiTa.isVerb("bravely"));
    ok(!RiTa.isVerb("scarily"));
    ok(!RiTa.isVerb("sleepily"));
    ok(!RiTa.isVerb("excitedly"));
    ok(!RiTa.isVerb("energetically"));

    // inflections
    ok(RiTa.isVerb("hates"));
    ok(RiTa.isVerb("hated"));
    ok(RiTa.isVerb("hating"));
    ok(RiTa.isVerb("dancing"));
    ok(RiTa.isVerb("flowers"));

    // irregular inflections (SYNC:)
    ok(RiTa.isVerb("hates"));
    ok(RiTa.isVerb("hated"));
    ok(RiTa.isVerb("ridden"));
    ok(RiTa.isVerb("rode"));

    ok(RiTa.isVerb("abetted"));
    ok(RiTa.isVerb("abetting"));
    ok(RiTa.isVerb("abutted"));
    ok(RiTa.isVerb("abutting"));
    ok(RiTa.isVerb("abuts"));
    ok(RiTa.isVerb("abut"));

    ok(RiTa.isVerb("misdeal"));
    ok(RiTa.isVerb("misdeals"));
    ok(RiTa.isVerb("misdealt"));

    // bad inputs
    ok(!RiTa.isVerb(""));
    ok(!RiTa.isVerb());
    ok(!RiTa.isVerb(42));
    ok(!RiTa.isVerb(["work"]));
  });

  it('Should call isAdjective', function () {

    ok(!RiTa.isAdjective("swim"));
    ok(!RiTa.isAdjective("walk"));
    ok(!RiTa.isAdjective("walker"));
    ok(RiTa.isAdjective("beautiful"));
    ok(!RiTa.isAdjective("dance"));
    ok(!RiTa.isAdjective("dancing"));
    ok(!RiTa.isAdjective("dancer"));

    //verb
    ok(!RiTa.isAdjective("wash"));
    ok(!RiTa.isAdjective("walk"));
    ok(!RiTa.isAdjective("play"));
    ok(!RiTa.isAdjective("throw"));
    ok(!RiTa.isAdjective("drink"));
    ok(!RiTa.isAdjective("eat"));
    ok(!RiTa.isAdjective("chew"));

    //adj
    ok(RiTa.isAdjective("hard"));
    ok(RiTa.isAdjective("wet"));
    ok(RiTa.isAdjective("dry"));
    ok(RiTa.isAdjective("furry"));
    ok(RiTa.isAdjective("sad"));
    ok(RiTa.isAdjective("happy"));
    ok(RiTa.isAdjective("kindly")); //+adv

    //n
    ok(!RiTa.isAdjective("dogs"));
    ok(!RiTa.isAdjective("wind"));
    ok(!RiTa.isAdjective("dolls"));
    ok(!RiTa.isAdjective("frogs"));
    ok(!RiTa.isAdjective("ducks"));
    ok(!RiTa.isAdjective("flowers"));
    ok(!RiTa.isAdjective("fish"));

    //adv
    ok(!RiTa.isAdjective("truthfully"));
    ok(!RiTa.isAdjective("bravely"));
    ok(!RiTa.isAdjective("scarily"));
    ok(!RiTa.isAdjective("sleepily"));
    ok(!RiTa.isAdjective("excitedly"));
    ok(!RiTa.isAdjective("energetically"));

    //bad inputs
    ok(!RiTa.isAdjective(""));
    ok(!RiTa.isAdjective());
    ok(!RiTa.isAdjective(42));
    ok(!RiTa.isAdjective(["happy"]));
  });

  //test helpers

  it('Should call allTags', function () {
    eql(RiTa.tagger.allTags('monkey'), ["nn"]);
    eql(RiTa.tagger.allTags('monkeys'), ["nns"]);
    eql(RiTa.tagger.allTags(''), []);
    eql(RiTa.tagger.allTags(['monkey']), []);
    eql(RiTa.tagger.allTags("hates", { noDerivations: true }), []);
    eql(RiTa.tagger.allTags("satisfies"), ["vbz"]);
    eql(RiTa.tagger.allTags("falsifies"), ["vbz"])
    expect(RiTa.tagger.allTags("hates")).to.include("vbz");
    expect(RiTa.tagger.allTags("hates")).to.include("nns");
    expect(RiTa.tagger.allTags("cakes")).to.include("nns");
    expect(RiTa.tagger.allTags("repossesses")).to.include("vbz");
    expect(RiTa.tagger.allTags("thieves")).to.include("nns");
    expect(RiTa.tagger.allTags("thieves")).to.include("vbz");
    expect(RiTa.tagger.allTags("hated")).to.include("vbd");
    expect(RiTa.tagger.allTags("hated")).to.include("vbn");
    expect(RiTa.tagger.allTags("owed")).to.include("vbd");
    expect(RiTa.tagger.allTags("owed")).to.include("vbn");
    expect(RiTa.tagger.allTags("assenting")).to.include("vbg");
    expect(RiTa.tagger.allTags("hating")).to.include("vbg");
    expect(RiTa.tagger.allTags("feet")).to.include("nns");
    expect(RiTa.tagger.allTags("men")).to.include("nns");
    //given up
    expect(RiTa.tagger.allTags("ashdj")).to.include("nn");
    expect(RiTa.tagger.allTags("kahsdly")).to.include("rb");
    expect(RiTa.tagger.allTags("asdkasws")).to.include("nns");

    //https://github.com/dhowe/rita/issues/177
    expect(RiTa.tagger.allTags("bit")).eql(['vbd','nn','rb']);
    expect(RiTa.tagger.allTags("broke")).eql(['vbd','jj','rb']);
    expect(RiTa.tagger.allTags("called")).eql(['vbd','vbn']);
    expect(RiTa.tagger.allTags("committed")).eql(['vbn','jj','vbd']);
    expect(RiTa.tagger.allTags("computerized")).eql(['jj','vbd','vbn']);
    expect(RiTa.tagger.allTags("concerned")).eql(['vbd','jj','vbn']);;
    expect(RiTa.tagger.allTags("discriminated")).eql(['vbd','vbn','jj']);
    expect(RiTa.tagger.allTags("ended")).eql(['vbd','jj','vbn']);
    expect(RiTa.tagger.allTags("expected")).eql(['vbn','vbd','jj']);
    expect(RiTa.tagger.allTags("finished")).eql(['vbd','jj','vbn']);
    expect(RiTa.tagger.allTags("gained")).eql(['vbd','vbn']);

    expect(RiTa.tagger.allTags("got")).eql(['vbd', 'vbn']);
    expect(RiTa.tagger.allTags("increased")).eql(['vbn','jj','vbd']);
    expect(RiTa.tagger.allTags("involved")).eql(['vbn','vbd','jj']);
    expect(RiTa.tagger.allTags("launched")).eql(['vbn','vbd']);
    expect(RiTa.tagger.allTags("led")).eql(['vbd', 'vbn']);
    expect(RiTa.tagger.allTags("lived")).eql(['vbd','vbn']);
    expect(RiTa.tagger.allTags("oversaw")).eql(['vbd']);
    expect(RiTa.tagger.allTags("paled")).eql(['vbd','vbn']);
    expect(RiTa.tagger.allTags("prepaid")).eql(['jj','vbd','vbn']);;
    expect(RiTa.tagger.allTags("pressured")).eql(['vbn','jj','vbd']);
    expect(RiTa.tagger.allTags("proliferated")).eql(['vbn','vbd']);
    expect(RiTa.tagger.allTags("remade")).eql(['vbd','vbn']);
    expect(RiTa.tagger.allTags("reopened")).eql(['vbd','vbn']);
    expect(RiTa.tagger.allTags("reported")).eql(['vbd','jj','vbn']);
    expect(RiTa.tagger.allTags("resold")).eql(['vbd','vbn']);
    expect(RiTa.tagger.allTags("settled")).eql(['vbd','vbn','jj']);
    expect(RiTa.tagger.allTags("started")).eql(['vbd','jj','vbn']);

   });

  it('Should call hasTag', function () {
    ok(!RiTa.tagger.hasTag());
    ok(!RiTa.tagger.hasTag('nn adj', 'nn'));
    ok(RiTa.tagger.hasTag(RiTa.tagger.allTags('monkey'), 'nn'));
  });

  it('Should call inlineTags', function () {
    eq(RiTa.tagger.inlineTags(), "");
    eq(RiTa.tagger.inlineTags([]), "");
    expect(function () { RiTa.tagger.inlineTags(["I", "am", "Pikachu"], [], "/"); }).to.throw();
    eq(RiTa.tagger.inlineTags(["I", "am", "happy", "."], ["prp", "vbp", "jj", "."]), "I/prp am/vbp happy/jj .");
    eq(RiTa.tagger.inlineTags(["I", "am", "happy", "."], ["prp", "vbp", "jj", "."], ";"), "I;prp am;vbp happy;jj .");
  });

  it('Should call tag', function () {
    eql(RiTa.tagger.tag([]), []);
    eql(RiTa.tagger.tag(), []);
    eq(RiTa.tagger.tag([], { inline: true }), "");
    eql(RiTa.tagger.tag(["I", "am", "happy", "."], { simple: true }), ["-", "v", "a", "-"]);
    eq(RiTa.tagger.tag(["I", "am", "happy", "."], { simple: true, inline: true }), "I/- am/v happy/a .");
    eq(RiTa.tagger.tag(["I", "roll", "a", "9", "."], { inline: true }), "I/prp roll/vbp a/dt 9/cd .");
    eq(RiTa.tagger.tag(["A", "badguy", "."], { inline: true }), "A/dt badguy/nn .");
    eq(RiTa.tagger.tag(["A", "C", "level", "grade", "."], { inline: true }), "A/dt C/C level/jj grade/nn .");
    // rule 1
    eq(RiTa.tagger.tag(["The", "run", "was", "great", "."], { inline: true }), "The/dt run/nn was/vbd great/jj .");
    eq(RiTa.tagger.tag(["They", "are", "the", "beaten", "."], { inline: true }), "They/prp are/vbp the/dt beaten/nn .");
    eq(RiTa.tagger.tag(["A", "diss", "."], { inline: true }), "A/dt diss/nns .");
    eq(RiTa.tagger.tag(["The", "soon", "."], { inline: true }), "The/dt soon/jj .");
    eq(RiTa.tagger.tag(["The", "sooner", "."], { inline: true }), "The/dt sooner/jjr .");
    eq(RiTa.tagger.tag(["The", "soonest", "."], { inline: true }), "The/dt soonest/jjs .");
    //rule 2
    eq(RiTa.tagger.tag(["It", "is", "59876", "."], { inline: true }), "It/prp is/vbz 59876/cd .");
    //rule 3
    eq(RiTa.tagger.tag(["I", "teabaged", "."], { inline: true }), "I/prp teabaged/vbn .");
    eq(RiTa.tagger.tag(["Sun", "teabaged", "."], { inline: true }), "Sun/nn teabaged/vbn .");
    eq(RiTa.tagger.tag(["The", "worker", "proletarianized", "."], { inline: true }), "The/dt worker/nn proletarianized/vbn .");
    //rule 4
    eq(RiTa.tagger.tag(["The", "fortunately", "."], { inline: true }), "The/dt fortunately/rb ."); // 1-b then 4
    eq(RiTa.tagger.tag(["He", "is", "goodly", "working", "."], { inline: true }), "He/prp is/vbz goodly/rb working/vbg .");
    //rule 5
    eq(RiTa.tagger.tag(["It", "is", "nonexistional", "."], { inline: true }), "It/prp is/vbz nonexistional/jj .");
    eq(RiTa.tagger.tag(["It", "is", "mammal", "."], { inline: true }), "It/prp is/vbz mammal/nn .");
    eq(RiTa.tagger.tag(["It", "is", "onal", "."], { inline: true }), "It/prp is/vbz onal/nn .");
    //rule 6
    eq(RiTa.tagger.tag(["We", "must", "place", "it", "."], { inline: true }), "We/prp must/md place/vb it/prp .");
    eq(RiTa.tagger.tag(["We", "must", "teabag", "him", "."], { inline: true }), "We/prp must/md teabag/vb him/prp .");
    //rule 7 
    eq(RiTa.tagger.tag(["He", "has", "played", "it", "."], { inline: true }), "He/prp has/vbz played/vbn it/prp .");
    eq(RiTa.tagger.tag(["He", "gets", "played", "."], { inline: true }), "He/prp gets/vbz played/vbn .");
    //rule 8
    eq(RiTa.tagger.tag(["The", "morning", "."], { inline: true }), "The/dt morning/nn .");
    eq(RiTa.tagger.tag(["They", "are", "fishing", "."], { inline: true }), "They/prp are/vbp fishing/vbg .");
    //rule 9
    eq(RiTa.tagger.tag(["He", "dances", "."], { inline: true }), "He/prp dances/vbz .");
    eq(RiTa.tagger.tag(["The", "dog", "dances", "."], { inline: true }), "The/dt dog/nn dances/vbz .");
    eq(RiTa.tagger.tag(["Dave", "dances", "."], { inline: true }), "Dave/nnp dances/vbz .");
    //rule 10
    eq(RiTa.tagger.tag(["Taipei", "."], { inline: true }), "Taipei/nnp .");
    eq(RiTa.tagger.tag(["Buddhas", "."], { inline: true }), "Buddhas/nnps .");
    eq(RiTa.tagger.tag(["In", "Beijing", "."], { inline: true }), "In/in Beijing/nnp .");
    eq(RiTa.tagger.tag(["One", "of", "the", "Beats", "."], { inline: true }), "One/cd of/in the/dt Beats/nnps .");
    eq(RiTa.tagger.tag(["Taipei", "is", "a", "big", "city", "."], { inline: true }), "Taipei/nnp is/vbz a/dt big/jj city/nn .");
    eq(RiTa.tagger.tag(["Buddhas", "in", "this", "temple", "have", "a", "history", "of", "500", "years", "."], { inline: true }), "Buddhas/nnps in/in this/dt temple/nn have/vbp a/dt history/nn of/in 500/cd years/nns .");
    eq(RiTa.tagger.tag(["Balls", "on", "the", "floor", "."], { inline: true }), "Balls/nns on/in the/dt floor/nn .");
    //rule 11
    eq(RiTa.tagger.tag(["dances", "."], { inline: true }), "dances/nns .");
    eq(RiTa.tagger.tag(["dances", "and", "performances", "."], { inline: true }), "dances/nns and/cc performances/nns .");
    eq(RiTa.tagger.tag(["cakes", "quickly", "."], { inline: true }), "cakes/nns quickly/rb .");
    eq(RiTa.tagger.tag(["dances", "quickly", "."], { inline: true }), "dances/vbz quickly/rb .");
    //rule 12
    eq(RiTa.tagger.tag(["David", "cakes", "."], { inline: true }), "David/nnp cakes/nns .");
    eq(RiTa.tagger.tag(["David", "laughs", "and", "dances", "."], { inline: true }), "David/nnp laughs/vbz and/cc dances/vbz .");
    eq(RiTa.tagger.tag(["counterattacks", "."], { inline: true }), "counterattacks/nns .");
    //rule 13
    eq(RiTa.tagger.tag(["Monkeys", "run", "."], { inline: true }), "Monkeys/nns run/vbp .");
    eq(RiTa.tagger.tag(["Monkeys", "attack", "."], { inline: true }), "Monkeys/nns attack/vbp .");
    //
    eq(RiTa.tagger.tag(["A", "light", "blue", "sky", "."], { inline: true }), "A/dt light/jj blue/jj sky/nn .");
  
    //https://github.com/dhowe/rita/issues/177
    eq(RiTa.tagger.tag(["It", "broke", "."], { inline: true }), "It/prp broke/vbd .");
    eq(RiTa.tagger.tag(["It", "outpaced", "that","."], { inline: true }), "It/prp outpaced/vbd that/in .");
    eq(RiTa.tagger.tag(["She", "remade", "this", "video", "."], { inline: true }), "She/prp remade/vbd this/dt video/nn .");
    eq(RiTa.tagger.tag(["She", "has", "remade", "this", "video", "."], { inline: true }), "She/prp has/vbz remade/vbn this/dt video/nn .");
    0 && eq(RiTa.tagger.tag(["The", "video","was" ,"remade", "."], { inline: true }), "The/dt video/nn was/vbd remade/vbn .");
    0 && eq(RiTa.tagger.tag(["Being", "literate", "didn\'t" ,"stop", "him", "from", "being", "discriminated", "against","."], { inline: true }), "Being/vbg literate/jj didn't/vbd stop/vb him/prp from/in being/vbg discriminated/vbn against/in .");
   
  });

  it('Should handle hyphenated words in sentence', () => { 
    let pool = [
      'He is my father-in-law.',
      'We have a off-site meeting yesterday.',
      'I know a great place for an off-site.',
      'a state-of-the-art computer',
      'The girls wanted the merry-go-round to go faster.',
      'He ate twenty-one burgers today.',
      'The politician arrived by high-speed railway.',
      'People doing yoga benefit from an increased feeling of well-being.',
      'There is a life-size statue of the dragon in the park.',
      'He has a king-size bed in his room.',
      'I am taking a full-time job now',
      'The cost for the round-trip ticket is 2000 dollars.',
      'The cost is 2000 dollars for the round-trip.',
      'He come back empty-handed',
      'She is left-handed',
      'I like the dress of the long-haired girl in the photo.',
      'His move was breath-taking.',
      'Snakes are cold-blooded.',
      'People liked to wear bell-bottoms in the 80s.',
      'This shop mainly sells corn-fed meat.',
      'I withdraw the application and re-apply for another position.',
      'Our co-manager believe in neo-liberalism.',
      'He did a u-turn.',
      'We are not going to get down to the nitty-gritty analysis of value for money.',
      'The game require co-op with your teammates.',
      'He was a roly-poly little man.'
    ];

    let answers = [
      ["prp", "vbz", "prp$", "nn", "."],
      ["prp", "vbp", "dt", "jj", "vbg", "nn", "."],
      ["prp", "vbp", "dt", "jj", "nn", "in", "dt", "nn", "."],
      ["dt", "jj", "nn"],
      ["dt", "nns", "vbd", "dt", "nn", "to", "vb", "rbr", "."],
      ["prp", "vbd", "cd", "nns", "nn", "."],
      ["dt", "nn", "vbd", "in", "jj", "nn", "."],
      ["nn", "vbg", "nn", "nn", "in", "dt", "jj", "vbg", "in", "nn", "."],
      ["ex", "vbz", "dt", "jj", "nn", "in", "dt", "nn", "in", "dt", "nn", "."],
      ["prp", "vbz", "dt", "jj", "nn", "in", "prp$", "nn", "."],
      ["prp", "vbp", "vbg", "dt", "jj", "nn", "rb"],
      ["dt", "nn", "in", "dt", "jj", "nn", "vbz", "cd", "nns", "."],
      ["dt", "nn", "vbz", "cd", "nns", "in", "dt", "nn", "."],
      ["prp", "vbp", "rb", "jj"],
      ["prp", "vbz", "jj"],
      ["prp", "vbp", "dt", "nn", "in", "dt", "jj", "nn", "in", "dt", "nn", "."],
      ["prp$", "nn", "vbd", "jj", "."],
      ["nns", "vbp", "jj", "."],
      ["nn", "vbd", "to", "vb", "nn", "in", "dt", "nns", "."],
      ["dt", "nn", "rb", "nns", "jj", "nn", "."],
      ["prp", "vbp", "dt", "nn", "cc", "vb", "in", "dt", "nn", "."],
      ["prp$", "nn", "vbp", "in", "nn", "."],
      ["prp", "vbd", "dt", "nn", "."],
      ["prp", "vbp", "rb", "vbg", "to", "vb", "rb", "to", "dt", "nn", "nn", "in", "nn", "in", "nn", "."],
      ["dt", "nn", "vb", "nn", "in", "prp$", "nns", "."],
      ["prp", "vbd", "dt", "jj", "jj", "nn", "."]
    ];

    answers.forEach((a, i) => { 
      eql(RiTa.pos(pool[i]), a, "fail at: " + pool[i]);
    });
  });
  // }
  // else it('WARN: no tests without lexicon', function () {
  //   expect(true).true;
  // });


  function eql(a, b, m) { expect(a).eql(b, m); }
  function eq(a, b, m) { expect(a).eq(b, m); }
  function ok(a, m) { expect(a, m).to.be.true; }
  function def(res, m) { expect(res, m).to.not.be.undefined; }
});
