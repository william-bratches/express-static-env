# Static-Env

Create dynamic static files via environmental variables in the `process.env`.

For example, it can be used a replacement for `res.sendFile()`.

```
# set an env var in the shell
$ export FIRST_NAME=John
```

```
/* public/js/helloWorld.js */
const name = process.env.FIRST_NAME;
const greeting = `Hello ${name}!`;
```

```
/* src/routes.js */
const express = require("express")
const { sendModifiedContent } = require('static-env');

app.get('/content', (req, res) => sendModifiedContent("../public/js/helloWorld.js");
```

```
$ curl http://myContentServer.com/content

const name = 'John';
const greeting = `Hello ${name}!`;
```

# Installation

$`npm install static-env`

# Implementation

// two functions: one for express, on more generic
// env variables
// can technically be used in any file.

// designed for situations where loading javascript but have different api references for development and production servers.

### ExpressJS Version


### Generic Version (non-express)

# Tests

To run tests, run `npm run test`.

# License
