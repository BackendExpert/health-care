import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa6'
import secureLocalStorage from 'react-secure-storage'
import { getUserInfoFromToken } from '../../utils/auth';

const Profile = () => {
    const userInfo = getUserInfoFromToken();
    const currentEmail = secureLocalStorage.getItem('loginE')
    const token = secureLocalStorage.getItem('login')

    const roleRaw = userInfo.roles[0];
    const role = typeof roleRaw === 'string' ? roleRaw.toLowerCase() : roleRaw?.name?.toLowerCase();

    const [curretuserdata, setcurretuserdata] = useState([])

    useEffect(() => {

    }, [])

    return (
        <div>
            <div className="flex">
                <FaUser className='fill-blue-700 h-8 w-auto' />
                <h1 className="text-2xl font-bold text-blue-700 ml-2">Profile</h1>
            </div>

            <div className="mt-4">

            </div>
        </div>
    )
}

export default Profile