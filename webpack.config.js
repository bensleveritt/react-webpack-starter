/* eslint-disable import/no-extraneous-dependencies */
const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC = resolve(__dirname, 'src');
const BUILD = resolve(__dirname, 'build');

module.exports = (environmentOptions) => {
  const env = environmentOptions || {};
  return {
    context: SRC,
    entry: {
      app: './index.jsx',
    },
    output: {
      path: BUILD,
      filename: '[name].js',
    },
    module: {
      loaders: [
        { test: /\.jsx?$/, loader: 'babel-loader', exclude: /(node_modules)/ },
        { test: /\.scss$/,
          loaders: [
            'style-loader?sourceMap',
            'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
            'sass-loader',
          ],
        },
        // { test: /\.html$/, loader: 'html-loader' },
        // { test: /\.json$/, loader: 'json-loader' },
        // { test: /\.ttf|woff|woff2|eot$/, loader: 'file-loader' },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Alliance WG',
        template: resolve(SRC, 'template.ejs'),
      }),
      new webpack.NamedModulesPlugin(),
    ],
    resolve: {
      alias: {
        components: resolve(SRC, 'components'),
        layouts: resolve(SRC, 'layouts'),
        theme: resolve(SRC, 'theme'),
    //     utils: resolve(SRC, 'utils'),
      },
      extensions: ['.jsx', '.scss', '.js', '.json', '.css'],
    },
    devtool: env.prod ? 'source-map' : 'eval',
    devServer: {
      stats: 'errors-only',
      host: 'localhost',
      port: 3030,
      historyApiFallback: true,
    },
  };
};
