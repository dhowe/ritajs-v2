const RE = require("./util").RE;
const MODALS = require("./util").MODALS;

const SINGULAR_RULES = [
  RE("([a-z]+osis|[a-z]+itis|[a-z]+ness)$", 0),
  RE("ves$", 3, "f"),
  RE("(men|women)$", 2, "an"),
  RE("(houses|horses|cases)$", 1), //End with: e -> es
  RE("^(toes|wheezes|oozes|uses)$", 1), //Word: e -> es
  RE("^(whizzes)$", 3),
  RE("^(octopus|pinch)es$", 2),
  // RE("^[lm]ice$", 3, "ousea_"),
  RE("^(meninges|phalanges)$", 3, "x"), // x -> ges
  RE("^(curi|formul|vertebr|larv|uln|alumn|signor|alg|minuti)ae$", 1), // ?
  RE("^(apices|cortices)$", 4, "ex")
];

const PLURAL_RULES = [
  RE("prognosis", 2, "es"),
  RE("([a-z]+osis|[a-z]+itis|[a-z]+ness)$", 0),
  RE("(human|german|roman)$", 0, "s"),
  RE("^(monarch|loch|stomach)$", 0, "s"),
  RE("^(piano|photo|solo|ego|tobacco|cargo|taxi)$", 0, "s"),
  RE("(chief|proof|ref|relief|roof|belief|sheaf|spoof|golf|grief)$", 0, "s"),
  RE("^(wildlife)$", 0, "s"),
  RE("^(appendix|index|matrix|apex|cortex)", 2, "ices"),
  RE("^concerto$", 1, "i"),
  RE("[bcdfghjklmnpqrstvwxyz]o$", 0, "es"),
  RE("[bcdfghjklmnpqrstvwxyz]y$", 1, "ies"),
  RE("^ox$", 0, "en"),
  RE("^(stimul|alumn|termin)us$", 2, "i"),
  RE("^corpus$", 2, "ora"),
  RE("(xis|sis)$", 2, "es"),
  RE("(ness)$", 0, "es"),
  RE("whiz$", 0, "zes"),
  RE("([zsx]|ch|sh)$", 0, "es"), // words ending in 's' hit here
  RE("[lraeiou]fe$", 2, "ves"),
  RE("[lraeiou]f$", 1, "ves"),
  RE("(eu|eau)$", 0, "x"),
  RE("(man|woman)$", 2, "en"),
  RE("money$", 2, "ies"),
  RE("person$", 4, "ople"),
  RE("motif$", 0, "s"),
  RE("^meninx|phalanx$", 1, "ges"),
  RE("schema$", 0, "ta"),
  RE("^bus$", 0, "ses"),
  RE("child$", 0, "ren"),
  RE("^(curi|formul|vertebr|larv|uln|alumn|signor|alg|minuti)a$", 0, "e"),
  RE("^(maharaj|raj|myn|mull)a$", 0, "hs"),
  RE("^aide-de-camp$", 8, "s-de-camp"),
  RE("^weltanschauung$", 0, "en"),
  RE("^lied$", 0, "er"),
  RE("^tooth$", 4, "eeth"),
  RE("^[lm]ouse$", 4, "ice"),
  RE("^foot$", 3, "eet"),
  RE("femur", 2, "ora"),
  RE("goose", 4, "eese"),
  RE("^(co|no)$", 0, "'s"),
  RE("^blond$", 0, "es"),
  RE("^(medi|millenni|consorti|sept|memorabili)um$", 2, "a"),
  RE("^(memorandum|bacterium|curriculum|minimum|" + "maximum|referendum|spectrum|phenomenon|criterion)$", 2, "a") // Latin stems
];

const DEFAULT_PLURAL_RULE = RE("^((\\w+)(-\\w+)*)(\\s((\\w+)(-\\w+)*))*$", 0, "s");

//const MODALS = ["shall", "would", "may", "might", "ought", "should"];

let RiTa;
let x = 0;
class Pluralizer {

  constructor(parent) {
    RiTa = parent;
  }

  singularize(word) {

    if (!word || !word.length) return '';

    if (MODALS.includes(word.toLowerCase())) return word;

    let rules = SINGULAR_RULES;
    let i = rules.length;

    while (i--) {
      if (rules[i].applies(word.toLowerCase())) {
        return rules[i].fire(word);
      }
    }

    return RiTa.stem(word);
  }

  pluralize(word) {

    if (!word || !word.length) return '';

    if (MODALS.includes(word.toLowerCase())) return word;

    let rules = PLURAL_RULES;
    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i];
      if (rule.applies(word.toLowerCase())) {
        //console.log(i,rule);
        return rule.fire(word);
      }
    }

    return DEFAULT_PLURAL_RULE.fire(word);
  }

  isPlural(word) {

    if (MODALS.includes(word)) return true;

    if (RiTa.stem(word) === word) return false;

    let sing = RiTa.singularize(word);
    let data = RiTa._lexicon().dict[sing];

    if (data && data.length === 2) {
      let pos = data[1].split(' ');
      for (let i = 0; i < pos.length; i++) {
        if (pos[i] === 'nn')
          return true;
      }

    } else if (word.endsWith("ses") || word.endsWith("zes")) {

      sing = word.substring(0, word.length - 1);
      let data = RiTa._lexicon().dict[sing];
      if (data && data.length === 2) {
        let pos = data[1].split(' ');
        for (let i = 0; i < pos.length; i++) {
          if (pos[i] === 'nn')
            return true;
        }
      }
    }
    return false;
  }
}

module && (module.exports = Pluralizer);
