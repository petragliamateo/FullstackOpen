/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
  },
});

userSchema.set('toJSON', {
  transform: (document, returned) => {
    returned.id = returned._id.toString();
    delete returned._id;
    delete returned.__v;
    delete returned.passwordHash;
  },
});

module.exports = mongoose.model('User', userSchema);
