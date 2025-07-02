import React, { useState, useEffect } from 'react'
import DefaultInput from '../../components/Form/DefaultInput'
import TextAreaInput from '../../components/Form/TextAreaInput'
import Dropdown from '../../components/Form/Dropdown'
import DefaultBtn from '../../components/Buttons/DefultBtn'
import axios from 'axios'
import secureLocalStorage from 'react-secure-storage'

const UpdatePatientInfor = () => {
    const currentEmail = secureLocalStorage.getItem('loginE')
    const token = secureLocalStorage.getItem('login')

    const [patientinfo, setPatientinfo] = useState({
        fullname: '',
        age: '',
        nic: '',
        gender: '',
        address: '',
        contactInfo: '',
        landline: '',
        bloodgroup: ''
    })

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_APP_API}/user/current-userdata/${currentEmail}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })

                const patient = res.data.patient
                if (patient) {
                    setPatientinfo({
                        fullname: patient.fullname || '',
                        age: patient.age || '',
                        nic: patient.nic || '',
                        gender: patient.gender || '',
                        address: patient.address || '',
                        contactInfo: patient.contactInfo || '',
                        landline: patient.landline || '',
                        bloodgroup: patient.bloodgroup || ''
                    })
                }
            } catch (err) {
                console.log(err)
            }
        }

        fetchPatientData()
    }, [currentEmail, token])

    const handleChange = (e) => {
        const { name, value } = e.target
        setPatientinfo((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_APP_API}/user/create-patientdata/${currentEmail}`,
                patientinfo,
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (res.data?.Message) {
                alert(res.data.Message)
                window.location.reload()
            } else if (res.data?.Error) {
                alert(res.data.Error)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-md mt-10">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">Update Patient Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-3 gap-4">
                    <DefaultInput
                        label="Full Name"
                        name="fullname"
                        value={patientinfo.fullname}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        required
                    />
                    <DefaultInput
                        label="NIC"
                        name="nic"
                        value={patientinfo.nic}
                        onChange={handleChange}
                        placeholder="Enter NIC number"
                        required
                    />
                    <DefaultInput
                        label="Age"
                        type="number"
                        name="age"
                        value={patientinfo.age}
                        onChange={handleChange}
                        placeholder="Enter age"
                        required
                    />
                    <Dropdown
                        label="Gender"
                        name="gender"
                        value={patientinfo.gender}
                        onChange={handleChange}
                        required
                        options={[
                            { label: 'Male', value: 'Male' },
                            { label: 'Female', value: 'Female' },
                            { label: 'Other', value: 'Other' }
                        ]}
                    />
                    <Dropdown
                        label="Blood Group"
                        name="bloodgroup"
                        value={patientinfo.bloodgroup}
                        onChange={handleChange}
                        required
                        options={[
                            { label: 'A+', value: 'A+' },
                            { label: 'A-', value: 'A-' },
                            { label: 'B+', value: 'B+' },
                            { label: 'B-', value: 'B-' },
                            { label: 'AB+', value: 'AB+' },
                            { label: 'AB-', value: 'AB-' },
                            { label: 'O+', value: 'O+' },
                            { label: 'O-', value: 'O-' }
                        ]}
                    />
                    <TextAreaInput
                        label="Address"
                        name="address"
                        value={patientinfo.address}
                        onChange={handleChange}
                        placeholder="Enter address"
                        required
                    />
                    <DefaultInput
                        label="Mobile Contact"
                        name="contactInfo"
                        value={patientinfo.contactInfo}
                        onChange={handleChange}
                        placeholder="Enter contact number"
                        required
                    />
                    <DefaultInput
                        label="Landline (Optional)"
                        name="landline"
                        value={patientinfo.landline}
                        onChange={handleChange}
                        placeholder="Enter landline number"
                    />
                </div>
                <DefaultBtn type="submit" label="Update Patient" />
            </form>
        </div>
    )
}

export default UpdatePatientInfor
