let grammar, lines;

$(document).ready(function () {

  $.getJSON('../../data/haiku.json', json => {
    
    grammar = new RiTa.Grammar(json);
    
    lines = $('.lines');
    $(lines[0]).text("click to");
    $(lines[1]).text("generate");
    $(lines[2]).text("a haiku");

    $('#content').click(haiku);
  });
});

function haiku() {

  let expanded = grammar.expand();
  let haiku = expanded.split("%");
  for (let i = 0; i < haiku.length; i++) {
    $(lines[i]).text(haiku[i]);
  }
}
