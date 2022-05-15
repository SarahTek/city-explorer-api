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

app.get('/weather', (req, res) => {
  const type = req.query.type;
  console.log('type of list: ', type);
  const forecastResult = new Forecast(type);
  res.send(forecastResult);

}
);
class Forecast {

  static weather = require('./data/weather.json');

  constructor(type) {
    this.list = Forecast.weather.find(listObj => listObj.city_name === type);
    this.arr = this.list.data.map(banana => ({
      description: `${banana.low_temp} ${banana.max_temp} ${banana.weather.description}`,
      Date: `${banana.datetime}`
    }));

  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
