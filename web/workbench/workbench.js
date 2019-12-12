$(document).ready(function() {

  // NEXT: add knobs for min/max length, mlm
  // CHECK perf on load/exec with timer
  // ADD callback for load

  let markov, n = 3, speed = .5, temp = 0;
  let dirty = true, running = false;

  $('.custom-file-upload').bind("click", function() {
    $('#fileToLoad').click();
  });

  let words = [];
  let nextWord = function() {
    let starts = words.length ? words : /^[A-Z][a-z]*$/;
    console.log('nextWord', words.length ? words+"" : 'RE');
    let next = markov.generateToken({ startTokens: starts });
    $('#output-box').text($('#output-box').text()+' '+next);
    words.push(next);
    running && setTimeout(nextWord, 1000);
  }

  $('#exe-btn').bind("click", function() {

    $(this).prop('disabled', true);
    //console.log('dirty',dirty);
    if (dirty || !markov) {
      markov = RiTa.createMarkov(n);
      console.time('loadSentences');
      markov.loadSentences($('#field').val().trim());
      console.timeEnd('loadSentences');
    }
    let timeout = dirty ? 0 : 1000;
    running = true;
    dirty = false;
    setTimeout(nextWord, timeout);
    //let sent = markov.generateSentence({ minLength: 8 });
  });

  //$('#load-btn').prop('disabled', document.getElementById("fileToLoad").files.length);

  $('input:file').change(
    function() {
      if ($(this).val()) {
        $('load-btn').attr('disabled', false);
        $('#load-btn').prop('disabled', false);
        $('#exe-btn').prop('disabled', false);
        loadFileAsText();
      }
    }
  );

  /* text area */
  $('#exe-btn').prop('disabled', $('#field').val().trim().length === 0);
  console.log('keyup1: '+$('#field').val().trim().length);


  $('#field').keyup(function() {
    dirty = true;
    running = false;
    console.log('keyup2: '+$(this).val().trim().length);
    $('#exe-btn').prop('disabled', $(this).val().trim().length === 0);
  });

  /* knobs */
  $(".nKnob").knob({
    min: 1,
    max: 6,
    step: 1,
    height: 100,
    release: function(newN) {
      dirty = (n !== newN);
      n = newN;
      console.log(n, speed, temp);
    }
  });
  $(".speedKnob").knob({
    min: 0,
    max: 1,
    step: 0.01,
    height: 100,
    release: function(newSpeed) {
      speed = newSpeed;
      console.log(n, speed, temp);
    }
  });
  $(".tempKnob").knob({
    min: 0,
    max: 1,
    step: 0.01,
    height: 100,
    release: function(newTemp) {
      temp = newTemp;
      console.log(n, speed, temp);
    }
  });
});

function loadFileAsText() {
  dirty = true;
  let fileToLoad = document.getElementById("fileToLoad").files[0];
  let fileReader = new FileReader();
  fileReader.onload = function(fileLoadedEvent) {
    let textFromFileLoaded = fileLoadedEvent.target.result;
    let textArea = document.getElementById("field");
    textArea.value = textFromFileLoaded;
  };
  fileReader.readAsText(fileToLoad, "UTF-8");
}
