/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { imgUrl } from "../../../config/config";
const MovieList = ({
  movies,
  buttonLabel,
  category,
  onPosterClick,
  onSeeMoreClick,
}) => {
  return (
    <div className="p-4 flex flex-col items-center w-full max-w-4xl">
      {/* Tiêu đề danh mục */}
      <div className="flex justify-between items-center w-full mb-4">
        <h3 className="text-2xl font-bold text-black">{category}</h3>
        <button
          className="rounded-md text-white bg-violet-500 px-3 py-1 hover:bg-violet-600 transition"
          onClick={onSeeMoreClick}
        >
          {buttonLabel}
        </button>
      </div>

      {/* Danh sách phim */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="w-full transform transition duration-300 hover:scale-105 cursor-pointer"
            onClick={() => onPosterClick(movie)}
          >
            <img
              src={
                movie.poster_path
                  ? `${imgUrl}${movie.poster_path}`
                  : "https://via.placeholder.com/300x450"
              } // Đường dẫn mặc định nếu không có ảnh
              alt={movie.title || "Poster phim không có tên"}
              className="w-full h-auto rounded"
            />

            <h4 className="mt-2 text-center font-semibold">{movie.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
