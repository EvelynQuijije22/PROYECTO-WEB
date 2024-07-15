import React, { useEffect, useState } from 'react';
import './Slider.css';

const Slider = ({ images }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="slider">
      <div className="slides" style={{ transform: `translateX(${-index * 100}%)` }}>
        {images.map((image, idx) => (
          <div className="slide" key={idx}>
            <img src={image} alt={`Slide ${idx}`} className="slide-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
