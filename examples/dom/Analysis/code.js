$(document).ready(function () {

  let features, hues;

  colorGradient();
  selectWord();

  function selectWord() {

    word = RiTa.randomWord({ maxLength: 12 });
    features = RiTa.analyze(word, { simple: true });

    $('#word').text(word);
    $('#pos').text(tags[features.pos]);
    $('#ipa').text("/" + arpaToIPA(RiTa.lexicon().rawPhones(word)) + "/");

    updateBubbles(features.phones.split('-'));
    setTimeout(dropBubbles, 2000);
  }

  function clearBubbles() {

    $('.bubbles').children().each(function (i, val) {
       // reset stress
      if( $(this).hasClass("stressed"))
        $(this).removeClass("stressed");

      //reset position
      $(this).css({
        'margin-top': ' 5px'
      });

      // clear the content
      $(this).text("");
      $(this).css("background-color", "transparent");
    });

    setTimeout(selectWord, 1000);
  }

  function updateBubbles(phs) {

    addStress(features.stresses, features.syllables);
    addSyllables(features.syllables);
    $('.bubbles').children().each(function (i) {
      // change the phones and color
      if (i < phs.length) {
        $(this).text(phs[i]);
        $(this).css("background-color", "hsla(" + phonemeColor(phs[i]) + ", 90%, 45%, 0.6)");
      }
    });
  }

  function dropBubbles() {
    $('.bubbles').children().each(function (index) {
      (function (that, i) {
        const t = setTimeout(function () {
          $(that).animate({
            'margin-top': 180,
          }, "slow");
        }, 40 * i);
      })(this, index);
    });
    setTimeout(clearBubbles, 1500);
  }

  function addSyllables(syllables) {

    const syllable = syllables.split("/");
    for (let i = 0, past = 0; i < syllable.length; i++) {
      const phs = syllable[i].split("-");
      //add extra space between each syllables
      $('.bubbles').children().eq(past).css("margin-left", "10px");

      for (let j = 1; j < phs.length; j++) {
        (function (j) {
          const bubble = $('.bubbles').children().eq(j + past);
          if(bubble.hasClass('stressed'))
             bubble.css("margin-left", "-20px");
           else
            bubble.css("margin-left", "-15px");
        })(j);
      }
      past += phs.length;
    }
  }

  function addStress(stresses, syllables) {
    // Split stresses and syllables
    const stress = stresses.split('/'), syllable = syllables.split('/');
    for (let i = 0, past = 0; i < stress.length; i++) {
      const phs = syllable[i].split('-');
      // if the syllable is stressed, grow its bubbles
      if (parseInt(stress[i]) == 1) {
        for (let j = 0; j < phs.length; j++) {
          (function (j) {
            $('.bubbles').children().eq(j + past).addClass("stressed");
          })(j);
        }
      }
      past += phs.length;
    }
  }

  function phonemeColor(phoneme) {
    const idx = RiTa.PHONES.indexOf(phoneme);
    return idx > -1 ? hues[idx] : 0;
  }

  function colorGradient() {
    hues = [];
    for (let i = 0; i < RiTa.PHONES.length; i++) {
      const h = Math.floor(map(i, 0, RiTa.PHONES.length, .2 * 360, .8 * 360));
      hues[i] = h;
    }
    return hues;
  }

  function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  }

});

const tags = {
  'n': 'Noun',
  'v': 'Verb',
  'r': 'Adverb',
  'a': 'Adjective'
};
