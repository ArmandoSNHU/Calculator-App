let currentInput = '0';
let display = null;

function initDisplay() {
    if (!display) {
        display = document.getElementById('display');
    }
}

function updateDisplay() {
    initDisplay();
    if (display) {
        display.innerText = currentInput;
    }
}

function appendValue(value) {
    // Handle decimal point
    if (value === '.') {
        // Check if the current number already has a decimal point
        const currentNumber = getCurrentNumber();
        if (currentNumber.includes('.')) {
            return; // Don't add another decimal point
        }
    }

    // Handle operators
    if (isOperator(value)) {
        // If the last character is an operator, replace it
        if (isOperator(currentInput[currentInput.length - 1])) {
            currentInput = currentInput.slice(0, -1) + value;
            updateDisplay();
            return;
        }
    }

    // Handle initial zero
    if (currentInput === '0') {
        if (value === '.' || isOperator(value)) {
            currentInput += value;
        } else {
            currentInput = value;
        }
    } else if (currentInput === 'Error') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function getCurrentNumber() {
    const numbers = currentInput.split(/[+\-*/%]/);
    return numbers[numbers.length - 1];
}

function isOperator(char) {
    return ['+', '-', '*', '/', '%'].includes(char);
}

function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length === 1 || currentInput === 'Error') {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

function calculateResult() {
    try {
        // Validate the expression
        if (isOperator(currentInput[currentInput.length - 1])) {
            throw new Error('Invalid expression: ends with operator');
        }

        // Check for consecutive operators
        if (/[+\-*/%]{2,}/.test(currentInput)) {
            throw new Error('Invalid expression: consecutive operators');
        }

        // Check if expression starts with an operator (except minus)
        if (/^[+*/%]/.test(currentInput)) {
            throw new Error('Invalid expression: starts with operator');
        }

        // Calculate the result
        let result;
        // Use Function instead of eval for better security
        result = new Function('return ' + currentInput)();
        
        // Handle division by zero and other invalid results
        if (!isFinite(result)) {
            currentInput = 'Infinity';
        } else if (isNaN(result)) {
            throw new Error('Invalid calculation');
        } else {
            // Round to 8 decimal places to avoid floating-point precision issues
            result = Math.round(result * 100000000) / 100000000;
            currentInput = result.toString();
        }
    } catch (error) {
        currentInput = 'Error';
    }
    updateDisplay();
}

// Initialize if we're in a browser environment
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initDisplay);
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        appendValue,
        clearDisplay,
        deleteLast,
        calculateResult,
        getCurrentInput: () => currentInput
    };
}