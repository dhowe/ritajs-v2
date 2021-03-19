async function getRiTa(){
    if (process.env.NODE_ENV === 'dev') {
        try {
            const RiTa = await import('../src/rita.js');
            return RiTa.default;
        } catch {
            throw Error('fail to load RiTa');
        }
    } else {
        try {
            const RiTa = await import('../dist/rita.js');
            return RiTa.default;
        } catch {
            throw Error('fail to load RiTa');
        }
    }
}
let RiTa;
getRiTa().then((Module) => {
    RiTa = Module;
})
import { expect } from 'chai';
export { RiTa, expect };