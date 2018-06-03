const fs = require('fs');

const replaceEnvInString = (content, env, cb) => {
  const data = Object.keys(env).reduce((acc, next) => {
    const value = `"${env[next]}"`;
    const match = `process.env.${next}`;
    return acc.replace(match, value);
  }, content.slice());

  console.log(data);

  // TODO a path to turn remaining stragglers into undefined
  cb(data);
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
