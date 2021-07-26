import Util from "./util";
class Conjugator {

  constructor(parent) {
    this.RiTa = parent;
    this._reset();
  }

  // TODO: add handling of past tense modals.
  conjugate(verb, args) {

    if (!verb || !verb.length) throw Error('No verb');
    if (!args) return verb;

    verb = verb.toLowerCase(); 
    args = this._parseArgs(args);

    // handle 'to be' verbs and stemming
    let frontVG = TO_BE.includes(verb) ? "be" : this._handleStem(verb);

    let actualModal, verbForm, conjs = [], RiTa = this.RiTa;

    if (this.form === RiTa.INFINITIVE) {
      actualModal = "to";
    }
    if (this.tense === RiTa.FUTURE) {
      actualModal = "will";
    }
    if (this.passive) {
      conjs.push(this.pastPart(frontVG));
      frontVG = "be";
    }
    if (this.progressive) {
      conjs.push(this.presentPart(frontVG));
      frontVG = "be";
    }
    if (this.perfect) {
      conjs.push(this.pastPart(frontVG));
      frontVG = "have";
    }
    if (actualModal) {
      conjs.push(frontVG);
      frontVG = null;
    }

    // Now inflect frontVG (if it exists) and push it on restVG
    if (frontVG) {
      if (this.form === RiTa.GERUND) { // gerund - use ING form
        conjs.push(this.presentPart(frontVG));
      } else if (this.interrogative && frontVG != "be" && conjs.length < 1) {
        conjs.push(frontVG);
      } else {
        verbForm = this._verbForm(frontVG, this.tense, this.person, this.number);
        conjs.push(verbForm);
      }
    }

    // add modal, and we're done
    actualModal && conjs.push(actualModal);

    return conjs.reduce((acc, cur) => cur + ' ' + acc).trim();
  }

  presentPart(theVerb) {
    return theVerb === 'be' ? 'being' :
      this._checkRules(PRESENT_PARTICIPLE_RULESET, theVerb);
  }

  pastPart(theVerb) {
    if (this._isPastParticiple(theVerb)) return theVerb;
    return this._checkRules(PAST_PARTICIPLE_RULESET, theVerb);
  }

  // TODO: add to API ?
  // TODO: not using stem but a set of rules? (as stem() is not
  // designed for verbs) e.g. barkness
  unconjugate(word, dbug) {
    const stem = this.RiTa.stem(word);
    const guess = this._handleStem(stem);
    if (this.RiTa.tagger.allTags(guess).includes("vb")) {
      return guess;
    }
    if (dbug) console.log("Unable to unconjugate " + word);
    return undefined;
  }

  verbLemmatization(word, dbug) {
    if (typeof word !== 'string') return undefined;
    if (VERB_LEMMATIZER_EXCEPTIONS.hasOwnProperty(word)) {
      dbug && console.log(word + " is in exceptions list.");
      return VERB_LEMMATIZER_EXCEPTIONS[word];
    }
    let tags = this.RiTa.tagger.allTags(word, { noGuessing: true });
    let notAVerb = tags.length > 0;
    for (let i = 0; i < tags.length; i++){
      if (/^vb/.test(tags[i])) {
        notAVerb = false;
        break;
      }
      if (/^vb$/.test(tags[i])) {
        dbug && console.log(word + " is a base form.");
        return word;
      }
    }
    if (notAVerb) {
      dbug && console.log(word + " is not a verb.");
      return undefined;
    }
    // now rules
    // 1. 3rd person present
    if (word.endsWith("ies")) {
      dbug && console.log(word + " hit rule: ends with ies.");
      return word.replace(/ies$/, "y");
    } else if (word.endsWith("ches") || word.endsWith("ses") || word.endsWith("shes") || word.endsWith("xes") || word.endsWith("zes")) {
      dbug && console.log(word + " hit rule: ends with (ch|s|sh|x|z)es.");
      return word.replace(/es$/, "");
    } else if (word.endsWith("s")) {
      dbug && console.log(word + " hit rule: ends with s.");
      return word.replace(/s$/, "");
    }
    // 2. past form
    else if (word.endsWith("ied")) {
      dbug && console.log(word + " hit rule: ends with ied.");
      return word.replace(/ied$/, "y");
    } else if (word.endsWith("ed") && word.charAt(word.length - 3) === word.charAt(word.length - 4)) {
      dbug && console.log(word + " hit rule: ends with ..ed.");
      return word.replace(/[a-z]ed$/, "");
    } else if (word.endsWith("ed")) {
      if (VB_ENDS_IN_E.includes(word.replace(/d$/, ""))) {
        dbug && console.log(word + " hit rule: ends with ed.");
        return word.replace(/d$/, "")
      } else {
        dbug && console.log(word + " hit rule: ends with ed.");
        return word.replace(/ed$/, "")
      }
    }
    // 3. ing
    else if (word.endsWith("ing") && word.charAt(word.length - 4) === word.charAt(word.length - 5)) {
      dbug && console.log(word + " hit rule: ends with ..ing.");
      return word.replace(/[a-z]ing$/, "");
    } else if (word.endsWith("ying")) {
      if (VB_ENDS_IN_E.includes(word.replace(/ying$/, "ie"))) {
        dbug && console.log(word + " hit rule: ends with ying.");
        return word.replace(/ying$/, "ie")
      }
    } else if (word.endsWith("ing")) {
      if (VB_ENDS_IN_E.includes(word.replace(/ing$/, "e"))) {
        dbug && console.log(word + " hit rule: ends with (e)ing.");
        return word.replace(/ing$/, "e")
      } else {
        dbug && console.log(word + " hit rule: ends with ing.");
        return word.replace(/ing$/, "")
      }
    }

    //rules end
    dbug && console.log(word + " hit no rule");
    return word;
  }

  toString() {
    return "  ---------------------" + "\n" + "  Passive = " + this.passive +
      '\n' + "  Perfect = " + this.perfect + '\n' + "  Progressive = " +
      this.progressive + '\n' + "  ---------------------" + '\n' + "  Number = " +
      this.number + '\n' + "  Person = " + this.person + '\n' + "  Tense = " +
      this.tense + '\n' + "  ---------------------" + '\n';
  }

  /////////////////////////////// End API ///////////////////////////////////

  _reset() {
    this.perfect = this.progressive = this.passive = this.interrogative = false;
    this.tense = this.RiTa.PRESENT;
    this.person = this.RiTa.FIRST;
    this.number = this.RiTa.SINGULAR;
    this.form = this.RiTa.NORMAL;
  }

  _parseArgs(args) {

    this._reset();

    const RiTa = this.RiTa;
    if (typeof args === 'string') {
      if (/^[123][SP](Pr|Pa|Fu)$/.test(args)) {
        let opts = {};
        opts.person = parseInt(args[0]);
        opts.number = args[1] === 'S' ? RiTa.SINGULAR : RiTa.PLURAL;
        let tense = args.substr(2);
        if (tense === 'Pr') opts.tense = RiTa.PRESENT;
        if (tense === 'Fu') opts.tense = RiTa.FUTURE;
        if (tense === 'Pa') opts.tense = RiTa.PAST;
        args = opts;
      }
      else {
        throw Error('Invalid args: '+args)
        args = Util.stringArgs(args); // what?
      }
    }

    if (args.number) this.number = args.number;
    if (args.person) this.person = args.person;
    if (args.tense) this.tense = args.tense;
    if (args.form) this.form = args.form;
    if (args.passive) this.passive = args.passive;
    if (args.progressive) this.progressive = args.progressive;
    if (args.interrogative) this.interrogative = args.interrogative;
    if (args.perfect) this.perfect = args.perfect;
  }

  _checkRules(ruleSet, theVerb) {

    if (!theVerb || !theVerb.length) return '';

    theVerb = theVerb.trim();

    let dbug = 0, res, name = ruleSet.name;
    let rules = ruleSet.rules, defRule = ruleSet.defaultRule;

    if (!rules) console.error("no rule: " + ruleSet.name + ' of ' + theVerb);
    if (MODALS.includes(theVerb)) return theVerb;

    for (let i = 0; i < rules.length; i++) {
      dbug && console.log("checkRules(" + name + ").fire(" + i + ")=" + rules[i].regex);
      if (rules[i].applies(theVerb)) {
        let got = rules[i].fire(theVerb);
        dbug && console.log("HIT(" + name + ").fire(" + i + ")=" + rules[i].regex + "_returns: " + got);
        return got;
      }
    }
    dbug && console.log("NO HIT!");
    if (ruleSet.doubling && VERB_CONS_DOUBLING.includes(theVerb)) {
      dbug && console.log("doDoubling!");
      theVerb = this._doubleFinalConsonant(theVerb);
    }

    res = defRule.fire(theVerb);
    dbug && console.log("checkRules(" + name + ").returns: " + res);

    return res;
  }

  _doubleFinalConsonant(word) {
    return word + word.charAt(word.length - 1);
  }

  _isPastParticiple(word) {
    const w = word.toLowerCase();
    const lex = this.RiTa.lexicon();
    const posArr = lex._posArr(w);

    // in dict?
    if (posArr && posArr.includes("vbn")) return true;

    // is irregular?
    if (IRREGULAR_PAST_PART.includes(w)) return true;

    // ends with ed?
    if (w.endsWith("ed")) {

      let pos = lex._posArr(w.substring(0, w.length - 1)) // created
        || lex._posArr(w.substring(0, w.length - 2));     // played
      if (!pos && w.charAt(w.length - 3) === w.charAt(w.length - 4)) {
        pos = lex._posArr(w.substring(0, w.length - 3)); // hopped
      }
      if (!pos && w.endsWith("ied")) {
        pos = lex._posArr(w.substring(0, w.length - 3) + "y"); // cried
      }
      if (pos && pos.includes('vb')) return true;
    }

    // ends with en?
    if (w.endsWith("en")) {

      let pos = lex._posArr(w.substring(0, w.length - 1)) // arisen
        || lex._posArr(w.substring(0, w.length - 2)); // eaten

      if (!pos && w.charAt(w.length - 3) === w.charAt(w.length - 4)) {
        // forgotten / bitten ... (past tense + en)? 
        pos = lex._posArr(w.substring(0, w.length - 3)); 
      }
      if (pos && (pos.includes('vb') || pos.includes("vbd"))) return true;

      // special cases
      let stem = w.substring(0, w.length - 2);
      if (/^(writt|ridd|chidd|swoll)$/.test(stem)) return true;
    }

    // ends with n, d, or t?
    if (/[ndt]$/.test(w)) {
      // grown, thrown, heard, learnt...
      let pos = lex._posArr(w.substring(0, w.length - 1)) 
      if (pos && (pos.includes('vb'))) return true;
    }

    return false;
  }

  _pastTense(theVerb, pers, numb) {
    const RiTa = this.RiTa;
    if (theVerb.toLowerCase() === "be") {
      switch (numb) {
        case RiTa.SINGULAR:
          switch (pers) {
            case RiTa.FIRST: break;
            case RiTa.THIRD: return "was";
            case RiTa.SECOND: return "were";
          }
          break;
        case RiTa.PLURAL:
          return "were";
      }
    }
    return this._checkRules(PAST_RULESET, theVerb);
  }

  _presentTense(theVerb, person, number) {
    person = person || this.person;
    number = number || this.number;
    const RiTa = this.RiTa;
    if (person === RiTa.THIRD && number === RiTa.SINGULAR) {
      return this._checkRules(PRESENT_RULESET, theVerb);
    }
    else if (theVerb === "be") {
      if (number === RiTa.SINGULAR) {
        switch (person) {
          case RiTa.FIRST: return "am";
          case RiTa.SECOND: return "are";
          case RiTa.THIRD: return "is";
        }
      } else {
        return "are";
      }
    }
    return theVerb;
  }

  _verbForm(theVerb, tense, person, number) {
    switch (tense) {
      case this.RiTa.PRESENT:
        return this._presentTense(theVerb, person, number);
      case this.RiTa.PAST:
        return this._pastTense(theVerb, person, number);
    }
    return theVerb;
  }

  _handleStem = function (word) {

    if (this.RiTa.lexicon()._dict(true).hasOwnProperty(word) && this.RiTa.tagger.allTags(word).includes("vb")) {
      return word;
    }

    let w = word;
    while (w.length > 1) {

      let guess = this.RiTa.search(new RegExp('^' + w), { pos: 'v' });
      if (!guess || guess.length < 1) {
        w = w.slice(0, -1);
        continue;
      }
      // always look for shorter words first
      guess.sort((a, b) => a.length - b.length);

      // look for words (a===b or stem(b)===a) first
      for (let i = 0; i < guess.length; i++){
        if (word === guess[i]) return word;
        if (this.RiTa.stem(guess[i]) === word) return guess[i];
      }

      w = w.slice(0, -1);
    }

    // can't find possible word in dict, return original
    return word;
  }
}

const VERB_LEMMATIZER_EXCEPTIONS = {"abetted": "abet", "abetting": "abet", "abhorred": "abhor", "abhorring": "abhor", "abode": "abide", "abought": "aby", "about-shipped": "about-ship", "about-shipping": "about-ship", "abutted": "abut", "abutting": "abut", "abye": "aby", "accompanied": "accompany", "acetified": "acetify", "acidified": "acidify", "acquitted": "acquit", "acquitting": "acquit", "ad-libbed": "ad-lib", "ad-libbing": "ad-lib", "addrest": "address", "admitted": "admit", "admitting": "admit", "aerified": "aerify", "air-dried": "air-dry", "airdropped": "airdrop", "airdropping": "airdrop", "alkalified": "alkalify", "allied": "ally", "allotted": "allot", "allotting": "allot", "allowed_for": "allow_for", "allowing_for": "allow_for", "allows_for": "allow_for", "am": "be", "ammonified": "ammonify", "amnestied": "amnesty", "amplified": "amplify", "anglified": "anglify", "annulled": "annul", "annulling": "annul", "appalled": "appal", "appalling": "appal", "applied": "apply", "arcked": "arc", "arcking": "arc", "are": "be", "argufied": "argufy", "arisen": "arise", "arose": "arise", "ate": "eat", "atrophied": "atrophy", "averred": "aver", "averring": "aver", "awoke": "awake", "awoken": "awake", "babied": "baby", "baby-sat": "baby-sit", "baby-sitting": "baby-sit", "back-pedalled": "back-pedal", "back-pedalling": "back-pedal", "backbit": "backbite", "backbitten": "backbite", "backslid": "backslide", "backslidden": "backslide", "bade": "bid", "bagged": "bag", "bagging": "bag", "ballyragged": "ballyrag", "ballyragging": "ballyrag", "bandied": "bandy", "banned": "ban", "banning": "ban", "barred": "bar", "barrelled": "barrel", "barrelling": "barrel", "barring": "bar", "basified": "basify", "batted": "bat", "batting": "bat", "bayonetted": "bayonet", "bayonetting": "bayonet", "beaten": "beat", "beatified": "beatify", "beautified": "beautify", "became": "become", "became_known": "become_known", "becomes_known": "become_known", "bed": "bed", "bedded": "bed", "bedding": "bed", "bedevilled": "bedevil", "bedevilling": "bedevil", "bedimmed": "bedim", "bedimming": "bedim", "been": "be", "befallen": "befall", "befell": "befall", "befitted": "befit", "befitting": "befit", "befogged": "befog", "befogging": "befog", "began": "begin", "begat": "beget", "begetting": "beget", "begged": "beg", "begging": "beg", "beginning": "begin", "begirt": "begird", "begot": "beget", "begotten": "beget", "begun": "begin", "beheld": "behold", "beholden": "behold", "bejewelled": "bejewel", "bejewelling": "bejewel", "bellied": "belly", "belly-flopped": "belly-flop", "belly-flopping": "belly-flop", "belying": "belie", "benefitted": "benefit", "benefitting": "benefit", "benempt": "bename", "bent": "bend", "berried": "berry", "besetting": "beset", "besought": "beseech", "bespoke": "bespeak", "bespoken": "bespeak", "bestirred": "bestir", "bestirring": "bestir", "bestrewn": "bestrew", "bestrid": "bestride", "bestridden": "bestride", "bestrode": "bestride", "betaken": "betake", "bethought": "bethink", "betook": "betake", "betted": "bet", "betting": "bet", "bevelled": "bevel", "bevelling": "bevel", "biassed": "bias", "biassing": "bias", "bidden": "bid", "bidding": "bid", "bing": "bing", "binned": "bin", "binning": "bin", "bird-dogged": "bird-dog", "bird-dogging": "bird-dog", "bit": "bite", "bitted": "bit", "bitten": "bite", "bitting": "bit", "bivouacked": "bivouac", "bivouacking": "bivouac", "blabbed": "blab", "blabbing": "blab", "blackberried": "blackberry", "blacklegged": "blackleg", "blacklegging": "blackleg", "blatted": "blat", "blatting": "blat", "bled": "bleed", "blest": "bless", "blew": "blow", "blew_one's_nose": "blow_one's_nose", "blipped": "blip", "blipping": "blip", "blobbed": "blob", "blobbing": "blob", "bloodied": "bloody", "blotted": "blot", "blotting": "blot", "blowing_one's_nose": "blow_one's_nose", "blown": "blow", "blows_one's_nose": "blow_one's_nose", "blubbed": "blub", "blubbing": "blub", "blue-pencilled": "blue-pencil", "blue-pencilling": "blue-pencil", "blurred": "blur", "blurring": "blur", "bobbed": "bob", "bobbing": "bob", "bodied": "body", "bogged-down": "bog-down", "bogged_down": "bog_down", "bogging-down": "bog-down", "bogging_down": "bog_down", "bogs-down": "bog-down", "bogs_down": "bog_down", "booby-trapped": "booby-trap", "booby-trapping": "booby-trap", "bootlegged": "bootleg", "bootlegging": "bootleg", "bopped": "bop", "bopping": "bop", "bore": "bear", "born": "bear", "borne": "bear", "bottle-fed": "bottle-feed", "bought": "buy", "bound": "bind", "bragged": "brag", "bragging": "brag", "breast-fed": "breast-feed", "bred": "breed", "brevetted": "brevet", "brevetting": "brevet", "brimmed": "brim", "brimming": "brim", "broke": "break", "broken": "break", "brought": "bring", "browbeaten": "browbeat", "brutified": "brutify", "budded": "bud", "budding": "bud", "bugged": "bug", "bugging": "bug", "built": "build", "bulldogging": "bulldog", "bullied": "bully", "bullshitted": "bullshit", "bullshitting": "bullshit", "bullwhipped": "bullwhip", "bullwhipping": "bullwhip", "bullyragged": "bullyrag", "bullyragging": "bullyrag", "bummed": "bum", "bumming": "bum", "buried": "bury", "burnt": "burn", "burred": "bur", "burring": "bur", "bushelled": "bushel", "bushelling": "bushel", "busied": "busy", "bypast": "bypass", "caballed": "cabal", "caballing": "cabal", "caddied": "caddie", "caddies": "caddie", "caddying": "caddie", "calcified": "calcify", "came": "come", "canalled": "canal", "canalling": "canal", "cancelled": "cancel", "cancelling": "cancel", "candied": "candy", "canned": "can", "canning": "can", "canopied": "canopy", "capped": "cap", "capping": "cap", "carburetted": "carburet", "carburetting": "carburet", "carillonned": "carillon", "carillonning": "carillon", "carnied": "carny", "carnified": "carnify", "carolled": "carol", "carolling": "carol", "carried": "carry", "casefied": "casefy", "catnapped": "catnap", "catnapping": "catnap", "catted": "cat", "catting": "cat", "caught": "catch", "cavilled": "cavil", "cavilling": "cavil", "certified": "certify", "channelled": "channel", "channelling": "channel", "chapped": "chap", "chapping": "chap", "charred": "char", "charring": "char", "chatted": "chat", "chatting": "chat", "chevied": "chivy", "chevies": "chivy", "chevying": "chivy", "chid": "chide", "chidden": "chide", "chinned": "chin", "chinning": "chin", "chipped": "chip", "chipping": "chip", "chiselled": "chisel", "chiselling": "chisel", "chitchatted": "chitchat", "chitchatting": "chitchat", "chivied": "chivy", "chivved": "chiv", "chivvied": "chivy", "chivvies": "chivy", "chivving": "chiv", "chivvying": "chivy", "chondrified": "chondrify", "chopped": "chop", "chopping": "chop", "chose": "choose", "chosen": "choose", "chugged": "chug", "chugging": "chug", "chummed": "chum", "chumming": "chum", "citified": "citify", "clad": "clothe", "cladding": "clad", "clammed": "clam", "clamming": "clam", "clapped": "clap", "clapping": "clap", "clarified": "clarify", "classified": "classify", "cleft": "cleave", "clemmed": "clem", "clemming": "clem", "clept": "clepe", "clipped": "clip", "clipping": "clip", "clogged": "clog", "clogging": "clog", "clopped": "clop", "clopping": "clop", "clotted": "clot", "clotting": "clot", "clove": "cleave", "cloven": "cleave", "clubbed": "club", "clubbing": "club", "clung": "cling", "co-opted": "coopt", "co-opting": "coopt", "co-opts": "coopts", "co-ordinate": "coordinate", "co-ordinated": "coordinate", "co-ordinates": "coordinate", "co-ordinating": "coordinate", "co-starred": "co-star", "co-starring": "co-star", "cockneyfied": "cockneyfy", "codded": "cod", "codding": "cod", "codified": "codify", "cogged": "cog", "cogging": "cog", "coiffed": "coif", "coiffing": "coif", "collied": "colly", "combatted": "combat", "combatting": "combat", "committed": "commit", "committing": "commit", "compelled": "compel", "compelling": "compel", "complied": "comply", "complotted": "complot", "complotting": "complot", "concurred": "concur", "concurring": "concur", "confabbed": "confab", "confabbing": "confab", "conferred": "confer", "conferring": "confer", "conned": "con", "conning": "con", "controlled": "control", "controlling": "control", "copied": "copy", "copped": "cop", "copping": "cop", "coquetted": "coquet", "coquetting": "coquet", "corralled": "corral", "corralling": "corral", "counselled": "counsel", "counselling": "counsel", "counterplotted": "counterplot", "counterplotting": "counterplot", "countersank": "countersink", "countersunk": "countersink", "court-martialled": "court-martial", "court-martialling": "court-martial", "crabbed": "crab", "crabbing": "crab", "crammed": "cram", "cramming": "cram", "crapped": "crap", "crapping": "crap", "crept": "creep", "cribbed": "crib", "cribbing": "crib", "cried": "cry", "cropped": "crop", "cropping": "crop", "crossbred": "crossbreed", "crosscutting": "crosscut", "crucified": "crucify", "cubbed": "cub", "cubbing": "cub", "cudgelled": "cudgel", "cudgelling": "cudgel", "cupelled": "cupel", "cupelling": "cupel", "cupped": "cup", "cupping": "cup", "curetted": "curet", "curettes": "curet", "curetting": "curet", "curried": "curry", "curst": "curse",
  "curtsied": "curtsy", "curvetted": "curvet", "curvetting": "curvet", "cutting": "cut", "dabbed": "dab", "dabbing": "dab", "dagged": "dag", "dagging": "dag", "dallied": "dally", "dammed": "dam", "damming": "dam", "damnified": "damnify", "dandified": "dandify", "dapped": "dap", "dapping": "dap", "dealt": "deal", "debarred": "debar", "debarring": "debar", "debugged": "debug", "debugging": "debug", "debussed": "debus", "debusses": "debus", "debussing": "debus", "decalcified": "decalcify", "declassified": "declassify", "decontrolled": "decontrol", "decontrolling": "decontrol", "decried": "decry", "deep-freeze": "deepfreeze", "deep-freezed": "deepfreeze", "deep-freezes": "deepfreeze", "deep-fried": "deep-fry", "deferred": "defer", "deferring": "defer", "defied": "defy", "degassed": "degas", "degasses": "degas", "degassing": "degas", "dehumidified": "dehumidify", "deified": "deify", "demitted": "demit", "demitting": "demit", "demobbed": "demob", "demobbing": "demob", "demulsified": "demulsify", "demurred": "demur", "demurring": "demur", "demystified": "demystify", "denazified": "denazify", "denied": "deny", "denitrified": "denitrify", "denned": "den", "denning": "den", "descried": "descry", "deterred": "deter", "deterring": "deter", "detoxified": "detoxify", "devilled": "devil", "devilling": "devil", "devitrified": "devitrify", "diagrammed": "diagram", "diagramming": "diagram", "dialled": "dial", "dialling": "dial", "dibbed": "dib", "dibbing": "dib", "did": "do", "digging": "dig", "dignified": "dignify", "dilly-dallied": "dilly-dally", "dimmed": "dim", "dimming": "dim", "dinned": "din", "dinning": "din", "dipped": "dip", "dipping": "dip", "dirtied": "dirty", "disannulled": "disannul", "disannulling": "disannul", "disbarred": "disbar", "disbarring": "disbar", "disbudded": "disbud", "disbudding": "disbud", "disembodied": "disembody", "disembowelled": "disembowel", "disembowelling": "disembowel", "disenthralled": "disenthral", "disenthralling": "disenthral", "disenthralls": "disenthral", "disenthrals": "disenthrall", "dishevelled": "dishevel", "dishevelling": "dishevel", "disinterred": "disinter", "disinterring": "disinter", "dispelled": "dispel", "dispelling": "dispel", "disqualified": "disqualify", "dissatisfied": "dissatisfy", "distilled": "distil", "distilling": "distil", "diversified": "diversify", "divvied": "divvy", "dizzied": "dizzy", "dogged": "dog", "dogging": "dog", "doglegged": "dogleg", "doglegging": "dogleg", "dollied": "dolly", "done": "do", "donned": "don", "donning": "don", "dotted": "dot", "dotting": "dot", "dought": "dow", "dove": "dive", "drabbed": "drab", "drabbing": "drab", "dragged": "drag", "dragging": "drag", "drank": "drink", "drawn": "draw", "dreamt": "dream", "drew": "draw", "dried": "dry", "dripped": "drip", "dripping": "drip", "drivelled": "drivel", "drivelling": "drivel", "driven": "drive", "dropped": "drop", "dropping": "drop", "drove": "drive", "drubbed": "drub", "drubbing": "drub", "drugged": "drug", "drugging": "drug", "drummed": "drum", "drumming": "drum", "drunk": "drink", "dubbed": "dub", "dubbing": "dub", "duelled": "duel", "duelling": "duel", "dug": "dig", "dulcified": "dulcify", "dummied": "dummy", "dunned": "dun", "dunning": "dun", "dwelt": "dwell", "dying": "die", "easied": "easy", "eaten": "eat", "eavesdropped": "eavesdrop", "eavesdropping": "eavesdrop", "eddied": "eddy", "edified": "edify", "ego-tripped": "ego-trip", "ego-tripping": "ego-trip", "electrified": "electrify", "embedded": "embed", "embedding": "embed", "embodied": "embody", "embussed": "embus", "embusses": "embus", "embussing": "embus", "emitted": "emit", "emitting": "emit", "empanelled": "empanel", "empanelling": "empanel", "emptied": "empty", "emulsified": "emulsify", "enamelled": "enamel", "enamelling": "enamel", "englutted": "englut", "englutting": "englut", "enrolled": "enrol", "enrolling": "enrol", "enthralled": "enthral", "enthralling": "enthral", "entrammelled": "entrammel", "entrammelling": "entrammel", "entrapped": "entrap", "entrapping": "entrap", "envied": "envy", "enwound": "enwind", "enwrapped": "enwrap", "enwrapping": "enwrap", "equalled": "equal", "equalling": "equal", "equipped": "equip", "equipping": "equip", "espied": "espy", "esterified": "esterify", "estopped": "estop", "estopping": "estop", "etherified": "etherify", "excelled": "excel", "excelling": "excel", "exemplified": "exemplify", "expelled": "expel", "expelling": "expel", "extolled": "extol", "extolling": "extol", "facetted": "facet", "facetting": "facet", "fagged": "fag", "fagging": "fag", "fallen": "fall", "falsified": "falsify", "fancied": "fancy", "fanned": "fan", "fanning": "fan", "fantasied": "fantasy", "fatted": "fat", "fatting": "fat", "featherbedded": "featherbed", "featherbedding": "featherbed", "fed": "feed", "feed": "feed", "fell": "fall", "felt": "feel", "ferried": "ferry", "fibbed": "fib", "fibbing": "fib", "figged": "fig", "figging": "fig", "filled_up": "fill_up", "fine-drawn": "fine-draw", "fine-drew": "fine-draw", "finned": "fin", "finning": "fin", "fitted": "fit", "fitting": "fit", "flagged": "flag", "flagging": "flag", "flammed": "flam", "flamming": "flam", "flannelled": "flannel", "flannelling": "flannel", "flapped": "flap", "flapping": "flap", "flatted": "flat", "flatting": "flat", "fled": "flee", "flew": "fly", "flimflammed": "flimflam", "flimflamming": "flimflam", "flip-flopped": "flip-flop", "flip-flopping": "flip-flop", "flipped": "flip", "flipping": "flip", "flitted": "flit", "flitting": "flit", "flogged": "flog", "flogging": "flog", "floodlit": "floodlight", "flopped": "flop", "flopping": "flop", "flown": "fly", "flubbed": "flub", "flubbing": "flub", "flung": "fling", "flurried": "flurry", "flyblew": "flyblow", "flyblown": "flyblow", "fobbed": "fob", "fobbing": "fob", "fogged": "fog", "fogging": "fog", "footslogged": "footslog", "footslogging": "footslog", "forbad": "forbid", "forbade": "forbid", "forbidden": "forbid", "forbidding": "forbid", "forbore": "forbear", "forborne": "forbear", "force-fed": "force-feed", "fordid": "fordo", "fordone": "fordo", "foredid": "foredo", "foredone": "foredo", "foregone": "forego", "foreknew": "foreknow", "foreknown": "foreknow", "foreran": "forerun", "forerunning": "forerun", "foresaw": "foresee", "foreseen": "foresee", "foreshown": "foreshow", "forespoke": "forespeak", "forespoken": "forespeak", "foretold": "foretell", "forewent": "forego", "forgave": "forgive", "forgetting": "forget", "forgiven": "forgive", "forgone": "forgo", "forgot": "forget", "forgotten": "forget", "formatted": "format", "formatting": "format", "forsaken": "forsake", "forsook": "forsake", "forspoke": "forspeak", "forspoken": "forspeak", "forswore": "forswear", "forsworn": "forswear", "fortified": "fortify", "forwent": "forgo", "fought": "fight", "found": "find", "foxtrotted": "foxtrot", "foxtrotting": "foxtrot", "frapped": "frap", "frapping": "frap", "freeze-dried": "freeze-dry", "frenchified": "frenchify", "frenzied": "frenzy", "fretted": "fret", "fretting": "fret", "fried": "fry", "frigged": "frig", "frigging": "frig", "fritted": "frit", "fritting": "frit", "frivolled": "frivol", "frivolling": "frivol", "frogged": "frog", "frogging": "frog", "frolicked": "frolic", "frolicking": "frolic", "froze": "freeze", "frozen": "freeze", "fructified": "fructify", "fuelled": "fuel", "fuelling": "fuel", "fulfilled": "fulfil", "fulfilling": "fulfil", "funned": "fun", "funnelled": "funnel", "funnelling": "funnel", "funning": "fun", "furred": "fur", "furring": "fur", "gadded": "gad", "gadding": "gad", "gagged": "gag", "gagging": "gag", "gainsaid": "gainsay", "gambolled": "gambol", "gambolling": "gambol", "gammed": "gam", "gamming": "gam", "gan": "gin", "ganned": "gan", "ganning": "gan", "gapped": "gap", "gapping": "gap", "gasified": "gasify", "gassed": "gas", "gasses": "gas", "gassing": "gas", "gave": "give", "gelled": "gel", "gelling": "gel", "gelt": "geld", "gemmed": "gem", "gemming": "gem", "genned-up": "gen-up", "genning-up": "gen-up", "gens-up": "gen-up", "gets_lost": "get_lost", "gets_started": "get_started", "getting": "get", "getting_lost": "get_lost", "getting_started": "get_started", "ghostwritten": "ghostwrite", "ghostwrote": "ghostwrite", "gibbed": "gib", "gibbing": "gib", "giddied": "giddy", "giftwrapped": "giftwrap", "giftwrapping": "giftwrap", "gigged": "gig", "gigging": "gig", "gilt": "gild", "ginned": "gin", "ginning": "gin", "gipped": "gip", "gipping": "gip", "girt": "gird", "given": "give", "glommed": "glom", "glomming": "glom", "gloried": "glory", "glorified": "glorify", "glutted": "glut", "glutting": "glut", "gnawn": "gnaw", "goes_deep": "go_deep", "going_deep": "go_deep", "gollied": "golly", "gone": "go", "gone_deep": "go_deep", "goose-stepped": "goose-step", "goose-stepping": "goose-step", "got": "get", "got_lost": "get_lost", "got_started": "get_started", "gotten": "get", "gotten_lost": "get_lost", "grabbed": "grab", "grabbing": "grab", "gratified": "gratify", "gravelled": "gravel", "gravelling": "gravel", "graven": "grave", "grew": "grow", "grinned": "grin", "grinning": "grin", "gripped": "grip", "gripping": "grip", "gript": "grip",
  "gritted": "grit", "gritting": "grit", "ground": "grind", "grovelled": "grovel", "grovelling": "grovel", "grown": "grow", "grubbed": "grub", "grubbing": "grub", "guarantied": "guaranty", "gullied": "gully", "gummed": "gum", "gumming": "gum", "gunned": "gun", "gunning": "gun", "gypped": "gyp", "gypping": "gyp", "hacksawn": "hacksaw", "had": "have", "had_a_feeling": "have_a_feeling", "had_left": "have_left", "had_the_feeling": "have_the_feeling", "hammed": "ham", "hamming": "ham", "hamstrung": "hamstring", "hand-knitted": "hand-knit", "hand-knitting": "hand-knit", "handfed": "handfeed", "handicapped": "handicap", "handicapping": "handicap", "handselled": "handsel", "handselling": "handsel", "harried": "harry", "has": "have", "has_a_feeling": "have_a_feeling", "has_left": "have_left", "has_the_feeling": "have_the_feeling", "hatchelled": "hatchel", "hatchelling": "hatchel", "hatted": "hat", "hatting": "hat", "having_a_feeling": "have_a_feeling", "having_left": "have_left", "having_the_feeling": "have_the_feeling", "heard": "hear", "hedgehopped": "hedgehop", "hedgehopping": "hedgehop", "held": "hold", "hemmed": "hem", "hemming": "hem", "hewn": "hew", "hiccupped": "hiccup", "hiccupping": "hiccup", "hid": "hide", "hidden": "hide", "high-hatted": "high-hat", "high-hatting": "high-hat", "hinnied": "hinny", "hitting": "hit", "hobbed": "hob", "hobbing": "hob", "hobnobbed": "hobnob", "hobnobbing": "hobnob", "hocus-pocussed": "hocus-pocus", "hocus-pocussing": "hocus-pocus", "hocussed": "hocus", "hocussing": "hocus", "hogged": "hog", "hogging": "hog", "hogtying": "hogtie", "honied": "honey", "hopped": "hop", "hopping": "hop", "horrified": "horrify", "horsewhipped": "horsewhip", "horsewhipping": "horsewhip", "houselled": "housel", "houselling": "housel", "hove": "heave", "hovelled": "hovel", "hovelling": "hovel", "hugged": "hug", "hugging": "hug", "humbugged": "humbug", "humbugging": "humbug", "humidified": "humidify", "hummed": "hum", "humming": "hum", "hung": "hang", "hurried": "hurry", "hypertrophied": "hypertrophy", "identified": "identify", "imbedded": "imbed", "imbedding": "imbed", "impanelled": "impanel", "impanelling": "impanel", "impelled": "impel", "impelling": "impel", "implied": "imply", "inbred": "inbreed", "incurred": "incur", "incurring": "incur", "indemnified": "indemnify", "indwelt": "indwell", "inferred": "infer", "inferring": "infer", "initialled": "initial", "initialling": "initial", "inlaid": "inlay", "insetting": "inset", "inspanned": "inspan", "inspanning": "inspan", "installed": "instal", "installing": "instal", "intensified": "intensify", "interbred": "interbreed", "intercropped": "intercrop", "intercropping": "intercrop", "intercutting": "intercut", "interlaid": "interlay", "interlapped": "interlap", "interlapping": "interlap", "intermarried": "intermarry", "intermitted": "intermit", "intermitting": "intermit", "interpled": "interplead", "interred": "inter", "interring": "inter", "interstratified": "interstratify", "interwove": "interweave", "interwoven": "interweave", "intromitted": "intromit", "intromitting": "intromit", "inwove": "inweave", "inwoven": "inweave", "inwrapped": "inwrap", "inwrapping": "inwrap", "is": "be", "jabbed": "jab", "jabbing": "jab", "jagged": "jag", "jagging": "jag", "jammed": "jam", "jamming": "jam", "japanned": "japan", "japanning": "japan", "jarred": "jar", "jarring": "jar", "jellied": "jelly", "jellified": "jellify", "jemmied": "jemmy", "jerry-built": "jerry-build", "jetted": "jet", "jetting": "jet", "jewelled": "jewel", "jewelling": "jewel", "jibbed": "jib", "jibbing": "jib", "jigged": "jig", "jigging": "jig", "jimmied": "jimmy", "jitterbugged": "jitterbug", "jitterbugging": "jitterbug", "jobbed": "job", "jobbing": "job", "jog-trotted": "jog-trot", "jog-trotting": "jog-trot", "jogged": "jog", "jogging": "jog", "joined_battle": "join_battle", "joined_forces": "join_forces", "joining_battle": "join_battle", "joining_forces": "join_forces", "joins_battle": "join_battle", "joins_forces": "join_forces", "jollied": "jolly", "jollified": "jollify", "jotted": "jot", "jotting": "jot", "joy-ridden": "joy-ride", "joy-rode": "joy-ride", "joypopped": "joypop", "joypopping": "joypop", "jugged": "jug", "jugging": "jug", "jumped_off": "jump_off", "jumping_off": "jump_off", "jumps_off": "jump_off", "justified": "justify", "jutted": "jut", "jutting": "jut", "kenned": "ken", "kennelled": "kennel", "kennelling": "kennel", "kenning": "ken", "kent": "ken", "kept": "keep", "kernelled": "kernel", "kernelling": "kernel", "kidded": "kid", "kidding": "kid", "kidnapped": "kidnap", "kidnapping": "kidnap", "kipped": "kip", "kipping": "kip", "knapped": "knap", "knapping": "knap", "kneecapped": "kneecap", "kneecapping": "kneecap", "knelt": "kneel", "knew": "know", "knitted": "knit", "knitting": "knit", "knobbed": "knob", "knobbing": "knob", "knotted": "knot", "knotting": "knot", "known": "know", "ko'd": "ko", "ko'ing": "ko", "ko's": "ko", "labelled": "label", "labelling": "label", "laden": "lade", "ladyfied": "ladify", "ladyfies": "ladify", "ladyfying": "ladify", "lagged": "lag", "lagging": "lag", "laid": "lay", "lain": "lie", "lallygagged": "lallygag", "lallygagging": "lallygag", "lammed": "lam", "lamming": "lam", "lapidified": "lapidify", "lapped": "lap", "lapping": "lap", "laurelled": "laurel", "laurelling": "laurel", "lay": "lie", "layed_for": "lie_for", "laying_for": "lie_for", "lays_for": "lie_for", "leant": "lean", "leapfrogged": "leapfrog", "leapfrogging": "leapfrog", "leapt": "leap", "learnt": "learn", "leaves_undone": "leave_undone", "leaving_undone": "leave_undone", "led": "lead", "left": "leave", "left_undone": "leave_undone", "lent": "lend", "letting": "let", "levelled": "level", "levelling": "level", "levied": "levy", "libelled": "libel", "libelling": "libel", "lignified": "lignify", "lipped": "lip", "lipping": "lip", "liquefied": "liquefy", "liquified": "liquify", "lit": "light", "lobbed": "lob", "lobbied": "lobby", "lobbing": "lob", "logged": "log", "logging": "log", "looked_towards": "look_towards", "looking_towards": "look_towards", "looks_towards": "look_towards", "lopped": "lop", "lopping": "lop", "lost": "lose", "lotted": "lot", "lotting": "lot", "lugged": "lug", "lugging": "lug", "lullabied": "lullaby", "lying": "lie", "machine-gunned": "machine-gun", "machine-gunning": "machine-gun", "madded": "mad", "madding": "mad", "made": "make", "magnified": "magnify", "manned": "man", "manning": "man", "manumitted": "manumit", "manumitting": "manumit", "mapped": "map", "mapping": "map", "marcelled": "marcel", "marcelling": "marcel", "marred": "mar", "married": "marry", "marring": "mar", "marshalled": "marshal", "marshalling": "marshal", "marvelled": "marvel", "marvelling": "marvel", "matted": "mat", "matting": "mat", "meant": "mean", "medalled": "medal", "medalling": "medal", "met": "meet", "metalled": "metal", "metalling": "metal", "metrified": "metrify", "might": "may", "militated_against": "militate_against", "militates_against": "militate_against", "militating_against": "militate_against", "mimicked": "mimic", "mimicking": "mimic", "minified": "minify", "misapplied": "misapply", "misbecame": "misbecome", "miscarried": "miscarry", "misdealt": "misdeal", "misfitted": "misfit", "misfitting": "misfit", "misgave": "misgive", "misgiven": "misgive", "mishitting": "mishit", "mislaid": "mislay", "misled": "mislead", "mispled": "misplead", "misspelt": "misspell", "misspent": "misspend", "mistaken": "mistake", "mistook": "mistake", "misunderstood": "misunderstand", "mobbed": "mob", "mobbing": "mob", "modelled": "model", "modelling": "model", "modified": "modify", "mollified": "mollify", "molten": "melt", "mopped": "mop", "mopping": "mop", "mortified": "mortify", "mown": "mow", "mudded": "mud", "muddied": "muddy", "mudding": "mud", "mugged": "mug", "mugging": "mug", "multiplied": "multiply", "mummed": "mum", "mummified": "mummify", "mumming": "mum", "mutinied": "mutiny", "mystified": "mystify", "nabbed": "nab", "nabbing": "nab", "nagged": "nag", "nagging": "nag", "napped": "nap", "napping": "nap", "netted": "net", "netting": "net", "nibbed": "nib", "nibbing": "nib", "nickelled": "nickel", "nickelling": "nickel", "nid-nodded": "nid-nod", "nid-nodding": "nid-nod", "nidified": "nidify", "nigrified": "nigrify", "nipped": "nip", "nipping": "nip", "nitrified": "nitrify", "nodded": "nod", "nodding": "nod", "non-prossed": "non-pros", "non-prosses": "non-pros", "non-prossing": "non-pros", "nonplussed": "nonplus", "nonplusses": "nonplus", "nonplussing": "nonplus", "notified": "notify", "nullified": "nullify", "nutted": "nut", "nutting": "nut", "objectified": "objectify", "occupied": "occupy", "occurred": "occur", "occurring": "occur", "offsetting": "offset", "omitted": "omit", "omitting": "omit", "ossified": "ossify", "outbidden": "outbid", "outbidding": "outbid", "outbred": "outbreed", "outcried": "outcry", "outcropped": "outcrop", "outcropping": "outcrop", "outdid": "outdo", "outdone": "outdo", "outdrawn": "outdraw", "outdrew": "outdraw", "outfitted": "outfit", "outfitting": "outfit", "outfought": "outfight", "outgassed": "outgas", "outgasses": "outgas", "outgassing": "outgas",
  "outgeneralled": "outgeneral", "outgeneralling": "outgeneral", "outgone": "outgo", "outgrew": "outgrow", "outgrown": "outgrow", "outlaid": "outlay", "outmanned": "outman", "outmanning": "outman", "outputted": "output", "outputting": "output", "outran": "outrun", "outridden": "outride", "outrode": "outride", "outrunning": "outrun", "outshone": "outshine", "outshot": "outshoot", "outsold": "outsell", "outspanned": "outspan", "outspanning": "outspan", "outstood": "outstand", "outstripped": "outstrip", "outstripping": "outstrip", "outthought": "outthink", "outwent": "outgo", "outwitted": "outwit", "outwitting": "outwit", "outwore": "outwear", "outworn": "outwear", "overbidden": "overbid", "overbidding": "overbid", "overblew": "overblow", "overblown": "overblow", "overbore": "overbear", "overborne": "overbear", "overbuilt": "overbuild", "overcame": "overcome", "overcropped": "overcrop", "overcropping": "overcrop", "overdid": "overdo", "overdone": "overdo", "overdrawn": "overdraw", "overdrew": "overdraw", "overdriven": "overdrive", "overdrove": "overdrive", "overflew": "overfly", "overflown": "overflow", "overgrew": "overgrow", "overgrown": "overgrow", "overheard": "overhear", "overhung": "overhang", "overlaid": "overlay", "overlain": "overlie", "overlapped": "overlap", "overlapping": "overlap", "overlay": "overlie", "overlying": "overlie", "overmanned": "overman", "overmanning": "overman", "overpaid": "overpay", "overpast": "overpass", "overran": "overrun", "overridden": "override", "overrode": "override", "overrunning": "overrun", "oversaw": "oversee", "overseen": "oversee", "oversetting": "overset", "oversewn": "oversew", "overshot": "overshoot", "oversimplified": "oversimplify", "overslept": "oversleep", "oversold": "oversell", "overspent": "overspend", "overspilt": "overspill", "overstepped": "overstep", "overstepping": "overstep", "overtaken": "overtake", "overthrew": "overthrow", "overthrown": "overthrow", "overtook": "overtake", "overtopped": "overtop", "overtopping": "overtop", "overwound": "overwind", "overwritten": "overwrite", "overwrote": "overwrite", "pacified": "pacify", "padded": "pad", "padding": "pad", "paid": "pay", "palled": "pal", "palling": "pal", "palsied": "palsy", "pandied": "pandy", "panelled": "panel", "panelling": "panel", "panicked": "panic", "panicking": "panic", "panned": "pan", "panning": "pan", "parallelled": "parallel", "parallelling": "parallel", "parcelled": "parcel", "parcelling": "parcel", "parodied": "parody", "parried": "parry", "partaken": "partake", "partook": "partake", "pasquil": "pasquinade", "pasquilled": "pasquinade", "pasquilling": "pasquinade", "pasquils": "pasquinade", "patrolled": "patrol", "patrolling": "patrol", "patted": "pat", "patting": "pat", "pedalled": "pedal", "pedalling": "pedal", "pegged": "peg", "pegging": "peg", "pencilled": "pencil", "pencilling": "pencil", "penned": "pen", "penning": "pen", "pent": "pen", "pepped": "pep", "pepping": "pep", "permitted": "permit", "permitting": "permit", "personified": "personify", "petrified": "petrify", "petted": "pet", "pettifogged": "pettifog", "pettifogging": "pettifog", "petting": "pet", "phantasied": "phantasy", "photocopied": "photocopy", "photomapped": "photomap", "photomapping": "photomap", "photosetting": "photoset", "physicked": "physic", "physicking": "physic", "picnicked": "picnic", "picnicking": "picnic", "pigged": "pig", "pigging": "pig", "pilloried": "pillory", "pinch-hitting": "pinch-hit", "pinned": "pin", "pinning": "pin", "pipped": "pip", "pipping": "pip", "pistol-whipped": "pistol-whip", "pistol-whipping": "pistol-whip", "pistolled": "pistol", "pistolling": "pistol", "pitapatted": "pitapat", "pitapatting": "pitapat", "pitied": "pity", "pitted": "pit", "pitting": "pit", "planned": "plan", "planning": "plan", "platted": "plat", "platting": "plat", "played_a_part": "play_a_part", "playing_a_part": "play_a_part", "plays_a_part": "play_a_part", "pled": "plead", "plied": "ply", "plodded": "plod", "plodding": "plod", "plopped": "plop", "plopping": "plop", "plotted": "plot", "plotting": "plot", "plugged": "plug", "plugging": "plug", "podded": "pod", "podding": "pod", "pommelled": "pommel", "pommelling": "pommel", "popes": "popes", "popped": "pop", "popping": "pop", "potted": "pot", "potting": "pot", "preachified": "preachify", "precancelled": "precancel", "precancelling": "precancel", "preferred": "prefer", "preferring": "prefer", "preoccupied": "preoccupy", "prepaid": "prepay", "presignified": "presignify", "pretermitted": "pretermit", "pretermitting": "pretermit", "prettied": "pretty", "prettified": "prettify", "pried": "pry", "prigged": "prig", "prigging": "prig", "primmed": "prim", "primming": "prim", "prodded": "prod", "prodding": "prod", "programmed": "program", "programmes": "program", "programming": "program", "prologed": "prologue", "prologing": "prologue", "prologs": "prologue", "propelled": "propel", "propelling": "propel", "prophesied": "prophesy", "propped": "prop", "propping": "prop", "proven": "prove", "pubbed": "pub", "pubbing": "pub", "pugged": "pug", "pugging": "pug", "pummelled": "pummel", "pummelling": "pummel", "punned": "pun", "punning": "pun", "pupped": "pup", "pupping": "pup", "purified": "purify", "put-putted": "put-put", "put-putting": "put-put", "putrefied": "putrefy", "puttied": "putty", "putting": "put", "qualified": "qualify", "quantified": "quantify", "quarrelled": "quarrel", "quarrelling": "quarrel", "quarried": "quarry", "quartersawn": "quartersaw", "queried": "query", "quick-froze": "quick-freeze", "quick-frozen": "quick-freeze", "quickstepped": "quickstep", "quickstepping": "quickstep", "quipped": "quip", "quipping": "quip", "quitted": "quit", "quitting": "quit", "quizzed": "quiz", "quizzes": "quiz", "quizzing": "quiz", "ragged": "rag", "ragging": "rag", "rallied": "rally", "ramified": "ramify", "rammed": "ram", "ramming": "ram", "ran": "run", "rang": "ring", "rapped": "rap", "rappelled": "rappel", "rappelling": "rappel", "rapping": "rap", "rarefied": "rarefy", "ratified": "ratify", "ratted": "rat", "ratting": "rat", "ravelled": "ravel", "ravelling": "ravel", "razor-cutting": "razor-cut", "re-trod": "re-tread", "re-trodden": "re-tread", "rebelled": "rebel", "rebelling": "rebel", "rebuilt": "rebuild", "rebutted": "rebut", "rebutting": "rebut", "recapped": "recap", "recapping": "recap", "reclassified": "reclassify", "recommitted": "recommit", "recommitting": "recommit", "recopied": "recopy", "rectified": "rectify", "recurred": "recur", "recurring": "recur", "red": "red", "red-pencilled": "red-pencil", "red-pencilling": "red-pencil", "redded": "red", "redding": "red", "redid": "redo", "redone": "redo", "referred": "refer", "referring": "refer", "refitted": "refit", "refitting": "refit", "reft": "reave", "refuelled": "refuel", "refuelling": "refuel", "regretted": "regret", "regretting": "regret", "reheard": "rehear", "reified": "reify", "relied": "rely", "remade": "remake", "remarried": "remarry", "remitted": "remit", "remitting": "remit", "rent": "rend", "repaid": "repay", "repelled": "repel", "repelling": "repel", "replevied": "replevy", "replied": "reply", "repotted": "repot", "repotting": "repot", "reran": "rerun", "rerunning": "rerun", "resat": "resit", "resetting": "reset", "resewn": "resew", "resitting": "resit", "retaken": "retake", "rethought": "rethink", "retold": "retell", "retook": "retake", "retransmitted": "retransmit", "retransmitting": "retransmit", "retried": "retry", "retrofitted": "retrofit", "retrofitting": "retrofit", "retted": "ret", "retting": "ret", "reunified": "reunify", "revelled": "revel", "revelling": "revel", "revetted": "revet", "revetting": "revet", "revivified": "revivify", "revved": "rev", "revving": "rev", "rewound": "rewind", "rewritten": "rewrite", "rewrote": "rewrite", "ribbed": "rib", "ribbing": "rib", "ricochetted": "ricochet", "ricochetting": "ricochet", "ridded": "rid", "ridden": "ride", "ridding": "rid", "rigged": "rig", "rigging": "rig", "rigidified": "rigidify", "rimmed": "rim", "rimming": "rim", "ripped": "rip", "ripping": "rip", "risen": "rise", "rivalled": "rival", "rivalling": "rival", "riven": "rive", "robbed": "rob", "robbing": "rob", "rode": "ride", "rose": "rise", "rotted": "rot", "rotting": "rot", "rough-dried": "rough-dry", "rough-hewn": "rough-hew", "rove": "reeve", "rowelled": "rowel", "rowelling": "rowel", "rubbed": "rub", "rubbing": "rub", "rung": "ring", "running": "run", "rutted": "rut", "rutting": "rut", "saccharified": "saccharify", "sagged": "sag", "sagging": "sag", "said": "say", "salaried": "salary", "salified": "salify", "sallied": "sally", "sanctified": "sanctify", "sandbagged": "sandbag", "sandbagging": "sandbag", "sang": "sing", "sank": "sink", "saponified": "saponify", "sapped": "sap", "sapping": "sap", "sat": "sit", "satisfied": "satisfy", "savvied": "savvy", "saw": "see", "sawn": "saw", "scagged": "scag", "scagging": "scag", "scanned": "scan", "scanning": "scan", "scarified": "scarify", "scarred": "scar", "scarring": "scar", "scatted": "scat", "scatting": "scat", "scorified": "scorify", "scragged": "scrag", "scragging": "scrag", "scrammed": "scram", "scramming": "scram",
  "scrapped": "scrap", "scrapping": "scrap", "scried": "scry", "scrubbed": "scrub", "scrubbing": "scrub", "scrummed": "scrum", "scrumming": "scrum", "scudded": "scud", "scudding": "scud", "scummed": "scum", "scumming": "scum", "scurried": "scurry", "seed": "seed", "seen": "see", "sent": "send", "setting": "set", "sewn": "sew", "shagged": "shag", "shagging": "shag", "shaken": "shake", "shaken_hands": "shake_hands", "shakes_hands": "shake_hands", "shaking_hands": "shake_hands", "shammed": "sham", "shamming": "sham", "sharecropped": "sharecrop", "sharecropping": "sharecrop", "shat": "shit", "shaven": "shave", "shed": "shed", "shedding": "shed", "shellacked": "shellac", "shellacking": "shellac", "shent": "shend", "shewn": "shew", "shied": "shy", "shikarred": "shikar", "shikarring": "shikar", "shillyshallied": "shillyshally", "shimmed": "shim", "shimmied": "shimmy", "shimming": "shim", "shinned": "shin", "shinning": "shin", "shipped": "ship", "shipping": "ship", "shitted": "shit", "shitting": "shit", "shod": "shoe", "shone": "shine", "shook": "shake", "shook_hands": "shake_hands", "shopped": "shop", "shopping": "shop", "shot": "shoot", "shotgunned": "shotgun", "shotgunning": "shotgun", "shotted": "shot", "shotting": "shot", "shovelled": "shovel", "shovelling": "shovel", "shown": "show", "shrank": "shrink", "shredded": "shred", "shredding": "shred", "shrink-wrapped": "shrink-wrap", "shrink-wrapping": "shrink-wrap", "shrivelled": "shrivel", "shrivelling": "shrivel", "shriven": "shrive", "shrove": "shrive", "shrugged": "shrug", "shrugging": "shrug", "shrunk": "shrink", "shrunken": "shrink", "shunned": "shun", "shunning": "shun", "shutting": "shut", "sicked": "sic", "sicking": "sic", "sideslipped": "sideslip", "sideslipping": "sideslip", "sidestepped": "sidestep", "sidestepping": "sidestep", "sightsaw": "sightsee", "sightseen": "sightsee", "signalled": "signal", "signalling": "signal", "signified": "signify", "silicified": "silicify", "simplified": "simplify", "singing": "sing", "single-stepped": "single-step", "single-stepping": "single-step", "sinned": "sin", "sinning": "sin", "sipped": "sip", "sipping": "sip", "sitting": "sit", "skellied": "skelly", "skenned": "sken", "skenning": "sken", "sketted": "sket", "sketting": "sket", "ski'd": "ski", "skidded": "skid", "skidding": "skid", "skimmed": "skim", "skimming": "skim", "skin-popped": "skin-pop", "skin-popping": "skin-pop", "skinned": "skin", "skinning": "skin", "skinny-dipped": "skinny-dip", "skinny-dipping": "skinny-dip", "skipped": "skip", "skipping": "skip", "skivvied": "skivvy", "skydove": "skydive", "slabbed": "slab", "slabbing": "slab", "slagged": "slag", "slagging": "slag", "slain": "slay", "slammed": "slam", "slamming": "slam", "slapped": "slap", "slapping": "slap", "slatted": "slat", "slatting": "slat", "sledding": "sled", "slept": "sleep", "slew": "slay", "slid": "slide", "slidden": "slide", "slipped": "slip", "slipping": "slip", "slitting": "slit", "slogged": "slog", "slogging": "slog", "slopped": "slop", "slopping": "slop", "slotted": "slot", "slotting": "slot", "slugged": "slug", "slugging": "slug", "slummed": "slum", "slumming": "slum", "slung": "sling", "slunk": "slink", "slurred": "slur", "slurring": "slur", "smelt": "smell", "smit": "smite", "smitten": "smite", "smote": "smite", "smutted": "smut", "smutting": "smut", "snagged": "snag", "snagging": "snag", "snapped": "snap", "snapping": "snap", "snedded": "sned", "snedding": "sned", "snipped": "snip", "snipping": "snip", "snivelled": "snivel", "snivelling": "snivel", "snogged": "snog", "snogging": "snog", "snubbed": "snub", "snubbing": "snub", "snuck": "sneak", "snugged": "snug", "snugging": "snug", "sobbed": "sob", "sobbing": "sob", "sodded": "sod", "sodding": "sod", "soft-pedalled": "soft-pedal", "soft-pedalling": "soft-pedal", "sold": "sell", "solemnified": "solemnify", "solidified": "solidify", "soothsaid": "soothsay", "sopped": "sop", "sopping": "sop", "sought": "seek", "sown": "sow", "spagged": "spag", "spagging": "spag", "spancelled": "spancel", "spancelling": "spancel", "spanned": "span", "spanning": "span", "sparred": "spar", "sparring": "spar", "spat": "spit", "spatted": "spat", "spatting": "spat", "specified": "specify", "sped": "speed", "speechified": "speechify", "spellbound": "spellbind", "spelt": "spell", "spent": "spend", "spied": "spy", "spilt": "spill", "spin-dried": "spin-dry", "spinning": "spin", "spiralled": "spiral", "spiralling": "spiral", "spitted": "spit", "spitting": "spit", "splitting": "split", "spoilt": "spoil", "spoke": "speak", "spoken": "speak", "spoon-fed": "spoon-feed", "spotlit": "spotlight", "spotted": "spot", "spotting": "spot", "sprang": "spring", "sprigged": "sprig", "sprigging": "sprig", "sprung": "spring", "spudded": "spud", "spudding": "spud", "spun": "spin", "spurred": "spur", "spurring": "spur", "squatted": "squat", "squatting": "squat", "squibbed": "squib", "squibbing": "squib", "squidded": "squid", "squidding": "squid", "squilgee": "squeegee", "stabbed": "stab", "stabbing": "stab", "stall-fed": "stall-feed", "stank": "stink", "starred": "star", "starring": "star", "steadied": "steady", "stellified": "stellify", "stemmed": "stem", "stemming": "stem", "stems_from": "stem_from", "stencilled": "stencil", "stencilling": "stencil", "stepped": "step", "stepping": "step", "stetted": "stet", "stetting": "stet", "stied": "sty", "stilettoeing": "stiletto", "stirred": "stir", "stirring": "stir", "stole": "steal", "stolen": "steal", "stood": "stand", "stopped": "stop", "stopping": "stop", "storied": "story", "stotted": "stot", "stotting": "stot", "stove": "stave", "strapped": "strap", "strapping": "strap", "stratified": "stratify", "strewn": "strew", "stridden": "stride", "stripped": "strip", "stripping": "strip", "striven": "strive", "strode": "stride", "stropped": "strop", "stropping": "strop", "strove": "strive", "strown": "strow", "struck": "strike", "strummed": "strum", "strumming": "strum", "strung": "string", "strutted": "strut", "strutting": "strut", "stubbed": "stub", "stubbing": "stub", "stuck": "stick", "studded": "stud", "studding": "stud", "studied": "study", "stultified": "stultify", "stummed": "stum", "stumming": "stum", "stung": "sting", "stunk": "stink", "stunned": "stun", "stunning": "stun", "stupefied": "stupefy", "stymying": "stymie", "subbed": "sub", "subbing": "sub", "subjectified": "subjectify", "subletting": "sublet", "submitted": "submit", "submitting": "submit", "subtotalled": "subtotal", "subtotalling": "subtotal", "sullied": "sully", "sulphuretted": "sulphuret", "sulphuretting": "sulphuret", "summed": "sum", "summing": "sum", "sung": "sing", "sunk": "sink", "sunken": "sink", "sunned": "sun", "sunning": "sun", "supped": "sup", "supping": "sup", "supplied": "supply", "swabbed": "swab", "swabbing": "swab", "swagged": "swag", "swagging": "swag", "swam": "swim", "swapped": "swap", "swapping": "swap", "swatted": "swat", "swatting": "swat", "swept": "sweep", "swigged": "swig", "swigging": "swig", "swimming": "swim", "swivelled": "swivel", "swivelling": "swivel", "swollen": "swell", "swopped": "swap", "swopping": "swap", "swops": "swap", "swore": "swear", "sworn": "swear", "swotted": "swot", "swotting": "swot", "swum": "swim", "swung": "swing", "syllabified": "syllabify", "symbolled": "symbol", "symbolling": "symbol", "tabbed": "tab", "tabbing": "tab", "tagged": "tag", "tagging": "tag", "taken": "take", "taken_a_side": "take_a_side", "taken_pains": "take_pains", "taken_steps": "take_steps", "takes_a_side": "take_a_side", "takes_pains": "take_pains", "takes_steps": "take_steps", "taking_a_side": "take_a_side", "taking_pains": "take_pains", "taking_steps": "take_steps", "talcked": "talc", "talcking": "talc", "tallied": "tally", "tally-ho'd": "tally-ho", "tammied": "tammy", "tanned": "tan", "tanning": "tan", "tapped": "tap", "tapping": "tap", "tarred": "tar", "tarried": "tarry", "tarring": "tar", "tasselled": "tassel", "tasselling": "tassel", "tatted": "tat", "tatting": "tat", "taught": "teach", "taxis": "taxis", "taxying": "taxi", "teaselled": "teasel", "teaselling": "teasel", "tedded": "ted", "tedding": "ted", "tepefied": "tepefy", "terrified": "terrify", "testes": "testes", "testified": "testify", "thinking_the_world_of": "think_the_world_of", "thinks_the_world_of": "think_the_world_of", "thinned": "thin", "thinning": "thin", "thought": "think", "thought_the_world_of": "think_the_world_of", "threw": "throw", "threw_out": "throw_out", "thriven": "thrive", "throbbed": "throb", "throbbing": "throb", "throve": "thrive", "throwing_out": "throw_out", "thrown": "throw", "thrown_out": "throw_out", "throws_out": "throw_out", "thrummed": "thrum", "thrumming": "thrum", "thudded": "thud", "thudding": "thud", "tidied": "tidy", "tinned": "tin", "tinning": "tin", "tinselled": "tinsel", "tinselling": "tinsel", "tipped": "tip", "tipping": "tip", "tittupped": "tittup", "tittupping": "tittup", "toadied": "toady", "togged": "tog", "togging": "tog", "told": "tell", "took": "take", "took_a_side": "take_a_side", "took_pains": "take_pains", "took_steps": "take_steps", "topped": "top", "topping": "top", "tore": "tear",
  "torn": "tear", "torrefied": "torrefy", "torrify": "torrefy", "totalled": "total", "totalling": "total", "totted": "tot", "totting": "tot", "towelled": "towel", "towelling": "towel", "trafficked": "traffic", "trafficking": "traffic", "trameled": "trammel", "trameling": "trammel", "tramelled": "trammel", "tramelling": "trammel", "tramels": "trammel", "trammed": "tram", "tramming": "tram", "transferred": "transfer", "transferring": "transfer", "transfixt": "transfix", "tranship": "transship", "transhipped": "tranship", "transhipping": "tranship", "transmitted": "transmit", "transmitting": "transmit", "transmogrified": "transmogrify", "transshipped": "transship", "transshipping": "transship", "trapanned": "trapan", "trapanning": "trapan", "trapped": "trap", "trapping": "trap", "travelled": "travel", "travelling": "travel", "travestied": "travesty", "trekked": "trek", "trekking": "trek", "trepanned": "trepan", "trepanning": "trepan", "tried": "try", "trigged": "trig", "trigging": "trig", "trimmed": "trim", "trimming": "trim", "tripped": "trip", "tripping": "trip", "trod": "tread", "trodden": "tread", "trogged": "trog", "trogging": "trog", "trotted": "trot", "trotting": "trot", "trowelled": "trowel", "trowelling": "trowel", "tugged": "tug", "tugging": "tug", "tumefied": "tumefy", "tunned": "tun", "tunnelled": "tunnel", "tunnelling": "tunnel", "tunning": "tun", "tupped": "tup", "tupping": "tup", "tut-tutted": "tut-tut", "tut-tutting": "tut-tut", "twigged": "twig", "twigging": "twig", "twinned": "twin", "twinning": "twin", "twitted": "twit", "twitting": "twit", "tying": "tie", "typesetting": "typeset", "typewritten": "typewrite", "typewrote": "typewrite", "typified": "typify", "uglified": "uglify", "unbarred": "unbar", "unbarring": "unbar", "unbent": "unbend", "unbound": "unbind", "uncapped": "uncap", "uncapping": "uncap", "unclad": "unclothe", "unclogged": "unclog", "unclogging": "unclog", "underbidding": "underbid", "underbought": "underbuy", "undercutting": "undercut", "underfed": "underfeed", "undergirt": "undergird", "undergone": "undergo", "underlaid": "underlay", "underlain": "underlie", "underlay": "underlie", "underletting": "underlet", "underlying": "underlie", "underpaid": "underpay", "underpinned": "underpin", "underpinning": "underpin", "underpropped": "underprop", "underpropping": "underprop", "undersetting": "underset", "undershot": "undershoot", "undersold": "undersell", "understood": "understand", "understudied": "understudy", "undertaken": "undertake", "undertook": "undertake", "underwent": "undergo", "underwritten": "underwrite", "underwrote": "underwrite", "undid": "undo", "undone": "undo", "unfitted": "unfit", "unfitting": "unfit", "unfroze": "unfreeze", "unfrozen": "unfreeze", "unified": "unify", "unkennelled": "unkennel", "unkennelling": "unkennel", "unknitted": "unknit", "unknitting": "unknit", "unlaid": "unlay", "unlearnt": "unlearn", "unmade": "unmake", "unmanned": "unman", "unmanning": "unman", "unpegged": "unpeg", "unpegging": "unpeg", "unpinned": "unpin", "unpinning": "unpin", "unplugged": "unplug", "unplugging": "unplug", "unravelled": "unravel", "unravelling": "unravel", "unrigged": "unrig", "unrigging": "unrig", "unripped": "unrip", "unripping": "unrip", "unrove": "unreeve", "unsaid": "unsay", "unshipped": "unship", "unshipping": "unship", "unslung": "unsling", "unsnapped": "unsnap", "unsnapping": "unsnap", "unspoke": "unspeak", "unspoken": "unspeak", "unsteadied": "unsteady", "unstepped": "unstep", "unstepping": "unstep", "unstopped": "unstop", "unstopping": "unstop", "unstrung": "unstring", "unstuck": "unstick", "unswore": "unswear", "unsworn": "unswear", "untaught": "unteach", "unthought": "unthink", "untidied": "untidy", "untrod": "untread", "untrodden": "untread", "untying": "untie", "unwound": "unwind", "unwrapped": "unwrap", "unwrapping": "unwrap", "unzipped": "unzip", "unzipping": "unzip", "upbuilt": "upbuild", "upheld": "uphold", "uphove": "upheave", "upped": "up", "uppercutting": "uppercut", "upping": "up", "uprisen": "uprise", "uprose": "uprise", "upsetting": "upset", "upsprang": "upspring", "upsprung": "upspring", "upswept": "upsweep", "upswollen": "upswell", "upswung": "upswing", "vagged": "vag", "vagging": "vag", "varied": "vary", "vatted": "vat", "vatting": "vat", "verbified": "verbify", "verified": "verify", "versified": "versify", "vetted": "vet", "vetting": "vet", "victualled": "victual", "victualling": "victual", "vilified": "vilify", "vitrified": "vitrify", "vitriolled": "vitriol", "vitriolling": "vitriol", "vivified": "vivify", "vying": "vie", "wadded": "wad", "waddied": "waddy", "wadding": "wad", "wadsetted": "wadset", "wadsetting": "wadset", "wagged": "wag", "wagging": "wag", "wanned": "wan", "wanning": "wan", "warred": "war", "warring": "war", "was": "be", "water-ski'd": "water-ski", "waylaid": "waylay", "wearied": "weary", "weatherstripped": "weatherstrip", "weatherstripping": "weatherstrip", "webbed": "web", "webbing": "web", "wedded": "wed", "wedding": "wed", "weed": "weed", "went": "go", "went_deep": "go_deep", "wept": "weep", "were": "be", "wetted": "wet", "wetting": "wet", "whammed": "wham", "whamming": "wham", "whapped": "whap", "whapping": "whap", "whetted": "whet", "whetting": "whet", "whinnied": "whinny", "whipped": "whip", "whipping": "whip", "whipsawn": "whipsaw", "whirred": "whir", "whirring": "whir", "whistle-stopped": "whistle-stop", "whistle-stopping": "whistle-stop", "whizzed": "whiz", "whizzes": "whiz", "whizzing": "whiz", "whopped": "whop", "whopping": "whop", "wigged": "wig", "wigging": "wig", "wigwagged": "wigwag", "wigwagging": "wigwag", "wildcatted": "wildcat", "wildcatting": "wildcat", "window-shopped": "window-shop", "window-shopping": "window-shop", "winning": "win", "winterfed": "winterfeed", "wiredrawn": "wiredraw", "wiredrew": "wiredraw", "withdrawn": "withdraw", "withdrew": "withdraw", "withheld": "withhold", "withstood": "withstand", "woke": "wake", "woken": "wake", "won": "win", "wonned": "won", "wonning": "won", "wore": "wear", "worn": "wear", "worried": "worry", "worshipped": "worship", "worshipping": "worship", "wound": "wind", "wove": "weave", "woven": "weave", "wrapped": "wrap", "wrapping": "wrap", "wried": "wry", "written": "write", "wrote": "write", "wrought": "work", "wrung": "wring", "yakked": "yak", "yakking": "yak", "yapped": "yap", "yapping": "yap", "ycleped": "clepe", "yclept": "clepe", "yenned": "yen", "yenning": "yen", "yodelled": "yodel", "yodelling": "yodel", "zapped": "zap", "zapping": "zap", "zigzagged": "zigzag", "zigzagging": "zigzag", "zipped": "zip", "zipping": "zip"};
const RE = Util.RE;
const CONS = "[bcdfghjklmnpqrstvwxyz]";
const MODALS = ["shall", "would", "may", "might", "ought", "should"];
const VERBAL_PREFIX = "((be|with|pre|un|over|re|mis|under|out|up|fore|for|counter|co|sub)(-?))";
const ANY_STEM_RE = "^((\\w+)(-\\w+)*)(\\s((\\w+)(-\\w+)*))*$";

const ING_FORM_RULES = [
  RE(CONS + "ie$", 2, "ying", 1),
  RE("[^ie]e$", 1, "ing", 1),
  RE("^trek$", 1, "cking"),
  RE("^bring$", 0, "ing"),
  RE("^be$", 0, "ing"),
  RE("^age$", 1, "ing"),
  RE("(ibe)$", 1, "ing", 0)
];

const PAST_PARTICIPLE_RULES = [

  RE(CONS + "y$", 1, "ied", 1),
  RE("^" + VERBAL_PREFIX + "?(bring)$", 3, "ought"),
  RE("^" + VERBAL_PREFIX + "?(take|rise|strew|blow|draw|drive|know|give|" + "arise|gnaw|grave|grow|hew|know|mow|see|sew|throw|prove|saw|quartersaw|" + "partake|sake|shake|shew|show|shrive|sightsee|strew|strive)$",
    0, "n"),
  RE("^" + VERBAL_PREFIX + "?[gd]o$", 0, "ne", 1),
  RE("^(beat|eat|be|fall)$", 0, "en"),
  RE("^(have)$", 2, "d"),
  RE("^" + VERBAL_PREFIX + "?bid$", 0, "den"),
  RE("^" + VERBAL_PREFIX + "?[lps]ay$", 1, "id", 1),
  RE("^behave$", 0, "d"),
  RE("^" + VERBAL_PREFIX + "?have$", 2, "d", 1),
  RE("(sink|slink|drink|shrink|stink)$", 3, "unk"),
  RE("(([sfc][twlp]?r?|w?r)ing|hang)$", 3, "ung"),
  RE("^" + VERBAL_PREFIX + "?(shear|swear|bear|wear|tear)$", 3, "orn"),
  RE("^" + VERBAL_PREFIX + "?(bend|spend|send|lend)$", 1, "t"),
  RE("^" + VERBAL_PREFIX + "?(weep|sleep|sweep|creep|keep$)$", 2, "pt"),
  RE("^" + VERBAL_PREFIX + "?(sell|tell)$", 3, "old"),
  RE("^(outfight|beseech)$", 4, "ought"),
  RE("^bethink$", 3, "ought"),
  RE("^buy$", 2, "ought"),
  RE("^aby$", 1, "ought"),
  RE("^tarmac", 0, "ked"),
  RE("^abide$", 3, "ode"),
  RE("^" + VERBAL_PREFIX + "?(speak|(a?)wake|break)$", 3, "oken"),
  RE("^backbite$", 1, "ten"),
  RE("^backslide$", 1, "den"),
  RE("^become$", 3, "ame"),
  RE("^begird$", 3, "irt"),
  RE("^outlie$", 2, "ay"),
  RE("^rebind$", 3, "ound"),
  RE("^relay$", 2, "aid"),
  RE("^shit$", 3, "hat"),
  RE("^bereave$", 4, "eft"),
  RE("^foreswear$", 3, "ore"),
  RE("^overfly$", 1, "own"),
  RE("^beget$", 2, "otten"),
  RE("^begin$", 3, "gun"),
  RE("^bestride$", 1, "den"),
  RE("^bite$", 1, "ten"),
  RE("^bleed$", 4, "led"),
  RE("^bog-down$", 5, "ged-down"),
  RE("^bind$", 3, "ound"),
  RE("^(.*)feed$", 4, "fed"),
  RE("^breed$", 4, "red"),
  RE("^brei", 0, "d"),
  RE("^bring$", 3, "ought"),
  RE("^build$", 1, "t"),
  RE("^come", 0, ""),
  RE("^catch$", 3, "ught"),
  RE("^chivy$", 1, "vied"),
  RE("^choose$", 3, "sen"),
  RE("^cleave$", 4, "oven"),
  RE("^crossbreed$", 4, "red"),
  RE("^deal", 0, "t"),
  RE("^dow$", 1, "ught"),
  RE("^dream", 0, "t"),
  RE("^dig$", 3, "dug"),
  RE("^dwell$", 2, "lt"),
  RE("^enwind$", 3, "ound"),
  RE("^feel$", 3, "elt"),
  RE("^flee$", 2, "ed"),
  RE("^floodlight$", 5, "lit"),
  RE("^fly$", 1, "own"),
  RE("^forbear$", 3, "orne"),
  RE("^forerun$", 3, "ran"),
  RE("^forget$", 2, "otten"),
  RE("^fight$", 4, "ought"),
  RE("^find$", 3, "ound"),
  RE("^freeze$", 4, "ozen"),
  RE("^gainsay$", 2, "aid"),
  RE("^gin$", 3, "gan"),
  RE("^gen-up$", 3, "ned-up"),
  RE("^ghostwrite$", 1, "ten"),
  RE("^get$", 2, "otten"),
  RE("^grind$", 3, "ound"),
  RE("^hacksaw", 0, "n"),
  RE("^hear", 0, "d"),
  RE("^hold$", 3, "eld"),
  RE("^hide$", 1, "den"),
  RE("^honey$", 2, "ied"),
  RE("^inbreed$", 4, "red"),
  RE("^indwell$", 3, "elt"),
  RE("^interbreed$", 4, "red"),
  RE("^interweave$", 4, "oven"),
  RE("^inweave$", 4, "oven"),
  RE("^ken$", 2, "ent"),
  RE("^kneel$", 3, "elt"),
  RE("^lie$", 2, "ain"),
  RE("^leap$", 0, "t"),
  RE("^learn$", 0, "t"),
  RE("^lead$", 4, "led"),
  RE("^leave$", 4, "eft"),
  RE("^light$", 5, "lit"),
  RE("^lose$", 3, "ost"),
  RE("^make$", 3, "ade"),
  RE("^mean", 0, "t"),
  RE("^meet$", 4, "met"),
  RE("^misbecome$", 3, "ame"),
  RE("^misdeal$", 2, "alt"),
  RE("^mishear$", 1, "d"),
  RE("^mislead$", 4, "led"),
  RE("^misunderstand$", 3, "ood"),
  RE("^outbreed$", 4, "red"),
  RE("^outrun$", 3, "ran"),
  RE("^outride$", 1, "den"),
  RE("^outshine$", 3, "one"),
  RE("^outshoot$", 4, "hot"),
  RE("^outstand$", 3, "ood"),
  RE("^outthink$", 3, "ought"),
  RE("^outgo$", 2, "went"),
  RE("^overbear$", 3, "orne"),
  RE("^overbuild$", 3, "ilt"),
  RE("^overcome$", 3, "ame"),
  RE("^overfly$", 2, "lew"),
  RE("^overhear$", 2, "ard"),
  RE("^overlie$", 2, "ain"),
  RE("^overrun$", 3, "ran"),
  RE("^override$", 1, "den"),
  RE("^overshoot$", 4, "hot"),
  RE("^overwind$", 3, "ound"),
  RE("^overwrite$", 1, "ten"),
  RE("^plead$", 2, "d"),
  RE("^rebuild$", 3, "ilt"),
  RE("^red$", 3, "red"),
  RE("^redo$", 1, "one"),
  RE("^remake$", 3, "ade"),
  RE("^resit$", 3, "sat"),
  RE("^rethink$", 3, "ought"),
  RE("^rewind$", 3, "ound"),
  RE("^rewrite$", 1, "ten"),
  RE("^ride$", 1, "den"),
  RE("^reeve$", 4, "ove"),
  RE("^sit$", 3, "sat"),
  RE("^shoe$", 3, "hod"),
  RE("^shine$", 3, "one"),
  RE("^shoot$", 4, "hot"),
  RE("^ski$", 1, "i'd"),
  RE("^slide$", 1, "den"),
  RE("^smite$", 1, "ten"),
  RE("^seek$", 3, "ought"),
  RE("^spit$", 3, "pat"),
  RE("^speed$", 4, "ped"),
  RE("^spellbind$", 3, "ound"),
  RE("^spoil$", 2, "ilt"),
  RE("^spotlight$", 5, "lit"),
  RE("^spin$", 3, "pun"),
  RE("^steal$", 3, "olen"),
  RE("^stand$", 3, "ood"),
  RE("^stave$", 3, "ove"),
  RE("^stride$", 1, "den"),
  RE("^strike$", 3, "uck"),
  RE("^stick$", 3, "uck"),
  RE("^swell$", 3, "ollen"),
  RE("^swim$", 3, "wum"),
  RE("^teach$", 4, "aught"),
  RE("^think$", 3, "ought"),
  RE("^tread$", 3, "odden"),
  RE("^typewrite$", 1, "ten"),
  RE("^unbind$", 3, "ound"),
  RE("^underbuy$", 2, "ought"),
  RE("^undergird$", 3, "irt"),
  RE("^undergo$", 1, "one"),
  RE("^underlie$", 2, "ain"),
  RE("^undershoot$", 4, "hot"),
  RE("^understand$", 3, "ood"),
  RE("^unfreeze$", 4, "ozen"),
  RE("^unlearn", 0, "t"),
  RE("^unmake$", 3, "ade"),
  RE("^unreeve$", 4, "ove"),
  RE("^unstick$", 3, "uck"),
  RE("^unteach$", 4, "aught"),
  RE("^unthink$", 3, "ought"),
  RE("^untread$", 3, "odden"),
  RE("^unwind$", 3, "ound"),
  RE("^upbuild$", 1, "t"),
  RE("^uphold$", 3, "eld"),
  RE("^upheave$", 4, "ove"),
  RE("^waylay$", 2, "ain"),
  RE("^whipsaw$", 2, "awn"),
  RE("^withhold$", 3, "eld"),
  RE("^withstand$", 3, "ood"),
  RE("^win$", 3, "won"),
  RE("^wind$", 3, "ound"),
  RE("^weave$", 4, "oven"),
  RE("^write$", 1, "ten"),
  RE("^trek$", 1, "cked"),
  RE("^ko$", 1, "o'd"),
  RE("^win$", 2, "on"),

  RE("e$", 0, "d", 1),

  // Null past forms
  RE("^" + VERBAL_PREFIX + "?(cast|thrust|typeset|cut|bid|upset|wet|bet|cut|hit|hurt|inset|let|cost|burst|beat|beset|set|upset|hit|offset|put|quit|" + "wed|typeset|wed|spread|split|slit|read|run|rerun|shut|shed)$", 0)
];

const PAST_RULES = [
  RE("^(reduce)$", 0, "d"),
  RE("^" + VERBAL_PREFIX + "?[pls]ay$", 1, "id", 1),
  RE(CONS + "y$", 1, "ied", 1),
  RE("^(fling|cling|hang)$", 3, "ung"),
  RE("(([sfc][twlp]?r?|w?r)ing)$", 3, "ang", 1),
  RE("^" + VERBAL_PREFIX + "?(bend|spend|send|lend|spend)$", 1, "t"),
  RE("^" + VERBAL_PREFIX + "?lie$", 2, "ay"),
  RE("^" + VERBAL_PREFIX + "?(weep|sleep|sweep|creep|keep)$", 2, "pt"),
  RE("^" + VERBAL_PREFIX + "?(sell|tell)$", 3, "old"),
  RE("^" + VERBAL_PREFIX + "?do$", 1, "id"),
  RE("^" + VERBAL_PREFIX + "?dig$", 2, "ug"),
  RE("^behave$", 0, "d"),
  RE("^(have)$", 2, "d"),
  RE("(sink|drink)$", 3, "ank"),
  RE("^swing$", 3, "ung"),
  RE("^be$", 2, "was"),
  RE("^outfight$", 4, "ought"),
  RE("^tarmac", 0, "ked"),
  RE("^abide$", 3, "ode"),
  RE("^aby$", 1, "ought"),
  RE("^become$", 3, "ame"),
  RE("^begird$", 3, "irt"),
  RE("^outlie$", 2, "ay"),
  RE("^rebind$", 3, "ound"),
  RE("^shit$", 3, "hat"),
  RE("^bereave$", 4, "eft"),
  RE("^foreswear$", 3, "ore"),
  RE("^bename$", 3, "empt"),
  RE("^beseech$", 4, "ought"),
  RE("^bethink$", 3, "ought"),
  RE("^bleed$", 4, "led"),
  RE("^bog-down$", 5, "ged-down"),
  RE("^buy$", 2, "ought"),
  RE("^bind$", 3, "ound"),
  RE("^(.*)feed$", 4, "fed"),
  RE("^breed$", 4, "red"),
  RE("^brei$", 2, "eid"),
  RE("^bring$", 3, "ought"),
  RE("^build$", 3, "ilt"),
  RE("^come$", 3, "ame"),
  RE("^catch$", 3, "ught"),
  RE("^clothe$", 5, "lad"),
  RE("^crossbreed$", 4, "red"),
  RE("^deal$", 2, "alt"),
  RE("^dow$", 1, "ught"),
  RE("^dream$", 2, "amt"),
  RE("^dwell$", 3, "elt"),
  RE("^enwind$", 3, "ound"),
  RE("^feel$", 3, "elt"),
  RE("^flee$", 3, "led"),
  RE("^floodlight$", 5, "lit"),
  RE("^arise$", 3, "ose"),
  RE("^eat$", 3, "ate"),
  RE("^backbite$", 4, "bit"),
  RE("^backslide$", 4, "lid"),
  RE("^befall$", 3, "ell"),
  RE("^begin$", 3, "gan"),
  RE("^beget$", 3, "got"),
  RE("^behold$", 3, "eld"),
  RE("^bespeak$", 3, "oke"),
  RE("^bestride$", 3, "ode"),
  RE("^betake$", 3, "ook"),
  RE("^bite$", 4, "bit"),
  RE("^blow$", 3, "lew"),
  RE("^bear$", 3, "ore"),
  RE("^break$", 3, "oke"),
  RE("^choose$", 4, "ose"),
  RE("^cleave$", 4, "ove"),
  RE("^countersink$", 3, "ank"),
  RE("^drink$", 3, "ank"),
  RE("^draw$", 3, "rew"),
  RE("^drive$", 3, "ove"),
  RE("^fall$", 3, "ell"),
  RE("^fly$", 2, "lew"),
  RE("^flyblow$", 3, "lew"),
  RE("^forbid$", 2, "ade"),
  RE("^forbear$", 3, "ore"),
  RE("^foreknow$", 3, "new"),
  RE("^foresee$", 3, "saw"),
  RE("^forespeak$", 3, "oke"),
  RE("^forego$", 2, "went"),
  RE("^forgive$", 3, "ave"),
  RE("^forget$", 3, "got"),
  RE("^forsake$", 3, "ook"),
  RE("^forspeak$", 3, "oke"),
  RE("^forswear$", 3, "ore"),
  RE("^forgo$", 2, "went"),
  RE("^fight$", 4, "ought"),
  RE("^find$", 3, "ound"),
  RE("^freeze$", 4, "oze"),
  RE("^give$", 3, "ave"),
  RE("^geld$", 3, "elt"),
  RE("^gen-up$", 3, "ned-up"),
  RE("^ghostwrite$", 3, "ote"),
  RE("^get$", 3, "got"),
  RE("^grow$", 3, "rew"),
  RE("^grind$", 3, "ound"),
  RE("^hear$", 2, "ard"),
  RE("^hold$", 3, "eld"),
  RE("^hide$", 4, "hid"),
  RE("^honey$", 2, "ied"),
  RE("^inbreed$", 4, "red"),
  RE("^indwell$", 3, "elt"),
  RE("^interbreed$", 4, "red"),
  RE("^interweave$", 4, "ove"),
  RE("^inweave$", 4, "ove"),
  RE("^ken$", 2, "ent"),
  RE("^kneel$", 3, "elt"),
  RE("^^know$$", 3, "new"),
  RE("^leap$", 2, "apt"),
  RE("^learn$", 2, "rnt"),
  RE("^lead$", 4, "led"),
  RE("^leave$", 4, "eft"),
  RE("^light$", 5, "lit"),
  RE("^lose$", 3, "ost"),
  RE("^make$", 3, "ade"),
  RE("^mean$", 2, "ant"),
  RE("^meet$", 4, "met"),
  RE("^misbecome$", 3, "ame"),
  RE("^misdeal$", 2, "alt"),
  RE("^misgive$", 3, "ave"),
  RE("^mishear$", 2, "ard"),
  RE("^mislead$", 4, "led"),
  RE("^mistake$", 3, "ook"),
  RE("^misunderstand$", 3, "ood"),
  RE("^outbreed$", 4, "red"),
  RE("^outgrow$", 3, "rew"),
  RE("^outride$", 3, "ode"),
  RE("^outshine$", 3, "one"),
  RE("^outshoot$", 4, "hot"),
  RE("^outstand$", 3, "ood"),
  RE("^outthink$", 3, "ought"),
  RE("^outgo$", 2, "went"),
  RE("^outwear$", 3, "ore"),
  RE("^overblow$", 3, "lew"),
  RE("^overbear$", 3, "ore"),
  RE("^overbuild$", 3, "ilt"),
  RE("^overcome$", 3, "ame"),
  RE("^overdraw$", 3, "rew"),
  RE("^overdrive$", 3, "ove"),
  RE("^overfly$", 2, "lew"),
  RE("^overgrow$", 3, "rew"),
  RE("^overhear$", 2, "ard"),
  RE("^overpass$", 3, "ast"),
  RE("^override$", 3, "ode"),
  RE("^oversee$", 3, "saw"),
  RE("^overshoot$", 4, "hot"),
  RE("^overthrow$", 3, "rew"),
  RE("^overtake$", 3, "ook"),
  RE("^overwind$", 3, "ound"),
  RE("^overwrite$", 3, "ote"),
  RE("^partake$", 3, "ook"),
  RE("^" + VERBAL_PREFIX + "?run$", 2, "an"),
  RE("^ring$", 3, "ang"),
  RE("^rebuild$", 3, "ilt"),
  RE("^red"),
  RE("^reave$", 4, "eft"),
  RE("^remake$", 3, "ade"),
  RE("^resit$", 3, "sat"),
  RE("^rethink$", 3, "ought"),
  RE("^retake$", 3, "ook"),
  RE("^rewind$", 3, "ound"),
  RE("^rewrite$", 3, "ote"),
  RE("^ride$", 3, "ode"),
  RE("^rise$", 3, "ose"),
  RE("^reeve$", 4, "ove"),
  RE("^sing$", 3, "ang"),
  RE("^sink$", 3, "ank"),
  RE("^sit$", 3, "sat"),
  RE("^see$", 3, "saw"),
  RE("^shoe$", 3, "hod"),
  RE("^shine$", 3, "one"),
  RE("^shake$", 3, "ook"),
  RE("^shoot$", 4, "hot"),
  RE("^shrink$", 3, "ank"),
  RE("^shrive$", 3, "ove"),
  RE("^sightsee$", 3, "saw"),
  RE("^ski$", 1, "i'd"),
  RE("^skydive$", 3, "ove"),
  RE("^slay$", 3, "lew"),
  RE("^slide$", 4, "lid"),
  RE("^slink$", 3, "unk"),
  RE("^smite$", 4, "mit"),
  RE("^seek$", 3, "ought"),
  RE("^spit$", 3, "pat"),
  RE("^speed$", 4, "ped"),
  RE("^spellbind$", 3, "ound"),
  RE("^spoil$", 2, "ilt"),
  RE("^speak$", 3, "oke"),
  RE("^spotlight$", 5, "lit"),
  RE("^spring$", 3, "ang"),
  RE("^spin$", 3, "pun"),
  RE("^stink$", 3, "ank"),
  RE("^steal$", 3, "ole"),
  RE("^stand$", 3, "ood"),
  RE("^stave$", 3, "ove"),
  RE("^stride$", 3, "ode"),
  RE("^strive$", 3, "ove"),
  RE("^strike$", 3, "uck"),
  RE("^stick$", 3, "uck"),
  RE("^swim$", 3, "wam"),
  RE("^swear$", 3, "ore"),
  RE("^teach$", 4, "aught"),
  RE("^think$", 3, "ought"),
  RE("^throw$", 3, "rew"),
  RE("^take$", 3, "ook"),
  RE("^tear$", 3, "ore"),
  RE("^transship$", 4, "hip"),
  RE("^tread$", 4, "rod"),
  RE("^typewrite$", 3, "ote"),
  RE("^unbind$", 3, "ound"),
  RE("^unclothe$", 5, "lad"),
  RE("^underbuy$", 2, "ought"),
  RE("^undergird$", 3, "irt"),
  RE("^undershoot$", 4, "hot"),
  RE("^understand$", 3, "ood"),
  RE("^undertake$", 3, "ook"),
  RE("^undergo$", 2, "went"),
  RE("^underwrite$", 3, "ote"),
  RE("^unfreeze$", 4, "oze"),
  RE("^unlearn$", 2, "rnt"),
  RE("^unmake$", 3, "ade"),
  RE("^unreeve$", 4, "ove"),
  RE("^unspeak$", 3, "oke"),
  RE("^unstick$", 3, "uck"),
  RE("^unswear$", 3, "ore"),
  RE("^unteach$", 4, "aught"),
  RE("^unthink$", 3, "ought"),
  RE("^untread$", 4, "rod"),
  RE("^unwind$", 3, "ound"),
  RE("^upbuild$", 3, "ilt"),
  RE("^uphold$", 3, "eld"),
  RE("^upheave$", 4, "ove"),
  RE("^uprise$", 3, "ose"),
  RE("^upspring$", 3, "ang"),
  RE("^go$", 2, "went"),
  RE("^wiredraw$", 3, "rew"),
  RE("^withdraw$", 3, "rew"),
  RE("^withhold$", 3, "eld"),
  RE("^withstand$", 3, "ood"),
  RE("^wake$", 3, "oke"),
  RE("^win$", 3, "won"),
  RE("^wear$", 3, "ore"),
  RE("^wind$", 3, "ound"),
  RE("^weave$", 4, "ove"),
  RE("^write$", 3, "ote"),
  RE("^trek$", 1, "cked"),
  RE("^ko$", 1, "o'd"),
  RE("^bid", 2, "ade"),
  RE("^win$", 2, "on"),
  RE("^swim", 2, "am"),
  RE("e$", 0, "d", 1),

  // Null past forms
  RE("^" + VERBAL_PREFIX + "?(cast|thrust|typeset|cut|bid|upset|wet|bet|cut|hit|hurt|inset|" + "let|cost|burst|beat|beset|set|upset|offset|put|quit|wed|typeset|" + "wed|spread|split|slit|read|run|shut|shed|lay)$", 0)
];

const PRESENT_RULES = [
  RE("^aby$", 0, "es"),
  RE("^bog-down$", 5, "s-down"),
  RE("^chivy$", 1, "vies"),
  RE("^gen-up$", 3, "s-up"),
  RE("^prologue$", 3, "gs"),
  RE("^picknic$", 0, "ks"),
  RE("^ko$", 0, "'s"),
  RE("[osz]$", 0, "es", 1),
  RE("^have$", 2, "s"),
  RE(CONS + "y$", 1, "ies", 1),
  RE("^be$", 2, "is"),
  RE("([zsx]|ch|sh)$", 0, "es", 1)
];

const VERB_CONS_DOUBLING = ["abat", "abet", "abhor", "abut", "accur", "acquit", "adlib",
  "admit", "aerobat", "aerosol", "allot", "alot", "anagram",
  "annul", "appal", "apparel", "armbar", "aver", "babysit", "airdrop", "appal",
  "blackleg", "bobsled", "bur", "chum", "confab", "counterplot", "dib",
  "backdrop", "backfil", "backflip", "backlog", "backpedal", "backslap",
  "backstab", "bag", "balfun", "ballot", "ban", "bar", "barbel", "bareleg",
  "barrel", "bat", "bayonet", "becom", "bed", "bedevil", "bedwet",
  "befit", "befog", "beg", "beget", "begin", "bejewel", "benefit",
  "beset", "besot", "bet", "bevel", "bewig",
  "bib", "bid", "billet", "bin", "bip", "bit", "bitmap", "blab", "blag", "blam",
  "blan", "blat", "bles", "blim", "blip", "blob", "bloodlet", "blot", "blub",
  "blur", "bob", "bog", "booby-trap", "boobytrap", "booksel",
  "bootleg", "bop", "bot", "bowel", "bracket", "brag", "brig", "brim", "bud",
  "buffet", "bug", "bullshit", "bum", "bun", "bus", "but", "cab", "cabal", "cam",
  "can", "cancel", "cap", "caravan", "carburet", "carnap", "carol",
  "carpetbag", "castanet", "cat", "catcal", "catnap", "chanel",
  "channel", "chap", "char", "chat", "chin", "chip", "chir",
  "chirrup", "chisel", "chop", "chug", "chur", "clam", "clap", "clearcut",
  "clip", "clodhop", "clog", "clop", "closet", "clot", "club", "co-star", "cob", "cobweb", "cod", "coif",
  "com", "combat", "comit", "commit", "compel", "con", "concur", "confer",
  "confiscat", "control", "cop", "coquet", "coral", "corral", "cosset",
  "cotransmit", "councel", "council", "counsel", "court-martial", "crab", "cram",
  "crap", "crib", "crop", "crossleg", "cub", "cudgel", "cum", "cun", "cup",
  "cut", "dab", "dag", "dam", "dan", "dap", "daysit", "deadpan",
  "debag", "debar", "log", "decommit", "decontrol", "defer", "defog", "deg",
  "degas", "deinstal", "demur", "den", "denet", "depig",
  "depip", "depit", "der", "deskil", "deter", "devil", "diagram", "dial", "dig",
  "dim", "din", "dip", "disbar", "disbud", "discomfit", "disembed", "disembowel",
  "dishevel", "disinter", "dispel", "distil", "dog", "dognap",
  "don", "doorstep", "dot", "dowel", "drag", "drat", "driftnet", "distil",
  "egotrip", "enrol", "enthral", "extol", "fulfil", "gaffe", "idyl",
  "inspan", "drip", "drivel", "drop", "drub", "drug", "drum", "dub", "duel",
  "dun", "earwig", "eavesdrop", "ecolabel",
  "embed", "emit", "enamel", "endlabel", "endtrim",
  "enrol", "enthral", "entrap", "enwrap", "equal", "equip",
  "exaggerat", "excel", "expel", "extol", "fag", "fan", "farewel", "fat",
  "featherbed", "feget", "fet", "fib", "fig", "fin", "fingerspel", "fingertip",
  "fit", "flab", "flag", "flap", "flip", "flit", "flog", "flop", "fob", "focus",
  "fog", "footbal", "footslog", "fop", "forbid", "forget", "format",
  "fortunetel", "fot", "foxtrot", "frag", "freefal", "fret", "frig", "frip",
  "frog", "frug", "fuel", "fufil", "fulfil", "fullyfit", "fun", "funnel", "fur",
  "furpul", "gab", "gad", "gag", "gam", "gambol", "gap", "garot", "garrot",
  "gas", "gat", "gel", "gen", "get", "giftwrap", "gig", "gimbal", "gin", "glam",
  "glenden", "glendin", "globetrot", "glug", "glut", "gob", "goldpan", "goostep",
  "gossip", "grab", "gravel", "grid", "grin", "grip", "grit",
  "grovel", "grub", "gum", "gun", "gunrun", "gut", "gyp", "haircut", "ham",
  "han", "handbag", "handicap", "handknit", "handset", "hap", "hareleg", "hat",
  "headbut", "hedgehop", "hem", "hen", "hiccup", "highwal", "hip", "hit",
  "hobnob", "hog", "hop", "horsewhip", "hostel", "hot", "hotdog", "hovel", "hug",
  "hum", "humbug", "hup", "hut", "illfit", "imbed",
  "impel", "imperil", "incur", "infer", "infil",
  "inflam", "initial", "input", "inset", "instil", "inter", "interbed",
  "intercrop", "intercut", "interfer", "instal", "instil", "intermit",
  "jug", "mousse", "mud", "jab", "jag",
  "jam", "jar", "jawdrop", "jet", "jetlag", "jewel", "jib", "jig", "jitterbug",
  "job", "jog", "jot", "jut", "ken", "kennel", "kid", "kidnap",
  "kip", "kit", "knap", "kneecap", "knit", "knob", "knot",
  "label", "lag", "lam", "lap", "lavel", "leafcut", "leapfrog", "leg", "lem",
  "lep", "let", "level", "libel", "lid", "lig", "lip", "lob", "log", "lok",
  "lollop", "longleg", "lop", "lowbal", "lug", "mackerel", "mahom", "man", "map",
  "mar", "marshal", "marvel", "mat", "matchwin", "metal", "micro-program",
  "microplan", "microprogram", "milksop", "mis-cal", "mis-club", "mis-spel",
  "miscal", "mishit", "mislabel", "mit", "mob", "mod", "model", "mohmam",
  "monogram", "mop", "mothbal", "mug", "multilevel", "mum", "nab", "nag", "nan",
  "nap", "net", "nightclub", "nightsit", "nip", "nod", "nonplus", "norkop",
  "nostril", "not", "nut", "nutmeg", "occur", "ocur", "offput", "offset", "omit",
  "ommit", "onlap", "out-general", "outbid", "outcrop", "outfit",
  "outgas", "outgun", "outhit", "outjab", "outpol", "output", "outrun",
  "outship", "outshop", "outstrip", "outswel", "outspan", "overcrop",
  "pettifog", "photostat", "pouf", "preset", "prim", "pug", "ret", "rosin",
  "outwit", "overbid", "overcal", "overcommit", "overcontrol",
  "overcrap", "overdub", "overfil", "overhat", "overhit", "overlap", "overman",
  "overplot", "overrun", "overshop", "overstep", "overtip", "overtop", "overwet",
  "overwil", "pad", "paintbal", "pan", "panel", "paperclip", "par", "parallel",
  "parcel", "pat", "patrol", "pedal", "peg", "pen",
  "pencil", "pep", "permit", "pet", "petal", "photoset",
  "picket", "pig", "pilot", "pin", "pinbal", "pip", "pipefit", "pipet", "pit",
  "plan", "plit", "plod", "plop", "plot", "plug", "plumet", "plummet", "pod",
  "policyset", "polyfil", "pop", "pot", "pram", "prebag",
  "predistil", "predril", "prefer", "prefil", "preinstal", "prep", "preplan",
  "preprogram", "prizewin", "prod", "profer", "prog", "program", "prop",
  "propel", "pub", "pummel", "pun", "pup", "pushfit", "put", "quarel", "quarrel",
  "quickskim", "quickstep", "quickwit", "quip", "quit", "quivertip", "quiz",
  "rabbit", "rabit", "radiolabel", "rag", "ram", "ramrod", "rap", "rat",
  "ratecap", "ravel", "readmit", "reallot", "rebel", "rebid", "rebin", "rebut",
  "recap", "rechannel", "recommit", "recrop", "recur", "recut", "red", "redril",
  "refer", "refit", "reformat", "refret", "refuel", "reget", "regret", "reinter",
  "rejig", "rekit", "reknot", "relabel", "relet", "rem", "remap", "remetal",
  "remit", "remodel", "reoccur", "rep", "repel", "repin", "replan", "replot",
  "repol", "repot", "reprogram", "rerun", "reset", "resignal", "resit", "reskil",
  "resubmit", "retransfer", "retransmit", "retro-fit", "retrofit", "rev",
  "revel", "revet", "rewrap", "rib", "richochet", "ricochet", "rid", "rig",
  "rim", "ringlet", "rip", "rit", "rival", "rivet", "roadrun", "rob", "rocket",
  "rod", "roset", "rot", "rowel", "rub", "run", "runnel", "rut", "sab", "sad",
  "sag", "sandbag", "sap", "scab", "scalpel", "scam", "scan", "scar", "scat",
  "schlep", "scrag", "scram", "shall", "sled", "smut", "stet",
  "trepan", "unrip", "unstop", "whir", "whop", "wig", "scrap", "scrat", "scrub",
  "scrum", "scud", "scum", "scur", "sentinel", "set", "shag", "sham", "shed", "shim", "shin", "ship",
  "shir", "shit", "shlap", "shop", "shopfit", "shortfal", "shot", "shovel",
  "shred", "shrinkwrap", "shrivel", "shrug", "shun", "shut", "side-step",
  "sideslip", "sidestep", "signal", "sin", "sinbin", "sip", "sit", "skid",
  "skim", "skin", "skip", "skir", "skrag", "slab", "slag", "slam", "slap",
  "slim", "slip", "slit", "slob", "slog", "slop", "slot", "slowclap", "slug",
  "slum", "slur", "smit", "snag", "snap", "snip", "snivel", "snog", "snorkel",
  "snowcem", "snub", "snug", "sob", "sod", "softpedal", "son", "sop", "spam",
  "span", "spar", "spat", "spin", "spiral", "spit", "splat",
  "split", "spot", "sprig", "springtip", "spud", "spur",
  "squat", "squirrel", "stab", "stag", "star", "stem", "sten", "stencil", "step",
  "stir", "stop", "storytel", "strap", "strim", "strip", "strop", "strug",
  "strum", "strut", "stub", "stud", "stun", "sub", "subcrop", "sublet", "submit",
  "subset", "sum", "summit", "sun", "suntan", "sup", "super-chil",
  "superad", "swab", "swag", "swan", "swap", "swat", "swig", "swim", "swivel",
  "swot", "tab", "tag", "tan", "tansfer", "tap", "tar", "tassel", "tat", "tefer",
  "teleshop", "tendril", "thermal", "thermostat", "thin",
  "throb", "thrum", "thud", "thug", "tightlip", "tin", "tinsel", "tip", "tittup",
  "toecap", "tog", "tom", "tomorrow", "top", "tot", "total", "towel", "traget",
  "trainspot", "tram", "trammel", "transfer", "tranship", "transit", "transmit",
  "trap", "travel", "trek", "trendset", "trim", "trip", "tripod",
  "trod", "trot", "trowel", "tub", "tug",
  "tunnel", "tup", "tut", "twat", "twig", "twin", "twit", "typeset", "tyset",
  "un-man", "unban", "unbar", "unbob", "uncap", "unclip", "uncompel", "undam",
  "underbid", "undercut", "underlet", "underman", "underpin", "unfit", "unfulfil", "unknot",
  "unlip", "unlywil", "unman", "unpad", "unpeg", "unpin", "unplug", "unravel",
  "unrol", "unscrol", "unsnap", "unstal", "unstep", "unstir", "untap", "unwrap",
  "unzip", "up", "upset", "upskil", "upwel", "ven", "verbal", "vet",
  "vignet", "wad", "wag", "wainscot", "wan", "war", "waterfal",
  "waterfil", "waterlog", "weasel", "web", "wed", "wet", "wham", "whet", "whip",
  "whir", "whiz", "whup", "wildcat", "win", "windmil", "wit",
  "woodchop", "woodcut", "worship", "wrap", "wiretap", "yen", "yak",
  "yap", "yip", "yodel", "zag", "zap", "zig", "zigzag",
  "zip", "hocus",
];

const PAST_PARTICIPLE_RULESET = {
  name: "PAST_PARTICIPLE",
  defaultRule: RE(ANY_STEM_RE, 0, "ed", 2),
  rules: PAST_PARTICIPLE_RULES,
  doubling: true
};

const PRESENT_PARTICIPLE_RULESET = {
  name: "ING_FORM",
  defaultRule: RE(ANY_STEM_RE, 0, "ing", 2),
  rules: ING_FORM_RULES,
  doubling: true
};

const PAST_RULESET = {
  name: "PAST",
  defaultRule: RE(ANY_STEM_RE, 0, "ed", 2),
  rules: PAST_RULES,
  doubling: true
};

const PRESENT_RULESET = {
  name: "PRESENT",
  defaultRule: RE(ANY_STEM_RE, 0, "s", 2),
  rules: PRESENT_RULES,
  doubling: false
};

const TO_BE = ["am", "are", "is", "was", "were"];

const IRREGULAR_PAST_PART = ["done", "gone", "abode", "been", "begotten", "begun", "bent", "bid",
  "bidden", "bled", "born", "bought", "brought", "built", "caught", "clad", "chlung", "could", "crept",
  "dove", "drunk", "dug", "dwelt", "fed", "felt", "fled", "flung", "fought", "found", "ground", "had",
  "held", "hung", "hurt", "kept", "knelt", "laid", "lain", "led", "left", "lent", "lit", "lost", "made",
  "met", "mown", "paid", "pled", "relaid", "rent", "rung", "said", "sat", "sent", "shod", "shot", "slain",
  "slept", "slid", "smelt", "sold", "sought", "spat", "sped", "spelt", "spent", "split", "spolit", "sprung",
  "spun", "stood", "stuck", "struck", "stung", "stunk", "sung", "sunk", "swept", "sworn", "swum", "swung",
  "taight", "thought", "told", "torn", "undergone", "understood", "wept", "woken", "won", "worn", "wound",
  "wrung"];
const VB_ENDS_IN_E = "abandon|abate|abdicate|abduct|abet|abhor|abide|abolish|abort|abound|abridge|abrogate|absent|absolve|absorb|abstain|abstract|abuse|accede|accelerate|accent|accentuate|accept|access|acclaim|accommodate|accompany|accomplish|accord|accost|account|accredit|accrue|accumulate|accuse|accustom|ache|achieve|acidify|acknowledge|acquaint|acquiesce|acquire|acquit|act|activate|adapt|add|addict|addle|address|adhere|adjoin|adjourn|adjudge|adjudicate|adjust|administer|administrate|admire|admit|admonish|adopt|adore|adorn|adulterate|advance|advantage|adventure|advertise|advise|advocate|affect|affiliate|affirm|affix|afflict|afford|affront|age|aggrandize|aggravate|aggrieve|agitate|agonize|agree|aid|ail|aim|air|airlift|alarm|alert|alienate|alight|align|allay|allege|alleviate|allocate|allot|allow|allude|alter|alternate|amalgamate|amass|amaze|amble|ambush|amend|amortize|amount|amplify|amputate|amuse|analyse|analyze|anchor|anger|angle|animate|annex|annihilate|annotate|announce|annoy|annual|annualize|annul|answer|antagonize|ante|anticipate|ape|apologize|appall|apparel|appeal|appear|appease|append|applaud|apply|appoint|apportion|appraise|appreciate|apprehend|apprentice|apprise|approach|appropriate|approve|approximate|arbitrate|arc|arch|argue|arise|arm|armor|arouse|arraign|arrange|array|arrest|arrive|arrogate|articulate|ascend|ascertain|ascribe|ask|aspire|assail|assassinate|assault|assemble|assent|assert|assess|assign|assimilate|assist|associate|assort|assuage|assume|assure|astonish|astound|atone|atrophy|attach|attack|attain|attempt|attend|attest|attire|attract|attribute|attune|auction|audit|audition|augment|augur|authenticate|author|authorize|autograph|automate|autopsy|avail|avenge|average|avert|avoid|await|awake|awaken|award|awe|babble|back|backdate|backfire|backpedal|backslap|backstitch|backstop|backtrack|badger|baffle|bag|bail|bait|bake|balance|bale|balk|ball|ballast|balloon|ballyhoo|ban|band|bandage|bandy|bang|banish|bank|bankroll|bankrupt|baptize|bar|barb|barbecue|bare|bargain|barge|bark|barrel|barricade|barter|base|bash|bask|bat|bathe|batter|battle|bawl|bay|be|beach|bead|beam|bear|beard|beat|beautify|beckon|become|bed|bedevil|beef|befall|befit|befriend|befuddle|beg|beget|begin|begrudge|beguile|behave|behead|behold|belabor|belch|beleaguer|belie|believe|belittle|bellow|belong|belt|bely|bemoan|bench|bend|benefit|bequeath|berate|besiege|bespeak|best|bestow|bet|betide|betray|better|bevel|beware|bewilder|bewitch|bias|bicker|bid|bide|bilk|bill|billow|bind|birdie|bit|bitch|bite|black|blacken|blacklist|blackmail|blame|blank|blanket|blare|blast|blaze|bleach|bleed|blend|bless|blight|blind|blindfold|blindside|blink|blip|blister|bloat|block|blockade|blood|bloom|blossom|blot|blow|bludgeon|bluff|blunder|blunt|blur|blurt|blush|bluster|board|boast|boat|bode|bog|bogey|boggle|boil|bolster|bolt|bomb|bombard|bond|bone|boo|book|boom|boomerang|boost|boot|border|bore|borrow|botch|bother|bottle|bottom|bounce|bow|bowl|box|boycott|brace|brag|braid|brainwash|brake|branch|brand|brandish|brandy|brave|brazen|breach|break|breath|breathe|breed|breeze|brew|bribe|bridge|bridle|brief|brighten|bring|bristle|broach|broadcast|broaden|broil|broke|broker|brood|browbeat|brown|browse|bruise|brush|brutalize|bubble|buck|buckle|bud|budge|budget|buffer|buffet|bug|build|bulge|bull|bulldoze|bulletin|bully|bum|bumble|bump|bunch|bundle|bungle|bunt|buoy|burden|burgeon|burn|burne|burnish|burp|burrow|burst|bury|bus|bust|bustle|butcher|button|buttress|buy|buzz|bypass|cable|cage|cajole|calcify|calculate|calibrate|call|called|calm|calve|camouflage|camp|campaign|can|cancel|cannibalize|canter|cap|capitalize|capitulate|captain|captivate|capture|care|careen|caress|caricature|carp|carpet|carry|cart|carve|cascade|case|cash|cast|castigate|catalog|catalogue|catalyze|catapult|catch|categorize|cater|caucus|cause|caution|cave|cavort|cease|cede|celebrate|cement|censor|censure|center|centralize|certify|chafe|chain|chair|chalk|challenge|chamber|champion|chance|change|channel|chant|char|characterize|charge|charm|chart|charter|chase|chasten|chastise|chat|chatter|chauffeur|cheapen|cheat|check|cheer|cherish|chew|chide|chill|chime|chin|chirp|chisel|choke|chomp|choose|chop|choreograph|chortle|christen|chronicle|chuck|chuckle|chug|churn|cinch|cipher|circle|circulate|circumvent|cite|civilize|claim|clamber|clamor|clamp|clang|clank|clarify|clash|clasp|class|classify|clatter|claw|clean|cleanse|clear|clench|click|climax|climb|clinch|cling|clip|cloak|clobber|clock|clog|clone|close|closet|clothe|cloud|cloy|cluck|cluster|clutch|clutter|coach|coagulate|coalesce|coast|coat|coax|cobble|cock|coddle|code|codify|coerce|coexist|coil|coin|coincide|collaborate|collapse|collar|collateralize|collect|collide|collude|colonize|color|comb|combat|combine|come|comfort|command|commandeer|commemorate|commence|commend|comment|commercialize|commingle|commiserate|commission|commit|committed|commune|communicate|communize|commute|compact|compare|compass|compel|compensate|compete|compile|complain|complement|complete|complicate|compliment|comply|compose|compound|comprehend|compress|comprise|compromise|compute|computerize|computerized|conceal|concede|conceive|concentrate|concern|concerned|concert|conclude|concoct|concur|condemn|condense|condescend|condition|condone|conduct|cone|confer|confess|confide|confine|confirm|confiscate|conflict|conform|confound|confront|confuse|congeal|congest|congratulate|congregate|conjure|connect|connote|conquer|conscript|consent|conserve|consider|consign|consist|console|consolidate|consort|conspire|constitute|constrain|constrict|construct|construe|consult|consume|consummate|contact|contain|contaminate|contemplate|contend|content|contest|continue|contract|contradict|contrast|contribute|contrive|control|convene|converge|converse|convert|convey|convict|convince|convolute|cook|cool|cooperate|coordinate|cope|copy|copyright|cordon|corner|corral|correct|correlate|correspond|corroborate|corrode|corrugate|corrupt|cost|costume|cough|counsel|count|countenance|counter|counteract|counterattack|counterbalance|countersue|couple|course|court|covenant|cover|covet|cow|cower|crack|crackle|cradle|craft|cram|crane|crank|crapshoot|crash|crater|crave|crawl|craze|creak|cream|create|credit|creep|cremate|crest|criminalize|crimp|cringe|cripple|crisscross|criticize|croak|crochet|croon|crop|cross|crouch|crow|crowd|crown|crucify|cruise|crumble|crumple|crunch|crusade|crush|cry|crystallize|cuddle|cue|cuff|cull|culminate|cultivate|culture|cup|curb|cure|curl|curry|curse|curtail|curve|cushion|customize|cut|cycle|dabble|dally|damage|damn|damp|dampen|dance|dangle|dare|darken|darn|dart|dash|date|daub|daunt|dawdle|dawn|daydream|daze|dazzle|deactivate|deadlock|deafen|deal|debase|debate|debilitate|debunk|debut|decaffeinate|decamp|decant|decay|decease|deceive|decelerate|decentralize|decertify|decide|decimate|decipher|deck|declaim|declare|decline|decode|decommission|decompose|decorate|decrease|decree|decry|dedicate|deduce|deduct|deem|deepen|defame|default|defeat|defect|defend|defer|define|deflate|deflect|deform|defraud|defray|defunct|defuse|defy|degenerate|degrade|dehumanize|dehydrate|delay|delegate|delete|deliberate|delight|delineate|deliver|delude|deluge|delve|demand|demean|dement|demilitarize|demobilize|democratize|demolish|demonize|demonstrate|demoralize|demote|demur|denationalize|denigrate|denominate|denote|denounce|dent|denuclearize|denude|deny|depart|depend|depict|deplete|deplore|deploy|deport|depose|deposit|depreciate|depress|deprive|derail|derange|deregulate|deride|derive|descend|describe|desecrate|desegregate|desert|deserve|design|designate|desire|desist|despair|despise|destabilize|destine|destroy|detach|detail|detain|detect|deter|deteriorate|determine|detest|dethrone|detonate|detoxify|detract|devalue|devastate|develop|deviate|devise|devote|devour|diagnose|dial|dicker|dictate|die|diet|differ|differentiate|diffuse|dig|digest|dignify|digress|dilapidate|dilate|dilute|dim|dimension|diminish|dine|dip|direct|dirty|disable|disagree|disallow|disappear|disappoint|disapprove|disarm|disassemble|disassociate|disavow|disband|disbelieve|disburse|discard|discern|discharge|discipline|disclaim|disclose|discolor|disconcert|disconnect|discontinue|discount|discourage|discourse|discover|discredit|discriminate|discriminated|discuss|disdain|disenchant|disenfranchise|disengage|disentangle|disfigure|disgorge|disgrace|disgruntle|disguise|disgust|dish|dishearten|dishonor|disillusion|disincline|disintegrate|disjoint|dislike|dislodge|dismantle|dismay|dismember|dismiss|disobey|disorder|disorganize|disorient|disown|disparage|dispatch|dispel|dispense|disperse|displace|display|displease|dispose|dispossess|disprove|dispute|disqualify|disregard|disrupt|dissatisfy|dissect|disseminate|dissent|dissipate|dissociate|dissolve|dissuade|distance|distill|distinguish|distort|distract|distress|distribute|distrust|disturb|ditch|dither|dive|diverge|diversify|divert|divest|divide|divine|divorce|divulge|divvy|dizzy|do|dock|doctor|document|dodge|doff|dole|dominate|domineer|don|donate|doo|doom|dot|double|doubt|douse|dovetail|down|downgrade|downplay|downsize|doze|draft|drag|drain|dramatize|drape|draw|drawl|dread|dream|dredge|dress|dribble|drift|drill|drink|drip|drive|drizzle|drool|droop|drop|drown|drub|drum|dry|dub|duck|duel|dull|dump|dunk|dupe|duplicate|dust|dwarf|dwell|dwindle|dye|earmark|earn|ease|eat|eavesdrop|ebb|echo|eclipse|economize|edge|edit|editorialize|educate|effect|egg|eject|eke|elaborate|elapse|elate|elbow|elect|electrify|elevate|elicit|eliminate|elongate|elucidate|elude|emaciate|emanate|emancipate|emasculate|embargo|embark|embarrass|embattle|embed|embellish|embezzle|embitter|emblazon|embody|embolden|emboss|embrace|embroider|embroil|emerge|emigrate|emit|empathize|emphasize|employ|empower|empty|emulate|enable|enact|encamp|encase|enchant|encircle|enclose|encode|encompass|encounter|encourage|encroach|encrust|encumber|end|endanger|endear|ended|endorse|endow|endure|energize|enforce|engage|engender|engineer|engrave|engross|engulf|enhance|enjoin|enjoy|enlarge|enlighten|enlist|enliven|enme…";
Conjugator.VERB_CONS_DOUBLING = VERB_CONS_DOUBLING; // for scripts

export default Conjugator;