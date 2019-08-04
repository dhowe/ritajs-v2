const expect = require('chai').expect;
const RiTa = require('../src/rita_core');


describe('Component Tests', function () {

  describe('RiTa Structure', function () {

    it('Should access static constants', function () {
      expect(RiTa.VERSION).eq(2);
    });
    it('Should access static functions', function () {
      expect(RiTa.hasWord("dog")).eq(true);
    });
    it('Should instantiate member classes', function () {
      let rm = new RiTa.RiMarkov(3);
      expect(rm.n).eq(3);
    });
  });

  // describe('Test RiTa API functions', function () {
  //
  //   it('Should access static props', function () {
  //     expect(RiTa.VERSION).eq(2);
  //   });
  //
  // });

});
