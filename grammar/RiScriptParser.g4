parser grammar RiScriptParser;

// NOTE: changing this file requires a re-compile: use $ npm run watch.grammar 

options { tokenVocab=RiScriptLexer; }

script: line (NL line)* EOF;
line: (expr | cexpr)*;
expr: (symbol | choice | assign | chars | link)+;
cexpr: WS* LCB cond+ RCB Q WS* expr;
cond: symbol WS* op WS* chars WS* COM?;
weight: WS* LB INT RB WS*;
assign: (dynamic | symbol) EQ expr;
transform: DIDENT ( LP expr? RP )?;
dynamic: DYN transform*;
symbol: SYM transform* | transform+;
choice: (LP (wexpr OR)* wexpr RP) transform*;
wexpr: expr? weight?;
link:  LB expr RB MDS url MDE WS*;
url: MDT+;
op: OP | (LT | GT | EQ);
chars: (CHR | DOT | AST | FS | DOL | WS | GT | LT | COM | ESC | ENT | INT)+;
