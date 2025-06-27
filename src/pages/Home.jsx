// import '../App.css'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import CompanyLogo from '../components/CompanyLogo'
import BenefitSection from '../components/BenefitSection'
import HackathonSection from '../components/HackathonSection'
import FaqSection from '../components/FaqSection'
import DiscordSection from '../components/DiscordSection'
import Footer from '../components/Footer'
import DivisionsGrid from '../components/DivisionsGrid'
import ImageCarousel from '../components/ImageCarousel'

import vexu24 from "../assets/carousel/vex24.webp" 

const carouselData = [
  {
    image: vexu24,
    title: "Number 1",
  },
  {
    image: "https://flowbite.com/docs/images/carousel/carousel-1.svg",
    title: "Number 2",
  },
  {
    image: "https://flowbite.com/docs/images/carousel/carousel-1.svg",
    title: "Number 3",
  },

];
function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="absolute -top-28 -left-28 w-[550px] h-[550px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>
      <div className="overflow-hidden">
        <Navbar />
        <Hero />
        <BenefitSection />
        <ImageCarousel/>
        {/* <Carousel
          images={carouselData}
        /> */}
        {/* <img src={vexu24} className="max-w-5xl mx-auto"/> */}
        <CompanyLogo />
        <DivisionsGrid/>
        <HackathonSection />
        <FaqSection/>
        <DiscordSection />
        <Footer />
      </div>
    </main>
  )
}

export default Home
