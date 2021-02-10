// Generated from grammar/RiScriptParser.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');
var RiScriptParserListener = require('./RiScriptParserListener').RiScriptParserListener;
var RiScriptParserVisitor = require('./RiScriptParserVisitor').RiScriptParserVisitor;

var grammarFileName = "RiScriptParser.g4";


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003$[\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t\u0004",
    "\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004\b",
    "\t\b\u0004\t\t\t\u0004\n\t\n\u0003\u0002\u0003\u0002\u0003\u0002\u0007",
    "\u0002\u0018\n\u0002\f\u0002\u000e\u0002\u001b\u000b\u0002\u0003\u0002",
    "\u0003\u0002\u0003\u0003\u0007\u0003 \n\u0003\f\u0003\u000e\u0003#\u000b",
    "\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0006\u0004)",
    "\n\u0004\r\u0004\u000e\u0004*\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0007\u00051\n\u0005\f\u0005\u000e\u00054\u000b\u0005\u0003\u0005",
    "\u0003\u0005\u0003\u0005\u0003\u0005\u0007\u0005:\n\u0005\f\u0005\u000e",
    "\u0005=\u000b\u0005\u0003\u0006\u0003\u0006\u0005\u0006A\n\u0006\u0003",
    "\u0006\u0003\u0006\u0003\u0006\u0003\u0007\u0006\u0007G\n\u0007\r\u0007",
    "\u000e\u0007H\u0003\b\u0003\b\u0007\bM\n\b\f\b\u000e\bP\u000b\b\u0003",
    "\t\u0003\t\u0007\tT\n\t\f\t\u000e\tW\u000b\t\u0003\n\u0003\n\u0003\n",
    "\u0002\u0002\u000b\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0002\u0003",
    "\u0006\u0002\u0006\u0007\u000f\u0016\u001f \"\"\u0002]\u0002\u0014\u0003",
    "\u0002\u0002\u0002\u0004!\u0003\u0002\u0002\u0002\u0006(\u0003\u0002",
    "\u0002\u0002\b,\u0003\u0002\u0002\u0002\n@\u0003\u0002\u0002\u0002\f",
    "F\u0003\u0002\u0002\u0002\u000eJ\u0003\u0002\u0002\u0002\u0010Q\u0003",
    "\u0002\u0002\u0002\u0012X\u0003\u0002\u0002\u0002\u0014\u0019\u0005",
    "\u0004\u0003\u0002\u0015\u0016\u0007\u0019\u0002\u0002\u0016\u0018\u0005",
    "\u0004\u0003\u0002\u0017\u0015\u0003\u0002\u0002\u0002\u0018\u001b\u0003",
    "\u0002\u0002\u0002\u0019\u0017\u0003\u0002\u0002\u0002\u0019\u001a\u0003",
    "\u0002\u0002\u0002\u001a\u001c\u0003\u0002\u0002\u0002\u001b\u0019\u0003",
    "\u0002\u0002\u0002\u001c\u001d\u0007\u0002\u0002\u0003\u001d\u0003\u0003",
    "\u0002\u0002\u0002\u001e \u0005\u0006\u0004\u0002\u001f\u001e\u0003",
    "\u0002\u0002\u0002 #\u0003\u0002\u0002\u0002!\u001f\u0003\u0002\u0002",
    "\u0002!\"\u0003\u0002\u0002\u0002\"\u0005\u0003\u0002\u0002\u0002#!",
    "\u0003\u0002\u0002\u0002$)\u0005\u0010\t\u0002%)\u0005\b\u0005\u0002",
    "&)\u0005\n\u0006\u0002\')\u0005\f\u0007\u0002($\u0003\u0002\u0002\u0002",
    "(%\u0003\u0002\u0002\u0002(&\u0003\u0002\u0002\u0002(\'\u0003\u0002",
    "\u0002\u0002)*\u0003\u0002\u0002\u0002*(\u0003\u0002\u0002\u0002*+\u0003",
    "\u0002\u0002\u0002+\u0007\u0003\u0002\u0002\u0002,2\u0007\t\u0002\u0002",
    "-.\u0005\u0006\u0004\u0002./\u0007\u001c\u0002\u0002/1\u0003\u0002\u0002",
    "\u00020-\u0003\u0002\u0002\u000214\u0003\u0002\u0002\u000220\u0003\u0002",
    "\u0002\u000223\u0003\u0002\u0002\u000235\u0003\u0002\u0002\u000242\u0003",
    "\u0002\u0002\u000256\u0005\u0006\u0004\u000267\u0007\n\u0002\u00027",
    ";\u0003\u0002\u0002\u00028:\u0005\u0012\n\u000298\u0003\u0002\u0002",
    "\u0002:=\u0003\u0002\u0002\u0002;9\u0003\u0002\u0002\u0002;<\u0003\u0002",
    "\u0002\u0002<\t\u0003\u0002\u0002\u0002=;\u0003\u0002\u0002\u0002>A",
    "\u0005\u000e\b\u0002?A\u0005\u0010\t\u0002@>\u0003\u0002\u0002\u0002",
    "@?\u0003\u0002\u0002\u0002AB\u0003\u0002\u0002\u0002BC\u0007\u001d\u0002",
    "\u0002CD\u0005\u0006\u0004\u0002D\u000b\u0003\u0002\u0002\u0002EG\t",
    "\u0002\u0002\u0002FE\u0003\u0002\u0002\u0002GH\u0003\u0002\u0002\u0002",
    "HF\u0003\u0002\u0002\u0002HI\u0003\u0002\u0002\u0002I\r\u0003\u0002",
    "\u0002\u0002JN\u0007\u001a\u0002\u0002KM\u0005\u0012\n\u0002LK\u0003",
    "\u0002\u0002\u0002MP\u0003\u0002\u0002\u0002NL\u0003\u0002\u0002\u0002",
    "NO\u0003\u0002\u0002\u0002O\u000f\u0003\u0002\u0002\u0002PN\u0003\u0002",
    "\u0002\u0002QU\u0007\u001b\u0002\u0002RT\u0005\u0012\n\u0002SR\u0003",
    "\u0002\u0002\u0002TW\u0003\u0002\u0002\u0002US\u0003\u0002\u0002\u0002",
    "UV\u0003\u0002\u0002\u0002V\u0011\u0003\u0002\u0002\u0002WU\u0003\u0002",
    "\u0002\u0002XY\u0007\u001e\u0002\u0002Y\u0013\u0003\u0002\u0002\u0002",
    "\f\u0019!(*2;@HNU"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, null, null, null, "'>'", "'<'", null, "'('", 
                     null, "'['", "']'", "'{'", "'}'", "'.'", null, "'/'", 
                     "'!'", "'*'", "'^'", "'$'", "','", null, "'\\'" ];

var symbolicNames = [ null, "LCOMM", "BCOMM", "Q", "GT", "LT", "MDS", "LP", 
                      "RP", "LB", "RB", "LCB", "RCB", "DOT", "WS", "FS", 
                      "EXC", "AST", "HAT", "DOL", "COM", "CONT", "BS", "NL", 
                      "DYN", "SYM", "OR", "EQ", "TF", "ENT", "INT", "OP", 
                      "CHR", "MDT", "MDE" ];

var ruleNames =  [ "script", "line", "expr", "choice", "assign", "chars", 
                   "dynamic", "symbol", "transform" ];

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
RiScriptParser.GT = 4;
RiScriptParser.LT = 5;
RiScriptParser.MDS = 6;
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
RiScriptParser.RULE_transform = 8;


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
        this.state = 18;
        this.line();
        this.state = 23;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.NL) {
            this.state = 19;
            this.match(RiScriptParser.NL);
            this.state = 20;
            this.line();
            this.state = 25;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
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
        this.state = 31;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(((((_la - 4)) & ~0x1f) == 0 && ((1 << (_la - 4)) & ((1 << (RiScriptParser.GT - 4)) | (1 << (RiScriptParser.LT - 4)) | (1 << (RiScriptParser.LP - 4)) | (1 << (RiScriptParser.DOT - 4)) | (1 << (RiScriptParser.WS - 4)) | (1 << (RiScriptParser.FS - 4)) | (1 << (RiScriptParser.EXC - 4)) | (1 << (RiScriptParser.AST - 4)) | (1 << (RiScriptParser.HAT - 4)) | (1 << (RiScriptParser.DOL - 4)) | (1 << (RiScriptParser.COM - 4)) | (1 << (RiScriptParser.DYN - 4)) | (1 << (RiScriptParser.SYM - 4)) | (1 << (RiScriptParser.ENT - 4)) | (1 << (RiScriptParser.INT - 4)) | (1 << (RiScriptParser.CHR - 4)))) !== 0)) {
            this.state = 28;
            this.expr();
            this.state = 33;
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
        this.state = 38; 
        this._errHandler.sync(this);
        var _alt = 1;
        do {
        	switch (_alt) {
        	case 1:
        		this.state = 38;
        		this._errHandler.sync(this);
        		var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
        		switch(la_) {
        		case 1:
        		    this.state = 34;
        		    this.symbol();
        		    break;

        		case 2:
        		    this.state = 35;
        		    this.choice();
        		    break;

        		case 3:
        		    this.state = 36;
        		    this.assign();
        		    break;

        		case 4:
        		    this.state = 37;
        		    this.chars();
        		    break;

        		}
        		break;
        	default:
        		throw new antlr4.error.NoViableAltException(this);
        	}
        	this.state = 40; 
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
        this.state = 42;
        this.match(RiScriptParser.LP);
        this.state = 48;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,4,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 43;
                this.expr();
                this.state = 44;
                this.match(RiScriptParser.OR); 
            }
            this.state = 50;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,4,this._ctx);
        }

        this.state = 51;
        this.expr();
        this.state = 52;
        this.match(RiScriptParser.RP);
        this.state = 57;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.TF) {
            this.state = 54;
            this.transform();
            this.state = 59;
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
        this.state = 62;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case RiScriptParser.DYN:
            this.state = 60;
            this.dynamic();
            break;
        case RiScriptParser.SYM:
            this.state = 61;
            this.symbol();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
        this.state = 64;
        this.match(RiScriptParser.EQ);
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
        this.state = 68; 
        this._errHandler.sync(this);
        var _alt = 1;
        do {
        	switch (_alt) {
        	case 1:
        		this.state = 67;
        		_la = this._input.LA(1);
        		if(!(((((_la - 4)) & ~0x1f) == 0 && ((1 << (_la - 4)) & ((1 << (RiScriptParser.GT - 4)) | (1 << (RiScriptParser.LT - 4)) | (1 << (RiScriptParser.DOT - 4)) | (1 << (RiScriptParser.WS - 4)) | (1 << (RiScriptParser.FS - 4)) | (1 << (RiScriptParser.EXC - 4)) | (1 << (RiScriptParser.AST - 4)) | (1 << (RiScriptParser.HAT - 4)) | (1 << (RiScriptParser.DOL - 4)) | (1 << (RiScriptParser.COM - 4)) | (1 << (RiScriptParser.ENT - 4)) | (1 << (RiScriptParser.INT - 4)) | (1 << (RiScriptParser.CHR - 4)))) !== 0))) {
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
        	this.state = 70; 
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
        this.state = 72;
        this.match(RiScriptParser.DYN);
        this.state = 76;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.TF) {
            this.state = 73;
            this.transform();
            this.state = 78;
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
        this.state = 79;
        this.match(RiScriptParser.SYM);
        this.state = 83;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.TF) {
            this.state = 80;
            this.transform();
            this.state = 85;
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
    this.enterRule(localctx, 16, RiScriptParser.RULE_transform);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 86;
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
