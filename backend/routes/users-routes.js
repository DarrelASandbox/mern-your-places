const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const {
  getAllUsers,
  createUser,
  loginUser,
} = require('../controllers/users-controller');
const fileUpload = require('../middleware/file-upload');

router.get('/', getAllUsers);

router.post(
  '/signup',
  fileUpload.single('image'),
  [
    check('name').trim().not().isEmpty(),
    check('email').trim().isEmail().normalizeEmail(),
    check('password').trim().isLength({ min: 5 }),
  ],
  createUser
);
router.post('/login', loginUser);

module.exports = router;
