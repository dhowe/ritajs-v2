grammar RitaScript;

// NOTE: changing this file require a re-compile
script: expr+ EOF;
transform: TF;
ident: SYM;
symbol: ident transform*;
expr: (symbol | choice | assign | WORD | PUNCT) (WS+ (symbol | choice | assign | WORD | PUNCT))*;
choice: ((LB (expr OR)* expr RB)
      	| (LB (expr OR)+ RB)
      	| (LB (OR expr)+ RB)
        | (LB OR RB)
        | (LB OR expr OR RB))
        transform*
      	;
assign: LB symbol EQ expr RB;

LB: '[';
RB: ']';
LP: '(';
RP: ')';
WS: [ \t]+;
DOLLAR: '$';
OR: WS* '|' WS*;
EQ: WS* '=' WS*;
SYM: DOLLAR [A-Za-z_] [A-Za-z_0-9-]*;
TF: ('.' ([A-Za-z_] [A-Za-z_0-9-]*) (LP RP)?)+;
WORD: [0-9A-Z_a-z-]+;
PUNCT: [,.;:"'?!]+;

ERROR: . ;
