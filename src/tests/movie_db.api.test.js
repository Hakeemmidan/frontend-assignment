import { getMovies, searchMovies } from '../api_utils/movie_db.api';

describe('GET /discover/movies', () => {
  let apiResponse;
  let apiResponseJson;

  beforeAll(async () => {
    apiResponse = await getMovies();
    apiResponseJson = await apiResponse.json();
  });
  it('returns a 200 response', () => {
    expect(apiResponse.status).toBe(200);
  });
  it('returns an array of movie objects', () => {
    expect(apiResponseJson.results).toBeInstanceOf(Array);
    expect(apiResponseJson.results[0]).toHaveProperty('id');
  });
  it('returns the movies sorted by release date in ascending order', () => {
    const firstMovieDate = new Date(apiResponseJson.results[0].release_date);
    const lastMovieDate = new Date(apiResponseJson.results[apiResponseJson.results.length - 1].release_date);
    expect(firstMovieDate.getTime()).toBeGreaterThan(lastMovieDate.getTime());
  });
});

describe('GET /search/movie', () => {
  let apiResponse;
  let apiResponseJson;

  beforeAll(async () => {
    apiResponse = await searchMovies();
    apiResponseJson = await apiResponse.json();
  });
  it('returns a 200 response', () => {
    expect(apiResponse.status).toBe(200);
  });
  it('returns an array of movie objects', () => {
    expect(apiResponseJson.results).toBeInstanceOf(Array);
    expect(apiResponseJson.results[0]).toHaveProperty('id');
  });
});
