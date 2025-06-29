import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/ProfileCard'
// import Testimonial from '../components/TestimonialsSection'
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

import ScrollToTop from'../utils/ScrollToTop';

const eboardData = [
  {
    name: " Amrik Krishnakumar",
    image: "/src/assets/eboard/amrik.jpg",
    role: "President",
    grade: "Junior",
  },
  {
    name: "Ana-Maria Moreno",
    image: "/src/assets/eboard/ana-maria.jpeg",
    role: "External Vice President",
    grade: "Junior",
  },
  {
    name: "Shreyans Bhuyan",
    image: "/src/assets/eboard/shreyans.jpg",
    role: "Internal Vice President",
    grade: "Sophomore",
  },
  {
    name: "Saachi Rohilla",
    image: "/src/assets/eboard/saachi.png",
    role: "Treasurer",
    grade: "Junior",
  },
  {
    name: "Venky Maddeboini",
    image: "/src/assets/eboard/venky.jpg",
    role: "Secretary",
    grade: "Sophomore",
  },
  {
    name: "Aiden Annis",
    image: "/src/assets/eboard/aiden.png",
    role: "Fundraising Chair",
    grade: "Sophomore",
  },
  {
    name: "Andy Zhu",
    image: "/src/assets/eboard/andy.jpg",
    role: "Webmaster",
    grade: "Junior",
  },
  {
    name: "Chance Reyes",
    image: "/src/assets/eboard/chance.jpg",
    role: "EGC Representative",
    grade: "Junior",
  },
]

const divisionLeadsData = [
  {
    name: "Andy Zhu",
    image: "/src/assets/eboard/andy.jpg",
    role: "VEXU Co-President",
    grade: "Junior",
  },
  {
    name: "Ivan Shi",
    image: "/src/assets/eboard/ivan.webp",
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
            <h1 className="text-3xl font-bold mb-8">Our E-Board</h1>

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
            <h1 className="text-3xl font-bold mb-8">Our Division Leads</h1>

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