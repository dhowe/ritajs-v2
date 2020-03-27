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
		EQ=12, TF=13, ENT=14, NUM=15, CHR=16;
	public static final int
		RULE_script = 0, RULE_transform = 1, RULE_ident = 2, RULE_symbol = 3, 
		RULE_choice = 4, RULE_inline = 5, RULE_assign = 6, RULE_weight = 7, RULE_num = 8, 
		RULE_expr = 9;
	public static final String[] ruleNames = {
		"script", "transform", "ident", "symbol", "choice", "inline", "assign", 
		"weight", "num", "expr"
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
			setState(22); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				setState(22);
				_errHandler.sync(this);
				switch (_input.LA(1)) {
				case LP:
				case LB:
				case DOT:
				case WS:
				case SYM:
				case ENT:
				case NUM:
				case CHR:
					{
					setState(20);
					expr();
					}
					break;
				case NL:
					{
					setState(21);
					match(NL);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				setState(24); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << LP) | (1L << LB) | (1L << DOT) | (1L << WS) | (1L << NL) | (1L << SYM) | (1L << ENT) | (1L << NUM) | (1L << CHR))) != 0) );
			setState(26);
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
			setState(28);
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
			setState(30);
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
			setState(32);
			ident();
			setState(36);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==TF) {
				{
				{
				setState(33);
				transform();
				}
				}
				setState(38);
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
		public List<WeightContext> weight() {
			return getRuleContexts(WeightContext.class);
		}
		public WeightContext weight(int i) {
			return getRuleContext(WeightContext.class,i);
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
			setState(96);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,11,_ctx) ) {
			case 1:
				{
				{
				setState(39);
				match(LP);
				setState(48);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,4,_ctx);
				while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
					if ( _alt==1 ) {
						{
						{
						setState(40);
						expr();
						setState(42);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if (_la==LB) {
							{
							setState(41);
							weight();
							}
						}

						setState(44);
						match(OR);
						}
						} 
					}
					setState(50);
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,4,_ctx);
				}
				setState(51);
				expr();
				setState(53);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==LB) {
					{
					setState(52);
					weight();
					}
				}

				setState(55);
				match(RP);
				}
				}
				break;
			case 2:
				{
				{
				setState(57);
				match(LP);
				setState(64); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(58);
					expr();
					setState(60);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if (_la==LB) {
						{
						setState(59);
						weight();
						}
					}

					setState(62);
					match(OR);
					}
					}
					setState(66); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << LP) | (1L << LB) | (1L << DOT) | (1L << WS) | (1L << SYM) | (1L << ENT) | (1L << NUM) | (1L << CHR))) != 0) );
				setState(68);
				match(RP);
				}
				}
				break;
			case 3:
				{
				{
				setState(70);
				match(LP);
				setState(76); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(71);
					match(OR);
					setState(72);
					expr();
					setState(74);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if (_la==LB) {
						{
						setState(73);
						weight();
						}
					}

					}
					}
					setState(78); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( _la==OR );
				setState(80);
				match(RP);
				}
				}
				break;
			case 4:
				{
				{
				setState(82);
				match(LP);
				setState(83);
				match(OR);
				setState(84);
				match(RP);
				}
				}
				break;
			case 5:
				{
				{
				setState(85);
				match(LP);
				setState(86);
				match(OR);
				setState(87);
				expr();
				setState(89);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==LB) {
					{
					setState(88);
					weight();
					}
				}

				setState(91);
				match(OR);
				setState(92);
				match(RP);
				}
				}
				break;
			case 6:
				{
				{
				setState(94);
				match(LP);
				setState(95);
				match(RP);
				}
				}
				break;
			}
			setState(101);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==TF) {
				{
				{
				setState(98);
				transform();
				}
				}
				setState(103);
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
			setState(104);
			match(LB);
			setState(105);
			symbol();
			setState(106);
			match(EQ);
			setState(107);
			expr();
			setState(108);
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
			setState(110);
			symbol();
			setState(111);
			match(EQ);
			setState(112);
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

	public static class WeightContext extends ParserRuleContext {
		public TerminalNode LB() { return getToken(RiScriptParser.LB, 0); }
		public NumContext num() {
			return getRuleContext(NumContext.class,0);
		}
		public TerminalNode RB() { return getToken(RiScriptParser.RB, 0); }
		public WeightContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_weight; }
	}

	public final WeightContext weight() throws RecognitionException {
		WeightContext _localctx = new WeightContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_weight);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(114);
			match(LB);
			setState(115);
			num();
			setState(116);
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

	public static class NumContext extends ParserRuleContext {
		public TerminalNode NUM() { return getToken(RiScriptParser.NUM, 0); }
		public NumContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_num; }
	}

	public final NumContext num() throws RecognitionException {
		NumContext _localctx = new NumContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_num);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(118);
			match(NUM);
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
		public List<TerminalNode> NUM() { return getTokens(RiScriptParser.NUM); }
		public TerminalNode NUM(int i) {
			return getToken(RiScriptParser.NUM, i);
		}
		public ExprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expr; }
	}

	public final ExprContext expr() throws RecognitionException {
		ExprContext _localctx = new ExprContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_expr);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(130); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					setState(130);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,14,_ctx) ) {
					case 1:
						{
						setState(120);
						symbol();
						}
						break;
					case 2:
						{
						setState(121);
						choice();
						}
						break;
					case 3:
						{
						setState(122);
						assign();
						}
						break;
					case 4:
						{
						setState(123);
						inline();
						}
						break;
					case 5:
						{
						setState(125); 
						_errHandler.sync(this);
						_alt = 1;
						do {
							switch (_alt) {
							case 1:
								{
								{
								setState(124);
								_la = _input.LA(1);
								if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << DOT) | (1L << ENT) | (1L << NUM) | (1L << CHR))) != 0)) ) {
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
							setState(127); 
							_errHandler.sync(this);
							_alt = getInterpreter().adaptivePredict(_input,13,_ctx);
						} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
						}
						break;
					case 6:
						{
						setState(129);
						match(WS);
						}
						break;
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(132); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,15,_ctx);
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
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3\22\u0089\4\2\t\2"+
		"\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13"+
		"\t\13\3\2\3\2\6\2\31\n\2\r\2\16\2\32\3\2\3\2\3\3\3\3\3\4\3\4\3\5\3\5\7"+
		"\5%\n\5\f\5\16\5(\13\5\3\6\3\6\3\6\5\6-\n\6\3\6\3\6\7\6\61\n\6\f\6\16"+
		"\6\64\13\6\3\6\3\6\5\68\n\6\3\6\3\6\3\6\3\6\3\6\5\6?\n\6\3\6\3\6\6\6C"+
		"\n\6\r\6\16\6D\3\6\3\6\3\6\3\6\3\6\3\6\5\6M\n\6\6\6O\n\6\r\6\16\6P\3\6"+
		"\3\6\3\6\3\6\3\6\3\6\3\6\3\6\3\6\5\6\\\n\6\3\6\3\6\3\6\3\6\3\6\5\6c\n"+
		"\6\3\6\7\6f\n\6\f\6\16\6i\13\6\3\7\3\7\3\7\3\7\3\7\3\7\3\b\3\b\3\b\3\b"+
		"\3\t\3\t\3\t\3\t\3\n\3\n\3\13\3\13\3\13\3\13\3\13\6\13\u0080\n\13\r\13"+
		"\16\13\u0081\3\13\6\13\u0085\n\13\r\13\16\13\u0086\3\13\2\2\f\2\4\6\b"+
		"\n\f\16\20\22\24\2\3\4\2\t\t\20\22\2\u0096\2\30\3\2\2\2\4\36\3\2\2\2\6"+
		" \3\2\2\2\b\"\3\2\2\2\nb\3\2\2\2\fj\3\2\2\2\16p\3\2\2\2\20t\3\2\2\2\22"+
		"x\3\2\2\2\24\u0084\3\2\2\2\26\31\5\24\13\2\27\31\7\13\2\2\30\26\3\2\2"+
		"\2\30\27\3\2\2\2\31\32\3\2\2\2\32\30\3\2\2\2\32\33\3\2\2\2\33\34\3\2\2"+
		"\2\34\35\7\2\2\3\35\3\3\2\2\2\36\37\7\17\2\2\37\5\3\2\2\2 !\7\f\2\2!\7"+
		"\3\2\2\2\"&\5\6\4\2#%\5\4\3\2$#\3\2\2\2%(\3\2\2\2&$\3\2\2\2&\'\3\2\2\2"+
		"\'\t\3\2\2\2(&\3\2\2\2)\62\7\3\2\2*,\5\24\13\2+-\5\20\t\2,+\3\2\2\2,-"+
		"\3\2\2\2-.\3\2\2\2./\7\r\2\2/\61\3\2\2\2\60*\3\2\2\2\61\64\3\2\2\2\62"+
		"\60\3\2\2\2\62\63\3\2\2\2\63\65\3\2\2\2\64\62\3\2\2\2\65\67\5\24\13\2"+
		"\668\5\20\t\2\67\66\3\2\2\2\678\3\2\2\289\3\2\2\29:\7\4\2\2:c\3\2\2\2"+
		";B\7\3\2\2<>\5\24\13\2=?\5\20\t\2>=\3\2\2\2>?\3\2\2\2?@\3\2\2\2@A\7\r"+
		"\2\2AC\3\2\2\2B<\3\2\2\2CD\3\2\2\2DB\3\2\2\2DE\3\2\2\2EF\3\2\2\2FG\7\4"+
		"\2\2Gc\3\2\2\2HN\7\3\2\2IJ\7\r\2\2JL\5\24\13\2KM\5\20\t\2LK\3\2\2\2LM"+
		"\3\2\2\2MO\3\2\2\2NI\3\2\2\2OP\3\2\2\2PN\3\2\2\2PQ\3\2\2\2QR\3\2\2\2R"+
		"S\7\4\2\2Sc\3\2\2\2TU\7\3\2\2UV\7\r\2\2Vc\7\4\2\2WX\7\3\2\2XY\7\r\2\2"+
		"Y[\5\24\13\2Z\\\5\20\t\2[Z\3\2\2\2[\\\3\2\2\2\\]\3\2\2\2]^\7\r\2\2^_\7"+
		"\4\2\2_c\3\2\2\2`a\7\3\2\2ac\7\4\2\2b)\3\2\2\2b;\3\2\2\2bH\3\2\2\2bT\3"+
		"\2\2\2bW\3\2\2\2b`\3\2\2\2cg\3\2\2\2df\5\4\3\2ed\3\2\2\2fi\3\2\2\2ge\3"+
		"\2\2\2gh\3\2\2\2h\13\3\2\2\2ig\3\2\2\2jk\7\5\2\2kl\5\b\5\2lm\7\16\2\2"+
		"mn\5\24\13\2no\7\6\2\2o\r\3\2\2\2pq\5\b\5\2qr\7\16\2\2rs\5\24\13\2s\17"+
		"\3\2\2\2tu\7\5\2\2uv\5\22\n\2vw\7\6\2\2w\21\3\2\2\2xy\7\21\2\2y\23\3\2"+
		"\2\2z\u0085\5\b\5\2{\u0085\5\n\6\2|\u0085\5\16\b\2}\u0085\5\f\7\2~\u0080"+
		"\t\2\2\2\177~\3\2\2\2\u0080\u0081\3\2\2\2\u0081\177\3\2\2\2\u0081\u0082"+
		"\3\2\2\2\u0082\u0085\3\2\2\2\u0083\u0085\7\n\2\2\u0084z\3\2\2\2\u0084"+
		"{\3\2\2\2\u0084|\3\2\2\2\u0084}\3\2\2\2\u0084\177\3\2\2\2\u0084\u0083"+
		"\3\2\2\2\u0085\u0086\3\2\2\2\u0086\u0084\3\2\2\2\u0086\u0087\3\2\2\2\u0087"+
		"\25\3\2\2\2\22\30\32&,\62\67>DLP[bg\u0081\u0084\u0086";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}