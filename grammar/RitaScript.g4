grammar RitaScript;

script: expr+ EOF;
symbol: SYM;
expr: (LP expr RP) 	#emptyExpr
      | (symbol | choice | WORD) (WS+ (symbol | choice | WORD))* 	#fullExpr
      ;
choice: (LP (expr OR)+ expr RP) #fullChoice
      	| (LP (expr OR)+ RP) 	#emptyChoice
      	| (LP (OR expr)+ RP) 	#emptyChoice
      	;

LP: '(';
RP: ')';
WS: [ \t]+;
OR: WS* '|' WS*;
DOLLAR: '$';
SYM: DOLLAR [A-Za-z_] [A-Za-z_0-9-]*;
WORD: [0-9A-Za-z,.;"'?]+;

ERROR: . ;
