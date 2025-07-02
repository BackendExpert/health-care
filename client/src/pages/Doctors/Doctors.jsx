import React, { useState } from 'react'
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Doctors = () => {
    const [search, setSearch] = useState('');

    const doctors = [
        {
            id: 1,
            image: 'https://wallpapercave.com/wp/wp11948201.jpg',
            name: 'Dr. Amila Perera',
            designation: 'Cardiologist',
            description: 'Expert in advanced cardiac care with 15+ years of experience.',
            phone: '+94 71 123 4567',
            email: 'amilap@healthcare.lk'
        },
        {
            id: 2,
            image: 'https://wallpapercave.com/wp/wp9776910.jpg',
            name: 'Dr. Nadeesha Silva',
            designation: 'Neurologist',
            description: 'Specializes in treating complex neurological conditions.',
            phone: '+94 77 987 6543',
            email: 'nadeeshas@healthcare.lk'
        },
        {
            id: 3,
            image: 'https://wallpapercave.com/wp/wp11948201.jpg',
            name: 'Dr. Dilan Fernando',
            designation: 'Orthopedic Surgeon',
            description: 'Focused on joint replacements and sports injuries.',
            phone: '+94 76 456 7890',
            email: 'dilanf@healthcare.lk'
        },
        {
            id: 4,
            image: 'https://wallpapercave.com/wp/wp9776910.jpg',
            name: 'Dr. Hashini Jayawardena',
            designation: 'Pediatrician',
            description: 'Providing compassionate care for children of all ages.',
            phone: '+94 72 321 9876',
            email: 'hashinij@healthcare.lk'
        },
        {
            id: 5,
            image: 'https://wallpapercave.com/wp/wp11948201.jpg',
            name: 'Dr. Kasun Rathnayake',
            designation: 'Dermatologist',
            description: 'Specialist in skin diseases and cosmetic procedures.',
            phone: '+94 71 654 3210',
            email: 'kasunr@healthcare.lk'
        },
        {
            id: 6,
            image: 'https://wallpapercave.com/wp/wp9776910.jpg',
            name: 'Dr. Dilani Gunasekara',
            designation: 'General Physician',
            description: 'Family health specialist with a holistic approach.',
            phone: '+94 78 555 1234',
            email: 'dilanig@healthcare.lk'
        }
    ];

    const filteredDoctors = doctors.filter(doc =>
        doc.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-blue-50 text-gray-800 min-h-screen pt-16">
            {/* Header */}
            <div className="bg-blue-700 text-white py-20 px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">Our Doctors</h1>
                <p className="max-w-2xl mx-auto text-lg">
                    Meet our team of experienced specialists dedicated to your health.
                </p>
            </div>

            {/* Search */}
            <div className="py-10 px-4 xl:px-32">
                <div className="max-w-md mx-auto mb-12">
                    <input
                        type="text"
                        placeholder="Search doctor by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Doctors Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredDoctors.map(doc => (
                        <div key={doc.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
                            <img src={doc.image} alt={doc.name} className="w-full h-64 object-cover" />
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-blue-700 mb-1">{doc.name}</h2>
                                <h3 className="text-gray-600 mb-3">{doc.designation}</h3>
                                <p className="text-gray-600 mb-4">{doc.description}</p>
                                <div className="flex items-center gap-4 text-gray-700 text-sm">
                                    <div className="flex items-center gap-2">
                                        <FaPhoneAlt className="text-blue-600" /> {doc.phone}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaEnvelope className="text-blue-600" /> {doc.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredDoctors.length === 0 && (
                    <p className="text-center text-gray-600 mt-12">No doctors found with that name.</p>
                )}
            </div>
        </div>
    )
}

export default Doctors
