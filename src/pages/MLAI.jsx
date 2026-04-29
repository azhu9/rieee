import { useRef, useState } from 'react';

import ScrollToTop from '../utils/ScrollToTop';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImageCarousel from '../components/ImageCarousel';

import { Link } from "react-router-dom";


import mlai1 from '../assets/mlai/mlai1.jpg';
import mlai2 from '../assets/mlai/mlai2.jpg';
import mlai3 from '../assets/mlai/mlai3.jpg';
import mlai4 from '../assets/mlai/mlai4.jpg';
import mlai5 from '../assets/mlai/mlai5.jpg';
import mlai6 from '../assets/mlai/mlai6.jpg';
import mlai7 from '../assets/mlai/mlai7.jpg';

// ─── Data ──────────────────────────────────────────────────────────────────

const carouselSlides = [
  { src: mlai1, alt: 'MLAI weekly meeting' },
  { src: mlai2, alt: 'Workshop session' },
  { src: mlai3, alt: 'Project presentations' },
  { src: mlai4, alt: 'Hackathon' },
  { src: mlai5, alt: 'Guest speaker' },
  { src: mlai6, alt: 'Study group' },
  { src: mlai7, alt: 'Demo Day' },
];

const eboard = [
  { name: 'Name', role: 'President',            photo: null },
  { name: 'Name', role: 'Track Lead',            photo: null },
  { name: 'Name', role: 'Track Lead',            photo: null },
  { name: 'Name', role: 'Secretary',             photo: null },
  { name: 'Name', role: 'Social Media Manager',  photo: null },
];

const projects = [
  {
    id: 1,
    title: 'Project 1',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, suscipit.',
    tags: ['PyTorch', 'CV'],
    image: null,
  },
  {
    id: 2,
    title: 'Project 2',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, suscipit.',
    tags: ['NLP'],
    image: null,
  },
  {
    id: 3,
    title: 'Project 3',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, suscipit.',
    tags: ['RL', 'TensorFlow'],
    image: null,
  },
  {
    id: 4,
    title: 'Project 4',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, suscipit.',
    tags: ['R', 'Gen AI'],
    image: null,
  },
  {
    id: 5,
    title: 'Project 5',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, suscipit.',
    tags: ['Unsupervised', 'Time Series'],
    image: null,
  },
];

// ─── DivisionTitle ─────────────────────────────────────────────────────────

const DivisionTitle = () => (
  <header className="pt-24 pb-10 px-5 sm:px-[5vw] max-w-5xl mx-auto">
    <p className="font-pixel text-[9px] text-blue-600 tracking-widest mb-5 leading-relaxed">
      // DIVISION
    </p>
    <h1 className="font-vt text-[clamp(56px,14vw,120px)] leading-none text-gray-950 mb-4 tracking-wide">
      ML<span className="text-blue-600">AI</span>
    </h1>
  </header>
);

// ─── DemoDaySection ────────────────────────────────────────────────────────

const DemoDaySection = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <section className="max-w-5xl mx-auto px-5 sm:px-[5vw] py-12 sm:py-16 border-b border-gray-100">
      {/* Stack on mobile, side-by-side on sm+ */}
      <div className="flex flex-col sm:grid sm:grid-cols-[180px_1fr] gap-6 sm:gap-12">
        {/* Left label col */}
        <div className="pt-1">
          <p className="font-pixel text-[8px] text-gray-400 tracking-widest leading-relaxed mb-3">
            // EVENT
          </p>
          <h2 className="font-vt text-5xl text-gray-950 leading-none tracking-wide">
            Demo<br />Day
          </h2>
        </div>

        {/* Right content col */}
        <div>
          <p className="font-body font-light text-[15px] text-gray-500 leading-[1.85] mb-6 max-w-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus labore in laboriosam
            tenetur itaque rem aliquam excepturi perferendis optio magni. Id dolores doloribus
            impedit voluptatum, nesciunt aspernatur iste ipsam ea?
          </p>
          <a
            href="#register"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`inline-block font-pixel text-[8px] leading-relaxed tracking-widest px-5 py-3 border transition-all duration-150 ${
              hovered
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-blue-600 border-blue-600'
            }`}
          >
            [ REGISTER NOW ]
          </a>
        </div>
      </div>
    </section>
  );
};

// ─── ProjectCard ───────────────────────────────────────────────────────────

const ProjectCard = ({ project }) => {
  const [hov, setHov] = useState(false);
  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`flex-none w-[280px] sm:w-[300px] snap-start border rounded-none overflow-hidden transition-all duration-200 cursor-pointer ${
        hov ? 'shadow-lg border-blue-300 -translate-y-1' : 'border-gray-200 shadow-none'
      }`}
    >
      {/* Image */}
      <div className="h-[150px] sm:h-[160px] overflow-hidden bg-blue-50 flex items-center justify-center">
        {project.image
          ? <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          : <span className="font-pixel text-[10px] text-blue-300 tracking-widest">[ IMG ]</span>
        }
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5">
        <h3 className="font-vt text-2xl text-gray-900 mb-1 tracking-wide leading-snug">
          {project.title}
        </h3>
        <p className="font-body text-[13px] text-gray-500 leading-[1.7] mb-4 font-light">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(t => (
            <span
              key={t}
              className="font-pixel text-[7px] text-blue-600 bg-blue-50 border border-blue-200 px-2 py-1 leading-relaxed tracking-wide"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

// ─── ProjectSlider ─────────────────────────────────────────────────────────

const ProjectSlider = () => {
  const trackRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const STEP = 300 + 16;

  const go = dir => {
    const next = Math.max(0, Math.min(projects.length - 1, idx + dir));
    setIdx(next);
    trackRef.current?.scrollTo({ left: next * STEP, behavior: 'smooth' });
  };

  return (
    <section className="max-w-5xl mx-auto px-5 sm:px-[5vw] py-12 sm:py-16 pb-20 sm:pb-24">
      {/* Header */}
      <div className="flex items-end justify-between mb-7 gap-4">
        <div>
          <p className="font-pixel text-[8px] text-gray-400 tracking-widest leading-relaxed mb-2">
            // PROJECTS
          </p>
          <h2 className="font-vt text-4xl sm:text-5xl text-gray-950 leading-none tracking-wide">
            Demo Day Projects
          </h2>
        </div>

        {/* Nav controls */}
        <div className="flex items-center gap-2 sm:gap-3 mb-1 flex-shrink-0">
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="font-pixel text-[10px] w-8 h-8 sm:w-9 sm:h-9 border border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center"
          >
            ←
          </button>
          <span className="font-pixel text-[8px] text-gray-400 tracking-widest w-8 text-center">
            {idx + 1}/{projects.length}
          </span>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="font-pixel text-[10px] w-8 h-8 sm:w-9 sm:h-9 border border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center"
          >
            →
          </button>
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mt-5">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i - idx)}
            aria-label={`Go to project ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-colors duration-150 border-none cursor-pointer p-0 ${
              i === idx ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* View all */}
      <Link to="/divisions/mlai/projects">
      <a
        href="/projects"
        className="inline-block mt-8 font-pixel text-[8px] text-blue-600 tracking-widest leading-relaxed hover:underline"
      >
        [ VIEW ALL PROJECTS → ]
      </a>
      </Link>
    </section>
  );
};

// ─── EboardSection ─────────────────────────────────────────────────────────

const EboardSection = () => (
  <section className="max-w-5xl mx-auto px-5 sm:px-[5vw] py-12 sm:py-16 border-t border-gray-100">
    <p className="font-pixel text-[8px] text-gray-400 tracking-widest leading-relaxed mb-2">
      // TEAM
    </p>
    <h2 className="font-vt text-4xl sm:text-5xl text-gray-950 leading-none tracking-wide mb-10">
      New E-Board
    </h2>

    {/* Wraps neatly on mobile; use justify-center so it doesn't left-hug on small screens */}
    <div className="flex flex-wrap justify-center sm:justify-start gap-6 sm:gap-8">
      {eboard.map((member, i) => (
        <div key={i} className="flex flex-col items-center gap-3 w-[100px] sm:w-[120px]">
          <div className="w-[80px] h-[80px] sm:w-[88px] sm:h-[88px] rounded-full overflow-hidden border-2 border-blue-100 bg-blue-50 flex items-center justify-center flex-shrink-0">
            {member.photo
              ? <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
              : <span className="font-pixel text-[7px] text-blue-300 text-center leading-relaxed px-1">[ PFP ]</span>
            }
          </div>
          <div className="text-center">
            <p className="font-body font-medium text-[13px] text-gray-900 leading-snug">
              {member.name}
            </p>
            <p className="font-body font-light text-[11px] text-gray-400 mt-0.5 leading-snug">
              {member.role}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

// ─── Page ──────────────────────────────────────────────────────────────────

const MLAI = () => (
  <div className="bg-white text-gray-900 min-h-screen font-body">
    <ScrollToTop />
    <Navbar />

    <DivisionTitle />

    <div className="max-w-5xl mx-auto px-5 sm:px-[5vw] mb-4">
      <ImageCarousel data={carouselSlides} hasTitle={false} />
    </div>

    <DemoDaySection />
    <ProjectSlider />
    <EboardSection />
    <Footer />
  </div>
);

export default MLAI;