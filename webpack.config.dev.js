const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, './app/main')
  ],
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: true
    }),
    new webpack.DefinePlugin({
      __DEV__: true,
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],
  devtool: 'inline-source-map',
  // devServer: {
  //   hot: true,
  //   proxy: {
  //     '*': 'localhost:' + (process.env.PORT || 3000)
  //   },
  //   host: 'localhost'
  // }
};