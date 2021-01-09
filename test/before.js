path = process.env.NODE_ENV !== 'production' ? '../src' : '../dist';
RiTa = require(path+'/rita'); chai = require('chai'); expect = chai.expect;
hasLex = process.env.NODE_ENV !== 'production' || RiTa.lexicon().size() > 0;


