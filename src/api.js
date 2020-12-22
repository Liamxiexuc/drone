require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
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

app.use('/api/v1', routes);
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => logger.info(`Api started at http://localhost:${PORT}`));
