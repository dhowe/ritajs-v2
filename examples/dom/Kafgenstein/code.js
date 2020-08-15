let lines, markov;

$(document).ready(function () {

  markov = new RiTa.Markov(4);

  $.get('../../data/kafka.txt', function(data1) {
    $.get('../../data/wittgenstein.txt', function(data2) {
      markov.addText(data1);
      markov.addText(data2);
    }, 'text');
  }, 'text');

  $('.textarea').text("click to (re)generate!");
  $('div').click(generate);
});

function generate() {
  lines = markov.generate(10);

  $('.textarea').text(lines.join(' '));
  $('.textarea').css('align-items', 'stretch');
}
