var path = require('path');
var webpack = require('webpack');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app/js');
var BUILD_PATH = path.resolve(ROOT_PATH, 'app/build');

module.exports = {
    // devtool: 'eval-source-map',
    entry: {
        draw: path.resolve(APP_PATH, 'draw.js'),
        puzzle: path.resolve(APP_PATH, 'puzzle.js'),
        puzzle_canvas: path.resolve(APP_PATH, 'puzzle_canvas.js'),
        wheel: path.resolve(APP_PATH, 'wheel.js'),
        vendors: ['vue', 'underscore', 'konva']
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].js'
    },
    module: {
        perLoaders: [{
            test: /\.js?$/,
            include: APP_PATH,
            loader: 'jshint-loader'
        }],
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            include: APP_PATH,
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.vue$/,
            loader: 'vue'
        }]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     minimize: true
        // }),
        // new HtmlWebpackPlugin({
        //     filename: '[name].html'
        // }),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ]
};
