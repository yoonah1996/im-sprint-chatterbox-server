const fs = require('fs');

class MyCustomReporter {
    constructor(globalConfig, options) {
      this._globalConfig = globalConfig;
      this._options = options;
    }
  
    onRunComplete(contexts, results) {
    //   console.log('Custom reporter output:');
    //   console.log('GlobalConfig: ', this._globalConfig);
    //   console.log('Options: ', this._options);
    }

    onTestResult(test, testResult, aggregateResult) {
        console.log('test reuslt');
        // console.log(testResult)
        const { numFailingTests, numPassingTests } = testResult;
        const result = {
            passed: numPassingTests,
            failed: numFailingTests
        }
        fs.writeFile('result.json', JSON.stringify(result), (err) => {
            return new Error(err);
        })
    }
  }
  
  module.exports = MyCustomReporter;