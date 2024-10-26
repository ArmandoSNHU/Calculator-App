const calculator = require('../src/script.js');

describe('Calculator Tests', () => {
    beforeEach(() => {
        // Reset the document body before each test
        document.body.innerHTML = `
            <div class="calculator">
                <div id="display">0</div>
            </div>
        `;
        calculator.clearDisplay();
    });

    describe('Basic Operations', () => {
        test('appends number to empty display', () => {
            calculator.appendValue('7');
            expect(calculator.getCurrentInput()).toBe('7');
        });

        test('appends operator + to the display', () => {
            calculator.appendValue('2');
            calculator.appendValue('+');
            expect(calculator.getCurrentInput()).toBe('2+');
        });

        test('clears display', () => {
            calculator.appendValue('123');
            calculator.clearDisplay();
            expect(calculator.getCurrentInput()).toBe('0');
        });
    });

    describe('Calculations', () => {
        test('calculates 2 + 3 correctly', () => {
            calculator.appendValue('2');
            calculator.appendValue('+');
            calculator.appendValue('3');
            calculator.calculateResult();
            expect(calculator.getCurrentInput()).toBe('5');
        });

        test('handles multiple operations', () => {
            calculator.appendValue('2');
            calculator.appendValue('+');
            calculator.appendValue('3');
            calculator.appendValue('*');
            calculator.appendValue('4');
            calculator.calculateResult();
            expect(calculator.getCurrentInput()).toBe('14'); // 2 + (3 * 4)
        });

        test('handles decimal numbers', () => {
            calculator.appendValue('2');
            calculator.appendValue('.');
            calculator.appendValue('5');
            calculator.appendValue('*');
            calculator.appendValue('2');
            calculator.calculateResult();
            expect(calculator.getCurrentInput()).toBe('5');
        });
    });

    describe('Error Handling', () => {
        test('handles division by zero', () => {
            calculator.appendValue('1');
            calculator.appendValue('/');
            calculator.appendValue('0');
            calculator.calculateResult();
            expect(calculator.getCurrentInput()).toBe('Infinity');
        });

        test('handles invalid expressions', () => {
            calculator.appendValue('1');
            calculator.appendValue('+');
            calculator.appendValue('+');
            calculator.calculateResult();
            expect(calculator.getCurrentInput()).toBe('Error');
        });
    });

    describe('Input Validation', () => {
        test('prevents multiple decimal points', () => {
            calculator.appendValue('1');
            calculator.appendValue('.');
            calculator.appendValue('2');
            calculator.appendValue('.');
            expect(calculator.getCurrentInput()).toBe('1.2');
        });

        test('prevents multiple operators', () => {
            calculator.appendValue('1');
            calculator.appendValue('+');
            calculator.appendValue('+');
            expect(calculator.getCurrentInput()).toBe('1+');
        });
    });
});
