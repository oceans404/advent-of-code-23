const readInputToArray = require('./inputHelper');

const exampleInput = [
    'two1nine',
    'eightwothree',
    'abcone2threexyz',
    'xtwone3four',
    '4nineeightseven2',
    'zoneight234',
    '7pqrstsixteen',
]

const validDigits = {
    one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine:9
}

const findNumInStr = (letters) => {
    let foundNum;
    for (let key in validDigits) {
        if (validDigits.hasOwnProperty(key)) {
            if (letters.includes(key)) {
                foundNum = validDigits[key].toString(); //keep it a string
                break;
            }
        }
    }
    return foundNum;
}

// search left to right, stop at 1st found
const numifyStrLtr = (str) => {
    let letters = '';
    let foundNum;
    let iteratedUpTo = 0;
    for (let i=0; i<str.length; i++) {
        if (!!foundNum) {
            break;
        }
        const char = str[i];
        if (!isNum(char)) {
            // append char
            letters = letters + char;

            found = findNumInStr(letters);
            if (found) {
                foundNum = found;
            }
        } else {
            // if a number is found, that's the first number
            foundNum = char
        }
        iteratedUpTo = i;
    }
    
    return [foundNum, iteratedUpTo];
}

// search right to left
// i know this isn't perfectly dry 
const numifyStrRtl = (str) => {
    let letters = '';
    let foundNum;
    for (let i=str.length - 1; i>=0; i--) {
        if (!!foundNum) {
            break;
        }
        const char = str[i];
        if (!isNum(char)) {
            // prepend char
            letters = char + letters;

            found = findNumInStr(letters);
            if (found) {
                foundNum = found;
            }
        } else {
            // if a number is found, that's the first number
            foundNum = char;
        }
    }
    
    return foundNum
}

const isNum = (char) => !isNaN(parseInt(char));

const trebuString = (str) => {
    let lastNum;
    let foundIndex = 0;

    // get first strNum or num
    const [firstNum, i] = numifyStrLtr(str);
    lastNum = firstNum;
    
    // don't include what ltr already searched through
    const foundNum = numifyStrRtl(str.substring(i+1))
    lastNum = foundNum || lastNum;
    
    return parseInt(firstNum + lastNum)
}

console.log(trebuString(exampleInput[0])) // 29
console.log(trebuString(exampleInput[1])) // 83
console.log(trebuString(exampleInput[2])) // 13
console.log(trebuString(exampleInput[3])) // 24
console.log(trebuString(exampleInput[4])) // 42
console.log(trebuString(exampleInput[5])) // 14
console.log(trebuString(exampleInput[6])) // 76

const trebuchet = (arr) => {
    const total = arr.map(trebuString).reduce((acc, curr) => acc + curr, 0);
    console.log(total);
}

trebuchet(exampleInput) // 281
const inputArr = readInputToArray('day-1');
trebuchet(inputArr) // 54719