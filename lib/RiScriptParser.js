// Generated from grammar/RiScript.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var RiScriptListener = require('./RiScriptListener').RiScriptListener;
var RiScriptVisitor = require('./RiScriptVisitor').RiScriptVisitor;

var grammarFileName = "RiScript.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u0011|\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0003\u0002\u0006\u0002\u0014\n\u0002\r\u0002\u000e",
    "\u0002\u0015\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0004",
    "\u0003\u0004\u0003\u0005\u0003\u0005\u0007\u0005 \n\u0005\f\u0005\u000e",
    "\u0005#\u000b\u0005\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0007\u0006)\n\u0006\f\u0006\u000e\u0006,\u000b\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0006",
    "\u00065\n\u0006\r\u0006\u000e\u00066\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0006\u0006>\n\u0006\r\u0006\u000e\u0006?\u0003",
    "\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0005\u0006O\n\u0006\u0003\u0006\u0007\u0006R\n\u0006\f\u0006",
    "\u000e\u0006U\u000b\u0006\u0003\u0007\u0003\u0007\u0003\u0007\u0003",
    "\u0007\u0003\b\u0003\b\u0003\b\u0005\b^\n\b\u0003\t\u0003\t\u0003\t",
    "\u0003\t\u0003\t\u0003\t\u0003\t\u0005\tg\n\t\u0003\t\u0006\tj\n\t\r",
    "\t\u000e\tk\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t",
    "\u0005\tu\n\t\u0007\tw\n\t\f\t\u000e\tz\u000b\t\u0003\t\u0002\u0002",
    "\n\u0002\u0004\u0006\b\n\f\u000e\u0010\u0002\u0002\u0002\u008e\u0002",
    "\u0013\u0003\u0002\u0002\u0002\u0004\u0019\u0003\u0002\u0002\u0002\u0006",
    "\u001b\u0003\u0002\u0002\u0002\b\u001d\u0003\u0002\u0002\u0002\nN\u0003",
    "\u0002\u0002\u0002\fV\u0003\u0002\u0002\u0002\u000e]\u0003\u0002\u0002",
    "\u0002\u0010f\u0003\u0002\u0002\u0002\u0012\u0014\u0005\u0010\t\u0002",
    "\u0013\u0012\u0003\u0002\u0002\u0002\u0014\u0015\u0003\u0002\u0002\u0002",
    "\u0015\u0013\u0003\u0002\u0002\u0002\u0015\u0016\u0003\u0002\u0002\u0002",
    "\u0016\u0017\u0003\u0002\u0002\u0002\u0017\u0018\u0007\u0002\u0002\u0003",
    "\u0018\u0003\u0003\u0002\u0002\u0002\u0019\u001a\u0007\u000f\u0002\u0002",
    "\u001a\u0005\u0003\u0002\u0002\u0002\u001b\u001c\u0007\f\u0002\u0002",
    "\u001c\u0007\u0003\u0002\u0002\u0002\u001d!\u0005\u0006\u0004\u0002",
    "\u001e \u0005\u0004\u0003\u0002\u001f\u001e\u0003\u0002\u0002\u0002",
    " #\u0003\u0002\u0002\u0002!\u001f\u0003\u0002\u0002\u0002!\"\u0003\u0002",
    "\u0002\u0002\"\t\u0003\u0002\u0002\u0002#!\u0003\u0002\u0002\u0002$",
    "*\u0007\u0003\u0002\u0002%&\u0005\u0010\t\u0002&\'\u0007\r\u0002\u0002",
    "\')\u0003\u0002\u0002\u0002(%\u0003\u0002\u0002\u0002),\u0003\u0002",
    "\u0002\u0002*(\u0003\u0002\u0002\u0002*+\u0003\u0002\u0002\u0002+-\u0003",
    "\u0002\u0002\u0002,*\u0003\u0002\u0002\u0002-.\u0005\u0010\t\u0002.",
    "/\u0007\u0004\u0002\u0002/O\u0003\u0002\u0002\u000204\u0007\u0003\u0002",
    "\u000212\u0005\u0010\t\u000223\u0007\r\u0002\u000235\u0003\u0002\u0002",
    "\u000241\u0003\u0002\u0002\u000256\u0003\u0002\u0002\u000264\u0003\u0002",
    "\u0002\u000267\u0003\u0002\u0002\u000278\u0003\u0002\u0002\u000289\u0007",
    "\u0004\u0002\u00029O\u0003\u0002\u0002\u0002:=\u0007\u0003\u0002\u0002",
    ";<\u0007\r\u0002\u0002<>\u0005\u0010\t\u0002=;\u0003\u0002\u0002\u0002",
    ">?\u0003\u0002\u0002\u0002?=\u0003\u0002\u0002\u0002?@\u0003\u0002\u0002",
    "\u0002@A\u0003\u0002\u0002\u0002AB\u0007\u0004\u0002\u0002BO\u0003\u0002",
    "\u0002\u0002CD\u0007\u0003\u0002\u0002DE\u0007\r\u0002\u0002EO\u0007",
    "\u0004\u0002\u0002FG\u0007\u0003\u0002\u0002GH\u0007\r\u0002\u0002H",
    "I\u0005\u0010\t\u0002IJ\u0007\r\u0002\u0002JK\u0007\u0004\u0002\u0002",
    "KO\u0003\u0002\u0002\u0002LM\u0007\u0003\u0002\u0002MO\u0007\u0004\u0002",
    "\u0002N$\u0003\u0002\u0002\u0002N0\u0003\u0002\u0002\u0002N:\u0003\u0002",
    "\u0002\u0002NC\u0003\u0002\u0002\u0002NF\u0003\u0002\u0002\u0002NL\u0003",
    "\u0002\u0002\u0002OS\u0003\u0002\u0002\u0002PR\u0005\u0004\u0003\u0002",
    "QP\u0003\u0002\u0002\u0002RU\u0003\u0002\u0002\u0002SQ\u0003\u0002\u0002",
    "\u0002ST\u0003\u0002\u0002\u0002T\u000b\u0003\u0002\u0002\u0002US\u0003",
    "\u0002\u0002\u0002VW\u0005\b\u0005\u0002WX\u0007\u000e\u0002\u0002X",
    "Y\u0005\u000e\b\u0002Y\r\u0003\u0002\u0002\u0002Z^\u0005\b\u0005\u0002",
    "[^\u0005\n\u0006\u0002\\^\u0007\u0011\u0002\u0002]Z\u0003\u0002\u0002",
    "\u0002][\u0003\u0002\u0002\u0002]\\\u0003\u0002\u0002\u0002^\u000f\u0003",
    "\u0002\u0002\u0002_g\u0005\b\u0005\u0002`g\u0005\n\u0006\u0002ag\u0005",
    "\f\u0007\u0002bg\u0007\u0011\u0002\u0002cg\u0007\u000b\u0002\u0002d",
    "g\u0007\t\u0002\u0002eg\u0007\u0010\u0002\u0002f_\u0003\u0002\u0002",
    "\u0002f`\u0003\u0002\u0002\u0002fa\u0003\u0002\u0002\u0002fb\u0003\u0002",
    "\u0002\u0002fc\u0003\u0002\u0002\u0002fd\u0003\u0002\u0002\u0002fe\u0003",
    "\u0002\u0002\u0002gx\u0003\u0002\u0002\u0002hj\u0007\n\u0002\u0002i",
    "h\u0003\u0002\u0002\u0002jk\u0003\u0002\u0002\u0002ki\u0003\u0002\u0002",
    "\u0002kl\u0003\u0002\u0002\u0002lt\u0003\u0002\u0002\u0002mu\u0005\b",
    "\u0005\u0002nu\u0005\n\u0006\u0002ou\u0005\f\u0007\u0002pu\u0007\u0011",
    "\u0002\u0002qu\u0007\u000b\u0002\u0002ru\u0007\t\u0002\u0002su\u0007",
    "\u0010\u0002\u0002tm\u0003\u0002\u0002\u0002tn\u0003\u0002\u0002\u0002",
    "to\u0003\u0002\u0002\u0002tp\u0003\u0002\u0002\u0002tq\u0003\u0002\u0002",
    "\u0002tr\u0003\u0002\u0002\u0002ts\u0003\u0002\u0002\u0002uw\u0003\u0002",
    "\u0002\u0002vi\u0003\u0002\u0002\u0002wz\u0003\u0002\u0002\u0002xv\u0003",
    "\u0002\u0002\u0002xy\u0003\u0002\u0002\u0002y\u0011\u0003\u0002\u0002",
    "\u0002zx\u0003\u0002\u0002\u0002\u000e\u0015!*6?NS]fktx"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'('", "')'", "'['", "']'", "'{'", "'}'", "'.'" ];

var symbolicNames = [ null, "LP", "RP", "LB", "RB", "LCB", "RCB", "DOT", 
                      "WS", "NL", "SYM", "OR", "EQ", "TF", "ENT", "CHR" ];

var ruleNames =  [ "script", "transform", "ident", "symbol", "choice", "assign", 
                   "value", "expr" ];

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
RiScriptParser.CHR = 15;

RiScriptParser.RULE_script = 0;
RiScriptParser.RULE_transform = 1;
RiScriptParser.RULE_ident = 2;
RiScriptParser.RULE_symbol = 3;
RiScriptParser.RULE_choice = 4;
RiScriptParser.RULE_assign = 5;
RiScriptParser.RULE_value = 6;
RiScriptParser.RULE_expr = 7;

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
        this.state = 17; 
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
            this.state = 16;
            this.expr();
            this.state = 19; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << RiScriptParser.LP) | (1 << RiScriptParser.DOT) | (1 << RiScriptParser.NL) | (1 << RiScriptParser.SYM) | (1 << RiScriptParser.ENT) | (1 << RiScriptParser.CHR))) !== 0));
        this.state = 21;
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
        this.state = 23;
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
        this.state = 25;
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
        this.state = 27;
        this.ident();
        this.state = 31;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.TF) {
            this.state = 28;
            this.transform();
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
        this.state = 76;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,5,this._ctx);
        switch(la_) {
        case 1:
            this.state = 34;
            this.match(RiScriptParser.LP);
            this.state = 40;
            this._errHandler.sync(this);
            var _alt = this._interp.adaptivePredict(this._input,2,this._ctx)
            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
                if(_alt===1) {
                    this.state = 35;
                    this.expr();
                    this.state = 36;
                    this.match(RiScriptParser.OR); 
                }
                this.state = 42;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input,2,this._ctx);
            }

            this.state = 43;
            this.expr();
            this.state = 44;
            this.match(RiScriptParser.RP);
            break;

        case 2:
            this.state = 46;
            this.match(RiScriptParser.LP);
            this.state = 50; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 47;
                this.expr();
                this.state = 48;
                this.match(RiScriptParser.OR);
                this.state = 52; 
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << RiScriptParser.LP) | (1 << RiScriptParser.DOT) | (1 << RiScriptParser.NL) | (1 << RiScriptParser.SYM) | (1 << RiScriptParser.ENT) | (1 << RiScriptParser.CHR))) !== 0));
            this.state = 54;
            this.match(RiScriptParser.RP);
            break;

        case 3:
            this.state = 56;
            this.match(RiScriptParser.LP);
            this.state = 59; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 57;
                this.match(RiScriptParser.OR);
                this.state = 58;
                this.expr();
                this.state = 61; 
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while(_la===RiScriptParser.OR);
            this.state = 63;
            this.match(RiScriptParser.RP);
            break;

        case 4:
            this.state = 65;
            this.match(RiScriptParser.LP);
            this.state = 66;
            this.match(RiScriptParser.OR);
            this.state = 67;
            this.match(RiScriptParser.RP);
            break;

        case 5:
            this.state = 68;
            this.match(RiScriptParser.LP);
            this.state = 69;
            this.match(RiScriptParser.OR);
            this.state = 70;
            this.expr();
            this.state = 71;
            this.match(RiScriptParser.OR);
            this.state = 72;
            this.match(RiScriptParser.RP);
            break;

        case 6:
            this.state = 74;
            this.match(RiScriptParser.LP);
            this.state = 75;
            this.match(RiScriptParser.RP);
            break;

        }
        this.state = 81;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.TF) {
            this.state = 78;
            this.transform();
            this.state = 83;
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

AssignContext.prototype.value = function() {
    return this.getTypedRuleContext(ValueContext,0);
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
    this.enterRule(localctx, 10, RiScriptParser.RULE_assign);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 84;
        this.symbol();
        this.state = 85;
        this.match(RiScriptParser.EQ);
        this.state = 86;
        this.value();
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

function ValueContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = RiScriptParser.RULE_value;
    return this;
}

ValueContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ValueContext.prototype.constructor = ValueContext;

ValueContext.prototype.symbol = function() {
    return this.getTypedRuleContext(SymbolContext,0);
};

ValueContext.prototype.choice = function() {
    return this.getTypedRuleContext(ChoiceContext,0);
};

ValueContext.prototype.CHR = function() {
    return this.getToken(RiScriptParser.CHR, 0);
};

ValueContext.prototype.enterRule = function(listener) {
    if(listener instanceof RiScriptListener ) {
        listener.enterValue(this);
	}
};

ValueContext.prototype.exitRule = function(listener) {
    if(listener instanceof RiScriptListener ) {
        listener.exitValue(this);
	}
};

ValueContext.prototype.accept = function(visitor) {
    if ( visitor instanceof RiScriptVisitor ) {
        return visitor.visitValue(this);
    } else {
        return visitor.visitChildren(this);
    }
};




RiScriptParser.ValueContext = ValueContext;

RiScriptParser.prototype.value = function() {

    var localctx = new ValueContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, RiScriptParser.RULE_value);
    try {
        this.state = 91;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case RiScriptParser.SYM:
            this.enterOuterAlt(localctx, 1);
            this.state = 88;
            this.symbol();
            break;
        case RiScriptParser.LP:
            this.enterOuterAlt(localctx, 2);
            this.state = 89;
            this.choice();
            break;
        case RiScriptParser.CHR:
            this.enterOuterAlt(localctx, 3);
            this.state = 90;
            this.match(RiScriptParser.CHR);
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


ExprContext.prototype.NL = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(RiScriptParser.NL);
    } else {
        return this.getToken(RiScriptParser.NL, i);
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
    this.enterRule(localctx, 14, RiScriptParser.RULE_expr);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 100;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,8,this._ctx);
        switch(la_) {
        case 1:
            this.state = 93;
            this.symbol();
            break;

        case 2:
            this.state = 94;
            this.choice();
            break;

        case 3:
            this.state = 95;
            this.assign();
            break;

        case 4:
            this.state = 96;
            this.match(RiScriptParser.CHR);
            break;

        case 5:
            this.state = 97;
            this.match(RiScriptParser.NL);
            break;

        case 6:
            this.state = 98;
            this.match(RiScriptParser.DOT);
            break;

        case 7:
            this.state = 99;
            this.match(RiScriptParser.ENT);
            break;

        }
        this.state = 118;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===RiScriptParser.WS) {
            this.state = 103; 
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 102;
                this.match(RiScriptParser.WS);
                this.state = 105; 
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while(_la===RiScriptParser.WS);
            this.state = 114;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,10,this._ctx);
            switch(la_) {
            case 1:
                this.state = 107;
                this.symbol();
                break;

            case 2:
                this.state = 108;
                this.choice();
                break;

            case 3:
                this.state = 109;
                this.assign();
                break;

            case 4:
                this.state = 110;
                this.match(RiScriptParser.CHR);
                break;

            case 5:
                this.state = 111;
                this.match(RiScriptParser.NL);
                break;

            case 6:
                this.state = 112;
                this.match(RiScriptParser.DOT);
                break;

            case 7:
                this.state = 113;
                this.match(RiScriptParser.ENT);
                break;

            }
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


exports.RiScriptParser = RiScriptParser;
