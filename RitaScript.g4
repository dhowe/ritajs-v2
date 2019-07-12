grammar RitaScript;

// NOTE: changing this file require a re-compile

script: expr+ EOF;
transform: TF;
symbol: SYM transform*;
expr: (symbol | choice | WORD) (WS+ (symbol | choice | WORD))*;
choice: (LB (expr OR)* expr RB) transform* #fullChoice
      	| (LB (expr OR)+ RB) 	transform*   #emptyChoice
      	| (LB (OR expr)+ RB) 	transform*   #emptyChoice
      	;

LB: '[';
RB: ']';
LP: '(';
RP: ')';
WS: [ \t]+;
OR: WS* '|' WS*;
DOLLAR: '$';
SYM: DOLLAR [A-Za-z_] [A-Za-z_0-9-]*;
TF: '.' ([A-Za-z_] [A-Za-z_0-9-]*) (LP RP)?;
WORD: [0-9A-Za-z,.;"'?]+;

ERROR: . ;
