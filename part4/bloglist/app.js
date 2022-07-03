const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blogs');
const { MONGODB_URI } = require('./utils/config');

mongoose.connect(MONGODB_URI)
  .then(() => console.log('connected!'))
  .catch(() => console.log('Error'));

app.use(cors());
app.use(express.json());
// blogRouter usa json parse para el body
app.use('/api/blogs', blogRouter);

module.exports = app;
