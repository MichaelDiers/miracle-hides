import * as fs from 'fs';

const directory = `${__dirname}/../license-report/`;

const report = {
  node: undefined,
  fonts: [
    {
      font: 'Orbitron',
      license: 'Open Font License 1.1',
      author: 'Matt McInerney',
      link: 'https://fonts.google.com/specimen/Orbitron'
    },
    {
      font: 'Ubuntu Condensed',
      license: 'Ubuntu Font License 1.0',
      author: 'Dalton Maag',
      link: 'https://fonts.google.com/specimen/Ubuntu+Condensed'
    }
  ]
}

fs.readdir(directory, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  const nodeReport = [];
  files.filter((file) => file.endsWith('.json')).forEach((file) => {
    const path = `${directory}${file}`;
    const entries = require(path);
    entries.forEach((entry) => {
      const { name: entryName } = entry;
      if (!nodeReport.find(({ name }) => name === entryName)) {
        nodeReport.push(entry);
      }
    });
  });

  nodeReport.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    }

    return 0;
  });
  report.node = nodeReport;

  // print object to stdout
  const tab = '  ';
  console.log('const REPORT = {');
  Object.entries(report).forEach(([key, values]) => {
    console.log(`${tab}${key}: [`);
    values.forEach((entry) => {
      console.log(`${tab}${tab}{`);
      Object.entries(entry).forEach(([entryKey, entryValues]) => {
        console.log(`${tab}${tab}${tab}${entryKey}: '${entryValues}',`);
      });

      console.log(`${tab}${tab}},`);
    });

    console.log(`${tab}],`)
  });

  console.log('};')
  console.log();
  console.log('export default REPORT;');
});
