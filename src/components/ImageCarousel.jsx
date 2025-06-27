// import React from 'react'
import { Carousel } from "flowbite-react";
import vexu24 from "../assets/carousel/vex24.webp" 
import a from "../assets/carousel/2.jpg"

const carouselSlides = [
  {
    src: vexu24,
    alt: "Slide 1",
    title: "The VEXU Division at the World Championships 24-25",
  },
  {
    src: a,
    alt: "Slide 2",
    title: "Title 2",
  },
  {
    src: "https://flowbite.com/docs/images/carousel/carousel-3.svg",
    alt: "Slide 3",
    title: "Title 3",
  },
  {
    src: "https://flowbite.com/docs/images/carousel/carousel-4.svg",
    alt: "Slide 4",
    title: "Title 4",
  },
  {
    src: "https://flowbite.com/docs/images/carousel/carousel-5.svg",
    alt: "Slide 5",
    title: "Title 5",
  },
];

const ImageCarousel = () => {
  return (
    <div className="overflow-hidden">
      <Carousel
        className="aspect-[16/9] max-w-5xl lg:mx-auto mx-4 mt-12"
        slideInterval={5000}
        pauseOnHover
      >
        {carouselSlides.map((slide, index) => (
          <div key={index} className="relative w-full h-full">
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black bg-opacity-20 text-white px-3 py-1 rounded">
              {slide.title}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default ImageCarousel