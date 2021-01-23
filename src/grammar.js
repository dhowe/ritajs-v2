const deepMerge = require('deepmerge');

// TODO: expandFrom? expandWith?

class RiGrammar {

  constructor(rules, context) {
    this.rules = {};
    this.context = context || {};
    this.compiler = new RiGrammar.parent.RiScript();
    if (rules) this.addRules(rules);
  }

  static fromJSON(json, context) {
    let rg = new RiGrammar(null, context);
    rg._parseJSON(json);
    return rg;
  }

  _parseJSON(json) {
    try {
      let rules = JSON.parse(json);
      Object.keys(rules).forEach(r => this.addRule(r, rules[r]))
    } catch (e) {
      throw Error('RiGrammar appears to be invalid JSON,'
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
    name = checkRuleName(name);
    if (Array.isArray(rule)) rule = joinChoice(rule);
    if (rule.includes('|') && !(IN_PARENS_RE.test(rule))) {
      rule = '(' + rule + ')';
    }
    this.rules[name] = rule;//'(' + rule + ')';//rule;
    return this;
  }

  expand(rule = '&start', opts = {}) {

    if (arguments.length && typeof arguments[0] !== 'string') {
      opts = rule;
      rule = '&start';
    }
    let ctx = deepMerge(this.context, this.rules);
    if (opts) ctx = deepMerge(ctx, opts);

    rule = checkRuleName(rule);
    if (!ctx.hasOwnProperty(rule)) throw Error('Rule ' + rule + ' not found');

    // a bit strange here as opts entries are included in ctx
    return this.compiler.evaluate(ctx[rule], ctx, opts);
  }

  toString(lb) {
    let rules = removeAmp(this.rules);
    let str = JSON.stringify(rules, null, 2);
    return lb ? str.replace(/\n/g, lb).replace(/"&/g, '"') : str;
  }

  removeRule(name) {
    if (name) {
      name = checkRuleName(name);
      delete this.rules[name];
    }
    return this;
  }

  // TODO: should be static or instance methods?
  addTransform() { RiScript.addTransform(...arguments); return this }
  removeTransform() { RiScript.removeTransform(...arguments); return this }
  getTransforms() { return RiScript.getTransforms(); }
}

function removeAmp(item) {
    const newItem = {};
    Object.keys(item).forEach(key => {
      let newKey = key;
      if (newKey.startsWith('&')) newKey = newKey.substring(1);
      newItem[newKey] = item[[key]];
    });
    return newItem;
}

function checkRuleName(name) {
  if (!name || !name.length) throw Error('expected [string] name');
  if (name.startsWith('$')) name = name.substring(1);
  if (!name.startsWith('&')) name = '&' + name;
  return name;
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

module && (module.exports = RiGrammar);
