const express = require('express');
const router = express.Router();

const PLACES = [
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

router.get('/:id', (req, res, next) => {
  const placeId = req.params.id;
  const place = PLACES.filter((place) => place.id === placeId);
  if (place.length === 0)
    return res.status(404).json({ message: 'No place found.' });
  res.json({ place });
});

router.get('/user/:id', (req, res, next) => {
  const userId = req.params.id;
  const user = PLACES.filter((place) => place.creator === userId);
  if (user.length === 0)
    return res.status(404).json({ message: 'No user found.' });
  res.json({ user });
});

module.exports = router;
