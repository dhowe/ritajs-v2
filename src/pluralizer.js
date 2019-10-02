const RE = require("./utils").RE;

const NULL_PLURALS = RE( // these don't change for plural/singular
  "^(bantu|bengalese|bengali|beninese|boche|bonsai|booze|cellulose|digitalis|mess|moose|" + "burmese|chinese|colossus|congolese|discus|electrolysis|emphasis|expertise|finess|flu|fructose|gabonese|gauze|glucose|grease|guyanese|haze|incense|japanese|javanese|journalese|" + "lebanese|malaise|manganese|mayonnaise|maltese|menopause|merchandise|nitrocellulose|olympics|overuse|paradise|poise|polymerase|portuguese|prose|recompense|remorse|repose|senegalese|siamese|singhalese|innings|" + "sleaze|sinhalese|sioux|sudanese|suspense|swiss|taiwanese|togolese|vietnamese|unease|aircraft|anise|antifreeze|applause|archdiocese|" + "anopheles|apparatus|asparagus|barracks|bellows|bison|bluefish|bob|bourgeois|" + "bream|brill|butterfingers|cargo|carp|catfish|chassis|clothes|chub|cod|codfish|" + "coley|contretemps|corps|crawfish|crayfish|crossroads|cuttlefish|dace|deer|dice|" + "dogfish|doings|dory|downstairs|eldest|earnings|economics|electronics|" + "firstborn|fish|flatfish|flounder|fowl|fry|fries|works|globefish|goldfish|golf|" + "grand|grief|gudgeon|gulden|haddock|hake|halibut|headquarters|herring|hertz|horsepower|" + "goods|hovercraft|hundredweight|ironworks|jackanapes|kilohertz|kurus|kwacha|ling|lungfish|" + "mackerel|macaroni|means|megahertz|moorfowl|moorgame|mullet|nepalese|offspring|pampas|parr|pants|" + "patois|pekinese|penn'orth|perch|pickerel|pike|pince-nez|plaice|potpourri|precis|quid|rand|" + "rendezvous|revers|roach|roux|salmon|samurai|series|seychelles|seychellois|shad|" + "sheep|shellfish|smelt|spaghetti|spacecraft|species|starfish|stockfish|sunfish|superficies|" + "sweepstakes|swordfish|tench|tennis|[a-z]+osis|[a-z]+itis|[a-z]+ness|" + "tobacco|tope|triceps|trout|tuna|tunafish|tunny|turbot|trousers|turf|dibs|" + "undersigned|veg|waterfowl|waterworks|waxworks|whiting|wildfowl|woodworm|" + "yen|aries|pisces|forceps|lieder|jeans|physics|mathematics|news|odds|politics|remains|" + "acoustics|aesthetics|aquatics|basics|ceramics|classics|cosmetics|dialectics|dynamics|ethics|harmonics|heroics|mechanics|metrics|optics|physics|polemics|pyrotechnics|" + "surroundings|thanks|statistics|goods|aids|wildlife)$", 0);

const SINGULAR_RULES = [
  NULL_PLURALS,
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
  NULL_PLURALS,
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
  RE("whiz$", 0, "zes"),
  RE("([zsx]|ch|sh)$", 0, "es"),
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
  // Latin stems
  RE("^(memorandum|bacterium|curriculum|minimum|" + "maximum|referendum|spectrum|phenomenon|criterion)$", 2, "a")
];

const DEFAULT_PLURAL_RULE = RE("^((\\w+)(-\\w+)*)(\\s((\\w+)(-\\w+)*))*$", 0, "s");

const MODALS = ["shall", "would", "may", "might", "ought", "should"];

let RiTa;

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
      if (rules[i].applies(word.toLowerCase())) {
        return rules[i].fire(word);
      }
    }

    return DEFAULT_PLURAL_RULE.fire(word);
  }

  isPlural(word) {

    if (NULL_PLURALS.applies(word)) return true;

    if (RiTa.stem(word) === word) return false;

    let sing = RiTa.singularize(word);
    let data = this.dict[sing];

    if (data && data.length === 2) {
      let pos = data[1].split(' ');
      for (let i = 0; i < pos.length; i++) {
        if (pos[i] === 'nn')
          return true;
      }

    } else if (word.endsWith("ses") || word.endsWith("zes")) {

      sing = word.substring(0, word.length - 1);
      data = this.dict[sing];
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
