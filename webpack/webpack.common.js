'use strict';

const fs = require('fs');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ContextReplacementPlugin = webpack.ContextReplacementPlugin;
const LoaderOptionsPlugin = webpack.LoaderOptionsPlugin;

const webpackUtils = require('./webpack.utils');

const getCommonConfig = (type) => {
    const tsconfigType = type !== 'dev' ? `.${ type }` : '';

    return {
        module: {
            rules: [
                {
                    exclude: /node_modules/,
                    test: /\.ts$/,
                    use: [
                        'awesome-typescript-loader?configFileName=' + webpackUtils.rootPath(`tsconfig${ tsconfigType }.json`),
                        'angular2-template-loader?keepUrl=true'
                    ]
                },
                { test: /\.html$/, use: 'raw-loader' },
                {
                    use: ['url-loader?limit=10000'],
                    test: /\.(woff2?|ttf|eot|svg|jpg|jpeg|json|gif|png)(\?v=\d+\.\d+\.\d+)?$/
                }
            ]
        },
        performance: { hints: false },
        plugins: [
            new ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)(@angular|esm5)/,
                __dirname
            ),
            new LoaderOptionsPlugin({
                debug: true,
                options: {
                    emitErrors: true
                }
            }),
            new ExtractTextPlugin("*.css")
        ],
        resolve: {
            extensions: [ '.js', '.ts' ],
            modules: [ webpackUtils.rootPath('node_modules') ]
        }
    };
};

module.exports = (type, typeConfig) => {
    const configs = [getCommonConfig(type), typeConfig];
    const customConfigPath = webpackUtils.rootPath('configs', `webpack.${ type }.js`);

    if (fs.existsSync(customConfigPath)) {
        let customConfig = require(customConfigPath);

        if (Object.prototype.toString.call(customConfig) === '[object Function]') {
            customConfig = customConfig();
        }

        configs.push(customConfig);
    }

    return webpackMerge.apply(null, configs);
};
