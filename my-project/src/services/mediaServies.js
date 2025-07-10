import { movieApi } from "../api/axios"
export const getMovies = async () => {
    try {
      const response = await movieApi.get(`movie/popular`)
      return response.data.results
    } catch (error) {
      console.log(error)
    }
  }
  export const getMovieDetails = async (movieId) => {
    try {
      const response = await movieApi.get(`/movie/${movieId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return null;
    }
  };