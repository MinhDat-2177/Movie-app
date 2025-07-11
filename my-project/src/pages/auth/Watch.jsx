// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { movieApi } from '../../api/axios';

const Watch = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [embedUrl, setEmbedUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTheaterMode, setIsTheaterMode] = useState(false);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        const { embedUrl, movieDetails } = await movieApi(id);
        setMovie(movieDetails.tmdb);
        setEmbedUrl(embedUrl);
      } catch (err) {
        setError(err);
        console.error('Failed to load movie', err);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center text-white">
          <h2 className="text-3xl text-red-500 mb-4 font-bold">Error Loading Movie</h2>
          <p className="text-gray-300">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!embedUrl) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center text-white">
          <h2 className="text-3xl text-yellow-500 mb-4 font-bold">Movie Not Available</h2>
          <p className="text-gray-300">This movie is currently not available for streaming.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isTheaterMode ? 'bg-black' : 'bg-gradient-to-br from-gray-900 to-gray-800'}`}>
      {/* Video Player Section */}
      <div className={`w-full ${isTheaterMode ? 'h-screen' : 'px-2 pt-6 md:px-8 md:pt-10'}`}>
        <div className={`relative ${isTheaterMode ? 'h-full' : 'aspect-video rounded-2xl overflow-hidden shadow-2xl'}`}>
          <iframe
            src={embedUrl}
            title={movie.title}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
            style={{ background: '#000' }}
          />
          {/* Theater Mode Toggle */}
          <button
            onClick={() => setIsTheaterMode(!isTheaterMode)}
            className="absolute top-4 right-4 bg-black/70 hover:bg-blue-600 text-white px-5 py-2 rounded-full shadow-lg font-semibold text-sm transition-all duration-300 z-10 backdrop-blur"
          >
            {isTheaterMode ? 'Exit Theater Mode' : 'Theater Mode'}
          </button>
        </div>
      </div>

      {/* Movie Information Section */}
      {!isTheaterMode && movie && (
        <div className="container mx-auto px-4 py-10 text-white">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Poster */}
            <div className="flex justify-center md:justify-start">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-2xl shadow-2xl w-64 h-auto object-cover border-4 border-blue-700/30"
              />
            </div>
            {/* Details */}
            <div className="md:col-span-2 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-400 drop-shadow-lg">{movie.title}</h1>
                <p className="text-gray-200 text-lg mb-6 italic">{movie.overview}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map(genre => (
                    <span
                      key={genre.id}
                      className="bg-blue-600/80 text-white px-4 py-1 rounded-full text-xs font-semibold shadow"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
                <div className="bg-gray-800/80 p-6 rounded-xl shadow-lg">
                  <h2 className="text-xl font-semibold mb-4 text-blue-300">Movie Details</h2>
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <div className="flex flex-col">
                      <span className="text-gray-400">Release Date</span>
                      <span>{movie.release_date}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400">Runtime</span>
                      <span>{movie.runtime} min</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400">Rating</span>
                      <span className="flex items-center">
                        <span className="text-yellow-400 text-lg mr-1">★</span>
                        <span>{movie.vote_average.toFixed(1)} / 10</span>
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400">Language</span>
                      <span className="uppercase">{movie.original_language}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Tagline */}
              {movie.tagline && (
                <div className="mt-8 text-blue-200 italic text-lg text-center md:text-left">
                  “{movie.tagline}”
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watch;