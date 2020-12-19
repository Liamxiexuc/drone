const countChar = (string, char) => {
    const stringArr = [...string];
    let num = 0;
    stringArr.forEach(i => {
        i === char && num++;
    })
    return num;
}

const handleMove = (currentPosition, nextMove) => {
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

const countBillboards = string => {
    const moveArr = string.split("x");
    const box = [];
    let currentPosition = [0, 0];
    let nextPosition;
    // Here i<moveArr.length-1 is used because the last element in moveArr can only be '' or '{direaction}', both of them has no effect on the final calculation result, so there is no need to bring it into the loop
    for (let i = 0; i < moveArr.length - 1; i++) {
        const nextMove = moveArr[i];
        // if start with 'x'.
        if (nextMove === '') {
            box.push([...currentPosition]);
        } else {
            nextPosition = handleMove(currentPosition, nextMove);
            //if start with direction and box is empty.
            if (box.length === 0) {
                box.push([...nextPosition]);
            } else {
                //if box is not empty，then validate whether the box has the photo
                const isPositionExist = arrayHasElement(box, nextPosition);
                !isPositionExist && box.push([...nextPosition]);
                console.log(box, 'box3')
            }
            // Relocation
            currentPosition = nextPosition;
        }
    }

    return box.length;
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



module.exports = {
    countChar,
    removeDuplicateX,
    countBillboards
};