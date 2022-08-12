import { join } from 'path';
import writeFile from './init-node-write-file';
import { HandlerParameters } from './types';

const GITIGNORE_DEFAULT = [
  'node_modules',  
];

const createGitignore = (options: HandlerParameters) : void => {
  if (options.nextOptions.error) {
    return options.next(options.nextOptions);
  }

  const gitignoreFile = join(options.nextOptions.config.folder, '.gitignore');
  const content = GITIGNORE_DEFAULT.join('\r\n');
  writeFile(options, gitignoreFile, content);
}

export default createGitignore;
