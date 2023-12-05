const readInputToArray = require('./inputHelper');
const exampleInputArr = readInputToArray('day-3-example');
const inputArr = readInputToArray('day-3');

// regex
const isSymbol = str => str !== "." && (/[^0-9.]/.test(str));
const isNumber = str => (/^\d+$/.test(str));

// get all symbol positions
// const symbols = exampleInputArr.forEach()
// { [rowNum]: [pos1, pos2] }
const getSymbolPositions = (inArr) => {
    const symbolPositions = {}
    for (i=0; i<inArr.length; i++) {
        const positions = []
        for (let x = 0; x < inArr[i].length; x++) {
            if (isSymbol(inArr[i][x])) {
                positions.push(x)
            }
        }
        symbolPositions[i] = positions
    }
    return symbolPositions
}

const checkSymbolAtPos = (pos = [1,3], symbolsKey) => {
    const row = symbolsKey[pos[0]];
    if (row?.includes(pos[1])) {
        return [true, pos];
    }
    return [false, [-1,-1]];
}

// 1 2 3
// 4 5 6
// 7 8 9

// [0,0] would be 1 => check [0,1], [1,0], [1,1]
// [1,1] would be 5 => check [0,0], [0,1], [0,2] [1,0], [1,1]. [1,2], [2,0], [2,1], [2,2]
const checkPointsAroundPosition = (position, symbolsKey) => {
    // X: Left / Right bounds
    const lb = position[0]-1
    const rb = position[0]+1
    // Y: Up / Down bounds
    const ub = position[1]-1
    const db = position[1]+1

    // Math.max to remove -1 checking
    let foundPass = false;
    for (let x = Math.max(0,lb); x<=rb; x++) {
        if (foundPass) {
            break;
        }
        for (let y= Math.max(0, ub); y<=db; y++) {
            const [checkPassed, foundPos] = checkSymbolAtPos([x, y], symbolsKey);
            if (checkPassed) {
                foundPass = true;
                break;
            }
        }
    }
    return foundPass;
}



const algo = (inArr) => {
    // find all symbols
    const symbols = getSymbolPositions(inArr)

    let sum = 0;
    for (x=0; x<inArr.length; x++) {
        let currNum = '';
        let symbolNearCurrNum = false;
        for (let y = 0; y < inArr[x].length; y++) {
            const currChar = inArr[x][y];

            // continuation of number
            if (isNumber(currChar)) {
                currNum = currNum + currChar;
                // if a nearby symbol hasn't yet been found, check for one
                if (!symbolNearCurrNum) {
                    const found = checkPointsAroundPosition([x,y], symbols);
                    if (found) {
                        symbolNearCurrNum = found;
                    }
                }
            
            // end of number
            } else {
                if (currNum.length && symbolNearCurrNum) {
                    sum +=parseInt(currNum);
                }
                
                currNum = '';
                symbolNearCurrNum = false;
            }
        }

        // end of line
        if (currNum.length && symbolNearCurrNum) {
            sum +=parseInt(currNum);
        }
    }
    console.log(sum)
}

algo(exampleInputArr) // 4361
algo(inputArr) // 540025