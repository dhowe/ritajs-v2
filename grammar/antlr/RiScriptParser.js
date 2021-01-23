// Generated from grammar/RiScript.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');
var RiScriptListener = require('./RiScriptListener').RiScriptListener;
var RiScriptVisitor = require('./RiScriptVisitor').RiScriptVisitor;

var grammarFileName = "RiScript.g4";


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u001b\u00b7\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0003\u0002\u0003",
    "\u0002\u0003\u0002\u0006\u0002\"\n\u0002\r\u0002\u000e\u0002#\u0003",
    "\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0006\u0003-\n\u0003\r\u0003\u000e\u0003.\u0003\u0004\u0007\u0004",
    "2\n\u0004\f\u0004\u000e\u00045\u000b\u0004\u0003\u0004\u0003\u0004\u0006",
    "\u00049\n\u0004\r\u0004\u000e\u0004:\u0003\u0004\u0003\u0004\u0007\u0004",
    "?\n\u0004\f\u0004\u000e\u0004B\u000b\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0005\u0003\u0005\u0007\u0005H\n\u0005\f\u0005\u000e\u0005K\u000b\u0005",
    "\u0003\u0005\u0003\u0005\u0007\u0005O\n\u0005\f\u0005\u000e\u0005R\u000b",
    "\u0005\u0003\u0005\u0003\u0005\u0007\u0005V\n\u0005\f\u0005\u000e\u0005",
    "Y\u000b\u0005\u0003\u0005\u0005\u0005\\\n\u0005\u0003\u0006\u0007\u0006",
    "_\n\u0006\f\u0006\u000e\u0006b\u000b\u0006\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0007\u0006h\n\u0006\f\u0006\u000e\u0006k\u000b\u0006",
    "\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0007\u0007q\n\u0007",
    "\f\u0007\u000e\u0007t\u000b\u0007\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0007\u0007z\n\u0007\f\u0007\u000e\u0007}\u000b\u0007\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0003\t\u0003\t\u0003\t\u0003\t\u0003\n\u0003",
    "\n\u0003\n\u0003\n\u0006\n\u008b\n\n\r\n\u000e\n\u008c\u0003\u000b\u0003",
    "\u000b\u0007\u000b\u0091\n\u000b\f\u000b\u000e\u000b\u0094\u000b\u000b",
    "\u0003\u000b\u0006\u000b\u0097\n\u000b\r\u000b\u000e\u000b\u0098\u0005",
    "\u000b\u009b\n\u000b\u0003\f\u0003\f\u0007\f\u009f\n\f\f\f\u000e\f\u00a2",
    "\u000b\f\u0003\f\u0006\f\u00a5\n\f\r\f\u000e\f\u00a6\u0005\f\u00a9\n",
    "\f\u0003\r\u0005\r\u00ac\n\r\u0003\r\u0005\r\u00af\n\r\u0003\u000e\u0003",
    "\u000e\u0003\u000f\u0003\u000f\u0005\u000f\u00b5\n\u000f\u0003\u000f",
    "\u0002\u0002\u0010\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016",
    "\u0018\u001a\u001c\u0002\u0004\u0004\u0002\u0003\u0004\u000b\u0011\u0004",
    "\u0002\u0003\u0004\u0016\u0016\u0002\u00c8\u0002!\u0003\u0002\u0002",
    "\u0002\u0004,\u0003\u0002\u0002\u0002\u00063\u0003\u0002\u0002\u0002",
    "\bE\u0003\u0002\u0002\u0002\n`\u0003\u0002\u0002\u0002\fl\u0003\u0002",
    "\u0002\u0002\u000e~\u0003\u0002\u0002\u0002\u0010\u0082\u0003\u0002",
    "\u0002\u0002\u0012\u008a\u0003\u0002\u0002\u0002\u0014\u009a\u0003\u0002",
    "\u0002\u0002\u0016\u00a8\u0003\u0002\u0002\u0002\u0018\u00ab\u0003\u0002",
    "\u0002\u0002\u001a\u00b0\u0003\u0002\u0002\u0002\u001c\u00b4\u0003\u0002",
    "\u0002\u0002\u001e\"\u0005\u0004\u0003\u0002\u001f\"\u0005\u0006\u0004",
    "\u0002 \"\u0007\u0012\u0002\u0002!\u001e\u0003\u0002\u0002\u0002!\u001f",
    "\u0003\u0002\u0002\u0002! \u0003\u0002\u0002\u0002\"#\u0003\u0002\u0002",
    "\u0002#!\u0003\u0002\u0002\u0002#$\u0003\u0002\u0002\u0002$%\u0003\u0002",
    "\u0002\u0002%&\u0007\u0002\u0002\u0003&\u0003\u0003\u0002\u0002\u0002",
    "\'-\u0005\u0016\f\u0002(-\u0005\f\u0007\u0002)-\u0005\u0010\t\u0002",
    "*-\u0005\u000e\b\u0002+-\u0005\u0012\n\u0002,\'\u0003\u0002\u0002\u0002",
    ",(\u0003\u0002\u0002\u0002,)\u0003\u0002\u0002\u0002,*\u0003\u0002\u0002",
    "\u0002,+\u0003\u0002\u0002\u0002-.\u0003\u0002\u0002\u0002.,\u0003\u0002",
    "\u0002\u0002./\u0003\u0002\u0002\u0002/\u0005\u0003\u0002\u0002\u0002",
    "02\u0007\f\u0002\u000210\u0003\u0002\u0002\u000225\u0003\u0002\u0002",
    "\u000231\u0003\u0002\u0002\u000234\u0003\u0002\u0002\u000246\u0003\u0002",
    "\u0002\u000253\u0003\u0002\u0002\u000268\u0007\t\u0002\u000279\u0005",
    "\b\u0005\u000287\u0003\u0002\u0002\u00029:\u0003\u0002\u0002\u0002:",
    "8\u0003\u0002\u0002\u0002:;\u0003\u0002\u0002\u0002;<\u0003\u0002\u0002",
    "\u0002<@\u0007\n\u0002\u0002=?\u0007\f\u0002\u0002>=\u0003\u0002\u0002",
    "\u0002?B\u0003\u0002\u0002\u0002@>\u0003\u0002\u0002\u0002@A\u0003\u0002",
    "\u0002\u0002AC\u0003\u0002\u0002\u0002B@\u0003\u0002\u0002\u0002CD\u0005",
    "\u0004\u0003\u0002D\u0007\u0003\u0002\u0002\u0002EI\u0005\u0016\f\u0002",
    "FH\u0007\f\u0002\u0002GF\u0003\u0002\u0002\u0002HK\u0003\u0002\u0002",
    "\u0002IG\u0003\u0002\u0002\u0002IJ\u0003\u0002\u0002\u0002JL\u0003\u0002",
    "\u0002\u0002KI\u0003\u0002\u0002\u0002LP\u0005\u001c\u000f\u0002MO\u0007",
    "\f\u0002\u0002NM\u0003\u0002\u0002\u0002OR\u0003\u0002\u0002\u0002P",
    "N\u0003\u0002\u0002\u0002PQ\u0003\u0002\u0002\u0002QS\u0003\u0002\u0002",
    "\u0002RP\u0003\u0002\u0002\u0002SW\u0005\u0012\n\u0002TV\u0007\f\u0002",
    "\u0002UT\u0003\u0002\u0002\u0002VY\u0003\u0002\u0002\u0002WU\u0003\u0002",
    "\u0002\u0002WX\u0003\u0002\u0002\u0002X[\u0003\u0002\u0002\u0002YW\u0003",
    "\u0002\u0002\u0002Z\\\u0007\u0011\u0002\u0002[Z\u0003\u0002\u0002\u0002",
    "[\\\u0003\u0002\u0002\u0002\\\t\u0003\u0002\u0002\u0002]_\u0007\f\u0002",
    "\u0002^]\u0003\u0002\u0002\u0002_b\u0003\u0002\u0002\u0002`^\u0003\u0002",
    "\u0002\u0002`a\u0003\u0002\u0002\u0002ac\u0003\u0002\u0002\u0002b`\u0003",
    "\u0002\u0002\u0002cd\u0007\u0007\u0002\u0002de\u0007\u0019\u0002\u0002",
    "ei\u0007\b\u0002\u0002fh\u0007\f\u0002\u0002gf\u0003\u0002\u0002\u0002",
    "hk\u0003\u0002\u0002\u0002ig\u0003\u0002\u0002\u0002ij\u0003\u0002\u0002",
    "\u0002j\u000b\u0003\u0002\u0002\u0002ki\u0003\u0002\u0002\u0002lr\u0007",
    "\u0005\u0002\u0002mn\u0005\u0018\r\u0002no\u0007\u0015\u0002\u0002o",
    "q\u0003\u0002\u0002\u0002pm\u0003\u0002\u0002\u0002qt\u0003\u0002\u0002",
    "\u0002rp\u0003\u0002\u0002\u0002rs\u0003\u0002\u0002\u0002su\u0003\u0002",
    "\u0002\u0002tr\u0003\u0002\u0002\u0002uv\u0005\u0018\r\u0002vw\u0007",
    "\u0006\u0002\u0002w{\u0003\u0002\u0002\u0002xz\u0005\u001a\u000e\u0002",
    "yx\u0003\u0002\u0002\u0002z}\u0003\u0002\u0002\u0002{y\u0003\u0002\u0002",
    "\u0002{|\u0003\u0002\u0002\u0002|\r\u0003\u0002\u0002\u0002}{\u0003",
    "\u0002\u0002\u0002~\u007f\u0005\u0014\u000b\u0002\u007f\u0080\u0007",
    "\u0016\u0002\u0002\u0080\u0081\u0005\u0004\u0003\u0002\u0081\u000f\u0003",
    "\u0002\u0002\u0002\u0082\u0083\u0005\u0016\f\u0002\u0083\u0084\u0007",
    "\u0016\u0002\u0002\u0084\u0085\u0005\u0004\u0003\u0002\u0085\u0011\u0003",
    "\u0002\u0002\u0002\u0086\u008b\t\u0002\u0002\u0002\u0087\u008b\u0007",
    "\u001b\u0002\u0002\u0088\u008b\u0007\u0018\u0002\u0002\u0089\u008b\u0007",
    "\u0019\u0002\u0002\u008a\u0086\u0003\u0002\u0002\u0002\u008a\u0087\u0003",
    "\u0002\u0002\u0002\u008a\u0088\u0003\u0002\u0002\u0002\u008a\u0089\u0003",
    "\u0002\u0002\u0002\u008b\u008c\u0003\u0002\u0002\u0002\u008c\u008a\u0003",
    "\u0002\u0002\u0002\u008c\u008d\u0003\u0002\u0002\u0002\u008d\u0013\u0003",
    "\u0002\u0002\u0002\u008e\u0092\u0007\u0013\u0002\u0002\u008f\u0091\u0005",
    "\u001a\u000e\u0002\u0090\u008f\u0003\u0002\u0002\u0002\u0091\u0094\u0003",
    "\u0002\u0002\u0002\u0092\u0090\u0003\u0002\u0002\u0002\u0092\u0093\u0003",
    "\u0002\u0002\u0002\u0093\u009b\u0003\u0002\u0002\u0002\u0094\u0092\u0003",
    "\u0002\u0002\u0002\u0095\u0097\u0005\u001a\u000e\u0002\u0096\u0095\u0003",
    "\u0002\u0002\u0002\u0097\u0098\u0003\u0002\u0002\u0002\u0098\u0096\u0003",
    "\u0002\u0002\u0002\u0098\u0099\u0003\u0002\u0002\u0002\u0099\u009b\u0003",
    "\u0002\u0002\u0002\u009a\u008e\u0003\u0002\u0002\u0002\u009a\u0096\u0003",
    "\u0002\u0002\u0002\u009b\u0015\u0003\u0002\u0002\u0002\u009c\u00a0\u0007",
    "\u0014\u0002\u0002\u009d\u009f\u0005\u001a\u000e\u0002\u009e\u009d\u0003",
    "\u0002\u0002\u0002\u009f\u00a2\u0003\u0002\u0002\u0002\u00a0\u009e\u0003",
    "\u0002\u0002\u0002\u00a0\u00a1\u0003\u0002\u0002\u0002\u00a1\u00a9\u0003",
    "\u0002\u0002\u0002\u00a2\u00a0\u0003\u0002\u0002\u0002\u00a3\u00a5\u0005",
    "\u001a\u000e\u0002\u00a4\u00a3\u0003\u0002\u0002\u0002\u00a5\u00a6\u0003",
    "\u0002\u0002\u0002\u00a6\u00a4\u0003\u0002\u0002\u0002\u00a6\u00a7\u0003",
    "\u0002\u0002\u0002\u00a7\u00a9\u0003\u0002\u0002\u0002\u00a8\u009c\u0003",
    "\u0002\u0002\u0002\u00a8\u00a4\u0003\u0002\u0002\u0002\u00a9\u0017\u0003",
    "\u0002\u0002\u0002\u00aa\u00ac\u0005\u0004\u0003\u0002\u00ab\u00aa\u0003",
    "\u0002\u0002\u0002\u00ab\u00ac\u0003\u0002\u0002\u0002\u00ac\u00ae\u0003",
    "\u0002\u0002\u0002\u00ad\u00af\u0005\n\u0006\u0002\u00ae\u00ad\u0003",
    "\u0002\u0002\u0002\u00ae\u00af\u0003\u0002\u0002\u0002\u00af\u0019\u0003",
    "\u0002\u0002\u0002\u00b0\u00b1\u0007\u0017\u0002\u0002\u00b1\u001b\u0003",
    "\u0002\u0002\u0002\u00b2\u00b5\u0007\u001a\u0002\u0002\u00b3\u00b5\t",
    "\u0003\u0002\u0002\u00b4\u00b2\u0003\u0002\u0002\u0002\u00b4\u00b3\u0003",
    "\u0002\u0002\u0002\u00b5\u001d\u0003\u0002\u0002\u0002\u001c!#,.3:@",
    "IPW[`ir{\u008a\u008c\u0092\u0098\u009a\u00a0\u00a6\u00a8\u00ab\u00ae",
    "\u00b4"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'>'", "'<'", "'('", "')'", "'['", "']'", "'{'", 
                     "'}'", "'.'", null, "'!'", "'*'", "'^'", "'$'", "','" ];

var symbolicNames = [ null, "GT", "LT", "LP", "RP", "LB", "RB", "LCB", "RCB", 
                      "DOT", "WS", "EXC", "AST", "HAT", "DOL", "COM", "NL", 
                      "DYN", "SYM", "OR", "EQ", "TF", "ENT", "INT", "OP", 
                      "CHR" ];

var ruleNames =  [ "script", "expr", "cexpr", "cond", "weight", "choice", 
                   "dassign", "assign", "chars", "dynamic", "symbol", "wexpr", 
                   "transform", "op" ];

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
RiScriptParser.GT = 1;
RiScriptParser.LT = 2;
RiScriptParser.LP = 3;
RiScriptParser.RP = 4;
RiScriptParser.LB = 5;
RiScriptParser.RB = 6;
RiScriptParser.LCB = 7;
RiScriptParser.RCB = 8;
RiScriptParser.DOT = 9;
RiScriptParser.WS = 10;
RiScriptParser.EXC = 11;
RiScriptParser.AST = 12;
RiScriptParser.HAT = 13;
RiScriptParser.DOL = 14;
RiScriptParser.COM = 15;
RiScriptParser.NL = 16;
RiScriptParser.DYN = 17;
RiScriptParser.SYM = 18;
RiScriptParser.OR = 19;
RiScriptParser.EQ = 20;
RiScriptParser.TF = 21;
RiScriptParser.ENT = 22;
RiScriptParser.INT = 23;
RiScriptParser.OP = 24;
RiScriptParser.CHR = 25;

RiScriptParser.RULE_script = 0;
RiScriptParser.RULE_expr = 1;
RiScriptParser.RULE_cexpr = 2;
RiScriptParser.RULE_cond = 3;
RiScriptParser.RULE_weight = 4;
RiScriptParser.RULE_choice = 5;
RiScriptParser.RULE_dassign = 6;
RiScriptParser.RULE_assign = 7;
RiScriptParser.RULE_chars = 8;
RiScriptParser.RULE_dynamic = 9;
RiScriptParser.RULE_symbol = 10;
RiScriptParser.RULE_wexpr = 11;
RiScriptParser.RULE_transform = 12;
RiScriptParser.RULE_op = 13;


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
    if(listener instanceof RiScriptListener ) {
        listener.enterScript(this);
	}
};

ScriptContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptListener ) {
        listener.exitScript(this);
	}
};

ScriptContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptVisitor ) {
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
        this.state = 31; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 31;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
            switch(la_) {
            case 1:
                this.state = 28;
                this.expr();
                break;

            case 2:
                this.state = 29;
                this.cexpr();
                break;

            case 3:
                this.state = 30;
                this.match(RiScriptParser.NL);
                break;

            }
            this.state = 33; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << RiScriptParser.GT) | (1 << RiScriptParser.LT) | (1 << RiScriptParser.LP) | (1 << RiScriptParser.LCB) | (1 << RiScriptParser.DOT) | (1 << RiScriptParser.WS) | (1 << RiScriptParser.EXC) | (1 << RiScriptParser.AST) | (1 << RiScriptParser.HAT) | (1 << RiScriptParser.DOL) | (1 << RiScriptParser.COM) | (1 << RiScriptParser.NL) | (1 << RiScriptParser.DYN) | (1 << RiScriptParser.SYM) | (1 << RiScriptParser.TF) | (1 << RiScriptParser.ENT) | (1 << RiScriptParser.INT) | (1 << RiScriptParser.CHR))) !== 0));
        this.state = 35;
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

ExprContext.prototype.dassign = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(DassignContext);
    } else {
        return this.getTypedRuleContext(DassignContext,i);
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
    if(listener instanceof RiScriptListener ) {
        listener.enterExpr(this);
	}
};

ExprContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptListener ) {
        listener.exitExpr(this);
	}
};

ExprContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptVisitor ) {
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
        this.state = 42; 
        this._errHandler.sync(this);
        var _alt = 1;
        do {
        	switch (_alt) {
        	case 1:
        		this.state = 42;
        		this._errHandler.sync(this);
        		var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
        		switch(la_) {
        		case 1:
        		    this.state = 37;
        		    this.symbol();
        		    break;

        		case 2:
        		    this.state = 38;
        		    this.choice();
        		    break;

        		case 3:
        		    this.state = 39;
        		    this.assign();
        		    break;

        		case 4:
        		    this.state = 40;
        		    this.dassign();
        		    break;

        		case 5:
        		    this.state = 41;
        		    this.chars();
        		    break;

        		}
        		break;
        	default:
        		throw new antlr4.error.NoViableAltException(this);
        	}
        	this.state = 44; 
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
    if(listener instanceof RiScriptListener ) {
        listener.enterCexpr(this);
	}
};

CexprContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptListener ) {
        listener.exitCexpr(this);
	}
};

CexprContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptVisitor ) {
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
        this.state = 49;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.WS) {
            this.state = 46;
            this.match(RiScriptParser.WS);
            this.state = 51;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 52;
        this.match(RiScriptParser.LCB);
        this.state = 54; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 53;
            this.cond();
            this.state = 56; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===RiScriptParser.SYM || _la===RiScriptParser.TF);
        this.state = 58;
        this.match(RiScriptParser.RCB);
        this.state = 62;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,6,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 59;
                this.match(RiScriptParser.WS); 
            }
            this.state = 64;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,6,this._ctx);
        }

        this.state = 65;
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
    if(listener instanceof RiScriptListener ) {
        listener.enterCond(this);
	}
};

CondContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptListener ) {
        listener.exitCond(this);
	}
};

CondContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptVisitor ) {
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
        this.state = 67;
        this.symbol();
        this.state = 71;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.WS) {
            this.state = 68;
            this.match(RiScriptParser.WS);
            this.state = 73;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 74;
        this.op();
        this.state = 78;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,8,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 75;
                this.match(RiScriptParser.WS); 
            }
            this.state = 80;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,8,this._ctx);
        }

        this.state = 81;
        this.chars();
        this.state = 85;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.WS) {
            this.state = 82;
            this.match(RiScriptParser.WS);
            this.state = 87;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 89;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===RiScriptParser.COM) {
            this.state = 88;
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
    if(listener instanceof RiScriptListener ) {
        listener.enterWeight(this);
	}
};

WeightContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptListener ) {
        listener.exitWeight(this);
	}
};

WeightContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptVisitor ) {
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
        this.state = 94;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.WS) {
            this.state = 91;
            this.match(RiScriptParser.WS);
            this.state = 96;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 97;
        this.match(RiScriptParser.LB);
        this.state = 98;
        this.match(RiScriptParser.INT);
        this.state = 99;
        this.match(RiScriptParser.RB);
        this.state = 103;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.WS) {
            this.state = 100;
            this.match(RiScriptParser.WS);
            this.state = 105;
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
    if(listener instanceof RiScriptListener ) {
        listener.enterChoice(this);
	}
};

ChoiceContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptListener ) {
        listener.exitChoice(this);
	}
};

ChoiceContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptVisitor ) {
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
        this.state = 106;
        this.match(RiScriptParser.LP);
        this.state = 112;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,13,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 107;
                this.wexpr();
                this.state = 108;
                this.match(RiScriptParser.OR); 
            }
            this.state = 114;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,13,this._ctx);
        }

        this.state = 115;
        this.wexpr();
        this.state = 116;
        this.match(RiScriptParser.RP);
        this.state = 121;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,14,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 118;
                this.transform(); 
            }
            this.state = 123;
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


function DassignContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RiScriptParser.RULE_dassign;
    return this;
}

DassignContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DassignContext.prototype.constructor = DassignContext;

DassignContext.prototype.dynamic = function() {
    return this.getTypedRuleContext(DynamicContext,0);
};

DassignContext.prototype.EQ = function() {
    return this.getToken(RiScriptParser.EQ, 0);
};

DassignContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

DassignContext.prototype.enterRule = function(listener) {
    if(listener instanceof RiScriptListener ) {
        listener.enterDassign(this);
	}
};

DassignContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptListener ) {
        listener.exitDassign(this);
	}
};

DassignContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptVisitor ) {
        return visitor.visitDassign(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.DassignContext = DassignContext;

RiScriptParser.prototype.dassign = function() {

    var localctx = new DassignContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, RiScriptParser.RULE_dassign);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 124;
        this.dynamic();
        this.state = 125;
        this.match(RiScriptParser.EQ);
        this.state = 126;
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

AssignContext.prototype.symbol = function() {
    return this.getTypedRuleContext(SymbolContext,0);
};

AssignContext.prototype.EQ = function() {
    return this.getToken(RiScriptParser.EQ, 0);
};

AssignContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

AssignContext.prototype.enterRule = function(listener) {
    if(listener instanceof RiScriptListener ) {
        listener.enterAssign(this);
	}
};

AssignContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptListener ) {
        listener.exitAssign(this);
	}
};

AssignContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptVisitor ) {
        return visitor.visitAssign(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.AssignContext = AssignContext;

RiScriptParser.prototype.assign = function() {

    var localctx = new AssignContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, RiScriptParser.RULE_assign);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 128;
        this.symbol();
        this.state = 129;
        this.match(RiScriptParser.EQ);
        this.state = 130;
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


CharsContext.prototype.enterRule = function(listener) {
    if(listener instanceof RiScriptListener ) {
        listener.enterChars(this);
	}
};

CharsContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptListener ) {
        listener.exitChars(this);
	}
};

CharsContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptVisitor ) {
        return visitor.visitChars(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.CharsContext = CharsContext;

RiScriptParser.prototype.chars = function() {

    var localctx = new CharsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, RiScriptParser.RULE_chars);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 136; 
        this._errHandler.sync(this);
        var _alt = 1;
        do {
        	switch (_alt) {
        	case 1:
        		this.state = 136;
        		this._errHandler.sync(this);
        		switch(this._input.LA(1)) {
        		case RiScriptParser.GT:
        		case RiScriptParser.LT:
        		case RiScriptParser.DOT:
        		case RiScriptParser.WS:
        		case RiScriptParser.EXC:
        		case RiScriptParser.AST:
        		case RiScriptParser.HAT:
        		case RiScriptParser.DOL:
        		case RiScriptParser.COM:
        		    this.state = 132;
        		    _la = this._input.LA(1);
        		    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << RiScriptParser.GT) | (1 << RiScriptParser.LT) | (1 << RiScriptParser.DOT) | (1 << RiScriptParser.WS) | (1 << RiScriptParser.EXC) | (1 << RiScriptParser.AST) | (1 << RiScriptParser.HAT) | (1 << RiScriptParser.DOL) | (1 << RiScriptParser.COM))) !== 0))) {
        		    this._errHandler.recoverInline(this);
        		    }
        		    else {
        		    	this._errHandler.reportMatch(this);
        		        this.consume();
        		    }
        		    break;
        		case RiScriptParser.CHR:
        		    this.state = 133;
        		    this.match(RiScriptParser.CHR);
        		    break;
        		case RiScriptParser.ENT:
        		    this.state = 134;
        		    this.match(RiScriptParser.ENT);
        		    break;
        		case RiScriptParser.INT:
        		    this.state = 135;
        		    this.match(RiScriptParser.INT);
        		    break;
        		default:
        		    throw new antlr4.error.NoViableAltException(this);
        		}
        		break;
        	default:
        		throw new antlr4.error.NoViableAltException(this);
        	}
        	this.state = 138; 
        	this._errHandler.sync(this);
        	_alt = this._interp.adaptivePredict(this._input,16, this._ctx);
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
    if(listener instanceof RiScriptListener ) {
        listener.enterDynamic(this);
	}
};

DynamicContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptListener ) {
        listener.exitDynamic(this);
	}
};

DynamicContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptVisitor ) {
        return visitor.visitDynamic(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.DynamicContext = DynamicContext;

RiScriptParser.prototype.dynamic = function() {

    var localctx = new DynamicContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, RiScriptParser.RULE_dynamic);
    var _la = 0; // Token type
    try {
        this.state = 152;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case RiScriptParser.DYN:
            this.enterOuterAlt(localctx, 1);
            this.state = 140;
            this.match(RiScriptParser.DYN);
            this.state = 144;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===RiScriptParser.TF) {
                this.state = 141;
                this.transform();
                this.state = 146;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            break;
        case RiScriptParser.TF:
            this.enterOuterAlt(localctx, 2);
            this.state = 148; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 147;
                this.transform();
                this.state = 150; 
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while(_la===RiScriptParser.TF);
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
    if(listener instanceof RiScriptListener ) {
        listener.enterSymbol(this);
	}
};

SymbolContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptListener ) {
        listener.exitSymbol(this);
	}
};

SymbolContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptVisitor ) {
        return visitor.visitSymbol(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.SymbolContext = SymbolContext;

RiScriptParser.prototype.symbol = function() {

    var localctx = new SymbolContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, RiScriptParser.RULE_symbol);
    try {
        this.state = 166;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case RiScriptParser.SYM:
            this.enterOuterAlt(localctx, 1);
            this.state = 154;
            this.match(RiScriptParser.SYM);
            this.state = 158;
            this._errHandler.sync(this);
            var _alt = this._interp.adaptivePredict(this._input,20,this._ctx)
            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
                if(_alt===1) {
                    this.state = 155;
                    this.transform(); 
                }
                this.state = 160;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input,20,this._ctx);
            }

            break;
        case RiScriptParser.TF:
            this.enterOuterAlt(localctx, 2);
            this.state = 162; 
            this._errHandler.sync(this);
            var _alt = 1;
            do {
            	switch (_alt) {
            	case 1:
            		this.state = 161;
            		this.transform();
            		break;
            	default:
            		throw new antlr4.error.NoViableAltException(this);
            	}
            	this.state = 164; 
            	this._errHandler.sync(this);
            	_alt = this._interp.adaptivePredict(this._input,21, this._ctx);
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
    if(listener instanceof RiScriptListener ) {
        listener.enterWexpr(this);
	}
};

WexprContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptListener ) {
        listener.exitWexpr(this);
	}
};

WexprContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptVisitor ) {
        return visitor.visitWexpr(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.WexprContext = WexprContext;

RiScriptParser.prototype.wexpr = function() {

    var localctx = new WexprContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, RiScriptParser.RULE_wexpr);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 169;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,23,this._ctx);
        if(la_===1) {
            this.state = 168;
            this.expr();

        }
        this.state = 172;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===RiScriptParser.LB || _la===RiScriptParser.WS) {
            this.state = 171;
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
    if(listener instanceof RiScriptListener ) {
        listener.enterTransform(this);
	}
};

TransformContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptListener ) {
        listener.exitTransform(this);
	}
};

TransformContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptVisitor ) {
        return visitor.visitTransform(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.TransformContext = TransformContext;

RiScriptParser.prototype.transform = function() {

    var localctx = new TransformContext(this, this._ctx, this.state);
    this.enterRule(localctx, 24, RiScriptParser.RULE_transform);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 174;
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
    if(listener instanceof RiScriptListener ) {
        listener.enterOp(this);
	}
};

OpContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptListener ) {
        listener.exitOp(this);
	}
};

OpContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptVisitor ) {
        return visitor.visitOp(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.OpContext = OpContext;

RiScriptParser.prototype.op = function() {

    var localctx = new OpContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, RiScriptParser.RULE_op);
    var _la = 0; // Token type
    try {
        this.state = 178;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case RiScriptParser.OP:
            this.enterOuterAlt(localctx, 1);
            this.state = 176;
            this.match(RiScriptParser.OP);
            break;
        case RiScriptParser.GT:
        case RiScriptParser.LT:
        case RiScriptParser.EQ:
            this.enterOuterAlt(localctx, 2);
            this.state = 177;
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
