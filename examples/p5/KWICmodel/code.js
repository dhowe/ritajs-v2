let txt, word, keywords = [
  "Gregor", "Samsa", "family", "being",
  "clerk", "room", "violin", "window"
];

function preload() {

  txt = loadStrings('../../data/kafka.txt');
}

function setup() {

  createCanvas(800, 500);
  textFont('Times New Roman', 16);

  RiTa.concordance(txt.join('\n'));
  word = RiTa.random(keywords);

  createButtons();
}

function draw() {

  let kwic = RiTa.kwic(word, 6);
  let tw = textWidth(word) / 2;

  background(250);
  for (let i = 0; i < kwic.length; i++) {

    let parts = kwic[i].split(word);
    let x = width / 2, y = i * 20 + 75;
    if (y > height - 20) return;

    fill(0);
    textAlign(RIGHT);
    text(parts[0], x - tw, y);

    fill(200, 0, 0);
    textAlign(CENTER);
    text(word, x, y);

    fill(0);
    textAlign(LEFT);
    text(parts[1], x + tw, y);
  }
  noLoop();
}

function createButtons() {

  // create array of buttons
  let buttons = [], buttonsW = 0, gap = 10;
  for (let i = 0; i < keywords.length; i++) {
    let button = createButton(keywords[i]);
    console.log(button.elt.textContent);
    button.class("button");
    button.style('color', keywords[i] === word ? 'rgb(200,0,0)' : 'black');
    buttonsW += button.width;
    buttons.push(button);
  }

  // center and set the position for each
  let totalW = (keywords.length - 1 * gap) + buttonsW;
  let sofar = 0, startX = width / 2 - totalW / 2;
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].position(startX + sofar, 65);
    sofar += buttons[i].width + gap;
  }

  // add handler function to each
  buttons.forEach((b, i) => b.mouseClicked(() => {
    word = b.elt.textContent;
    buttons.forEach(b => b.style('color', 'black'));
    b.style('color', 'rgb(200,0,0)');
    loop();
  }));
}
