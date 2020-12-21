const { arrayHasElement, unique } = require('../utils/utils');

/**
 * getSingleDroneSnapshots
 * Get all snapshots for single drone instructions
 * @param {String} instructions The instructions string
 */
const getSingleDroneSnapshots = (instructions) => {
    // 1. Remove consecutive duplicate "x"
    const validInstructions = removeDuplicateX(instructions);
    // 2. Get billboard photos
    const snapshotsBox = getUniqSnapshots(validInstructions);
    return snapshotsBox;
};

/**
 * getTwoDroneSnapshots
 * Get all snapshots for Two drone instructions
 * @param {String} instructions The instructions string
 */
const getTwoDroneSnapshots = (instructions) => {
    // 1. Distribute instructions
    const instructionsObj = instructionsSplit(instructions);
    const { firstInstructions, secondInstructions } = instructionsObj;
    // 2. Get billboard photos of each drone
    const firstSnapshotsBox = getSingleDroneSnapshots(firstInstructions);
    const secondSnapshotsBox = getSingleDroneSnapshots(secondInstructions);
    // 3. Merge 2 billboard photos Box without duplicates elements
    const mergedSnapshotsBox = mergeSnapshotsBox(firstSnapshotsBox, secondSnapshotsBox);
    return mergedSnapshotsBox;
};

/**
 * handleMove
 * Get next position after move
 * @param {Array} position The current position
 * @param {String} nextMove The instructions string
 */
const handleMove = (position, nextMove) => {
    const nextPosition = [...position];
    const moveArr = [...nextMove];
    moveArr.forEach((move) => {
        switch (move) {
            case '<':
                nextPosition[0] -= 1;
                break;
            case '>':
                nextPosition[0] += 1;
                break;
            case '^':
                nextPosition[1] += 1;
                break;
            default:
                nextPosition[1] -= 1;
        }
    });

    return nextPosition;
};

/**
 * removeDuplicateX
 * Remove Duplicate 'X' from instructions.  eg. 'xx>xvvxxxx' => 'x>xvvx'
 * @param {String} instructions The instructions string
 */
const removeDuplicateX = (instructions) => {
    const validInstructionsArr = [...instructions];
    const validInstructions = [];
    validInstructionsArr.forEach((i) => {
        if (validInstructions.length === 0) {
            validInstructions.push(i);
        } else {
            const lastChar = validInstructions[validInstructions.length - 1];
            if (i !== 'x' || lastChar !== 'x') {
                validInstructions.push(i);
            }
        }
    });
    return validInstructions.join('');
};

/**
 * getUniqSnapshots
 * Get All Snapshots without duplicate element from instructions.
 * @param {String} instructions The instructions string
 */
const getUniqSnapshots = (instructions) => {
    const moveArr = instructions.split('x');
    const box = [];
    const currentPosition = [0, 0];
    let nextPosition;
    // The last element in moveArr can only be '' or '{direaction}'
    // Both of them has no effect on the final calculation result
    const validMoveArr = moveArr.slice(0, moveArr.length - 1);
    validMoveArr.forEach((move) => {
        // if start with 'x'.
        if (move === '') {
            nextPosition = currentPosition;
            box.push(nextPosition);
        } else {
            nextPosition = handleMove(currentPosition, move);
            // if start with direction and box is empty.
            if (box.length === 0) {
                box.push(nextPosition);
            } else {
                // if box is not empty，check whether the box has the photo
                const isPositionExist = arrayHasElement(box, nextPosition);
                !isPositionExist && box.push(nextPosition);
            }
            nextPosition = currentPosition;
        }
    });
    return box;
};

/**
 * instructionsSplit
 * Split instructions to two instructions by character order, and store both in an object
 * @param {String} instructions The instructions string
 */
const instructionsSplit = (instructions) => {
    const arr = [...instructions];
    const even = arr.filter((_item, index) => index % 2 === 0);
    const odd = arr.filter((_item, index) => index % 2 !== 0);
    return {
        firstInstructions: even.join(''),
        secondInstructions: odd.join(''),
    };
};

/**
 * mergeSnapshotsBox
 * Merge and remove duplicates for two snapshots box
 * @param {Array} firstArr The first snapshots box
 * @param {Array} secondArr The second snapshots box
 */
const mergeSnapshotsBox = (firstArr, secondArr) => {
    const array = [...firstArr, ...secondArr];
    const result = unique(array);
    return result;
};

module.exports = {
    removeDuplicateX,
    getUniqSnapshots,
    instructionsSplit,
    mergeSnapshotsBox,
    handleMove,
    getSingleDroneSnapshots,
    getTwoDroneSnapshots,
};
