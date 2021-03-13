import { RiTa, expect } from './before';

describe('RiTa.Tagger', () => {

  it('Should call pos.array', () => {
    //eql(RiTa.pos([]), []);
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

  it('Should call simple pos.array', () => {
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

  it('Should call allTags', () => {
    eql(RiTa.tagger.allTags('monkey'), ["nn"]);
    eql(RiTa.tagger.allTags('monkeys'), ["nns"]);
  });

  it('Should call pos.array.inline.simple', () => {
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

  it('Should handle inflected verbs', () => {
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

  it('Should call pos', () => {
    let result, answer, resultArr, answerArr, txt;

    eql(RiTa.pos(""), []);
    eql(RiTa.pos("freed"), ["jj"]);
    eql(RiTa.pos("biped"), ["nn"]);
    eql(RiTa.pos("greed"), ["nn"]);
    eql(RiTa.pos("creed"), ["nn"]);
    eql(RiTa.pos("weed"), ["nn"]);

    eql(RiTa.pos("the top seed"), ["dt", "jj", "nn"]);
    eql(RiTa.pos("by illegal means"), ["in", "jj", "nn"]);
    eql(RiTa.pos('Joanny Smith ran away'), ['nnp', 'nnp', 'vbd', 'rb']);

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
  });

  it('Should call pos.simple', () => {
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

  it('Should call pos.inline', () => {
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


  it('Should call posInline', () => {
    let result, answer, txt;

    eql(RiTa.posInline(""), "");
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
  });

  it('Should call pos.inline.simple', () => {
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

  it('Should call posInline.simple', () => {
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

  it('Should call isAdverb', () => {

    ok(!RiTa.isAdverb(""));

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

  it('Should call isNoun', () => {

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
  });

  it('Should call isVerb', () => {

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

    //adv
    ok(!RiTa.isVerb("truthfully"));
    ok(!RiTa.isVerb("kindly"));
    ok(!RiTa.isVerb("bravely"));
    ok(!RiTa.isVerb("scarily"));
    ok(!RiTa.isVerb("sleepily"));
    ok(!RiTa.isVerb("excitedly"));
    ok(!RiTa.isVerb("energetically"));

    // failing
    ok(RiTa.isVerb("flowers"));
    ok(RiTa.isVerb("ducks"));

    // inflections
    ok(RiTa.isVerb("hates"));
    ok(RiTa.isVerb("hated"));
    ok(RiTa.isVerb("hating"));
    ok(RiTa.isVerb("dancing"));
    ok(RiTa.isVerb("flowers"));

    // irregular inflections
    ok(RiTa.isVerb("hates"));
    ok(RiTa.isVerb("hated"));
    ok(RiTa.isVerb("ridden"));
  });

  it('Should call isAdjective', () => {

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
  });

  function eql(a, b, m) { expect(a).eql(b, m); }
  function eq(a, b, m) { expect(a).eq(b, m); }
  function ok(a, m) { expect(a, m).to.be.true; }
  function def(res, m) { expect(res, m).to.not.be.undefined; }
});
