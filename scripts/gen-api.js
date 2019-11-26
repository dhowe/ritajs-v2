const API = require('../api');

// Signatures
0 && API.RiTa.forEach(f => {
  console.log('static ' + f + '() {\n  return "";\n}\n');
})

// Tests
1 && API.RiTa.forEach(f => {
  console.log("it('Should correctly call " + f + "', () =>"
    + " {\n  expect(RiTa." + f + "()).eq('');\n});\n");
})
