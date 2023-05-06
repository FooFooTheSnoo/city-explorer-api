'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherData = require('')

// initializing express
const app = express();

// middleware to allow open access with cors
app.use(cors())

const PORT = process.env.PORT;

app.get()('/', (request, response) => {
  response.status(200).send('Hey your default route is working')
});

// static date from lecture, probably not applicable
// NEXT param is for catch block
app.get('/shoppingList', (request, response, next) => {
  console.log(request.query);
  const { listName, name } = request.query
  console.log(listName, name);
  response.status(200).send(shoppingListData);
});

// make edits according to the assignment
// this is for formatting the data
class List {
  constructor(obj) {
    this.name = obj.name;
    this.description = obj.description
  }
}

app.get('*', (req, res) => {
  res.status(500).send(error.message);
})


// fix this function -------------------
app.use('error, req, res, next') => {
  res.status.(500).send(error.message);
})



app.listen(PORT, () => console.log('listening on ${PORT}'))