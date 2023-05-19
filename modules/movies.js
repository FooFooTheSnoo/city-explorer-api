'use strict'

const cache = require('./cache');
const movieToken = process.env.MOVIE_API_KEY;

const axios = require('axios')


function getMovies(req, res, next) {
  const film = req.query.film;
  console.log(film);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${movieToken}&query=${film}`

  const key = 'movies' + film;
  console.log(cache[key]);
  if (cache[key] && (Date.now() - cache[key].timestamp < 120000)) {
    console.log('cache hit - sending data from cache');
    res.status(200).send(cache[key].data)
  }
  else {
    console.log('cache miss - new req to API')
    axios.get(url)
      .then(res => res.data.results.map(movie => new Movie(movie)))
      .then(formatData => {
        cache[key] = {};
        cache[key].data = formatData;
        cache[key].timestamp = Date.now();

        // console.log(cache[key].data);
        res.status(200).send(formatData)
      })
      .catch(err => next(err))

  }
};


class Movie {
  constructor(obj) {
    this.name = obj.title
    this.overview = obj.overview
    this.average_vote = obj.vote_average
    this.count = obj.vote_count
    this.release_date = obj.release_date
    this.popularity = obj.popularity
    this.poster = obj.poster_path
  }
}

module.exports = getMovies;