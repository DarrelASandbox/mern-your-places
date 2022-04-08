const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

  const hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = new User({
    name,
    email,
    avatar: req.file.path,
    password: hashedPassword,
    places: [],
  });

  const token = jwt.sign({ userId: createdUser._id }, process.env.JWT_SECRET, {
    expiresIn: '6 days',
  });

  try {
    await createdUser.save();
    res.status(201).json({ token, userId: createdUser._id });
  } catch (error) {
    console.log(error);
    return next(new HttpError('Failed to create.', 500));
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!existingUser || !isValidPassword)
      return next(new HttpError('Invalid credentials.', 401));
  } catch (error) {
    console.log(error);
    return next(new HttpError('Something went wrong!', 404));
  }

  const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token, userId: existingUser._id });
};

module.exports = { getAllUsers, loginUser, createUser };
