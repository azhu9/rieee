/* eslint-disable react/prop-types */
// import React from 'react'
import { Carousel } from "flowbite-react";

const ImageCarousel = ({ data, hasTitle}) => {
  return (
    <div className="overflow-hidden">
      <Carousel
        className="aspect-[16/9] max-w-5xl lg:mx-auto mx-4 mt-12"
        slideInterval={5000}
        pauseOnHover
      >
        {data.map((slide, index) => (
          <div key={index} className="relative w-full h-full">
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            {hasTitle && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black bg-opacity-20 text-white px-2 py-1 rounded">
                <p className="lg:text-lg md:text-md sm:text-s text-xs text-center">{slide.title}</p>
              </div>
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel