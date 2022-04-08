const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} = require('../controllers/places-controller');
const fileUpload = require('../middleware/file-upload');

router.get('/:id', getPlaceById);
router.get('/user/:id', getPlacesByUserId);

router.post(
  '/',
  fileUpload.single('image'),
  [
    check('title').trim().not().isEmpty(),
    check('description').trim().isLength({ min: 5 }),
    check('address').trim().not().isEmpty(),
  ],
  createPlace
);

router.patch(
  '/:id',
  [
    check('title').trim().not().isEmpty(),
    check('description').trim().isLength({ min: 5 }),
  ],
  updatePlace
);

router.delete('/:id', deletePlace);

module.exports = router;
