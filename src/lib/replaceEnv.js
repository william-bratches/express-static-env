const fs = require('fs');

const replaceEnvInString = (content, env, cb) => {
  const data = Object.keys(env).reduce((acc, next) => {
    const value = `"${env[next]}"`;
    const match = `process.env.${next}`;
    return acc.replace(match, value);
  }, content.slice());

  // TODO a path to turn remaining stragglers into undefined
  // space or semicolon
  const unknownMatch = 'some regex wildcad statement';
  const cleanedData = data.replace(unknownMatch, undefined);
  cb(cleanedData);
}

const readAndReplaceStaticFile = (filePath, envOverride, cb) => {
  const env = Object.assign({}, process.env, envOverride);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err;
    }

    return replaceEnvInString(content, env, (data) => {
      cb(data);
    });
  });
}

module.exports = {
  readAndReplaceStaticFile,
  replaceEnvInString,
}
