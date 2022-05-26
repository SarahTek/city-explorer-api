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
// const axios = require('axios');
// this settting says that everyone is allowed to speak to our server
const reqWeather = require('./weather');
const reqMovies = require('./movies');
const error = require ('./error');
app.use(cors());

// we are getting the port variable from the .env file.
const PORT = process.env.PORT || 3002;


// this is a route. if you turn the server on and go to http://localhost:3001/ (or whatever port you specified in your .env), you will see 'hello from the home route'
app.get('/', (request, response) => {
  response.send('Testing from home route');
});

app.get('/weather', reqWeather);
app.get('/movies', reqMovies);
app.use('*', error);


// this turns the server on to the port that you specifed in your .env file
app.listen(PORT, () => console.log(`listening on ${PORT}`));
