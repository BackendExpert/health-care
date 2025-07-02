import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'
import { FaUser, FaIdCard, FaPhone, FaHome, FaTint, FaVenusMars, FaAddressBook } from 'react-icons/fa'
import DefaultBtn from '../../components/Buttons/DefultBtn'

const ViewPatient = () => {
    const { id } = useParams()
    const token = secureLocalStorage.getItem('login')
    const [patient, setPatient] = useState(null)

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/paitent/get-patientbyid/' + id, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => setPatient(res.data.Result))
            .catch(err => console.log(err))
    }, [id])

    const [patienthistorybtn, setpatienthistorybtn] = useState(false)

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mt-10 p-6 bg-white rounded-2xl shadow-xl">
                <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Patient Details</h1>

                {patient ? (
                    <div className="space-y-4">
                        <div className="flex items-center text-gray-700">
                            <FaUser className="text-blue-600 mr-3" />
                            <span className="font-semibold w-32">Full Name:</span>
                            <span>{patient.fullname}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <FaIdCard className="text-blue-600 mr-3" />
                            <span className="font-semibold w-32">NIC:</span>
                            <span>{patient.nic}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <FaVenusMars className="text-blue-600 mr-3" />
                            <span className="font-semibold w-32">Gender:</span>
                            <span>{patient.gender}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <FaHome className="text-blue-600 mr-3" />
                            <span className="font-semibold w-32">Address:</span>
                            <span>{patient.address}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <FaPhone className="text-blue-600 mr-3" />
                            <span className="font-semibold w-32">Mobile:</span>
                            <span>{patient.contactInfo}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <FaAddressBook className="text-blue-600 mr-3" />
                            <span className="font-semibold w-32">Landline:</span>
                            <span>{patient.landline || "N/A"}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <FaTint className="text-blue-600 mr-3" />
                            <span className="font-semibold w-32">Blood Group:</span>
                            <span>{patient.bloodgroup}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <FaUser className="text-blue-600 mr-3" />
                            <span className="font-semibold w-32">Age:</span>
                            <span>{patient.age}</span>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-500">Loading patient data...</div>
                )}
            </div>
            <div className="mt-4">
                <DefaultBtn 
                    type='submit'
                    label={!patienthistorybtn ? 'VIew Patient History':'Close'}
                    onClick={() => setpatienthistorybtn(!patienthistorybtn)}
                />
            </div>
        </div>

    )
}

export default ViewPatient
