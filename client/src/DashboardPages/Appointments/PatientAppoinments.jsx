import React, { useEffect, useState } from 'react'
import { FaCalendarCheck } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import DefaultBtn from '../../components/Buttons/DefultBtn'
import axios from 'axios'
import secureLocalStorage from 'react-secure-storage'

const PatientAppoinments = () => {
    const token = secureLocalStorage.getItem('login')
    const [allappoinemts, setallappoinemts] = useState([])
    const [filteredAppoinemts, setFilteredAppoinemts] = useState([])

    const [search, setSearch] = useState('')
    const [dateFilter, setDateFilter] = useState('')

    // pagination
    const [currentPage, setCurrentPage] = useState(1)
    const appoinmentsPerPage = 15

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/appoinments/my-appoinemts', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => {
                console.log(res.data.Result)
                setallappoinemts(res.data.Result || [])
                setFilteredAppoinemts(res.data.Result || [])
            })
            .catch(err => console.log(err))
    }, [token])

    useEffect(() => {
        let filtered = allappoinemts

        if (search.trim() !== '') {
            filtered = filtered.filter(app =>
                (app.userID?.username?.toLowerCase().includes(search.toLowerCase()) ||
                    app.doctorID?.username?.toLowerCase().includes(search.toLowerCase()))
            )
        }

        if (dateFilter !== '') {
            filtered = filtered.filter(app => {
                const appDate = new Date(app.AppoinmentData).toISOString().split('T')[0]
                return appDate === dateFilter
            })
        }

        setFilteredAppoinemts(filtered)
        setCurrentPage(1)
    }, [search, dateFilter, allappoinemts])

    // Assign number per date (order of appointment within that date)
    const assignNumbersPerDate = (appointments) => {
        // Group appointments by date string 'YYYY-MM-DD'
        const grouped = appointments.reduce((acc, app) => {
            const dateKey = new Date(app.AppoinmentData).toISOString().split('T')[0]
            if (!acc[dateKey]) acc[dateKey] = []
            acc[dateKey].push(app)
            return acc
        }, {})

        // Sort each group by datetime ascending and assign number starting at 1
        Object.values(grouped).forEach(group => {
            group.sort((a, b) => new Date(a.AppoinmentData) - new Date(b.AppoinmentData))
            group.forEach((app, index) => {
                app.number = index + 1
            })
        })

        // Return appointments array with 'number' property set
        return appointments.map(app => {
            const dateKey = new Date(app.AppoinmentData).toISOString().split('T')[0]
            const group = grouped[dateKey]
            return group.find(a => a._id === app._id)
        })
    }

    // Apply numbering to filtered appointments
    const numberedAppointments = assignNumbersPerDate(filteredAppoinemts)

    // Pagination
    const indexOfLast = currentPage * appoinmentsPerPage
    const indexOfFirst = indexOfLast - appoinmentsPerPage
    const currentAppoinments = numberedAppointments.slice(indexOfFirst, indexOfLast)
    const totalPages = Math.ceil(numberedAppointments.length / appoinmentsPerPage)

    return (
        <div>
            <div className="flex items-center mb-4">
                <FaCalendarCheck className='fill-blue-700 h-8 w-auto' />
                <h1 className="text-2xl font-bold text-blue-700 ml-2">My Appointments</h1>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
                <div className="relative bg-blue-600 text-white p-6 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute right-4 top-4 opacity-20 text-white text-6xl">
                        <FaCalendarCheck />
                    </div>
                    <div className="relative z-10">
                        <div className="text-sm font-medium uppercase tracking-wide text-blue-100">
                            Total Appointments
                        </div>
                        <div className="mt-2 text-3xl font-bold">{filteredAppoinemts.length}</div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by patient or doctor name"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <input
                    type="date"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                />
            </div>

            {/* Add Appointment */}
            <div className="mb-6">
                <Link to={'/Dashboard/CreateAppoinment'}>
                    <DefaultBtn label='Add New Appointment' />
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl shadow-lg">
                <table className="min-w-full text-sm text-left text-gray-600 bg-white">
                    <thead className="text-xs uppercase bg-blue-100 text-blue-700">
                        <tr>
                            <th className="px-6 py-4 font-semibold tracking-wider">#</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Doctor</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Date</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Number</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {currentAppoinments.length > 0 ? (
                            currentAppoinments.map((app, index) => (
                                <tr className="hover:bg-blue-50 transition-all duration-150" key={app._id || index}>
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {(currentPage - 1) * appoinmentsPerPage + index + 1}
                                    </td>
                                    <td className="px-6 py-4">{app.doctorID?.username || 'N/A'}</td>
                                    <td className="px-6 py-4">
                                        {app.AppoinmentData
                                            ? new Date(app.AppoinmentData).toLocaleDateString()
                                            : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">{app.number}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-6 py-4 text-center text-gray-400" colSpan="4">
                                    No appointments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                <div className="flex space-x-2">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded-full 
                                ${currentPage === i + 1
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                            `}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PatientAppoinments
