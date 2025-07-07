/* eslint-disable react/prop-types */
// import React, { useState } from 'react';
import ImageCarousel from '../components/ImageCarousel'
import { motion } from 'framer-motion';
import { fadeIn } from "../utils/motion";

import Navbar from './Navbar'
import Footer from './Footer'

// import vexu from "../assets/carousel/vex24.webp" 
// import igvc from "../assets/carousel/igvc-cover.jpg"
// import micromouse from "../assets/carousel/micromouse-cover.jpg"
// import verizon from "../assets/carousel/verizon.jpg"
// import electronics from "../assets/carousel/electronics-cover.png"

// const carouselSlides = [
//   {
//     src: vexu,
//     alt: "Slide 1",
//     title: "The VEXU Division at the World Championships 24-25 in Dallas, TX",
//   },
//   {
//     src: igvc,
//     alt: "Slide 2",
//     title: "The 28th Annual Intelligent Ground Vehicle Competition in Michigan",
//   },
//   {
//     src: micromouse,
//     alt: "Slide 3",
//     title: "Micromouse wins 1st place at MIT in 2024",
//   },
//   {
//     src: verizon,
//     alt: "Slide 4",
//     title: "Rutgers IEEE visiting Verizon's Innovation Lab",
//   },
//   {
//     src: electronics,
//     alt: "Slide 5",
//     title: "Electronics hosting workshops for all experience levels",
//   },
// ];

const DivBody = ({ title, carouselSlides, description, meetingTime, meetingLocation }) => {
  return (
    <div className="min-h-screen mt-30 bg-gray-100 text-gray-900 font-sans">
      <Navbar/>
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
          className="lg:text-5xl text-4xl font-bold mb-2"
        >
          {title}
        </motion.h1>
      </motion.header>

      <ImageCarousel data={carouselSlides} hasTitle={true} />

      {/* Description */}
      <section className="max-w-4xl mx-auto mt-16 px-4">
        <h2 className="font-geist text-3xl font-bold mb-4">What We Do</h2>
        <p className="text-lg leading-relaxed text-gray-700">{description}</p>
      </section>

      {/* Meeting Info */}
      <section className="max-w-4xl mx-auto mt-12 px-4 pb-16">
        <h2 className="font-geist text-2xl font-bold mb-2">Meeting Times</h2>
        <p className="text-lg text-gray-700">
          {meetingTime}
          <br />
          Room: {meetingLocation}
        </p>
      </section>
    <Footer/>
    </div>
  );
};

export default DivBody;