
// node/full

module.exports = {
  mode: 'development',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        loader: "eslint-loader",
        exclude: /node_modules/,
        options: {
          emitWarning: true,
          configFile: "./.eslintrc.json"
        }
      }
    ]
  },
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
  externals: ['he', 'colors', 'deepmerge', 'antlr4', /^antlr4\/.+$/ ],
  entry: './src/rita.js'
};
