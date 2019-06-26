//https://medium.com/@hpux/webpack-4-in-production-how-make-your-life-easier-4d03e2e5b081


/*
  Shared webpack commands between prod / dev
*/

const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const distPath = path.join(__dirname, '../wwwroot/')
const entryPath = path.resolve(__dirname, '../index.js')

module.exports = {
  entry: entryPath,
  output: {
    path: distPath,
    filename: 'js/[name].js',
    publicPath: './'
  },

  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
    {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {minimize: true}
          }
        ]
    },{
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      },

    ]
  },
  //devtool: "cheap-module-eval-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      filename: "index.html"
    })
  ],

  //performance: { hints: false },

}
