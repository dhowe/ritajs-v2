
let rhymes, word;

function setup()
{
  createCanvas(300, 300);
  fill(255);
  textFont("Georgia");

  findRhymes();

  setInterval(findRhymes, 2000);
}

function draw()
{
  background(100,0,100);

  textAlign(RIGHT);
  textSize(36);
  text(word, 280, 40);

  textAlign(LEFT);
  textSize(14);
  textLeading(17);
  text(rhymes, 30, 73);
}

function findRhymes() { // called by timer

  let tmp = '';
  do {
    word = RiTa.randomWord();
    tmp = RiTa.rhymes(word,{limit: 13});
  } while ( word && tmp.length < 3)
  // use argument instead of subsetting afterward
  rhymes = tmp.join("\n");
}
