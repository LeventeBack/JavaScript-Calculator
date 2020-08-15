const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const previousOperandPlace = document.querySelector('.previous-operand')
const currentOperandPlace = document.querySelector('.current-operand')
const equalButton = document.querySelector('[data-equal]')
const changeButton = document.querySelector('[data-change]')
const deleteButton = document.querySelector('[data-delete]')
const allclearButton = document.querySelector('[data-all-clear]')

let currentOperand = '';
let previousOperand = '';
let operator = '';

function updateScreen(){
    currentOperandPlace.innerText  = currentOperand;
    previousOperandPlace.innerText  = previousOperand + ' ' + operator;
}

function execute(){
    switch(operator) {
        case'+': 
            currentOperand = parseFloat(currentOperand) + parseFloat(previousOperand);
            previousOperand = '' 
            break;
        case'-': 
            currentOperand = parseFloat(previousOperand) - parseFloat(currentOperand);
            previousOperand = '' 
            break;
        case'x': 
            currentOperand = parseFloat(currentOperand) * parseFloat(previousOperand);
            previousOperand = '' 
            break
        case'/': 
            currentOperand = parseFloat(previousOperand) / parseFloat(currentOperand)  ;
            previousOperand = ''
            break
        default:
            return
    }
    operator = ''
}

numberButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if(e.target.innerText === '.' && currentOperand.toString().includes('.')) return
        if(e.target.innerText === '.' && currentOperand === '') currentOperand = '0'
        currentOperand  += e.target.innerText
        updateScreen() 
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if(currentOperand === '' && previousOperand === '') return
        if(previousOperand !== ''){
            execute()
        }
        operator = e.target.innerText
        previousOperand = currentOperand
        currentOperand = ''
        updateScreen()
    })
})

equalButton.addEventListener('click', () =>{
    execute()
    updateScreen()
})

changeButton.addEventListener('click', () => {
    if(currentOperand === '') return
    currentOperand =  -1 * parseFloat(currentOperand)
    updateScreen()
})

deleteButton.addEventListener('click', ()  => {
    currentOperand =  currentOperand.toString().slice(0, -1)
    if(currentOperand === '-') currentOperand = ''
    updateScreen()
})

allclearButton.addEventListener('click',() => {
    currentOperand = previousOperand = operator  = ''
    updateScreen()
})
