const fs = require('fs');

const readInputToArray = (fileName) => {
    try {
        const data = fs.readFileSync(`inputs/${fileName}`, 'utf8');
        const arr = data.split("\n");
        return arr;
    } catch (err) {
        throw err;
    }
}

module.exports = readInputToArray;