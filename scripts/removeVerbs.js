//let RiTa = require('../src/rita');
let Conjugator = require('../src/conjugator');
let dict = require('../src/rita_dict.js');

let printRemoves = 0, printFile = 1;
let tests, remove = [];

function checkForm(verb, pos) {
  let data = dict[verb];
  if (data) {
    let tags = data[1].split(' ');
    if (tags.length === 1 && tags[0] === pos) {
      return doRemove(verb, tags);
    }
  }
  return true;
}

function checkPast(word) {
  let verb = word + 'ed', data = dict[verb], doubled = false;
  if (!data && Conjugator.VERB_CONS_DOUBLING.includes(word)) {
    verb = doubleFinalConsonant(word) + 'ed';
    data = dict[verb];  // words like 'inferred'
    doubled = true;
  }
  if (data) {
    let tags = data[1].split(' ');
    if ((tags.length === 1 && (tags[0] === 'vbn' || tags[0] === 'vbd')) ||
      (tags.length === 2 && tags.includes('vbn') && tags.includes('vbd'))) {
      //doubled && console.log('DOUBLE-ED', verb, data[1].split(' '))
      return doRemove(verb, tags);
    }
  }
  return true;
}

function checkGerund(word) {
  let verb = word + 'ing', data = dict[verb], doubled = false;
  if (!data && Conjugator.VERB_CONS_DOUBLING.includes(word)) {
    verb = doubleFinalConsonant(word) + 'ing';
    data = dict[verb];   // words like 'sobbing'
    doubled = true;
  }
  if (data) {
    let tags = data[1].split(' ');
    if (tags.length === 1 && tags[0] === 'vbg') {
      //doubled && console.log('DOUBLE-ING', verb, data[1].split(' '));
      return doRemove(verb, tags);
    }
  }
  return true;
}

function doubleFinalConsonant(word) {
  return word + word.charAt(word.length - 1);
}

function doRemove(verb, tags) {
  if (!remove.includes(verb)) {
    if (printRemoves) console.log('X', verb, tags);
    remove.push(verb);
  }
  return false;
}

function checkVerb(word) {
  let r1 = checkForm(word + 's', 'vbz');
  let r2 = checkForm(word + 'es', 'vbz');
  let r3 = checkGerund(word); // 'ing' -> 'vbg'
  let r4 = checkPast(word); // 'ed' -> 'vbn' 'vbd'
  return r1 && r2 && r3 && r4;
}

let header = "module && (module.exports = {";
let footer = "});";

let words = tests || Object.keys(dict);
for (let i = 0; i < words.length; i++) {
  let word = words[i], data = dict[word];
  let tags = dict[word][1].split(' ');
  /*   if (tags.length === 1 && tags[0] === 'vb' ||
      tags.length === 2 && tags.includes('vb') && tags.includes('vbp')) { */
  if (tags.includes('vb')) checkVerb(word);
}

if (!tests) {

  let lines = [];
  let original = words.length;
  for (let i = 0; i < original; i++) {
    if (printFile && i === 0) console.log(header);
    if (!remove.includes(words[i])) {
      lines.push(words[i]);
      printFile && console.log(JSON.stringify(words[i]) + ":" + JSON.stringify(dict[words[i]]) + ',');
    }
    if (printFile && i === original - 1) console.log(footer);
  }
  if (!printFile) console.log('\nRemoved', remove.length, 'of', original, 'verbs\nWrote', lines.length, 'new lines');

  if (lines.length + remove.length !== original) throw Error('Out of sync: ' + remove.length + ' + ' + lines.length + ' = '
    + (remove.length + lines.length) + ', expected ' + original);
}
