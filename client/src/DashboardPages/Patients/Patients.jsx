import React from 'react'
import { FaHospitalUser } from 'react-icons/fa6'

const Patients = () => {
    return (
        <div>
            <div className="flex">
                <FaHospitalUser className='fill-blue-700 h-8 w-auto'/>
                <h1 className="text-2xl font-bold text-blue-700 ml-2">Patients</h1>
            </div>
        </div>
    )
}

export default Patients