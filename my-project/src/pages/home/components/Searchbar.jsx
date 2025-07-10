//* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { searchMovies } from './axios';

export default function SearchBar() {
  const [text, setText] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    if (!text.trim()) return;
    try {
      const data = await searchMovies(text);
      setMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input
        placeholder="Tìm phim..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={handleSearch}>Tìm</button>

      <div className="list">
        {movies.map(m => (
          <div key={m.id}>
            <img src={`https://image.tmdb.org/t/p/w200${m.poster_path}`} alt={m.title} />
            <h3>{m.title} ({m.release_date?.slice(0,4)})</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
