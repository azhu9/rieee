// import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CountDown from '../components/CountDown'

import { FiExternalLink } from "react-icons/fi";



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
        </div>
        <Footer/>
    </main>
  )
}

export default Hackathon