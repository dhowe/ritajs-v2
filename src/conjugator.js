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
    //make sure verb is in base form
    if (!this.RiTa.tagger.allTags(verb).includes("vb")) {
      verb = this.unconjugate(verb) || verb;
    }
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


  unconjugate(word, opts = {}) { // NAPI

    if (typeof word !== 'string') return;

    let dbug = opts && opts.dbug;

    if (IRREG_VERBS_LEX.hasOwnProperty(word)) {
      dbug && console.log(word + " in exceptions list 1 (in lex)");
      return IRREG_VERBS_LEX[word];
    }
    else if (Object.values(IRREG_VERBS_LEX).includes(word)) {
      dbug && console.log(word + " is base form in exceptions list 1 (in lex)");
      return word;
    }

    if (IRREG_VERBS_NOLEX.hasOwnProperty(word)) {
      dbug && console.log(word + " is in exceptions list 2");
      return IRREG_VERBS_NOLEX[word];
    }
    else if (Object.values(IRREG_VERBS_NOLEX).includes(word)) {
      dbug && console.log(word + " is base form in exceptions list 2 (not in lex)");
      return word;
    }

    let tags = this.RiTa.tagger.allTags(word, { noGuessing: true });

    // if its already a base form verb, return it
    if (tags.some(t => t === 'vb')) {
      dbug && console.log(word + " is a base form verb");
      return word;
    }

    // if its not a verb, give up
    if (!tags.some(t => t.startsWith('vb'))) {
      dbug && console.log(word + " is not a known verb");
      return;
    }

    // Now check our lemmatization rules

    // 1) 3rd person present (-s)
    if (word.endsWith("s")) {

      if (word.endsWith("ies")) {
        dbug && console.log("'" + word + "' hit rule: ends with -ies");
        return word.replace(/ies$/, "y");
      }
      else if (/(ch|s|sh|x|z|o)es$/.test(word)) {
        dbug && console.log("'" + word + "' hit rule: ends with -(ch|s|sh|x|z|o)es");
        return word.replace(/es$/, "");
      }
      dbug && console.log("'" + word + "' hit rule: ends with -s");
      return word.replace(/s$/, "");
    }

    // 2) past forms (-ed)
    if (word.endsWith("ed")) {

      if (word.endsWith("ied")) {
        dbug && console.log("'" + word + "' hit rule: ends with -ied");
        return word.replace(/ied$/, "y");
      }
      else if (word.endsWith("ed") && word.charAt(word.length - 3) === word.charAt(word.length - 4)) {

        if (VB_ENDS_IN_DOUBLE.includes(word.replace(/ed$/, ""))) {
          dbug && console.log("'" + word + "' hit rule: ends with -ed");
          return word.replace(/ed$/, "")
        }
        dbug && console.log("'" + word + "' hit rule: ends with -..ed");
        return word.replace(/[a-z]ed$/, "");
      }
      else if (word.endsWith("ed")) {
        if (VB_ENDS_IN_E.includes(word.replace(/d$/, ""))) {
          dbug && console.log("'" + word + "' hit rule: ends with -(e)d");
          return word.replace(/d$/, "")
        }
        else {
          dbug && console.log("'" + word + "' hit rule: ends with -ed");
          return word.replace(/ed$/, "")
        }
      }
    }

    // 3) ends with -ing
    if (word.endsWith("ing")) {

      if (word.charAt(word.length - 4) === word.charAt(word.length - 5)) {
        if (VB_ENDS_IN_DOUBLE.includes(word.replace(/ing$/, ""))) {
          dbug && console.log("'" + word + "' hit rule: ends with -ing");
          return word.replace(/ing$/, "")
        }
        dbug && console.log("'" + word + "' hit rule: ends with -..ing");
        return word.replace(/[a-z]ing$/, "");
      }

      if (word.charAt(word.length - 4) === 'y') {
        if (VB_ENDS_IN_E.includes(word.replace(/ying$/, "ie"))) {
          dbug && console.log("'" + word + "' hit rule: ends with -ying");
          return word.replace(/ying$/, "ie")
        }
      }

      if (VB_ENDS_IN_E.includes(word.replace(/ing$/, "e"))) {
        dbug && console.log("'" + word + "' hit rule: ends with -(e)ing");
        return word.replace(/ing$/, "e")
      }

      dbug && console.log("'" + word + "' hit rule: ends with -ing");
      return word.replace(/ing$/, "")
    }

    dbug && console.log("'" + word + "' hit no rules");
    return word;
  }

  presentPart(theVerb) {
    return theVerb === 'be' ? 'being' :
      this._checkRules(PRESENT_PART_RULESET, theVerb);
  }

  pastPart(theVerb) {
    if (this._isPastParticiple(theVerb)) return theVerb;
    return this._checkRules(PAST_PART_RULESET, theVerb);
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
    this.IRREG_VERBS_LEX = IRREG_VERBS_LEX;     // for tagger
    this.IRREG_VERBS_NOLEX = IRREG_VERBS_NOLEX;  // for tagger
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
        throw Error('Invalid args: ' + args)
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
    if (IRREG_PAST_PART.includes(w)) return true;

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
      for (let i = 0; i < guess.length; i++) {
        if (word === guess[i]) return word;
        if (this.RiTa.stem(guess[i]) === word) return guess[i];
        if (this.unconjugate(this.RiTa.stem(guess[i])) === word) return guess[i];
      }

      w = w.slice(0, -1);
    }

    // can't find possible word in dict, return original
    return word;
  }
}

const IRREG_VERBS_LEX = {
  "abetted": "abet", "abetting": "abet", "abhorred": "abhor", "abhorring": "abhor", "abode": "abide", "accompanied": "accompany", "acidified": "acidify", "acquitted": "acquit", "acquitting": "acquit", "addrest": "address", "admitted": "admit", "admitting": "admit", "allied": "ally", "allotted": "allot", "allotting": "allot", "am": "be", "amnestied": "amnesty", "amplified": "amplify", "annulled": "annul", "annulling": "annul", "applied": "apply", "arcked": "arc", "arcking": "arc", "are": "be", "arisen": "arise", "arose": "arise", "ate": "eat", "atrophied": "atrophy", "awoke": "awake", "awoken": "awake", "babied": "baby", "bade": "bid", "bagged": "bag", "bagging": "bag", "bandied": "bandy", "banned": "ban", "banning": "ban", "barred": "bar", "barrelled": "barrel", "barrelling": "barrel", "barring": "bar", "batted": "bat", "batting": "bat", "bayonetted": "bayonet", "bayonetting": "bayonet", "beaten": "beat", "beautified": "beautify", "became": "become", "bed": "bed", "bedded": "bed", "bedding": "bed", "bedevilled": "bedevil", "bedevilling": "bedevil", "been": "be", "befallen": "befall", "befell": "befall", "befitted": "befit", "befitting": "befit", "began": "begin", "begat": "beget", "begetting": "beget", "begged": "beg", "begging": "beg", "beginning": "begin", "begot": "beget", "begotten": "beget", "begun": "begin", "beheld": "behold", "beholden": "behold", "bellied": "belly", "belying": "belie", "benefitted": "benefit", "benefitting": "benefit", "bent": "bend", "berried": "berry", "besetting": "beset", "bespoke": "bespeak", "bespoken": "bespeak", "betted": "bet", "betting": "bet", "bevelled": "bevel", "bevelling": "bevel", "biassed": "bias", "biassing": "bias", "bidden": "bid", "bidding": "bid", "binned": "bin", "binning": "bin", "bit": "bite", "bitted": "bit", "bitten": "bite", "bitting": "bit", "bivouacked": "bivouac", "bivouacking": "bivouac", "blackberried": "blackberry", "bled": "bleed", "blest": "bless", "blew": "blow", "blipped": "blip", "blipping": "blip", "blobbed": "blob", "blobbing": "blob", "bloodied": "bloody", "blotted": "blot", "blotting": "blot", "blown": "blow", "blurred": "blur", "blurring": "blur", "bodied": "body", "bootlegged": "bootleg", "bootlegging": "bootleg", "bopped": "bop", "bopping": "bop", "bore": "bear", "born": "bear", "borne": "bear", "bought": "buy", "bound": "bind", "bragged": "brag", "bragging": "brag", "bred": "breed", "brimmed": "brim", "brimming": "brim", "broke": "break", "broken": "break", "brought": "bring", "browbeaten": "browbeat", "budded": "bud", "budding": "bud", "bugged": "bug", "bugging": "bug", "built": "build", "bulldogging": "bulldog", "bullied": "bully", "bummed": "bum", "bumming": "bum", "buried": "bury", "burnt": "burn", "bushelled": "bushel", "bushelling": "bushel", "busied": "busy", "bypast": "bypass", "calcified": "calcify", "came": "come", "canalled": "canal", "canalling": "canal", "cancelled": "cancel", "cancelling": "cancel", "candied": "candy", "canned": "can", "canning": "can", "canopied": "canopy", "capped": "cap", "capping": "cap", "carried": "carry", "catted": "cat", "catting": "cat", "caught": "catch", "certified": "certify", "channelled": "channel", "channelling": "channel", "chapped": "chap", "chapping": "chap", "charred": "char", "charring": "char", "chatted": "chat", "chatting": "chat", "chid": "chide", "chidden": "chide", "chinned": "chin", "chinning": "chin", "chipped": "chip", "chipping": "chip", "chiselled": "chisel", "chiselling": "chisel", "chitchatted": "chitchat", "chitchatting": "chitchat", "chopped": "chop", "chopping": "chop", "chose": "choose", "chosen": "choose", "chugged": "chug", "chugging": "chug", "chummed": "chum", "chumming": "chum", "clad": "clothe", "cladding": "clad", "clammed": "clam", "clamming": "clam", "clapped": "clap", "clapping": "clap", "clarified": "clarify", "classified": "classify", "clipped": "clip", "clipping": "clip", "clogged": "clog", "clogging": "clog", "clotted": "clot", "clotting": "clot", "clubbed": "club", "clubbing": "club", "clung": "cling", "co-ordinate": "coordinate", "co-ordinated": "coordinate", "co-ordinates": "coordinate", "co-ordinating": "coordinate", "codded": "cod", "codding": "cod", "codified": "codify", "cogged": "cog", "cogging": "cog", "combatted": "combat", "combatting": "combat", "committed": "commit", "committing": "commit", "compelled": "compel", "compelling": "compel", "complied": "comply", "concurred": "concur", "concurring": "concur", "conferred": "confer", "conferring": "confer", "conned": "con", "conning": "con", "controlled": "control", "controlling": "control", "copied": "copy", "copped": "cop", "copping": "cop", "corralled": "corral", "corralling": "corral", "counselled": "counsel", "counselling": "counsel", "crabbed": "crab", "crabbing": "crab", "crammed": "cram", "cramming": "cram", "crapped": "crap", "crapping": "crap", "crept": "creep", "cribbed": "crib", "cribbing": "crib", "cried": "cry", "cropped": "crop", "cropping": "crop", "crucified": "crucify", "cubbed": "cub", "cubbing": "cub", "cudgelled": "cudgel", "cudgelling": "cudgel", "cupped": "cup", "cupping": "cup", "curried": "curry", "curst": "curse", "cutting": "cut", "dallied": "dally", "dammed": "dam", "damming": "dam", "dealt": "deal", "decried": "decry", "deferred": "defer", "deferring": "defer", "defied": "defy", "demurred": "demur", "demurring": "demur", "denied": "deny", "denned": "den", "denning": "den", "deterred": "deter", "deterring": "deter", "detoxified": "detoxify", "devilled": "devil", "devilling": "devil", "diagrammed": "diagram", "diagramming": "diagram", "dialled": "dial", "dialling": "dial", "did": "do", "digging": "dig", "dignified": "dignify", "dimmed": "dim", "dimming": "dim", "dinned": "din", "dinning": "din", "dipped": "dip", "dipping": "dip", "dirtied": "dirty", "dispelled": "dispel", "dispelling": "dispel", "disqualified": "disqualify", "dissatisfied": "dissatisfy", "diversified": "diversify", "divvied": "divvy", "dizzied": "dizzy", "dogged": "dog", "dogging": "dog", "done": "do", "donned": "don", "donning": "don", "dotted": "dot", "dotting": "dot", "dove": "dive", "drabbed": "drab", "drabbing": "drab", "dragged": "drag", "dragging": "drag", "drank": "drink", "drawn": "draw", "dreamt": "dream", "drew": "draw", "dried": "dry", "dripped": "drip", "dripping": "drip", "driven": "drive", "dropped": "drop", "dropping": "drop", "drove": "drive", "drubbed": "drub", "drubbing": "drub", "drugged": "drug", "drugging": "drug", "drummed": "drum", "drumming": "drum", "drunk": "drink", "dubbed": "dub", "dubbing": "dub", "duelled": "duel", "duelling": "duel", "dug": "dig", "dummied": "dummy", "dunned": "dun", "dunning": "dun", "dwelt": "dwell", "dying": "die", "easied": "easy", "eaten": "eat", "eavesdropped": "eavesdrop", "eavesdropping": "eavesdrop", "electrified": "electrify", "embedded": "embed", "embedding": "embed", "embodied": "embody", "emitted": "emit", "emitting": "emit", "emptied": "empty", "enamelled": "enamel", "enamelling": "enamel", "enthralled": "enthral", "enthralling": "enthral", "envied": "envy", "equalled": "equal", "equalling": "equal", "equipped": "equip", "equipping": "equip", "excelled": "excel", "excelling": "excel", "exemplified": "exemplify", "expelled": "expel", "expelling": "expel", "extolled": "extol", "extolling": "extol", "facetted": "facet", "facetting": "facet", "fallen": "fall", "falsified": "falsify", "fancied": "fancy", "fanned": "fan", "fanning": "fan", "fantasied": "fantasy", "fatted": "fat", "fatting": "fat", "fed": "feed", "feed": "feed", "fell": "fall", "felt": "feel", "ferried": "ferry", "figged": "fig", "figging": "fig", "finned": "fin", "finning": "fin", "fitted": "fit", "fitting": "fit", "flagged": "flag", "flagging": "flag", "flannelled": "flannel", "flannelling": "flannel", "flapped": "flap", "flapping": "flap", "flatted": "flat", "flatting": "flat", "fled": "flee", "flew": "fly", "flipped": "flip", "flipping": "flip", "flitted": "flit", "flitting": "flit", "flopped": "flop", "flopping": "flop", "flown": "fly", "flung": "fling", "flurried": "flurry", "fogged": "fog", "fogging": "fog", "forbad": "forbid", "forbade": "forbid", "forbidden": "forbid", "forbidding": "forbid", "foregone": "forego", "foresaw": "foresee", "foreseen": "foresee", "foretold": "foretell", "forewent": "forego", "forgave": "forgive", "forgetting": "forget", "forgiven": "forgive", "forgone": "forgo", "forgot": "forget", "forgotten": "forget", "formatted": "format", "formatting": "format", "forsaken": "forsake", "forsook": "forsake", "fortified": "fortify", "forwent": "forgo", "fought": "fight", "found": "find", "frenzied": "frenzy", "fretted": "fret", "fretting": "fret", "fried": "fry", "frogged": "frog", "frogging": "frog", "frolicked": "frolic", "frolicking": "frolic", "froze": "freeze", "frozen": "freeze", "fuelled": "fuel", "fuelling": "fuel", "funned": "fun", "funnelled": "funnel", "funnelling": "funnel", "funning": "fun", "furred": "fur", "furring": "fur", "gagged": "gag", "gagging": "gag", "gan": "gin", "gapped": "gap", "gapping": "gap", "gassed": "gas", "gasses": "gas", "gassing": "gas", "gave": "give", "gelled": "gel", "gelling": "gel", "gemmed": "gem", "gemming": "gem", "getting": "get", "giddied": "giddy", "gigged": "gig", "gigging": "gig", "ginned": "gin", "ginning": "gin", "girt": "gird", "given": "give", "gloried": "glory", "glorified": "glorify", "glutted": "glut", "glutting": "glut", "gnawn": "gnaw", "gollied": "golly", "gone": "go", "got": "get", "gotten": "get", "grabbed": "grab", "grabbing": "grab", "gratified": "gratify", "gravelled": "gravel", "gravelling": "gravel", "graven": "grave", "grew": "grow", "grinned": "grin", "grinning": "grin", "gripped": "grip", "gripping": "grip", "gript": "grip", "gritted": "grit", "gritting": "grit", "ground": "grind", "grovelled": "grovel", "grovelling": "grovel", "grown": "grow", "grubbed": "grub", "grubbing": "grub", "guarantied": "guaranty", "gullied": "gully", "gummed": "gum", "gumming": "gum", "gunned": "gun", "gunning": "gun",
  "hacksawn": "hacksaw", "had": "have", "handicapped": "handicap", "handicapping": "handicap", "harried": "harry", "has": "have", "hatted": "hat", "hatting": "hat", "heard": "hear", "held": "hold", "hemmed": "hem", "hemming": "hem", "hewn": "hew", "hiccupped": "hiccup", "hiccupping": "hiccup", "hid": "hide", "hidden": "hide", "hitting": "hit", "hobbed": "hob", "hobbing": "hob", "hobnobbed": "hobnob", "hobnobbing": "hobnob", "hogged": "hog", "hogging": "hog", "honied": "honey", "hopped": "hop", "hopping": "hop", "horrified": "horrify", "hove": "heave", "hovelled": "hovel", "hovelling": "hovel", "hugged": "hug", "hugging": "hug", "hummed": "hum", "humming": "hum", "hung": "hang", "hurried": "hurry", "identified": "identify", "impelled": "impel", "impelling": "impel", "implied": "imply", "incurred": "incur", "incurring": "incur", "indemnified": "indemnify", "inferred": "infer", "inferring": "infer", "initialled": "initial", "initialling": "initial", "inlaid": "inlay", "insetting": "inset", "intensified": "intensify", "interred": "inter", "interring": "inter", "interwove": "interweave", "interwoven": "interweave", "is": "be", "jabbed": "jab", "jabbing": "jab", "jagged": "jag", "jagging": "jag", "jammed": "jam", "jamming": "jam", "jarred": "jar", "jarring": "jar", "jellied": "jelly", "jetted": "jet", "jetting": "jet", "jewelled": "jewel", "jewelling": "jewel", "jigged": "jig", "jigging": "jig", "jimmied": "jimmy", "jobbed": "job", "jobbing": "job", "jogged": "jog", "jogging": "jog", "jollied": "jolly", "jotted": "jot", "jotting": "jot", "jugged": "jug", "jugging": "jug", "justified": "justify", "kept": "keep", "kidded": "kid", "kidding": "kid", "kidnapped": "kidnap", "kidnapping": "kidnap", "knelt": "kneel", "knew": "know", "knitted": "knit", "knitting": "knit", "knotted": "knot", "knotting": "knot", "known": "know", "labelled": "label", "labelling": "label", "laden": "lade", "lagged": "lag", "lagging": "lag", "laid": "lay", "lain": "lie", "lapped": "lap", "lapping": "lap", "laurelled": "laurel", "laurelling": "laurel", "lay": "lie", "leant": "lean", "leapfrogged": "leapfrog", "leapfrogging": "leapfrog", "leapt": "leap", "learnt": "learn", "led": "lead", "left": "leave", "lent": "lend", "letting": "let", "levelled": "level", "levelling": "level", "levied": "levy", "libelled": "libel", "libelling": "libel", "lipped": "lip", "lipping": "lip", "liquefied": "liquefy", "lit": "light", "lobbed": "lob", "lobbied": "lobby", "lobbing": "lob", "logged": "log", "logging": "log", "lopped": "lop", "lopping": "lop", "lost": "lose", "lotted": "lot", "lotting": "lot", "lugged": "lug", "lugging": "lug", "lullabied": "lullaby", "lying": "lie", "madded": "mad", "madding": "mad", "made": "make", "magnified": "magnify", "manned": "man", "manning": "man", "mapped": "map", "mapping": "map", "marred": "mar", "married": "marry", "marring": "mar", "marshalled": "marshal", "marshalling": "marshal", "marvelled": "marvel", "marvelling": "marvel", "matted": "mat", "matting": "mat", "meant": "mean", "medalled": "medal", "medalling": "medal", "met": "meet", "metalled": "metal", "metalling": "metal", "might": "may", "mimicked": "mimic", "mimicking": "mimic", "misapplied": "misapply", "misfitted": "misfit", "misfitting": "misfit", "misled": "mislead", "misspelt": "misspell", "mistaken": "mistake", "mistook": "mistake", "misunderstood": "misunderstand", "mobbed": "mob", "mobbing": "mob", "modelled": "model", "modelling": "model", "modified": "modify", "mollified": "mollify", "molten": "melt", "mopped": "mop", "mopping": "mop", "mown": "mow", "mudded": "mud", "muddied": "muddy", "mudding": "mud", "mugged": "mug", "mugging": "mug", "multiplied": "multiply", "mummed": "mum", "mummified": "mummify", "mumming": "mum", "mutinied": "mutiny", "mystified": "mystify", "nabbed": "nab", "nabbing": "nab", "nagged": "nag", "nagging": "nag", "napped": "nap", "napping": "nap", "netted": "net", "netting": "net", "nibbed": "nib", "nibbing": "nib", "nickelled": "nickel", "nickelling": "nickel", "nipped": "nip", "nipping": "nip", "nodded": "nod", "nodding": "nod", "notified": "notify", "nullified": "nullify", "nutted": "nut", "nutting": "nut", "occupied": "occupy", "occurred": "occur", "occurring": "occur", "offsetting": "offset", "omitted": "omit", "omitting": "omit", "ossified": "ossify", "outbidden": "outbid", "outbidding": "outbid", "outcried": "outcry", "outdid": "outdo", "outdone": "outdo", "outfitted": "outfit", "outfitting": "outfit", "outgrew": "outgrow", "outgrown": "outgrow", "outlaid": "outlay", "outputted": "output", "outputting": "output", "outran": "outrun", "outrunning": "outrun", "outshone": "outshine", "outsold": "outsell", "outstripped": "outstrip", "outstripping": "outstrip", "outwitted": "outwit", "outwitting": "outwit", "overcame": "overcome", "overdid": "overdo", "overdone": "overdo", "overdrawn": "overdraw", "overdrew": "overdraw", "overdriven": "overdrive", "overdrove": "overdrive", "overflown": "overflow", "overheard": "overhear", "overhung": "overhang", "overlaid": "overlay", "overlapped": "overlap", "overlapping": "overlap", "overpaid": "overpay", "overpast": "overpass", "overran": "overrun", "overridden": "override", "overrode": "override", "overrunning": "overrun", "oversaw": "oversee", "overseen": "oversee", "oversimplified": "oversimplify", "overspent": "overspend", "overstepped": "overstep", "overstepping": "overstep", "overtaken": "overtake", "overthrew": "overthrow", "overthrown": "overthrow", "overtook": "overtake", "pacified": "pacify", "padded": "pad", "padding": "pad", "paid": "pay", "palled": "pal", "palling": "pal", "palsied": "palsy", "panelled": "panel", "panelling": "panel", "panicked": "panic", "panicking": "panic", "panned": "pan", "panning": "pan", "parallelled": "parallel", "parallelling": "parallel", "parcelled": "parcel", "parcelling": "parcel", "parodied": "parody", "parried": "parry", "partaken": "partake", "partook": "partake", "patrolled": "patrol", "patrolling": "patrol", "patted": "pat", "patting": "pat", "pedalled": "pedal", "pedalling": "pedal", "pegged": "peg", "pegging": "peg", "pencilled": "pencil", "pencilling": "pencil", "penned": "pen", "penning": "pen", "pent": "pen", "permitted": "permit", "permitting": "permit", "personified": "personify", "petrified": "petrify", "petted": "pet", "petting": "pet", "photocopied": "photocopy", "picnicked": "picnic", "picnicking": "picnic", "pigged": "pig", "pigging": "pig", "pilloried": "pillory", "pinned": "pin", "pinning": "pin", "pistolled": "pistol", "pistolling": "pistol", "pitied": "pity", "pitted": "pit", "pitting": "pit", "planned": "plan", "planning": "plan", "pled": "plead", "plied": "ply", "plodded": "plod", "plodding": "plod", "plopped": "plop", "plopping": "plop", "plotted": "plot", "plotting": "plot", "plugged": "plug", "plugging": "plug", "podded": "pod", "podding": "pod", "popes": "popes", "popped": "pop", "popping": "pop", "potted": "pot", "potting": "pot", "preferred": "prefer", "preferring": "prefer", "preoccupied": "preoccupy", "prepaid": "prepay", "prettied": "pretty", "pried": "pry", "primmed": "prim", "primming": "prim", "prodded": "prod", "prodding": "prod", "programmed": "program", "programmes": "program", "programming": "program", "propelled": "propel", "propelling": "propel", "prophesied": "prophesy", "propped": "prop", "propping": "prop", "proven": "prove", "pubbed": "pub", "pubbing": "pub", "pummelled": "pummel", "pummelling": "pummel", "punned": "pun", "punning": "pun", "pupped": "pup", "pupping": "pup", "purified": "purify", "puttied": "putty", "putting": "put", "qualified": "qualify", "quantified": "quantify", "quarrelled": "quarrel", "quarrelling": "quarrel", "quarried": "quarry", "queried": "query", "quipped": "quip", "quipping": "quip", "quitted": "quit", "quitting": "quit", "quizzed": "quiz", "quizzes": "quiz", "quizzing": "quiz", "ragged": "rag", "ragging": "rag", "rallied": "rally", "rammed": "ram", "ramming": "ram", "ran": "run", "rang": "ring", "rapped": "rap", "rapping": "rap", "rarefied": "rarefy", "ratified": "ratify", "ratted": "rat", "ratting": "rat", "rebelled": "rebel", "rebelling": "rebel", "rebuilt": "rebuild", "rebutted": "rebut", "rebutting": "rebut", "reclassified": "reclassify", "rectified": "rectify", "recurred": "recur", "recurring": "recur", "red": "red", "redded": "red", "redding": "red", "redid": "redo", "redone": "redo", "referred": "refer", "referring": "refer", "refitted": "refit", "refitting": "refit", "refuelled": "refuel", "refuelling": "refuel", "regretted": "regret", "regretting": "regret", "reheard": "rehear", "relied": "rely", "remade": "remake", "remarried": "remarry", "remitted": "remit", "remitting": "remit", "repaid": "repay", "repelled": "repel", "repelling": "repel", "replied": "reply", "reran": "rerun", "rerunning": "rerun", "resetting": "reset", "retaken": "retake", "rethought": "rethink", "retook": "retake", "retried": "retry", "retrofitted": "retrofit", "retrofitting": "retrofit", "revelled": "revel", "revelling": "revel", "revved": "rev", "revving": "rev", "rewritten": "rewrite", "rewrote": "rewrite", "ribbed": "rib", "ribbing": "rib", "ricochetted": "ricochet", "ricochetting": "ricochet", "ridded": "rid", "ridden": "ride", "ridding": "rid", "rigged": "rig", "rigging": "rig", "rimmed": "rim", "rimming": "rim", "ripped": "rip", "ripping": "rip", "risen": "rise", "rivalled": "rival", "rivalling": "rival", "robbed": "rob", "robbing": "rob", "rode": "ride", "rose": "rise", "rotted": "rot", "rotting": "rot", "rubbed": "rub", "rubbing": "rub", "rung": "ring", "running": "run", "rutted": "rut", "rutting": "rut", "sagged": "sag", "sagging": "sag", "said": "say", "salaried": "salary", "sallied": "sally", "sang": "sing", "sank": "sink", "sapped": "sap", "sapping": "sap", "sat": "sit", "satisfied": "satisfy", "savvied": "savvy", "saw": "see", "sawn": "saw", "scanned": "scan", "scanning": "scan", "scarred": "scar", "scarring": "scar", "scrapped": "scrap", "scrapping": "scrap", "scrubbed": "scrub", "scrubbing": "scrub", "scurried": "scurry", "seed": "seed", "seen": "see", "sent": "send", "setting": "set", "sewn": "sew", "shaken": "shake", "shammed": "sham", "shamming": "sham", "shat": "shit", "shaven": "shave", "shed": "shed", "shedding": "shed", "shied": "shy", "shimmed": "shim", "shimmied": "shimmy", "shimming": "shim", "shinned": "shin", "shinning": "shin", "shipped": "ship", "shipping": "ship", "shitted": "shit", "shitting": "shit", "shod": "shoe", "shone": "shine", "shook": "shake", "shopped": "shop", "shopping": "shop", "shot": "shoot", "shotgunned": "shotgun", "shotgunning": "shotgun", "shotted": "shot", "shotting": "shot", "shovelled": "shovel", "shovelling": "shovel", "shown": "show", "shrank": "shrink", "shredded": "shred", "shredding": "shred", "shrivelled": "shrivel", "shrivelling": "shrivel", "shrugged": "shrug", "shrugging": "shrug", "shrunk": "shrink", "shrunken": "shrink", "shunned": "shun", "shunning": "shun", "shutting": "shut", "sicked": "sic", "sicking": "sic", "sidestepped": "sidestep", "sidestepping": "sidestep", "signalled": "signal", "signalling": "signal", "signified": "signify", "simplified": "simplify", "singing": "sing", "sinned": "sin", "sinning": "sin", "sipped": "sip", "sipping": "sip", "sitting": "sit", "ski'd": "ski", "skidded": "skid", "skidding": "skid", "skimmed": "skim", "skimming": "skim", "skinned": "skin", "skinning": "skin", "skipped": "skip", "skipping": "skip", "slabbed": "slab", "slabbing": "slab", "slagged": "slag", "slagging": "slag", "slain": "slay", "slammed": "slam", "slamming": "slam", "slapped": "slap", "slapping": "slap", "slatted": "slat", "slatting": "slat", "sledding": "sled", "slept": "sleep", "slew": "slay", "slid": "slide", "slidden": "slide", "slipped": "slip", "slipping": "slip", "slitting": "slit", "slogged": "slog", "slogging": "slog", "slopped": "slop", "slopping": "slop", "slotted": "slot", "slotting": "slot", "slugged": "slug", "slugging": "slug", "slummed": "slum", "slumming": "slum", "slung": "sling", "slurred": "slur", "slurring": "slur", "smelt": "smell", "snagged": "snag", "snagging": "snag", "snapped": "snap", "snapping": "snap", "snipped": "snip", "snipping": "snip", "snubbed": "snub", "snubbing": "snub", "snuck": "sneak", "snugged": "snug", "snugging": "snug", "sobbed": "sob", "sobbing": "sob", "sodded": "sod", "sodding": "sod", "sold": "sell", "solidified": "solidify", "sopped": "sop", "sopping": "sop", "sought": "seek", "sown": "sow", "spanned": "span", "spanning": "span", "spat": "spit", "spatted": "spat", "spatting": "spat", "specified": "specify", "sped": "speed", "spelt": "spell", "spent": "spend", "spied": "spy", "spilt": "spill", "spinning": "spin", "spiralled": "spiral", "spiralling": "spiral", "spitted": "spit", "spitting": "spit", "splitting": "split", "spoilt": "spoil", "spoke": "speak", "spoken": "speak", "spotlit": "spotlight", "spotted": "spot", "spotting": "spot", "sprang": "spring", "sprung": "spring", "spudded": "spud", "spudding": "spud", "spun": "spin", "spurred": "spur", "spurring": "spur", "squatted": "squat", "squatting": "squat", "squidded": "squid", "squidding": "squid", "squilgee": "squeegee", "stabbed": "stab", "stabbing": "stab", "stank": "stink", "starred": "star", "starring": "star", "steadied": "steady", "stemmed": "stem", "stemming": "stem", "stepped": "step", "stepping": "step", "stilettoeing": "stiletto", "stirred": "stir", "stirring": "stir", "stole": "steal", "stolen": "steal", "stood": "stand", "stopped": "stop", "stopping": "stop", "storied": "story", "stove": "stave", "strapped": "strap", "strapping": "strap", "stratified": "stratify", "stridden": "stride", "stripped": "strip", "stripping": "strip", "striven": "strive", "strode": "stride", "strove": "strive", "struck": "strike", "strung": "string", "strutted": "strut", "strutting": "strut", "stubbed": "stub", "stubbing": "stub", "stuck": "stick", "studded": "stud", "studding": "stud", "studied": "study", "stung": "sting", "stunk": "stink", "stunned": "stun", "stunning": "stun", "stymying": "stymie", "subbed": "sub", "subbing": "sub", "subletting": "sublet", "submitted": "submit", "submitting": "submit", "summed": "sum", "summing": "sum", "sung": "sing", "sunk": "sink", "sunken": "sink", "sunned": "sun", "sunning": "sun", "supplied": "supply", "swabbed": "swab", "swabbing": "swab", "swam": "swim", "swapped": "swap", "swapping": "swap", "swatted": "swat", "swatting": "swat", "swept": "sweep", "swigged": "swig", "swigging": "swig", "swimming": "swim", "swivelled": "swivel", "swivelling": "swivel", "swollen": "swell", "swopped": "swap", "swopping": "swap", "swops": "swap", "swore": "swear", "sworn": "swear", "swum": "swim", "swung": "swing", "symbolled": "symbol", "symbolling": "symbol", "tabbed": "tab", "tabbing": "tab", "tagged": "tag", "tagging": "tag", "taken": "take", "tallied": "tally", "tanned": "tan", "tanning": "tan", "tapped": "tap", "tapping": "tap", "tarred": "tar", "tarried": "tarry", "tarring": "tar", "tasselled": "tassel", "tasselling": "tassel", "taught": "teach", "taxis": "taxis", "taxying": "taxi", "terrified": "terrify", "testified": "testify", "thinned": "thin", "thinning": "thin", "thought": "think", "threw": "throw", "thriven": "thrive", "throbbed": "throb", "throbbing": "throb", "throve": "thrive", "thrown": "throw", "thudded": "thud", "thudding": "thud", "tidied": "tidy", "tinned": "tin", "tinning": "tin", "tinselled": "tinsel", "tinselling": "tinsel", "tipped": "tip", "tipping": "tip", "told": "tell", "took": "take", "topped": "top", "topping": "top", "tore": "tear", "torn": "tear", "totalled": "total", "totalling": "total", "towelled": "towel", "towelling": "towel", "trafficked": "traffic", "trafficking": "traffic", "trameled": "trammel", "trameling": "trammel", "tramelled": "trammel", "tramelling": "trammel", "tramels": "trammel", "transferred": "transfer", "transferring": "transfer", "transmitted": "transmit", "transmitting": "transmit", "trapped": "trap", "trapping": "trap", "travelled": "travel", "travelling": "travel", "trekked": "trek", "trekking": "trek", "tried": "try", "trimmed": "trim", "trimming": "trim", "tripped": "trip", "tripping": "trip", "trod": "tread", "trodden": "tread", "trotted": "trot", "trotting": "trot", "tugged": "tug", "tugging": "tug", "tunnelled": "tunnel", "tunnelling": "tunnel", "twigged": "twig", "twigging": "twig", "twinned": "twin", "twinning": "twin", "tying": "tie", "typified": "typify", "undercutting": "undercut", "undergone": "undergo", "underlaid": "underlay", "underlain": "underlie", "underlay": "underlie", "underlying": "underlie", "underpinned": "underpin", "underpinning": "underpin", "understood": "understand", "undertaken": "undertake", "undertook": "undertake", "underwent": "undergo", "underwritten": "underwrite", "underwrote": "underwrite", "undid": "undo", "undone": "undo", "unfitted": "unfit", "unfitting": "unfit", "unified": "unify", "unravelled": "unravel", "unravelling": "unravel", "unsteadied": "unsteady", "untidied": "untidy", "untying": "untie", "unwound": "unwind", "upheld": "uphold", "upped": "up", "upping": "up", "upsetting": "upset", "upswung": "upswing", "varied": "vary", "vatted": "vat", "vatting": "vat", "verified": "verify", "vetted": "vet", "vetting": "vet", "vilified": "vilify", "wadded": "wad", "wadding": "wad", "wagged": "wag", "wagging": "wag", "wanned": "wan", "wanning": "wan", "warred": "war", "warring": "war", "was": "be", "wearied": "weary", "webbed": "web", "webbing": "web", "wedded": "wed", "wedding": "wed", "weed": "weed", "went": "go", "wept": "weep", "were": "be", "wetted": "wet", "wetting": "wet", "whetted": "whet", "whetting": "whet", "whipped": "whip", "whipping": "whip", "whizzed": "whiz", "whizzes": "whiz", "whizzing": "whiz", "winning": "win", "withdrawn": "withdraw", "withdrew": "withdraw", "withheld": "withhold", "withstood": "withstand", "woke": "wake", "woken": "wake", "won": "win", "wonned": "won", "wonning": "won", "wore": "wear", "worn": "wear", "worried": "worry", "worshipped": "worship", "worshipping": "worship", "wound": "wind", "wove": "weave", "woven": "weave", "wrapped": "wrap", "wrapping": "wrap", "wried": "wry", "written": "write", "wrote": "write", "wrought": "work", "wrung": "wring", "yodelled": "yodel", "yodelling": "yodel", "zapped": "zap", "zapping": "zap", "zigzagged": "zigzag", "zigzagging": "zigzag", "zipped": "zip", "zipping": "zip"
};

const IRREG_VERBS_NOLEX = {
  "abutted": "abut", "abutting": "abut", "ad-libbed": "ad-lib", "ad-libbing": "ad-lib", "aerified": "aerify", "air-dried": "air-dry", "airdropped": "airdrop", "airdropping": "airdrop", "appalled": "appal", "appalling": "appal", "averred": "aver", "averring": "aver", "baby-sat": "baby-sit", "baby-sitting": "baby-sit", "back-pedalled": "back-pedal", "back-pedalling": "back-pedal", "backslid": "backslide", "backslidden": "backslide", "befogged": "befog", "befogging": "befog", "begirt": "begird", "bejewelled": "bejewel", "bejewelling": "bejewel", "belly-flopped": "belly-flop", "belly-flopping": "belly-flop", "blabbed": "blab", "blabbing": "blab", "bobbed": "bob", "bobbing": "bob", "bogged-down": "bog-down", "bogged_down": "bog_down", "bogging-down": "bog-down", "bogging_down": "bog_down", "bogs-down": "bog-down", "bogs_down": "bog_down", "booby-trapped": "booby-trap", "booby-trapping": "booby-trap", "bottle-fed": "bottle-feed", "breast-fed": "breast-feed", "brutified": "brutify", "bullshitted": "bullshit", "bullshitting": "bullshit", "bullwhipped": "bullwhip", "bullwhipping": "bullwhip", "caddies": "caddie", "caddying": "caddie", "carolled": "carol", "carolling": "carol", "catnapped": "catnap", "catnapping": "catnap", "citified": "citify", "cleft": "cleave", "clopped": "clop", "clopping": "clop", "clove": "cleave", "cloven": "cleave", "co-opted": "coopt", "co-opting": "coopt", "co-opts": "coopts", "co-starred": "co-star", "co-starring": "co-star", "coiffed": "coif", "coiffing": "coif", "court-martialled": "court-martial", "court-martialling": "court-martial", "crossbred": "crossbreed", "crosscutting": "crosscut", "curtsied": "curtsy", "dabbed": "dab", "dabbing": "dab", "dandified": "dandify", "debarred": "debar", "debarring": "debar", "debugged": "debug", "debugging": "debug", "decalcified": "decalcify", "declassified": "declassify", "decontrolled": "decontrol", "deep-fried": "deep-fry", "dehumidified": "dehumidify", "deified": "deify","demystified": "demystify", "disbarred": "disbar", "disbarring": "disbar", "disembodied": "disembody", "disembowelled": "disembowel", "disembowelling": "disembowel", "disenthralled": "disenthral", "disenthralling": "disenthral", "disenthralls": "disenthral", "disenthrals": "disenthrall", "disinterred": "disinter", "disinterring": "disinter", "distilled": "distil", "distilling": "distil", "eddied": "eddy", "edified": "edify", "ego-tripped": "ego-trip", "ego-tripping": "ego-trip", "empanelled": "empanel", "empanelling": "empanel", "emulsified": "emulsify", "entrapped": "entrap", "entrapping": "entrap","fibbed": "fib", "fibbing": "fib", "filled_up": "fill_up", "flip-flopped": "flip-flop", "flip-flopping": "flip-flop", "flogged": "flog", "flogging": "flog", "foreran": "forerun", "forerunning": "forerun", "foxtrotted": "foxtrot", "foxtrotting": "foxtrot", "freeze-dried": "freeze-dry", "frigged": "frig", "frigging": "frig", "fritted": "frit", "fritting": "frit", "fulfilled": "fulfil", "fulfilling": "fulfil", "gambolled": "gambol", "gambolling": "gambol", "gasified": "gasify", "gelt": "geld", "gets_lost": "get_lost", "gets_started": "get_started", "getting_lost": "get_lost", "getting_started": "get_started", "ghostwritten": "ghostwrite", "ghostwrote": "ghostwrite", "giftwrapped": "giftwrap", "giftwrapping": "giftwrap", "gilt": "gild", "gipped": "gip", "gipping": "gip", "glommed": "glom", "glomming": "glom", "goes_deep": "go_deep", "going_deep": "go_deep", "gone_deep": "go_deep", "goose-stepped": "goose-step", "goose-stepping": "goose-step", "got_lost": "get_lost", "got_started": "get_started", "gotten_lost": "get_lost", "gypped": "gyp", "gypping": "gyp", "had_a_feeling": "have_a_feeling", "had_left": "have_left", "had_the_feeling": "have_the_feeling", "hand-knitted": "hand-knit", "hand-knitting": "hand-knit", "handfed": "handfeed", "has_a_feeling": "have_a_feeling", "has_left": "have_left", "has_the_feeling": "have_the_feeling", "having_a_feeling": "have_a_feeling", "having_left": "have_left", "having_the_feeling": "have_the_feeling","high-hatted": "high-hat", "high-hatting": "high-hat","hogtying": "hogtie", "horsewhipped": "horsewhip", "horsewhipping": "horsewhip", "humidified": "humidify", "hypertrophied": "hypertrophy", "inbred": "inbreed", "installed": "instal", "installing": "instal", "interbred": "interbreed", "intercutting": "intercut", "interlaid": "interlay", "interlapped": "interlap", "intermarried": "intermarry",  "jellified": "jellify", "jibbed": "jib", "jibbing": "jib", "jitterbugged": "jitterbug", "jitterbugging": "jitterbug", "joined_forces": "join_forces", "joining_battle": "join_battle", "joining_forces": "join_forces", "joins_battle": "join_battle", "joins_forces": "join_forces", "joy-ridden": "joy-ride", "joy-rode": "joy-ride", "jumped_off": "jump_off", "jumping_off": "jump_off", "jumps_off": "jump_off", "jutted": "jut", "jutting": "jut", "knapped": "knap", "knapping": "knap", "ko'd": "ko", "ko'ing": "ko", "ko's": "ko", "lallygagged": "lallygag", "lallygagging": "lallygag", "leaves_undone": "leave_undone", "leaving_undone": "leave_undone", "left_undone": "leave_undone", "lignified": "lignify", "liquified": "liquify", "looked_towards": "look_towards", "looking_towards": "look_towards", "looks_towards": "look_towards", "machine-gunned": "machine-gun", "machine-gunning": "machine-gun", 

"minified": "minify", "miscarried": "miscarry", "misdealt": "misdeal", "misgave": "misgive", "misgiven": "misgive", "mishitting": "mishit", "mislaid": "mislay", "mispled": "misplead", "misspent": "misspend", "mortified": "mortify", "nid-nodded": "nid-nod", "nid-nodding": "nid-nod", "nidified": "nidify", "nigrified": "nigrify", "nitrified": "nitrify", "non-prossed": "non-pros", "non-prosses": "non-pros", "non-prossing": "non-pros", "nonplussed": "nonplus", "nonplusses": "nonplus", "nonplussing": "nonplus", "objectified": "objectify", "outbred": "outbreed", "outcropped": "outcrop", "outcropping": "outcrop", "outdrawn": "outdraw", "outdrew": "outdraw", "outfought": "outfight", "outgassed": "outgas", "outgasses": "outgas", "outgassing": "outgas", "outgeneralled": "outgeneral", "outgeneralling": "outgeneral", "outgone": "outgo", "outmanned": "outman", "outmanning": "outman", "outridden": "outride", "outrode": "outride", "outshot": "outshoot", "outspanned": "outspan", "outspanning": "outspan", "outstood": "outstand", "outthought": "outthink", "outwent": "outgo", "outwore": "outwear", "outworn": "outwear", "overbidden": "overbid", "overbidding": "overbid", "overblew": "overblow", "overblown": "overblow", "overbore": "overbear", "overborne": "overbear", "overbuilt": "overbuild", "overcropped": "overcrop", "overcropping": "overcrop", "overflew": "overfly", "overgrew": "overgrow", "overgrown": "overgrow", "overlain": "overlie", "overlay": "overlie", "overlying": "overlie", "overmanned": "overman", "overmanning": "overman", "oversetting": "overset", "oversewn": "oversew", "overshot": "overshoot", "overslept": "oversleep", "oversold": "oversell", "overspilt": "overspill", "overtopped": "overtop", "overtopping": "overtop", "overwound": "overwind", "overwritten": "overwrite", "overwrote": "overwrite", "pandied": "pandy", "pasquil": "pasquinade", "pasquilled": "pasquinade", "pasquilling": "pasquinade", "pasquils": "pasquinade", "pepped": "pep", "pepping": "pep", "pettifogged": "pettifog", "pettifogging": "pettifog", "phantasied": "phantasy", "photomapped": "photomap", "photomapping": "photomap", "photosetting": "photoset", "physicked": "physic", "physicking": "physic", "pinch-hitting": "pinch-hit", "pipped": "pip", "pipping": "pip", "pistol-whipped": "pistol-whip", "pistol-whipping": "pistol-whip", "pitapatted": "pitapat", "pitapatting": "pitapat", "platted": "plat", "platting": "plat", "played_a_part": "play_a_part", "playing_a_part": "play_a_part", "plays_a_part": "play_a_part", "pommelled": "pommel", "pommelling": "pommel", "preachified": "preachify", "precancelled": "precancel", "precancelling": "precancel", "presignified": "presignify", "pretermitted": "pretermit", "pretermitting": "pretermit", "prettified": "prettify", "prigged": "prig", "prigging": "prig", "prologed": "prologue", "prologing": "prologue", "prologs": "prologue", "pugged": "pug", "pugging": "pug", "put-putted": "put-put", "put-putting": "put-put", "putrefied": "putrefy", "quartersawn": "quartersaw", "quick-froze": "quick-freeze", "quick-frozen": "quick-freeze", "quickstepped": "quickstep", "quickstepping": "quickstep", "ramified": "ramify", "rappelled": "rappel", "rappelling": "rappel", "ravelled": "ravel", "ravelling": "ravel", "razor-cutting": "razor-cut", "re-trod": "re-tread", "re-trodden": "re-tread", "recapped": "recap", "recapping": "recap", "recommitted": "recommit", "recommitting": "recommit", "recopied": "recopy", "red-pencilled": "red-pencil", "red-pencilling": "red-pencil", "reft": "reave", "reified": "reify", "rent": "rend", "replevied": "replevy", "repotted": "repot", "repotting": "repot", "resat": "resit", "resewn": "resew", "resitting": "resit", "retold": "retell", "retransmitted": "retransmit", "retransmitting": "retransmit", "retted": "ret", "retting": "ret", "reunified": "reunify", "revetted": "revet", "revetting": "revet", "revivified": "revivify", "rewound": "rewind", "rigidified": "rigidify", "riven": "rive", "rough-dried": "rough-dry", "rough-hewn": "rough-hew", "rove": "reeve", "rowelled": "rowel", "rowelling": "rowel", "saccharified": "saccharify", "salified": "salify", "sanctified": "sanctify", "sandbagged": "sandbag", "sandbagging": "sandbag", "saponified": "saponify", "scagged": "scag", "scagging": "scag", "scarified": "scarify", "scatted": "scat", "scatting": "scat", "scorified": "scorify", "scragged": "scrag", "scragging": "scrag", "scrammed": "scram", "scramming": "scram", "scried": "scry", "scrummed": "scrum", "scrumming": "scrum", "scudded": "scud", "scudding": "scud", "scummed": "scum", "scumming": "scum", "shagged": "shag", "shagging": "shag", "shaken_hands": "shake_hands", "shakes_hands": "shake_hands", "shaking_hands": "shake_hands", "sharecropped": "sharecrop", "sharecropping": "sharecrop", "shellacked": "shellac", "shellacking": "shellac", "shent": "shend", "shewn": "shew", "shikarred": "shikar", "shikarring": "shikar", "shillyshallied": "shillyshally", "shook_hands": "shake_hands", "shrink-wrapped": "shrink-wrap", "shrink-wrapping": "shrink-wrap", "shriven": "shrive", "shrove": "shrive", "sideslipped": "sideslip", "sideslipping": "sideslip", "sightsaw": "sightsee", "sightseen": "sightsee", "silicified": "silicify", "single-stepped": "single-step", "single-stepping": "single-step", "skellied": "skelly", "skenned": "sken", "skenning": "sken", "sketted": "sket", "sketting": "sket", "skin-popped": "skin-pop", "skin-popping": "skin-pop", "skinny-dipped": "skinny-dip", "skinny-dipping": "skinny-dip", "skivvied": "skivvy", "skydove": "skydive", "slunk": "slink", "smit": "smite", "smitten": "smite", "smote": "smite", "smutted": "smut", "smutting": "smut", "snedded": "sned", "snedding": "sned", "snivelled": "snivel", "snivelling": "snivel", "snogged": "snog", "snogging": "snog", "soft-pedalled": "soft-pedal", "soft-pedalling": "soft-pedal", "solemnified": "solemnify", "soothsaid": "soothsay", "spagged": "spag", "spagging": "spag", "spancelled": "spancel", "spancelling": "spancel", "sparred": "spar", "sparring": "spar", "speechified": "speechify", "spellbound": "spellbind", "spin-dried": "spin-dry", "spoon-fed": "spoon-feed", "sprigged": "sprig", "sprigging": "sprig", "squibbed": "squib", "squibbing": "squib", "stall-fed": "stall-feed", "stellified": "stellify", "stems_from": "stem_from", "stencilled": "stencil", "stencilling": "stencil", "stetted": "stet", "stetting": "stet", "stied": "sty", "stotted": "stot", "stotting": "stot", "strewn": "strew", "stropped": "strop", "stropping": "strop", "strown": "strow", "strummed": "strum", "strumming": "strum", "stultified": "stultify", "stummed": "stum", "stumming": "stum", "stupefied": "stupefy", "subjectified": "subjectify", "subtotalled": "subtotal", "subtotalling": "subtotal", "sullied": "sully", "sulphuretted": "sulphuret", "sulphuretting": "sulphuret", "supped": "sup", "supping": "sup", "swagged": "swag", "swagging": "swag", "swotted": "swot", "swotting": "swot", "syllabified": "syllabify", "taken_a_side": "take_a_side", "taken_pains": "take_pains", "taken_steps": "take_steps", "takes_a_side": "take_a_side", "takes_pains": "take_pains", "takes_steps": "take_steps", "taking_a_side": "take_a_side", "taking_pains": "take_pains", "taking_steps": "take_steps", "talcked": "talc", "talcking": "talc", "tally-ho'd": "tally-ho", "tammied": "tammy", "teaselled": "teasel", "teaselling": "teasel", "tedded": "ted", "tedding": "ted", "tepefied": "tepefy", "testes": "testes", "thinking_the_world_of": "think_the_world_of", "thinks_the_world_of": "think_the_world_of", "thought_the_world_of": "think_the_world_of", "threw_out": "throw_out", "throwing_out": "throw_out", "thrown_out": "throw_out", "throws_out": "throw_out", "thrummed": "thrum", "thrumming": "thrum", "tittupped": "tittup", "tittupping": "tittup", "toadied": "toady", "togged": "tog", "togging": "tog", "took_a_side": "take_a_side", "took_pains": "take_pains", "took_steps": "take_steps", "torrefied": "torrefy", "torrify": "torrefy", "totted": "tot", "totting": "tot", "trammed": "tram", "tramming": "tram", "transfixt": "transfix", "tranship": "transship", "transhipped": "tranship", "transhipping": "tranship", "transmogrified": "transmogrify", "transshipped": "transship", "transshipping": "transship", "trapanned": "trapan", "trapanning": "trapan", "trepanned": "trepan", "trepanning": "trepan", "trigged": "trig", "trigging": "trig", "trogged": "trog", "trogging": "trog", "trowelled": "trowel", "trowelling": "trowel", "tumefied": "tumefy", "tunned": "tun", "tunning": "tun", "tupped": "tup", "tupping": "tup", "tut-tutted": "tut-tut", "tut-tutting": "tut-tut", "twitted": "twit", "twitting": "twit", "typesetting": "typeset", "typewritten": "typewrite", "typewrote": "typewrite", "uglified": "uglify", "unbarred": "unbar", "unbarring": "unbar", "unbent": "unbend", "unbound": "unbind", "uncapped": "uncap", "uncapping": "uncap", "unclad": "unclothe", "unclogged": "unclog", "unclogging": "unclog", "underbidding": "underbid", "underbought": "underbuy", "underfed": "underfeed", "undergirt": "undergird", "underletting": "underlet", "underpaid": "underpay", "underpropped": "underprop", "underpropping": "underprop", "undersetting": "underset", "undershot": "undershoot", "undersold": "undersell", "understudied": "understudy", "unfroze": "unfreeze", "unfrozen": "unfreeze", "unkennelled": "unkennel", "unkennelling": "unkennel", "unknitted": "unknit", "unknitting": "unknit", "unlaid": "unlay", "unlearnt": "unlearn", "unmade": "unmake", "unmanned": "unman", "unmanning": "unman", "unpegged": "unpeg", "unpegging": "unpeg", "unpinned": "unpin", "unpinning": "unpin", "unplugged": "unplug", "unplugging": "unplug", "unrigged": "unrig", "unrigging": "unrig", "unripped": "unrip", "unripping": "unrip", "unrove": "unreeve", "unsaid": "unsay", "unshipped": "unship", "unshipping": "unship", "unslung": "unsling", "unsnapped": "unsnap", "unsnapping": "unsnap", "unspoke": "unspeak", "unspoken": "unspeak", "unstepped": "unstep", "unstepping": "unstep", "unstopped": "unstop", "unstopping": "unstop", "unstrung": "unstring", "unstuck": "unstick", "unswore": "unswear", "unsworn": "unswear", "untaught": "unteach", "unthought": "unthink", "untrod": "untread", "untrodden": "untread", "unwrapped": "unwrap", "unwrapping": "unwrap", "unzipped": "unzip", "unzipping": "unzip", "upbuilt": "upbuild", "uphove": "upheave", "uppercutting": "uppercut", "uprisen": "uprise", "uprose": "uprise", "upsprang": "upspring", "upsprung": "upspring", "upswept": "upsweep", "upswollen": "upswell", "vagged": "vag", "vagging": "vag", "verbified": "verbify", "versified": "versify", "victualled": "victual", "victualling": "victual", "vitrified": "vitrify", "vivified": "vivify", "vying": "vie", "waddied": "waddy", "wadsetted": "wadset", "wadsetting": "wadset", "water-ski'd": "water-ski", "waylaid": "waylay", "weatherstripped": "weatherstrip", "weatherstripping": "weatherstrip", "went_deep": "go_deep", "whammed": "wham", "whamming": "wham", "whapped": "whap", "whapping": "whap", "whinnied": "whinny", "whipsawn": "whipsaw", "whirred": "whir", "whirring": "whir", "whistle-stopped": "whistle-stop", "whistle-stopping": "whistle-stop", "whopped": "whop", "whopping": "whop", "wigwagged": "wigwag", "wigwagging": "wigwag", "window-shopped": "window-shop", "window-shopping": "window-shop", "yakked": "yak", "yakking": "yak", "yapped": "yap", "yapping": "yap",
};

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

const PAST_PART_RULES = [

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
  "scrum", "scud", "scum", "scur", "sentinel", "set", "shag", "sham", "shed", "shim", "shin", "ship", "shir", "shit", "shlap", "shop", "shopfit", "shortfal", "shot", "shovel",
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

const PAST_PART_RULESET = {
  name: "PAST_PARTICIPLE",
  defaultRule: RE(ANY_STEM_RE, 0, "ed", 2),
  rules: PAST_PART_RULES,
  doubling: true
};

const PRESENT_PART_RULESET = {
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

const IRREG_PAST_PART = ["done", "gone", "abode", "been", "begotten", "begun", "bent", "bid", "bidden", "bled", "born", "bought", "brought", "built", "caught", "clad", "chlung", "could", "crept", "dove", "drunk", "dug", "dwelt", "fed", "felt", "fled", "flung", "fought", "found", "ground", "had", "held", "hung", "hurt", "kept", "knelt", "laid", "lain", "led", "left", "lent", "lit", "lost", "made", "met", "mown", "paid", "pled", "relaid", "rent", "rung", "said", "sat", "sent", "shod", "shot", "slain", "slept", "slid", "smelt", "sold", "sought", "spat", "sped", "spelt", "spent", "split", "spolit", "sprung", "spun", "stood", "stuck", "struck", "stung", "stunk", "sung", "sunk", "swept", "sworn", "swum", "swung", "taight", "thought", "told", "torn", "undergone", "understood", "wept", "woken", "won", "worn", "wound", "wrung"];

const VB_ENDS_IN_E = ["abate", "abdicate", "abide", "abridge", "abrogate", "absolve", "abuse", "accede", "accelerate", "accentuate", "accommodate", "accrue", "accumulate", "accuse", "ache", "achieve", "acknowledge", "acquiesce", "acquire", "activate", "addle", "adhere", "adjudge", "adjudicate", "administrate", "admire", "adore", "adulterate", "advance", "advantage", "adventure", "advertise", "advise", "advocate", "affiliate", "age", "aggrandize", "aggravate", "aggrieve", "agitate", "agonize", "agree", "alienate", "allege", "alleviate", "allocate", "allude", "alternate", "amalgamate", "amaze", "amble", "amortize", "amputate", "amuse", "analyse", "analyze", "angle", "animate", "annihilate", "annotate", "announce", "annualize", "antagonize", "ante", "anticipate", "ape", "apologize", "appease", "appraise", "appreciate", "apprentice", "apprise", "appropriate", "approve", "approximate", "arbitrate", "argue", "arise", "arouse", "arrange", "arrive", "arrogate", "articulate", "ascribe", "aspire", "assassinate", "assemble", "assimilate", "associate", "assuage", "assume", "assure", "atone", "attire", "attribute", "attune", "authenticate", "authorize", "automate", "avenge", "average", "awake", "awe", "babble", "backdate", "backfire", "baffle", "bake", "balance", "bale", "bandage", "baptize", "barbecue", "bare", "barge", "barricade", "base", "bathe", "battle", "be", "become", "befuddle", "begrudge", "beguile", "behave", "belie", "believe", "belittle", "berate", "besiege", "betide", "beware", "bide", "birdie", "bite", "blame", "blare", "blaze", "blindside", "blockade", "bode", "boggle", "bone", "bore", "bottle", "bounce", "brace", "brake", "brave", "breathe", "breeze", "bribe", "bridge", "bridle", "bristle", "broke", "browse", "bruise", "brutalize", "bubble", "buckle", "budge", "bulge", "bulldoze", "bumble", "bundle", "bungle", "burne", "bustle", "cable", "cage", "cajole", "calculate", "calibrate", "calve", "camouflage", "cannibalize", "capitalize", "capitulate", "captivate", "capture", "care", "caricature", "carve", "cascade", "case", "castigate", "catalogue", "catalyze", "categorize", "cause", "cave", "cease", "cede", "celebrate", "censure", "centralize", "chafe", "challenge", "chance", "change", "characterize", "charge", "chase", "chastise", "chide", "chime", "choke", "choose", "chortle", "chronicle", "chuckle", "circle", "circulate", "cite", "civilize", "cleanse", "clone", "close", "clothe", "coagulate", "coalesce", "cobble", "coddle", "code", "coerce", "coincide", "collaborate", "collapse", "collateralize", "collide", "collude", "colonize", "combine", "come", "commemorate", "commence", "commercialize", "commingle", "commiserate", "commune", "communicate", "communize", "commute", "compare", "compensate", "compete", "compile", "complete", "complicate", "compose", "comprise", "compromise", "compute", "computerize", "concede", "conceive", "concentrate", "conclude", "condense", "condone", "cone", "confide", "confine", "confiscate", "confuse", "congratulate", "congregate", "conjure", "connote", "conserve", "console", "consolidate", "conspire", "constitute", "construe", "consume", "consummate", "contaminate", "contemplate", "continue", "contribute", "contrive", "convene", "converge", "converse", "convince", "convolute", "cooperate", "coordinate", "cope", "correlate", "corroborate", "corrode", "corrugate", "costume", "countenance", "counterbalance", "countersue", "couple", "course", "crackle", "cradle", "crane", "crave", "craze", "create", "cremate", "criminalize", "cringe", "cripple", "criticize", "cruise", "crumble", "crumple", "crusade", "crystallize", "cuddle", "cue", "culminate", "cultivate", "culture", "cure", "curse", "curve", "customize", "cycle", "dabble", "damage", "dance", "dangle", "dare", "date", "dawdle", "daze", "dazzle", "deactivate", "debase", "debate", "debilitate", "decaffeinate", "decease", "deceive", "decelerate", "decentralize", "decide", "decimate", "declare", "decline", "decode", "decompose", "decorate", "decrease", "decree", "dedicate", "deduce", "defame", "define", "deflate", "defuse", "degenerate", "degrade", "dehumanize", "dehydrate", "delegate", "delete", "deliberate", "delineate", "delude", "deluge", "delve", "demilitarize", "demobilize", "democratize", "demonize", "demonstrate", "demoralize", "demote", "denationalize", "denigrate", "denominate", "denote", "denounce", "denuclearize", "denude", "deplete", "deplore", "depose", "depreciate", "deprive", "derange", "deregulate", "deride", "derive", "describe", "desecrate", "desegregate", "deserve", "designate", "desire", "despise", "destabilize", "destine", "deteriorate", "determine", "dethrone", "detonate", "devalue", "devastate", "deviate", "devise", "devote", "diagnose", "dictate", "die", "differentiate", "diffuse", "dilapidate", "dilate", "dilute", "dine", "disable", "disagree", "disapprove", "disassemble", "disassociate", "disbelieve", "disburse", "discharge", "discipline", "disclose", "discontinue", "discourage", "discourse", "discriminate", "disenfranchise", "disengage", "disentangle", "disfigure", "disgorge", "disgrace", "disgruntle", "disguise", "disincline", "disintegrate", "dislike", "dislodge", "dismantle", "disorganize", "disparage", "dispense", "disperse", "displace", "displease", "dispose", "disprove", "dispute", "disseminate", "dissipate", "dissociate", "dissolve", "dissuade", "distance", "distribute", "dive", "diverge", "divide", "divine", "divorce", "divulge", "dodge", "dole", "dominate", "donate", "double", "douse", "downgrade", "downsize", "doze", "dramatize", "drape", "dredge", "dribble", "drive", "drizzle", "dupe", "duplicate", "dwindle", "dye", "ease", "eclipse", "economize", "edge", "editorialize", "educate", "eke", "elaborate", "elapse", "elate", "elevate", "eliminate", "elongate", "elucidate", "elude", "emaciate", "emanate", "emancipate", "emasculate", "embattle", "embezzle", "embrace", "emerge", "emigrate", "empathize", "emphasize", "emulate", "enable", "encase", "encircle", "enclose", "encode", "encourage", "endorse", "endure", "energize", "enforce", "engage", "engrave", "enhance", "enlarge", "enrage", "enrapture", "ensconce", "enshrine", "enslave", "ensnare", "ensue", "ensure", "entangle", "entice", "entitle", "entrance", "entwine", "enumerate", "enunciate", "envisage", "epitomize", "equalize", "equate", "eradicate", "erase", "erode", "escalate", "escape", "espouse", "estimate", "estrange", "evacuate", "evade", "evaluate", "evaporate", "evidence", "evince", "eviscerate", "evoke", "evolve", "exacerbate", "exaggerate", "examine", "exasperate", "excavate", "exchange", "excise", "excite", "exclude", "excommunicate", "excoriate", "excrete", "excuse", "execute", "exercise", "exhale", "exhilarate", "exile", "exonerate", "expedite", "experience", "expire", "explode", "explore", "expose", "expunge", "extenuate", "exterminate", "extradite", "extrapolate", "extricate", "extrude", "exude", "eye", "fabricate", "face", "facilitate", "fade", "fake", "fame", "familiarize", "fantasize", "fare", "fascinate", "fatigue", "faze", "feature", "fence", "fertilize", "fete", "fictionalize", "fiddle", "figure", "file", "finalize", "finance", "fine", "finesse", "fire", "fissure", "fixate", "fizzle", "flagellate", "flame", "flare", "fledge", "flee", "fleece", "fluctuate", "footnote", "forage", "force", "foreclose", "foresee", "forge", "forgive", "formalize", "formulate", "forsake", "fracture", "frame", "franchise", "frazzle", "free", "freeze", "frustrate", "fudge", "fulminate", "fumble", "fume", "fuse", "gage", "galvanize", "gamble", "garble", "gauge", "gaze", "gee", "generalize", "generate", "gentle", "germinate", "gesture", "giggle", "give", "glance", "glare", "glaze", "glide", "glimpse", "glove", "glue", "gobble", "goggle", "google", "gore", "gouge", "grace", "grade", "graduate", "grapple", "grate", "gravitate", "graze", "grease", "grieve", "grimace", "gripe", "grope", "grouse", "grumble", "guarantee", "guide", "gurgle", "guzzle", "gyrate", "haggle", "halogenate", "halve", "handle", "harangue", "harmonize", "hassle", "hate", "have", "he", "headline", "heave", "heckle", "hedge", "hemorrhage", "hesitate", "hibernate", "hide", "hike", "hinge", "hire", "hobble", "hole", "home", "homogenize", "hone", "hope", "hose", "hospitalize", "house", "huddle", "humanize", "humble", "humiliate", "hurdle", "hurtle", "hustle", "hydrolyze", "hype", "hyphenate", "hypnotize", "hypothesize", "idealize", "idle", "idolize", "ignite", "ignore", "illuminate", "illumine", "illustrate", "image", "imagine", "imbibe", "imbue", "imitate", "immerse", "immigrate", "immobilize", "immortalize", "immunize", "impale", "impede", "impinge", "implicate", "implore", "impose", "improve", "improvise", "impute", "inactivate", "inaugurate", "incapacitate", "incarcerate", "incarnate", "incense", "incite", "incline", "include", "incorporate", "increase", "incriminate", "incubate", "indenture", "indicate", "individualize", "indoctrinate", "induce", "indulge", "industrialize", "infiltrate", "inflame", "inflate", "influence", "infringe", "infuriate", "infuse", "ingratiate", "inhale", "initiate", "injure", "innovate", "inoculate", "inquire", "inscribe", "insinuate", "inspire", "instigate", "institute", "institutionalize", "insulate", "insure", "integrate", "intercede", "interface", "interfere", "interlace", "intermingle", "internationalize", "interpolate", "interrelate", "interrogate", "intersperse", "intertwine", "intervene", "interweave", "intimate", "intimidate", "intone", "intrigue", "introduce", "intrude", "inundate", "inure", "invade", "invalidate", "investigate", "invigorate", "invite", "invoke", "involve", "ionize", "irradiate", "irrigate", "irritate", "isolate", "issue", "itemize", "jade", "jeopardize", "jiggle", "jive", "joke", "jostle", "judge", "juggle", "jumble", "juxtapose", "keynote", "kindle", "knuckle", "lace", "lacerate", "lactate", "lade", "lambaste", "laminate", "landscape", "lapse", "largesse", "lease", "leave", "lecture", "legalize", "legislate", "legitimize", "leverage", "liberalize", "liberate", "license", "lie", "like", "line", "lionize", "liquidate", "litigate", "live", "loathe", "localize", "locate", "lodge", "loose", "lope", "lose", "lounge", "love", "lubricate", "lunge", "lure", "magnetize", "make", "malpractice", "manage", "mandate", "mangle", "manhandle", "manicure", "manipulate", "manufacture", "marginalize", "marinate", "masquerade", "massacre", "massage", "mate", "materialize", "mature", "maximize", "measure", "mechanize", "meddle", "mediate", "meditate", "memorialize", "memorize", "menace", "merchandise", "merge", "mesmerize", "message", "metabolize", "mete", "microwave", "migrate", "mince", "mine", "mingle", "miniaturize", "minimize", "mire", "misallocate", "misappropriate", "misbehave", "miscalculate", "mischarge", "misconstrue", "misguide", "mishandle", "misjudge", "mismanage", "misperceive", "misplace", "misprice", "misquote", "misstate", "mistake", "misuse", "mitigate", "mobilize", "moderate", "modernize", "modulate", "monopolize", "moralize", "mortgage", "motivate", "motorize", "mottle", "move", "muddle", "muffle", "mumble", "muscle", "muse", "mutate", "mute", "mutilate", "muzzle", "name", "narrate", "nationalize", "naturalize", "nauseate", "navigate", "necessitate", "needle", "negate", "negotiate", "nestle", "nettle", "neutralize", "nibble", "nickname", "nominate", "normalize", "nose", "nosedive", "note", "notice", "nudge", "nuke", "nurse", "nurture", "obfuscate", "obligate", "oblige", "obliterate", "obscure", "observe", "obtrude", "obviate", "officiate", "ogle", "ooze", "operate", "opine", "oppose", "optimize", "orchestrate", "organize", "originate", "oscillate", "ostracize", "outdate", "outdistance", "outline", "outlive", "outmode", "outpace", "outrage", "outscore", "outshine", "overcharge", "overcome", "overdose", "overemphasize", "overestimate", "overprice", "overproduce", "overrate", "overregulate", "override", "overrule", "oversee", "overstate", "overtake", "overuse", "overvalue", "owe", "pace", "package", "page", "pale", "panelize", "pantomime", "parachute", "parade", "paralyze", "paraphrase", "pare", "parse", "partake", "participate", "paste", "pasteurize", "pasture", "patronize", "pause", "pave", "peddle", "penalize", "penetrate", "perceive", "perfume", "permeate", "perpetrate", "perpetuate", "persecute", "persevere", "personalize", "persuade", "peruse", "pervade", "phase", "phone", "phrase", "picture", "piece", "pierce", "pile", "pillage", "pine", "pipe", "pique", "pirate", "placate", "place", "plagiarize", "plague", "plane", "plate", "please", "pleasure", "pledge", "plunge", "poise", "poke", "polarize", "pole", "police", "politicize", "pollinate", "pollute", "popularize", "populate", "pore", "pose", "postpone", "postulate", "posture", "pounce", "practice", "praise", "prance", "prearrange", "precede", "precipitate", "preclude", "predate", "predicate", "predispose", "predominate", "prefabricate", "preface", "prejudge", "prejudice", "premiere", "prepackage", "prepare", "presage", "prescribe", "preserve", "preside", "pressure", "pressurize", "presume", "presuppose", "price", "pride", "prime", "privatize", "prize", "probe", "procrastinate", "procreate", "procure", "produce", "profile", "proliferate", "promise", "promote", "promulgate", "pronounce", "propagandize", "propagate", "propose", "prorate", "proscribe", "prosecute", "proselytize", "prostitute", "protrude", "prove", "provide", "provoke", "prune", "publicize", "pulsate", "pulse", "pulverize", "punctuate", "puncture", "purchase", "purge", "purse", "pursue", "puzzle", "quadruple", "quake", "quarantine", "queue", "quibble", "quintuple", "quote", "race", "radiate", "radicalize", "rage", "raise", "rake", "ramble", "range", "rankle", "rape", "rate", "rationalize", "rattle", "ravage", "rave", "raze", "reacquire", "reactivate", "realestate", "realize", "reallocate", "reappraise", "rearrange", "reassemble", "reassume", "reassure", "reauthorize", "rebalance", "rebate", "rebuke", "recalculate", "recede", "receive", "recharge", "reciprocate", "recite", "recline", "recognize", "reconcile", "reconstitute", "reconvene", "recreate", "recuperate", "recuse", "recycle", "redecorate", "redefine", "redistribute", "redouble", "reduce", "reemerge", "reexamine", "refile", "refinance", "refine", "reformulate", "refrigerate", "refuse", "refute", "regale", "regenerate", "regulate", "rehabilitate", "rehearse", "reignite", "reimburse", "reimpose", "reincarnate", "reinforce", "reinstate", "reinstitute", "reinsure", "reintegrate", "reintroduce", "reinvigorate", "reiterate", "rejoice", "rejuvenate", "rekindle", "relate", "release", "relegate", "relieve", "relive", "relocate", "remade", "remake", "reminisce", "remove", "rename", "renationalize", "renege", "renegotiate", "renounce", "renovate", "reorganize", "repackage", "repatriate", "rephrase", "replace", "replicate", "reprice", "reproduce", "repudiate", "repulse", "repurchase", "repute", "require", "reroute", "reschedule", "rescue", "resemble", "reserve", "resettle", "reshape", "reshuffle", "reside", "resolve", "resonate", "restage", "restate", "restore", "restructure", "restyle", "resume", "resurface", "resurge", "resuscitate", "retake", "retaliate", "retire", "retrace", "retrieve", "reunite", "reuse", "revalue", "reverberate", "revere", "reverse", "revile", "revise", "revitalize", "revive", "revoke", "revolutionize", "revolve", "rewrite", "rhyme", "riddle", "ride", "ridicule", "riffle", "rile", "rinse", "ripple", "rise", "romance", "romanticize", "rope", "rotate", "rouse", "route", "rove", "rubberize", "ruffle", "rule", "rumble", "ruminate", "rummage", "rupture", "rustle", "sabotage", "sacrifice", "saddle", "salute", "salvage", "salve", "sample", "sanitize", "satirize", "saturate", "saute", "savage", "save", "scale", "scandalize", "scare", "scavenge", "schedule", "scheme", "schmooze", "score", "scramble", "scrape", "scribble", "scrounge", "scrutinize", "sculpture", "scuttle", "secede", "seclude", "secrete", "secure", "seduce", "see", "seethe", "segregate", "seize", "sense", "sensitize", "sentence", "separate", "serenade", "serialize", "serve", "service", "settle", "shackle", "shade", "shake", "shame", "shape", "share", "shave", "shelve", "shine", "shore", "shortchange", "shove", "showcase", "shuffle", "shute", "shuttle", "side", "sideline", "sidle", "silence", "simulate", "single", "situate", "size", "sizzle", "skate", "slate", "slice", "slide", "sluice", "smile", "smoke", "smuggle", "snake", "snare", "sneeze", "snipe", "snooze", "snore", "socialize", "solve", "soothe", "source", "space", "spare", "sparkle", "specialize", "speculate", "spice", "spike", "spite", "splice", "sponge", "sprinkle", "spruce", "squabble", "square", "squeeze", "stabilize", "stage", "stagnate", "stake", "stampede", "standardize", "stare", "startle", "starve", "state", "stave", "stereotype", "sterilize", "stifle", "stimulate", "stipulate", "stockpile", "stoke", "stone", "store", "straddle", "straggle", "strangle", "streamline", "stride", "strike", "strive", "stroke", "structure", "struggle", "stumble", "style", "stylize", "stymie", "subdue", "subjugate", "submerge", "subordinate", "subscribe", "subside", "subsidize", "substantiate", "substitute", "subtitle", "sue", "suffice", "suffocate", "suffuse", "summarize", "superimpose", "supersede", "supervise", "suppose", "surface", "surge", "surmise", "surprise", "survive", "swathe", "swerve", "swindle", "swipe", "symbolize", "sympathize", "synchronize", "syndicate", "synthesize", "table", "tabulate", "tackle", "take", "tame", "tangle", "tantalize", "tape", "taste", "tease", "tee", "telephone", "telescope", "televise", "temporize", "terminate", "terrace", "terrorize", "theme", "theorize", "thieve", "thrive", "throttle", "tickle", "tide", "tie", "tile", "time", "tingle", "tinkle", "tipple", "tiptoe", "tire", "titillate", "title", "toe", "tolerate", "tone", "tongue", "topple", "torture", "tote", "trace", "trade", "traipse", "trample", "transcribe", "transfuse", "translate", "transpire", "transpose", "traumatize", "traverse", "treasure", "treble", "tremble", "trickle", "trifle", "triple", "trivialize", "trouble", "trounce", "trudge", "truncate", "trundle", "tumble", "tune", "tussle", "twine", "twinkle", "type", "unbalance", "underestimate", "underlie", "underline", "undermine", "underrate", "underscore", "understate", "undertake", "underuse", "underutilize", "undervalue", "underwrite", "unhinge", "unionize", "unite", "unnerve", "unscramble", "unsettle", "untie", "update", "upgrade", "upstage", "urbanize", "urge", "use", "utilize", "vacate", "vacillate", "validate", "value", "vandalize", "venerate", "ventilate", "venture", "vibrate", "victimize", "videotape", "vindicate", "violate", "visualize", "voice", "vote", "wade", "waffle", "wage", "waggle", "waive", "wake", "wane", "wangle", "warble", "warehouse", "waste", "wave", "weave", "wedge", "welcome", "were", "wheeze", "while", "whine", "whistle", "whittle", "wholesale", "wiggle", "wince", "wipe", "wire", "wobble", "womanize", "wrangle", "wrestle", "wrinkle", "write", "writhe"];

const VB_ENDS_IN_DOUBLE = ["access", "add", "address", "agree", "amass", "appall", "assess", "ball", "ballyhoo", "bankroll", "befall", "bill", "bless", "bluff", "boo", "boycott", "bull", "buttress", "buzz", "bypass", "call", "caress", "chill", "class", "compass", "compress", "confess", "crisscross", "cross", "cuff", "cull", "decree", "depress", "digress", "disagree", "discuss", "dismiss", "dispossess", "distill", "distress", "doff", "doo", "dress", "drill", "dull", "dwell", "ebb", "egg", "embarrass", "emboss", "encompass", "engross", "enroll", "express", "fall", "fill", "flee", "foresee", "forestall", "foretell", "free", "fulfill", "fuss", "gall", "gee", "gloss", "grass", "grill", "gross", "guarantee", "guess", "handcuff", "harass", "harness", "huff", "impress", "install", "instill", "kill", "kiss", "loll", "lull", "mass", "mess", "mill", "miss", "misspell", "mothball", "mull", "obsess", "oppress", "outclass", "outguess", "outsell", "overbill", "overfill", "oversee", "pall", "pass", "piss", "poll", "possess", "press", "process", "profess", "progress", "puff", "pull", "purr", "putt", "quell", "reassess", "rebuff", "recall", "recess", "redress", "refill", "regress", "repossess", "repress", "reprocess", "resell", "roll", "scoff", "scuff", "see", "sell", "shampoo", "shell", "shoo", "skill", "smell", "sniff", "snowball", "snuff", "spell", "spill", "staff", "stall", "stiff", "still", "stonewall", "stress", "stroll", "stuff", "suppress", "surpass", "swell", "taboo", "tattoo", "tee", "tell", "thrill", "till", "toll", "toss", "trespass", "truss", "wall", "well", "will", "witness", "woo", "yell"];

Conjugator.VERB_CONS_DOUBLING = VERB_CONS_DOUBLING; // for scripts

export default Conjugator;