path = process.env.NODE_ENV !== 'dist' ? '../src/rita' : '../dist/rita';
RiTa = require(path); chai = require('chai'); expect = chai.expect;
hasLex = process.env.NODE_ENV !== 'dist' || RiTa.hasLexicon();
//console.log('DIST: '+(process.env.NODE_ENV === 'dist')+', PATH:',path+", LEX:"+hasLex);
