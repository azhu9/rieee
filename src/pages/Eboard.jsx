import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/ProfileCard'
// import Testimonial from '../components/TestimonialsSection'

const eboardData = [
  {
    name: " Amrik Krishnakumar",
    image: "/src/assets/divisions/VEXU.JPG",
    role: "President",
    grade: "Junior",
  },
  {
    name: "Ana-Maria Moreno",
    image: "https://flowbite.com/docs/images/carousel/carousel-1.svg",
    role: "External Vice President",
    grade: "Junior",
  },
  {
    name: "Shreyans Bhuyan",
    image: "https://flowbite.com/docs/images/carousel/carousel-1.svg",
    role: "Internal Vice President",
    grade: "Sophomore",
  },
  {
    name: "Saachi Rohilla",
    image: "https://flowbite.com/docs/images/carousel/carousel-1.svg",
    role: "Treasurer",
    grade: "Junior",
  },
  {
    name: "Venky Maddeboini",
    image: "https://flowbite.com/docs/images/carousel/carousel-1.svg",
    role: "Secretary",
    grade: "Sophomore",
  },
  {
    name: "Aiden Annis",
    image: "https://flowbite.com/docs/images/carousel/carousel-1.svg",
    role: "Fundraising Chair",
    grade: "Sophomore",
  },
  {
    name: "Andy Zhu",
    image: "https://flowbite.com/docs/images/carousel/carousel-1.svg",
    role: "Webmaster",
    grade: "Junior",
  },
  {
    name: "Chance Reyes",
    image: "https://flowbite.com/docs/images/carousel/carousel-1.svg",
    role: "EGC Representative",
    grade: "Junior",
  },
]

const divisionLeadsData = [
  {
    name: "Andy Zhu",
    image: "https://flowbite.com/docs/images/carousel/carousel-1.svg",
    role: "VEXU Co-President",
    grade: "Junior",
  },
  {
    name: "Ivan Shi",
    image: "https://flowbite.com/docs/images/carousel/carousel-1.svg",
    role: "VEXU Co-President",
    grade: "Sophomore",
  },
]

function Eboard(){
    return (
        <main className="relative min-h-screen overflow-x-hidden">
      <div className="absolute -top-28 -left-28 w-[550px] h-[550px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>
      <div className="overflow-hidden">
        <Navbar />
        <div className="mt-30 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Our E-Board</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 place-items-center">
              {eboardData.map((data, index) => (
                <Card
                  key={index}
                  name={data.name}
                  image={data.image}
                  role={data.role}
                  grade={data.grade}
                />
              ))}
            </div>
        </div>
        <div className="mt-30 max-w-5xl lg:mx-auto mb-10">
            <h1 className="text-3xl font-bold mb-8">Our Division Leads</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {divisionLeadsData.map((data, index) => (
                <Card
                  key={index}
                  name={data.name}
                  image={data.image}
                  role={data.role}
                  grade={data.grade}
                />
              ))}
            </div>
        </div>
        
        <Footer /> 
      </div>
    </main>
    )
}

export default Eboard