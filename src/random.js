// adapted from
// https://github.com/bmurray7/mersenne-twister-examples/blob/master/javascript-mersenne-twister.js
class SeededRandom {

  constructor() {
    this.N = 624;
    this.M = 397;
    this.MATRIX_A = 0x9908b0df;
    this.UPPER_MASK = 0x80000000;
    this.LOWER_MASK = 0x7fffffff;
    this.mt = new Array(this.N);
    this.mti = this.N + 1;
    this.seed(new Date().getTime());
  }

  seed(s) {
    this.mt[0] = s >>> 0;
    for (this.mti = 1; this.mti < this.N; this.mti++) {
      let s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
      this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) +
        (s & 0x0000ffff) * 1812433253) + this.mti;
      this.mt[this.mti] >>>= 0;
    }
  }

  _randInt() {
    let y, kk, mag01 = new Array(0x0, this.MATRIX_A);
    if (this.mti >= this.N) {
      if (this.mti == this.N + 1) this.seed(5489);
      for (kk = 0; kk < this.N - this.M; kk++) {
        y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
        this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      for (; kk < this.N - 1; kk++) {
        y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
        this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      y = (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK);
      this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];
      this.mti = 0;
    }
    y = this.mt[this.mti++];
    y ^= (y >>> 11);
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= (y >>> 18);
    return y >>> 0;
  }

  /**
    Returns a single (selected) index from a normalised
    probability distribution (with probabilities summing to 1)
  */
  pselect(probs) {  // probs must sum to 1
    let point = this.randomFloat(), cutoff = 0;
    for (let i = 0; i < probs.length - 1; ++i) {
      cutoff += probs[i];
      if (point < cutoff) return i;
    }
    return probs.length - 1;
  }

  /**
    Returns a normalised probability distribution (summing to 1) for arbitrary postive weights
    If temperature is provideded this is basically the softmax.
    Temperature parameter: range is between 0 and +Infinity (excluding both).
    Lower values move the highest-weighted output toward a probability of 1.0.
    Higher values tend to even out all the probabilities
  */
  ndist(weights, temp) {
    let probs = [], sum = 0;
    if (!temp) { // no temp here
      for (let i = 0; i < weights.length; i++) {
        if (weights[i] < 0) throw Error('Weights must be positive');
        sum += weights[i];
        probs.push(weights[i]);
      }
    }
    else { // have temp, do softmax
      if (temp < 0.01) temp = 0.01;
      for (let i = 0; i < weights.length; i++) {
        let pr = Math.exp(weights[i] / temp);
        sum += pr;
        probs.push(pr);
      }
    }
    return probs.map(p => p /= sum);
  }

  randomFloat() {
    return this._randInt() * (1.0 / 4294967296.0);
  }

  // API ////////////////////////////////////////////////////////////////////

  randomOrdering(arg) {
    let o = Array.isArray(arg) ? arg : Array.from(Array(arg).keys());
    for (let j, x, i = o.length; i; j = parseInt(this.random() * i),
      x = o[--i], o[i] = o[j], o[j] = x) { /* shuffle */ }
    return o;
  }

  randomItem(arr, func) {
    let crand = this.randomFloat();
    let item = arr[Math.floor(crand * arr.length)];
    return typeof func === 'function' ? func(item) : item;
  }

  random() {
    let crand = this.randomFloat();
    if (!arguments.length) return crand;
    if (Array.isArray(arguments[0])) return this.randomItem(arguments[0])
    return arguments.length === 1 ? crand * arguments[0] :
      crand * (arguments[1] - arguments[0]) + arguments[0];
  }
}


module && (module.exports = SeededRandom);
