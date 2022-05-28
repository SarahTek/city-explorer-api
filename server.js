'use strict';

// this library lets us access our .env file
require('dotenv').config();

// express is a server library
const express = require('express');

// library that determines who is allowed to speak to our server
const cors = require('cors');
const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');

// initalizes the express library
const app = express();
app.use(cors());

// we are getting the port variable from the .env file.
const PORT = process.env.PORT || 3002;

// const { default: axios } = require('axios');
// const { response } = require('express');
// const axios = require('axios');
// this settting says that everyone is allowed to speak to our server
// this is a route. if you turn the server on and go to http://localhost:3001/ (or whatever port you specified in your .env), you will see 'hello from the home route'
app.get('/', (request, response) => {
  response.send('Testing from home route');
});


app.get('/weather', async (request, response) => {
  getWeather(request)
    .then(weatherPromise => response.status(200).send(weatherPromise))
    .catch(error => response.status(500).send('weather not found on the city you searched for' + error));
});



app.get('/movies', async (request, response) => {
  getWeather(request.query.searchQuery)


    .then(moviesPromise => response.status(200).send(moviesPromise))
    .catch(error => response.status(500).send('movies were not found on the city you searched for' + error));
});

const error = require('./error');


// function weatherHandler(request, response) {
//   const lat = request.query.lat;
//   const lon = request.query.lon;
//   const weatherRes = reqWeather(lat, lon);
//   response.send(weatherRes);
// }


app.get('/movies', reqMovies);
app.use('*', error);




// this turns the server on to the port that you specifed in your .env file
app.listen(PORT, () => console.log(`listening on ${PORT}`));
