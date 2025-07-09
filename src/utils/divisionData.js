import vexu from "../assets/divisions/vex.webp"
import igvc from "../assets/divisions/igvc.jpg"

import micromouse from "../assets/divisions/micromouse.webp"
import mm2 from "../assets/divisions/mm2.avif"
import mm3 from "../assets/divisions/mm3.avif"
import mm4 from "../assets/divisions/mm4.avif"
import mm5 from "../assets/divisions/mm5.avif"
import mm6 from "../assets/carousel/micromouse-cover.jpg"

import mlai1 from "../assets/divisions/mlai1.png"
import mlai2 from "../assets/divisions/mlai2.png"



export const divisionContent = {
  micromouse: {
    title: 'Micromouse Division',
    carouselSlides: [
      {
        src: micromouse,
        alt: 'Micromouse Slide 1',
      },
      {
        src: mm2,
        alt: 'Micromouse Slide 2',
      },
      {
        src: mm3,
        alt: 'Micromouse Slide 3',
      },
      {
        src: mm4,
        alt: 'Micromouse Slide 4',
      },
      {
        src: mm5,
        alt: 'Micromouse Slide 5',
      },
      {
        src: mm6,
        alt: 'Micromouse Slide 5',
      },
    ],
    description:
      'Micromouse is a robotics division focused on developing miniature robotic "mice" to autonomously navigate a maze, with the team that is the fastest to reach the center being declared the winner. There are various different constraints, such as size and budget, that competitors will have to work around to ultimately determine the best approach. There is no prior kit or recommended parts list given by competition organizers, so the contestants are free to utilize whatever hardware they see fit to satisfy the constraints. The club itself will assist members in learning about some basic methods to get started and provide parts for construction. This club is an excellent place to become more familiar with different kinds of small electronic components, such as sensors and microcontrollers, and members will learn how to integrate these components using Arduino software.',
    meetingTime: 'Wednesday, 8:30 P.M. - 10:00 P.M.',
    meetingLocation: 'IEEE Lab, Room 004',
  },

  igvc: {
    title: 'IGVC Division',
    carouselSlides: [
      {
        src: igvc,
        alt: 'IGVC Slide 1',
      },
    ],
    description:
      'IGVC focuses on self-driving robots and autonomous navigation challenges. A great opportunity to work with real robotics systems.',
    meetingTime: 'Fill in',
    meetingLocation: 'IEEE Lab, Room 004',
  },
    electronics: {
    title: 'Electronics Division',
    carouselSlides: [
      {
        src: vexu,
        alt: 'Electronics Slide 1',
      },
    ],
    description:
      'Introduce and familiarize members with the basics of electronics and circuitry, as well as microcontrollers and computers such as the Arduino and Raspberry Pi. Hold instructional workshops to give students a chance to gain hands-on experience with electronic devices at a more practical level than in the classroom. Provides a great way for non-ECE students with an interest in the field to test the waters. Developing basic skills and understanding in electronics will enable members to pursue advanced projects inside and outside of Rutgers IEEE.',
    meetingTime: 'Wednesday, 7:30 P.M. - 9:30 P.M.',
    meetingLocation: 'EE205',
  },
    mlai: {
    title: 'MLAI Division',
    carouselSlides: [
      {
        src: mlai1,
        alt: 'MLAI Slide 1',
      },
      {
        src: mlai2,
        alt: 'MLAI Slide 2',
      },
    ],
    description:
      'The ML/AI team focuses on teaching and implementing the powerful concepts, methods, and tools from the rapidly growing fields of machine learning, artificial intelligence, and data analysis. The teaching heavily emphasizes both practical usage and fundamental understanding of ML techniques, covering topics from CS to math and statistics. These skills are strengthened through participation in ML/AI projects, where we code implementations that solve real-world problems.',
    meetingTime: 'Wednesday, 8:00 P.M. - 10:00 P.M.',
    meetingLocation: 'EE203',
  },
  ess: {
    title: 'ESS Division',
    carouselSlides: [
      {
        src: vexu,
        alt: 'MLAI Slide 1',
      },
    ],
    description:
      'ESS description goes here',
    meetingTime: 'ESS hours go here',
    meetingLocation: 'ESS Location',
  },
  pr_committee: {
    title: 'PR Committee',
    carouselSlides: [
      {
        src: vexu,
        alt: 'MLAI Slide 1',
      },
    ],
    description:
      'PR-Committee description goes here',
    meetingTime: 'PR-Committee hours go here',
    meetingLocation: 'PR-Committee Location',
  },
};