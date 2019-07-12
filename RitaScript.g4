grammar RitaScript;

// NOTE: changing this file require a re-compile

script: expr+ EOF;
transform: TF;
symbol: SYM transform*;
expr: (symbol | choice | store | WORD) (WS+ (symbol | choice | store | WORD))*;
choice: (LB (expr OR)* expr RB) transform* #fullChoice
      	| (LB (expr OR)+ RB) 	transform*   #emptyChoice
      	| (LB (OR expr)+ RB) 	transform*   #emptyChoice
      	;
store: LB symbol EQ expr RB;

LB: '[';
RB: ']';
LP: '(';
RP: ')';
WS: [ \t]+;
DOLLAR: '$';
OR: WS* '|' WS*;
EQ: WS* '=' WS*;
SYM: DOLLAR [A-Za-z_] [A-Za-z_0-9-]*;
TF: '.' ([A-Za-z_] [A-Za-z_0-9-]*) (LP RP)?;
WORD: [0-9A-Za-z,.;"'?]+;

ERROR: . ;
