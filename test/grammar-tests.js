
describe('RiTa.RiGrammar', () => {

    if (typeof module !== 'undefined') require('./before');

    const ST = { silent: 1 }, TT = { trace: 1 }, SP = { singlePass: 1 }, TLP = { trace: 1, traceLex: 1 };
    const RiGrammar = RiTa.RiGrammar;

    let sentences1 = {
        "start": "$noun_phrase $verb_phrase.",
        "noun_phrase": "$determiner $noun",
        "verb_phrase": "($verb | $verb $noun_phrase)",
        "determiner": "(a | the)",
        "noun": "(woman | man)",
        "verb": "shoots"
    };

    let sentences2 = {
        "start": "$noun_phrase $verb_phrase.",
        "noun_phrase": "$determiner $noun",
        "determiner": ["a", "the"],
        "verb_phrase": ["$verb $noun_phrase", "$verb"],
        "noun": ["woman", "man"],
        "verb": "shoots"
    };

    let sentences3 = {
        "start": "$noun_phrase $verb_phrase.",
        "noun_phrase": "$determiner $noun",
        "verb_phrase": "$verb | $verb $noun_phrase",
        "determiner": "a | the",
        "noun": "woman | man",
        "verb": "shoots"
    };

    let grammars = [sentences1, sentences2, sentences3];

    it('should call constructor', () => {
        ok(typeof new RiGrammar() !== 'undefined');
    });

    it('should call constructorJSON', () => {

        let json = JSON.stringify(sentences1);

        let gr1 = new RiGrammar(json);
        ok(gr1 instanceof RiGrammar);

        let gr2 = RiGrammar.fromJSON(json);
        ok(gr2 instanceof RiGrammar);

        let gr3 = RiTa.grammar(json);
        ok(gr3 instanceof RiGrammar);

        ok(gr1.toString() === gr2.toString(), 'FAIL\n' + gr1 + '\n' + gr2+ '\n');
        ok(gr2.toString() === gr3.toString(), 'FAIL\n' + gr1 + '\n' + gr2+ '\n');
    });

    it("should call static expand", () => {
        let rg = new RiGrammar();
        rg.addRule("$start", "pet");
        eq(rg.expand(), "pet");
        rg = new RiGrammar();
        rg.addRule("$start", "$pet");
        rg.addRule("$pet", "dog");
        eq(rg.expand(), "dog");
    });

    it("should call static expandFrom", () => {
        let rg = new RiGrammar();
        rg.addRule("$start", "$pet");
        rg.addRule("$pet", "($bird | $mammal)");
        rg.addRule("$bird", "(hawk | crow)");
        rg.addRule("$mammal", "dog");
        eq(rg.expand("$mammal"), "dog");
        for (let i = 0; i < 30; i++) {
            let res = rg.expand("$bird");
            ok(res === "hawk" || res === 'crow');
        }
    });


    it('should handle phrase transforms', () => {
        let g = {
            "start": "(&x=$y b).ucf()",
            "y": "(a | a)",
        };
        expect(new RiGrammar(g).expand()).eq("A b");

        let h = {
            "start": "($x=$y c).uc()",
            "y": "(a | b)",
        };
        let results = {}, rg = new RiGrammar(h);
        for (let i = 0; i < 10; i++) {
            let res = rg.expand();
            //console.log(i + ") " + res);
            expect(/[AB] C/.test(res)).eq(true);
            results[res] = results[res] + 1 || 1;
        }
        expect(Object.keys(results).length).eq(2);
    });

    it('Should support seq() transforms', () => {
        let opts = ['a', 'b', 'c', 'd'];
        let rule = '(' + opts.join('|') + ').seq()';
        let rs = new RiGrammar({ start: rule });
        for (let i = 0; i < opts.length; i++) {
            let res = rs.expand();
            //console.log(i, ':', res);
            expect(res).eq(opts[i]);
        }

        rule = '(' + opts.join('|') + ').seq().capitalize()';
        rs = new RiGrammar({ start: rule });
        for (let i = 0; i < opts.length; i++) {
            let res = rs.expand();
            // console.log(i, ':', res);
            expect(res).eq(opts[i].toUpperCase());
        }
    });

    it('Should support rseq() transforms', () => {
        let opts = ['a', 'b', 'c', 'd'], result = [];
        let rule = '(' + opts.join('|') + ').rseq()';
        let rs = new RiGrammar({ start: rule });
        for (let i = 0; i < opts.length; i++) {
            let res = rs.expand();
            //console.log(i, ':', res);
            result.push(res);
        }
        expect(result).to.have.members(opts);

        rule = '(' + opts.join('|') + ').rseq().capitalize()';
        rs = new RiGrammar({ start: rule });
        result = [];
        for (let i = 0; i < opts.length; i++) {
            let res = rs.expand();
            //console.log(i, ':', res);
            result.push(res);
        }
        expect(result).to.have.members(opts.map(o => o.toUpperCase()));
    });

    it('Should allow rules starting with numbers', () => {
        let rg, rs;

        rg = new RiGrammar({
            "start": "$1line talks too much.",
            "1line": "Dave | Jill | Pete"
        });
        rs = rg.expand({ trace: 0 });
        expect(rs).to.be.oneOf(["Dave talks too much.", "Jill talks too much.", "Pete talks too much."]);

        rg = new RiGrammar({
            "1line": "Dave | Jill | Pete"
        });
        rs = rg.expand("1line", { trace: 0 });
        expect(rs).to.be.oneOf(["Dave", "Jill", "Pete"]);
    });

    it('Should allow static rules starting with numbers', () => {
        let rg, rs;

        rg = new RiGrammar({
            "$start": "$1line talks too much.",
            "$1line": "Dave | Jill | Pete"
        });
        rs = rg.expand({ trace: 0 });
        expect(rs).to.be.oneOf(["Dave talks too much.", "Jill talks too much.", "Pete talks too much."]);

        rg = new RiGrammar({
            "$1line": "Dave | Jill | Pete"
        });
        rs = rg.expand("$1line", { trace: 0 });
        expect(rs).to.be.oneOf(["Dave", "Jill", "Pete"]);

        rs = rg.expand("1line", { trace: 0 });
        expect(rs).to.be.oneOf(["Dave", "Jill", "Pete"]);
    });

    it("should call addRules", () => {

        let rg = new RiGrammar();
        ok(typeof rg.rules !== 'undefined');
        ok(typeof rg.rules['&start'] === 'undefined');
        ok(typeof rg.rules['&noun_phrase'] === 'undefined');

        grammars.forEach(g => { // as JS objects
            rg.addRules(g);
            ok(typeof rg.rules !== 'undefined');
            ok(typeof rg.rules['&start'] !== 'undefined');
            ok(typeof rg.rules['&noun_phrase'] !== 'undefined');
            ok(rg.expand().length > 0);
        });

        grammars.forEach(g => { // as JSON strings
            rg = RiGrammar.fromJSON(JSON.stringify(g));
            ok(typeof rg.rules !== 'undefined');
            ok(typeof rg.rules['&start'] !== 'undefined');
            ok(typeof rg.rules['&noun_phrase'] !== 'undefined');
            ok(rg.expand().length > 0);
        });
    });

    it("should call addRule", () => {
        let rg = new RiGrammar();
        rg.addRule("start", "$pet");
        ok(typeof rg.rules["&start"] !== 'undefined');
        rg.addRule("start", "$dog", .3);
        ok(typeof rg.rules["&start"] !== 'undefined');
    });

    it("should call removeRule", () => {

        grammars.forEach(g => {
            let rg1 = new RiGrammar(g);
            def(rg1.rules['&start']);
            def(rg1.rules['&noun_phrase']);

            rg1.removeRule('noun_phrase');
            def(!rg1.rules['&noun_phrase']);

            rg1.removeRule('start');
            def(!rg1.rules['&start']);

            rg1.removeRule('');
            rg1.removeRule('bad-name');
            rg1.removeRule(null);
            rg1.removeRule(undefined);
        });
    });

    it("should call static removeRule", () => {

        let rg = new RiGrammar();
        rg.addRule("start", "$pet");
        rg.addRule("$pet", "($bird | $mammal)");
        rg.addRule("$bird", "(hawk | crow)");
        rg.addRule("mammal", "dog");

        def(rg.rules['&start']);
        def(rg.rules['pet']);
        def(rg.rules['bird']);

        rg.removeRule('$pet');
        def(!rg.rules['pet']);

        rg.removeRule('bird');
        def(!rg.rules['bird']);

        rg.removeRule('&start');
        def(!rg.rules['&start']);

        def(rg.rules['&mammal']);
    });

    it("should throw on missing rules", () => {
        let rg = new RiGrammar();
        expect(() => rg.expand()).to.throw();

        rg = new RiGrammar({ start: "My rule" });
        expect(() => rg.expand('bad')).to.throw();
    });

    it("should call expandFrom", () => {
        let rg = new RiGrammar();
        rg.addRule("start", "$pet");
        rg.addRule("pet", "($bird | $mammal)");
        rg.addRule("bird", "(hawk | crow)");
        rg.addRule("mammal", "dog");
        eq(rg.expand("mammal"), "dog");
        for (let i = 0; i < 30; i++) {
            let res = rg.expand("bird");
            ok(res === "hawk" || res === 'crow');
        }
    });

    it("should call toString", () => {
        let rg = new RiGrammar({ "start": "pet" });
        eq(rg.toString(), '{\n  "&start": "pet"\n}');
        rg = new RiGrammar({ "start": "$pet", "pet": "dog" });
        eq(rg.toString(), '{\n  "&start": "$pet",\n  "&pet": "dog"\n}');
        rg = new RiGrammar({ "start": "$pet | $iphone", "pet": "dog | cat", "iphone": "iphoneSE | iphone12" });
        eq(rg.toString(), '{\n  "&start": "($pet | $iphone)",\n  "&pet": "(dog | cat)",\n  "&iphone": "(iphoneSE | iphone12)"\n}');
        rg = new RiGrammar({ "start": "$pet.articlize()", "pet": "dog | cat" });
        eq(rg.toString(), '{\n  "&start": "$pet.articlize()",\n  "&pet": "(dog | cat)"\n}');

        rg = new RiGrammar({ "start": "$pet.articlize()", "$pet": "dog | cat" }); // static var
        eq(rg.toString(), '{\n  "&start": "$pet.articlize()",\n  "pet": "(dog | cat)"\n}');
    });

    it("should call toString with arg", () => {
        let lb = '<br/>';
        let rg = new RiGrammar({ "start": "pet" });
        eq(rg.toString(lb), '{<br/>  "&start": "pet"<br/>}');
        rg = new RiGrammar({ "start": "$pet", "pet": "dog" });
        eq(rg.toString(lb), '{<br/>  "&start": "$pet",<br/>  "&pet": "dog"<br/>}');
        rg = new RiGrammar({ "start": "$pet | $iphone", "pet": "dog | cat", "iphone": "iphoneSE | iphone12" });
        eq(rg.toString(lb), '{<br/>  "&start": "($pet | $iphone)",<br/>  "&pet": "(dog | cat)",<br/>  "&iphone": "(iphoneSE | iphone12)"<br/>}');
        rg = new RiGrammar({ "start": "$pet.articlize()", "pet": "dog | cat" });
        eq(rg.toString(lb), '{<br/>  "&start": "$pet.articlize()",<br/>  "&pet": "(dog | cat)"<br/>}');

        rg = new RiGrammar({ "start": "$pet.articlize()", "$pet": "dog | cat" }); // static var
        eq(rg.toString(lb), '{<br/>  "&start": "$pet.articlize()",<br/>  "pet": "(dog | cat)"<br/>}');
    });

    it("should call expand", () => {
        let rg = new RiGrammar();
        rg.addRule("start", "pet");
        eq(rg.expand(), "pet");
        rg = new RiGrammar();
        rg.addRule("start", "$pet");
        rg.addRule("pet", "dog");
        eq(rg.expand(), "dog");
    });

    it("should override dynamic default", () => {
        let count = 4;

        // here is the normal (dynamic) behavior
        let rg = new RiGrammar();
        rg.addRule("start", "$rule $rule");
        rg.addRule("rule", "(a|b|c|d|e)");
        let ok = false;
        for (let i = 0; i < count; i++) {
            let parts = rg.expand().split(" ");
            eq(parts.length, 2);
            //console.log(i + ") " + parts[0] + " " + parts[1]);
            if (parts[0] !== parts[1]) {
                ok = true;
                break;
            }
        }
        eq(ok, true);

        // here we OVERRIDE the normal (dynamic) behavior
        rg = new RiGrammar();
        rg.addRule("start", "$rule $rule");
        rg.addRule("$rule", "(a|b|c|d|e)");
        ok = false;
        for (let i = 0; i < count; i++) {
            let parts = rg.expand().split(" ");
            eq(parts.length, 2);
            //console.log(i + ") " + parts[0] + " " + parts[1]);
            expect(parts[0]).eq(parts[1]);
        }
    });

    it("should call expand.weights", () => {
        let rg = new RiGrammar();
        rg.addRule("start", "$rule1");
        rg.addRule("rule1", "cat | dog | boy");
        let found1 = false;
        let found2 = false;
        let found3 = false;
        for (let i = 0; i < 30; i++) {
            let res = rg.expand();
            ok(res === ("cat") || res === ("dog") || res === ("boy"));
            if (res === ("cat")) found1 = true;
            else if (res === ("dog")) found2 = true;
            else if (res === ("boy")) found3 = true;
        }
        ok(found1 && found2 && found3); // found all
    });

    it("should call expandFrom.weights", () => {

        let rg = new RiGrammar();
        rg.addRule("start", "$pet");
        rg.addRule("pet", "$bird [9] | $mammal");
        rg.addRule("bird", "hawk");
        rg.addRule("mammal", "dog");

        eq(rg.expand("mammal"), "dog");

        let hawks = 0, dogs = 0;
        for (let i = 0; i < 100; i++) {
            let res = rg.expand("pet");
            ok(res === "hawk" || res === 'dog', 'got ' + res);
            if (res == "dog") dogs++;
            if (res == "hawk") hawks++;
        }
        ok(hawks > dogs * 2), 'got h=' + hawks + ', ' + dogs;
    });

    it("should call static addRule", () => {
        let rg = RiTa.grammar();
        rg.addRule("$start", "$pet");
        ok(typeof rg.rules["start"] !== 'undefined');
        rg.addRule("$start", "$dog", .3);
        ok(typeof rg.rules["start"] !== 'undefined');
    });

    it("should call expandFrom.weights.nodyn", () => {

        let rg = RiTa.grammar();
        rg.addRule("start", "$pet $pet");
        rg.addRule("$pet", "$bird [9] | $mammal");
        rg.addRule("bird", "hawk");
        rg.addRule("mammal", "dog");

        eq(rg.expand("mammal"), "dog");

        let hawks = 0, dogs = 0;
        for (let i = 0; i < 10; i++) {
            let res = rg.expand("start");
            ok(res === "hawk hawk" || res === 'dog dog', 'got ' + res);
            if (res == "dog dog") dogs++;
            if (res == "hawk hawk") hawks++;
        }
        ok(hawks > dogs * 2), 'got h=' + hawks + ', ' + dogs;
    });

    it("should handle transforms", () => {
        let rg = RiTa.grammar();
        rg.addRule("start", "$pet.toUpperCase()");
        rg.addRule("pet", "dog");
        eq(rg.expand(), "DOG");

        rg = RiTa.grammar();
        rg.addRule("start", "($pet | $animal)");
        rg.addRule("animal", "$pet");
        rg.addRule("pet", "(dog).toUpperCase()");
        eq(rg.expand(), "DOG");

        rg = RiTa.grammar();
        rg.addRule("start", "($pet | $animal)");
        rg.addRule("animal", "$pet");
        rg.addRule("pet", "(ant).articlize()");
        eq(rg.expand(), "an ant");

        rg = RiTa.grammar();
        rg.addRule("start", "(a | a).uc()");
        eq(rg.expand(), "A");

        rg = RiTa.grammar();
        rg.addRule("start", "($pet | $animal).articlize().ucf()");
        rg.addRule("animal", "$pet");
        rg.addRule("pet", "ant");
        eq(rg.expand(), "An ant");
    });

    it("should handle transforms on statics", () => {
        let rg = RiTa.grammar();
        rg.addRule("$start", "$pet.toUpperCase()");
        rg.addRule("$pet", "dog");
        eq(rg.expand(), "DOG");

        rg = RiTa.grammar();
        rg.addRule("$start", "($pet | $animal)");
        rg.addRule("$animal", "$pet");
        rg.addRule("$pet", "(dog).toUpperCase()");
        eq(rg.expand(), "DOG");

        rg = RiTa.grammar();
        rg.addRule("$start", "($pet | $animal)");
        rg.addRule("$animal", "$pet");
        rg.addRule("$pet", "(ant).articlize()");
        eq(rg.expand(), "an ant");

        rg = RiTa.grammar();
        rg.addRule("start", "(a | a).uc()");
        eq(rg.expand(), "A");

        rg = RiTa.grammar();
        rg.addRule("$start", "($pet | $animal).articlize().ucf()");
        rg.addRule("$animal", "$pet");
        rg.addRule("$pet", "ant");
        eq(rg.expand(), "An ant");

        rg = RiTa.grammar();
        rg.addRule("$start", "($animal $animal).ucf()");
        rg.addRule("$animal", "ant | eater");
        rg.addRule("$pet", "ant");
        for (let i = 0; i < 10; i++) {
            expect(rg.expand()).to.be.oneOf(["Ant ant", "Eater eater"]);
        }
    });

    it("should allow context in expand on statics", () => {
        let ctx, rg;
        ctx = { randomPosition: () => 'job type' };
        rg = RiTa.grammar({ $start: "My .randomPosition()." });
        expect(rg.expand(ctx)).eq("My job type.");

        ctx = { randomPosition: () => 'job type' };
        rg = RiTa.grammar({ $stat: "My .randomPosition()." });
        expect(rg.expand('stat', ctx)).eq("My job type.");
    });

    it("should resolve rules in context", () => {
        let ctx, rg;
        ctx = { rule: '(job | mob)' };
        rg = RiTa.grammar({ $start: "$rule $rule" });
        expect(rg.expand(ctx)).to.be.oneOf(['job job','mob mob']);

        ctx = {};
        ctx['&rule'] = '(job | mob)'; // dynamic
        rg = RiTa.grammar({ $start: "$rule $rule" });
        expect(/^[jm]ob [jm]ob$/.test(rg.expand(ctx))).eq(true);
    });

    it("should handle custom transforms on statics", () => {
        let context = { randomPosition: () => 'job type' };
        let rg = RiTa.grammar({ $start: "My .randomPosition()." }, context);
        expect(rg.expand()).eq("My job type.");
    });

    it("should allow context in expand", () => {
        let ctx, rg;
        ctx = { randomPosition: () => 'job type' };
        rg = RiTa.grammar({ start: "My .randomPosition()." });
        expect(rg.expand(ctx)).eq("My job type.");

        ctx = { randomPosition: () => 'job type' };
        rg = RiTa.grammar({ stat: "My .randomPosition()." });
        expect(rg.expand('stat', ctx)).eq("My job type.");
    });

    it("should handle custom transforms", () => {
        let context = { randomPosition: () => 'job type' };
        let rg = RiTa.grammar({ start: "My .randomPosition()." }, context);
        expect(rg.expand()).eq("My job type.");
    });

    it("should handle symbol transforms", () => {
        let rg;
        rg = new RiGrammar({
            start: "$tmpl",
            tmpl: "$jrSr.capitalize()",
            jrSr: "(junior|junior)"
        });
        eq(rg.expand({ trace: 0 }), "Junior");

        rg = new RiGrammar({
            start: "$r.capitalize()",
            r: "(a|a)"
        });
        eq(rg.expand({ trace: 0 }), "A");
        rg = new RiGrammar({
            start: "$r.pluralize()",
            r: "( mouse | mouse )"
        });
        eq(rg.expand({ trace: 0 }), "mice");
    });

    it("should handle symbol transforms on statics", () => {
        let rg;
        rg = new RiGrammar({
            $start: "$tmpl",
            $tmpl: "$jrSr.capitalize()",
            $jrSr: "(junior|junior)"
        });
        eq(rg.expand({ trace: 0 }), "Junior");

        rg = new RiGrammar({
            $start: "$r.capitalize()",
            $r: "(a|a)"
        });
        eq(rg.expand({ trace: 0 }), "A");

        rg = new RiGrammar({
            $start: "$r.pluralize() $r",
            $r: "( mouse | ant )"
        });
        expect(rg.expand({ trace: 1 })).to.be.oneOf(["mice mouse", "ants ant"]);
    });

    it("should handle special characters", () => {
        let rg, res, s;

        s = "{ \"start\": \"hello &#124; name\" }";
        rg = RiGrammar.fromJSON(s);
        res = rg.expand();
        //console.log(res);
        ok(res === "hello | name");

        s = "{ \"start\": \"hello: name\" }";
        rg = RiGrammar.fromJSON(s);
        res = rg.expand();
        ok(res === "hello: name");

        s = "{ \"start\": \"&#8220;hello!&#8221;\" }";
        rg = RiGrammar.fromJSON(s);

        s = "{ \"start\": \"&lt;start&gt;\" }";
        rg = RiGrammar.fromJSON(s);
        res = rg.expand();
        //console.log(res);
        ok(res === "<start>");

        s = "{ \"start\": \"I don&#96;t want it.\" }";
        rg = RiGrammar.fromJSON(s);
        res = rg.expand();
        //console.log(res);
        ok(res === "I don`t want it.");

        s = "{ \"start\": \"&#39;I really don&#39;t&#39;\" }";
        rg = RiGrammar.fromJSON(s);
        res = rg.expand();
        ok(res === "'I really don't'");

        s = "{ \"start\": \"hello | name\" }";
        rg = RiGrammar.fromJSON(s);
        for (let i = 0; i < 10; i++) {
            res = rg.expand();
            ok(res === "hello" || res === "name");
        }
    });

    it("should handle special characters with statics", () => {
        let rg, res, s;

        s = "{ \"$start\": \"hello &#124; name\" }";
        rg = RiGrammar.fromJSON(s);
        res = rg.expand();
        //console.log(res);
        ok(res === "hello | name");

        s = "{ \"$start\": \"hello: name\" }";
        rg = RiGrammar.fromJSON(s);
        res = rg.expand();
        ok(res === "hello: name");

        s = "{ \"$start\": \"&#8220;hello!&#8221;\" }";
        rg = RiGrammar.fromJSON(s);

        s = "{ \"$start\": \"&lt;start&gt;\" }";
        rg = RiGrammar.fromJSON(s);
        res = rg.expand();
        //console.log(res);
        ok(res === "<start>");

        s = "{ \"$start\": \"I don&#96;t want it.\" }";
        rg = RiGrammar.fromJSON(s);
        res = rg.expand();
        //console.log(res);
        ok(res === "I don`t want it.");

        s = "{ \"$start\": \"&#39;I really don&#39;t&#39;\" }";
        rg = RiGrammar.fromJSON(s);
        res = rg.expand();
        ok(res === "'I really don't'");

        s = "{ \"$start\": \"hello | name\" }";
        rg = RiGrammar.fromJSON(s);
        for (let i = 0; i < 10; i++) {
            res = rg.expand();
            ok(res === "hello" || res === "name");
        }
    });

    it("should call to/from JSON", () => {
        let json = { "start": "$pet $iphone", "pet": "(dog | cat)", "iphone": "(iphoneSE | iphone12)" };
        let rg = new RiGrammar(json);
        let generatedJSON = rg.toJSON();
        let rg2 = RiGrammar.fromJSON(generatedJSON);
        ok(rg2 !== 'undefined');
        expect(rg.toString()).eq(rg2.toString());
        expect(rg.context).eql(rg2.context);
        expect(rg.rules).eql(rg2.rules);
        expect(rg).eql(rg2);

        /*  grammars.forEach(g => { KnownIssues-Java
            rg = RiGrammar.fromJSON(g);
            rg2 = RiGrammar.fromJSON(rg.toJSON());
            ok(rg2.toString() === rg.toString());
            assertTrue(rg == rg2);
        }); */
    });


    it("should call to/from JSON with statics", () => {
        let json = '{ "$start": "$pet $iphone", "$pet": "(dog | cat)", "$iphone": "(iphoneSE | iphone12)" }';
        let rg = new RiGrammar(json);
        let generatedJSON = rg.toJSON();
        console.log("\n"+generatedJSON);
        // WORKING HERE: last failing test, then back to riscript-tests, adding dynamics variations to each

        let rg2 = RiGrammar.fromJSON(generatedJSON);

        expect(rg.toString()).eq(rg2.toString());
        expect(rg.context).eql(rg2.context);
        expect(rg.rules).eql(rg2.rules);
        expect(rg).eql(rg2);
    });

    it('Should correctly pluralize phrases', () => {
        let json = { start: "($state feeling).pluralize()", state: "(bad | bad)" };
        let rg = new RiGrammar(json);
        let res = rg.expand();
        eql(res, "bad feelings");
    });

    it('Should correctly pluralize static phrases', () => {
        let json = { $start: "($state feeling).pluralize()", $state: "(bad | bad)" };
        let rg = new RiGrammar(json);
        let res = rg.expand();
        eql(res, "bad feelings");
    });

    function eql(a, b, c) { expect(a).eql(b, c); }
    function eq(a, b, c) { expect(a).eq(b, c); }
    function ok(a, m) { expect(a, m).to.be.true; }
    function def(res, m) { expect(res, m).to.not.be.undefined; }
});
