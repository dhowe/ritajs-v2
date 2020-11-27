
// build them all
module.exports = [
  /* "main": "dist/rita.js",           // node.js: cjs 
  "module": "dist/rita-es6.js",    // bundler: es2018 
  "unpkg": "dist/rita-web.js",      // unpkg.com  */

  require('./config/webpack.umd'),
  require('./config/webpack.web'),
  require('./config/webpack.web.nolex'),
  //require('./config/webpack.node')
];
