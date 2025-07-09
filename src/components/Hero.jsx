// import React from 'react'
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import heroImage from '../assets/rutgersieee.png'

const Hero = () => {
  return (
    <section id="home" className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 pt-20 container mx-auto h-[100vh] place-items-center">
      {/* Left Column */}
      <div className="w-full md:w-1/2 space-y-8">
        <motion.div variants={fadeIn('right', 0.2)} initial="hidden" whileInView="show">
          {/* Star badge */}
          <div className="flex items-center gap-2 bg-gray-50 w-fit px-4 py-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer group">
            <span className="text-blue-600 group-hover:scale-110 transition-transform">★</span>
            <span className="text-sm font-medium">Advancing Technology for Humanity</span>
          </div>
        </motion.div>

        <h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
        >
          Welcome to{' '}
          <span className="text-red-600 relative inline-block">
            RUTGERS IEEE
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-200/60"></span>
          </span>{' '}

        </h1>

        <motion.p 
          variants={fadeIn('up', 0.4)}
          initial="hidden"
          whileInView="show"
          className="text-gray-800 text-lg md:text-xl max-w-xl "
        >
          The IEEE Student Branch at Rutgers University was founded in 2007 and is one of the most active engineering student organizations at Rutgers New Brunswick.
        </motion.p>

        <motion.div 
          variants={fadeIn('up', 0.5)}
          initial="hidden"
          whileInView="show"
          className="flex lg:max-w-md"
        >
          {/* Email Form */}
          {/* <input
            type="email"
            placeholder="Email address"
            className="flex-1 px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all text-gray-600"
          /> */}
          <button
          onClick={() => {
            document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 cursor-pointer transition-all hover:shadow-lg hover:shadow-blue-100 active:scale-95 w-full md:w-auto mx-auto md:m-0">
            Learn More
          </button>
        </motion.div>
      </div>

      {/* Right Column - Images */}
      <div 
        className="w-full md:w-1/2 mt-16 md:mt-0 pl-0 md:pl-12"
      >
        <div className="relative">
          <img
            src={heroImage}
            alt="Team meeting"
            className="rounded-lg relative z-10 hover:scale-[1.02] transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero