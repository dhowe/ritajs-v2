// Generated from grammar/RiScriptParser.g4 by ANTLR 4.9.1
// jshint ignore: start
import antlr4 from 'antlr4';
import RiScriptParserVisitor from './RiScriptParserVisitor.js';


const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003#\u00ce\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010",
    "\u0004\u0011\t\u0011\u0003\u0002\u0003\u0002\u0003\u0002\u0007\u0002",
    "&\n\u0002\f\u0002\u000e\u0002)\u000b\u0002\u0003\u0002\u0003\u0002\u0003",
    "\u0003\u0003\u0003\u0007\u0003/\n\u0003\f\u0003\u000e\u00032\u000b\u0003",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0006\u0004",
    "9\n\u0004\r\u0004\u000e\u0004:\u0003\u0005\u0007\u0005>\n\u0005\f\u0005",
    "\u000e\u0005A\u000b\u0005\u0003\u0005\u0003\u0005\u0006\u0005E\n\u0005",
    "\r\u0005\u000e\u0005F\u0003\u0005\u0003\u0005\u0007\u0005K\n\u0005\f",
    "\u0005\u000e\u0005N\u000b\u0005\u0003\u0005\u0003\u0005\u0003\u0006",
    "\u0003\u0006\u0007\u0006T\n\u0006\f\u0006\u000e\u0006W\u000b\u0006\u0003",
    "\u0006\u0003\u0006\u0007\u0006[\n\u0006\f\u0006\u000e\u0006^\u000b\u0006",
    "\u0003\u0006\u0003\u0006\u0007\u0006b\n\u0006\f\u0006\u000e\u0006e\u000b",
    "\u0006\u0003\u0006\u0005\u0006h\n\u0006\u0003\u0007\u0007\u0007k\n\u0007",
    "\f\u0007\u000e\u0007n\u000b\u0007\u0003\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0007\u0007t\n\u0007\f\u0007\u000e\u0007w\u000b\u0007\u0003",
    "\b\u0003\b\u0005\b{\n\b\u0003\b\u0003\b\u0003\b\u0003\t\u0003\t\u0003",
    "\t\u0005\t\u0083\n\t\u0003\t\u0005\t\u0086\n\t\u0003\n\u0003\n\u0007",
    "\n\u008a\n\n\f\n\u000e\n\u008d\u000b\n\u0003\u000b\u0003\u000b\u0007",
    "\u000b\u0091\n\u000b\f\u000b\u000e\u000b\u0094\u000b\u000b\u0003\u000b",
    "\u0006\u000b\u0097\n\u000b\r\u000b\u000e\u000b\u0098\u0005\u000b\u009b",
    "\n\u000b\u0003\f\u0003\f\u0003\f\u0003\f\u0007\f\u00a1\n\f\f\f\u000e",
    "\f\u00a4\u000b\f\u0003\f\u0003\f\u0003\f\u0003\f\u0007\f\u00aa\n\f\f",
    "\f\u000e\f\u00ad\u000b\f\u0003\r\u0005\r\u00b0\n\r\u0003\r\u0005\r\u00b3",
    "\n\r\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003",
    "\u000e\u0007\u000e\u00bb\n\u000e\f\u000e\u000e\u000e\u00be\u000b\u000e",
    "\u0003\u000f\u0006\u000f\u00c1\n\u000f\r\u000f\u000e\u000f\u00c2\u0003",
    "\u0010\u0003\u0010\u0005\u0010\u00c7\n\u0010\u0003\u0011\u0006\u0011",
    "\u00ca\n\u0011\r\u0011\u000e\u0011\u00cb\u0003\u0011\u0002\u0002\u0012",
    "\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c",
    "\u001e \u0002\u0004\u0004\u0002\u0011\u0012\u001b\u001b\u0005\u0002",
    "\r\u0015\u001c\u001d\u001f\u001f\u0002\u00dd\u0002\"\u0003\u0002\u0002",
    "\u0002\u00040\u0003\u0002\u0002\u0002\u00068\u0003\u0002\u0002\u0002",
    "\b?\u0003\u0002\u0002\u0002\nQ\u0003\u0002\u0002\u0002\fl\u0003\u0002",
    "\u0002\u0002\u000ez\u0003\u0002\u0002\u0002\u0010\u007f\u0003\u0002",
    "\u0002\u0002\u0012\u0087\u0003\u0002\u0002\u0002\u0014\u009a\u0003\u0002",
    "\u0002\u0002\u0016\u009c\u0003\u0002\u0002\u0002\u0018\u00af\u0003\u0002",
    "\u0002\u0002\u001a\u00b4\u0003\u0002\u0002\u0002\u001c\u00c0\u0003\u0002",
    "\u0002\u0002\u001e\u00c6\u0003\u0002\u0002\u0002 \u00c9\u0003\u0002",
    "\u0002\u0002\"\'\u0005\u0004\u0003\u0002#$\u0007\u0016\u0002\u0002$",
    "&\u0005\u0004\u0003\u0002%#\u0003\u0002\u0002\u0002&)\u0003\u0002\u0002",
    "\u0002\'%\u0003\u0002\u0002\u0002\'(\u0003\u0002\u0002\u0002(*\u0003",
    "\u0002\u0002\u0002)\'\u0003\u0002\u0002\u0002*+\u0007\u0002\u0002\u0003",
    "+\u0003\u0003\u0002\u0002\u0002,/\u0005\u0006\u0004\u0002-/\u0005\b",
    "\u0005\u0002.,\u0003\u0002\u0002\u0002.-\u0003\u0002\u0002\u0002/2\u0003",
    "\u0002\u0002\u00020.\u0003\u0002\u0002\u000201\u0003\u0002\u0002\u0002",
    "1\u0005\u0003\u0002\u0002\u000220\u0003\u0002\u0002\u000239\u0005\u0014",
    "\u000b\u000249\u0005\u0016\f\u000259\u0005\u000e\b\u000269\u0005 \u0011",
    "\u000279\u0005\u001a\u000e\u000283\u0003\u0002\u0002\u000284\u0003\u0002",
    "\u0002\u000285\u0003\u0002\u0002\u000286\u0003\u0002\u0002\u000287\u0003",
    "\u0002\u0002\u00029:\u0003\u0002\u0002\u0002:8\u0003\u0002\u0002\u0002",
    ":;\u0003\u0002\u0002\u0002;\u0007\u0003\u0002\u0002\u0002<>\u0007\u0014",
    "\u0002\u0002=<\u0003\u0002\u0002\u0002>A\u0003\u0002\u0002\u0002?=\u0003",
    "\u0002\u0002\u0002?@\u0003\u0002\u0002\u0002@B\u0003\u0002\u0002\u0002",
    "A?\u0003\u0002\u0002\u0002BD\u0007\u000b\u0002\u0002CE\u0005\n\u0006",
    "\u0002DC\u0003\u0002\u0002\u0002EF\u0003\u0002\u0002\u0002FD\u0003\u0002",
    "\u0002\u0002FG\u0003\u0002\u0002\u0002GH\u0003\u0002\u0002\u0002HL\u0007",
    "\u0005\u0002\u0002IK\u0007\u0014\u0002\u0002JI\u0003\u0002\u0002\u0002",
    "KN\u0003\u0002\u0002\u0002LJ\u0003\u0002\u0002\u0002LM\u0003\u0002\u0002",
    "\u0002MO\u0003\u0002\u0002\u0002NL\u0003\u0002\u0002\u0002OP\u0005\u0006",
    "\u0004\u0002P\t\u0003\u0002\u0002\u0002QU\u0005\u0014\u000b\u0002RT",
    "\u0007\u0014\u0002\u0002SR\u0003\u0002\u0002\u0002TW\u0003\u0002\u0002",
    "\u0002US\u0003\u0002\u0002\u0002UV\u0003\u0002\u0002\u0002VX\u0003\u0002",
    "\u0002\u0002WU\u0003\u0002\u0002\u0002X\\\u0005\u001e\u0010\u0002Y[",
    "\u0007\u0014\u0002\u0002ZY\u0003\u0002\u0002\u0002[^\u0003\u0002\u0002",
    "\u0002\\Z\u0003\u0002\u0002\u0002\\]\u0003\u0002\u0002\u0002]_\u0003",
    "\u0002\u0002\u0002^\\\u0003\u0002\u0002\u0002_c\u0005 \u0011\u0002`",
    "b\u0007\u0014\u0002\u0002a`\u0003\u0002\u0002\u0002be\u0003\u0002\u0002",
    "\u0002ca\u0003\u0002\u0002\u0002cd\u0003\u0002\u0002\u0002dg\u0003\u0002",
    "\u0002\u0002ec\u0003\u0002\u0002\u0002fh\u0007\u0010\u0002\u0002gf\u0003",
    "\u0002\u0002\u0002gh\u0003\u0002\u0002\u0002h\u000b\u0003\u0002\u0002",
    "\u0002ik\u0007\u0014\u0002\u0002ji\u0003\u0002\u0002\u0002kn\u0003\u0002",
    "\u0002\u0002lj\u0003\u0002\u0002\u0002lm\u0003\u0002\u0002\u0002mo\u0003",
    "\u0002\u0002\u0002nl\u0003\u0002\u0002\u0002op\u0007\t\u0002\u0002p",
    "q\u0007\u001d\u0002\u0002qu\u0007\n\u0002\u0002rt\u0007\u0014\u0002",
    "\u0002sr\u0003\u0002\u0002\u0002tw\u0003\u0002\u0002\u0002us\u0003\u0002",
    "\u0002\u0002uv\u0003\u0002\u0002\u0002v\r\u0003\u0002\u0002\u0002wu",
    "\u0003\u0002\u0002\u0002x{\u0005\u0012\n\u0002y{\u0005\u0014\u000b\u0002",
    "zx\u0003\u0002\u0002\u0002zy\u0003\u0002\u0002\u0002{|\u0003\u0002\u0002",
    "\u0002|}\u0007\u001b\u0002\u0002}~\u0005\u0006\u0004\u0002~\u000f\u0003",
    "\u0002\u0002\u0002\u007f\u0085\u0007\u0017\u0002\u0002\u0080\u0082\u0007",
    "\u0007\u0002\u0002\u0081\u0083\u0005\u0006\u0004\u0002\u0082\u0081\u0003",
    "\u0002\u0002\u0002\u0082\u0083\u0003\u0002\u0002\u0002\u0083\u0084\u0003",
    "\u0002\u0002\u0002\u0084\u0086\u0007\b\u0002\u0002\u0085\u0080\u0003",
    "\u0002\u0002\u0002\u0085\u0086\u0003\u0002\u0002\u0002\u0086\u0011\u0003",
    "\u0002\u0002\u0002\u0087\u008b\u0007\u0018\u0002\u0002\u0088\u008a\u0005",
    "\u0010\t\u0002\u0089\u0088\u0003\u0002\u0002\u0002\u008a\u008d\u0003",
    "\u0002\u0002\u0002\u008b\u0089\u0003\u0002\u0002\u0002\u008b\u008c\u0003",
    "\u0002\u0002\u0002\u008c\u0013\u0003\u0002\u0002\u0002\u008d\u008b\u0003",
    "\u0002\u0002\u0002\u008e\u0092\u0007\u0019\u0002\u0002\u008f\u0091\u0005",
    "\u0010\t\u0002\u0090\u008f\u0003\u0002\u0002\u0002\u0091\u0094\u0003",
    "\u0002\u0002\u0002\u0092\u0090\u0003\u0002\u0002\u0002\u0092\u0093\u0003",
    "\u0002\u0002\u0002\u0093\u009b\u0003\u0002\u0002\u0002\u0094\u0092\u0003",
    "\u0002\u0002\u0002\u0095\u0097\u0005\u0010\t\u0002\u0096\u0095\u0003",
    "\u0002\u0002\u0002\u0097\u0098\u0003\u0002\u0002\u0002\u0098\u0096\u0003",
    "\u0002\u0002\u0002\u0098\u0099\u0003\u0002\u0002\u0002\u0099\u009b\u0003",
    "\u0002\u0002\u0002\u009a\u008e\u0003\u0002\u0002\u0002\u009a\u0096\u0003",
    "\u0002\u0002\u0002\u009b\u0015\u0003\u0002\u0002\u0002\u009c\u00a2\u0007",
    "\u0007\u0002\u0002\u009d\u009e\u0005\u0018\r\u0002\u009e\u009f\u0007",
    "\u001a\u0002\u0002\u009f\u00a1\u0003\u0002\u0002\u0002\u00a0\u009d\u0003",
    "\u0002\u0002\u0002\u00a1\u00a4\u0003\u0002\u0002\u0002\u00a2\u00a0\u0003",
    "\u0002\u0002\u0002\u00a2\u00a3\u0003\u0002\u0002\u0002\u00a3\u00a5\u0003",
    "\u0002\u0002\u0002\u00a4\u00a2\u0003\u0002\u0002\u0002\u00a5\u00a6\u0005",
    "\u0018\r\u0002\u00a6\u00a7\u0007\b\u0002\u0002\u00a7\u00ab\u0003\u0002",
    "\u0002\u0002\u00a8\u00aa\u0005\u0010\t\u0002\u00a9\u00a8\u0003\u0002",
    "\u0002\u0002\u00aa\u00ad\u0003\u0002\u0002\u0002\u00ab\u00a9\u0003\u0002",
    "\u0002\u0002\u00ab\u00ac\u0003\u0002\u0002\u0002\u00ac\u0017\u0003\u0002",
    "\u0002\u0002\u00ad\u00ab\u0003\u0002\u0002\u0002\u00ae\u00b0\u0005\u0006",
    "\u0004\u0002\u00af\u00ae\u0003\u0002\u0002\u0002\u00af\u00b0\u0003\u0002",
    "\u0002\u0002\u00b0\u00b2\u0003\u0002\u0002\u0002\u00b1\u00b3\u0005\f",
    "\u0007\u0002\u00b2\u00b1\u0003\u0002\u0002\u0002\u00b2\u00b3\u0003\u0002",
    "\u0002\u0002\u00b3\u0019\u0003\u0002\u0002\u0002\u00b4\u00b5\u0007\t",
    "\u0002\u0002\u00b5\u00b6\u0005\u0006\u0004\u0002\u00b6\u00b7\u0007\u0006",
    "\u0002\u0002\u00b7\u00b8\u0005\u001c\u000f\u0002\u00b8\u00bc\u0007#",
    "\u0002\u0002\u00b9\u00bb\u0007\u0014\u0002\u0002\u00ba\u00b9\u0003\u0002",
    "\u0002\u0002\u00bb\u00be\u0003\u0002\u0002\u0002\u00bc\u00ba\u0003\u0002",
    "\u0002\u0002\u00bc\u00bd\u0003\u0002\u0002\u0002\u00bd\u001b\u0003\u0002",
    "\u0002\u0002\u00be\u00bc\u0003\u0002\u0002\u0002\u00bf\u00c1\u0007\"",
    "\u0002\u0002\u00c0\u00bf\u0003\u0002\u0002\u0002\u00c1\u00c2\u0003\u0002",
    "\u0002\u0002\u00c2\u00c0\u0003\u0002\u0002\u0002\u00c2\u00c3\u0003\u0002",
    "\u0002\u0002\u00c3\u001d\u0003\u0002\u0002\u0002\u00c4\u00c7\u0007\u001e",
    "\u0002\u0002\u00c5\u00c7\t\u0002\u0002\u0002\u00c6\u00c4\u0003\u0002",
    "\u0002\u0002\u00c6\u00c5\u0003\u0002\u0002\u0002\u00c7\u001f\u0003\u0002",
    "\u0002\u0002\u00c8\u00ca\t\u0003\u0002\u0002\u00c9\u00c8\u0003\u0002",
    "\u0002\u0002\u00ca\u00cb\u0003\u0002\u0002\u0002\u00cb\u00c9\u0003\u0002",
    "\u0002\u0002\u00cb\u00cc\u0003\u0002\u0002\u0002\u00cc!\u0003\u0002",
    "\u0002\u0002\u001f\'.08:?FLU\\cgluz\u0082\u0085\u008b\u0092\u0098\u009a",
    "\u00a2\u00ab\u00af\u00b2\u00bc\u00c2\u00c6\u00cb"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class RiScriptParser extends antlr4.Parser {

    static grammarFileName = "RiScriptParser.g4";
    static literalNames = [ null, null, null, null, null, "'('", null, "'['", 
                            "']'", "'{'", "'}'", "'/'", "'*'", "'$'", "','", 
                            "'>'", "'<'", "'.'" ];
    static symbolicNames = [ null, "LCOMM", "BCOMM", "LCBQ", "MDLS", "LP", 
                             "RP", "LB", "RB", "LCB", "RCB", "FS", "AST", 
                             "DOL", "COM", "GT", "LT", "DOT", "WS", "ESC", 
                             "NL", "DIDENT", "DYN", "SYM", "OR", "EQ", "ENT", 
                             "INT", "OP", "CHR", "IDENT", "CONT", "MDLT", 
                             "MDLE" ];
    static ruleNames = [ "script", "line", "expr", "cexpr", "cond", "weight", 
                         "assign", "transform", "dynamic", "symbol", "choice", 
                         "wexpr", "link", "url", "op", "chars" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = RiScriptParser.ruleNames;
        this.literalNames = RiScriptParser.literalNames;
        this.symbolicNames = RiScriptParser.symbolicNames;
    }

    get atn() {
        return atn;
    }



	script() {
	    let localctx = new ScriptContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, RiScriptParser.RULE_script);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 32;
	        this.line();
	        this.state = 37;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===RiScriptParser.NL) {
	            this.state = 33;
	            this.match(RiScriptParser.NL);
	            this.state = 34;
	            this.line();
	            this.state = 39;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 40;
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
	}



	line() {
	    let localctx = new LineContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, RiScriptParser.RULE_line);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 46;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << RiScriptParser.LP) | (1 << RiScriptParser.LB) | (1 << RiScriptParser.LCB) | (1 << RiScriptParser.FS) | (1 << RiScriptParser.AST) | (1 << RiScriptParser.DOL) | (1 << RiScriptParser.COM) | (1 << RiScriptParser.GT) | (1 << RiScriptParser.LT) | (1 << RiScriptParser.DOT) | (1 << RiScriptParser.WS) | (1 << RiScriptParser.ESC) | (1 << RiScriptParser.DIDENT) | (1 << RiScriptParser.DYN) | (1 << RiScriptParser.SYM) | (1 << RiScriptParser.ENT) | (1 << RiScriptParser.INT) | (1 << RiScriptParser.CHR))) !== 0)) {
	            this.state = 44;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
	            switch(la_) {
	            case 1:
	                this.state = 42;
	                this.expr();
	                break;

	            case 2:
	                this.state = 43;
	                this.cexpr();
	                break;

	            }
	            this.state = 48;
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
	}



	expr() {
	    let localctx = new ExprContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, RiScriptParser.RULE_expr);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 54; 
	        this._errHandler.sync(this);
	        var _alt = 1;
	        do {
	        	switch (_alt) {
	        	case 1:
	        		this.state = 54;
	        		this._errHandler.sync(this);
	        		var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
	        		switch(la_) {
	        		case 1:
	        		    this.state = 49;
	        		    this.symbol();
	        		    break;

	        		case 2:
	        		    this.state = 50;
	        		    this.choice();
	        		    break;

	        		case 3:
	        		    this.state = 51;
	        		    this.assign();
	        		    break;

	        		case 4:
	        		    this.state = 52;
	        		    this.chars();
	        		    break;

	        		case 5:
	        		    this.state = 53;
	        		    this.link();
	        		    break;

	        		}
	        		break;
	        	default:
	        		throw new antlr4.error.NoViableAltException(this);
	        	}
	        	this.state = 56; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,4, this._ctx);
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
	}



	cexpr() {
	    let localctx = new CexprContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, RiScriptParser.RULE_cexpr);
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
	        this.match(RiScriptParser.LCB);
	        this.state = 66; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 65;
	            this.cond();
	            this.state = 68; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===RiScriptParser.DIDENT || _la===RiScriptParser.SYM);
	        this.state = 70;
	        this.match(RiScriptParser.LCBQ);
	        this.state = 74;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,7,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 71;
	                this.match(RiScriptParser.WS); 
	            }
	            this.state = 76;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,7,this._ctx);
	        }

	        this.state = 77;
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
	}



	cond() {
	    let localctx = new CondContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, RiScriptParser.RULE_cond);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 79;
	        this.symbol();
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
	        this.state = 86;
	        this.op();
	        this.state = 90;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,9,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 87;
	                this.match(RiScriptParser.WS); 
	            }
	            this.state = 92;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,9,this._ctx);
	        }

	        this.state = 93;
	        this.chars();
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
	        this.state = 101;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===RiScriptParser.COM) {
	            this.state = 100;
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
	}



	weight() {
	    let localctx = new WeightContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, RiScriptParser.RULE_weight);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
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
	        this.state = 109;
	        this.match(RiScriptParser.LB);
	        this.state = 110;
	        this.match(RiScriptParser.INT);
	        this.state = 111;
	        this.match(RiScriptParser.RB);
	        this.state = 115;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===RiScriptParser.WS) {
	            this.state = 112;
	            this.match(RiScriptParser.WS);
	            this.state = 117;
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
	}



	assign() {
	    let localctx = new AssignContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, RiScriptParser.RULE_assign);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 120;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case RiScriptParser.DYN:
	            this.state = 118;
	            this.dynamic();
	            break;
	        case RiScriptParser.DIDENT:
	        case RiScriptParser.SYM:
	            this.state = 119;
	            this.symbol();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 122;
	        this.match(RiScriptParser.EQ);
	        this.state = 123;
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
	}



	transform() {
	    let localctx = new TransformContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, RiScriptParser.RULE_transform);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 125;
	        this.match(RiScriptParser.DIDENT);
	        this.state = 131;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,16,this._ctx);
	        if(la_===1) {
	            this.state = 126;
	            this.match(RiScriptParser.LP);
	            this.state = 128;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << RiScriptParser.LP) | (1 << RiScriptParser.LB) | (1 << RiScriptParser.FS) | (1 << RiScriptParser.AST) | (1 << RiScriptParser.DOL) | (1 << RiScriptParser.COM) | (1 << RiScriptParser.GT) | (1 << RiScriptParser.LT) | (1 << RiScriptParser.DOT) | (1 << RiScriptParser.WS) | (1 << RiScriptParser.ESC) | (1 << RiScriptParser.DIDENT) | (1 << RiScriptParser.DYN) | (1 << RiScriptParser.SYM) | (1 << RiScriptParser.ENT) | (1 << RiScriptParser.INT) | (1 << RiScriptParser.CHR))) !== 0)) {
	                this.state = 127;
	                this.expr();
	            }

	            this.state = 130;
	            this.match(RiScriptParser.RP);

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
	}



	dynamic() {
	    let localctx = new DynamicContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, RiScriptParser.RULE_dynamic);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 133;
	        this.match(RiScriptParser.DYN);
	        this.state = 137;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===RiScriptParser.DIDENT) {
	            this.state = 134;
	            this.transform();
	            this.state = 139;
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
	}



	symbol() {
	    let localctx = new SymbolContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, RiScriptParser.RULE_symbol);
	    try {
	        this.state = 152;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case RiScriptParser.SYM:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 140;
	            this.match(RiScriptParser.SYM);
	            this.state = 144;
	            this._errHandler.sync(this);
	            var _alt = this._interp.adaptivePredict(this._input,18,this._ctx)
	            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	                if(_alt===1) {
	                    this.state = 141;
	                    this.transform(); 
	                }
	                this.state = 146;
	                this._errHandler.sync(this);
	                _alt = this._interp.adaptivePredict(this._input,18,this._ctx);
	            }

	            break;
	        case RiScriptParser.DIDENT:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 148; 
	            this._errHandler.sync(this);
	            var _alt = 1;
	            do {
	            	switch (_alt) {
	            	case 1:
	            		this.state = 147;
	            		this.transform();
	            		break;
	            	default:
	            		throw new antlr4.error.NoViableAltException(this);
	            	}
	            	this.state = 150; 
	            	this._errHandler.sync(this);
	            	_alt = this._interp.adaptivePredict(this._input,19, this._ctx);
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
	}



	choice() {
	    let localctx = new ChoiceContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, RiScriptParser.RULE_choice);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 154;
	        this.match(RiScriptParser.LP);
	        this.state = 160;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,21,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 155;
	                this.wexpr();
	                this.state = 156;
	                this.match(RiScriptParser.OR); 
	            }
	            this.state = 162;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,21,this._ctx);
	        }

	        this.state = 163;
	        this.wexpr();
	        this.state = 164;
	        this.match(RiScriptParser.RP);
	        this.state = 169;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,22,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 166;
	                this.transform(); 
	            }
	            this.state = 171;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,22,this._ctx);
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
	}



	wexpr() {
	    let localctx = new WexprContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, RiScriptParser.RULE_wexpr);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 173;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,23,this._ctx);
	        if(la_===1) {
	            this.state = 172;
	            this.expr();

	        }
	        this.state = 176;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===RiScriptParser.LB || _la===RiScriptParser.WS) {
	            this.state = 175;
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
	}



	link() {
	    let localctx = new LinkContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 24, RiScriptParser.RULE_link);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 178;
	        this.match(RiScriptParser.LB);
	        this.state = 179;
	        this.expr();
	        this.state = 180;
	        this.match(RiScriptParser.MDLS);
	        this.state = 181;
	        this.url();
	        this.state = 182;
	        this.match(RiScriptParser.MDLE);
	        this.state = 186;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,25,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 183;
	                this.match(RiScriptParser.WS); 
	            }
	            this.state = 188;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,25,this._ctx);
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
	}



	url() {
	    let localctx = new UrlContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 26, RiScriptParser.RULE_url);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 190; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 189;
	            this.match(RiScriptParser.MDLT);
	            this.state = 192; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===RiScriptParser.MDLT);
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
	}



	op() {
	    let localctx = new OpContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, RiScriptParser.RULE_op);
	    var _la = 0; // Token type
	    try {
	        this.state = 196;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case RiScriptParser.OP:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 194;
	            this.match(RiScriptParser.OP);
	            break;
	        case RiScriptParser.GT:
	        case RiScriptParser.LT:
	        case RiScriptParser.EQ:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 195;
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
	}



	chars() {
	    let localctx = new CharsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 30, RiScriptParser.RULE_chars);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 199; 
	        this._errHandler.sync(this);
	        var _alt = 1;
	        do {
	        	switch (_alt) {
	        	case 1:
	        		this.state = 198;
	        		_la = this._input.LA(1);
	        		if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << RiScriptParser.FS) | (1 << RiScriptParser.AST) | (1 << RiScriptParser.DOL) | (1 << RiScriptParser.COM) | (1 << RiScriptParser.GT) | (1 << RiScriptParser.LT) | (1 << RiScriptParser.DOT) | (1 << RiScriptParser.WS) | (1 << RiScriptParser.ESC) | (1 << RiScriptParser.ENT) | (1 << RiScriptParser.INT) | (1 << RiScriptParser.CHR))) !== 0))) {
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
	        	this.state = 201; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,28, this._ctx);
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
	}


}

RiScriptParser.EOF = antlr4.Token.EOF;
RiScriptParser.LCOMM = 1;
RiScriptParser.BCOMM = 2;
RiScriptParser.LCBQ = 3;
RiScriptParser.MDLS = 4;
RiScriptParser.LP = 5;
RiScriptParser.RP = 6;
RiScriptParser.LB = 7;
RiScriptParser.RB = 8;
RiScriptParser.LCB = 9;
RiScriptParser.RCB = 10;
RiScriptParser.FS = 11;
RiScriptParser.AST = 12;
RiScriptParser.DOL = 13;
RiScriptParser.COM = 14;
RiScriptParser.GT = 15;
RiScriptParser.LT = 16;
RiScriptParser.DOT = 17;
RiScriptParser.WS = 18;
RiScriptParser.ESC = 19;
RiScriptParser.NL = 20;
RiScriptParser.DIDENT = 21;
RiScriptParser.DYN = 22;
RiScriptParser.SYM = 23;
RiScriptParser.OR = 24;
RiScriptParser.EQ = 25;
RiScriptParser.ENT = 26;
RiScriptParser.INT = 27;
RiScriptParser.OP = 28;
RiScriptParser.CHR = 29;
RiScriptParser.IDENT = 30;
RiScriptParser.CONT = 31;
RiScriptParser.MDLT = 32;
RiScriptParser.MDLE = 33;

RiScriptParser.RULE_script = 0;
RiScriptParser.RULE_line = 1;
RiScriptParser.RULE_expr = 2;
RiScriptParser.RULE_cexpr = 3;
RiScriptParser.RULE_cond = 4;
RiScriptParser.RULE_weight = 5;
RiScriptParser.RULE_assign = 6;
RiScriptParser.RULE_transform = 7;
RiScriptParser.RULE_dynamic = 8;
RiScriptParser.RULE_symbol = 9;
RiScriptParser.RULE_choice = 10;
RiScriptParser.RULE_wexpr = 11;
RiScriptParser.RULE_link = 12;
RiScriptParser.RULE_url = 13;
RiScriptParser.RULE_op = 14;
RiScriptParser.RULE_chars = 15;

class ScriptContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = RiScriptParser.RULE_script;
    }

	line = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(LineContext);
	    } else {
	        return this.getTypedRuleContext(LineContext,i);
	    }
	};

	EOF() {
	    return this.getToken(RiScriptParser.EOF, 0);
	};

	NL = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(RiScriptParser.NL);
	    } else {
	        return this.getToken(RiScriptParser.NL, i);
	    }
	};


	accept(visitor) {
	    if ( visitor instanceof RiScriptParserVisitor ) {
	        return visitor.visitScript(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class LineContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = RiScriptParser.RULE_line;
    }

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	cexpr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(CexprContext);
	    } else {
	        return this.getTypedRuleContext(CexprContext,i);
	    }
	};

	accept(visitor) {
	    if ( visitor instanceof RiScriptParserVisitor ) {
	        return visitor.visitLine(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ExprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = RiScriptParser.RULE_expr;
    }

	symbol = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(SymbolContext);
	    } else {
	        return this.getTypedRuleContext(SymbolContext,i);
	    }
	};

	choice = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ChoiceContext);
	    } else {
	        return this.getTypedRuleContext(ChoiceContext,i);
	    }
	};

	assign = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(AssignContext);
	    } else {
	        return this.getTypedRuleContext(AssignContext,i);
	    }
	};

	chars = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(CharsContext);
	    } else {
	        return this.getTypedRuleContext(CharsContext,i);
	    }
	};

	link = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(LinkContext);
	    } else {
	        return this.getTypedRuleContext(LinkContext,i);
	    }
	};

	accept(visitor) {
	    if ( visitor instanceof RiScriptParserVisitor ) {
	        return visitor.visitExpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class CexprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = RiScriptParser.RULE_cexpr;
    }

	LCB() {
	    return this.getToken(RiScriptParser.LCB, 0);
	};

	LCBQ() {
	    return this.getToken(RiScriptParser.LCBQ, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	WS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(RiScriptParser.WS);
	    } else {
	        return this.getToken(RiScriptParser.WS, i);
	    }
	};


	cond = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(CondContext);
	    } else {
	        return this.getTypedRuleContext(CondContext,i);
	    }
	};

	accept(visitor) {
	    if ( visitor instanceof RiScriptParserVisitor ) {
	        return visitor.visitCexpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class CondContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = RiScriptParser.RULE_cond;
    }

	symbol() {
	    return this.getTypedRuleContext(SymbolContext,0);
	};

	op() {
	    return this.getTypedRuleContext(OpContext,0);
	};

	chars() {
	    return this.getTypedRuleContext(CharsContext,0);
	};

	WS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(RiScriptParser.WS);
	    } else {
	        return this.getToken(RiScriptParser.WS, i);
	    }
	};


	COM() {
	    return this.getToken(RiScriptParser.COM, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof RiScriptParserVisitor ) {
	        return visitor.visitCond(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class WeightContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = RiScriptParser.RULE_weight;
    }

	LB() {
	    return this.getToken(RiScriptParser.LB, 0);
	};

	INT() {
	    return this.getToken(RiScriptParser.INT, 0);
	};

	RB() {
	    return this.getToken(RiScriptParser.RB, 0);
	};

	WS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(RiScriptParser.WS);
	    } else {
	        return this.getToken(RiScriptParser.WS, i);
	    }
	};


	accept(visitor) {
	    if ( visitor instanceof RiScriptParserVisitor ) {
	        return visitor.visitWeight(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class AssignContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = RiScriptParser.RULE_assign;
    }

	EQ() {
	    return this.getToken(RiScriptParser.EQ, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	dynamic() {
	    return this.getTypedRuleContext(DynamicContext,0);
	};

	symbol() {
	    return this.getTypedRuleContext(SymbolContext,0);
	};

	accept(visitor) {
	    if ( visitor instanceof RiScriptParserVisitor ) {
	        return visitor.visitAssign(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class TransformContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = RiScriptParser.RULE_transform;
    }

	DIDENT() {
	    return this.getToken(RiScriptParser.DIDENT, 0);
	};

	LP() {
	    return this.getToken(RiScriptParser.LP, 0);
	};

	RP() {
	    return this.getToken(RiScriptParser.RP, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	accept(visitor) {
	    if ( visitor instanceof RiScriptParserVisitor ) {
	        return visitor.visitTransform(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class DynamicContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = RiScriptParser.RULE_dynamic;
    }

	DYN() {
	    return this.getToken(RiScriptParser.DYN, 0);
	};

	transform = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(TransformContext);
	    } else {
	        return this.getTypedRuleContext(TransformContext,i);
	    }
	};

	accept(visitor) {
	    if ( visitor instanceof RiScriptParserVisitor ) {
	        return visitor.visitDynamic(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class SymbolContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = RiScriptParser.RULE_symbol;
    }

	SYM() {
	    return this.getToken(RiScriptParser.SYM, 0);
	};

	transform = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(TransformContext);
	    } else {
	        return this.getTypedRuleContext(TransformContext,i);
	    }
	};

	accept(visitor) {
	    if ( visitor instanceof RiScriptParserVisitor ) {
	        return visitor.visitSymbol(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ChoiceContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = RiScriptParser.RULE_choice;
    }

	LP() {
	    return this.getToken(RiScriptParser.LP, 0);
	};

	wexpr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(WexprContext);
	    } else {
	        return this.getTypedRuleContext(WexprContext,i);
	    }
	};

	RP() {
	    return this.getToken(RiScriptParser.RP, 0);
	};

	transform = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(TransformContext);
	    } else {
	        return this.getTypedRuleContext(TransformContext,i);
	    }
	};

	OR = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(RiScriptParser.OR);
	    } else {
	        return this.getToken(RiScriptParser.OR, i);
	    }
	};


	accept(visitor) {
	    if ( visitor instanceof RiScriptParserVisitor ) {
	        return visitor.visitChoice(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class WexprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = RiScriptParser.RULE_wexpr;
    }

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	weight() {
	    return this.getTypedRuleContext(WeightContext,0);
	};

	accept(visitor) {
	    if ( visitor instanceof RiScriptParserVisitor ) {
	        return visitor.visitWexpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class LinkContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = RiScriptParser.RULE_link;
    }

	LB() {
	    return this.getToken(RiScriptParser.LB, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	MDLS() {
	    return this.getToken(RiScriptParser.MDLS, 0);
	};

	url() {
	    return this.getTypedRuleContext(UrlContext,0);
	};

	MDLE() {
	    return this.getToken(RiScriptParser.MDLE, 0);
	};

	WS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(RiScriptParser.WS);
	    } else {
	        return this.getToken(RiScriptParser.WS, i);
	    }
	};


	accept(visitor) {
	    if ( visitor instanceof RiScriptParserVisitor ) {
	        return visitor.visitLink(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class UrlContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = RiScriptParser.RULE_url;
    }

	MDLT = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(RiScriptParser.MDLT);
	    } else {
	        return this.getToken(RiScriptParser.MDLT, i);
	    }
	};


	accept(visitor) {
	    if ( visitor instanceof RiScriptParserVisitor ) {
	        return visitor.visitUrl(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class OpContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = RiScriptParser.RULE_op;
    }

	OP() {
	    return this.getToken(RiScriptParser.OP, 0);
	};

	LT() {
	    return this.getToken(RiScriptParser.LT, 0);
	};

	GT() {
	    return this.getToken(RiScriptParser.GT, 0);
	};

	EQ() {
	    return this.getToken(RiScriptParser.EQ, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof RiScriptParserVisitor ) {
	        return visitor.visitOp(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class CharsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = RiScriptParser.RULE_chars;
    }

	CHR = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(RiScriptParser.CHR);
	    } else {
	        return this.getToken(RiScriptParser.CHR, i);
	    }
	};


	DOT = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(RiScriptParser.DOT);
	    } else {
	        return this.getToken(RiScriptParser.DOT, i);
	    }
	};


	AST = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(RiScriptParser.AST);
	    } else {
	        return this.getToken(RiScriptParser.AST, i);
	    }
	};


	FS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(RiScriptParser.FS);
	    } else {
	        return this.getToken(RiScriptParser.FS, i);
	    }
	};


	DOL = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(RiScriptParser.DOL);
	    } else {
	        return this.getToken(RiScriptParser.DOL, i);
	    }
	};


	WS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(RiScriptParser.WS);
	    } else {
	        return this.getToken(RiScriptParser.WS, i);
	    }
	};


	GT = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(RiScriptParser.GT);
	    } else {
	        return this.getToken(RiScriptParser.GT, i);
	    }
	};


	LT = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(RiScriptParser.LT);
	    } else {
	        return this.getToken(RiScriptParser.LT, i);
	    }
	};


	COM = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(RiScriptParser.COM);
	    } else {
	        return this.getToken(RiScriptParser.COM, i);
	    }
	};


	ESC = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(RiScriptParser.ESC);
	    } else {
	        return this.getToken(RiScriptParser.ESC, i);
	    }
	};


	ENT = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(RiScriptParser.ENT);
	    } else {
	        return this.getToken(RiScriptParser.ENT, i);
	    }
	};


	INT = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(RiScriptParser.INT);
	    } else {
	        return this.getToken(RiScriptParser.INT, i);
	    }
	};


	accept(visitor) {
	    if ( visitor instanceof RiScriptParserVisitor ) {
	        return visitor.visitChars(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}




RiScriptParser.ScriptContext = ScriptContext; 
RiScriptParser.LineContext = LineContext; 
RiScriptParser.ExprContext = ExprContext; 
RiScriptParser.CexprContext = CexprContext; 
RiScriptParser.CondContext = CondContext; 
RiScriptParser.WeightContext = WeightContext; 
RiScriptParser.AssignContext = AssignContext; 
RiScriptParser.TransformContext = TransformContext; 
RiScriptParser.DynamicContext = DynamicContext; 
RiScriptParser.SymbolContext = SymbolContext; 
RiScriptParser.ChoiceContext = ChoiceContext; 
RiScriptParser.WexprContext = WexprContext; 
RiScriptParser.LinkContext = LinkContext; 
RiScriptParser.UrlContext = UrlContext; 
RiScriptParser.OpContext = OpContext; 
RiScriptParser.CharsContext = CharsContext; 
