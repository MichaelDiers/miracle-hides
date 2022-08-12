import { Config, HandlerParameters, Next } from './types';

const defaultConfig = require('./init-node-default-config.json');

const printUsage = (options: HandlerParameters) : void => {
  if (options.nextOptions.error) {
    console.error(options.nextOptions.error);
    console.error(options.nextOptions.stack);

    console.error(`Usage:
    npm init:node <folder> -- --help

    help: print this message
  `);
  }
}

const readConfig = (next: Next) : void => {
  const config : Config = {
    folder: process.argv.length > 2 ? process.argv[2] : '',
    help: process.argv.findIndex((arg) => arg.toUpperCase() === '--HELP') > -1,
    overwrite: process.argv.findIndex((arg) => arg.toUpperCase() === '--OVERWRITE') > -1,
  };

  if (!config.folder || config.help) {
    return next({ config: config, error: 'Missing parameters' });
  }

  console.info('using config:');
  Object.entries(config).forEach(([key, value]) => {
    console.log('  ', key, value);
  });
  
  return next({ config });
}

export {
  readConfig,
  printUsage,
}
