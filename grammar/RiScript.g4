grammar RiScript;

// --------- NOTE: changing this file require a re-compile: use $ yarn run watch-grammar --------- 

// TODO: custom transforms (store in context?) conditionals with number vars (need to
// parseFloat,parseBool,etc)

script: (expr | NL)+ EOF;
//prod: (symbol | choice | assign | inline | chars)+;
//expr: cond? prod;
expr: (symbol | choice | assign | inline | chars)+;
cond: WS* LCB SYM op chars RCB WS*;
weight: WS* LB INT RB WS*;
choice: (LP (wexpr OR)* wexpr RP) transform*;
inline: LB symbol EQ expr RB transform*;
assign: symbol EQ expr; //transform*
chars: (
		CHR
		| ENT
		| INT
		| (DOT | WS | EXC | AST | GT | LT | DOL | HAT))+;
symbol: SYM transform*;
wexpr: expr? weight?;
//wexpr: prod? weight?;
transform: TF;
op: OP? EQ | LT | GT;

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
NL: '\r'? '\n';
SYM: ('$' IDENT);
OR: WS* '|' WS*;
EQ: WS* '=' WS*;
TF: ('.' IDENT ( '(' ')')?)+;
ENT: '&' [A-Za-z0-9#]+ ';';
//NUM: ([0-9]+ | ( [0-9]* '.' [0-9]+));
INT: WS* [0-9]+ WS*;
OP: [!*$^<>];
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
