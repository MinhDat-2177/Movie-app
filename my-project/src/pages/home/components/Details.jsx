// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { imgUrl } from "../../../config/config";
import { useNavigate } from "react-router-dom";
import { getMovieCast } from "../../../api/axios";

const Details = ({ movie }) => {
  const navigate = useNavigate();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (movie.id) {
      getMovieCast(movie.id)
        .then(setCast)
        .catch(console.error);
    }
  }, [movie.id]);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
  }).format(value);

  const renderGenres = () =>
    !movie.genres || movie.genres.length === 0
      ? "N/A"
      : movie.genres.map((genre) => genre.name).join(", ");

  const renderProductionCompanies = () =>
    !movie.production_companies || movie.production_companies.length === 0
      ? "N/A"
      : movie.production_companies.map((company) => company.name).join(", ");

  const handleWatchMovie = () => {
    navigate(`/watch/${movie.id}`);
  };

  return (
    <div className="container mx-auto p-4 mt-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          {/* Poster */}
          <div className="md:w-1/3 flex-shrink-0 flex items-center justify-center bg-gray-100">
            <img
              src={`${imgUrl}${movie.poster_path}`}
              alt={movie.original_title}
              className="w-full h-auto max-h-[500px] object-contain rounded"
            />
          </div>

          {/* Movie Details */}
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{movie.title}</h1>
            <p className="text-lg text-gray-500 mb-4 italic">{movie.tagline || "N/A"}</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <DetailItem label="Original Title" value={movie.original_title} />
                <DetailItem label="Overview" value={movie.overview || "No description available."} />
                <DetailItem label="Release Date" value={movie.release_date} />
                <DetailItem label="Genres" value={renderGenres()} />
              </div>
              
              <div>
                <DetailItem label="Budget" value={formatCurrency(movie.budget)} />
                <DetailItem label="Revenue" value={formatCurrency(movie.revenue)} />
                <DetailItem label="Production Companies" value={renderProductionCompanies()} />
                <div className="flex items-center mt-3">
                  <span className="text-sm font-semibold text-gray-600 mr-2">Rating:</span>
                  <span className="text-lg font-bold text-yellow-600">
                    {movie.vote_average.toFixed(1)} / 10
                    <span className="text-sm text-gray-500 ml-1">
                      ({movie.vote_count} votes)
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div>
                <span className="font-semibold">Runtime:</span> {movie.runtime} minutes
              </div>
              <div>
                <span className="font-semibold">Original Language:</span> {movie.original_language}
              </div>
              <div>
                <span className="font-semibold">Status:</span> {movie.status}
              </div>
              {movie.homepage && (
                <div className="col-span-3">
                  <span className="font-semibold">Website:</span>{" "}
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {movie.homepage}
                  </a>
                </div>
              )}
            </div>

            {/* Cast */}
            {cast.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Cast</h2>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {cast.map((actor) => (
                    <div key={actor.id} className="w-28 flex-shrink-0 text-center">
                      <img
                        src={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                            : 'https://via.placeholder.com/150x225?text=No+Image'
                        }
                        alt={actor.name}
                        className="w-full h-40 object-cover rounded-lg mb-2"
                      />
                      <p className="text-sm font-medium text-gray-800">{actor.name}</p>
                      <p className="text-xs text-gray-500">as {actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Watch Movie Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleWatchMovie}
                className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
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

// Helper component for cleaner detail rows
function DetailItem({ label, value }) {
  return (
    <div className="mb-3">
      <p className="text-sm font-semibold text-gray-600">{label}</p>
      <p className="text-md">{value}</p>
    </div>
  );
}

DetailItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
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
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    production_companies: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    runtime: PropTypes.number,
    original_language: PropTypes.string,
    status: PropTypes.string,
    homepage: PropTypes.string,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Details;
