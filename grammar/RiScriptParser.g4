parser grammar RiScriptParser;

// NOTE: changing this file requires a re-compile: use $ yarn watch.grammar 

options { tokenVocab=RiScriptLexer; }

script: line (NL line)* EOF;
line: expr*;
expr: (symbol | choice | assign | chars)+;
//weight: WS* LB INT RB WS*;
choice: (LP (expr OR)* expr RP) transform*;
assign: (dynamic | symbol) EQ expr;
chars: (DOT | WS | EXC | AST | GT | LT | DOL | HAT | COM | FS | CHR | ENT | INT)+;
dynamic: DYN transform*;
symbol: SYM transform*;
//wexpr: expr? weight?;
//link:  LB expr RB MDS url MDE WS*;
//url: MDT+;
transform: TF;
//op: OP | (LT | GT | EQ);