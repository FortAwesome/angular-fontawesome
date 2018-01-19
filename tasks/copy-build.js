'use strict';

const fs = require('fs-extra');

// copy all src files -> build
const copyToBuild = (buildDir, sourceDir) => {
    fs.ensureDirSync(buildDir);
    fs.emptyDirSync(buildDir);
    fs.copySync(sourceDir, buildDir);
};

module.exports = copyToBuild;

if (!module.parent) {
    copyToBuild('./build', './src');
}
