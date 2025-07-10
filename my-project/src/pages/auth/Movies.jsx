// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { getMovies } from "../../services/mediaServies";
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await getMovies();
      setMovieList(movies);
    };

    fetchMovies();
  }, []);

  const handleNavigate = (id) => {
    console.log(id)
    navigate(`/description/${id}`);
  };
  
  return (
    <div className="flex min-h-screen w-screen flex-wrap px-4">
      {/* Swiper chính với hình ảnh nền lớn */}
      <Swiper
        slidesPerView={1}
        className="h-[70vh] w-[100vw]"
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
      >
        {movieList.map((movie) => (
          <SwiperSlide key={movie.id}
          className="min-w-full h-full flex items-center justify-center cursor-pointer"
          onClick={()=> handleNavigate(movie.id)}
          >
            <div
              className="h-full w-full flex flex-row justify-between items-center px-10"
              style={{
                backgroundImage: `url(${dropPath}${movie.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="flex flex-col w-1/2">
                <span className="text-3xl text-white font-bold">
                  {movie.original_title || "N/A"}
                </span>
                <span className="text-xl text-white mt-4">
                  {movie.overview || "Không có mô tả."}
                </span>
              </div>
              <div className="flex flex-col w-1/2 items-center">
                <div className="rounded-[8px] h-72 w-48 flex overflow-hidden bg-gray-500">
                  <img
                    className="h-full w-full object-cover"
                    src={`${imgUrl}${movie.poster_path}`}
                    alt={movie.original_title || "Poster"}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        slidesPerView={7}
        spaceBetween={10}
        freeMode={true}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="mySwiper py-6"
      >
        {movieList.map((movie) => (
          <SwiperSlide key={movie.id} className=" py-10 cursor-pointer"
          onClick={()=> handleNavigate(movie.id)}>
            <MovieCard
              posterPath={movie.poster_path}
              title={movie.original_title}
              
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="h-[1000px]"></div>
    </div>
  );
};

export default Movies;