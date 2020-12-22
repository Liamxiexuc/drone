const responseFormatter = require('../utils/responseFormatter');

/* eslint-disable no-unused-vars */
module.exports = (req, res, next) =>
    responseFormatter(res, 404, 'api end points not found', null);
