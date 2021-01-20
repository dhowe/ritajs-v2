// Generated from grammar/RiScript.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by RiScriptParser.

function RiScriptVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

RiScriptVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
RiScriptVisitor.prototype.constructor = RiScriptVisitor;

// Visit a parse tree produced by RiScriptParser#script.
RiScriptVisitor.prototype.visitScript = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#expr.
RiScriptVisitor.prototype.visitExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#cexpr.
RiScriptVisitor.prototype.visitCexpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#cond.
RiScriptVisitor.prototype.visitCond = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#weight.
RiScriptVisitor.prototype.visitWeight = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#choice.
RiScriptVisitor.prototype.visitChoice = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#assign.
RiScriptVisitor.prototype.visitAssign = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#chars.
RiScriptVisitor.prototype.visitChars = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#symbol.
RiScriptVisitor.prototype.visitSymbol = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#wexpr.
RiScriptVisitor.prototype.visitWexpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#transform.
RiScriptVisitor.prototype.visitTransform = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#op.
RiScriptVisitor.prototype.visitOp = function(ctx) {
  return this.visitChildren(ctx);
};



exports.RiScriptVisitor = RiScriptVisitor;