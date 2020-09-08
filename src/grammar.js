const deepMerge = require('deepmerge');

// TODO:
//    add fromJSON, toJSON
//    expandFrom? expandWith?

class Grammar {

  constructor(rules, context) {
    this.rules = {};
    this.context = context || {};
    this.compiler = new Grammar.parent.RiScript();
    if (rules) this.setRules(rules);
  }

  static fromJSON(json, context) {
    return new Grammar().setRules(json);
  }

  toJSON() {
    return stringify(Object.keys(this).reduce(
      (acc, k) => Object.assign(acc, { [k]: this[k] }), {}));
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
    if (!name || !name.length) throw Error('expected [string] name');
    if (name.startsWith('$')) name = name.substring(1);
    if (Array.isArray(rule)) rule = joinChoice(rule);
    if (rule.includes('|') && !(IN_PARENS_RE.test(rule))) {
      rule = '(' + rule + ')';
    }
    this.rules[name] = rule;
    return this;
  }

  expand(rule = 'start', opts = {}) {

    if (arguments.length && typeof arguments[0] !== 'string') {
      opts = rule;
      rule = 'start';
    }
    let ctx = deepMerge(this.context, this.rules);
    if (opts.context) ctx = deepMerge(ctx, opts.context);
    if (rule.startsWith('$')) rule = rule.substring(1);
    if (!ctx.hasOwnProperty(rule)) throw Error('Rule ' + rule + ' not found');

    return this.compiler.evaluate(ctx[rule], ctx, opts);
  }

  toString(lb = '\n') { // TODO
    return (JSON.stringify(this.rules, null, 2)+ lb)
  }

  removeRule(name) {
    if (name) {
      if (name.startsWith('$')) name = name.substring(1);
      delete this.rules[name];
    }
    return this;
  }

  // TODO: should be instance methods?
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

const IN_PARENS_RE = /^\(.*\)$/;

module && (module.exports = Grammar);
