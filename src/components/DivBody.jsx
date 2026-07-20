/* eslint-disable react/prop-types */
import ImageCarousel from '../components/ImageCarousel'
import { motion } from 'framer-motion'
import { fadeIn } from '../utils/motion'
import { FiClock, FiMapPin } from 'react-icons/fi'
import Navbar from './Navbar'
import Footer from './Footer'

const DivBody = ({ title, carouselSlides, description, meetingTime, meetingLocation }) => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      {/* Background gradient — matches rest of site */}
      <div className="absolute -top-28 -left-28 w-[550px] h-[700px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10 pointer-events-none" />

      <Navbar />

      {/* Hero */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-10">
        <motion.div
          variants={fadeIn('up', 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 bg-gray-50 w-fit px-4 py-2 rounded-full">
            <span className="text-red-600">★</span>
            <span className="text-sm font-medium text-gray-600">Rutgers IEEE Division</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-red-600 relative inline-block">
              {title}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-200/60" />
            </span>
          </h1>
        </motion.div>
      </section>

      {/* Carousel */}
      <motion.section
        variants={fadeIn('up', 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-16"
      >
        <ImageCarousel data={carouselSlides} hasTitle={true} />
      </motion.section>

      {/* Description + Meeting Info */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Description — 2/3 width */}
          <motion.div
            variants={fadeIn('up', 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            <h2 className="text-3xl font-bold text-gray-900">What We Do</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
          </motion.div>

          {/* Meeting info card — 1/3 width */}
          <motion.div
            variants={fadeIn('up', 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5 sticky top-28">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
                Meeting Info
              </h3>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <FiClock className="text-blue-600 text-sm" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-0.5">When</p>
                  <p className="text-gray-800 font-medium text-sm leading-snug">{meetingTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  <FiMapPin className="text-red-600 text-sm" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-0.5">Where</p>
                  <p className="text-gray-800 font-medium text-sm">{meetingLocation}</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Map */}
      <motion.section
        variants={fadeIn('up', 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Find Us</h2>
        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-[360px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3032.8986639100144!2d-74.46328912254491!3d40.521730871422875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3c70c51296859%3A0x62d02d4fb7e7e2bf!2sElectrical%20Engineering%20Building%2C%20Piscataway%2C%20NJ%2008854!5e0!3m2!1sen!2sus!4v1752610406432!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </motion.section>

      <Footer />
    </div>
  )
}

export default DivBody
