const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ foo: 'bar' });
});

app.post('/', (req, res) => {
    const { instructions } = req.body;

    res.json({ number: instructions });
});

app.listen(4001, () => console.log(`Api started at http://localhost:4001`));

