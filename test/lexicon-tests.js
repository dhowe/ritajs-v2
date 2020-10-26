describe('RiTa.Lexicon', function () {

  this.timeout(5000);

  if (typeof module !== 'undefined') require('./before');
  
  const lex = RiTa.lexicon(); // first load

  it('Should correctly call hasWord', () => {
    expect(RiTa.hasWord("random")).to.be.true;
  });

  it('Should correctly call randomWord', () => {

    expect(() => RiTa.randomWord({ pos: "xxx" })).to.throw;

    let result;
    result = RiTa.randomWord();
    expect(result.length > 0, "randomWord: " + result).to.be.true;

    result = RiTa.randomWord({ pos: "nn" });
    expect(result.length > 0, "randomWord nn: " + result).to.be.true;

    result = RiTa.randomWord({ pos: "nns" });
    expect(result.length > 0, "randomWord nns=" + result).to.be.true;

    result = RiTa.randomWord({ pos: "n" });
    expect(result.length > 0, "randomWord n=" + result).to.be.true;

    result = RiTa.randomWord({ pos: "v" });
    expect(result.length > 0, "randomWord v=" + result).to.be.true;

    result = RiTa.randomWord({ numSyllables: 3 });
    expect(result.length > 0, "3 syllables: " + result).to.be.true;

    result = RiTa.randomWord({ numSyllables: 5 });
    expect(result.length > 0, "5 syllables: " + result).to.be.true;

    result = RiTa.randomWord({ pos: "v" });
    expect(result.length > 0, "randomWord v=" + result).to.be.true;

  });

  it("should handle an augmented lexicon", () => {
    let toAdd = {
      'deg': ['d-eh1-g', 'nn'],
      'wadly': ['w-ae1-d l-iy', 'rb'],
    }
    let lex = RiTa.lexicon();
    Object.keys(toAdd).forEach(w => RiTa.lexicon().data[w] = toAdd[w]);
    expect(lex.hasWord("run"));
    expect(lex.hasWord("walk"));
    expect(lex.hasWord("deg"));
    expect(lex.hasWord("wadly"));
    expect(lex.isAlliteration("wadly", "welcome"));
    Object.keys(toAdd).forEach(w => delete RiTa.lexicon().data[w]);
  });

  it("should handle a custom lexicon", () => {

    let lex = RiTa.lexicon();
    let orig = lex.data;
    lex.data = {
      'dog': ['d-ao1-g', 'nn'],
      'cat': ['k-ae1-t', 'nn'],
      'happily': ['hh-ae1 p-ah l-iy', 'rb'],
      'walk': ['w-ao1-k', 'vb vbp nn'],
      'welcome': ['w-eh1-l k-ah-m', 'jj nn vb vbp'],
      'sadly': ['s-ae1-d l-iy', 'rb'],
    }

    expect(lex.hasWord("run")).to.be.false;
    expect(lex.hasWord("walk")).to.be.true;
    expect(lex.isAlliteration("walk", "welcome")).to.be.true;
    lex.data = orig;
  });

  it('Should correctly call randomWord.nns', () => {
    for (let i = 0; i < 5; i++) {
      let result = RiTa.randomWord({ pos: "nns" });
      if (!RiTa.inflector.isPlural(result)) {
        // For now, just warn here as there are too many edge cases (see #521)
        console.warn("Pluralize/Singularize problem: randomWord(nns) was '" + result + "' (" +
          "isPlural=" + RiTa.inflector.isPlural(result) + "), singularized is '" + RiTa.singularize(result) + "'");
      }
      // TODO: occasional problem here, examples: beaux

      //No nn & vbg, No -ness, -ism
      let pos = RiTa.lexicon()._posData(result);
      expect(!pos || pos.indexOf("vbg") < 0, "randomWord nns: " + result).to.be.true;
      expect(!result.endsWith("ness"), "randomWord nns: " + result).to.be.true;
      expect(!result.endsWith("isms"), "randomWord nns: " + result).to.be.true;
    }
  });

  it('Should correctly call randomWord.pos', () => {

    let pos = ["nn", "jj", "jjr", "wp"];
    for (let j = 0; j < pos.length; j++) {
      let result = RiTa.randomWord({ pos: pos[j] });
      let best = RiTa.lexicon()._bestPos(result);
      //console.log(result+": "+pos[j]+" ?= "+best);
      expect(pos[j]).eq(best, result);
    }
  });

  it('Should correctly call randomWord.syls', () => {
    let i, result, syllables, num;
    result = RiTa.randomWord({ numSyllables: 3 });
    syllables = RiTa.syllables(result);
    num = syllables.split(RiTa.SYLLABLE_BOUNDARY).length;
    expect(result.length > 0, 'failed1 on: ' + result).to.be.true;
    expect(num === 3, result + ": " + syllables).to.be.true; // "3 syllables: "

    result = RiTa.randomWord({ numSyllables: 5 });
    syllables = RiTa.syllables(result);
    num = syllables.split(RiTa.SYLLABLE_BOUNDARY).length;
    expect(result.length).gt(0, 'failed2 on ' + result);
    expect(num === 5, result + ": " + syllables).to.be.true; // "5 syllables: "
  });

  it('Should correctly call search without opts', () => {
    expect(RiTa.search().length > 20000, "fail").to.be.true;
  });

  it('Should correctly call search with letters', () => {
    expect(RiTa.search("phant")).eql([
      'elephant',
      'elephantine',
      'phantom',
      'sycophantic',
      'triumphant',
      'triumphantly'
    ]);
    expect(RiTa.search(/phant/)).eql([
      'elephant',
      'elephantine',
      'phantom',
      'sycophantic',
      'triumphant',
      'triumphantly'
    ]);
  });

  it('Should correctly call search with phones, limit', () => {
    // omitting no limit tests as they are a bit slow
    expect(RiTa.search(/f-a[eh]-n-t/, { type: 'phones', limit: 10 })).eql([
      "elephant",
      "elephantine",
      "fantasia",
      "fantasize",
      "fantastic",
      "fantastically",
      "fantasy",
      "infant",
      "infantile",
      "infantry",/*
      "infantryman",
      "oftentimes",
      "phantom",
      "sycophantic",
      "triumphant",
      "triumphantly" */
    ]);

    expect(RiTa.search('f-ah-n-t', { type: 'phones', limit: 5 })).eql([
      'elephant',
      'infant',
      'infantile',
      'infantry',
      "oftentimes"
      /*, 'triumphant',
      'triumphantly'*/
    ]);
  });

  it('Should correctly call search with pos, limit', () => {

    //console.log(RiTa.search('010', { type: 'stresses', limit: 5, pos: 'n' }));

    expect(RiTa.search('010', { type: 'stresses', limit: 5, pos: 'n' }))
      .eql(['abalone', 'abandonment', 'abatement', 'abbreviation', 'abdomen']);

    expect(RiTa.search('010', { type: 'stresses', limit: 5, pos: 'n', numSyllables: 3 }))
      .eql(['abatement', 'abdomen', "abduction", "abeyance", "abortion"]);

    expect(RiTa.search('f-ah-n-t', { type: 'phones', pos: 'n', limit: 3 }))
      .eql(['elephant', 'infant', 'infantry']);

    expect(RiTa.search('f-ah-n-t', { type: 'phones', pos: 'n', limit: 3, numSyllables: 2 }))
      .eql(['infant']);

    expect(RiTa.search(/f-a[eh]-n-t/, { type: 'phones', pos: 'v', limit: 5 }))
      .eql(["fantasize"]);

    expect(RiTa.search('010', { type: 'stresses', limit: 5, pos: 'nns' }))
      .eql(['abandonments', 'abatements', 'abbreviations', 'abdomens', "abductions"]);

    expect(RiTa.search('010', { type: 'stresses', limit: 5, pos: 'nns', numSyllables: 3 }))
      .eql(['abatements', 'abdomens', "abductions", "abeyances", "abortions" ]);

    expect(RiTa.search('f-ah-n-t', { type: 'phones', pos: 'nns', limit: 3 }))
      .eql(['elephants', 'infants', 'infantries']);

    expect(RiTa.search(/f-a[eh]-n-t/, { type: 'phones', pos: 'vb', limit: 5 }))
      .eql(["fantasize"]);
  });


  /* omitting no limit tests as they are a bit slow
  it('Should correctly call search with stresses', () => {
    expect(RiTa.search('0/1/0/0/0/0/0', { type: 'stresses' })).eql([
      "environmentalism"
    ]);
    expect(RiTa.search('0100000', { type: 'stresses' })).eql([
      "environmentalism"
    ]);
  });*/

  it('Should correctly call search with stresses, limit', () => {
    expect(RiTa.search('0/1/0/0/0/0', { type: 'stresses', limit: 5 })).eql([
      'accountability',
      'anticipatory',
      'appreciatively',
      'authoritarianism',
      'colonialism'
    ]);
    expect(RiTa.search('010000', { type: 'stresses', limit: 5 })).eql([
      'accountability',
      'anticipatory',
      'appreciatively',
      'authoritarianism',
      'colonialism'
    ]);
    expect(RiTa.search('010000', { type: 'stresses', limit: 5, maxLength: 11 })).eql([
      'colonialism',
      "imperialism",
      "materialism"
    ]);
    expect(RiTa.search('010000', { type: 'stresses', limit: 5, minLength: 12 })).eql([
      'accountability',
      'anticipatory',
      'appreciatively',
      'authoritarianism',
      "conciliatory"
    ]);
  });

  it('Should correctly call randomWord.pos.syls', () => {
    function fail(result, epos) {
      let test = result.endsWith('es') ? result.substring(-2) : result;
      let ent = RiTa.lexicon()[test];
      return ('(' + epos + ') Fail: ' + result + ': expected ' + epos + ', got ' + (ent ? ent[1] : 'null'));
    }
    let pos, result, syllables;

    result = RiTa.randomWord({ numSyllables: 3, pos: "vbz" });
    //console.log(result);
    expect(result.length > 0, "randomWord vbz: " + result).to.be.true;
    syllables = RiTa.syllables(result);
    expect(syllables.split(RiTa.SYLLABLE_BOUNDARY).length).eq(3, "GOT: " + result + ' (' + syllables + ')');
    expect(RiTa.isVerb(result)).eq(true, fail(result, 'vbz'));

    result = RiTa.randomWord({ numSyllables: 1, pos: "n" });
    expect(result.length > 0, "randomWord n: " + result).to.be.true;
    syllables = RiTa.syllables(result);
    expect(syllables.split(RiTa.SYLLABLE_BOUNDARY).length).eq(1, "GOT: " + result + ' (' + syllables + ')');
    expect(RiTa.isNoun(result)).eq(true, fail(result, 'n'));

    result = RiTa.randomWord({ numSyllables: 1, pos: "nns" });
    expect(result.length > 0, "randomWord nns: " + result).to.be.true;
    syllables = RiTa.syllables(result);
    expect(syllables.split(RiTa.SYLLABLE_BOUNDARY).length).eq(1, "GOT: " + result + ' (' + syllables + ')');
    expect(RiTa.isNoun(result)).eq(true, fail(result, 'nns'));
    // TODO: still failing occasionally on: proves, torpedoes, strives, times, etc. ?

    result = RiTa.randomWord({ numSyllables: 5, pos: "nns" });
    expect(result.length > 0, "randomWord nns: " + result).to.be.true;
    syllables = RiTa.syllables(result);
    let count = syllables.split(RiTa.SYLLABLE_BOUNDARY).length;
    if (count !== 5) console.warn("Syllabifier problem: "
      + result + ".syllables was " + count + ', expected 5');
    pos = RiTa.pos(result)[0];
    expect(RiTa.isNoun(result)).eq(true, fail(result, 'nns'));
  });

  it('Should correctly call alliterations.numSyllables', () => {
    let result = RiTa.alliterations("cat", { minLength: 1, numSyllables: 7 });
    expect(result).eql(['electrocardiogram', 'electromechanical', 'telecommunications']);
    for (let i = 0; i < result.length; i++) {
      expect(RiTa.isAlliteration(result[i], "cat"), 'FAIL2: ' + result[i]).to.be.true;
    }
  });

  it('Should correctly call alliterations.pos', () => {

    let result = RiTa.alliterations("cat", { minLength: 1, numSyllables: 7, pos: 'n' });
    expect(result).eql(['electrocardiogram', 'telecommunications']);
    for (let i = 0; i < result.length; i++) {
      expect(RiTa.isAlliteration(result[i], "cat"), 'FAIL2: ' + result[i]).to.be.true;
    }

    expect(RiTa.alliterations("dog", { minLength: 14, pos: 'v' })).eql(['disenfranchise']);

    expect(RiTa.alliterations("dog", { minLength: 13, pos: 'rb' })).eql([
      'coincidentally',
      'conditionally',
      'confidentially',
      'contradictorily',
      'devastatingly',
      'expeditiously',
      'paradoxically',
      'predominantly',
      'traditionally',
      'unconditionally',
      'unpredictably'
    ]);

    expect(RiTa.alliterations("freedom", { minLength: 14, pos: 'nns' })).eql([
      'featherbeddings',
      'fundamentalists',
      'malfunctionings',
      'pharmaceuticals',
      'photosyntheses',
      'reconfigurations',
      'sophistications'
    ]);
  });

  it('Should correctly call alliterations', () => {

    let result;

    result = RiTa.alliterations("", { silent: 1 });
    expect(result.length < 1).to.be.true;

    result = RiTa.alliterations("#$%^&*", { silent: 1 });
    expect(result.length < 1).to.be.true;

    result = RiTa.alliterations("umbrella", { silent: 1 });
    expect(result.length < 1, "failed on 'umbrella'").to.be.true;

    result = RiTa.alliterations("cat");
    expect(result.length > 1000, "failed on 'cat'").to.be.true;
    expect(result.includes("cat")).to.be.false;
    for (let i = 0; i < result.length; i++) {
      expect(RiTa.isAlliteration(result[i], "cat")).to.be.true;
    }

    result = RiTa.alliterations("dog");
    expect(result.includes("dog")).to.be.false;
    expect(result.length > 1000, "failed on 'dog'").to.be.true;
    for (let i = 0; i < result.length; i++) {
      expect(RiTa.isAlliteration(result[i], "dog")).to.be.true;
    }

    result = RiTa.alliterations("dog", { minLength: 15 });
    expect(result.length > 0 && result.length < 5, "got length=" + result.length).to.be.true;
    for (let i = 0; i < result.length; i++) {
      expect(RiTa.isAlliteration(result[i], "dog"), 'FAIL1: ' + result[i]).to.be.true;
    }

    result = RiTa.alliterations("cat", { minLength: 16 });
    expect(result.length > 0 && result.length < 15, "failed on 'cat'").to.be.true;
    for (let i = 0; i < result.length; i++) {
      expect(RiTa.isAlliteration(result[i], "cat"), 'FAIL2: ' + result[i]).to.be.true;
    }

    result = RiTa.alliterations("khatt", { minLength: 16 });
    //console.log(RiTa.alliterations("khatt", { minLength: 16 }));

    expect(result.length > 0 && result.length < 15, "failed on 'khatt'").to.be.true;
    for (let i = 0; i < result.length; i++) {
      expect(RiTa.isAlliteration(result[i], "cat"), 'FAIL2: ' + result[i]).to.be.true;
    }
  });

  it('Should correctly call rhymes', () => {

    expect(RiTa.rhymes("cat").includes("hat")).to.be.true;
    expect(RiTa.rhymes("yellow").includes("mellow")).to.be.true;
    expect(RiTa.rhymes("toy").includes("boy")).to.be.true;
    expect(RiTa.rhymes("sieve").includes("give")).to.be.true;

    expect(RiTa.rhymes("tense").includes("sense")).to.be.true;
    expect(RiTa.rhymes("crab").includes("drab")).to.be.true;
    expect(RiTa.rhymes("shore").includes("more")).to.be.true;

    expect(RiTa.rhymes("mouse").includes("house")).to.be.true;

    expect(RiTa.rhymes("weight").includes("eight")).to.be.true;
    expect(RiTa.rhymes("eight").includes("weight")).to.be.true;

    expect(RiTa.rhymes("apple").includes("polo")).to.be.false;
    expect(RiTa.rhymes("this").includes("these")).to.be.false;

    expect(RiTa.rhymes("hose").includes("house")).to.be.false;
    expect(RiTa.rhymes("sieve").includes("mellow")).to.be.false;
    expect(RiTa.rhymes("swag").includes("grab")).to.be.false;
  });

  // TODO: pos
  it('Should correctly call rhymes.pos', () => {

    expect(RiTa.rhymes("cat", { pos: 'v' }).includes("hat")).to.be.false;
    expect(RiTa.rhymes("yellow", { pos: 'a' }).includes("mellow")).to.be.true;
    expect(RiTa.rhymes("toy", { pos: 'n' }).includes("boy")).to.be.true;
    expect(RiTa.rhymes("sieve", { pos: 'n' }).includes("give")).to.be.false;

    expect(RiTa.rhymes("tense", { pos: 'v' }).includes("condense")).to.be.true;
    expect(RiTa.rhymes("crab", { pos: 'n' }).includes("drab")).to.be.false;
    expect(RiTa.rhymes("shore", { pos: 'v' }).includes("more")).to.be.false;

    expect(RiTa.rhymes("mouse", { pos: 'nn' }).includes("house")).to.be.true;

    expect(RiTa.rhymes("weight", { pos: 'vb' }).includes("eight")).to.be.false;
    expect(RiTa.rhymes("eight", { pos: 'nn' }).includes("weight")).to.be.true;

    expect(RiTa.rhymes("apple", { pos: 'v' }).includes("polo")).to.be.false;
    expect(RiTa.rhymes("this", { pos: 'v' }).includes("these")).to.be.false;

    expect(RiTa.rhymes("hose", { pos: 'v' }).includes("house")).to.be.false;
    expect(RiTa.rhymes("sieve", { pos: 'v' }).includes("mellow")).to.be.false;
    expect(RiTa.rhymes("swag", { pos: 'v' }).includes("grab")).to.be.false;
  });

  it('Should correctly call rhymes.numSyllables', () => {

    expect(RiTa.rhymes("cat", { numSyllables: 2 }).includes("hat")).to.be.false;
    expect(RiTa.rhymes("cat", { numSyllables: 3 }).includes("hat")).to.be.false;
    expect(RiTa.rhymes("cat", { numSyllables: 1 }).includes("hat")).to.be.true;

    expect(RiTa.rhymes("yellow", { numSyllables: 2 }).includes("mellow")).to.be.true;
    expect(RiTa.rhymes("yellow", { numSyllables: 3 }).includes("mellow")).to.be.false;
  });

  it('Should correctly call rhymes.wordlength', () => {

    expect(RiTa.rhymes("cat", { minLength: 4 }).includes("hat")).to.be.false;
    expect(RiTa.rhymes("cat", { maxLength: 2 }).includes("hat")).to.be.false;
  });

  it('Should correctly call spellsLike', () => {
    let result;
    result = RiTa.spellsLike("banana", { minLength: 6, maxLength: 6 });
    eql(result, ["cabana"]);

    result = RiTa.spellsLike("");
    eql(result, []);

    result = RiTa.spellsLike("banana");
    eql(result, ["banal", "bonanza", "cabana", "manna"]);

    result = RiTa.spellsLike("banana");
    eql(result, ["banal", "bonanza", "cabana", "manna"]);

    result = RiTa.spellsLike("banana", { minLength: 6, maxLength: 6 });
    eql(result, ["cabana"]);

    result = RiTa.spellsLike("banana", { minDistance: 1 });
    eql(result, ["banal", "bonanza", "cabana", "manna"]);

    result = RiTa.spellsLike("tornado");
    eql(result, ["torpedo"]);

    result = RiTa.spellsLike("ice");
    eql(result, ["ace", "dice", "iced", "icy", "ire", "nice", "rice", "vice"]);

    result = RiTa.spellsLike("ice", { minDistance: 1 });
    eql(result, ["ace", "dice", "iced", "icy", "ire", "nice", "rice", "vice"]);

    result = RiTa.spellsLike("ice", { minDistance: 2, minLength: 3, maxLength: 3 });
    expect(result.length > 10).to.be.true;

    result = RiTa.spellsLike("ice", { minDistance: 0, minLength: 3, maxLength: 3 });
    eql(result, ["ace", "icy", "ire"]);

    result = RiTa.spellsLike("ice", { minLength: 3, maxLength: 3 });
    eql(result, ["ace", "icy", "ire"]);

    result = RiTa.spellsLike("ice", { minLength: 3, maxLength: 3, pos: 'n' });
    eql(result, ["ace", "ire"]);

    //console.log(RiTa.spellsLike("ice", {  minLength: 4, maxLength: 4, pos: 'nns', limit: 5 }));

    result = RiTa.spellsLike("ice", { minLength: 4, maxLength: 4, pos: 'v', limit: 5 });
    eql(result, ['ache', 'bide', 'bite', 'cite', 'dine']);

    result = RiTa.spellsLike("ice", { minLength: 4, maxLength: 4, pos: 'nns', limit: 5 });
    eql(result, ['aches', 'acres', 'aides', 'apices', 'axes']);

    result = RiTa.spellsLike("123");
    expect(result.length > 400).to.be.true;
  });

  it('Should correctly call soundsLike', () => {

    eql(RiTa.soundsLike("tornado", { type: 'sound' }), ["torpedo"]);

    let result = RiTa.soundsLike("try");
    let answer = ["cry", "dry", "fry", "pry", "rye", "tie", "tray", "tree", "tribe", "tried", "tripe", "trite", "true", "wry"];
    eql(result, answer);

    result = RiTa.soundsLike("try", { minDistance: 2 });
    expect(result.length > answer.length).to.be.true; // more

    result = RiTa.soundsLike("happy");
    eql(result, answer = ["happier", "hippie"]);

    result = RiTa.soundsLike("happy", { minDistance: 2 });
    expect(result.length > answer.length).to.be.true; // more

    result = RiTa.soundsLike("cat", { type: 'sound' });
    eql(result, ["bat", "cab", "cache", "calf", "calve", "can", "can\'t", "cap", "cash", "cast", "caste", "catch", "catty", "caught", "chat", "coat", "cot", "curt", "cut", "fat", "hat", "kit", "kite", "mat", "matt", "matte", "pat", "rat", "sat", "tat", "that", "vat"]);

    result = RiTa.soundsLike("cat", { type: 'sound', limit: 5 });
    eql(result, ['abashed', 'abate', 'abbey', 'abbot', 'abet']);

    result = RiTa.soundsLike("cat", { type: 'sound', minLength: 2, maxLength: 4 });
    eql(result, ["at", "bat", "cab", "calf", "can", "cap", "cash", "cast", "chat", "coat", "cot", "curt", "cut", "fat", "hat", "kit", "kite", "mat", "matt", "pat", "rat", "sat", "tat", "that", "vat"]);

    //console.log(RiTa.soundsLike("cat", { type: 'sound', minLength: 4, maxLength: 5, pos: 'jj', limit: 8 }));

    result = RiTa.soundsLike("cat", { type: 'sound', minLength: 4, maxLength: 5, pos: 'jj', limit: 8 });
    eql(result, answer = ['acute', 'aged', 'airy', 'alert', 'arty', 'awed', 'awry', 'azure']);

    result = RiTa.soundsLike("cat", { minDistance: 2 });
    expect(result.length > answer.length).to.be.true;
  });

  it('Should correctly call soundsLike().matchSpelling', () => {
    let result;
    result = RiTa.soundsLike("try", { matchSpelling: true });
    eql(result, ["cry", "dry", "fry", "pry", "tray", "wry"]);

    result = RiTa.soundsLike("try", { matchSpelling: true, maxLength: 3 });
    eql(result, ["cry", "dry", "fry", "pry", "wry"]);

    result = RiTa.soundsLike("try", { matchSpelling: true, minLength: 4 });
    eql(result, ["tray"]);

    result = RiTa.soundsLike("try", { matchSpelling: true, limit: 3 });
    eql(result, ["cry", "dry", "fry"]);

    result = RiTa.soundsLike("daddy", { matchSpelling: true });
    eql(result, ["dandy", "paddy"]);

    result = RiTa.soundsLike("banana", { matchSpelling: true });
    eql(result, ["bonanza"]);
  });

  it('Should correctly call isRhyme', () => {
    expect(!RiTa.isRhyme("apple", "polo")).to.be.true;
    expect(!RiTa.isRhyme("this", "these")).to.be.true;

    expect(RiTa.isRhyme("cat", "hat")).to.be.true;
    expect(RiTa.isRhyme("yellow", "mellow")).to.be.true;
    expect(RiTa.isRhyme("toy", "boy")).to.be.true;

    expect(RiTa.isRhyme("solo", "tomorrow")).to.be.true;
    expect(RiTa.isRhyme("tense", "sense")).to.be.true;
    expect(RiTa.isRhyme("crab", "drab")).to.be.true;
    expect(RiTa.isRhyme("shore", "more")).to.be.true;
    expect(!RiTa.isRhyme("hose", "house")).to.be.true;
    expect(!RiTa.isRhyme("sieve", "mellow")).to.be.true;

    expect(RiTa.isRhyme("mouse", "house")).to.be.true; //why??
    // expect(!RiTa.isRhyme("solo", "yoyo")).to.be.true;
    // expect(!RiTa.isRhyme("yoyo", "jojo")).to.be.true; -> Known Issues

    expect(RiTa.isRhyme("yo", "bro")).to.be.true;
    expect(!RiTa.isRhyme("swag", "grab")).to.be.true;
    expect(!RiTa.isRhyme("", "")).to.be.true;

    expect(RiTa.isRhyme("weight", "eight")).to.be.true;
    expect(RiTa.isRhyme("eight", "weight")).to.be.true;

    // fail without lexicon
    if (typeof NOLEX !== 'undefined') {
      expect(RiTa.isRhyme("sieve", "give")).to.be.true;
    }
  });

  it('Should correctly call isAlliteration', () => {

    expect(RiTa.isAlliteration("knife", "gnat")).to.be.true; // gnat=lts
    expect(RiTa.isAlliteration("knife", "naughty")).to.be.true;

    expect(RiTa.isAlliteration("sally", "silly")).to.be.true;
    expect(RiTa.isAlliteration("sea", "seven")).to.be.true;
    expect(RiTa.isAlliteration("silly", "seven")).to.be.true;
    expect(RiTa.isAlliteration("sea", "sally")).to.be.true;

    expect(RiTa.isAlliteration("big", "bad")).to.be.true;
    expect(RiTa.isAlliteration("bad", "big")).to.be.true; // swap position

    expect(RiTa.isAlliteration("BIG", "bad")).to.be.true; // CAPITAL LETTERS
    expect(RiTa.isAlliteration("big", "BAD")).to.be.true; // CAPITAL LETTERS
    expect(RiTa.isAlliteration("BIG", "BAD")).to.be.true; // CAPITAL LETTERS

    // False
    expect(!RiTa.isAlliteration("", "")).to.be.true;
    expect(!RiTa.isAlliteration("wind", "withdraw")).to.be.true;
    expect(!RiTa.isAlliteration("solo", "tomorrow")).to.be.true;
    expect(!RiTa.isAlliteration("solo", "yoyo")).to.be.true;
    expect(!RiTa.isAlliteration("yoyo", "jojo")).to.be.true;
    expect(!RiTa.isAlliteration("cat", "access")).to.be.true;

    expect(RiTa.isAlliteration("unsung", "sine")).to.be.true;
    expect(RiTa.isAlliteration("job", "gene")).to.be.true;
    expect(RiTa.isAlliteration("jeans", "gentle")).to.be.true;

    expect(RiTa.isAlliteration("abet", "better")).to.be.true;
    expect(RiTa.isAlliteration("never", "knight")).to.be.true;
    expect(RiTa.isAlliteration("knight", "navel")).to.be.true;
    expect(RiTa.isAlliteration("cat", "kitchen")).to.be.true;

    // not counting assonance
    expect(!RiTa.isAlliteration("octopus", "oblong")).to.be.true;
    expect(!RiTa.isAlliteration("omen", "open")).to.be.true;
    expect(!RiTa.isAlliteration("amicable", "atmosphere")).to.be.true;

    // fail without lexicon
    if (typeof NOLEX !== 'undefined') {
      expect(RiTa.isAlliteration("this", "these")).to.be.true;
      expect(RiTa.isAlliteration("psychology", "cholera")).to.be.true;
      expect(RiTa.isAlliteration("consult", "sultan")).to.be.true;
      expect(RiTa.isAlliteration("monsoon", "super")).to.be.true;
    }
  });

  it('Should correctly call to phone array', () => {
    let result = RiTa.lexicon()._toPhoneArray(RiTa.lexicon().rawPhones("tornado", false));
    let ans = ["t", "ao", "r", "n", "ey", "d", "ow"];
    expect(result).eql(ans);
  });

  function eql(output, expected, msg) { expect(output).eql(expected, msg); }
});
