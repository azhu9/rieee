import { useState, useEffect, useCallback } from 'react';

import ScrollToTop from '../utils/ScrollToTop';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import abhipatel from '/mlai/abhipatel.mp4';

// ─── Data ──────────────────────────────────────────────────────────────────

const TRACKS = ['NLP', 'CV', 'Robot Learning'];

const allProjects = [
  {
    id: 1,
    title: 'Words in Motion: Tracking Semantic Drift Across Online Communities',
    description:
      'Words in Motion tracks how language evolves over time across Reddit communities using Word2Vec embeddings trained on ~5GB of data from r/technology (2008–2024) and r/wallstreetbets (2012–2024). We align each time window\'s embedding space using Procrustes rotation and compute drift scores combining cosine distance and neighbor overlap to detect when and how a word\'s meaning shifted. The interactive app lets you explore any word\'s semantic history, compare how meaning diverges across communities, analyze text for drift patterns, and translate sentences into how they would\'ve been written in a different era — all grounded in the actual embeddings.',
    track: 'NLP',
    tags: ['Python', 'Gensim', 'NumPy', 'Streamlit', 'Plotly', 'Groq API', 'Artic Shift Reddit API', 'pandas', 'PRAW'],
    team: ['Sadhana Vasanthakumar'],
    video: null,
    slides: 'https://drive.google.com/file/d/1IsSa6ZGn-PUbzTJ_pSEbPSeVmRLxPFhx/preview',
    github: 'https://github.com/SadhanaVasanthakumar/semantic-shift',
  },
  {
    id: 8,
    title: 'GrandSlam IQ',
    description:
      'GrandSlam IQ is an AI-powered sports analytics platform that predicts upsets at Grand Slam tennis tournaments by combining player ranking data with natural language processing of press conference transcripts. We scraped 2,279 real pre-match interviews from ASAP Sports and trained a Random Forest model that detects fatigue signals - physical exhaustion, injury concerns, mental tiredness - to achieve a ROC-AUC of 0.70, outperforming a rankings-only baseline by 8 percentage points. The project is deployed as an interactive Streamlit web app with three tools: an upset probability predictor with SHAP explanations, a player scouting report generator using RAG, and a conversational AI agent that answers natural language questions about match statistics and transcript patterns.',
    track: 'NLP',
    tags: ['Python', 'pandas', 'numpy', 'scikit-learn', 'SHAP', 'spaCy', 'Hugging Face Transformers', 'BeautifulSoup', 'SQLite', 'Groq API', 'Streamlit', 'ChromaDB'],
    team: ['Sonakshi Sharma'],
    video: null,
    slides: 'https://drive.google.com/file/d/1y-F7ghJgkaQ_sVFRY-KGlAEef_KbWkpH/preview',
    github: 'https://sonak11-ai-ml-nlp-app-1yupue.streamlit.app/',
  },
  {
    id: 2,
    title: 'AI Visibility Auditor',
    description:
      'This project is an AI Search Visibility Auditor that crawls a company site and competitor sites, generates buyer-style prompts, and simulates AI-answer visibility to produce a directional visibility score. It identifies weak prompt buckets (pricing, comparison, trust, implementation, and use cases) and generates prioritized recommendations plus on-demand content briefs. The stack combines a Next.js dashboard with a FastAPI backend and Supabase-authenticated APIs.',
    track: 'NLP',
    tags: ['Next.js 14', 'React 18', 'TypeScript', 'TailwindCSS', 'Recharts', 'FastAPI', 'Pydantic', 'httpx', 'BeautifulSoup', 'Supabase', 'Gemini API'],
    team: ['Anish Yenduri'],
    video: null,
    slides: 'https://drive.google.com/file/d/1y7_VEkT6zoTQwW6gkRs1NYV-PpQ7bdjy/preview',
    github: 'https://github.com/anish-yen/visibility-next',
  },
  {
    id: 5,
    title: 'AcentrifieD',
    description:
      'We built a project called AcentrifieD that helps users manage their emotions and stay on track. The user starts by entering how they feel, which is analyzed to generate simple task suggestions. The user then indicates whether they completed a task. If completed, they receive an encouraging email. If not, the system keeps suggesting easier tasks. The history page tracks emotions over time and allows users to generate charts.',
    track: 'NLP',
    tags: ['Mistral', 'Flask', 'APIs, Email SMPT', 'Agentic Agents'],
    team: ['Shloka Kumari', 'Rishita Gadhamsetty'],
    video: null,
    slides: 'https://drive.google.com/file/d/1w5fhe7Qlj2mxQjSbKP6o0zwz7Hs5XbSC/preview',
    github: null,
  },
  {
    id: 3,
    title: 'Exercise Form Detector',
    description:
      'Our project detects good form and bad form based on video input for planks, squats and push ups.',
    track: 'CV',
    tags: ['Numpy', 'pandas', 'MediaPipe', 'YOLO', 'scikit-learn'],
    team: ['Harish Anand', 'Deblina Chanda', 'Derek Diehl'],
    video: null,
    slides: 'https://www.youtube.com/embed/3VRQ6MXfinA',
    github: 'https://github.com/haxrha/Exercise_detection',
  },
  {
    id: 4,
    title: 'Robot Dawg',
    description:
      'The robot starts faced center then in a circle a random goal appears and the goal is for the robot to walk to it.',
    track: 'Robot Learning',
    tags: ['PyTorch', 'Reinforcement Learning', 'Mujoco'],
    team: ['Diego Vargas', 'Christopher Koenig', 'Omar Saad', 'Isaac Eligulashvili'],
    video: null,
    slides: null,
    github: null,
  },
  {
    id: 6,
    title: 'SitSense',
    description:
      'This project aims to provide people with guidance on their posture during prolonged gaming or working sessions. It utilizes Yolov8n model to give life feedback on a person\'s posture, helping them understand what adjustments should be made to have a good posture.',
    track: 'CV',
    tags: ['Yolov8n', 'Ultralytics', 'shutil'],
    team: ['Alexey Bogorad', 'Sahasra Bobbala'],
    video: null,
    slides: 'https://docs.google.com/presentation/d/e/2PACX-1vTHltdj4eGbGZbqhWH5sm_-YeEg9iH6lNV9x85Ri6L6BT3o362zNwxxdbfBuCEtZAnhiCn8ECt7ZUHb/pubembed?start=true&loop=true&delayms=3000',
    github: 'https://colab.research.google.com/drive/1WtMZ0KldF8k9uqclv5nJ32UDhjsyQCJV',
  },
  {
    id: 7,
    title: '2d Drawing and Face Filter',
    description:
      'Our project allows you to draw on screen with your finger using 6 different colors and then export your drawing as a filter for your face!',
    track: 'CV',
    tags: ['OpenCV', 'Mediapipe', 'Python'],
    team: ['Valerie Wang', 'Pooja Kedia', 'Aryan Putta'],
    video: null,
    slides: 'https://drive.google.com/file/d/1DKbi2AhNbITb49YOHvzXf05naLqdTWlV/preview',
    github: 'https://github.com/valerie-wa/Filter-Drawing',
  },
  {
    id: 9,
    title: 'CanvasFlow',
    description:
      'CanvasFlow is an AI-powered study planner that helps students turn assignments into a clear, personalized study schedule. It syncs course data (currently demonstrated with mock Canvas data while integration approval is pending), analyzes assignment workload into recommended subtasks, and generates timed study sessions across day/week/month calendar views. The app also includes progress tracking and an in-app Advisor chatbot that answers planning questions using live assignment, session, and due-date data.',
    track: 'NLP',
    tags: ['Next.js', 'React.js', 'TypeScript', 'TailwindCSS', 'shadcn/ui', 'NextAuth', 'Prisma', 'SQLite', 'Ollama', 'Canvas API integration'],
    team: ['Paarth Rana', 'Vikhyat Kulshrestha'],
    video: null,
    slides: 'https://drive.google.com/file/d/1Gx6LP3oj7k9GDHFjzsrYzPiz-13NvWdr/preview',
    github: null,
  },
  {
    id: 12,
    title: 'Object State Tracking in Language Models',
    description:
      'I examined whether language models can reliably maintain and update object states across multi-step narratives, or whether they exhibit systematic failures due to state overwriting. I constructed a controlled dataset of templated stories and evaluated performance across several small open-source models. Results show a consistent degradation beyond three state transitions, largely independent of model scale. To better understand this behavior, we probe residual stream representations and find that the correct state is frequently encoded in the model\'s internal activations even when the final output is incorrect. This suggests that the limitation arises not from a failure to store information, but from an inability to appropriately extract or utilize it during generation.',
    track: 'NLP',
    tags: ['PyTorch', 'NumPy', 'Matplotlib', 'scikit-learn', 'huggingface'],
    team: ['Diya Shah'],
    video: null,
    slides: 'https://drive.google.com/file/d/1deXCgkp41AKTmsLMgrf93nNg5LvNOCmO/preview',
    github: 'https://github.com/ddiyas/Object-State-Tracking-in-Language-Models',
  },
  {
    id: 10,
    title: 'FinPulse - Personalized Financial News',
    description:
      'FinPulse is a personalized financial news web app that helps users quickly understand the stories most relevant to their interests. It pulls fresh headlines from external news sources, caches them, and ranks them using a hybrid relevance approach so the feed is both timely and tailored. The platform also generates AI-based impact scores and plain-language explanations that highlight what each article could mean for the user.',
    track: 'NLP',
    tags: ['Typescript', 'SQL', 'Python', 'CSS', 'Postgres', 'pgvector', 'Supabase', 'React 18'],
    team: ['Matheus Sousa'],
    video: null,
    slides: 'https://drive.google.com/file/d/1y13lRjmVimB_LunKRJMDrcln7w8srZsp/preview',
    github: null,
  },
  {
    id: 11,
    title: '3D-DRAW',
    description:
      '3D draw is an AR computer vision app that runs in your web browser with three.js. It allows for freehand drawing with your hands through your webcam. It has many features, including color and material changing, exporting as a 3D model, and more',
    track: 'CV',
    tags: ['OpenCV', 'Mediapipe', 'Python', 'Pygame', 'Three.js'],
    team: ['Lucas Johnson', 'Caitlin Chan'],
    video: null,
    slides: 'https://docs.google.com/presentation/d/e/2PACX-1vSIL8Nzglvt9CSRiuYMcWNteArdEZ6QaWMXaVfQt_V6uMuiyPeBizsWXCxGtaNXSf0e2IUPHOa5T1eE/pubembed?start=true&loop=true&delayms=3000',
    github: '3d-draw.xyz',
  },
  {
    id: 13,
    title: 'TradeMind',
    description:
      'TradeMind NLP is a financial sentiment analysis tool that extracts and structures insights from unstructured news data, including sentiment, topics, keywords, entities, and summaries.',
    track: 'NLP',
    tags: ['pandas', 'requests', 'Streamlit', 'Anthropic'],
    team: ['Ryan Wang'],
    video: null,
    slides: 'https://drive.google.com/file/d/1Rx0GuEmdbfV0evCkaSPTGH4-dadAR9aZ/preview',
    github: null,
  },
  {
    id: 14,
    title: 'FilingLens AI',
    description:
      'FilingLens AI is a Streamlit finance dashboard that fetches public SEC EDGAR filings, stores cleaned filing data in SQLite, and helps users explore company reports. It uses a local Ollama AI model to generate structured research notes from filings like 10-Ks, 10-Qs, and 8-Ks without relying on paid APIs.',
    track: 'NLP',
    tags: ['Python', 'SQLite', 'SEC EDGAR', 'StreamLit', 'Ollama'],
    team: ['Mohnish Mehta'],
    video: null,
    slides: 'https://www.loom.com/embed/fe6177c0b72d415e8b0e91b0aa1630bb',
    github: null,
  },
  {
    id: 15,
    title: 'RAG Debugger',
    description:
      'An end-to-end RAG debugging toolkit covering hybrid retrieval, cross-encoder reranking, and multi-stage failure diagnostics. Built for developers who need to know not just that their pipeline failed, but where.',
    track: 'NLP',
    tags: ['pymupdf', 'Groq API'],
    team: ['Turanya Varri'],
    video: null,
    slides: 'https://drive.google.com/file/d/1rmJ1Oyp9fooAF-5bYd_8ZCOd5NF757-m/preview',
    github: 'https://github.com/turanyavarri/RAG-Debugger',
  },
  {
    id: 16,
    title: 'Autonomous Flight Drone',
    description:
      'Our project focused on developing an autonomous drone simulation using MuJoCo and Python to model realistic flight dynamics. We implemented stable hovering and stabilization while working toward incorporating reinforcement learning methods, such as PPO, to enable goal-directed navigation and obstacle avoidance. Our long-term objective is to train the drone to make intelligent flight decisions for terrain navigation.',
    track: 'Robot Learning',
    tags: ['PyTorch', 'MuJoCo', 'GitHub', 'numPy'],
    team: ['Vanshika Gupta', 'Jay H Duvvuri', 'Matthew Passantino', 'Preston Stewart', 'Aayan Fazal'],
    video: null,
    slides: null,
    github: 'https://github.com/PsiPJ/drone-project-better',
  },
  {
    id: 17,
    title: 'Humanoid',
    description:
      'We are using the Proximal Policy Optimization algorithm in order to train a humanoid robot in simulator to walk. The model learns stable locomotion by optimizing a balance between exploration and reward-driven behavior through iterative policy updates.',
    track: 'Robot Learning',
    tags: ['PyTorch', 'Gymnasium', 'MuJoCo'],
    team: ['Abhi Patel', 'Aayush Sherchan', 'Ankur Macha', 'Jonathan Barak', 'Veer Patel', 'Soham Gupta', 'Yuvanshankar Mahesh'],
    video: abhipatel,
    slides: 'https://drive.google.com/file/d/1upDci34snHbffNrtk851o4Xvl_aWwB3w/preview',
    github: 'https://github.com/abhipa871/RLHumanoidMujoco.git',
  },
];

// ─── Thumbnail URL extraction ───────────────────────────────────────────────

/**
 * Given a project, returns the best thumbnail URL we can derive without
 * any authenticated requests. Priority: video → slides URL parse.
 *
 * Supported slide formats:
 *  - Google Drive preview  → drive.google.com/file/d/{ID}/preview
 *  - Google Drive open     → drive.google.com/open?id={ID}
 *  - Google Slides pubembed → docs.google.com/presentation/d/{ID}/pub...
 *  - YouTube embed          → youtube.com/embed/{VIDEO_ID}
 *  - YouTube watch          → youtube.com/watch?v={VIDEO_ID}
 *  - Loom embed             → loom.com/embed/{VIDEO_ID}
 */
const getThumbnailUrl = (project) => {
  // If the project has a local video file, we'll handle it differently in the component
  if (project.video) return null;

  const url = project.slides;
  if (!url) return null;

  // ── Google Drive file preview / open ─────────────────────────────────────
  // https://drive.google.com/file/d/FILE_ID/preview
  const driveFileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveFileMatch) {
    return `https://drive.google.com/thumbnail?id=${driveFileMatch[1]}&sz=w640`;
  }

  // https://drive.google.com/open?id=FILE_ID
  const driveOpenMatch = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (driveOpenMatch) {
    return `https://drive.google.com/thumbnail?id=${driveOpenMatch[1]}&sz=w640`;
  }

  // ── Google Slides pubembed ────────────────────────────────────────────────
  // https://docs.google.com/presentation/d/PRESENTATION_ID/pub...
  const slidesMatch = url.match(/docs\.google\.com\/presentation\/d\/e\/([a-zA-Z0-9_-]+)/);
  if (slidesMatch) {
    // pubembed presentations: thumbnail via export endpoint
    return `https://docs.google.com/presentation/d/e/${slidesMatch[1]}/export/png?pageid=p`;
  }

  // ── YouTube ───────────────────────────────────────────────────────────────
  // https://www.youtube.com/embed/VIDEO_ID  or  /watch?v=VIDEO_ID
  const ytEmbedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
  if (ytEmbedMatch) {
    return `https://img.youtube.com/vi/${ytEmbedMatch[1]}/hqdefault.jpg`;
  }
  const ytWatchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (ytWatchMatch) {
    return `https://img.youtube.com/vi/${ytWatchMatch[1]}/hqdefault.jpg`;
  }

  // ── Loom ──────────────────────────────────────────────────────────────────
  // https://www.loom.com/embed/LOOM_ID
  const loomMatch = url.match(/loom\.com\/(?:embed|share)\/([a-zA-Z0-9]+)/);
  if (loomMatch) {
    // Loom's thumbnail CDN pattern (public, no auth required)
    return `https://cdn.loom.com/sessions/thumbnails/${loomMatch[1]}-with-play.gif`;
  }

  return null;
};

// ─── Track accent colors ────────────────────────────────────────────────────

const TRACK_STYLES = {
  'NLP':            'bg-violet-50 text-violet-600 border-violet-200',
  'CV':             'bg-emerald-50 text-emerald-600 border-emerald-200',
  'Robot Learning': 'bg-orange-50 text-orange-500 border-orange-200',
};

const TRACK_FILTER_ACTIVE = {
  'NLP':            'bg-violet-600 text-white border-violet-600',
  'CV':             'bg-emerald-600 text-white border-emerald-600',
  'Robot Learning': 'bg-orange-500 text-white border-orange-500',
};

// Placeholder colors per track — shown when no thumbnail is available
const TRACK_PLACEHOLDER = {
  'NLP': {
    bg: 'bg-violet-50',
    iconColor: 'text-violet-300',
    label: 'text-violet-400',
    icon: '⬡', // hexagon-ish for NLP/language
  },
  'CV': {
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-300',
    label: 'text-emerald-400',
    icon: '◈', // eye-like for CV
  },
  'Robot Learning': {
    bg: 'bg-orange-50',
    iconColor: 'text-orange-300',
    label: 'text-orange-400',
    icon: '⬡',
  },
};

// ─── MediaModal ────────────────────────────────────────────────────────────

const MediaModal = ({ project, onClose }) => {
  const handleKey = useCallback(e => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-gray-950 flex flex-col"
        style={{ maxHeight: '90vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Modal header ── */}
        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-gray-800">
          <div className="min-w-0">
            <span className={`inline-block font-pixel text-[7px] tracking-widest px-2 py-1 border leading-relaxed mb-2 ${TRACK_STYLES[project.track]}`}>
              {project.track}
            </span>
            <h2 className="font-vt text-[22px] sm:text-[26px] text-white leading-tight tracking-wide break-words">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex-shrink-0 font-pixel text-[10px] text-gray-400 hover:text-white border border-gray-700 hover:border-gray-400 w-8 h-8 flex items-center justify-center transition-colors mt-1"
          >
            ✕
          </button>
        </div>

        {/* ── Media ── */}
        <div className="w-full bg-black" style={{ aspectRatio: '16/9' }}>
          {project.video ? (
            <video
              key={project.id}
              src={project.video}
              controls
              className="w-full h-full"
              aria-label={`Demo video for ${project.title}`}
            >
              <source src={project.video} type="video/mp4" />
            </video>
          ) : project.slides ? (
            <iframe
              key={project.id}
              src={project.slides}
              title={`Slides for ${project.title}`}
              className="w-full h-full border-0"
              allowFullScreen
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : null}
        </div>

        {/* ── Modal footer ── */}
        <div className="px-5 py-4 border-t border-gray-800 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-pixel text-[7px] text-gray-500 tracking-widest mb-1.5">// TEAM</p>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {project.team.map(name => (
                <span key={name} className="font-body text-[12px] text-gray-300 font-light">
                  {name}
                </span>
              ))}
            </div>
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel text-[7px] text-gray-400 tracking-widest hover:text-blue-400 transition-colors leading-relaxed flex-shrink-0"
            >
              [ GITHUB/LINK → ]
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── ProjectThumbnail ──────────────────────────────────────────────────────
// Renders either:
//   1. A <video> poster for local video projects
//   2. A Drive/YT/Loom auto-thumbnail <img> with a play-button overlay
//   3. A track-colored placeholder when nothing is available

const ProjectThumbnail = ({ project, onClick }) => {
  const [imgError, setImgError] = useState(false);
  const hasMedia = !!(project.video || project.slides);
  const thumbnailUrl = getThumbnailUrl(project);
  const placeholder = TRACK_PLACEHOLDER[project.track];

  // ── Local video: use a video element as its own thumbnail ─────────────────
  if (project.video) {
    return (
      <button
        onClick={onClick}
        aria-label="Open demo"
        className="w-full h-full relative overflow-hidden group cursor-pointer"
      >
        <video
          src={project.video}
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="metadata"
          // Seek to 1s on load so we get a non-black first frame
          onLoadedMetadata={e => { e.target.currentTime = 1; }}
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/30 group-hover:bg-black/50 transition-all duration-150">
          <div className="w-12 h-12 rounded-full border-2 border-white/80 flex items-center justify-center group-hover:bg-white/20 transition-all duration-150">
            <span className="text-white text-lg ml-0.5">▶</span>
          </div>
          <span className="font-pixel text-[7px] text-white/80 tracking-widest group-hover:text-white transition-colors duration-150">
            [ WATCH DEMO ]
          </span>
        </div>
      </button>
    );
  }

  // ── Auto-thumbnail from URL parse ─────────────────────────────────────────
  if (thumbnailUrl && !imgError) {
    return (
      <button
        onClick={hasMedia ? onClick : undefined}
        aria-label="Open demo"
        className={`w-full h-full relative overflow-hidden group ${hasMedia ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <img
          src={thumbnailUrl}
          alt={`Preview for ${project.title}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImgError(true)}
        />
        {/* Subtle dark overlay always visible, stronger on hover */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-all duration-200" />
        {hasMedia && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-12 h-12 rounded-full border-2 border-white/90 flex items-center justify-center bg-black/30">
              <span className="text-white text-lg ml-0.5">▶</span>
            </div>
            <span className="font-pixel text-[7px] text-white tracking-widest drop-shadow">
              [ WATCH DEMO ]
            </span>
          </div>
        )}
      </button>
    );
  }

  // ── Placeholder: track-colored tile ───────────────────────────────────────
  return (
    <button
      onClick={hasMedia ? onClick : undefined}
      aria-label={hasMedia ? 'Open demo' : undefined}
      className={`w-full h-full flex flex-col items-center justify-center gap-3 ${placeholder.bg} transition-colors duration-150 ${hasMedia ? 'cursor-pointer group' : 'cursor-default'}`}
    >
      {/* Big decorative track icon */}
      <span className={`text-5xl select-none ${placeholder.iconColor} transition-transform duration-200 ${hasMedia ? 'group-hover:scale-110' : ''}`}>
        {project.track === 'CV' ? '◈' : project.track === 'Robot Learning' ? '⬡' : '⬡'}
      </span>
      <span className={`font-pixel text-[7px] tracking-widest ${placeholder.label}`}>
        {hasMedia ? '[ CLICK TO VIEW ]' : '[ COMING SOON ]'}
      </span>
    </button>
  );
};

// ─── ProjectCard ───────────────────────────────────────────────────────────

const ProjectCard = ({ project, onOpenModal }) => {
  const [hov, setHov] = useState(false);
  const hasMedia = !!(project.video || project.slides);

  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`flex flex-col border overflow-hidden transition-all duration-200 min-w-0 ${
        hov ? 'shadow-xl border-blue-300 -translate-y-1' : 'border-gray-200 shadow-none'
      }`}
    >
      {/* ── Thumbnail ── */}
      <div className="h-[180px] sm:h-[220px] overflow-hidden flex-shrink-0">
        <ProjectThumbnail project={project} onClick={() => onOpenModal(project)} />
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-5 gap-4 min-w-0">

        {/* Track badge */}
        <span className={`self-start font-pixel text-[7px] tracking-widest px-2 py-1 border leading-relaxed ${TRACK_STYLES[project.track]}`}>
          {project.track}
        </span>

        {/* Title */}
        <h2 className="font-vt text-[26px] sm:text-[28px] text-gray-950 leading-tight tracking-wide break-words">
          {project.title}
        </h2>

        {/* Description */}
        <p className="font-body font-light text-[13px] text-gray-500 leading-[1.75] break-words">
          {project.description}
        </p>

        {/* Tech tags */}
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

        {/* Footer */}
        <div className="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between gap-3">
          {hasMedia && (
            <button
              onClick={() => onOpenModal(project)}
              className="font-pixel text-[7px] text-blue-600 tracking-widest hover:underline leading-relaxed"
            >
              [ WATCH DEMO → ]
            </button>
          )}
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel text-[7px] text-gray-500 tracking-widest hover:text-blue-600 transition-colors leading-relaxed ml-auto"
            >
              [ GITHUB/LINK → ]
            </a>
          ) : (
            <span className="font-pixel text-[7px] text-gray-200 tracking-widest leading-relaxed ml-auto">
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
  const [activeTrack, setActiveTrack] = useState(null);
  const [modalProject, setModalProject] = useState(null);

  const displayed = activeTrack
    ? allProjects.filter(p => p.track === activeTrack)
    : allProjects;

  return (
    <div className="bg-white text-gray-900 min-h-screen font-body">
      <ScrollToTop />
      <Navbar />

      {/* ── Modal ── */}
      {modalProject && (
        <MediaModal project={modalProject} onClose={() => setModalProject(null)} />
      )}

      {/* ── Page header ── */}
      <header className="pt-24 pb-10 px-5 sm:px-[5vw] max-w-6xl mx-auto">
        <p className="font-pixel text-[9px] text-blue-600 tracking-widest mb-5 leading-relaxed">
          // MLAI / PROJECTS
        </p>
        <h1 className="font-vt text-[clamp(52px,12vw,110px)] leading-none text-gray-950 tracking-wide">
          Demo<span className="text-blue-600"> Day</span>
        </h1>
        <p className="font-body font-light text-[14px] text-gray-400 mt-4 max-w-lg leading-[1.8]">
          Projects our club has spent their semester creating!
        </p>
      </header>

      {/* ── Track filter ── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-[5vw] mb-10">
        <p className="font-pixel text-[7px] text-gray-400 tracking-widest mb-3">// FILTER BY TRACK</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTrack(null)}
            className={`font-pixel text-[7px] tracking-widest px-3 py-1.5 border transition-all duration-150 leading-relaxed ${
              activeTrack === null
                ? 'bg-blue-600 text-white border-blue-600'
                : 'text-gray-500 border-gray-300 hover:border-blue-400 hover:text-blue-600'
            }`}
          >
            ALL
          </button>
          {TRACKS.map(track => (
            <button
              key={track}
              onClick={() => setActiveTrack(activeTrack === track ? null : track)}
              className={`font-pixel text-[7px] tracking-widest px-3 py-1.5 border transition-all duration-150 leading-relaxed ${
                activeTrack === track
                  ? TRACK_FILTER_ACTIVE[track]
                  : 'text-gray-500 border-gray-300 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {track}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      <main className="max-w-6xl mx-auto px-5 sm:px-[5vw] pb-24">
        {displayed.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {displayed.map(p => (
              <ProjectCard key={p.id} project={p} onOpenModal={setModalProject} />
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