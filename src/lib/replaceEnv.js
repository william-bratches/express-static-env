const fs = require('fs');

const replaceEnvInString = (content, env, cb) => {
  Object.keys(env).reduce((acc, next) => {
    const value = env[next];
    const match = `process.env.${next}`;
    return content.replace(match, value);
  }, '');

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

modul

module.expots = {
  readAndReplaceStaticFile,
  replaceEnvInString,
}
