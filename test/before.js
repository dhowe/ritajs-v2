
let testTranspiled = false, testWithoutLex = false; // for node-tests default={false, false}

/**
 * Loads the correct version of rita for 3 testing cases:
 * 1. In Node, using the raw code in 'src' (if NODE_ENV=dev)
 * 2. In Node, using the transpiled code in 'dist'
 * 3. In Browser (test/index.html), using the transpiled code in 'dist'
 */
async function loadTestingDeps() {
  let RiTa, expect;
  if (testWithoutLex && !testTranspiled) {
    console.log("[WARN] testWithoutLex=true forces testTranspiledCode=true");
    testTranspiled = true;
  }
  if (typeof process !== 'undefined' && process.env) { // we are in node
    let path = (process.env.NODE_ENV === 'dev' && !testTranspiled) ? '../src' : '../dist';
    let file = path + (testWithoutLex ? '/rita-micro.js' : '/rita.js');
    let module = await import(file);
    RiTa = module.default;
    RiTa.HAS_LEXICON = !testWithoutLex;
    // console.log('Loading RiTa from ' + file + ' RiTa.HAS_LEXICON='
    //   + RiTa.HAS_LEXICON + ' testTranspiled=' + testTranspiled);
    let chai = await import('../node_modules/chai/lib/chai.js');
    expect = chai.expect;
  }
  else {  // we are in the browser
    RiTa = window.RiTa;  // loaded via script tags
    expect = window.chai.expect;
  }
  return { RiTa, expect, hasLex: RiTa.HAS_LEXICON };
}

export { loadTestingDeps };
