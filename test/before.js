import { expect } from 'chai';

let RiTa;
if (process && process.env) {
  (async function () {
    let path = process.env.NODE_ENV === 'dev' ? '../src' : '../dist';
    return (await import(path + '/rita.js')).default;
  })().then(module => RiTa = module);
}
else if (window) {
  RiTa = window.RiTa;
}

export { RiTa, expect };