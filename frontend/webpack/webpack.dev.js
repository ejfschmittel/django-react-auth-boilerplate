
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path")
const distPath = path.join(__dirname, 'dist/')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: distPath,
    port: 3000,
    historyApiFallback: true,
    disableHostCheck: true, //remove WDS connection error
  },
});