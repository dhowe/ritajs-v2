const buttons = [
  "Gregor", "Samsa", "family", "being",
  "clerk", "room", "violin", "window"
];
let word = buttons[7], buttonX = 150, over, data, kwic, input;

function preload() {

  data = loadStrings('../../data/kafka.txt');
}

function setup() {

  createCanvas(800, 500);
  textFont('Times');
  textSize(18);
  fill(0);

  updateKWIC();
}

function updateKWIC() {
  RiTa.concordance(data.join('\n'), {
    ignorePunctuation: true,
    ignoreStopWords: true
  });
  kwic = RiTa.kwic(word, 6);

  background(250);

  drawButtons();

  if (kwic.length == 0) {

    textAlign(CENTER);
    text("Word not found", width / 2, height / 2);

  } else {

    const tw = textWidth(word) / 2;

    for (let i = 0; i < kwic.length; i++) {

      //console.log(display[i]);
      const parts = kwic[i].split(word);
      const x = width / 2,
        y = i * 20 + 75;

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

function drawButtons() {

  let posX = buttonX, posY = 40;

  for (let i = 0; i < buttons.length; i++) {

    stroke(200);
    const on = word == (buttons[i]) ? true : false;
    const tw = textWidth(buttons[i]);
    fill(!on && buttons[i] == over ? 235 : 255);
    rect(posX - 5, 24, tw + 10, 20, 7);
    fill((on ? 255 : 0), 0, 0);
    text(buttons[i], posX, 40);
    posX += tw + 20;
  }
}

function inside(mx, my, posX, tw) {

  return (mx >= posX - 5 && mx <= posX + tw + 5 && my >= 25 && my <= 44);
}

function mouseMoved() {

  over = null;
  let posX = buttonX, tw;

  for (let i = 0; i < buttons.length; i++) {

    tw = textWidth(buttons[i]);

    if (inside(mouseX, mouseY, posX, tw)) {

      over = buttons[i];
      break;
    }
    posX += tw + 20;
  }
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
