import { Card } from "flowbite-react";
import VexU from "../assets/divisions/VEXU.JPG"
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";



const DivisionsGrid = () => {
    
    const divisionInfo = [
        {
            title: "VEXU",
            imageLink: VexU,
        },
        {
            title: "Micromouse",
            imageLink: VexU,
        },
        {
            title: "IGVC",
            imageLink: VexU,
        },
        {
            title: "Electronics",
            imageLink: VexU,
        },
        {
            title: "N2E Coding",
            imageLink: VexU,
        },
        {
            title: "MLAI",
            imageLink: VexU,
        },
        {
            title: "ESS",
            imageLink: VexU,
        },
        {
            title: "PR Committee",
            imageLink: VexU,
        },

    ]


    return (
    <div className="max-w-7xl mx-auto px-4">
        <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold pb-8 ">Our Divisions</h1>
        </div>
        
         <motion.div 
        variants={fadeIn('left', 0.4)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {divisionInfo.map((div, index) => (
          <motion.div 
            key={index}
            variants={fadeIn('up', 0.3 * (index + 1))}
            whileHover={{ scale: 1.05 }}
            className="bg-white cursor-pointer rounded-2xl hover:shadow-xl transition-shadow duration-300 "
          >
            <Card
                className="border-1  shadow-none"
                imgAlt=""
                imgSrc={div.imageLink}
                >
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-medium text-white mx-auto dark:text-gray-900">{div.title}</span>
                    {/* <a href="#" className="rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white "
                    >More Info
                    </a> */}
                </div>
                </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
    
  );
}

export default DivisionsGrid