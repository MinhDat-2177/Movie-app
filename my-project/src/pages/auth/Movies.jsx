// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { getMovies } from "../../services/mediaServies";
import { getPopularTV } from "../../api/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { imgUrl, dropPath } from "../../config/config";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import MovieCard from "../home/components/MoiveCard";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const [movieList, setMovieList] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMovies().then(setMovieList);
    getPopularTV().then(setPopularTV);
    // If you want to use getPopularMovies separately:
    // getPopularMovies().then(setPopularMovies);
  }, []);

  const handleNavigate = (id) => {
    console.log(id);
    navigate(`/description/${id}`);
  };

  // Navigation for TV Shows (update route as needed)
  const handleNavigateTV = (id) => {
    console.log(id);
    navigate(`/tv/${id}`); // Change route if you have a different TV show detail route
  };

  return (
    <div className="flex min-h-screen w-screen flex-col bg-gradient-to-b from-[#1a223f] to-[#23272f]">
      {/* Hero Swiper */}
      <Swiper
        slidesPerView={1}
        className="h-[70vh] w-full"
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
      >
        {movieList.map((movie) => (
          <SwiperSlide
            key={movie.id}
            className="flex items-center justify-center cursor-pointer transition-all duration-300"
            onClick={() => handleNavigate(movie.id)}
          >
            <div
              className="relative h-full w-full flex flex-row justify-between items-center px-10 bg-black/60"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(26,34,63,0.95) 40%, rgba(35,39,47,0.7)), url(${dropPath}${movie.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: "24px",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                margin: "32px 0",
              }}
            >
              <div className="flex flex-col w-1/2 gap-4 p-8">
                <span className="text-4xl text-white font-extrabold drop-shadow-lg">
                  {movie.original_title || "N/A"}
                </span>
                <span className="text-lg text-gray-200 mt-2 line-clamp-5">
                  {movie.overview || "Không có mô tả."}
                </span>
                <button
                  className="mt-6 w-max px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigate(movie.id);
                  }}
                >
                  Xem chi tiết
                </button>
              </div>
              <div className="flex flex-col w-1/2 items-center">
                <div className="rounded-2xl h-80 w-56 flex overflow-hidden shadow-2xl border-4 border-white/20 bg-gray-700/60">
                  <img
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    src={`${imgUrl}${movie.poster_path}`}
                    alt={movie.original_title || "Poster"}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Carousel Swiper for Movies */}
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-white mt-12 mb-4 px-4">Phim mới nổi bật</h2>
        <Swiper
          slidesPerView={6}
          spaceBetween={20}
          freeMode={true}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="mySwiper py-6"
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 6 },
          }}
        >
          {movieList.map((movie) => (
            <SwiperSlide
              key={movie.id}
              className="py-10 cursor-pointer group"
              onClick={() => handleNavigate(movie.id)}
            >
              <div className="transition-transform duration-300 group-hover:scale-105">
                <MovieCard
                  posterPath={movie.poster_path}
                  title={movie.original_title}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Popular TV Shows Section - Enhanced UI */}
      <div className="max-w-7xl mx-auto w-full px-4 py-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">📺</span>
          <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">Popular TV Shows</h2>
        </div>
        <Swiper
          slidesPerView={5}
          spaceBetween={24}
          freeMode={true}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="mySwiper py-8"
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {popularTV.map((tv) => (
            <SwiperSlide
              key={tv.id}
              className="group cursor-pointer flex flex-col items-center justify-center"
              onClick={() => handleNavigateTV(tv.id)}
            >
              <div className="rounded-2xl h-64 w-44 flex overflow-hidden shadow-2xl border-4 border-white/20 bg-gray-700/60 transition-transform duration-300 group-hover:scale-105">
                <img
                  className="h-full w-full object-cover"
                  src={`${imgUrl}${tv.poster_path}`}
                  alt={tv.name || "Poster"}
                />
              </div>
              <span className="mt-4 text-lg text-white font-semibold text-center line-clamp-2 group-hover:text-indigo-400 transition-colors duration-200">
                {tv.name}
              </span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Movies;