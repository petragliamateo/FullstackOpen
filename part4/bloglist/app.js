const express = require('express');
require('express-async-errors');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { errorHandler, tokenExtractor } = require('./utils/middleware');
const { MONGODB_URI } = require('./utils/config');
// Rutas:
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const testingRouter = require('./controllers/testing');

mongoose.connect(MONGODB_URI)
  .then(() => console.log('connected!'))
  .catch(() => console.log('Error'));

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);
// blogRouter usa json parse para el body
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter);
  console.log('testing route enabled');
}

app.use(errorHandler);

module.exports = app;
