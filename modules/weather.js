'use strict'
const cache = require(('./cache'));
const weatherToken = process.env.WEATHER_API_KEY;

const axios = require('axios');

function getWeather (request, response, next) {
  const {lat,lon} = request.query
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${weatherToken}`

    const key = 'weather-' + request.query;
    if (cache[key] && (Date.now() - cache[key].timestamp < 120000)) {
      console.log('cache hit - sending data from cache');
      response.status(200).send(cache[key].data)
    }
    else {
      console.log('cache miss - new request to API');
      axios.get(url)
      .then(res => res.data.data.map(weather => new Forecast(weather)))
      .then(formattedData => {
        cache[key] = {};
        cache[key].data = formattedData;
        cache[key].timestamp = Date.now();
        
        response.status(200).send(formattedData)
      })
      .catch(err => next(err))
    }
  }

class Forecast {
  constructor(obj) {
    this.date = obj.datetime
    this.description = obj.weather.description
    this.max_temp = obj.max_temp
    this.low_temp = obj.low_temp
  }
}

module.exports = getWeather