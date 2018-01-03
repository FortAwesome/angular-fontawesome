const fs = require('fs')
const path = require('path')

const parentDistDir = path.resolve('../dist')
const targetLibraryLink = path.resolve('./node_modules/quickstart-lib')

try {
  fs.accessSync(targetLibraryLink, fs.constants.F_OK)
  console.log('library already linked')
} catch (e) {
  fs.symlinkSync(parentDistDir, targetLibraryLink)
  console.log('library linked')
}
