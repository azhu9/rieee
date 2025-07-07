import micromouse from "../assets/divisions/micromouse.webp"
import vexu from "../assets/divisions/vex.webp"
import igvc from "../assets/divisions/igvc.jpg"



export const divisionContent = {
  micromouse: {
    title: 'Micromouse Division',
    carouselSlides: [
      {
        src: micromouse,
        alt: 'Micromouse Slide 1',
      },
    ],
    description:
      'The Micromouse team designs autonomous maze-solving robots. We compete at top events and host beginner workshops throughout the year.',
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
    title: 'electronics Division',
    carouselSlides: [
      {
        src: vexu,
        alt: 'Electronics Slide 1',
      },
    ],
    description:
      'Electronics description goes here',
    meetingTime: 'Wednesday, 7:30 P.M. - 9:30 P.M.',
    meetingLocation: 'EE205',
  },
    mlai: {
    title: 'MLAI Division',
    carouselSlides: [
      {
        src: vexu,
        alt: 'MLAI Slide 1',
      },
    ],
    description:
      'MLAI description goes here',
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
    title: 'PR-Committee',
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