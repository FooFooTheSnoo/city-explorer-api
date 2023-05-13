'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');

// initializing express
const app = express();

// middleware to allow open access with cors
app.use(cors())

const PORT = process.env.PORT;

app.get('/', (request, response) => {
  console.log(request.query);
  response.status(200).send('Hey your default route is working')
});

// NEXT param is for catch block
app.get('/weather', getWeather); 

app.get('/movie', getMovies);

app.get('*', (req, res) => {
  res.status(404).send('Not found')
});

app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});



app.listen(PORT, () => console.log(`listening on ${PORT}`))