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
		AST=12, HAT=13, DOL=14, COM=15, NL=16, SYM=17, OR=18, EQ=19, TF=20, ENT=21, 
		INT=22, OP=23, CHR=24;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	public static final String[] ruleNames = {
		"GT", "LT", "LP", "RP", "LB", "RB", "LCB", "RCB", "DOT", "WS", "EXC", 
		"AST", "HAT", "DOL", "COM", "NL", "SYM", "OR", "EQ", "TF", "ENT", "INT", 
		"OP", "CHR", "IDENT"
	};

	private static final String[] _LITERAL_NAMES = {
		null, "'>'", "'<'", "'('", "')'", "'['", "']'", "'{'", "'}'", "'.'", null, 
		"'!'", "'*'", "'^'", "'$'", "','"
	};
	private static final String[] _SYMBOLIC_NAMES = {
		null, "GT", "LT", "LP", "RP", "LB", "RB", "LCB", "RCB", "DOT", "WS", "EXC", 
		"AST", "HAT", "DOL", "COM", "NL", "SYM", "OR", "EQ", "TF", "ENT", "INT", 
		"OP", "CHR"
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
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\32\u00a7\b\1\4\2"+
		"\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4"+
		"\13\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22"+
		"\t\22\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\4\31"+
		"\t\31\4\32\t\32\3\2\3\2\3\3\3\3\3\4\3\4\3\5\3\5\3\6\3\6\3\7\3\7\3\b\3"+
		"\b\3\t\3\t\3\n\3\n\3\13\3\13\3\f\3\f\3\r\3\r\3\16\3\16\3\17\3\17\3\20"+
		"\3\20\3\21\5\21U\n\21\3\21\3\21\3\22\3\22\3\22\3\23\7\23]\n\23\f\23\16"+
		"\23`\13\23\3\23\3\23\7\23d\n\23\f\23\16\23g\13\23\3\24\7\24j\n\24\f\24"+
		"\16\24m\13\24\3\24\3\24\7\24q\n\24\f\24\16\24t\13\24\3\25\3\25\3\25\3"+
		"\25\5\25z\n\25\6\25|\n\25\r\25\16\25}\3\26\3\26\6\26\u0082\n\26\r\26\16"+
		"\26\u0083\3\26\3\26\3\27\7\27\u0089\n\27\f\27\16\27\u008c\13\27\3\27\6"+
		"\27\u008f\n\27\r\27\16\27\u0090\3\27\7\27\u0094\n\27\f\27\16\27\u0097"+
		"\13\27\3\30\3\30\3\30\3\31\6\31\u009d\n\31\r\31\16\31\u009e\3\32\3\32"+
		"\7\32\u00a3\n\32\f\32\16\32\u00a6\13\32\2\2\33\3\3\5\4\7\5\t\6\13\7\r"+
		"\b\17\t\21\n\23\13\25\f\27\r\31\16\33\17\35\20\37\21!\22#\23%\24\'\25"+
		")\26+\27-\30/\31\61\32\63\2\3\2\t\4\2\13\13\"\"\6\2%%\62;C\\c|\3\2\62"+
		";\b\2##&&,,>>@@``\13\2\13\f\"#&&*,\60\60>@]]_`}\177\5\2C\\aac|\7\2//\62"+
		";C\\aac|\2\u00b2\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3\2\2\2\2\13"+
		"\3\2\2\2\2\r\3\2\2\2\2\17\3\2\2\2\2\21\3\2\2\2\2\23\3\2\2\2\2\25\3\2\2"+
		"\2\2\27\3\2\2\2\2\31\3\2\2\2\2\33\3\2\2\2\2\35\3\2\2\2\2\37\3\2\2\2\2"+
		"!\3\2\2\2\2#\3\2\2\2\2%\3\2\2\2\2\'\3\2\2\2\2)\3\2\2\2\2+\3\2\2\2\2-\3"+
		"\2\2\2\2/\3\2\2\2\2\61\3\2\2\2\3\65\3\2\2\2\5\67\3\2\2\2\79\3\2\2\2\t"+
		";\3\2\2\2\13=\3\2\2\2\r?\3\2\2\2\17A\3\2\2\2\21C\3\2\2\2\23E\3\2\2\2\25"+
		"G\3\2\2\2\27I\3\2\2\2\31K\3\2\2\2\33M\3\2\2\2\35O\3\2\2\2\37Q\3\2\2\2"+
		"!T\3\2\2\2#X\3\2\2\2%^\3\2\2\2\'k\3\2\2\2){\3\2\2\2+\177\3\2\2\2-\u008a"+
		"\3\2\2\2/\u0098\3\2\2\2\61\u009c\3\2\2\2\63\u00a0\3\2\2\2\65\66\7@\2\2"+
		"\66\4\3\2\2\2\678\7>\2\28\6\3\2\2\29:\7*\2\2:\b\3\2\2\2;<\7+\2\2<\n\3"+
		"\2\2\2=>\7]\2\2>\f\3\2\2\2?@\7_\2\2@\16\3\2\2\2AB\7}\2\2B\20\3\2\2\2C"+
		"D\7\177\2\2D\22\3\2\2\2EF\7\60\2\2F\24\3\2\2\2GH\t\2\2\2H\26\3\2\2\2I"+
		"J\7#\2\2J\30\3\2\2\2KL\7,\2\2L\32\3\2\2\2MN\7`\2\2N\34\3\2\2\2OP\7&\2"+
		"\2P\36\3\2\2\2QR\7.\2\2R \3\2\2\2SU\7\17\2\2TS\3\2\2\2TU\3\2\2\2UV\3\2"+
		"\2\2VW\7\f\2\2W\"\3\2\2\2XY\7&\2\2YZ\5\63\32\2Z$\3\2\2\2[]\5\25\13\2\\"+
		"[\3\2\2\2]`\3\2\2\2^\\\3\2\2\2^_\3\2\2\2_a\3\2\2\2`^\3\2\2\2ae\7~\2\2"+
		"bd\5\25\13\2cb\3\2\2\2dg\3\2\2\2ec\3\2\2\2ef\3\2\2\2f&\3\2\2\2ge\3\2\2"+
		"\2hj\5\25\13\2ih\3\2\2\2jm\3\2\2\2ki\3\2\2\2kl\3\2\2\2ln\3\2\2\2mk\3\2"+
		"\2\2nr\7?\2\2oq\5\25\13\2po\3\2\2\2qt\3\2\2\2rp\3\2\2\2rs\3\2\2\2s(\3"+
		"\2\2\2tr\3\2\2\2uv\7\60\2\2vy\5\63\32\2wx\7*\2\2xz\7+\2\2yw\3\2\2\2yz"+
		"\3\2\2\2z|\3\2\2\2{u\3\2\2\2|}\3\2\2\2}{\3\2\2\2}~\3\2\2\2~*\3\2\2\2\177"+
		"\u0081\7(\2\2\u0080\u0082\t\3\2\2\u0081\u0080\3\2\2\2\u0082\u0083\3\2"+
		"\2\2\u0083\u0081\3\2\2\2\u0083\u0084\3\2\2\2\u0084\u0085\3\2\2\2\u0085"+
		"\u0086\7=\2\2\u0086,\3\2\2\2\u0087\u0089\5\25\13\2\u0088\u0087\3\2\2\2"+
		"\u0089\u008c\3\2\2\2\u008a\u0088\3\2\2\2\u008a\u008b\3\2\2\2\u008b\u008e"+
		"\3\2\2\2\u008c\u008a\3\2\2\2\u008d\u008f\t\4\2\2\u008e\u008d\3\2\2\2\u008f"+
		"\u0090\3\2\2\2\u0090\u008e\3\2\2\2\u0090\u0091\3\2\2\2\u0091\u0095\3\2"+
		"\2\2\u0092\u0094\5\25\13\2\u0093\u0092\3\2\2\2\u0094\u0097\3\2\2\2\u0095"+
		"\u0093\3\2\2\2\u0095\u0096\3\2\2\2\u0096.\3\2\2\2\u0097\u0095\3\2\2\2"+
		"\u0098\u0099\t\5\2\2\u0099\u009a\7?\2\2\u009a\60\3\2\2\2\u009b\u009d\n"+
		"\6\2\2\u009c\u009b\3\2\2\2\u009d\u009e\3\2\2\2\u009e\u009c\3\2\2\2\u009e"+
		"\u009f\3\2\2\2\u009f\62\3\2\2\2\u00a0\u00a4\t\7\2\2\u00a1\u00a3\t\b\2"+
		"\2\u00a2\u00a1\3\2\2\2\u00a3\u00a6\3\2\2\2\u00a4\u00a2\3\2\2\2\u00a4\u00a5"+
		"\3\2\2\2\u00a5\64\3\2\2\2\u00a6\u00a4\3\2\2\2\20\2T^ekry}\u0083\u008a"+
		"\u0090\u0095\u009e\u00a4\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}