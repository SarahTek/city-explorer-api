'use strict';
const axios = require('axios');
let cache = require('./cache.js');


function getWeather(request) {
  const searchQuery = request.query.searchQuery;
  const key = 'weather-' + searchQuery;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=7&city=${searchQuery}`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(response => dayWeather(response.data));
  }
  return cache[key].data;
}


function dayWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Forecast(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Forecast {
  constructor(day) {
    this.description = `${day.low_temp} ${day.max_temp} ${day.weather.description}`;
    this.date = `${day.datetime}`;
  }
}
module.exports = getWeather;
