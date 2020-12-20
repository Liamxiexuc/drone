const instructionsValidation = (string) => {
    if (!string) return false;
    const regex = /^[\^v<>x]*$/;
    return regex.test(string)
}

const handleMove = (position, nextMove) => {
    const currentPosition = [...position];
    const moveArr = [...nextMove];
    moveArr.forEach(move => {
        switch (move) {
            case '<':
                currentPosition[0]--;
                break;
            case '>':
                currentPosition[0]++;
                break;
            case '^':
                currentPosition[1]++;
                break;
            default:
                currentPosition[1]--;
        }
    })

    return currentPosition;
}

const removeDuplicateX = (string) => {
    const stringArr = [...string];
    const result = [];
    stringArr.forEach(i => {
        if (result.length === 0) {
            result.push(i);
        } else {
            const lastChar = result[result.length - 1];
            if (i !== 'x' || lastChar !== 'x') {
                result.push(i);
            }
        }
    })
    return result.join('');
}

const calculateUniqPhotos = instructions => {
    const moveArr = instructions.split("x");
    const box = [];
    let currentPosition = [0, 0];
    let nextPosition;
    // Here i<moveArr.length-1 is used because the last element in moveArr can only be '' or '{direaction}', both of them has no effect on the final calculation result
    for (let i = 0; i < moveArr.length - 1; i++) {
        const nextMove = moveArr[i];
        // if start with 'x'.
        if (nextMove === '') {
            box.push(currentPosition);
        } else {
            nextPosition = handleMove(currentPosition, nextMove);
            //if start with direction and box is empty.
            if (box.length === 0) {
                box.push(nextPosition);
            } else {
                //if box is not empty，check whether the box has the photo
                const isPositionExist = arrayHasElement(box, nextPosition);
                !isPositionExist && box.push(nextPosition);
            }
            // Relocation
            currentPosition = nextPosition;
        }
    }

    return box;
};

// Check whether an array element exist in a 2D array
const arrayHasElement = function (array, element) {
    for (let el of array) {
        if (el.length === element.length) {
            for (let index in el) {
                if (el[index] !== element[index]) {
                    break;
                }
                if (index == (el.length - 1)) {
                    return true;
                }
            }
        }
    }
    return false;
}

const instructionsSplit = (arr) => {
    const even = arr.filter((_item, index) => index % 2 === 0);
    const odd = arr.filter((_item, index) => index % 2 !== 0);
    return {
        first: even,
        second: odd
    }
}

const mergePhotosBox = (firstArr, secondArr) => {
    const array = [...firstArr, ...secondArr];
    const result = unique(array);
    return result
}

// Remove the duplicates in 2D array
const unique = (matrix) => {
    let res = [];
    matrix.map(item => {
        res[item] = item;
    })
    return Object.values(res);
}

module.exports = {
    instructionsValidation,
    removeDuplicateX,
    calculateUniqPhotos,
    instructionsSplit,
    mergePhotosBox
};