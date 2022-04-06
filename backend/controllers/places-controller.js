const { validationResult } = require('express-validator');
const crypto = require('crypto');

const HttpError = require('../models/http-error');
const getCoordsFromAddress = require('../util/location');
const Place = require('../models/place');

const generateId = () => crypto.randomBytes(10).toString('hex');

const getPlaceById = async (req, res, next) => {
  let place;
  try {
    place = await Place.findById(req.params.id);
  } catch (error) {
    console.log(error);
    return next(new HttpError('Invalid place id.', 404));
  }

  if (!place) return next(new HttpError('No place found.', 404));
  res.json({ place });
};

const getPlacesByUserId = async (req, res, next) => {
  try {
    const userPlaces = await Place.find({ creator: req.params.id });
    if (userPlaces.length === 0)
      return next(
        new HttpError('No places found with the given user id.', 404)
      );
    res.json({ userPlaces });
  } catch (error) {
    console.log(error);
    return next(new HttpError('Something went wrong.', 404));
  }
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new HttpError('Invalid input', 422));

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsFromAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    location: coordinates,
    image:
      'https://images.unsplash.com/photo-1583068433548-98aeb322f1d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    address,
    creator,
  });

  try {
    await createdPlace.save();
    res.status(201).json({ createdPlace });
  } catch (error) {
    console.log(error);
    return next(new HttpError('Failed to create.', 500));
  }
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new HttpError('Invalid input', 422));

  try {
    const { title, description } = req.body;
    const updatePlace = await Place.findById(req.params.id);

    updatePlace.title = title;
    updatePlace.description = description;

    await updatePlace.save();
    res.status(200).json({ updatePlace });
  } catch (error) {
    console.log(error);
    return next(new HttpError('Failed to update.', 500));
  }
};

const deletePlace = async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);
    if (place.length === 0) return next();
    res.status(200).json({ message: 'Place is deleted.' });
    await place.remove();
  } catch (error) {
    console.log(error);
    return next(new HttpError('Failed to delete.', 500));
  }
};

module.exports = {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
};
