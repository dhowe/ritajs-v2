grammar RitaScript;

// NOTE: changing this file require a re-compile

script: expr+ EOF;
transform: TF;
ident: SYM;
symbol: ident transform*;
expr: (symbol | choice | assign | WORD | PUNCT | ENT | NL)
  (WS+ (symbol | choice | assign | WORD | PUNCT | ENT | NL))*;
choice: ((LB (expr OR)* expr RB)
      	| (LB (expr OR)+ RB)
      	| (LB (OR expr)+ RB)
        | (LB OR RB)
        | (LB OR expr OR RB))
        transform*;
assign: LB symbol EQ expr RB;

LB: '[';
RB: ']';
LP: '(';
RP: ')';
WS: [ \t]+;
NL: '\r'? '\n';
DOLLAR: '$';
OR: WS* '|' WS*;
EQ: WS* '=' WS*;
ENT: '&' [A-Za-z0-9#]+ ';';
SYM: DOLLAR [A-Za-z_] [A-Za-z_0-9-]*;
TF: ('.' ([A-Za-z_] [A-Za-z_0-9-]*) (LP RP)?)+;
WORD: [0-9A-Z_a-z-]+;
PUNCT: [,.;:"'?!]+;

ERROR: . ;
