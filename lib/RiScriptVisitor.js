// Generated from grammar/RiScript.g4 by ANTLR 4.7.1
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


// Visit a parse tree produced by RiScriptParser#transform.
RiScriptVisitor.prototype.visitTransform = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#ident.
RiScriptVisitor.prototype.visitIdent = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#symbol.
RiScriptVisitor.prototype.visitSymbol = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#choice.
RiScriptVisitor.prototype.visitChoice = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#inline.
RiScriptVisitor.prototype.visitInline = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#assign.
RiScriptVisitor.prototype.visitAssign = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#weight.
RiScriptVisitor.prototype.visitWeight = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#num.
RiScriptVisitor.prototype.visitNum = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#expr.
RiScriptVisitor.prototype.visitExpr = function(ctx) {
  return this.visitChildren(ctx);
};



exports.RiScriptVisitor = RiScriptVisitor;