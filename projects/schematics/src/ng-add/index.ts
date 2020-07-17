import { WorkspaceProject } from '@angular-devkit/core/src/experimental/workspace';
import { chain, Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, TslintFixTask } from '@angular-devkit/schematics/tasks';
import {
  createSourceFile,
  ScriptTarget,
} from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import { getWorkspace } from '@schematics/angular/utility/config';
import { addPackageJsonDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { Schema } from './schema';
import { angularFontawesomeVersion, iconPackVersion, svgCoreVersion } from './versions';

export default function (options: Schema): Rule {
  return chain([
    (tree: Tree, context: SchematicContext) => {
      addPackageJsonDependency(tree, {
        type: NodeDependencyType.Default,
        name: '@fortawesome/fontawesome-svg-core',
        version: svgCoreVersion,
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
          version: iconPackVersion,
        });
      }

      context.addTask(new NodePackageInstallTask());

      return tree;
    },
    addModule(options.project),
  ]);
}

function addModule(projectName?: string): Rule {
  return (host: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(host);
    const project = workspace.projects[projectName || workspace.defaultProject!];
    const buildOptions = getProjectTargetOptions(project, 'build');
    const modulePath = getAppModulePath(host, buildOptions.main);
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

    /* tslint is required to add a tslint fix task */
    try {
      require('tslint');
      context.addTask(new TslintFixTask(modulePath, {}));
    } catch (err) {
      context.logger.warn('Formatting was skipped because tslint is not installed.');
    }

    return host;
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

export function getProjectTargetOptions(project: WorkspaceProject, buildTarget: string) {
  if (project.targets && project.targets[buildTarget] && project.targets[buildTarget].options) {
    return project.targets[buildTarget].options;
  }

  if (project.architect && project.architect[buildTarget] && project.architect[buildTarget].options) {
    return project.architect[buildTarget].options;
  }

  throw new SchematicsException(`Cannot determine project target configuration for: ${buildTarget}.`);
}
