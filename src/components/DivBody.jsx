// import React, { useState } from 'react';
import ImageCarousel from '../components/ImageCarousel'
import { motion } from 'framer-motion';
import { fadeIn } from "../utils/motion";

import vexu from "../assets/carousel/vex24.webp" 
import igvc from "../assets/carousel/igvc-cover.jpg"
import micromouse from "../assets/carousel/micromouse-cover.jpg"
import verizon from "../assets/carousel/verizon.jpg"
import electronics from "../assets/carousel/electronics-cover.png"

const carouselSlides = [
  {
    src: vexu,
    alt: "Slide 1",
    title: "The VEXU Division at the World Championships 24-25 in Dallas, TX",
  },
  {
    src: igvc,
    alt: "Slide 2",
    title: "The 28th Annual Intelligent Ground Vehicle Competition in Michigan",
  },
  {
    src: micromouse,
    alt: "Slide 3",
    title: "Micromouse wins 1st place at MIT in 2024",
  },
  {
    src: verizon,
    alt: "Slide 4",
    title: "Rutgers IEEE visiting Verizon's Innovation Lab",
  },
  {
    src: electronics,
    alt: "Slide 5",
    title: "Electronics hosting workshops for all experience levels",
  },
];

const DivBody = () => {

  return (
    <div className="min-h-screen mt-30 bg-gray-100 text-gray-900 font-sans">
      {/* Hero */}
      <motion.header
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        transition={{
          type: 'spring',
          stiffness: 70,
          damping: 20,
          duration: 0.3,
        }}
          className="text-center py-10 bg-blue-600 text-white shadow-lg"
        >
          <motion.h1
          variants={fadeIn('up', 1.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          className="text-5xl font-bold mb-2">Micromouse Division</motion.h1>
        </motion.header>

            <ImageCarousel data={carouselSlides} hasTitle={true}
                />
    
            {/* Description */}
            <section className="max-w-4xl mx-auto mt-16 px-4">
              <h2 className="text-3xl font-semibold mb-4">What We Do</h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, corporis dolore tempore qui error quia adipisci cum. Explicabo odit veniam illo! Asperiores illum commodi numquam consequatur. Maiores eveniet placeat similique porro sapiente, numquam sint, assumenda laborum quae adipisci animi molestias vero amet facere debitis tempore molestiae inventore suscipit commodi quisquam?
              </p>
            </section>

            {/* Meeting Info */}
            <section className="max-w-4xl mx-auto mt-12 px-4 pb-16">
              <h2 className="text-2xl font-semibold mb-2">Meeting Times</h2>
              <p className="text-lg text-gray-700">
                Wednesday, 8:30 P.M. - 10:00 P.M.
                <br></br>Room: IEEE Lab
              </p>
            </section>
    </div>
  );
};

export default DivBody;