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
    return this._checkRules(PAST_PARTICIPLE_RULESET, theVerb);
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

    if (this.RiTa.hasWord(word) && this.RiTa.isVerb(word)) {
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
  RE("^come"),
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

Conjugator.VERB_CONS_DOUBLING = VERB_CONS_DOUBLING; // for scripts

export default Conjugator;