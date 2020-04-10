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
		GT=1, LT=2, LP=3, RP=4, LB=5, RB=6, LCB=7, RCB=8, DOT=9, WS=10, EXC=11, 
		AST=12, HAT=13, DOL=14, NL=15, SYM=16, OR=17, EQ=18, TF=19, ENT=20, INT=21, 
		OP=22, CHR=23;
	public static final int
		RULE_script = 0, RULE_expr = 1, RULE_cond = 2, RULE_weight = 3, RULE_choice = 4, 
		RULE_inline = 5, RULE_assign = 6, RULE_chars = 7, RULE_symbol = 8, RULE_wexpr = 9, 
		RULE_transform = 10, RULE_op = 11;
	public static final String[] ruleNames = {
		"script", "expr", "cond", "weight", "choice", "inline", "assign", "chars", 
		"symbol", "wexpr", "transform", "op"
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
			setState(26); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				setState(26);
				_errHandler.sync(this);
				switch (_input.LA(1)) {
				case GT:
				case LT:
				case LP:
				case LB:
				case DOT:
				case WS:
				case EXC:
				case AST:
				case HAT:
				case DOL:
				case SYM:
				case ENT:
				case INT:
				case CHR:
					{
					setState(24);
					expr();
					}
					break;
				case NL:
					{
					setState(25);
					match(NL);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				setState(28); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << GT) | (1L << LT) | (1L << LP) | (1L << LB) | (1L << DOT) | (1L << WS) | (1L << EXC) | (1L << AST) | (1L << HAT) | (1L << DOL) | (1L << NL) | (1L << SYM) | (1L << ENT) | (1L << INT) | (1L << CHR))) != 0) );
			setState(30);
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
		public List<CharsContext> chars() {
			return getRuleContexts(CharsContext.class);
		}
		public CharsContext chars(int i) {
			return getRuleContext(CharsContext.class,i);
		}
		public ExprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expr; }
	}

	public final ExprContext expr() throws RecognitionException {
		ExprContext _localctx = new ExprContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_expr);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(37); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					setState(37);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,2,_ctx) ) {
					case 1:
						{
						setState(32);
						symbol();
						}
						break;
					case 2:
						{
						setState(33);
						choice();
						}
						break;
					case 3:
						{
						setState(34);
						assign();
						}
						break;
					case 4:
						{
						setState(35);
						inline();
						}
						break;
					case 5:
						{
						setState(36);
						chars();
						}
						break;
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(39); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,3,_ctx);
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

	public static class CondContext extends ParserRuleContext {
		public TerminalNode LCB() { return getToken(RiScriptParser.LCB, 0); }
		public TerminalNode SYM() { return getToken(RiScriptParser.SYM, 0); }
		public OpContext op() {
			return getRuleContext(OpContext.class,0);
		}
		public CharsContext chars() {
			return getRuleContext(CharsContext.class,0);
		}
		public TerminalNode RCB() { return getToken(RiScriptParser.RCB, 0); }
		public List<TerminalNode> WS() { return getTokens(RiScriptParser.WS); }
		public TerminalNode WS(int i) {
			return getToken(RiScriptParser.WS, i);
		}
		public CondContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_cond; }
	}

	public final CondContext cond() throws RecognitionException {
		CondContext _localctx = new CondContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_cond);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(44);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS) {
				{
				{
				setState(41);
				match(WS);
				}
				}
				setState(46);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(47);
			match(LCB);
			setState(48);
			match(SYM);
			setState(49);
			op();
			setState(50);
			chars();
			setState(51);
			match(RCB);
			setState(55);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS) {
				{
				{
				setState(52);
				match(WS);
				}
				}
				setState(57);
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

	public static class WeightContext extends ParserRuleContext {
		public TerminalNode LB() { return getToken(RiScriptParser.LB, 0); }
		public TerminalNode INT() { return getToken(RiScriptParser.INT, 0); }
		public TerminalNode RB() { return getToken(RiScriptParser.RB, 0); }
		public List<TerminalNode> WS() { return getTokens(RiScriptParser.WS); }
		public TerminalNode WS(int i) {
			return getToken(RiScriptParser.WS, i);
		}
		public WeightContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_weight; }
	}

	public final WeightContext weight() throws RecognitionException {
		WeightContext _localctx = new WeightContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_weight);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(61);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS) {
				{
				{
				setState(58);
				match(WS);
				}
				}
				setState(63);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(64);
			match(LB);
			setState(65);
			match(INT);
			setState(66);
			match(RB);
			setState(70);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS) {
				{
				{
				setState(67);
				match(WS);
				}
				}
				setState(72);
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
		public TerminalNode LP() { return getToken(RiScriptParser.LP, 0); }
		public List<WexprContext> wexpr() {
			return getRuleContexts(WexprContext.class);
		}
		public WexprContext wexpr(int i) {
			return getRuleContext(WexprContext.class,i);
		}
		public TerminalNode RP() { return getToken(RiScriptParser.RP, 0); }
		public List<TransformContext> transform() {
			return getRuleContexts(TransformContext.class);
		}
		public TransformContext transform(int i) {
			return getRuleContext(TransformContext.class,i);
		}
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
			{
			setState(73);
			match(LP);
			setState(79);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,8,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(74);
					wexpr();
					setState(75);
					match(OR);
					}
					} 
				}
				setState(81);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,8,_ctx);
			}
			setState(82);
			wexpr();
			setState(83);
			match(RP);
			}
			setState(88);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==TF) {
				{
				{
				setState(85);
				transform();
				}
				}
				setState(90);
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
		public List<TransformContext> transform() {
			return getRuleContexts(TransformContext.class);
		}
		public TransformContext transform(int i) {
			return getRuleContext(TransformContext.class,i);
		}
		public InlineContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_inline; }
	}

	public final InlineContext inline() throws RecognitionException {
		InlineContext _localctx = new InlineContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_inline);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(91);
			match(LB);
			setState(92);
			symbol();
			setState(93);
			match(EQ);
			setState(94);
			expr();
			setState(95);
			match(RB);
			setState(99);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==TF) {
				{
				{
				setState(96);
				transform();
				}
				}
				setState(101);
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
			setState(102);
			symbol();
			setState(103);
			match(EQ);
			setState(104);
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

	public static class CharsContext extends ParserRuleContext {
		public List<TerminalNode> CHR() { return getTokens(RiScriptParser.CHR); }
		public TerminalNode CHR(int i) {
			return getToken(RiScriptParser.CHR, i);
		}
		public List<TerminalNode> ENT() { return getTokens(RiScriptParser.ENT); }
		public TerminalNode ENT(int i) {
			return getToken(RiScriptParser.ENT, i);
		}
		public List<TerminalNode> INT() { return getTokens(RiScriptParser.INT); }
		public TerminalNode INT(int i) {
			return getToken(RiScriptParser.INT, i);
		}
		public List<TerminalNode> DOT() { return getTokens(RiScriptParser.DOT); }
		public TerminalNode DOT(int i) {
			return getToken(RiScriptParser.DOT, i);
		}
		public List<TerminalNode> WS() { return getTokens(RiScriptParser.WS); }
		public TerminalNode WS(int i) {
			return getToken(RiScriptParser.WS, i);
		}
		public List<TerminalNode> EXC() { return getTokens(RiScriptParser.EXC); }
		public TerminalNode EXC(int i) {
			return getToken(RiScriptParser.EXC, i);
		}
		public List<TerminalNode> AST() { return getTokens(RiScriptParser.AST); }
		public TerminalNode AST(int i) {
			return getToken(RiScriptParser.AST, i);
		}
		public List<TerminalNode> GT() { return getTokens(RiScriptParser.GT); }
		public TerminalNode GT(int i) {
			return getToken(RiScriptParser.GT, i);
		}
		public List<TerminalNode> LT() { return getTokens(RiScriptParser.LT); }
		public TerminalNode LT(int i) {
			return getToken(RiScriptParser.LT, i);
		}
		public List<TerminalNode> DOL() { return getTokens(RiScriptParser.DOL); }
		public TerminalNode DOL(int i) {
			return getToken(RiScriptParser.DOL, i);
		}
		public List<TerminalNode> HAT() { return getTokens(RiScriptParser.HAT); }
		public TerminalNode HAT(int i) {
			return getToken(RiScriptParser.HAT, i);
		}
		public CharsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_chars; }
	}

	public final CharsContext chars() throws RecognitionException {
		CharsContext _localctx = new CharsContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_chars);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(110); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					setState(110);
					_errHandler.sync(this);
					switch (_input.LA(1)) {
					case CHR:
						{
						setState(106);
						match(CHR);
						}
						break;
					case ENT:
						{
						setState(107);
						match(ENT);
						}
						break;
					case INT:
						{
						setState(108);
						match(INT);
						}
						break;
					case GT:
					case LT:
					case DOT:
					case WS:
					case EXC:
					case AST:
					case HAT:
					case DOL:
						{
						setState(109);
						_la = _input.LA(1);
						if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << GT) | (1L << LT) | (1L << DOT) | (1L << WS) | (1L << EXC) | (1L << AST) | (1L << HAT) | (1L << DOL))) != 0)) ) {
						_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(112); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,12,_ctx);
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

	public static class SymbolContext extends ParserRuleContext {
		public TerminalNode SYM() { return getToken(RiScriptParser.SYM, 0); }
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
		enterRule(_localctx, 16, RULE_symbol);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(114);
			match(SYM);
			setState(118);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==TF) {
				{
				{
				setState(115);
				transform();
				}
				}
				setState(120);
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

	public static class WexprContext extends ParserRuleContext {
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public WeightContext weight() {
			return getRuleContext(WeightContext.class,0);
		}
		public WexprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_wexpr; }
	}

	public final WexprContext wexpr() throws RecognitionException {
		WexprContext _localctx = new WexprContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_wexpr);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(122);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,14,_ctx) ) {
			case 1:
				{
				setState(121);
				expr();
				}
				break;
			}
			setState(125);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==LB || _la==WS) {
				{
				setState(124);
				weight();
				}
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

	public static class TransformContext extends ParserRuleContext {
		public TerminalNode TF() { return getToken(RiScriptParser.TF, 0); }
		public TransformContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_transform; }
	}

	public final TransformContext transform() throws RecognitionException {
		TransformContext _localctx = new TransformContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_transform);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(127);
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

	public static class OpContext extends ParserRuleContext {
		public TerminalNode EQ() { return getToken(RiScriptParser.EQ, 0); }
		public TerminalNode OP() { return getToken(RiScriptParser.OP, 0); }
		public TerminalNode LT() { return getToken(RiScriptParser.LT, 0); }
		public TerminalNode GT() { return getToken(RiScriptParser.GT, 0); }
		public OpContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_op; }
	}

	public final OpContext op() throws RecognitionException {
		OpContext _localctx = new OpContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_op);
		int _la;
		try {
			setState(135);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case EQ:
			case OP:
				enterOuterAlt(_localctx, 1);
				{
				setState(130);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==OP) {
					{
					setState(129);
					match(OP);
					}
				}

				setState(132);
				match(EQ);
				}
				break;
			case LT:
				enterOuterAlt(_localctx, 2);
				{
				setState(133);
				match(LT);
				}
				break;
			case GT:
				enterOuterAlt(_localctx, 3);
				{
				setState(134);
				match(GT);
				}
				break;
			default:
				throw new NoViableAltException(this);
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
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3\31\u008c\4\2\t\2"+
		"\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13"+
		"\t\13\4\f\t\f\4\r\t\r\3\2\3\2\6\2\35\n\2\r\2\16\2\36\3\2\3\2\3\3\3\3\3"+
		"\3\3\3\3\3\6\3(\n\3\r\3\16\3)\3\4\7\4-\n\4\f\4\16\4\60\13\4\3\4\3\4\3"+
		"\4\3\4\3\4\3\4\7\48\n\4\f\4\16\4;\13\4\3\5\7\5>\n\5\f\5\16\5A\13\5\3\5"+
		"\3\5\3\5\3\5\7\5G\n\5\f\5\16\5J\13\5\3\6\3\6\3\6\3\6\7\6P\n\6\f\6\16\6"+
		"S\13\6\3\6\3\6\3\6\3\6\7\6Y\n\6\f\6\16\6\\\13\6\3\7\3\7\3\7\3\7\3\7\3"+
		"\7\7\7d\n\7\f\7\16\7g\13\7\3\b\3\b\3\b\3\b\3\t\3\t\3\t\3\t\6\tq\n\t\r"+
		"\t\16\tr\3\n\3\n\7\nw\n\n\f\n\16\nz\13\n\3\13\5\13}\n\13\3\13\5\13\u0080"+
		"\n\13\3\f\3\f\3\r\5\r\u0085\n\r\3\r\3\r\3\r\5\r\u008a\n\r\3\r\2\2\16\2"+
		"\4\6\b\n\f\16\20\22\24\26\30\2\3\4\2\3\4\13\20\2\u0097\2\34\3\2\2\2\4"+
		"\'\3\2\2\2\6.\3\2\2\2\b?\3\2\2\2\nK\3\2\2\2\f]\3\2\2\2\16h\3\2\2\2\20"+
		"p\3\2\2\2\22t\3\2\2\2\24|\3\2\2\2\26\u0081\3\2\2\2\30\u0089\3\2\2\2\32"+
		"\35\5\4\3\2\33\35\7\21\2\2\34\32\3\2\2\2\34\33\3\2\2\2\35\36\3\2\2\2\36"+
		"\34\3\2\2\2\36\37\3\2\2\2\37 \3\2\2\2 !\7\2\2\3!\3\3\2\2\2\"(\5\22\n\2"+
		"#(\5\n\6\2$(\5\16\b\2%(\5\f\7\2&(\5\20\t\2\'\"\3\2\2\2\'#\3\2\2\2\'$\3"+
		"\2\2\2\'%\3\2\2\2\'&\3\2\2\2()\3\2\2\2)\'\3\2\2\2)*\3\2\2\2*\5\3\2\2\2"+
		"+-\7\f\2\2,+\3\2\2\2-\60\3\2\2\2.,\3\2\2\2./\3\2\2\2/\61\3\2\2\2\60.\3"+
		"\2\2\2\61\62\7\t\2\2\62\63\7\22\2\2\63\64\5\30\r\2\64\65\5\20\t\2\659"+
		"\7\n\2\2\668\7\f\2\2\67\66\3\2\2\28;\3\2\2\29\67\3\2\2\29:\3\2\2\2:\7"+
		"\3\2\2\2;9\3\2\2\2<>\7\f\2\2=<\3\2\2\2>A\3\2\2\2?=\3\2\2\2?@\3\2\2\2@"+
		"B\3\2\2\2A?\3\2\2\2BC\7\7\2\2CD\7\27\2\2DH\7\b\2\2EG\7\f\2\2FE\3\2\2\2"+
		"GJ\3\2\2\2HF\3\2\2\2HI\3\2\2\2I\t\3\2\2\2JH\3\2\2\2KQ\7\5\2\2LM\5\24\13"+
		"\2MN\7\23\2\2NP\3\2\2\2OL\3\2\2\2PS\3\2\2\2QO\3\2\2\2QR\3\2\2\2RT\3\2"+
		"\2\2SQ\3\2\2\2TU\5\24\13\2UV\7\6\2\2VZ\3\2\2\2WY\5\26\f\2XW\3\2\2\2Y\\"+
		"\3\2\2\2ZX\3\2\2\2Z[\3\2\2\2[\13\3\2\2\2\\Z\3\2\2\2]^\7\7\2\2^_\5\22\n"+
		"\2_`\7\24\2\2`a\5\4\3\2ae\7\b\2\2bd\5\26\f\2cb\3\2\2\2dg\3\2\2\2ec\3\2"+
		"\2\2ef\3\2\2\2f\r\3\2\2\2ge\3\2\2\2hi\5\22\n\2ij\7\24\2\2jk\5\4\3\2k\17"+
		"\3\2\2\2lq\7\31\2\2mq\7\26\2\2nq\7\27\2\2oq\t\2\2\2pl\3\2\2\2pm\3\2\2"+
		"\2pn\3\2\2\2po\3\2\2\2qr\3\2\2\2rp\3\2\2\2rs\3\2\2\2s\21\3\2\2\2tx\7\22"+
		"\2\2uw\5\26\f\2vu\3\2\2\2wz\3\2\2\2xv\3\2\2\2xy\3\2\2\2y\23\3\2\2\2zx"+
		"\3\2\2\2{}\5\4\3\2|{\3\2\2\2|}\3\2\2\2}\177\3\2\2\2~\u0080\5\b\5\2\177"+
		"~\3\2\2\2\177\u0080\3\2\2\2\u0080\25\3\2\2\2\u0081\u0082\7\25\2\2\u0082"+
		"\27\3\2\2\2\u0083\u0085\7\30\2\2\u0084\u0083\3\2\2\2\u0084\u0085\3\2\2"+
		"\2\u0085\u0086\3\2\2\2\u0086\u008a\7\24\2\2\u0087\u008a\7\4\2\2\u0088"+
		"\u008a\7\3\2\2\u0089\u0084\3\2\2\2\u0089\u0087\3\2\2\2\u0089\u0088\3\2"+
		"\2\2\u008a\31\3\2\2\2\24\34\36\').9?HQZeprx|\177\u0084\u0089";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}