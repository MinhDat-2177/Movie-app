// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
const Test = ({title, img }) => {
  return (
    <div className="p-4 flex flex-col items-center">
      <img src={img} alt={title} className="mb-2 w-32 h-32 object-cover" />
      <span>{title}</span>
    </div>
  );
};

export default Test;
