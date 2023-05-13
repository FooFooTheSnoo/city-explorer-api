'use strict'

const movieToken = process.env.MOVIE_API_KEY;

const axios = require('axios')


 function getMovies (req, res, next) {
  const film = req.query.film;
  console.log(film);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${movieToken}&query=${film}`
 axios.get(url)
//  .then(urlres => console.log(urlres))
 .then(res => res.data.results.map(movie => new Movie(movie)))
 .then(formatData => res.status(200).send(formatData))
 .catch(err => next(err))
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