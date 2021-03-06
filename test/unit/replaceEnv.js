const { expect } = require('chai');
const path = require('path');
const fs = require('fs');

const { replaceEnvInString, modifyContent } = require('../../src/lib/replaceEnv');
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

    modifyContent(fixturePath, {
      FOO_BAR: 'FOO_BAR',
      API_PATH: 'API_PATH',
    }, (err, data) => {
      const fixedFile = fs.readFileSync(solutionPath).toString();
      expect(data).to.equal(fixedFile);
      done();
    });
  });

  it('Should do partial replacements', (done) => {
    const fixturePath = path.resolve(__dirname, '../fixtures/files/testFile.js');
    const solutionPath = path.resolve(__dirname, '../fixtures/files/fixedTestFilePartial.js');

    modifyContent(fixturePath, {
      API_PATH: 'API_PATH',
    }, (err, data) => {
      const fixedFile = fs.readFileSync(solutionPath).toString();
      expect(data).to.equal(fixedFile);
      done();
    });
  });

  it('Can still function with no env provided', (done) => {
    const fixturePath = path.resolve(__dirname, '../fixtures/files/testFile.js');
    const solutionPath = path.resolve(__dirname, '../fixtures/files/testFileUndefined.js');

    modifyContent(fixturePath, (err, data) => {
      const fixedFile = fs.readFileSync(solutionPath).toString();
      expect(data).to.equal(fixedFile);
      done();
    });
  });
});
