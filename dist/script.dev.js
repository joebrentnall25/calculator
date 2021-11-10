"use strict";

var input = [''];
var inputStr = "";
var lastInput = "blank";
var operators = ['^', '/', 'x', '+', '-'];

var isOperator = function isOperator(num) {
  for (var i = 0; i < operators.length; i++) {
    if (num === operators[i]) {
      return true;
    }
  }

  return false;
};

var appendNumber = function appendNumber(num) {
  if (isOperator(num)) {
    if (isOperator(lastInput)) {
      input[input.length - 2] = num;
    } else {
      inputStr = "";
      input.push(num);
      lastInput = input[input.length - 1];
      input.push('');
    }

    updateDisplay(input.join(' '), 1); // Updates whats shown on the screen
  } else {
    inputStr += num;
    input[input.length - 1] += num.toString();
    lastInput = "";
    updateDisplay(input.join(" "), 1);
  }
};

var updateDisplay = function updateDisplay(string, label) {
  if (label === 1) {
    document.getElementById("result").innerHTML = string;
  } else if (label === 2) {
    document.getElementById("error").innerHTML = string;
  } else {
    console.log("ERROR: Typo somewhere!");
  }
};

var calculate = function calculate() {
  if (isOperator(lastInput)) {
    updateDisplay("Error!", 2);
  } else {
    updateDisplay("", 2);
    res = rep_calc(input);
    updateDisplay(rep_calc(input), 1);
  }
};

var calcWithBrackets = function calcWithBrackets() {};
/* 
    Function used to perform all the calculations
    It uses Bodmas/Bidmas (not sure on difference)
    It is a recursive function that over time makes the array 
    that is being worked on smaller and smaller by breaking the
    calculations down, the same way a human would.
*/


var rep_calc = function rep_calc(arr) {
  if (arr.length === 1) {
    input = arr;
    return parseFloat(input[0]); //updateDisplay(arr[0], 1) 
  }

  for (var i = 0; i < input.length; i++) {
    if (input[i] === '(') {
      var brackArr = [];

      while (input[i] !== ')') {
        brackArr.push(input[i]);
      }

      rep_calc(brackArr);
    }
  }

  for (var _i = 0; _i < input.length; _i++) {
    if (input[_i] === '^') {
      var calculation = Math.pow(arr[_i - 1], arr[_i + 1]);
      arr.splice(_i - 1, 3, calculation);
      rep_calc(arr);
    }
  } // Bi(Division/Multiply)as


  for (var _i2 = 0; _i2 < input.length; _i2++) {
    if (input[_i2] === '/') {
      var _calculation = arr[_i2 - 1] / arr[_i2 + 1];

      arr.splice(_i2 - 1, 3, _calculation);
      rep_calc(arr);
    } else if (input[_i2] === 'x') {
      var _calculation2 = arr[_i2 - 1] * arr[_i2 + 1];

      arr.splice(_i2 - 1, 3, _calculation2);
      rep_calc(arr);
    }
  } // BIDM(Add/Subtract)


  for (var _i3 = 0; _i3 < input.length; _i3++) {
    if (input[_i3] === '+') {
      var _calculation3 = parseFloat(arr[_i3 - 1]) + parseFloat(arr[_i3 + 1]);

      arr.splice(_i3 - 1, 3, _calculation3);
      rep_calc(arr);
    } else if (input[_i3] === '-') {
      var _calculation4 = arr[_i3 - 1] - arr[_i3 + 1];

      arr.splice(_i3 - 1, 3, _calculation4);
      rep_calc(arr);
    }
  }
};

var equals = document.getElementById('equals');
equals.addEventListener('click', calculate); // const sqrt = document.getElementById('sqrt');
// sqrt.addEventListener(('click'), function(){appendNumber('sqrt')});

var percent = document.getElementById('percent');
percent.addEventListener('click', function () {
  appendNumber('%');
});
var power = document.getElementById('power');
power.addEventListener('click', function () {
  appendNumber('^');
});
var divide = document.getElementById('divide');
divide.addEventListener("click", function () {
  appendNumber('/');
});
var times = document.getElementById('times');
times.addEventListener("click", function () {
  appendNumber('x');
});
var plus = document.getElementById('plus');
plus.addEventListener('click', function () {
  appendNumber('+');
});
var minus = document.getElementById('minus');
minus.addEventListener("click", function () {
  appendNumber('-');
});
var clear = document.getElementById('clear');
clear.addEventListener('click', function () {
  input = [''];
  inputStr = '';
  lastInput = '';
  updateDisplay('', 1);
});