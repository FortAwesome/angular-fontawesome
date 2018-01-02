'use strict'

const fs = require('fs')
const path = require('path')
const glob = require('glob')
const camelCase = require('camelcase')
const ngc = require('@angular/compiler-cli/src/main').main
const rollup = require('rollup')
const uglify = require('rollup-plugin-uglify')
const sourcemaps = require('rollup-plugin-sourcemaps')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const inlineResources = require('./inline-resources')
const libName = require('./package.json').name
const rootFolder = path.join(__dirname)
const compilationFolder = path.join(rootFolder, 'out-tsc')
const srcFolder = path.join(rootFolder, 'src/lib')
const distFolder = path.join(rootFolder, 'dist')
const tempLibFolder = path.join(compilationFolder, 'lib')
const es5OutputFolder = path.join(compilationFolder, 'lib-es5')
const es2015OutputFolder = path.join(compilationFolder, 'lib-es2015')
const licenseFile = 'LICENSE.txt'
const readmeFile = 'README.md'
const packageFile = 'package.json'

build()

async function build() {
  try {
    await task('copy library to temporary folder', _relativeCopy, [`**/*`, srcFolder, tempLibFolder])
    await task('inline resources', inlineResources, [tempLibFolder])
    await task('compile ES2015', _exec_ngc, [['-p', `${tempLibFolder}/tsconfig.lib.json`]])
    await task('compile ES5', _exec_ngc, [['-p', `${tempLibFolder}/tsconfig.es5.json`]])
    await task('copy type definitions', _relativeCopy, ['**/*.d.ts', es2015OutputFolder, distFolder])
    await task('copy metadata', _relativeCopy, ['**/*.metadata.json', es2015OutputFolder, distFolder])
    await task('create bundles', bundle, [])
    await task(`copy ${licenseFile}`, _relativeCopy, [licenseFile, rootFolder, distFolder])
    await task(`copy ${packageFile}`, _relativeCopy, [packageFile, rootFolder, distFolder] )
    await task(`copy ${readmeFile}`, _relativeCopy, [readmeFile, rootFolder, distFolder])
    console.log('done')
  }
  catch(e) {
    console.error('Build failed. See below for errors.\n');
    console.error(e);
    process.exit(1);
  }
}

// Copy files maintaining relative paths.
async function _relativeCopy(fileGlob, from, to) {
  return new Promise((resolve, reject) => {
    glob(fileGlob, { cwd: from, nodir: true }, (err, files) => {
      if (err) reject(err)
      files.forEach(file => {
        const origin = path.join(from, file)
        const dest = path.join(to, file)
        const data = fs.readFileSync(origin, 'utf-8')
        _recursiveMkDir(path.dirname(dest))
        fs.writeFileSync(dest, data)
        resolve()
      })
    })
  })
}

// Recursively create a dir.
function _recursiveMkDir(dir) {
  if (!fs.existsSync(dir)) {
    _recursiveMkDir(path.dirname(dir))
    fs.mkdirSync(dir)
  }
}

async function task(label, func, args) {
  const rc = await func(...args)
  console.log(label)
  return rc
}

async function _exec_ngc(args) {
  return await ngc(args, error => {
    if (error) {
      throw new Error(`ngc compilation failed: ${error}`)
    }})
}

async function bundle() {
  // Base configuration.
  const es5Entry = path.join(es5OutputFolder, `${libName}.js`);
  const es2015Entry = path.join(es2015OutputFolder, `${libName}.js`);
  const rollupBaseConfig = {
    moduleName: camelCase(libName),
    sourceMap: true,
    // ATTENTION:
    // Add any dependency or peer dependency your library to `globals` and `external`.
    // This is required for UMD bundle users.
    globals: {
      // The key here is library name, and the value is the the name of the global variable name
      // the window object.
      // See https://github.com/rollup/rollup/wiki/JavaScript-API#globals for more.
      '@angular/core': 'ng.core',
      '@fortawesome/fontawesome': 'fontawesome'
    },
    external: [
      // List of dependencies
      // See https://github.com/rollup/rollup/wiki/JavaScript-API#external for more.
      '@angular/core',
      '@fortawesome/fontawesome'
    ],
    plugins: [
      commonjs({
        include: ['node_modules/rxjs/**']
      }),
      sourcemaps(),
      nodeResolve({ jsnext: true, module: true })
    ]
  };

  // UMD bundle.
  const umdConfig = Object.assign({}, rollupBaseConfig, {
    entry: es5Entry,
    dest: path.join(distFolder, `bundles`, `${libName}.umd.js`),
    format: 'umd',
  });

  // Minified UMD bundle.
  const minifiedUmdConfig = Object.assign({}, rollupBaseConfig, {
    entry: es5Entry,
    dest: path.join(distFolder, `bundles`, `${libName}.umd.min.js`),
    format: 'umd',
    plugins: rollupBaseConfig.plugins.concat([uglify({})])
  });

  // ESM+ES5 flat module bundle.
  const fesm5config = Object.assign({}, rollupBaseConfig, {
    entry: es5Entry,
    dest: path.join(distFolder, `${libName}.es5.js`),
    format: 'es'
  });

  // ESM+ES2015 flat module bundle.
  const fesm2015config = Object.assign({}, rollupBaseConfig, {
    entry: es2015Entry,
    dest: path.join(distFolder, `${libName}.js`),
    format: 'es'
  });

  const allBundles = [
    umdConfig,
    minifiedUmdConfig,
    fesm5config,
    fesm2015config
  ].map(cfg => rollup.rollup(cfg).then(bundle => bundle.write(cfg)));

  return Promise.all(allBundles)
}
