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
      description: "Whether you want to learn about the latest advancements in machine learning, build autonomous competitive robots, or take part in something else entirely, our divisions offer hands-on experience and access to the latest technology."
    },
    {
      icon: <FaUserTie />
,
      title: "Further Your Professional Career", 
      description: "Attend technical workshops, connect with experts in your field, and build lifelong relationships. We host a variety of events during the year and will always have something in store for you."
    },
    {
      icon: <MdOutlineVolunteerActivism/>,
      title: "Participate in Outreach and Service",
      description: "We care about the engineers of tomorrow and want to bring the best minds to Rutgers. By volunteering at events like the VEX Robotics Competition for NJ high school students, you can be a part of those efforts."
    }
  ]

  return (
    <motion.section 
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      whileInView="show"
      className="max-w-7xl mx-auto px-4 py-16 h-auto md:h-[50vh] mb-15"
      id="benefits"
    >
      <motion.div 
        variants={fadeIn('up', 0.3)}
        className="text-center mb-12"
      >
        <motion.h2 
          variants={textVariant(0.2)}
          className="text-5xl font-bold mb-4"
        >
         How RIEEE can benefit you
        </motion.h2>
        {/* <motion.p 
          variants={fadeIn('up', 0.4)}
          className="text-gray-600"
        >
          When you resell besnik, you build trust and increase
        </motion.p> */}
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
              className="text-3xl font-medium mb-3 text-center"
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