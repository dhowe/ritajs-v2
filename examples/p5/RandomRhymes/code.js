let rhymes, word;

function setup() {
  createCanvas(300, 300);
  fill(255);
  textFont("Georgia");

  findRhymes();
}

function draw() {
  background(100, 0, 100);

  textAlign(RIGHT);
  textSize(36);
  text(word, 280, 40);

  textAlign(LEFT);
  textSize(14);
  textLeading(17);
  text(rhymes, 30, 73);
}

function findRhymes() {

  let tmp;
  do {
    word = RiTa.randomWord();
    tmp = RiTa.rhymes(word, { limit: 13 });
  }
  while (tmp.length < 3)

  rhymes = tmp.join("\n");

  setTimeout(findRhymes, 2000);
}
