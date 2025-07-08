import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
import Eboard from './pages/Eboard'
import Hackathon from './pages/Hackathon'
import Contact from './pages/Contact'
import Sponsors from './pages/Sponsors'
import ImageGallery from './pages/ImageGallery'
import NoPage from './pages/NoPage'
import DivisionPage from './pages/DivisionPage'

// const router = createBrowserRouter([
//   { path: "/", element: <Home/> },
//   { path: "/home", element: <Home/> },
//   { path: "/micromouse", element: <Micromouse/> },
//   { path: "/eboard", element: <Eboard/> },
//   // { path: "/hackathon", element: <Hackathon/> },
//   // { path: "/contact", element: <Contact/> },

//   { path: "*", element: <NoPage/> },


// ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/divisions/:id" element={<DivisionPage />} />

        <Route path="/eboard" element={<Eboard />} />
        <Route path="/hackathon" element={<Hackathon />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/image-galleries" element={<ImageGallery />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
