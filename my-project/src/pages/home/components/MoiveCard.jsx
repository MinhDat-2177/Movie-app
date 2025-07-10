// eslint-disable-next-line no-unused-vars
import React from "react";
import { imgUrl } from "../../../config/config";

// eslint-disable-next-line react/prop-types
const MovieCard = ({ posterPath, title }) => {
  return (
    <div className="flex flex-col items-center px-2"> {/* Thêm padding xung quanh */}
      <div
        className="rounded-lg overflow-hidden"
        style={{
          height: "240px", // Chiều cao hợp lý cho poster
          width: "160px",  // Tỷ lệ phù hợp
        }}
      >
        <img
          className="h-full w-full object-cover"
          src={`${imgUrl}${posterPath}`} // Dùng template literals cho URL
          alt={title || "Poster"}
        />
      </div>
      <span className="text-center text-white mt-2 text-sm font-medium">
        {title || "N/A"}
      </span>
    </div>
  );
};

export default MovieCard;
