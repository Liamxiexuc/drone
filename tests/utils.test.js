const {
	instructionsValidation,
	arrayHasElement,
	unique,
} = require('../src/utils/utils');

describe('instructions validate function', () => {
	it('should return false when instruction is a empty string', () => {
		const instruction = '';

		expect(instructionsValidation(instruction)).toBe(false);
	});

	it('should return false when instruction incorrect', () => {
		const instruction = 'abc';

		expect(instructionsValidation(instruction)).toBe(false);
	});

	it('should return true when instruction correct', () => {
		const instruction = 'x^xv<>';

		expect(instructionsValidation(instruction)).toBe(true);
	});
});

describe('arrayHasElement function', () => {
	it('should return false when the array element does not exist in the 2D array', () => {
		const array = [
			[0, 0],
			[1, 1],
		];
		const element = [2, 2];

		expect(arrayHasElement(array, element)).toBe(false);
	});

	it('should return true when the array element exist in the 2D array', () => {
		const array = [
			[0, 0],
			[1, 1],
		];
		const element = [1, 1];

		expect(arrayHasElement(array, element)).toBe(true);
	});
});

describe('unique function', () => {
	it('should clones the matrix when there are no same elements in the matrix', () => {
		const matrix = [
			[0, 0],
			[1, 1],
		];

		expect(unique(matrix)).toEqual(matrix);
		expect(unique(matrix)).not.toBe(matrix);
	});

	it('should remove duplicate elements when there are same elements in the matrix', () => {
		const matrix = [
			[0, 0],
			[1, 1],
			[0, 0],
		];

		expect(unique(matrix)).toEqual([[0, 0], [1, 1]]);
	});
});
