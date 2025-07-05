// import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const Hackathon = () => {
  return (
    <main>
        <Navbar/>
        <div className="mt-30 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold">The Rutgers IEEE Hackathon</h1>
        </div>
        <Footer/>
    </main>
  )
}

export default Hackathon