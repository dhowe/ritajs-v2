const deepMerge = require('deepmerge');


class RiGrammar {

  /*
   * Default behavior for rules is dynamic (using $$rulename)
   * and stored in the context with the $$ prefix { '$$rule': '(a | b) }
   *
   * This can be overridden by setting a rule with a $ prefix
   * which will be stored in the context with no prefix (as a normal variable)
   */
  constructor(rules, context) {
    this.rules = {};
    this.context = context || {};
    this.compiler = new RiGrammar.parent.RiScript();
    if (rules) this.addRules(rules);
  }

  static fromJSON(json, context) {
    let rg = new RiGrammar(0, context);
    parseJSON(rg, json);
    return rg;
  }

  toJSON() {
    let rules = {};
    for (let [name, rule] of Object.entries(this.rules)) {
      if (!name.startsWith(DYN)) name = SYM + name;
      //console.log('rules['+name+'] = '+rule);
      rules[name] = rule;
    }
    return JSON.stringify(rules, null, 2);
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
    let rname = validateRuleName(name);
    if (!rule) throw Error('<undefined> rule');
    if (Array.isArray(rule)) rule = joinChoice(rule);
    if (rule.includes('|') && !(IN_PARENS_RE.test(rule))) {
      rule = '(' + rule + ')';
    }
    this.rules[rname] = rule;//'(' + rule + ')';//rule;
    return this;
  }

  expand(rule = 'start', opts = {}) {
    if (arguments.length && typeof arguments[0] !== 'string') {
      opts = rule;
      rule = 'start';
    }
    let ctx = deepMerge(this.context, this.rules); // ?
    if (opts) ctx = deepMerge(ctx, opts);

    rule = validateRuleName(rule);
    if (!ctx.hasOwnProperty(rule)) {
      if (!rule.startsWith(DYN)) throw Error("Bad rule (post-validation): " + rule);
      rule = rule.substring(2); // check for non-dynamic version
      if (!ctx.hasOwnProperty(rule)) {
        throw Error('Rule ' + rule + ' not found');
      }
    }

    // a bit strange here as opts entries are included in ctx
    return this.compiler.evaluate(ctx[rule], ctx, opts);
  }

  toString(lb) {
    let str = JSON.stringify(this.rules, null, 2);
    return lb ? str.replace(/\n/g, lb) : str;
  }

  removeRule(name) {
    if (name) {
      name = validateRuleName(name);
      delete this.rules[name];
    }
    return this;
  }

  addTransform() { RiScript.addTransform(...arguments); return this }
  removeTransform() { RiScript.removeTransform(...arguments); return this }
  getTransforms() { return RiScript.getTransforms(); }
}

function validateRuleName(name) {
  if (!name.length) throw Error('expected [string] name');

  if (name.startsWith(DYN)) {
    name = name.substring(2);
    throw Error('Grammar rules are dynamic by default;'
      + ' if you need a non-dynamic rule, use \'$'
      + name + '\', otherwise just use \'' + name + '\'.');
  }

  if (SYM_RE.test(name)) {
    // override dynamic default, context -> 'barevar'
    name = name.substring(1);
  }
  else { // dynamic default, context -> '$$dynvar'
    if (!name.startsWith(DYN)) name = DYN + name;
  }
  return name;
}

function parseJSON(grammar, json) {
  if (typeof json !== 'string') throw Error('expected [string] json')
  let rules;
  try {
    rules = JSON.parse(json);
  } catch (e) {
    throw Error('RiGrammar appears to be invalid JSON,'
      + ' please check it at http://jsonlint.com/\n' + json);
  }
  Object.keys(rules).forEach(r => { // remove $$
    grammar.addRule(r.startsWith(DYN) ? r.substring(2) : r, rules[r]);
  });
}

function joinChoice(arr) {
  let opts = '(';
  for (let i = 0; i < arr.length; i++) {
    opts += arr[i].includes(' ') ? '(' + arr[i] + ')' : arr[i];
    if (i < arr.length - 1) opts += ' | ';
  }
  return opts + ')';
}

const SYM = '$', DYN = '$$';
const SYM_RE = /^\$[^$]/;
const IN_PARENS_RE = /^\([^()]*\)$/;

module && (module.exports = RiGrammar);
