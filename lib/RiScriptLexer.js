// Generated from grammar/RiScript.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0002\u0011|\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004",
    "\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010",
    "\t\u0010\u0004\u0011\t\u0011\u0003\u0002\u0003\u0002\u0003\u0003\u0003",
    "\u0003\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0006\u0003",
    "\u0006\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003\t\u0006\t3\n\t",
    "\r\t\u000e\t4\u0003\n\u0005\n8\n\n\u0003\n\u0003\n\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0005",
    "\u000bC\n\u000b\u0003\f\u0007\fF\n\f\f\f\u000e\fI\u000b\f\u0003\f\u0003",
    "\f\u0007\fM\n\f\f\f\u000e\fP\u000b\f\u0003\r\u0007\rS\n\r\f\r\u000e",
    "\rV\u000b\r\u0003\r\u0003\r\u0007\rZ\n\r\f\r\u000e\r]\u000b\r\u0003",
    "\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0005\u000ec\n\u000e\u0006",
    "\u000ee\n\u000e\r\u000e\u000e\u000ef\u0003\u000f\u0003\u000f\u0006\u000f",
    "k\n\u000f\r\u000f\u000e\u000fl\u0003\u000f\u0003\u000f\u0003\u0010\u0006",
    "\u0010r\n\u0010\r\u0010\u000e\u0010s\u0003\u0011\u0003\u0011\u0007\u0011",
    "x\n\u0011\f\u0011\u000e\u0011{\u000b\u0011\u0002\u0002\u0012\u0003\u0003",
    "\u0005\u0004\u0007\u0005\t\u0006\u000b\u0007\r\b\u000f\t\u0011\n\u0013",
    "\u000b\u0015\f\u0017\r\u0019\u000e\u001b\u000f\u001d\u0010\u001f\u0011",
    "!\u0002\u0003\u0002\u0007\u0004\u0002\u000b\u000b\"\"\u0006\u0002%%",
    "2;C\\c|\u000b\u0002\u000b\f\"\"&&*+00??]]__}\u007f\u0005\u0002C\\aa",
    "c|\u0007\u0002//2;C\\aac|\u0002\u0086\u0002\u0003\u0003\u0002\u0002",
    "\u0002\u0002\u0005\u0003\u0002\u0002\u0002\u0002\u0007\u0003\u0002\u0002",
    "\u0002\u0002\t\u0003\u0002\u0002\u0002\u0002\u000b\u0003\u0002\u0002",
    "\u0002\u0002\r\u0003\u0002\u0002\u0002\u0002\u000f\u0003\u0002\u0002",
    "\u0002\u0002\u0011\u0003\u0002\u0002\u0002\u0002\u0013\u0003\u0002\u0002",
    "\u0002\u0002\u0015\u0003\u0002\u0002\u0002\u0002\u0017\u0003\u0002\u0002",
    "\u0002\u0002\u0019\u0003\u0002\u0002\u0002\u0002\u001b\u0003\u0002\u0002",
    "\u0002\u0002\u001d\u0003\u0002\u0002\u0002\u0002\u001f\u0003\u0002\u0002",
    "\u0002\u0003#\u0003\u0002\u0002\u0002\u0005%\u0003\u0002\u0002\u0002",
    "\u0007\'\u0003\u0002\u0002\u0002\t)\u0003\u0002\u0002\u0002\u000b+\u0003",
    "\u0002\u0002\u0002\r-\u0003\u0002\u0002\u0002\u000f/\u0003\u0002\u0002",
    "\u0002\u00112\u0003\u0002\u0002\u0002\u00137\u0003\u0002\u0002\u0002",
    "\u0015B\u0003\u0002\u0002\u0002\u0017G\u0003\u0002\u0002\u0002\u0019",
    "T\u0003\u0002\u0002\u0002\u001bd\u0003\u0002\u0002\u0002\u001dh\u0003",
    "\u0002\u0002\u0002\u001fq\u0003\u0002\u0002\u0002!u\u0003\u0002\u0002",
    "\u0002#$\u0007*\u0002\u0002$\u0004\u0003\u0002\u0002\u0002%&\u0007+",
    "\u0002\u0002&\u0006\u0003\u0002\u0002\u0002\'(\u0007]\u0002\u0002(\b",
    "\u0003\u0002\u0002\u0002)*\u0007_\u0002\u0002*\n\u0003\u0002\u0002\u0002",
    "+,\u0007}\u0002\u0002,\f\u0003\u0002\u0002\u0002-.\u0007\u007f\u0002",
    "\u0002.\u000e\u0003\u0002\u0002\u0002/0\u00070\u0002\u00020\u0010\u0003",
    "\u0002\u0002\u000213\t\u0002\u0002\u000221\u0003\u0002\u0002\u00023",
    "4\u0003\u0002\u0002\u000242\u0003\u0002\u0002\u000245\u0003\u0002\u0002",
    "\u00025\u0012\u0003\u0002\u0002\u000268\u0007\u000f\u0002\u000276\u0003",
    "\u0002\u0002\u000278\u0003\u0002\u0002\u000289\u0003\u0002\u0002\u0002",
    "9:\u0007\f\u0002\u0002:\u0014\u0003\u0002\u0002\u0002;<\u0007&\u0002",
    "\u0002<C\u0005!\u0011\u0002=>\u0007&\u0002\u0002>?\u0007}\u0002\u0002",
    "?@\u0005!\u0011\u0002@A\u0007\u007f\u0002\u0002AC\u0003\u0002\u0002",
    "\u0002B;\u0003\u0002\u0002\u0002B=\u0003\u0002\u0002\u0002C\u0016\u0003",
    "\u0002\u0002\u0002DF\u0005\u0011\t\u0002ED\u0003\u0002\u0002\u0002F",
    "I\u0003\u0002\u0002\u0002GE\u0003\u0002\u0002\u0002GH\u0003\u0002\u0002",
    "\u0002HJ\u0003\u0002\u0002\u0002IG\u0003\u0002\u0002\u0002JN\u0007~",
    "\u0002\u0002KM\u0005\u0011\t\u0002LK\u0003\u0002\u0002\u0002MP\u0003",
    "\u0002\u0002\u0002NL\u0003\u0002\u0002\u0002NO\u0003\u0002\u0002\u0002",
    "O\u0018\u0003\u0002\u0002\u0002PN\u0003\u0002\u0002\u0002QS\u0005\u0011",
    "\t\u0002RQ\u0003\u0002\u0002\u0002SV\u0003\u0002\u0002\u0002TR\u0003",
    "\u0002\u0002\u0002TU\u0003\u0002\u0002\u0002UW\u0003\u0002\u0002\u0002",
    "VT\u0003\u0002\u0002\u0002W[\u0007?\u0002\u0002XZ\u0005\u0011\t\u0002",
    "YX\u0003\u0002\u0002\u0002Z]\u0003\u0002\u0002\u0002[Y\u0003\u0002\u0002",
    "\u0002[\\\u0003\u0002\u0002\u0002\\\u001a\u0003\u0002\u0002\u0002][",
    "\u0003\u0002\u0002\u0002^_\u00070\u0002\u0002_b\u0005!\u0011\u0002`",
    "a\u0007*\u0002\u0002ac\u0007+\u0002\u0002b`\u0003\u0002\u0002\u0002",
    "bc\u0003\u0002\u0002\u0002ce\u0003\u0002\u0002\u0002d^\u0003\u0002\u0002",
    "\u0002ef\u0003\u0002\u0002\u0002fd\u0003\u0002\u0002\u0002fg\u0003\u0002",
    "\u0002\u0002g\u001c\u0003\u0002\u0002\u0002hj\u0007(\u0002\u0002ik\t",
    "\u0003\u0002\u0002ji\u0003\u0002\u0002\u0002kl\u0003\u0002\u0002\u0002",
    "lj\u0003\u0002\u0002\u0002lm\u0003\u0002\u0002\u0002mn\u0003\u0002\u0002",
    "\u0002no\u0007=\u0002\u0002o\u001e\u0003\u0002\u0002\u0002pr\n\u0004",
    "\u0002\u0002qp\u0003\u0002\u0002\u0002rs\u0003\u0002\u0002\u0002sq\u0003",
    "\u0002\u0002\u0002st\u0003\u0002\u0002\u0002t \u0003\u0002\u0002\u0002",
    "uy\t\u0005\u0002\u0002vx\t\u0006\u0002\u0002wv\u0003\u0002\u0002\u0002",
    "x{\u0003\u0002\u0002\u0002yw\u0003\u0002\u0002\u0002yz\u0003\u0002\u0002",
    "\u0002z\"\u0003\u0002\u0002\u0002{y\u0003\u0002\u0002\u0002\u000f\u0002",
    "47BGNT[bflsy\u0002"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

function RiScriptLexer(input) {
	antlr4.Lexer.call(this, input);
    this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    return this;
}

RiScriptLexer.prototype = Object.create(antlr4.Lexer.prototype);
RiScriptLexer.prototype.constructor = RiScriptLexer;

Object.defineProperty(RiScriptLexer.prototype, "atn", {
        get : function() {
                return atn;
        }
});

RiScriptLexer.EOF = antlr4.Token.EOF;
RiScriptLexer.LP = 1;
RiScriptLexer.RP = 2;
RiScriptLexer.LB = 3;
RiScriptLexer.RB = 4;
RiScriptLexer.LCB = 5;
RiScriptLexer.RCB = 6;
RiScriptLexer.DOT = 7;
RiScriptLexer.WS = 8;
RiScriptLexer.NL = 9;
RiScriptLexer.SYM = 10;
RiScriptLexer.OR = 11;
RiScriptLexer.EQ = 12;
RiScriptLexer.TF = 13;
RiScriptLexer.ENT = 14;
RiScriptLexer.CHR = 15;

RiScriptLexer.prototype.channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];

RiScriptLexer.prototype.modeNames = [ "DEFAULT_MODE" ];

RiScriptLexer.prototype.literalNames = [ null, "'('", "')'", "'['", "']'", 
                                         "'{'", "'}'", "'.'" ];

RiScriptLexer.prototype.symbolicNames = [ null, "LP", "RP", "LB", "RB", 
                                          "LCB", "RCB", "DOT", "WS", "NL", 
                                          "SYM", "OR", "EQ", "TF", "ENT", 
                                          "CHR" ];

RiScriptLexer.prototype.ruleNames = [ "LP", "RP", "LB", "RB", "LCB", "RCB", 
                                      "DOT", "WS", "NL", "SYM", "OR", "EQ", 
                                      "TF", "ENT", "CHR", "IDENT" ];

RiScriptLexer.prototype.grammarFileName = "RiScript.g4";



exports.RiScriptLexer = RiScriptLexer;

