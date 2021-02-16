
module.exports = {
    mode: 'production',
  target: 'node',
  output: {
    path: require('path').resolve(__dirname, '../dist'),
    library: 'RiTa',
    filename: 'rita-asciiOnly.js',
    globalObject: 'this',
    libraryTarget: 'umd',
  },  
  node: {
    fs: "empty",
    __dirname: false,
    __filename: false,
  },
  watchOptions: {
    ignored: /node_modules/
  },
  entry: './src/rita.js',
    optimization: {
        minimize: true,
        minimizer: [
            new (require('terser-webpack-plugin'))({
                //terser plugin v 2.3.8
                terserOptions: { output: { ascii_only: true } }
            })
        ],
    }


}