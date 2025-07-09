// import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CountDown from '../components/CountDown'
import ImageCarousel from '../components/ImageCarousel'
import HackathonSection from '../components/HackathonSection'
// import img from "../assets/divisions/ess.webp"
import vexu from "../assets/carousel/vex24.webp" 
import igvc from "../assets/carousel/igvc-cover.jpg"

import { FiExternalLink } from "react-icons/fi";

const carouselSlides = [
  {
    src: vexu,
    alt: "Slide 1",
    title: "The VEXU Division at the World Championships 24-25 in Dallas, TX",
  },
  {
    src: igvc,
    alt: "Slide 2",
    title: "The 28th Annual Intelligent Ground Vehicle Competition in Michigan",
  },
];

const Hackathon = () => {
  return (
    <main>
        <Navbar/>
        <div className="">
          <div className="pb-20 w-full p-8 rounded-2xl bg-cover bg-center" style={{
                backgroundImage: `
                  radial-gradient(#d1d5db 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
              }}>
            <h1 className="md:text-5xl text-3xl font-bold text-center text-black mt-40">Rutgers IEEE Hardware X Software Hackathon</h1>
            <CountDown targetDate={"2026-03-26T12:00:00"}/>
            <div className="flex justify-center gap-2 font-geist text-lg">
              <button
                className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition-all hover:shadow-lg hover:shadow-blue-100 active:scale-95 w-full md:w-auto md:m-0">
                  Sign Up
                </button>
              <button
                className="flex bg-transparent text-black border-black border-1 px-8 py-2 rounded-lg cursor-pointer transition-all hover:shadow-lg hover:shadow-blue-100 active:scale-95 w-full md:w-auto md:m-0">
                  2025 Devpost
                  <FiExternalLink className="text-lg mt-1 ml-1"/>
                </button>
            </div>
          </div>
          {/* <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2">
            <img className="m-auto rounded-lg h-8/12" src={img}/>
            <div className="flex flex-col justify-center mx-4">
                  <p className="text-red-500 font-bold">RUTGERS IEEE VEXU DIVISION</p>
                  <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">Who are we?</h1>
                  <p>VEXU is a collegiate level robotics competition designed to pit your university against others in head to head matches. Each year the Robotics Education & Competition Foundation releases a game for which you must design your robot to be the best, whether through intelligent programming, robust build quality, or killer strategy. It is our job at Rutgers IEEE VEXU to allow students of all backgrounds and majors to design, build, program, and strategize together to put Rutgers on the map of international competitive robotics.</p>
                  </div>
          </div> */}
          <HackathonSection hasLink={false}/>
          <ImageCarousel data={carouselSlides} hasTitle={false}/>
        
        </div>
        <Footer/>
    </main>
  )
}

export default Hackathon