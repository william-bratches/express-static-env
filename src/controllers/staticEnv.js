const modifyContent = require('../lib/replacEnv');

const sendModifiedContent = (path, env) => {
  return (req, res, next) => {
    return modifyContent(path, env, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.setHeader('Content-Type', 'text/javascript');
      return res.send(data);
    });
  };
}


module.exports = sendModifiedContent;
