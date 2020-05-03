describe('RiTa.Tagger', () => {

  if (typeof module !== 'undefined') require('./before');

  it('Should correctly call posTags.array', () => {
    eql(RiTa.posTags([]), []);
    eql(RiTa.posTags(["freed"]), ["jj"]);
    eql(RiTa.posTags(["the"]), ["dt"]);  
    eql(RiTa.posTags(["a"]), ["dt"]);
    eql(RiTa.posTags("the top seed".split(/ /)), ["dt", "jj", "nn"]);
    eql(RiTa.posTags("by illegal means".split(/ /)), ["in", "jj", "nn"]);
    eql(RiTa.posTags("He outnumbers us".split(/ /)), ["prp", "vbz", "prp"]);
    eql(RiTa.posTags("I outnumber you".split(/ /)), ["prp", "vbp", "prp"]);
    eql(RiTa.posTags("Elephants dance".split(/ /)), ["nns", "vbp"]);
    eql(RiTa.posTags("the boy dances".split(/ /)), ["dt", "nn", "vbz"]);
    eql(RiTa.posTags("Dave dances".split(/ /)), ["nnp", "vbz"]);
  });

  it('Should correctly call simple posTags.array', () => {
    eql(RiTa.posTags([], { simple: true }), []);
    eql(RiTa.posTags(["freed"], { simple: true }), ["a"]);
    eql(RiTa.posTags(["the"], { simple: true }), ["-"]);
    eql(RiTa.posTags(["a"], { simple: true }), ["-"]);
    eql(RiTa.posTags("the top seed".split(/ /), { simple: true }), ["-", "a", "n"]);
    eql(RiTa.posTags("by illegal means".split(/ /), { simple: true }), ["-", "a", "n"]);
    eql(RiTa.posTags("He outnumbers us".split(/ /), { simple: true }), ["-", "v", "-"]);
    eql(RiTa.posTags("I outnumber you".split(/ /), { simple: true }), ["-", "v", "-"]);
    eql(RiTa.posTags("Elephants dance".split(/ /), { simple: true }), ["n", "v"]);
    eql(RiTa.posTags("the boy dances".split(/ /), { simple: true }), ["-", "n", "v"]);
  });


  it('Should correctly call posTags.array.inline.simple', () => {
    let result, answer, txt;

    eql(RiTa.posTags([], { inline: true, simple: true }), "");
    eql(RiTa.posTags(["asdfaasd"], { inline: true, simple: true }), "asdfaasd/n");

    result = RiTa.posTags(["clothes"], { inline: true, simple: true });
    answer = "clothes/n";
    eql(result, answer);

    result = RiTa.posTags(["teeth"], { inline: true, simple: true });
    answer = "teeth/n";
    eql(result, answer);

    result = RiTa.posTags("There is a cat".split(/ /), { inline: true, simple: true });
    answer = "There/- is/v a/- cat/n";
    eql(result, answer);

    result = RiTa.posTags(RiTa.tokenize("The boy, dressed in red, ate an apple."), { inline: true, simple: true });
    answer = "The/- boy/n , dressed/v in/- red/a , ate/v an/- apple/n .";
    eql(result, answer);

    txt = "The dog ran faster than the other dog. But the other dog was prettier.";
    result = RiTa.posTags(RiTa.tokenize(txt), { inline: true, simple: true });
    answer = "The/- dog/n ran/v faster/r than/- the/- other/a dog/n . But/- the/- other/a dog/n was/v prettier/a .";
    eq(result, answer);
  });

  it('Should correctly handle inflected verbs', () => {
    eql(RiTa.posTags("disbelieves"), ["vbz"]);
    eql(RiTa.posTags("disbelieves", { simple: 1 }), ["v"]);

    eql(RiTa.posTags("fates"), ["nns"]);
    eql(RiTa.posTags("fates", { simple: 1 }), ["n"]);

    eql(RiTa.posTags("hates"), ["vbz"]);
    eql(RiTa.posTags("hates", { simple: 1 }), ["v"]);

    eql(RiTa.posTags("hated"), ["vbd"]);
    eql(RiTa.posTags("hated", { simple: 1 }), ["v"]);

    eql(RiTa.posTags("hating"), ["vbg"]);
    eql(RiTa.posTags("hating", { simple: 1 }), ["v"]);

    eql(RiTa.posTags("He rode the horse"), ['prp', 'vbd', 'dt', 'nn']);
    eql(RiTa.posTags("He has ridden the horse"), ['prp', 'vbz', 'vbn', 'dt', 'nn']);

    eql(RiTa.posTags("He rowed the boat"), ['prp', 'vbd', 'dt', 'nn']);
    eql(RiTa.posTags("He has rowed the boat"), ['prp', 'vbz', 'vbn', 'dt', 'nn']);
  });

  it('Should correctly call posTags', () => {
    let result, answer, resultArr, answerArr, txt;

    eql(RiTa.posTags(""), []);
    eql(RiTa.posTags("freed"), ["jj"]);

    eql(RiTa.posTags("the top seed"), ["dt", "jj", "nn"]);

    eql(RiTa.posTags("by illegal means"), ["in", "jj", "nn"]);

    eql(RiTa.posTags("biped"), ["nn"]);
    eql(RiTa.posTags("greed"), ["nn"]);
    eql(RiTa.posTags("creed"), ["nn"]);
    eql(RiTa.posTags("weed"), ["nn"]);

    result = RiTa.posTags("mammal");
    answer = ["nn"];
    eql(result, answer);

    result = RiTa.posTags("asfaasd");
    answer = ["nn"];
    eql(result, answer);

    result = RiTa.posTags("innings");
    answer = ["nns"];
    eql(result, answer);

    result = RiTa.posTags("clothes");
    answer = ["nns"];
    eql(result, answer);

    result = RiTa.posTags("clothes");
    answer = ["nns"];
    eql(result, answer);

    result = RiTa.posTags("teeth");
    answer = ["nns"];
    eql(result, answer);

    result = RiTa.posTags("memories");
    answer = ["nns"];
    eql(result, answer);

    eql(RiTa.posTags("flunks"), ["vbz"], 'Failed: flunks');
    eql(RiTa.posTags("outnumbers"), ["vbz"], 'Failed: outnumbers');
    eql(RiTa.posTags("He outnumbers us"), ["prp", "vbz", "prp"]);
    eql(RiTa.posTags("I outnumber you"), ["prp", "vbp", "prp"]);

    resultArr = RiTa.posTags("Elephants dance");
    answerArr = ["nns", "vbp"];
    eql(answerArr, resultArr);

    result = RiTa.posTags("the boy dances");
    answer = ["dt", "nn", "vbz"];
    eql(result, answer);

    result = RiTa.posTags("he dances");
    answer = ["prp", "vbz"];
    eql(result, answer);

    resultArr = RiTa.posTags("Dave dances");
    answerArr = ["nnp", "vbz"];
    eql(answerArr, resultArr);

    result = RiTa.posTags("running");
    answer = ["vbg"];
    eql(result, answer);

    result = RiTa.posTags("asserting");
    answer = ["vbg"];
    eql(result, answer);

    result = RiTa.posTags("assenting");
    answer = ["vbg"];
    eql(result, answer);

    result = RiTa.posTags("Dave");
    answer = ["nnp"];
    eql(result, answer);

    result = RiTa.posTags("They feed the cat");
    answer = ["prp", "vbp", "dt", "nn"];
    eql(result, answer);

    result = RiTa.posTags("There is a cat.");
    answer = ["ex", "vbz", "dt", "nn", "."];
    eql(result, answer);

    result = RiTa.posTags("The boy, dressed in red, ate an apple.");
    answer = ["dt", "nn", ",", "vbn", "in", "jj", ",", "vbd", "dt", "nn", "."];
    eql(result, answer);

    txt = "The dog ran faster than the other dog.  But the other dog was prettier.";
    result = RiTa.posTags(txt);
    answer = ["dt", "nn", "vbd", "rbr", "in", "dt", "jj", "nn", ".", "cc", "dt", "jj", "nn", "vbd", "jjr", "."];
    eql(result, answer);

    // Tests for verb conjugation
    eql(RiTa.posTags("is"), ["vbz"]);
    eql(RiTa.posTags("am"), ["vbp"]);
    eql(RiTa.posTags("be"), ["vb"]);

    result = RiTa.posTags("There is a cat.");
    answer = ["ex", "vbz", "dt", "nn", "."];
    eql(result, answer);

    result = RiTa.posTags("There was a cat.");
    answer = ["ex", "vbd", "dt", "nn", "."];
    eql(result, answer);

    result = RiTa.posTags("I am a cat.");
    answer = ["prp", "vbp", "dt", "nn", "."];
    eql(result, answer);

    result = RiTa.posTags("I was a cat.");
    answer = ["prp", "vbd", "dt", "nn", "."];
    eql(result, answer);

    eql(RiTa.posTags("flunk"), ["vb"]);
    eql(RiTa.posTags("He flunks the test"), ["prp", "vbz", "dt", "nn"]);

    eql(RiTa.posTags("he"), ["prp"]);
    eql(RiTa.posTags("outnumber"), ["vb"]);
    eql(RiTa.posTags("I outnumbered you"), ["prp", "vbd", "prp"], "I outnumbered you");
    eql(RiTa.posTags("She outnumbered us"), ["prp", "vbd", "prp"], "She outnumbered us");
    eql(RiTa.posTags("I am outnumbering you"), ["prp", "vbp", "vbg", "prp"], "I am outnumbering you");
    eql(RiTa.posTags("I have outnumbered you"), ["prp", "vbp", "vbd", "prp"], "I have outnumbered you");//?

    let checks = ["emphasis", "stress", "discus", "colossus", "fibrosis", "digitalis", "pettiness", "mess", "cleanliness", "orderliness", "bronchitis", "preparedness", "highness"];
    for (let i = 0, j = checks.length; i < j; i++) {
      eql(RiTa.posTags(checks[i]), ["nn"]);
    }
  });

  it('Should correctly call posTags.simple', () => {
    //eql(RiTa.posTags("", { simple: true }), []);
    eql(RiTa.posTags("biped", { simple: true }), ["n"]);
    eql(RiTa.posTags("greed", { simple: true }), ["n"]);
    eql(RiTa.posTags("creed", { simple: true }), ["n"]);
    eql(RiTa.posTags("weed", { simple: true }), ["n"]);
    eql(RiTa.posTags("is", { simple: true }), ["v"]);
    eql(RiTa.posTags("am", { simple: true }), ["v"]);
    eql(RiTa.posTags("be", { simple: true }), ["v"]);
    eql(RiTa.posTags("freed", { simple: true }), ["a"]);
  });

  it('Should correctly call posTags.inline', () => {
    let result, answer, txt;

    eql(RiTa.posTags("", { inline: true }), "");
    eql(RiTa.posTags("asdfaasd", { inline: true }), "asdfaasd/nn");

    result = RiTa.posTags("clothes", { inline: true });
    answer = "clothes/nns";
    eql(result, answer);

    result = RiTa.posTags("teeth", { inline: true });
    answer = "teeth/nns";
    eql(result, answer);

    result = RiTa.posTags("There is a cat.", { inline: true });
    answer = "There/ex is/vbz a/dt cat/nn .";
    eql(result, answer);

    result = RiTa.posTags("The boy, dressed in red, ate an apple.", { inline: true });
    answer = "The/dt boy/nn , dressed/vbn in/in red/jj , ate/vbd an/dt apple/nn .";
    eql(result, answer);

    txt = "The dog ran faster than the other dog.  But the other dog was prettier.";
    result = RiTa.posTags(txt, { inline: true });
    answer = "The/dt dog/nn ran/vbd faster/rbr than/in the/dt other/jj dog/nn . But/cc the/dt other/jj dog/nn was/vbd prettier/jjr .";
    eq(result, answer);
  });


  it('Should correctly call posTagsInline', () => {
    let result, answer, txt;

    eql(RiTa.posTagsInline(""), "");
    eql(RiTa.posTagsInline("asdfaasd"), "asdfaasd/nn");

    result = RiTa.posTagsInline("clothes");
    answer = "clothes/nns";
    eql(result, answer);

    result = RiTa.posTagsInline("teeth");
    answer = "teeth/nns";
    eql(result, answer);

    result = RiTa.posTagsInline("There is a cat.");
    answer = "There/ex is/vbz a/dt cat/nn .";
    eql(result, answer);

    result = RiTa.posTagsInline("The boy, dressed in red, ate an apple.");
    answer = "The/dt boy/nn , dressed/vbn in/in red/jj , ate/vbd an/dt apple/nn .";
    eql(result, answer);

    txt = "The dog ran faster than the other dog.  But the other dog was prettier.";
    result = RiTa.posTagsInline(txt);
    answer = "The/dt dog/nn ran/vbd faster/rbr than/in the/dt other/jj dog/nn . But/cc the/dt other/jj dog/nn was/vbd prettier/jjr .";
    eq(result, answer);
  });

  it('Should correctly call posTags.inline.simple', () => {
    let result, answer, txt;

    eql(RiTa.posTags("", { inline: true, simple: true }), "");
    eql(RiTa.posTags("asdfaasd", { inline: true, simple: true }), "asdfaasd/n");

    result = RiTa.posTags("clothes", { inline: true, simple: true });
    answer = "clothes/n";
    eql(result, answer);

    result = RiTa.posTags("teeth", { inline: true, simple: true });
    answer = "teeth/n";
    eql(result, answer);

    result = RiTa.posTags("There is a cat.", { inline: true, simple: true });
    answer = "There/- is/v a/- cat/n .";
    eql(result, answer);

    result = RiTa.posTags("The boy, dressed in red, ate an apple.", { inline: true, simple: true });
    answer = "The/- boy/n , dressed/v in/- red/a , ate/v an/- apple/n .";
    eql(result, answer);

    txt = "The dog ran faster than the other dog.  But the other dog was prettier.";
    result = RiTa.posTags(txt, { inline: true, simple: true });
    answer = "The/- dog/n ran/v faster/r than/- the/- other/a dog/n . But/- the/- other/a dog/n was/v prettier/a .";
    eq(result, answer);
  });

  it('Should correctly call posTagsInline.simple', () => {
    let result, answer, txt;
    eql(RiTa.posTagsInline("asdfaasd", { inline: true, simple: true }), "asdfaasd/n");

    eql(RiTa.posTagsInline("", { inline: true, simple: true }), "");

    result = RiTa.posTagsInline("clothes", { inline: true, simple: true });
    answer = "clothes/n";
    eql(result, answer);

    result = RiTa.posTagsInline("teeth", { inline: true, simple: true });
    answer = "teeth/n";
    eql(result, answer);

    result = RiTa.posTagsInline("There is a cat.", { inline: true, simple: true });
    answer = "There/- is/v a/- cat/n .";
    eql(result, answer);

    result = RiTa.posTagsInline("The boy, dressed in red, ate an apple.", { inline: true, simple: true });
    answer = "The/- boy/n , dressed/v in/- red/a , ate/v an/- apple/n .";
    eql(result, answer);

    txt = "The dog ran faster than the other dog.  But the other dog was prettier.";
    result = RiTa.posTagsInline(txt, { inline: true, simple: true });
    answer = "The/- dog/n ran/v faster/r than/- the/- other/a dog/n . But/- the/- other/a dog/n was/v prettier/a .";
    eq(result, answer);
  });

  it('Should correctly call isAdverb', () => {

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

  it('Should correctly call isNoun', () => {
    ok(!RiTa.isNoun("scarily"));
return;
    //ok(!RiTa.isNoun(""));
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

    ok(!RiTa.isNoun("eat"));
    ok(!RiTa.isNoun("chew"));
    ok(!RiTa.isNoun("moved"));
    ok(!RiTa.isNoun("went"));
    ok(!RiTa.isNoun("spent"));
    ok(!RiTa.isNoun("abates"));

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

  it('Should correctly call isVerb', () => {

    // verbs
    ok(RiTa.isVerb("dance"));
    ok(RiTa.isVerb("swim"));
    ok(RiTa.isVerb("walk"));
    
    ok(!RiTa.isVerb("dancer"));
    ok(!RiTa.isVerb("walker"));
    ok(!RiTa.isVerb("beautiful"));

    ok(RiTa.isVerb("eat"),'eat');
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

  it('Should correctly call isAdjective', () => {

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
