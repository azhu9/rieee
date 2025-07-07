// import React from 'react'
import DivBody from '../components/DivBody'

import vexu from "../assets/carousel/vex24.webp" 
import igvc from "../assets/carousel/igvc-cover.jpg"
import micromouse from "../assets/carousel/micromouse-cover.jpg"
import verizon from "../assets/carousel/verizon.jpg"
import electronics from "../assets/carousel/electronics-cover.png"

const carouselSlides = [
  {
    src: vexu,
    alt: "Slide 1",
  },
  {
    src: igvc,
    alt: "Slide 2",
  },
  {
    src: micromouse,
    alt: "Slide 3",
  },
  {
    src: verizon,
    alt: "Slide 4",
  },
  {
    src: electronics,
    alt: "Slide 5",
  },
];


const Micromouse = () => {
  return (
    <main>
        <DivBody
        title={"title"}
        carouselSlides={carouselSlides}
        description={'division.description'}
        meetingTime={'division.meetingTime'}
        meetingLocation={'division.meetingLocation'}
      />
    </main>
  )
}

export default Micromouse