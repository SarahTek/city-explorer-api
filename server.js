'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;
app.get('/', (request, response) => {
  response.send('Testing from home route');
});

app.get('/weather', async (request, response) => {
  getWeather(request)
    .then(weatherPromise => response.status(200).send(weatherPromise))
    .catch(error => response.status(500).send('weather not found on the city you searched for' + error));
});

app.get('/movies', async (request, response) => {
  getMovies(request.query.searchQuery)
    .then(moviesPromise => response.status(200).send(moviesPromise))
    .catch(error => response.status(500).send('movies were not found on the city you searched for' + error));
});

// const error = require('./error');
app.use('*', (request, response) => response.status(404).send('that end poind does not exixst'));

app.listen(PORT, () => console.log(`listening on ${PORT}`));
