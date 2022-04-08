const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (error) {
    console.log(error);
    return next(new HttpError('Something went wrong!', 404));
  }
  res.json({ users });
};

const createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new HttpError('Invalid input', 422));

  const { name, email, password } = req.body;
  if (await User.findOne({ email }))
    return next(new HttpError('Email already exists.', 422));

  const createdUser = new User({
    name,
    email,
    avatar: req.file.path,
    password,
    places: [],
  });

  try {
    await createdUser.save();
    res.status(201).json({ createdUser });
  } catch (error) {
    console.log(error);
    return next(new HttpError('Failed to create.', 500));
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
    if (!existingUser || existingUser.password !== password)
      return next(new HttpError('Invalid credentials.', 401));
  } catch (error) {
    console.log(error);
    return next(new HttpError('Something went wrong!', 404));
  }

  res.json({ message: 'Logging in...', existingUser });
};

module.exports = { getAllUsers, loginUser, createUser };
