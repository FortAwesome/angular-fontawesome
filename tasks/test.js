'use strict';

const fs = require('fs');
const path = require('path');
const Server = require('karma').Server;

function run(type) {
    const config = getConfig(type);
    const server = new Server(config, function(exitCode) {
        process.exit(exitCode);
    });

    server.start();
}

function getConfig(type) {
    switch (type) {
        case 'headless':
        case 'hl':
        case 'h':
            return getHeadlessConfig();
        case 'all':
        case 'a':
            return getAllConfig();
        case 'watch':
        case 'w':
            return getWatchConfig();
        default:
            return getSingleConfig();
    }
}

function getSingleConfig() {
    let config = getHeadlessConfig();

    config.singleRun = true;

    return config;
}

function getHeadlessConfig() {
    let config = getAllConfig();

    config.browsers = ['PhantomJS'];

    return config;
}

function getWatchConfig() {
    let config = getAllConfig(true);

    config.browsers = ['Chrome'];

    return config;
}

const getAllConfig = (watch) => ({
    configFile: path.resolve(__dirname, '..', 'karma.conf.js'),
    webpack: require(path.resolve(__dirname, '..', 'webpack', 'webpack.test.js'))(watch),
});

module.exports = run;

if (!module.parent) {
    run(process.argv[2]);
}
