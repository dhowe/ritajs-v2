const WIDTH = 800, HEIGHT = 500;

const labels = [
  "Gregor", "Samsa", "family", "being",
  "clerk", "room", "violin", "window"
];

let $container, $btns;
let kwic, fillColor, kafkaString;
let textAlignment = "LEFT", word = labels[7];

$(function () {

  $btns = $(".cssBtns");
  assignButtons();

  $($btns[7]).css("color", "red");
  $container = $("#container");
  $container.width(WIDTH).height(HEIGHT)
    .css("background-color", "rgb(250, 250, 250)");

  $("#textInput").attr("placeholder", word);

  $.get('../../data/kafka.txt', function (data) {

    RiTa.concordance(data, {
      ignorePunctuation: true,
      ignoreStopWords: true
    });
    kwic = RiTa.kwic(word, 6);
    drawText();
  }, 'text');
});

function assignButtons() {

  for (let i = 0; i < $btns.length; i++)
    $($btns[i]).html(labels[i]);

  $btns.click(function () {

    word = $(this).text();
    kwic = RiTa.kwic(word, 6);
    drawText();

    $btns.css("color", "black");
    $(this).css("color", "red");
  });
}

function drawText() {

  $("#container").empty();
  $("#container").css('background-color', 'rgb(250, 250, 250)');

  if (kwic.length === 0) {

    textAlign("CENTER");
    text("Word not found", WIDTH / 2, HEIGHT / 2);

  } else {

    const tw = textWidth(word) / 2;

    for (let i = 0; i < kwic.length; i++) {

      const parts = kwic[i].split(word);
      const x = WIDTH / 2,
        y = i * 20 + 65;

      if (y > HEIGHT - 30) return;

      fill(0);
      textAlign("RIGHT");
      text(parts[0], x - tw + 5, y);

      fill(200, 0, 0);
      textAlign("CENTER");
      text(word, x, y);

      fill(0);
      textAlign("LEFT");
      text(parts[1], x + tw, y);
    }
  }
}

function textWidth(s) {

  const $span = $('<span>', {
    html: s + '&nbsp;',
    css: {
      position: "absolute",
      top: "-100px",
      left: "-100px",
    }
  }).appendTo($('body'));

  const width = $span.width();
  $span.remove();

  return width;
}

function fill(a, b, c) {

  fillColor = (arguments.length === 1) ? toHex(a) :
    "rgb(" + a + "," + b + "," + c + ")";

  function toHex(color) {
    const intValue = Math.floor(color);
    return "rgb(" + intValue + "," + intValue + "," + intValue + ")";
  }
}

function textAlign(direction) {

  textAlignment = direction;
}

function text(s, x, y) {
  let innerX = x;

  // position the strings according to alignment
  if (textAlignment === "LEFT") {
    const regex = new RegExp(/^[^0-9A-Za-z\s]/);
    if (regex.test(s)) x = innerX - textWidth("");

  } else if (textAlignment === "CENTER") {
    x = innerX - textWidth(s) / 2;

  } else if (textAlignment === "RIGHT") {
    x = innerX - textWidth(s);
  }

  const $span = $('<span/>', {
    html: s,
    css: {
      position: 'absolute',
      left: x, top: y,
      color: fillColor
    }
  }).appendTo($container);
}
