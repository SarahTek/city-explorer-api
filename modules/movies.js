'use strict';

const axios = require('axios');

async function getMovies(searchQuery) {
  try {
    const url = `https://api.themoviedb.org/3/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
    const moviesData =  await axios.get(url);
    const moviesArray = moviesData.data.results.map(movie => new Movies(movie));
    return Promise.resolve(moviesArray);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
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
