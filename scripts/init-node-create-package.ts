import { existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import { createInterface } from 'readline';
import { Config, HandlerParameters } from './types';

const createPackageJson = (options: HandlerParameters) : void => {
  const config : Config = options.nextOptions.config;  
  const packageJsonFile = join(config.folder, 'package.json');

  if (config.overwrite || !existsSync(packageJsonFile)) {
    const commandLine = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const packageJson = {
      name: config.folder.replace(/^.*[\\\/]/, ''),
      version: "1.0.0",
      description: "",
      main: "index.js",
      scripts: {
        test: "echo \"Error: no test specified\" && exit 1"
      },
      repository: {
        type: "git",
        url: "https://www.github.com/MichaelDiers/miracle-hides/miracle-hides-keys"
      },
      author: "Michael Diers",
      license: "MIT",
    };

    console.info();
    console.info('Please provide some information for the package.json:');
    commandLine.question(`author? (${packageJson.author}) `, (author) => {
      if (author) {
        packageJson.author = author;
      }

      commandLine.question('description? ', (description) => {
        if (description) {
          packageJson.description = description;
        }

        const address = `https://www.github.com/MichaelDiers/miracle-hides/tree/main/${packageJson.name}`;
        commandLine.question(`git? (${address}) `, (git) => {
          packageJson.repository.url = git || address;

          commandLine.question(`license? (${packageJson.license}) `, (license) => {
            if (license) {
              packageJson.license = license;
            }

            commandLine.close();
          })
        });
      });
    });

    commandLine.on('close', function () {
      writeFileSync(packageJsonFile, JSON.stringify(packageJson, null, 2));
      console.info('Created file ', packageJsonFile);
      options.next(options.nextOptions);
    });
  } else {
    options.next(options.nextOptions);
  }
}

export default createPackageJson;
