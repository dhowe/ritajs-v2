
/**
 * Loads the correct version of rita for 3 testing cases:
 * 1. In Node, using the raw code in 'src' (if NODE_ENV=dev)
 * 2. In Node, using the transpiled code in 'dist'
 * 3. In Browser (test/index.html), using the transpiled code in 'dist'
 */
async function loadTestingDeps() {
  let RiTa, expect;
  if (typeof process !== 'undefined' && process.env) { // in node
    let path = (process.env.NODE_ENV) === 'dev' ? '../src' : '../dist';
    let module = await import(path + '/rita.js');
    RiTa = module.default;
    let chai = await import('../node_modules/chai/lib/chai.js');
    expect = chai.expect;
  }
  else {  // in browser
    RiTa = window.RiTa;  // loaded via script tags
    expect = window.chai.expect;
  }
  return { RiTa, expect };
}

export { loadTestingDeps };
