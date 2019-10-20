/**
 * @file webpack.dev.conf
 * @author Onepixel<onepixel@126.com>
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
  entry: {
    app: './test/index.js',
  },

  output: {
    path: path.join(__dirname, '../docs'),
    filename: '[name].js?[hash:8]',
  },

  resolve: {
    alias: {
      'vue-html-slider$': '../dist/vue-html-slider'
    }
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      comments: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new CopyWebpackPlugin([
      {
        from: 'public',
      },
    ]),
  ],
});
