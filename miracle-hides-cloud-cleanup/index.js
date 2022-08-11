const functions = require('@google-cloud/functions-framework');

functions.http('cloudCleanUp', (req, res) => {
  res.send('Hello World!');
});
