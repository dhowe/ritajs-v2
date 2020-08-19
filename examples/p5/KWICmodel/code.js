let buttons = [
  "Gregor", "Samsa", "family", "being",
  "clerk", "room", "violin", "window"
];
let word = buttons[7], buttonX = 150;
let over, data, kwic, input;

function preload() {

  data = loadStrings('../../data/kafka.txt');
}

function setup() {

  createCanvas(800, 500);
  textFont('Times');
  textSize(18);
  fill(0);
  
  RiTa.concordance(data.join('\n'), {
    ignorePunctuation: true,
    ignoreStopWords: true
  });

  updateKWIC();
}

function updateKWIC() {

  kwic = RiTa.kwic(word, 6);

  background(250);

  drawButtons();

  if (kwic.length == 0) {

    textAlign(CENTER);
    text("Word not found", width / 2, height / 2);

  } else {

    let tw = textWidth(word) / 2;

    for (let i = 0; i < kwic.length; i++) {

      //console.log(display[i]);
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
  }
}

function getButtonX() {
  let gapWidth = 10, buttonPadding = 10;
  let gapNo = buttons.length - 1, twInTotal = 0;
  for (let i = 0; i < buttons.length; i++) {
    twInTotal += textWidth(buttons[i]);
  }
  return width / 2 - (gapNo * gapWidth + buttonPadding * buttons.length + twInTotal) / 2
}

//function for center the buttons
function drawButtons() {

  let posX = getButtonX();
  for (let i = 0; i < buttons.length; i++) {

    stroke(200);
    let on = word == (buttons[i]) ? true : false;
    let tw = textWidth(buttons[i]);
    fill(!on && buttons[i] == over ? 235 : 255);
    rect(posX - 5, 24, tw + 10, 20, 7);
    fill((on ? 200 : 0), 0, 0);

    //change color to match with the text
    text(buttons[i], posX, 40);
    posX += tw + 20;
  }
}

function inside(mx, my, posX, tw) {
  return (mx >= posX - 5 && mx <= posX + tw + 5
    && my >= 25 && my <= 44);
}

function mouseClicked() {

  let posX = buttonX, tw;
  for (let i = 0; i < buttons.length; i++) {
    tw = textWidth(buttons[i]);
    if (inside(mouseX, mouseY, posX, tw)) {
      word = buttons[i];
      kwic = null;
      updateKWIC();
      break;
    }
    posX += tw + 20;
  }
}
