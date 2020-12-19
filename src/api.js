const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { removeDuplicateX, countBillboards, instructionsSplit, mergeTwoDArray } = require('./utils/function');


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ foo: 'bar' });
});

app.post('/partOne', (req, res) => {
    const { instructions } = req.body;

    //1. Remove consecutive duplicate "x" in instructions string
    let string = removeDuplicateX(instructions);

    //2. Count photos
    const result = countBillboards(string).length;

    res.json({ number: result });
});

app.post('/partTwo', (req, res) => {
    const { instructions } = req.body;
    let shortInstructions = removeDuplicateX(instructions);
    const instructionsArr = [...shortInstructions];
    const instructionsObj = instructionsSplit(instructionsArr);
    const { first, second } = instructionsObj;

    // for first drone
    const firstString = first.join('');
    //removeDuplicateX
    let shortFirstString = removeDuplicateX(firstString);
    const firstBillboardsBox = countBillboards(shortFirstString);

    // for second drone
    const secondString = second.join('');
    //removeDuplicateX
    let shortSecondString = removeDuplicateX(secondString);
    const secondBillboardsBox = countBillboards(shortSecondString);
    const result = mergeTwoDArray(firstBillboardsBox, secondBillboardsBox)
    const num = result.length;

    res.json({ number: num });
});

app.listen(4001, () => console.log(`Api started at http://localhost:4001`));

