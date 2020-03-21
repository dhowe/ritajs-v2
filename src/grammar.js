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

  addRule(name, theRule /*, weight TODO*/) {
    if (name.startsWith('$')) name = name.substring(1);
    if (theRule.includes('|') && !theRule.includes('(')) {
      theRule = '(' + theRule + ')';
    }
    if (Array.isArray(theRule)) theRule = joinChoice(theRule);
    this.rules[name] = theRule;//RiScript.eval(theRule);
    return this;
  }

  expand(context, trace) {
    return this.expandFrom("start", context, trace);
  }

  expandFrom(rule, context, trace) {
    if (rule.startsWith('$')) rule = rule.substring(1);
    console.log('expandFrom:'+rule);
    let lookup = deepmerge(context, this.rules);
    console.log('lookup1', lookup);
    Object.keys(lookup).forEach(r => 
      lookup[r] = RiScript.multeval(lookup[r], lookup, trace));
    console.log('lookup2', lookup);
    if (!lookup.hasOwnProperty(rule)) throw Error
      ('Rule ' + rule + ' not found');
    return lookup[rule];
/*     let last, result = lookup[rule];
    trace && console.log('------------------------------------------', lookup);
    trace && console.log('-)' + result);
    if (!result) throw Error('Rule ' + rule + ' not found');
    for (let i = 0; i < 100 && result !== last; i++) {
      last = result;
      result = RiScript.eval(result, lookup, 1);
      trace && console.log(i + ')' + result);
    }
    return result; */
  }

  reset() { // remove?

    this.rules = {};
    return this;
  }

  hasRule(name) {
    if (typeof name !== 'string') return false;
    if (name.startsWith('$')) name = name.substring(1);
    return typeof this.rules[name] !== 'undefined';
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
  //console.log('CONVERTED: ' + opts + ')');
  return opts + ')';
}

module && (module.exports = Grammar);
