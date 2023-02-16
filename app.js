const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./helper/apiHelper');

const authRouter = require('./routes/api/authRouter');
const noticesRouter = require('./routes/api/noticesRouter');
const petsRouter = require('./routes/api/petsRouter');
const newsRouter = require('./routes/api/newsRouter');

const app = express();
const formatsLogger = process.env.NODE_ENV === 'development' ? 'dev' : 'short';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/users/', authRouter);
app.use('/notices', noticesRouter);
app.use('/pets', petsRouter);
app.use('/news', newsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(errorHandler);

module.exports = app;
