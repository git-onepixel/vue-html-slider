/**
 * @file webpack.dev.conf
 * @author Onepixel<onepixel@126.com>
 */

const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
  entry: {
    app: './test/index.js',
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
