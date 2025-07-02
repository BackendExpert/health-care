import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaHospitalUser } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const Patients = () => {
    const token = secureLocalStorage.getItem('login')
    const [allpatients, setallpatients] = useState([])
    const [filteredPatients, setFilteredPatients] = useState([])

    // filters
    const [nicFilter, setNicFilter] = useState("")
    const [genderFilter, setGenderFilter] = useState("All")
    const [minAge, setMinAge] = useState("")
    const [maxAge, setMaxAge] = useState("")
    const [nameSearch, setNameSearch] = useState("")

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/paitent/get-allpatients', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => {
                setallpatients(res.data.Result)
                setFilteredPatients(res.data.Result)
            })
            .catch(err => console.log(err))
    }, [])

    // apply filters
    useEffect(() => {
        let filtered = allpatients

        if (nicFilter.trim()) {
            filtered = filtered.filter(p => p.nic.toLowerCase().includes(nicFilter.toLowerCase()))
        }

        if (genderFilter !== "All") {
            filtered = filtered.filter(p => p.gender === genderFilter)
        }

        if (minAge !== "" && !isNaN(minAge)) {
            filtered = filtered.filter(p => p.age >= parseInt(minAge))
        }

        if (maxAge !== "" && !isNaN(maxAge)) {
            filtered = filtered.filter(p => p.age <= parseInt(maxAge))
        }

        if (nameSearch.trim()) {
            filtered = filtered.filter(p => p.name && p.name.toLowerCase().includes(nameSearch.toLowerCase()))
        }

        setFilteredPatients(filtered)
    }, [nicFilter, genderFilter, minAge, maxAge, nameSearch, allpatients])

    return (
        <div>
            <div className="flex items-center">
                <FaHospitalUser className='fill-blue-700 h-8 w-auto' />
                <h1 className="text-2xl font-bold text-blue-700 ml-2">Patients</h1>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 my-6">
                <input
                    type="text"
                    placeholder="Search NIC"
                    value={nicFilter}
                    onChange={(e) => setNicFilter(e.target.value)}
                    className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <select
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)}
                    className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="All">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <div className="flex space-x-2">
                    <input
                        type="number"
                        placeholder="Min Age"
                        value={minAge}
                        onChange={(e) => setMinAge(e.target.value)}
                        className="w-1/2 border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="number"
                        placeholder="Max Age"
                        value={maxAge}
                        onChange={(e) => setMaxAge(e.target.value)}
                        className="w-1/2 border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <input
                    type="text"
                    placeholder="Search by Name"
                    value={nameSearch}
                    onChange={(e) => setNameSearch(e.target.value)}
                    className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Summary Card */}
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

            {/* Patients Table */}
            <div className="mt-8">
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
                            {filteredPatients.length > 0 ? (
                                filteredPatients.map((data, index) => (
                                    <tr key={index} className="hover:bg-blue-50 transition-all duration-150">
                                        <td className="px-6 py-4 font-medium text-gray-800">{index + 1}</td>
                                        <td className="px-6 py-4">{data.nic}</td>
                                        <td className="px-6 py-4">{data.fullname}</td>
                                        <td className="px-6 py-4">{data.age}</td>
                                        <td className="px-6 py-4">{data.gender}</td>
                                        <td className="px-6 py-4">
                                            <Link
                                                to={`/Dashboard/ViewPatient/${data._id}`}
                                                className="text-blue-600 font-medium hover:underline"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                        No patients found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Patients
