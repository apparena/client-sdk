const webpack = require('webpack');
const path = require('path');
const config = require('./config');
const CleanPlugin = require('clean-webpack-plugin');
const mergeWithConcat = require('./util/mergeWithConcat');

const assetsFilenames = (config.env.production) ? '[name]' : '[name]';

let webpackConfig = {
    entry: {shim: './lib/shim/index.js'},
    target: 'web',
    output: {
        filename: `${assetsFilenames}.js`,
        path: config.paths.dist,
        libraryTarget: 'umd',
        library: 'apparena'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|dist|build)/,
                enforce: 'pre',
                use: {
                    loader: 'eslint-loader'
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'es2016'],
                        plugins: [
                            'transform-function-bind'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            test: /\.(js|jsx)$/,
            options: {
                eslint: {
                    configFile: './build/webpack/eslint.js',
                    useEslintrc: false,
                    failOnWarning: false,
                    failOnError: true
                }
            }
        }),
        new CleanPlugin([config.paths.dist], {
            exclude: ['frame.js', 'frame.js.map'],
            root: config.paths.root,
            verbose: false
        })
    ]
};

if (config.enabled.optimize) {
    webpackConfig = mergeWithConcat(webpackConfig, require('./webpack.config.optimize'));
}

module.exports = webpackConfig;