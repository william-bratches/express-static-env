const fs = require('fs');

const replaceEnvInString = (content, env, cb) => {
  // TODO: use reducer instead
  for (key in env) {
    // regex replace string process.env. + KEY
    content.replace()
  }

  cb(data);

  // TODO: still need a way to replace valid code only...
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
