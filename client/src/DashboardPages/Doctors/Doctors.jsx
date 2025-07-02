import React from 'react'
import { FaUserMd } from 'react-icons/fa'

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
                            {currentPatients.length > 0 ? (
                                currentPatients.map((data, index) => (
                                    <tr key={index} className="hover:bg-blue-50 transition-all duration-150">
                                        <td className="px-6 py-4 font-medium text-gray-800">{indexOfFirstPatient + index + 1}</td>
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

                {/* Pagination */}
                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-xl font-semibold ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        Previous
                    </button>
                    <div className="text-gray-600">
                        Page {currentPage} of {totalPages || 1}
                    </div>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className={`px-4 py-2 rounded-xl font-semibold ${currentPage === totalPages || totalPages === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Doctors