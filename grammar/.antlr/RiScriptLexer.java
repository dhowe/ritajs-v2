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
		EQ=12, TF=13, ENT=14, CHR=15;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	public static final String[] ruleNames = {
		"LP", "RP", "LB", "RB", "LCB", "RCB", "DOT", "WS", "NL", "SYM", "OR", 
		"EQ", "TF", "ENT", "CHR", "IDENT"
	};

	private static final String[] _LITERAL_NAMES = {
		null, "'('", "')'", "'['", "']'", "'{'", "'}'", "'.'"
	};
	private static final String[] _SYMBOLIC_NAMES = {
		null, "LP", "RP", "LB", "RB", "LCB", "RCB", "DOT", "WS", "NL", "SYM", 
		"OR", "EQ", "TF", "ENT", "CHR"
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
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\21|\b\1\4\2\t\2\4"+
		"\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13\t"+
		"\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\3\2\3\2\3"+
		"\3\3\3\3\4\3\4\3\5\3\5\3\6\3\6\3\7\3\7\3\b\3\b\3\t\6\t\63\n\t\r\t\16\t"+
		"\64\3\n\5\n8\n\n\3\n\3\n\3\13\3\13\3\13\3\13\3\13\3\13\3\13\5\13C\n\13"+
		"\3\f\7\fF\n\f\f\f\16\fI\13\f\3\f\3\f\7\fM\n\f\f\f\16\fP\13\f\3\r\7\rS"+
		"\n\r\f\r\16\rV\13\r\3\r\3\r\7\rZ\n\r\f\r\16\r]\13\r\3\16\3\16\3\16\3\16"+
		"\5\16c\n\16\6\16e\n\16\r\16\16\16f\3\17\3\17\6\17k\n\17\r\17\16\17l\3"+
		"\17\3\17\3\20\6\20r\n\20\r\20\16\20s\3\21\3\21\7\21x\n\21\f\21\16\21{"+
		"\13\21\2\2\22\3\3\5\4\7\5\t\6\13\7\r\b\17\t\21\n\23\13\25\f\27\r\31\16"+
		"\33\17\35\20\37\21!\2\3\2\7\4\2\13\13\"\"\6\2%%\62;C\\c|\13\2\13\f\"\""+
		"&&*+\60\60??]]__}\177\5\2C\\aac|\7\2//\62;C\\aac|\2\u0086\2\3\3\2\2\2"+
		"\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3\2\2\2\2\13\3\2\2\2\2\r\3\2\2\2\2\17\3\2"+
		"\2\2\2\21\3\2\2\2\2\23\3\2\2\2\2\25\3\2\2\2\2\27\3\2\2\2\2\31\3\2\2\2"+
		"\2\33\3\2\2\2\2\35\3\2\2\2\2\37\3\2\2\2\3#\3\2\2\2\5%\3\2\2\2\7\'\3\2"+
		"\2\2\t)\3\2\2\2\13+\3\2\2\2\r-\3\2\2\2\17/\3\2\2\2\21\62\3\2\2\2\23\67"+
		"\3\2\2\2\25B\3\2\2\2\27G\3\2\2\2\31T\3\2\2\2\33d\3\2\2\2\35h\3\2\2\2\37"+
		"q\3\2\2\2!u\3\2\2\2#$\7*\2\2$\4\3\2\2\2%&\7+\2\2&\6\3\2\2\2\'(\7]\2\2"+
		"(\b\3\2\2\2)*\7_\2\2*\n\3\2\2\2+,\7}\2\2,\f\3\2\2\2-.\7\177\2\2.\16\3"+
		"\2\2\2/\60\7\60\2\2\60\20\3\2\2\2\61\63\t\2\2\2\62\61\3\2\2\2\63\64\3"+
		"\2\2\2\64\62\3\2\2\2\64\65\3\2\2\2\65\22\3\2\2\2\668\7\17\2\2\67\66\3"+
		"\2\2\2\678\3\2\2\289\3\2\2\29:\7\f\2\2:\24\3\2\2\2;<\7&\2\2<C\5!\21\2"+
		"=>\7&\2\2>?\7}\2\2?@\5!\21\2@A\7\177\2\2AC\3\2\2\2B;\3\2\2\2B=\3\2\2\2"+
		"C\26\3\2\2\2DF\5\21\t\2ED\3\2\2\2FI\3\2\2\2GE\3\2\2\2GH\3\2\2\2HJ\3\2"+
		"\2\2IG\3\2\2\2JN\7~\2\2KM\5\21\t\2LK\3\2\2\2MP\3\2\2\2NL\3\2\2\2NO\3\2"+
		"\2\2O\30\3\2\2\2PN\3\2\2\2QS\5\21\t\2RQ\3\2\2\2SV\3\2\2\2TR\3\2\2\2TU"+
		"\3\2\2\2UW\3\2\2\2VT\3\2\2\2W[\7?\2\2XZ\5\21\t\2YX\3\2\2\2Z]\3\2\2\2["+
		"Y\3\2\2\2[\\\3\2\2\2\\\32\3\2\2\2][\3\2\2\2^_\7\60\2\2_b\5!\21\2`a\7*"+
		"\2\2ac\7+\2\2b`\3\2\2\2bc\3\2\2\2ce\3\2\2\2d^\3\2\2\2ef\3\2\2\2fd\3\2"+
		"\2\2fg\3\2\2\2g\34\3\2\2\2hj\7(\2\2ik\t\3\2\2ji\3\2\2\2kl\3\2\2\2lj\3"+
		"\2\2\2lm\3\2\2\2mn\3\2\2\2no\7=\2\2o\36\3\2\2\2pr\n\4\2\2qp\3\2\2\2rs"+
		"\3\2\2\2sq\3\2\2\2st\3\2\2\2t \3\2\2\2uy\t\5\2\2vx\t\6\2\2wv\3\2\2\2x"+
		"{\3\2\2\2yw\3\2\2\2yz\3\2\2\2z\"\3\2\2\2{y\3\2\2\2\17\2\64\67BGNT[bfl"+
		"sy\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}