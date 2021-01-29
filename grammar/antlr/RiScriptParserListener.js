// Generated from grammar/RiScriptParser.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by RiScriptParser.
function RiScriptParserListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

RiScriptParserListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
RiScriptParserListener.prototype.constructor = RiScriptParserListener;

// Enter a parse tree produced by RiScriptParser#script.
RiScriptParserListener.prototype.enterScript = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#script.
RiScriptParserListener.prototype.exitScript = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#expr.
RiScriptParserListener.prototype.enterExpr = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#expr.
RiScriptParserListener.prototype.exitExpr = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#link.
RiScriptParserListener.prototype.enterLink = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#link.
RiScriptParserListener.prototype.exitLink = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#cexpr.
RiScriptParserListener.prototype.enterCexpr = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#cexpr.
RiScriptParserListener.prototype.exitCexpr = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#cond.
RiScriptParserListener.prototype.enterCond = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#cond.
RiScriptParserListener.prototype.exitCond = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#weight.
RiScriptParserListener.prototype.enterWeight = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#weight.
RiScriptParserListener.prototype.exitWeight = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#url.
RiScriptParserListener.prototype.enterUrl = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#url.
RiScriptParserListener.prototype.exitUrl = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#choice.
RiScriptParserListener.prototype.enterChoice = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#choice.
RiScriptParserListener.prototype.exitChoice = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#assign.
RiScriptParserListener.prototype.enterAssign = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#assign.
RiScriptParserListener.prototype.exitAssign = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#chars.
RiScriptParserListener.prototype.enterChars = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#chars.
RiScriptParserListener.prototype.exitChars = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#dynamic.
RiScriptParserListener.prototype.enterDynamic = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#dynamic.
RiScriptParserListener.prototype.exitDynamic = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#symbol.
RiScriptParserListener.prototype.enterSymbol = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#symbol.
RiScriptParserListener.prototype.exitSymbol = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#wexpr.
RiScriptParserListener.prototype.enterWexpr = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#wexpr.
RiScriptParserListener.prototype.exitWexpr = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#transform.
RiScriptParserListener.prototype.enterTransform = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#transform.
RiScriptParserListener.prototype.exitTransform = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#op.
RiScriptParserListener.prototype.enterOp = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#op.
RiScriptParserListener.prototype.exitOp = function(ctx) {
};



exports.RiScriptParserListener = RiScriptParserListener;