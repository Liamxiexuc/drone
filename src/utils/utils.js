const instructionsValidation = (validInstructions) => {
	if (!validInstructions) return false;
	const regex = /^[\^v<>x]*$/;
	return regex.test(validInstructions);
};

// Check whether an array element exist in a 2D array
const arrayHasElement = (array, element) => {
	for (const el of array) {
		for (const index in el) {
			if (el[index] !== element[index]) {
				break;
			}
			if (index == (el.length - 1)) {
				return true;
			}
		}
	}
	return false;
};

// Remove the duplicates in 2D array
const unique = (matrix) => {
	const res = [];
	matrix.forEach((item) => {
		res[item] = item;
	});
	return Object.values(res);
};

module.exports = {
	instructionsValidation,
	arrayHasElement,
	unique,
};
