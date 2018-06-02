const replaceEnvironmentalVariables = require('../lib/replaceEnv');

const staticEnv = (filePath, envOverride) => {
  return (req, res) => {
    return replace(filePath, envOverride, res.send);
  }
}
