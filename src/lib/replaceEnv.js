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

const readAndReplaceStaticFile = (filePath, env = process.env, callback) => {
  const cb = callback || arguments[arguments.length - 2];
  fs.readFile(filePath, (err, buffer) => {
    if (err) {
      throw err;
    }

    return replaceEnvInString(buffer.toString(), env, (data) => {
      cb(data);
    });
  });
}

module.exports = {
  readAndReplaceStaticFile,
  replaceEnvInString,
}
