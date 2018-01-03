const fs = require('fs')
const path = require('path')
const glob = require('glob')
const rollup = require('rollup')
const uglify = require('rollup-plugin-uglify')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
const ngc = require('@angular/compiler-cli/src/main').main
const srcDir = path.join(__dirname, 'src/')
const distDir = path.join(__dirname, 'dist/')
const aotDir = path.join(__dirname, 'aot/')
const rollupConfig = {
  entry: `${srcDir}/main-aot.js`,
  sourceMap: false,
  format: 'iife',
  onwarn: function (warning) {
    // Skip certain warnings
    if (warning.code === 'THIS_IS_UNDEFINED') { return }
    // console.warn everything else
    console.warn(warning.message)
  },
  plugins: [
    nodeResolve({ jsnext: true, module: true }),
    commonjs({
      include: ['node_modules/rxjs/**']
    }),
    uglify()
  ]
}

build()

async function build () {
  try {
    await task('compile AOT config', _exec_ngc, [['-p', `./tsconfig.aot.json`]])
    await task('create dist dir', _recursiveMkDir, [distDir])
    await task('copy and rename index-aot.html', async () => {
      fs.createReadStream(path.join(srcDir, 'index-aot.html'))
        .pipe(fs.createWriteStream(path.join(distDir, 'index.html')))
    }, [])
    await task('copy assets', async () => {
      const assets = [
        'favicon.ico',
        'styles.css'
      ]
      return Promise.all(assets.map(asset => _relativeCopy(asset, srcDir, distDir)))
    }, [])
  } catch (e) {
    console.error('Build failed. See below for errors.\n')
    console.error(e)
    process.exit(1)
  }
}

// return Promise.resolve()
//   // Compile using ngc.
//   .then(() => ngc({ project: `./tsconfig.aot.json` }))
//   // Create dist dir.
//   .then(() => _recursiveMkDir(distDir))
//   // Copy files.
//   .then(() => {
//     // Copy and rename index-aot.html.
//     fs.createReadStream(path.join(srcDir, 'index-aot.html'))
//       .pipe(fs.createWriteStream(path.join(distDir, 'index.html')));
//
//     // Copy global stylesheets, images, etc.
//     const assets = [
//       'favicon.ico',
//       'styles.css'
//     ];
//
//     return Promise.all(assets.map(asset => _relativeCopy(asset, srcDir, distDir)));
//   })
//   // Bundle app.
//   .then(() => rollup.rollup(rollupConfig))
//   // Concatenate app and scripts.
//   .then(bundle => {
//     const appBundle = bundle.generate(rollupConfig);
//
//     const scripts = [
//       'node_modules/core-js/client/shim.min.js',
//       'node_modules/zone.js/dist/zone.min.js'
//     ];
//
//     let concatenatedScripts = scripts.map((script) => {
//       return fs.readFileSync(path.join(__dirname, script)).toString();
//     }).join('\n;');
//
//     concatenatedScripts = concatenatedScripts.concat('\n;', appBundle.code);
//
//     fs.writeFileSync(path.join(distDir, 'bundle.js'), concatenatedScripts);
//   });

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
async function _recursiveMkDir(dir) {
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
