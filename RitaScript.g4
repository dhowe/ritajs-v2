grammar RitaScript;

// NOTE: changing this file require a re-compile

script: expr+ EOF;
transform: TF;
ident: SYM;
symbol: ident transform*;
choice: ((LB (expr OR)* expr RB)
      	| (LB (expr OR)+ RB)
      	| (LB (OR expr)+ RB)
        | (LB OR RB)
        | (LB OR expr OR RB))
        transform*;
assign: LB symbol EQ expr RB;
expr: (symbol | choice | assign | CHR | FS | ENT)
  (WS+ (symbol | choice | assign | CHR | FS | ENT))*;

LB: '[';
RB: ']';
LP: '(';
RP: ')';
FS: '.';
WS: [ \t]+;
DOLLAR: '$';
OR: WS* '|' WS*;
EQ: WS* '=' WS*;
ENT: '&' [A-Za-z0-9#]+ ';';
SYM: DOLLAR [A-Za-z_] [A-Za-z_0-9-]*;
TF: ('.' ([A-Za-z_] [A-Za-z_0-9-]*) (LP RP)?)+;
CHR: ~( '.' | '[' | ']' | '(' | ')' | ' ' | '\t' | '|' | '=' | '$')+;

//NL: '\r'? '\n';
/* WORD: [0-9A-Za-z]+;
PUNCT: [,.;:"\\'?!-_`“”’‘…‐–—―©]+;

ERROR: . ; */
