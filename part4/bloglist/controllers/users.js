const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

userRouter.post('/', async (request, response) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(request.body.password, saltRounds);
  const newUser = new User({
    username: request.body.username,
    name: request.body.name,
    passwordHash,
  });
  const savedUser = await newUser.save();
  response.json(savedUser);
});

module.exports = userRouter;
