import {
    MdDashboard,
    MdPayment,
    MdInventory,
    MdContactPhone
} from "react-icons/md";

import {
    FaFileInvoiceDollar,
    FaHospitalUser,
    FaCalendarCheck,
    FaRegClipboard,
    FaUserNurse,
    FaUsers,
    FaHospital
} from "react-icons/fa6";

import {
    FaHeartbeat,
    FaUserCog,
    FaUserMd
} from "react-icons/fa";

const dashsidedata = [
    {
        id: 1,
        name: 'Dashboard',
        link: '/Dashboard/Home',
        icon: MdDashboard
    },
    {
        id: 2,
        name: 'Patients',
        link: '/Dashboard/Patients',
        icon: FaHospitalUser
    },
    {
        id: 3,
        name: 'Appointments',
        link: '/Dashboard/Appointments',
        icon: FaCalendarCheck
    },
    {
        id: 4,
        name: 'Doctors',
        link: '/Dashboard/Doctors',
        icon: FaUserMd
    },
    {
        id: 5,
        name: 'Staff',
        link: '/Dashboard/Staff',
        icon: FaUserNurse
    },
    {
        id: 6,
        name: 'Billing',
        link: '/Dashboard/Billing',
        icon: FaFileInvoiceDollar
    },
    {
        id: 7,
        name: 'Payment',
        link: '/Dashboard/Payment',
        icon: MdPayment
    },
    {
        id: 8,
        name: 'Pharmacy',
        link: '/Dashboard/Pharmacy',
        icon: MdInventory
    },
    {
        id: 9,
        name: 'Report Generation',
        link: '/Dashboard/Reports',
        icon: FaRegClipboard
    },
    {
        id: 10,
        name: 'Emergency Contacts',
        link: '/Dashboard/EmergencyContacts',
        icon: MdContactPhone
    },
    {
        id: 11,
        name: 'System Users',
        link: '/Dashboard/Users',
        icon: FaUsers
    },
    {
        id: 12,
        name: 'Profile',
        link: '/Dashboard/Profile',
        icon: FaUserCog
    }
];

export { dashsidedata };
