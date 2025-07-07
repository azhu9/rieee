// import React from 'react'
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { SiCircuitverse } from "react-icons/si";
import { FaUserTie } from "react-icons/fa6";
import { MdOutlineVolunteerActivism } from "react-icons/md";



const BenefitSection = () => {
  const features = [
    {
      icon: <SiCircuitverse/>, 
      title: "Immerse Yourself in Technology",
      description: "Explore divisions that offer hands-on experience in fields like machine learning, robotics, and electronics"
    },
    {
      icon: <FaUserTie />
,
      title: "Further Your Professional Career", 
      description: "Attend technical workshops, participate in career-focused events and network through our club events"
    },
    {
      icon: <MdOutlineVolunteerActivism/>,
      title: "Participate in Outreach and Service",
      description: "Make an impact on the community by volunterering at events like the VEX Robotics Competition to inspire and support future engineers"
    }
  ]

  return (
    <motion.section 
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      whileInView="show"
      className="max-w-7xl mx-auto px-4 h-auto mb-15"
      id="benefits"
    >
      <motion.div 
        variants={fadeIn('up', 0.3)}
        className="text-center mb-12"
      >
        <motion.h1 
          variants={textVariant(0.2)}
          className="text-5xl font-bold mb-4"
        >
         How RIEEE can benefit you
        </motion.h1>
      </motion.div>
      
      <motion.div 
        variants={fadeIn('up', 0.5)}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            variants={fadeIn('up', 0.3 * (index))}
            className="flex flex-col items-center p-6"
          >
            <motion.div 
              variants={fadeIn('down', 0.3 * (index))}
              className="w-24 h-24 rounded-full mb-6 flex items-center justify-center" 
              style={{ 
                backgroundColor: index === 0 ? '#F1EFFD' : 
                               index === 1 ? '#FFE7E7' : 
                               '#FFF3E4'
              }}
            >
              <motion.div 
                variants={fadeIn('up', 0.3 * (index))}
                className="text-3xl"
              >
                {feature.icon}
              </motion.div>
            </motion.div>
            <motion.h3 
              variants={textVariant(0.3)}
              className="font-geist text-3xl font-medium mb-3 text-center"
            >
              {feature.title}
            </motion.h3>
            <motion.p 
              variants={fadeIn('up', 0.6 * (index))}
              className="text-gray-500 text-center"
            >
              {feature.description}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        variants={fadeIn('up', 0.7)}
        className="text-center mt-2"
      >
        <motion.button 
          onClick={() => {
            document.getElementById('discord')?.scrollIntoView({ behavior: 'smooth' });
          }}
          variants={fadeIn('up', 0.8)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white cursor-pointer px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors relative"
        >
          Join our Discord
          <div className="absolute -z-10 w-full h-full rounded-full bg-blue-600/30 blur-xl top-0 left-0"></div>
        </motion.button>
      </motion.div>
    </motion.section>
  )
}

export default BenefitSection