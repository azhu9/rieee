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
            href: "/micromouse"
        },
        {
            title: "IGVC",
            imageLink: igvc,
            href: "/igvc"
        },
        {
            title: "Electronics",
            imageLink: electronics,
            href: "/electronics"
        },
        {
            title: "N2E Coding",
            imageLink: VexU,
            href: "http://n2ecodingclub.rutgers.edu/"
        },
        {
            title: "MLAI",
            imageLink: VexU,
            href: "/mlai"
        },
        {
            title: "ESS",
            imageLink: ess,
            href: "/ess"
        },
        {
            title: "PR Committee",
            imageLink: prCommittee,
            href: "/pr-committee"
        },

    ]


    return (
    <div className="max-w-7xl mx-auto px-4">
        <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold pb-8 ">Our Divisions</h1>
        </div>
        
         <motion.div 
        variants={fadeIn('left', 0.4)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 place-items-center"
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
            {/* <Card
                className="border-1 shadow-none"
                imgAlt=""
                imgSrc={div.imageLink}
                >
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-medium text-white mx-auto dark:text-gray-900">{div.title}</span>
                </div>
                </Card> */}

                <div className="w-65 h-70 overflow-hidden bg-white rounded-lg shadow-lg">
                    <img className="object-cover w-full h-50" src={div.imageLink} alt="avatar"/>

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