const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  createUser,
  loginUser,
} = require('../controllers/users-controller');

router.get('/', getAllUsers);

router.post('/signup', createUser);
router.post('/login', loginUser);

module.exports = router;
