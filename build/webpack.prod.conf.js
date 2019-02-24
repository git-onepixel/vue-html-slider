/**
 * @file webpack.prod.conf
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const pkg = require('../package.json');

const banner = `${pkg.name} v${pkg.version}\n${pkg.copyright} ${pkg.author}\n${pkg.released}`;

module.exports = merge(baseWebpackConfig, {
    entry: {
        'vue-html-slider': './src/slider'
    },
    output: {
        path: path.join(__dirname, '../dist'),
        library: pkg.library,
        libraryTarget: 'umd',
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.BannerPlugin(banner)
    ]
});