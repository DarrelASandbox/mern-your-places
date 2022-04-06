const { validationResult } = require('express-validator');
const crypto = require('crypto');

const HttpError = require('../models/http-error');

const USERS = [
  {
    id: 'u0',
    name: 'Mong Mong',
    email: 'mongmong@mongmail.com',
    password: 'passw0rd',
  },
  {
    id: 'u9999',
    name: 'Mong Dong',
    email: 'mongdong@mongmail.com',
    password: 'passw0rd',
  },
];

const generateId = () => crypto.randomBytes(10).toString('hex');
const getAllUsers = (req, res, next) => res.json({ users: USERS });

const createUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new HttpError('Invalid input', 422);

  const { name, email, password } = req.body;
  const user = USERS.filter((user) => user.email === email);
  if (user.length !== 0) throw new HttpError('Email already exists.', 422);

  const createdUser = {
    id: generateId(),
    name,
    email,
    password,
  };
  USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  const user = USERS.filter((user) => user.email === email);
  if (user.length === 0 || user[0].password !== password)
    throw new HttpError('Invalid credentials.', 401);

  res.json({ message: 'Logging in...' });
};

module.exports = { getAllUsers, loginUser, createUser };
