/// <summary>
/// Capitalizes the string.
/// </summary>
String.prototype.uc = function() {
  return this.toUpperCase();
}

/// <summary>
/// Capitalizes the first character.
/// </summary>
String.prototype.ucf = function() {
  return this.capitalize();
}

/// <summary>
/// Prefixes the string with 'a' or 'an' as appropriate.
/// </summary>
String.prototype.articlize = function() {
  return ("aeiou".indexOf(this[0].toLowerCase() > -1) ? "an " : "a ") + this;
}

/// <summary>
/// Capitalizes the first character.
/// </summary>
String.prototype.capitalize = function() {
  return this[0].toUpperCase() + this.substring(1);
}

/// <summary>
/// Wraps the given string in double-quotes.
/// </summary>
String.prototype.quotify = function() {
  return "&quot;" + this + "&quot;";
}

/// <summary>
/// Pluralizes the word according to english regular/irregular rules.
/// </summary>
String.prototype.pluralize = function() {
  // TODO: if name matches a RiTa function, use it ??
  if (this.indexOf(' ') > -1) throw Error
    ('pluralize expected a single word, got "' + this + '"');
  return RiTa.pluralize(word);
}
