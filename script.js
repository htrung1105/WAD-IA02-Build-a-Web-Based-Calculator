class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.historyString = '';
        this.readyToReset = false;
        this.unaryApplied = false;
        this.updateDisplay();
    }

    delete() {
        if (this.unaryApplied || this.readyToReset) return;
        if (this.currentOperand.length > 1) {
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
        } else {
            this.currentOperand = '0';
        }
        this.updateDisplay();
    }

    appendNumber(number) {
        if (this.readyToReset) {
            this.clear();
        }
        if (this.unaryApplied) {
            this.currentOperand = '';
            this.unaryApplied = false;
            this.historyString = `${this.previousOperand} ${this.operation}`;
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
            this.historyString = `${this.previousOperand} ${this.operation}`;
            this.updateDisplay();
            return;
        }
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.previousOperand = this.currentOperand;
        this.operation = operation;
        this.historyString = `${this.previousOperand} ${this.operation}`;
        this.currentOperand = '';
        this.readyToReset = false;
        this.unaryApplied = false;
        this.updateDisplay();
    }

    compute() {
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (this.operation === undefined) {
            this.historyString = `${this.currentOperand} =`;
            this.readyToReset = true;
            this.updateDisplay();
            return;
        }

        if (isNaN(prev) || isNaN(current)) return;

        const expressionString = this.unaryApplied ? this.historyString : `${this.historyString} ${this.currentOperand}`;

        let computation;
        if (this.operation === '÷' && current === 0) {
            this.currentOperand = 'Error';
            this.historyString = `${expressionString} =`;
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
        this.historyString = `${expressionString} =`;
        this.readyToReset = true;
        this.unaryApplied = false;
        this.updateDisplay();
    }

    applyUnaryOperation(action) {
        if (this.currentOperand === '') return;

        const originalNumber = this.currentOperand;
        const currentNum = parseFloat(originalNumber);
        if (isNaN(currentNum)) return;

        let result;
        let unaryString;

        switch (action) {
            case 'percent':
                const prev = parseFloat(this.previousOperand);
                result = isNaN(prev) ? currentNum / 100 : (prev * currentNum) / 100;
                unaryString = result.toString();
                break;
            case 'reciprocal':
                if (currentNum === 0) {
                    this.currentOperand = 'Error';
                    this.historyString = `1/(${originalNumber})`;
                    this.readyToReset = true;
                    this.updateDisplay();
                    return;
                }
                result = 1 / currentNum;
                unaryString = `1/(${originalNumber})`;
                break;
            case 'square':
                result = currentNum * currentNum;
                unaryString = `sqr(${originalNumber})`;
                break;
            case 'sqrt':
                result = Math.sqrt(currentNum);
                unaryString = `sqrt(${originalNumber})`;
                break;
            case 'negate':
                result = currentNum * -1;
                this.currentOperand = result.toString();
                this.updateDisplay();
                return;
        }

        this.currentOperand = result.toString();
        this.historyString = this.previousOperand ? `${this.previousOperand} ${this.operation} ${unaryString}` : unaryString;
        this.unaryApplied = true;
        this.updateDisplay();
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.historyString;
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

const opMap = {
    add: '+',
    subtract: '-',
    multiply: '×',
    divide: '÷'
};

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const unaryActions = ['percent', 'reciprocal', 'square', 'sqrt', 'negate'];

        if (unaryActions.includes(action)) {
            calculator.applyUnaryOperation(action);
        } else if (opMap[action]) {
            calculator.chooseOperation(opMap[action]);
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
    calculator.unaryApplied = false;
    calculator.historyString = calculator.previousOperand ? `${calculator.previousOperand} ${calculator.operation}` : '';
    calculator.updateDisplay();
});

window.addEventListener('keydown', (e) => {
    const key = e.key;
    const button = document.querySelector(`button[data-key="${key}"]`);
    if (button) {
        button.click();
        return;
    }

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
