
describe('RiTa.Core', () => {

  if (typeof module !== 'undefined') require('./before');

  it('Should correctly call stem', () => {
    let data = [
      "boy", "boy",
      "boys", "boy",
      "biophysics", "biophysics",
      "automata", "automaton",
      "genus", "genus",
      "emus", "emu",
      "cakes", "cake",
      "run", "run",
      "runs", "run",
      "running", "running",
      "take", "take",
      "takes", "take",
      "taking", "taking",
      "hide", "hide",
      "hides", "hide",
      "hiding", "hiding",
      "become", "become",
      "becomes", "become",
      "becoming", "becoming",
      "gases", "gas",
      "buses", "bus",
      "happiness", "happiness",
      "terrible", "terrible",
    ];
    for (var i = 0; i < data.length; i += 2) {
      eq(RiTa.stem(data[i]), data[i + 1], 'got ' + RiTa.stem(data[i]));
    }
  });

  it('Should call randomOrdering', () => {
    expect(RiTa.randomOrdering(1)).eql([0]);
    expect(RiTa.randomOrdering(2)).to.have.members([0, 1])
    expect(RiTa.randomOrdering(['a'])).eql(['a']);
    expect(RiTa.randomOrdering(['a', 'b'])).to.have.members(['a', 'b']);
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
    ok(RiTa.isAbbreviation("DR."));
    ok(RiTa.isAbbreviation("Dr. "));
    ok(RiTa.isAbbreviation(" Dr."));
    ok(RiTa.isAbbreviation("Prof."));
    ok(RiTa.isAbbreviation("prof."));

    ok(!RiTa.isAbbreviation("Dr"));
    ok(!RiTa.isAbbreviation("Doctor"));
    ok(!RiTa.isAbbreviation("Doctor."));
    ok(!RiTa.isAbbreviation("PRFO."));
    ok(!RiTa.isAbbreviation("PrFo."));
    ok(!RiTa.isAbbreviation("Professor"));
    ok(!RiTa.isAbbreviation("professor"));
    ok(!RiTa.isAbbreviation("PROFESSOR"));
    ok(!RiTa.isAbbreviation("Professor."));
    ok(!RiTa.isAbbreviation("@#$%^&*()"));
    ok(!RiTa.isAbbreviation(""));
    ok(!RiTa.isAbbreviation(null));
    ok(!RiTa.isAbbreviation(undefined));
    ok(!RiTa.isAbbreviation(1));

    ok(RiTa.isAbbreviation("Dr.", { caseSensitive: true }));
    ok(RiTa.isAbbreviation("Dr. ", { caseSensitive: true }));
    ok(RiTa.isAbbreviation(" Dr.", { caseSensitive: true }));
    ok(RiTa.isAbbreviation("Prof.", { caseSensitive: true }));

    ok(!RiTa.isAbbreviation("dr.", { caseSensitive: true }));
    ok(!RiTa.isAbbreviation("DR.", { caseSensitive: true }));
    ok(!RiTa.isAbbreviation("Dr", { caseSensitive: true }));
    ok(!RiTa.isAbbreviation("Doctor", { caseSensitive: true }));
    ok(!RiTa.isAbbreviation("Doctor.", { caseSensitive: true }));
    ok(!RiTa.isAbbreviation("prof.", { caseSensitive: true }));
    ok(!RiTa.isAbbreviation("PRFO.", { caseSensitive: true }));
    ok(!RiTa.isAbbreviation("PrFo.", { caseSensitive: true }));
    ok(!RiTa.isAbbreviation("Professor", { caseSensitive: true }));
    ok(!RiTa.isAbbreviation("professor", { caseSensitive: true }));
    ok(!RiTa.isAbbreviation("PROFESSOR", { caseSensitive: true }));
    ok(!RiTa.isAbbreviation("Professor.", { caseSensitive: true }));
    ok(!RiTa.isAbbreviation("@#$%^&*()", { caseSensitive: true }));
    ok(!RiTa.isAbbreviation("", { caseSensitive: true }));
    ok(!RiTa.isAbbreviation(null, { caseSensitive: true }));
    ok(!RiTa.isAbbreviation(undefined, { caseSensitive: true }));
    ok(!RiTa.isAbbreviation(1, { caseSensitive: true }));
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
      ok(RiTa.isPunctuation(punct[i]));
    }

    // TODO: also test multiple characters strings here ****
    punct = "\"��������`'";
    for (let i = 0; i < punct.length; i++) {
      ok(RiTa.isPunctuation(punct[i]));
    }

    punct = "\"��������`',;:!?)([].#\"\\!@$%&}<>|+=-_\\/*{^";
    for (let i = 0; i < punct.length; i++) {
      ok(RiTa.isPunctuation(punct[i]));
    }

    // TODO: and here...
    let nopunct = 'Helloasdfnals  FgG   \t kjdhfakjsdhf askjdfh aaf98762348576';
    for (let i = 0; i < nopunct.length; i++) {
      ok(!RiTa.isPunctuation(nopunct[i]));
    }

    ok(!RiTa.isPunctuation(""));
  });

  it('Should correctly call tokenize', () => {

    expect(RiTa.tokenize("")).eql([""]);
    expect(RiTa.tokenize("The dog")).eql(["The", "dog"]);

    let input, expected, output;

    input = "The student said 'learning is fun'";
    expected = ["The", "student", "said", "'", "learning", "is", "fun", "'"];
    output = RiTa.tokenize(input);
    expect(output).eql(expected);

    input = '"Oh God," he thought.';
    expected = ['"', 'Oh', 'God', ',', '"', 'he', 'thought', '.'];
    output = RiTa.tokenize(input);
    //console.log(expected,output);
    expect(output).eql(expected);

    input = "The boy, dressed in red, ate an apple.";
    expected = ["The", "boy", ",", "dressed", "in", "red", ",", "ate", "an", "apple", "."];
    output = RiTa.tokenize(input);
    expect(output).eql(expected);

    input = "why? Me?huh?!";
    expected = ["why", "?", "Me", "?", "huh", "?", "!"];
    output = RiTa.tokenize(input);
    expect(output).eql(expected);

    input = "123 123 1 2 3 1,1 1.1 23.45.67 22/05/2012 12th May,2012";
    expected = ["123", "123", "1", "2", "3", "1", ",", "1", "1", ".", "1", "23", ".", "45", ".", "67", "22/05/2012", "12th", "May", ",", "2012"];
    output = RiTa.tokenize(input);
    expect(output).eql(expected);

    input = 'The boy screamed, "Where is my apple?"';
    expected = ["The", "boy", "screamed", ",", "\"", "Where", "is", "my", "apple", "?", "\""];
    output = RiTa.tokenize(input);
    expect(output).eql(expected);

    input = 'The boy screamed, \u201CWhere is my apple?\u201D';
    expected = ["The", "boy", "screamed", ",", "\u201C", "Where", "is", "my", "apple", "?", "\u201D"];
    output = RiTa.tokenize(input);
    expect(output).eql(expected);

    input = "The boy screamed, 'Where is my apple?'";
    expected = ["The", "boy", "screamed", ",", "'", "Where", "is", "my", "apple", "?", "'"];
    output = RiTa.tokenize(input);
    expect(output).eql(expected);

    input = "The boy screamed, \u2018Where is my apple?\u2019";
    expected = ["The", "boy", "screamed", ",", "\u2018", "Where", "is", "my", "apple", "?", "\u2019"];
    output = RiTa.tokenize(input);
    expect(output).eql(expected);

    input = "dog, e.g. the cat.";
    expected = ["dog", ",", "e.g.", "the", "cat", "."];
    output = RiTa.tokenize(input);
    expect(output).eql(expected);

    input = "dog, i.e. the cat.";
    expected = ["dog", ",", "i.e.", "the", "cat", "."];
    output = RiTa.tokenize(input);
    expect(output).eql(expected);

    input = "What does e.g. mean? E.g. is used to introduce a few examples, not a complete list.";
    expected = ["What", "does", "e.g.", "mean", "?", "E.g.", "is", "used", "to", "introduce", "a", "few", "examples", ",", "not", "a", "complete", "list", "."];
    output = RiTa.tokenize(input);
    expect(output).eql(expected);

    input = "What does i.e. mean? I.e. means in other words.";
    expected = ["What", "does", "i.e.", "mean", "?", "I.e.", "means", "in", "other", "words", "."];
    output = RiTa.tokenize(input);
    expect(output).eql(expected);

    input = "it cost $30";
    expected = ["it", "cost", "$", "30"];
    output = RiTa.tokenize(input);
    expect(output).eql(expected);

    input = "calculate 2^3";
    expected = ["calculate", "2", "^", "3"];
    output = RiTa.tokenize(input);
    expect(output).eql(expected);

    input = "30% of the students";
    expected = ["30", "%", "of", "the", "students"];
    output = RiTa.tokenize(input);
    expect(output).eql(expected);

    input = "it's 30°C outside";
    expected = ["it", "is", "30", "°", "C", "outside"];
    RiTa.SPLIT_CONTRACTIONS = true;
    output = RiTa.tokenize(input);
    RiTa.SPLIT_CONTRACTIONS = false;
    expect(output).eql(expected);

    // reference :PENN treebank tokenization document :ftp://ftp.cis.upenn.edu/pub/treebank/public_html/tokenization.html
    //            and aslo English punctuation Wiki page Latin abbreviations Wiki page
    let inputs = ["A simple sentence.",
    "that's why this is our place).",
    "most, punctuation; is. split: from! adjoining words?",
    "double quotes \"OK\"", //Treebank tokenization document says double quotes (") are changed to doubled single forward- and backward- quotes (`` and '') tho
    "face-to-face class",
    '"it is strange", said John, "Katherine does not drink alchol."',
    '"What?!", John yelled.',
    "more abbreviations: a.m. p.m. Cap. c. et al. etc. P.S. Ph.D R.I.P vs. v. Mr. Ms. Dr. Pf. Mx. Ind. Inc. Corp. Co.,Ltd. Co., Ltd. Co. Ltd. Ltd.",
    "elipsis dots... another elipsis dots…",
    "(testing) [brackets] {all} ⟨kinds⟩",
    //tests below this line don't pass
    "John's Katherine's Jack's Linda's students' people's",
    "double quotes \"not OK\"",
    "children's parents' won't gonna I'm"
    ];
    let outputs = [
      ["A", "simple", "sentence", "."],
      ["that's", "why", "this", "is", "our", "place", ")", "."],
      ["most",",","punctuation",";","is",'.','split',':',"from","!","adjoining","words","?"],
      ["double","quotes","\"","OK","\""],
      ["face-to-face","class"],
      ["\"","it","is","strange","\"",",","said","John",",","\"","Katherine","does","not","drink","alchol",".","\""],
      ["\"","What","?","!","\"",",","John","yelled","."],
      ["more","abbreviations",":","a.m.","p.m.","Cap.","c.","et al.","etc.","P.S.","Ph.D","R.I.P","vs.","v.","Mr.","Ms.","Dr.","Pf.","Mx.","Ind.","Inc.","Corp.","Co.,Ltd.","Co., Ltd.","Co. Ltd.","Ltd."],
      ["elipsis","dots","...","another","elipsis","dots","…"],
      ["(","testing",")","[","brackets","]","{","all","}","⟨","kinds","⟩"],//this might not need to be fix coz ⟨⟩ is rarely seen
      //test below this line don't pass
      ["John","'s","katherine","'s","Jack","'s","Linda","'s","students","'","people","'s"],
      ["double","quotes","``","not","OK","''"],
      ["children","'s","parents","'","wo","n't","gon","na","I","'m"]
    ];

    expect(inputs.length).eq(outputs.length);
    for (let i = 0; i < inputs.length; i++) {
      expect(RiTa.tokenize(inputs[i])).eql(outputs[i]);
    }

    // contractions -------------------------

    let txt1 = "Dr. Chan is talking slowly with Mr. Cheng, and they're friends."; // strange but same as RiTa-java
    let txt2 = "He can't didn't couldn't shouldn't wouldn't eat.";
    let txt3 = "Shouldn't he eat?";
    let txt4 = "It's not that I can't.";
    let txt5 = "We've found the cat.";
    let txt6 = "We didn't find the cat.";

    RiTa.SPLIT_CONTRACTIONS = true;
    expect(RiTa.tokenize(txt1)).eql(["Dr.", "Chan", "is", "talking", "slowly", "with", "Mr.", "Cheng", ",", "and", "they", "are", "friends", "."]);
    expect(RiTa.tokenize(txt2)).eql(["He", "can", "not", "did", "not", "could", "not", "should", "not", "would", "not", "eat", "."]);
    expect(RiTa.tokenize(txt3)).eql(["Should", "not", "he", "eat", "?"]);
    expect(RiTa.tokenize(txt4)).eql(["It", "is", "not", "that", "I", "can", "not", "."]);
    expect(RiTa.tokenize(txt5)).eql(["We", "have", "found", "the", "cat", "."]);
    expect(RiTa.tokenize(txt6)).eql(["We", "did", "not", "find", "the", "cat", "."]);

    RiTa.SPLIT_CONTRACTIONS = false;
    expect(RiTa.tokenize(txt1)).eql(["Dr.", "Chan", "is", "talking", "slowly", "with", "Mr.", "Cheng", ",", "and", "they're", "friends", "."]);
    expect(RiTa.tokenize(txt2)).eql(["He", "can't", "didn't", "couldn't", "shouldn't", "wouldn't", "eat", "."]);
    expect(RiTa.tokenize(txt3)).eql(["Shouldn't", "he", "eat", "?"]);
    expect(RiTa.tokenize(txt4)).eql(["It's", "not", "that", "I", "can't", "."]);
    expect(RiTa.tokenize(txt5)).eql(["We've", "found", "the", "cat", "."]);
    expect(RiTa.tokenize(txt6)).eql(["We", "didn't", "find", "the", "cat", "."]);
  });

  it('Should correctly call untokenize', () => {

    let input, output, expected;

    expect(RiTa.untokenize([""])).eq("");

    expected = "We should consider the students' learning";
    input = ["We", "should", "consider", "the", "students", "'", "learning"];
    output = RiTa.untokenize(input);
    expect(output).eq(expected);

    expected = "The boy, dressed in red, ate an apple.";
    input = ["The", "boy", ",", "dressed", "in", "red", ",", "ate", "an", "apple", "."];
    output = RiTa.untokenize(input);
    expect(output).eq(expected);

    expected = "We should consider the students\u2019 learning";
    input = ["We", "should", "consider", "the", "students", "\u2019", "learning"];
    output = RiTa.untokenize(input);
    expect(output).eq(expected);

    expected = "The boy screamed, 'Where is my apple?'";
    input = ["The", "boy", "screamed", ",", "'", "Where", "is", "my", "apple", "?", "'"];
    output = RiTa.untokenize(input);
    expect(output).eq(expected);

    expected = "Dr. Chan is talking slowly with Mr. Cheng, and they're friends."; // strange but same as RiTa-java
    input = ["Dr", ".", "Chan", "is", "talking", "slowly", "with", "Mr", ".", "Cheng", ",", "and", "they're", "friends", "."];
    output = RiTa.untokenize(input);
    expect(output).eq(expected);

    input = ["why", "?", "Me", "?", "huh", "?", "!"];
    expected = "why? Me? huh?!";
    output = RiTa.untokenize(input);
    expect(output).eq(expected);

    input = ["123", "123", "1", "2", "3", "1", ",", "1", "1", ".", "1", "23", ".", "45", ".", "67", "22/05/2012", "12th", "May", ",", "2012"];
    expected = "123 123 1 2 3 1, 1 1. 1 23. 45. 67 22/05/2012 12th May, 2012";
    output = RiTa.untokenize(input);
    expect(output).eq(expected);

    input = ['"', 'Oh', 'God', ',', '"', 'he', 'thought', '.'];
    expected = '"Oh God," he thought.';
    output = RiTa.untokenize(input);
    //console.log(expected,'\n',output);
    expect(output).eq(expected);

    expected = "The boy screamed, 'Where is my apple?'";
    input = ["The", "boy", "screamed", ",", "'", "Where", "is", "my", "apple", "?", "'"];
    output = RiTa.untokenize(input);
    expect(output).eq(expected);

    input = ['She', 'screamed', ',', '"', 'Oh', 'God', '!', '"'];
    expected = 'She screamed, "Oh God!"';
    output = RiTa.untokenize(input);
    expect(output).eq(expected);

    input = ['She', 'screamed', ':', '"', 'Oh', 'God', '!', '"'];
    expected = 'She screamed: "Oh God!"';
    output = RiTa.untokenize(input);
    expect(output).eq(expected);

    input = ["\"", "Oh", ",", "God", "\"", ",", "he", "thought", ",", "\"", "not", "rain", "!", "\""];
    expected = "\"Oh, God\", he thought, \"not rain!\"";
    output = RiTa.untokenize(input);
    expect(output).eq(expected);

    expected = "The student said 'learning is fun'";
    input = ["The", "student", "said", "'", "learning", "is", "fun", "'"];
    output = RiTa.untokenize(input);
    expect(output).eq(expected);

    expected = "dog, e.g. the cat.";
    input = ["dog", ",", "e.g.", "the", "cat", "."];
    output = RiTa.untokenize(input);
    expect(output).eq(expected);

    expected = "dog, i.e. the cat.";
    input = ["dog", ",", "i.e.", "the", "cat", "."];
    output = RiTa.untokenize(input);
    expect(output).eq(expected);

    expected = "What does e.g. mean? E.g. is used to introduce a few examples, not a complete list.";
    input = ["What", "does", "e.g.", "mean", "?", "E.g.", "is", "used", "to", "introduce", "a", "few", "examples", ",", "not", "a", "complete", "list", "."];
    output = RiTa.untokenize(input);
    expect(output).eq(expected);

    expected = "What does i.e. mean? I.e. means in other words.";
    input = ["What", "does", "i.e.", "mean", "?", "I.e.", "means", "in", "other", "words", "."];
    output = RiTa.untokenize(input);
    expect(output).eq(expected);

    // refere to english punctuation marks list on Wiki

    let outputs = ["A simple sentence.",
      "that's why this is our place).",
      "this is for semicolon; that is for else",
      "this is for 2^3 2*3",
      "this is for $30 and #30",
      "this is for 30°C or 30\u2103",
      "this is for a/b a⁄b",
      "this is for «guillemets»",
      "this... is… for ellipsis",
      "this line is 'for' single ‘quotation’ mark",
      "Katherine’s cat and John's cat",
      "this line is for (all) [kind] {of} ⟨brackets⟩ done",
      "this line is for the-dash",
      "30% of the student love day-dreaming.",
      '"that test line"',
      "my email address is name@domin.com",
      "it is www.google.com",
      "that is www6.cityu.edu.hk"
    ];

    let inputs = [
      ["A", "simple", "sentence", "."],
      ["that's", "why", "this", "is", "our", "place", ")", "."],
      ["this", "is", "for", "semicolon", ";", "that", "is", "for", "else"],
      ["this", "is", "for", "2", "^", "3", "2", "*", "3"],
      ["this", "is", "for", "$", "30", "and", "#", "30"],
      ["this", "is", "for", "30", "°", "C", "or", "30", "\u2103"],
      ["this", "is", "for", "a", "/", "b", "a", "⁄", "b"],
      ["this", "is", "for", "«", "guillemets", "»"],
      ["this", "...", "is", "…", "for", "ellipsis"],
      ["this", "line", "is", "'", "for", "'", "single", "‘", "quotation", "’", "mark"],
      ["Katherine", "’", "s", "cat", "and", "John", "'", "s", "cat"],
      ["this", "line", "is", "for", "(", "all", ")", "[", "kind", "]", "{", "of", "}", "⟨", "brackets", "⟩", "done"],
      ["this", "line", "is", "for", "the", "-", "dash"],
      ["30", "%", "of", "the", "student", "love", "day", "-", "dreaming", "."],
      ['"', "that", "test", "line", '"'],
      ["my", "email", "address", "is", "name", "@", "domin", ".", "com"],
      ["it", "is", "www", ".", "google", ".", "com"],
      ["that", "is", "www6", ".", "cityu", ".", "edu", ".", "hk"]
    ];

    expect(inputs.length).eq(outputs.length);
    for (let i = 0; i < inputs.length; i++) {
      expect(RiTa.untokenize(inputs[i])).eq(outputs[i]);
    }
  });

  it('Should correctly call concordance', () => {

    let data = RiTa.concordance("The dog ate the cat"); //default
    expect(Object.keys(data).length).eq(5);
    expect(data["the"]).eq(1);
    expect(data["The"]).eq(1);
    expect(data["THE"]).eq(undefined);

    data = RiTa.concordance("The dog ate the cat", {
      ignoreCase: false,
      ignoreStopWords: false,
      ignorePunctuation: false,
    });

    expect(Object.keys(data).length).eq(5);
    expect(data["the"]).eq(1);
    expect(data["The"]).eq(1);
    expect(data["THE"]).eq(undefined); // same result

    data = RiTa.concordance("The dog ate the cat", {
      ignoreCase: true
    });
    expect(Object.keys(data).length).eq(4);
    expect(data["the"]).eq(2);
    expect(data["The"]).eq(undefined);
    expect(data["THE"]).eq(undefined);

    data = RiTa.concordance("The Dog ate the cat.", {
      ignoreCase: true,
      ignoreStopWords: true,
      ignorePunctuation: true,
    });

    expect(Object.keys(data).length).eq(3);
    expect(data["dog"]).eq(1);
    expect(data["the"]).eq(undefined);
    expect(data["THE"]).eq(undefined);

    // opts should be back to default
    data = RiTa.concordance("The dog ate the cat");
    expect(Object.keys(data).length).eq(5);
    expect(data["the"]).eq(1);
    expect(data["The"]).eq(1);
    expect(data["THE"]).eq(undefined);

    data = RiTa.concordance("'What a wonderful world;!:,?.'\"", {
      ignorePunctuation: true
    });
    expect(Object.keys(data).length).eq(4);
    expect(data["!"]).eq(undefined);


    data = RiTa.concordance("The dog ate the cat", {
      ignoreStopWords: true
    });

    expect(Object.keys(data).length).eq(3);
    expect(data["The"]).eq(undefined);

    data = RiTa.concordance("It was a dream of you.", { // 'dream', '.'
      ignoreStopWords: true
    });
    expect(Object.keys(data).length).eq(2);
    expect(data["It"]).eq(undefined);
    expect(data["dream"]).eq(1);
    expect(data["."]).eq(1);

    data = RiTa.concordance("Fresh fried fish, Fish fresh fried.", {
      wordsToIgnore: ["fish"],
      ignoreCase: true,
      ignorePunctuation: true
    });
    expect(Object.keys(data).length).eq(2);
    expect(data["fish"]).eq(undefined);
    expect(data["fresh"]).eq(2);
    expect(data["fried"]).eq(2);
  });

  it('Should correctly call sentences', () => {

    let input, expected, output;

    eql(RiTa.sentences(''), ['']);

    input = "Stealth's Open Frame, OEM style LCD monitors are designed for special mounting applications. The slim profile packaging provides an excellent solution for building into kiosks, consoles, machines and control panels. If you cannot find an off the shelf solution call us today about designing a custom solution to fit your exact needs.";
    expected = ["Stealth's Open Frame, OEM style LCD monitors are designed for special mounting applications.", "The slim profile packaging provides an excellent solution for building into kiosks, consoles, machines and control panels.", "If you cannot find an off the shelf solution call us today about designing a custom solution to fit your exact needs."];
    output = RiTa.sentences(input);
    eql(output, expected);

    input = "\"The boy went fishing.\", he said. Then he went away.";
    expected = ["\"The boy went fishing.\", he said.", "Then he went away."];
    output = RiTa.sentences(input);
    eql(output, expected);

    input = "The dog";
    output = RiTa.sentences(input);
    eql(output, [input]);

    input = "I guess the dog ate the baby.";
    output = RiTa.sentences(input);
    eql(output, [input]);

    input = "Oh my god, the dog ate the baby!";
    output = RiTa.sentences(input);
    expected = ["Oh my god, the dog ate the baby!"];
    eql(output, expected);

    input = "Which dog ate the baby?"
    output = RiTa.sentences(input);
    expected = ["Which dog ate the baby?"];
    eql(output, expected);

    input = "'Yes, it was a dog that ate the baby', he said."
    output = RiTa.sentences(input);
    expected = ["\'Yes, it was a dog that ate the baby\', he said."];
    eql(output, expected);

    input = "The baby belonged to Mr. and Mrs. Stevens. They will be very sad.";
    output = RiTa.sentences(input);
    expected = ["The baby belonged to Mr. and Mrs. Stevens.", "They will be very sad."];
    eql(output, expected);

    // More quotation marks
    input = "\"The baby belonged to Mr. and Mrs. Stevens. They will be very sad.\"";
    output = RiTa.sentences(input);
    expected = ["\"The baby belonged to Mr. and Mrs. Stevens.", "They will be very sad.\""];
    eql(output, expected);

    input = "\u201CThe baby belonged to Mr. and Mrs. Stevens. They will be very sad.\u201D";
    output = RiTa.sentences(input);
    expected = ["\u201CThe baby belonged to Mr. and Mrs. Stevens.", "They will be very sad.\u201D"];
    eql(output, expected);

    //https://github.com/dhowe/RiTa/issues/498
    input = "\"My dear Mr. Bennet. Netherfield Park is let at last.\"";
    output = RiTa.sentences(input);
    expected = ["\"My dear Mr. Bennet.", "Netherfield Park is let at last.\""];
    eql(output, expected);

    input = "\u201CMy dear Mr. Bennet. Netherfield Park is let at last.\u201D";
    output = RiTa.sentences(input);
    expected = ["\u201CMy dear Mr. Bennet.", "Netherfield Park is let at last.\u201D"];
    eql(output, expected);
    /*******************************************/

    input = "She wrote: \"I don't paint anymore. For a while I thought it was just a phase that I'd get over.\"";
    output = RiTa.sentences(input);
    expected = ["She wrote: \"I don't paint anymore.", "For a while I thought it was just a phase that I'd get over.\""];
    eql(output, expected);

    input = " I had a visit from my \"friend\" the tax man.";
    output = RiTa.sentences(input);
    expected = ["I had a visit from my \"friend\" the tax man."];
    eql(output, expected);
  });

  function ok(a, m) { expect(a, m).to.be.true; }
  function def(res, m) { expect(res, m).to.not.be.undefined; }
  function eql(a, b, m) { expect(a).eql(b, m); }
  function eq(a, b, m) { expect(a).eq(b, m); }
});
