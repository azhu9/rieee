import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
// import 'swiper/css';
// import 'swiper/css/navigation';
import hackathon from '../assets/hackathonposter.png';
import { Link } from "react-router-dom";

const HackathonSection = ( hasLink ) => {
  return (
    <motion.section 
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-4 py-16 md:py-24"
    >
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Left side - Content */}
        <motion.div 
          variants={fadeIn('right', 0.3)}
          className="w-full md:w-1/2"
        >
          <motion.span 
            variants={fadeIn('up', 0.4)}
            className="text-emerald-500 font-semibold"
          >
            HACKATHON
          </motion.span>
          <motion.h1 
            variants={textVariant(0.5)}
            className="text-3xl md:text-4xl font-bold text-navy-900 mt-4 mb-6 md:w-4/5"
          >
            The 2024-25 Software X Hardware Hackathon
          </motion.h1>
          <motion.p 
            variants={fadeIn('up', 0.6)}
            className="text-gray-600 mb-8 md:w-4/5"
          >
            Get ready for a weekend filled with fun, coding, and community service. The Hackathon is a Social Good Hackathon where you can improve your programming skills while also helping to improve the larger Rutgers Community. Attend workshops, network, and find your passion on March 29-30th!
          </motion.p>
          {hasLink && (
          <Link
            variants={fadeIn('up', 0.7)}
            to="/hackathon" 
            className="text-blue-500 font-semibold flex items-center gap-2 hover:gap-4 transition-all"
          >
            Get More Info Here
            <motion.svg 
              variants={fadeIn('left', 0.8)}
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </motion.svg>
          </Link>
          )}
        </motion.div>

        {/* Right side - Swiper with background */}
        <motion.div 
          variants={fadeIn('left', 0.3)}
          className="w-full md:w-1/2 relative"
        >
          <motion.div 
            variants={fadeIn('up', 0.4)}
            className="p-4"
          >
            <motion.img 
              variants={fadeIn('up', 0.5)}
              src={hackathon}
              alt="Dashboard statistics"
              className="w-4/5 h-auto rounded-xl drop-shadow-2xl mx-auto"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default HackathonSection 