import React from 'react'
import { FaUserMd } from 'react-icons/fa'

const Doctors = () => {
    return (
        <div className="flex items-center">
            <FaUserMd className='fill-blue-700 h-8 w-auto' />
            <h1 className="text-2xl font-bold text-blue-700 ml-2">Doctors</h1>
        </div>
    )
}

export default Doctors