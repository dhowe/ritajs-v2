let grammar, divs;

$(document).ready(function () {

  divs = [ $('#line1'), $('#line2'), $('#line3') ];

  $.getJSON('../../data/haiku.json', function( data ) {
    
    grammar = new RiTa.Grammar(data);
    divs[0].text("click to");
    divs[1].text("generate");
    divs[2].text("a haiku");

    $('#hdiv').click(createHaiku);
  });

});

function createHaiku() {

  const haiku = grammar.expand();
  const lines = haiku.split("%");
  for (let i = 0; i < lines.length; i++) {
    divs[i].text(lines[i]);
  }
}
