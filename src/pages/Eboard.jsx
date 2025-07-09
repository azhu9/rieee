import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/ProfileCard'
// import Testimonial from '../components/TestimonialsSection'
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import ScrollToTop from'../utils/ScrollToTop';
import { eboardData, divisionLeadsData } from "../utils/eboardData"

function Eboard(){
    return (
        <main className="relative min-h-screen overflow-x-hidden">
      <div className="-z-10"></div>
      <div className="overflow-hidden">
        <ScrollToTop/>
        <Navbar />
        <div className="mt-30 max-w-5xl mx-auto">
            <h1 className="text-5xl font-bold mb-8">Our E-Board</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
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

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
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