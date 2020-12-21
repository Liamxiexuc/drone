const express = require('express');
const responseFormatter = require('../utils/responseFormatter');
const instructionsValidator = require('../middlewares/instructionsValidator');
const { createSnapshots } = require('../controllers/snapshot');

const router = express.Router();

router.get('/', (req, res) =>
	responseFormatter(
		res,
		200,
		'Welcome to the Drone Challenge api!',
		null,
	));
router.post('/snapshots', instructionsValidator, createSnapshots);

module.exports = router;
