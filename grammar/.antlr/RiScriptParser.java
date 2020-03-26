// Generated from /Users/dhowe/git/rita-script/grammar/RiScript.g4 by ANTLR 4.7.1
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class RiScriptParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.7.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		LP=1, RP=2, LB=3, RB=4, LCB=5, RCB=6, DOT=7, WS=8, NL=9, SYM=10, OR=11, 
		EQ=12, TF=13, ENT=14, CHR=15;
	public static final int
		RULE_script = 0, RULE_transform = 1, RULE_ident = 2, RULE_symbol = 3, 
		RULE_choice = 4, RULE_inline = 5, RULE_assign = 6, RULE_expr = 7;
	public static final String[] ruleNames = {
		"script", "transform", "ident", "symbol", "choice", "inline", "assign", 
		"expr"
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

	@Override
	public String getGrammarFileName() { return "RiScript.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public RiScriptParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}
	public static class ScriptContext extends ParserRuleContext {
		public TerminalNode EOF() { return getToken(RiScriptParser.EOF, 0); }
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public List<TerminalNode> NL() { return getTokens(RiScriptParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(RiScriptParser.NL, i);
		}
		public ScriptContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_script; }
	}

	public final ScriptContext script() throws RecognitionException {
		ScriptContext _localctx = new ScriptContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_script);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(18); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				setState(18);
				_errHandler.sync(this);
				switch (_input.LA(1)) {
				case LP:
				case LB:
				case DOT:
				case WS:
				case SYM:
				case ENT:
				case CHR:
					{
					setState(16);
					expr();
					}
					break;
				case NL:
					{
					setState(17);
					match(NL);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				setState(20); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << LP) | (1L << LB) | (1L << DOT) | (1L << WS) | (1L << NL) | (1L << SYM) | (1L << ENT) | (1L << CHR))) != 0) );
			setState(22);
			match(EOF);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TransformContext extends ParserRuleContext {
		public TerminalNode TF() { return getToken(RiScriptParser.TF, 0); }
		public TransformContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_transform; }
	}

	public final TransformContext transform() throws RecognitionException {
		TransformContext _localctx = new TransformContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_transform);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(24);
			match(TF);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class IdentContext extends ParserRuleContext {
		public TerminalNode SYM() { return getToken(RiScriptParser.SYM, 0); }
		public IdentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ident; }
	}

	public final IdentContext ident() throws RecognitionException {
		IdentContext _localctx = new IdentContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_ident);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(26);
			match(SYM);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class SymbolContext extends ParserRuleContext {
		public IdentContext ident() {
			return getRuleContext(IdentContext.class,0);
		}
		public List<TransformContext> transform() {
			return getRuleContexts(TransformContext.class);
		}
		public TransformContext transform(int i) {
			return getRuleContext(TransformContext.class,i);
		}
		public SymbolContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_symbol; }
	}

	public final SymbolContext symbol() throws RecognitionException {
		SymbolContext _localctx = new SymbolContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_symbol);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(28);
			ident();
			setState(32);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==TF) {
				{
				{
				setState(29);
				transform();
				}
				}
				setState(34);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ChoiceContext extends ParserRuleContext {
		public List<TransformContext> transform() {
			return getRuleContexts(TransformContext.class);
		}
		public TransformContext transform(int i) {
			return getRuleContext(TransformContext.class,i);
		}
		public TerminalNode LP() { return getToken(RiScriptParser.LP, 0); }
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode RP() { return getToken(RiScriptParser.RP, 0); }
		public List<TerminalNode> OR() { return getTokens(RiScriptParser.OR); }
		public TerminalNode OR(int i) {
			return getToken(RiScriptParser.OR, i);
		}
		public ChoiceContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_choice; }
	}

	public final ChoiceContext choice() throws RecognitionException {
		ChoiceContext _localctx = new ChoiceContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_choice);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(77);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,6,_ctx) ) {
			case 1:
				{
				{
				setState(35);
				match(LP);
				setState(41);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,3,_ctx);
				while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
					if ( _alt==1 ) {
						{
						{
						setState(36);
						expr();
						setState(37);
						match(OR);
						}
						} 
					}
					setState(43);
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,3,_ctx);
				}
				setState(44);
				expr();
				setState(45);
				match(RP);
				}
				}
				break;
			case 2:
				{
				{
				setState(47);
				match(LP);
				setState(51); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(48);
					expr();
					setState(49);
					match(OR);
					}
					}
					setState(53); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << LP) | (1L << LB) | (1L << DOT) | (1L << WS) | (1L << SYM) | (1L << ENT) | (1L << CHR))) != 0) );
				setState(55);
				match(RP);
				}
				}
				break;
			case 3:
				{
				{
				setState(57);
				match(LP);
				setState(60); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(58);
					match(OR);
					setState(59);
					expr();
					}
					}
					setState(62); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( _la==OR );
				setState(64);
				match(RP);
				}
				}
				break;
			case 4:
				{
				{
				setState(66);
				match(LP);
				setState(67);
				match(OR);
				setState(68);
				match(RP);
				}
				}
				break;
			case 5:
				{
				{
				setState(69);
				match(LP);
				setState(70);
				match(OR);
				setState(71);
				expr();
				setState(72);
				match(OR);
				setState(73);
				match(RP);
				}
				}
				break;
			case 6:
				{
				{
				setState(75);
				match(LP);
				setState(76);
				match(RP);
				}
				}
				break;
			}
			setState(82);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==TF) {
				{
				{
				setState(79);
				transform();
				}
				}
				setState(84);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class InlineContext extends ParserRuleContext {
		public TerminalNode LB() { return getToken(RiScriptParser.LB, 0); }
		public SymbolContext symbol() {
			return getRuleContext(SymbolContext.class,0);
		}
		public TerminalNode EQ() { return getToken(RiScriptParser.EQ, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TerminalNode RB() { return getToken(RiScriptParser.RB, 0); }
		public InlineContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_inline; }
	}

	public final InlineContext inline() throws RecognitionException {
		InlineContext _localctx = new InlineContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_inline);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(85);
			match(LB);
			setState(86);
			symbol();
			setState(87);
			match(EQ);
			setState(88);
			expr();
			setState(89);
			match(RB);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AssignContext extends ParserRuleContext {
		public SymbolContext symbol() {
			return getRuleContext(SymbolContext.class,0);
		}
		public TerminalNode EQ() { return getToken(RiScriptParser.EQ, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public AssignContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assign; }
	}

	public final AssignContext assign() throws RecognitionException {
		AssignContext _localctx = new AssignContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_assign);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(91);
			symbol();
			setState(92);
			match(EQ);
			setState(93);
			expr();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ExprContext extends ParserRuleContext {
		public List<SymbolContext> symbol() {
			return getRuleContexts(SymbolContext.class);
		}
		public SymbolContext symbol(int i) {
			return getRuleContext(SymbolContext.class,i);
		}
		public List<ChoiceContext> choice() {
			return getRuleContexts(ChoiceContext.class);
		}
		public ChoiceContext choice(int i) {
			return getRuleContext(ChoiceContext.class,i);
		}
		public List<AssignContext> assign() {
			return getRuleContexts(AssignContext.class);
		}
		public AssignContext assign(int i) {
			return getRuleContext(AssignContext.class,i);
		}
		public List<InlineContext> inline() {
			return getRuleContexts(InlineContext.class);
		}
		public InlineContext inline(int i) {
			return getRuleContext(InlineContext.class,i);
		}
		public List<TerminalNode> WS() { return getTokens(RiScriptParser.WS); }
		public TerminalNode WS(int i) {
			return getToken(RiScriptParser.WS, i);
		}
		public List<TerminalNode> CHR() { return getTokens(RiScriptParser.CHR); }
		public TerminalNode CHR(int i) {
			return getToken(RiScriptParser.CHR, i);
		}
		public List<TerminalNode> DOT() { return getTokens(RiScriptParser.DOT); }
		public TerminalNode DOT(int i) {
			return getToken(RiScriptParser.DOT, i);
		}
		public List<TerminalNode> ENT() { return getTokens(RiScriptParser.ENT); }
		public TerminalNode ENT(int i) {
			return getToken(RiScriptParser.ENT, i);
		}
		public ExprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expr; }
	}

	public final ExprContext expr() throws RecognitionException {
		ExprContext _localctx = new ExprContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_expr);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(105); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					setState(105);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,9,_ctx) ) {
					case 1:
						{
						setState(95);
						symbol();
						}
						break;
					case 2:
						{
						setState(96);
						choice();
						}
						break;
					case 3:
						{
						setState(97);
						assign();
						}
						break;
					case 4:
						{
						setState(98);
						inline();
						}
						break;
					case 5:
						{
						setState(100); 
						_errHandler.sync(this);
						_alt = 1;
						do {
							switch (_alt) {
							case 1:
								{
								{
								setState(99);
								_la = _input.LA(1);
								if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << DOT) | (1L << ENT) | (1L << CHR))) != 0)) ) {
								_errHandler.recoverInline(this);
								}
								else {
									if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
									_errHandler.reportMatch(this);
									consume();
								}
								}
								}
								break;
							default:
								throw new NoViableAltException(this);
							}
							setState(102); 
							_errHandler.sync(this);
							_alt = getInterpreter().adaptivePredict(_input,8,_ctx);
						} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
						}
						break;
					case 6:
						{
						setState(104);
						match(WS);
						}
						break;
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(107); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,10,_ctx);
			} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3\21p\4\2\t\2\4\3\t"+
		"\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\3\2\3\2\6\2\25\n\2"+
		"\r\2\16\2\26\3\2\3\2\3\3\3\3\3\4\3\4\3\5\3\5\7\5!\n\5\f\5\16\5$\13\5\3"+
		"\6\3\6\3\6\3\6\7\6*\n\6\f\6\16\6-\13\6\3\6\3\6\3\6\3\6\3\6\3\6\3\6\6\6"+
		"\66\n\6\r\6\16\6\67\3\6\3\6\3\6\3\6\3\6\6\6?\n\6\r\6\16\6@\3\6\3\6\3\6"+
		"\3\6\3\6\3\6\3\6\3\6\3\6\3\6\3\6\3\6\3\6\5\6P\n\6\3\6\7\6S\n\6\f\6\16"+
		"\6V\13\6\3\7\3\7\3\7\3\7\3\7\3\7\3\b\3\b\3\b\3\b\3\t\3\t\3\t\3\t\3\t\6"+
		"\tg\n\t\r\t\16\th\3\t\6\tl\n\t\r\t\16\tm\3\t\2\2\n\2\4\6\b\n\f\16\20\2"+
		"\3\4\2\t\t\20\21\2z\2\24\3\2\2\2\4\32\3\2\2\2\6\34\3\2\2\2\b\36\3\2\2"+
		"\2\nO\3\2\2\2\fW\3\2\2\2\16]\3\2\2\2\20k\3\2\2\2\22\25\5\20\t\2\23\25"+
		"\7\13\2\2\24\22\3\2\2\2\24\23\3\2\2\2\25\26\3\2\2\2\26\24\3\2\2\2\26\27"+
		"\3\2\2\2\27\30\3\2\2\2\30\31\7\2\2\3\31\3\3\2\2\2\32\33\7\17\2\2\33\5"+
		"\3\2\2\2\34\35\7\f\2\2\35\7\3\2\2\2\36\"\5\6\4\2\37!\5\4\3\2 \37\3\2\2"+
		"\2!$\3\2\2\2\" \3\2\2\2\"#\3\2\2\2#\t\3\2\2\2$\"\3\2\2\2%+\7\3\2\2&\'"+
		"\5\20\t\2\'(\7\r\2\2(*\3\2\2\2)&\3\2\2\2*-\3\2\2\2+)\3\2\2\2+,\3\2\2\2"+
		",.\3\2\2\2-+\3\2\2\2./\5\20\t\2/\60\7\4\2\2\60P\3\2\2\2\61\65\7\3\2\2"+
		"\62\63\5\20\t\2\63\64\7\r\2\2\64\66\3\2\2\2\65\62\3\2\2\2\66\67\3\2\2"+
		"\2\67\65\3\2\2\2\678\3\2\2\289\3\2\2\29:\7\4\2\2:P\3\2\2\2;>\7\3\2\2<"+
		"=\7\r\2\2=?\5\20\t\2><\3\2\2\2?@\3\2\2\2@>\3\2\2\2@A\3\2\2\2AB\3\2\2\2"+
		"BC\7\4\2\2CP\3\2\2\2DE\7\3\2\2EF\7\r\2\2FP\7\4\2\2GH\7\3\2\2HI\7\r\2\2"+
		"IJ\5\20\t\2JK\7\r\2\2KL\7\4\2\2LP\3\2\2\2MN\7\3\2\2NP\7\4\2\2O%\3\2\2"+
		"\2O\61\3\2\2\2O;\3\2\2\2OD\3\2\2\2OG\3\2\2\2OM\3\2\2\2PT\3\2\2\2QS\5\4"+
		"\3\2RQ\3\2\2\2SV\3\2\2\2TR\3\2\2\2TU\3\2\2\2U\13\3\2\2\2VT\3\2\2\2WX\7"+
		"\5\2\2XY\5\b\5\2YZ\7\16\2\2Z[\5\20\t\2[\\\7\6\2\2\\\r\3\2\2\2]^\5\b\5"+
		"\2^_\7\16\2\2_`\5\20\t\2`\17\3\2\2\2al\5\b\5\2bl\5\n\6\2cl\5\16\b\2dl"+
		"\5\f\7\2eg\t\2\2\2fe\3\2\2\2gh\3\2\2\2hf\3\2\2\2hi\3\2\2\2il\3\2\2\2j"+
		"l\7\n\2\2ka\3\2\2\2kb\3\2\2\2kc\3\2\2\2kd\3\2\2\2kf\3\2\2\2kj\3\2\2\2"+
		"lm\3\2\2\2mk\3\2\2\2mn\3\2\2\2n\21\3\2\2\2\r\24\26\"+\67@OThkm";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}