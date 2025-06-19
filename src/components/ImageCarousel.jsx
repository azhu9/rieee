// import React from 'react'
import { Carousel } from "flowbite-react";

const ImageCarousel = () => {
  return (
    <div className="overflow-hidden">
      <Carousel 
        className="aspect-[16/9] max-w-5xl lg:mx-auto mx-4 mt-12"
        slideInterval={3000}
        pauseOnHover
        >
        <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
      </Carousel>
      <div className="max-w-5xl mx-auto pt-5">
        <h1 className="">
            text
        </h1>
      </div>
    </div>
  )
}

export default ImageCarousel