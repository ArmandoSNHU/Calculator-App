let display;
let currentInput = '0';

// Function to set the display element
function setDisplay(newDisplay) {
    display = newDisplay;
}

// Function to append a value (number or operator) to the display
function appendValue(value) {
    console.log(`Appending value: ${value} to currentInput: "${currentInput}"`);

    // Handle clearing and appending values
    if (value === 'AC') {
        clearDisplay();
    } else if (value === '<') {
        deleteLast();
    } else if (['+', '-', '*', '/', '%'].includes(value)) {
        appendOperator(value);
    } else {
        appendNumber(value);
    }

    console.log(`Updated display: ${display.innerText}`);
}

// Function to append a number to the display
function appendNumber(number) {
    // Prevent leading zeros and replace them
    if (currentInput === '0' && number !== '.') {
        currentInput = number; // Replace leading zero
    } else {
        currentInput += number; // Append the number
    }
    updateDisplay(); // Update the display
}

// Function to append an operator
function appendOperator(op) {
    // Only append if the last character is a number
    if (currentInput !== '' && !isNaN(currentInput.slice(-1))) {
        currentInput += op; // Append the operator
        updateDisplay(); // Update the display
    }
}

// Function to clear the display
function clearDisplay() {
    currentInput = '0'; // Reset input
    updateDisplay(); // Update the display
}

// Function to delete the last character
function deleteLast() {
    console.log(`Deleting last character from currentInput: "${currentInput}"`);

    currentInput = currentInput.slice(0, -1) || '0'; // Remove the last character or reset to '0'
    updateDisplay(); // Update the display
    console.log(`After deleteLast, currentInput: "${currentInput}"`);
}

// Function to calculate the result
function calculateResult() {
    console.log(`Calculating result for currentInput: "${currentInput}"`);
    
    try {
        currentInput = eval(currentInput).toString(); // Evaluate the expression
        updateDisplay(); // Update the display
    } catch (error) {
        display.innerText = 'Error'; // Show error message on failure
        currentInput = '0'; // Reset current input
        console.log(`Error encountered, currentInput reset to empty`);
    }
}

// Function to update the display
function updateDisplay() {
    display.innerText = currentInput; // Update the display with current input
}

// Initialize the display when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setDisplay(document.getElementById('display')); // Set the display element
});
