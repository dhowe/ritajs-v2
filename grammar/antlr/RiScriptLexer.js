// Generated from grammar/RiScript.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');



var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0002\u001a\u00a7\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004",
    "\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010",
    "\t\u0010\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013",
    "\u0004\u0014\t\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017",
    "\t\u0017\u0004\u0018\t\u0018\u0004\u0019\t\u0019\u0004\u001a\t\u001a",
    "\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0004\u0003\u0004",
    "\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007",
    "\u0003\b\u0003\b\u0003\t\u0003\t\u0003\n\u0003\n\u0003\u000b\u0003\u000b",
    "\u0003\f\u0003\f\u0003\r\u0003\r\u0003\u000e\u0003\u000e\u0003\u000f",
    "\u0003\u000f\u0003\u0010\u0003\u0010\u0003\u0011\u0005\u0011U\n\u0011",
    "\u0003\u0011\u0003\u0011\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0013",
    "\u0007\u0013]\n\u0013\f\u0013\u000e\u0013`\u000b\u0013\u0003\u0013\u0003",
    "\u0013\u0007\u0013d\n\u0013\f\u0013\u000e\u0013g\u000b\u0013\u0003\u0014",
    "\u0007\u0014j\n\u0014\f\u0014\u000e\u0014m\u000b\u0014\u0003\u0014\u0003",
    "\u0014\u0007\u0014q\n\u0014\f\u0014\u000e\u0014t\u000b\u0014\u0003\u0015",
    "\u0003\u0015\u0003\u0015\u0003\u0015\u0005\u0015z\n\u0015\u0006\u0015",
    "|\n\u0015\r\u0015\u000e\u0015}\u0003\u0016\u0003\u0016\u0006\u0016\u0082",
    "\n\u0016\r\u0016\u000e\u0016\u0083\u0003\u0016\u0003\u0016\u0003\u0017",
    "\u0007\u0017\u0089\n\u0017\f\u0017\u000e\u0017\u008c\u000b\u0017\u0003",
    "\u0017\u0006\u0017\u008f\n\u0017\r\u0017\u000e\u0017\u0090\u0003\u0017",
    "\u0007\u0017\u0094\n\u0017\f\u0017\u000e\u0017\u0097\u000b\u0017\u0003",
    "\u0018\u0003\u0018\u0003\u0018\u0003\u0019\u0006\u0019\u009d\n\u0019",
    "\r\u0019\u000e\u0019\u009e\u0003\u001a\u0003\u001a\u0007\u001a\u00a3",
    "\n\u001a\f\u001a\u000e\u001a\u00a6\u000b\u001a\u0002\u0002\u001b\u0003",
    "\u0003\u0005\u0004\u0007\u0005\t\u0006\u000b\u0007\r\b\u000f\t\u0011",
    "\n\u0013\u000b\u0015\f\u0017\r\u0019\u000e\u001b\u000f\u001d\u0010\u001f",
    "\u0011!\u0012#\u0013%\u0014\'\u0015)\u0016+\u0017-\u0018/\u00191\u001a",
    "3\u0002\u0003\u0002\t\u0004\u0002\u000b\u000b\"\"\u0006\u0002%%2;C\\",
    "c|\u0003\u00022;\b\u0002##&&,,>>@@``\u000b\u0002\u000b\f\"#&&*,00>@",
    "]]_`}\u007f\u0005\u0002C\\aac|\u0007\u0002//2;C\\aac|\u0002\u00b2\u0002",
    "\u0003\u0003\u0002\u0002\u0002\u0002\u0005\u0003\u0002\u0002\u0002\u0002",
    "\u0007\u0003\u0002\u0002\u0002\u0002\t\u0003\u0002\u0002\u0002\u0002",
    "\u000b\u0003\u0002\u0002\u0002\u0002\r\u0003\u0002\u0002\u0002\u0002",
    "\u000f\u0003\u0002\u0002\u0002\u0002\u0011\u0003\u0002\u0002\u0002\u0002",
    "\u0013\u0003\u0002\u0002\u0002\u0002\u0015\u0003\u0002\u0002\u0002\u0002",
    "\u0017\u0003\u0002\u0002\u0002\u0002\u0019\u0003\u0002\u0002\u0002\u0002",
    "\u001b\u0003\u0002\u0002\u0002\u0002\u001d\u0003\u0002\u0002\u0002\u0002",
    "\u001f\u0003\u0002\u0002\u0002\u0002!\u0003\u0002\u0002\u0002\u0002",
    "#\u0003\u0002\u0002\u0002\u0002%\u0003\u0002\u0002\u0002\u0002\'\u0003",
    "\u0002\u0002\u0002\u0002)\u0003\u0002\u0002\u0002\u0002+\u0003\u0002",
    "\u0002\u0002\u0002-\u0003\u0002\u0002\u0002\u0002/\u0003\u0002\u0002",
    "\u0002\u00021\u0003\u0002\u0002\u0002\u00035\u0003\u0002\u0002\u0002",
    "\u00057\u0003\u0002\u0002\u0002\u00079\u0003\u0002\u0002\u0002\t;\u0003",
    "\u0002\u0002\u0002\u000b=\u0003\u0002\u0002\u0002\r?\u0003\u0002\u0002",
    "\u0002\u000fA\u0003\u0002\u0002\u0002\u0011C\u0003\u0002\u0002\u0002",
    "\u0013E\u0003\u0002\u0002\u0002\u0015G\u0003\u0002\u0002\u0002\u0017",
    "I\u0003\u0002\u0002\u0002\u0019K\u0003\u0002\u0002\u0002\u001bM\u0003",
    "\u0002\u0002\u0002\u001dO\u0003\u0002\u0002\u0002\u001fQ\u0003\u0002",
    "\u0002\u0002!T\u0003\u0002\u0002\u0002#X\u0003\u0002\u0002\u0002%^\u0003",
    "\u0002\u0002\u0002\'k\u0003\u0002\u0002\u0002){\u0003\u0002\u0002\u0002",
    "+\u007f\u0003\u0002\u0002\u0002-\u008a\u0003\u0002\u0002\u0002/\u0098",
    "\u0003\u0002\u0002\u00021\u009c\u0003\u0002\u0002\u00023\u00a0\u0003",
    "\u0002\u0002\u000256\u0007@\u0002\u00026\u0004\u0003\u0002\u0002\u0002",
    "78\u0007>\u0002\u00028\u0006\u0003\u0002\u0002\u00029:\u0007*\u0002",
    "\u0002:\b\u0003\u0002\u0002\u0002;<\u0007+\u0002\u0002<\n\u0003\u0002",
    "\u0002\u0002=>\u0007]\u0002\u0002>\f\u0003\u0002\u0002\u0002?@\u0007",
    "_\u0002\u0002@\u000e\u0003\u0002\u0002\u0002AB\u0007}\u0002\u0002B\u0010",
    "\u0003\u0002\u0002\u0002CD\u0007\u007f\u0002\u0002D\u0012\u0003\u0002",
    "\u0002\u0002EF\u00070\u0002\u0002F\u0014\u0003\u0002\u0002\u0002GH\t",
    "\u0002\u0002\u0002H\u0016\u0003\u0002\u0002\u0002IJ\u0007#\u0002\u0002",
    "J\u0018\u0003\u0002\u0002\u0002KL\u0007,\u0002\u0002L\u001a\u0003\u0002",
    "\u0002\u0002MN\u0007`\u0002\u0002N\u001c\u0003\u0002\u0002\u0002OP\u0007",
    "&\u0002\u0002P\u001e\u0003\u0002\u0002\u0002QR\u0007.\u0002\u0002R ",
    "\u0003\u0002\u0002\u0002SU\u0007\u000f\u0002\u0002TS\u0003\u0002\u0002",
    "\u0002TU\u0003\u0002\u0002\u0002UV\u0003\u0002\u0002\u0002VW\u0007\f",
    "\u0002\u0002W\"\u0003\u0002\u0002\u0002XY\u0007&\u0002\u0002YZ\u0005",
    "3\u001a\u0002Z$\u0003\u0002\u0002\u0002[]\u0005\u0015\u000b\u0002\\",
    "[\u0003\u0002\u0002\u0002]`\u0003\u0002\u0002\u0002^\\\u0003\u0002\u0002",
    "\u0002^_\u0003\u0002\u0002\u0002_a\u0003\u0002\u0002\u0002`^\u0003\u0002",
    "\u0002\u0002ae\u0007~\u0002\u0002bd\u0005\u0015\u000b\u0002cb\u0003",
    "\u0002\u0002\u0002dg\u0003\u0002\u0002\u0002ec\u0003\u0002\u0002\u0002",
    "ef\u0003\u0002\u0002\u0002f&\u0003\u0002\u0002\u0002ge\u0003\u0002\u0002",
    "\u0002hj\u0005\u0015\u000b\u0002ih\u0003\u0002\u0002\u0002jm\u0003\u0002",
    "\u0002\u0002ki\u0003\u0002\u0002\u0002kl\u0003\u0002\u0002\u0002ln\u0003",
    "\u0002\u0002\u0002mk\u0003\u0002\u0002\u0002nr\u0007?\u0002\u0002oq",
    "\u0005\u0015\u000b\u0002po\u0003\u0002\u0002\u0002qt\u0003\u0002\u0002",
    "\u0002rp\u0003\u0002\u0002\u0002rs\u0003\u0002\u0002\u0002s(\u0003\u0002",
    "\u0002\u0002tr\u0003\u0002\u0002\u0002uv\u00070\u0002\u0002vy\u0005",
    "3\u001a\u0002wx\u0007*\u0002\u0002xz\u0007+\u0002\u0002yw\u0003\u0002",
    "\u0002\u0002yz\u0003\u0002\u0002\u0002z|\u0003\u0002\u0002\u0002{u\u0003",
    "\u0002\u0002\u0002|}\u0003\u0002\u0002\u0002}{\u0003\u0002\u0002\u0002",
    "}~\u0003\u0002\u0002\u0002~*\u0003\u0002\u0002\u0002\u007f\u0081\u0007",
    "(\u0002\u0002\u0080\u0082\t\u0003\u0002\u0002\u0081\u0080\u0003\u0002",
    "\u0002\u0002\u0082\u0083\u0003\u0002\u0002\u0002\u0083\u0081\u0003\u0002",
    "\u0002\u0002\u0083\u0084\u0003\u0002\u0002\u0002\u0084\u0085\u0003\u0002",
    "\u0002\u0002\u0085\u0086\u0007=\u0002\u0002\u0086,\u0003\u0002\u0002",
    "\u0002\u0087\u0089\u0005\u0015\u000b\u0002\u0088\u0087\u0003\u0002\u0002",
    "\u0002\u0089\u008c\u0003\u0002\u0002\u0002\u008a\u0088\u0003\u0002\u0002",
    "\u0002\u008a\u008b\u0003\u0002\u0002\u0002\u008b\u008e\u0003\u0002\u0002",
    "\u0002\u008c\u008a\u0003\u0002\u0002\u0002\u008d\u008f\t\u0004\u0002",
    "\u0002\u008e\u008d\u0003\u0002\u0002\u0002\u008f\u0090\u0003\u0002\u0002",
    "\u0002\u0090\u008e\u0003\u0002\u0002\u0002\u0090\u0091\u0003\u0002\u0002",
    "\u0002\u0091\u0095\u0003\u0002\u0002\u0002\u0092\u0094\u0005\u0015\u000b",
    "\u0002\u0093\u0092\u0003\u0002\u0002\u0002\u0094\u0097\u0003\u0002\u0002",
    "\u0002\u0095\u0093\u0003\u0002\u0002\u0002\u0095\u0096\u0003\u0002\u0002",
    "\u0002\u0096.\u0003\u0002\u0002\u0002\u0097\u0095\u0003\u0002\u0002",
    "\u0002\u0098\u0099\t\u0005\u0002\u0002\u0099\u009a\u0007?\u0002\u0002",
    "\u009a0\u0003\u0002\u0002\u0002\u009b\u009d\n\u0006\u0002\u0002\u009c",
    "\u009b\u0003\u0002\u0002\u0002\u009d\u009e\u0003\u0002\u0002\u0002\u009e",
    "\u009c\u0003\u0002\u0002\u0002\u009e\u009f\u0003\u0002\u0002\u0002\u009f",
    "2\u0003\u0002\u0002\u0002\u00a0\u00a4\t\u0007\u0002\u0002\u00a1\u00a3",
    "\t\b\u0002\u0002\u00a2\u00a1\u0003\u0002\u0002\u0002\u00a3\u00a6\u0003",
    "\u0002\u0002\u0002\u00a4\u00a2\u0003\u0002\u0002\u0002\u00a4\u00a5\u0003",
    "\u0002\u0002\u0002\u00a54\u0003\u0002\u0002\u0002\u00a6\u00a4\u0003",
    "\u0002\u0002\u0002\u0010\u0002T^ekry}\u0083\u008a\u0090\u0095\u009e",
    "\u00a4\u0002"].join("");


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
RiScriptLexer.GT = 1;
RiScriptLexer.LT = 2;
RiScriptLexer.LP = 3;
RiScriptLexer.RP = 4;
RiScriptLexer.LB = 5;
RiScriptLexer.RB = 6;
RiScriptLexer.LCB = 7;
RiScriptLexer.RCB = 8;
RiScriptLexer.DOT = 9;
RiScriptLexer.WS = 10;
RiScriptLexer.EXC = 11;
RiScriptLexer.AST = 12;
RiScriptLexer.HAT = 13;
RiScriptLexer.DOL = 14;
RiScriptLexer.COM = 15;
RiScriptLexer.NL = 16;
RiScriptLexer.SYM = 17;
RiScriptLexer.OR = 18;
RiScriptLexer.EQ = 19;
RiScriptLexer.TF = 20;
RiScriptLexer.ENT = 21;
RiScriptLexer.INT = 22;
RiScriptLexer.OP = 23;
RiScriptLexer.CHR = 24;

RiScriptLexer.prototype.channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];

RiScriptLexer.prototype.modeNames = [ "DEFAULT_MODE" ];

RiScriptLexer.prototype.literalNames = [ null, "'>'", "'<'", "'('", "')'", 
                                         "'['", "']'", "'{'", "'}'", "'.'", 
                                         null, "'!'", "'*'", "'^'", "'$'", 
                                         "','" ];

RiScriptLexer.prototype.symbolicNames = [ null, "GT", "LT", "LP", "RP", 
                                          "LB", "RB", "LCB", "RCB", "DOT", 
                                          "WS", "EXC", "AST", "HAT", "DOL", 
                                          "COM", "NL", "SYM", "OR", "EQ", 
                                          "TF", "ENT", "INT", "OP", "CHR" ];

RiScriptLexer.prototype.ruleNames = [ "GT", "LT", "LP", "RP", "LB", "RB", 
                                      "LCB", "RCB", "DOT", "WS", "EXC", 
                                      "AST", "HAT", "DOL", "COM", "NL", 
                                      "SYM", "OR", "EQ", "TF", "ENT", "INT", 
                                      "OP", "CHR", "IDENT" ];

RiScriptLexer.prototype.grammarFileName = "RiScript.g4";


exports.RiScriptLexer = RiScriptLexer;
