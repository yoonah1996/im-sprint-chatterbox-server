const fs = require('fs');

class MyCustomReporter {
    constructor(globalConfig, options) {
      this._globalConfig = globalConfig;
      this._options = options;
    }
  
    onRunComplete(contexts, result) {
        // console.log('result', result);
        const { numFailedTests, numPassedTests } = result;
        const parsedResult = {
            passed: numPassedTests,
            failed: numFailedTests
        }
        fs.writeFile('result.json', JSON.stringify(parsedResult), (err) => {
            return new Error(err);
        })
    }
  }
  
  module.exports = MyCustomReporter;