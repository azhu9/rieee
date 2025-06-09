import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CompanyLogo from './components/CompanyLogo'
import BenefitSection from './components/BenefitSection'
import HackathonSection from './components/HackathonSection'
import FaqSection from './components/FaqSection'
import DiscordSection from './components/DiscordSection'
import Footer from './components/Footer'
import ImageCarousel from './components/ImageCarousel'
import DivisionsGrid from './components/DivisionsGrid'

function App() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="absolute -top-28 -left-28 w-[550px] h-[550px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>
      <div className="overflow-hidden">
        <Navbar />
        <Hero />
        <BenefitSection />
        <ImageCarousel/>
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

export default App
