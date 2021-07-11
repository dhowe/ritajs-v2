lexer grammar RiScriptLexer;

/*
 Note: changing this file requires a re-compile: use $ npm run watch.grammar
 
 Rule Priority --------------------------------------------------------------------------------
 First, select the lexer rule which matches the longest input If the text matches an implicitly
 defined token (like '{'), use the implicit rule If several lexer rules match the same input length,
 choose the first one, based on definition order
 */

LCOMM: '/*' .*? '*/' -> channel(HIDDEN);
BCOMM: '//' ~[\r\n\u2028\u2029]* -> channel(HIDDEN);

LCBQ: RCB '?'; // question mark after } for cexpr
MDLS: RB LP -> pushMode(MDL); // start md link: ']()'

LP: '(';
RP: ')';
LB: '[';
RB: ']';
LCB: '{';
RCB: '}';
FS: '/';
AST: '*';
DOL: '$';
COM: ',';
GT: '>';
LT: '<';
DOT: '.';
WS: [ \t];
ESC: '\\' [()];
NL: '\r'? '\n';
DIDENT: '.' IDENT;
DYN: '$$' NIDENT;
SYM: '$' NIDENT;
OR: WS* '|' WS*;
EQ: WS* '=' WS*;
ENT: '&' [A-Za-z0-9#]+ ';';
INT: WS* [0-9]+ WS*;
OP: [!*$^<>] '=';
CHR: ~[.>$\\/<*[\](){} \t\n|=]+;
IDENT: [A-Za-z_] [A-Za-z_0-9-]*;
CONT: '\\' NL -> channel(HIDDEN);

fragment NIDENT: [A-Za-z_0-9] [A-Za-z_0-9-]*;

// markdown
mode MDL;
MDLT: ~(')')+;
MDLE: ')' -> popMode;