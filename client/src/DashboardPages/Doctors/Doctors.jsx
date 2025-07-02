import React from 'react'
import { FaUserMd } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import DefaultBtn from '../../components/Buttons/DefultBtn'

const Doctors = () => {
    return (
        <div className="">
            <div className="flex items-center">
                <FaUserMd className='fill-blue-700 h-8 w-auto' />
                <h1 className="text-2xl font-bold text-blue-700 ml-2">Doctors</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
                <div className="relative bg-blue-600 text-white p-6 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute right-4 top-4 opacity-20 text-white text-6xl">
                        <FaUserMd />
                    </div>
                    <div className="relative z-10">
                        <div className="text-sm font-medium uppercase tracking-wide text-blue-100">
                            Total Doctors
                        </div>
                        <div className="mt-2 text-3xl font-bold">10</div>
                    </div>
                </div>
            </div>
            <div className="">
                <Link to={'/Dashboard/AddDoctor'}>
                    <DefaultBtn 
                        type='submit'
                        label='Add New Doctor'
                    />
                </Link>
            </div>


        </div>
    )
}

export default Doctors