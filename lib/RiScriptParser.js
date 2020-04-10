// Generated from grammar/RiScript.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var RiScriptListener = require('./RiScriptListener').RiScriptListener;
var RiScriptVisitor = require('./RiScriptVisitor').RiScriptVisitor;

var grammarFileName = "RiScript.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u0019\u008c\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0003\u0002\u0003\u0002\u0006\u0002\u001d\n\u0002\r\u0002",
    "\u000e\u0002\u001e\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0006\u0003(\n\u0003\r\u0003\u000e\u0003",
    ")\u0003\u0004\u0007\u0004-\n\u0004\f\u0004\u000e\u00040\u000b\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0007\u00048\n\u0004\f\u0004\u000e\u0004;\u000b\u0004\u0003\u0005\u0007",
    "\u0005>\n\u0005\f\u0005\u000e\u0005A\u000b\u0005\u0003\u0005\u0003\u0005",
    "\u0003\u0005\u0003\u0005\u0007\u0005G\n\u0005\f\u0005\u000e\u0005J\u000b",
    "\u0005\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0007\u0006P",
    "\n\u0006\f\u0006\u000e\u0006S\u000b\u0006\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0007\u0006Y\n\u0006\f\u0006\u000e\u0006\\\u000b",
    "\u0006\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003",
    "\u0007\u0007\u0007d\n\u0007\f\u0007\u000e\u0007g\u000b\u0007\u0003\b",
    "\u0003\b\u0003\b\u0003\b\u0003\t\u0003\t\u0003\t\u0003\t\u0006\tq\n",
    "\t\r\t\u000e\tr\u0003\n\u0003\n\u0007\nw\n\n\f\n\u000e\nz\u000b\n\u0003",
    "\u000b\u0005\u000b}\n\u000b\u0003\u000b\u0005\u000b\u0080\n\u000b\u0003",
    "\f\u0003\f\u0003\r\u0005\r\u0085\n\r\u0003\r\u0003\r\u0003\r\u0005\r",
    "\u008a\n\r\u0003\r\u0002\u0002\u000e\u0002\u0004\u0006\b\n\f\u000e\u0010",
    "\u0012\u0014\u0016\u0018\u0002\u0003\u0004\u0002\u0003\u0004\u000b\u0010",
    "\u0002\u0097\u0002\u001c\u0003\u0002\u0002\u0002\u0004\'\u0003\u0002",
    "\u0002\u0002\u0006.\u0003\u0002\u0002\u0002\b?\u0003\u0002\u0002\u0002",
    "\nK\u0003\u0002\u0002\u0002\f]\u0003\u0002\u0002\u0002\u000eh\u0003",
    "\u0002\u0002\u0002\u0010p\u0003\u0002\u0002\u0002\u0012t\u0003\u0002",
    "\u0002\u0002\u0014|\u0003\u0002\u0002\u0002\u0016\u0081\u0003\u0002",
    "\u0002\u0002\u0018\u0089\u0003\u0002\u0002\u0002\u001a\u001d\u0005\u0004",
    "\u0003\u0002\u001b\u001d\u0007\u0011\u0002\u0002\u001c\u001a\u0003\u0002",
    "\u0002\u0002\u001c\u001b\u0003\u0002\u0002\u0002\u001d\u001e\u0003\u0002",
    "\u0002\u0002\u001e\u001c\u0003\u0002\u0002\u0002\u001e\u001f\u0003\u0002",
    "\u0002\u0002\u001f \u0003\u0002\u0002\u0002 !\u0007\u0002\u0002\u0003",
    "!\u0003\u0003\u0002\u0002\u0002\"(\u0005\u0012\n\u0002#(\u0005\n\u0006",
    "\u0002$(\u0005\u000e\b\u0002%(\u0005\f\u0007\u0002&(\u0005\u0010\t\u0002",
    "\'\"\u0003\u0002\u0002\u0002\'#\u0003\u0002\u0002\u0002\'$\u0003\u0002",
    "\u0002\u0002\'%\u0003\u0002\u0002\u0002\'&\u0003\u0002\u0002\u0002(",
    ")\u0003\u0002\u0002\u0002)\'\u0003\u0002\u0002\u0002)*\u0003\u0002\u0002",
    "\u0002*\u0005\u0003\u0002\u0002\u0002+-\u0007\f\u0002\u0002,+\u0003",
    "\u0002\u0002\u0002-0\u0003\u0002\u0002\u0002.,\u0003\u0002\u0002\u0002",
    "./\u0003\u0002\u0002\u0002/1\u0003\u0002\u0002\u00020.\u0003\u0002\u0002",
    "\u000212\u0007\t\u0002\u000223\u0007\u0012\u0002\u000234\u0005\u0018",
    "\r\u000245\u0005\u0010\t\u000259\u0007\n\u0002\u000268\u0007\f\u0002",
    "\u000276\u0003\u0002\u0002\u00028;\u0003\u0002\u0002\u000297\u0003\u0002",
    "\u0002\u00029:\u0003\u0002\u0002\u0002:\u0007\u0003\u0002\u0002\u0002",
    ";9\u0003\u0002\u0002\u0002<>\u0007\f\u0002\u0002=<\u0003\u0002\u0002",
    "\u0002>A\u0003\u0002\u0002\u0002?=\u0003\u0002\u0002\u0002?@\u0003\u0002",
    "\u0002\u0002@B\u0003\u0002\u0002\u0002A?\u0003\u0002\u0002\u0002BC\u0007",
    "\u0007\u0002\u0002CD\u0007\u0017\u0002\u0002DH\u0007\b\u0002\u0002E",
    "G\u0007\f\u0002\u0002FE\u0003\u0002\u0002\u0002GJ\u0003\u0002\u0002",
    "\u0002HF\u0003\u0002\u0002\u0002HI\u0003\u0002\u0002\u0002I\t\u0003",
    "\u0002\u0002\u0002JH\u0003\u0002\u0002\u0002KQ\u0007\u0005\u0002\u0002",
    "LM\u0005\u0014\u000b\u0002MN\u0007\u0013\u0002\u0002NP\u0003\u0002\u0002",
    "\u0002OL\u0003\u0002\u0002\u0002PS\u0003\u0002\u0002\u0002QO\u0003\u0002",
    "\u0002\u0002QR\u0003\u0002\u0002\u0002RT\u0003\u0002\u0002\u0002SQ\u0003",
    "\u0002\u0002\u0002TU\u0005\u0014\u000b\u0002UV\u0007\u0006\u0002\u0002",
    "VZ\u0003\u0002\u0002\u0002WY\u0005\u0016\f\u0002XW\u0003\u0002\u0002",
    "\u0002Y\\\u0003\u0002\u0002\u0002ZX\u0003\u0002\u0002\u0002Z[\u0003",
    "\u0002\u0002\u0002[\u000b\u0003\u0002\u0002\u0002\\Z\u0003\u0002\u0002",
    "\u0002]^\u0007\u0007\u0002\u0002^_\u0005\u0012\n\u0002_`\u0007\u0014",
    "\u0002\u0002`a\u0005\u0004\u0003\u0002ae\u0007\b\u0002\u0002bd\u0005",
    "\u0016\f\u0002cb\u0003\u0002\u0002\u0002dg\u0003\u0002\u0002\u0002e",
    "c\u0003\u0002\u0002\u0002ef\u0003\u0002\u0002\u0002f\r\u0003\u0002\u0002",
    "\u0002ge\u0003\u0002\u0002\u0002hi\u0005\u0012\n\u0002ij\u0007\u0014",
    "\u0002\u0002jk\u0005\u0004\u0003\u0002k\u000f\u0003\u0002\u0002\u0002",
    "lq\u0007\u0019\u0002\u0002mq\u0007\u0016\u0002\u0002nq\u0007\u0017\u0002",
    "\u0002oq\t\u0002\u0002\u0002pl\u0003\u0002\u0002\u0002pm\u0003\u0002",
    "\u0002\u0002pn\u0003\u0002\u0002\u0002po\u0003\u0002\u0002\u0002qr\u0003",
    "\u0002\u0002\u0002rp\u0003\u0002\u0002\u0002rs\u0003\u0002\u0002\u0002",
    "s\u0011\u0003\u0002\u0002\u0002tx\u0007\u0012\u0002\u0002uw\u0005\u0016",
    "\f\u0002vu\u0003\u0002\u0002\u0002wz\u0003\u0002\u0002\u0002xv\u0003",
    "\u0002\u0002\u0002xy\u0003\u0002\u0002\u0002y\u0013\u0003\u0002\u0002",
    "\u0002zx\u0003\u0002\u0002\u0002{}\u0005\u0004\u0003\u0002|{\u0003\u0002",
    "\u0002\u0002|}\u0003\u0002\u0002\u0002}\u007f\u0003\u0002\u0002\u0002",
    "~\u0080\u0005\b\u0005\u0002\u007f~\u0003\u0002\u0002\u0002\u007f\u0080",
    "\u0003\u0002\u0002\u0002\u0080\u0015\u0003\u0002\u0002\u0002\u0081\u0082",
    "\u0007\u0015\u0002\u0002\u0082\u0017\u0003\u0002\u0002\u0002\u0083\u0085",
    "\u0007\u0018\u0002\u0002\u0084\u0083\u0003\u0002\u0002\u0002\u0084\u0085",
    "\u0003\u0002\u0002\u0002\u0085\u0086\u0003\u0002\u0002\u0002\u0086\u008a",
    "\u0007\u0014\u0002\u0002\u0087\u008a\u0007\u0004\u0002\u0002\u0088\u008a",
    "\u0007\u0003\u0002\u0002\u0089\u0084\u0003\u0002\u0002\u0002\u0089\u0087",
    "\u0003\u0002\u0002\u0002\u0089\u0088\u0003\u0002\u0002\u0002\u008a\u0019",
    "\u0003\u0002\u0002\u0002\u0014\u001c\u001e\').9?HQZeprx|\u007f\u0084",
    "\u0089"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'>'", "'<'", "'('", "')'", "'['", "']'", "'{'", 
                     "'}'", "'.'", null, "'!'", "'*'", "'^'", "'$'" ];

var symbolicNames = [ null, "GT", "LT", "LP", "RP", "LB", "RB", "LCB", "RCB", 
                      "DOT", "WS", "EXC", "AST", "HAT", "DOL", "NL", "SYM", 
                      "OR", "EQ", "TF", "ENT", "INT", "OP", "CHR" ];

var ruleNames =  [ "script", "expr", "cond", "weight", "choice", "inline", 
                   "assign", "chars", "symbol", "wexpr", "transform", "op" ];

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
RiScriptParser.NL = 15;
RiScriptParser.SYM = 16;
RiScriptParser.OR = 17;
RiScriptParser.EQ = 18;
RiScriptParser.TF = 19;
RiScriptParser.ENT = 20;
RiScriptParser.INT = 21;
RiScriptParser.OP = 22;
RiScriptParser.CHR = 23;

RiScriptParser.RULE_script = 0;
RiScriptParser.RULE_expr = 1;
RiScriptParser.RULE_cond = 2;
RiScriptParser.RULE_weight = 3;
RiScriptParser.RULE_choice = 4;
RiScriptParser.RULE_inline = 5;
RiScriptParser.RULE_assign = 6;
RiScriptParser.RULE_chars = 7;
RiScriptParser.RULE_symbol = 8;
RiScriptParser.RULE_wexpr = 9;
RiScriptParser.RULE_transform = 10;
RiScriptParser.RULE_op = 11;

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
        this.state = 26; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 26;
            this._errHandler.sync(this);
            switch(this._input.LA(1)) {
            case RiScriptParser.GT:
            case RiScriptParser.LT:
            case RiScriptParser.LP:
            case RiScriptParser.LB:
            case RiScriptParser.DOT:
            case RiScriptParser.WS:
            case RiScriptParser.EXC:
            case RiScriptParser.AST:
            case RiScriptParser.HAT:
            case RiScriptParser.DOL:
            case RiScriptParser.SYM:
            case RiScriptParser.ENT:
            case RiScriptParser.INT:
            case RiScriptParser.CHR:
                this.state = 24;
                this.expr();
                break;
            case RiScriptParser.NL:
                this.state = 25;
                this.match(RiScriptParser.NL);
                break;
            default:
                throw new antlr4.error.NoViableAltException(this);
            }
            this.state = 28; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << RiScriptParser.GT) | (1 << RiScriptParser.LT) | (1 << RiScriptParser.LP) | (1 << RiScriptParser.LB) | (1 << RiScriptParser.DOT) | (1 << RiScriptParser.WS) | (1 << RiScriptParser.EXC) | (1 << RiScriptParser.AST) | (1 << RiScriptParser.HAT) | (1 << RiScriptParser.DOL) | (1 << RiScriptParser.NL) | (1 << RiScriptParser.SYM) | (1 << RiScriptParser.ENT) | (1 << RiScriptParser.INT) | (1 << RiScriptParser.CHR))) !== 0));
        this.state = 30;
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
        this.state = 37; 
        this._errHandler.sync(this);
        var _alt = 1;
        do {
        	switch (_alt) {
        	case 1:
        		this.state = 37;
        		this._errHandler.sync(this);
        		var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
        		switch(la_) {
        		case 1:
        		    this.state = 32;
        		    this.symbol();
        		    break;

        		case 2:
        		    this.state = 33;
        		    this.choice();
        		    break;

        		case 3:
        		    this.state = 34;
        		    this.assign();
        		    break;

        		case 4:
        		    this.state = 35;
        		    this.inline();
        		    break;

        		case 5:
        		    this.state = 36;
        		    this.chars();
        		    break;

        		}
        		break;
        	default:
        		throw new antlr4.error.NoViableAltException(this);
        	}
        	this.state = 39; 
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

CondContext.prototype.LCB = function() {
    return this.getToken(RiScriptParser.LCB, 0);
};

CondContext.prototype.SYM = function() {
    return this.getToken(RiScriptParser.SYM, 0);
};

CondContext.prototype.op = function() {
    return this.getTypedRuleContext(OpContext,0);
};

CondContext.prototype.chars = function() {
    return this.getTypedRuleContext(CharsContext,0);
};

CondContext.prototype.RCB = function() {
    return this.getToken(RiScriptParser.RCB, 0);
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
    this.enterRule(localctx, 4, RiScriptParser.RULE_cond);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 44;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.WS) {
            this.state = 41;
            this.match(RiScriptParser.WS);
            this.state = 46;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 47;
        this.match(RiScriptParser.LCB);
        this.state = 48;
        this.match(RiScriptParser.SYM);
        this.state = 49;
        this.op();
        this.state = 50;
        this.chars();
        this.state = 51;
        this.match(RiScriptParser.RCB);
        this.state = 55;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.WS) {
            this.state = 52;
            this.match(RiScriptParser.WS);
            this.state = 57;
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
    this.enterRule(localctx, 6, RiScriptParser.RULE_weight);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 61;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.WS) {
            this.state = 58;
            this.match(RiScriptParser.WS);
            this.state = 63;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 64;
        this.match(RiScriptParser.LB);
        this.state = 65;
        this.match(RiScriptParser.INT);
        this.state = 66;
        this.match(RiScriptParser.RB);
        this.state = 70;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.WS) {
            this.state = 67;
            this.match(RiScriptParser.WS);
            this.state = 72;
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
    this.enterRule(localctx, 8, RiScriptParser.RULE_choice);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 73;
        this.match(RiScriptParser.LP);
        this.state = 79;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,8,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 74;
                this.wexpr();
                this.state = 75;
                this.match(RiScriptParser.OR); 
            }
            this.state = 81;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,8,this._ctx);
        }

        this.state = 82;
        this.wexpr();
        this.state = 83;
        this.match(RiScriptParser.RP);
        this.state = 88;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.TF) {
            this.state = 85;
            this.transform();
            this.state = 90;
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
    this.enterRule(localctx, 10, RiScriptParser.RULE_inline);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 91;
        this.match(RiScriptParser.LB);
        this.state = 92;
        this.symbol();
        this.state = 93;
        this.match(RiScriptParser.EQ);
        this.state = 94;
        this.expr();
        this.state = 95;
        this.match(RiScriptParser.RB);
        this.state = 99;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.TF) {
            this.state = 96;
            this.transform();
            this.state = 101;
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
    this.enterRule(localctx, 12, RiScriptParser.RULE_assign);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 102;
        this.symbol();
        this.state = 103;
        this.match(RiScriptParser.EQ);
        this.state = 104;
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
    this.enterRule(localctx, 14, RiScriptParser.RULE_chars);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 110; 
        this._errHandler.sync(this);
        var _alt = 1;
        do {
        	switch (_alt) {
        	case 1:
        		this.state = 110;
        		this._errHandler.sync(this);
        		switch(this._input.LA(1)) {
        		case RiScriptParser.CHR:
        		    this.state = 106;
        		    this.match(RiScriptParser.CHR);
        		    break;
        		case RiScriptParser.ENT:
        		    this.state = 107;
        		    this.match(RiScriptParser.ENT);
        		    break;
        		case RiScriptParser.INT:
        		    this.state = 108;
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
        		    this.state = 109;
        		    _la = this._input.LA(1);
        		    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << RiScriptParser.GT) | (1 << RiScriptParser.LT) | (1 << RiScriptParser.DOT) | (1 << RiScriptParser.WS) | (1 << RiScriptParser.EXC) | (1 << RiScriptParser.AST) | (1 << RiScriptParser.HAT) | (1 << RiScriptParser.DOL))) !== 0))) {
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
        	this.state = 112; 
        	this._errHandler.sync(this);
        	_alt = this._interp.adaptivePredict(this._input,12, this._ctx);
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
    this.enterRule(localctx, 16, RiScriptParser.RULE_symbol);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 114;
        this.match(RiScriptParser.SYM);
        this.state = 118;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.TF) {
            this.state = 115;
            this.transform();
            this.state = 120;
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
    this.enterRule(localctx, 18, RiScriptParser.RULE_wexpr);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 122;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,14,this._ctx);
        if(la_===1) {
            this.state = 121;
            this.expr();

        }
        this.state = 125;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===RiScriptParser.LB || _la===RiScriptParser.WS) {
            this.state = 124;
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
    this.enterRule(localctx, 20, RiScriptParser.RULE_transform);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 127;
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

OpContext.prototype.EQ = function() {
    return this.getToken(RiScriptParser.EQ, 0);
};

OpContext.prototype.OP = function() {
    return this.getToken(RiScriptParser.OP, 0);
};

OpContext.prototype.LT = function() {
    return this.getToken(RiScriptParser.LT, 0);
};

OpContext.prototype.GT = function() {
    return this.getToken(RiScriptParser.GT, 0);
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
    this.enterRule(localctx, 22, RiScriptParser.RULE_op);
    var _la = 0; // Token type
    try {
        this.state = 135;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case RiScriptParser.EQ:
        case RiScriptParser.OP:
            this.enterOuterAlt(localctx, 1);
            this.state = 130;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===RiScriptParser.OP) {
                this.state = 129;
                this.match(RiScriptParser.OP);
            }

            this.state = 132;
            this.match(RiScriptParser.EQ);
            break;
        case RiScriptParser.LT:
            this.enterOuterAlt(localctx, 2);
            this.state = 133;
            this.match(RiScriptParser.LT);
            break;
        case RiScriptParser.GT:
            this.enterOuterAlt(localctx, 3);
            this.state = 134;
            this.match(RiScriptParser.GT);
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
