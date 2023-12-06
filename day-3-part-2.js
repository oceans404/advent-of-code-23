const readInputToArray = require('./inputHelper');
const exampleInputArr = readInputToArray('day-3-example');
const inputArr = readInputToArray('day-3');

// regex
const isSymbol = str => str === "*";
const isNumber = str => (/^\d+$/.test(str));

// get all symbol positions
// const symbols = exampleInputArr.forEach()
// { [rowNum]: [pos1, pos2] }
const getSymbolPositions = (inArr) => {
    const symbolPositions = {}
    for (i=0; i<inArr.length; i++) {
        const positions = {}
        for (let x = 0; x < inArr[i].length; x++) {
            if (isSymbol(inArr[i][x])) {
                positions[x] = []
            }
        }
        symbolPositions[i] = positions
    }
    return symbolPositions
}

const checkSymbolAtPos = (pos = [1,3], symbolsKey) => {
    const row = symbolsKey[pos[0]];
    if (row && pos[1] in row) {
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
    let symbolPosition;
    for (let x = Math.max(0,lb); x<=rb; x++) {
        if (foundPass) {
            break;
        }
        for (let y= Math.max(0, ub); y<=db; y++) {
            const [checkPassed, foundPos] = checkSymbolAtPos([x, y], symbolsKey);
            if (checkPassed) {
                foundPass = true;
                symbolPosition = foundPos;
                break;
            }
        }
    }
    return [foundPass, symbolPosition];
}

const addNumToSymbolMap = (symbolMap, foundSymbolSet, num) => {
    foundSymbolSet.forEach(foundSymbol => {
        symbolMap[foundSymbol[0]][foundSymbol[1]].push(num)
    })
    return symbolMap;
}

// find all symbols with 2 items. sum all 2-item products
const gearMath = (symbolMap) => {
    const vals = Object.values(symbolMap).filter(obj => Object.keys(obj).length > 0);
    let sum = 0; 
    vals.forEach((obj)=> {
        const arrs = Object.values(obj)
        const multiplied = arrs.forEach(nums => {
            sum += (nums.length === 2 ? nums[0] * nums[1] : 0)
        })
    })
    return sum;
}


const algo = (inArr) => {
    // find all gears
    let symbols = getSymbolPositions(inArr)
    for (x=0; x<inArr.length; x++) {

        // variables for a long number like 5291
        let currNum = '';
        let symbolCoords = new Set(); // coords of a symbol around the currNum

        for (let y = 0; y < inArr[x].length; y++) {
            const currChar = inArr[x][y];

            // continuation of number
            if (isNumber(currChar)) {
                currNum = currNum + currChar;
                // if a nearby symbol hasn't yet been found, check for one
                if (!symbolCoords.size) {
                    const [found, scs] = checkPointsAroundPosition([x,y], symbols);
                    if (found) {
                        symbolCoords.add(scs)
                    }
                }
            
            // end of number, not end of line
            } else {
                if (currNum.length && !!symbolCoords.size) {
                    symbols = addNumToSymbolMap(symbols, symbolCoords, currNum)

                }
                
                currNum = '';
                symbolCoords = new Set();
            }
        }

        // end of number at the end of line
        if (currNum.length && !!symbolCoords.size) {
            symbols = addNumToSymbolMap(symbols, symbolCoords, currNum)
        }
    }
    console.log(gearMath(symbols))
   
}

algo(exampleInputArr) // 467835
algo(inputArr) // 540025