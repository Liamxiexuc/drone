const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { instructionsValidation, removeDuplicateX, calculateUniqPhotos, instructionsSplit, mergePhotosBox } = require('./controllers/drone');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json('API ready');
});

app.post('/partOne', (req, res) => {
    const { instructions } = req.body;

    // 1. Check instructions format (only allow <>^vx )
    if (!instructionsValidation(instructions)) return res.status(400).json('Invalid Instructions');

    // 2. Remove consecutive duplicate "x"
    let string = removeDuplicateX(instructions);

    // 3. Get billboard photos
    const photosBox = calculateUniqPhotos(string);

    // 4. Count photos
    const result = photosBox.length

    res.json(result);
});

app.post('/partTwo', (req, res) => {
    const { instructions } = req.body;

    // 1. Check instructions format (only allow <>^vx )
    if (!instructionsValidation(instructions)) return res.status(400).json('Invalid Instructions');

    // 2. Distribute instructions
    const instructionsArr = [...instructions];
    const instructionsObj = instructionsSplit(instructionsArr);
    const { first, second } = instructionsObj;

    // 3. Get billboard photos of each drone
    //  3.1 For first drone
    const firstString = first.join('');
    let shortFirstString = removeDuplicateX(firstString);
    const firstPhtosBox = calculateUniqPhotos(shortFirstString);

    //  3.2 For second drone
    const secondString = second.join('');
    let shortSecondString = removeDuplicateX(secondString);
    const secondPhotosBox = calculateUniqPhotos(shortSecondString);

    // 4. Merge 2 billboard photos Box without duplicates
    const mergedPhotosBox = mergePhotosBox(firstPhtosBox, secondPhotosBox)

    // 5. Count photos
    const result = mergedPhotosBox.length;

    res.json(result);
});

app.listen(4001, () => console.log(`Api started at http://localhost:4001`));

