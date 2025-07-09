import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { Link } from "react-router-dom"

import VexU from "../assets/divisions/vexbots.webp"
import igvc from "../assets/divisions/igvc.jpg"
import micromouse from "../assets/divisions/micromouse.webp"
import electronics from "../assets/carousel/electronics-cover.png"
import ess from "../assets/divisions/ess.webp"
import prCommittee from "../assets/divisions/pr-committee.webp"


const DivisionsGrid = () => {
    
    const divisionInfo = [
        {
            title: "VEXU",
            imageLink: VexU,
            href: "https://scarrobotics.com"
        },
        {
            title: "Micromouse",
            imageLink: micromouse,
            href: "/divisions/micromouse"
        },
        {
            title: "IGVC",
            imageLink: igvc,
            href: "/divisions/igvc"
        },
        {
            title: "Electronics",
            imageLink: electronics,
            href: "/divisions/electronics"
        },
        {
            title: "N2E Coding",
            imageLink: VexU,
            href: "http://n2ecodingclub.rutgers.edu/"
        },
        {
            title: "MLAI",
            imageLink: VexU,
            href: "/divisions/mlai"
        },
        {
            title: "ESS",
            imageLink: ess,
            href: "/divisions/ess"
        },
        {
            title: "PR Committee",
            imageLink: prCommittee,
            href: "/divisions/pr-committee"
        },

    ]


    return (
    <div className="max-w-7xl mx-auto px-4">
        <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold pb-8 ">Our Divisions</h1>
        </div>
        
         <motion.div 
        variants={fadeIn('left', 0.4)}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 place-items-center"
      >
        {divisionInfo.map((div, index) => (
            <Link key={index} to={div.href}>
          <motion.div 
            key={index}
            variants={fadeIn('up', 0.1 * (index + 1))}
            initial="hidden"
            whileInView="show"
            whileHover={{ scale: 1.05 }}
            className="bg-white cursor-pointer rounded-2xl hover:shadow-xl transition-shadow duration-300 "
          >
                <div className="md:w-65 md:h-70 w-40 h-50 overflow-hidden bg-white rounded-lg shadow-lg">
                    <img className="object-cover w-full md:h-55 h-35" src={div.imageLink} alt="avatar"/>

                    <div className="py-5 text-center">
                        <a href="#" className="font-geist block text-xl font-bold text-gray-800 "role="link">{div.title}</a>
                        <span className="text-sm text-gray-700 dark:text-gray-200"></span>
                    </div>
                </div>
                

          </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
    
  );
}

export default DivisionsGrid