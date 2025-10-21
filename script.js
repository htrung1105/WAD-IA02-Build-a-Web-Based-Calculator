class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.readyToReset = false;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        if (this.currentOperand.length > 1) {
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
        } else {
            this.currentOperand = '0';
        }
        this.updateDisplay();
    }

    appendNumber(number) {
        if (this.readyToReset) {
            this.currentOperand = '';
            this.readyToReset = false;
        }
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '' && this.previousOperand !== '') {
            this.operation = operation;
            this.updateDisplay();
            return;
        }
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.readyToReset = false;
        this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        if (this.operation === '÷' && current === 0) {
            this.currentOperand = 'Error';
            this.operation = undefined;
            this.previousOperand = '';
            this.readyToReset = true;
            this.updateDisplay();
            return;
        }
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.readyToReset = true;
        this.updateDisplay();
    }

    handleSpecialOperation(action) {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        let result;
        switch (action) {
            case 'percent':
                const prev = parseFloat(this.previousOperand);
                if (isNaN(prev)) {
                    result = 0;
                } else {
                    result = (prev * current) / 100;
                }
                break;
            case 'sqrt':
                result = Math.sqrt(current);
                break;
            case 'negate':
                result = current * -1;
                break;
            case 'reciprocal':
                if (current === 0) {
                    this.currentOperand = 'Error';
                    this.readyToReset = true;
                    this.updateDisplay();
                    return;
                }
                result = 1 / current;
                break;
            case 'square':
                result = current * current;
                break;
        }
        this.currentOperand = result.toString();
        this.updateDisplay();
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const backspaceButton = document.querySelector('.backspace');
const clearEntryButton = document.querySelector('[data-action="ce"]');
const clearButton = document.querySelector('[data-action="c"]');
const previousOperandTextElement = document.querySelector('.previous-operand');
const currentOperandTextElement = document.querySelector('.current-operand');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const specialActions = ['percent', 'sqrt', 'negate', 'reciprocal', 'square'];

        if (specialActions.includes(action)) {
            calculator.handleSpecialOperation(action);
        } else {
            calculator.chooseOperation(button.innerText);
        }
    });
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
});

clearButton.addEventListener('click', button => {
    calculator.clear();
});

backspaceButton.addEventListener('click', button => {
    calculator.delete();
});

clearEntryButton.addEventListener('click', () => {
    calculator.currentOperand = '0';
    calculator.updateDisplay();
});


// Keyboard Support
window.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key >= 0 && key <= 9 || key === '.') {
        calculator.appendNumber(key);
    } else if (key === '+' || key === '-') {
        calculator.chooseOperation(key);
    } else if (key === '*') {
        calculator.chooseOperation('×');
    } else if (key === '/') {
        calculator.chooseOperation('÷');
    } else if (key === 'Enter' || key === '=') {
        calculator.compute();
    } else if (key === 'Backspace') {
        calculator.delete();
    } else if (key === 'Escape') {
        calculator.clear();
    }
});
