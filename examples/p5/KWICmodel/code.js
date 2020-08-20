let txt, word, keywords = [
  "Gregor", "Samsa", "family", "being",
  "clerk", "room", "violin", "window"
];

function preload() {

  txt = loadStrings('../../data/kafka.txt');
}

function setup() {

  createCanvas(800, 500);
  textFont('Times');
  textSize(18);

  RiTa.concordance(txt.join('\n'));
  word = RiTa.random(keywords);
}

function draw() {

  let kwic = RiTa.kwic(word, 6);

  background(250);
  drawButtons();

  let tw = textWidth(word) / 2;

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

// TODO: remove below and replace with p5js createButton()

function getButtonX() {
  let gapWidth = 10, buttonPadding = 10;
  let gapNo = keywords.length - 1, twInTotal = 0;
  for (let i = 0; i < keywords.length; i++) {
    twInTotal += textWidth(keywords[i]);
  }
  return width / 2 - (gapNo * gapWidth +
    buttonPadding * keywords.length + twInTotal) / 2
}

function drawButtons() {
  let posX = getButtonX();
  for (let i = 0; i < keywords.length; i++) {
    let on = word === keywords[i] ? true : false;
    let tw = textWidth(keywords[i]);
    stroke(200);
    fill(255);
    rect(posX - 5, 24, tw + 10, 20, 7);

    // change color for enabled button
    fill((on ? 200 : 0), 0, 0);
    text(keywords[i], posX, 40);

    posX += tw + 20;
  }
}

function inside(mx, my, posX, tw) {
  return (mx >= posX - 5 && mx <= posX + tw + 5
    && my >= 25 && my <= 44);
}

function mouseClicked() {

  let posX = getButtonX(), tw;
  for (let i = 0; i < keywords.length; i++) {
    tw = textWidth(keywords[i]);
    if (inside(mouseX, mouseY, posX, tw)) {
      word = keywords[i];
      loop(); // re-render
      break;
    }
    posX += tw + 20;
  }
}
