const express = require('express');
const responseFormatter = require('../utils/responseFormatter');
const instructionsValidator = require('../middlewares/instructionsValidator');
const { getSingleDroneSnapshots, getTwoDroneSnapshots } = require('../controllers/snapshot');

const router = express.Router();

router.get('/', (req, res) => {
    responseFormatter(
        res,
        200,
        'Welcome to the Drone Challenge api!',
        null,
    );
});

router.post('/snapshots', instructionsValidator, (req, res) => {
    const { instructions } = req.body;
    const { droneNumber } = req.query;
    let snapshotsBox = [];
    if (droneNumber === '1') {
        snapshotsBox = getSingleDroneSnapshots(instructions);
    } else {
        snapshotsBox = getTwoDroneSnapshots(instructions);
    }
    const result = snapshotsBox.length;
    return responseFormatter(res, 200, 'ok', result);
});

module.exports = router;
