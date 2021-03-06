# Static-Env
Create dynamic static files via environmental variables in the `process.env`.

### Installation

$`npm install static-env`

### Quickstart
Given a file, **`/public/js/helloWorld.js`**
```
const name = process.env.FIRST_NAME;
const greeting = `Hello ${name}!`;
```

Inside your **JS**, i.e. **/src/controllers/content.js**:
```
const { modifyContent } = require('static-env');

modifyContent(/public/js/helloWorld.js, { FIRST_NAME: 'Tim' }, (err, data), => {
  console.log(data);

  // const name = "Tim";
  // const greeting = `Hello ${name}!`;
}
```

##### Using process.env by default
The second argument to specify variables is optional. If omitted, `process.env` will be used instead.

In the **shell**:
```
# an env var in the shell
$ export FIRST_NAME=John
```

Inside your **JS**, i.e. **/src/controllers/content.js**:
```
const { modifyContent } = require('static-env');

modifyContent(/public/js/helloWorld.js, (err, data), => {
  console.log(data);

  // const name = "John";
  // const greeting = `Hello ${name}!`;
}
```


### Usage Details
`static-env` exposes two functions: `sendModifiedContent` and `modifyContent`. One is coupled to expressJS as an intended replacement for `res.sendFile`, the other can be used with any javascript framework to replace `process.env` variables inside a static file.

#### sendModifiedContent - ExpressJS Version
sendModifiedContent can be used a replacement for `res.sendFile()`.

In the **shell**:
```
$ export FIRST_NAME=John
```


**/public/js/helloWorld.js** - the file to be served
```
const name = process.env.FIRST_NAME;
const greeting = `Hello ${name}!`;
```

**/src/controllers/sendContent.js** - an expressJS controller sending the file
```
const express = require("express")
const { sendModifiedContent } = require('static-env');

app.get('/content', sendModifiedContent("../public/js/helloWorld.js");
```

Test it in the **shell**:
```
$ curl http://myContentServer.com/content

const name = 'John';
const greeting = `Hello ${name}!`;
```

`sendModifiedContent` optionally takes an object that can replace the use of `process.env`. Note that this argument does not merge with `process.env`, and is a wholesale replacement. Use `Object.assign()` in your Implementation if your intention is to merge the object or override a single `process.env` variable.

**/src/controllers/sendContent.js**
```
app.get('/content', sendModifiedContent("../public/js/helloWorld.js", { FIRST_NAME: "Tim" });
```

**shell**:
```
$ curl http://myContentServer.com/content

const name = 'Tim';
const greeting = `Hello ${name}!`;
```

#### modifyContent - Generic Version (non-express-specific)
This will simply replace all `process.env` references in a static file with a corresponding environmental variable.

**/public/js/helloWorld.js** - the file to be served
```
const name = process.env.FIRST_NAME;
const greeting = `Hello ${name}!`;
```

**/src/controllers/content.js**:
```
modifyContent(/public/js/helloWorld.js, (err, data), => {
  console.log(data);
  // const name = 'John';
  // const greeting = `Hello ${name}!`;
}
```


It optionally takes an argument that can replace the use of `process.env` with a custom object. Note that this argument does not merge with `process.env`, and is a wholesale replacement. Use `Object.assign()` in your Implementation if your intention is to merge the object or override a single `process.env` variable.

```
modifyContent(/public/js/helloWorld.js, { FIRST_NAME: 'Tim' }, (err, data), => {
  console.log(data);
  // const name = 'Tim';
  // const greeting = `Hello ${name}!`;
}
```

#### Miscellaneous Notes
* Destructuring (`{ API_URL } = process.env`) currently does not work.

* This library was originally invented to allow for hosted JS libraries (drop-in UIs google maps, stripe, or twitter widget) to avoid hardcoding external URLs for dev, staging, and prod versions.

* This can technically be used in any file, not just JS files, although it will still retain the `process.env` form. In the future, a more generic syntax is planned.


```
# TERMS_AND_CONDITIONS.txt
Valid as of process.env.CURRENT_DATE

Lorem ipsum dolor sit amet...
```

```
$ curl http://myContentServer.com/terms

Valid as of 01/01/76

Lorem ipsum dolor sit amet...
```

### Tests

To run tests, run `npm run test`.

### License
This project is licensed under the MIT License.
