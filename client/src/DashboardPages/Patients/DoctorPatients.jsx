import axios from 'axios'
import React, { useEffect, useState, useMemo } from 'react'
import { FaHospitalUser } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const DoctorPatients = () => {
    const token = secureLocalStorage.getItem('login')
    const [doctorpatient, setdoctorpatient] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [genderFilter, setGenderFilter] = useState('All')
    const [currentPage, setCurrentPage] = useState(1)

    const ITEMS_PER_PAGE = 15

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_APP_API + '/doctor/mypatients', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(res => {
                if (res.data.Result) {
                    setdoctorpatient(res.data.Result)
                }
            })
            .catch(err => console.log(err))
    }, [token])

    // Filter patients by search term and gender
    const filteredPatients = useMemo(() => {
        return doctorpatient.filter(item => {
            const patient = item.userID || {}
            const fullName = patient.fullname?.toLowerCase() || ''
            const nic = patient.nic?.toLowerCase() || ''
            const gender = patient.gender || ''

            const matchesSearch =
                fullName.includes(searchTerm.toLowerCase()) ||
                nic.includes(searchTerm.toLowerCase())

            const matchesGender =
                genderFilter === 'All' || gender.toLowerCase() === genderFilter.toLowerCase()

            return matchesSearch && matchesGender
        })
    }, [doctorpatient, searchTerm, genderFilter])

    // Pagination calculations
    const totalPages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE)

    const paginatedPatients = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
        return filteredPatients.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    }, [filteredPatients, currentPage])

    const handlePageChange = newPage => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage)
        }
    }

    return (
        <div className="">
            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
                <div className="relative bg-blue-600 text-white p-6 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute right-4 top-4 opacity-20 text-white text-6xl">
                        <FaHospitalUser />
                    </div>
                    <div className="relative z-10">
                        <div className="text-sm font-medium uppercase tracking-wide text-blue-100">
                            Total Patients
                        </div>
                        <div className="mt-2 text-3xl font-bold">{filteredPatients.length}</div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
                <input
                    type="text"
                    placeholder="Search by Name or NIC"
                    value={searchTerm}
                    onChange={e => {
                        setSearchTerm(e.target.value)
                        setCurrentPage(1)
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-1/2"
                />

                <select
                    value={genderFilter}
                    onChange={e => {
                        setGenderFilter(e.target.value)
                        setCurrentPage(1)
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-1/4"
                >
                    <option value="All">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl shadow-lg">
                <table className="min-w-full text-sm text-left text-gray-600 bg-white">
                    <thead className="text-xs uppercase bg-blue-100 text-blue-700">
                        <tr>
                            <th className="px-6 py-4 font-semibold tracking-wider">#</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">NIC</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Name</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Age</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Gender</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {paginatedPatients.length > 0 ? (
                            paginatedPatients.map((item, index) => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                                    </td>
                                    <td className="px-6 py-4">{item.userID?.nic || '-'}</td>
                                    <td className="px-6 py-4">{item.userID?.fullname || '-'}</td>
                                    <td className="px-6 py-4">{item.userID?.age || '-'}</td>
                                    <td className="px-6 py-4">{item.userID?.gender || '-'}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex">
                                            <Link
                                                to={`/doctor/view-history/${item.userID?._id}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                View
                                            </Link>
                                            <div className="text-blue-600 hover:underline ml-4 cursor-pointer">
                                                Add Remarks
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                                    No patients found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 space-x-3 select-none">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md border ${currentPage === 1
                            ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                            : 'border-blue-600 text-blue-600 hover:bg-blue-100'
                            }`}
                    >
                        Prev
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-3 py-1 rounded-md border ${currentPage === i + 1
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'border-gray-300 text-gray-600 hover:bg-blue-100'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md border ${currentPage === totalPages
                            ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                            : 'border-blue-600 text-blue-600 hover:bg-blue-100'
                            }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}

export default DoctorPatients
