const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,
    devtool: 'inline-source-map',
    entry: './main.js',
    output: {
        path: './',
        filename: 'index.js'
    },
    plugins: [
        new ExtractTextPlugin('index.css', { allChunks: true }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    devServer: {
        inline: true,
        port: 8080
    },
    module: {
        loaders: [
            {
                test: /(\.js|\.jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: { presets: ['es2015', 'stage-0', 'react'] }
            }, {
                test: /(\.scss|\.css)$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
            }
        ]
    },
    postcss: [autoprefixer],
};
