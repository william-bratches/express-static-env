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

// TODO - make last argument always a callback dynamically
const readAndReplaceStaticFile = (filePath, env = process.env, cb) => {
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
