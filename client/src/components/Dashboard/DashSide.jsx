import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getUserInfoFromToken } from '../../utils/auth';
import { dashsidedata } from './DashSideData';
import DashUser from '../../assets/DashUser.png';

const DashSide = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { username, roles } = getUserInfoFromToken() || {};

    const roleNames = Array.isArray(roles)
        ? roles.map(r => (typeof r === 'string' ? r : r.name))
        : [typeof roles === 'string' ? roles : roles?.name];

    const filteredMenu = dashsidedata.filter(item => {
        if (roleNames.includes('admin')) return true;
        if (roleNames.includes('staff')) {
            return [
                'Dashboard',
                'Appointments',
                'Doctors',
                'Patients',
                'Pharmacy',
                'Billing',
                'Report Generation',
                'Profile'
            ].includes(item.name);
        }
        if (roleNames.includes('doctor')) {
            return !['System Users', 'Staff', 'Permission', 'Doctors'].includes(item.name);
        }
        if (roleNames.includes('patient')) {
            return [
                'Dashboard',
                'Appointments',
                'Billing',
                'Payment',
                'Pharmacy',
                'Emergency Contacts',
                'Report Generation',
                'Profile'
            ].includes(item.name);
        }
        return false;
    });

    useEffect(() => {
        const currentItem = dashsidedata.find(item => item.link === location.pathname);
        if (currentItem) {
            setActiveMenu(currentItem.id);
            localStorage.setItem('dashmenuID', currentItem.id);
        } else {
            const savedId = localStorage.getItem('dashmenuID');
            if (savedId && filteredMenu.some(item => item.id === Number(savedId))) {
                setActiveMenu(Number(savedId));
            }
        }
    }, [location, filteredMenu, navigate]);

    return (
        <aside
            className="bg-white min-h-screen p-6 border-r border-blue-100 shadow-xl rounded-r-3xl
        overflow-y-auto transition-all scrollbar-thin-custom"
            style={{ maxHeight: '100vh' }}
        >
            <h2 className="text-center text-xs font-extrabold text-blue-600 tracking-widest mb-8 select-none">
                HEALTHCARE MANAGEMENT SYSTEM
            </h2>

            <div className="flex items-center gap-4 bg-blue-50 text-blue-700 rounded-2xl p-4 shadow-inner mb-10">
                <img
                    src={DashUser}
                    alt={`${username} avatar`}
                    className="h-12 w-12 rounded-full border-2 border-blue-400 shadow"
                />
                <div>
                    <h3 className="font-semibold uppercase tracking-wide">{username}</h3>
                    <p className="text-xs uppercase font-medium tracking-wider">{roleNames.join(', ')}</p>
                </div>
            </div>

            <nav className="flex flex-col space-y-3">
                {filteredMenu.map(({ id, icon: Icon, name, link }) => (
                    <Link
                        key={id}
                        to={link}
                        className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-colors
              ${activeMenu === id
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-blue-700 hover:bg-blue-100 hover:text-blue-600'
                            }`}
                        onClick={() => {
                            setActiveMenu(id);
                            localStorage.setItem('dashmenuID', id);
                        }}
                        aria-current={activeMenu === id ? 'page' : undefined}
                    >
                        <span className="text-lg"><Icon /></span>
                        <span className="font-semibold tracking-wide">{name}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default DashSide;
