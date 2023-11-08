import { workspaces } from '@angular-devkit/core';
import { chain, Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  createSourceFile,
  ScriptTarget,
} from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import { addPackageJsonDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { getAppModulePath, isStandaloneApp } from '@schematics/angular/utility/ng-ast-utils';
import { getMainFilePath } from '@schematics/angular/utility/standalone/util';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { Schema } from './schema';
import { angularFontawesomeVersion, iconPackVersion, v5 } from './versions';

export default function (options: Schema): Rule {
  return chain([
    (tree: Tree, context: SchematicContext) => {
      addPackageJsonDependency(tree, {
        type: NodeDependencyType.Default,
        name: '@fortawesome/fontawesome-svg-core',
        version: options.version === '6' ? iconPackVersion : v5.svgCoreVersion,
      });

      addPackageJsonDependency(tree, {
        type: NodeDependencyType.Default,
        name: '@fortawesome/angular-fontawesome',
        version: angularFontawesomeVersion,
      });

      const iconPackages = options.iconPackages != null ? options.iconPackages : ['free-solid'];
      for (const pack of iconPackages) {
        addPackageJsonDependency(tree, {
          type: NodeDependencyType.Default,
          name: `@fortawesome/${pack}-svg-icons`,
          version: options.version === '6' ? iconPackVersion : v5.iconPackVersion,
        });
      }

      context.addTask(new NodePackageInstallTask());

      return tree;
    },
    addModule(options),
  ]);
}

function addModule(options: Schema): Rule {
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);
    const projectName = options.project as string;
    const project = workspace.projects.get(projectName);
    if (project == null) {
      throw new SchematicsException(`Project with name ${projectName} does not exist.`);
    }
    const mainPath = await getMainFilePath(host, projectName);
    if (!isStandaloneApp(host, mainPath)) {
      const modulePath = getAppModulePath(host, mainPath);
      const moduleSource = getSourceFile(host, modulePath);
      const changes = addImportToModule(
        moduleSource,
        modulePath,
        'FontAwesomeModule',
        '@fortawesome/angular-fontawesome',
      );
      const recorder = host.beginUpdate(modulePath);
      changes.forEach((change) => {
        if (change instanceof InsertChange) {
          recorder.insertLeft(change.pos, change.toAdd);
        }
      });
      host.commitUpdate(recorder);
    }
  };
}

function getSourceFile(host: Tree, path: string) {
  const buffer = host.read(path);
  if (!buffer) {
    throw new SchematicsException(`Could not find ${path}.`);
  }
  const content = buffer.toString('utf-8');
  return createSourceFile(path, content, ScriptTarget.Latest, true);
}

export function getProjectTargetOptions(project: workspaces.ProjectDefinition, buildTarget: string) {
  const buildTargetObject = project.targets.get(buildTarget);
  if (buildTargetObject && buildTargetObject.options) {
    return buildTargetObject.options;
  }

  throw new SchematicsException(`Cannot determine project target configuration for: ${buildTarget}.`);
}
