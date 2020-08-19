let word, features, hues;
let bubbles = [], maxWordLen = 12;

function setup() {

  createCanvas(600, 300);
  colorPalette();
  noStroke();

  // initialize bubbles
  for (let i = 0; i < maxWordLen; i++) {
    bubbles[i] = new Bubble();
  }

  selectWord();
}

function draw() {

  background(255);

  // word
  fill(56, 66, 90);

  textSize(36);
  textAlign(LEFT);
  textStyle(NORMAL);
  text(word, 80, 50);

  // phones
  textSize(18);
  text(ipaPhones(word), 80, 80);

  // part-of-speech
  textSize(14);
  textStyle(ITALIC);
  text(tags[features.pos], 80, 105);

  bubbles.forEach((b, i) => b.draw(i));
}

function selectWord() {

  word = RiTa.randomWord({ maxLength: maxWordLen });
  features = RiTa.analyze(word, { simple: true });
  updateBubbles();
}

function updateBubbles() {

  bubbles.forEach(b => b.reset());

  let phones = features.phones.split('-');
  bubbles.forEach((b, i) => {
    if (i < phones.length) b.update(phones, i);
  });

  addStresses();
  addSyllables();

  setTimeout(selectWord, 4000);
}

function ipaPhones(aWord) {
  let raw = RiTa.lexicon().rawPhones(aWord);
  return "/" + arpaToIPA(raw) + "/";
}

// TODO: redo with new class style

function Bubble() {

  this.gspd = 0; // grow speed
  this.rad = 40; // radius
  this.t = 0; // timer
  this.gravity = 0.5;
  this.ypos = 150;
  this.speed = 0;

  this.reset = function () {
    this.ph = '';
    this.t = 0;
    this.gspd = 0;
    this.speed = 0;
  }

  this.update = function (phones, i) {
    this.c = phoneColor(phones[i]);
    this.ph = phones[i];
    this.ypos = 150;
    this.xpos = i * 40 + 100;
    this.rad = 40;
  }

  this.adjustDistance = function (dis) {
    this.xpos += (this.rad === 40) ? dis : 0.7 * dis;
  }

  this.grow = function () {
    this.rad = 41;
    this.gspd = 0.5;
  }

  this.draw = function (i) {

    if (this.ph.length < 1) return;

    fill(this.c);
    ellipse(this.xpos, this.ypos, this.rad + this.gspd, this.rad + this.gspd);

    fill(255);
    textSize(18);
    textAlign(CENTER, CENTER);
    text(this.ph, this.xpos, this.ypos - 1);

    if (this.gspd < 10) this.gspd *= 1.1;

    if (++this.t > 100 + 2 * i) {
      this.speed += this.gravity;
      this.ypos += this.speed;
    }
  }
}

function addSyllables() {

  // Split each syllable
  const syllable = features.syllables.split('/');

  // Record the past phonemes number
  for (let i = 0, past = 0; i < syllable.length; i++) {
    const phs = syllable[i].split('-');

    for (let j = 1; j < phs.length; j++)
      bubbles[past + j].adjustDistance(-10 * j);

    past += phs.length;
  }
}

function addSyllablesX() {

  // split each syllable
  let sylls = features.syllables.split('/');

  // record the past phonemes number
  for (let i = 0, past = 0; i < sylls.length; i++) {
    let phs = sylls[i].split('-');
    for (let j = 1; j < phs.length; j++) {
      bubbles[past + j].adjustDistance(-20 * j);
    }
    past += phs.length;
  }
}

function addStresses() {

  // Split stresses & syllables
  const stress = features.stresses.split('/'),
    syllable = features.syllables.split('/');

  // Record the previous phoneme count
  for (let i = 0, past = 0; i < stress.length; i++) {

    const phs = syllable[i].split('-');

    // if the syllable is stressed, grow its bubbles
    if (parseInt(stress[i]) == 1) {
      for (let j = 0; j < phs.length; j++)
        bubbles[past + j].grow();
    }

    past += phs.length;
  }
}

function addStressesX() {

  // Split stresses & syllables
  let stress = features.stresses.split('/'), sylls = features.syllables.split('/');

  // Record the previous phoneme count
  for (let i = 0, past = 0; i < stress.length; i++) {

    let phs = sylls[i].split('-');
    // if the syllable is stressed, grow its bubbles
    if (stress[i] === '1') {
      for (let j = 0; j < phs.length; j++) {
        bubbles[past + j].grow();
      }
    }
    past += phs.length;
  }
}

function phoneColor(phoneme) {

  let idx = RiTa.PHONES.indexOf(phoneme);
  return idx > -1 ? hues[idx] : 0;
}

function colorPalette() {

  colorMode(HSB, 1, 1, 1, 1);
  hues = [];
  let apl = RiTa.PHONES.length;
  for (let i = 0; i < apl; i++) {
    let h = map(i, 0, apl, .2, .8);
    hues[i] = color(h, .9, .9, .6);
  }
  colorMode(RGB, 255, 255, 255, 255);
}

const tags = {
  'n': 'noun',
  'v': 'verb',
  'r': 'adverb',
  'a': 'adjective'
};
