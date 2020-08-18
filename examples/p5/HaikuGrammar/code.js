let font, grammar, lines, json;

function preload() {

  font = loadFont('../../data/Resagokr.otf');
  json = loadJSON('../../data/haiku.json');
  /*load the grammar file as a json object
  so no need to process the strings*/
}

function setup() {

  createCanvas(650, 200);
  textFont(font, 30);
  textAlign(CENTER);

  grammar = new RiTa.Grammar(json);
  lines = ["click to", "generate", "a haiku"];
}

function draw() {

  background(230, 240, 255);
  text(lines[0], width / 2, 75);
  text(lines[1], width / 2, 110);
  text(lines[2], width / 2, 145);
}

function mouseReleased() {

  const result = grammar.expand();
  const haiku = result.split("%");
  for (let i = 0; i < lines.length; i++)
    lines[i] = haiku[i];
}
