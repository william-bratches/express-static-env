const { readAndReplaceStaticFile } = require('./lib/replaceEnv');
const replaceStaticEnv = require('./controllers/staticEnv');

module.exports = {
  replaceStaticEnv,
  readAndReplaceStaticFile,
};
