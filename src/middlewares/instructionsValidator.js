const { instructionsValidation } = require('../utils/utils');
const responseFormatter = require('../utils/responseFormatter');

module.exports = (req, res, next) => {
	const { droneNumber } = req.query;
	const { instructions } = req.body;

	if (!droneNumber) {
		return responseFormatter(
			res,
			400,
			'Drone Number parameter is missing',
			null,
		);
	}

	if (droneNumber !== '1' && droneNumber !== '2') {
		return responseFormatter(
			res,
			400,
			'Drone Number parameter is invalid',
			null,
		);
	}

	if (!instructionsValidation(instructions)) {
		return responseFormatter(
			res,
			400,
			'Invalid Instructions',
			null,
		);
	}
	return next();
};
