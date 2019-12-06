const OR_PATT = /\s*\|\s*/;
const STRIP_TICKS = /`([^`]*)`/g;
const PROB_PATT = /(.*[^\s])\s*\[([0-9.]+)\](.*)/;

class Grammar {

  constructor(rules) {
    this.rules = {};
    rules && this.load(rules);
  }

  load(rules) {
    if (typeof rules === 'string') {
      try {
        // first try with rita-script?
        rules = JSON.parse(rules);
      } catch (e) {
        err('Grammar appears to be invalid JSON, please check'
          + ' it at http://jsonlint.com/', grammar);
        return;
      }
    }
    Object.keys(rules).forEach(r => this.addRule(r, rules[r]))
    return this;
  }

  expand(context) {
    return this.expandFrom(Grammar.START_RULE, context);
  }

  expandFrom(rule, context) {

    if (!Object.keys(this.rules).length) err("No grammar rules found!");

    if (!this.hasRule(rule)) err("Rule not found: " + rule
      + "\nRules:\n" + JSON.stringify(this.rules));

    let tries = 0, maxIterations = 1000;

    while (++tries < maxIterations) {

      let next = this._expandRule(this, rule);
      if (next && next.length) { // matched a rule
        rule = next;
        continue;
      }

      // finished rules, check for back-ticked exec calls
      let parts = Grammar.EXEC_PATT.exec(rule);

      if (parts && parts.length > 2) {

        let theCall = parts[2];

        if (this._countTicks(theCall) != 2) {
          warn("Failed parsing recursive exec: " + theCall);
          return null;
        }

        let callResult = this._handleExec(theCall, context);
        if (!callResult) {
          if (0) console.log("[WARN] (Grammar.expandFrom) Unexpected" +
            " state: eval(" + theCall + ") :: returning '" + rule + "'");
          break; // return
        }

        rule = parts[1] + callResult;
        if (parts.length > 3) rule += parts[3];
        //console.log('rule: '+rule);
        continue; // we may have more rules to expand
      }

      if (tries >= maxIterations) {
        console.log("[WARN] max number of iterations reached: " + maxIterations);
      }

      return unescapeHTML(rule);
    }
  }

  reset() { // remove?

    this.rules = {};
    return this;
  }

  addRule(name, theRule, weight) {

    weight = weight || 1.0;

    let ruleset = Array.isArray(theRule) ? theRule
      : theRule.split(OR_PATT);

    for (let i = 0; i < ruleset.length; i++) {

      let rule = ruleset[i];
      let prob = weight;
      let match = PROB_PATT.exec(rule);

      if (match) {// found weighting
        rule = match[1] + match[3];
        prob = match[2];
      }

      let temp = this.rules[name] || {};
      temp[rule] = prob; // add the prob
      this.rules[name] = temp;
    }

    return this;
  }

  hasRule(name) {
    return typeof this.rules[name] !== 'undefined';
  }

  removeRule(name) {
    delete this.rules[name];
    return this;
  }

  ////////////////////////////////////////////////////////////////////////
  
  _countTicks(theCall) {
    let count = 0;
    for (let i = 0; i < theCall.length; i++) {
      if (theCall.charAt(i) == '`')
        count++;
    }
    return count;
  }

  _expandRule(g, prod) {
    let dbug = 0;
    for (let name in g.rules) {
      let idx = prod.indexOf(name);
      if (idx >= 0) { // got a match, split into 3 parts
        if (dbug) console.log('matched: ' + name);
        let pre = prod.substring(0, idx) || '';
        let expanded = g._doRule(name) || '';
        let post = prod.substring(idx + name.length) || '';

        return pre + expanded + post;
      }
    }  // no rules matched
  }


  _doRule(pre) {
    let p = Math.random(), rule = this.rules[pre];
    let total = Object.keys(rule).reduce(
      (acc,name) => acc += parseFloat(rule[name]), 0);
    for (let name in rule) {
      let amt = rule[name] / total;
      if (p < amt) {
        return name;
      }
      p -= amt;
    }
  }

  _handleExec(input, context) {

    if (!input || !input.length) return null;

    context = Object.assign(context || {}, Grammar.parent);
    //console.log('_handleExec('+input+", ", Object.keys(context)+')');

    // strip backticks and eval
    let exec = input.replace(STRIP_TICKS, '$1');

    try {
      let res = eval(exec); // try in global context
      return res ? res + E : null;

    } catch (e) {
      if (context) { // create sandbox for context args
        try {
          let res = new Scope(context).eval(exec);
          return res ? res + '' : null;
        }
        catch (e) { /* fall through */ }
      }
    }
    return input;
  }
}


class Scope {

  constructor(context) { // class

    this.names = [];
    if (context) {
      let scope = this;
      if (typeof context === 'function') {
        scope.put(context.name, context);
      }
      else if (typeof context === 'object') {
        Object.keys(context).forEach(f => {
          if (typeof context[f] === 'function')
            scope.put(f, context[f]);
        });
      }
    }
  }

  eval(s) { return eval(s); }

  put(name, val) {
    "use strict";
    let code = "(function() {\n";
    code += 'let ' + name + ' = ' + val + ';\n';
    code += 'return function(str) {return eval(str)};\n})()';
    this.eval = this.eval(code);
    this.names.push(name);
  }
}

function unescapeHTML(input) {

  if (!input || !input.length) return input;

  let answer = input.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&").replace(/&quot;/g, "\"");

  String.fromCharCodePoint = function() { // uggh
    let codeunits = [];
    for (let i = 0; i < arguments.length; i++) {
      let c = arguments[i];
      if (arguments[i] < 0x10000) {
        codeunits.push(arguments[i]);
      } else if (arguments[i] < 0x110000) {
        c -= 0x10000;
        codeunits.push((c >> 10 & 0x3FF) + 0xD800);
        codeunits.push((c & 0x3FF) + 0xDC00);
      }
    }
    return String.fromCharCode.apply(String, codeunits);
  };

  answer = answer.replace(/&#(\d+);/g, function(_, n) {
    return String.fromCharCodePoint(parseInt(n, 10));
  }).replace(/&#x([0-9a-f]+);/gi, function(_, n) {
    return String.fromCharCodePoint(parseInt(n, 16));
  });

  return answer;
}

function err() {
  let msg = "[RiTa] " + arguments[0];
  for (let i = 1; i < arguments.length; i++)
    msg += '\n' + arguments[i];
  throw Error(msg);
}

Grammar.START_RULE = "<start>";
Grammar.EXEC_PATT = /(.*?)(`[^`]+?\(.*?\);?`)(.*)/;

module && (module.exports = Grammar);
