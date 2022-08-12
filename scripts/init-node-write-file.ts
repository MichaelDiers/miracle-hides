import { close, open, write } from 'fs';
import { HandlerParameters } from './types';

const writeFile = (options: HandlerParameters, file: string, content: string) : void => {
  if (options.nextOptions.error) {
    return options.next(options.nextOptions);
  }
  
  const mode = options.nextOptions.config.overwrite ? 'w' : 'wx';  
  open(file, mode, (err, fd) => {
    if (err) {
      if (err.code === 'EEXIST') {
        return options.next({ config: options.nextOptions.config, error: `${file} already exists` });
      }

      return options.next({ config: options.nextOptions.config, error: err.message, stack: err.stack });
    }

    try {
      write(fd, content, (err) => {
        if (err) {
          return options.next({ config: options.nextOptions.config, error: err.message, stack: err.stack });
        }
      });      
    } finally {
      close(fd, (err) => {
        if (err) {
          return options.next({ config: options.nextOptions.config, error: err.message, stack: err.stack });
        }
      });
    }
  });

  console.info('Created file', file);
  return options.next(options.nextOptions);
}

export default writeFile;
