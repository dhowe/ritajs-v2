const expect = require('chai').expect;
const API = require('../api');
const RiTa = require('../src/rita_api');

describe('RiTa.API', () => {

  it('Should access static functions in API', () => {
    API.RiTa.forEach(f => expect(RiTa[f]).to.be.a('function'));
  });

  it('Should access static constants', () => {
    expect(RiTa.VERSION).eq(2);
  });

});
