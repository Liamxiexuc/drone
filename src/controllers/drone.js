const instructionsValidation = (validInstructions) => {
	if (!validInstructions) return false;
	const regex = /^[\^v<>x]*$/;
	return regex.test(validInstructions);
};

const handleMove = (position, nextMove) => {
	const currentPosition = [...position];
	const moveArr = [...nextMove];
	moveArr.forEach((move) => {
		switch (move) {
			case '<':
				currentPosition[0] -= 1;
				break;
			case '>':
				currentPosition[0] += 1;
				break;
			case '^':
				currentPosition[1] += 1;
				break;
			default:
				currentPosition[1] -= 1;
		}
	});

	return currentPosition;
};

const removeDuplicateX = (validInstructions) => {
	const validInstructionsArr = [...validInstructions];
	const result = [];
	validInstructionsArr.forEach((i) => {
		if (result.length === 0) {
			result.push(i);
		} else {
			const lastChar = result[result.length - 1];
			if (i !== 'x' || lastChar !== 'x') {
				result.push(i);
			}
		}
	});
	return result.join('');
};

const getUniqPhotos = (instructions) => {
    const moveArr = instructions.split('x');
    const box = [];
    let currentPosition = [0, 0];
    let nextPosition;
	// The last element in moveArr can only be '' or '{direaction}'
	// Both of them has no effect on the final calculation result
	const validMoveArr = moveArr.slice(0, moveArr.length - 1);
	validMoveArr.forEach((move) => {
		// if start with 'x'.
		if (move === '') {
			box.push(currentPosition);
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
			// Relocation
			currentPosition = nextPosition;
		}
	});
    return box;
};

// Check whether an array element exist in a 2D array
const arrayHasElement = function (array, element) {
	for (const el of array) {
		for (const index in el) {
			if (el.hasOwnProperty(index)) {
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
};

const instructionsSplit = (arr) => {
	const even = arr.filter((_item, index) => index % 2 === 0);
	const odd = arr.filter((_item, index) => index % 2 !== 0);
	return {
		firstInstructions: even.join(''),
		secondInstructions: odd.join(''),
	};
};

const mergeSnapshotsBox = (firstArr, secondArr) => {
	const array = [...firstArr, ...secondArr];
	const result = unique(array);
	return result;
};

// Remove the duplicates in 2D array
const unique = (matrix) => {
	const res = [];
	matrix.forEach((item) => {
		res[item] = item;
	});
	return Object.values(res);
};
//TODO testing
const getSingleDroneSnapshots = (instructions) => {
	// 1. Remove consecutive duplicate "x"
	const validInstructions = removeDuplicateX(instructions);
	// 2. Get billboard photos
	const photosBox = getUniqPhotos(validInstructions);
	return photosBox;
}

const getTwoDroneSnapshots = (instructions) => {
	// 1. Distribute instructions
	const instructionsArr = [...instructions];
	const instructionsObj = instructionsSplit(instructionsArr);
	const { firstInstructions, secondInstructions } = instructionsObj;
	// 2. Get billboard photos of each drone
	const firstSnapshotsBox = getSingleDroneSnapshots(firstInstructions);
	const secondSnapshotsBox = getSingleDroneSnapshots(secondInstructions);
	// 4. Merge 2 billboard photos Box without duplicates
	const mergedSnapshotsBox = mergeSnapshotsBox(firstSnapshotsBox, secondSnapshotsBox);
	return mergedSnapshotsBox;
}

module.exports = {
    instructionsValidation,
    removeDuplicateX,
    getUniqPhotos,
    instructionsSplit,
	mergeSnapshotsBox,
    handleMove,
    arrayHasElement,
	unique,
	getSingleDroneSnapshots,
	getTwoDroneSnapshots,
};
