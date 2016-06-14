const path = require('path');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const bourbon = require('bourbon').includePaths;

const ENV = process.env.NODE_ENV || 'development';

// Prod and Dev webpack configs
const webpackDev = require('./webpack.config.dev');
const webpackProd = require('./webpack.config.prod');

const config = {
  context: path.join(__dirname),
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[hash].js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass?includePaths[]=' + bourbon + ',' + (path.resolve(__dirname, "./node_modules")))
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpg|jpeg|svg|woff)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: './public/images/[name]-[hash].[ext]'
        }
      },
      {
        test: /\.(woff2|eot|ttf|gif)?$/,
        loader: 'file'
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name]-[hash].css')
  ],
  resolve: {
    modulesDirectories: ['node_modules', './src/components'],
    alias: {
      'react': path.resolve('./node_modules/react')
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
    fallback: path.join(__dirname, 'node_modules')
  }
};

if (ENV === 'development') {
  module.exports = webpackMerge(config, webpackDev);
}

if (ENV === 'production') {
  module.exports = webpackMerge(config, webpackProd);
}
