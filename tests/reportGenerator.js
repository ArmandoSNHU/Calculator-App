// reportGenerator.js
const fs = require('fs');
const path = require('path');

function generateReport(results) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
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

    // Create 'reports' directory if it doesn't exist
    const reportsDir = path.join(__dirname, 'reports');
    if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir);
    }

    // Save the report
    const reportPath = path.join(reportsDir, `test-report-${timestamp}.txt`);
    fs.writeFileSync(reportPath, report);
    
    console.log(`Report generated: ${reportPath}`);
}

module.exports = generateReport;