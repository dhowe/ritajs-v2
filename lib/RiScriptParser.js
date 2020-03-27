// Generated from grammar/RiScript.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var RiScriptListener = require('./RiScriptListener').RiScriptListener;
var RiScriptVisitor = require('./RiScriptVisitor').RiScriptVisitor;

var grammarFileName = "RiScript.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u0012\u0089\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0003\u0002",
    "\u0003\u0002\u0006\u0002\u0019\n\u0002\r\u0002\u000e\u0002\u001a\u0003",
    "\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0004\u0003\u0004\u0003",
    "\u0005\u0003\u0005\u0007\u0005%\n\u0005\f\u0005\u000e\u0005(\u000b\u0005",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0005\u0006-\n\u0006\u0003\u0006",
    "\u0003\u0006\u0007\u00061\n\u0006\f\u0006\u000e\u00064\u000b\u0006\u0003",
    "\u0006\u0003\u0006\u0005\u00068\n\u0006\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0003\u0006\u0005\u0006?\n\u0006\u0003\u0006\u0003",
    "\u0006\u0006\u0006C\n\u0006\r\u0006\u000e\u0006D\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0005\u0006M\n\u0006",
    "\u0006\u0006O\n\u0006\r\u0006\u000e\u0006P\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0005\u0006\\\n\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0005\u0006c\n\u0006\u0003\u0006\u0007\u0006f\n\u0006",
    "\f\u0006\u000e\u0006i\u000b\u0006\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003\b\u0003\b",
    "\u0003\t\u0003\t\u0003\t\u0003\t\u0003\n\u0003\n\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0006\u000b\u0080\n\u000b\r\u000b",
    "\u000e\u000b\u0081\u0003\u000b\u0006\u000b\u0085\n\u000b\r\u000b\u000e",
    "\u000b\u0086\u0003\u000b\u0002\u0002\f\u0002\u0004\u0006\b\n\f\u000e",
    "\u0010\u0012\u0014\u0002\u0003\u0004\u0002\t\t\u0010\u0012\u0002\u0096",
    "\u0002\u0018\u0003\u0002\u0002\u0002\u0004\u001e\u0003\u0002\u0002\u0002",
    "\u0006 \u0003\u0002\u0002\u0002\b\"\u0003\u0002\u0002\u0002\nb\u0003",
    "\u0002\u0002\u0002\fj\u0003\u0002\u0002\u0002\u000ep\u0003\u0002\u0002",
    "\u0002\u0010t\u0003\u0002\u0002\u0002\u0012x\u0003\u0002\u0002\u0002",
    "\u0014\u0084\u0003\u0002\u0002\u0002\u0016\u0019\u0005\u0014\u000b\u0002",
    "\u0017\u0019\u0007\u000b\u0002\u0002\u0018\u0016\u0003\u0002\u0002\u0002",
    "\u0018\u0017\u0003\u0002\u0002\u0002\u0019\u001a\u0003\u0002\u0002\u0002",
    "\u001a\u0018\u0003\u0002\u0002\u0002\u001a\u001b\u0003\u0002\u0002\u0002",
    "\u001b\u001c\u0003\u0002\u0002\u0002\u001c\u001d\u0007\u0002\u0002\u0003",
    "\u001d\u0003\u0003\u0002\u0002\u0002\u001e\u001f\u0007\u000f\u0002\u0002",
    "\u001f\u0005\u0003\u0002\u0002\u0002 !\u0007\f\u0002\u0002!\u0007\u0003",
    "\u0002\u0002\u0002\"&\u0005\u0006\u0004\u0002#%\u0005\u0004\u0003\u0002",
    "$#\u0003\u0002\u0002\u0002%(\u0003\u0002\u0002\u0002&$\u0003\u0002\u0002",
    "\u0002&\'\u0003\u0002\u0002\u0002\'\t\u0003\u0002\u0002\u0002(&\u0003",
    "\u0002\u0002\u0002)2\u0007\u0003\u0002\u0002*,\u0005\u0014\u000b\u0002",
    "+-\u0005\u0010\t\u0002,+\u0003\u0002\u0002\u0002,-\u0003\u0002\u0002",
    "\u0002-.\u0003\u0002\u0002\u0002./\u0007\r\u0002\u0002/1\u0003\u0002",
    "\u0002\u00020*\u0003\u0002\u0002\u000214\u0003\u0002\u0002\u000220\u0003",
    "\u0002\u0002\u000223\u0003\u0002\u0002\u000235\u0003\u0002\u0002\u0002",
    "42\u0003\u0002\u0002\u000257\u0005\u0014\u000b\u000268\u0005\u0010\t",
    "\u000276\u0003\u0002\u0002\u000278\u0003\u0002\u0002\u000289\u0003\u0002",
    "\u0002\u00029:\u0007\u0004\u0002\u0002:c\u0003\u0002\u0002\u0002;B\u0007",
    "\u0003\u0002\u0002<>\u0005\u0014\u000b\u0002=?\u0005\u0010\t\u0002>",
    "=\u0003\u0002\u0002\u0002>?\u0003\u0002\u0002\u0002?@\u0003\u0002\u0002",
    "\u0002@A\u0007\r\u0002\u0002AC\u0003\u0002\u0002\u0002B<\u0003\u0002",
    "\u0002\u0002CD\u0003\u0002\u0002\u0002DB\u0003\u0002\u0002\u0002DE\u0003",
    "\u0002\u0002\u0002EF\u0003\u0002\u0002\u0002FG\u0007\u0004\u0002\u0002",
    "Gc\u0003\u0002\u0002\u0002HN\u0007\u0003\u0002\u0002IJ\u0007\r\u0002",
    "\u0002JL\u0005\u0014\u000b\u0002KM\u0005\u0010\t\u0002LK\u0003\u0002",
    "\u0002\u0002LM\u0003\u0002\u0002\u0002MO\u0003\u0002\u0002\u0002NI\u0003",
    "\u0002\u0002\u0002OP\u0003\u0002\u0002\u0002PN\u0003\u0002\u0002\u0002",
    "PQ\u0003\u0002\u0002\u0002QR\u0003\u0002\u0002\u0002RS\u0007\u0004\u0002",
    "\u0002Sc\u0003\u0002\u0002\u0002TU\u0007\u0003\u0002\u0002UV\u0007\r",
    "\u0002\u0002Vc\u0007\u0004\u0002\u0002WX\u0007\u0003\u0002\u0002XY\u0007",
    "\r\u0002\u0002Y[\u0005\u0014\u000b\u0002Z\\\u0005\u0010\t\u0002[Z\u0003",
    "\u0002\u0002\u0002[\\\u0003\u0002\u0002\u0002\\]\u0003\u0002\u0002\u0002",
    "]^\u0007\r\u0002\u0002^_\u0007\u0004\u0002\u0002_c\u0003\u0002\u0002",
    "\u0002`a\u0007\u0003\u0002\u0002ac\u0007\u0004\u0002\u0002b)\u0003\u0002",
    "\u0002\u0002b;\u0003\u0002\u0002\u0002bH\u0003\u0002\u0002\u0002bT\u0003",
    "\u0002\u0002\u0002bW\u0003\u0002\u0002\u0002b`\u0003\u0002\u0002\u0002",
    "cg\u0003\u0002\u0002\u0002df\u0005\u0004\u0003\u0002ed\u0003\u0002\u0002",
    "\u0002fi\u0003\u0002\u0002\u0002ge\u0003\u0002\u0002\u0002gh\u0003\u0002",
    "\u0002\u0002h\u000b\u0003\u0002\u0002\u0002ig\u0003\u0002\u0002\u0002",
    "jk\u0007\u0005\u0002\u0002kl\u0005\b\u0005\u0002lm\u0007\u000e\u0002",
    "\u0002mn\u0005\u0014\u000b\u0002no\u0007\u0006\u0002\u0002o\r\u0003",
    "\u0002\u0002\u0002pq\u0005\b\u0005\u0002qr\u0007\u000e\u0002\u0002r",
    "s\u0005\u0014\u000b\u0002s\u000f\u0003\u0002\u0002\u0002tu\u0007\u0005",
    "\u0002\u0002uv\u0005\u0012\n\u0002vw\u0007\u0006\u0002\u0002w\u0011",
    "\u0003\u0002\u0002\u0002xy\u0007\u0011\u0002\u0002y\u0013\u0003\u0002",
    "\u0002\u0002z\u0085\u0005\b\u0005\u0002{\u0085\u0005\n\u0006\u0002|",
    "\u0085\u0005\u000e\b\u0002}\u0085\u0005\f\u0007\u0002~\u0080\t\u0002",
    "\u0002\u0002\u007f~\u0003\u0002\u0002\u0002\u0080\u0081\u0003\u0002",
    "\u0002\u0002\u0081\u007f\u0003\u0002\u0002\u0002\u0081\u0082\u0003\u0002",
    "\u0002\u0002\u0082\u0085\u0003\u0002\u0002\u0002\u0083\u0085\u0007\n",
    "\u0002\u0002\u0084z\u0003\u0002\u0002\u0002\u0084{\u0003\u0002\u0002",
    "\u0002\u0084|\u0003\u0002\u0002\u0002\u0084}\u0003\u0002\u0002\u0002",
    "\u0084\u007f\u0003\u0002\u0002\u0002\u0084\u0083\u0003\u0002\u0002\u0002",
    "\u0085\u0086\u0003\u0002\u0002\u0002\u0086\u0084\u0003\u0002\u0002\u0002",
    "\u0086\u0087\u0003\u0002\u0002\u0002\u0087\u0015\u0003\u0002\u0002\u0002",
    "\u0012\u0018\u001a&,27>DLP[bg\u0081\u0084\u0086"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'('", "')'", "'['", "']'", "'{'", "'}'", "'.'" ];

var symbolicNames = [ null, "LP", "RP", "LB", "RB", "LCB", "RCB", "DOT", 
                      "WS", "NL", "SYM", "OR", "EQ", "TF", "ENT", "NUM", 
                      "CHR" ];

var ruleNames =  [ "script", "transform", "ident", "symbol", "choice", "inline", 
                   "assign", "weight", "num", "expr" ];

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
RiScriptParser.LP = 1;
RiScriptParser.RP = 2;
RiScriptParser.LB = 3;
RiScriptParser.RB = 4;
RiScriptParser.LCB = 5;
RiScriptParser.RCB = 6;
RiScriptParser.DOT = 7;
RiScriptParser.WS = 8;
RiScriptParser.NL = 9;
RiScriptParser.SYM = 10;
RiScriptParser.OR = 11;
RiScriptParser.EQ = 12;
RiScriptParser.TF = 13;
RiScriptParser.ENT = 14;
RiScriptParser.NUM = 15;
RiScriptParser.CHR = 16;

RiScriptParser.RULE_script = 0;
RiScriptParser.RULE_transform = 1;
RiScriptParser.RULE_ident = 2;
RiScriptParser.RULE_symbol = 3;
RiScriptParser.RULE_choice = 4;
RiScriptParser.RULE_inline = 5;
RiScriptParser.RULE_assign = 6;
RiScriptParser.RULE_weight = 7;
RiScriptParser.RULE_num = 8;
RiScriptParser.RULE_expr = 9;

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
        this.state = 22; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 22;
            this._errHandler.sync(this);
            switch(this._input.LA(1)) {
            case RiScriptParser.LP:
            case RiScriptParser.LB:
            case RiScriptParser.DOT:
            case RiScriptParser.WS:
            case RiScriptParser.SYM:
            case RiScriptParser.ENT:
            case RiScriptParser.NUM:
            case RiScriptParser.CHR:
                this.state = 20;
                this.expr();
                break;
            case RiScriptParser.NL:
                this.state = 21;
                this.match(RiScriptParser.NL);
                break;
            default:
                throw new antlr4.error.NoViableAltException(this);
            }
            this.state = 24; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << RiScriptParser.LP) | (1 << RiScriptParser.LB) | (1 << RiScriptParser.DOT) | (1 << RiScriptParser.WS) | (1 << RiScriptParser.NL) | (1 << RiScriptParser.SYM) | (1 << RiScriptParser.ENT) | (1 << RiScriptParser.NUM) | (1 << RiScriptParser.CHR))) !== 0));
        this.state = 26;
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
    this.enterRule(localctx, 2, RiScriptParser.RULE_transform);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 28;
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

function IdentContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RiScriptParser.RULE_ident;
    return this;
}

IdentContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
IdentContext.prototype.constructor = IdentContext;

IdentContext.prototype.SYM = function() {
    return this.getToken(RiScriptParser.SYM, 0);
};

IdentContext.prototype.enterRule = function(listener) {
    if(listener instanceof RiScriptListener ) {
        listener.enterIdent(this);
	}
};

IdentContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptListener ) {
        listener.exitIdent(this);
	}
};

IdentContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptVisitor ) {
        return visitor.visitIdent(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.IdentContext = IdentContext;

RiScriptParser.prototype.ident = function() {

    var localctx = new IdentContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, RiScriptParser.RULE_ident);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 30;
        this.match(RiScriptParser.SYM);
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

SymbolContext.prototype.ident = function() {
    return this.getTypedRuleContext(IdentContext,0);
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
    this.enterRule(localctx, 6, RiScriptParser.RULE_symbol);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 32;
        this.ident();
        this.state = 36;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.TF) {
            this.state = 33;
            this.transform();
            this.state = 38;
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

ChoiceContext.prototype.LP = function() {
    return this.getToken(RiScriptParser.LP, 0);
};

ChoiceContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

ChoiceContext.prototype.RP = function() {
    return this.getToken(RiScriptParser.RP, 0);
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


ChoiceContext.prototype.weight = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(WeightContext);
    } else {
        return this.getTypedRuleContext(WeightContext,i);
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
        this.state = 96;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,11,this._ctx);
        switch(la_) {
        case 1:
            this.state = 39;
            this.match(RiScriptParser.LP);
            this.state = 48;
            this._errHandler.sync(this);
            var _alt = this._interp.adaptivePredict(this._input,4,this._ctx)
            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
                if(_alt===1) {
                    this.state = 40;
                    this.expr();
                    this.state = 42;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if(_la===RiScriptParser.LB) {
                        this.state = 41;
                        this.weight();
                    }

                    this.state = 44;
                    this.match(RiScriptParser.OR); 
                }
                this.state = 50;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input,4,this._ctx);
            }

            this.state = 51;
            this.expr();
            this.state = 53;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===RiScriptParser.LB) {
                this.state = 52;
                this.weight();
            }

            this.state = 55;
            this.match(RiScriptParser.RP);
            break;

        case 2:
            this.state = 57;
            this.match(RiScriptParser.LP);
            this.state = 64; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 58;
                this.expr();
                this.state = 60;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if(_la===RiScriptParser.LB) {
                    this.state = 59;
                    this.weight();
                }

                this.state = 62;
                this.match(RiScriptParser.OR);
                this.state = 66; 
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << RiScriptParser.LP) | (1 << RiScriptParser.LB) | (1 << RiScriptParser.DOT) | (1 << RiScriptParser.WS) | (1 << RiScriptParser.SYM) | (1 << RiScriptParser.ENT) | (1 << RiScriptParser.NUM) | (1 << RiScriptParser.CHR))) !== 0));
            this.state = 68;
            this.match(RiScriptParser.RP);
            break;

        case 3:
            this.state = 70;
            this.match(RiScriptParser.LP);
            this.state = 76; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 71;
                this.match(RiScriptParser.OR);
                this.state = 72;
                this.expr();
                this.state = 74;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if(_la===RiScriptParser.LB) {
                    this.state = 73;
                    this.weight();
                }

                this.state = 78; 
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while(_la===RiScriptParser.OR);
            this.state = 80;
            this.match(RiScriptParser.RP);
            break;

        case 4:
            this.state = 82;
            this.match(RiScriptParser.LP);
            this.state = 83;
            this.match(RiScriptParser.OR);
            this.state = 84;
            this.match(RiScriptParser.RP);
            break;

        case 5:
            this.state = 85;
            this.match(RiScriptParser.LP);
            this.state = 86;
            this.match(RiScriptParser.OR);
            this.state = 87;
            this.expr();
            this.state = 89;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===RiScriptParser.LB) {
                this.state = 88;
                this.weight();
            }

            this.state = 91;
            this.match(RiScriptParser.OR);
            this.state = 92;
            this.match(RiScriptParser.RP);
            break;

        case 6:
            this.state = 94;
            this.match(RiScriptParser.LP);
            this.state = 95;
            this.match(RiScriptParser.RP);
            break;

        }
        this.state = 101;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.TF) {
            this.state = 98;
            this.transform();
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
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 104;
        this.match(RiScriptParser.LB);
        this.state = 105;
        this.symbol();
        this.state = 106;
        this.match(RiScriptParser.EQ);
        this.state = 107;
        this.expr();
        this.state = 108;
        this.match(RiScriptParser.RB);
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
        this.state = 110;
        this.symbol();
        this.state = 111;
        this.match(RiScriptParser.EQ);
        this.state = 112;
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

WeightContext.prototype.num = function() {
    return this.getTypedRuleContext(NumContext,0);
};

WeightContext.prototype.RB = function() {
    return this.getToken(RiScriptParser.RB, 0);
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
    this.enterRule(localctx, 14, RiScriptParser.RULE_weight);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 114;
        this.match(RiScriptParser.LB);
        this.state = 115;
        this.num();
        this.state = 116;
        this.match(RiScriptParser.RB);
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

function NumContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RiScriptParser.RULE_num;
    return this;
}

NumContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
NumContext.prototype.constructor = NumContext;

NumContext.prototype.NUM = function() {
    return this.getToken(RiScriptParser.NUM, 0);
};

NumContext.prototype.enterRule = function(listener) {
    if(listener instanceof RiScriptListener ) {
        listener.enterNum(this);
	}
};

NumContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptListener ) {
        listener.exitNum(this);
	}
};

NumContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptVisitor ) {
        return visitor.visitNum(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.NumContext = NumContext;

RiScriptParser.prototype.num = function() {

    var localctx = new NumContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, RiScriptParser.RULE_num);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 118;
        this.match(RiScriptParser.NUM);
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

ExprContext.prototype.WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.WS);
    } else {
        return this.getToken(RiScriptParser.WS, i);
    }
};


ExprContext.prototype.CHR = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.CHR);
    } else {
        return this.getToken(RiScriptParser.CHR, i);
    }
};


ExprContext.prototype.DOT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.DOT);
    } else {
        return this.getToken(RiScriptParser.DOT, i);
    }
};


ExprContext.prototype.ENT = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.ENT);
    } else {
        return this.getToken(RiScriptParser.ENT, i);
    }
};


ExprContext.prototype.NUM = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.NUM);
    } else {
        return this.getToken(RiScriptParser.NUM, i);
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
    this.enterRule(localctx, 18, RiScriptParser.RULE_expr);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 130; 
        this._errHandler.sync(this);
        var _alt = 1;
        do {
        	switch (_alt) {
        	case 1:
        		this.state = 130;
        		this._errHandler.sync(this);
        		var la_ = this._interp.adaptivePredict(this._input,14,this._ctx);
        		switch(la_) {
        		case 1:
        		    this.state = 120;
        		    this.symbol();
        		    break;

        		case 2:
        		    this.state = 121;
        		    this.choice();
        		    break;

        		case 3:
        		    this.state = 122;
        		    this.assign();
        		    break;

        		case 4:
        		    this.state = 123;
        		    this.inline();
        		    break;

        		case 5:
        		    this.state = 125; 
        		    this._errHandler.sync(this);
        		    var _alt = 1;
        		    do {
        		    	switch (_alt) {
        		    	case 1:
        		    		this.state = 124;
        		    		_la = this._input.LA(1);
        		    		if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << RiScriptParser.DOT) | (1 << RiScriptParser.ENT) | (1 << RiScriptParser.NUM) | (1 << RiScriptParser.CHR))) !== 0))) {
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
        		    	this.state = 127; 
        		    	this._errHandler.sync(this);
        		    	_alt = this._interp.adaptivePredict(this._input,13, this._ctx);
        		    } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
        		    break;

        		case 6:
        		    this.state = 129;
        		    this.match(RiScriptParser.WS);
        		    break;

        		}
        		break;
        	default:
        		throw new antlr4.error.NoViableAltException(this);
        	}
        	this.state = 132; 
        	this._errHandler.sync(this);
        	_alt = this._interp.adaptivePredict(this._input,15, this._ctx);
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


exports.RiScriptParser = RiScriptParser;
