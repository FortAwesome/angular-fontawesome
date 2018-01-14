'use strict';

const erectorUtils = require('erector-set/src/utils');
const fs = require('fs-extra');
const librarianUtils = require('angular-librarian/commands/utilities');
const path = require('path');
const rollup = require('rollup');
const rollupCommon = require('rollup-plugin-commonjs');
const rollupNodeResolve = require('rollup-plugin-node-resolve');
const rollupSourcemaps = require('rollup-plugin-sourcemaps');
const rollupUglify = require('rollup-plugin-uglify');

const rollupGlobals = require('./rollup-globals');

const doRollup = (libName, dirs) => {
    const nameParts = extractName(libName);
    const es5Entry = path.resolve(dirs.es5, `${nameParts.package}.js`);
    const es2015Entry = path.resolve(dirs.es2015, `${nameParts.package}.js`);
    const destinations = generateDestinations(dirs.dist, nameParts);
    const baseConfig = generateConfig({
        input: es5Entry,
        external: Object.keys(rollupGlobals),
        globals: rollupGlobals,
        name: librarianUtils.caseConvert.dashToCamel(nameParts.package),
        onwarn: function rollupOnWarn(warning) {
            // keeps TypeScript this errors down
            if (warning.code !== 'THIS_IS_UNDEFINED') {
                console.warn(warning.message);
            }
        },
        plugins: [
            rollupNodeResolve({
                jsnext: true,
                module: true
            }),
            rollupSourcemaps()
        ],
        sourcemap: true
    }, dirs.root);
    const fesm2015Config = Object.assign({}, baseConfig, {
        input: es2015Entry,
        output: {
            file: destinations.fesm2015,
            format: 'es'
        }
    });
    const fesm5Config = Object.assign({}, baseConfig, {
        output: {
            file: destinations.fesm5,
            format: 'es'
        }
    });
    const minUmdConfig = Object.assign({}, baseConfig, {
        output: {
            file: destinations.minUmd,
            format: 'umd'
        },
        plugins: baseConfig.plugins.concat([rollupUglify({})])
    });
    const umdConfig = Object.assign({}, baseConfig, {
        output: {
            file: destinations.umd,
            format: 'umd'
        }
    });

    const bundles = [
        fesm2015Config,
        fesm5Config,
        minUmdConfig,
        umdConfig
    ].map(config =>
        rollup.rollup(config)
            .then(bundle => bundle.write({
                file: config.output.file,
                format: config.output.format,
                ...config
            }))
        );

    return Promise.all(bundles);
};

const extractName = (libName) => {
    const isScoped = librarianUtils.checkIsScopedName(libName);
    const nameParts = {
        package: libName,
        scope: undefined
    };

    if (isScoped) {
        const parts = libName.split('/', 2);

        nameParts.package = parts[1];
        nameParts.scope = parts[0];
    }

    return nameParts;
};

const generateDestinations = (dist, nameParts) => {
    const bundleDest = path.resolve(dist, 'bundles');
    let fesmDest = path.resolve(dist);

    if (nameParts.scope) {
        fesmDest = path.resolve(fesmDest, nameParts.scope);
        fs.ensureDirSync(fesmDest);
    }

    return Object.freeze({
        fesm2015: path.resolve(fesmDest, `${nameParts.package}.js`),
        fesm5: path.resolve(fesmDest, `${nameParts.package}.es5.js`),
        minUmd: path.resolve(bundleDest, `${nameParts.package}.umd.min.js`),
        umd: path.resolve(bundleDest, `${nameParts.package}.umd.js`)
    });
};

const generateConfig = (base, rootDir) => {
    let commonjsIncludes = ['node_modules/rxjs/**'];
    const customLocation = path.resolve(rootDir, 'configs', 'rollup.config.js');

    if (fs.existsSync(customLocation)) {
        const custom = require(customLocation);
        const external = (custom.external || []).filter((external) => base.external.indexOf(external) === -1);
        const includes = (custom.commonjs || []).filter((include) => commonjsIncludes.indexOf(include) === -1);

        base.external = base.external.concat(external);
        base.globals = erectorUtils.mergeDeep(custom.globals, base.globals);
        commonjsIncludes = commonjsIncludes.concat(includes);
    }

    base.plugins.unshift(
        rollupCommon({
            include: commonjsIncludes
        })
    );

    return base;
};

module.exports = doRollup;
