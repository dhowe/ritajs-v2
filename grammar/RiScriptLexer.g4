lexer grammar RiScriptLexer;

// NOTE: changing this file requires a re-compile: use $ yarn watch.grammar 

/*     
		First, select the lexer rule which matches the longest input
    If the text matches an implicitly defined token (like '{'), use the implicit rule
    If several lexer rules match the same input length, choose the first one, based on definition order
 */

LCOMM: '/*' .*? '*/' -> channel(HIDDEN);
BCOMM: '//' ~[\r\n\u2028\u2029]* -> channel(HIDDEN);

//SMD: {this._input.LA(-1)==")".charCodeAt(0)}? '[' -> pushMode(MD) ;
GT: '>';
LT: '<';
MDS: {this._input.LA(-1)=="]".charCodeAt(0)}? '('  -> pushMode(MD) ;
LP:'(';
RP: ')';
LB: '[';
RB: ']';
LCB: '{';
RCB: '}';
DOT: '.';
WS: [ \t];
FS: '/';
EXC: '!';
AST: '*';
HAT: '^';
DOL: '$';
COM: ',';
NL: '\r'? '\n';
DYN: '$$' NIDENT;
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
		| '/'
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

mode MD;
MDT              : ~(')'); 
MDE               : ')' -> popMode ;