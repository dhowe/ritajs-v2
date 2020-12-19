const deepMerge = require('deepmerge');

// TODO: expandFrom? expandWith?

class Grammar {

  constructor(rules, context) {
    this.rules = {};
    this.context = context || {};
    this.compiler = new Grammar.parent.RiScript();
    if (rules) this.addRules(rules);
  }

  static fromJSON(json, context) {
    let rg = new Grammar(null, context);
    rg._parseJSON(json);
    return rg;
  }

  _parseJSON(json) {
    try {
      let rules = JSON.parse(json);
      Object.keys(rules).forEach(r => this.addRule(r, rules[r]))
    } catch (e) {
      throw Error('Grammar appears to be invalid JSON,'
        + ' please check it at http://jsonlint.com/'
        + '\n' + JSON.stringify(json, null, 2));
    }
}

  toJSON() {
    return this.toString();
  }

  addRules(rules) { // or rules or ... ?
    if (rules) {
      if (typeof rules === 'string') {
        rules = JSON.parse(rules);
      }
      Object.keys(rules).forEach(r => this.addRule(r, rules[r]))
    }
    return this;
  }

  addRule(name, rule) {
    if (!name || !name.length) throw Error('expected [string] name');
    if (name.startsWith('$')) name = name.substring(1);
    if (Array.isArray(rule)) rule = joinChoice(rule);
    if (rule.includes('|') && !(IN_PARENS_RE.test(rule))) {
      rule = '(' + rule + ')';
    }
    this.rules[name] = rule;//'(' + rule + ')';//rule;
    return this;
  }

  expand(rule = 'start', opts = {}) {

    if (arguments.length && typeof arguments[0] !== 'string') {
      opts = rule;
      rule = 'start';
    }
    let ctx = deepMerge(this.context, this.rules);
    if (opts) ctx = deepMerge(ctx, opts);
    if (rule.startsWith('$')) rule = rule.substring(1);
    if (!ctx.hasOwnProperty(rule)) throw Error('Rule ' + rule + ' not found');

    // a bit strange here as opts entries are included in ctx
    return this.compiler.evaluate(ctx[rule], ctx, opts);
  }

  toString(lb) {
    let str = JSON.stringify(this.rules, null, 2);
    return lb ? str.replace(/\n/g, lb) : str;
  }

  removeRule(name) {
    if (name) {
      if (name.startsWith('$')) name = name.substring(1);
      delete this.rules[name];
    }
    return this;
  }

  // TODO: should be static or instance methods?
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

const IN_PARENS_RE = /^\([^()]*\)$/;

module && (module.exports = Grammar);
