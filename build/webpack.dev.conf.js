/**
 * @file webpack.dev.conf
 * @author Onepixel<onepixel@126.com>
 */

const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  entry: {
    app: './test/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  devServer: {
    port: '8080',
    host: '0.0.0.0',
    disableHostCheck: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    }),
  ],
  devtool: '#cheap-module-eval-source-map',
});
