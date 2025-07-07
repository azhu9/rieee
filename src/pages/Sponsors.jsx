// import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion } from 'framer-motion';
import ScrollToTop from'../utils/ScrollToTop';

import { MdOutlineFileDownload } from "react-icons/md";


import nvidia from "../assets/sponsors/nvidia.png"
import capitalone from "../assets/sponsors/capitalone.png"
import ieee from "../assets/sponsors/ieee.png"
import l3harris from "../assets/sponsors/l3harris.jpg"
import soe from "../assets/sponsors/soe.png"
import nnl from "../assets/sponsors/nnl.png"
import verizon from "../assets/sponsors/verizon.svg"
import tata from "../assets/sponsors/tata.jpg"
import pishop from "../assets/sponsors/pishop.png"
import benefits from "../assets/sponsors/benefits.png"

const sponsorData = [nvidia, capitalone, ieee, l3harris, soe, nnl, verizon, tata, pishop];


const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const Sponsors = () => {
  return (
    <div className="min-h-screen bg-white mt-50">
      <ScrollToTop/>
      <Navbar/>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="text-center mb-16 mx-8"
      >
        <h1 className="text-5xl md:text-5xl font-bold text-gray-900 mb-4">
          Thank you to our Sponsors and Partners
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We are grateful for the support of our generous sponsors who make our club possible.
        </p>
      </motion.div>

      <div className="max-w-7xl lg:mx-auto h-full sm:mx-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
          {sponsorData.map((data, index) => (
          <img className="p-8" key={index} src={data}/>
          ))}
        </div>
      </div>

      <div className=" max-w-5xl mx-auto mt-20">
        <h1 className="text-4xl font-bold text-center my-4">Our Sponsorship Tiers</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-center">
          If you would like to sponsor Rutgers IEEE, contact us at rutgers.ieee@gmail.com
        </p>
       
          <img src={benefits}/>
          <div className="bg-[#1a1919] text-white p-3 mb-4 font-geist rounded-b-lg">
            Download the Sponsorship Packet
            <MdOutlineFileDownload className="float-right" size={25}/>
          </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Sponsors