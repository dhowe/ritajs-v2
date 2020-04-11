grammar RiScript;

// --------- NOTE: changing this file require a re-compile: use $ yarn run watch-grammar --------- 

// TODO: 3rd arg to RiTa.evaluate() should be opts(recursive[0,1,2],silent,trace,?) Custom
// transforms (store in context?) conditionals with number vars (need to OPS: test booleans,
// objects, etc.

script: (expr | cexpr | NL)+ EOF;
expr: (symbol | choice | assign | inline | chars)+;
cexpr: WS* LCB cond+ RCB WS* expr;
cond: SYM WS* op WS* chars WS* COM?;
weight: WS* LB INT RB WS*;
choice: (LP (wexpr OR)* wexpr RP) transform*;
inline: LB symbol EQ expr RB transform*;
assign: symbol EQ expr; //transform*
chars: (
		(DOT | WS | EXC | AST | GT | LT | DOL | HAT | COM)
		| CHR
		| ENT
		| INT
	)+;
symbol: SYM transform*;
wexpr: expr? weight?;
//wexpr: prod? weight?;
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
SYM: ('$' IDENT);
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
