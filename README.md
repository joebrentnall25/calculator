# Javascript Calculator
A basic calculator made using vanilla Javascript, html and css(sass).

## Info
I started this project on the third week of my *_Nology* course. Throughtout the development process I used all of my own logic to find a solution to the project. I ended up using recursive functions to make the calculations. The final product implements Bidmas/Bodmas.

### Languages used
- HTML5
- CSS (SASS)
- JavaScript ES6

### Design
The basis of the design was made up from looking at various different calculators and their designs. The final colour scheme was found using [dribbble.com](https://www.dribbble.com "dribbble.com")

## How it works
The core part of the calculations is done using an array that can hold a long calculation such as one you would insert on a scientific calculator. This is done using a recursive function that essentially calls its self after doing each calculation.

The code iterates through the array to find the order of operators to calculate. This follows BIDMAS. After every calculation, the result is stored in the location of that calculation within the array.

*For Example:*

**2+12/2+5²**

    arr = ['2','-','12','/','2', '+', '5', '^', '2'];
    firstIteration = ['2','-','12','/','2', '+', '25']; // 25 
    secondIteration = ['2','-','6', '+', '25']; // 6 
    thirdIteration = ['-4', '+', '25']; // -4
    fourthIteration = ['21'];
    return fourthIteration;

## Future improvements
With further development I would like to implement more scientific calculator functions, further validation and extra usability features. In the more short term, I would like to add:

 - **Brackets** - Being able to use brackets within calculations.
 - **Keyboard Input** - Allow input from the keyboard to input numbers and operators. 

    

