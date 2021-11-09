"use strict";

var input = [];
var operators = ['brackets', '/', 'times', 'plus', 'minus'];

var appendNumber = function appendNumber(num) {
  input.push(num);
  updateDisplay(input.join(" "));
};

var updateDisplay = function updateDisplay(string) {
  document.getElementById("result").innerHTML = string;
};

var calculate = function calculate() {
  opIndex = [];
  tempArr = [];

  for (var i = 0; i < input.length; i++) {
    for (var x = 0; x < operators.length; x++) {
      if (operators[x] === input[i]) {
        opIndex.push(i);
      }
    }
  }

  rep_calc(input);
};

var rep_calc = function rep_calc(arr) {
  if (arr.length === 1) {
    input = arr;
    updateDisplay(arr[0]);
  }

  for (var i = 0; i < input.length; i++) {
    if (input[i] === '/') {
      var calculation = arr[i - 1] / arr[i + 1];
      arr.splice(i - 1, 3, calculation);
      rep_calc(arr);
    } else if (input[i] === 'x') {
      var _calculation = arr[i - 1] * arr[i + 1];

      arr.splice(i - 1, 3, _calculation);
      rep_calc(arr);
    } else if (input[i] === '+') {
      var _calculation2 = arr[i - 1] + arr[i + 1];

      arr.splice(i - 1, 3, _calculation2);
      rep_calc(arr);
    } else if (input[i] === '-') {
      var _calculation3 = arr[i - 1] - arr[i + 1];

      arr.splice(i - 1, 3, _calculation3);
      rep_calc(arr);
    }
  }
};

var equals = document.getElementById('equals');
equals.addEventListener('click', calculate);
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
  input = [];
  updateDisplay('');
});