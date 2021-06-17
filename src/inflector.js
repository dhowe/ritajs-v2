import Util from './util';

class Inflector {

  constructor(parent) {
    this.RiTa = parent;
  }

  adjustNumber(word, type, dbug) {
    
    if (word && typeof word !== 'string') {
    
      // TODO: fix for singularize([1]) and similar calls
      throw Error(`${type === SING ? 'singularize()' : 'pluralize()' }`
        + ' requires a string as input');
    }

    if (!word) return '';
    word = word.trim();
    if (!word.length) return '';

    let check = word.toLowerCase();
    if (MASS_NOUNS.includes(check)) {
      dbug && console.log(word + ' hit MASS_NOUNS');
      return word;
    }

    let rules = type === SING ? SING_RULES : PLUR_RULES;
    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i];
      //console.log(i+") "+rule.raw, rule.suffix);
      if (rule.applies(check)) {
        dbug && console.log(word + ' hit rule #' + i, rule);
        return rules[i].fire(word);
      }
    }

    return word;
  }

  singularize(word, opts) {
    return this.adjustNumber(word, SING, (opts && opts.dbug));
  }

  pluralize(word, opts) {
    if (this.isPlural(word, opts)) return word;
    return this.adjustNumber(word, PLUR, (opts && opts.dbug));
  }

  isPlural(word, opts) { // add to API?

    if (word && typeof word !== 'string') {
      // similar to adjustNumber
      throw Error(`isPlural() requires a string as input`); 
    }

    if (!word || word.length === 0) return false;

    let dbug = opts && opts.dbug;

    word = word.toLowerCase();

    if (MASS_NOUNS.includes(word)) {
      dbug && console.log(word + " is mass nouns");
      return true;
    }

    const lex = this.RiTa.lexicon();
    let sing = this.RiTa.singularize(word);

    // Is singularized form is in lexicon as 'nn' or tag as nn (noGuessing)?
    if (sing !== word && 
      this.RiTa.tagger.allTags(sing, { noGuessing: true }).includes("nn")) {
      // fix for words like 'child':
      // mass nouns should have been detected above
      dbug && console.log(word + "'s singular form " + sing + " is nn");
      return true;
    }

    // A general modal form? (for example, ends in 'ness')
    if (/([a-z]+ness)$/.test(word)) {
      dbug && console.log(word + " is general modal form");
      return true;
    } 

    if (word.endsWith("ae") && word === sing + "e") {
      dbug && console.log(word + ": latin rule -a to -ae");
        return true;
    }

    for (let i = 0; i < IS_PLURAL_RULES.length; i++) {
      let rule = IS_PLURAL_RULES[i];
      if (rule.test(word)) {
        dbug && console.log(word + ' hit', rule);
        return true;
      }
    }
    
    dbug && console.log('isPlural: no rules hit for ' + word);

    return false;
  }
}

const RE = Util.RE;
const PLUR = 1, SING = 2;
const MASS_NOUNS = Util.MASS_NOUNS;
const DEFAULT_SING = RE("^.*s$", 1);
const DEFAULT_PLUR = RE("^((\\w+)(-\\w+)*)(\\s((\\w+)(-\\w+)*))*$", 0, "s");
const DEFAULT_IS_PLUR_RE = /(ae|ia|s)$/;
const ALL_NOUN_ENDED_WITH_E = "abeyance|abode|aborigine|abrasive|absence|absentee|absolute|abstinence|abundance|abuse|acceptance|accolade|accomplice|accordance|ace|acetate|acetone|acetylene|ache|acolyte|acquaintance|acquiescence|acquire|acre|acreage|active|acupuncture|acute|adage|additive|addressee|adherence|adhesive|adjective|admittance|adobe|adolescence|adoptee|adrenaline|advance|advantage|adventure|advocate|aerospace|affiliate|affirmative|affluence|agate|age|aggregate|agriculture|aide|airfare|airframe|airline|airplane|airtime|airwave|aisle|alcove|ale|algae|allegiance|alliance|allowance|allure|alternate|alternative|altitude|ambiance|ambivalence|ambulance|amphetamine|amplitude|analogue|anchorage|anecdote|angle|ankle|annoyance|anode|ante|antelope|antidote|antihistamine|antique|anyone|ape|aperture|apocalypse|apogee|apostle|appearance|appellate|appendage|appetite|apple|appliance|appointee|apprentice|approximate|aptitude|aquamarine|arbitrage|arcade|archetype|architecture|archive|armistice|arrearage|arrogance|artichoke|article|artifice|ashare|assemblage|associate|assurance|athlete|atmosphere|attache|attendance|attendee|attire|attitude|attribute|audience|audiophile|auspice|autoclave|automobile|avalanche|avarice|avenue|average|avoidance|awe|axe|axle|babble|babe|backbone|backhoe|backside|badge|bagpipe|bakeware|balance|bale|bandage|bane|banshee|barbecue|barge|baritone|barnacle|baroque|barrage|barricade|base|baseline|bathrobe|battle|bauble|beadle|bedside|bedtime|bee|beehive|beetle|belligerence|beneficence|benevolence|benzene|beverage|bible|bicarbonate|bicycle|biggie|bike|bile|billionaire|binge|biplane|birdie|birthplace|birthrate|bisque|bite|blade|blame|blanche|blase|blaze|blockade|blockage|bloke|blonde|blouse|blue|boardinghouse|boilerplate|bondage|bone|bonfire|boogie|bookcase|bookie|bookstore|boondoggle|borderline|bore|bottle|bounce|bourgeoisie|boutique|bovine|brace|brake|bramble|breakage|breeze|bribe|bride|bridge|bridle|brie|briefcase|brigade|brilliance|brindle|brine|bristle|broadside|brocade|brochure|brokerage|bromide|bronze|brownie|bruise|brunette|brute|bubble|buckle|bugle|bulge|bundle|bustle|butane|buttonhole|byline|byte|cabbage|cable|cache|cadence|cadre|cafe|caffeine|cage|cake|calorie|camaraderie|camouflage|campfire|campsite|candidate|candle|cane|canine|canoe|cantaloupe|capacitance|cape|capsule|captive|capture|carbide|carbine|carbohydrate|carbonate|care|caricature|carnage|carnivore|carriage|cartilage|cartridge|cascade|case|cashmere|cassette|caste|castle|catalogue|catastrophe|cathode|cattle|cause|cave|cayenne|ceasefire|cellophane|censure|centerpiece|centre|centrifuge|certificate|chaise|challenge|champagne|chance|change|chaperone|charge|charlotte|chase|cheekbone|cheese|cheesecake|chemise|childcare|chimpanzee|chive|chloride|chlorine|chocolate|choice|choke|chore|chrome|chromosome|chronicle|chuckle|chute|cigarette|ciliate|circle|circumference|circumstance|clairvoyance|classmate|clause|clearance|clearinghouse|cleavage|cliche|clientele|climate|clime|clique|closure|cloture|clove|clozapine|clubhouse|clue|coastline|cobblestone|cocaine|code|coexistence|coffee|cognizance|coherence|coincidence|coke|collage|collapse|collarbone|colleague|collective|college|collie|cologne|colonnade|columbine|combine|comeuppance|comfortable|commemorative|commerce|committee|commonplace|commune|communique|commute|comparative|compare|competence|composite|composure|compote|compromise|comrade|concentrate|concessionaire|concierge|conclave|concrete|concurrence|condensate|condolence|cone|conferee|conference|confidante|confidence|confluence|conformance|conglomerate|congruence|conjecture|connivance|conscience|consequence|conservative|consistence|constable|consulate|continuance|contraceptive|contrivance|convalescence|convenience|converse|convertible|conveyance|cookie|cookware|cooperative|coordinate|cope|core|cornerstone|corpse|correspondence|corsage|cortisone|corvette|costume|coterie|cottage|countenance|counterbalance|counterforce|countermeasure|countryside|coupe|couple|courage|course|courthouse|couture|cove|coverage|cowardice|coyote|crackle|cradle|crane|crate|craze|crease|creature|credence|creole|crevice|crime|cripple|critique|crocodile|crone|crossfire|crucible|crude|cruise|crusade|cubbyhole|cube|cue|cuisine|culture|curbside|cure|curse|curve|cyanide|cycle|dale|damage|dame|daminozide|dance|dare|database|date|daytime|daze|deadline|debacle|debate|debutante|decade|decadence|decline|decrease|decree|defense|defensive|deference|defiance|degree|delegate|deliverance|deluge|demagogue|demise|denture|departure|dependence|deportee|deregulate|derivative|designate|designee|desire|detective|detente|deterrence|deviance|device|devotee|dialogue|diatribe|die|difference|dike|dime|dinnertime|dinnerware|dioxide|dipole|directive|directorate|dirge|disadvantage|disallowance|disappearance|discharge|disciple|discipline|disclosure|discontinuance|discotheque|discourse|disease|disgrace|disguise|disincentive|diskette|dislike|disobedience|displeasure|disposable|dispute|disrepute|disservice|dissolve|dissonance|distance|distaste|distillate|disturbance|dive|divergence|divestiture|divide|divine|divorce|divorcee|dockside|doctorate|doctrinaire|doctrine|dodge|doe|doghouse|dole|dome|dominance|dope|dosage|dose|double|dove|downgrade|downside|downtime|draftee|drainage|drape|drawbridge|dribble|drive|drizzle|drone|drove|drugstore|due|duke|dune|dye|dyke|dynamite|eagle|earphone|earthenware|earthquake|ease|eave|eclipse|edge|edifice|effective|electorate|electrode|elegance|eligible|elite|eloquence|else|elsewhere|embrace|emcee|emergence|emigre|eminence|empire|employee|enclave|enclosure|encore|endurance|engine|enrage|enrollee|ensemble|enterprise|entire|entourage|entrance|entre|envelope|enzyme|epicure|epilogue|episode|epitome|equine|equivalence|escapade|escape|escapee|espionage|esplanade|essence|estate|estimate|ethane|ethylene|etiquette|eve|everyone|example|excellence|exchange|excise|exclusive|excuse|executive|exercise|exile|existence|expanse|expatriate|expenditure|expense|experience|expletive|explosive|expose|exposure|extravagance|extreme|exuberance|eye|eyepiece|eyesore|fable|facade|face|facsimile|fade|failure|faire|fake|fame|famine|fanfare|farce|fare|farmhouse|fashionable|fate|fatigue|favorite|feature|fee|female|feminine|fence|fiance|fiancee|fiddle|figure|file|filigree|finale|finance|fine|finesse|finite|fire|firehouse|fireplace|fixture|flagpole|flake|flame|flange|flare|flatware|fleece|flextime|floe|flue|fluke|fluoride|flute|foe|foible|folklore|foodservice|footage|footnote|forage|forbearance|force|fore|foreclosure|forfeiture|forge|formaldehyde|formative|fortitude|fortune|foursome|foxhole|fracture|fragrance|frame|franchise|franchisee|freebie|freeze|fridge|frieze|frigate|fringe|frontage|frostbite|fudge|fugitive|fumble|fungicide|furnace|fuse|fuselage|fusillade|future|gabardine|gable|gaffe|gage|gaggle|gale|gallstone|gamble|game|garage|gasoline|gate|gauge|gaze|gazelle|gemstone|gendarme|gene|genie|genocide|genome|genre|gentile|gesture|giggle|girdle|girlie|glade|glance|glare|glassware|glaze|glee|glimpse|globe|glove|glue|glutamate|gnome|goatee|gobble|goggle|goodbye|google|goose|gorge|governance|grace|grade|graduate|granite|grape|grapevine|graphite|grate|grave|greenhouse|grenade|grievance|grille|grime|grindstone|gripe|groove|grouse|grove|grudge|guarantee|guesstimate|guidance|guide|guideline|guile|guillotine|guise|gunfire|gurgle|gyroscope|habitue|hackle|haggle|hairline|halftime|handle|handshake|happenstance|harborside|hardcore|hardline|hare|hassle|haste|have|headache|headline|headphone|healthcare|hearse|heave|hectare|hedge|heliotrope|hellfire|hemisphere|hemline|hemorrhage|herbicide|heritage|heroine|hide|hike|hillside|hindrance|hinge|hippie|hire|hive|hodgepodge|hoe|hole|homage|home|homicide|hone|honeybee|honorable|hope|horde|hormone|horoscope|horrible|horse|horticulture|hose|hospice|hostage|hostile|hotline|house|houseware|housewife|huddle|hue|hurdle|hurricane|hustle|hydride|hygiene|hype|hyperbole|hypocrite|ideologue|ignorance|image|imbalance|immense|immune|impasse|impatience|imperative|imponderable|importance|impotence|imprudence|impulse|incapable|incentive|incidence|incline|incoherence|income|incompetence|incomprehensible|inconvenience|increase|indefinite|indenture|indifference|indispensable|inductee|indulgence|ineptitude|inexperience|infallible|inference|infinite|influence|infrastructure|inheritance|initiate|initiative|injustice|inmate|innocence|insecticide|inside|insignificance|insistence|insolence|insoluble|instance|institute|insurance|intake|intangible|intelligence|intelligible|intensive|interchange|intercourse|interdependence|interestrate|interface|interference|interlude|interstate|interviewee|intestine|intimate|intolerance|intransigence|intrigue|invective|inverse|invertebrate|invite|invoice|iodide|iodine|ire|irresponsible|irreverence|isle|issuance|issue|jade|jailhouse|jasmine|jawbone|jibe|jingle|joke|joyride|judge|juice|jumble|juncture|jungle|junkie|jute|juvenile|kale|kaleidoscope|kamikaze|karaoke|keepsake|kerosene|kettle|keyhole|keynote|keystone|kiddie|kilobyte|kitchenette|kitchenware|kite|knee|knife|knuckle|lace|ladle|lake|lance|landscape|landslide|lane|language|lapse|largesse|lathe|latitude|lattice|laureate|laxative|league|leakage|lease|leave|lecture|ledge|legislature|legume|leisure|lemonade|lettuce|levamisole|levee|leverage|libertine|license|licensee|lie|life|lifeline|lifestyle|lifetime|lighthouse|lignite|lime|limestone|limousine|linage|line|lineage|lingerie|linkage|liposome|literature|litle|loave|lobe|lobule|locale|locomotive|lodge|longitude|longtime|loophole|lope|lore|lounge|louse|love|lube|luminescence|lunchtime|lure|lustre|lute|lye|lymphocyte|machete|machine|madhouse|madstone|magazine|magistrate|magnate|magnitude|mainframe|mainline|maintenance|make|male|malice|malpractice|mandate|mane|manganese|manhole|manmade|mantle|manufacture|manure|maple|marble|mare|margarine|marine|marketplace|marmalade|marque|marquee|marriage|martingale|masculine|masquerade|massacre|massage|masterpiece|mate|matte|maze|mealtime|meantime|meanwhile|measure|medicare|medicine|megabyte|melamine|melange|melee|membrane|menace|merge|message|methadone|methane|methylene|mettle|microbe|micromanage|microphone|microscope|microwave|middle|midrange|midwife|migraine|mile|mileage|milestone|millionaire|mine|miniature|miniscule|minute|miracle|mire|misadventure|misanthrope|miscarriage|miscue|misfortune|missile|missive|mistake|mistletoe|misuse|mite|mitre|mixture|mode|module|moisture|mole|molecule|mollycoddle|monologue|monotone|montage|moraine|more|morgue|morphine|mortgage|mosque|motive|motorbike|motorcade|motorcycle|mottle|mountainside|mouse|mousse|moustache|mouthpiece|movable|move|movie|moxie|muddle|mule|multiple|multistate|multitude|mumble|muscle|musculature|muse|mustache|muzzle|myrtle|mystique|naive|naivete|name|nameplate|namesake|narrative|native|nature|necklace|necktie|needle|negative|negligence|neophyte|nerve|newswire|nibble|niche|nickname|nicotine|niece|nightingale|nightmare|nighttime|nitrate|node|nodule|noise|nomenclature|nominee|noncompliance|none|nonviolence|noodle|noose|nose|nosedive|note|notice|novice|nowhere|nozzle|nuance|nude|nudge|nuisance|nuke|nurse|nurture|obedience|objective|oblige|observance|obsessive|obstacle|obverse|occurrence|ochre|octane|ode|offense|offensive|office|ogre|ole|olive|omnipotence|omnipresence|onstage|operative|opposite|opulence|oracle|orange|ordinance|ordnance|ore|orifice|orphanage|ounce|outage|outcome|outhouse|outline|outrage|outshone|outside|overdose|overdrive|override|oversize|overtime|overtone|overture|oxide|ozone|pace|package|paddle|page|palace|palate|pale|palette|palisade|panache|pancake|pane|panhandle|pantie|pantomime|parable|parachute|parade|paraphrase|parasite|parentage|parlance|parole|parolee|parsonage|particle|passage|passive|paste|pastime|pasture|pate|patience|patronage|pause|peacetime|pebble|pedigree|penance|pence|penthouse|people|percentage|perchlorate|performance|perfume|permanence|permissible|peroxide|perquisite|persistence|perspective|pesticide|pestilence|petulance|phase|phone|phosphate|phrase|physique|pickle|picture|picturesque|pie|piece|pile|pilgrimage|pimple|pine|pineapple|pinhole|pinnacle|pipe|pipeline|pique|pirate|pittance|place|plague|plane|plaque|plate|platitude|plausible|playhouse|playmate|pleasure|pledge|plumage|plume|plunge|poke|pole|polyurethane|poodle|poolside|pope|populace|porcupine|pore|porpoise|porridge|portable|pose|positive|posse|postage|posture|potentate|pothole|poultice|powerhouse|practice|prairie|praise|prattle|preamble|precedence|precipice|precipitate|predominance|preface|prefecture|preference|prejudice|prelude|premiere|premise|preponderance|preppie|prerequisite|prerogative|presale|presence|preserve|pressure|prestige|pretense|prevalence|preventive|price|primate|prime|primetime|prince|principle|private|privilege|prize|probate|probe|procedure|produce|profile|progressive|projectile|promenade|prominence|promise|propane|propylene|prostate|prostitute|protective|protege|prototype|provenance|providence|province|prude|prudence|prune|psyche|puddle|pulse|purchase|purge|purple|purpose|purse|puzzle|quagmire|quake|questionnaire|queue|quiche|quickie|quince|quinine|quote|rabble|race|racehorse|radiance|rage|ragtime|railbike|raise|rake|rampage|range|rape|rapture|rate|rationale|rattle|rattlesnake|rawhide|realestate|reappearance|reassurance|rebate|rebuke|receivable|receptacle|recharge|recipe|recluse|recognizance|reconfigure|reconnaissance|recourse|rectangle|rectitude|recurrence|redone|referee|reference|refuge|refugee|refuse|reggae|regime|reignite|reinsurance|reissue|relapse|relative|release|relevance|reliance|relocate|reluctance|remade|remembrance|reminiscence|remittance|renaissance|renegade|repartee|repentance|repertoire|reportage|representative|reprieve|reptile|repurchase|repute|resale|rescue|resemblance|reserve|reshuffle|residence|residue|resilience|resistance|resolve|resonance|resource|respite|response|restructure|resume|resurgence|reticence|retinue|retiree|retrospective|revenge|revenue|reverence|reverie|reverse|rewrite|rhinestone|rhyme|riddance|riddle|ride|ridge|ridicule|rifle|ringside|rinse|ripple|rite|riverside|roadside|robe|role|romance|rooftree|rookie|roommate|rope|rose|rosette|rote|rouge|roulette|roundhouse|route|routine|rubble|ruble|rue|rule|rumble|rupee|rupture|ruse|russe|rye|sable|sabotage|sabre|sacrifice|sacrilege|saddle|safe|sage|sake|sale|saline|salute|salvage|salve|sample|sanguine|sardine|satellite|satire|sauce|sausage|savage|saxophone|scale|scare|scene|schedule|scheme|schoolhouse|schoolmate|science|scope|score|scourge|scramble|scrape|scribe|scrimmage|scripture|scuffle|sculpture|seashore|seaside|sedative|seepage|seizure|semblance|senate|sense|sensible|sensitive|sentence|sequence|serenade|serene|serve|service|servitude|sesame|severance|sewage|shade|shake|shape|share|shave|shinbone|shine|shingle|shipmate|shirtsleeve|shoe|shoelace|shore|shoreline|shortage|shortcake|shove|showcase|showpiece|shrine|shrinkage|shuffle|shuttle|side|sideline|siege|sieve|signature|significance|silence|silhouette|silicate|silicone|silverware|simile|simple|sine|single|sinkhole|site|size|sizzle|skyline|skywave|slate|slaughterhouse|slave|sleeve|slice|slide|slime|slippage|slope|sludge|sluice|smile|smoke|smudge|snake|snare|snowflake|socialite|solace|sole|solicitude|solitude|some|someone|someplace|somewhere|sophisticate|sophomore|sore|souffle|source|space|spade|spangle|spate|spectacle|spectre|sphere|spice|spike|spindle|spine|spire|spite|spittle|splice|splurge|spoilage|spoke|sponge|spore|spouse|spree|springtime|sprinkle|spruce|squabble|square|squeegee|squeeze|squire|stable|stage|staircase|stake|stalemate|stampede|stance|staple|stare|state|statue|stature|statute|steakhouse|steppe|stereotype|stethoscope|stockpile|stone|stoneware|stooge|stoppage|storage|store|storehouse|storyline|stove|stratosphere|stricture|stride|strife|strike|stripe|striptease|strobe|stroke|structure|struggle|strychnine|stubble|stumble|stumpage|style|styrene|subcommittee|sublease|sublime|submarine|subordinate|subservience|subsidence|subsistence|substance|substantive|substitute|substrate|subterfuge|subtitle|suburbanite|suede|suffrage|suffragette|sugarcane|suicide|suitcase|suite|sulfide|summertime|sunrise|sunshine|superstore|superstructure|supine|supreme|surcharge|surface|surge|surname|surprise|surrogate|surveillance|susceptible|sustenance|suture|swerve|swipe|sycamore|syllable|synagogue|syndicate|syndrome|syringe|table|tableware|tackle|tadpole|tagline|tailgate|tailpipe|take|tale|tambourine|tangle|tape|taste|teammate|tease|technique|tee|telephone|telescope|teletype|telltale|temperance|temperature|template|temple|tempore|tense|tentacle|tentative|tenure|termite|terrace|testicle|testosterone|textile|texture|theme|thimble|thistle|thoroughfare|threesome|throne|throttle|tide|tie|tightrope|tile|timbre|time|timepiece|timetable|tincture|tine|tintype|tirade|tire|tissue|titanate|title|toe|toffee|tole|tolerance|tombstone|tome|tone|tongue|tonnage|toothpaste|torque|tortoise|torture|touchstone|townhouse|trace|trackage|trade|trance|tranche|transcendence|transience|transverse|trapeze|travelogue|treasure|treatise|treble|tree|tremble|trestle|triage|triangle|tribe|tribute|trickle|trifle|triglyceride|tripe|triple|triumvirate|trombone|trouble|troupe|trove|truce|trudge|trundle|trustee|tube|tumble|tune|turbine|turbulence|turnpike|turntable|turpentine|turquoise|turtle|tussle|tutelage|twaddle|twine|twinge|twinkle|twosome|tyke|type|typeface|umbrage|umpire|unattainable|uncle|undergraduate|underperformance|underscore|underside|undertone|underwrote|undesirable|unfortunate|unique|universe|unlike|unthinkable|update|upgrade|upscale|upside|upsurge|urethane|urge|urine|usage|use|utterance|vaccine|value|valve|vampire|vane|vantage|variable|variance|vase|vaudeville|vegetable|vehicle|venerable|vengeance|venture|venue|verbiage|verge|verisimilitude|verse|vertebrate|verve|vestige|vibe|vice|vicissitude|videocassette|videotape|vigilance|vignette|village|vine|vintage|virtue|virulence|visage|vise|vogue|voice|voltage|volume|vote|voyage|vulture|waffle|wage|waggle|wale|wane|wardrobe|ware|warehouse|warfare|wartime|wattle|wave|wayside|weave|wedge|welcome|welfare|whale|wheeze|while|whine|whistle|white|whole|wholesale|whore|wife|wiggle|wile|wince|windowpane|wine|wintertime|wire|wobble|woe|workforce|workhorse|workplace|wreckage|wrinkle|yardage|yoke|yuppie|zombie|zone";

const IS_PLURAL_RULES = [
  // a subset of SING_RULES, delete the rules that might cause false positive
  /(houses|pluses|cases)$/,
  /^(apices|cortices)$/,
  /^(meninges|phalanges)$/,
  /^(octopus|pinch|fetus|genus|sinus|tomato|kiss|pelvis)es$/,
  /^(whizzes)$/,
  /(l|w)ives$/,
  /^(appendices|matrices)$/,
  /^(indices|apices|cortices)$/,
  /^(media|millennia|consortia|septa|memorabilia|data|femora)$/,
  /^(memoranda|bacteria|curricula|minima|maxima|referenda|spectra|phenomena|criteria)$/,
  /^[lm]ice$/,
  /feet$/,
  /teeth$/,
  /children$/,
  /geese$/,
  /^concerti$/,
  /people$/,
  /^oxen/,
  /(treatises|chemises)$/,
  // other rules
  /(human|german|roman|femur)s/,
];

const SING_RULES = [
  RE("(houses|pluses|cases)$", 1, ""),
  RE("^(apices|cortices)$", 4, "ex"),
  RE("^(meninges|phalanges)$", 3, "x"), // x -> ges
  RE("^(octopus|pinch|fetus|genus|sinus|tomato|kiss|pelvis)es$", 2),
  RE("^(whizzes)$", 3),
  RE("^(" + ALL_NOUN_ENDED_WITH_E + ")s$", 1, ""),
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
  RE("geese$", 4, "oose"),
  RE("^concerti$", 1, "o"),
  RE("people$", 4, "rson"),
  RE("^(vertebr|larv|minuti)ae$", 1),
  RE("^oxen", 2),
  RE("esses$", 2),
  RE("(treatises|chemises)$", 1),
  RE("(sh|ch|o|ss|x|z|us)es$", 2),
  RE("(ses)$", 2, "is"), // catharses, prognoses
  //  RE("([a-z]+osis|[a-z]+itis|[a-z]+ness)$", 0),
  DEFAULT_SING
];

const PLUR_RULES = [
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
  DEFAULT_PLUR
];

export default Inflector;