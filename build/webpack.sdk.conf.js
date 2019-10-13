/**
 * @file webpack.prod.conf
 * @author Onepixel<onepixel@126.com>
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const pkg = require('../package.json');

const license = `Released under the ${pkg.license} License.`;
const copyright = `${pkg.copyright}, ${pkg.author.name}<${pkg.author.email}>`;
const banner = `${pkg.name} v${pkg.version}\n${pkg.homepage}\n${copyright}\n${license}`;

module.exports = merge(baseWebpackConfig, {
  entry: {
    'vue-html-slider': './src/index.js',
  },
  output: {
    path: path.join(__dirname, '../dist'),
    library: pkg.library,
    libraryTarget: 'umd',
    filename: '[name].js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.BannerPlugin(banner),
  ],
});
