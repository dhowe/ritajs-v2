const Errors = require('antlr4/error/Errors');
const { ErrorListener } = require('antlr4/error/ErrorListener');

function LexerErrorHandler() {
	Errors.ParseCancellationException.call(this);
	return this;
}

LexerErrorHandler.prototype = Object.create(Errors.ParseCancellationException.prototype);
LexerErrorHandler.prototype.constructor = LexerErrorHandler;
LexerErrorHandler.prototype.syntaxError = function(recognizer, offendingSymbol, line, column, msg, e) {
	//let tokens = recognizer.atn.getExpectedTokens(recognizer.state, recognizer._ctx).toString(recognizer.literalNames, recognizer.symbolicNames);
	//throw Error("Lexer failed on " + offendingSymbol + ", expected: " + tokens, Object.keys(offendingSymbol));
	throw Error("Lexer failed on line " + line + ":" + column + " " + msg);
};

function ParserErrorListener() {
	ErrorListener.call(this);
	return this;
}

ParserErrorListener.prototype = Object.create(ErrorListener.prototype);
ParserErrorListener.prototype.constructor = ParserErrorListener;
ParserErrorListener.INSTANCE = new ParserErrorListener();


ParserErrorListener.prototype.syntaxError = function(recognizer, offendingSymbol, line, column, msg, e) {
	throw Error("Parser failed at line " + line + ":" + column + " " + msg);
};

module.exports.LexerErrors = LexerErrorHandler;
module.exports.ParserErrors = ParserErrorListener;
