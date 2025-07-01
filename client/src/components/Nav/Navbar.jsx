import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { navdata } from './NavData';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-gradient-to-br from-blue-50 via-white to-blue-100 shadow-sm fixed w-full z-50">
            <div className="flex justify-between items-center px-8 xl:px-32 py-4">

                {/* Logo */}
                <div className="">
                    <Link to="/" className="text-2xl font-bold text-blue-900">
                        MyHealthCare
                    </Link>
                </div>

                {/* Desktop Menus */}
                <div className="hidden xl:flex space-x-6">
                    {navdata.map((item) => (
                        <Link
                            key={item.id}
                            to={item.link}
                            className="text-blue-800 hover:text-blue-900 font-medium transition duration-200"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Hamburger */}
                <div className="xl:hidden mt-2">
                    <button onClick={toggleMenu} className="text-blue-900 focus:outline-none">
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="xl:hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 px-8 py-4 space-y-4 shadow-md">
                    {navdata.map((item) => (
                        <Link
                            key={item.id}
                            to={item.link}
                            className="block text-blue-800 hover:text-blue-900 font-medium transition duration-200"
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
