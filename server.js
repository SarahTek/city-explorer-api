'use strict';

// this library lets us access our .env file
require('dotenv').config();

// express is a server library
const express = require('express');

// initalizes the express library
const app = express();

// library that determines who is allowed to speak to our server
const cors = require('cors');
// const { default: axios } = require('axios');
// const { response } = require('express');
const axios = require('axios');

// this settting says that everyone is allowed to speak to our server
app.use(cors());

// we are getting the port variable from the .env file.
const PORT = process.env.PORT;


// this is a route. if you turn the server on and go to http://localhost:3001/ (or whatever port you specified in your .env), you will see 'hello from the home route'
app.get('/', (request, response) => {
  response.send('Testing from home route');
});

app.get('/weather', async (request, response, next) => {
  try {
    const lat = request.query.lat;
    const lon = request.query.lon;
    console.log(lat, lon);
    const weatherUrl = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
    const weatherResponse = await axios.get(weatherUrl);
    const weatherResults = weatherResponse.data.data.map(day => new Forecast(day));
    response.status(200).send(weatherResults);
  } catch (error) {
    error.customMessage = 'something went wrong on your API call.';
    console.error(error.customMessage + error);
    next(error);
  }
});

app.get('/.movie', async (request, response, next) => {
  try {
    const searchQuery = request.searchQuery;
    const movieUrl = `https://api.themoviedb.org/3/movie?api_key=${proces.env.MOVIE_API_KEY}&query=${searchQuery}`;
    const movieResponse = await axios.get(movieUrl);
    const movieResult = movieResponse.data.map(movie => new Movie(movie));
    response.status(200).send(movieResult);
  } catch (error) {
    error.customMessage = 'something went wrong on your API call.';
    console.error(error.customMessage + error);
    next(error);
  }
});
class Forecast {
  constructor(day) {
    this.description = `${day.low_temp} ${day.max_temp} ${day.weather.description}`;
    this.date = `${day.datetime}`;
  }
}
class Movie {

}
app.use((error, request, response, next) => {
  response.status(500).send(`Something went wrong on the server when making API call: ${error.customMessage} call the developer ${error.message} `);
})


// this turns the server on to the port that you specifed in your .env file
app.listen(PORT, () => console.log(`listening on ${PORT}`));
