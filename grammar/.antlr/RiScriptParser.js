// Generated from grammar/RiScript.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var RiScriptListener = require('./RiScriptListener').RiScriptListener;
var RiScriptVisitor = require('./RiScriptVisitor').RiScriptVisitor;

var grammarFileName = "RiScript.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u001a\u00a7\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0004\u000e\t\u000e\u0003\u0002\u0003\u0002\u0003\u0002",
    "\u0006\u0002 \n\u0002\r\u0002\u000e\u0002!\u0003\u0002\u0003\u0002\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0006\u0003+",
    "\n\u0003\r\u0003\u000e\u0003,\u0003\u0004\u0007\u00040\n\u0004\f\u0004",
    "\u000e\u00043\u000b\u0004\u0003\u0004\u0003\u0004\u0006\u00047\n\u0004",
    "\r\u0004\u000e\u00048\u0003\u0004\u0003\u0004\u0007\u0004=\n\u0004\f",
    "\u0004\u000e\u0004@\u000b\u0004\u0003\u0004\u0003\u0004\u0003\u0005",
    "\u0003\u0005\u0007\u0005F\n\u0005\f\u0005\u000e\u0005I\u000b\u0005\u0003",
    "\u0005\u0003\u0005\u0007\u0005M\n\u0005\f\u0005\u000e\u0005P\u000b\u0005",
    "\u0003\u0005\u0003\u0005\u0007\u0005T\n\u0005\f\u0005\u000e\u0005W\u000b",
    "\u0005\u0003\u0005\u0005\u0005Z\n\u0005\u0003\u0006\u0007\u0006]\n\u0006",
    "\f\u0006\u000e\u0006`\u000b\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0007\u0006f\n\u0006\f\u0006\u000e\u0006i\u000b\u0006\u0003",
    "\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0007\u0007o\n\u0007\f\u0007",
    "\u000e\u0007r\u000b\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003",
    "\u0007\u0007\u0007x\n\u0007\f\u0007\u000e\u0007{\u000b\u0007\u0003\b",
    "\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0007\b\u0083\n\b\f\b\u000e",
    "\b\u0086\u000b\b\u0003\t\u0003\t\u0003\t\u0003\t\u0003\n\u0003\n\u0003",
    "\n\u0003\n\u0006\n\u0090\n\n\r\n\u000e\n\u0091\u0003\u000b\u0003\u000b",
    "\u0007\u000b\u0096\n\u000b\f\u000b\u000e\u000b\u0099\u000b\u000b\u0003",
    "\f\u0005\f\u009c\n\f\u0003\f\u0005\f\u009f\n\f\u0003\r\u0003\r\u0003",
    "\u000e\u0003\u000e\u0005\u000e\u00a5\n\u000e\u0003\u000e\u0002\u0002",
    "\u000f\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a",
    "\u0002\u0004\u0004\u0002\u0003\u0004\u000b\u0011\u0004\u0002\u0003\u0004",
    "\u0015\u0015\u0002\u00b5\u0002\u001f\u0003\u0002\u0002\u0002\u0004*",
    "\u0003\u0002\u0002\u0002\u00061\u0003\u0002\u0002\u0002\bC\u0003\u0002",
    "\u0002\u0002\n^\u0003\u0002\u0002\u0002\fj\u0003\u0002\u0002\u0002\u000e",
    "|\u0003\u0002\u0002\u0002\u0010\u0087\u0003\u0002\u0002\u0002\u0012",
    "\u008f\u0003\u0002\u0002\u0002\u0014\u0093\u0003\u0002\u0002\u0002\u0016",
    "\u009b\u0003\u0002\u0002\u0002\u0018\u00a0\u0003\u0002\u0002\u0002\u001a",
    "\u00a4\u0003\u0002\u0002\u0002\u001c \u0005\u0004\u0003\u0002\u001d",
    " \u0005\u0006\u0004\u0002\u001e \u0007\u0012\u0002\u0002\u001f\u001c",
    "\u0003\u0002\u0002\u0002\u001f\u001d\u0003\u0002\u0002\u0002\u001f\u001e",
    "\u0003\u0002\u0002\u0002 !\u0003\u0002\u0002\u0002!\u001f\u0003\u0002",
    "\u0002\u0002!\"\u0003\u0002\u0002\u0002\"#\u0003\u0002\u0002\u0002#",
    "$\u0007\u0002\u0002\u0003$\u0003\u0003\u0002\u0002\u0002%+\u0005\u0014",
    "\u000b\u0002&+\u0005\f\u0007\u0002\'+\u0005\u0010\t\u0002(+\u0005\u000e",
    "\b\u0002)+\u0005\u0012\n\u0002*%\u0003\u0002\u0002\u0002*&\u0003\u0002",
    "\u0002\u0002*\'\u0003\u0002\u0002\u0002*(\u0003\u0002\u0002\u0002*)",
    "\u0003\u0002\u0002\u0002+,\u0003\u0002\u0002\u0002,*\u0003\u0002\u0002",
    "\u0002,-\u0003\u0002\u0002\u0002-\u0005\u0003\u0002\u0002\u0002.0\u0007",
    "\f\u0002\u0002/.\u0003\u0002\u0002\u000203\u0003\u0002\u0002\u00021",
    "/\u0003\u0002\u0002\u000212\u0003\u0002\u0002\u000224\u0003\u0002\u0002",
    "\u000231\u0003\u0002\u0002\u000246\u0007\t\u0002\u000257\u0005\b\u0005",
    "\u000265\u0003\u0002\u0002\u000278\u0003\u0002\u0002\u000286\u0003\u0002",
    "\u0002\u000289\u0003\u0002\u0002\u00029:\u0003\u0002\u0002\u0002:>\u0007",
    "\n\u0002\u0002;=\u0007\f\u0002\u0002<;\u0003\u0002\u0002\u0002=@\u0003",
    "\u0002\u0002\u0002><\u0003\u0002\u0002\u0002>?\u0003\u0002\u0002\u0002",
    "?A\u0003\u0002\u0002\u0002@>\u0003\u0002\u0002\u0002AB\u0005\u0004\u0003",
    "\u0002B\u0007\u0003\u0002\u0002\u0002CG\u0007\u0013\u0002\u0002DF\u0007",
    "\f\u0002\u0002ED\u0003\u0002\u0002\u0002FI\u0003\u0002\u0002\u0002G",
    "E\u0003\u0002\u0002\u0002GH\u0003\u0002\u0002\u0002HJ\u0003\u0002\u0002",
    "\u0002IG\u0003\u0002\u0002\u0002JN\u0005\u001a\u000e\u0002KM\u0007\f",
    "\u0002\u0002LK\u0003\u0002\u0002\u0002MP\u0003\u0002\u0002\u0002NL\u0003",
    "\u0002\u0002\u0002NO\u0003\u0002\u0002\u0002OQ\u0003\u0002\u0002\u0002",
    "PN\u0003\u0002\u0002\u0002QU\u0005\u0012\n\u0002RT\u0007\f\u0002\u0002",
    "SR\u0003\u0002\u0002\u0002TW\u0003\u0002\u0002\u0002US\u0003\u0002\u0002",
    "\u0002UV\u0003\u0002\u0002\u0002VY\u0003\u0002\u0002\u0002WU\u0003\u0002",
    "\u0002\u0002XZ\u0007\u0011\u0002\u0002YX\u0003\u0002\u0002\u0002YZ\u0003",
    "\u0002\u0002\u0002Z\t\u0003\u0002\u0002\u0002[]\u0007\f\u0002\u0002",
    "\\[\u0003\u0002\u0002\u0002]`\u0003\u0002\u0002\u0002^\\\u0003\u0002",
    "\u0002\u0002^_\u0003\u0002\u0002\u0002_a\u0003\u0002\u0002\u0002`^\u0003",
    "\u0002\u0002\u0002ab\u0007\u0007\u0002\u0002bc\u0007\u0018\u0002\u0002",
    "cg\u0007\b\u0002\u0002df\u0007\f\u0002\u0002ed\u0003\u0002\u0002\u0002",
    "fi\u0003\u0002\u0002\u0002ge\u0003\u0002\u0002\u0002gh\u0003\u0002\u0002",
    "\u0002h\u000b\u0003\u0002\u0002\u0002ig\u0003\u0002\u0002\u0002jp\u0007",
    "\u0005\u0002\u0002kl\u0005\u0016\f\u0002lm\u0007\u0014\u0002\u0002m",
    "o\u0003\u0002\u0002\u0002nk\u0003\u0002\u0002\u0002or\u0003\u0002\u0002",
    "\u0002pn\u0003\u0002\u0002\u0002pq\u0003\u0002\u0002\u0002qs\u0003\u0002",
    "\u0002\u0002rp\u0003\u0002\u0002\u0002st\u0005\u0016\f\u0002tu\u0007",
    "\u0006\u0002\u0002uy\u0003\u0002\u0002\u0002vx\u0005\u0018\r\u0002w",
    "v\u0003\u0002\u0002\u0002x{\u0003\u0002\u0002\u0002yw\u0003\u0002\u0002",
    "\u0002yz\u0003\u0002\u0002\u0002z\r\u0003\u0002\u0002\u0002{y\u0003",
    "\u0002\u0002\u0002|}\u0007\u0007\u0002\u0002}~\u0005\u0014\u000b\u0002",
    "~\u007f\u0007\u0015\u0002\u0002\u007f\u0080\u0005\u0004\u0003\u0002",
    "\u0080\u0084\u0007\b\u0002\u0002\u0081\u0083\u0005\u0018\r\u0002\u0082",
    "\u0081\u0003\u0002\u0002\u0002\u0083\u0086\u0003\u0002\u0002\u0002\u0084",
    "\u0082\u0003\u0002\u0002\u0002\u0084\u0085\u0003\u0002\u0002\u0002\u0085",
    "\u000f\u0003\u0002\u0002\u0002\u0086\u0084\u0003\u0002\u0002\u0002\u0087",
    "\u0088\u0005\u0014\u000b\u0002\u0088\u0089\u0007\u0015\u0002\u0002\u0089",
    "\u008a\u0005\u0004\u0003\u0002\u008a\u0011\u0003\u0002\u0002\u0002\u008b",
    "\u0090\u0007\u001a\u0002\u0002\u008c\u0090\u0007\u0017\u0002\u0002\u008d",
    "\u0090\u0007\u0018\u0002\u0002\u008e\u0090\t\u0002\u0002\u0002\u008f",
    "\u008b\u0003\u0002\u0002\u0002\u008f\u008c\u0003\u0002\u0002\u0002\u008f",
    "\u008d\u0003\u0002\u0002\u0002\u008f\u008e\u0003\u0002\u0002\u0002\u0090",
    "\u0091\u0003\u0002\u0002\u0002\u0091\u008f\u0003\u0002\u0002\u0002\u0091",
    "\u0092\u0003\u0002\u0002\u0002\u0092\u0013\u0003\u0002\u0002\u0002\u0093",
    "\u0097\u0007\u0013\u0002\u0002\u0094\u0096\u0005\u0018\r\u0002\u0095",
    "\u0094\u0003\u0002\u0002\u0002\u0096\u0099\u0003\u0002\u0002\u0002\u0097",
    "\u0095\u0003\u0002\u0002\u0002\u0097\u0098\u0003\u0002\u0002\u0002\u0098",
    "\u0015\u0003\u0002\u0002\u0002\u0099\u0097\u0003\u0002\u0002\u0002\u009a",
    "\u009c\u0005\u0004\u0003\u0002\u009b\u009a\u0003\u0002\u0002\u0002\u009b",
    "\u009c\u0003\u0002\u0002\u0002\u009c\u009e\u0003\u0002\u0002\u0002\u009d",
    "\u009f\u0005\n\u0006\u0002\u009e\u009d\u0003\u0002\u0002\u0002\u009e",
    "\u009f\u0003\u0002\u0002\u0002\u009f\u0017\u0003\u0002\u0002\u0002\u00a0",
    "\u00a1\u0007\u0016\u0002\u0002\u00a1\u0019\u0003\u0002\u0002\u0002\u00a2",
    "\u00a5\u0007\u0019\u0002\u0002\u00a3\u00a5\t\u0003\u0002\u0002\u00a4",
    "\u00a2\u0003\u0002\u0002\u0002\u00a4\u00a3\u0003\u0002\u0002\u0002\u00a5",
    "\u001b\u0003\u0002\u0002\u0002\u0018\u001f!*,18>GNUY^gpy\u0084\u008f",
    "\u0091\u0097\u009b\u009e\u00a4"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'>'", "'<'", "'('", "')'", "'['", "']'", "'{'", 
                     "'}'", "'.'", null, "'!'", "'*'", "'^'", "'$'", "','" ];

var symbolicNames = [ null, "GT", "LT", "LP", "RP", "LB", "RB", "LCB", "RCB", 
                      "DOT", "WS", "EXC", "AST", "HAT", "DOL", "COM", "NL", 
                      "SYM", "OR", "EQ", "TF", "ENT", "INT", "OP", "CHR" ];

var ruleNames =  [ "script", "expr", "cexpr", "cond", "weight", "choice", 
                   "inline", "assign", "chars", "symbol", "wexpr", "transform", 
                   "op" ];

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
RiScriptParser.SYM = 17;
RiScriptParser.OR = 18;
RiScriptParser.EQ = 19;
RiScriptParser.TF = 20;
RiScriptParser.ENT = 21;
RiScriptParser.INT = 22;
RiScriptParser.OP = 23;
RiScriptParser.CHR = 24;

RiScriptParser.RULE_script = 0;
RiScriptParser.RULE_expr = 1;
RiScriptParser.RULE_cexpr = 2;
RiScriptParser.RULE_cond = 3;
RiScriptParser.RULE_weight = 4;
RiScriptParser.RULE_choice = 5;
RiScriptParser.RULE_inline = 6;
RiScriptParser.RULE_assign = 7;
RiScriptParser.RULE_chars = 8;
RiScriptParser.RULE_symbol = 9;
RiScriptParser.RULE_wexpr = 10;
RiScriptParser.RULE_transform = 11;
RiScriptParser.RULE_op = 12;

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
        this.state = 29; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 29;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
            switch(la_) {
            case 1:
                this.state = 26;
                this.expr();
                break;

            case 2:
                this.state = 27;
                this.cexpr();
                break;

            case 3:
                this.state = 28;
                this.match(RiScriptParser.NL);
                break;

            }
            this.state = 31; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << RiScriptParser.GT) | (1 << RiScriptParser.LT) | (1 << RiScriptParser.LP) | (1 << RiScriptParser.LB) | (1 << RiScriptParser.LCB) | (1 << RiScriptParser.DOT) | (1 << RiScriptParser.WS) | (1 << RiScriptParser.EXC) | (1 << RiScriptParser.AST) | (1 << RiScriptParser.HAT) | (1 << RiScriptParser.DOL) | (1 << RiScriptParser.COM) | (1 << RiScriptParser.NL) | (1 << RiScriptParser.SYM) | (1 << RiScriptParser.ENT) | (1 << RiScriptParser.INT) | (1 << RiScriptParser.CHR))) !== 0));
        this.state = 33;
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

ExprContext.prototype.inline = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(InlineContext);
    } else {
        return this.getTypedRuleContext(InlineContext,i);
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
        this.state = 40; 
        this._errHandler.sync(this);
        var _alt = 1;
        do {
        	switch (_alt) {
        	case 1:
        		this.state = 40;
        		this._errHandler.sync(this);
        		var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
        		switch(la_) {
        		case 1:
        		    this.state = 35;
        		    this.symbol();
        		    break;

        		case 2:
        		    this.state = 36;
        		    this.choice();
        		    break;

        		case 3:
        		    this.state = 37;
        		    this.assign();
        		    break;

        		case 4:
        		    this.state = 38;
        		    this.inline();
        		    break;

        		case 5:
        		    this.state = 39;
        		    this.chars();
        		    break;

        		}
        		break;
        	default:
        		throw new antlr4.error.NoViableAltException(this);
        	}
        	this.state = 42; 
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
        this.state = 47;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.WS) {
            this.state = 44;
            this.match(RiScriptParser.WS);
            this.state = 49;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 50;
        this.match(RiScriptParser.LCB);
        this.state = 52; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 51;
            this.cond();
            this.state = 54; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while(_la===RiScriptParser.SYM);
        this.state = 56;
        this.match(RiScriptParser.RCB);
        this.state = 60;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,6,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 57;
                this.match(RiScriptParser.WS); 
            }
            this.state = 62;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,6,this._ctx);
        }

        this.state = 63;
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

CondContext.prototype.SYM = function() {
    return this.getToken(RiScriptParser.SYM, 0);
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
        this.state = 65;
        this.match(RiScriptParser.SYM);
        this.state = 69;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.WS) {
            this.state = 66;
            this.match(RiScriptParser.WS);
            this.state = 71;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 72;
        this.op();
        this.state = 76;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,8,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 73;
                this.match(RiScriptParser.WS); 
            }
            this.state = 78;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,8,this._ctx);
        }

        this.state = 79;
        this.chars();
        this.state = 83;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.WS) {
            this.state = 80;
            this.match(RiScriptParser.WS);
            this.state = 85;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 87;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===RiScriptParser.COM) {
            this.state = 86;
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
        this.state = 92;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.WS) {
            this.state = 89;
            this.match(RiScriptParser.WS);
            this.state = 94;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 95;
        this.match(RiScriptParser.LB);
        this.state = 96;
        this.match(RiScriptParser.INT);
        this.state = 97;
        this.match(RiScriptParser.RB);
        this.state = 101;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.WS) {
            this.state = 98;
            this.match(RiScriptParser.WS);
            this.state = 103;
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
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 104;
        this.match(RiScriptParser.LP);
        this.state = 110;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,13,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 105;
                this.wexpr();
                this.state = 106;
                this.match(RiScriptParser.OR); 
            }
            this.state = 112;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,13,this._ctx);
        }

        this.state = 113;
        this.wexpr();
        this.state = 114;
        this.match(RiScriptParser.RP);
        this.state = 119;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.TF) {
            this.state = 116;
            this.transform();
            this.state = 121;
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

function InlineContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RiScriptParser.RULE_inline;
    return this;
}

InlineContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
InlineContext.prototype.constructor = InlineContext;

InlineContext.prototype.LB = function() {
    return this.getToken(RiScriptParser.LB, 0);
};

InlineContext.prototype.symbol = function() {
    return this.getTypedRuleContext(SymbolContext,0);
};

InlineContext.prototype.EQ = function() {
    return this.getToken(RiScriptParser.EQ, 0);
};

InlineContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

InlineContext.prototype.RB = function() {
    return this.getToken(RiScriptParser.RB, 0);
};

InlineContext.prototype.transform = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(TransformContext);
    } else {
        return this.getTypedRuleContext(TransformContext,i);
    }
};

InlineContext.prototype.enterRule = function(listener) {
    if(listener instanceof RiScriptListener ) {
        listener.enterInline(this);
	}
};

InlineContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptListener ) {
        listener.exitInline(this);
	}
};

InlineContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptVisitor ) {
        return visitor.visitInline(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.InlineContext = InlineContext;

RiScriptParser.prototype.inline = function() {

    var localctx = new InlineContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, RiScriptParser.RULE_inline);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 122;
        this.match(RiScriptParser.LB);
        this.state = 123;
        this.symbol();
        this.state = 124;
        this.match(RiScriptParser.EQ);
        this.state = 125;
        this.expr();
        this.state = 126;
        this.match(RiScriptParser.RB);
        this.state = 130;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.TF) {
            this.state = 127;
            this.transform();
            this.state = 132;
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
        this.state = 133;
        this.symbol();
        this.state = 134;
        this.match(RiScriptParser.EQ);
        this.state = 135;
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
        this.state = 141; 
        this._errHandler.sync(this);
        var _alt = 1;
        do {
        	switch (_alt) {
        	case 1:
        		this.state = 141;
        		this._errHandler.sync(this);
        		switch(this._input.LA(1)) {
        		case RiScriptParser.CHR:
        		    this.state = 137;
        		    this.match(RiScriptParser.CHR);
        		    break;
        		case RiScriptParser.ENT:
        		    this.state = 138;
        		    this.match(RiScriptParser.ENT);
        		    break;
        		case RiScriptParser.INT:
        		    this.state = 139;
        		    this.match(RiScriptParser.INT);
        		    break;
        		case RiScriptParser.GT:
        		case RiScriptParser.LT:
        		case RiScriptParser.DOT:
        		case RiScriptParser.WS:
        		case RiScriptParser.EXC:
        		case RiScriptParser.AST:
        		case RiScriptParser.HAT:
        		case RiScriptParser.DOL:
        		case RiScriptParser.COM:
        		    this.state = 140;
        		    _la = this._input.LA(1);
        		    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << RiScriptParser.GT) | (1 << RiScriptParser.LT) | (1 << RiScriptParser.DOT) | (1 << RiScriptParser.WS) | (1 << RiScriptParser.EXC) | (1 << RiScriptParser.AST) | (1 << RiScriptParser.HAT) | (1 << RiScriptParser.DOL) | (1 << RiScriptParser.COM))) !== 0))) {
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
        		break;
        	default:
        		throw new antlr4.error.NoViableAltException(this);
        	}
        	this.state = 143; 
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
    this.enterRule(localctx, 18, RiScriptParser.RULE_symbol);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 145;
        this.match(RiScriptParser.SYM);
        this.state = 149;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.TF) {
            this.state = 146;
            this.transform();
            this.state = 151;
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
    this.enterRule(localctx, 20, RiScriptParser.RULE_wexpr);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 153;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,19,this._ctx);
        if(la_===1) {
            this.state = 152;
            this.expr();

        }
        this.state = 156;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===RiScriptParser.LB || _la===RiScriptParser.WS) {
            this.state = 155;
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
    this.enterRule(localctx, 22, RiScriptParser.RULE_transform);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 158;
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
    this.enterRule(localctx, 24, RiScriptParser.RULE_op);
    var _la = 0; // Token type
    try {
        this.state = 162;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case RiScriptParser.OP:
            this.enterOuterAlt(localctx, 1);
            this.state = 160;
            this.match(RiScriptParser.OP);
            break;
        case RiScriptParser.GT:
        case RiScriptParser.LT:
        case RiScriptParser.EQ:
            this.enterOuterAlt(localctx, 2);
            this.state = 161;
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
