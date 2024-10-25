const fs = require('fs');
const path = require('path');

class CustomReporter {
    onRunComplete(contexts, results) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const testResults = {
            timestamp,
            numFailedTests: results.numFailedTests,
            numPassedTests: results.numPassedTests,
            numTotalTests: results.numTotalTests,
            testResults: results.testResults.map(testResult => ({
                testFilePath: testResult.testFilePath,
                testResults: testResult.testResults.map(test => ({
                    title: test.title,
                    status: test.status,
                    failureMessages: test.failureMessages
                }))
            }))
        };

        // Create human-readable report
        const report = `
Test Results Summary (${timestamp})
=================================
Total Tests: ${results.numTotalTests}
Passed Tests: ${results.numPassedTests}
Failed Tests: ${results.numFailedTests}

Detailed Results:
${results.testResults.map(testResult => 
    testResult.testResults.map(test =>
        `${test.status.toUpperCase()}: ${test.title}${
            test.failureMessages.length ? 
            '\nFailure: ' + test.failureMessages.join('\n') : ''
        }`
    ).join('\n\n')
).join('\n\n')}
`;

        // Ensure directory exists
        const resultsDir = path.join(__dirname, 'results');
        if (!fs.existsSync(resultsDir)) {
            fs.mkdirSync(resultsDir);
        }

        // Save results
        fs.writeFileSync(
            path.join(resultsDir, `test-results-${timestamp}.json`), 
            JSON.stringify(testResults, null, 2)
        );
        fs.writeFileSync(
            path.join(resultsDir, `test-results-${timestamp}.txt`), 
            report
        );

        // Also save latest version
        fs.writeFileSync(
            path.join(resultsDir, 'latest-results.json'),
            JSON.stringify(testResults, null, 2)
        );
        fs.writeFileSync(
            path.join(resultsDir, 'latest-results.txt'),
            report
        );
    }
}

module.exports = CustomReporter;