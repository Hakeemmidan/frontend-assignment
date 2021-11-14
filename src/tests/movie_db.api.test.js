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
