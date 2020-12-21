require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const {
    instructionsValidation, getSingleDroneSnapshots, getTwoDroneSnapshots
} = require('./controllers/drone');
const logger = require('./utils/logger');
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFound');

const PORT = process.env.PORT || 4001;

process.on('uncaughtException', (e) => {
    logger.error(e.message);
    process.exit(1);
});

process.on('unhandledRejection', (e) => {
    logger.error(e.message);
    process.exit(1);
});

const app = express();

const morganLog =
    process.env.NODE_ENV === 'production' ? morgan('common') : morgan('dev');

app.use(helmet());
app.use(morganLog);
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json('API ready');
});

app.post('/partOne', (req, res) => {
    const { instructions } = req.body;

    if (!instructionsValidation(instructions)) return res.status(400).json('Invalid Instructions');

    const snapshotsBox = getSingleDroneSnapshots(instructions);

    const result = snapshotsBox.length;

    return res.json(result);
});

app.post('/partTwo', (req, res) => {
    const { instructions } = req.body;

    if (!instructionsValidation(instructions)) return res.status(400).json('Invalid Instructions');

    const mergedSnapshotsBox = getTwoDroneSnapshots(instructions);

    const result = mergedSnapshotsBox.length;

    return res.json(result);
});
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => logger.info(`Api started at http://localhost:${PORT}`));
