/**
 * InstructionsValidation
 * Check the instructions given is valid or not.
 * @param {String} instructions The instructions string
 */
const instructionsValidation = (instructions) => {
    if (!instructions) return false;
    const regex = /^[\^v<>x]*$/;
    return regex.test(instructions);
};

/**
 * ArrayHasElement
 * Check whether an array element exist in a 2D array
 * @param {Array} array The 2D array
 * @param {Array} element The array element
 */
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

/**
 * Unique
 * Remove the duplicates array element in 2D array
 * @param {Array} matrix The 2D array
 */
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
