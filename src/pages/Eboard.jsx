import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/ProfileCard'
// import Testimonial from '../components/TestimonialsSection'
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import ScrollToTop from'../utils/ScrollToTop';

import amrik from "../assets/eboard/amrik.jpg"
import ana from "../assets/eboard/ana-maria.jpeg"
import shreyans from "../assets/eboard/shreyans.jpg"
import saachi from "../assets/eboard/saachi.png"
import venky from "../assets/eboard/venky.jpg"
import aiden from "../assets/eboard/aiden.png"
import andy from "../assets/eboard/andy.jpg"
import chance from "../assets/eboard/chance.jpg"
import ivan from "../assets/eboard/ivan.webp"

const eboardData = [
  {
    name: " Amrik Krishnakumar",
    image: amrik,
    role: "President",
    grade: "Junior",
  },
  {
    name: "Ana-Maria Moreno",
    image: ana,
    role: "External Vice President",
    grade: "Junior",
  },
  {
    name: "Shreyans Bhuyan",
    image: shreyans,
    role: "Internal Vice President",
    grade: "Sophomore",
  },
  {
    name: "Saachi Rohilla",
    image: saachi,
    role: "Treasurer",
    grade: "Junior",
  },
  {
    name: "Venky Maddeboini",
    image: venky,
    role: "Secretary",
    grade: "Sophomore",
  },
  {
    name: "Aiden Annis",
    image: aiden,
    role: "Fundraising Chair",
    grade: "Sophomore",
  },
  {
    name: "Andy Zhu",
    image: andy,
    role: "Webmaster",
    grade: "Junior",
  },
  {
    name: "Chance Reyes",
    image: chance,
    role: "EGC Representative",
    grade: "Junior",
  },
]

const divisionLeadsData = [
  {
    name: "Andy Zhu",
    image: andy,
    role: "VEXU Co-President",
    grade: "Junior",
  },
  {
    name: "Ivan Shi",
    image: ivan,
    role: "VEXU Co-President",
    grade: "Sophomore",
  },
]

function Eboard(){
    return (
        <main className="relative min-h-screen overflow-x-hidden">
      <div className="absolute -top-28 -left-28 w-[550px] h-[550px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>
      <div className="overflow-hidden">
        <ScrollToTop/>
        <Navbar />
        <div className="mt-30 max-w-5xl mx-auto">
            <h1 className="text-5xl font-bold mb-8">Our E-Board</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 place-items-center">
              {eboardData.map((data, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn('up', 0.1 * (index + 1))}
                  initial="hidden"
                  whileInView="show"
                  whileHover={{ scale: 1.05 }}
                  className="bg-white cursor-pointer rounded-2xl hover:shadow-xl transition-shadow duration-300 "
                ><Card
                  key={index}
                  name={data.name}
                  image={data.image}
                  role={data.role}
                  grade={data.grade}
                />
              </motion.div>
                
              ))}
            </div>
        </div>
        <div className="mt-30 max-w-5xl lg:mx-auto mb-10">
            <h1 className="text-5xl font-bold mb-8">Our Division Leads</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {divisionLeadsData.map((data, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn('up', 0.1 * (index + 1))}
                  initial="hidden"
                  whileInView="show"
                  whileHover={{ scale: 1.05 }}
                  className="bg-white cursor-pointer rounded-2xl hover:shadow-xl transition-shadow duration-300 "
                ><Card
                  key={index}
                  name={data.name}
                  image={data.image}
                  role={data.role}
                  grade={data.grade}
                />
              </motion.div>
              ))}
            </div>
        </div>
        
        <Footer /> 
      </div>
    </main>
    )
}

export default Eboard