const readAndReplaceStaticFile = require('../lib/replacEnv');

const replaceStaticEnv = (path, env) => {
  return (req, res, next) => {
    return readAndReplaceStaticFile(path, env, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.setHeader('Content-Type', 'text/javascript');
      return res.send(data);
    });
  };
}


module.exports = replaeStaticEnv;
