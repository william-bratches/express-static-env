const fs = require('fs');

const replaceEnvInString = (content, env, cb) => {
  const data = Object.keys(env).reduce((acc, next) => {
    const value = `"${env[next]}"`;
    const match = `process.env.${next}`;
    return acc.replace(match, value);
  }, content.slice());

  const envMatch = /(?=process.env)(.*)(?=\b)/;

  // replace unknown process.env with undefined
  let cleanedData = data.slice();
  while (envMatch.test(cleanedData)) {
    cleanedData = cleanedData.replace(envMatch, undefined);
  }

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
