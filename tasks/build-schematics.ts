import * as fs from 'fs';

fs.copyFileSync('projects/schematics/src/collection.json', 'dist/angular-fontawesome/schematics/collection.json');
fs.copyFileSync('projects/schematics/src/ng-add/schema.json', 'dist/angular-fontawesome/schematics/ng-add/schema.json');
