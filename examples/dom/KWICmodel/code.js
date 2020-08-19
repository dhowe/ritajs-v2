let content, keywords = [
  "Gregor", "Samsa", "family", "being",
  "clerk", "room", "violin", "window"
];

$(function () {

  let word = doLayout();

  $.get('../../data/kafka.txt', data => {

    RiTa.concordance(data, {
      ignorePunctuation: true,
      ignoreStopWords: true
    });

    drawText(word);

  }, 'text');
});

function drawText(word) {

  $("#content").empty().css
    ('background-color', 'rgb(245, 245, 245)');

  let width = content.width();
  let kwic = RiTa.kwic(word, 6);
  let tw = textWidth(word) / 2;
  for (let i = 0; i < kwic.length; i++) {
    let y = i * 20 + 65;

    if (y <= content.height() - 30) {
      let parts = kwic[i].split(word);
      let left = parts[0].trim();
      let right = parts[1].trim();
      let x1 = width / 2 - tw;
      let x2 = x1 - textWidth(left);
      let x3 = x1 + textWidth(word);

      // remove space if not punctuation
      if (RiTa.isPunctuation(right[0])) x3 -= 5;

      text(word, x1, y, '#D00');
      text(left, x2, y);
      text(right, x3, y);
    }
  }
}

function doLayout() {

  let selected = RiTa.randInt(0, keywords.length);

  let btns = $(".cssBtns");
  $(btns[selected]).css("color", "rgb(200,0,0)");
  $.each(btns, (i, b) => $(b).html(keywords[i]));

  btns.click(function () {
    drawText($(this).text());
    btns.css("color", "black");
    $(this).css("color", "rgb(200,0,0)");
  });

  let bcon = $(".buttonContainer");
  bcon.css("left", String(400 - bcon.width() / 2));

  content = $("#content").width(800).height(500);

  return keywords[selected];
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