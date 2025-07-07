import { useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import { motion } from "framer-motion";
import { fadeIn} from "../utils/motion";
import logo from "../assets/sm-rutgersieee.png"
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#home')
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  //to whoever reads this navbar code, im sorry

  const navLinks = [
    { href: "/eboard", label: "E-Board" },
    { href: "/hackathon", label: "Hackathon" },
    { href: "/sponsors", label: "Sponsors" },
    { href: "/image-galleries", label: "Image Galleries" },

  ]

  const divisionLinks = [
    { href: "https://scarrobotics.com", label: "VEXU" },
    { href: "/divisions/micromouse", label: "Micromouse" },
    { href: "/divisions/igvc", label: "IGVC" },
    { href: "/divisions/electronics", label: "Electronics" },
    { href: "http://n2ecodingclub.rutgers.edu/", label: "N2E Coding" },
    { href: "/divisions/mlai", label: "MLAI" },
    { href: "/divisions/ess", label: "ESS" },
    { href: "/divisions/pr_committee", label: "PR Committee" },
  ]

  return (
    <motion.nav 
  variants={fadeIn('down', 0.2)}
  whileInView="show"
  viewport={{ once: true }}
  className="fixed top-0 left-0 right-0 bg-white backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm"
>
  <div className="w-full flex justify-between items-center container mx-auto px-4 sm:px-6 lg:px-8 md:h-20 h-16">
    
    {/* Logo */}
    <motion.div 
      variants={fadeIn('right', 0.3)}
      className="flex items-center gap-1 cursor-pointer"
    >
      <Link to="/home">
        <img src={logo} className="w-28" />
      </Link>
    </motion.div>

    {/* Mobile Menu Button (visible < lg) */}
    <motion.button 
      variants={fadeIn('left', 0.3)}
      className="flex lg:hidden p-2"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      {isMenuOpen ? (
        <HiX className="h-6 w-6" />
      ) : (
        <HiMenu className="h-6 w-6" />
      )}
    </motion.button>

    {/* Desktop Navigation (visible lg and up) */}
    <motion.div 
      variants={fadeIn('down', 0.3)}
      className="hidden lg:flex items-center gap-10"
    >
      <Link to="/home" className="text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all">
        Home
      </Link>

      {/* Dropdown menu section */}
      <div className="relative inline-block">
        <motion.button
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
          initial="hidden"
          animate="show"
          onClick={() => setIsMenuOpen(prev => !prev)}
          className="text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all"
        >
          <span className="flex items-center gap-1">
            Divisions {isMenuOpen ? <FiChevronUp /> : <FiChevronDown />}
          </span>
        </motion.button>

        <div className={`absolute top-full left-0 mt-7 w-30 rounded-b-lg p-3 shadow-md bg-white transition-transform origin-top duration-200 z-50 ${
          isMenuOpen ? 'scale-y-100' : 'scale-y-0'
        }`}>
          {divisionLinks.map((div, index) => (
            <Link
              key={index}
              to={div.href}
              className="block py-1 text-sm hover:text-blue-600"
            >
              {div.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Other nav links */}
      {navLinks.map((link, index) => (
        <Link 
          key={index}
          to={link.href}
          className="text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all"
        >
          {link.label}
        </Link>
      ))}
    </motion.div>

    {/* CTA Button (Desktop only) */}
    <Link to="/contact" className="lg:flex hidden">
  <motion.button 
    variants={fadeIn('left', 0.3)}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="block bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100"
  >
    Get in touch
  </motion.button>
</Link>
  </div>

  {/* Mobile Menu (<lg only) */}
  {isMenuOpen && (
    <motion.div 
      variants={fadeIn('down', 0.2)}
      initial="hidden"
      animate="show"
      className="lg:hidden bg-white border-t border-gray-100 py-4"
    >
      <motion.div 
        variants={fadeIn('down', 0.3)}
        className="container mx-auto px-4 space-y-4"
      >
        <div>
          <button
            onClick={() => setIsMobileDropdownOpen(prev => !prev)}
            className="w-full text-left text-sm font-medium py-2 text-gray-600 hover:text-gray-900"
          >
            <span className="flex items-center gap-1">
              Divisions {isMobileDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
            </span>
          </button>
          {isMobileDropdownOpen && (
            <div className="ml-4 space-y-2">
              {divisionLinks.map((div, index) => (
                <Link 
                  key={index}
                  to={div.href}
                  onClick={() => setActiveLink(div.href)}
                  className="block py-1 text-sm text-gray-700 hover:text-blue-600"
                >
                  {div.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {navLinks.map((link, index) => (
          <motion.a
            key={index}
            variants={fadeIn('right', 0.1 * (index + 1))}
            href={link.href}
            onClick={() => {
              setActiveLink(link.href);
              setIsMenuOpen(false);
            }}
            className={`block text-sm font-medium py-2 ${
              activeLink === link.href ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {link.label}
          </motion.a>
        ))}

        <Link to="/contact">
          <motion.button 
            variants={fadeIn('up', 0.4)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium hover:shadow-lg hover:shadow-blue-100"
          >
            Get in touch
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  )}
</motion.nav>

  )
}

export default Navbar