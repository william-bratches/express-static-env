const fs = require('fs');

const replaceEnvInString = (content, env, cb) => {
  // build list of process.env
  // for every item in the list, break apart, match in actual env object
  // if match, replace, keeping reference to origin (key: value)
  // go through string again, replacing old string with new value

  cb(data);

  // still need a way to replace valid code only...
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
