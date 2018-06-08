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
  }


}

// const injectAndSendContent = (req, res) => {
//   const hostUrl = `${req.protocol}://${req.get('host')}`;
//   const content = `const PSL_URL = '${hostUrl}'; //`;
//   const errorMessage = 'Error reading GUI file.';
//
//   fs.readFile(GUI_PATH, (err, data) => {
//     if (err) {
//       return res.send(500).send({ body: errorMessage, detail: err });
//     }
//
//     res.setHeader('Content-Type', 'text/javascript');
//     return res.send(`${content} ${data}`);
//   });
// };
