$(document).ready(function() {

  // NEXT: add knobs for min/max length, mlm
  // CHECK perf on load/exec with timer
  // ADD callback for load

  let markov, n = 3, speed = .5, temp = 0, dirty = true;

  console.log('dirty',dirty);
  $('.custom-file-upload').bind("click", function() {
    $('#fileToLoad').click();
  });

  $('#exe-btn').bind("click", function() {
    $(this).prop('disabled', true);
    console.log('dirty',dirty);
    markov = markov || RiTa.createMarkov(n);
    if (dirty) {
      console.log('LOADING');
      markov.loadSentences($('#field').val().trim());
    }
    let sent = markov.generateSentence({ minLength: 8 });
    console.log('GOT', sent);
    $('#output-box').text($('#output-box').text()+' '+sent);
    dirty = false;
    $(this).prop('disabled', false);
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
  $('#exe-btn').prop('disabled', $('#field').val().trim() === '');

  $('#field').keyup(function() {
    dirty = true;
    $('#exe-btn').prop('disabled', $(this).val().trim().length === '');
  });

  /* knobs */
  $(".nKnob").knob({
    min: 1,
    max: 5,
    step: 1,
    height: 100,
    release: function(v) {
      n = v;
      console.log(n, speed, temp);
    }
  });
  $(".speedKnob").knob({
    min: 0,
    max: 1,
    step: 0.01,
    height: 100,
    release: function(v) {
      speed = v;
      console.log(n, speed, temp);
    }
  });
  $(".tempKnob").knob({
    min: 0,
    max: 1,
    step: 0.01,
    height: 100,
    release: function(v) {
      temp = v;
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
