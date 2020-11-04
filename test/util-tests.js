const deepMerge = require('deepmerge');
const { expect } = require('chai');

describe('RiTa.Util', () => {

  if (typeof module !== 'undefined') require('./before');

  const rand = RiTa.randomizer;

  it('Should call mapOpts', () => {
    expect("Not needed in JS").is.not.null;
  });

  it('Should call randomOrdering', () => {
    let ro = rand.randomOrdering(4);
    expect(ro.length).eq(4);
    expect(ro).to.have.members([0,1,2,3]);
    let arr = [0, 3, 5, 7];
    ro = rand.randomOrdering(arr);
    expect(ro.length).eq(4);
    expect(ro).to.have.members(arr);
  });

  it('Should call deepMerge', () => {
    let map = deepMerge({}, { "a": "1" });
    expect(map).eql({ "a": "1" });

    map = deepMerge({ "a": "1" }, { "a": "1" });
    expect(map).eql({ "a": "1" });

    map = deepMerge({ "a": "2" }, { "a": "1" });
    expect(map).eql({ "a": "1" });

    map = deepMerge({ "a": "2", "b": "2" }, { "a": "1" });
    expect(map).eql({ "a": "1", "b": "2" });
  });

});
