grammar RiScript;

// --------- NOTE: changing this file require a re-compile: use $ npm run watch-grammar --------- 

// TODO: silent assigns single and double quotes numbers/arithmetic (++, etc) line breaks in vars
// (&#13; (or &#10; for newline)) adjacent vars: $me$me, $me$me=hello, $me$me$me=hello

// TODO: store custom transforms in context

// IDEA: variable assigments are normally SILENT, we add an operator to make them output (reverse
// what we have now): $hero=(Jane | Jill) -> silent [$hero=(Jane | Jill)] -> spoken

// $hero=&(Jane | Jill) $hero=>(Jane | Jill) $hero=+(Jane | Jill) $hero<-(Jane | Jill)
// $hero$hero<-(Jane | Jill)

// line extensions /

// conditionals with number vars in rs (need to parseFloat)

script: (expr | NL)+ EOF;
transform: TF;
symbol: SYM transform*;
wexpr: expr? weight?;
weight: WS* LB INT RB WS*;
choice: (LP (wexpr OR)* wexpr RP) transform*;
inline: LB symbol EQ expr RB transform*;
assign: symbol EQ expr; //transform*
chars: (CHR | DOT | ENT | WS | INT)+;
expr: (symbol | choice | assign | inline | chars)+;

LP: '(';
RP: ')';
LB: '[';
RB: ']';
LCB: '{';
RCB: '}';
DOT: '.';
WS: [ \t];
NL: '\r'? '\n';
SYM: ('$' IDENT);
OR: WS* '|' WS*;
EQ: WS* '=' WS*;
TF: ('.' IDENT ( '(' ')')?)+;
ENT: '&' [A-Za-z0-9#]+ ';';
//NUM: ([0-9]+ | ( [0-9]* '.' [0-9]+));
INT: WS* [0-9]+ WS*;
CHR:
	~(
		'.'
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
