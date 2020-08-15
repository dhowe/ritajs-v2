let grammar, lines;

$(document).ready(function () {

  lines = [ $('#line1'), $('#line2'), $('#line3') ];

  $.getJSON('../../data/haiku.json', function( data ) {
    grammar = new RiTa.Grammar(data);
    lines[0].text("click to");
    lines[1].text("generate");
    lines[2].text("a haiku");

    $('#hdiv').click(createHaiku);
  });

});

function createHaiku() {

  const result = grammar.expand();
  const haiku = result.split("%");
  for (let i = 0; i < lines.length; i++) {
    lines[i].text(haiku[i]);
  }
}
