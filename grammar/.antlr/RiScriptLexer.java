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
		LP=1, RP=2, LB=3, RB=4, LCB=5, RCB=6, DOT=7, WS=8, NL=9, SYM=10, OR=11, 
		EQ=12, TF=13, ENT=14, NUM=15, CHR=16;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	public static final String[] ruleNames = {
		"LP", "RP", "LB", "RB", "LCB", "RCB", "DOT", "WS", "NL", "SYM", "OR", 
		"EQ", "TF", "ENT", "NUM", "CHR", "IDENT"
	};

	private static final String[] _LITERAL_NAMES = {
		null, "'('", "')'", "'['", "']'", "'{'", "'}'", "'.'"
	};
	private static final String[] _SYMBOLIC_NAMES = {
		null, "LP", "RP", "LB", "RB", "LCB", "RCB", "DOT", "WS", "NL", "SYM", 
		"OR", "EQ", "TF", "ENT", "NUM", "CHR"
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
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\22\u0091\b\1\4\2"+
		"\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4"+
		"\13\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22"+
		"\t\22\3\2\3\2\3\3\3\3\3\4\3\4\3\5\3\5\3\6\3\6\3\7\3\7\3\b\3\b\3\t\6\t"+
		"\65\n\t\r\t\16\t\66\3\n\5\n:\n\n\3\n\3\n\3\13\3\13\3\13\3\13\3\13\3\13"+
		"\3\13\5\13E\n\13\3\f\7\fH\n\f\f\f\16\fK\13\f\3\f\3\f\7\fO\n\f\f\f\16\f"+
		"R\13\f\3\r\7\rU\n\r\f\r\16\rX\13\r\3\r\3\r\7\r\\\n\r\f\r\16\r_\13\r\3"+
		"\16\3\16\3\16\3\16\5\16e\n\16\6\16g\n\16\r\16\16\16h\3\17\3\17\6\17m\n"+
		"\17\r\17\16\17n\3\17\3\17\3\20\6\20t\n\20\r\20\16\20u\3\20\7\20y\n\20"+
		"\f\20\16\20|\13\20\3\20\3\20\6\20\u0080\n\20\r\20\16\20\u0081\5\20\u0084"+
		"\n\20\3\21\6\21\u0087\n\21\r\21\16\21\u0088\3\22\3\22\7\22\u008d\n\22"+
		"\f\22\16\22\u0090\13\22\2\2\23\3\3\5\4\7\5\t\6\13\7\r\b\17\t\21\n\23\13"+
		"\25\f\27\r\31\16\33\17\35\20\37\21!\22#\2\3\2\b\4\2\13\13\"\"\6\2%%\62"+
		";C\\c|\3\2\62;\13\2\13\f\"\"&&*+\60\60??]]__}\177\5\2C\\aac|\7\2//\62"+
		";C\\aac|\2\u009f\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3\2\2\2\2\13"+
		"\3\2\2\2\2\r\3\2\2\2\2\17\3\2\2\2\2\21\3\2\2\2\2\23\3\2\2\2\2\25\3\2\2"+
		"\2\2\27\3\2\2\2\2\31\3\2\2\2\2\33\3\2\2\2\2\35\3\2\2\2\2\37\3\2\2\2\2"+
		"!\3\2\2\2\3%\3\2\2\2\5\'\3\2\2\2\7)\3\2\2\2\t+\3\2\2\2\13-\3\2\2\2\r/"+
		"\3\2\2\2\17\61\3\2\2\2\21\64\3\2\2\2\239\3\2\2\2\25D\3\2\2\2\27I\3\2\2"+
		"\2\31V\3\2\2\2\33f\3\2\2\2\35j\3\2\2\2\37\u0083\3\2\2\2!\u0086\3\2\2\2"+
		"#\u008a\3\2\2\2%&\7*\2\2&\4\3\2\2\2\'(\7+\2\2(\6\3\2\2\2)*\7]\2\2*\b\3"+
		"\2\2\2+,\7_\2\2,\n\3\2\2\2-.\7}\2\2.\f\3\2\2\2/\60\7\177\2\2\60\16\3\2"+
		"\2\2\61\62\7\60\2\2\62\20\3\2\2\2\63\65\t\2\2\2\64\63\3\2\2\2\65\66\3"+
		"\2\2\2\66\64\3\2\2\2\66\67\3\2\2\2\67\22\3\2\2\28:\7\17\2\298\3\2\2\2"+
		"9:\3\2\2\2:;\3\2\2\2;<\7\f\2\2<\24\3\2\2\2=>\7&\2\2>E\5#\22\2?@\7&\2\2"+
		"@A\7}\2\2AB\5#\22\2BC\7\177\2\2CE\3\2\2\2D=\3\2\2\2D?\3\2\2\2E\26\3\2"+
		"\2\2FH\5\21\t\2GF\3\2\2\2HK\3\2\2\2IG\3\2\2\2IJ\3\2\2\2JL\3\2\2\2KI\3"+
		"\2\2\2LP\7~\2\2MO\5\21\t\2NM\3\2\2\2OR\3\2\2\2PN\3\2\2\2PQ\3\2\2\2Q\30"+
		"\3\2\2\2RP\3\2\2\2SU\5\21\t\2TS\3\2\2\2UX\3\2\2\2VT\3\2\2\2VW\3\2\2\2"+
		"WY\3\2\2\2XV\3\2\2\2Y]\7?\2\2Z\\\5\21\t\2[Z\3\2\2\2\\_\3\2\2\2][\3\2\2"+
		"\2]^\3\2\2\2^\32\3\2\2\2_]\3\2\2\2`a\7\60\2\2ad\5#\22\2bc\7*\2\2ce\7+"+
		"\2\2db\3\2\2\2de\3\2\2\2eg\3\2\2\2f`\3\2\2\2gh\3\2\2\2hf\3\2\2\2hi\3\2"+
		"\2\2i\34\3\2\2\2jl\7(\2\2km\t\3\2\2lk\3\2\2\2mn\3\2\2\2nl\3\2\2\2no\3"+
		"\2\2\2op\3\2\2\2pq\7=\2\2q\36\3\2\2\2rt\t\4\2\2sr\3\2\2\2tu\3\2\2\2us"+
		"\3\2\2\2uv\3\2\2\2v\u0084\3\2\2\2wy\t\4\2\2xw\3\2\2\2y|\3\2\2\2zx\3\2"+
		"\2\2z{\3\2\2\2{}\3\2\2\2|z\3\2\2\2}\177\7\60\2\2~\u0080\t\4\2\2\177~\3"+
		"\2\2\2\u0080\u0081\3\2\2\2\u0081\177\3\2\2\2\u0081\u0082\3\2\2\2\u0082"+
		"\u0084\3\2\2\2\u0083s\3\2\2\2\u0083z\3\2\2\2\u0084 \3\2\2\2\u0085\u0087"+
		"\n\5\2\2\u0086\u0085\3\2\2\2\u0087\u0088\3\2\2\2\u0088\u0086\3\2\2\2\u0088"+
		"\u0089\3\2\2\2\u0089\"\3\2\2\2\u008a\u008e\t\6\2\2\u008b\u008d\t\7\2\2"+
		"\u008c\u008b\3\2\2\2\u008d\u0090\3\2\2\2\u008e\u008c\3\2\2\2\u008e\u008f"+
		"\3\2\2\2\u008f$\3\2\2\2\u0090\u008e\3\2\2\2\23\2\669DIPV]dhnuz\u0081\u0083"+
		"\u0088\u008e\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}