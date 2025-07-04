import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaCalendarCheck } from 'react-icons/fa6'
import secureLocalStorage from 'react-secure-storage'
import DefaultInput from '../../components/Form/DefaultInput'
import DateInput from '../../components/Form/DateInput'

const AdminStaff = () => {
    const token = secureLocalStorage.getItem('login')
    const [allappoinemts, setallappoinemts] = useState([])
    const [filteredAppointments, setFilteredAppointments] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const [searchQuery, setSearchQuery] = useState("")
    const [filterDate, setFilterDate] = useState("")

    const itemsPerPage = 15

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/appoinments/all-appoinments', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => {
                setallappoinemts(res.data.Result)
                setFilteredAppointments(res.data.Result)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        let filtered = allappoinemts

        if (searchQuery.trim() !== "") {
            filtered = filtered.filter(item =>
            (item.userID?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.doctorID?.username?.toLowerCase().includes(searchQuery.toLowerCase()))
            )
        }

        if (filterDate !== "") {
            filtered = filtered.filter(item => {
                const appointmentDate = new Date(item.AppoinmentData).toISOString().split('T')[0]
                return appointmentDate === filterDate
            })
        }

        setFilteredAppointments(filtered)
        setCurrentPage(1)
    }, [searchQuery, filterDate, allappoinemts])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage)

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
                        <div className="mt-2 text-3xl font-bold">{filteredAppointments.length}</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <DefaultInput
                    label="Search by patient or doctor"
                    name="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type name..."
                />
                <DateInput
                    label="Filter by date"
                    name="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                />
            </div>


            <div className="overflow-x-auto rounded-2xl shadow-lg">
                <table className="min-w-full text-sm text-left text-gray-600 bg-white">
                    <thead className="text-xs uppercase bg-blue-100 text-blue-700">
                        <tr>
                            <th className="px-6 py-4 font-semibold tracking-wider">#</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Patient</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Doctor</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {currentItems.length > 0 ? currentItems.map((item, index) => (
                            <tr key={item._id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">{indexOfFirstItem + index + 1}</td>
                                <td className="px-6 py-4">{item.userID?.username || 'N/A'}</td>
                                <td className="px-6 py-4">{item.doctorID?.username || 'N/A'}</td>
                                <td className="px-6 py-4">
                                    {new Date(item.AppoinmentData).toLocaleDateString()}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="text-center px-6 py-4">No appointments found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-xl ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        Prev
                    </button>
                    <span className="px-4 py-2 rounded-xl border">{currentPage} / {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-xl ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}

export default AdminStaff
