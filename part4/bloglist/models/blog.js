/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

blogSchema.set('toJSON', {
  transform: (document, returned) => {
    returned.id = returned._id.toString();
    returned.likes = returned.likes ? returned.likes : 0;
    delete returned._id;
    delete returned.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
