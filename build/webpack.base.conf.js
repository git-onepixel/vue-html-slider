/**
 * @file webpack.base.conf
 */

module.exports = {
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(css|less)$/,
                loader: 'postcss-loader!less-loader!css-loader!style-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                query: {
                    limit: 8192,
                    name: 'img/[name].[hash:8].[ext]'
                } 
            }
        ]
    }
};

