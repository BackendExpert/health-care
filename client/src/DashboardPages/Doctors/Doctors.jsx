import React, { useEffect, useState } from 'react'
import { FaUserMd } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import DefaultBtn from '../../components/Buttons/DefultBtn'
import axios from 'axios'
import secureLocalStorage from 'react-secure-storage'

const Doctors = () => {
    const token = secureLocalStorage.getItem('login')
    const [alldoctors, setalldoctors] = useState([])
    const [filteredDoctors, setFilteredDoctors] = useState([])

    const [search, setSearch] = useState('')
    const [section, setSection] = useState('')
    const [exp, setExp] = useState('')

    // pagination
    const [currentPage, setCurrentPage] = useState(1)
    const doctorsPerPage = 15

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/doctor/all-doctors', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => {
                setalldoctors(res.data.Result || [])
                setFilteredDoctors(res.data.Result || [])
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        let filtered = alldoctors

        if (search.trim() !== '') {
            filtered = filtered.filter(doc =>
                doc.name.toLowerCase().includes(search.toLowerCase())
            )
        }

        if (section !== '') {
            filtered = filtered.filter(doc => doc.section === section)
        }

        if (exp !== '') {
            filtered = filtered.filter(doc => doc.exp.toString() === exp)
        }

        setFilteredDoctors(filtered)
        setCurrentPage(1) // reset to first page on filter change
    }, [search, section, exp, alldoctors])

    // get current page doctors
    const indexOfLastDoctor = currentPage * doctorsPerPage
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage
    const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor)
    const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage)

    return (
        <div>
            <div className="flex items-center mb-4">
                <FaUserMd className='fill-blue-700 h-8 w-auto' />
                <h1 className="text-2xl font-bold text-blue-700 ml-2">Doctors</h1>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
                <div className="relative bg-blue-600 text-white p-6 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                    <div className="absolute right-4 top-4 opacity-20 text-white text-6xl">
                        <FaUserMd />
                    </div>
                    <div className="relative z-10">
                        <div className="text-sm font-medium uppercase tracking-wide text-blue-100">
                            Total Doctors
                        </div>
                        <div className="mt-2 text-3xl font-bold">{filteredDoctors.length}</div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by name"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                >
                    <option value="">Filter by section</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Surgery">Surgery</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Neurology">Neurology</option>
                </select>


                <input
                    type="number"
                    placeholder="Filter by experience"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3"
                    value={exp}
                    onChange={(e) => setExp(e.target.value)}
                />
            </div>

            {/* Add Doctor */}
            <div className="mb-6">
                <Link to={'/Dashboard/AddDoctor'}>
                    <DefaultBtn label='Add New Doctor' />
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl shadow-lg">
                <table className="min-w-full text-sm text-left text-gray-600 bg-white">
                    <thead className="text-xs uppercase bg-blue-100 text-blue-700">
                        <tr>
                            <th className="px-6 py-4 font-semibold tracking-wider">#</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Name</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Exp</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Section</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {currentDoctors.length > 0 ? (
                            currentDoctors.map((data, index) => (
                                <tr className="hover:bg-blue-50 transition-all duration-150" key={data._id || index}>
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {(currentPage - 1) * doctorsPerPage + index + 1}
                                    </td>
                                    <td className="px-6 py-4">{data.name}</td>
                                    <td className="px-6 py-4">{data.exp}</td>
                                    <td className="px-6 py-4">{data.section}</td>
                                    <td className="px-6 py-4">
                                        <Link
                                            to={`/Dashboard/ViewDoctor/${data._id}`}
                                            className="text-blue-600 font-medium hover:underline"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-6 py-4 text-center text-gray-400" colSpan="5">
                                    No doctors found.
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

export default Doctors
