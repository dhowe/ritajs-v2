$(document).ready(function () {

  let features, hues;

  colorPalette();
  selectWord();

  function selectWord() {

    word = RiTa.randomWord({ maxLength: 12 });
    features = RiTa.analyze(word, { simple: true });

    $('#word').text(word);
    $('#pos').text(tags[features.pos]);
    $('#ipa').text(ipaPhones(word));

    updateBubbles();
    setTimeout(dropBubbles, 2000);
  }

  function updateBubbles(phs) {

    addStresses(features.stresses, features.syllables);
    addSyllables(features.syllables);
    let phones = features.phones.split('-');
    $('.bubbles').children().each(function (i) {
      if (i < phones.length) {
        $(this).text(phones[i]);
        $(this).css("background-color", "hsla("
          + phonemeColor(phones[i]) + ", 90%, 45%, 0.6)");
      }
    });
  }

  function dropBubbles() {
    $('.bubbles').children().each(function (i) {
      (function (bub, j) {
        setTimeout(() => $(bub).animate({ 'margin-top': 180 }, "slow"), 40 * j);
      })(this, i);
    });
    setTimeout(clearBubbles, 1500);
  }

  function clearBubbles() {

    $('.bubbles').children().each(function (i, val) {
      // reset stress
      if ($(this).hasClass("stressed"))
        $(this).removeClass("stressed");

      //reset position
      $(this).css({ 'margin-top': ' 5px' });

      // clear the content
      $(this).text("");
      $(this).css("background-color", "transparent");
    });

    setTimeout(selectWord, 1000);
  }

  function addSyllables(syllables) {
    let syllable = syllables.split("/");
    for (let i = 0, past = 0; i < syllable.length; i++) {
      $('.bubbles').children().eq(past).css("margin-left", "10px");
      let phs = syllable[i].split("-");
      for (let j = 1; j < phs.length; j++) {
        let bubble = $('.bubbles').children().eq(j + past);
        bubble.css("margin-left", bubble.hasClass('stressed') ? "-14px" : "-10px");
        //to make the text in the bubble more readable match with the syle in p5 example
      }
      past += phs.length;
    }
  }

  function addStresses(stresses, syllables) {

    // Split stresses and syllables
    let stress = stresses.split('/');
    let sylls = syllables.split('/');
    for (let i = 0, past = 0; i < stress.length; i++) {
      let phs = sylls[i].split('-');
      // if the syllable is stressed, grow its bubbles
      if (parseInt(stress[i]) === 1) {
        for (let j = 0; j < phs.length; j++) {
          $('.bubbles').children().eq(j + past).addClass("stressed");
        }
      }
      past += phs.length;
    }

    $('.bubble.stressed').css({'margin-top': '0px'});
    $('.bubble.stressed').css({'texr-align': 'center'});
  }

  function ipaPhones(aWord) {
    let raw = RiTa.lexicon().rawPhones(aWord);
    return "/" + arpaToIPA(raw) + "/";
  }

  function phonemeColor(phoneme) {
    let idx = RiTa.PHONES.indexOf(phoneme);
    return idx > -1 ? hues[idx] : 0;
  }

  function colorPalette() {
    hues = [];
    for (let i = 0; i < RiTa.PHONES.length; i++) {
      hues[i] = Math.floor(map(i, 0, RiTa.PHONES.length, .2 * 360, .8 * 360));
    }
    return hues;
  }

  function map(value, low1, high1, low2, high2) { // p5js
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  }
});

const tags = {
  'n': 'noun',
  'v': 'verb',
  'r': 'adverb',
  'a': 'adjective'
};
