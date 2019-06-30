const expect = require('chai').expect;
const antlr4 = require('antlr4');
const Errors = require('../errors');
const Visitor = require('../visitor');
const Lexer = require('../lib/RitaScriptLexer');
const Parser = require('../lib/RitaScriptParser');


let parse = function (input, context, showParse) {

  let stream = new antlr4.InputStream(input);
  let lexer = new Lexer.RitaScriptLexer(stream);
  lexer.strictMode = false;

  let tokens = new antlr4.CommonTokenStream(lexer);
  let parser = new Parser.RitaScriptParser(tokens);
  parser.removeErrorListeners();
  parser.addErrorListener(new Errors());

  let tree = parser.script();
  if (showParse) console.log(tree.toStringTree(parser.ruleNames));
  return new Visitor(context).start(tree);
};

describe('Parser Tests', function () {

  describe('Parse Transforms', function () {
    it('Should throw on bad transforms', function () {
      expect(() => parse('a.toUpperCase()')).to.throw();
    });

    it('Should correctly parse/execute transforms', function () {
      //expect(parse('(a).toUpperCase()')).eq('a');

      // TODO: working here

    });
  });

  describe('Parse Symbols', function () {

    it('Should throw on bad symbols', function () {
      expect(() => parse('$')).to.throw();
    });

    it('Should correctly parse/resolve symbols', function () {
      expect(parse('a $dog', { dog: 'terrier' })).eq('a terrier');
      expect(parse('I ate the $dog', { dog: 'beagle' }, 0)).eq('I ate the beagle');
      //expect(parse('I ate the $dog.', { dog: 'lab' }, 0)).eq('I ate the lab.');
    });
  });

  describe('Parse Choices', function () {

    it('Should throw on bad choices', function () {

      expect(() => parse('|')).to.throw();
      expect(() => parse('a |')).to.throw();
      expect(() => parse('(|)')).to.throw();
      expect(() => parse('a | b')).to.throw();
      expect(() => parse('a | b | c')).to.throw();
      expect(() => parse('(a | b) | c')).to.throw();
    });

    it('Should correctly parse/select choices', function () {
      expect(parse('(a)')).eq('a');
      expect(parse('(a | a)')).eq('a');
      expect(parse('(a | )')).to.be.oneOf(['a', '']);
      expect(parse('(a | b)')).to.be.oneOf(['a', 'b']);
      expect(parse('(a | b | c)'), {}, 1).to.be.oneOf(['a', 'b', 'c']);
      expect(parse('(a | (b | c) | d)')).to.be.oneOf(['a', 'b', 'c', 'd']);
    });
  });
});
