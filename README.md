# Static-Env
Create dynamic static files via environmental variables in the `process.env`.

### Getting Started
Static-env can be used a replacement for `res.sendFile()`.

```
# an env var in the shell
$ export FIRST_NAME=John
```

```
// The file to be served - /public/js/helloWorld.js
const name = process.env.FIRST_NAME;
const greeting = `Hello ${name}!`;
```

```
// /src/routes.js
const express = require("express")
const { sendModifiedContent } = require('static-env');

app.get('/content', (req, res) => sendModifiedContent("../public/js/helloWorld.js");
```

```
$ curl http://myContentServer.com/content

const name = 'John';
const greeting = `Hello ${name}!`;
```

### Installation

$`npm install static-env`

### Implementation
`static-env` exposes two functions: `sendModifiedContent` and `modifyContent`. One is coupled to expressJS as an intended replacement for `res.sendFile`, the other can be used with any javascript framework to replace `process.env` variables inside a static file.

##### sendModifiedContent - ExpressJS Version


// two functions: one for express, on more generic
// env variables




##### modifyContent - Generic Version (non-express)

##### Misc Notes
* This can technically be used in any file, not just JS files, although it will still retain the `process.env` form.
```
# TERMS_AND_CONDITIONS.txt
Valid as of process.env.CURRENT_DATE

Lorem ipsum dolor sit amet...
```

// designed for situations where loading javascript but have different api references for development and production servers.

### Tests

To run tests, run `npm run test`.

### License
