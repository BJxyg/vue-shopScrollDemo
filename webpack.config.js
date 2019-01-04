const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'main': './src/main.js'
    },
    output: {
        path: path.resolve('./dist'),
        filename: 'build.js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json']
    },
    watch: true,
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(jpg|png|gif|svg)$/,
            loader: 'url-loader?limit:5000'
        }, {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
                presets: ['env'],
                plugins: ['transform-runtime']
            },
            exclude: /node_modules/
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": "jquery"
        })
    ]
}