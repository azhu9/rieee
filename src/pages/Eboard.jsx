import Navbar from '../components/Navbar'

function Eboard(){
    return (
        <main className="relative min-h-screen overflow-x-hidden">
      <div className="absolute -top-28 -left-28 w-[550px] h-[550px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>
      <div className="overflow-hidden">
        <Navbar />
        {/* <Hero />
        <BenefitSection />
        <ImageCarousel/>
        <CompanyLogo />
        <DivisionsGrid/>
        <HackathonSection />
        <FaqSection/>
        <DiscordSection />
        <Footer /> */}
      </div>
    </main>
    )
}

export default Eboard