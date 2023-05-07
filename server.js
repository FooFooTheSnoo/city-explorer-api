'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherData = require('./data/weather.json')

// initializing express
const app = express();

// middleware to allow open access with cors
app.use(cors())


const PORT = process.env.PORT;

app.get('/', (request, response) => {
  response.status(200).send('Hey your default route is working')
});

// static date from lecture, probably not applicable
// NEXT param is for catch block
app.get('/weather', (request, response, next) => {
  console.log(request.query);
  // const { lat, lon, searchQuery } = request.query
  const selectCity = weatherData.find(city => city.city_name === searchQuery)
  const formattedData = selectCity.data.map(day => new Forecast(day))
  response.status(200).send(formattedData);
});

// make edits according to the assignment
// this is for formatting the data
class Forecast {
  constructor(obj) {
    this.date = obj.datetime;
    this.description = obj.weather.description
  }
}

// app.get('*', (req, res) => {
//   res.status(500).send(error.message);
// })


// fix this function -------------------
// app.use('error, req, res, next') => {
//   res.status.(500).send(error.message);
// })



app.listen(PORT, () => console.log(`listening on ${PORT}`))