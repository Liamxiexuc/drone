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

const removeCharAfterLastX = (string) => {
    const stringArr = [...string];
    const lastIndex = stringArr.lastIndexOf("x");
    const result = stringArr.slice(0, lastIndex + 1);
    return result.join('');
}

const getMoveBetweenX = (string) => {
    const direactionArr = string.split('x');
    const getEffectDireaction = direactionArr.map(direaction => {

    })
}



module.exports = {
    countChar,
    removeDuplicateX,
    removeCharAfterLastX
};