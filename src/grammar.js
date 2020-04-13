const RiScript = require('./riscript');
const deepmerge = require('deepmerge');
const maxTries = 100;

class Grammar {

  constructor(rules) {
    this.rules = {};
    rules && this.load(rules);
  }

  load(rules) {
    if (typeof rules === 'string') {
      try {
        rules = JSON.parse(rules);
      } catch (e) {
        err('Grammar appears to be invalid JSON, please check'
          + ' it at http://jsonlint.com/', grammar);
        return this;
      }
    }
    Object.keys(rules).forEach(r => this.addRule(r, rules[r]))
    return this;
  }

  addRule(name, theRule) { 
    if (name.startsWith('$')) name = name.substring(1);
    if (/[|\[\]]/.test(theRule) && !(/^\(.*\)$/.test(theRule))) {
      theRule = '(' + theRule + ')';
    }
    if (Array.isArray(theRule)) theRule = joinChoice(theRule);
    this.rules[name] = theRule;
    return this;
  }

  expand(context, opts) {
    return this.expandFrom("start", context, opts);
  }

  expandFrom(rule, context, opts) {
    if (rule.startsWith('$')) rule = rule.substring(1);
    let lookup = deepmerge(context, this.rules);
    Object.keys(lookup).forEach(r => lookup[r] = RiScript.eval
      (lookup[r], lookup, opts && opts.trace));
    if (!lookup.hasOwnProperty(rule)) throw Error
      ('Rule ' + rule + ' not found');
    return lookup[rule];
  }

  reset() {
    this.rules = {};
    return this;
  }

  removeRule(name) {
    if (typeof name === 'string') {
      if (name.startsWith('$')) name = name.substring(1);
      delete this.rules[name];
    }
    return this;
  }
}

function joinChoice(arr) {
  let opts = '(';
  for (let i = 0; i < arr.length; i++) {
    opts += arr[i].includes(' ') ? '(' + arr[i] + ')' : arr[i];
    if (i < arr.length - 1) opts += ' | ';
  }
  return opts + ')';
}

module && (module.exports = Grammar);
