// Generated from grammar/RiScriptParser.g4 by ANTLR 4.9.1
// jshint ignore: start
import antlr4 from 'antlr4';
import RiScriptParserVisitor from './RiScriptParserVisitor.js';


const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003#\u00d6\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010",
    "\u0004\u0011\t\u0011\u0003\u0002\u0003\u0002\u0003\u0002\u0007\u0002",
    "&\n\u0002\f\u0002\u000e\u0002)\u000b\u0002\u0003\u0002\u0003\u0002\u0003",
    "\u0003\u0003\u0003\u0007\u0003/\n\u0003\f\u0003\u000e\u00032\u000b\u0003",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0006\u0004",
    "9\n\u0004\r\u0004\u000e\u0004:\u0003\u0005\u0007\u0005>\n\u0005\f\u0005",
    "\u000e\u0005A\u000b\u0005\u0003\u0005\u0003\u0005\u0006\u0005E\n\u0005",
    "\r\u0005\u000e\u0005F\u0003\u0005\u0003\u0005\u0003\u0005\u0007\u0005",
    "L\n\u0005\f\u0005\u000e\u0005O\u000b\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0006\u0003\u0006\u0007\u0006U\n\u0006\f\u0006\u000e\u0006X\u000b\u0006",
    "\u0003\u0006\u0003\u0006\u0007\u0006\\\n\u0006\f\u0006\u000e\u0006_",
    "\u000b\u0006\u0003\u0006\u0003\u0006\u0007\u0006c\n\u0006\f\u0006\u000e",
    "\u0006f\u000b\u0006\u0003\u0006\u0005\u0006i\n\u0006\u0003\u0007\u0007",
    "\u0007l\n\u0007\f\u0007\u000e\u0007o\u000b\u0007\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0007\u0007u\n\u0007\f\u0007\u000e\u0007x\u000b",
    "\u0007\u0003\b\u0003\b\u0005\b|\n\b\u0003\b\u0003\b\u0003\b\u0003\t",
    "\u0003\t\u0003\t\u0005\t\u0084\n\t\u0003\t\u0005\t\u0087\n\t\u0003\n",
    "\u0003\n\u0007\n\u008b\n\n\f\n\u000e\n\u008e\u000b\n\u0003\u000b\u0003",
    "\u000b\u0007\u000b\u0092\n\u000b\f\u000b\u000e\u000b\u0095\u000b\u000b",
    "\u0003\u000b\u0006\u000b\u0098\n\u000b\r\u000b\u000e\u000b\u0099\u0005",
    "\u000b\u009c\n\u000b\u0003\f\u0003\f\u0003\f\u0003\f\u0007\f\u00a2\n",
    "\f\f\f\u000e\f\u00a5\u000b\f\u0003\f\u0003\f\u0003\f\u0003\f\u0007\f",
    "\u00ab\n\f\f\f\u000e\f\u00ae\u000b\f\u0003\r\u0005\r\u00b1\n\r\u0003",
    "\r\u0005\r\u00b4\n\r\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0007\u000e\u00bd\n\u000e\f\u000e",
    "\u000e\u000e\u00c0\u000b\u000e\u0003\u000e\u0007\u000e\u00c3\n\u000e",
    "\f\u000e\u000e\u000e\u00c6\u000b\u000e\u0003\u000f\u0006\u000f\u00c9",
    "\n\u000f\r\u000f\u000e\u000f\u00ca\u0003\u0010\u0003\u0010\u0005\u0010",
    "\u00cf\n\u0010\u0003\u0011\u0006\u0011\u00d2\n\u0011\r\u0011\u000e\u0011",
    "\u00d3\u0003\u0011\u0002\u0002\u0012\u0002\u0004\u0006\b\n\f\u000e\u0010",
    "\u0012\u0014\u0016\u0018\u001a\u001c\u001e \u0002\u0004\u0004\u0002",
    "\u0011\u0012\u001b\u001b\u0005\u0002\r\u0015\u001c\u001d\u001f\u001f",
    "\u0002\u00e6\u0002\"\u0003\u0002\u0002\u0002\u00040\u0003\u0002\u0002",
    "\u0002\u00068\u0003\u0002\u0002\u0002\b?\u0003\u0002\u0002\u0002\nR",
    "\u0003\u0002\u0002\u0002\fm\u0003\u0002\u0002\u0002\u000e{\u0003\u0002",
    "\u0002\u0002\u0010\u0080\u0003\u0002\u0002\u0002\u0012\u0088\u0003\u0002",
    "\u0002\u0002\u0014\u009b\u0003\u0002\u0002\u0002\u0016\u009d\u0003\u0002",
    "\u0002\u0002\u0018\u00b0\u0003\u0002\u0002\u0002\u001a\u00b5\u0003\u0002",
    "\u0002\u0002\u001c\u00c8\u0003\u0002\u0002\u0002\u001e\u00ce\u0003\u0002",
    "\u0002\u0002 \u00d1\u0003\u0002\u0002\u0002\"\'\u0005\u0004\u0003\u0002",
    "#$\u0007\u0016\u0002\u0002$&\u0005\u0004\u0003\u0002%#\u0003\u0002\u0002",
    "\u0002&)\u0003\u0002\u0002\u0002\'%\u0003\u0002\u0002\u0002\'(\u0003",
    "\u0002\u0002\u0002(*\u0003\u0002\u0002\u0002)\'\u0003\u0002\u0002\u0002",
    "*+\u0007\u0002\u0002\u0003+\u0003\u0003\u0002\u0002\u0002,/\u0005\u0006",
    "\u0004\u0002-/\u0005\b\u0005\u0002.,\u0003\u0002\u0002\u0002.-\u0003",
    "\u0002\u0002\u0002/2\u0003\u0002\u0002\u00020.\u0003\u0002\u0002\u0002",
    "01\u0003\u0002\u0002\u00021\u0005\u0003\u0002\u0002\u000220\u0003\u0002",
    "\u0002\u000239\u0005\u0014\u000b\u000249\u0005\u0016\f\u000259\u0005",
    "\u000e\b\u000269\u0005 \u0011\u000279\u0005\u001a\u000e\u000283\u0003",
    "\u0002\u0002\u000284\u0003\u0002\u0002\u000285\u0003\u0002\u0002\u0002",
    "86\u0003\u0002\u0002\u000287\u0003\u0002\u0002\u00029:\u0003\u0002\u0002",
    "\u0002:8\u0003\u0002\u0002\u0002:;\u0003\u0002\u0002\u0002;\u0007\u0003",
    "\u0002\u0002\u0002<>\u0007\u0014\u0002\u0002=<\u0003\u0002\u0002\u0002",
    ">A\u0003\u0002\u0002\u0002?=\u0003\u0002\u0002\u0002?@\u0003\u0002\u0002",
    "\u0002@B\u0003\u0002\u0002\u0002A?\u0003\u0002\u0002\u0002BD\u0007\u000b",
    "\u0002\u0002CE\u0005\n\u0006\u0002DC\u0003\u0002\u0002\u0002EF\u0003",
    "\u0002\u0002\u0002FD\u0003\u0002\u0002\u0002FG\u0003\u0002\u0002\u0002",
    "GH\u0003\u0002\u0002\u0002HI\u0007\f\u0002\u0002IM\u0007\u0005\u0002",
    "\u0002JL\u0007\u0014\u0002\u0002KJ\u0003\u0002\u0002\u0002LO\u0003\u0002",
    "\u0002\u0002MK\u0003\u0002\u0002\u0002MN\u0003\u0002\u0002\u0002NP\u0003",
    "\u0002\u0002\u0002OM\u0003\u0002\u0002\u0002PQ\u0005\u0006\u0004\u0002",
    "Q\t\u0003\u0002\u0002\u0002RV\u0005\u0014\u000b\u0002SU\u0007\u0014",
    "\u0002\u0002TS\u0003\u0002\u0002\u0002UX\u0003\u0002\u0002\u0002VT\u0003",
    "\u0002\u0002\u0002VW\u0003\u0002\u0002\u0002WY\u0003\u0002\u0002\u0002",
    "XV\u0003\u0002\u0002\u0002Y]\u0005\u001e\u0010\u0002Z\\\u0007\u0014",
    "\u0002\u0002[Z\u0003\u0002\u0002\u0002\\_\u0003\u0002\u0002\u0002][",
    "\u0003\u0002\u0002\u0002]^\u0003\u0002\u0002\u0002^`\u0003\u0002\u0002",
    "\u0002_]\u0003\u0002\u0002\u0002`d\u0005 \u0011\u0002ac\u0007\u0014",
    "\u0002\u0002ba\u0003\u0002\u0002\u0002cf\u0003\u0002\u0002\u0002db\u0003",
    "\u0002\u0002\u0002de\u0003\u0002\u0002\u0002eh\u0003\u0002\u0002\u0002",
    "fd\u0003\u0002\u0002\u0002gi\u0007\u0010\u0002\u0002hg\u0003\u0002\u0002",
    "\u0002hi\u0003\u0002\u0002\u0002i\u000b\u0003\u0002\u0002\u0002jl\u0007",
    "\u0014\u0002\u0002kj\u0003\u0002\u0002\u0002lo\u0003\u0002\u0002\u0002",
    "mk\u0003\u0002\u0002\u0002mn\u0003\u0002\u0002\u0002np\u0003\u0002\u0002",
    "\u0002om\u0003\u0002\u0002\u0002pq\u0007\t\u0002\u0002qr\u0007\u001d",
    "\u0002\u0002rv\u0007\n\u0002\u0002su\u0007\u0014\u0002\u0002ts\u0003",
    "\u0002\u0002\u0002ux\u0003\u0002\u0002\u0002vt\u0003\u0002\u0002\u0002",
    "vw\u0003\u0002\u0002\u0002w\r\u0003\u0002\u0002\u0002xv\u0003\u0002",
    "\u0002\u0002y|\u0005\u0012\n\u0002z|\u0005\u0014\u000b\u0002{y\u0003",
    "\u0002\u0002\u0002{z\u0003\u0002\u0002\u0002|}\u0003\u0002\u0002\u0002",
    "}~\u0007\u001b\u0002\u0002~\u007f\u0005\u0006\u0004\u0002\u007f\u000f",
    "\u0003\u0002\u0002\u0002\u0080\u0086\u0007\u0017\u0002\u0002\u0081\u0083",
    "\u0007\u0007\u0002\u0002\u0082\u0084\u0005\u0006\u0004\u0002\u0083\u0082",
    "\u0003\u0002\u0002\u0002\u0083\u0084\u0003\u0002\u0002\u0002\u0084\u0085",
    "\u0003\u0002\u0002\u0002\u0085\u0087\u0007\b\u0002\u0002\u0086\u0081",
    "\u0003\u0002\u0002\u0002\u0086\u0087\u0003\u0002\u0002\u0002\u0087\u0011",
    "\u0003\u0002\u0002\u0002\u0088\u008c\u0007\u0018\u0002\u0002\u0089\u008b",
    "\u0005\u0010\t\u0002\u008a\u0089\u0003\u0002\u0002\u0002\u008b\u008e",
    "\u0003\u0002\u0002\u0002\u008c\u008a\u0003\u0002\u0002\u0002\u008c\u008d",
    "\u0003\u0002\u0002\u0002\u008d\u0013\u0003\u0002\u0002\u0002\u008e\u008c",
    "\u0003\u0002\u0002\u0002\u008f\u0093\u0007\u0019\u0002\u0002\u0090\u0092",
    "\u0005\u0010\t\u0002\u0091\u0090\u0003\u0002\u0002\u0002\u0092\u0095",
    "\u0003\u0002\u0002\u0002\u0093\u0091\u0003\u0002\u0002\u0002\u0093\u0094",
    "\u0003\u0002\u0002\u0002\u0094\u009c\u0003\u0002\u0002\u0002\u0095\u0093",
    "\u0003\u0002\u0002\u0002\u0096\u0098\u0005\u0010\t\u0002\u0097\u0096",
    "\u0003\u0002\u0002\u0002\u0098\u0099\u0003\u0002\u0002\u0002\u0099\u0097",
    "\u0003\u0002\u0002\u0002\u0099\u009a\u0003\u0002\u0002\u0002\u009a\u009c",
    "\u0003\u0002\u0002\u0002\u009b\u008f\u0003\u0002\u0002\u0002\u009b\u0097",
    "\u0003\u0002\u0002\u0002\u009c\u0015\u0003\u0002\u0002\u0002\u009d\u00a3",
    "\u0007\u0007\u0002\u0002\u009e\u009f\u0005\u0018\r\u0002\u009f\u00a0",
    "\u0007\u001a\u0002\u0002\u00a0\u00a2\u0003\u0002\u0002\u0002\u00a1\u009e",
    "\u0003\u0002\u0002\u0002\u00a2\u00a5\u0003\u0002\u0002\u0002\u00a3\u00a1",
    "\u0003\u0002\u0002\u0002\u00a3\u00a4\u0003\u0002\u0002\u0002\u00a4\u00a6",
    "\u0003\u0002\u0002\u0002\u00a5\u00a3\u0003\u0002\u0002\u0002\u00a6\u00a7",
    "\u0005\u0018\r\u0002\u00a7\u00a8\u0007\b\u0002\u0002\u00a8\u00ac\u0003",
    "\u0002\u0002\u0002\u00a9\u00ab\u0005\u0010\t\u0002\u00aa\u00a9\u0003",
    "\u0002\u0002\u0002\u00ab\u00ae\u0003\u0002\u0002\u0002\u00ac\u00aa\u0003",
    "\u0002\u0002\u0002\u00ac\u00ad\u0003\u0002\u0002\u0002\u00ad\u0017\u0003",
    "\u0002\u0002\u0002\u00ae\u00ac\u0003\u0002\u0002\u0002\u00af\u00b1\u0005",
    "\u0006\u0004\u0002\u00b0\u00af\u0003\u0002\u0002\u0002\u00b0\u00b1\u0003",
    "\u0002\u0002\u0002\u00b1\u00b3\u0003\u0002\u0002\u0002\u00b2\u00b4\u0005",
    "\f\u0007\u0002\u00b3\u00b2\u0003\u0002\u0002\u0002\u00b3\u00b4\u0003",
    "\u0002\u0002\u0002\u00b4\u0019\u0003\u0002\u0002\u0002\u00b5\u00b6\u0007",
    "\t\u0002\u0002\u00b6\u00b7\u0005\u0006\u0004\u0002\u00b7\u00b8\u0007",
    "\n\u0002\u0002\u00b8\u00b9\u0007\u0006\u0002\u0002\u00b9\u00ba\u0005",
    "\u001c\u000f\u0002\u00ba\u00be\u0007#\u0002\u0002\u00bb\u00bd\u0007",
    "\u0014\u0002\u0002\u00bc\u00bb\u0003\u0002\u0002\u0002\u00bd\u00c0\u0003",
    "\u0002\u0002\u0002\u00be\u00bc\u0003\u0002\u0002\u0002\u00be\u00bf\u0003",
    "\u0002\u0002\u0002\u00bf\u00c4\u0003\u0002\u0002\u0002\u00c0\u00be\u0003",
    "\u0002\u0002\u0002\u00c1\u00c3\u0005\u0010\t\u0002\u00c2\u00c1\u0003",
    "\u0002\u0002\u0002\u00c3\u00c6\u0003\u0002\u0002\u0002\u00c4\u00c2\u0003",
    "\u0002\u0002\u0002\u00c4\u00c5\u0003\u0002\u0002\u0002\u00c5\u001b\u0003",
    "\u0002\u0002\u0002\u00c6\u00c4\u0003\u0002\u0002\u0002\u00c7\u00c9\u0007",
    "\"\u0002\u0002\u00c8\u00c7\u0003\u0002\u0002\u0002\u00c9\u00ca\u0003",
    "\u0002\u0002\u0002\u00ca\u00c8\u0003\u0002\u0002\u0002\u00ca\u00cb\u0003",
    "\u0002\u0002\u0002\u00cb\u001d\u0003\u0002\u0002\u0002\u00cc\u00cf\u0007",
    "\u001e\u0002\u0002\u00cd\u00cf\t\u0002\u0002\u0002\u00ce\u00cc\u0003",
    "\u0002\u0002\u0002\u00ce\u00cd\u0003\u0002\u0002\u0002\u00cf\u001f\u0003",
    "\u0002\u0002\u0002\u00d0\u00d2\t\u0003\u0002\u0002\u00d1\u00d0\u0003",
    "\u0002\u0002\u0002\u00d2\u00d3\u0003\u0002\u0002\u0002\u00d3\u00d1\u0003",
    "\u0002\u0002\u0002\u00d3\u00d4\u0003\u0002\u0002\u0002\u00d4!\u0003",
    "\u0002\u0002\u0002 \'.08:?FMV]dhmv{\u0083\u0086\u008c\u0093\u0099\u009b",
    "\u00a3\u00ac\u00b0\u00b3\u00be\u00c4\u00ca\u00ce\u00d3"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class RiScriptParser extends antlr4.Parser {

    static grammarFileName = "RiScriptParser.g4";
    static literalNames = [ null, null, null, null, null, "'('", null, "'['", 
                            "']'", "'{'", "'}'", "'/'", "'*'", "'$'", "','", 
                            "'>'", "'<'", "'.'" ];
    static symbolicNames = [ null, "LCOMM", "BCOMM", "Q", "MDS", "LP", "RP", 
                             "LB", "RB", "LCB", "RCB", "FS", "AST", "DOL", 
                             "COM", "GT", "LT", "DOT", "WS", "ESC", "NL", 
                             "DIDENT", "DYN", "SYM", "OR", "EQ", "ENT", 
                             "INT", "OP", "CHR", "IDENT", "CONT", "MDT", 
                             "MDE" ];
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
	        this.match(RiScriptParser.RCB);
	        this.state = 71;
	        this.match(RiScriptParser.Q);
	        this.state = 75;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,7,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 72;
	                this.match(RiScriptParser.WS); 
	            }
	            this.state = 77;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,7,this._ctx);
	        }

	        this.state = 78;
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
	        this.state = 80;
	        this.symbol();
	        this.state = 84;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===RiScriptParser.WS) {
	            this.state = 81;
	            this.match(RiScriptParser.WS);
	            this.state = 86;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 87;
	        this.op();
	        this.state = 91;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,9,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 88;
	                this.match(RiScriptParser.WS); 
	            }
	            this.state = 93;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,9,this._ctx);
	        }

	        this.state = 94;
	        this.chars();
	        this.state = 98;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===RiScriptParser.WS) {
	            this.state = 95;
	            this.match(RiScriptParser.WS);
	            this.state = 100;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 102;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===RiScriptParser.COM) {
	            this.state = 101;
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
	        this.state = 107;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===RiScriptParser.WS) {
	            this.state = 104;
	            this.match(RiScriptParser.WS);
	            this.state = 109;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 110;
	        this.match(RiScriptParser.LB);
	        this.state = 111;
	        this.match(RiScriptParser.INT);
	        this.state = 112;
	        this.match(RiScriptParser.RB);
	        this.state = 116;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===RiScriptParser.WS) {
	            this.state = 113;
	            this.match(RiScriptParser.WS);
	            this.state = 118;
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
	        this.state = 121;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case RiScriptParser.DYN:
	            this.state = 119;
	            this.dynamic();
	            break;
	        case RiScriptParser.DIDENT:
	        case RiScriptParser.SYM:
	            this.state = 120;
	            this.symbol();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 123;
	        this.match(RiScriptParser.EQ);
	        this.state = 124;
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
	        this.state = 126;
	        this.match(RiScriptParser.DIDENT);
	        this.state = 132;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,16,this._ctx);
	        if(la_===1) {
	            this.state = 127;
	            this.match(RiScriptParser.LP);
	            this.state = 129;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << RiScriptParser.LP) | (1 << RiScriptParser.LB) | (1 << RiScriptParser.FS) | (1 << RiScriptParser.AST) | (1 << RiScriptParser.DOL) | (1 << RiScriptParser.COM) | (1 << RiScriptParser.GT) | (1 << RiScriptParser.LT) | (1 << RiScriptParser.DOT) | (1 << RiScriptParser.WS) | (1 << RiScriptParser.ESC) | (1 << RiScriptParser.DIDENT) | (1 << RiScriptParser.DYN) | (1 << RiScriptParser.SYM) | (1 << RiScriptParser.ENT) | (1 << RiScriptParser.INT) | (1 << RiScriptParser.CHR))) !== 0)) {
	                this.state = 128;
	                this.expr();
	            }

	            this.state = 131;
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
	        this.state = 134;
	        this.match(RiScriptParser.DYN);
	        this.state = 138;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===RiScriptParser.DIDENT) {
	            this.state = 135;
	            this.transform();
	            this.state = 140;
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
	        this.state = 153;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case RiScriptParser.SYM:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 141;
	            this.match(RiScriptParser.SYM);
	            this.state = 145;
	            this._errHandler.sync(this);
	            var _alt = this._interp.adaptivePredict(this._input,18,this._ctx)
	            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	                if(_alt===1) {
	                    this.state = 142;
	                    this.transform(); 
	                }
	                this.state = 147;
	                this._errHandler.sync(this);
	                _alt = this._interp.adaptivePredict(this._input,18,this._ctx);
	            }

	            break;
	        case RiScriptParser.DIDENT:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 149; 
	            this._errHandler.sync(this);
	            var _alt = 1;
	            do {
	            	switch (_alt) {
	            	case 1:
	            		this.state = 148;
	            		this.transform();
	            		break;
	            	default:
	            		throw new antlr4.error.NoViableAltException(this);
	            	}
	            	this.state = 151; 
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
	        this.state = 155;
	        this.match(RiScriptParser.LP);
	        this.state = 161;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,21,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 156;
	                this.wexpr();
	                this.state = 157;
	                this.match(RiScriptParser.OR); 
	            }
	            this.state = 163;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,21,this._ctx);
	        }

	        this.state = 164;
	        this.wexpr();
	        this.state = 165;
	        this.match(RiScriptParser.RP);
	        this.state = 170;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,22,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 167;
	                this.transform(); 
	            }
	            this.state = 172;
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
	        this.state = 174;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,23,this._ctx);
	        if(la_===1) {
	            this.state = 173;
	            this.expr();

	        }
	        this.state = 177;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===RiScriptParser.LB || _la===RiScriptParser.WS) {
	            this.state = 176;
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
	        this.state = 179;
	        this.match(RiScriptParser.LB);
	        this.state = 180;
	        this.expr();
	        this.state = 181;
	        this.match(RiScriptParser.RB);
	        this.state = 182;
	        this.match(RiScriptParser.MDS);
	        this.state = 183;
	        this.url();
	        this.state = 184;
	        this.match(RiScriptParser.MDE);
	        this.state = 188;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,25,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 185;
	                this.match(RiScriptParser.WS); 
	            }
	            this.state = 190;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,25,this._ctx);
	        }

	        this.state = 194;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,26,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 191;
	                this.transform(); 
	            }
	            this.state = 196;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,26,this._ctx);
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
	        this.state = 198; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 197;
	            this.match(RiScriptParser.MDT);
	            this.state = 200; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===RiScriptParser.MDT);
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
	        this.state = 204;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case RiScriptParser.OP:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 202;
	            this.match(RiScriptParser.OP);
	            break;
	        case RiScriptParser.GT:
	        case RiScriptParser.LT:
	        case RiScriptParser.EQ:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 203;
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
	        this.state = 207; 
	        this._errHandler.sync(this);
	        var _alt = 1;
	        do {
	        	switch (_alt) {
	        	case 1:
	        		this.state = 206;
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
	        	this.state = 209; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,29, this._ctx);
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
RiScriptParser.Q = 3;
RiScriptParser.MDS = 4;
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
RiScriptParser.MDT = 32;
RiScriptParser.MDE = 33;

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

	RCB() {
	    return this.getToken(RiScriptParser.RCB, 0);
	};

	Q() {
	    return this.getToken(RiScriptParser.Q, 0);
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

	RB() {
	    return this.getToken(RiScriptParser.RB, 0);
	};

	MDS() {
	    return this.getToken(RiScriptParser.MDS, 0);
	};

	url() {
	    return this.getTypedRuleContext(UrlContext,0);
	};

	MDE() {
	    return this.getToken(RiScriptParser.MDE, 0);
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

	MDT = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(RiScriptParser.MDT);
	    } else {
	        return this.getToken(RiScriptParser.MDT, i);
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
