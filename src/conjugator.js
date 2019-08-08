
class Conjugator {

  constructor() {

    this.perfect = this.progressive = this.passive = this.interrogative = false;
    this.tense = RiTa.PRESENT_TENSE;
    this.person = RiTa.FIRST_PERSON;
    this.number = RiTa.SINGULAR;
    this.form = RiTa.NORMAL;
  },

  // !@# TODO: add handling of past tense modals.
  conjugate(theVerb, args) {

    let v, s, actualModal, conjs = [],
      frontVG, verbForm;

    if (!theVerb || !theVerb.length) return E;

    if (!args) return theVerb;

    // ------------------ handle arguments ------------------

    v = theVerb.toLowerCase();
    if (v === "am" || v === "are" || v === "is" || v === "was" || v === "were") {
      v = "be";
    }
    frontVG = v;

    args.number && (this.number = args.number);
    args.person && (this.person = args.person);
    args.tense && (this.tense = args.tense);
    args.form && (this.form = args.form);
    args.passive && (this.passive = args.passive);
    args.progressive && (this.progressive = args.progressive);
    args.interrogative && (this.interrogative = args.interrogative);
    args.perfect && (this.perfect = args.perfect);

    // ----------------------- start ---------------------------
    if (this.form == RiTa.INFINITIVE) {
      actualModal = "to";
    }

    if (this.tense == RiTa.FUTURE_TENSE) {
      actualModal = "will";
    }

    if (this.passive) {
      conjs.push(this.getPastParticiple(frontVG));
      frontVG = "be";
    }

    if (this.progressive) {
      conjs.push(this.getPresentParticiple(frontVG));
      frontVG = "be";
    }

    if (this.perfect) {
      conjs.push(this.getPastParticiple(frontVG));
      frontVG = "have";
    }

    if (actualModal) {

      // log("push: "+frontVG);
      conjs.push(frontVG);
      frontVG = null;
    }

    // Now inflect frontVG (if it exists) and push it on restVG
    if (frontVG) {
      if (this.form === RiTa.GERUND) { // gerund - use ING form

        let pp = this.getPresentParticiple(frontVG);

        // !@# not yet implemented! ??? WHAT?
        conjs.push(pp);
      } else if (this.interrogative && frontVG != "be" && conjs.length < 1) {

        conjs.push(frontVG);
      } else {

        verbForm = this.getVerbForm(frontVG, this.tense, this.person, this.number);
        conjs.push(verbForm);
      }
    }

    // add modal, and we're done
    actualModal && conjs.push(actualModal);

    s = E;
    for (let i = 0; i < conjs.length; i++) {
      s = conjs[i] + " " + s;
    }

    // !@# test this
    endsWith(s, "peted") && err("Unexpected output: " + this.toString());

    return trim(s);
  },

  checkRules(ruleSet, theVerb) {

    let res, name = ruleSet.name,
      dbug = 0,
      rules = ruleSet.rules,
      defRule = ruleSet.defaultRule;

    if (!rules) err("no rule: " + ruleSet.name + ' of ' + theVerb);

    if (inArray(MODALS, theVerb)) return theVerb;

    for (let i = 0; i < rules.length; i++) {

      dbug && console.log("checkRules(" + name + ").fire(" + i + ")=" + rules[i].regex);
      if (rules[i].applies(theVerb)) {

        let got = rules[i].fire(theVerb);

        dbug && console.log("HIT(" + name + ").fire(" + i + ")=" + rules[i].regex + "_returns: " + got);
        return got;
      }
    }
    dbug && console.log("NO HIT!");

    if (ruleSet.doubling && inArray(VERB_CONS_DOUBLING, theVerb)) {

      dbug && console.log("doDoubling!");
      theVerb = this.doubleFinalConsonant(theVerb);
    }

    res = defRule.fire(theVerb);

    dbug && console.log("checkRules(" + name + ").returns: " + res);

    return res;
  },

  doubleFinalConsonant(word) {
    return word + word.charAt(word.length - 1);
  },

  getPast(theVerb, pers, numb) {

    if (theVerb.toLowerCase() == "be") {

      switch (numb) {

      case RiTa.SINGULAR:

        switch (pers) {

        case RiTa.FIRST_PERSON:
          break;

        case RiTa.THIRD_PERSON:
          return "was";

        case RiTa.SECOND_PERSON:
          return "were";

        }
        break;

      case RiTa.PLURAL:

        return "were";
      }
    }

    return this.checkRules(PAST_TENSE_RULESET, theVerb);
  },

  getPresent(theVerb, person, number) {

    person = person || this.person;
    number = number || this.number;

    if ((person == RiTa.THIRD_PERSON) && (number == RiTa.SINGULAR)) {

      return this.checkRules(PRESENT_TENSE_RULESET, theVerb);
    } else if (theVerb == "be") {

      if (number == RiTa.SINGULAR) {

        switch (person) {

        case RiTa.FIRST_PERSON:
          return "am";

        case RiTa.SECOND_PERSON:
          return "are";

        case RiTa.THIRD_PERSON:
          return "is";

          // default: ???
        }

      } else {
        return "are";
      }
    }
    return theVerb;
  },

  getPresentParticiple(theVerb) {
    if (theVerb && theVerb === 'be') return 'being';
    return strOk(theVerb) ? this.checkRules(PRESENT_PARTICIPLE_RULESET, theVerb) : E;
  },

  getPastParticiple(theVerb) {

    return strOk(theVerb) ? this.checkRules(PAST_PARTICIPLE_RULESET, theVerb) : E;
  },

  getVerbForm(theVerb, tense, person, number) {

    switch (tense) {
    case RiTa.PRESENT_TENSE:
      return this.getPresent(theVerb, person, number);
    case RiTa.PAST_TENSE:
      return this.getPast(theVerb, person, number);
    }
    return theVerb;
  },

  toString() {
    return "  ---------------------" + BN + "  Passive = " + this.passive +
      BN + "  Perfect = " + this.perfect + BN + "  Progressive = " +
      this.progressive + BN + "  ---------------------" + BN + "  Number = " +
      this.number + BN + "  Person = " + this.person + BN + "  Tense = " +
      this.tense + BN + "  ---------------------" + BN;
  }
}

module && (module.exports = Conjugator);
