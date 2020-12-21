const {
    instructionsValidation,
    handleMove,
    removeDuplicateX,
    getUniqPhotos,
    arrayHasElement,
    instructionsSplit,
    unique,
    mergePhotosBox,
} = require('../src/controllers/drone');

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

describe('handleMove function', () => {
    it('should clones position array when the drone back to same position', () => {
        const position = [0, 0];
        const nextMove = '^v<>';

        expect(handleMove(position, nextMove)).toEqual(position);
        expect(handleMove(position, nextMove)).not.toBe(position);
    });

    it('should get correct position when the nextMove is a single string', () => {
        const position = [0, 0];
        const nextMove = '>';

        expect(handleMove(position, nextMove)).toEqual([1, 0]);
    });

    it('should get correct position when the nextMove is a long string', () => {
        const position = [0, 0];
        const nextMove = '^^>>><^v';

        expect(handleMove(position, nextMove)).toEqual([2, 2]);
    });

    it('should get correct position when the start position is not [0, 0]', () => {
        const position = [-1, -1];
        const nextMove = '^>^^^v';

        expect(handleMove(position, nextMove)).toEqual([0, 2]);
    });
});

describe('removeDuplicateX function', () => {
	it('should get the same value when there is no x in string', () => {
		const string = 'v<>';

		expect(removeDuplicateX(string)).toBe(string);
	});

	it('should get the same value when there is no consecutive x in string', () => {
		const string = 'xvx<x>x';

		expect(removeDuplicateX(string)).toBe(string);
	});

	it('should properly remove consecutive duplicate x in string', () => {
		const string = 'xxvxxxxxx<x>xx';

		expect(removeDuplicateX(string)).toBe('xvx<x>x');
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

describe('getUniqPhotos function', () => {
	it('should get empty array when there is no x in instruction', () => {
		const instruction = 'v<>';

		expect(getUniqPhotos(instruction)).toEqual([]);
	});

	it('should get correct photos position array when there is a x in instruction', () => {
		const instruction = 'vx<>';

		expect(getUniqPhotos(instruction)).toEqual([[0, -1]]);
	});

	it('should get correct photos position array when there is a x in instruction', () => {
		const instruction = 'xvx<>';

		expect(getUniqPhotos(instruction)).toEqual([[0, 0], [0, -1]]);
	});
});

describe('instructionsSplit function', () => {
	it('should properly split the Arrays with even number of elements', () => {
		const array = ['x', 'v', 'x', '^'];

		expect(instructionsSplit(array)).toEqual({ first: ['x', 'x'], second: ['v', '^'] });
	});

	it('should properly split the Arrays with odd number of elements', () => {
		const array = ['x', 'v', 'x'];

		expect(instructionsSplit(array)).toEqual({ first: ['x', 'x'], second: ['v'] });
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

describe('mergePhotosBox function', () => {
	it('should merge two matrix', () => {
		const firstArr = [
			[0, 0],
		];
		const secondArr = [
			[1, 1],
		];

		expect(mergePhotosBox(firstArr, secondArr)).toEqual([[0, 0], [1, 1]]);
	});
});
