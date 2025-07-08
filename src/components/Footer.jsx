// import React from 'react'
import { FaGithub, FaInstagram, FaLinkedinIn, FaDiscord } from 'react-icons/fa'
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";

import rieee from "../assets/rieee.png";


const Footer = () => {
  const footerLinks = {
    divisions: [
    { href: "https://scarrobotics.com", name: "VEXU" },
    { href: "/divisions/micromouse", name: "Micromouse" },
    { href: "/divisions/igvc", name: "IGVC" },
    { href: "/divisions/electronics", name: "Electronics" },
    { href: "http://n2ecodingclub.rutgers.edu/", name: "N2E Coding" },
    { href: "/divisions/mlai", name: "MLAI" },
    { href: "/divisions/ess", name: "ESS" },
    { href: "/divisions/pr-committee", name: "PR Committee" },
    ],
    rutgers: [
      { name: 'Rutgers.edu', href: 'https://www.rutgers.edu/' },
      { name: 'New Brunswick', href: 'https://newbrunswick.rutgers.edu/' },
      { name: 'SoE', href: 'https://soe.rutgers.edu/' },
      { name: 'ECE', href: 'https://www.ece.rutgers.edu/' },
      { name: 'ECS', href: 'https://ecs.rutgers.edu/' },
    ],
    
    media: [
      { name: 'Github', href: 'https://github.com/rutgers' },
      { name: 'Instagram', href: 'https://www.instagram.com/rutgersieee/' },
      { name: 'Linkedin', href: 'https://www.linkedin.com/company/rutgersieee/' },
    ],
    contact: [
      { name: 'Discord', href: 'https://discord.com/invite/FqGHvWBRpK' },
      { name: 'Gmail', href: '#' },
    ],
  }

  return (
    <motion.footer 
      variants={fadeIn('up', 0.2)}
      // initial="hidden"
      whileInView="show"
      viewport={{ once: true }}

      className="bg-[#1a1919]"
    >
      <div className="section-container">
        <motion.div 
          variants={fadeIn('up', 0.3)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12"
        >
          {/* Brand Column */}
          <motion.div 
            variants={fadeIn('right', 0.4)}
            className="lg:col-span-4"
          >
            <motion.div 
              variants={fadeIn('down', 0.5)}
              className="flex items-center gap-1 mb-6"
            >
              <img 
                src={rieee} 
                alt="Rutgers IEEE Logo" 
                className="w-auto h-auto"
              />
            </motion.div>
            <motion.p 
              variants={fadeIn('up', 0.6)}
              className="text-gray-200 mb-6"
            >
              Rutgers IEEE is an official branch of the Institute of Electrical and Electronics Engineers.
            </motion.p>
            <motion.div 
              variants={fadeIn('up', 0.7)}
              className="flex gap-4"
            >
              <motion.a 
                whileHover={{ scale: 1.1 }}
                href="https://github.com/rutgers"
                target="_blank"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-900 hover:bg-blue-700 hover:text-white transition-colors"
              >
                <FaGithub className="w-5 h-5" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1 }}
                href="https://instagram.com/rutgersieee/"
                target="_blank" 
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-900 hover:bg-blue-700 hover:text-white transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1 }}
                href="https://linkedin.com/company/rutgersieee"
                target="_blank"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-900 hover:bg-blue-700 hover:text-white transition-colors"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1 }}
                href="https://discord.com/invite/FqGHvWBRpK"
                target="_blank"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-900 hover:bg-blue-700 hover:text-white transition-colors"
              >
                <FaDiscord className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Links Columns */}
          <motion.div 
            variants={fadeIn('left', 0.2)}
            className="lg:col-span-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
                <motion.div 
                  key={category}
                  variants={fadeIn('up', 0.2 * (categoryIndex))}
                >
                  <motion.h3 
                    variants={textVariant(0.2)}
                    className="font-geist text-lg font-medium mb-4 text-white"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </motion.h3>
                  <motion.ul 
                    variants={fadeIn('up', 0.2)}
                    className="space-y-3"
                  >
                    {links.map((link, index) => (
                      <motion.li 
                        key={index}
                        variants={fadeIn('up', 0.1 * (index))}
                      >
                        <motion.a 
                          whileHover={{ x: 5 }}
                          href={link.href}
                          target="_blank"
                          className="text-gray-300 hover:text-gray-100"
                        >
                          {link.name}
                        </motion.a>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          variants={fadeIn('up', 0.8)}
          className="border-t border-gray-200 mt-12 pt-8"
        >
          <motion.div 
            variants={fadeIn('up', 0.9)}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <motion.p 
              variants={fadeIn('right', 1.0)}
              className="text-gray-200 text-sm"
            >
              Copyright © {new Date().getFullYear()} ieee.rutgers.edu
            </motion.p>
            <motion.p 
              variants={fadeIn('left', 1.0)}
              className="text-gray-200 text-sm"
            >
              Created by Andy Zhu
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer