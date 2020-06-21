const Errors = require('antlr4/error/Errors');
const { ErrorListener } = require('antlr4/error/ErrorListener');

// TMP: waiting on fix in antlr4 ------------------------------
function ParseCancellationEx() {
	if (!!Error.captureStackTrace) {
		Error.captureStackTrace(this, Errors.RecognitionException);
	} else {
		var stack = new Error().stack;
	}
	return this;
}
ParseCancellationEx.prototype = Object.create(Error.prototype);
ParseCancellationEx.prototype.constructor = ParseCancellationEx;
// ------------------------------------------------------------

function LexerErrorHandler() {
	ParseCancellationEx.call(this);  // remove after fix
	//Errors.ParseCancellationException.call(this); // uncomment after fix
	return this;
}
LexerErrorHandler.prototype = Object.create(ParseCancellationEx.prototype); // remove after fix
//LexerErrorHandler.prototype = Object.create(Errors.ParseCancellationException.prototype); // uncomment after fix
LexerErrorHandler.prototype.constructor = LexerErrorHandler;
LexerErrorHandler.prototype.syntaxError = function(recognizer, offendingSymbol, line, column, msg, e) {
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
