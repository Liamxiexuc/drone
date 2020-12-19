const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { countChar, removeDuplicateX, countBillboards } = require ('./utils/function');


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ foo: 'bar' });
});

app.post('/', (req, res) => {
    const { instructions } = req.body;
    const countX = countChar(instructions, 'x');

    //1. Remove consecutive duplicate "x" in instructions string
    let string = removeDuplicateX(instructions);
    console.log(string);

    //2. Count photos
    const result = countBillboards(string);

    res.json({ number: result });
});

app.listen(4001, () => console.log(`Api started at http://localhost:4001`));

