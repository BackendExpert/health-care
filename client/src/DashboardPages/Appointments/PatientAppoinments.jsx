import React from 'react'
import { FaCalendarCheck } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import DefaultBtn from '../../components/Buttons/DefultBtn'

const PatientAppoinments = () => {
    return (
        <div>
            <div className="flex items-center">
                <FaCalendarCheck className='fill-blue-700 h-8 w-auto' />
                <h1 className="text-2xl font-bold text-blue-700 ml-2">My Appoinments</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
                <div className="relative bg-blue-600 text-white p-6 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute right-4 top-4 opacity-20 text-white text-6xl">
                        <FaCalendarCheck />
                    </div>
                    <div className="relative z-10">
                        <div className="text-sm font-medium uppercase tracking-wide text-blue-100">
                            My Total Appoinments
                        </div>
                        <div className="mt-2 text-3xl font-bold">42</div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <Link to={'/Dashboard/CreateAppoinment'}>
                    <DefaultBtn label='Add New Appoinment' />
                </Link>
            </div>

        </div>
    )
}

export default PatientAppoinments