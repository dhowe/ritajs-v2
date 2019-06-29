grammar RitaScript;

script: expr+;
//expr: (LP expr RP) | ((WORD | ID | symbol | choice) (WS+ (WORD | ID | symbol | choice))*);
expr: (WORD | ID | symbol | choice) (WS+ (WORD | ID | symbol | choice))*;
choice: (LP (expr OR)* expr (OR expr)* RP);// | (LP expr OR RP) | (LP OR expr RP);
symbol: DID;

LP: '(';
RP: ')';
OR: WS* '|' WS*;
NL: ('\r'? '\n' | '\r') -> skip;
ID: [A-Za-z_][A-Za-z_0-9-]*;
WORD: [0-9A-Za-z,.;"'?]+;
DID: '$' ID;
WS: [ \t]+;
