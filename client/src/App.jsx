import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage/HomePage'
import Footer from './components/Footer/Footer'
import Navbar from './components/Nav/Navbar'

function App() {

    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<HomePage /> } />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default App
