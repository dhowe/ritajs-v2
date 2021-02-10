// Generated from grammar/RiScriptParser.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by RiScriptParser.

function RiScriptParserVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

RiScriptParserVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
RiScriptParserVisitor.prototype.constructor = RiScriptParserVisitor;

// Visit a parse tree produced by RiScriptParser#script.
RiScriptParserVisitor.prototype.visitScript = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#line.
RiScriptParserVisitor.prototype.visitLine = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#expr.
RiScriptParserVisitor.prototype.visitExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#choice.
RiScriptParserVisitor.prototype.visitChoice = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#assign.
RiScriptParserVisitor.prototype.visitAssign = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#chars.
RiScriptParserVisitor.prototype.visitChars = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#dynamic.
RiScriptParserVisitor.prototype.visitDynamic = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#symbol.
RiScriptParserVisitor.prototype.visitSymbol = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by RiScriptParser#transform.
RiScriptParserVisitor.prototype.visitTransform = function(ctx) {
  return this.visitChildren(ctx);
};



exports.RiScriptParserVisitor = RiScriptParserVisitor;