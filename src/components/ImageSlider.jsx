import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  "https://flowbite.com/docs/images/carousel/carousel-1.svg",
  "https://flowbite.com/docs/images/carousel/carousel-2.svg",
  "https://flowbite.com/docs/images/carousel/carousel-3.svg",
  "https://flowbite.com/docs/images/carousel/carousel-4.svg",
  "https://flowbite.com/docs/images/carousel/carousel-5.svg",
  "https://flowbite.com/docs/images/carousel/carousel-4.svg",
  "https://flowbite.com/docs/images/carousel/carousel-5.svg",
  "https://flowbite.com/docs/images/carousel/carousel-4.svg",
  "https://flowbite.com/docs/images/carousel/carousel-5.svg",
  // Add more images as needed
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleThumbnails = 6;

  // Wraparound thumbnail window to always show current selection
  const getThumbnailWindow = () => {
    const result = [];
    for (let i = 0; i < visibleThumbnails; i++) {
      const idx = (currentIndex + i) % images.length;
      result.push(idx);
    }
    return result;
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      (prev + 1) % images.length
    );
  };

  const thumbnailIndexes = getThumbnailWindow();

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Image */}
      <div className="aspect-video w-full mb-4 rounded-xl overflow-hidden shadow">
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Navigator */}
      <div className="flex items-center justify-center space-x-2">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <FaChevronLeft />
        </button>

        <div className="flex space-x-2">
          {thumbnailIndexes.map((imgIndex) => (
            <img
              key={imgIndex}
              src={images[imgIndex]}
              alt={`Thumbnail ${imgIndex + 1}`}
              onClick={() => handleThumbnailClick(imgIndex)}
              className={`w-32 h-18 object-cover rounded-md cursor-pointer border-2 transition ${
                imgIndex === currentIndex
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;