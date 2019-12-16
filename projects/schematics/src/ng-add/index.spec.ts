import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { Schema } from './schema';

const collectionPath = path.join(__dirname, '../collection.json');

describe('ng-add', () => {
  it('adds dependencies to package.json', async () => {
    const { runner, appTree } = await setup();

    const tree = await runner.runSchematicAsync<Schema>('ng-add', {}, appTree).toPromise();

    const packageJson = JSON.parse(tree.readContent('package.json'));
    expect(packageJson.dependencies).toBeDefined();

    const dependencies = packageJson.dependencies;

    expect(dependencies['@fortawesome/fontawesome-svg-core']).toBeDefined();
    expect(dependencies['@fortawesome/angular-fontawesome']).toBeDefined();
  });

  it('adds FontAwesomeModule import to the AppModule', async () => {
    const { runner, appTree } = await setup();

    const tree = await runner.runSchematicAsync<Schema>('ng-add', {}, appTree).toPromise();

    const contents = tree.readContent('src/app/app.module.ts');

    expect(contents).toContain('import { FontAwesomeModule }');
  });

  it('installs @fortawesome/free-solid-svg-icons package by default', async () => {
    const { runner, appTree } = await setup();

    const tree = await runner.runSchematicAsync<Schema>('ng-add', {}, appTree).toPromise();

    const packageJson = JSON.parse(tree.readContent('package.json'));
    expect(packageJson.dependencies).toBeDefined();

    const dependencies = packageJson.dependencies;
    expect(dependencies['@fortawesome/free-solid-svg-icons']).toBeDefined();
  });

  it('allows to install several @fortawesome/*-svg-icons packages', async () => {
    const { runner, appTree } = await setup();

    const tree = await runner
      .runSchematicAsync<Schema>(
        'ng-add',
        {
          project: 'test-app',
          iconPackages: ['free-solid', 'free-brands', 'free-regular'],
        },
        appTree,
      )
      .toPromise();

    const packageJson = JSON.parse(tree.readContent('package.json'));
    expect(packageJson.dependencies).toBeDefined();

    const dependencies = packageJson.dependencies;
    expect(dependencies['@fortawesome/free-solid-svg-icons']).toBeDefined();
    expect(dependencies['@fortawesome/free-brands-svg-icons']).toBeDefined();
    expect(dependencies['@fortawesome/free-regular-svg-icons']).toBeDefined();
  });

  it('allows to install no icon packages', async () => {
    const { runner, appTree } = await setup();

    const tree = await runner
      .runSchematicAsync<Schema>(
        'ng-add',
        {
          project: 'test-app',
          iconPackages: [],
        },
        appTree,
      )
      .toPromise();

    const packageJson = JSON.parse(tree.readContent('package.json'));
    expect(packageJson.dependencies).toBeDefined();

    const dependencies = packageJson.dependencies;
    expect(dependencies['@fortawesome/free-solid-svg-icons']).not.toBeDefined();
  });
});

const setup = async () => {
  const runner = new SchematicTestRunner('schematics', collectionPath);

  const appTree = await runner
    .runExternalSchematicAsync(
      '@schematics/angular',
      'ng-new',
      {
        name: 'test-app',
        version: '9.0.0-rc.6',
        directory: '.',
      },
      Tree.empty(),
    )
    .toPromise();

  return { runner, appTree };
};
