/// <summary>
/// Capitalizes the string.
/// </summary>
String.prototype.uc = function () {
  return this.toUpperCase();
}

/// <summary>
/// Capitalizes the first character.
/// </summary>
String.prototype.ucf = function () {
  return this.capitalize();
}

/// <summary>
/// Prefixes the string with 'a' or 'an' as appropriate.
/// </summary>
String.prototype.articlize = function () {
  return ("aeiou".indexOf(this[0].toLowerCase() > -1) ? "an " : "a ") + this;
}

/// <summary>
/// Capitalizes the first character.
/// </summary>
String.prototype.capitalize = function () {
  return this[0].toUpperCase() + this.substring(1);
}

/// <summary>
/// Wraps the given string in double-quotes.
/// </summary>
String.prototype.quotify = function () {
  return "&quot;" + this + "&quot;";
}

/// <summary>
/// Pluralizes the word according to english regular/irregular rules.
/// If multiple words are supplied, only the last will be pluralized.
/// </summary>
String.prototype.pluralize = function () {
  return this.contains(' ') ? string.join(' ',
    pluralizePhrase(this.split(' '))) : pluralizeWord(this);
}

// TODO:

function pluralizeWord(word) {
  throw Error('requires RiTa.js');
}

function pluralizePhrase(words) {
  words[words.Length - 1] = pluralizeWord(words[words.Length - 1]);
  return words; // todo: use map()
}
