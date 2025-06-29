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

import vexu from "../assets/carousel/vex24.webp" 
import igvc from "../assets/carousel/igvc-cover.jpg"
import micromouse from "../assets/carousel/micromouse-cover.jpg"
import verizon from "../assets/carousel/verizon.jpg"
import electronics from "../assets/carousel/electronics-cover.png"

import ScrollToTop from'../utils/ScrollToTop';


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
  {
    src: micromouse,
    alt: "Slide 3",
    title: "Micromouse wins 1st place at MIT in 2024",
  },
  {
    src: verizon,
    alt: "Slide 4",
    title: "Rutgers IEEE visiting Verizon's Innovation Lab",
  },
  {
    src: electronics,
    alt: "Slide 5",
    title: "Electronics hosting workshops for all experience levels",
  },
];

function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="absolute -top-28 -left-28 w-[550px] h-[550px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>
      <div className="overflow-hidden">
        <ScrollToTop/>
        <Navbar />
        <Hero />
        <BenefitSection />
        <ImageCarousel data={carouselSlides} hasTitle={true}
        />

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
