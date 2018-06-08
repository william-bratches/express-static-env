const fs = require('fs');

// stack overflow copypasta
const isFunction = (functionToCheck) => {
 return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

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
  // allow for optional env argument
  const cb = callback || (isFunction(env) && env) || (() => {});

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
