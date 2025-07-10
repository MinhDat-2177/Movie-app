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
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-center text-white">
          <h2 className="text-2xl text-red-500 mb-4">Error Loading Movie</h2>
          <p className="text-gray-300">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!embedUrl) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-center text-white">
          <h2 className="text-2xl text-yellow-500 mb-4">Movie Not Available</h2>
          <p className="text-gray-300">This movie is currently not available for streaming.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isTheaterMode ? 'bg-black' : 'bg-gray-900'}`}>
      {/* Video Player Section */}
      <div className={`w-full ${isTheaterMode ? 'h-screen' : 'px-4 pt-4'}`}>
        <div className={`relative ${isTheaterMode ? 'h-full' : 'aspect-video'}`}>
          <iframe
            src={embedUrl}
            title={movie.title}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
          />
          
          {/* Theater Mode Toggle */}
          <button
            onClick={() => setIsTheaterMode(!isTheaterMode)}
            className="absolute top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
          >
            {isTheaterMode ? 'Exit Theater Mode' : 'Theater Mode'}
          </button>
        </div>
      </div>

      {/* Movie Information Section */}
      {!isTheaterMode && movie && (
        <div className="container mx-auto px-4 py-8 text-white">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
              <p className="text-gray-300 text-lg mb-6">{movie.overview}</p>
              
              <div className="bg-gray-800 p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Movie Details</h2>
                <div className="space-y-3">
                  <p className="flex justify-between">
                    <span className="text-gray-400">Release Date</span>
                    <span>{movie.release_date}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-400">Runtime</span>
                    <span>{movie.runtime} minutes</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-400">Rating</span>
                    <span className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{movie.vote_average.toFixed(1)} / 10</span>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Genres</h2>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map(genre => (
                    <span
                      key={genre.id}
                      className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watch;