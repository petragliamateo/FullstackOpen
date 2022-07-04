const express = require('express');
require('express-async-errors');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('./utils/middleware');
const blogRouter = require('./controllers/blogs');
const { MONGODB_URI } = require('./utils/config');

mongoose.connect(MONGODB_URI)
  .then(() => console.log('connected!'))
  .catch(() => console.log('Error'));

app.use(cors());
app.use(express.json());
// blogRouter usa json parse para el body
app.use('/api/blogs', blogRouter);
app.use(errorHandler);

module.exports = app;
