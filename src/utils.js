// FUNCTIONS /////////////////////////////////////////////////////////////////

class Utils {

  static trim(str) {
    if (!str || !str.length) return str;
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }

  static last(word) {
    if (!word || !word.length) return E;
    return word.charAt(word.length - 1);
  }

  static equalsIgnoreCase(str1, str2) {
    return (str1 && str2 && str1.toLowerCase() === str2.toLowerCase());
  }

  static isNode() {
    return (typeof module != 'undefined' && module.exports);
  }

  static isNum(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  static last(word) {
    if (!word || !word.length) return E;
    return word.charAt(word.length - 1);
  }

  static extend(l1, l2) {
    for (var i = 0; i < l2.length; i++) {
      l1.push(l2[i]);
    }
  }
}

// CLASSES ////////////////////////////////////////////////////////////////////

class RE {

  constructor(regex, offset, suffix) {
    this.regex = new RegExp(regex);
    this.offset = offset;
    this.suffix = suffix || '';
  }

  applies(word) {
    return this.regex.test(Utils.trim(word));
  }

  fire(word) {
    return this.truncate(Utils.trim(word)) + this.suffix;
  }

  analyze(word) {
    return ((this.suffix != E) && endsWith(word, this.suffix)) ? true : false;
  }

  truncate(word) {
    return (this.offset === 0) ? word : word.substr(0, word.length - this.offset);
  }
}


// CONSTANTS /////////////////////////////////////////////////////////////////

// these don't change for plural/singular
Utils.NULL_PLURALS = new RE("^(bantu|bengalese|bengali|beninese|boche|bonsai|booze|cellulose|digitalis|mess|moose|burmese|chinese|colossus|congolese|discus|electrolysis|emphasis|expertise|finess|flu|fructose|gabonese|gauze|glucose|grease|guyanese|haze|incense|japanese|javanese|journalese|lebanese|malaise|manganese|mayonnaise|maltese|menopause|merchandise|nitrocellulose|olympics|overuse|paradise|poise|polymerase|portuguese|prose|recompense|remorse|repose|senegalese|siamese|singhalese|innings|sleaze|sinhalese|sioux|sudanese|suspense|swiss|taiwanese|togolese|vietnamese|unease|aircraft|anise|antifreeze|applause|archdiocese|anopheles|apparatus|asparagus|barracks|bellows|bison|bluefish|bob|bourgeois|bream|brill|butterfingers|cargo|carp|catfish|chassis|clothes|chub|cod|codfish|coley|contretemps|corps|crawfish|crayfish|crossroads|cuttlefish|dace|deer|dice|dogfish|doings|dory|downstairs|eldest|earnings|economics|electronics|firstborn|fish|flatfish|flounder|fowl|fry|fries|works|globefish|goldfish|golf|grand|grief|gudgeon|gulden|haddock|hake|halibut|headquarters|herring|hertz|horsepower|goods|hovercraft|hundredweight|ironworks|jackanapes|kilohertz|kurus|kwacha|ling|lungfish|mackerel|macaroni|means|megahertz|moorfowl|moorgame|mullet|nepalese|offspring|pampas|parr|pants|patois|pekinese|penn'orth|perch|pickerel|pike|pince-nez|plaice|potpourri|precis|quid|rand|rendezvous|revers|roach|roux|salmon|samurai|series|seychelles|seychellois|shad|sheep|shellfish|smelt|spaghetti|spacecraft|species|starfish|stockfish|sunfish|superficies|sweepstakes|swordfish|tench|tennis|[a-z]+osis|[a-z]+itis|[a-z]+ness|tobacco|tope|triceps|trout|tuna|tunafish|tunny|turbot|trousers|turf|dibs|undersigned|veg|waterfowl|waterworks|waxworks|whiting|wildfowl|woodworm|yen|aries|pisces|forceps|lieder|jeans|physics|mathematics|news|odds|politics|remains|acoustics|aesthetics|aquatics|basics|ceramics|classics|cosmetics|dialectics|dynamics|ethics|harmonics|heroics|mechanics|metrics|optics|physics|polemics|pyrotechnics|surroundings|thanks|statistics|goods|aids|wildlife)$", 0);

Utils.RE = function() { return new RE(arguments) };
//Utils.StringTokenizer = StringTokenizer;

module.exports = Utils;
