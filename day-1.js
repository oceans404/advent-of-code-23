const readInputToArray = require('./inputHelper');

const exampleInput = [
    '1abc2', //12
    'pqr3stu8vwx', // 38
    'a1b2c3d4e5f', // 15
    'treb7uchet' // 77
]

const isNum = (char) => !isNaN(parseInt(char));

const trebuString = (str) => {
    let firstNum, lastNum;
    let foundIndex = 0;

    // counting up
    // from 0 index, get the first number
    for (let i=0; i<str.length; i++) {
        const char = str[i];
        if (isNum(char)) {
            firstNum = char;
            lastNum = char; // set lastNum in case one isn't found
            foundIndex = i;
            break; // Breaks the loop if a number is found
        }
        
    }

    // counting down but stop once you get to the point the count up got to
    // from n-1 index, get the first number counting down to foundIndex
    for (let i = str.length - 1; i >= foundIndex; i--) {
        const char = str[i]
        if (isNum(char)) {
            lastNum = char;
            if (!firstNum) {
                firstNum = char; // set firstNum if one wasn't found
            }
            break; // Breaks the loop if a number is found
        }
    }
    
    return parseInt(firstNum + lastNum)
}

console.log(trebuString(exampleInput[0])) // 12
console.log(trebuString(exampleInput[1])) // 38
console.log(trebuString(exampleInput[2])) // 15
console.log(trebuString(exampleInput[3])) // 77

const trebuchet = (arr) => {
    const total = arr.map(trebuString).reduce((acc, curr) => acc + curr, 0);
    console.log(total);
}

trebuchet(exampleInput) // 142
const inputArr = readInputToArray('day-1');
console.log(inputArr)
trebuchet(inputArr) // 55971