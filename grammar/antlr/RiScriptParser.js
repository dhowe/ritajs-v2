// Generated from grammar/RiScriptParser.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');
var RiScriptParserListener = require('./RiScriptParserListener').RiScriptParserListener;
var RiScriptParserVisitor = require('./RiScriptParserVisitor').RiScriptParserVisitor;

var grammarFileName = "RiScriptParser.g4";


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003!\u00c3\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0003",
    "\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0007\u0002%\n\u0002\f\u0002",
    "\u000e\u0002(\u000b\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0006\u00030\n\u0003\r\u0003\u000e\u0003",
    "1\u0003\u0004\u0007\u00045\n\u0004\f\u0004\u000e\u00048\u000b\u0004",
    "\u0003\u0004\u0003\u0004\u0006\u0004<\n\u0004\r\u0004\u000e\u0004=\u0003",
    "\u0004\u0003\u0004\u0007\u0004B\n\u0004\f\u0004\u000e\u0004E\u000b\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0007\u0005K\n\u0005",
    "\f\u0005\u000e\u0005N\u000b\u0005\u0003\u0005\u0003\u0005\u0007\u0005",
    "R\n\u0005\f\u0005\u000e\u0005U\u000b\u0005\u0003\u0005\u0003\u0005\u0007",
    "\u0005Y\n\u0005\f\u0005\u000e\u0005\\\u000b\u0005\u0003\u0005\u0005",
    "\u0005_\n\u0005\u0003\u0006\u0007\u0006b\n\u0006\f\u0006\u000e\u0006",
    "e\u000b\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0007",
    "\u0006k\n\u0006\f\u0006\u000e\u0006n\u000b\u0006\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0007\u0007t\n\u0007\f\u0007\u000e\u0007w\u000b",
    "\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0007\u0007}",
    "\n\u0007\f\u0007\u000e\u0007\u0080\u000b\u0007\u0003\b\u0003\b\u0005",
    "\b\u0084\n\b\u0003\b\u0003\b\u0003\b\u0003\t\u0003\t\u0003\t\u0003\t",
    "\u0006\t\u008d\n\t\r\t\u000e\t\u008e\u0003\n\u0003\n\u0007\n\u0093\n",
    "\n\f\n\u000e\n\u0096\u000b\n\u0003\u000b\u0003\u000b\u0007\u000b\u009a",
    "\n\u000b\f\u000b\u000e\u000b\u009d\u000b\u000b\u0003\u000b\u0006\u000b",
    "\u00a0\n\u000b\r\u000b\u000e\u000b\u00a1\u0005\u000b\u00a4\n\u000b\u0003",
    "\f\u0005\f\u00a7\n\f\u0003\f\u0005\f\u00aa\n\f\u0003\r\u0003\r\u0003",
    "\r\u0003\r\u0003\r\u0003\r\u0003\r\u0007\r\u00b3\n\r\f\r\u000e\r\u00b6",
    "\u000b\r\u0003\u000e\u0006\u000e\u00b9\n\u000e\r\u000e\u000e\u000e\u00ba",
    "\u0003\u000f\u0003\u000f\u0003\u0010\u0003\u0010\u0005\u0010\u00c1\n",
    "\u0010\u0003\u0010\u0002\u0002\u0011\u0002\u0004\u0006\b\n\f\u000e\u0010",
    "\u0012\u0014\u0016\u0018\u001a\u001c\u001e\u0002\u0004\u0004\u0002\u0005",
    "\u0006\u000e\u0015\u0004\u0002\u0005\u0006\u001a\u001a\u0002\u00d4\u0002",
    "&\u0003\u0002\u0002\u0002\u0004/\u0003\u0002\u0002\u0002\u00066\u0003",
    "\u0002\u0002\u0002\bH\u0003\u0002\u0002\u0002\nc\u0003\u0002\u0002\u0002",
    "\fo\u0003\u0002\u0002\u0002\u000e\u0083\u0003\u0002\u0002\u0002\u0010",
    "\u008c\u0003\u0002\u0002\u0002\u0012\u0090\u0003\u0002\u0002\u0002\u0014",
    "\u00a3\u0003\u0002\u0002\u0002\u0016\u00a6\u0003\u0002\u0002\u0002\u0018",
    "\u00ab\u0003\u0002\u0002\u0002\u001a\u00b8\u0003\u0002\u0002\u0002\u001c",
    "\u00bc\u0003\u0002\u0002\u0002\u001e\u00c0\u0003\u0002\u0002\u0002 ",
    "%\u0005\u0004\u0003\u0002!%\u0005\u0006\u0004\u0002\"%\u0005\u0018\r",
    "\u0002#%\u0007\u0016\u0002\u0002$ \u0003\u0002\u0002\u0002$!\u0003\u0002",
    "\u0002\u0002$\"\u0003\u0002\u0002\u0002$#\u0003\u0002\u0002\u0002%(",
    "\u0003\u0002\u0002\u0002&$\u0003\u0002\u0002\u0002&\'\u0003\u0002\u0002",
    "\u0002\')\u0003\u0002\u0002\u0002(&\u0003\u0002\u0002\u0002)*\u0007",
    "\u0002\u0002\u0003*\u0003\u0003\u0002\u0002\u0002+0\u0005\u0014\u000b",
    "\u0002,0\u0005\f\u0007\u0002-0\u0005\u000e\b\u0002.0\u0005\u0010\t\u0002",
    "/+\u0003\u0002\u0002\u0002/,\u0003\u0002\u0002\u0002/-\u0003\u0002\u0002",
    "\u0002/.\u0003\u0002\u0002\u000201\u0003\u0002\u0002\u00021/\u0003\u0002",
    "\u0002\u000212\u0003\u0002\u0002\u00022\u0005\u0003\u0002\u0002\u0002",
    "35\u0007\u000f\u0002\u000243\u0003\u0002\u0002\u000258\u0003\u0002\u0002",
    "\u000264\u0003\u0002\u0002\u000267\u0003\u0002\u0002\u000279\u0003\u0002",
    "\u0002\u000286\u0003\u0002\u0002\u00029;\u0007\f\u0002\u0002:<\u0005",
    "\b\u0005\u0002;:\u0003\u0002\u0002\u0002<=\u0003\u0002\u0002\u0002=",
    ";\u0003\u0002\u0002\u0002=>\u0003\u0002\u0002\u0002>?\u0003\u0002\u0002",
    "\u0002?C\u0007\r\u0002\u0002@B\u0007\u000f\u0002\u0002A@\u0003\u0002",
    "\u0002\u0002BE\u0003\u0002\u0002\u0002CA\u0003\u0002\u0002\u0002CD\u0003",
    "\u0002\u0002\u0002DF\u0003\u0002\u0002\u0002EC\u0003\u0002\u0002\u0002",
    "FG\u0005\u0004\u0003\u0002G\u0007\u0003\u0002\u0002\u0002HL\u0005\u0014",
    "\u000b\u0002IK\u0007\u000f\u0002\u0002JI\u0003\u0002\u0002\u0002KN\u0003",
    "\u0002\u0002\u0002LJ\u0003\u0002\u0002\u0002LM\u0003\u0002\u0002\u0002",
    "MO\u0003\u0002\u0002\u0002NL\u0003\u0002\u0002\u0002OS\u0005\u001e\u0010",
    "\u0002PR\u0007\u000f\u0002\u0002QP\u0003\u0002\u0002\u0002RU\u0003\u0002",
    "\u0002\u0002SQ\u0003\u0002\u0002\u0002ST\u0003\u0002\u0002\u0002TV\u0003",
    "\u0002\u0002\u0002US\u0003\u0002\u0002\u0002VZ\u0005\u0010\t\u0002W",
    "Y\u0007\u000f\u0002\u0002XW\u0003\u0002\u0002\u0002Y\\\u0003\u0002\u0002",
    "\u0002ZX\u0003\u0002\u0002\u0002Z[\u0003\u0002\u0002\u0002[^\u0003\u0002",
    "\u0002\u0002\\Z\u0003\u0002\u0002\u0002]_\u0007\u0015\u0002\u0002^]",
    "\u0003\u0002\u0002\u0002^_\u0003\u0002\u0002\u0002_\t\u0003\u0002\u0002",
    "\u0002`b\u0007\u000f\u0002\u0002a`\u0003\u0002\u0002\u0002be\u0003\u0002",
    "\u0002\u0002ca\u0003\u0002\u0002\u0002cd\u0003\u0002\u0002\u0002df\u0003",
    "\u0002\u0002\u0002ec\u0003\u0002\u0002\u0002fg\u0007\n\u0002\u0002g",
    "h\u0007\u001d\u0002\u0002hl\u0007\u000b\u0002\u0002ik\u0007\u000f\u0002",
    "\u0002ji\u0003\u0002\u0002\u0002kn\u0003\u0002\u0002\u0002lj\u0003\u0002",
    "\u0002\u0002lm\u0003\u0002\u0002\u0002m\u000b\u0003\u0002\u0002\u0002",
    "nl\u0003\u0002\u0002\u0002ou\u0007\b\u0002\u0002pq\u0005\u0016\f\u0002",
    "qr\u0007\u0019\u0002\u0002rt\u0003\u0002\u0002\u0002sp\u0003\u0002\u0002",
    "\u0002tw\u0003\u0002\u0002\u0002us\u0003\u0002\u0002\u0002uv\u0003\u0002",
    "\u0002\u0002vx\u0003\u0002\u0002\u0002wu\u0003\u0002\u0002\u0002xy\u0005",
    "\u0016\f\u0002yz\u0007\t\u0002\u0002z~\u0003\u0002\u0002\u0002{}\u0005",
    "\u001c\u000f\u0002|{\u0003\u0002\u0002\u0002}\u0080\u0003\u0002\u0002",
    "\u0002~|\u0003\u0002\u0002\u0002~\u007f\u0003\u0002\u0002\u0002\u007f",
    "\r\u0003\u0002\u0002\u0002\u0080~\u0003\u0002\u0002\u0002\u0081\u0084",
    "\u0005\u0012\n\u0002\u0082\u0084\u0005\u0014\u000b\u0002\u0083\u0081",
    "\u0003\u0002\u0002\u0002\u0083\u0082\u0003\u0002\u0002\u0002\u0084\u0085",
    "\u0003\u0002\u0002\u0002\u0085\u0086\u0007\u001a\u0002\u0002\u0086\u0087",
    "\u0005\u0004\u0003\u0002\u0087\u000f\u0003\u0002\u0002\u0002\u0088\u008d",
    "\t\u0002\u0002\u0002\u0089\u008d\u0007\u001f\u0002\u0002\u008a\u008d",
    "\u0007\u001c\u0002\u0002\u008b\u008d\u0007\u001d\u0002\u0002\u008c\u0088",
    "\u0003\u0002\u0002\u0002\u008c\u0089\u0003\u0002\u0002\u0002\u008c\u008a",
    "\u0003\u0002\u0002\u0002\u008c\u008b\u0003\u0002\u0002\u0002\u008d\u008e",
    "\u0003\u0002\u0002\u0002\u008e\u008c\u0003\u0002\u0002\u0002\u008e\u008f",
    "\u0003\u0002\u0002\u0002\u008f\u0011\u0003\u0002\u0002\u0002\u0090\u0094",
    "\u0007\u0017\u0002\u0002\u0091\u0093\u0005\u001c\u000f\u0002\u0092\u0091",
    "\u0003\u0002\u0002\u0002\u0093\u0096\u0003\u0002\u0002\u0002\u0094\u0092",
    "\u0003\u0002\u0002\u0002\u0094\u0095\u0003\u0002\u0002\u0002\u0095\u0013",
    "\u0003\u0002\u0002\u0002\u0096\u0094\u0003\u0002\u0002\u0002\u0097\u009b",
    "\u0007\u0018\u0002\u0002\u0098\u009a\u0005\u001c\u000f\u0002\u0099\u0098",
    "\u0003\u0002\u0002\u0002\u009a\u009d\u0003\u0002\u0002\u0002\u009b\u0099",
    "\u0003\u0002\u0002\u0002\u009b\u009c\u0003\u0002\u0002\u0002\u009c\u00a4",
    "\u0003\u0002\u0002\u0002\u009d\u009b\u0003\u0002\u0002\u0002\u009e\u00a0",
    "\u0005\u001c\u000f\u0002\u009f\u009e\u0003\u0002\u0002\u0002\u00a0\u00a1",
    "\u0003\u0002\u0002\u0002\u00a1\u009f\u0003\u0002\u0002\u0002\u00a1\u00a2",
    "\u0003\u0002\u0002\u0002\u00a2\u00a4\u0003\u0002\u0002\u0002\u00a3\u0097",
    "\u0003\u0002\u0002\u0002\u00a3\u009f\u0003\u0002\u0002\u0002\u00a4\u0015",
    "\u0003\u0002\u0002\u0002\u00a5\u00a7\u0005\u0004\u0003\u0002\u00a6\u00a5",
    "\u0003\u0002\u0002\u0002\u00a6\u00a7\u0003\u0002\u0002\u0002\u00a7\u00a9",
    "\u0003\u0002\u0002\u0002\u00a8\u00aa\u0005\n\u0006\u0002\u00a9\u00a8",
    "\u0003\u0002\u0002\u0002\u00a9\u00aa\u0003\u0002\u0002\u0002\u00aa\u0017",
    "\u0003\u0002\u0002\u0002\u00ab\u00ac\u0007\n\u0002\u0002\u00ac\u00ad",
    "\u0005\u0004\u0003\u0002\u00ad\u00ae\u0007\u000b\u0002\u0002\u00ae\u00af",
    "\u0007\u0007\u0002\u0002\u00af\u00b0\u0005\u001a\u000e\u0002\u00b0\u00b4",
    "\u0007!\u0002\u0002\u00b1\u00b3\u0007\u000f\u0002\u0002\u00b2\u00b1",
    "\u0003\u0002\u0002\u0002\u00b3\u00b6\u0003\u0002\u0002\u0002\u00b4\u00b2",
    "\u0003\u0002\u0002\u0002\u00b4\u00b5\u0003\u0002\u0002\u0002\u00b5\u0019",
    "\u0003\u0002\u0002\u0002\u00b6\u00b4\u0003\u0002\u0002\u0002\u00b7\u00b9",
    "\u0007 \u0002\u0002\u00b8\u00b7\u0003\u0002\u0002\u0002\u00b9\u00ba",
    "\u0003\u0002\u0002\u0002\u00ba\u00b8\u0003\u0002\u0002\u0002\u00ba\u00bb",
    "\u0003\u0002\u0002\u0002\u00bb\u001b\u0003\u0002\u0002\u0002\u00bc\u00bd",
    "\u0007\u001b\u0002\u0002\u00bd\u001d\u0003\u0002\u0002\u0002\u00be\u00c1",
    "\u0007\u001e\u0002\u0002\u00bf\u00c1\t\u0003\u0002\u0002\u00c0\u00be",
    "\u0003\u0002\u0002\u0002\u00c0\u00bf\u0003\u0002\u0002\u0002\u00c1\u001f",
    "\u0003\u0002\u0002\u0002\u001d$&/16=CLSZ^clu~\u0083\u008c\u008e\u0094",
    "\u009b\u00a1\u00a3\u00a6\u00a9\u00b4\u00ba\u00c0"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, null, null, "'>'", "'<'", null, "'('", null, 
                     "'['", "']'", "'{'", "'}'", "'.'", null, "'/'", "'!'", 
                     "'*'", "'^'", "'$'", "','" ];

var symbolicNames = [ null, "LCOMM", "BCOMM", "GT", "LT", "MDS", "LP", "RP", 
                      "LB", "RB", "LCB", "RCB", "DOT", "WS", "FS", "EXC", 
                      "AST", "HAT", "DOL", "COM", "NL", "DYN", "SYM", "OR", 
                      "EQ", "TF", "ENT", "INT", "OP", "CHR", "MDT", "MDE" ];

var ruleNames =  [ "script", "expr", "cexpr", "cond", "weight", "choice", 
                   "assign", "chars", "dynamic", "symbol", "wexpr", "link", 
                   "url", "transform", "op" ];

function RiScriptParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

RiScriptParser.prototype = Object.create(antlr4.Parser.prototype);
RiScriptParser.prototype.constructor = RiScriptParser;

Object.defineProperty(RiScriptParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

RiScriptParser.EOF = antlr4.Token.EOF;
RiScriptParser.LCOMM = 1;
RiScriptParser.BCOMM = 2;
RiScriptParser.GT = 3;
RiScriptParser.LT = 4;
RiScriptParser.MDS = 5;
RiScriptParser.LP = 6;
RiScriptParser.RP = 7;
RiScriptParser.LB = 8;
RiScriptParser.RB = 9;
RiScriptParser.LCB = 10;
RiScriptParser.RCB = 11;
RiScriptParser.DOT = 12;
RiScriptParser.WS = 13;
RiScriptParser.FS = 14;
RiScriptParser.EXC = 15;
RiScriptParser.AST = 16;
RiScriptParser.HAT = 17;
RiScriptParser.DOL = 18;
RiScriptParser.COM = 19;
RiScriptParser.NL = 20;
RiScriptParser.DYN = 21;
RiScriptParser.SYM = 22;
RiScriptParser.OR = 23;
RiScriptParser.EQ = 24;
RiScriptParser.TF = 25;
RiScriptParser.ENT = 26;
RiScriptParser.INT = 27;
RiScriptParser.OP = 28;
RiScriptParser.CHR = 29;
RiScriptParser.MDT = 30;
RiScriptParser.MDE = 31;

RiScriptParser.RULE_script = 0;
RiScriptParser.RULE_expr = 1;
RiScriptParser.RULE_cexpr = 2;
RiScriptParser.RULE_cond = 3;
RiScriptParser.RULE_weight = 4;
RiScriptParser.RULE_choice = 5;
RiScriptParser.RULE_assign = 6;
RiScriptParser.RULE_chars = 7;
RiScriptParser.RULE_dynamic = 8;
RiScriptParser.RULE_symbol = 9;
RiScriptParser.RULE_wexpr = 10;
RiScriptParser.RULE_link = 11;
RiScriptParser.RULE_url = 12;
RiScriptParser.RULE_transform = 13;
RiScriptParser.RULE_op = 14;


function ScriptContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RiScriptParser.RULE_script;
    return this;
}

ScriptContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ScriptContext.prototype.constructor = ScriptContext;

ScriptContext.prototype.EOF = function() {
    return this.getToken(RiScriptParser.EOF, 0);
};

ScriptContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

ScriptContext.prototype.cexpr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(CexprContext);
    } else {
        return this.getTypedRuleContext(CexprContext,i);
    }
};

ScriptContext.prototype.link = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(LinkContext);
    } else {
        return this.getTypedRuleContext(LinkContext,i);
    }
};

ScriptContext.prototype.NL = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.NL);
    } else {
        return this.getToken(RiScriptParser.NL, i);
    }
};


ScriptContext.prototype.enterRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.enterScript(this);
	}
};

ScriptContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.exitScript(this);
	}
};

ScriptContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptParserVisitor ) {
        return visitor.visitScript(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.ScriptContext = ScriptContext;

RiScriptParser.prototype.script = function() {

    var localctx = new ScriptContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, RiScriptParser.RULE_script);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 36;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << RiScriptParser.GT) | (1 << RiScriptParser.LT) | (1 << RiScriptParser.LP) | (1 << RiScriptParser.LB) | (1 << RiScriptParser.LCB) | (1 << RiScriptParser.DOT) | (1 << RiScriptParser.WS) | (1 << RiScriptParser.FS) | (1 << RiScriptParser.EXC) | (1 << RiScriptParser.AST) | (1 << RiScriptParser.HAT) | (1 << RiScriptParser.DOL) | (1 << RiScriptParser.COM) | (1 << RiScriptParser.NL) | (1 << RiScriptParser.DYN) | (1 << RiScriptParser.SYM) | (1 << RiScriptParser.TF) | (1 << RiScriptParser.ENT) | (1 << RiScriptParser.INT) | (1 << RiScriptParser.CHR))) !== 0)) {
            this.state = 34;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
            switch(la_) {
            case 1:
                this.state = 30;
                this.expr();
                break;

            case 2:
                this.state = 31;
                this.cexpr();
                break;

            case 3:
                this.state = 32;
                this.link();
                break;

            case 4:
                this.state = 33;
                this.match(RiScriptParser.NL);
                break;

            }
            this.state = 38;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 39;
        this.match(RiScriptParser.EOF);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function ExprContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RiScriptParser.RULE_expr;
    return this;
}

ExprContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExprContext.prototype.constructor = ExprContext;

ExprContext.prototype.symbol = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(SymbolContext);
    } else {
        return this.getTypedRuleContext(SymbolContext,i);
    }
};

ExprContext.prototype.choice = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ChoiceContext);
    } else {
        return this.getTypedRuleContext(ChoiceContext,i);
    }
};

ExprContext.prototype.assign = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(AssignContext);
    } else {
        return this.getTypedRuleContext(AssignContext,i);
    }
};

ExprContext.prototype.chars = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(CharsContext);
    } else {
        return this.getTypedRuleContext(CharsContext,i);
    }
};

ExprContext.prototype.enterRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.enterExpr(this);
	}
};

ExprContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.exitExpr(this);
	}
};

ExprContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptParserVisitor ) {
        return visitor.visitExpr(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.ExprContext = ExprContext;

RiScriptParser.prototype.expr = function() {

    var localctx = new ExprContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, RiScriptParser.RULE_expr);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 45; 
        this._errHandler.sync(this);
        var _alt = 1;
        do {
        	switch (_alt) {
        	case 1:
        		this.state = 45;
        		this._errHandler.sync(this);
        		var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
        		switch(la_) {
        		case 1:
        		    this.state = 41;
        		    this.symbol();
        		    break;

        		case 2:
        		    this.state = 42;
        		    this.choice();
        		    break;

        		case 3:
        		    this.state = 43;
        		    this.assign();
        		    break;

        		case 4:
        		    this.state = 44;
        		    this.chars();
        		    break;

        		}
        		break;
        	default:
        		throw new antlr4.error.NoViableAltException(this);
        	}
        	this.state = 47; 
        	this._errHandler.sync(this);
        	_alt = this._interp.adaptivePredict(this._input,3, this._ctx);
        } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function CexprContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RiScriptParser.RULE_cexpr;
    return this;
}

CexprContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
CexprContext.prototype.constructor = CexprContext;

CexprContext.prototype.LCB = function() {
    return this.getToken(RiScriptParser.LCB, 0);
};

CexprContext.prototype.RCB = function() {
    return this.getToken(RiScriptParser.RCB, 0);
};

CexprContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

CexprContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.WS);
    } else {
        return this.getToken(RiScriptParser.WS, i);
    }
};


CexprContext.prototype.cond = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(CondContext);
    } else {
        return this.getTypedRuleContext(CondContext,i);
    }
};

CexprContext.prototype.enterRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.enterCexpr(this);
	}
};

CexprContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.exitCexpr(this);
	}
};

CexprContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptParserVisitor ) {
        return visitor.visitCexpr(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.CexprContext = CexprContext;

RiScriptParser.prototype.cexpr = function() {

    var localctx = new CexprContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, RiScriptParser.RULE_cexpr);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 52;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.WS) {
            this.state = 49;
            this.match(RiScriptParser.WS);
            this.state = 54;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 55;
        this.match(RiScriptParser.LCB);
        this.state = 57; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 56;
            this.cond();
            this.state = 59; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===RiScriptParser.SYM || _la===RiScriptParser.TF);
        this.state = 61;
        this.match(RiScriptParser.RCB);
        this.state = 65;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,6,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 62;
                this.match(RiScriptParser.WS); 
            }
            this.state = 67;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,6,this._ctx);
        }

        this.state = 68;
        this.expr();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function CondContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RiScriptParser.RULE_cond;
    return this;
}

CondContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
CondContext.prototype.constructor = CondContext;

CondContext.prototype.symbol = function() {
    return this.getTypedRuleContext(SymbolContext,0);
};

CondContext.prototype.op = function() {
    return this.getTypedRuleContext(OpContext,0);
};

CondContext.prototype.chars = function() {
    return this.getTypedRuleContext(CharsContext,0);
};

CondContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.WS);
    } else {
        return this.getToken(RiScriptParser.WS, i);
    }
};


CondContext.prototype.COM = function() {
    return this.getToken(RiScriptParser.COM, 0);
};

CondContext.prototype.enterRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.enterCond(this);
	}
};

CondContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.exitCond(this);
	}
};

CondContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptParserVisitor ) {
        return visitor.visitCond(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.CondContext = CondContext;

RiScriptParser.prototype.cond = function() {

    var localctx = new CondContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, RiScriptParser.RULE_cond);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 70;
        this.symbol();
        this.state = 74;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.WS) {
            this.state = 71;
            this.match(RiScriptParser.WS);
            this.state = 76;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 77;
        this.op();
        this.state = 81;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,8,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 78;
                this.match(RiScriptParser.WS); 
            }
            this.state = 83;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,8,this._ctx);
        }

        this.state = 84;
        this.chars();
        this.state = 88;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.WS) {
            this.state = 85;
            this.match(RiScriptParser.WS);
            this.state = 90;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 92;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===RiScriptParser.COM) {
            this.state = 91;
            this.match(RiScriptParser.COM);
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function WeightContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RiScriptParser.RULE_weight;
    return this;
}

WeightContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
WeightContext.prototype.constructor = WeightContext;

WeightContext.prototype.LB = function() {
    return this.getToken(RiScriptParser.LB, 0);
};

WeightContext.prototype.INT = function() {
    return this.getToken(RiScriptParser.INT, 0);
};

WeightContext.prototype.RB = function() {
    return this.getToken(RiScriptParser.RB, 0);
};

WeightContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.WS);
    } else {
        return this.getToken(RiScriptParser.WS, i);
    }
};


WeightContext.prototype.enterRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.enterWeight(this);
	}
};

WeightContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.exitWeight(this);
	}
};

WeightContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptParserVisitor ) {
        return visitor.visitWeight(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.WeightContext = WeightContext;

RiScriptParser.prototype.weight = function() {

    var localctx = new WeightContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, RiScriptParser.RULE_weight);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 97;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.WS) {
            this.state = 94;
            this.match(RiScriptParser.WS);
            this.state = 99;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 100;
        this.match(RiScriptParser.LB);
        this.state = 101;
        this.match(RiScriptParser.INT);
        this.state = 102;
        this.match(RiScriptParser.RB);
        this.state = 106;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.WS) {
            this.state = 103;
            this.match(RiScriptParser.WS);
            this.state = 108;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function ChoiceContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RiScriptParser.RULE_choice;
    return this;
}

ChoiceContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ChoiceContext.prototype.constructor = ChoiceContext;

ChoiceContext.prototype.LP = function() {
    return this.getToken(RiScriptParser.LP, 0);
};

ChoiceContext.prototype.wexpr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(WexprContext);
    } else {
        return this.getTypedRuleContext(WexprContext,i);
    }
};

ChoiceContext.prototype.RP = function() {
    return this.getToken(RiScriptParser.RP, 0);
};

ChoiceContext.prototype.transform = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(TransformContext);
    } else {
        return this.getTypedRuleContext(TransformContext,i);
    }
};

ChoiceContext.prototype.OR = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.OR);
    } else {
        return this.getToken(RiScriptParser.OR, i);
    }
};


ChoiceContext.prototype.enterRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.enterChoice(this);
	}
};

ChoiceContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.exitChoice(this);
	}
};

ChoiceContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptParserVisitor ) {
        return visitor.visitChoice(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.ChoiceContext = ChoiceContext;

RiScriptParser.prototype.choice = function() {

    var localctx = new ChoiceContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, RiScriptParser.RULE_choice);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 109;
        this.match(RiScriptParser.LP);
        this.state = 115;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,13,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 110;
                this.wexpr();
                this.state = 111;
                this.match(RiScriptParser.OR); 
            }
            this.state = 117;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,13,this._ctx);
        }

        this.state = 118;
        this.wexpr();
        this.state = 119;
        this.match(RiScriptParser.RP);
        this.state = 124;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,14,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 121;
                this.transform(); 
            }
            this.state = 126;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,14,this._ctx);
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function AssignContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RiScriptParser.RULE_assign;
    return this;
}

AssignContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AssignContext.prototype.constructor = AssignContext;

AssignContext.prototype.EQ = function() {
    return this.getToken(RiScriptParser.EQ, 0);
};

AssignContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

AssignContext.prototype.dynamic = function() {
    return this.getTypedRuleContext(DynamicContext,0);
};

AssignContext.prototype.symbol = function() {
    return this.getTypedRuleContext(SymbolContext,0);
};

AssignContext.prototype.enterRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.enterAssign(this);
	}
};

AssignContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.exitAssign(this);
	}
};

AssignContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptParserVisitor ) {
        return visitor.visitAssign(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.AssignContext = AssignContext;

RiScriptParser.prototype.assign = function() {

    var localctx = new AssignContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, RiScriptParser.RULE_assign);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 129;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case RiScriptParser.DYN:
            this.state = 127;
            this.dynamic();
            break;
        case RiScriptParser.SYM:
        case RiScriptParser.TF:
            this.state = 128;
            this.symbol();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
        this.state = 131;
        this.match(RiScriptParser.EQ);
        this.state = 132;
        this.expr();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function CharsContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RiScriptParser.RULE_chars;
    return this;
}

CharsContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
CharsContext.prototype.constructor = CharsContext;

CharsContext.prototype.CHR = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.CHR);
    } else {
        return this.getToken(RiScriptParser.CHR, i);
    }
};


CharsContext.prototype.ENT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.ENT);
    } else {
        return this.getToken(RiScriptParser.ENT, i);
    }
};


CharsContext.prototype.INT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.INT);
    } else {
        return this.getToken(RiScriptParser.INT, i);
    }
};


CharsContext.prototype.DOT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.DOT);
    } else {
        return this.getToken(RiScriptParser.DOT, i);
    }
};


CharsContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.WS);
    } else {
        return this.getToken(RiScriptParser.WS, i);
    }
};


CharsContext.prototype.EXC = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.EXC);
    } else {
        return this.getToken(RiScriptParser.EXC, i);
    }
};


CharsContext.prototype.AST = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.AST);
    } else {
        return this.getToken(RiScriptParser.AST, i);
    }
};


CharsContext.prototype.GT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.GT);
    } else {
        return this.getToken(RiScriptParser.GT, i);
    }
};


CharsContext.prototype.LT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.LT);
    } else {
        return this.getToken(RiScriptParser.LT, i);
    }
};


CharsContext.prototype.DOL = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.DOL);
    } else {
        return this.getToken(RiScriptParser.DOL, i);
    }
};


CharsContext.prototype.HAT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.HAT);
    } else {
        return this.getToken(RiScriptParser.HAT, i);
    }
};


CharsContext.prototype.COM = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.COM);
    } else {
        return this.getToken(RiScriptParser.COM, i);
    }
};


CharsContext.prototype.FS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.FS);
    } else {
        return this.getToken(RiScriptParser.FS, i);
    }
};


CharsContext.prototype.enterRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.enterChars(this);
	}
};

CharsContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.exitChars(this);
	}
};

CharsContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptParserVisitor ) {
        return visitor.visitChars(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.CharsContext = CharsContext;

RiScriptParser.prototype.chars = function() {

    var localctx = new CharsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, RiScriptParser.RULE_chars);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 138; 
        this._errHandler.sync(this);
        var _alt = 1;
        do {
        	switch (_alt) {
        	case 1:
        		this.state = 138;
        		this._errHandler.sync(this);
        		switch(this._input.LA(1)) {
        		case RiScriptParser.GT:
        		case RiScriptParser.LT:
        		case RiScriptParser.DOT:
        		case RiScriptParser.WS:
        		case RiScriptParser.FS:
        		case RiScriptParser.EXC:
        		case RiScriptParser.AST:
        		case RiScriptParser.HAT:
        		case RiScriptParser.DOL:
        		case RiScriptParser.COM:
        		    this.state = 134;
        		    _la = this._input.LA(1);
        		    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << RiScriptParser.GT) | (1 << RiScriptParser.LT) | (1 << RiScriptParser.DOT) | (1 << RiScriptParser.WS) | (1 << RiScriptParser.FS) | (1 << RiScriptParser.EXC) | (1 << RiScriptParser.AST) | (1 << RiScriptParser.HAT) | (1 << RiScriptParser.DOL) | (1 << RiScriptParser.COM))) !== 0))) {
        		    this._errHandler.recoverInline(this);
        		    }
        		    else {
        		    	this._errHandler.reportMatch(this);
        		        this.consume();
        		    }
        		    break;
        		case RiScriptParser.CHR:
        		    this.state = 135;
        		    this.match(RiScriptParser.CHR);
        		    break;
        		case RiScriptParser.ENT:
        		    this.state = 136;
        		    this.match(RiScriptParser.ENT);
        		    break;
        		case RiScriptParser.INT:
        		    this.state = 137;
        		    this.match(RiScriptParser.INT);
        		    break;
        		default:
        		    throw new antlr4.error.NoViableAltException(this);
        		}
        		break;
        	default:
        		throw new antlr4.error.NoViableAltException(this);
        	}
        	this.state = 140; 
        	this._errHandler.sync(this);
        	_alt = this._interp.adaptivePredict(this._input,17, this._ctx);
        } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function DynamicContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RiScriptParser.RULE_dynamic;
    return this;
}

DynamicContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DynamicContext.prototype.constructor = DynamicContext;

DynamicContext.prototype.DYN = function() {
    return this.getToken(RiScriptParser.DYN, 0);
};

DynamicContext.prototype.transform = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(TransformContext);
    } else {
        return this.getTypedRuleContext(TransformContext,i);
    }
};

DynamicContext.prototype.enterRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.enterDynamic(this);
	}
};

DynamicContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.exitDynamic(this);
	}
};

DynamicContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptParserVisitor ) {
        return visitor.visitDynamic(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.DynamicContext = DynamicContext;

RiScriptParser.prototype.dynamic = function() {

    var localctx = new DynamicContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, RiScriptParser.RULE_dynamic);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 142;
        this.match(RiScriptParser.DYN);
        this.state = 146;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.TF) {
            this.state = 143;
            this.transform();
            this.state = 148;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function SymbolContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RiScriptParser.RULE_symbol;
    return this;
}

SymbolContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
SymbolContext.prototype.constructor = SymbolContext;

SymbolContext.prototype.SYM = function() {
    return this.getToken(RiScriptParser.SYM, 0);
};

SymbolContext.prototype.transform = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(TransformContext);
    } else {
        return this.getTypedRuleContext(TransformContext,i);
    }
};

SymbolContext.prototype.enterRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.enterSymbol(this);
	}
};

SymbolContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.exitSymbol(this);
	}
};

SymbolContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptParserVisitor ) {
        return visitor.visitSymbol(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.SymbolContext = SymbolContext;

RiScriptParser.prototype.symbol = function() {

    var localctx = new SymbolContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, RiScriptParser.RULE_symbol);
    try {
        this.state = 161;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case RiScriptParser.SYM:
            this.enterOuterAlt(localctx, 1);
            this.state = 149;
            this.match(RiScriptParser.SYM);
            this.state = 153;
            this._errHandler.sync(this);
            var _alt = this._interp.adaptivePredict(this._input,19,this._ctx)
            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
                if(_alt===1) {
                    this.state = 150;
                    this.transform(); 
                }
                this.state = 155;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input,19,this._ctx);
            }

            break;
        case RiScriptParser.TF:
            this.enterOuterAlt(localctx, 2);
            this.state = 157; 
            this._errHandler.sync(this);
            var _alt = 1;
            do {
            	switch (_alt) {
            	case 1:
            		this.state = 156;
            		this.transform();
            		break;
            	default:
            		throw new antlr4.error.NoViableAltException(this);
            	}
            	this.state = 159; 
            	this._errHandler.sync(this);
            	_alt = this._interp.adaptivePredict(this._input,20, this._ctx);
            } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function WexprContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RiScriptParser.RULE_wexpr;
    return this;
}

WexprContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
WexprContext.prototype.constructor = WexprContext;

WexprContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

WexprContext.prototype.weight = function() {
    return this.getTypedRuleContext(WeightContext,0);
};

WexprContext.prototype.enterRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.enterWexpr(this);
	}
};

WexprContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.exitWexpr(this);
	}
};

WexprContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptParserVisitor ) {
        return visitor.visitWexpr(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.WexprContext = WexprContext;

RiScriptParser.prototype.wexpr = function() {

    var localctx = new WexprContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, RiScriptParser.RULE_wexpr);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 164;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,22,this._ctx);
        if(la_===1) {
            this.state = 163;
            this.expr();

        }
        this.state = 167;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===RiScriptParser.LB || _la===RiScriptParser.WS) {
            this.state = 166;
            this.weight();
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function LinkContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RiScriptParser.RULE_link;
    return this;
}

LinkContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
LinkContext.prototype.constructor = LinkContext;

LinkContext.prototype.LB = function() {
    return this.getToken(RiScriptParser.LB, 0);
};

LinkContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

LinkContext.prototype.RB = function() {
    return this.getToken(RiScriptParser.RB, 0);
};

LinkContext.prototype.MDS = function() {
    return this.getToken(RiScriptParser.MDS, 0);
};

LinkContext.prototype.url = function() {
    return this.getTypedRuleContext(UrlContext,0);
};

LinkContext.prototype.MDE = function() {
    return this.getToken(RiScriptParser.MDE, 0);
};

LinkContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.WS);
    } else {
        return this.getToken(RiScriptParser.WS, i);
    }
};


LinkContext.prototype.enterRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.enterLink(this);
	}
};

LinkContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.exitLink(this);
	}
};

LinkContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptParserVisitor ) {
        return visitor.visitLink(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.LinkContext = LinkContext;

RiScriptParser.prototype.link = function() {

    var localctx = new LinkContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, RiScriptParser.RULE_link);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 169;
        this.match(RiScriptParser.LB);
        this.state = 170;
        this.expr();
        this.state = 171;
        this.match(RiScriptParser.RB);
        this.state = 172;
        this.match(RiScriptParser.MDS);
        this.state = 173;
        this.url();
        this.state = 174;
        this.match(RiScriptParser.MDE);
        this.state = 178;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,24,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 175;
                this.match(RiScriptParser.WS); 
            }
            this.state = 180;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,24,this._ctx);
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function UrlContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RiScriptParser.RULE_url;
    return this;
}

UrlContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
UrlContext.prototype.constructor = UrlContext;

UrlContext.prototype.MDT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.MDT);
    } else {
        return this.getToken(RiScriptParser.MDT, i);
    }
};


UrlContext.prototype.enterRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.enterUrl(this);
	}
};

UrlContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.exitUrl(this);
	}
};

UrlContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptParserVisitor ) {
        return visitor.visitUrl(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.UrlContext = UrlContext;

RiScriptParser.prototype.url = function() {

    var localctx = new UrlContext(this, this._ctx, this.state);
    this.enterRule(localctx, 24, RiScriptParser.RULE_url);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 182; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 181;
            this.match(RiScriptParser.MDT);
            this.state = 184; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===RiScriptParser.MDT);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function TransformContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RiScriptParser.RULE_transform;
    return this;
}

TransformContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TransformContext.prototype.constructor = TransformContext;

TransformContext.prototype.TF = function() {
    return this.getToken(RiScriptParser.TF, 0);
};

TransformContext.prototype.enterRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.enterTransform(this);
	}
};

TransformContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.exitTransform(this);
	}
};

TransformContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptParserVisitor ) {
        return visitor.visitTransform(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.TransformContext = TransformContext;

RiScriptParser.prototype.transform = function() {

    var localctx = new TransformContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, RiScriptParser.RULE_transform);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 186;
        this.match(RiScriptParser.TF);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function OpContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RiScriptParser.RULE_op;
    return this;
}

OpContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OpContext.prototype.constructor = OpContext;

OpContext.prototype.OP = function() {
    return this.getToken(RiScriptParser.OP, 0);
};

OpContext.prototype.LT = function() {
    return this.getToken(RiScriptParser.LT, 0);
};

OpContext.prototype.GT = function() {
    return this.getToken(RiScriptParser.GT, 0);
};

OpContext.prototype.EQ = function() {
    return this.getToken(RiScriptParser.EQ, 0);
};

OpContext.prototype.enterRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.enterOp(this);
	}
};

OpContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.exitOp(this);
	}
};

OpContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptParserVisitor ) {
        return visitor.visitOp(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.OpContext = OpContext;

RiScriptParser.prototype.op = function() {

    var localctx = new OpContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, RiScriptParser.RULE_op);
    var _la = 0; // Token type
    try {
        this.state = 190;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case RiScriptParser.OP:
            this.enterOuterAlt(localctx, 1);
            this.state = 188;
            this.match(RiScriptParser.OP);
            break;
        case RiScriptParser.GT:
        case RiScriptParser.LT:
        case RiScriptParser.EQ:
            this.enterOuterAlt(localctx, 2);
            this.state = 189;
            _la = this._input.LA(1);
            if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << RiScriptParser.GT) | (1 << RiScriptParser.LT) | (1 << RiScriptParser.EQ))) !== 0))) {
            this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exports.RiScriptParser = RiScriptParser;
