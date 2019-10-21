const expect = require('chai').expect;
const RiTa = require('../src/rita_api');

describe('RiTa.Tagger', () => {

  it('Should correctly call posTags()', () => {
    let result, answer, resultArr, answerArr, txt;

    deepEqual(RiTa.posTags(""), []);
    deepEqual(RiTa.posTags("freed"), ["jj"]);

    deepEqual(RiTa.posTags("the top seed"), ["dt", "jj", "nn"]);

    deepEqual(RiTa.posTags("by illegal means"), ["in", "jj", "nn"]);

    deepEqual(RiTa.posTags("biped"), ["nn"]);
    deepEqual(RiTa.posTags("greed"), ["nn"]);
    deepEqual(RiTa.posTags("creed"), ["nn"]);
    deepEqual(RiTa.posTags("weed"), ["nn"]);

    result = RiTa.posTags("mammal");
    answer = ["nn"];
    deepEqual(result, answer);

    result = RiTa.posTags("asfaasd");
    answer = ["nn"];
    deepEqual(result, answer);

    result = RiTa.posTags("innings");
    answer = ["nns"];
    deepEqual(result, answer);

    result = RiTa.posTags("clothes");
    answer = ["nns"];
    deepEqual(result, answer);

    result = RiTa.posTags("clothes");
    answer = ["nns"];
    deepEqual(result, answer);

    result = RiTa.posTags("teeth");
    answer = ["nns"];
    deepEqual(result, answer);
    //return;

    result = RiTa.posTags("memories");
    answer = ["nns"];
    deepEqual(result, answer);

    deepEqual(RiTa.posTags("flunks"), ["vbz"]);

    deepEqual(RiTa.posTags("outnumbers"), ["vbz"]);
    deepEqual(RiTa.posTags("He outnumbers us"), ["prp", "vbz", "prp"]);
    deepEqual(RiTa.posTags("I outnumber you"), ["prp", "vbp", "prp"]);

    resultArr = RiTa.posTags("Elephants dance");
    answerArr = ["nns", "vbp"];
    deepEqual(answerArr, resultArr);

    result = RiTa.posTags("the boy dances");
    answer = ["dt", "nn", "vbz"];
    deepEqual(result, answer);

    result = RiTa.posTags("he dances");
    answer = ["prp", "vbz"];
    deepEqual(result, answer);

    resultArr = RiTa.posTags("Dave dances");
    answerArr = ["nnp", "vbz"];
    deepEqual(answerArr, resultArr);

    result = RiTa.posTags("running");
    answer = ["vbg"];
    deepEqual(result, answer);

    result = RiTa.posTags("asserting");
    answer = ["vbg"];
    deepEqual(result, answer);

    result = RiTa.posTags("assenting");
    answer = ["nn"];
    deepEqual(result, answer);

    result = RiTa.posTags("Dave");
    answer = ["nnp"];
    deepEqual(result, answer);

    result = RiTa.posTags("They feed the cat");
    answer = ["prp", "vbp", "dt", "nn"];
    deepEqual(result, answer);

    result = RiTa.posTags("There is a cat.");
    answer = ["ex", "vbz", "dt", "nn", "."];
    deepEqual(result, answer);

    result = RiTa.posTags("The boy, dressed in red, ate an apple.");
    answer = ["dt", "nn", ",", "vbn", "in", "jj", ",", "vbd", "dt", "nn", "."];
    deepEqual(result, answer);

    txt = "The dog ran faster than the other dog.  But the other dog was prettier.";
    result = RiTa.posTags(txt);
    answer = ["dt", "nn", "vbd", "rbr", "in", "dt", "jj", "nn", ".", "cc", "dt", "jj", "nn", "vbd", "jjr", "."];
    deepEqual(result, answer);

    // Tests for verb conjugation
    deepEqual(RiTa.posTags("is"), ["vbz"]);
    deepEqual(RiTa.posTags("am"), ["vbp"]);
    deepEqual(RiTa.posTags("be"), ["vb"]);

    result = RiTa.posTags("There is a cat.");
    answer = ["ex", "vbz", "dt", "nn", "."];
    deepEqual(result, answer);

    result = RiTa.posTags("There was a cat.");
    answer = ["ex", "vbd", "dt", "nn", "."];
    deepEqual(result, answer);

    result = RiTa.posTags("I am a cat.");
    answer = ["prp", "vbp", "dt", "nn", "."];
    deepEqual(result, answer);

    result = RiTa.posTags("I was a cat.");
    answer = ["prp", "vbd", "dt", "nn", "."];
    deepEqual(result, answer);

    deepEqual(RiTa.posTags("flunk"), ["vb"]);
    deepEqual(RiTa.posTags("He flunks the test"), ["prp", "vbz", "dt", "nn"]);

    deepEqual(RiTa.posTags("he"), ["prp"]);
    deepEqual(RiTa.posTags("outnumber"), ["vb"]);
    deepEqual(RiTa.posTags("I outnumbered you"), ["prp", "vbd", "prp"]);
    deepEqual(RiTa.posTags("She outnumbered us"), ["prp", "vbd", "prp"]);

    deepEqual(RiTa.posTags("I outnumbered them"), ["prp", "vbd", "prp"]);

    let checks = ["emphasis", "stress", "discus", "colossus", "fibrosis", "digitalis", "pettiness", "mess", "cleanliness", "orderliness", "bronchitis", "preparedness", "highness"];
    for (let i = 0, j = checks.length; i < j; i++) {
      //if (RiTa.posTags(checks[i])[0] !== 'nn')
      //console.log(checks[i] + ": " + RiTa.posTags(checks[i])[0]);
      deepEqual(RiTa.posTags(checks[i]), ["nn"]);
    }
  });

  it('Should correctly call simple posTags()', () => {
    //deepEqual(RiTa.posTags("", { simple: true }), []);
    deepEqual(RiTa.posTags("biped", { simple: true }), ["n"]);
    deepEqual(RiTa.posTags("greed", { simple: true }), ["n"]);
    deepEqual(RiTa.posTags("creed", { simple: true }), ["n"]);
    deepEqual(RiTa.posTags("weed", { simple: true }), ["n"]);
    deepEqual(RiTa.posTags("is", { simple: true }), ["v"]);
    deepEqual(RiTa.posTags("am", { simple: true }), ["v"]);
    deepEqual(RiTa.posTags("be", { simple: true }), ["v"]);
    deepEqual(RiTa.posTags("freed", { simple: true }), ["a"]);
  });

  it('Should correctly call inline posTags()', () => {
    let result, answer, txt;

    deepEqual(RiTa.posTags("", { inline: true }), "");
    deepEqual(RiTa.posTags("asdfaasd", { inline: true }), "asdfaasd/nn");

    result = RiTa.posTags("clothes", { inline: true });
    answer = "clothes/nns";
    deepEqual(result, answer);

    result = RiTa.posTags("teeth", { inline: true });
    answer = "teeth/nns";
    deepEqual(result, answer);

    result = RiTa.posTags("There is a cat.", { inline: true });
    answer = "There/ex is/vbz a/dt cat/nn .";
    deepEqual(result, answer);

    result = RiTa.posTags("The boy, dressed in red, ate an apple.", { inline: true });
    answer = "The/dt boy/nn , dressed/vbn in/in red/jj , ate/vbd an/dt apple/nn .";
    deepEqual(result, answer);

    txt = "The dog ran faster than the other dog.  But the other dog was prettier.";
    result = RiTa.posTags(txt, { inline: true });
    answer = "The/dt dog/nn ran/vbd faster/rbr than/in the/dt other/jj dog/nn . But/cc the/dt other/jj dog/nn was/vbd prettier/jjr .";
    equal(result, answer);
  });

  it('Should correctly call isAdverb()', () => {

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
    ok(RiTa.isAdverb("excitedly"));
    ok(RiTa.isAdverb("energetically"));
    ok(RiTa.isAdverb("hard")); // +adj
  });

  it('Should correctly call isNoun()', () => {

    ok(!RiTa.isNoun(""));

    ok(RiTa.isNoun("swim"));
    ok(RiTa.isNoun("walk"));
    ok(RiTa.isNoun("walker"));
    ok(RiTa.isNoun("dance"));
    ok(RiTa.isNoun("dancer"));
    ok(RiTa.isNoun("cats"));
    ok(RiTa.isNoun("boxes"));
    ok(RiTa.isNoun("teeth"));
    ok(RiTa.isNoun("apples"));
    ok(RiTa.isNoun("buses"));
    ok(RiTa.isNoun("prognoses"));
    ok(RiTa.isNoun("oxen"));
    ok(RiTa.isNoun("theses"));
    ok(RiTa.isNoun("stimuli"));
    ok(RiTa.isNoun("crises"));

    //verb
    ok(RiTa.isNoun("wash")); //"TODO:also false in processing -> nn" shoulbe be both Verb and Noun  ??
    ok(RiTa.isNoun("walk"));
    ok(RiTa.isNoun("play"));
    ok(RiTa.isNoun("throw"));
    ok(RiTa.isNoun("drink")); //TODO:"also false in processing -> nn" shoulbe be both Verb and Noun ??

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

    //adv
    ok(!RiTa.isNoun("truthfully"));
    ok(!RiTa.isNoun("kindly"));
    ok(!RiTa.isNoun("bravely"));
    ok(!RiTa.isNoun("scarily"));
    ok(!RiTa.isNoun("sleepily"));
    ok(!RiTa.isNoun("excitedly"));
    ok(!RiTa.isNoun("energetically"));
  });

  it('Should correctly call isVerb()', () => {

    ok(RiTa.isVerb("dance"));
    ok(RiTa.isVerb("swim"));
    ok(RiTa.isVerb("walk"));
    ok(!RiTa.isVerb("walker"));
    ok(!RiTa.isVerb("beautiful"));

    ok(RiTa.isVerb("dancing"));
    ok(!RiTa.isVerb("dancer"));

    //verb
    ok(RiTa.isVerb("eat"));
    ok(RiTa.isVerb("chew"));

    ok(RiTa.isVerb("throw")); // +n
    ok(RiTa.isVerb("walk")); // +n
    ok(RiTa.isVerb("wash")); // +n
    ok(RiTa.isVerb("drink")); // +n

    // ok(RiTa.isVerb("ducks")); // +n -> Known Issues
    ok(RiTa.isVerb("fish")); // +n
    // ok(RiTa.isVerb("dogs")); // +n -> Known Issues

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
    ok(!RiTa.isVerb("flowers"));

    //adv
    ok(!RiTa.isVerb("truthfully"));
    ok(!RiTa.isVerb("kindly"));
    ok(!RiTa.isVerb("bravely"));
    ok(!RiTa.isVerb("scarily"));
    ok(!RiTa.isVerb("sleepily"));
    ok(!RiTa.isVerb("excitedly"));
    ok(!RiTa.isVerb("energetically"));
  });

  it('Should correctly call isAdjective()', () => {

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

  function deepEqual(output, expected) { expect(output).eql(expected); }
  function equal(a, b) { expect(a).eq(b); }
  function ok(res) { expect(res).eq(true); }

});
