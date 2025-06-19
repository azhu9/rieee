import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from './pages/Home'
import Eboard from './pages/Eboard'
// import Hackathon from './pages/Hackathon'
// import Contact from './pages/Contact'
import NoPage from './pages/NoPage'

const router = createBrowserRouter([
  { path: "/", element: <Home/> },
  { path: "/home", element: <Home/> },
  { path: "/eboard", element: <Eboard/> },
  // { path: "/hackathon", element: <Hackathon/> },
  // { path: "/contact", element: <Contact/> },

  { path: "*", element: <NoPage/> },


]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>,
)
