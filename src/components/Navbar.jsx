import { useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import { motion } from "framer-motion";
import { fadeIn} from "../utils/motion";
import logo from "../assets/sm-rutgersieee.png"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#home')
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);


  const navLinks = [
    { href: "#home", label: "E-Board" },
    { href: "#about", label: "Hackathon" },
    { href: "#services", label: "F.A.Q." },
    { href: "#testimonials", label: "Sponsors" },
    { href: "#testimonials", label: "Image Galleries" },

  ]

  const divisionLinks = [
    { href: "https://scarrobotics.com", label: "VEXU" },
    { href: "#", label: "Micromouse" },
    { href: "#", label: "IGVC" },
    { href: "#", label: "Electronics" },
    { href: "#", label: "N2E Coding" },
    { href: "#", label: "MLAI" },
    { href: "#", label: "ESS" },
    { href: "#", label: "PR Committe" },
  ]

  return (
    <motion.nav 
      variants={fadeIn('down', 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm"
    >
      <div className="w-full flex justify-between items-center container mx-auto px-4 sm:px-6 lg:px-8 md:h-20 h-16">
        {/* Logo */}
        <motion.div 
          variants={fadeIn('right', 0.3)}
          className="flex items-center gap-1 cursor-pointer"
        >

          <img src={logo} className="w-28"></img>
        </motion.div>
        {/* Mobile Menu Button */}
        <motion.button 
          variants={fadeIn('left', 0.3)}
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <HiX className="h-6 w-6" />
          ) : (
            <HiMenu className="h-6 w-6" />
          )}
        </motion.button>

        {/* Navigation Links - Desktop */}
        <motion.div 
          variants={fadeIn('down', 0.3)}
          className="hidden md:flex items-center gap-10"
        >
        <div className="relative inline-block">
        <motion.button
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
          initial="hidden"
          animate="show"
          onClick={() => setIsMenuOpen(prev => !prev)}
          className={`text-md font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all
            ${isMenuOpen ? 'text-blue-600 after:w-full' : 'text-black hover:text-gray-900'}`}
        >
          <span className="flex items-center gap-1">
            Divisions {isMenuOpen ? <FiChevronUp/> : <FiChevronDown/>}
          </span>

        </motion.button>

        <div className={`absolute top-full left-0 mt-2 w-40 rounded-lg p-3 shadow-md bg-white transition-transform origin-top duration-200 z-50 ${
          isMenuOpen ? 'scale-y-100' : 'scale-y-0'
        }`}>
          {/* <a href="#" className="block py-1 text-sm text-gray-700 hover:text-blue-600">Home</a>
          <a href="#about" className="block py-1 text-sm text-gray-700 hover:text-blue-600">About</a>
          <a href="#summary" className="block py-1 text-sm text-gray-700 hover:text-blue-600">Summary</a> */}

          {divisionLinks.map((div, index) => (
            <motion.a 
              key={index}
              variants={fadeIn('down', 0.1 * (index + 1))}
              href={div.href}
              onClick={() => setActiveLink(div.href)}
              className={`block py-1 text-sm text-gray-700 hover:text-blue-600
                `}
            >
              {div.label}
            </motion.a>
          ))}
        </div>
      </div>

          {navLinks.map((link, index) => (
            <motion.a 
              key={index}
              variants={fadeIn('down', 0.1 * (index + 1))}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`text-md font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all
                `}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button 
          variants={fadeIn('left', 0.3)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100"
        >
          <a href="#newsletter">Get in touch</a>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
      <motion.div 
        variants={fadeIn('down', 0.2)}
        initial="hidden"
        animate="show"
        className="md:hidden bg-white border-t border-gray-100 py-4"
      >
        <motion.div 
          variants={fadeIn('down', 0.3)}
          className="container mx-auto px-4 space-y-4"
        >
          {/* 🔽 Hardcoded Dropdown */}
          <div>
            <button
              onClick={() => setIsMobileDropdownOpen(prev => !prev)}
              className="w-full text-left text-sm font-medium py-2 text-gray-600 hover:text-gray-900"
            >
            <span className="flex items-center gap-1">
              Divisions {isMobileDropdownOpen ? <FiChevronUp/> : <FiChevronDown/>}
            </span>            </button>
            {isMobileDropdownOpen && (
              <div className="ml-4 space-y-2">
                <a
                  href="#option1"
                  onClick={() => {
                    setActiveLink('#option1');
                    setIsMenuOpen(false);
                  }}
                  className="block text-sm text-gray-600 hover:text-blue-600"
                >
                  Option 1
                </a>
                <a
                  href="#option2"
                  onClick={() => {
                    setActiveLink('#option2');
                    setIsMenuOpen(false);
                  }}
                  className="block text-sm text-gray-600 hover:text-blue-600"
                >
                  Option 2
                </a>
                <a
                  href="#option3"
                  onClick={() => {
                    setActiveLink('#option3');
                    setIsMenuOpen(false);
                  }}
                  className="block text-sm text-gray-600 hover:text-blue-600"
                >
                  Option 3
                </a>
              </div>
            )}
          </div>

          {/* 🔗 Other Navigation Links */}
          {navLinks.map((link, index) => (
            <motion.a
              key={index}
              variants={fadeIn('right', 0.1 * (index + 1))}
              href={link.href}
              onClick={() => {
                setActiveLink(link.href);
                setIsMenuOpen(false);
              }}
              className={`block text-sm font-medium py-2
                ${activeLink === link.href ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              {link.label}
            </motion.a>
          ))}

          {/* 📬 CTA Button */}
          <motion.button 
            variants={fadeIn('up', 0.4)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100"
          >
            Get in touch
          </motion.button>
        </motion.div>
      </motion.div>
    )}

    </motion.nav>
  )
}

export default Navbar