const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { removeDuplicateX, calculateUniqPhotos, instructionsSplit, mergePhotosBox } = require('./controllers/drone');


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ foo: 'bar' });
});

app.post('/partOne', (req, res) => {
    const { instructions } = req.body;

    //TODO add filter

    // 1. Remove consecutive duplicate "x"
    let string = removeDuplicateX(instructions);

    // 2. Get billboard photos
    const photosBox = calculateUniqPhotos(string);

    // 3. Count photos
    const result = photosBox.length

    res.json(result);
});

app.post('/partTwo', (req, res) => {
    const { instructions } = req.body;

    //TODO add filter

    //let shortInstructions = removeDuplicateX(instructions);
    // 1. Distribute instructions
    const instructionsArr = [...instructions];
    const instructionsObj = instructionsSplit(instructionsArr);
    const { first, second } = instructionsObj;

    // 2. Get billboard photos of each drone
    //  2.1 For first drone
    const firstString = first.join('');
    let shortFirstString = removeDuplicateX(firstString);
    const firstPhtosBox = calculateUniqPhotos(shortFirstString);

    //  2.2 For second drone
    const secondString = second.join('');
    let shortSecondString = removeDuplicateX(secondString);
    const secondPhotosBox = calculateUniqPhotos(shortSecondString);

    // 3. Merge 2 billboard photos Box without duplicates
    const mergedPhotosBox = mergePhotosBox(firstPhtosBox, secondPhotosBox)

    // 4. Count photos
    const result = mergedPhotosBox.length;

    res.json(result);
});

app.listen(4001, () => console.log(`Api started at http://localhost:4001`));

