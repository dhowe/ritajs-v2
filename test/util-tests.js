const deepMerge = require('deepmerge');
const { expect, util } = require('chai');

describe('RiTa.Util', () => {

  if (typeof module !== 'undefined') require('./before');

  const rand = RiTa.randomizer;

  it('Test mapOpts', () => {
    expect("Not needed in JS").is.not.null;
  });

  it('Test randomOrdering', () => {
    let ro = rand.randomOrdering(4);
    expect(ro.length).eq(4);
    expect(ro).to.have.members([0,1,2,3]);
    let arr = [0, 3, 5, 7];
    ro = rand.randomOrdering(arr);
    expect(ro.length).eq(4);
    expect(ro).to.have.members(arr);
  });

  it('Test deepMerge', () => {
    let map = deepMerge({}, { "a": "1" });
    expect(map).eql({ "a": "1" });

    map = deepMerge({ "a": "1" }, { "a": "1" });
    expect(map).eql({ "a": "1" });

    map = deepMerge({ "a": "2" }, { "a": "1" });
    expect(map).eql({ "a": "1" });

    map = deepMerge({ "a": "2", "b": "2" }, { "a": "1" });
    expect(map).eql({ "a": "1", "b": "2" });
  });

  it('Test slice array', () => {
    //function N/A for JavaScript, just use the bulit-in slice function
  });

  it('Test slice list', () => {
    //function N/A for JavaScript
  });

});
