
/**
 *  An atomic operation on a metadata key-value pair that, when invoked, returns a boolean
 */
class Operator {

  constructor(val, type) {
    this.value = val;
    this.type = type;
  }

  static fromOperator(op) {
    let types = Object.values(ALL);
    for (let i = 0; i < types.length; i++) {
      if (op === types[i]) return op.value;
    }
    throw Error("Invalid Operator: " + op);
  }

  static fromString(op) {
    switch (op) {
      case ">": return GT;
      case "<": return LT;
      case ">=": return GE;
      case "<=": return LE;
      case "!=": return NE;
      case "^=": return SW;
      case "$=": return EW;
      case "*=": return RE;
      case "==": return EQ;
      case "=": return EQ;
    }
    throw Error("Invalid Operator: " + op);
  }

  toString() {
    return this.value;
  }

  invoke(s1, s2) {
    if (typeof s1 === 'undefined') {
      throw Error('No first operand: ' + s1 + ' ' + s2);
    }
    if (this.type === OpType.EQUALITY) {
      if (this === EQ) return s1 === s2;
      if (this === NE) return s1 !== s2;
    }
    else if (this.type === OpType.MATCHING) {
      if (typeof s2 === 'undefined') return false;
      if (this === SW) return s1.startsWith(s2);
      if (this === EW) return s1.endsWith(s2);
      if (this === RE) return new RegExp(s2).test(s1);
    }
    else if (this.type === OpType.COMPARISON) {
      try {
        let o1 = parseFloat(s1);
        let o2 = parseFloat(s2);
        if (isNaN(o2) || isNaN(o1)) throw Error();
        if (this === GT) return o1 > o2;
        if (this === LT) return o1 < o2;
        if (this === GE) return o1 >= o2;
        if (this === LE) return o1 <= o2;
      }
      catch (e) {
        throw Error("Expected numeric operands, found ["
          + s1 + "," + s2 + "]\n" + e);
      }
    }
  }
}

const OpType = {
  EQUALITY: 'EQUALITY',
  COMPARISON: 'COMPARISON',
  MATCHING: 'MATCHING',
  ASSIGNMENT: 'ASSIGNMENT'
};

const EQ = new Operator("=", OpType.EQUALITY);
const NE = new Operator("!=", OpType.EQUALITY);

const SW = new Operator("^=", OpType.MATCHING);
const EW = new Operator("$=", OpType.MATCHING);
const RE = new Operator("*=", OpType.MATCHING);

const GT = new Operator(">", OpType.COMPARISON);
const LT = new Operator("<", OpType.COMPARISON);
const LE = new Operator("<=", OpType.COMPARISON);
const GE = new Operator(">=", OpType.COMPARISON);

const ALL = { GT, LT, NE, LE, GE, SW, EQ, EW, RE };

Object.keys(ALL).forEach(t => Operator[t] = ALL[t]);

export default Operator;