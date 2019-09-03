grammar RiScript;

// NOTE: changing this file require a re-compile

// TODO:  silent assigns
//        single and double quotes
//        numbers/arithmetic (++, etc)
//        line breaks in vars (&#13; (or &#10; for newline))
//        adjacent vars: $me$me, $me$me=hello, $me$me$me=hello

// TODO: store custom transforms in context

// IDEA: variable assigments are normally SILENT, we add an operator to
// make them output (reverse what we have now):
// $hero=(Jane | Jill) -> silent
// [$hero=(Jane | Jill)] -> spoken

// $hero=&(Jane | Jill)
// $hero=>(Jane | Jill)
// $hero=+(Jane | Jill)
// $hero<-(Jane | Jill)
// $hero$hero<-(Jane | Jill)

// TODO: Labels

script: expr+ EOF;
transform: TF;
ident: SYM;
symbol: ident transform*;
choice: ((LP (expr OR)* expr RP)
      	| (LP (expr OR)+ RP)
      	| (LP (OR expr)+ RP)
        | (LP OR RP)
        | (LP OR expr OR RP)
        | (LP RP))
        transform*;
assign: symbol EQ value;
value: symbol | choice | CHR;
expr: (symbol | choice | assign | CHR | NL | DOT | ENT)
  (WS+ (symbol | choice | assign | CHR | NL | DOT | ENT))*;

LP: '(';
RP: ')';
LB: '[';
RB: ']';
LCB: '{';
RCB: '}';
DOT: '.';
WS: [ \t]+;
NL: '\r'? '\n';
SYM: ('$' IDENT) | ('$' '{' IDENT '}') ;
OR: WS* '|' WS*;
EQ: WS* '=' WS*;
TF: ('.' IDENT ( '(' ')' )? )+;
ENT: '&' [A-Za-z0-9#]+ ';';
CHR: ~( '.' | '[' | ']' | '{' | '}' | '(' | ')' | ' ' | '\t' | '|' | '=' | '$' | '\n')+;
fragment IDENT: [A-Za-z_] [A-Za-z_0-9-]*;
