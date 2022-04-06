const express = require('express');

const HttpError = require('./models/http-error');
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');

const app = express();
const port = process.env.PORT || 4000;

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  throw new HttpError('Could not find this route.', 404);
});
app.use((err, req, res, next) => {
  if (res.headerSent) return next(err);
  res
    .status(err.code || 500)
    .json({ message: err.message || 'Something went wrong!' });
});

app.listen(port, () => console.log(`YourPlace app listening on port ${port}`));
