const { expect } = require('chai');

const { replaceEnvInString } = require('../../src/lib/replaceEnv');
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
});
