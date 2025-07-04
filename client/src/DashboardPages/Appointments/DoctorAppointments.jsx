import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaCalendarCheck, FaUser, FaIdCard, FaPhone, FaHome, FaTint, FaVenusMars, FaAddressBook } from 'react-icons/fa'
import secureLocalStorage from 'react-secure-storage'
import DefaultInput from '../../components/Form/DefaultInput'
import DateInput from '../../components/Form/DateInput'
import DefaultBtn from '../../components/Buttons/DefultBtn'

const DoctorAppointments = () => {
    const token = secureLocalStorage.getItem('login')
    const [allappoinemts, setallappoinemts] = useState([])
    const [filteredAppointments, setFilteredAppointments] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [filterDate, setFilterDate] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedPatientId, setSelectedPatientId] = useState(null)
    const [patient, setPatient] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [patienthistorybtn, setpatienthistorybtn] = useState(false)
    const [loadingPatient, setLoadingPatient] = useState(false)

    const itemsPerPage = 15

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/appoinments/doctor-appoiments', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                console.log('Appointments API Response:', res.data.Result)
                setallappoinemts(res.data.Result)
                setFilteredAppointments(res.data.Result)
            })
            .catch(err => console.log(err))
    }, [token])

    useEffect(() => {
        let filtered = allappoinemts

        if (searchQuery.trim() !== "") {
            filtered = filtered.filter(item =>
                item.userID?.username?.toLowerCase().includes(searchQuery.toLowerCase())
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

    useEffect(() => {
        if (selectedPatientId) {
            setLoadingPatient(true)
            axios.get(import.meta.env.VITE_APP_API + '/paitent/get-patientbyid/' + selectedPatientId, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(res => {
                    console.log('Patient API Response:', res.data.Result)
                    if (res.data && res.data.Result) {
                        // If result is array, pick first, else take object directly
                        const patientData = Array.isArray(res.data.Result) ? res.data.Result[0] : res.data.Result
                        setPatient(patientData)
                    } else {
                        setPatient(null)
                    }
                })
                .catch(err => {
                    console.log('Error fetching patient:', err)
                    setPatient(null)
                })
                .finally(() => setLoadingPatient(false))
        }
    }, [selectedPatientId, token])

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
                    label="Search by patient"
                    name="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type patient name..."
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
                            <th className="px-6 py-4 font-semibold tracking-wider">Date</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Number</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">View</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {currentItems.length > 0 ? currentItems.map((item, index) => (
                            <tr key={item._id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">{indexOfFirstItem + index + 1}</td>
                                <td className="px-6 py-4">{item.userID?.fullname || 'N/A'}</td>
                                <td className="px-6 py-4">
                                    {new Date(item.AppoinmentData).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">{item.userID?.number || 'N/A'}</td> {/* Fix here */}
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => {
                                            setSelectedPatientId(item.userID?._id)
                                            setShowModal(true)
                                            setpatienthistorybtn(false)
                                        }}
                                        className="text-blue-600 hover:underline"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="text-center px-6 py-4">No appointments found.</td>
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

            {showModal && (
                <div
                    className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Patient Details</h1>

                        {loadingPatient ? (
                            <div className="text-center text-gray-500">Loading patient data...</div>
                        ) : patient ? (
                            <div className="space-y-4">
                                <div className="flex items-center text-gray-700">
                                    <FaUser className="text-blue-600 mr-3" />
                                    <span className="font-semibold w-32">Full Name:</span>
                                    <span>{patient.fullname || patient.username}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FaIdCard className="text-blue-600 mr-3" />
                                    <span className="font-semibold w-32">NIC:</span>
                                    <span>{patient.nic || 'N/A'}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FaVenusMars className="text-blue-600 mr-3" />
                                    <span className="font-semibold w-32">Gender:</span>
                                    <span>{patient.gender || 'N/A'}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FaHome className="text-blue-600 mr-3" />
                                    <span className="font-semibold w-32">Address:</span>
                                    <span>{patient.address || 'N/A'}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FaPhone className="text-blue-600 mr-3" />
                                    <span className="font-semibold w-32">Mobile:</span>
                                    <span>{patient.contactInfo || patient.number || 'N/A'}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FaAddressBook className="text-blue-600 mr-3" />
                                    <span className="font-semibold w-32">Landline:</span>
                                    <span>{patient.landline || 'N/A'}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FaTint className="text-blue-600 mr-3" />
                                    <span className="font-semibold w-32">Blood Group:</span>
                                    <span>{patient.bloodgroup || 'N/A'}</span>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FaUser className="text-blue-600 mr-3" />
                                    <span className="font-semibold w-32">Age:</span>
                                    <span>{patient.age || 'N/A'}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-red-500">No patient data found.</div>
                        )}


                        <div className="mt-6 text-right">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DoctorAppointments
