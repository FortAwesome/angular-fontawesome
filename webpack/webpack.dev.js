'use strict';

const HtmlWebpack = require('html-webpack-plugin');
const webpack = require('webpack');

const ChunkWebpack = webpack.optimize.CommonsChunkPlugin;
const webpackCommon = require('./webpack.common');
const webpackUtils = require('./webpack.utils');

const entryPoints = [
    'vendor',
    'scripts',
    'styles',
    'app'
];
const examplePath = function examples() {
    return webpackUtils.relayArguments(
        webpackUtils.rootPath,
        'examples',
        arguments
    );
};

module.exports = webpackCommon('dev', {
    devServer: {
        contentBase: webpackUtils.rootPath('dist'),
        port: 9000
    },
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: [ examplePath('example.main') ],
        scripts: [],
        vendor: [ webpackUtils.srcPath('vendor') ],
        styles: [ examplePath('styles.scss') ]
    },
    module: {
        rules: webpackUtils.buildRules({
            cssExtract: examplePath(),
            sassLoader: examplePath('styles.scss')
        }, {
            include: examplePath(),
            test: /styles\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        })
    },
    output: {
        filename: '[name].bundle.js',
        path: webpackUtils.rootPath('dist')
    },
    plugins: [
        new ChunkWebpack({
            filename: 'vendor.bundle.js',
            minChunks: Infinity,
            name: 'vendor'
        }),
        new HtmlWebpack({
            // shameless/shamefully stolen from Angular CLI
            chunksSortMode: function(left, right) {
                const leftIndex = entryPoints.indexOf(left.names[0]);
                const rightIndex = entryPoints.indexOf(right.names[0]);
                let direction = 0;

                if (leftIndex > rightIndex) {
                    direction = 1;
                } else if (leftIndex < rightIndex) {
                    direction = -1;
                }

                return direction;
            },
            filename: 'index.html',
            inject: 'body',
            template: examplePath('index.html')
        })
    ]
});

