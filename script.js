
let input = [''];
let inputStr = "";
let lastInput = "blank";

let operators = ['brackets', '/', 'x', '+', '-'];

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
            console.log('it is equal');
            input[input.length-2] = num;
        }
        else {
            inputStr = "";
            input.push(num);
            lastInput = input[input.length-1];
            input.push(''); 
        }
        updateDisplay(input.join(' ')); // Updates whats shown on the screen
    }
    else {
        inputStr += num;
        input[input.length-1] += num.toString();
        lastInput = "";
        updateDisplay(input.join(" "));
    }
}

const updateDisplay = (string) => {    
    document.getElementById("result").innerHTML = string;
}

const calculate = () => {
    opIndex = [];
    tempArr = [];
    for (let i = 0; i<input.length; i++){
        for (let x = 0; x<operators.length; x++){
            if (operators[x] === input[i]){opIndex.push(i);}
        }
    }
    rep_calc(input);    
}

const rep_calc = (arr) => {
    if (arr.length === 1){ 
        input = arr;
        updateDisplay(arr[0]) 
    }
    for (let i = 0; i<input.length; i++){
        if (input[i] === '/'){
            const calculation = (arr[i-1])/(arr[i+1]);
            arr.splice(i-1, 3, calculation);
            rep_calc(arr);
        }
    }
    for (let i = 0; i<input.length; i++){
        if (input[i] === 'x') {
            const calculation = (arr[i-1]*arr[i+1]);
            arr.splice(i-1, 3, calculation);
            rep_calc(arr);
        }
    }
    for (let i = 0; i<input.length; i++){
        if (input[i] === '+') {
            const calculation = (parseFloat(arr[i-1])+parseFloat(arr[i+1]));
            arr.splice(i-1, 3, calculation);
            rep_calc(arr);
        }
    }
    for (let i = 0; i<input.length; i++){
        if (input[i] === '-') {
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
    updateDisplay('');
});
