'use strict';

const axios = require('axios');

async function reqMovies(request) {
  try {
    const searchQuery = request.searchQuery;
    const movieUrl = `https://api.themoviedb.org/3/movie?api_key=${proces.env.MOVIE_API_KEY}&query=${searchQuery}`;
    const movieResponse = await axios.get(movieUrl);
    const movieResult = movieResponse.data.results.map(movie => new Movie(movie));
    return Promise.resolve(movieResult);
  } catch (error) {
    error.customMessage = 'something went wrong on your API call.';
    console.error(error.customMessage + error);
  }
}

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.description = movie.overview;
    this.average_votes = movie.average_votes;
    this.total_votes = movie.total_votes;
    this.image_url = movie.image_url;
    this.popularity = movie.popularity;
    this.released_on = movie.released_on;
  }
}


module.exports = reqMovies;
