// Infinite Pandemic Dreams v0.1

lexicon = new RiLexicon();
footerPosition = 'above';
fetching = false;

window.onload = loadGrammar;

$.ajaxSetup({
  beforeSend: function (xhr) {
    if (xhr.overrideMimeType) {
      xhr.overrideMimeType("application/json");
    }
  }
});

function loadGrammar() {
  $.getJSON("assets/js/grammar.txt", function (str) {
    gr = new RiGrammar(str);
    generate();
  });
}

function getArticle(word) {
  return AvsAnSimple.query(word) + " " + word;
  //    usage in grammar: `getArticle('ball')`
}

function capitalArticle(word) {
  return capitalize(AvsAnSimple.query(word)) + " " + word;
  //    usage in grammar: `getArticle('ball')`
}

function remember(word) {
  gr.addRule("<remember>", word);
  return word;
}

function forget(rule) {
  gr.removeRule("<remember>");
  return rule;
}

function kidsOnly() {
  gr.removeRule("<template>");
  gr.addRule("<template>", "<child>");
  console.log("okay");
  generate();
}

function randomAdjective(j) {
  return RiTa.randomWord({pos:'JJ'}, j);
}

function randomNoun(k) {
  return RiTa.randomWord({ pos: 'NN' }, k);
}

function pluralNoun(q) {
  return RiTa.randomWord({ pos:'NNS'}, q);
}

function rhymes(w) {
  return RiTa.rhymes(w);
}

function randomPerson(p) {
  return faker.name.firstName() + " " + faker.name.lastName();
}

function randomFirstName(n) {
  return faker.name.firstName();
}

function randomLastName(n) {
  return faker.name.lastName();
}

function randomLocation(l) {
  return faker.address.city() + ", " + faker.address.state();
}

function randomJob(j) {
  return faker.company.companyName();
}

function catchPhrase(c) {
  return faker.company.catchPhrase();
}

function randomPosition(j) {
  var job = faker.name.jobArea();
  return getArticle(job) + " " + faker.name.jobType();
}

function pluralize(string) {
  return RiTa.pluralize(string);
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function generate() {
  fetching = true;
  let arr = [];
  for (let i = 0; i < 25; i++) {
    var result = gr.expand()
    arr.push(result);
  }
  console.log(arr);
  changeTextSimple('plot', arr.join(""));
  fetching = false;
}

function changeTextSimple(idElement, result) {
  document.getElementById(idElement).innerHTML += result;
}

//
// Handle infinite scrolling
//

// based on: http://www.jquery4u.com/snippets/jquery-capture-vertical-scroll-percentage/
$(window).scroll(function () {

  watchForHeader();

  var wintop = $(window).scrollTop(), docheight = $(document).height(), winheight = $(window).height();
  var scrolltrigger = 0.90;
  if ((wintop / (docheight - winheight)) > scrolltrigger) {
    if (!fetching) {
      generate();
    }
  }
});

watchForHeader = function () {
  if ($(window).scrollTop() > ($('#title').position().top + $('#title').height())) {
    if (footerPosition == 'above') {
      footerPosition = 'below';
      $('#footer').animate({ top: 0 }, 500, 'swing');
    }
  }
  if ($(window).scrollTop() < 60 && footerPosition == 'below') {
    footerPosition = 'above';
    $('#footer').animate({ top: -80 }, 500, 'swing');
    $('#icon').animate({ top: -80 }, 500);
  }
};
