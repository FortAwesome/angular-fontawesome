'use strict';

const copySync = require('fs-extra').copySync;
const ngPackagr = require('ng-packagr').ngPackagr;
const join = require('path').join;

return Promise.resolve()
  .then(() =>
    ngPackagr()
      .forProject(join(process.cwd(), 'src/package.json'))
      .build(),
  )
  .then(() => {
    copySync('README.md', join(process.cwd(), 'dist/README.md'));
  })
  .then(() => console.log('success'));
