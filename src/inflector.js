const Util = require("./util");

const RE = Util.RE;
const MODALS = Util.MODALS;
const DEFAULT_IS_PLURAL = /(ae|ia|s)$/;
const DEFAULT_SINGULAR_RULE = RE("^.*s$", 1);
const DEFAULT_PLURAL_RULE = RE("^((\\w+)(-\\w+)*)(\\s((\\w+)(-\\w+)*))*$", 0, "s");

const SINGULAR_RULES = [
  RE("^(apices|cortices)$", 4, "ex"),
  RE("^(meninges|phalanges)$", 3, "x"), // x -> ges
  RE("^(octopus|pinch)es$", 2),
  RE("^(whizzes)$", 3),
  RE("^(tomatoes|kisses)$", 2),
  RE("^(to|wheez|ooz|us|enterpris|alcov|hous|hors|cas|daz|hiv|div|additiv)es$", 1), //End with: es -> e
  RE("(l|w)ives$", 3, "fe"),
  RE("(men|women)$", 2, "an"),
  RE("ves$", 3, "f"),
  RE("^(appendices|matrices)$", 3, "x"),
  RE("^(indices|apices|cortices)$", 4, "ex"),
  RE("^(gas|bus)es$", 2),
  RE("([a-z]+osis|[a-z]+itis|[a-z]+ness)$", 0),
  RE("^(stimul|alumn|termin)i$", 1, "us"),
  RE("^(media|millennia|consortia|septa|memorabilia|data)$", 1, "um"),
  RE("^(memoranda|bacteria|curricula|minima|maxima|referenda|spectra|phenomena|criteria)$", 1, "um"), // Latin stems
  RE("ora$", 3, "us"),
  RE("^[lm]ice$", 3, "ouse"),
  RE("[bcdfghjklmnpqrstvwxyz]ies$", 3, "y"),
  RE("(ces)$", 1), // accomplices
  RE("^feet$", 3, "oot"),
  RE("^teeth$", 4, "ooth"),
  RE("children$", 3),
  RE("geese", 4, "oose"),
  RE("^concerti$", 1, "o"),
  RE("people$", 4, "rson"),
  RE("^(vertebr|larv|minuti)ae$", 1),
  RE("^oxen", 2),
  RE("esses$", 2),
  RE("(treatises|chemises)$", 1),
  RE("(ses)$", 2, "is"), // catharses, prognoses
  //  RE("([a-z]+osis|[a-z]+itis|[a-z]+ness)$", 0),
  DEFAULT_SINGULAR_RULE
];

const PLURAL_RULES = [
  RE("(human|german|roman)$", 0, "s"),
  RE("^(monarch|loch|stomach|epoch|ranch)$", 0, "s"),
  RE("^(piano|photo|solo|ego|tobacco|cargo|taxi)$", 0, "s"),
  RE("(chief|proof|ref|relief|roof|belief|spoof|golf|grief)$", 0, "s"),
  RE("^(appendix|index|matrix|apex|cortex)$", 2, "ices"),
  RE("^concerto$", 1, "i"),
  RE("^prognosis", 2, "es"),
  RE("[bcdfghjklmnpqrstvwxyz]o$", 0, "es"),
  RE("[bcdfghjklmnpqrstvwxyz]y$", 1, "ies"),
  RE("^ox$", 0, "en"),
  RE("^(stimul|alumn|termin)us$", 2, "i"),
  RE("^corpus$", 2, "ora"),
  RE("(xis|sis)$", 2, "es"),
  //RE("(ness)$", 0, "es"),
  RE("whiz$", 0, "zes"),
  RE("motif$", 0, "s"),
  RE("[lraeiou]fe$", 2, "ves"),
  RE("[lraeiou]f$", 1, "ves"),
  RE("(eu|eau)$", 0, "x"),
  RE("(man|woman)$", 2, "en"),
  RE("person$", 4, "ople"),
  RE("^meninx|phalanx$", 1, "ges"),
  RE("schema$", 0, "ta"),
  RE("^(bus|gas)$", 0, "es"),
  RE("child$", 0, "ren"),
  RE("^(vertebr|larv|minuti)a$", 0, "e"),
  RE("^(maharaj|raj|myn|mull)a$", 0, "hs"),
  RE("^aide-de-camp$", 8, "s-de-camp"),
  RE("^weltanschauung$", 0, "en"),
  RE("^lied$", 0, "er"),
  RE("^tooth$", 4, "eeth"),
  RE("^[lm]ouse$", 4, "ice"),
  RE("^foot$", 3, "eet"),
  RE("goose", 4, "eese"),
  RE("^(co|no)$", 0, "'s"),
  RE("^blond$", 0, "es"),
  RE("^datum", 2, "a"),
  RE("([a-z]+osis|[a-z]+itis|[a-z]+ness)$", 0),
  RE("([zsx]|ch|sh)$", 0, "es"), // note: words ending in 's' otfen hit here, add 'es'
  RE("^(medi|millenni|consorti|sept|memorabili)um$", 2, "a"),
  RE("^(memorandum|bacterium|curriculum|minimum|maximum|referendum|spectrum|phenomenon|criterion)$", 2, "a"), // Latin stems
  DEFAULT_PLURAL_RULE
];


let RiTa;

const PLURALIZE = 1;
const SINGULARIZE = 2;

class Inflector {

  constructor(parent) {
    RiTa = parent;
  }

  adjustNumber(word, type, dbug) {

    if (!word || !word.length) return '';

    let check = word.toLowerCase();

    if (MODALS.includes(check)) {
      dbug && console.log(word + ' hit MODALS');
      return word;
    }

    let rules = type === SINGULARIZE ? SINGULAR_RULES : PLURAL_RULES;
    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i];
      //console.log(i+") "+rule.raw, rule.suffix);
      if (rule.applies(check)) {
        dbug && console.log(word + ' hit rule #'+i, rule);
        return rules[i].fire(word);
      }
    }

    return word;
  }

  singularize(word, opts) {
    return this.adjustNumber(word, SINGULARIZE, (opts && opts.dbug));
  }

  pluralize(word, opts) {
    return this.adjustNumber(word, PLURALIZE, (opts && opts.dbug));
  }

  isPlural(word, opts) { // add to API?

    if (!word || !word.length) return false;

    let dbug = opts && opts.debug;
    let fatal = opts && opts.fatal;

    word = word.toLowerCase();

    if (MODALS.includes(word)) return true;

    let dict = RiTa.lexicon()._dict(fatal);
    let sing = RiTa.singularize(word);

    // Is singularized form is in lexicon as 'nn'?
    if (dict[sing] && dict[sing].length === 2) {
      let pos = dict[sing][1].split(' ');
      if (pos.includes('nn'))return true;
    }

    // A general modal form? (for example, ends in 'ness')
    if (word.endsWith("ness") && sing === RiTa.pluralize(word)) {
      return true;
    }

    // Is word without final 's in lexicon as 'nn'?
    if (dict && word.endsWith("s")) {
      let data = dict[word.substring(0, word.length - 1)];
      if (data && data.length === 2) {
        let pos = data[1].split(' ');
        for (let i = 0; i < pos.length; i++) {
          if (pos[i] === 'nn') return true;
        }
      }
    }

    if (DEFAULT_IS_PLURAL.test(word)) return true;

    let rules = SINGULAR_RULES;
    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i];
      if (rule.applies(word)) {
        dbug && console.log(word + ' hit', rule);
        return true;
      }
    }

    dbug && console.log('isPlural: no rules hit for ' + word);

    return false;
  }
}

module && (module.exports = Inflector);
