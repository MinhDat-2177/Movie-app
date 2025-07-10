import axios from 'axios';

export const movieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer YOUR_ACCESS_TOKEN',
  },
});

export const searchMovies = async (query, page = 1) => {
  const res = await movieApi.get('/search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page,
    },
  });
  return res.data;
};
