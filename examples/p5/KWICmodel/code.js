let txt, word, keywords = [
  "Gregor", "Samsa", "family", "being",
  "clerk", "room", "violin", "window"
];

function preload() {

  txt = loadStrings('../../data/kafka.txt');
}

function setup() {

  createCanvas(800, 500);
  textFont('Times New Roman');
  textSize(16);
  //to keep the same style as the dom example

  RiTa.concordance(txt.join('\n'));
  word = RiTa.random(keywords);

  makeButtons()

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

//using p5js createButton()

function makeButtons(){
  let buttonNo = keywords.length, gapNo = keywords.length-1;
  let gapWidth = 10, buttonPadding = 10, yPosition = 65, buttonWidthInTotal = 0;
  let buttonArray = [];
  for (let i = 0; i < buttonNo; i++){
    let newButton = createButton(keywords[i]);
    buttonWidthInTotal += newButton.width;
    buttonArray.push(newButton);
  }
  let toAdd = 0, startX = width / 2 - (gapNo * gapWidth + buttonWidthInTotal) / 2;
  for (let i = 0; i < buttonNo; i++){
    buttonArray[i].position(startX+toAdd,yPosition);
    buttonArray[i].class("button");
    if (word === keywords[i]){
      buttonArray[i].style('color','rgb(200,0,0)');
    }
    toAdd += buttonArray[i].width + gapWidth;
  }
  for (let i = 0; i < buttonNo; i++){
    buttonArray[i].mouseClicked(function() {
      word = keywords[i];
      for (j = 0; j < keywords.length; j++){
        if (i === j){
          buttonArray[j].style('color','rgb(200,0,0)');
        } else {
          buttonArray[j].style('color','black');
        }
      }
      loop();
    });
  }
}

// TODO: remove below and replace with p5js createButton()

// function getButtonX() {
//   let gapWidth = 10, buttonPadding = 10;
//   let gapNo = keywords.length - 1, twInTotal = 0;
//   for (let i = 0; i < keywords.length; i++) {
//     twInTotal += textWidth(keywords[i]);
//   }
//   return width / 2 - (gapNo * gapWidth +
//     buttonPadding * keywords.length + twInTotal) / 2
// }
//
// function drawButtons() {
//   let posX = getButtonX();
//   for (let i = 0; i < keywords.length; i++) {
//     let on = word === keywords[i] ? true : false;
//     let tw = textWidth(keywords[i]);
//     stroke(200);
//     fill(255);
//     rect(posX - 5, 24, tw + 10, 20, 7);
//
//     // change color for enabled button
//     fill((on ? 200 : 0), 0, 0);
//     text(keywords[i], posX, 40);
//
//     posX += tw + 20;
//   }
// }
//
// function inside(mx, my, posX, tw) {
//   return (mx >= posX - 5 && mx <= posX + tw + 5
//     && my >= 25 && my <= 44);
// }
//
// function mouseClicked() {
//
//   let posX = getButtonX(), tw;
//   for (let i = 0; i < keywords.length; i++) {
//     tw = textWidth(keywords[i]);
//     if (inside(mouseX, mouseY, posX, tw)) {
//       word = keywords[i];
//       loop(); // re-render
//       break;
//     }
//     posX += tw + 20;
//   }
// }
