// Generated from /Users/dhowe/git/rita-script/grammar/RiScript.g4 by ANTLR 4.7.1
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class RiScriptLexer extends Lexer {
	static { RuntimeMetaData.checkVersion("4.7.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		GT=1, LT=2, LP=3, RP=4, LB=5, RB=6, LCB=7, RCB=8, DOT=9, WS=10, EXC=11, 
		AST=12, HAT=13, DOL=14, NL=15, SYM=16, OR=17, EQ=18, TF=19, ENT=20, INT=21, 
		OP=22, CHR=23;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	public static final String[] ruleNames = {
		"GT", "LT", "LP", "RP", "LB", "RB", "LCB", "RCB", "DOT", "WS", "EXC", 
		"AST", "HAT", "DOL", "NL", "SYM", "OR", "EQ", "TF", "ENT", "INT", "OP", 
		"CHR", "IDENT"
	};

	private static final String[] _LITERAL_NAMES = {
		null, "'>'", "'<'", "'('", "')'", "'['", "']'", "'{'", "'}'", "'.'", null, 
		"'!'", "'*'", "'^'", "'$'"
	};
	private static final String[] _SYMBOLIC_NAMES = {
		null, "GT", "LT", "LP", "RP", "LB", "RB", "LCB", "RCB", "DOT", "WS", "EXC", 
		"AST", "HAT", "DOL", "NL", "SYM", "OR", "EQ", "TF", "ENT", "INT", "OP", 
		"CHR"
	};
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}


	public RiScriptLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "RiScript.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public String[] getChannelNames() { return channelNames; }

	@Override
	public String[] getModeNames() { return modeNames; }

	@Override
	public ATN getATN() { return _ATN; }

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\31\u00a2\b\1\4\2"+
		"\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4"+
		"\13\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22"+
		"\t\22\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\4\31"+
		"\t\31\3\2\3\2\3\3\3\3\3\4\3\4\3\5\3\5\3\6\3\6\3\7\3\7\3\b\3\b\3\t\3\t"+
		"\3\n\3\n\3\13\3\13\3\f\3\f\3\r\3\r\3\16\3\16\3\17\3\17\3\20\5\20Q\n\20"+
		"\3\20\3\20\3\21\3\21\3\21\3\22\7\22Y\n\22\f\22\16\22\\\13\22\3\22\3\22"+
		"\7\22`\n\22\f\22\16\22c\13\22\3\23\7\23f\n\23\f\23\16\23i\13\23\3\23\3"+
		"\23\7\23m\n\23\f\23\16\23p\13\23\3\24\3\24\3\24\3\24\5\24v\n\24\6\24x"+
		"\n\24\r\24\16\24y\3\25\3\25\6\25~\n\25\r\25\16\25\177\3\25\3\25\3\26\7"+
		"\26\u0085\n\26\f\26\16\26\u0088\13\26\3\26\6\26\u008b\n\26\r\26\16\26"+
		"\u008c\3\26\7\26\u0090\n\26\f\26\16\26\u0093\13\26\3\27\3\27\3\30\6\30"+
		"\u0098\n\30\r\30\16\30\u0099\3\31\3\31\7\31\u009e\n\31\f\31\16\31\u00a1"+
		"\13\31\2\2\32\3\3\5\4\7\5\t\6\13\7\r\b\17\t\21\n\23\13\25\f\27\r\31\16"+
		"\33\17\35\20\37\21!\22#\23%\24\'\25)\26+\27-\30/\31\61\2\3\2\t\4\2\13"+
		"\13\"\"\6\2%%\62;C\\c|\3\2\62;\b\2##&&,,>>@@``\13\2\13\f\"#&&*,\60\60"+
		">@]]_`}\177\5\2C\\aac|\7\2//\62;C\\aac|\2\u00ad\2\3\3\2\2\2\2\5\3\2\2"+
		"\2\2\7\3\2\2\2\2\t\3\2\2\2\2\13\3\2\2\2\2\r\3\2\2\2\2\17\3\2\2\2\2\21"+
		"\3\2\2\2\2\23\3\2\2\2\2\25\3\2\2\2\2\27\3\2\2\2\2\31\3\2\2\2\2\33\3\2"+
		"\2\2\2\35\3\2\2\2\2\37\3\2\2\2\2!\3\2\2\2\2#\3\2\2\2\2%\3\2\2\2\2\'\3"+
		"\2\2\2\2)\3\2\2\2\2+\3\2\2\2\2-\3\2\2\2\2/\3\2\2\2\3\63\3\2\2\2\5\65\3"+
		"\2\2\2\7\67\3\2\2\2\t9\3\2\2\2\13;\3\2\2\2\r=\3\2\2\2\17?\3\2\2\2\21A"+
		"\3\2\2\2\23C\3\2\2\2\25E\3\2\2\2\27G\3\2\2\2\31I\3\2\2\2\33K\3\2\2\2\35"+
		"M\3\2\2\2\37P\3\2\2\2!T\3\2\2\2#Z\3\2\2\2%g\3\2\2\2\'w\3\2\2\2){\3\2\2"+
		"\2+\u0086\3\2\2\2-\u0094\3\2\2\2/\u0097\3\2\2\2\61\u009b\3\2\2\2\63\64"+
		"\7@\2\2\64\4\3\2\2\2\65\66\7>\2\2\66\6\3\2\2\2\678\7*\2\28\b\3\2\2\29"+
		":\7+\2\2:\n\3\2\2\2;<\7]\2\2<\f\3\2\2\2=>\7_\2\2>\16\3\2\2\2?@\7}\2\2"+
		"@\20\3\2\2\2AB\7\177\2\2B\22\3\2\2\2CD\7\60\2\2D\24\3\2\2\2EF\t\2\2\2"+
		"F\26\3\2\2\2GH\7#\2\2H\30\3\2\2\2IJ\7,\2\2J\32\3\2\2\2KL\7`\2\2L\34\3"+
		"\2\2\2MN\7&\2\2N\36\3\2\2\2OQ\7\17\2\2PO\3\2\2\2PQ\3\2\2\2QR\3\2\2\2R"+
		"S\7\f\2\2S \3\2\2\2TU\7&\2\2UV\5\61\31\2V\"\3\2\2\2WY\5\25\13\2XW\3\2"+
		"\2\2Y\\\3\2\2\2ZX\3\2\2\2Z[\3\2\2\2[]\3\2\2\2\\Z\3\2\2\2]a\7~\2\2^`\5"+
		"\25\13\2_^\3\2\2\2`c\3\2\2\2a_\3\2\2\2ab\3\2\2\2b$\3\2\2\2ca\3\2\2\2d"+
		"f\5\25\13\2ed\3\2\2\2fi\3\2\2\2ge\3\2\2\2gh\3\2\2\2hj\3\2\2\2ig\3\2\2"+
		"\2jn\7?\2\2km\5\25\13\2lk\3\2\2\2mp\3\2\2\2nl\3\2\2\2no\3\2\2\2o&\3\2"+
		"\2\2pn\3\2\2\2qr\7\60\2\2ru\5\61\31\2st\7*\2\2tv\7+\2\2us\3\2\2\2uv\3"+
		"\2\2\2vx\3\2\2\2wq\3\2\2\2xy\3\2\2\2yw\3\2\2\2yz\3\2\2\2z(\3\2\2\2{}\7"+
		"(\2\2|~\t\3\2\2}|\3\2\2\2~\177\3\2\2\2\177}\3\2\2\2\177\u0080\3\2\2\2"+
		"\u0080\u0081\3\2\2\2\u0081\u0082\7=\2\2\u0082*\3\2\2\2\u0083\u0085\5\25"+
		"\13\2\u0084\u0083\3\2\2\2\u0085\u0088\3\2\2\2\u0086\u0084\3\2\2\2\u0086"+
		"\u0087\3\2\2\2\u0087\u008a\3\2\2\2\u0088\u0086\3\2\2\2\u0089\u008b\t\4"+
		"\2\2\u008a\u0089\3\2\2\2\u008b\u008c\3\2\2\2\u008c\u008a\3\2\2\2\u008c"+
		"\u008d\3\2\2\2\u008d\u0091\3\2\2\2\u008e\u0090\5\25\13\2\u008f\u008e\3"+
		"\2\2\2\u0090\u0093\3\2\2\2\u0091\u008f\3\2\2\2\u0091\u0092\3\2\2\2\u0092"+
		",\3\2\2\2\u0093\u0091\3\2\2\2\u0094\u0095\t\5\2\2\u0095.\3\2\2\2\u0096"+
		"\u0098\n\6\2\2\u0097\u0096\3\2\2\2\u0098\u0099\3\2\2\2\u0099\u0097\3\2"+
		"\2\2\u0099\u009a\3\2\2\2\u009a\60\3\2\2\2\u009b\u009f\t\7\2\2\u009c\u009e"+
		"\t\b\2\2\u009d\u009c\3\2\2\2\u009e\u00a1\3\2\2\2\u009f\u009d\3\2\2\2\u009f"+
		"\u00a0\3\2\2\2\u00a0\62\3\2\2\2\u00a1\u009f\3\2\2\2\20\2PZagnuy\177\u0086"+
		"\u008c\u0091\u0099\u009f\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}