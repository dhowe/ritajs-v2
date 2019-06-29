grammar RitaScript;

script: expr+ EOF;
expr: (LP expr RP) #emptyExpr
  | ((WORD | ID | symbol | choice) (WS+ (WORD | ID | symbol | choice))*) #fullExpr
  ;
choice:
	(LP (expr OR)+ expr RP) #fullChoice
  | (LP (expr OR)+ RP) #emptyChoice
	| (LP (OR expr)+ RP) #emptyChoice
	;
symbol: '$' ID;

LP: '(';
RP: ')';
OR: WS* '|' WS*;
NL: ('\r'? '\n' | '\r') -> skip; // ??
ID: [A-Za-z_][A-Za-z_0-9-]*;
WORD: [0-9A-Za-z,.;"'?]+;
WS: [ \t]+;
