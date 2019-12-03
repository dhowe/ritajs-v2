$(document).ready(function() {

  let markov, n = 3, speed = .5, temp = 0, dirty = 0;

  $('.custom-file-upload').bind("click", function() {
    $('#fileToLoad').click();
  });

  $('#exe-btn').bind("click", function() {
    markov = RiTa.createMarkov(n);
    markov.loadSentences($('#field').val().trim());
    let sent = markov.generateSentence({ minLength: 8 });
    $('#output-box').text($('#output-box').text()+' '+sent);
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
    $('#exe-btn').prop('disabled', $(this).val().trim().length === '');
  });

  /* knobs */
  $(".nKnob").knob({
    'min': 1,
    'max': 5,
    'step': 1,
    'height': 100,
    'release': function(v) {
      n = v;
      console.log(n, speed, temp);
    }
  });
  $(".speedKnob").knob({
    'min': 0,
    'max': 1,
    'step': 0.1,
    'height': 100,
    'release': function(v) {
      speed = v;
      console.log(n, speed, temp);
    }
  });
  $(".tempKnob").knob({
    'min': 0,
    'max': 1,
    'step': 0.1,
    'height': 100,
    'release': function(v) {
      temp = v;
      console.log(n, speed, temp);
    }
  });
});

/* file loader */
function loadFileAsText() {
  var fileToLoad = document.getElementById("fileToLoad").files[0];
  var fileReader = new FileReader();
  fileReader.onload = function(fileLoadedEvent) {
    var textFromFileLoaded = fileLoadedEvent.target.result;
    var textArea = document.getElementById("field");
    textArea.value = textFromFileLoaded;
  };

  fileReader.readAsText(fileToLoad, "UTF-8");
}
