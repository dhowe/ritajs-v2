/* Words that are both singular and plural */
const categorySP = ['acoustics', 'aesthetics', 'aquatics', 'basics', 'ceramics', 'classics', 'cosmetics', 'dialectics', 'deer', 'dynamics', 'ethics', 'harmonics', 'heroics', 'mechanics', 'metrics', 'optics', 'people', 'physics', 'polemics', 'pyrotechnics', 'quadratics', 'quarters', 'statistics', 'tactics', 'tropics'];

/* Words that end in '-se' in their plural forms (like 'nurse' etc.) */
const categorySE_SES = ['abuses', 'apocalypses', 'blouses', 'bruises', 'chaises', 'cheeses', 'chemises', 'clauses', 'corpses', 'courses', 'crazes', 'creases', 'cruises', 'curses', 'databases', 'dazes', 'defenses', 'demises', 'discourses', 'diseases', 'doses', 'eclipses', 'enterprises', 'expenses', 'friezes', 'fuses', 'glimpses', 'guises', 'hearses', 'horses', 'houses', 'impasses', 'impulses', 'kamikazes', 'mazes', 'mousses', 'noises', 'nooses', 'noses', 'nurses', 'obverses', 'offenses', 'oozes', 'overdoses', 'phrases', 'posses', 'premises', 'pretenses', 'proteases', 'pulses', 'purposes', 'purses', 'racehorses', 'recluses', 'recourses', 'relapses', 'responses', 'roses', 'ruses', 'spouses', 'stripteases', 'subleases', 'sunrises', 'tortoises', 'trapezes', 'treatises', 'toes', 'universes', 'uses', 'vases', 'verses', 'vises', 'wheelbases', 'wheezes'];

/* Words that do not have a distinct plural form (like 'atlas' etc.) */
const category00 = ['alias', 'asbestos', 'atlas', 'barracks', 'bathos', 'bias', 'breeches', 'britches', 'canvas', 'chaos', 'clippers', 'contretemps', 'corps', 'cosmos', 'crossroads', 'diabetes', 'ethos', 'gallows', 'gas', 'graffiti', 'headquarters', 'herpes', 'high-jinks', 'innings', 'jackanapes', 'lens', 'means', 'measles', 'mews', 'mumps', 'news', 'pathos', 'pincers', 'pliers', 'proceedings', 'rabies', 'rhinoceros', 'sassafras', 'scissors', 'series', 'shears', 'species', 'tuna'];

/* Words that change from '-um' to '-a' (like 'curriculum' etc.), listed in their plural forms */
const categoryUM_A = ['addenda', 'agenda', 'aquaria', 'bacteria', 'candelabra', 'compendia', 'consortia', 'crania', 'curricula', 'data', 'desiderata', 'dicta', 'emporia', 'enconia', 'errata', 'extrema', 'gymnasia', 'honoraria', 'interregna', 'lustra', 'maxima', 'media', 'memoranda', 'millenia', 'minima', 'momenta', 'memorabilia', 'millennia', 'optima', 'ova', 'phyla', 'quanta', 'rostra', 'spectra', 'specula', 'septa', 'stadia', 'strata', 'symposia', 'trapezia', 'ultimata', 'vacua', 'vela'];

/* Words that change from '-on' to '-a' (like 'phenomenon' etc.), listed in their plural forms */
const categoryON_A = ['aphelia', 'asyndeta', 'automata', 'criteria', 'hyperbata', 'noumena', 'organa', 'perihelia', 'phenomena', 'prolegomena', 'referenda'];

/* Words that change from '-o' to '-i' (like 'libretto' etc.), listed in their plural forms */
const categoryO_I = ['alti', 'bassi', 'canti', 'concerti', 'contralti', 'crescendi', 'libretti', 'soli', 'soprani', 'tempi', 'virtuosi'];

/*  Words that change from '-us' to '-i' (like 'fungus' etc.), listed in their plural forms		 */
const categoryUS_I = ['alumni', 'bacilli', 'cacti', 'foci', 'fungi', 'genii', 'hippopotami', 'incubi', 'nimbi', 'nuclei', 'nucleoli', 'octopi', 'radii', 'stimuli', 'styli', 'succubi', 'syllabi', 'termini', 'tori', 'umbilici', 'uteri'];

/* Words that change from '-ix' to '-ices' (like 'appendix' etc.), listed in their plural forms */
const categoryIX_ICES = ['appendices', 'cervices', 'indices', 'matrices'];

/* Words that change from '-is' to '-es' (like 'axis' etc.), listed in their plural forms, plus everybody ending in theses */
const categoryIS_ES = ['analyses', 'axes', 'bases', 'catharses', 'crises', 'diagnoses', 'ellipses', 'emphases', 'neuroses', 'oases', 'paralyses', 'prognoses', 'synopses'];

/* Words that change from '-oe' to '-oes' (like 'toe' etc.), listed in their plural forms*/
const categoryOE_OES = ['aloes', 'backhoes', 'beroes', 'canoes', 'chigoes', 'cohoes', 'does', 'felloes', 'floes', 'foes', 'gumshoes', 'hammertoes', 'hoes', 'hoopoes', 'horseshoes', 'leucothoes', 'mahoes', 'mistletoes', 'oboes', 'overshoes', 'pahoehoes', 'pekoes', 'roes', 'shoes', 'sloes', 'snowshoes', 'throes', 'tic-tac-toes', 'tick-tack-toes', 'ticktacktoes', 'tiptoes', 'tit-tat-toes', 'toes', 'toetoes', 'tuckahoes', 'woes'];

/* Words that change from '-ex' to '-ices' (like 'index' etc.), listed in their plural forms*/
const categoryEX_ICES = ['apices', 'codices', 'cortices', 'indices', 'latices', 'murices', 'pontifices', 'silices', 'simplices', 'vertices', 'vortices'];

/* Words that change from '-u' to '-us' (like 'emu' etc.), listed in their plural forms*/
const categoryU_US = ['menus', 'gurus', 'apercus', 'barbus', 'cornus', 'ecrus', 'emus', 'fondus', 'gnus', 'iglus', 'mus', 'nandus', 'napus', 'poilus', 'quipus', 'snafus', 'tabus', 'tamandus', 'tatus', 'timucus', 'tiramisus', 'tofus', 'tutus'];

/* Words that change from '-sse' to '-sses' (like 'finesse' etc.), listed in their plural forms,plus those ending in mousse*/
const categorySSE_SSES = ['bouillabaisses', 'coulisses', 'crevasses', 'crosses', 'cuisses', 'demitasses', 'ecrevisses', 'fesses', 'finesses', 'fosses', 'impasses', 'lacrosses', 'largesses', 'masses', 'noblesses', 'palliasses', 'pelisses', 'politesses', 'posses', 'tasses', 'wrasses'];

/* Words that change from '-che' to '-ches' (like 'brioche' etc.), listed in their plural forms*/
const categoryCHE_CHES = ['adrenarches', 'attaches', 'avalanches', 'barouches', 'brioches', 'caches', 'caleches', 'caroches', 'cartouches', 'cliches', 'cloches', 'creches', 'demarches', 'douches', 'gouaches', 'guilloches', 'headaches', 'heartaches', 'huaraches', 'menarches', 'microfiches', 'moustaches', 'mustaches', 'niches', 'panaches', 'panoches', 'pastiches', 'penuches', 'pinches', 'postiches', 'psyches', 'quiches', 'schottisches', 'seiches', 'soutaches', 'synecdoches', 'thelarches', 'troches'];

/* Words that end with '-ics' and do not exist as nouns without the 's' (like 'aerobics' etc.)*/
const categoryICS = ['aerobatics', 'aerobics', 'aerodynamics', 'aeromechanics', 'aeronautics', 'alphanumerics', 'animatronics', 'apologetics', 'architectonics', 'astrodynamics', 'astronautics', 'astrophysics', 'athletics', 'atmospherics', 'autogenics', 'avionics', 'ballistics', 'bibliotics', 'bioethics', 'biometrics', 'bionics', 'bionomics', 'biophysics', 'biosystematics', 'cacogenics', 'calisthenics', 'callisthenics', 'catoptrics', 'civics', 'cladistics', 'cryogenics', 'cryonics', 'cryptanalytics', 'cybernetics', 'cytoarchitectonics', 'cytogenetics', 'diagnostics', 'dietetics', 'dramatics', 'dysgenics', 'econometrics', 'economics', 'electromagnetics', 'electronics', 'electrostatics', 'endodontics', 'enterics', 'ergonomics', 'eugenics', 'eurhythmics', 'eurythmics', 'exodontics', 'fibreoptics', 'futuristics', 'genetics', 'genomics', 'geographics', 'geophysics', 'geopolitics', 'geriatrics', 'glyptics', 'graphics', 'gymnastics', 'hermeneutics', 'histrionics', 'homiletics', 'hydraulics', 'hydrodynamics', 'hydrokinetics', 'hydroponics', 'hydrostatics', 'hygienics', 'informatics', 'kinematics', 'kinesthetics', 'kinetics', 'lexicostatistics', 'linguistics', 'lithoglyptics', 'liturgics', 'logistics', 'macrobiotics', 'macroeconomics', 'magnetics', 'magnetohydrodynamics', 'mathematics', 'metamathematics', 'metaphysics', 'microeconomics', 'microelectronics', 'mnemonics', 'morphophonemics', 'neuroethics', 'neurolinguistics', 'nucleonics', 'numismatics', 'obstetrics', 'onomastics', 'orthodontics', 'orthopaedics', 'orthopedics', 'orthoptics', 'paediatrics', 'patristics', 'patristics', 'pedagogics', 'pediatrics', 'periodontics', 'pharmaceutics', 'pharmacogenetics', 'pharmacokinetics', 'phonemics', 'phonetics', 'phonics', 'photomechanics', 'physiatrics', 'pneumatics', 'poetics', 'politics', 'pragmatics', 'prosthetics', 'prosthodontics', 'proteomics', 'proxemics', 'psycholinguistics', 'psychometrics', 'psychonomics', 'psychophysics', 'psychotherapeutics', 'robotics', 'semantics', 'semiotics', 'semitropics', 'sociolinguistics', 'stemmatics', 'strategics', 'subtropics', 'systematics', 'tectonics', 'telerobotics', 'therapeutics', 'thermionics', 'thermodynamics', 'thermostatics'];

/* Words that change from '-ie' to '-ies' (like 'auntie' etc.), listed in their plural forms*/
const categoryIE_IES = ['aeries', 'anomies', 'aunties', 'baddies', 'beanies', 'birdies', 'bogies', 'bonhomies', 'boogies', 'bookies', 'booties', 'bourgeoisies', 'brasseries', 'brassies', 'brownies', 'caddies', 'calories', 'camaraderies', 'charcuteries', 'collies', 'commies', 'cookies', 'coolies', 'coonties', 'cooties', 'coteries', 'cowpies', 'cowries', 'cozies', 'crappies', 'crossties', 'curies', 'darkies', 'dearies', 'dickies', 'dies', 'dixies', 'doggies', 'dogies', 'eyries', 'faeries', 'falsies', 'floozies', 'folies', 'foodies', 'freebies', 'gendarmeries', 'genies', 'gillies', 'goalies', 'goonies', 'grannies', 'groupies', 'hippies', 'hoagies', 'honkies', 'indies', 'junkies', 'kelpies', 'kilocalories', 'laddies', 'lassies', 'lies', 'lingeries', 'magpies', 'magpies', 'mashies', 'mealies', 'meanies', 'menageries', 'mollies', 'moxies', 'neckties', 'newbies', 'nighties', 'nookies', 'oldies', 'panties', 'patisseries', 'pies', 'pinkies', 'pixies', 'porkpies', 'potpies', 'prairies', 'preemies', 'pyxies', 'quickies', 'reveries', 'rookies', 'rotisseries', 'scrapies', 'sharpies', 'smoothies', 'softies', 'stoolies', 'stymies', 'swaggies', 'sweeties', 'talkies', 'techies', 'ties', 'tooshies', 'toughies', 'townies', 'veggies', 'walkie-talkies', 'wedgies', 'weenies', 'yuppies', 'zombies'];

/* Maps irregular Germanic English plural nouns to their singular form */
const categoryIRR = ['blondes', 'blonde', 'teeth', 'tooth', 'beefs', 'beef', 'brethren', 'brother', 'busses', 'bus', 'cattle', 'cow', 'children', 'child', 'corpora', 'corpus', 'femora', 'femur', 'genera', 'genus', 'genies', 'genie', 'genii', 'genie', 'lice', 'louse', 'mice', 'mouse', 'mongooses', 'mongoose', 'monies', 'money', 'octopodes', 'octopus', 'oxen', 'ox', 'people', 'person', 'schemata', 'schema', 'soliloquies', 'soliloquy', 'taxis', 'taxi', 'throes', 'throes', 'trilbys', 'trilby', 'innings', 'inning', 'alibis', 'alibi', 'skis', 'ski', 'safaris', 'safari', 'rabbis', 'rabbi'];

class PlingStemmer {

  constructor() {
  }

  isPlural(s) {
    return s !== this.stem(s);
  }

  // Note that a word can be both plural and singular
  isSingular(s) {
    return (categorySP.includes(s.toLowerCase()) || !isPlural(s));
  }

  isSingularAndPlural(s) {
    return (categorySP.includes(s.toLowerCase()));
  }

  // Cuts a suffix from a string (that is the number of chars given by the
  cut(s, suffix) {
    return (s.substring(0, s.length - suffix.length));
  }

  /* Returns true if a word is probably not Latin */
  noLatin(s) {
    return (s.indexOf('h') > 0 || s.indexOf('j') > 0 || s.indexOf('k') > 0 || s.indexOf('w') > 0 || s.indexOf('y') > 0 || s.indexOf('z') > 0 || s.indexOf("ou") > 0 || s.indexOf("sh") > 0 || s.indexOf("ch") > 0 || s.endsWith("aus"));
  }

  /* Returns true if a word is probably Greek */
  greek(s) {
    return (s.indexOf("ph") > 0 || s.indexOf('y') > 0 && s.endsWith("nges"));
  }

  stem(s) {

    // Handle irregular ones
    if (categoryIRR.includes(s)) {
      let index = categoryIRR.indexOf(s), irreg;
      if (index % 2 == 0) {
        irreg = categoryIRR[index + 1];
        return (irreg);
      }
    }
    // -on to -a
    if (categoryON_A.includes(s))
      return (this.cut(s, "a") + "on");

    // -um to -a
    if (categoryUM_A.includes(s))
      return (this.cut(s, "a") + "um");

    // -x to -ices
    if (categoryIX_ICES.includes(s))
      return (this.cut(s, "ices") + "ix");

    // -o to -i
    if (categoryO_I.includes(s))
      return (this.cut(s, "i") + "o");

    // -se to ses
    if (categorySE_SES.includes(s))
      return (this.cut(s, "s"));

    // -is to -es
    if (categoryIS_ES.includes(s) || s.endsWith("theses"))
      return (this.cut(s, "es") + "is");

    // -us to -i
    if (categoryUS_I.includes(s))
      return (this.cut(s, "i") + "us");

    //Wrong plural
    if (s.endsWith("uses") && (categoryUS_I.includes(this.cut(s, "uses") + "i") || s === ("genuses") || s === ("corpuses")))
      return (this.cut(s, "es"));

    // -ex to -ices
    if (categoryEX_ICES.includes(s))
      return (this.cut(s, "ices") + "ex");

    // Words that do not inflect in the plural
    if (s.endsWith("ois") || s.endsWith("itis") || category00.includes(s) || categoryICS.includes(s))
      return (s);

    // -en to -ina
    // No other common words end in -ina
    if (s.endsWith("ina"))
      return (this.cut(s, "en"));

    // -a to -ae
    // No other common words end in -ae
    if (s.endsWith("ae") && s !== 'pleae') // special case
      return (this.cut(s, "e"));

    // -a to -ata
    // No other common words end in -ata
    if (s.endsWith("ata"))
      return (this.cut(s, "ta"));

    // trix to -trices
    // No common word ends with -trice(s)
    if (s.endsWith("trices"))
      return (this.cut(s, "trices") + "trix");

    // -us to -us
    //No other common word ends in -us, except for false plurals of French words
    //Catch words that are not latin or known to end in -u
    if (s.endsWith("us") && !s.endsWith("eaus") && !s.endsWith("ieus") && !this.noLatin(s) && !categoryU_US.includes(s))
      return (s);

    // -tooth to -teeth
    // -goose to -geese
    // -foot to -feet
    // -zoon to -zoa
    //No other common words end with the indicated suffixes
    if (s.endsWith("teeth"))
      return (this.cut(s, "teeth") + "tooth");
    if (s.endsWith("geese"))
      return (this.cut(s, "geese") + "goose");
    if (s.endsWith("feet"))
      return (this.cut(s, "feet") + "foot");
    if (s.endsWith("zoa"))
      return (this.cut(s, "zoa") + "zoon");

    // -men to -man
    // -firemen to -fireman
    if (s.endsWith("men")) return (this.cut(s, "men") + "man");

    // -martinis to -martini
    // -bikinis to -bikini
    if (s.endsWith("inis")) return (this.cut(s, "inis") + "ini");

    // -children to -child
    // -schoolchildren to -schoolchild
    if (s.endsWith("children")) return (this.cut(s, "ren"));

    // -eau to -eaux
    //No other common words end in eaux
    if (s.endsWith("eaux"))
      return (this.cut(s, "x"));

    // -ieu to -ieux
    //No other common words end in ieux
    if (s.endsWith("ieux"))
      return (this.cut(s, "x"));

    // -nx to -nges
    // Pay attention not to kill words ending in -nge with plural -nges
    // Take only Greek words (works fine, only a handfull of exceptions)
    if (s.endsWith("nges") && this.greek(s))
      return (this.cut(s, "nges") + "nx");

    // -[sc]h to -[sc]hes
    //No other common word ends with "shes", "ches" or "she(s)"
    //Quite a lot end with "che(s)", filter them out
    if (s.endsWith("shes") || s.endsWith("ches") && !categoryCHE_CHES.includes(s))
      return (this.cut(s, "es"));

    // -ss to -sses
    // No other common singular word ends with "sses"
    // Filter out those ending in "sse(s)"
    if (s.endsWith("sses") && !categorySSE_SSES.includes(s) && !s.endsWith("mousses"))
      return (this.cut(s, "es"));

    // -x to -xes
    // No other common word ends with "xe(s)" except for "axe"
    if (s.endsWith("xes") && s !== "axes")
      return (this.cut(s, "es"));

    // -[nlw]ife to -[nlw]ives
    //No other common word ends with "[nlw]ive(s)" except for olive
    if (s.endsWith("nives") || s.endsWith("lives") && !s.endsWith("olives") || s.endsWith("wives"))
      return (this.cut(s, "ves") + "fe");

    // -[aeo]lf to -ves  exceptions: valve, solve
    // -[^d]eaf to -ves  exceptions: heave, weave
    // -arf to -ves      no exception
    if (s.endsWith("alves") && !s.endsWith("valves") || s.endsWith("olves") && !s.endsWith("solves") || s.endsWith("eaves") && !s.endsWith("heaves") && !s.endsWith("weaves") || s.endsWith("arves") || s.endsWith("shelves") || s.endsWith("selves"))
      return (this.cut(s, "ves") + "f");

    // -y to -ies
    // -ies is very uncommon as a singular suffix
    // but -ie is quite common, filter them out
    if (s.endsWith("ies") && !categoryIE_IES.includes(s))
      return (this.cut(s, "ies") + "y");

    // -o to -oes
    // Some words end with -oe, so don't kill the "e"
    if (s.endsWith("oes") && !categoryOE_OES.includes(s))
      return (this.cut(s, "es"));

    // -s to -ses
    // -z to -zes
    // no words end with "-ses" or "-zes" in singular
    if (s.endsWith("ses") || s.endsWith("zes"))
      return (this.cut(s, "es"));

    // - to -s
    if (s.endsWith("s") && !s.endsWith("ss") && !s.endsWith("is"))
      return (this.cut(s, "s"));

    return (s);
  }

  _checkPluralNoLex(s) {
    let cats = [
      categoryUM_A,
      categoryON_A,
      categoryO_I,
      categoryUS_I,
      categoryIX_ICES
    ];
    for (var i = 0; i < cats.length; i++) {
      if (cats[i].indexOf(s) > -1)
        return true;
    }
    let idx = categoryIRR.indexOf(s); // plurals at even indices
    return (idx % 2 === 0) ? true : false;
  }
}

module && (module.exports = PlingStemmer);
