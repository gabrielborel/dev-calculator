'use strict'

//* THEME SWITCHER
const inputs = document.querySelectorAll('input')
const body = document.body
const ballPosition = document.querySelector(':root')

inputs.forEach( input => {
    input.addEventListener('click', (e) => {
        const theme = e.target.getAttribute('id')
        
        switch (theme) {
            case 'theme1':
                if (body.classList.contains('theme2')) body.classList.remove('theme2')
                if (body.classList.contains('theme3')) body.classList.remove('theme3')
                ballPosition.style.setProperty('--horizontal-position', '3px')
                // IN THEME 1 JUST REMOVE ANOTHER THEMES AND ADDS NOTHING, THEME1 IS THE DEFAULT
                break

            case 'theme2':
                if (body.classList.contains('theme3')) body.classList.remove('theme3')
                body.classList.add('theme2')
                ballPosition.style.setProperty('--horizontal-position', '28px')
                break
                
            case 'theme3':
                if (body.classList.contains('theme2')) body.classList.remove('theme2')
                body.classList.add('theme3')
                ballPosition.style.setProperty('--horizontal-position', '53px')
                break
        }
    })
})

//* CALCULATOR APP
const mainDisplay = document.querySelector('.result')
const historyDisplay = document.querySelector('.history')
const temporaryResultDisplay = document.querySelector('.temporary')

const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')

const equal = document.querySelector('.equal')
const clearAll = document.querySelector('.reset')
const clearLast = document.querySelector('.delete')

let haveDot = false
let historyDisplayNum = ''
let mainDisplayNum = ''
let lastOperation = ''
let result = null

numbers.forEach( number => number.addEventListener('click', (e) => {
    const clicked = e.target.getAttribute('id')
    
    if (clicked === '.' && !haveDot) {
        haveDot = true
    } else if (clicked === '.' && haveDot) return

    mainDisplayNum += clicked
    mainDisplay.innerText = mainDisplayNum
}))

operators.forEach( operator => operator.addEventListener('click', (e) => {
    const operation = e.target.getAttribute('id')

    if (!mainDisplayNum) return

    haveDot = false

    if (mainDisplayNum && historyDisplayNum && lastOperation) {
        calculate()
    } else {
        result = parseFloat(mainDisplayNum)
    }

    clearVar(operation)
    lastOperation = operation
}))

function clearVar(operationName = '') {
    historyDisplayNum += `${mainDisplayNum} ${operationName} `
    historyDisplay.innerText = historyDisplayNum
    mainDisplay.innerText = ''
    mainDisplayNum = ''
    temporaryResultDisplay.innerText = result
}

function calculate() {
    switch (lastOperation) {
        case 'X':
            result = parseFloat(result) * parseFloat(mainDisplayNum)
            break
        case '+':
            result = parseFloat(result) + parseFloat(mainDisplayNum)
            break
        case '-':
            result = parseFloat(result) - parseFloat(mainDisplayNum)
            break
        case '/':
            result = parseFloat(result) /parseFloat(mainDisplayNum)
            break
    }       
}

equal.addEventListener('click', (e) => {
    if (!mainDisplayNum || !historyDisplayNum) return
    haveDot = false

    calculate()
    clearVar()

    mainDisplay.innerText = result
    temporaryResultDisplay.innerText = ''
    mainDisplayNum = result
    historyDisplayNum = ''
})

clearAll.addEventListener('click', (e) => {
    mainDisplay.innerText = ''
    historyDisplay.innerText = ''
    mainDisplayNum = ''
    historyDisplayNum = ''
    result = ''
    temporaryResultDisplay.innerText = ''
})

clearLast.addEventListener('click', (e) => {
    mainDisplay.innerText = ''
    mainDisplayNum = ''
})

window.addEventListener('keydown', (e) => {
    const { key } = e
    console.log(key)

    if (
        key === '0' ||
        key === '1' ||
        key === '2' ||
        key === '3' ||
        key === '4' ||
        key === '5' ||
        key === '6' ||
        key === '7' ||
        key === '8' ||
        key === '9' ||
        key === '.' 
    ){
        clickButton(key)
    } else if (
        key === '-' ||
        key === '+' ||
        key === '/'
    ){
        clickOperation(key)
    } else if (key === '*') {
        clickOperation('X')
    } else if (key === 'Enter' || key === '=') {
        clickEqual()
    } else if (key === 'Backspace') {
        mainDisplay.innerText = ''
        mainDisplayNum = ''
    }
})

function clickButton(key) {
    numbers.forEach( button => {
        if (button.getAttribute('id') === key) {
            button.click()
        }
    })
}

function clickOperation(key) {
    operators.forEach( button => {
        if (button.getAttribute('id') === key) {
            button.click()
        }
    })
}

function clickEqual() {
    equal.click()
}