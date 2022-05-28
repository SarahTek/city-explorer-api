'use strict';

const axios = require('axios');
// const { response } = require('express');



async function getWeather(request) {

  const { lat, lon } = request.query;
  try {
    const weatherUrl = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=7&key=${process.env.WEATHER_API_KEY}
    `;
    const weatherResponse = await axios.get(weatherUrl);
    const weatherResults = weatherResponse.data.data.map(day => new Forecast(day));
    return Promise.resolve(weatherResults);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}


class Forecast {
  constructor(day) {
    this.description = `${day.low_temp} ${day.max_temp} ${day.weather.description}`;
    this.date = `${day.datetime}`;
  }
}
module.exports = getWeather;
