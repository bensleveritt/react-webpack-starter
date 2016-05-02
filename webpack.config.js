// webpack.config.js
const webpack = require('webpack'); // eslint-disable-line no-unused-vars
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const pkg = require('./package.json');

const SRC = `${__dirname}/src`;
const BUILD = `${__dirname}/build`;

module.exports = {
  context: SRC,
  entry: {
    app: './index.js',
    vendor: Object.keys(pkg.dependencies).filter((pkgName) => pkgName !== 'normalize.css'),
  },

  output: {
    filename: '[name].js',
    path: BUILD,
  },

  resolve: {
    extensions: ['', '.jsx', '.scss', '.js', '.json', '.css']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0', 'react'],
        },
      },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.jpg|png|svg$/, loader: 'url-loader?limit=8192' },
      { test: /\.json$/, loader: 'json-loader' }
    ],
  },

  node: {
    fs: 'empty',
  },

  plugins: [
    new CleanWebpackPlugin(BUILD),
    new HtmlWebpackPlugin({
      template: `${SRC}/template.ejs`,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
    }),
  ],

  devtool: 'source-map'
};
