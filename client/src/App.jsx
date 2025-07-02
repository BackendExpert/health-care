import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
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
import PrivateRoute from './components/Auth/PrivateRoute'
import Dashboard from './components/Dashboard/Dashboard'
import DashHome from './DashboardPages/DashHome/DashHome'

import { useLayoutEffect } from 'react'

import RolePermissions from './DashboardPages/Permissions/CreateRolePermissions'
import CreateRolePermissions from './DashboardPages/Permissions/CreateRolePermissions'
import ViewOneRole from './DashboardPages/Permissions/ViewOneRole'

import DashError from './components/Errors/DashError'
import Patients from './DashboardPages/Patients/Patients'

const AppContent = () => {
    const location = useLocation()
    const isDashboard = location.pathname.startsWith('/Dashboard')

    const [showTopNav, setShowTopNav] = useState(false)
    const [showNavbar, setShowNavbar] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768)

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768)
        }
        window.addEventListener('resize', handleResize)
        handleResize()

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

        checkScroll()

        window.addEventListener('scroll', checkScroll)
        return () => window.removeEventListener('scroll', checkScroll)
    }, [lastScrollY, isDesktop])

    return (
        <>
            {!isDashboard && isDesktop && <TopNav show={showTopNav} />}
            <div style={{ paddingTop: !isDashboard && isDesktop && showTopNav ? 60 : 0 }}>
                {!isDashboard && <Navbar show={showNavbar} />}

                <Routes>
                    <Route path='*' element={<NotFound />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path='/about' element={<AboutUs />} />
                    <Route path='/services' element={<Services />} />
                    <Route path='/doctors' element={<Doctors />} />
                    <Route path='/products' element={<OurProducts />} />
                    <Route path='/contact' element={<ContactUs />} />
                    <Route path='/news' element={<NEWS />} />
                    <Route path='/login' element={<Login />} />

                    <Route path='/Dashboard/' element={<PrivateRoute element={<Dashboard />} />} >
                        <Route path='*' element={<PrivateRoute element={<DashError />} />} />

                        <Route path='Permissions' element={<PrivateRoute element={<RolePermissions />} />} />
                        <Route path='Create-Permissions' element={<PrivateRoute element={<CreateRolePermissions />} />} />
                        <Route path='View-One-Role/:id' element={<PrivateRoute element={<ViewOneRole />} />} />

                        <Route path='Home' element={<PrivateRoute element={<DashHome />} />} />
                        <Route path='Patients' element={<PrivateRoute element={<Patients />} />} />
                    </Route>
                </Routes>

                {!isDashboard && <Footer />}
            </div>
        </>
    )
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    )
}

export default App
