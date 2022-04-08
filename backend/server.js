const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

const HttpError = require('./models/http-error');
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');

const app = express();
const port = process.env.PORT || 4000;

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/places', placesRoutes);

app.use(
  '/backend/uploads/avatars',
  express.static(path.join(__dirname, 'uploads/avatars'))
);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  throw new HttpError('Could not find this route.', 404);
});
app.use((err, req, res, next) => {
  if (req.file) fs.unlink(req.file.path, (error) => console.log(error));

  if (res.headerSent) return next(err);
  res
    .status(err.code || 500)
    .json({ message: err.message || 'Something went wrong!' });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    app.listen(port, () =>
      console.log(`YourPlace app listening on port ${port}`)
    )
  )
  .catch((err) => console.log(err));
