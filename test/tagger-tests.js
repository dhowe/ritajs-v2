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
    eql(RiTa.pos(","), [',']);
    eql(RiTa.pos(" "), []);
    
    eql(RiTa.pos("freed"), ["jj"]);
    eql(RiTa.pos("biped"), ["nn"]);
    eql(RiTa.pos("greed"), ["nn"]);
    eql(RiTa.pos("creed"), ["nn"]);
    eql(RiTa.pos("weed"), ["nn"]);

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
    eql(RiTa.pos("he stands still, thinking about the words"), ["prp", "vbz" ,"rb", ",", "vbg", "in", "dt", "nns"]);
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

    //bad input
    ok(!RiTa.isNoun(""));
    ok(!RiTa.isNoun());
    ok(!RiTa.isNoun(42));
    ok(!RiTa.isNoun(["rabbit"]));
    
    //verbs (esp. past particle)
    ok(!RiTa.isNoun("heard"), "heard: " + RiTa.tagger.allTags("heard"));
    ok(!RiTa.isNoun("deterred"));
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

    // bad inputs
    ok(!RiTa.isVerb(""));
    ok(!RiTa.isVerb());
    ok(!RiTa.isVerb(42));
    ok(!RiTa.isVerb(["work"]));
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

    //bad inputs
    ok(!RiTa.isAdjective(""));
    ok(!RiTa.isAdjective());
    ok(!RiTa.isAdjective(42));
    ok(!RiTa.isAdjective(["happy"]));
  });

  //test helpers

  it('Should call allTags', () => {
    eql(RiTa.tagger.allTags('monkey'), ["nn"]);
    eql(RiTa.tagger.allTags('monkeys'), ["nns"]);
    eq(RiTa.tagger.allTags(''), undefined);
    eq(RiTa.tagger.allTags(['monkey']), undefined);
    eq(RiTa.tagger.allTags("hates", {noDerivations: true}), null);
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
  });

  it('Should call hasTag', () => {
    ok(!RiTa.tagger.hasTag());
    ok(!RiTa.tagger.hasTag('nn adj', 'nn'));
    ok(RiTa.tagger.hasTag(RiTa.tagger.allTags('monkey'), 'nn'));
  });

  it('Should call inlineTags', () => {
    eq(RiTa.tagger.inlineTags(), "");
    eq(RiTa.tagger.inlineTags([]), "");
    expect(() => { RiTa.tagger.inlineTags(["I", "am", "Pikachu"], [], "/"); }).to.throw();
    eq(RiTa.tagger.inlineTags(["I", "am", "happy", "."], ["prp", "vbp", "jj", "."]), "I/prp am/vbp happy/jj .");
    eq(RiTa.tagger.inlineTags(["I", "am", "happy", "."], ["prp", "vbp", "jj", "."], ";"), "I;prp am;vbp happy;jj .");
  });

  it('Should call tag', () => {
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
  });

  function eql(a, b, m) { expect(a).eql(b, m); }
  function eq(a, b, m) { expect(a).eq(b, m); }
  function ok(a, m) { expect(a, m).to.be.true; }
  function def(res, m) { expect(res, m).to.not.be.undefined; }
});
