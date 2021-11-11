
let input = [''];
let inputStr = "";
let lastInput = "blank";

let operators = ['%','^', '/', 'x', '+', '-'];

const isOperator = (num) => {
    for(let i = 0; i<operators.length; i++){
        if (num === operators[i]){
            return true;
        }
    }
    return false;
}

const appendNumber = (num) => {
    if (isOperator(num)){
        if (input.length === 0) {
            updateDisplay("ERROR: please enter number first", 2);
        }
        if (isOperator(lastInput)){
            input[input.length-2] = num;
        }
        else {
            inputStr = "";
            input.push(num);
            lastInput = input[input.length-1];
            input.push(''); 
        }
        updateDisplay(input.join(' '), 1); // Updates whats shown on the screen
    }
    else if (num === '.'){
        console.log()
        if (input.length === 1){            
            inputStr += ('0' + num);
            console.log(inputStr);
            lastInput = '.';
            input[input.length-1] += '0.';
            updateDisplay(input.join(''),1)
        }
    }
    else if (num === '.' && num === lastInput) {
            
    }
    else {
        inputStr += num;
        input[input.length-1] += num.toString();
        lastInput = "";
        updateDisplay(input.join(" "), 1);
    }
}

const updateDisplay = (string, label) => {   
    if (label === 1){
        document.getElementById("result").innerHTML = string;
    } else if (label === 2){
        document.getElementById("error").innerHTML = string;
    }
    else {
        console.log("ERROR: Typo somewhere!")
    }
}

const calculate = () => {
    if (isOperator(lastInput) || lastInput === '%') {
        console.log(lastInput);
        updateDisplay("Error!",2)
    } else {
        updateDisplay("", 2);
        res = rep_calc(input)
        updateDisplay(rep_calc(input), 1);    
    }
}

const calcWithBrackets = () => {

}

/* 
    Function used to perform all the calculations
    It uses Bodmas/Bidmas (not sure on difference)
    It is a recursive function that over time makes the array 
    that is being worked on smaller and smaller by breaking the
    calculations down, the same way a human would.
*/
const rep_calc = (arr) => {
    if (arr.length === 1){ 
        input = arr;
        return parseFloat(input[0]); 
        //updateDisplay(arr[0], 1) 
    }

    for (let i = 0; i<input.length; i++){
        if (input[i]==='(') {
            const brackArr = [];
            while(input[i]!==')'){
                brackArr.push(input[i]);
            }
            rep_calc(brackArr);
        }
    }


    for (let i = 0; i<input.length; i++){
        if (input[i]==='^') {
            const calculation = Math.pow(arr[i-1], arr[i+1])
            arr.splice(i-1, 3, calculation)
            rep_calc(arr);
        }
    }

    // Bi(Division/Multiply)as
    for (let i = 0; i<input.length; i++){
        if (input[i] === '/'){
            const calculation = (arr[i-1])/(arr[i+1]);
            arr.splice(i-1, 3, calculation);
            rep_calc(arr);
        }
        else if (input[i] === 'x') {
            const calculation = (arr[i-1]*arr[i+1]);
            arr.splice(i-1, 3, calculation);
            rep_calc(arr);
        }
    }
    
    // BIDM(Add/Subtract)
    for (let i = 0; i<input.length; i++){
        if (input[i] === '+') {
            if (input[i+2] === '%'){
                const calculation = (input[i]*(100+input[i+1]))
                console.log(calculation);
                arr.splice(i-1,4, calculation)
                rep_calc(arr)
            }
            const calculation = (parseFloat(arr[i-1])+parseFloat(arr[i+1]));
            arr.splice(i-1, 3, calculation);
            rep_calc(arr);
        }
        else if (input[i] === '-') {
            const calculation = (arr[i-1]-arr[i+1]);
            arr.splice(i-1, 3, calculation);
            rep_calc(arr);
        }
    }
}

const equals = document.getElementById('equals');
equals.addEventListener(('click'), calculate);

// const sqrt = document.getElementById('sqrt');
// sqrt.addEventListener(('click'), function(){appendNumber('sqrt')});

const percent = document.getElementById('percent');
percent.addEventListener(('click'), function(){appendNumber('%')});

const power = document.getElementById('power');
power.addEventListener(('click'), function(){appendNumber('^')});

const divide = document.getElementById('divide');
divide.addEventListener(("click"), function(){appendNumber('/')});

const times = document.getElementById('times');
times.addEventListener(("click"), function(){appendNumber('x')});

const plus = document.getElementById('plus');
plus.addEventListener(('click'), function(){appendNumber('+')});

const minus = document.getElementById('minus');
minus.addEventListener(("click"), function(){appendNumber('-')});

const clear = document.getElementById('clear');
clear.addEventListener(('click'), () => {
    input = [''];
    inputStr = '';
    lastInput = '';
    updateDisplay('', 1);
});
