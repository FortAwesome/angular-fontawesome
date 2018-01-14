'use strict';

const ExtractText = require('extract-text-webpack-plugin');
const path = require('path');

function rootPath() {
    const rootDir = path.resolve(__dirname, '..');
    return relayArguments(path.resolve, rootDir, arguments);
}
exports.rootPath = rootPath;

function srcPath() {
    return relayArguments(rootPath, 'src', arguments);
};
exports.srcPath = srcPath;

function relayArguments(method, prefix, args) {
    const fullArguments = [prefix].concat(
        Array.prototype.slice.apply(args)
    );

    return method.apply(null, fullArguments);
}
exports.relayArguments = relayArguments;

exports.buildRules = (excludes, extraRules) => {
    let cssExtractExcludes = [srcPath()];
    let sassLoaderExcludes = [/node_modules/];
    let rules;

    excludes = excludes || {};
    if (excludes.cssExtract) {
        cssExtractExcludes = cssExtractExcludes.concat(excludes.cssExtract);
    }

    if (excludes.sassLoader) {
        sassLoaderExcludes = sassLoaderExcludes.concat(excludes.sassLoader);
    }

    rules = [
        {
            exclude: cssExtractExcludes,
            test: /\.css$/,
            use: ExtractText.extract({
                fallback: 'style-loader',
                use: 'css-loader?sourceMap'
            })
        },
        {
            exclude: /node_modules/,
            test: /\.css$/,
            use: ['css-to-string-loader', 'css-loader']
        },
        {
            exclude: sassLoaderExcludes,
            use: ['css-to-string-loader', 'css-loader', 'sass-loader'],
            test: /\.scss$/
        }
    ];

    if (extraRules) {
        rules = rules.concat(extraRules);
    }

    return rules;
};
