lexer grammar RiScriptLexer;

// changing this file requires a re-compile: use $ npm run watch.grammar 

LCOMM: '/*' .*? '*/' -> channel(HIDDEN);
BCOMM: '//' ~[\r\n\u2028\u2029]* -> channel(HIDDEN);

Q: {this._input.LA(-1)=='}'.charCodeAt(0)}? '?';
MDS: {this._input.LA(-1)==']'.charCodeAt(0)}? '('  -> pushMode(MD) ;

// For Java:
// Q: {_input.LA(-1)=='}'}? '?'; 
// MDS: {_input.LA(-1)==']'}? '('  -> pushMode(MD) ;

GT: '>';
LT: '<';
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
CONT: '\\' NL -> channel(HIDDEN);
BS: '\\';
NL: '\r'? '\n';
DID: DOT IDENT;
DYN: '$$' NIDENT;
SYM: '$' NIDENT;
OR: WS* '|' WS*;
EQ: WS* '=' WS*;
ENT: '&' [A-Za-z0-9#]+ ';';
//NUM: ([0-9]+ | ( [0-9]* '.' [0-9]+));
INT: WS* [0-9]+ WS*;
OP: [!*$^<>] '=';
CHR:
	~(
		'.'
		| '>'
		| '\\'
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
MDT              : ~(')')+; 
MDE               : ')' -> popMode ;

/*     
    Rule Priority
    ----------------------------------------------------------------------------
    First, select the lexer rule which matches the longest input
    If the text matches an implicitly defined token (like '{'), use the implicit rule
    If several lexer rules match the same input length, choose the first one, based on definition order
 */
