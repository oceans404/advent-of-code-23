const readInputToArray = require('./inputHelper');
const exampleInputArr = readInputToArray('day-2-example');
const inputArr = readInputToArray('day-2');

const getInputGameMaxes = (inArr) => {
    const gameObj = {};
    for (let game of inArr) {
        const [gameLabel, gameData] = game.split(':')
        const [, num] = gameLabel.split(' ')
        const rounds = gameData.split('; ')
        const colorObjMaxes = {}
        rounds.forEach(round => {
            const colorsData = round.split(', ')
            for (let d of colorsData) {
                const [colorCount, color] = d.trim().split(' ')
                const countInt = parseInt(colorCount);
                if (colorObjMaxes[color]) {
                    colorObjMaxes[color] = Math.max(colorObjMaxes[color], countInt)
                } else {
                    colorObjMaxes[color] = countInt;
                }
            }
        })
        gameObj[num] = colorObjMaxes
    }
    return gameObj;
}

const sumPowers = (day2Input) => {
    const gameMaxes = getInputGameMaxes(day2Input);
    let sum = 0;
    for (let marbleCountObj of Object.values(gameMaxes)) {
        let product = Object.values(marbleCountObj).reduce((acc, crr) => acc * crr, 1);
        sum +=product
    }
    console.log(sum);
}

sumPowers(exampleInputArr) // 2286
sumPowers(inputArr) // 56580
