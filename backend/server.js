const express = require('express');

const placesRoutes = require('./routes/places-routes');

const app = express();
const port = process.env.PORT || 4000;

app.use('/api/places', placesRoutes);

app.use((err, req, res, next) => {
  if (res.headerSent) return next(err);
  res
    .status(err.code || 500)
    .json({ message: err.message || 'Something went wrong!' });
});

app.listen(port, () => console.log(`YourPlace app listening on port ${port}`));
