const API_KEY = process.env.REACT_APP_MOVIE_DB_API_KEY;
const API_DOMAIN  = process.env.REACT_APP_API_DOMAIN;

// Gets initial set of movies from REACT_APP_API_DOMAIN (MovieDB)
export const getMovies = async (page = 1) => {
  return await fetch(
    `${API_DOMAIN}/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=primary_release_date.desc`
  );
}

// Get REACT_APP_API_DOMAIN (MovieDB) movies using search query
export const searchMovies = async (query, page = 1) => {
  return await fetch(
    `${API_DOMAIN}/search/movie?api_key=${API_KEY}&query=${encodeURI(query)}&page=${page}`
  );
}
