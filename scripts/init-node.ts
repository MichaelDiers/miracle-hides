import createPackageJson from './init-node-create-package';
import createProjectFolder from './init-node-create-project-folder';
import createGitignore from './init-node-gitignore';
import { printUsage, readConfig } from './init-node-read-config';
import createVscode from './init-node-vscode';

readConfig(
  (nextOptions) => createProjectFolder({
    nextOptions,
    next: (nextOptions) => createGitignore({
      nextOptions,
      next: (nextOptions) => createPackageJson({
        nextOptions,
        next: (nextOptions) => createVscode({
          nextOptions,
          next: (nextOptions) => printUsage({
            nextOptions,
            next: () => {}
          }),
        }),     
      }),
    }),
  }),
);
