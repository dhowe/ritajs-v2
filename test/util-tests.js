const deepMerge = require('deepmerge');
const { expect } = require('chai');

describe('RiTa.Util', () => {

  if (typeof module !== 'undefined') require('./before');

  const rand = RiTa.randomizer;

  it('Should correctly call Util.mapOpts', () => {
    expect("Not needed in JS").is.not.null;
  });

  it('Should correctly call random.randomOrdering', () => {
    let ro = rand.randomOrdering(4);
    expect(ro.length).eq(4);
    expect(ro).to.have.members([0,1,2,3]);
    let arr = [0, 3, 5, 7]; 
    ro = rand.randomOrdering(arr);
    expect(ro.length).eq(4);
    expect(ro).to.have.members(arr);
  });

  it('Should correctly call deepMerge', () => {
    let map = deepMerge({}, { "a": "1" });
    expect(map).eql({ "a": "1" });

    map = deepMerge({ "a": "1" }, { "a": "1" });
    expect(map).eql({ "a": "1" });

    map = deepMerge({ "a": "2" }, { "a": "1" });
    expect(map).eql({ "a": "1" });

    map = deepMerge({ "a": "2", "b": "2" }, { "a": "1" });
    expect(map).eql({ "a": "1", "b": "2" });
  });


  it('Should correctly sort array in reverse order', () => {
    let input = [5, 3, 8, 3, 7, -1];
    let expected = [8, 7, 5, 3, 3, -1];
    let answer = revSort(input);
    expect(answer).eql(expected);
  });

  function revSort(arr) {
    arr.sort();
    return arr;
  }
});
