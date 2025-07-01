import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import HomePage from './pages/HomePage/HomePage'
import Footer from './components/Footer/Footer'
import Navbar from './components/Nav/Navbar'
import TopNav from './components/Nav/TopNav'

function App() {
  const [showTopNav, setShowTopNav] = useState(true)
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Show/hide TopNav depending on scrollY
      setShowTopNav(window.scrollY < 20)

      // Detect scroll direction for Navbar
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        // scrolling down and scrolled past 50px — hide Navbar
        setShowNavbar(false)
      } else {
        // scrolling up — show Navbar
        setShowNavbar(true)
      }

      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <BrowserRouter>
      <TopNav show={showTopNav} />
      {/* Padding top when TopNav visible */}
      <div style={{ paddingTop: showTopNav ? 60 : 0 }}>
        <Navbar show={showNavbar} />
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
