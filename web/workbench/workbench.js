$(document).ready(function() {

  // NEXT:
  // single word generator
  // add knob for mlm

  let gen, dirty, running, words = [];
  let n = 4, speed = .5, temp = 0, id = 0;

  $('.custom-file-upload').bind("click", () => $('#fileToLoad').click());

  let rate = () => (1 - speed) * 1000;

  let showNextWord = () => {
    if (gen) {
      let starts = words.length ? words : /^[A-Z][a-z]*$/;
      if (gen.done()) gen.reset({ minLength: 10, temperature: temp, startTokens: starts });
      let word = gen.next({ temperature: temp });
      if (!word) throw Error('no next word');
      words.push(word);
      let display = word.replace(/["“”\u2019‘`]/g, '');
      if (!RiTa.isPunctuation(display)) display =  ' ' + display;
      $('#output-box').text($('#output-box').text() + display);
      running && (id = setTimeout(showNextWord, rate()));
    }
  }

  $('#pause-btn').bind("click", function() {
    running = false;
    clearTimeout(id);
    $(this).prop('disabled', !running);
    $('#start-btn').prop('disabled', !$(this).prop('disabled'));
  });

  $('#start-btn').bind("click", function() {
    $(this).prop('disabled', true);
    clearTimeout(id);
    if (dirty || !gen) {
      let raw = $('#field').val().trim();
      if (!(raw && raw.length)) return;
      let model = RiTa.createMarkov(n);
      model.loadTokens(RiTa.tokenize(raw));
      gen = new Generator(model, { minLength: 10, temperature: temp });
    }
    running = true;
    dirty = false;
    showNextWord();
    $('#pause-btn').prop('disabled', !$(this).prop('disabled'));
  });

  $('input:file').change(function() {
    if ($(this).val()) {
      $('#load-btn').prop('disabled', true);
      $('#start-btn').prop('disabled', true);
      $('#pause-btn').prop('disabled', true);
      dirty = true;
      let file = document.getElementById("fileToLoad").files[0];
      let fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent) {
        let textFromFileLoaded = fileLoadedEvent.target.result;
        let textArea = document.getElementById("field");
        textArea.value = textFromFileLoaded;
        $('#load-btn').prop('disabled', false);
        $('#start-btn').prop('disabled', false);
      };
      fileReader.readAsText(file, "UTF-8")
    }
  });

  $('#field').keyup(function() {
    dirty = true;
    running = false;
    $('#start-btn').prop('disabled', $(this).val().trim().length === 0);
  });

  $('#pause-btn').prop('disabled', true);
  $('#start-btn').prop('disabled', $('#field').val().trim().length === 0);

  /* knobs */
  $(".nKnob").knob({
    min: 1,
    max: 6,
    step: 1,
    height: 100,
    release: newN => {
      if (n !== newN) {
        n = newN;
        gen = undefined;
        $('#output-box').text('');
        $('#start-btn').click();
      }
    }
  });

  $(".speedKnob").knob({
    min: 0,
    max: 1,
    step: 0.01,
    height: 100,
    release: newSpeed => speed = newSpeed
  });

  $(".tempKnob").knob({
    min: 0,
    max: 1,
    step: 0.01,
    height: 100,
    release: newTemp => {
      if (temp != newTemp) {
        temp = newTemp;
        clearTimeout(id);
        showNextWord();
        //$('#pause-btn').click();
      }
    }
  });
});
