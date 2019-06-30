const Errors = require('antlr4/error/Errors');

function ErrorHandler() {
	Errors.ParseCancellationException.call(this);
	return this;
}

ErrorHandler.prototype = Object.create(Errors.ParseCancellationException.prototype);
ErrorHandler.prototype.constructor = ErrorHandler;
ErrorHandler.prototype.syntaxError = function(recognizer, offendingSymbol, line, column, msg, e)
{
	let tokens = recognizer.atn.getExpectedTokens(recognizer.state, recognizer._ctx).toString(recognizer.literalNames, recognizer.symbolicNames);
	throw Error("Failed on "+offendingSymbol+ ", expected: " + tokens, Object.keys(offendingSymbol));
};

module.exports = ErrorHandler;
