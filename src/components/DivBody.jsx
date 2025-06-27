// import React, { useState } from 'react';
import ImageCarousel from '../components/ImageCarousel'
import { motion } from 'framer-motion';
import { fadeIn } from "../utils/motion";



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

    <ImageCarousel/>
    
      {/* Description */}
      <section className="max-w-4xl mx-auto mt-16 px-4">
        <h2 className="text-3xl font-semibold mb-4">What We Do</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          The Software Division focuses on building internal tools, programming our competition robots, and developing
          web interfaces to streamline our clubs operations. We work with modern technologies like React, Python, and
          embedded systems. Whether youre new or experienced, theres a place for you here to learn and contribute!
        </p>
      </section>

      {/* Meeting Info */}
      <section className="max-w-4xl mx-auto mt-12 px-4 pb-16">
        <h2 className="text-2xl font-semibold mb-2">Meeting Times</h2>
        <p className="text-lg text-gray-700">
          We meet every Wednesday and Friday from 3:30 PM to 5:00 PM in Room 214.
        </p>
      </section>
    </div>
  );
};

export default DivBody;