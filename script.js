class Calculator {
    constructor(previousOperandTextElement, operandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.allClear()
    }

    allClear() {
        this.currentOperand = '0'
        this.previousOperand = ''
        this.operation = undefined
    }

    clear() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
        if (this.currentOperand.toString().length === 0) {
            this.currentOperand = '0'
        }
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        if (number === '.' && this.currentOperand === '0') {
            this.currentOperand = ''
        }
        if (this.currentOperand === 'ouerflo') this.allClear()
        if (this.currentOperand > 9999999) return
        if (number === '0' && this.currentOperand === '0') return
        if(this.currentOperand === undefined | this.currentOperand === '0')
        {
            this.currentOperand = number
        }
        else {
            this.currentOperand = this.currentOperand.toString() + number.toString()
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '0') return
        if (this.currentOperand === 'ouerflo') this.allClear()
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = '0'
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '−':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break    
            default:
                return
        }
        if (computation.toString().length > 8 || computation < -99999999) {
            this.currentOperand = 'ouerflo'
            this.operation = undefined
            this.previousOperand =''
        }
        else {
            this.currentOperand = computation
            this.operation = undefined
            this.previousOperand = ''
        }
    }

    updateDisplay() {
            this.currentOperandTextElement.innerText = this.currentOperand
            this.previousOperandTextElement.innerText = this.currentOperand.toString().length
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-clear]')
const allClearButton = document.querySelector('[data-all-clear]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.allClear()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})