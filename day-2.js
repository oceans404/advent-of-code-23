const readInputToArray = require('./inputHelper');
const exampleInputArr = readInputToArray('day-2-example');
const inputArr = readInputToArray('day-2');

// The Elf would first like to know which games would have been possible if the bag contained 
// only 12 red cubes, 13 green cubes, and 14 blue cubes?
const elfBag = {
    'red': 12,
    'green': 13,
    'blue': 14
}

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

const isGamePossible = (gameData, checkData = elfBag) => {
    for (let k of Object.keys(gameData)) {
        if (gameData[k] > checkData[k]) {
            return false;
        }
    }
    return true;
}

const countPossibilities = (day2Input) => {
    const gameMaxes = getInputGameMaxes(day2Input);
    let idsAdded = 0;
    for (let k of Object.keys(gameMaxes)) {
        const possible = isGamePossible(gameMaxes[k]);
        idsAdded += possible ? parseInt(k) : 0
    }
    console.log(idsAdded);
}

countPossibilities(exampleInputArr) // 8
countPossibilities(inputArr) // 2727
