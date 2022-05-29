'use strict';

const axios = require('axios');

async function getMovies(searchQuery) {
  try {
    const movieUrl = `https://api.themoviedb.org/3/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
    const movieResponse =  await axios.get(movieUrl);
    const movieResult = movieResponse.data.results.map(movie => new Movie(movie));
    return Promise.resolve(movieResult);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}
class Movie {
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
