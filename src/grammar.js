const RiScript = require('./riscript');
const deepmerge = require('deepmerge');
const maxTries = 100;

// TODO: handling weighting of rules?
// expandFrom? expandWith?

class Grammar {

  constructor(rules) {
    this.rules = {};
    rules && this.setRules(rules);
  }

  setRules(rules) { // or rules or ... ?
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

  addRule(name, rule) {
    if (name.startsWith('$')) name = name.substring(1);
    if (Array.isArray(rule)) rule = joinChoice(rule);
    if (/[|\[\]]/.test(rule) && !(/^\(.*\)$/.test(rule))) {
      rule = '(' + rule + ')';
    }
    this.rules[name] = rule;
    return this;
  }

  expand(ruleName, context, opts) {
    let trace = opts && opts.trace;

    /// NEXT: working HERE
    if (arguments.length && typeof arguments[0] !== 'string') {
      context = ruleName;
      opts = context;
      ruleName = null;
    }
    let rule = ruleName || 'start';
    let ctx = deepmerge(context, this.rules);
    if (rule.startsWith('$')) rule = rule.substring(1);
    Object.keys(ctx).forEach(r => ctx[r] = RiScript.eval(ctx[r], ctx, trace));
    if (!ctx.hasOwnProperty(rule)) throw Error('Rule ' + rule + ' not found');
    return ctx[rule];
  }

  toString() { // TODO
    return this + "";
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
