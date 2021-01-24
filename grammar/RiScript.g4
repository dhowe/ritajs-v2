grammar RiScript;

// --------- NOTE: changing this file requires a re-compile: use $ yarn watch.grammar --------- 

script: (expr | cexpr | NL)+ EOF;
expr: (symbol | choice | assign | dassign | chars)+; //| dynamic
cexpr: WS* LCB cond+ RCB WS* expr;
cond: symbol WS* op WS* chars WS* COM?;
weight: WS* LB INT RB WS*;
choice: (LP (wexpr OR)* wexpr RP) transform*;

dassign: dynamic EQ expr;
assign: symbol EQ expr;

chars: (
		(DOT | WS | EXC | AST | GT | LT | DOL | HAT | COM)
		| CHR
		| ENT
		| INT
	)+;
dynamic: DYN transform*;
symbol: SYM transform* | transform+; // handle empty-string transforms
wexpr: expr? weight?;
transform: TF;
op: OP | (LT | GT | EQ);

GT: '>';
LT: '<';
LP: '(';
RP: ')';
LB: '[';
RB: ']';
LCB: '{';
RCB: '}';
DOT: '.';
WS: [ \t];
EXC: '!';
AST: '*';
HAT: '^';
DOL: '$';
COM: ',';
NL: '\r'? '\n';
DYN: '&' NIDENT;
SYM: '$' NIDENT;
OR: WS* '|' WS*;
EQ: WS* '=' WS*;
TF: ('.' IDENT ( '(' ')')?)+;
ENT: '&' [A-Za-z0-9#]+ ';';
//NUM: ([0-9]+ | ( [0-9]* '.' [0-9]+));
INT: WS* [0-9]+ WS*;
OP: [!*$^<>] '=';
CHR:
	~(
		'.'
		| '>'
		| '<'
		| '^'
		| '*'
		| '!'
		| '['
		| ']'
		| '{'
		| '}'
		| '('
		| ')'
		| ' '
		| '\t'
		| '|'
		| '='
		| '$'
		| '\n'
	)+;
fragment IDENT: [A-Za-z_] [A-Za-z_0-9-]*;
fragment NIDENT: [A-Za-z_0-9] [A-Za-z_0-9-]*;
