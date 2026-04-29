import { useState } from 'react';

import ScrollToTop from '../utils/ScrollToTop';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ─── Data ──────────────────────────────────────────────────────────────────
// Each project can have EITHER a `video` (mp4 path) OR a `slides` (Google Slides embed URL).
// `github` is optional.

const allProjects = [
  {
    id: 1,
    title: 'Neural Style Transfer',
    description:
      'A convolutional neural network that blends the content of one image with the artistic style of another, producing museum-worthy fusions in seconds.',
    tags: ['PyTorch', 'CNN', 'CV'],
    team: ['Alice Chen', 'Brian Park', 'Cyrus Osei'],
    video: null,           // replace with: import vid1 from '../assets/mlai/project1.mp4'
    slides: 'https://docs.google.com/presentation/d/e/EXAMPLE_ID_1/embed?start=false&loop=false&delayms=3000',
    github: 'https://github.com/example/neural-style',
  },
  {
    id: 2,
    title: 'Sentiment Compass',
    description:
      'Fine-tuned transformer model for multi-class sentiment analysis on social media data, with a live dashboard showing real-time tweet sentiment.',
    tags: ['NLP', 'HuggingFace', 'Transformers'],
    team: ['Dana Liu', 'Eli Novak'],
    video: null,           // replace with: import vid2 from '../assets/mlai/project2.mp4'
    slides: null,
    github: null,
  },
  {
    id: 3,
    title: 'RL Pathfinder',
    description:
      'A reinforcement learning agent trained with PPO to navigate procedurally generated mazes, achieving superhuman solve times on 20×20 grids.',
    tags: ['RL', 'PPO', 'TensorFlow'],
    team: ['Fiona Marsh', 'George Tran', 'Hana Ibarra'],
    video: null,
    slides: 'https://docs.google.com/presentation/d/e/EXAMPLE_ID_3/embed?start=false&loop=false&delayms=3000',
    github: 'https://github.com/example/rl-pathfinder',
  },
  {
    id: 4,
    title: 'BioSignal Classifier',
    description:
      'EEG signal classification pipeline using wavelet transforms and an XGBoost ensemble, targeting motor-imagery BCI applications.',
    tags: ['R', 'XGBoost', 'Signal Processing'],
    team: ['Ivan Cho', 'Jasmine Wells'],
    video: null,
    slides: null,
    github: 'https://github.com/example/biosignal',
  },
  {
    id: 5,
    title: 'GenPalette',
    description:
      'Generative AI tool that creates harmonious color palettes from text prompts using a diffusion-based latent space model.',
    tags: ['Gen AI', 'Diffusion', 'PyTorch'],
    team: ['Kai Okonkwo', 'Lena Ramos', 'Mike Sato'],
    video: null,
    slides: 'https://docs.google.com/presentation/d/e/EXAMPLE_ID_5/embed?start=false&loop=false&delayms=3000',
    github: null,
  },
  {
    id: 6,
    title: 'TimeSeries Anomaly',
    description:
      'Unsupervised anomaly detection on industrial sensor streams using LSTM autoencoders, with configurable alert thresholds.',
    tags: ['Unsupervised', 'LSTM', 'Time Series'],
    team: ['Nina Cross', 'Omar Hadid'],
    video: null,
    slides: null,
    github: 'https://github.com/example/ts-anomaly',
  },
];

// ─── MediaEmbed ────────────────────────────────────────────────────────────
// Renders a Google Slides embed OR an mp4 player OR a placeholder.

const MediaEmbed = ({ video, slides, title }) => {
  if (video) {
    return (
      <video
        src={video}
        controls
        className="w-full h-full object-cover"
        aria-label={`Demo video for ${title}`}
      />
    );
  }
  if (slides) {
    return (
      <iframe
        src={slides}
        title={`Slides for ${title}`}
        className="w-full h-full border-0"
        allowFullScreen
      />
    );
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      <span className="font-pixel text-[10px] text-blue-300 tracking-widest">[ DEMO ]</span>
      <span className="font-pixel text-[8px] text-gray-300 tracking-widest">coming soon</span>
    </div>
  );
};

// ─── ProjectCard ───────────────────────────────────────────────────────────

const ProjectCard = ({ project }) => {
  const [hov, setHov] = useState(false);

  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`flex flex-col border overflow-hidden transition-all duration-200 ${
        hov ? 'shadow-xl border-blue-300 -translate-y-1' : 'border-gray-200 shadow-none'
      }`}
    >
      {/* ── Media area ── */}
      <div className="h-[200px] sm:h-[220px] bg-blue-50 overflow-hidden flex-shrink-0">
        <MediaEmbed video={project.video} slides={project.slides} title={project.title} />
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Title */}
        <h2 className="font-vt text-[28px] text-gray-950 leading-none tracking-wide">
          {project.title}
        </h2>

        {/* Description */}
        <p className="font-body font-light text-[13px] text-gray-500 leading-[1.75]">
          {project.description}
        </p>

        {/* Tags */}
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

        {/* Team */}
        <div>
          <p className="font-pixel text-[7px] text-gray-400 tracking-widest mb-1.5">// TEAM</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {project.team.map(name => (
              <span key={name} className="font-body text-[12px] text-gray-600 font-light">
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Footer: spacer + optional github */}
        <div className="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel text-[7px] text-gray-500 tracking-widest hover:text-blue-600 transition-colors leading-relaxed"
            >
              [ GITHUB → ]
            </a>
          ) : (
            <span className="font-pixel text-[7px] text-gray-200 tracking-widest leading-relaxed">
              [ NO REPO ]
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

// ─── Page ──────────────────────────────────────────────────────────────────

const Projects = () => {
  const [activeTag, setActiveTag] = useState(null);

  // Collect all unique tags
  const allTags = [...new Set(allProjects.flatMap(p => p.tags))].sort();

  const displayed = activeTag
    ? allProjects.filter(p => p.tags.includes(activeTag))
    : allProjects;

  return (
    <div className="bg-white text-gray-900 min-h-screen font-body">
      <ScrollToTop />
      <Navbar />

      {/* ── Page header ── */}
      <header className="pt-24 pb-10 px-5 sm:px-[5vw] max-w-6xl mx-auto">
        <p className="font-pixel text-[9px] text-blue-600 tracking-widest mb-5 leading-relaxed">
          // MLAI / PROJECTS
        </p>
        <h1 className="font-vt text-[clamp(52px,12vw,110px)] leading-none text-gray-950 tracking-wide">
          All<span className="text-blue-600"> Projects</span>
        </h1>
        <p className="font-body font-light text-[14px] text-gray-400 mt-4 max-w-lg leading-[1.8]">
          Every project built by MLAI members — from hackathon sprints to semester-long research.
        </p>
      </header>

      {/* ── Tag filter ── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-[5vw] mb-10">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={`font-pixel text-[7px] tracking-widest px-3 py-1.5 border transition-all duration-150 leading-relaxed ${
              activeTag === null
                ? 'bg-blue-600 text-white border-blue-600'
                : 'text-gray-500 border-gray-300 hover:border-blue-400 hover:text-blue-600'
            }`}
          >
            ALL
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`font-pixel text-[7px] tracking-widest px-3 py-1.5 border transition-all duration-150 leading-relaxed ${
                activeTag === tag
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'text-gray-500 border-gray-300 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      <main className="max-w-6xl mx-auto px-5 sm:px-[5vw] pb-24">
        {displayed.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
            {displayed.map(p => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="font-pixel text-[9px] text-gray-300 tracking-widest">
              [ NO PROJECTS FOUND ]
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Projects;