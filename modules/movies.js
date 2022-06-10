'use strict';

const axios = require('axios');
let cache = require('./cache.js');

function getMovies(searchQuery) {
  const key = 'movies-' + searchQuery;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;


  if (cache[key]&& (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit', cache[key].timestamp);
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(response => dayMovies(response.data));
  }
  return cache[key].data;
}

function dayMovies(moviesData) {
  try {
    const moviesSummaries = moviesData.results.map(movie => {
      return new Movies(movie);
    });
    return Promise.resolve(moviesSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Movies {
  constructor(movie) {
    this.title = movie.title;
    this.description = movie.overview;
    this.average_votes = movie.average_votes;
    this.total_votes = movie.total_votes;
    this.image_url = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    this.popularity = movie.popularity;
    this.released_on = movie.released_on;
  }
}

module.exports = getMovies;
