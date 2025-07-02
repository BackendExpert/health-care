import React, { useEffect, useState, useRef } from 'react';
import { FaUserCog } from 'react-icons/fa';
import { FaGear, FaPowerOff } from 'react-icons/fa6';
import { getUserInfoFromToken } from '../../utils/auth';
import DashUser from '../../assets/DashUser.png';

const DashNav = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const { username, roles } = getUserInfoFromToken();
    const role = roles[0]?.name || '';

    useEffect(() => {
        const handleClickOutside = e => {
            if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
        };
        const handleEscape = e => {
            if (e.key === 'Escape') setMenuOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    return (
        <nav className="relative bg-white border-b border-blue-100 shadow-md py-4 px-6 rounded-b-3xl flex justify-between items-center">
            <h1 className="text-2xl font-extrabold text-blue-600 select-none tracking-tight">Dashboard</h1>
            <div className="relative">
                <button onClick={() => setMenuOpen(prev => !prev)}
                    className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">
                    <img src={DashUser} alt={`${username} avatar`} className="h-11 w-11 rounded-full border-2 border-blue-400 shadow-sm"/>
                    <span className="hidden sm:inline uppercase font-semibold text-blue-800 tracking-wider">{username}</span>
                    <span className="absolute bottom-1 right-0 h-3 w-3 bg-blue-400 border-2 border-white rounded-full animate-pulse"/>
                </button>

                <div
                    ref={menuRef}
                    className={`origin-top-right absolute right-0 mt-3 w-72 rounded-3xl bg-white border border-blue-100 shadow-xl transition
                        ${menuOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
                    role="menu"
                >
                    <div className="p-5 border-b border-blue-100 text-center">
                        <img src={DashUser} alt={`${username} profile`} className="h-20 w-20 mx-auto rounded-full border shadow-md"/>
                        <h2 className="pt-3 text-lg font-bold text-blue-800">{username}</h2>
                        <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide">{role}</p>
                    </div>
                    <div className="p-3 space-y-1">
                        <a href="/Dashboard/Profile" className="flex items-center gap-3 px-4 py-2 rounded-lg text-blue-700 hover:bg-blue-100 transition font-medium">
                            <FaUserCog className="text-lg" /> Profile
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg text-blue-700 hover:bg-blue-100 transition font-medium">
                            <FaGear className="text-lg" /> Settings
                        </a>
                        <button onClick={() => {localStorage.clear(); window.location.href='/login'}}
                            className="w-full text-left flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition font-medium">
                            <FaPowerOff className="text-lg" /> Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DashNav;
