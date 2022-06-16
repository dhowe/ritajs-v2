class Util {

  // Takes a syllabification and turns it into a string of phonemes,
  // delimited with dashes, with spaces between syllables
  static syllablesToPhones(syllables) {

    let i, j, ret = [];
    for (i = 0; i < syllables.length; i++) {

      let syl = syllables[i],
        stress = syl[0][0],
        onset = syl[1],
        nucleus = syl[2],
        coda = syl[3];

      if (stress && nucleus.length) nucleus[0] += stress;

      let data = [];
      for (j = 0; j < onset.length; j++) data.push(onset[j]);
      for (j = 0; j < nucleus.length; j++) data.push(nucleus[j]);
      for (j = 0; j < coda.length; j++) data.push(coda[j]);
      ret.push(data.join('-'));
    }

    return ret.join(' ');
  }

  static syllablesFromPhones(input) { // adapted from FreeTTS

    function extend(l1, l2) {
      for (let i = 0; i < l2.length; i++) l1.push(l2[i]);
    }

    if (!input || !input.length) return '';

    let dbug, internuclei = [];
    let syllables = []; // returned data structure
    let sylls = typeof input == 'string' ? input.split('-') : input;

    for (let i = 0; i < sylls.length; i++) {

      let phoneme = sylls[i].trim(), stress;
      if (!phoneme.length) continue;

      let last = phoneme.charAt(phoneme.length - 1);
      if (this.isNum(last)) {
        stress = last;
        phoneme = phoneme.substring(0, phoneme.length - 1);
      }

      if (dbug) console.log(i + ")" + phoneme + ' stress=' + stress + ' inter=' + internuclei.join(':'));

      if (Util.Phones.vowels.includes(phoneme)) {

        // Split the consonants seen since the last nucleus into coda and onset.
        let coda, onset;

        // Make the largest onset we can. The 'split' variable marks the break point.
        for (let split = 0; split < internuclei.length + 1; split++) {

          coda = internuclei.slice(0, split);
          onset = internuclei.slice(split, internuclei.length);

          if (dbug) console.log('  ' + split + ') onset=' + onset.join(':') +
            '  coda=' + coda.join(':') + '  inter=' + internuclei.join(':'));

          // If we are looking at a valid onset, or if we're at the start of the word
          // (in which case an invalid onset is better than a coda that doesn't follow
          // a nucleus), or if we've gone through all of the onsets and we didn't find
          // any that are valid, then split the nonvowels we've seen at this location.
          let bool = Util.Phones.onsets.includes(onset.join(" "));
          if (bool || syllables.length === 0 || onset.length === 0) {
            if (dbug) console.log('  break ' + phoneme);
            break;
          }
        }

        // Tack the coda onto the coda of the last syllable.
        // Can't do it if this is the first syllable.
        if (syllables.length > 0) {
          extend(syllables[syllables.length - 1][3], coda);
          if (dbug) console.log('  tack: ' + coda + ' -> len=' +
            syllables[syllables.length - 1][3].length + " [" +
            syllables[syllables.length - 1][3] + "]");
        }

        // Make a new syllable out of the onset and nucleus.
        let toPush = [[stress], onset, [phoneme], []];
        syllables.push(toPush);

        // At this point we've processed the internuclei list.
        internuclei = [];
      } else if (!(Util.Phones.consonants.includes(phoneme)) && phoneme != ' ') {
        throw Error('Invalid phoneme: ' + phoneme);
      } else { // a consonant
        internuclei.push(phoneme);
      }
    }

    // Done looping through phonemes. We may have consonants left at the end.
    // We may have even not found a nucleus.
    if (internuclei.length > 0) {
      if (syllables.length === 0) {
        syllables.push([[undefined], internuclei, [], []]);
      } else {
        extend(syllables[syllables.length - 1][3], internuclei);
      }
    }
    return Util.syllablesToPhones(syllables);
  }

  static isNum(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
}

// CLASSES ////////////////////////////////////////////////////////////////////

class RE {

  constructor(regex, offset, suffix) {
    this.raw = regex;
    this.regex = new RegExp(regex);
    this.offset = offset;
    this.suffix = suffix || '';
  }

  applies(word) {
    return this.regex.test(word);
  }

  fire(word) {
    return this.truncate(word) + this.suffix;
  }

  truncate(word) {
    return (this.offset === 0) ? word :
      word.substr(0, word.length - this.offset);
  }

  toString() {
    return '/' + this.raw + '/';
  }
}

Util.Numbers = { 
  fromWords: { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 },
  toWords: { '0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four', '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', '10': 'ten', '11': 'eleven', '12': 'twelve', '13': 'thirteen', '14': 'fourteen', '15': 'fifteen', '16': 'sixteen', '17': 'seventeen', '18': 'eighteen', '19': 'nineteen', '20': 'twenty', '30': 'thirty', '40': 'forty', '50': 'fifty', '60': 'sixty', '70': 'seventy', '80': 'eighty', '90': 'ninety' }
}

Util.Phones = { 
  consonants: ['b', 'ch', 'd', 'dh', 'f', 'g', 'hh', 'jh', 'k', 'l', 'm',
    'n', 'ng', 'p', 'r', 's', 'sh', 't', 'th', 'v', 'w', 'y', 'z', 'zh'
  ],
  vowels: ['aa', 'ae', 'ah', 'ao', 'aw', 'ax', 'ay', 'eh', 'er', 'ey', 'ih',
    'iy', 'ow', 'oy', 'uh', 'uw'
  ],
  onsets: ['p', 't', 'k', 'b', 'd', 'g', 'f', 'v', 'th', 'dh', 's', 'z',
    'sh', 'ch', 'jh', 'm', 'n', 'r', 'l', 'hh', 'w', 'y', 'p r', 't r',
    'k r', 'b r', 'd r', 'g r', 'f r', 'th r', 'sh r', 'p l', 'k l', 'b l',
    'g l', 'f l', 's l', 't w', 'k w', 'd w', 's w', 's p', 's t', 's k',
    's f', 's m', 's n', 'g w', 'sh w', 's p r', 's p l', 's t r', 's k r',
    's k w', 's k l', 'th w', 'zh', 'p y', 'k y', 'b y', 'f y', 'hh y',
    'v y', 'th y', 'm y', 's p y', 's k y', 'g y', 'hh w', ''
  ]
};


Util.RE = function (a, b, c) { return new RE(a, b, c) };

Util.MODAL_EXCEPTIONS = ["hardness", "shortness"]; 

Util.MASS_NOUNS = ["abalone", "asbestos", "barracks", "bathos", "breeches", "beef", "britches", "chaos", "chinese", "cognoscenti", "clippers", "corps", "cosmos", "crossroads", "diabetes", "ethos", "gallows", "graffiti", "herpes", "innings", "lens", "means", "measles", "mews", "mumps", "news", "pasta", "pathos", "pincers", "pliers", "proceedings", "rabies", "rhinoceros", "sassafras", "scissors", "series", "shears", "species", "tuna", "acoustics", "aesthetics", "aquatics", "basics", "ceramics", "classics", "cosmetics", "dialectics", "deer", "dynamics", "ethics", "harmonics", "heroics", "mechanics", "metrics", "ooze", "optics", "physics", "polemics", "pyrotechnics", "statistics", "tactics", "tropics", "bengalese", "bengali", "bonsai", "booze", "cellulose", "mess", "moose", "burmese", "chinese", "colossus", "congolese", "discus", "electrolysis", "emphasis", "expertise", "flu", "fructose", "gauze", "glucose", "grease", "guyanese", "haze", "incense", "japanese", "lebanese", "malaise", "mayonnaise", "maltese", "music", "money", "menopause", "merchandise", "olympics", "overuse", "paradise", "poise", "potash", "portuguese", "prose", "recompense", "remorse", "repose", "senegalese", "siamese", "singhalese", "sleaze", "sioux", "sudanese", "suspense", "swiss", "taiwanese", "vietnamese", "unease", "aircraft", "anise", "antifreeze", "applause", "archdiocese", "apparatus", "asparagus", "bellows", "bison", "bluefish", "bourgeois", "bream", "brill", "butterfingers", "cargo", "carp", "catfish", "chassis", "clone", "clones", "clothes", "chub", "cod", "codfish", "coley", "contretemps", "crawfish", "crayfish", "cuttlefish", "dice", "dogfish", "doings", "dory", "downstairs", "eldest", "earnings", "economics", "electronics", "firstborn", "fish", "flatfish", "flounder", "fowl", "fry", "fries", "works", "goldfish", "golf", "grand", "grief", "haddock", "hake", "halibut", "headquarters", "herring", "hertz", "honey","horsepower", "goods", "hovercraft", "ironworks", "kilohertz", "ling", "shrimp", "swine", "lungfish", "mackerel", "macaroni", "megahertz", "moorfowl", "moorgame", "mullet", "nepalese", "offspring", "pants", "patois", "pekinese", "perch", "pickerel", "pike", "potpourri", "precis", "quid", "rand", "rendezvous", "roach", "salmon", "samurai", "seychelles", "shad", "sheep", "shellfish", "smelt", "spaghetti", "spacecraft", "starfish", "stockfish", "sunfish", "superficies", "sweepstakes", "smallpox", "swordfish", "tennis", "tobacco", "triceps", "trout", "tunafish", "turbot", "trousers", "turf", "dibs", "undersigned", "waterfowl", "waterworks", "waxworks", "wildfowl", "woodworm", "yen", "aries", "pisces", "forceps", "jeans", "mathematics", "odds", "politics", "remains", "aids", "wildlife", "shall", "would", "may", "might", "ought", "should", "acne", "admiration", "advice", "air", "anger", "anticipation", "assistance", "awareness", "bacon", "baggage", "blood", "bravery", "chess", "clay", "clothing", "coal", "compliance", "comprehension", "confusion", "consciousness", "cream", "darkness", "diligence", "dust", "education", "empathy", "enthusiasm", "envy", "equality", "equipment", "evidence", "feedback", "fitness", "flattery", "foliage", "fun", "furniture", "garbage", "gold", "gossip", "grammar", "gratitude", "gravel", "guilt", "happiness", "hardware", "hate", "hay", "health", "heat", "help", "hesitation", "homework", "honesty", "honor", "honour", "hospitality", "hostility", "humanity", "humility", "ice", "immortality", "independence", "information", "integrity", "intimidation", "jargon", "jealousy", "jewelry", "justice", "knowledge", "literacy", "logic", "luck", "lumber", "luggage", "mail", "management", "milk", "morale", "mud", "nonsense", "oppression", "optimism", "oxygen", "participation", "pay", "peace", "perseverance", "pessimism", "pneumonia", "poetry", "police", "pride", "privacy", "propaganda", "public", "punctuation", "recovery", "rice", "rust", "satisfaction", "schnapps", "shame", "slang", "software", "stamina", "starvation", "steam", "steel", "stuff", "support", "sweat", "thunder", "timber", "toil", "traffic", "tongs", "training", "trash", "valor", "vehemence", "violence", "warmth", "waste", "weather", "wheat", "wisdom", "work", "accommodation", "advertising", "aid", "art", "bread", "business", "butter", "calm", "cash", "cheese", "childhood", "clothing ", "coffee", "content", "corruption", "courage", "currency", "damage", "danger"/*, "data"*/, "determination", "electricity", "employment", "energy", "entertainment", "failure", "fame", "fire", "flour", "food", "freedom", "friendship", "fuel", "genetics", "hair", "harm", "hospitality ", "housework", "humour", "imagination", "importance", "innocence", "intelligence", "juice", "kindness", "labour", "lack", "laughter", "leisure", "literature", "litter", "love", "magic", "metal", "motherhood", "motivation", "nature", "nutrition", "obesity", "oil", "old age", "paper", "patience", "permission", "pollution", "poverty", "power", "production", "progress", "pronunciation", "publicity", "quality", "quantity", "racism", "rain", "relaxation", "research", "respect", "room (space)", "rubbish", "safety", "salt", "sand", "seafood", "shopping", "silence", "smoke", "snow", "soup", "speed", "spelling", "stress ", "sugar", "sunshine", "tea", "time", "tolerance", "trade", "transportation", "travel", "trust", "understanding", "unemployment", "usage", "vision", "water", "wealth", "weight", "welfare", "width", "wood", "yoga", "youth", "homecare", "childcare", "fanfare", "healthcare", "medicare" ]; // SYNC:

/* TODO: needs test cases, then remove [ones,tens,teens],
 *  then add words for . and -, then uncomment and use in LTS
Util.numToWords = function(num) {

  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

  let nums = Util.Numbers.toWords;

  function millions(n) {
    return n >= 1000000 ? millions(Math.floor(n / 1000000))
      + " million " + thousands(n % 1000000)
      : thousands(n);
  }

  function thousands(n) {
    return n >= 1000 ? hundreds(Math.floor(n / 1000)) +
      " thousand " + hundreds(n % 1000)
      : hundreds(n);
  }

  function hundreds(n) {
    return n > 99 ? ones[Math.floor(n / 100)]
      + " hundred " + digits(n % 100)
      : digits(n);
  }

  function digits(n) {
    if (n < 10) return ones[n];
    else if (n >= 10 && n < 20) return teens[n - 10];
    return tens[Math.floor(n / 10)] + ' ' + ones[n % 10]
  }

  function digitsNew(n) {
    if (n <= 20) return nums[n+''];
    return nums[(Math.floor(n / 10)*10)+''] + ' ' + nums[n % 10];
  }

  if (typeof num === 'string') num = parseInt(num);
  if (num === 0) return "zero";
  if (!Util.isNum(num)) return num; // warning?
  return millions(num).replace(/\s+/g, ' ').trim();
}
*/

export default Util;
