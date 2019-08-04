let Utils = require('./utils')
let RiTa = undefined;

class RiLexicon {
  constructor(parent) {
    this.dict = require('./rita_dict');
    RiTa = parent;
  }

  hasWord(word) {
    console.log('word', word);
    word = word ? word.toLowerCase() : '';
    console.log('word', word);
    console.log('dog', this.dict['dog'], this.dict.hasOwnProperty('dog'));
    return this.dict.hasOwnProperty(word) || this._isPlural(word);
  }

  _isPlural(word) {

    if (Utils.NULL_PLURALS.applies(word))
      return true;

    var stem = RiTa.stem(word, 'Pling');
    if (stem === word) {
      return false;
    }

    var sing = RiTa.singularize(word);
    var data = this.data[sing];

    if (data && data.length === 2) {
      var pos = data[1].split(SP);
      for (var i = 0; i < pos.length; i++) {
        if (pos[i] === 'nn')
          return true;
      }

    } else if (word.endsWith("ses") || word.endsWith("zes")) {

      sing = word.substring(0, word.length - 1);
      data = this.data[sing];
      if (data && data.length === 2) {
        var pos = data[1].split(SP);
        for (var i = 0; i < pos.length; i++) {
          if (pos[i] === 'nn')
            return true;
        }
      }
    }
    return false;
  }
}

module && (module.exports = RiLexicon);
