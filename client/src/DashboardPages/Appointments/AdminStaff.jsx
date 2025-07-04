import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaCalendarCheck } from 'react-icons/fa6'
import secureLocalStorage from 'react-secure-storage'

const AdminStaff = () => {
    const token = secureLocalStorage.getItem('login')
    const [allappoinemts, setallappoinemts] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/appoinments/all-appoinments', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => setallappoinemts(res.data.Result))
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
                <div className="relative bg-blue-600 text-white p-6 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute right-4 top-4 opacity-20 text-white text-6xl">
                        <FaCalendarCheck />
                    </div>
                    <div className="relative z-10">
                        <div className="text-sm font-medium uppercase tracking-wide text-blue-100">
                            Total Appointments
                        </div>
                        <div className="mt-2 text-3xl font-bold">40</div>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-2xl shadow-lg">
                <table className="min-w-full text-sm text-left text-gray-600 bg-white">
                    <thead className="text-xs uppercase bg-blue-100 text-blue-700">
                        <tr>
                            <th className="px-6 py-4 font-semibold tracking-wider">#</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Patient</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Doctor</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Date</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Number</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        
                    </tbody>
                </table>
            </div>



        </div>
    )
}

export default AdminStaff