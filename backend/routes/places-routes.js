const express = require('express');
const router = express.Router();

const {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} = require('../controllers/places-controller');

router.get('/:id', getPlaceById);
router.get('/user/:id', getPlacesByUserId);

router.post('/', createPlace);

router.patch('/:id', updatePlace);

router.delete('/:id', deletePlace);

module.exports = router;
