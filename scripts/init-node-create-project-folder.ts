import { HandlerParameters } from './types';
import { mkdir } from 'fs';

const createProjectFolder = (options: HandlerParameters) : void => {
  if (options.nextOptions.error) {
    return options.next(options.nextOptions);
  }

  mkdir(options.nextOptions.config.folder, { recursive: true }, (err) => {
    if (err) {
      return options.next({
        config: options.nextOptions.config,
        error: err.message,
        stack: err.stack
       });
    }

    console.info('Created project folder:', options.nextOptions.config.folder);
    return options.next(options.nextOptions);
  });
}

export default createProjectFolder;
