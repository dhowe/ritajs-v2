grammar RitaScript;

script: expr+ EOF;
transform: TF;
symbol: SYM transform*;
expr: (symbol | choice | WORD) (WS+ (symbol | choice | WORD))*;
choice: (LP (expr OR)* expr RP) transform* #fullChoice
      	| (LP (expr OR)+ RP) 	transform*   #emptyChoice
      	| (LP (OR expr)+ RP) 	transform*   #emptyChoice
      	;

LP: '(';
RP: ')';
WS: [ \t]+;
OR: WS* '|' WS*;
DOLLAR: '$';
SYM: DOLLAR [A-Za-z_] [A-Za-z_0-9-]*;
TF: '.' ([A-Za-z_] [A-Za-z_0-9-]*) (LP RP)?;
WORD: [0-9A-Za-z,.;"'?]+;

ERROR: . ;
