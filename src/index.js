const { modifyContent } = require('./lib/replaceEnv');
const sendModifiedContent = require('./controllers/staticEnv');

module.exports = {
  sendModifiedContent,
  modifyContent,
};
