let word, content, keywords = [
  "Gregor", "Samsa", "family", "being",
  "clerk", "room", "violin", "window"
];

$(document).ready(function () {

  doSetup();

  $.get('../../data/kafka.txt', text => {

    RiTa.concordance(text);
    drawKWIC();
  });
});

function drawKWIC() {

  $("#content").empty().css
    ('background-color', 'rgb(245, 245, 245)');

  let kwic = RiTa.kwic(word, 6);
  let tw = textWidth(word) / 2;
  for (let i = 0; i < kwic.length; i++) {
    let y = i * 20 + 65;

    if (y <= content.height() - 30) {
      let parts = kwic[i].split(word);
      let left = parts[0].trim();
      let right = parts[1].trim();
      let wordX = content.width() / 2 - tw;
      let leftX = wordX - textWidth(left);
      let rightX = wordX + textWidth(word);

      // remove space if not punctuation
      if (RiTa.isPunctuation(right[0])) rightX -= 5;

      text(word, wordX, y, '#D00');
      text(left, leftX, y);
      text(right, rightX, y);
    }
  }
}

function doSetup() {

  let selected = RiTa.randInt(0, keywords.length);

  let btns = $(".button");
  $(btns[selected]).css("color", "rgb(200,0,0)");
  $.each(btns, (i, b) => $(b).html(keywords[i]));

  btns.click(function () {
    word = $(this).text();
    drawKWIC();
    btns.css("color", "black");
    $(this).css("color", "rgb(200,0,0)");
  });

  let buttons = $("#buttons");
  buttons.css("left", String(400 - buttons.width() / 2));

  content = $("#content").width(800).height(500);
  word = keywords[selected];
}

function text(s, x, y, col) {
  col = col || 'black';
  $('<span/>', {
    html: s,
    css: {
      position: 'absolute',
      left: x, top: y,
      color: col
    }
  }).appendTo(content);
}

function textWidth(s) {

  let $span = $('<span>', {
    html: s + '&nbsp;',
    css: {
      position: "absolute",
      top: "-1000px",
      left: "-1000px",
    }
  }).appendTo($('body'));

  let width = $span.width();
  $span.remove();
  return width;
}