const RiScript = require('./riscript');
const deepmerge = require('deepmerge');
const maxTries = 100;

// TODO: handling weighting of rules?
// expandFrom? expandWith?

class Grammar {

  constructor(rules, context) {
    this.rules = {};
    this.context = context || {};
    rules && this.setRules(rules);
  }

  setRules(rules) { // or rules or ... ?
    if (typeof rules === 'string') {
      try {
        rules = JSON.parse(rules);
      } catch (e) {
        console.warn('Grammar appears to be invalid JSON, please check'
          + ' it at http://jsonlint.com/', rules);
        return this;
      }
    }
    Object.keys(rules).forEach(r => this.addRule(r, rules[r]))
    return this;
  }

  addRule(name, rule) {
    if (name.startsWith('$')) name = name.substring(1);
    if (Array.isArray(rule)) rule = joinChoice(rule);

    // TODO: better regex here: if '|' happens before '('
    if (/\|/.test(rule) && !(/^\(.*\)$/.test(rule))) {
      rule = '(' + rule + ')';
    }
    this.rules[name] = rule;
    return this;
  }

  expand(rule = 'start', opts) {

    // TODO: test with missing args (check all cases)
    if (arguments.length && typeof arguments[0] !== 'string') {
      opts = rule;
      rule = 'start';
    }
    let ctx = deepmerge(this.context, this.rules);
    if (rule.startsWith('$')) rule = rule.substring(1);
    if (!ctx.hasOwnProperty(rule)) throw Error('Rule ' + rule + ' not found');
    return RiScript.eval(ctx[rule], ctx, opts);
  }

  toString(lb='\n') { // TODO
    let s = '';
    Object.keys(rules).forEach(r => s += r + ':' + rules[r] + lb);
    return s;
  }

  removeRule(name) {
    if (typeof name === 'string') {
      if (name.startsWith('$')) name = name.substring(1);
      delete this.rules[name];
    }
    return this;
  }

  addTransform() { RiScript.addTransform(...arguments); return this }
  removeTransform() { RiScript.removeTransform(...arguments); return this }
  getTransforms() { return RiScript.getTransforms(); }
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
