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

/**
** Helper method
** @param scores = an array of the leaderboard scoresMap
** @param playerScore = a score which needs to find it current rank
**/
const binarySearchRank = (scores, playerScore) => {
    var minIndex = 0;
    var maxIndex = scores.length - 1;

    if(scores[minIndex] < playerScore) {
        return minIndex + 1;
    }

    if(scores[maxIndex] > playerScore) {
        return scores.length + 1;
    }

    while(minIndex <= maxIndex) {
        const midPoint = Math.floor((minIndex + maxIndex) / 2);
        if(scores[midPoint] === playerScore) {
            return midPoint + 1;
        } else if((scores[midPoint] < playerScore) && (scores[midPoint - 1] > playerScore)){
            return midPoint + 1;
        } else if((scores[midPoint] > playerScore) && (scores[midPoint + 1] < playerScore)) {
            return midPoint + 2;
        } else if(scores[midPoint] > playerScore) {
            minIndex = midPoint + 1;
        } else {
            maxIndex = midPoint - 1;
        }
    }
}


// Complete the climbingLeaderboard function below.
function climbingLeaderboard(scores, alice) {
    const scoresWithoutDuplicates = [];
    const alicePositions = [];
    const scoresMap =  {};
    for(var index in scores) {
        if(!scoresMap[scores[index]]) {
            scoresWithoutDuplicates.push(scores[index]);
            scoresMap[scores[index]] = 1;
        }
    }
    const sortedScores = scoresWithoutDuplicates.sort((a, b) => b - a);

    for(var aliceScore of alice) {
        alicePositions.push(binarySearchRank(sortedScores, aliceScore));
    }

    return alicePositions;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const scoresCount = parseInt(readLine(), 10);

    const scores = readLine().split(' ').map(scoresTemp => parseInt(scoresTemp, 10));

    const aliceCount = parseInt(readLine(), 10);

    const alice = readLine().split(' ').map(aliceTemp => parseInt(aliceTemp, 10));

    let result = climbingLeaderboard(scores, alice);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
