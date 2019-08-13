grammar RiScript;

// NOTE: changing this file require a re-compile

// TODO: silent assigns, multiple spaces

script: expr+ EOF;
transform: TF;
ident: SYM;
symbol: ident transform*;
choice: ((LP (expr OR)* expr RP)
      	| (LP (expr OR)+ RP)
      	| (LP (OR expr)+ RP)
        | (LP OR RP)
        | (LP OR expr OR RP))
        transform*;
//assign: ((LB symbol EQ expr RB) | (LCB symbol EQ expr RCB)) transform*;
assign: symbol EQ value;
value: (symbol | choice | CHR | FS | ENT);
expr: (symbol | choice | assign | CHR | FS | ENT)
  (WS+ (symbol | choice | assign |  CHR | FS | ENT))*;

LP: '(';
RP: ')';
LB: '[';
RB: ']';
LCB: '{';
RCB: '}';
FS: '.';
WS: [ \t]+;
SYM: ('$' IDENT) | ('$' '{' IDENT '}') ;
OR: WS* '|' WS*;
EQ: WS* '=' WS*;
TF: ('.' IDENT ( '(' ')' )? )+;
ENT: '&' [A-Za-z0-9#]+ ';';
CHR: ~( '.' | '[' | ']' | '{' | '}' | '(' | ')' | ' ' | '\t' | '|' | '=' | '$' )+;

fragment IDENT: [A-Za-z_] [A-Za-z_0-9-]*;
