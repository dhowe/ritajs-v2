
// let { RiTa, expect } = await loadDeps();
// console.log('RiTa2:', typeof RiTa);
// console.log('EXPECT2:', typeof expect);
//export { RiTa, expect };

async function loadTestingDeps() {
  let RiTa, expect;
  if (typeof process !== 'undefined' && process.env) {
    let path = (process.env.NODE_ENV) === 'dev' ? '../src' : '../dist';
    let tmp = await import(path + '/rita.js');
    RiTa = tmp.default;
    let chai = await import('../node_modules/chai/lib/chai.js');
    //console.log('GOT2', Object.keys(chai));
    expect = chai.expect;
    //console.log('loadDeps', typeof RiTa, typeof chai.expect);
  }
  else {
    RiTa = window.RiTa;
    expect = window.chai.expect;
  }
  //console.log('RiTa1:', typeof RiTa);
  //console.log('EXPECT1:', typeof expect);
  return { RiTa, expect };
}

export { loadTestingDeps };

// if (typeof process !== 'undefined' && process.env) {
//   // async function load() {
//   //   console.log('async!');
//   //   let path = process.env.NODE_ENV === 'dev' ? '../src' : '../dist';
//   //   console.log("RITA_PATH: " + path);
//   //   RiTa = await import(path + '/rita.js').default;
//   //   chai = await import('../node_modules/chai/lib/chai.js').default;

//   //   export { RiTa, chai };
//   // }
//   let path = process.env.NODE_ENV === 'dev' ? '../src' : '../dist';
//   console.log("RITA_PATH: " + path);
//   await Promise.all([
//     import(path + '/rita.js').default,
//     import('../node_modules/chai/lib/chai.js').default
//   ]).then(values => {
//     const [RiTa, chai] = values;
//     console.log(RiTa, chai)
//   })
// }
// else if (window) {
//   RiTa = window.RiTa;
//   console.log('RiTa v' + window.RiTa.VERSION, RiTa.Stemmer, RiTa.stem);
// }

// const expect = chai.expect;
// export { RiTa };