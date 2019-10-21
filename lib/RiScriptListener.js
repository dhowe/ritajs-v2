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


// Enter a parse tree produced by RiScriptParser#transform.
RiScriptListener.prototype.enterTransform = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#transform.
RiScriptListener.prototype.exitTransform = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#ident.
RiScriptListener.prototype.enterIdent = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#ident.
RiScriptListener.prototype.exitIdent = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#symbol.
RiScriptListener.prototype.enterSymbol = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#symbol.
RiScriptListener.prototype.exitSymbol = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#choice.
RiScriptListener.prototype.enterChoice = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#choice.
RiScriptListener.prototype.exitChoice = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#assign.
RiScriptListener.prototype.enterAssign = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#assign.
RiScriptListener.prototype.exitAssign = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#value.
RiScriptListener.prototype.enterValue = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#value.
RiScriptListener.prototype.exitValue = function(ctx) {
};


// Enter a parse tree produced by RiScriptParser#expr.
RiScriptListener.prototype.enterExpr = function(ctx) {
};

// Exit a parse tree produced by RiScriptParser#expr.
RiScriptListener.prototype.exitExpr = function(ctx) {
};



exports.RiScriptListener = RiScriptListener;