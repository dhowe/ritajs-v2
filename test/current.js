describe('RiTa.RiScript', function () {

    if (typeof module !== 'undefined') require('./before');

    it('Should evaluate symbol with a property transform', function () {
        let ctx = { bar: { color: 'blue' } };
        let rs = RiTa.evaluate('$bar.color', ctx, 1);
        expect(rs).eq('blue');
    });
});