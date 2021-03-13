import { RiTa, expect } from './before';

describe('RiTa.Tokenizer', () => {

  it ('Should handle tokenize then untokenize', () =>{
    let sentences = [
      "this is www.google.com",
      "it is 'hell'"
    ];
    let tokens = [
      ["this", "is", "www", ".", "google", ".", "com"],
      ["it", "is", "'", "hell", "'"]
    ];
    for (let i = 0; i < sentences.length; i++){
      let usingTokenize = RiTa.tokenize(sentences[i]);
      expect(usingTokenize).eql(tokens[i]);
      let usingUntokenize = RiTa.untokenize(usingTokenize);
      expect(usingUntokenize).eq(sentences[i]);
    };

  });

  it('Should call tokenize', () => {

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

    // reference :PENN treebank tokenization document :ftp://ftp.cis.upenn.edu/pub/treebank/public_html/tokenization.html
    //            and aslo English punctuation Wiki page Latin abbreviations Wiki page
    let inputs = ["A simple sentence.",
    "that's why this is our place).",
    "most, punctuation; is. split: from! adjoining words?",
    "double quotes \"OK\"", //Treebank tokenization document says double quotes (") are changed to doubled single forward- and backward- quotes (`` and '') tho
    "face-to-face class",
    '"it is strange", said John, "Katherine does not drink alchol."',
    '"What?!", John yelled.',
    //tests below this line don't pass
    "John's Katherine's Jack's Linda's students' people's",
    "more abbreviations: a.m. p.m. Cap. c. et al. etc. P.S. Ph.D R.I.P vs. v. Mr. Ms. Dr. Pf. Mx. Ind. Inc. Corp. Co,.Ltd. Co,. Ltd. Co. Lid. Ltd.",
    "(testing) [brackets] {all} ⟨kinds⟩",
    "elipsis dots... another elipsis dots…",
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
      //test below this line don't pass
      ["John","'s","katherine","'s","Jack","'s","Linda","'s","students","'","people","'s"],
      ["more","abbreviations",":","a.m.","p.m.","Cap.","c.","et al.","etc.","P.S.","Ph.D","R.I.P","vs.","v.","Mr.","Ms.","Dr.","Pf.","Mx.","Ind.","Inc.","Corp.","Co.,Ltd","Co., Ltd","Co. Ltd.","Ltd."],
      ["(","testing",")","[","brackets","]","{","all","}","⟨","kinds","⟩"],//this might not need to be fix coz ⟨⟩ is rarely seen
      ["elipsis","dots","...","another","elipsis","dots","…"],
      ["children","'s","parents","'","wo","n't","gon","na","I","'m"]
    ];

    // contractions -------------------------

    let txt1 = "Dr. Chan is talking slowly with Mr. Cheng, and they're friends."; // strange but same as RiTa-java
    let txt2 = "He can't didn't couldn't shouldn't wouldn't eat.";
    let txt3 = "Wouldn't he eat?";
    let txt4 = "It's not that I can't.";
    let txt5 = "We've found the cat.";
    let txt6 = "We didn't find the cat.";

    RiTa.SPLIT_CONTRACTIONS = true;
    expect(RiTa.tokenize(txt1)).eql(["Dr.", "Chan", "is", "talking", "slowly", "with", "Mr.", "Cheng", ",", "and", "they", "are", "friends", "."]);
    expect(RiTa.tokenize(txt2)).eql(["He", "can", "not", "did", "not", "could", "not", "should", "not", "would", "not", "eat", "."]);
    expect(RiTa.tokenize(txt3)).eql(["Would", "not", "he", "eat", "?"]);
    expect(RiTa.tokenize(txt4)).eql(["It", "is", "not", "that", "I", "can", "not", "."]);
    expect(RiTa.tokenize(txt5)).eql(["We", "have", "found", "the", "cat", "."]);
    expect(RiTa.tokenize(txt6)).eql(["We", "did", "not", "find", "the", "cat", "."]);

    RiTa.SPLIT_CONTRACTIONS = false;
    expect(RiTa.tokenize(txt1)).eql(["Dr.", "Chan", "is", "talking", "slowly", "with", "Mr.", "Cheng", ",", "and", "they're", "friends", "."]);
    expect(RiTa.tokenize(txt2)).eql(["He", "can't", "didn't", "couldn't", "shouldn't", "wouldn't", "eat", "."]);
    expect(RiTa.tokenize(txt3)).eql(["Wouldn't", "he", "eat", "?"]);
    expect(RiTa.tokenize(txt4)).eql(["It's", "not", "that", "I", "can't", "."]);
    expect(RiTa.tokenize(txt5)).eql(["We've", "found", "the", "cat", "."]);
    expect(RiTa.tokenize(txt6)).eql(["We", "didn't", "find", "the", "cat", "."]);

    // html tags (rita#103)
    inputs = [
      "<!DOCTYPE html>",
      "<a>link</a>",
      "<span>inline</span>",
      "<h1>header</h1>",
      "<!-- this is a comment -->", //? should this be divided? 
      "<a href=\"www.google.com\">a link to google</a>",
      "<p>this<br>is</br>a<br>paragraph<br/></p>",
      "<p>Link <a herf=\"https://hk.search.yahoo.com/search?p=cute+cat\">here</a> is about <span class=\"cat\">cute cat</span></p><img src=\"cutecat.com/catpic001.jpg\" width=\"600\" />"
    ];

    outputs = [
      ["<!DOCTYPE html>"],
      ["<a>", "link", "</a>"],
      ["<span>", "inline", "</span>"],
      ["<h1>", "header", "</h1>"],
      ["<!-- this is a comment -->"],
      ["<a href=\"www.google.com\">", "a", "link", "to", "google", "</a>"],
      ["<p>", "this", "<br>", "is", "</br>", "a", "<br>", "paragraph", "<br/>", "</p>"],
      ["<p>", "Link", "<a herf=\"https://hk.search.yahoo.com/search?p=cute+cat\">", "here", "</a>", "is", "about", "<span class=\"cat\">", "cute", "cat", "</span>", "</p>", "<img src=\"cutecat.com/catpic001.jpg\" width=\"600\" />"]
    ];
    expect(inputs.length).eq(outputs.length);
    for (let i = 0; i < inputs.length; i++) {
      expect(RiTa.tokenize(inputs[i])).eql(outputs[i]);
    }
  });

  it('Should call untokenize', () => {

    expect(RiTa.untokenize([""])).eq("");

    let input, output, expected;

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

    // more tests

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

  it('Should call sentences', () => {

    var input = "Stealth's Open Frame, OEM style LCD monitors are designed for special mounting applications. The slim profile packaging provides an excellent solution for building into kiosks, consoles, machines and control panels. If you cannot find an off the shelf solution call us today about designing a custom solution to fit your exact needs.";
    var expected = ["Stealth's Open Frame, OEM style LCD monitors are designed for special mounting applications.", "The slim profile packaging provides an excellent solution for building into kiosks, consoles, machines and control panels.", "If you cannot find an off the shelf solution call us today about designing a custom solution to fit your exact needs."];
    var output = RiTa.sentences(input);
    eql(output, expected);

    var input = "Stealth's Open Frame, OEM style LCD monitors are designed for special mounting applications.\n\nThe slim profile packaging provides an excellent solution for building into kiosks, consoles, machines and control panels.\r\n If you cannot find an off the shelf solution call us today about designing a custom solution to fit your exact needs.";
    var expected = ["Stealth's Open Frame, OEM style LCD monitors are designed for special mounting applications.", "The slim profile packaging provides an excellent solution for building into kiosks, consoles, machines and control panels.", "If you cannot find an off the shelf solution call us today about designing a custom solution to fit your exact needs."];
    var output = RiTa.sentences(input);
    eql(output, expected);

    var input = "\"The boy went fishing.\", he said. Then he went away.";
    var expected = ["\"The boy went fishing.\", he said.", "Then he went away."];
    var output = RiTa.sentences(input);
    eql(output, expected);

    var input = "The dog";
    var output = RiTa.sentences(input);
    eql(output, [input]);

    var input = "I guess the dog ate the baby.";
    var output = RiTa.sentences(input);
    eql(output, [input]);

    var input = "Oh my god, the dog ate the baby!";
    var output = RiTa.sentences(input);
    var expected = ["Oh my god, the dog ate the baby!"];
    eql(output, expected);

    var input = "Which dog ate the baby?"
    var output = RiTa.sentences(input);
    var expected = ["Which dog ate the baby?"];
    eql(output, expected);

    var input = "'Yes, it was a dog that ate the baby', he said."
    var output = RiTa.sentences(input);
    var expected = ["\'Yes, it was a dog that ate the baby\', he said."];
    eql(output, expected);

    var input = "The baby belonged to Mr. and Mrs. Stevens. They will be very sad.";
    var output = RiTa.sentences(input);
    var expected = ["The baby belonged to Mr. and Mrs. Stevens.", "They will be very sad."];
    eql(output, expected);

    // More quotation marks
    var input = "\"The baby belonged to Mr. and Mrs. Stevens. They will be very sad.\"";
    var output = RiTa.sentences(input);
    var expected = ["\"The baby belonged to Mr. and Mrs. Stevens.", "They will be very sad.\""];
    eql(output, expected);

    var input = "\u201CThe baby belonged to Mr. and Mrs. Stevens. They will be very sad.\u201D";
    var output = RiTa.sentences(input);
    var expected = ["\u201CThe baby belonged to Mr. and Mrs. Stevens.", "They will be very sad.\u201D"];
    eql(output, expected);

    //https://github.com/dhowe/RiTa/issues/498
    var input = "\"My dear Mr. Bennet. Netherfield Park is let at last.\"";
    var output = RiTa.sentences(input);
    var expected = ["\"My dear Mr. Bennet.", "Netherfield Park is let at last.\""];
    eql(output, expected);

    var input = "\u201CMy dear Mr. Bennet. Netherfield Park is let at last.\u201D";
    var output = RiTa.sentences(input);
    var expected = ["\u201CMy dear Mr. Bennet.", "Netherfield Park is let at last.\u201D"];
    eql(output, expected);
    /*******************************************/

    var input = "She wrote: \"I don't paint anymore. For a while I thought it was just a phase that I'd get over.\"";
    var output = RiTa.sentences(input);
    var expected = ["She wrote: \"I don't paint anymore.", "For a while I thought it was just a phase that I'd get over.\""];
    eql(output, expected);

    var input = " I had a visit from my \"friend\" the tax man.";
    var output = RiTa.sentences(input);
    var expected = ["I had a visit from my \"friend\" the tax man."];
    eql(output, expected);

    eql(RiTa.sentences(""), [""]);
  });

  function eql(a, b, m) { expect(a).eql(b, m); }
  function eq(a, b, m) { expect(a).eq(b, m); }
  function ok(a, m) { expect(a, m).to.be.true; }
  function def(res, m) { expect(res, m).to.not.be.undefined; }
});
