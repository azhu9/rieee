// import React from 'react'
import BentoGrid from '../components/BentoGrid'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import ScrollToTop from '../utils/ScrollToTop'

const ImageGallery = () => {
  return (
    <section className="mx-auto mt-30">
        <ScrollToTop/>
        <Navbar/>
            <div className="mx-auto">
            <BentoGrid/>
            </div>
        <Footer/>
    </section>
  )
}

export default ImageGallery