// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import { imgUrl } from "../../../config/config";
import { useNavigate } from "react-router-dom"; // Hook dùng để điều hướng

const Details = ({ movie }) => {
  const navigate = useNavigate(); // Hook điều hướng

  // Helper function to format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Helper function to render genres
  const renderGenres = () => {
    if (!movie.genres || movie.genres.length === 0) return "N/A";
    return movie.genres.map(genre => genre.name).join(", ");
  };

  // Helper function to render production companies
  const renderProductionCompanies = () => {
    if (!movie.production_companies || movie.production_companies.length === 0) return "N/A";
    return movie.production_companies.map(company => company.name).join(", ");
  };

  // Handle watching the movie (e.g., navigate to a page or play video)
  const handleWatchMovie = () => {
    // Ví dụ: điều hướng đến trang chi tiết phim hoặc phát trailer
    navigate(`/watch/${movie.id}`); // Điều hướng đến một trang với id phim
  };

  return (
    <div className="container mx-auto p-4 mt-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          {/* Poster */}
          <div className="md:w-1/3 flex-shrink-0">
            <img
              src={`${imgUrl}${movie.poster_path}`}
              alt={movie.original_title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Movie Details */}
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{movie.title}</h1>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-600">Original Title</p>
                <p className="text-lg">{movie.original_title}</p>

                <p className="text-sm font-semibold text-gray-600 mt-3">Overview</p>
                <p className="text-md">{movie.overview || "No description available."}</p>

                <p className="text-sm font-semibold text-gray-600 mt-3">Release Date</p>
                <p>{movie.release_date}</p>

                <p className="text-sm font-semibold text-gray-600 mt-3">Tagline</p>
                <p className="italic">{movie.tagline || "N/A"}</p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-gray-600">Genres</p>
                <p>{renderGenres()}</p>

                <p className="text-sm font-semibold text-gray-600 mt-3">Budget</p>
                <p>{formatCurrency(movie.budget)}</p>

                <p className="text-sm font-semibold text-gray-600 mt-3">Revenue</p>
                <p>{formatCurrency(movie.revenue)}</p>

                <p className="text-sm font-semibold text-gray-600 mt-3">Production Companies</p>
                <p className="text-sm">{renderProductionCompanies()}</p>

                <div className="flex items-center mt-3">
                  <span className="text-sm font-semibold text-gray-600 mr-2">Rating:</span>
                  <span className="text-lg font-bold text-yellow-600">
                    {movie.vote_average.toFixed(1)} / 10 
                    <span className="text-sm text-gray-500 ml-1">({movie.vote_count} votes)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-4 border-t pt-3 text-sm text-gray-600">
              <p>Runtime: {movie.runtime} minutes</p>
              <p>Original Language: {movie.original_language}</p>
              <p>Status: {movie.status}</p>
              {movie.homepage && (
                <p>
                  Website: <a 
                    href={movie.homepage} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline"
                  >
                    {movie.homepage}
                  </a>
                </p>
              )}
            </div>

            {/* Watch Movie Button */}
            <div className="mt-4">
              <button
                onClick={handleWatchMovie}
                className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
              >
                Watch Movie
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Details.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string,
    original_title: PropTypes.string,
    overview: PropTypes.string,
    release_date: PropTypes.string,
    tagline: PropTypes.string,
    budget: PropTypes.number,
    revenue: PropTypes.number,
    vote_average: PropTypes.number,
    vote_count: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string
    })),
    production_companies: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string
    })),
    runtime: PropTypes.number,
    original_language: PropTypes.string,
    status: PropTypes.string,
    homepage: PropTypes.string,
    id: PropTypes.number.isRequired, // Thêm trường id phim
  }).isRequired
};

export default Details;
