const { validationResult } = require('express-validator');
const crypto = require('crypto');

const HttpError = require('../models/http-error');
const getCoordsFromAddress = require('../util/location');

let PLACES = [
  {
    id: 'p1',
    title: 'Pentagon',
    description:
      'The Pentagon is the headquarters building of the Shape of Solitude. ',
    imageURL:
      'https://images.unsplash.com/photo-1615692885947-94d720250cf0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    address: 'Alberta T0K 2M0, Canada',
    location: {
      lat: 49.0011354,
      lng: -113.8429555,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Hexagon',
    description: 'The Hexagon is the Cookhouse of the Shape of Solitude. ',
    imageURL:
      'https://images.unsplash.com/photo-1600331574095-4a20d3d8dd77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    address: 'Alberta T0K 2M0, Canada',
    location: {
      lat: 49.0011354,
      lng: -113.8429555,
    },
    creator: 'u2',
  },
];

const generateId = () => crypto.randomBytes(10).toString('hex');

const getPlaceById = (req, res, next) => {
  const place = PLACES.filter((place) => place.id === req.params.id);
  if (place.length === 0) throw new HttpError('No place found.', 404);
  res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  const userPlaces = PLACES.filter((place) => place.creator === req.params.id);
  if (userPlaces.length === 0)
    throw new HttpError('No places found with the given user id.', 404);
  res.json({ userPlaces });
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

  const createdPlace = {
    id: generateId(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  PLACES.push(createdPlace);
  res.status(201).json({ createdPlace });
};

const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new HttpError('Invalid input', 422);

  const { title, description } = req.body;
  const updatePlaceIndex = PLACES.findIndex(
    (place) => place.id === req.params.id
  );
  const updatePlace = {
    ...PLACES.filter((place) => place.id === req.params.id),
  };
  if (updatePlace.length === 0) throw new HttpError('No place found.', 404);

  updatePlace[0].title = title;
  updatePlace[0].description = description;
  PLACES[updatePlaceIndex] = updatePlace[0];

  res.status(200).json({ place: updatePlace[0] });
};

const deletePlace = (req, res, next) => {
  if (PLACES.filter((place) => place.id === req.params.id))
    throw new HttpError('No place found.');

  PLACES = PLACES.filter((place) => place.id !== req.params.id);
  res.status(200).json({ message: 'Place is deleted.' });
};

module.exports = {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
};
