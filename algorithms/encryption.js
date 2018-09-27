'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the encryption function below.
function encryption(s) {
    const lengthOfText = s.length;
    var columns = Math.ceil(Math.sqrt(lengthOfText));
    var rows = Math.floor(Math.sqrt(lengthOfText));
    const matrix = [];
    var currentIndex = 0;

    if((rows + columns) <= lengthOfText) {
        rows = rows + 1;
    }

    for(var i = 0; i < rows; i++ ){
        matrix[i] = [];
        for(var j = 0; j < columns; j++) {
            if(currentIndex < lengthOfText) {
                matrix[i].push(s.charAt(currentIndex));
                currentIndex++;
            }
        }
    }

    var resultString = '';

    for(var i = 0; i < columns; i++) {
        for(var j = 0; j < rows; j++) {
            if(matrix[j][i]) {
                resultString = resultString + matrix[j][i];
            }
        }
        if(i < columns) {
            resultString = resultString + ' ';
        }
    }

    return resultString;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = encryption(s);

    ws.write(result + "\n");

    ws.end();
}
