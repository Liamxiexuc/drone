const {
    handleMove,
    removeDuplicateX,
	getUniqSnapshots,
    instructionsSplit,
	mergeSnapshotsBox,
	getSingleDroneSnapshots,
	getTwoDroneSnapshots,
} = require('../src/controllers/snapshot');

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

describe('getUniqSnapshots function', () => {
	it('should get empty array when there is no x in instruction', () => {
		const instruction = 'v<>';

		expect(getUniqSnapshots(instruction)).toEqual([]);
	});

	it('should get correct photos position array when there is a x in instruction', () => {
		const instruction = 'vx<>';

		expect(getUniqSnapshots(instruction)).toEqual([[0, -1]]);
	});

	it('should get correct photos position array when there is a x in instruction', () => {
		const instruction = 'xvx<>';

		expect(getUniqSnapshots(instruction)).toEqual([[0, 0], [0, -1]]);
	});
});

describe('instructionsSplit function', () => {
	it('should properly split the instruction strings of even characters and store as a object', () => {
		const string = 'xvx^';

		expect(instructionsSplit(string)).toEqual({ firstInstructions: 'xx', secondInstructions: 'v^' });
	});

	it('should properly split the instruction string of odd characters and store as a object', () => {
		const string = 'xvx';

		expect(instructionsSplit(string)).toEqual({ firstInstructions: 'xx', secondInstructions: 'v' });
	});
});

describe('mergeSnapshotsBox function', () => {
	it('should merge two matrix', () => {
		const firstArr = [
			[0, 0],
		];
		const secondArr = [
			[1, 1],
		];

		expect(mergeSnapshotsBox(firstArr, secondArr)).toEqual([[0, 0], [1, 1]]);
	});
});

describe('getSingleDroneSnapshots function', () => {
	it('should properly get Single Drone Snapshots', () => {
		const instructions = 'xvxv';

		expect(getSingleDroneSnapshots(instructions)).toEqual([[0, 0], [0, -1]]);
	});
});

describe('getTwoDroneSnapshots function', () => {
	it('should properly get Two Drone Snapshots', () => {
		const instructions = 'xvxv';

		expect(getTwoDroneSnapshots(instructions)).toEqual([[0, 0]]);
	});
});
