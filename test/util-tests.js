const deepMerge = require('deepmerge');
const { expect } = require('chai');

describe('RiTa.Util', () => {

  if (typeof module !== 'undefined') require('./before');

  it('Should correctly call Util.mapOpts', () => {
    // not needed in js
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

});
