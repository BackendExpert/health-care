import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const ViewHistory = () => {
    const { id } = useParams()
    const token = secureLocalStorage.getItem('login')

    const [paitenthis, setpaitenthis] = useState([])
    const [filteredHistory, setFilteredHistory] = useState([])
    const [filterDate, setFilterDate] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 15

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/paitent/mypatientHistroy', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => {
                if (res.data.Result) {
                    if (Array.isArray(res.data.Result)) {
                        setpaitenthis(res.data.Result)
                        setFilteredHistory(res.data.Result)
                    } else {
                        setpaitenthis([res.data.Result])
                        setFilteredHistory([res.data.Result])
                    }
                }
            })
            .catch(err => console.log("❌ API Error:", err))
    }, [token])

    useEffect(() => {
        let data = [...paitenthis]
        if (filterDate) {
            data = data.filter(item =>
                new Date(item.appointmentData).toISOString().split('T')[0] === filterDate
            )
        }
        setFilteredHistory(data)
        setCurrentPage(1)
    }, [filterDate, paitenthis])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(filteredHistory.length / itemsPerPage)

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Patient History</h1>

            <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Filter by appointment date
                </label>
                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="border border-gray-300 rounded-xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="space-y-6">
                {currentItems.length > 0 ? currentItems.map((item, index) => (
                    <div
                        key={item._id || index}
                        className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition duration-300"
                    >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                            <p className="text-gray-700">
                                <span className="font-semibold">Appointment Date:</span> {item.appointmentData ? new Date(item.appointmentData).toLocaleDateString() : 'N/A'}
                            </p>
                            <p className="text-gray-700 mt-2 sm:mt-0">
                                <span className="font-semibold">Next Date:</span> {item.nextDate ? new Date(item.nextDate).toLocaleDateString() : '-'}
                            </p>
                        </div>
                        <div className="text-gray-700 mb-2">
                            <span className="font-semibold">Doctor:</span> {typeof item.doctorID === 'object'
                                ? (item.doctorID.fullname || item.doctorID.username || 'N/A')
                                : item.doctorID || 'N/A'}
                        </div>
                        <div className="text-gray-700">
                            <span className="font-semibold">Remark:</span> {item.remark || '-'}
                        </div>
                    </div>
                )) : (
                    <div className="text-center text-gray-500 py-10">
                        No history records found.
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
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

export default ViewHistory
