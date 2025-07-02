import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import HomePage from './pages/HomePage/HomePage'
import Footer from './components/Footer/Footer'
import Navbar from './components/Nav/Navbar'
import TopNav from './components/Nav/TopNav'
import AboutUs from './pages/AboutUs/AboutUs'
import Services from './pages/Services/Services'
import Doctors from './pages/Doctors/Doctors'
import OurProducts from './pages/Products/OurProducts'
import ContactUs from './pages/ContactUs/ContactUs'
import TestForm from './pages/Testings/TestForm'
import NotFound from './components/Errors/NotFound'
import Login from './pages/AuthPages/Login'
import NEWS from './pages/NEWS/NEWS'

function App() {
    const [showTopNav, setShowTopNav] = useState(false)
    const [showNavbar, setShowNavbar] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768)

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768)
        }
        window.addEventListener('resize', handleResize)
        handleResize() // initial check

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (!isDesktop) {
            setShowTopNav(false)
            setShowNavbar(true)
            return
        }

        const checkScroll = () => {
            setShowTopNav(window.scrollY < 20)
            if (window.scrollY > lastScrollY && window.scrollY > 50) {
                setShowNavbar(false)
            } else {
                setShowNavbar(true)
            }
            setLastScrollY(window.scrollY)
        }

        // Check once on mount
        checkScroll()

        window.addEventListener('scroll', checkScroll)
        return () => window.removeEventListener('scroll', checkScroll)
    }, [lastScrollY, isDesktop])

    return (
        <BrowserRouter>
            {isDesktop && <TopNav show={showTopNav} />}
            <div style={{ paddingTop: isDesktop && showTopNav ? 60 : 0 }}>
                <Navbar show={showNavbar} />
                <Routes>
                    <Route path='*' element={<NotFound />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path='/about' element={<AboutUs /> } />
                    <Route path='/services' element={<Services />} />
                    <Route path='/doctors' element={<Doctors /> } />
                    <Route path='/products' element={<OurProducts /> } />
                    <Route path='/contact' element={<ContactUs /> } />
                    <Route path='/news' element={<NEWS /> } />
                    <Route path='/login' element={<Login /> } />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App
