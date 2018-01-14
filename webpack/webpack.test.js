'use strict';

const webpack = require('webpack');

const SourceMapDevToolPlugin = webpack.SourceMapDevToolPlugin;
const webpackCommon = require('./webpack.common');
const webpackUtils = require('./webpack.utils');

module.exports = (watch) => {
    return webpackCommon('test', {
        devtool: watch ? 'inline-source-map' : 'cheap-module-eval-source-map',
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: ['raw-loader', 'css-loader', 'sass-loader']
                },
                {
                    enforce: 'pre',
                    exclude: /node_modules/,
                    test: /\.ts$/,
                    use: 'tslint-loader'
                },
                {
                    enforce: 'post',
                    exclude: [
                        /node_modules/,
                        /\.(e2e|spec\.)ts$/
                    ],
                    test: /\.ts$/,
                    use: 'istanbul-instrumenter-loader?esModules=true'
                }
            ]
        },
        plugins: [
            new SourceMapDevToolPlugin({
                filename: null,
                test: /\.ts$/
            })
        ],
        resolve: {
            modules: [ webpackUtils.srcPath() ],
            moduleExtensions: ['-loader']
        }
    });
};
