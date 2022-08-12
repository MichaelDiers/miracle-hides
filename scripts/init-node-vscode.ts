import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import writeFile from './init-node-write-file';
import { HandlerParameters } from './types';

const settingsJson = {
  "editor.detectIndentation": false,  
  "editor.insertSpaces": true,
  "editor.tabSize": 2,
  "editor.useTabStops": false,
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "files.eol": "\n",
  "liveSassCompile.settings.formats": [
    {
        "format": "expanded",
        "extensionName": ".css",
        "savePath": "/client/plain"
    },
    {
        "format": "compressed",
        "extensionName": ".min.css",
        "savePath": "/client/plain"
    }
  ],
  "typescript.preferences.quoteStyle": "single",
  "autoDocstring.quoteStyle": "'''",
  "autoDocstring.docstringFormat": "google",
  "autoDocstring.startOnNewLine": true,
  "pylint.args": ["--indent-string='  '"],
}

const createVscode = (options: HandlerParameters) : void => {
  if (options.nextOptions.error) {
    return options.next(options.nextOptions);
  }

  const vscodeFolder = join(options.nextOptions.config.folder, '.vscode');  
  if (!existsSync(vscodeFolder)) {
    mkdirSync(vscodeFolder);    
  }

  const settingsJson = join(vscodeFolder, 'settings.json');
  if (options.nextOptions.config.overwrite || !existsSync(settingsJson)) {
    writeFileSync(settingsJson, JSON.stringify(settingsJson, null, 2));
    console.info('Created file', settingsJson);
  }

  options.next(options.nextOptions);
}

export default createVscode;
