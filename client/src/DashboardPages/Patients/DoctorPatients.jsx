import axios from 'axios'
import React, { useEffect, useState, useMemo } from 'react'
import { FaHospitalUser } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

import DefaultInput from '../../components/Form/DefaultInput'
import DateInput from '../../components/Form/DateInput'
import DefaultBtn from '../../components/Buttons/DefultBtn'

const DoctorPatients = () => {
    const token = secureLocalStorage.getItem('login')
    const [doctorpatient, setdoctorpatient] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [genderFilter, setGenderFilter] = useState('All')
    const [currentPage, setCurrentPage] = useState(1)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedPatientID, setSelectedPatientID] = useState(null)
    const [remark, setRemark] = useState('')
    const [nextDate, setNextDate] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const ITEMS_PER_PAGE = 15

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/doctor/mypatients', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => {
                if (res.data.Result) setdoctorpatient(res.data.Result)
            })
            .catch(err => console.log(err))
    }, [token])

    const filteredPatients = useMemo(() => {
        return doctorpatient.filter(item => {
            const patient = item.userID || {}
            const fullName = patient.fullname?.toLowerCase() || ''
            const nic = patient.nic?.toLowerCase() || ''
            const gender = patient.gender || ''

            return (
                (fullName.includes(searchTerm.toLowerCase()) || nic.includes(searchTerm.toLowerCase())) &&
                (genderFilter === 'All' || gender.toLowerCase() === genderFilter.toLowerCase())
            )
        })
    }, [doctorpatient, searchTerm, genderFilter])

    const totalPages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE)

    const paginatedPatients = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
        return filteredPatients.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    }, [filteredPatients, currentPage])

    const openModal = patientID => {
        setSelectedPatientID(patientID)
        setRemark('')
        setNextDate('')
        setError('')
        setSuccessMsg('')
        setModalOpen(true)
    }

    const closeModal = () => setModalOpen(false)

    const handleSubmit = async e => {
        e.preventDefault()
        if (!remark.trim() || !nextDate) {
            setError('Please fill in both fields.')
            return
        }
        setLoading(true)
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_APP_API}/doctor/update-remark/${selectedPatientID}`,
                { remark, nextDate },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (res.data.Status === 'Success') {
                setSuccessMsg('Added successfully!')
                setTimeout(() => closeModal(), 1200)
            } else {
                setError('Failed to add remark.')
            }
        } catch {
            setError('An error occurred.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={modalOpen ? "backdrop-blur-sm transition duration-300" : ""}>
            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
                <div className="relative bg-blue-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
                    <div className="absolute right-4 top-4 opacity-20 text-6xl">
                        <FaHospitalUser />
                    </div>
                    <div className="relative z-10">
                        <div className="text-sm uppercase tracking-wide text-blue-100">
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
                    onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1) }}
                    className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-1/2"
                />
                <select
                    value={genderFilter}
                    onChange={e => { setGenderFilter(e.target.value); setCurrentPage(1) }}
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
                            <th className="px-6 py-4 font-semibold">#</th>
                            <th className="px-6 py-4 font-semibold">NIC</th>
                            <th className="px-6 py-4 font-semibold">Name</th>
                            <th className="px-6 py-4 font-semibold">Age</th>
                            <th className="px-6 py-4 font-semibold">Gender</th>
                            <th className="px-6 py-4 font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {paginatedPatients.length ? paginatedPatients.map((item, idx) => (
                            <tr key={item._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">{(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                                <td className="px-6 py-4">{item.userID?.nic || '-'}</td>
                                <td className="px-6 py-4">{item.userID?.fullname || '-'}</td>
                                <td className="px-6 py-4">{item.userID?.age || '-'}</td>
                                <td className="px-6 py-4">{item.userID?.gender || '-'}</td>
                                <td className="px-6 py-4">
                                    <div className="flex">
                                        <Link to={`/doctor/view-history/${item.userID?._id}`} className="text-blue-600 hover:underline">
                                            View
                                        </Link>
                                        <button
                                            onClick={() => openModal(item.userID?._id)}
                                            className="ml-4 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            Add Remarks
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-400">No patients found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-3">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded border ${currentPage === 1 ? 'border-gray-300 text-gray-400 cursor-not-allowed' : 'border-blue-600 text-blue-600 hover:bg-blue-100'}`}
                    >
                        Prev
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded border ${currentPage === i + 1 ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-600 hover:bg-blue-100'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded border ${currentPage === totalPages ? 'border-gray-300 text-gray-400 cursor-not-allowed' : 'border-blue-600 text-blue-600 hover:bg-blue-100'}`}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 mx-4">
                        <h2 className="text-xl font-bold mb-4">Add Remark & Next Appointment</h2>
                        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
                        {successMsg && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{successMsg}</div>}

                        <form onSubmit={handleSubmit}>
                            <DefaultInput
                                label="Remark"
                                type="text"
                                name="remark"
                                value={remark}
                                onChange={e => setRemark(e.target.value)}
                                placeholder="Enter remark"
                                required
                            />
                            <DateInput
                                label="Next Appointment Date"
                                name="nextDate"
                                value={nextDate}
                                onChange={e => setNextDate(e.target.value)}
                                required
                            />

                            <div className="flex justify-end gap-3">
                                <DefaultBtn label="Cancel" onClick={closeModal} />
                                <DefaultBtn label={loading ? "Saving..." : "Add"} type="submit" disabled={loading} />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DoctorPatients
