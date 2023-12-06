const readInputToArray = require('./inputHelper');
const exampleInputArr = readInputToArray('day-4-example');
const inputArr = readInputToArray('day-4');

// [ [winning, yours], ]
const formatGameCards = (inArr) => {
    const gameArrays = inArr.map(game => {
        const [, nums] = game.split(': ');
        const [winning, yours] = nums.split(' | ');
        return([winning.trim().split(' '), yours.trim().split(' ')]);
    })
    console.log(gameArrays);
    return gameArrays;
}

const totalCardPoints = (card) => {
    let numMatches = 0;

    // count matches
    const [winning, yours] = card;
    yours.forEach((yourNum) => {
        // exclude weird formatting thing where extra spaces got included
        if (yourNum !== "" && winning.includes(yourNum)) {
            numMatches ++;
        }
    })    

    // return points by # matches
    if (numMatches < 2) {
        return numMatches
    } else {
        return (Math.pow(2, numMatches -1))
    }
}

const totalScratcherPoints = (inArr) => {
    const allCards = formatGameCards(inArr);
    let sumOfAllScratchers = allCards.reduce((acc, curr) => {
        return acc + totalCardPoints(curr);
    }, 0);
    console.log(sumOfAllScratchers);
}

totalScratcherPoints(exampleInputArr); // 13
totalScratcherPoints(inputArr); // 94084