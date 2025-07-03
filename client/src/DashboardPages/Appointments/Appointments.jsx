import React from 'react';
import { getUserInfoFromToken } from '../../utils/auth';
import AdminStaff from './AdminStaff';
import PatientAppoinments from './PatientAppoinments';

const Appointments = () => {
    const { username, roles } = getUserInfoFromToken() || {};


    const roleNames = Array.isArray(roles)
        ? roles.map(r => (typeof r === 'string' ? r : r.name))
        : [typeof roles === 'string' ? roles : roles?.name];


    if (roleNames.includes('admin')) {
        return <AdminStaff /> ;
    }

    if (roleNames.includes('staff')) {
        return <AdminStaff /> ;
    }

    if (roleNames.includes('doctor')) {
        return <div>Doctor Appointments</div>;
    }

    if (roleNames.includes('patient')) {
        return <PatientAppoinments /> ;
    }


    return <div>No Appointments Available</div>;
};

export default Appointments;
