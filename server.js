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

// the general struct is domain name/url followed by the route
// http://localhost:3001-domainName
//  / = endpoint/path
app.get('/', (request, response) => {
  console.log(request.query);
  response.status(200).send('Hey your default route is working')
});

// NEXT param is for catch block
app.get('/weather', (request, response, next) => {
  try {
    const { lat, lon, searchQuery } = request.query
    console.log(lat, lon, searchQuery);
    // const searchQuery = request.query.searchQuery
    const selectCity = weatherData.find((city)=> city.city_name === searchQuery)
    if (weatherData === undefined) {
      response.status(404).send('Not found');
    } else {
      let formattedData = selectCity.data.map(day => new Forecast(day))
      response.status(200).send(formattedData);
    }
    const formattedData = selectCity.data.map(day => new Forecast(day))
    response.status(200).send(formattedData);
  }
  catch (error) {
    next(error);
  }
});

// make edits according to the assignment
// this is for formatting the data
class Forecast {
  constructor(obj) {
    this.date = obj.datetime
    this.description = obj.weather.description
    this.lowTemp = obj.low_temp
    this.highTemp = obj.max_temp
  }
}

app.get('*', (req, res) => {
  res.status(404).send('Not found')
});

app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});



app.listen(PORT, () => console.log(`listening on ${PORT}`))