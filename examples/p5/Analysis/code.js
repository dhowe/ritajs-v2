let ALL_PHONES = ['aa', 'ae', 'ah', 'ao', 'aw', 'ay', 'b', 'ch', 'd', 'dh', 'eh', 'er', 'ey', 'f', 'g', 'hh', 'ih', 'iy', 'jh', 'k', 'l', 'm', 'n', 'ng', 'ow', 'oy', 'p', 'r', 's', 'sh', 't', 'th', 'uh', 'uw', 'v', 'w', 'y', 'z', 'zh'];

let tagsDict, word, sy, ph, ss, pos, features, hues;
let bubbles = [];
let maxWordLength = 12;

function setup() {

  createCanvas(600, 300);
  colorPalette();
  noStroke();

  // initialize bubbles
  for (let i = 0; i < maxWordLength; i++) {
    bubbles[i] = new Bubble('', 0);
  }

  selectWord();
}

function draw() {

  background(255);

  // word
  fill(56, 66, 90);
  textAlign(LEFT);
  textSize(36);
  text(word, 80, 50);

  // phones
  textSize(18);
  ipaPhones = arpaToIPA(RiTa.lexicon().rawPhones(word));
  text("/" + ipaPhones + "/", 80, 80);

  // pos-tag
  textSize(14);
  text(pos.toLowerCase(), 80, 105);

  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].draw(i);
  }
}

function selectWord() { // called every 4 sec by timer

  // random word with <= 12 letters
  word = RiTa.randomWord({ maxLength: maxWordLength });

  // get various features
  features = RiTa.analyze(word, { simple: true });
  sy = features.syllables;
  ph = features.phones;
  ss = features.stresses;
  let tags = {
    'n': 'Noun',
    'v': 'Verb',
    'r': 'Adverb',
    'a': 'Adjective'
  };
  pos = tags[features.pos];

  // reset the bubbles
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].reset()
  }

  // update the bubbles for the new word
  let phs = ph.split('-');
  updateBubbles(phs);
  /*   for (let i = 0; i < phs.length; i++) {
      bubbles[i].update(phs[i], i * 50 + 100, phoneColor(phs[i]));
    }
   */

  setTimeout(selectWord, 4000);
}

function updateBubbles(phs) {
  for (let i = 0; i < bubbles.length; i++) {
    if (i < phs.length) {
      bubbles[i].update(phs[i], i * 50 + 100, phoneColor(phs[i]));

/*       $(this).text(phs[i]);
      $(this).css("background-color", "hsla(" + phonemeColor(phs[i]) + ", 90%, 45%, 0.6)");
      addStress(features.stresses, features.syllables);
      addSyllables(features.syllables); */
    }
  }
  // addStress(ss, sy);
  // addSyllables(sy);
  addSyllablesAndStress(ss, sy);
}

// TODO: redo with new class style

class Bubble{

  constructor(phoneme, x){
    this.r = 40; // radius of the circle
    this.ph = phoneme; //phoneme
    this.t = 0; // timer
    this.xpos = x;
    this.ypos = 150;
    this.gravity = 0.5;
    this.speed = 0;
    this.sz = 0; // grow speed
  }

  reset() {
    this.ph = '';
    this.t = 0;
    this.sz = 0;
    this.speed = 0;
  }

  update(phoneme, x, col) {
    this.ph = phoneme;
    this.xpos = x;
    this.ypos = 150;
    this.r = 40;
    this.c = col;
  }

  adjustDistance(dis) {
    this.xpos += (this.r === 40) ? dis : 0.7 * dis;
  }

  grow() {
    this.r = 41;
    this.sz = 0.5;
  }

  draw(i) {

    if (this.ph.length < 1) return;

    // draw background circle
    fill(this.c);
    ellipse(this.xpos, this.ypos, this.r + this.sz, this.r + this.sz);

    // display the phoneme
    fill(255);
    textSize(18);
    textAlign(CENTER, CENTER);
    text(this.ph, this.xpos, this.ypos - 1);

    if (this.sz < 10) this.sz *= 1.1;

    if (++this.t > 100 + 2 * i) {
      this.speed += this.gravity;
      this.ypos += this.speed;
    }
  }
}

//TODO : combine below for better distance adjustment
// function addSyllables(syllables) {
//
//   // split each syllable
//   let syllable = syllables.split('/');
//   let totalMergeWidth = 0, gapWidth = 10;
//
//   // record the past phonemes number
//   for (let i = 0, past = 0; i < syllable.length; i++) {
//     let phs = syllable[i].split('-');
//     for (let j = 0; j < phs.length; j++) {
//       bubbles[past + j].adjustDistance(-(20 * j+totalMergeWidth));
//     }
//     past += phs.length;
//     totalMergeWidth += 20 * (phs.length-1) - gapWidth;
//   }
// }
//
// function addStress(stresses, syllables) {
//
//   // Split stresses & syllables
//   let stress = stresses.split('/'), sylls = syllables.split('/');
//
//   // Record the previous phoneme count
//   for (let i = 0, past = 0; i < stress.length; i++) {
//
//     let phs = sylls[i].split('-');
//     // if the syllable is stressed, grow its bubbles
//     if (stress[i] === '1') {
//       for (let j = 0; j < phs.length; j++) {
//         bubbles[past + j].grow();
//       }
//     }
//     past += phs.length;
//   }
// }
//end TODO area

//combine addSyllables and addStress for better distance adjustment
function addSyllablesAndStress(stresses, syllables){
  //Split stresses and syllables
  let stressArray = stresses.split('/'), syllableArray = syllables.split('/');
  //The two array should have the same length

  //initialize vars for distance adjustment
  let totalMergeWidth = 0;

  //Record the previous phoneme count
  for (let i = 0,past = 0; i < syllableArray.length; i++){
    let phs = syllableArray[i].split('-');
    let adjustUnit = 20, gapWidth = 8;
    //add stress(es) first
    if (stressArray[i] === '1'){
      for (let j = 0; j < phs.length; j++) {
        bubbles[past + j].grow();
      }
      adjustUnit = 20 * 0.7;
      gapWidth += 10;
    }
    //now adjust the distance
    for (let j = 0; j < phs.length; j++) {
      bubbles[past + j].adjustDistance(-(adjustUnit * j+totalMergeWidth));
    }
    totalMergeWidth += adjustUnit * (phs.length-1) - gapWidth;
    past += phs.length;
  }
}

function phoneColor(phoneme) {

  let idx = ALL_PHONES.indexOf(phoneme);
  return idx > -1 ? hues[idx] : 0;
}

function colorPalette() {

  colorMode(HSB, 1, 1, 1, 1);
  hues = [];
  let apl = ALL_PHONES.length;
  for (let i = 0; i < apl; i++) {
    let h = map(i, 0, apl, .2, .8);
    hues[i] = color(h, .9, .9, .6);
  }
  colorMode(RGB, 255, 255, 255, 255);
}
