$(function () {

  findRhymes();

  function findRhymes() {

    let word, tmp = '';
    do {
      word = RiTa.randomWord();
      tmp = RiTa.rhymes(word,{limit:13});
    } while (tmp.length < 3)

    $('#word').html(word);
    $('#rhyme').html(tmp.join("<br>"));

    setTimeout(findRhymes, 2000);
  }
});
