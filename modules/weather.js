'use strict';

const axios = require('axios');

async function getWeather(request) {
  const searchQuery = request.query.searchQuery;
  try {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=7&city=${searchQuery}`;
    const weatherData = await axios.get(url);
    const weatherArray = weatherData.data.data.map(day => new Forecast(day));
    return Promise.resolve(weatherArray);
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
