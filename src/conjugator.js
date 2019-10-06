const RE = require("./utils").RE;

const CONS = "[bcdfghjklmnpqrstvwxyz]";
const ANY_STEM = "^((\\w+)(-\\w+)*)(\\s((\\w+)(-\\w+)*))*$";
const MODALS = ["shall", "would", "may", "might", "ought", "should"];
const VERBAL_PREFIX = "((be|with|pre|un|over|re|mis|under|out|up|fore|for|counter|co|sub)(-?))";

const ING_FORM_RULES = [
  RE(CONS + "ie$", 2, "ying", 1),
  RE("[^ie]e$", 1, "ing", 1),
  RE("^bog-down$", 5, "ging-down", 0),
  RE("^chivy$", 1, "vying", 0),
  RE("^trek$", 1, "cking", 0),
  RE("^bring$", 0, "ing", 0),
  RE("^be$", 0, "ing", 0),
  RE("^age$", 1, "ing", 0),
  RE("(ibe)$", 1, "ing", 0)
];

const PAST_PARTICIPLE_RULES = [

  RE(CONS + "y$", 1, "ied", 1),
  RE("^" + VERBAL_PREFIX + "?(bring)$", 3, "ought", 0),
  RE("^" + VERBAL_PREFIX + "?(take|rise|strew|blow|draw|drive|know|give|" + "arise|gnaw|grave|grow|hew|know|mow|see|sew|throw|prove|saw|quartersaw|" + "partake|sake|shake|shew|show|shrive|sightsee|strew|strive)$",
    0, "n", 0),
  RE("^" + VERBAL_PREFIX + "?[gd]o$", 0, "ne", 1),
  RE("^(beat|eat|be|fall)$", 0, "en", 0),
  RE("^(have)$", 2, "d", 0),
  RE("^" + VERBAL_PREFIX + "?bid$", 0, "den", 0),
  RE("^" + VERBAL_PREFIX + "?[lps]ay$", 1, "id", 1),
  RE("^behave$", 0, "d", 0),
  RE("^" + VERBAL_PREFIX + "?have$", 2, "d", 1),
  RE("(sink|slink|drink|shrink|stink)$", 3, "unk", 0),
  RE("(([sfc][twlp]?r?|w?r)ing|hang)$", 3, "ung", 0),
  RE("^" + VERBAL_PREFIX + "?(shear|swear|bear|wear|tear)$", 3, "orn", 0),
  RE("^" + VERBAL_PREFIX + "?(bend|spend|send|lend)$", 1, "t", 0),
  RE("^" + VERBAL_PREFIX + "?(weep|sleep|sweep|creep|keep$)$", 2, "pt", 0),
  RE("^" + VERBAL_PREFIX + "?(sell|tell)$", 3, "old", 0),
  RE("^(outfight|beseech)$", 4, "ought", 0),
  RE("^bethink$", 3, "ought", 0),
  RE("^buy$", 2, "ought", 0),
  RE("^aby$", 1, "ought", 0),
  RE("^tarmac", 0, "ked", 0),
  RE("^abide$", 3, "ode", 0),
  RE("^" + VERBAL_PREFIX + "?(speak|(a?)wake|break)$", 3, "oken", 0),
  RE("^backbite$", 1, "ten", 0),
  RE("^backslide$", 1, "den", 0),
  RE("^become$", 3, "ame", 0),
  RE("^begird$", 3, "irt", 0),
  RE("^outlie$", 2, "ay", 0),
  RE("^rebind$", 3, "ound", 0),
  RE("^relay$", 2, "aid", 0),
  RE("^shit$", 3, "hat", 0),
  RE("^bereave$", 4, "eft", 0),
  RE("^foreswear$", 3, "ore", 0),
  RE("^overfly$", 1, "own", 0),
  RE("^beget$", 2, "otten", 0),
  RE("^begin$", 3, "gun", 0),
  RE("^bestride$", 1, "den", 0),
  RE("^bite$", 1, "ten", 0),
  RE("^bleed$", 4, "led", 0),
  RE("^bog-down$", 5, "ged-down", 0),
  RE("^bind$", 3, "ound", 0),
  RE("^(.*)feed$", 4, "fed", 0),
  RE("^breed$", 4, "red", 0),
  RE("^brei", 0, "d", 0),
  RE("^bring$", 3, "ought", 0),
  RE("^build$", 1, "t", 0),
  RE("^come", 0),
  RE("^catch$", 3, "ught", 0),
  RE("^chivy$", 1, "vied", 0),
  RE("^choose$", 3, "sen", 0),
  RE("^cleave$", 4, "oven", 0),
  RE("^crossbreed$", 4, "red", 0),
  RE("^deal", 0, "t", 0),
  RE("^dow$", 1, "ught", 0),
  RE("^dream", 0, "t", 0),
  RE("^dig$", 3, "dug", 0),
  RE("^dwell$", 2, "lt", 0),
  RE("^enwind$", 3, "ound", 0),
  RE("^feel$", 3, "elt", 0),
  RE("^flee$", 2, "ed", 0),
  RE("^floodlight$", 5, "lit", 0),
  RE("^fly$", 1, "own", 0),
  RE("^forbear$", 3, "orne", 0),
  RE("^forerun$", 3, "ran", 0),
  RE("^forget$", 2, "otten", 0),
  RE("^fight$", 4, "ought", 0),
  RE("^find$", 3, "ound", 0),
  RE("^freeze$", 4, "ozen", 0),
  RE("^gainsay$", 2, "aid", 0),
  RE("^gin$", 3, "gan", 0),
  RE("^gen-up$", 3, "ned-up", 0),
  RE("^ghostwrite$", 1, "ten", 0),
  RE("^get$", 2, "otten", 0),
  RE("^grind$", 3, "ound", 0),
  RE("^hacksaw", 0, "n", 0),
  RE("^hear", 0, "d", 0),
  RE("^hold$", 3, "eld", 0),
  RE("^hide$", 1, "den", 0),
  RE("^honey$", 2, "ied", 0),
  RE("^inbreed$", 4, "red", 0),
  RE("^indwell$", 3, "elt", 0),
  RE("^interbreed$", 4, "red", 0),
  RE("^interweave$", 4, "oven", 0),
  RE("^inweave$", 4, "oven", 0),
  RE("^ken$", 2, "ent", 0),
  RE("^kneel$", 3, "elt", 0),
  RE("^lie$", 2, "ain", 0),
  RE("^leap$", 0, "t", 0),
  RE("^learn$", 0, "t", 0),
  RE("^lead$", 4, "led", 0),
  RE("^leave$", 4, "eft", 0),
  RE("^light$", 5, "lit", 0),
  RE("^lose$", 3, "ost", 0),
  RE("^make$", 3, "ade", 0),
  RE("^mean", 0, "t", 0),
  RE("^meet$", 4, "met", 0),
  RE("^misbecome$", 3, "ame", 0),
  RE("^misdeal$", 2, "alt", 0),
  RE("^mishear$", 1, "d", 0),
  RE("^mislead$", 4, "led", 0),
  RE("^misunderstand$", 3, "ood", 0),
  RE("^outbreed$", 4, "red", 0),
  RE("^outrun$", 3, "ran", 0),
  RE("^outride$", 1, "den", 0),
  RE("^outshine$", 3, "one", 0),
  RE("^outshoot$", 4, "hot", 0),
  RE("^outstand$", 3, "ood", 0),
  RE("^outthink$", 3, "ought", 0),
  RE("^outgo$", 2, "went", 0),
  RE("^overbear$", 3, "orne", 0),
  RE("^overbuild$", 3, "ilt", 0),
  RE("^overcome$", 3, "ame", 0),
  RE("^overfly$", 2, "lew", 0),
  RE("^overhear$", 2, "ard", 0),
  RE("^overlie$", 2, "ain", 0),
  RE("^overrun$", 3, "ran", 0),
  RE("^override$", 1, "den", 0),
  RE("^overshoot$", 4, "hot", 0),
  RE("^overwind$", 3, "ound", 0),
  RE("^overwrite$", 1, "ten", 0),
  RE("^plead$", 2, "d", 0),
  //RE("^run$", 3, "ran", 0), //DH
  //RE("^rerun$", 3, "run", 0),
  RE("^rebuild$", 3, "ilt", 0),
  RE("^red$", 3, "red", 0),
  RE("^redo$", 1, "one", 0),
  RE("^remake$", 3, "ade", 0),
  RE("^resit$", 3, "sat", 0),
  RE("^rethink$", 3, "ought", 0),
  RE("^rewind$", 3, "ound", 0),
  RE("^rewrite$", 1, "ten", 0),
  RE("^ride$", 1, "den", 0),
  RE("^reeve$", 4, "ove", 0),
  RE("^sit$", 3, "sat", 0),
  RE("^shoe$", 3, "hod", 0),
  RE("^shine$", 3, "one", 0),
  RE("^shoot$", 4, "hot", 0),
  RE("^ski$", 1, "i'd", 0),
  RE("^slide$", 1, "den", 0),
  RE("^smite$", 1, "ten", 0),
  RE("^seek$", 3, "ought", 0),
  RE("^spit$", 3, "pat", 0),
  RE("^speed$", 4, "ped", 0),
  RE("^spellbind$", 3, "ound", 0),
  RE("^spoil$", 2, "ilt", 0),
  RE("^spotlight$", 5, "lit", 0),
  RE("^spin$", 3, "pun", 0),
  RE("^steal$", 3, "olen", 0),
  RE("^stand$", 3, "ood", 0),
  RE("^stave$", 3, "ove", 0),
  RE("^stride$", 1, "den", 0),
  RE("^strike$", 3, "uck", 0),
  RE("^stick$", 3, "uck", 0),
  RE("^swell$", 3, "ollen", 0),
  RE("^swim$", 3, "wum", 0),
  RE("^teach$", 4, "aught", 0),
  RE("^think$", 3, "ought", 0),
  RE("^tread$", 3, "odden", 0),
  RE("^typewrite$", 1, "ten", 0),
  RE("^unbind$", 3, "ound", 0),
  RE("^underbuy$", 2, "ought", 0),
  RE("^undergird$", 3, "irt", 0),
  RE("^undergo$", 1, "one", 0),
  RE("^underlie$", 2, "ain", 0),
  RE("^undershoot$", 4, "hot", 0),
  RE("^understand$", 3, "ood", 0),
  RE("^unfreeze$", 4, "ozen", 0),
  RE("^unlearn", 0, "t", 0),
  RE("^unmake$", 3, "ade", 0),
  RE("^unreeve$", 4, "ove", 0),
  RE("^unstick$", 3, "uck", 0),
  RE("^unteach$", 4, "aught", 0),
  RE("^unthink$", 3, "ought", 0),
  RE("^untread$", 3, "odden", 0),
  RE("^unwind$", 3, "ound", 0),
  RE("^upbuild$", 1, "t", 0),
  RE("^uphold$", 3, "eld", 0),
  RE("^upheave$", 4, "ove", 0),
  RE("^waylay$", 2, "ain", 0),
  RE("^whipsaw$", 2, "awn", 0),
  RE("^withhold$", 3, "eld", 0),
  RE("^withstand$", 3, "ood", 0),
  RE("^win$", 3, "won", 0),
  RE("^wind$", 3, "ound", 0),
  RE("^weave$", 4, "oven", 0),
  RE("^write$", 1, "ten", 0),
  RE("^trek$", 1, "cked", 0),
  RE("^ko$", 1, "o'd", 0),
  RE("^win$", 2, "on", 0),

  RE("e$", 0, "d", 1),

  // Null past forms
  RE("^" + VERBAL_PREFIX + "?(cast|thrust|typeset|cut|bid|upset|wet|bet|cut|hit|hurt|inset|let|cost|burst|beat|beset|set|upset|hit|offset|put|quit|" + "wed|typeset|wed|spread|split|slit|read|run|rerun|shut|shed)$", 0)
];

const PAST_TENSE_RULES = [
  RE("^(reduce)$", 0, "d", 0),
  RE("e$", 0, "d", 1),
  RE("^" + VERBAL_PREFIX + "?[pls]ay$", 1, "id", 1),
  RE(CONS + "y$", 1, "ied", 1),
  RE("^(fling|cling|hang)$", 3, "ung", 0),
  RE("(([sfc][twlp]?r?|w?r)ing)$", 3, "ang", 1),
  RE("^" + VERBAL_PREFIX + "?(bend|spend|send|lend|spend)$", 1, "t", 0),
  RE("^" + VERBAL_PREFIX + "?lie$", 2, "ay", 0),
  RE("^" + VERBAL_PREFIX + "?(weep|sleep|sweep|creep|keep)$", 2, "pt",
    0),
  RE("^" + VERBAL_PREFIX + "?(sell|tell)$", 3, "old", 0),
  RE("^" + VERBAL_PREFIX + "?do$", 1, "id", 0),
  RE("^" + VERBAL_PREFIX + "?dig$", 2, "ug", 0),
  RE("^behave$", 0, "d", 0),
  RE("^(have)$", 2, "d", 0),
  RE("(sink|drink)$", 3, "ank", 0),
  RE("^swing$", 3, "ung", 0),
  RE("^be$", 2, "was", 0),
  RE("^outfight$", 4, "ought", 0),
  RE("^tarmac", 0, "ked", 0),
  RE("^abide$", 3, "ode", 0),
  RE("^aby$", 1, "ought", 0),
  RE("^become$", 3, "ame", 0),
  RE("^begird$", 3, "irt", 0),
  RE("^outlie$", 2, "ay", 0),
  RE("^rebind$", 3, "ound", 0),
  RE("^shit$", 3, "hat", 0),
  RE("^bereave$", 4, "eft", 0),
  RE("^foreswear$", 3, "ore", 0),
  RE("^bename$", 3, "empt", 0),
  RE("^beseech$", 4, "ought", 0),
  RE("^bethink$", 3, "ought", 0),
  RE("^bleed$", 4, "led", 0),
  RE("^bog-down$", 5, "ged-down", 0),
  RE("^buy$", 2, "ought", 0),
  RE("^bind$", 3, "ound", 0),
  RE("^(.*)feed$", 4, "fed", 0),
  RE("^breed$", 4, "red", 0),
  RE("^brei$", 2, "eid", 0),
  RE("^bring$", 3, "ought", 0),
  RE("^build$", 3, "ilt", 0),
  RE("^come$", 3, "ame", 0),
  RE("^catch$", 3, "ught", 0),
  RE("^clothe$", 5, "lad", 0),
  RE("^crossbreed$", 4, "red", 0),
  RE("^deal$", 2, "alt", 0),
  RE("^dow$", 1, "ught", 0),
  RE("^dream$", 2, "amt", 0),
  RE("^dwell$", 3, "elt", 0),
  RE("^enwind$", 3, "ound", 0),
  RE("^feel$", 3, "elt", 0),
  RE("^flee$", 3, "led", 0),
  RE("^floodlight$", 5, "lit", 0),
  RE("^arise$", 3, "ose", 0),
  RE("^eat$", 3, "ate", 0),
  RE("^backbite$", 4, "bit", 0),
  RE("^backslide$", 4, "lid", 0),
  RE("^befall$", 3, "ell", 0),
  RE("^begin$", 3, "gan", 0),
  RE("^beget$", 3, "got", 0),
  RE("^behold$", 3, "eld", 0),
  RE("^bespeak$", 3, "oke", 0),
  RE("^bestride$", 3, "ode", 0),
  RE("^betake$", 3, "ook", 0),
  RE("^bite$", 4, "bit", 0),
  RE("^blow$", 3, "lew", 0),
  RE("^bear$", 3, "ore", 0),
  RE("^break$", 3, "oke", 0),
  RE("^choose$", 4, "ose", 0),
  RE("^cleave$", 4, "ove", 0),
  RE("^countersink$", 3, "ank", 0),
  RE("^drink$", 3, "ank", 0),
  RE("^draw$", 3, "rew", 0),
  RE("^drive$", 3, "ove", 0),
  RE("^fall$", 3, "ell", 0),
  RE("^fly$", 2, "lew", 0),
  RE("^flyblow$", 3, "lew", 0),
  RE("^forbid$", 2, "ade", 0),
  RE("^forbear$", 3, "ore", 0),
  RE("^foreknow$", 3, "new", 0),
  RE("^foresee$", 3, "saw", 0),
  RE("^forespeak$", 3, "oke", 0),
  RE("^forego$", 2, "went", 0),
  RE("^forgive$", 3, "ave", 0),
  RE("^forget$", 3, "got", 0),
  RE("^forsake$", 3, "ook", 0),
  RE("^forspeak$", 3, "oke", 0),
  RE("^forswear$", 3, "ore", 0),
  RE("^forgo$", 2, "went", 0),
  RE("^fight$", 4, "ought", 0),
  RE("^find$", 3, "ound", 0),
  RE("^freeze$", 4, "oze", 0),
  RE("^give$", 3, "ave", 0),
  RE("^geld$", 3, "elt", 0),
  RE("^gen-up$", 3, "ned-up", 0),
  RE("^ghostwrite$", 3, "ote", 0),
  RE("^get$", 3, "got", 0),
  RE("^grow$", 3, "rew", 0),
  RE("^grind$", 3, "ound", 0),
  RE("^hear$", 2, "ard", 0),
  RE("^hold$", 3, "eld", 0),
  RE("^hide$", 4, "hid", 0),
  RE("^honey$", 2, "ied", 0),
  RE("^inbreed$", 4, "red", 0),
  RE("^indwell$", 3, "elt", 0),
  RE("^interbreed$", 4, "red", 0),
  RE("^interweave$", 4, "ove", 0),
  RE("^inweave$", 4, "ove", 0),
  RE("^ken$", 2, "ent", 0),
  RE("^kneel$", 3, "elt", 0),
  RE("^^know$$", 3, "new", 0),
  RE("^leap$", 2, "apt", 0),
  RE("^learn$", 2, "rnt", 0),
  RE("^lead$", 4, "led", 0),
  RE("^leave$", 4, "eft", 0),
  RE("^light$", 5, "lit", 0),
  RE("^lose$", 3, "ost", 0),
  RE("^make$", 3, "ade", 0),
  RE("^mean$", 2, "ant", 0),
  RE("^meet$", 4, "met", 0),
  RE("^misbecome$", 3, "ame", 0),
  RE("^misdeal$", 2, "alt", 0),
  RE("^misgive$", 3, "ave", 0),
  RE("^mishear$", 2, "ard", 0),
  RE("^mislead$", 4, "led", 0),
  RE("^mistake$", 3, "ook", 0),
  RE("^misunderstand$", 3, "ood", 0),
  RE("^outbreed$", 4, "red", 0),
  RE("^outgrow$", 3, "rew", 0),
  RE("^outride$", 3, "ode", 0),
  RE("^outshine$", 3, "one", 0),
  RE("^outshoot$", 4, "hot", 0),
  RE("^outstand$", 3, "ood", 0),
  RE("^outthink$", 3, "ought", 0),
  RE("^outgo$", 2, "went", 0),
  RE("^outwear$", 3, "ore", 0),
  RE("^overblow$", 3, "lew", 0),
  RE("^overbear$", 3, "ore", 0),
  RE("^overbuild$", 3, "ilt", 0),
  RE("^overcome$", 3, "ame", 0),
  RE("^overdraw$", 3, "rew", 0),
  RE("^overdrive$", 3, "ove", 0),
  RE("^overfly$", 2, "lew", 0),
  RE("^overgrow$", 3, "rew", 0),
  RE("^overhear$", 2, "ard", 0),
  RE("^overpass$", 3, "ast", 0),
  RE("^override$", 3, "ode", 0),
  RE("^oversee$", 3, "saw", 0),
  RE("^overshoot$", 4, "hot", 0),
  RE("^overthrow$", 3, "rew", 0),
  RE("^overtake$", 3, "ook", 0),
  RE("^overwind$", 3, "ound", 0),
  RE("^overwrite$", 3, "ote", 0),
  RE("^partake$", 3, "ook", 0),
  RE("^" + VERBAL_PREFIX + "?run$", 2, "an", 0),
  RE("^ring$", 3, "ang", 0),
  RE("^rebuild$", 3, "ilt", 0),
  RE("^red", 0),
  RE("^reave$", 4, "eft", 0),
  RE("^remake$", 3, "ade", 0),
  RE("^resit$", 3, "sat", 0),
  RE("^rethink$", 3, "ought", 0),
  RE("^retake$", 3, "ook", 0),
  RE("^rewind$", 3, "ound", 0),
  RE("^rewrite$", 3, "ote", 0),
  RE("^ride$", 3, "ode", 0),
  RE("^rise$", 3, "ose", 0),
  RE("^reeve$", 4, "ove", 0),
  RE("^sing$", 3, "ang", 0),
  RE("^sink$", 3, "ank", 0),
  RE("^sit$", 3, "sat", 0),
  RE("^see$", 3, "saw", 0),
  RE("^shoe$", 3, "hod", 0),
  RE("^shine$", 3, "one", 0),
  RE("^shake$", 3, "ook", 0),
  RE("^shoot$", 4, "hot", 0),
  RE("^shrink$", 3, "ank", 0),
  RE("^shrive$", 3, "ove", 0),
  RE("^sightsee$", 3, "saw", 0),
  RE("^ski$", 1, "i'd", 0),
  RE("^skydive$", 3, "ove", 0),
  RE("^slay$", 3, "lew", 0),
  RE("^slide$", 4, "lid", 0),
  RE("^slink$", 3, "unk", 0),
  RE("^smite$", 4, "mit", 0),
  RE("^seek$", 3, "ought", 0),
  RE("^spit$", 3, "pat", 0),
  RE("^speed$", 4, "ped", 0),
  RE("^spellbind$", 3, "ound", 0),
  RE("^spoil$", 2, "ilt", 0),
  RE("^speak$", 3, "oke", 0),
  RE("^spotlight$", 5, "lit", 0),
  RE("^spring$", 3, "ang", 0),
  RE("^spin$", 3, "pun", 0),
  RE("^stink$", 3, "ank", 0),
  RE("^steal$", 3, "ole", 0),
  RE("^stand$", 3, "ood", 0),
  RE("^stave$", 3, "ove", 0),
  RE("^stride$", 3, "ode", 0),
  RE("^strive$", 3, "ove", 0),
  RE("^strike$", 3, "uck", 0),
  RE("^stick$", 3, "uck", 0),
  RE("^swim$", 3, "wam", 0),
  RE("^swear$", 3, "ore", 0),
  RE("^teach$", 4, "aught", 0),
  RE("^think$", 3, "ought", 0),
  RE("^throw$", 3, "rew", 0),
  RE("^take$", 3, "ook", 0),
  RE("^tear$", 3, "ore", 0),
  RE("^transship$", 4, "hip", 0),
  RE("^tread$", 4, "rod", 0),
  RE("^typewrite$", 3, "ote", 0),
  RE("^unbind$", 3, "ound", 0),
  RE("^unclothe$", 5, "lad", 0),
  RE("^underbuy$", 2, "ought", 0),
  RE("^undergird$", 3, "irt", 0),
  RE("^undershoot$", 4, "hot", 0),
  RE("^understand$", 3, "ood", 0),
  RE("^undertake$", 3, "ook", 0),
  RE("^undergo$", 2, "went", 0),
  RE("^underwrite$", 3, "ote", 0),
  RE("^unfreeze$", 4, "oze", 0),
  RE("^unlearn$", 2, "rnt", 0),
  RE("^unmake$", 3, "ade", 0),
  RE("^unreeve$", 4, "ove", 0),
  RE("^unspeak$", 3, "oke", 0),
  RE("^unstick$", 3, "uck", 0),
  RE("^unswear$", 3, "ore", 0),
  RE("^unteach$", 4, "aught", 0),
  RE("^unthink$", 3, "ought", 0),
  RE("^untread$", 4, "rod", 0),
  RE("^unwind$", 3, "ound", 0),
  RE("^upbuild$", 3, "ilt", 0),
  RE("^uphold$", 3, "eld", 0),
  RE("^upheave$", 4, "ove", 0),
  RE("^uprise$", 3, "ose", 0),
  RE("^upspring$", 3, "ang", 0),
  RE("^go$", 2, "went", 0),
  RE("^wiredraw$", 3, "rew", 0),
  RE("^withdraw$", 3, "rew", 0),
  RE("^withhold$", 3, "eld", 0),
  RE("^withstand$", 3, "ood", 0),
  RE("^wake$", 3, "oke", 0),
  RE("^win$", 3, "won", 0),
  RE("^wear$", 3, "ore", 0),
  RE("^wind$", 3, "ound", 0),
  RE("^weave$", 4, "ove", 0),
  RE("^write$", 3, "ote", 0),
  RE("^trek$", 1, "cked", 0),
  RE("^ko$", 1, "o'd", 0),
  RE("^bid", 2, "ade", 0),
  RE("^win$", 2, "on", 0),
  RE("^swim", 2, "am", 0),

  // Null past forms
  RE("^" + VERBAL_PREFIX + "?(cast|thrust|typeset|cut|bid|upset|wet|bet|cut|hit|hurt|inset|" + "let|cost|burst|beat|beset|set|upset|offset|put|quit|wed|typeset|" + "wed|spread|split|slit|read|run|shut|shed|lay)$", 0)
];

const PRESENT_TENSE_RULES = [
  RE("^aby$", 0, "es", 0),
  RE("^bog-down$", 5, "s-down", 0),
  RE("^chivy$", 1, "vies", 0),
  RE("^gen-up$", 3, "s-up", 0),
  RE("^prologue$", 3, "gs", 0),
  RE("^picknic$", 0, "ks", 0),
  //RE("^swim$", 0, "s", 0),
  RE("^ko$", 0, "'s", 0),
  RE("[osz]$", 0, "es", 1),
  RE("^have$", 2, "s", 0),
  RE(CONS + "y$", 1, "ies", 1),
  RE("^be$", 2, "is"),
  RE("([zsx]|ch|sh)$", 0, "es", 1)
];

const VERB_CONS_DOUBLING = ["abat", "abet", "abhor", "abut", "accur", "acquit", "adlib",
  "admit", "aerobat", "aerosol", "agendaset", "allot", "alot", "anagram",
  "annul", "appal", "apparel", "armbar", "aver", "babysit", "airdrop", "appal",
  "blackleg", "bobsled", "bur", "chum", "confab", "counterplot", "curet", "dib",
  "backdrop", "backfil", "backflip", "backlog", "backpedal", "backslap",
  "backstab", "bag", "balfun", "ballot", "ban", "bar", "barbel", "bareleg",
  "barrel", "bat", "bayonet", "becom", "bed", "bedevil", "bedwet", "beenhop",
  "befit", "befog", "beg", "beget", "begin", "bejewel", "bemedal", "benefit",
  "benum", "beset", "besot", "bestir", "bet", "betassel", "bevel", "bewig",
  "bib", "bid", "billet", "bin", "bip", "bit", "bitmap", "blab", "blag", "blam",
  "blan", "blat", "bles", "blim", "blip", "blob", "bloodlet", "blot", "blub",
  "blur", "bob", "bodypop", "bog", "booby-trap", "boobytrap", "booksel",
  "bootleg", "bop", "bot", "bowel", "bracket", "brag", "brig", "brim", "bud",
  "buffet", "bug", "bullshit", "bum", "bun", "bus", "but", "cab", "cabal", "cam",
  "can", "cancel", "cap", "caracol", "caravan", "carburet", "carnap", "carol",
  "carpetbag", "castanet", "cat", "catcal", "catnap", "cavil", "chan", "chanel",
  "channel", "chap", "char", "chargecap", "chat", "chin", "chip", "chir",
  "chirrup", "chisel", "chop", "chug", "chur", "clam", "clap", "clearcut",
  "clip", "clodhop", "clog", "clop", "closet", "clot", "club", "co-occur",
  "co-program", "co-refer", "co-run", "co-star", "cob", "cobweb", "cod", "coif",
  "com", "combat", "comit", "commit", "compel", "con", "concur", "confer",
  "confiscat", "control", "cop", "coquet", "coral", "corbel", "corral", "cosset",
  "cotransmit", "councel", "council", "counsel", "court-martial", "crab", "cram",
  "crap", "crib", "crop", "crossleg", "cub", "cudgel", "cum", "cun", "cup",
  "cut", "dab", "dag", "dam", "dan", "dap", "daysit", "de-control", "de-gazet",
  "de-hul", "de-instal", "de-mob", "de-program", "de-rig", "de-skil", "deadpan",
  "debag", "debar", "log", "decommit", "decontrol", "defer", "defog", "deg",
  "degas", "deinstal", "demit", "demob", "demur", "den", "denet", "depig",
  "depip", "depit", "der", "deskil", "deter", "devil", "diagram", "dial", "dig",
  "dim", "din", "dip", "disbar", "disbud", "discomfit", "disembed", "disembowel",
  "dishevel", "disinter", "dispel", "disprefer", "distil", "dog", "dognap",
  "don", "doorstep", "dot", "dowel", "drag", "drat", "driftnet", "distil",
  "egotrip", "enrol", "enthral", "extol", "fulfil", "gaffe", "golliwog", "idyl",
  "inspan", "drip", "drivel", "drop", "drub", "drug", "drum", "dub", "duel",
  "dun", "dybbuk", "earwig", "eavesdrop", "ecolabel", "eitherspigot",
  "electroblot", "embed", "emit", "empanel", "enamel", "endlabel", "endtrim",
  "enrol", "enthral", "entrammel", "entrap", "enwrap", "equal", "equip", "estop",
  "exaggerat", "excel", "expel", "extol", "fag", "fan", "farewel", "fat",
  "featherbed", "feget", "fet", "fib", "fig", "fin", "fingerspel", "fingertip",
  "fit", "flab", "flag", "flap", "flip", "flit", "flog", "flop", "fob", "focus",
  "fog", "footbal", "footslog", "fop", "forbid", "forget", "format",
  "fortunetel", "fot", "foxtrot", "frag", "freefal", "fret", "frig", "frip",
  "frog", "frug", "fuel", "fufil", "fulfil", "fullyfit", "fun", "funnel", "fur",
  "furpul", "gab", "gad", "gag", "gam", "gambol", "gap", "garot", "garrot",
  "gas", "gat", "gel", "gen", "get", "giftwrap", "gig", "gimbal", "gin", "glam",
  "glenden", "glendin", "globetrot", "glug", "glut", "gob", "goldpan", "goostep",
  "gossip", "grab", "gravel", "grid", "grin", "grip", "grit", "groundhop",
  "grovel", "grub", "gum", "gun", "gunrun", "gut", "gyp", "haircut", "ham",
  "han", "handbag", "handicap", "handknit", "handset", "hap", "hareleg", "hat",
  "headbut", "hedgehop", "hem", "hen", "hiccup", "highwal", "hip", "hit",
  "hobnob", "hog", "hop", "horsewhip", "hostel", "hot", "hotdog", "hovel", "hug",
  "hum", "humbug", "hup", "hushkit", "hut", "illfit", "imbed", "immunblot",
  "immunoblot", "impannel", "impel", "imperil", "incur", "infer", "infil",
  "inflam", "initial", "input", "inset", "instil", "inter", "interbed",
  "intercrop", "intercut", "interfer", "instal", "instil", "intermit", "japan",
  "jug", "kris", "manumit", "mishit", "mousse", "mud", "interwar", "jab", "jag",
  "jam", "jar", "jawdrop", "jet", "jetlag", "jewel", "jib", "jig", "jitterbug",
  "job", "jog", "jog-trot", "jot", "jut", "ken", "kennel", "kid", "kidnap",
  "kip", "kissogram", "kit", "knap", "kneecap", "knit", "knob", "knot", "kor",
  "label", "lag", "lam", "lap", "lavel", "leafcut", "leapfrog", "leg", "lem",
  "lep", "let", "level", "libel", "lid", "lig", "lip", "lob", "log", "lok",
  "lollop", "longleg", "lop", "lowbal", "lug", "mackerel", "mahom", "man", "map",
  "mar", "marshal", "marvel", "mat", "matchwin", "metal", "micro-program",
  "microplan", "microprogram", "milksop", "mis-cal", "mis-club", "mis-spel",
  "miscal", "mishit", "mislabel", "mit", "mob", "mod", "model", "mohmam",
  "monogram", "mop", "mothbal", "mug", "multilevel", "mum", "nab", "nag", "nan",
  "nap", "net", "nightclub", "nightsit", "nip", "nod", "nonplus", "norkop",
  "nostril", "not", "nut", "nutmeg", "occur", "ocur", "offput", "offset", "omit",
  "ommit", "onlap", "out-general", "out-gun", "out-jab", "out-plan", "out-pol",
  "out-pul", "out-put", "out-run", "out-sel", "outbid", "outcrop", "outfit",
  "outgas", "outgun", "outhit", "outjab", "outpol", "output", "outrun",
  "outship", "outshop", "outsin", "outstrip", "outswel", "outspan", "overcrop",
  "pettifog", "photostat", "pouf", "preset", "prim", "pug", "ret", "rosin",
  "outwit", "over-commit", "over-control", "over-fil", "over-fit", "over-lap",
  "over-model", "over-pedal", "over-pet", "over-run", "over-sel", "over-step",
  "over-tip", "over-top", "overbid", "overcal", "overcommit", "overcontrol",
  "overcrap", "overdub", "overfil", "overhat", "overhit", "overlap", "overman",
  "overplot", "overrun", "overshop", "overstep", "overtip", "overtop", "overwet",
  "overwil", "pad", "paintbal", "pan", "panel", "paperclip", "par", "parallel",
  "parcel", "partiescal", "pat", "patrol", "pedal", "peewit", "peg", "pen",
  "pencil", "pep", "permit", "pet", "petal", "photoset", "phototypeset", "phut",
  "picket", "pig", "pilot", "pin", "pinbal", "pip", "pipefit", "pipet", "pit",
  "plan", "plit", "plod", "plop", "plot", "plug", "plumet", "plummet", "pod",
  "policyset", "polyfil", "ponytrek", "pop", "pot", "pram", "prebag",
  "predistil", "predril", "prefer", "prefil", "preinstal", "prep", "preplan",
  "preprogram", "prizewin", "prod", "profer", "prog", "program", "prop",
  "propel", "pub", "pummel", "pun", "pup", "pushfit", "put", "quarel", "quarrel",
  "quickskim", "quickstep", "quickwit", "quip", "quit", "quivertip", "quiz",
  "rabbit", "rabit", "radiolabel", "rag", "ram", "ramrod", "rap", "rat",
  "ratecap", "ravel", "re-admit", "re-cal", "re-cap", "re-channel", "re-dig",
  "re-dril", "re-emit", "re-fil", "re-fit", "re-flag", "re-format", "re-fret",
  "re-hab", "re-instal", "re-inter", "re-lap", "re-let", "re-map", "re-metal",
  "re-model", "re-pastel", "re-plan", "re-plot", "re-plug", "re-pot",
  "re-program", "re-refer", "re-rig", "re-rol", "re-run", "re-sel", "re-set",
  "re-skin", "re-stal", "re-submit", "re-tel", "re-top", "re-transmit",
  "re-trim", "re-wrap", "readmit", "reallot", "rebel", "rebid", "rebin", "rebut",
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
  "schlep", "scrag", "scram", "shall", "sled", "smut", "stet", "sulfuret",
  "trepan", "unrip", "unstop", "whir", "whop", "wig", "scrap", "scrat", "scrub",
  "scrum", "scud", "scum", "scur", "semi-control", "semi-skil", "semi-skim",
  "semiskil", "sentinel", "set", "shag", "sham", "shed", "shim", "shin", "ship",
  "shir", "shit", "shlap", "shop", "shopfit", "shortfal", "shot", "shovel",
  "shred", "shrinkwrap", "shrivel", "shrug", "shun", "shut", "side-step",
  "sideslip", "sidestep", "signal", "sin", "sinbin", "sip", "sit", "skid",
  "skim", "skin", "skip", "skir", "skrag", "slab", "slag", "slam", "slap",
  "slim", "slip", "slit", "slob", "slog", "slop", "slot", "slowclap", "slug",
  "slum", "slur", "smit", "snag", "snap", "snip", "snivel", "snog", "snorkel",
  "snowcem", "snub", "snug", "sob", "sod", "softpedal", "son", "sop", "spam",
  "span", "spar", "spat", "spiderweb", "spin", "spiral", "spit", "splat",
  "split", "spot", "sprag", "spraygun", "sprig", "springtip", "spud", "spur",
  "squat", "squirrel", "stab", "stag", "star", "stem", "sten", "stencil", "step",
  "stir", "stop", "storytel", "strap", "strim", "strip", "strop", "strug",
  "strum", "strut", "stub", "stud", "stun", "sub", "subcrop", "sublet", "submit",
  "subset", "suedetrim", "sum", "summit", "sun", "suntan", "sup", "super-chil",
  "superad", "swab", "swag", "swan", "swap", "swat", "swig", "swim", "swivel",
  "swot", "tab", "tag", "tan", "tansfer", "tap", "tar", "tassel", "tat", "tefer",
  "teleshop", "tendril", "terschel", "th'strip", "thermal", "thermostat", "thin",
  "throb", "thrum", "thud", "thug", "tightlip", "tin", "tinsel", "tip", "tittup",
  "toecap", "tog", "tom", "tomorrow", "top", "tot", "total", "towel", "traget",
  "trainspot", "tram", "trammel", "transfer", "tranship", "transit", "transmit",
  "transship", "trap", "travel", "trek", "trendset", "trim", "trip", "tripod",
  "trod", "trog", "trot", "trousseaushop", "trowel", "trup", "tub", "tug",
  "tunnel", "tup", "tut", "twat", "twig", "twin", "twit", "typeset", "tyset",
  "un-man", "unban", "unbar", "unbob", "uncap", "unclip", "uncompel", "undam",
  "under-bil", "under-cut", "under-fit", "under-pin", "under-skil", "underbid",
  "undercut", "underlet", "underman", "underpin", "unfit", "unfulfil", "unknot",
  "unlip", "unlywil", "unman", "unpad", "unpeg", "unpin", "unplug", "unravel",
  "unrol", "unscrol", "unsnap", "unstal", "unstep", "unstir", "untap", "unwrap",
  "unzip", "up", "upset", "upskil", "upwel", "ven", "verbal", "vet", "victual",
  "vignet", "wad", "wag", "wainscot", "wan", "war", "water-log", "waterfal",
  "waterfil", "waterlog", "weasel", "web", "wed", "wet", "wham", "whet", "whip",
  "whir", "whiteskin", "whiz", "whup", "wildcat", "win", "windmil", "wit",
  "woodchop", "woodcut", "wor", "worship", "wrap", "wiretap", "yen", "yak",
  "yap", "yarnspin", "yip", "yodel", "zag", "zap", "zig", "zig-zag", "zigzag",
  "zip", "ztrip", "hand-bag", "hocus", "hocus-pocus"
];

const PAST_PARTICIPLE_RULESET = {
  name: "PAST_PARTICIPLE",
  defaultRule: RE(ANY_STEM, 0, "ed", 2),
  rules: PAST_PARTICIPLE_RULES,
  doubling: true
};

const PRESENT_PARTICIPLE_RULESET = {
  name: "ING_FORM",
  defaultRule: RE(ANY_STEM, 0, "ing", 2),
  rules: ING_FORM_RULES,
  doubling: true
};

const PAST_TENSE_RULESET = {
  name: "PAST_TENSE",
  defaultRule: RE(ANY_STEM, 0, "ed", 2),
  rules: PAST_TENSE_RULES,
  doubling: true
};

const PRESENT_TENSE_RULESET = {
  name: "PRESENT_TENSE",
  defaultRule: RE(ANY_STEM, 0, "s", 2),
  rules: PRESENT_TENSE_RULES,
  doubling: false
};

let RiTa;

class Conjugator {

  constructor(parent) {
    RiTa = parent;
    this.reset();
  }

  reset() {
    this.perfect = this.progressive = this.passive = this.interrogative = false;
    this.tense = RiTa.PRESENT_TENSE;
    this.person = RiTa.FIRST_PERSON;
    this.number = RiTa.SINGULAR;
    this.form = RiTa.NORMAL;
  }

  // !@# TODO: add handling of past tense modals.
  conjugate(theVerb, args) {

    if (!theVerb || !theVerb.length) return '';

    if (!args) return theVerb;

    // ------------------ handle arguments ------------------

    let v = theVerb.toLowerCase();
    if (v === "am" || v === "are" || v === "is" || v === "was" || v === "were") {
      v = "be";
    }

    this.reset();

    args.number && (this.number = args.number);
    args.person && (this.person = args.person);
    args.tense && (this.tense = args.tense);
    args.form && (this.form = args.form);
    args.passive && (this.passive = args.passive);
    args.progressive && (this.progressive = args.progressive);
    args.interrogative && (this.interrogative = args.interrogative);
    args.perfect && (this.perfect = args.perfect);

    let actualModal, conjs = [], verbForm, frontVG = v;

    // ----------------------- start ---------------------------
    if (this.form === RiTa.INFINITIVE) {
      actualModal = "to";
    }

    if (this.tense === RiTa.FUTURE_TENSE) {
      actualModal = "will";
    }

    if (this.passive) {
      conjs.push(this.pastParticiple(frontVG));
      frontVG = "be";
    }

    if (this.progressive) {
      conjs.push(this.presentParticiple(frontVG));
      frontVG = "be";
    }

    if (this.perfect) {
      conjs.push(this.pastParticiple(frontVG));
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

        let pp = this.presentParticiple(frontVG);

        // !@# not yet implemented! ??? WHAT?
        conjs.push(pp);
      } else if (this.interrogative && frontVG != "be" && conjs.length < 1) {

        conjs.push(frontVG);
      } else {

        verbForm = this.verbForm(frontVG, this.tense, this.person, this.number);
        conjs.push(verbForm);
      }
    }

    // add modal, and we're done
    actualModal && conjs.push(actualModal);

    let s = '';
    for (let i = 0; i < conjs.length; i++) {
      s = conjs[i] + " " + s;
    }

    // !@# test this
    s.endsWith("peted") && err("Unexpected output: " + this.toString());

    return s.trim();
  }

  checkRules(ruleSet, theVerb) {

    if (!theVerb || !theVerb.length) return '';

    theVerb = theVerb.trim();
    
    let dbug = 0;

    let res, name = ruleSet.name,
      rules = ruleSet.rules,
      defRule = ruleSet.defaultRule;

    if (!rules) err("no rule: " + ruleSet.name + ' of ' + theVerb);

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
      theVerb = this.doubleFinalConsonant(theVerb);
    }

    res = defRule.fire(theVerb);

    dbug && console.log("checkRules(" + name + ").returns: " + res);

    return res;
  }

  doubleFinalConsonant(word) {
    return word + word.charAt(word.length - 1);
  }

  pastTense(theVerb, pers, numb) {

    if (theVerb.toLowerCase() === "be") {

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
  }

  presentTense(theVerb, person, number) {

    person = person || this.person;
    number = number || this.number;

    if ((person === RiTa.THIRD_PERSON) && (number === RiTa.SINGULAR)) {

      return this.checkRules(PRESENT_TENSE_RULESET, theVerb);
    }
    else if (theVerb === "be") {

      if (number === RiTa.SINGULAR) {

        switch (person) {

          case RiTa.FIRST_PERSON:
            return "am";

          case RiTa.SECOND_PERSON:
            return "are";

          case RiTa.THIRD_PERSON:
            return "is";
        }

      } else {
        return "are";
      }
    }
    return theVerb;
  }

  presentParticiple(theVerb) {
    return theVerb === 'be' ? 'being' :
      this.checkRules(PRESENT_PARTICIPLE_RULESET, theVerb);
  }

  pastParticiple(theVerb) {
    return this.checkRules(PAST_PARTICIPLE_RULESET, theVerb);
  }

  verbForm(theVerb, tense, person, number) {

    switch (tense) {
      case RiTa.PRESENT_TENSE:
        return this.presentTense(theVerb, person, number);
      case RiTa.PAST_TENSE:
        return this.pastTense(theVerb, person, number);
    }
    return theVerb;
  }

  toString() {
    return "  ---------------------" + + "  Passive = " + this.passive +
      '\n' + "  Perfect = " + this.perfect + '\n' + "  Progressive = " +
      this.progressive + '\n' + "  ---------------------" + '\n' + "  Number = " +
      this.number + '\n' + "  Person = " + this.person + '\n' + "  Tense = " +
      this.tense + '\n' + "  ---------------------" + '\n';
  }
}

module && (module.exports = Conjugator);
