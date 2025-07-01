// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { navdata } from './NavData';

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-br from-blue-50 via-white to-blue-100 shadow-sm">
            <div className="flex justify-between items-center px-8 md:px-32 py-4">

                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-blue-900">
                    MyHealthCare
                </Link>

                {/* Menus */}
                <div className="flex space-x-6">
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
            </div>
        </nav>
    );
};

export default Navbar;
