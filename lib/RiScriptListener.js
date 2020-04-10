// Generated from grammar/RiScript.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by RiScriptParser.
function RiScriptListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

RiScriptListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
RiScriptListener.prototype.constructor = RiScriptListener;

// Enter a parse tree produced by RiScriptParser#script.
RiScriptListener.prototype.enterScript = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#script.
RiScriptListener.prototype.exitScript = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#expr.
RiScriptListener.prototype.enterExpr = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#expr.
RiScriptListener.prototype.exitExpr = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#cond.
RiScriptListener.prototype.enterCond = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#cond.
RiScriptListener.prototype.exitCond = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#weight.
RiScriptListener.prototype.enterWeight = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#weight.
RiScriptListener.prototype.exitWeight = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#choice.
RiScriptListener.prototype.enterChoice = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#choice.
RiScriptListener.prototype.exitChoice = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#inline.
RiScriptListener.prototype.enterInline = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#inline.
RiScriptListener.prototype.exitInline = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#assign.
RiScriptListener.prototype.enterAssign = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#assign.
RiScriptListener.prototype.exitAssign = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#chars.
RiScriptListener.prototype.enterChars = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#chars.
RiScriptListener.prototype.exitChars = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#symbol.
RiScriptListener.prototype.enterSymbol = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#symbol.
RiScriptListener.prototype.exitSymbol = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#wexpr.
RiScriptListener.prototype.enterWexpr = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#wexpr.
RiScriptListener.prototype.exitWexpr = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#transform.
RiScriptListener.prototype.enterTransform = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#transform.
RiScriptListener.prototype.exitTransform = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#op.
RiScriptListener.prototype.enterOp = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#op.
RiScriptListener.prototype.exitOp = function(ctx) {
};



exports.RiScriptListener = RiScriptListener;