'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT;
app.get('/', (request, response) => {
  response.send('Testing from home route');
});

app.get('/weather', (req, res, next) => {
  try {
    const type = req.query.type;
    console.log('type of list: ', type);
    const forecastResult = new Forecast(type);
    res.status(200).send(forecastResult);
  } catch (error) {
    error.customMessage = 'something went wrong on your API call.';
    console.error(error.customMessage + error);
    next(error);
  }
});
class Forecast {

  static weather = require('./data/weather.json');
  constructor(type) {
    this.list = Forecast.weather.find(listObj => listObj.city_name === type);
    this.arr = this.list.data.map(banana => ({
      description: `${banana.low_temp} ${banana.max_temp} ${banana.weather.description}`,
      date: `${banana.datetime}`
    }));

  }
}
app.use((error, request, response, next) => {
  response.status(500).send(`Something went wrong on the server when making API call: ${error.customMessage} call the developer ${error.message} `);
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
