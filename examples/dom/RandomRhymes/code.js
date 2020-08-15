$(function () {

  findRhymes();
 
  function findRhymes() {

    let word, tmp = '';
    do {
      word = RiTa.randomWord();
      tmp = RiTa.rhymes(word);
    } while (tmp.length < 3)

    const rhymes = tmp.slice(0, Math.min(tmp.length, 13));

    $('#word').html(word);
    $('#rhyme').html(rhymes.join("<br>"));

    setTimeout(findRhymes, 2000);
  }
});
