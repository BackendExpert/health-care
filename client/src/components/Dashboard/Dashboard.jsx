import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getUserInfoFromToken } from '../../utils/auth';
import DashSide from './DashSide';
import DashNav from './DashNav';
import DashFooter from './DashFooter';
import localStorage from 'react-secure-storage';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [sideOpen, setSideOpen] = useState(false);

    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        const userInfo = getUserInfoFromToken();
        if (!userInfo) {
            localStorage.clear();
            navigate('/');
        } else {
            setUser(userInfo);
        }
    }, [navigate]);

    const toggleSide = () => setSideOpen(prev => !prev);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500 bg-blue-50">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
            <div className="xl:flex">
                {/* Sidebar */}
                <aside
                    className={`fixed top-0 left-0 h-full bg-white border-r border-blue-100 shadow-2xl z-50 w-3/4 max-w-xs
                    transform transition-transform duration-300 ease-in-out
                    xl:translate-x-0
                    ${sideOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    <DashSide />
                </aside>

                {/* Toggle */}
                <button
                    aria-label={sideOpen ? 'Close menu' : 'Open menu'}
                    className="fixed top-6 left-3 z-60 p-2 rounded-full bg-blue-600 text-white xl:hidden shadow-lg hover:bg-blue-700 transition"
                    onClick={toggleSide}
                >
                    {sideOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    )}
                </button>

                <main className="flex-1 xl:ml-[19%] min-h-screen flex flex-col">
                    <header className="bg-white shadow-md sticky top-0 z-40 rounded-b-3xl">
                        <DashNav />
                    </header>

                    <div className="p-4 text-sm bg-blue-50 border-b border-blue-100 text-blue-700 font-mono">
                        <code>{currentPath}</code>
                    </div>

                    <section className="flex-grow p-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-auto">
                        <Outlet />
                    </section>

                    <footer className="bg-white border-t border-blue-100 shadow-inner">
                        <DashFooter />
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
