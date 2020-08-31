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
  drawButtons();
}

function draw() {

  let kwic = RiTa.kwic(word, 6);

  background(250);

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

function drawButtons() {
  let posX = 150;
  for (let i = 0; i < keywords.length; i++) {
    let on = word == keywords[i] ? true : false;
    let tw = textWidth(keywords[i]);

    // change color for enabled button
    fill((on ? 200 : 0), 0, 0);
    let button = createButton(keywords[i]);
    button.position(posX - 5, 64);
    button.size(tw + 10, 20);
    button.style('border-radius', '7px');
    button.style('border', '1px solid #dcdcdc');
    button.mousePressed(function(){
      let buttons = selectAll('button');
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].style('color','black');
      }
      button.style('color','red');
      button.addClass('selected');
      word = this.elt.innerText;
      loop(); // re-render
    });

    posX += tw + 20;
  }
}
