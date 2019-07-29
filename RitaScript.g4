grammar RitaScript;

// NOTE: changing this file require a re-compile

// TODO: silent assigns, multiple spaces

script: expr+ EOF;
transform: TF;
ident: SYM;
symbol: ident transform*;
choice: ((LB (expr OR)* expr RB)
      	| (LB (expr OR)+ RB)
      	| (LB (OR expr)+ RB)
        | (LB OR RB)
        | (LB OR expr OR RB))
        transform*;
assign: ((LB symbol EQ expr RB) | (LCB symbol EQ expr RCB)) transform*;
expr: (symbol | choice | assign | CHR | FS | ENT)
  (WS+ (symbol | choice | assign | CHR | FS | ENT))*;

LB: '[';
RB: ']';
LCB: '{';
RCB: '}';
FS: '.';
WS: [ \t]+;
SYM: '$' IDENT;
OR: WS* '|' WS*;
EQ: WS* '=' WS*;
TF: ('.' IDENT ( '(' ')' )? )+;
ENT: '&' [A-Za-z0-9#]+ ';';
CHR: ~( '.' | '[' | ']' | '{' | '}' | ' ' | '\t' | '|' | '=' | '$' )+;

fragment IDENT: [A-Za-z_] [A-Za-z_0-9-]*;
