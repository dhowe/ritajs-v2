path = process.env.NODE_ENV !== 'dist' ? '../src/rita' : '../dist/rita';
RiTa = require(path); chai = require('chai'); expect = chai.expect;
hasLex = process.env.NODE_ENV !== 'dist' || RiTa.lexicon().size() > 0;
//console.log('DIST: '+(process.env.NODE_ENV === 'dist')+', PATH:',path+", LEX:"+hasLex);
