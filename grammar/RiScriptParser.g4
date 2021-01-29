parser grammar RiScriptParser;

// NOTE: changing this file requires a re-compile: use $ yarn watch.grammar 

options { tokenVocab=RiScriptLexer; }

script: (expr | cexpr |  link |  NL)* EOF;
expr: (symbol | choice | assign | chars)+;
cexpr: WS* LCB cond+ RCB WS* expr;
cond: symbol WS* op WS* chars WS* COM?;
weight: WS* LB INT RB WS*;
choice: (LP (wexpr OR)* wexpr RP) transform*;
assign: (dynamic | symbol) EQ expr;
chars: (
		(DOT | WS | EXC | AST | GT | LT | DOL | HAT | COM | FS)
		| CHR
		| ENT
		| INT
	)+;
dynamic: DYN transform*;
symbol: SYM transform* | transform+/* handle empty-string transforms */ ;
wexpr: expr? weight?;
link:  LB expr RB MDS url MDE WS*;
url: MDT+;
transform: TF;
op: OP | (LT | GT | EQ);