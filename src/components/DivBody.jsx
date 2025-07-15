/* eslint-disable react/prop-types */
// import React, { useState } from 'react';
import ImageCarousel from '../components/ImageCarousel'
import { motion } from 'framer-motion';
import { fadeIn } from "../utils/motion";

import Navbar from './Navbar'
import Footer from './Footer'


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
      <div className="max-w-5xl h-[400px] m-4 md:mx-auto">
        <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3032.8986639100144!2d-74.46328912254491!3d40.521730871422875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3c70c51296859%3A0x62d02d4fb7e7e2bf!2sElectrical%20Engineering%20Building%2C%20Piscataway%2C%20NJ%2008854!5e0!3m2!1sen!2sus!4v1752610406432!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowfullscreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    <Footer/>
    </div>
  );
};

export default DivBody;