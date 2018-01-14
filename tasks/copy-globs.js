'use strict';

const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');

const copy = (globs, from, to) => {
    if (typeof globs === 'string') {
        globs = [globs];
    }

    fs.ensureDir(to);
    return Promise.all(
        globs.map((fileGlob) => copyGlob(fileGlob, from, to))
    );
};

const copyGlob = (fileGlob, from, to) => new Promise((resolve, reject) => {
    glob(fileGlob, { cwd: from, nodir: true }, (error, files) => {
        if (error) reject(error);

        files.forEach((file) => {
            const origin = path.resolve(from, file);
            const destination = path.resolve(to, file);
            const contents = fs.readFileSync(origin, 'utf8');

            fs.ensureDirSync(path.dirname(destination));
            fs.writeFileSync(destination, contents);
        });

        resolve();
    });
});

module.exports = copy;
