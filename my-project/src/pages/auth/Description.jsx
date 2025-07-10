// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../../services/mediaServies";
import Details from "../home/components/Details";

const Description = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  console.log(movie)
  useEffect(() => {
    const fetchMovieDetails = async () => {
      const moviedetails = await getMovieDetails(id);
      setMovie(moviedetails);
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <div className="p-4 bg-gray-900 min-screen">
      {movie ? (
        <Details movie={movie} />
      ) : (
        <p className="text-center text-red-500">Không tìm thấy thông tin phim.</p>
      )}
    </div>
  );
};

export default Description;
