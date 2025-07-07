// import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Button, TextInput, Textarea} from "flowbite-react";

import { MdOutlineEmail, MdOutlineLocationOn } from "react-icons/md";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaDiscord } from 'react-icons/fa'

import ScrollToTop from'../utils/ScrollToTop';



const Contact = () => {
  return (
    
    <section className="relative min-h-screen overflow-x-hidden">
      <div className="absolute -top-28 -left-28 w-[550px] h-[700px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>

      <ScrollToTop/>
      <Navbar/>
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex h-screen">
        <div className="flex flex-col md:flex-row items-start gap-30 m-auto">
          <div className="md:w-1/2">
            <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-gray-800">
              Have a question or want to reach out? Fill out the form and we’ll get back to you as soon as possible.
            </p>
            <ul className="m-4 space-y-3">
              <li className="flex items-center gap-2">
                <MdOutlineEmail size={20}/>
                rutgers.ieee@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <FaFacebook size={20}/>
                facebook.com/RutgersIEEE
              </li>
              <li className="flex items-center gap-2">
                <FaInstagram size={20} />
                instagram.com/rutgersieee/
              </li>
              <li className="flex items-center gap-2">
                <FaLinkedinIn size={20} />
                linkedin.com/company/rutgersieee
              </li>
              <li className="flex items-center gap-2">
                <FaDiscord size={20} />
                discord.gg/6RsmjQe
              </li>
              <li className="flex items-center gap-2">
                <MdOutlineLocationOn size={20}/>
                Room EE-004, 94 Brett Road, Piscataway, NJ 08854
              </li>
            </ul>
          </div>

          <form className=" flex flex-col gap-6 w-full md:w-1/2 border-1 border-gray-300 p-8 rounded-2xl shadow-xl transition-shadow duration-300">
            <div>
              <h2 className="text-sm text-slate-800 my-1">Your Name</h2>
              <TextInput id="name" type="text" placeholder="John Doe" required shadow />
            </div>

            <div>
              <h2 className="text-sm text-slate-800 my-1">Your Email</h2>
              <TextInput id="email" type="email" placeholder="name@example.com" required shadow />
            </div>

            <div>
              <h2 className="text-sm text-slate-800 my-1">Your Message</h2>
              <Textarea
                id="message"
                rows={5}
                placeholder="Write your message here..."
                className="w-full rounded-lg border border-gray-300 bg-[#f9fafb] px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <Button type="submit">Send Message</Button>
          </form>
        </div>
      </div>
      <Footer/>
    </section>
  )
}

export default Contact