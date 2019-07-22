grammar RitaScript;

// NOTE: changing this file require a re-compile

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
assign: LB symbol EQ expr RB;
expr: (symbol | choice | assign | CHR | FS | ENT)
  (WS+ (symbol | choice | assign | CHR | FS | ENT))*;

LB: '[';
RB: ']';
FS: '.';
WS: [ \t]+;
SYM: '$' ID;
OR: WS* '|' WS*;
EQ: WS* '=' WS*;
TF: ('.' ID ( '(' ')' )? )+;
ENT: '&' [A-Za-z0-9#]+ ';';
CHR: ~( '.' | '[' | ']' | ' ' | '\t' | '|' | '=' | '$' )+;

fragment ID: [A-Za-z_] [A-Za-z_0-9-]*;
