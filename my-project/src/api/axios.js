import axios from "axios";

export const movieApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDQ3NmUzMzg0YmMyZDU1NTViYWVmYjg2ZmRiYmM2ZSIsIm5iZiI6MTczMzQ3NDA0My44MjIsInN1YiI6IjY3NTJiNmZiODRjYTkyOGQwMGNhMDJmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.32R_zlPWiD9aitEQZbxu6nrQ8ndZvI58M3OIE0nEknI",
  },
});

// Movie APIs
export const searchMovies = async (query, page = 1) => {
  const res = await movieApi.get("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page,
    },
  });
  return res.data;
};

export const getMovieCast = async (movieId) => {
  const res = await movieApi.get(`/movie/${movieId}/credits`);
  return res.data.cast;
};

// TV Series APIs
export const getPopularTV = async () => {
  const res = await movieApi.get("/tv/popular");
  return res.data.results;
};

export const getAiringTodayTV = async () => {
  const res = await movieApi.get("/tv/airing_today");
  return res.data.results;
};

export const getTVDetails = async (tvId) => {
  const res = await movieApi.get(`/tv/${tvId}`);
  return res.data;
};

export const getTVCast = async (tvId) => {
  const res = await movieApi.get(`/tv/${tvId}/aggregate_credits`);
  return res.data.cast;
};
