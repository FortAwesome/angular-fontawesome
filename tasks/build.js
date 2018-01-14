'use strict';

const fs = require('fs-extra');
const ngc = require('@angular/compiler-cli/src/main').main;
const librarianUtils = require('angular-librarian/commands/utilities');
const path = require('path');

const copyGlobs = require('./copy-globs');
const copyToBuild = require('./copy-build');
const inlineResources = require('./inline-resources');
const rollup = require('./rollup');

const colorize = librarianUtils.colorize;
const execute = librarianUtils.execute;
const rootDir = path.resolve(__dirname, '..');
const buildDir = path.resolve(rootDir, 'build');
const distDir = path.resolve(rootDir, 'dist');
const libName = require(path.resolve(rootDir, 'package.json')).name;
const srcDir = path.resolve(rootDir, 'src');
const tscDir = path.resolve(rootDir, 'out-tsc');
const es5Dir = path.resolve(tscDir, 'lib-es5');
const es2015Dir = path.resolve(tscDir, 'lib-es2015');

const runPromise = (message, fn) => {
    return function() {
        console.info(colorize.colorize(message, 'cyan'));
        return fn().then(complete);
    };
};

const complete = (depth = 0) => {
    const spaces = ' '.repeat(depth);
    console.info(colorize.colorize(`${ spaces }> Complete`, 'green'));
};
const evaluateExitCode = (exitCode) => {
    return exitCode === 0 ? Promise.resolve() : Promise.reject();
};
const getAngularCompilerVersion = () => {
    const npm = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';
    const lines = execute.execute(npm, ['list', '--depth=0', '@angular/compiler']).split(/\r?\n/);
    const compilerLine = lines.find((line) => line.indexOf('@angular/compiler@') !== -1);
    let version;

    if (compilerLine) {
        version = compilerLine.match(/\bangular\/compiler@[^\s]+\s?/) || [''];
        version = version[0].trim().replace('angular/compiler@', '');
    }

    if (!version || version === '(empty)') {
        Promise.reject('Angular Compiler is not installed!');
    }

    return version;
};
const compileCode = () => Promise.all([2015, 5].map((type) => {
    const compilerVersion = getAngularCompilerVersion();
    const majorCompilerVersion = +compilerVersion.split('.')[0];

    if (majorCompilerVersion >= 5) {
        const exitCode = ngc(['--project', path.resolve(rootDir, `tsconfig.es${ type }.json`)]);
        return evaluateExitCode(exitCode);
    } else {
        ngc({ project: path.resolve(rootDir, `tsconfig.es${ type }.json`)})
            .then((exitCode) => 
            evaluateExitCode(exitCode)
        )
    }
}));
const copyMetadata = () =>
    copyGlobs(['**/*.d.ts', '**/*.metadata.json'], es2015Dir, distDir);
const copyPackageFiles = () =>
    copyGlobs(['.npmignore', 'package.json', 'README.md'], rootDir, distDir)
        .then(() => {
            const contents = fs.readFileSync(path.resolve(distDir, 'package.json'), 'utf8');

            return fs.writeFileSync(path.resolve(distDir, 'package.json'),  contents.replace('"dependencies":', '"peerDependencies":'));
        });
const copySource = () => copyGlobs('**/*', srcDir, buildDir);
const doInlining = () => inlineResources(buildDir, 'src');
const rollupBundles = () => rollup(libName, {
    dist: distDir,
    es2015: es2015Dir,
    es5: es5Dir,
    root: rootDir
});

return Promise.resolve()
    .then(runPromise('Copying `src` files into `build`', copySource))
    .then(runPromise('Inlining resources', doInlining))
    .then(runPromise('Compiling code', compileCode))
    .then(runPromise('Copying typings + metadata to `dist`', copyMetadata))
    .then(runPromise('Generating bundles via rollup', rollupBundles))
    .then(runPromise('Copying package files to `dist`', copyPackageFiles))
    .catch((error) => {
        console.error('\x1b[31m%s\x1b[0m', '> Build failed\n');
        console.error(error);
        process.exit(1);
    });
