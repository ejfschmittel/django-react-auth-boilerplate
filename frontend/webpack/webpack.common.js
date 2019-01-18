//https://medium.com/@hpux/webpack-4-in-production-how-make-your-life-easier-4d03e2e5b081


/*
  Shared webpack commands between prod / dev
*/

const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const distPath = path.join(__dirname, '../dist/')
const entryPath = './index.js'

module.exports = {
  entry: entryPath,
  output: {
    path: distPath,
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    },{
      test: /\.scss$/,
      use: [
        "style-loader",
        "css-loader",
        "sass-loader"
      ]
    },{
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {minimize: true}
          }
        ]
      }
    ]
  },
  //devtool: "cheap-module-eval-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "./index.html"
    })
  ],

  //performance: { hints: false },

}
