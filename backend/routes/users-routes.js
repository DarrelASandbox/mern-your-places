const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('users');
  res.json({ message: 'hello users' });
});

module.exports = router;
