const Grammar = require('../src/grammar');

const ADD_WEIGHTS = 0;

describe('RiTa.Grammar', () => {

    if (typeof module !== 'undefined') require('./before');

    let sentences1 = {
        "$start": "$noun_phrase $verb_phrase.",
        "$noun_phrase": "$determiner $noun",
        "$verb_phrase": "($verb | $verb $noun_phrase)",
        "$determiner": "(a | the)",
        "$noun": "(woman | man)",
        "$verb": "shoots"
    };

    let sentences2 = {
        "$start": "$noun_phrase $verb_phrase.",
        "$noun_phrase": "$determiner $noun",
        "$determiner": ["a", "the"],
        "$verb_phrase": ["$verb $noun_phrase", "$verb"],
        "$noun": ["woman", "man"],
        "$verb": "shoots"
    };

    let sentences3 = {
        "$start": "$noun_phrase $verb_phrase.",
        "$noun_phrase": "$determiner $noun",
        "$verb_phrase": "$verb | $verb $noun_phrase",
        "$determiner": "a | the",
        "$noun": "woman | man",
        "$verb": "shoots"
    };

    let grammars = [sentences1, sentences2, sentences3];

    it('should correctly call constructor', () => {
        ok(typeof new Grammar() !== 'undefined');
    });

    it("should correctly call load", () => {

        let rg = new Grammar();
        ok(typeof rg.rules !== 'undefined');
        ok(typeof rg.rules['start'] === 'undefined');
        ok(typeof rg.rules['noun_phrase'] === 'undefined');

        grammars.forEach(g => {
            rg.load(JSON.stringify(g));
            ok(typeof rg.rules !== 'undefined');
            ok(typeof rg.rules['start'] !== 'undefined');
            ok(typeof rg.rules['noun_phrase'] !== 'undefined');
        });
    });

    it("should correctly call addRule", () => {
        let rg = new Grammar();
        rg.addRule("$start", "$pet");
        ok(typeof rg.rules["start"] !== 'undefined');
        ok(rg.hasRule("$start"));
        rg.addRule("$start", "$dog", .3);
        ok(typeof rg.rules["start"] !== 'undefined');
        ok(rg.hasRule("$start"));
    });

    it("should correctly call hasRule", () => {

        grammars.forEach(g => {

            let rg = new Grammar(g);
            ok(rg.hasRule("$start"));
            ok(rg.hasRule("start"));

            rg.reset();
            ok(!rg.hasRule("start"));
            rg.addRule("$rule1", "$pet");
            ok(rg.hasRule("$rule1"));
            ok(rg.hasRule("rule1"));

            rg.reset();

            rg.addRule("$rule1", "cat", .4);
            rg.addRule("$rule1", "dog", .6);
            rg.addRule("$rule1", "boy", .2);
            ok(rg.hasRule("$rule1"));
            ok(rg.hasRule("rule1"));

            ok(!rg.hasRule("badname"));

            rg.reset();

            rg.addRule("rule1", "$pet");
            ok(rg.hasRule("$rule1"));
            ok(rg.hasRule("rule1"));

            ok(!rg.hasRule(null));
            ok(!rg.hasRule(undefined));
            ok(!rg.hasRule(1));
        });
    });

    it("should correctly call removeRule", () => {

        grammars.forEach(g => {
            let rg1 = new Grammar(g);
            def(rg1.rules['start']);
            def(rg1.rules['noun_phrase']);

            rg1.removeRule('$noun_phrase');
            def(!rg1.rules['noun_phrase']);

            rg1.removeRule('$start');
            def(!rg1.rules['start']);

            rg1.removeRule('');
            rg1.removeRule('bad-name');
            rg1.removeRule(null);
            rg1.removeRule(undefined);
        });
    });

    it("should correctly call expandFrom", () => {

        let rg = new Grammar();

        rg.reset();
        rg.addRule("$start", "$pet");
        rg.addRule("$pet", "($bird | $mammal)");
        rg.addRule("$bird", "(hawk | crow)");
        rg.addRule("$mammal", "dog");

        eq(rg.expandFrom("$mammal"), "dog");

        for (let i = 0; i < 100; i++) {
            let res = rg.expandFrom("$bird");
            ok(res === "hawk" || res === 'crow');
        }

        expect(() => {
            try {
                rg.expandFrom("wrongName")
            } catch (e) {
                throw e;
            }
        }).to.throw();

    });

    it("should correctly call expand", () => {

        let rg = new Grammar();
        rg.addRule("$start", "pet");
        eq(rg.expand(), "pet");

        rg.reset();
        rg.addRule("$start", "$pet");
        rg.addRule("$pet", "dog");

        eq(rg.expand(), "dog");
    });

    ADD_WEIGHTS && it("should correctly call expand.weights", () => {

        /////////////////////////////////////////////////////////////////

        rg.reset();
        rg.addRule("$start", "$rule1", 1);
        rg.addRule("$rule1", "cat", .4);
        rg.addRule("$rule1", "dog", .6);
        rg.addRule("$rule1", "boy", .2);
        ok(rg.hasRule("$rule1"));

        let found1 = false, found2 = false, found3 = false;
        for (let i = 0; i < 100; i++) {
            let res = rg.expand();
            ok(res === ("cat") || res === ("dog") || res === ("boy"));
            if (res === ("cat")) found1 = true;
            else if (res === ("dog")) found2 = true;
            else if (res === ("boy")) found3 = true;
        }
        ok(found1 && found2 && found3); // found all

        /////////////////////////////////////////////////////////////////

        rg.reset();
        rg.addRule("$start", "$rule1", 1);
        rg.addRule("$rule1", "cat | dog | boy");
        ok(rg.hasRule("$rule1"));

        found1 = false;
        found2 = false;
        found3 = false;
        for (let i = 0; i < 100; i++) {
            let res = rg.expand();
            ok(res === ("cat") || res === ("dog") || res === ("boy"));
            if (res === ("cat")) found1 = true;
            else if (res === ("dog")) found2 = true;
            else if (res === ("boy")) found3 = true;
        }
        ok(found1 && found2 && found3); // found all

        /////////////////////////////////////////////////////////////////

        rg.reset();
        rg.addRule("$start", "pet", 1);
        eq(rg.expand(), "pet");

        rg.reset();
        rg.addRule("$start", "the $pet ran.", 1);
        rg.addRule("$pet", "dog", .7);
        for (let i = 0; i < 10; i++) {
            eq(rg.expand(), "the dog ran.");
        }

        rg.reset();
        rg.addRule("$start", "the $pet.", 1);
        rg.addRule("$pet", "dog", .7);
        rg.addRule("$pet", "cat", .3);

        let d = 0, c = 0;
        for (let i = 0; i < 100; i++) {
            let r = rg.expand();
            if (r === "the dog.") d++;
            if (r === "the cat.") c++;
        }
        ok(d > 50); // d + ""
        ok(d < 90); // d + ""
        ok(c > 10); // g + ""
        ok(c < 50); // g + ""
    });


    ADD_WEIGHTS && it("should correctly call expandFrom.weights", () => {

        let rg = new Grammar();
        rg.addRule("$start", "$pet");
        rg.addRule("$pet", "$bird [9] | $mammal");
        rg.addRule("$bird", "hawk");
        rg.addRule("$mammal", "dog [2]");

        eq(rg.expandFrom("$mammal"), "dog");

        let hawks = 0, dogs = 0;
        for (let i = 0; i < 100; i++) {
            let res = rg.expandFrom("$pet");
            ok(res === "hawk" || res === 'dog');
            if (res == "dog") dogs++;
            if (res == "hawk") hawks++;
        }
        ok(hawks > dogs * 2);
    });

    it("should correctly handle transforms", () => {
        let rg = new Grammar();
        rg.addRule("$start", "$pet.toUpperCase()");
        rg.addRule("$pet", "dog");
        eq(rg.expand(), "DOG");

        rg = new Grammar();
        rg.addRule("$start", "($pet | $animal)");
        rg.addRule("$animal", "$pet");
        rg.addRule("$pet", "(dog).toUpperCase()");
        eq(rg.expand(), "DOG");
    });

    it("should correctly handle special characters", () => {
        let rg, res, s;

        // FAILS ON MULTEVAL AS ENTITY IS RESOLVED (needs flag?)

        s = "{ \"$start\": \"hello &#124; name\" }";
        rg = new Grammar(s);
        res = rg.expand();
        //console.log(res);
        ok(res === "hello | name");
        return;
        s = "{ \"$start\": \"hello: name\" }";
        rg = new Grammar(s);
        res = rg.expand();
        ok(res === "hello: name");

        s = "{ \"$start\": \"&#8220;hello!&#8221;\" }";
        rg = new Grammar(s);

        s = "{ \"$start\": \"&lt;start&gt;\" }";
        rg = new Grammar(s);
        res = rg.expand();
        //console.log(res);
        ok(res === "$start");

        s = "{ \"$start\": \"I don&#96;t want it.\" }";
        rg = new Grammar(s);
        res = rg.expand();
        //console.log(res);
        ok(res === "I don`t want it.");

        s = "{ \"$start\": \"&#39;I really don&#39;t&#39;\" }";
        rg = new Grammar(s);
        res = rg.expand();
        ok(res === "'I really don't'");

        s = "{ \"$start\": \"hello | name\" }";
        rg = new Grammar(s);
        for (let i = 0; i < 10; i++) {
            res = rg.expand();
            ok(res === "hello" || res === "name");
        }
    });

    function eql(a, b, c) { expect(a).eql(b, c); }
    function eq(a, b, c) { expect(a).eq(b, c); }
    function ok(a, m) { expect(a, m).to.be.true; }
    function def(res, m) { expect(res, m).to.not.be.undefined; }
});
