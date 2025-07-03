import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import secureLocalStorage from 'react-secure-storage'

const ViewDoctor = () => {
    const token = secureLocalStorage.getItem('login')
    const { id } = useParams()

    const [doctor, setDoctor] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/doctor/view-doctor/' + id, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => {
                setDoctor(res.data.Result)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [id])

    if (loading) return <div>Loading doctor details...</div>
    if (!doctor) return <div>Doctor not found.</div>

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md mt-6">
            <h1 className="text-2xl font-bold text-blue-700 mb-4">Doctor Details</h1>
            <div className="space-y-4">
                <div><strong>Name:</strong> {doctor.name}</div>
                <div><strong>Experience:</strong> {doctor.exp} years</div>
                <div><strong>Contact Info:</strong> {doctor.contactInfo}</div>
                <div><strong>Landline:</strong> {doctor.landline || 'N/A'}</div>
                <div><strong>Hospital:</strong> {doctor.hospital || 'N/A'}</div>
                <div><strong>Section:</strong> {doctor.section}</div>
            </div>
        </div>
    )
}

export default ViewDoctor
