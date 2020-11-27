
// node/full

module.exports = {
  mode: 'production',
  target: 'node',
  output: {
    path: require('path').resolve(__dirname, '../dist'),
    library: 'RiTa',
    filename: 'rita-node.js',
    libraryTarget: 'commonjs2',
  },  
  node: {
    fs: "empty",
    __dirname: false,
    __filename: false,
  },
  watchOptions: {
    ignored: /node_modules/
  },
  externals: ['he', 'flatted/cjs', 'deepmerge', 'antlr4', /^antlr4\/.+$/ ],
  entry: './src/rita.js',
  plugins: [new (require('webpack').DefinePlugin)({
    __VERSION__: JSON.stringify(require("../package.json").version)
  })]
};
