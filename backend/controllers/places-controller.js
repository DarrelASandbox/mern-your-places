const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Place = require('../models/place');
const User = require('../models/user');
const getCoordsFromAddress = require('../util/location');

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
    image: req.file.path,
    address,
    creator,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    return next(new HttpError('Failed to create.', 500));
  }

  if (!user) return next(new HttpError('Something went wrong!', 404));

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdPlace.save({ session });
    user.places.push(createdPlace);
    await user.save({ session });
    await session.commitTransaction();

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
  // @TODO: Prevent other user from deleting places not belonging to them.

  try {
    const place = await Place.findById(req.params.id).populate(
      'creator',
      '-password'
    );
    if (place.length === 0) return next();

    const session = await mongoose.startSession();
    session.startTransaction();
    await place.remove({ session });
    place.creator.places.pull(place);
    await place.creator.save({ session });
    await session.commitTransaction();

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
