const { expect } = require('chai');
const path = require('path');
const fs = require('fs');

const { replaceEnvInString, readAndReplaceStaticFile } = require('../../src/lib/replaceEnv');
const { testFile1 } = require('../fixtures/javascript');
const { fixedTestFile1, fixedUndefinedTestFile1 } = require('../fixtures/fixedJavascript');

describe('replacer', () => {
  it('Should replace all instances of process.env', (done) => {
    replaceEnvInString(testFile1, {
      MY_VAR: 'helloWorld',
      API_PATH: 'fooBar',
    }, (data) => {
      expect(data).to.equal(fixedTestFile1);
      done();
    });
  });

  it('Should replace unknown process.env with undefined', (done) => {
    replaceEnvInString(testFile1, {}, (data) => {
      expect(data).to.equal(fixedUndefinedTestFile1);
      done();
    });
  });

  it('Should replace given a static file path', (done) => {
    const fixturePath = path.resolve(__dirname, '../fixtures/files/testFile.js');
    const solutionPath = path.resolve(__dirname, '../fixtures/files/fixedTestFileComplete.js');

    readAndReplaceStaticFile(fixturePath, {
      FOO_BAR: 'FOO_BAR',
      API_PATH: 'API_PATH',
    }, (data) => {
      const fixedFile = fs.readFileSync(solutionPath);
      expect(data).to.equal(fixedFile);
      done();
    });
  });
});
