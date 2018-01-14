'use strict';

const childProcess = require('child_process');

module.exports = (type) => {
    const extraArgument = getCommand(type);

    return new Promise((resolve, reject) => {
        try {
            const output = childProcess.spawnSync(
                'np',
                ['--no-publish'].concat(extraArgument),
                { stdio: 'inherit' }
            );

            if (output.error) {
                throw output.error;
            } else if (output.status !== 0) {
                throw new Error('Execution of `np` errored, see above for more information.');
            } else {
                resolve();
            }
        } catch (error) {
            process.stderr.write(error.message);
            reject(error.message);
            process.exit(1);
        }
    });
};

const getCommand = (type) => {
    switch (type) {
        case 'nc':
        case 'no-cleanup':
            return '--no-cleanup';
        case 'y':
        case 'yolo':
            return '--yolo';
        default:
            return [];
    }
}

if (!module.parent) {
    return module.exports(process.argv[2]);
}
