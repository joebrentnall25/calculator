
let input = [''];
let inputStr = "";
let lastInput = "blank";

let operators = ['', '/', 'x', '+', '-'];

const isOperator = (num) => {
    if (num === operators[1] || num === operators[2] || num === operators[3] || num === operators[4]){
        return true;
    } else {
        return false;
    }
}

const appendNumber = (num) => {
    console.log(lastInput);
    if (isOperator(num)){
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
    if (isOperator(lastInput)) {
        updateDisplay("Error!",2)
    } else {
        updateDisplay("", 2);
        rep_calc(input);    
    }
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
        updateDisplay(arr[0], 1) 
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
