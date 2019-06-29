const expect = require('chai').expect;
const antlr4 = require('antlr4');
const Lexer = require('../lib/RitaScriptLexer.js');
const Parser = require('../lib/RitaScriptParser.js');
const Visitor = require('../visitor.js');

let parse = function (input, context, showParse) {
  let stream = new antlr4.InputStream(input);
  let lexer = new Lexer.RitaScriptLexer(stream);
  lexer.strictMode = false;

  let tokens = new antlr4.CommonTokenStream(lexer);
  let parser = new Parser.RitaScriptParser(tokens);
  parser.removeErrorListeners();
  parser.addErrorListener(new antlr4.error.BailErrorStrategy());

  let tree = parser.script();
  if (showParse) console.log(tree.toStringTree(parser.ruleNames));
  return tree ? new Visitor(context).start(tree) : undefined;
};

describe('Parser Tests', function () {

  describe('Parse Choices', function () {

    it('Should throw on bad inputs', function () {

      expect(() => parse('|')).to.throw();
      expect(() => parse('a |')).to.throw();
      expect(() => parse('(|)')).to.throw();
      expect(() => parse('a | b')).to.throw();
      expect(() => parse('a | b | c')).to.throw();
      expect(() => parse('(a | b) | c')).to.throw();
    });

    it('Should parse choices and select randomly', function () {
      expect(parse('(a)')).eq('a');
      expect(parse('(a | a)')).eq('a');
      expect(parse('(a | )')).to.be.oneOf(['a', '']);
      expect(parse('(a | b)')).to.be.oneOf(['a', 'b']);
      expect(parse('(a | b | c)'), {}, 1).to.be.oneOf(['a', 'b', 'c']);
      expect(parse('(a | (b | c) | d)')).to.be.oneOf(['a', 'b', 'c', 'd']);
    });
  });
});
