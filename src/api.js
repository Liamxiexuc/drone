const express = require('express');
const app = express();
const cors = require('cors');
const {
    instructionsValidation, removeDuplicateX, getUniqPhotos, instructionsSplit, mergePhotosBox,
} = require('./controllers/drone');

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
    const string = removeDuplicateX(instructions);

    // 3. Get billboard photos
    const photosBox = getUniqPhotos(string);

    // 4. Count photos
    const result = photosBox.length;

    return res.json(result);
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
    const validFirstString = removeDuplicateX(firstString);
    const firstPhtosBox = getUniqPhotos(validFirstString);

    //  3.2 For second drone
    const secondString = second.join('');
    const validSecondString = removeDuplicateX(secondString);
    const secondPhotosBox = getUniqPhotos(validSecondString);

    // 4. Merge 2 billboard photos Box without duplicates
    const mergedPhotosBox = mergePhotosBox(firstPhtosBox, secondPhotosBox);

    // 5. Count photos
    const result = mergedPhotosBox.length;

    return res.json(result);
});

app.listen(4001, () => console.log('Api started at http://localhost:4001'));
