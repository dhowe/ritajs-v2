import { createRequire } from 'module';
const rrequire = createRequire(import.meta.url);

const path = process.env.NODE_ENV !== 'production' ? '../src' : '../dist';
const RiTa = rrequire(path+'/rita.js'); 
const chai = rrequire('chai'); 
const expect = chai.expect;
const hasLex = process.env.NODE_ENV !== 'production' || RiTa.lexicon().size() > 0;

console.log(path, RiTa.VERSION, hasLex);
