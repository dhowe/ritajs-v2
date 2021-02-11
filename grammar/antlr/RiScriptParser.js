// Generated from grammar/RiScriptParser.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');
var RiScriptParserListener = require('./RiScriptParserListener').RiScriptParserListener;
var RiScriptParserVisitor = require('./RiScriptParserVisitor').RiScriptParserVisitor;

var grammarFileName = "RiScriptParser.g4";


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003$t\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t\u0004",
    "\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004\b",
    "\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0003\u0002",
    "\u0003\u0002\u0003\u0002\u0007\u0002\u001c\n\u0002\f\u0002\u000e\u0002",
    "\u001f\u000b\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0007\u0003$",
    "\n\u0003\f\u0003\u000e\u0003\'\u000b\u0003\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0006\u0004-\n\u0004\r\u0004\u000e\u0004.\u0003\u0005",
    "\u0003\u0005\u0003\u0005\u0003\u0005\u0007\u00055\n\u0005\f\u0005\u000e",
    "\u00058\u000b\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005",
    "\u0007\u0005>\n\u0005\f\u0005\u000e\u0005A\u000b\u0005\u0003\u0006\u0003",
    "\u0006\u0005\u0006E\n\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003",
    "\u0007\u0006\u0007K\n\u0007\r\u0007\u000e\u0007L\u0003\b\u0003\b\u0007",
    "\bQ\n\b\f\b\u000e\bT\u000b\b\u0003\t\u0003\t\u0007\tX\n\t\f\t\u000e",
    "\t[\u000b\t\u0003\n\u0005\n^\n\n\u0003\n\u0005\na\n\n\u0003\u000b\u0007",
    "\u000bd\n\u000b\f\u000b\u000e\u000bg\u000b\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0007\u000bm\n\u000b\f\u000b\u000e\u000bp\u000b",
    "\u000b\u0003\f\u0003\f\u0003\f\u0002\u0002\r\u0002\u0004\u0006\b\n\f",
    "\u000e\u0010\u0012\u0014\u0016\u0002\u0003\u0006\u0002\u0007\b\u000f",
    "\u0016\u001f \"\"\u0002x\u0002\u0018\u0003\u0002\u0002\u0002\u0004%",
    "\u0003\u0002\u0002\u0002\u0006,\u0003\u0002\u0002\u0002\b0\u0003\u0002",
    "\u0002\u0002\nD\u0003\u0002\u0002\u0002\fJ\u0003\u0002\u0002\u0002\u000e",
    "N\u0003\u0002\u0002\u0002\u0010U\u0003\u0002\u0002\u0002\u0012]\u0003",
    "\u0002\u0002\u0002\u0014e\u0003\u0002\u0002\u0002\u0016q\u0003\u0002",
    "\u0002\u0002\u0018\u001d\u0005\u0004\u0003\u0002\u0019\u001a\u0007\u0019",
    "\u0002\u0002\u001a\u001c\u0005\u0004\u0003\u0002\u001b\u0019\u0003\u0002",
    "\u0002\u0002\u001c\u001f\u0003\u0002\u0002\u0002\u001d\u001b\u0003\u0002",
    "\u0002\u0002\u001d\u001e\u0003\u0002\u0002\u0002\u001e \u0003\u0002",
    "\u0002\u0002\u001f\u001d\u0003\u0002\u0002\u0002 !\u0007\u0002\u0002",
    "\u0003!\u0003\u0003\u0002\u0002\u0002\"$\u0005\u0006\u0004\u0002#\"",
    "\u0003\u0002\u0002\u0002$\'\u0003\u0002\u0002\u0002%#\u0003\u0002\u0002",
    "\u0002%&\u0003\u0002\u0002\u0002&\u0005\u0003\u0002\u0002\u0002\'%\u0003",
    "\u0002\u0002\u0002(-\u0005\u0010\t\u0002)-\u0005\b\u0005\u0002*-\u0005",
    "\n\u0006\u0002+-\u0005\f\u0007\u0002,(\u0003\u0002\u0002\u0002,)\u0003",
    "\u0002\u0002\u0002,*\u0003\u0002\u0002\u0002,+\u0003\u0002\u0002\u0002",
    "-.\u0003\u0002\u0002\u0002.,\u0003\u0002\u0002\u0002./\u0003\u0002\u0002",
    "\u0002/\u0007\u0003\u0002\u0002\u000206\u0007\t\u0002\u000212\u0005",
    "\u0012\n\u000223\u0007\u001c\u0002\u000235\u0003\u0002\u0002\u00024",
    "1\u0003\u0002\u0002\u000258\u0003\u0002\u0002\u000264\u0003\u0002\u0002",
    "\u000267\u0003\u0002\u0002\u000279\u0003\u0002\u0002\u000286\u0003\u0002",
    "\u0002\u00029:\u0005\u0012\n\u0002:;\u0007\n\u0002\u0002;?\u0003\u0002",
    "\u0002\u0002<>\u0005\u0016\f\u0002=<\u0003\u0002\u0002\u0002>A\u0003",
    "\u0002\u0002\u0002?=\u0003\u0002\u0002\u0002?@\u0003\u0002\u0002\u0002",
    "@\t\u0003\u0002\u0002\u0002A?\u0003\u0002\u0002\u0002BE\u0005\u000e",
    "\b\u0002CE\u0005\u0010\t\u0002DB\u0003\u0002\u0002\u0002DC\u0003\u0002",
    "\u0002\u0002EF\u0003\u0002\u0002\u0002FG\u0007\u001d\u0002\u0002GH\u0005",
    "\u0006\u0004\u0002H\u000b\u0003\u0002\u0002\u0002IK\t\u0002\u0002\u0002",
    "JI\u0003\u0002\u0002\u0002KL\u0003\u0002\u0002\u0002LJ\u0003\u0002\u0002",
    "\u0002LM\u0003\u0002\u0002\u0002M\r\u0003\u0002\u0002\u0002NR\u0007",
    "\u001a\u0002\u0002OQ\u0005\u0016\f\u0002PO\u0003\u0002\u0002\u0002Q",
    "T\u0003\u0002\u0002\u0002RP\u0003\u0002\u0002\u0002RS\u0003\u0002\u0002",
    "\u0002S\u000f\u0003\u0002\u0002\u0002TR\u0003\u0002\u0002\u0002UY\u0007",
    "\u001b\u0002\u0002VX\u0005\u0016\f\u0002WV\u0003\u0002\u0002\u0002X",
    "[\u0003\u0002\u0002\u0002YW\u0003\u0002\u0002\u0002YZ\u0003\u0002\u0002",
    "\u0002Z\u0011\u0003\u0002\u0002\u0002[Y\u0003\u0002\u0002\u0002\\^\u0005",
    "\u0006\u0004\u0002]\\\u0003\u0002\u0002\u0002]^\u0003\u0002\u0002\u0002",
    "^`\u0003\u0002\u0002\u0002_a\u0005\u0014\u000b\u0002`_\u0003\u0002\u0002",
    "\u0002`a\u0003\u0002\u0002\u0002a\u0013\u0003\u0002\u0002\u0002bd\u0007",
    "\u0010\u0002\u0002cb\u0003\u0002\u0002\u0002dg\u0003\u0002\u0002\u0002",
    "ec\u0003\u0002\u0002\u0002ef\u0003\u0002\u0002\u0002fh\u0003\u0002\u0002",
    "\u0002ge\u0003\u0002\u0002\u0002hi\u0007\u000b\u0002\u0002ij\u0007 ",
    "\u0002\u0002jn\u0007\f\u0002\u0002km\u0007\u0010\u0002\u0002lk\u0003",
    "\u0002\u0002\u0002mp\u0003\u0002\u0002\u0002nl\u0003\u0002\u0002\u0002",
    "no\u0003\u0002\u0002\u0002o\u0015\u0003\u0002\u0002\u0002pn\u0003\u0002",
    "\u0002\u0002qr\u0007\u001e\u0002\u0002r\u0017\u0003\u0002\u0002\u0002",
    "\u0010\u001d%,.6?DLRY]`en"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, null, null, null, null, "'>'", "'<'", "'('", 
                     null, "'['", "']'", "'{'", "'}'", "'.'", null, "'/'", 
                     "'!'", "'*'", "'^'", "'$'", "','", null, "'\\'" ];

var symbolicNames = [ null, "LCOMM", "BCOMM", "Q", "MDS", "GT", "LT", "LP", 
                      "RP", "LB", "RB", "LCB", "RCB", "DOT", "WS", "FS", 
                      "EXC", "AST", "HAT", "DOL", "COM", "CONT", "BS", "NL", 
                      "DYN", "SYM", "OR", "EQ", "TF", "ENT", "INT", "OP", 
                      "CHR", "MDT", "MDE" ];

var ruleNames =  [ "script", "line", "expr", "choice", "assign", "chars", 
                   "dynamic", "symbol", "wexpr", "weight", "transform" ];

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
RiScriptParser.Q = 3;
RiScriptParser.MDS = 4;
RiScriptParser.GT = 5;
RiScriptParser.LT = 6;
RiScriptParser.LP = 7;
RiScriptParser.RP = 8;
RiScriptParser.LB = 9;
RiScriptParser.RB = 10;
RiScriptParser.LCB = 11;
RiScriptParser.RCB = 12;
RiScriptParser.DOT = 13;
RiScriptParser.WS = 14;
RiScriptParser.FS = 15;
RiScriptParser.EXC = 16;
RiScriptParser.AST = 17;
RiScriptParser.HAT = 18;
RiScriptParser.DOL = 19;
RiScriptParser.COM = 20;
RiScriptParser.CONT = 21;
RiScriptParser.BS = 22;
RiScriptParser.NL = 23;
RiScriptParser.DYN = 24;
RiScriptParser.SYM = 25;
RiScriptParser.OR = 26;
RiScriptParser.EQ = 27;
RiScriptParser.TF = 28;
RiScriptParser.ENT = 29;
RiScriptParser.INT = 30;
RiScriptParser.OP = 31;
RiScriptParser.CHR = 32;
RiScriptParser.MDT = 33;
RiScriptParser.MDE = 34;

RiScriptParser.RULE_script = 0;
RiScriptParser.RULE_line = 1;
RiScriptParser.RULE_expr = 2;
RiScriptParser.RULE_choice = 3;
RiScriptParser.RULE_assign = 4;
RiScriptParser.RULE_chars = 5;
RiScriptParser.RULE_dynamic = 6;
RiScriptParser.RULE_symbol = 7;
RiScriptParser.RULE_wexpr = 8;
RiScriptParser.RULE_weight = 9;
RiScriptParser.RULE_transform = 10;


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

ScriptContext.prototype.line = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(LineContext);
    } else {
        return this.getTypedRuleContext(LineContext,i);
    }
};

ScriptContext.prototype.EOF = function() {
    return this.getToken(RiScriptParser.EOF, 0);
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
        this.state = 22;
        this.line();
        this.state = 27;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.NL) {
            this.state = 23;
            this.match(RiScriptParser.NL);
            this.state = 24;
            this.line();
            this.state = 29;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
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


function LineContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RiScriptParser.RULE_line;
    return this;
}

LineContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
LineContext.prototype.constructor = LineContext;

LineContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

LineContext.prototype.enterRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.enterLine(this);
	}
};

LineContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptParserListener ) {
        listener.exitLine(this);
	}
};

LineContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptParserVisitor ) {
        return visitor.visitLine(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.LineContext = LineContext;

RiScriptParser.prototype.line = function() {

    var localctx = new LineContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, RiScriptParser.RULE_line);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 35;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(((((_la - 5)) & ~0x1f) == 0 && ((1 << (_la - 5)) & ((1 << (RiScriptParser.GT - 5)) | (1 << (RiScriptParser.LT - 5)) | (1 << (RiScriptParser.LP - 5)) | (1 << (RiScriptParser.DOT - 5)) | (1 << (RiScriptParser.WS - 5)) | (1 << (RiScriptParser.FS - 5)) | (1 << (RiScriptParser.EXC - 5)) | (1 << (RiScriptParser.AST - 5)) | (1 << (RiScriptParser.HAT - 5)) | (1 << (RiScriptParser.DOL - 5)) | (1 << (RiScriptParser.COM - 5)) | (1 << (RiScriptParser.DYN - 5)) | (1 << (RiScriptParser.SYM - 5)) | (1 << (RiScriptParser.ENT - 5)) | (1 << (RiScriptParser.INT - 5)) | (1 << (RiScriptParser.CHR - 5)))) !== 0)) {
            this.state = 32;
            this.expr();
            this.state = 37;
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
    this.enterRule(localctx, 4, RiScriptParser.RULE_expr);
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
        		    this.state = 38;
        		    this.symbol();
        		    break;

        		case 2:
        		    this.state = 39;
        		    this.choice();
        		    break;

        		case 3:
        		    this.state = 40;
        		    this.assign();
        		    break;

        		case 4:
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
    this.enterRule(localctx, 6, RiScriptParser.RULE_choice);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 46;
        this.match(RiScriptParser.LP);
        this.state = 52;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,4,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 47;
                this.wexpr();
                this.state = 48;
                this.match(RiScriptParser.OR); 
            }
            this.state = 54;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,4,this._ctx);
        }

        this.state = 55;
        this.wexpr();
        this.state = 56;
        this.match(RiScriptParser.RP);
        this.state = 61;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.TF) {
            this.state = 58;
            this.transform();
            this.state = 63;
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
    this.enterRule(localctx, 8, RiScriptParser.RULE_assign);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 66;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case RiScriptParser.DYN:
            this.state = 64;
            this.dynamic();
            break;
        case RiScriptParser.SYM:
            this.state = 65;
            this.symbol();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
        this.state = 68;
        this.match(RiScriptParser.EQ);
        this.state = 69;
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
    this.enterRule(localctx, 10, RiScriptParser.RULE_chars);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 72; 
        this._errHandler.sync(this);
        var _alt = 1;
        do {
        	switch (_alt) {
        	case 1:
        		this.state = 71;
        		_la = this._input.LA(1);
        		if(!(((((_la - 5)) & ~0x1f) == 0 && ((1 << (_la - 5)) & ((1 << (RiScriptParser.GT - 5)) | (1 << (RiScriptParser.LT - 5)) | (1 << (RiScriptParser.DOT - 5)) | (1 << (RiScriptParser.WS - 5)) | (1 << (RiScriptParser.FS - 5)) | (1 << (RiScriptParser.EXC - 5)) | (1 << (RiScriptParser.AST - 5)) | (1 << (RiScriptParser.HAT - 5)) | (1 << (RiScriptParser.DOL - 5)) | (1 << (RiScriptParser.COM - 5)) | (1 << (RiScriptParser.ENT - 5)) | (1 << (RiScriptParser.INT - 5)) | (1 << (RiScriptParser.CHR - 5)))) !== 0))) {
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
        	this.state = 74; 
        	this._errHandler.sync(this);
        	_alt = this._interp.adaptivePredict(this._input,7, this._ctx);
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
    this.enterRule(localctx, 12, RiScriptParser.RULE_dynamic);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 76;
        this.match(RiScriptParser.DYN);
        this.state = 80;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.TF) {
            this.state = 77;
            this.transform();
            this.state = 82;
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
    this.enterRule(localctx, 14, RiScriptParser.RULE_symbol);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 83;
        this.match(RiScriptParser.SYM);
        this.state = 87;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.TF) {
            this.state = 84;
            this.transform();
            this.state = 89;
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
    this.enterRule(localctx, 16, RiScriptParser.RULE_wexpr);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 91;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,10,this._ctx);
        if(la_===1) {
            this.state = 90;
            this.expr();

        }
        this.state = 94;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===RiScriptParser.LB || _la===RiScriptParser.WS) {
            this.state = 93;
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
    this.enterRule(localctx, 18, RiScriptParser.RULE_weight);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 99;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.WS) {
            this.state = 96;
            this.match(RiScriptParser.WS);
            this.state = 101;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 102;
        this.match(RiScriptParser.LB);
        this.state = 103;
        this.match(RiScriptParser.INT);
        this.state = 104;
        this.match(RiScriptParser.RB);
        this.state = 108;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.WS) {
            this.state = 105;
            this.match(RiScriptParser.WS);
            this.state = 110;
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
    this.enterRule(localctx, 20, RiScriptParser.RULE_transform);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 111;
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


exports.RiScriptParser = RiScriptParser;
