const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
    .populate('blogs', {
      title: 1, author: 1, url: 1,
    });
  response.json(users);
});

userRouter.post('/', async (request, response) => {
  if (request.body.password.length <= 3) {
    response.status(400).send({ error: 'Incorrect password' });
  }
  const { username, name, password } = request.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const newUser = new User({
    username, name, passwordHash,
  });
  const savedUser = await newUser.save();
  response.status(201).json(savedUser);
});

userRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = userRouter;
