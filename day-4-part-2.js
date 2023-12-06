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

    return numMatches;
}

const totalScratcherPoints = (inArr) => {
    const allCards = formatGameCards(inArr);
    const cardCount = allCards.map(c => 1);
    

    for (let i=0; i<allCards.length; i++) {
        const extraCards = totalCardPoints(allCards[i])
        for (let x=(Math.min(i+1, allCards.length - 1)); x<= (Math.min(i+extraCards, allCards.length - 1)); x++) {
            if (extraCards) {
                cardCount[x] +=(1*cardCount[i]);
            }   
        }
    }
    console.log(cardCount);

    let sumOfAllScratchers = cardCount.reduce((acc, curr) => {
        return acc + curr;
    }, 0);
    console.log(sumOfAllScratchers);
}

totalScratcherPoints(exampleInputArr); // 30
totalScratcherPoints(inputArr); // 6283755