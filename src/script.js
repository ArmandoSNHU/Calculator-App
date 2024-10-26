// src/script.js

class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.currentInput = '';
        this.lastOperator = null;
        this.newNumber = true;
        this.previousValue = null;
        this.pendingOperation = null;
        this.displayValue = '0'; // Display starts with 0
    }

    getCurrentInput() {
        return this.displayValue;
    }

    clearDisplay() {
        this.currentInput = '';
        this.lastOperator = null;
        this.newNumber = true;
        this.previousValue = null;
        this.pendingOperation = null;
        this.displayValue = '0';
        this.updateDisplay();
    }

    appendValue(value) {
        // Handle operators
        if (['+', '-', '*', '/'].includes(value)) {
            if (this.lastOperator) {
                // Don't allow multiple operators
                return;
            }
            
            this.lastOperator = value;
            this.previousValue = parseFloat(this.currentInput);
            this.pendingOperation = value;
            this.displayValue += value;
            this.newNumber = true;
            this.updateDisplay();
            return;
        }

        // Handle decimal point
        if (value === '.') {
            if (this.currentInput.includes('.') && !this.newNumber) {
                return;
            }
        }

        // Handle numbers
        if (this.newNumber && value !== '.') {
            this.currentInput = value;
            this.displayValue = this.lastOperator ? 
                this.displayValue + value : value;
            this.newNumber = false;
        } else {
            if (this.currentInput === '0' && value !== '.') {
                this.currentInput = value;
                this.displayValue = this.lastOperator ? 
                    this.displayValue.slice(0, -1) + value : value;
            } else {
                this.currentInput += value;
                this.displayValue += value;
            }
        }

        this.updateDisplay();
    }

    calculateResult() {
        try {
            // Handle division by zero
            if (this.displayValue.includes('/0')) {
                this.displayValue = 'Infinity';
                this.currentInput = 'Infinity';
                this.updateDisplay();
                return;
            }
    
            // Check for invalid trailing operators
            if (this.displayValue.match(/[+\-*/]$/)) {
                this.displayValue = 'Error';
                this.currentInput = 'Error';
                this.updateDisplay();
                return;
            }
    
            // Evaluate the expression as a whole to respect operator precedence
            let result = eval(this.displayValue);
    
            // Check for invalid results (NaN or Infinity)
            if (isNaN(result) || !isFinite(result)) {
                this.displayValue = 'Error';
                this.currentInput = 'Error';
            } else {
                this.displayValue = result.toString();
                this.currentInput = result.toString();
            }
    
            // Reset states
            this.lastOperator = null;
            this.newNumber = true;
            this.previousValue = null;
            this.pendingOperation = null;
            this.updateDisplay();
        } catch (e) {
            this.displayValue = 'Error';
            this.currentInput = 'Error';
            this.updateDisplay();
        }
    }

    updateDisplay() {
        if (this.display) {
            this.display.textContent = this.displayValue;
        }
    }
}

// Create and export calculator instance
const calculator = new Calculator();
module.exports = calculator;
