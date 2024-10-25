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
    // Handle special cases
    if (currentInput === '0') {
        if (value === '.' || isOperator(value)) {
            currentInput += value;
        } else {
            currentInput = value;
        }
    } else if (currentInput === 'Error') {
        currentInput = value;
    } else {
        // Prevent multiple operators in a row
        if (isOperator(value) && isOperator(currentInput[currentInput.length - 1])) {
            currentInput = currentInput.slice(0, -1) + value;
        } else {
            currentInput += value;
        }
    }
    updateDisplay();
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
            currentInput = currentInput.slice(0, -1);
        }
        
        // Calculate the result
        let result = eval(currentInput);
        
        // Handle division by zero
        if (!isFinite(result)) {
            currentInput = 'Infinity';
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