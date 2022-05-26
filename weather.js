'use strict';

const axios = require('axios');



async function reqWeather(request) {
  try {
    const lat = request.query.lat;
    const lon = request.query.lon;
    console.log(lat, lon);
    const weatherUrl = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
    const weatherResponse = await axios.get(weatherUrl);
    const weatherResults = weatherResponse.data.data.map(day => new Forecast(day));
    return Promise.resolve(weatherResults);
  } catch (error) {
    error.customMessage = 'something went wrong on your API call.';
    console.error(error.customMessage + error);
  }
}


class Forecast {
  constructor(day) {
    this.description = `${day.low_temp} ${day.max_temp} ${day.weather.description}`;
    this.date = `${day.datetime}`;
  }
}
module.exports = reqWeather;
