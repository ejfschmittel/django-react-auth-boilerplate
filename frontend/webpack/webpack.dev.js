
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path")
const distPath = path.join(__dirname, '../wwwroot/')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    chunkFilename: 'js/[name].chunk.js'
  },
  devServer: {
    open: true,
    publicPath: "/",
    contentBase: distPath,
    port: 3000,
    historyApiFallback: true,
    disableHostCheck: true, //remove WDS connection error
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    },{
      test: /\.s?css$/i,
      use: ['style-loader', 'css-loader?sourceMap=true', 'sass-loader']
    }]
  }


});