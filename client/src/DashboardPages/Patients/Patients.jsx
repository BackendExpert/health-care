import React from 'react';
import { getUserInfoFromToken } from '../../utils/auth';
import AdminStaffP from './AdminStaffP';
import DoctorPatients from './DoctorPatients';


const Patients = () => {
    const { username, roles } = getUserInfoFromToken() || {};


    const roleNames = Array.isArray(roles)
        ? roles.map(r => (typeof r === 'string' ? r : r.name))
        : [typeof roles === 'string' ? roles : roles?.name];


    if (roleNames.includes('admin')) {
        return <AdminStaffP /> ;
    }

    if (roleNames.includes('staff')) {
        return <AdminStaffP /> ;
    }

    if (roleNames.includes('doctor')) {
        return <DoctorPatients />;
    }

    return <div>No Appointments Available</div>;
};

export default Patients;
